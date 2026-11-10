/**
 * Tiny generative lo-fi/ambient music engine built on the Web Audio API.
 * No audio files are needed, so the player works offline and never 404s.
 */

export interface TrackPreset {
  id: number;
  title: string;
  artist: string;
  bpm: number;
  /** Chord progression as MIDI note numbers, one chord per bar. */
  chords: number[][];
  /** Arpeggio pattern as indexes into the current chord (-1 = rest). */
  arp: number[];
  padWave: OscillatorType;
  leadWave: OscillatorType;
  drums: boolean;
}

export const TRACKS: TrackPreset[] = [
  {
    id: 1,
    title: 'Coding Flow',
    artist: 'Requime Generative',
    bpm: 82,
    // Fmaj7 – Em7 – Dm7 – Cmaj7
    chords: [
      [53, 57, 60, 64],
      [52, 55, 59, 62],
      [50, 53, 57, 60],
      [48, 52, 55, 59],
    ],
    arp: [0, 2, 3, 2, 1, -1, 3, 2],
    padWave: 'triangle',
    leadWave: 'sine',
    drums: true,
  },
  {
    id: 2,
    title: 'Terminal Dreams',
    artist: 'Requime Generative',
    bpm: 70,
    // Am9 – Fmaj7 – Cmaj7 – G6
    chords: [
      [45, 52, 59, 60],
      [41, 52, 57, 60],
      [48, 52, 55, 59],
      [43, 50, 52, 59],
    ],
    arp: [3, -1, 2, 1, 3, -1, 0, 2],
    padWave: 'sine',
    leadWave: 'triangle',
    drums: false,
  },
  {
    id: 3,
    title: 'Night Compile',
    artist: 'Requime Generative',
    bpm: 92,
    // Dm9 – G7 – Cmaj9 – A7
    chords: [
      [50, 53, 57, 64],
      [43, 53, 59, 62],
      [48, 52, 59, 62],
      [45, 55, 61, 64],
    ],
    arp: [0, 1, 2, 3, 2, 1, 3, -1],
    padWave: 'sawtooth',
    leadWave: 'square',
    drums: true,
  },
];

const midiToHz = (note: number) => 440 * Math.pow(2, (note - 69) / 12);

