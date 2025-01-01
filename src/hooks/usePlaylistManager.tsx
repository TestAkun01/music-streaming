import PlaylistItem from "@/types/PlaylistItemType";
import Track from "@/types/TrackType";
import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const usePlaylistManager = (initialPlaylist: PlaylistItem[] = []) => {
  const [playlist, setPlaylist] = useState<PlaylistItem[]>(initialPlaylist);
  const [playlistIsOpen, setPlaylistIsOpen] = useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = useState<PlaylistItem | null>(null);

  const findNextTrack = useCallback(
    (removedTrackId: string) => {
      if (!currentTrack || playlist.length <= 1) return null;

      const currentIndex = playlist.findIndex(
        (track) => track.temporaryId === removedTrackId
      );

      if (currentIndex < playlist.length - 1) {
        return playlist[currentIndex + 1];
      }

      return playlist[0];
    },
    [playlist, currentTrack]
  );

  const addToPlaylist = useCallback((track: Track) => {
    const newTrack = { ...track, temporaryId: uuidv4() };
    setPlaylist((prev) => [...prev, newTrack]);
    return newTrack;
  }, []);

  const removeFromPlaylist = useCallback((temporaryId: string) => {
    setPlaylist((prev) =>
      prev.filter((item) => item.temporaryId !== temporaryId)
    );
  }, []);

  const clearPlaylist = useCallback(() => {
    setPlaylist([]);
    setCurrentTrack(null);
  }, []);

  const togglePlaylistIsOpen = () => {
    setPlaylistIsOpen((prev) => !prev);
  };

  return {
    playlist,
    currentTrack,
    playlistIsOpen,
    setCurrentTrack,
    findNextTrack,
    setPlaylist,
    addToPlaylist,
    removeFromPlaylist,
    clearPlaylist,
    togglePlaylistIsOpen,
  };
};

export default usePlaylistManager;
