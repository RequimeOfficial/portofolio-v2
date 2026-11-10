import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MusicContext } from './music';
import { AmbientEngine, TRACKS } from '../lib/ambientEngine';
import { storage } from '../lib/utils';

const clampVolume = (v: number) => Math.min(1, Math.max(0, Number.isFinite(v) ? v : 0.5));

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const engineRef = useRef<AmbientEngine | null>(null);
  if (engineRef.current === null) engineRef.current = new AmbientEngine();
  const engine = engineRef.current;

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(() => clampVolume(Number(storage.get('music-volume') ?? 0.5)));
  const [trackIndex, setTrackIndex] = useState(0);

  useEffect(() => {
    engine.setVolume(volume);
  }, [engine, volume]);

  useEffect(() => () => engine.dispose(), [engine]);

  const toggleMusic = useCallback(() => {
    if (!engine.isSupported) return;
    if (isPlaying) {
      void engine.pause();
      setIsPlaying(false);
    } else {
      engine.play(TRACKS[trackIndex]).then(
        () => setIsPlaying(true),
        () => setIsPlaying(false),
      );
    }
  }, [engine, isPlaying, trackIndex]);

  const changeTrack = useCallback(
    (delta: number) => {
      const next = (trackIndex + delta + TRACKS.length) % TRACKS.length;
      engine.setTrack(TRACKS[next]!);
      setTrackIndex(next);
    },
    [engine, trackIndex],
  );

  const setVolume = useCallback((v: number) => {
    const next = clampVolume(v);
    setVolumeState(next);
    storage.set('music-volume', String(next));
  }, []);

  const value = useMemo(
    () => ({
      isSupported: engine.isSupported,
      isPlaying,
      volume,
      tracks: TRACKS,
      currentTrack: TRACKS[trackIndex]!,
      toggleMusic,
      setVolume,
      nextTrack: () => changeTrack(1),
      prevTrack: () => changeTrack(-1),
      getAnalyser: () => engine.analyser,
    }),
    [engine, isPlaying, volume, trackIndex, toggleMusic, setVolume, changeTrack],
  );

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
};
