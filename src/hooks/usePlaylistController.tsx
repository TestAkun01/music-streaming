import { useCallback } from "react";
import PlaylistItem from "@/types/PlaylistItemType";
import { v4 as uuidv4 } from "uuid";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import { Track } from "@/services/Database/tracks_view";

export interface PlaylistController {
  handleAddToPlaylist: (
    tracks: Track[],
    resetPlaylist?: boolean
  ) => PlaylistItem[];
  handleRemoveFromPlaylist: (id: number) => void;
  handleClearPlaylist: () => void;
}

interface Props {
  playlist: PlaylistItem[];
  currentTrack: PlaylistItem | null;
  setPlaylist: (playlist: PlaylistItem[]) => void;
  setCurrentTrack: (track: PlaylistItem | null) => void;
  setCurrentTime: (time: number) => void;
}

export default function usePlaylistController({
  playlist,
  currentTrack,
  setPlaylist,
  setCurrentTrack,
  setCurrentTime,
}: Props): PlaylistController {
  const { stop } = useGlobalAudioPlayer();

  const findNextTrack = useCallback(
    (removedTrackId: number) => {
      if (!currentTrack || playlist.length <= 1) return null;
      const currentIndex = playlist.findIndex(
        (track) => track.id === removedTrackId
      );
      if (currentIndex < playlist.length - 1) {
        return playlist[currentIndex + 1];
      }
      return playlist[0];
    },
    [currentTrack, playlist]
  );

  const removeFromPlaylist = useCallback(
    (id: number) => {
      setPlaylist(playlist.filter((item) => item.id !== id));
    },
    [playlist, setPlaylist]
  );

  const handleAddToPlaylist = useCallback(
    (tracks: Track[], resetPlaylist?: boolean) => {
      const newTracks = tracks.map((track) => ({
        ...track,
        playlist_id: uuidv4(),
      }));
      if (resetPlaylist) {
        setPlaylist(newTracks);
        return newTracks;
      }
      setPlaylist([...playlist, ...newTracks]);
      return newTracks;
    },
    [playlist, setPlaylist]
  );

  const handleRemoveFromPlaylist = useCallback(
    (id: number) => {
      if (id === currentTrack?.id) {
        const nextTrack = findNextTrack(id);
        if (nextTrack) {
          removeFromPlaylist(id);
          setCurrentTrack(nextTrack);
        } else {
          stop();
          setCurrentTrack(null);
          setCurrentTime(0);
          removeFromPlaylist(id);
        }
      } else {
        removeFromPlaylist(id);
      }
    },
    [
      currentTrack,
      findNextTrack,
      removeFromPlaylist,
      setCurrentTrack,
      setCurrentTime,
    ]
  );

  const handleClearPlaylist = useCallback(() => {
    stop();
    setCurrentTime(0);
    setPlaylist([]);
    setCurrentTrack(null);
  }, [setPlaylist, setCurrentTrack]);

  return {
    handleAddToPlaylist,
    handleRemoveFromPlaylist,
    handleClearPlaylist,
  };
}