export class AmbientEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private bus: GainNode | null = null;
  private reverb: ConvolverNode | null = null;
  private delay: DelayNode | null = null;
  private noise: AudioBuffer | null = null;
  analyser: AnalyserNode | null = null;

  private timer: number | null = null;
  private step = 0;
  private nextTime = 0;
  private track: TrackPreset = TRACKS[0]!;
  private volume = 0.5;

  get isSupported() {
    return typeof window !== 'undefined' && ('AudioContext' in window || 'webkitAudioContext' in window);
  }

  private ensureContext() {
    if (this.ctx) return this.ctx;
    const Ctor: typeof AudioContext =
      window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctor();

    this.master = ctx.createGain();
    this.master.gain.value = this.volume * 0.6;

    this.analyser = ctx.createAnalyser();
    this.analyser.fftSize = 64;
    this.analyser.smoothingTimeConstant = 0.8;

    // Everything is mixed into `bus`, which feeds a dry path plus reverb and delay sends.
    this.bus = ctx.createGain();
    this.reverb = ctx.createConvolver();
    this.reverb.buffer = this.createImpulse(ctx, 2.8);
    const reverbGain = ctx.createGain();
    reverbGain.gain.value = 0.45;

    this.delay = ctx.createDelay(1.5);
    const feedback = ctx.createGain();
    feedback.gain.value = 0.32;
    const delayGain = ctx.createGain();
    delayGain.gain.value = 0.22;

    const lowpass = ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.value = 4200;

    this.bus.connect(lowpass);
    lowpass.connect(this.master);
    lowpass.connect(this.reverb);
    this.reverb.connect(reverbGain).connect(this.master);
    lowpass.connect(this.delay);
    this.delay.connect(feedback).connect(this.delay);
    this.delay.connect(delayGain).connect(this.master);

    this.master.connect(this.analyser);
    this.analyser.connect(ctx.destination);

    this.noise = this.createNoise(ctx);
    this.ctx = ctx;
    return ctx;
  }

  private createImpulse(ctx: AudioContext, seconds: number) {
    const length = Math.floor(ctx.sampleRate * seconds);
    const buffer = ctx.createBuffer(2, length, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const data = buffer.getChannelData(c);
      for (let i = 0; i < length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 3);
      }
    }
    return buffer;
  }

  private createNoise(ctx: AudioContext) {
    const buffer = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    return buffer;
  }

  /** Starts (or resumes) playback. Must be called from a user gesture. */
  async play(track?: TrackPreset) {
    const ctx = this.ensureContext();
    if (track && track.id !== this.track.id) {
      this.track = track;
      this.restartSequencer();
    }
    if (ctx.state === 'suspended') await ctx.resume();
    if (this.timer === null) this.restartSequencer();
  }

  async pause() {
    if (this.ctx && this.ctx.state === 'running') await this.ctx.suspend();
  }

  /** Switches track; keeps playing only if already playing. */
  setTrack(track: TrackPreset) {
    this.track = track;
    if (this.ctx && this.timer !== null) this.restartSequencer();
  }

  setVolume(volume: number) {
    this.volume = volume;
    if (this.master && this.ctx) {
      this.master.gain.setTargetAtTime(volume * 0.6, this.ctx.currentTime, 0.05);
    }
  }

  dispose() {
    if (this.timer !== null) window.clearInterval(this.timer);
    this.timer = null;
    void this.ctx?.close();
    this.ctx = null;
    this.analyser = null;
  }

  private restartSequencer() {
    const ctx = this.ctx;
    if (!ctx) return;
    if (this.timer !== null) window.clearInterval(this.timer);
    this.step = 0;
    this.nextTime = ctx.currentTime + 0.1;
    this.delay!.delayTime.value = (60 / this.track.bpm) * 0.75;
    this.timer = window.setInterval(() => this.schedule(), 50);
    this.schedule();
  }

  /** Look-ahead scheduler: queues every 8th-note step that falls within the next 0.25s. */
  private schedule() {
    const ctx = this.ctx;
    if (!ctx || ctx.state !== 'running') return;
    const stepDur = 60 / this.track.bpm / 2;
    while (this.nextTime < ctx.currentTime + 0.25) {
      this.playStep(this.step, this.nextTime, stepDur);
      this.nextTime += stepDur;
      this.step++;
    }
  }

  private playStep(step: number, time: number, stepDur: number) {
    const { chords, arp, drums } = this.track;
    const bar = Math.floor(step / 8) % chords.length;
    const pos = step % 8;
    const chord = chords[bar]!;

    if (pos === 0) {
      chord.forEach((note) => this.pad(midiToHz(note), time, stepDur * 8));
      this.bass(midiToHz(chord[0]! - 12), time, stepDur * 6);
    }

    const idx = arp[pos]!;
    // Small dose of randomness keeps the loop from sounding mechanical.
    if (idx >= 0 && Math.random() > 0.15) {
      const octave = Math.random() > 0.8 ? 24 : 12;
      this.pluck(midiToHz(chord[idx]! + octave), time, stepDur * 1.6);
    }

    if (drums) {
      if (pos === 0 || pos === 5) this.kick(time);
      if (pos === 4) this.snare(time);
      if (pos % 2 === 1) this.hat(time, 0.04);
    }
  }

  private envelope(gain: GainNode, time: number, peak: number, attack: number, duration: number) {
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(peak, time + attack);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
  }

  private pad(freq: number, time: number, duration: number) {
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    osc.type = this.track.padWave;
    osc.frequency.value = freq;
    osc.detune.value = (Math.random() - 0.5) * 12;
    filter.type = 'lowpass';
    filter.frequency.value = this.track.padWave === 'sawtooth' ? 900 : 1600;
    const peak = this.track.padWave === 'sawtooth' ? 0.035 : 0.06;
    this.envelope(gain, time, peak, duration * 0.3, duration * 1.05);
    osc.connect(filter).connect(gain).connect(this.bus!);
    osc.start(time);
    osc.stop(time + duration * 1.1);
  }

  private bass(freq: number, time: number, duration: number) {
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    this.envelope(gain, time, 0.18, 0.05, duration);
    osc.connect(gain).connect(this.bus!);
    osc.start(time);
    osc.stop(time + duration + 0.05);
  }

  private pluck(freq: number, time: number, duration: number) {
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    osc.type = this.track.leadWave;
    osc.frequency.value = freq;
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(3000, time);
    filter.frequency.exponentialRampToValueAtTime(400, time + duration);
    const peak = this.track.leadWave === 'square' ? 0.025 : 0.06;
    this.envelope(gain, time, peak, 0.01, duration);
    osc.connect(filter).connect(gain).connect(this.bus!);
    osc.start(time);
    osc.stop(time + duration + 0.05);
  }

  private kick(time: number) {
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.setValueAtTime(120, time);
    osc.frequency.exponentialRampToValueAtTime(45, time + 0.15);
    this.envelope(gain, time, 0.35, 0.005, 0.3);
    osc.connect(gain).connect(this.master!);
    osc.start(time);
    osc.stop(time + 0.35);
  }

  private noiseHit(time: number, peak: number, duration: number, type: BiquadFilterType, freq: number) {
    const ctx = this.ctx!;
    const src = ctx.createBufferSource();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    src.buffer = this.noise;
    filter.type = type;
    filter.frequency.value = freq;
    this.envelope(gain, time, peak, 0.003, duration);
    src.connect(filter).connect(gain).connect(this.bus!);
    src.start(time);
    src.stop(time + duration + 0.05);
  }

  private snare(time: number) {
    this.noiseHit(time, 0.12, 0.18, 'bandpass', 1800);
  }

  private hat(time: number, peak: number) {
    this.noiseHit(time, peak, 0.05, 'highpass', 7000);
  }
}
