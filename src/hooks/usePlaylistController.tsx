import { Tables } from "@/types/DatabaseType";
import PlaylistItem from "@/types/PlaylistItemType";
import useAudioStore from "@/store/audioStore";

import { v4 as uuidv4 } from "uuid";

export interface PlaylistController {
  handleAddToPlaylist: (
    tracks: Tables<"tracks"> | Tables<"tracks">[],
    resetPlaylist?: boolean
  ) => PlaylistItem[];
  handleRemoveFromPlaylist: (temporaryId: string) => void;
  handleClearPlaylist: () => void;
  handleTogglePlaylistIsOpen: () => void;
}

export default function usePlaylistController(): PlaylistController {
  const {
    setPlaylist,
    setCurrentTrack,
    setCurrentTime,
    setPlaylistIsOpen,
    playlistIsOpen,
    currentTrack,
    playlist,
  } = useAudioStore();

  const findNextTrack = (removedTrackId: string) => {
    if (!currentTrack || playlist.length <= 1) return null;

    const currentIndex = playlist.findIndex(
      (track) => track.temporaryId === removedTrackId
    );

    if (currentIndex < playlist.length - 1) {
      return playlist[currentIndex + 1];
    }

    return playlist[0];
  };

  const removeFromPlaylist = (temporaryId: string) => {
    setPlaylist(playlist.filter((item) => item.temporaryId !== temporaryId));
  };

  const handleAddToPlaylist = (
    tracks: Tables<"tracks"> | Tables<"tracks">[],
    resetPlaylist?: boolean
  ) => {
    const tracksArray = Array.isArray(tracks) ? tracks : [tracks];
    const newTracks = tracksArray.map((track) => ({
      ...track,
      temporaryId: uuidv4(),
    })) as PlaylistItem[];

    if (resetPlaylist) {
      setPlaylist(newTracks);
      return newTracks;
    }

    setPlaylist([...playlist, ...newTracks]);

    return newTracks;
  };

  const handleRemoveFromPlaylist = (temporaryId: string) => {
    if (temporaryId === currentTrack?.temporaryId) {
      const nextTrack = findNextTrack(temporaryId);

      if (nextTrack) {
        removeFromPlaylist(temporaryId);
        setCurrentTrack(nextTrack);
      } else {
        setCurrentTrack(null);
        setCurrentTime(0);
        removeFromPlaylist(temporaryId);
      }
    } else {
      removeFromPlaylist(temporaryId);
    }
  };

  const handleClearPlaylist = () => {
    setPlaylist([]);
    setCurrentTrack(null);
  };

  const handleTogglePlaylistIsOpen = () => {
    setPlaylistIsOpen(!playlistIsOpen);
  };

  return {
    handleAddToPlaylist,
    handleRemoveFromPlaylist,
    handleClearPlaylist,
    handleTogglePlaylistIsOpen,
  };
}
