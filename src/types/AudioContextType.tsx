import PlaylistItem from "./PlaylistItemType";
import PlayOptions from "./PlayOptionType";
import { Track } from "./TableDatabaseType";

interface AudioContextType {
  loop: 0 | 1 | 2;
  currentTime: number;
  volume: number;
  playing: boolean;
  duration: number;
  playlist: PlaylistItem[];
  currentTrack: PlaylistItem | null;
  playlistIsOpen: boolean;
  setPlaylist: (Playlist: PlaylistItem[]) => void;
  handlePlayPause: (
    options?: PlayOptions,
    track?: Track | PlaylistItem
  ) => void;
  handleLoopChange: () => void;
  handleTimeChange: (time: number) => void;
  handleSeekStart: () => void;
  handleSeekEnd: () => void;
  handleVolumeChange: (time: number) => void;
  handleSkipForward: () => void;
  handleSkipBackward: () => void;
  handleNextTrack: () => void;
  handlePreviousTrack: () => void;
  handleAddToPlaylist: (track: Track) => void;
  handleRemoveFromPlaylist: (id: string) => void;
  handleClearPlaylist: () => void;
  handleTogglePlaylistIsOpen: () => void;
}

export default AudioContextType;
