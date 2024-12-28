import PlaylistItem from "./PlaylistItem";

interface AudioContextType {
  loop: 0 | 1 | 2;
  currentTime: number;
  volume: number;
  playing: boolean;
  duration: number;
  playlist: PlaylistItem[];
  currentId: string | null;
  handlePlayPause: (source?: string) => void;
  handleLoopChange: () => void;
  handleTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDragStart: () => void;
  handleDragEnd: () => void;
  handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSkipForward: () => void;
  handleSkipBackward: () => void;
  handleNextTrack: () => void;
  handlePreviousTrack: () => void;
  handleAddToPlaylist: (source: string) => void;
  handleRemoveFromPlaylist: (id: string) => void;
  handleClearPlaylist: () => void;
  handleUpdatePlaylistSong: (id: string, newSong: string) => void;
  handleReorderPlaylist: (fromIndex: number, toIndex: number) => void;
}

export default AudioContextType;
