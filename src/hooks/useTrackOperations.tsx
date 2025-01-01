import PlaylistItem from "@/types/PlaylistItemType";
import Track from "@/types/TrackType";
import { useCallback } from "react";

const useTrackOperations = (
  playlist: PlaylistItem[],
  currentTrack: PlaylistItem | null,
  addToPlaylist: (track: Track) => PlaylistItem,
  setCurrentTrack: (track: PlaylistItem | null) => void,
  togglePlayPause: () => void
) => {
  const handleSourceTrack = useCallback(
    (track: Track) => {
      const isCurrentlyPlaying = playlist.some(
        (item) =>
          item.source === track.source &&
          item.temporaryId === currentTrack?.temporaryId
      );

      if (isCurrentlyPlaying) {
        togglePlayPause();
        return;
      }

      const newTrack = addToPlaylist(track);
      setCurrentTrack(newTrack);
    },
    [playlist, currentTrack, addToPlaylist, setCurrentTrack, togglePlayPause]
  );

  const handleTemporaryIdTrack = useCallback(
    (track: PlaylistItem) => {
      const playlistTrack = playlist.find(
        (item) => item.temporaryId === track.temporaryId
      );

      if (playlistTrack) {
        setCurrentTrack(playlistTrack);
      }
    },
    [playlist, setCurrentTrack]
  );

  return {
    handleSourceTrack,
    handleTemporaryIdTrack,
  };
};

export default useTrackOperations;
