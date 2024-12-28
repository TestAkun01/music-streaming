import PlaylistItem from "./PlaylistItemType";
import PlayOptions from "./PlayOptionType";

interface AudioContextType {
  loop: 0 | 1 | 2;
  currentTime: number;
  volume: number;
  playing: boolean;
  duration: number;
  playlist: PlaylistItem[];
  currentId: string | null;
  setPlaylist: (Playlist: PlaylistItem[]) => void;
  handlePlayPause: (option?: PlayOptions) => void;
  handleLoopChange: () => void;
  handleTimeChange: (event: Event, newValue: number | number[]) => void;
  handleSeekStart: () => void;
  handleSeekEnd: () => void;
  handleVolumeChange: (event: Event, newValue: number | number[]) => void;
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
