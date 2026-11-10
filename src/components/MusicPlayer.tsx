import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Volume1, SkipBack, SkipForward, Music, Minimize2 } from 'lucide-react';
import { useMusic } from '../contexts/music';
import { storage } from '../lib/utils';
import { useI18n } from '../contexts/language';

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

/** Real-time frequency bars driven by the audio engine's AnalyserNode. */
const Visualizer: React.FC<{ getAnalyser: () => AnalyserNode | null; active: boolean }> = ({ getAnalyser, active }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const bars = 24;
    let frame = 0;
    let data: Uint8Array | null = null;
    const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
    gradient.addColorStop(0, '#00d1ff');
    gradient.addColorStop(1, '#bd00ff');

    const draw = () => {
      const analyser = getAnalyser();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (analyser) {
        if (!data || data.length !== analyser.frequencyBinCount) data = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(data);
      }
      const barWidth = canvas.width / bars;
      for (let i = 0; i < bars; i++) {
        const value = data && active ? data[Math.floor((i / bars) * data.length * 0.8)]! / 255 : 0;
        const h = Math.max(2, value * canvas.height);
        ctx.fillStyle = gradient;
        ctx.fillRect(i * barWidth + 1, canvas.height - h, barWidth - 2, h);
      }
      // When paused a single flat frame is enough; no need to keep animating.
      if (active) frame = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(frame);
  }, [getAnalyser, active]);

  return <canvas ref={canvasRef} width={240} height={32} className="w-full h-8" aria-hidden="true" />;
};

const MusicPlayer: React.FC = () => {
  const {
    isSupported,
    isPlaying,
    volume,
    toggleMusic,
    setVolume,
    currentTrack,
    tracks,
    nextTrack,
    prevTrack,
    getAnalyser,
  } = useMusic();
  const { t } = useI18n();
  const [isMinimized, setIsMinimized] = useState(() => storage.get('music-player-open') !== '1');
  const [elapsed, setElapsed] = useState(0);
  const lastVolume = useRef(volume || 0.5);

  useEffect(() => {
    storage.set('music-player-open', isMinimized ? '0' : '1');
  }, [isMinimized]);

  useEffect(() => setElapsed(0), [currentTrack.id]);

  useEffect(() => {
    if (!isPlaying) return;
    const id = window.setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, [isPlaying]);

  if (!isSupported) return null;

  const toggleMute = () => {
    if (volume > 0) {
      lastVolume.current = volume;
      setVolume(0);
    } else {
      setVolume(lastVolume.current || 0.5);
    }
  };

  const VolumeIcon = volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;
  const trackNumber = tracks.findIndex((t) => t.id === currentTrack.id) + 1;

  return (
    <div className="fixed bottom-4 end-4 z-50">
      <AnimatePresence mode="wait" initial={false}>
        {isMinimized ? (
          <motion.button
            key="fab"
            type="button"
            onClick={() => setIsMinimized(false)}
            className="relative w-14 h-14 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-neon-blue/40"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            aria-label={t.music.open}
            title={t.music.player}
          >
            <motion.span
              animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
              transition={isPlaying ? { duration: 8, repeat: Infinity, ease: 'linear' } : { duration: 0.3 }}
            >
              <Music size={24} />
            </motion.span>
            {isPlaying && (
              <span className="absolute top-1 end-1 w-3 h-3 rounded-full bg-neon-green ring-2 ring-white dark:ring-dark-primary animate-pulse" />
            )}
          </motion.button>
        ) : (
          <motion.section
            key="panel"
            aria-label={t.music.player}
            className="w-[calc(100vw-2rem)] max-w-xs bg-white/95 dark:bg-dark-primary/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-gray-200 dark:border-white/10"
            initial={{ y: 40, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                <span className="text-sm font-medium text-gray-700 dark:text-white">
                  {isPlaying ? t.music.nowPlaying : t.music.paused}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsMinimized(true)}
                className="p-1 text-gray-500 dark:text-gray-400 hover:text-neon-blue transition-colors duration-200"
                aria-label={t.music.minimize}
              >
                <Minimize2 size={16} />
              </button>
            </div>

            {/* Track Info */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-neon-blue to-neon-purple rounded-lg flex items-center justify-center shrink-0">
                <Music className="text-white" size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 dark:text-white truncate">{currentTrack.title}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{currentTrack.artist}</p>
              </div>
              <span className="text-xs text-gray-400 shrink-0">
                {trackNumber}/{tracks.length}
              </span>
            </div>

            <Visualizer getAnalyser={getAnalyser} active={isPlaying} />

            <div dir="ltr" className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1 mb-3">
              <span aria-label={t.music.listeningTime}>{formatTime(elapsed)}</span>
              <span title={t.music.liveTitle}>
                ∞ {t.music.live} · {currentTrack.bpm} BPM
              </span>
            </div>

            {/* Controls (media players keep left-to-right order in every language) */}
            <div className="flex items-center justify-center gap-4 mb-4" dir="ltr">
              <motion.button
                type="button"
                onClick={prevTrack}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-neon-blue transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={t.music.prev}
              >
                <SkipBack size={20} />
              </motion.button>

              <motion.button
                type="button"
                onClick={toggleMusic}
                className="p-3 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full text-white shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 209, 255, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                aria-label={isPlaying ? t.music.pause : t.music.play}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </motion.button>

              <motion.button
                type="button"
                onClick={nextTrack}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-neon-blue transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={t.music.next}
              >
                <SkipForward size={20} />
              </motion.button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-3" dir="ltr">
              <button
                type="button"
                onClick={toggleMute}
                className="p-1 text-gray-600 dark:text-gray-400 hover:text-neon-blue transition-colors duration-200"
                aria-label={volume === 0 ? t.music.unmute : t.music.mute}
              >
                <VolumeIcon size={18} />
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="flex-1 h-1 rounded-lg appearance-none slider"
                style={{ ['--value' as string]: `${volume * 100}%` }}
                aria-label={t.music.volume}
              />
              <span className="text-xs text-gray-500 dark:text-gray-400 w-9 text-end tabular-nums">
                {Math.round(volume * 100)}%
              </span>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MusicPlayer;
