import { createContext, useContext } from 'react';
import type { TrackPreset } from '../lib/ambientEngine';

export interface MusicContextType {
  isSupported: boolean;
  isPlaying: boolean;
  volume: number;
  tracks: TrackPreset[];
  currentTrack: TrackPreset;
  toggleMusic: () => void;
  setVolume: (volume: number) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  getAnalyser: () => AnalyserNode | null;
}

export const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};
