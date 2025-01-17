import { RefObject, useCallback } from "react";
import PlaylistItem from "@/types/PlaylistItemType";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import { Track } from "@/services/Database/tracks_view";

const SKIP_DURATION = 5 as const;

export interface PlaybackController {
  handlePlayPause: (
    playSource?: "playlist" | "collection",
    track?: PlaylistItem | Track[]
  ) => void;
  handleNextTrack: () => void;
  handlePreviousTrack: () => void;
  handleSkipForward: () => void;
  handleSkipBackward: () => void;
}

interface Props {
  playlist: PlaylistItem[];
  currentTrack: PlaylistItem | null;
  setCurrentTrack: (track: PlaylistItem) => void;
  playlistRef: RefObject<PlaylistItem[] | null>;
  loopRef: RefObject<number | null>;
  currentTrackRef: RefObject<PlaylistItem | null>;
  trigger: number;
  setTrigger: (trigger: number) => void;
  currentTime: number;
  setCurrentTime: (currentTime: number) => void;
  handleAddToPlaylist: (
    tracks: Track[],
    resetPlaylist?: boolean
  ) => PlaylistItem[];
}

export default function usePlaybackController({
  playlist,
  currentTrack,
  setCurrentTrack,
  playlistRef,
  loopRef,
  currentTrackRef,
  trigger,
  setTrigger,
  currentTime,
  setCurrentTime,
  handleAddToPlaylist,
}: Props): PlaybackController {
  const { togglePlayPause, duration, seek } = useGlobalAudioPlayer();

  const handlePlaylistTrack = useCallback(
    (track: PlaylistItem) => {
      const playlistTrack = playlist.find((item) => item.id === track.id);
      if (playlistTrack === currentTrack) {
        togglePlayPause();
        return;
      }
      if (playlistTrack) {
        setCurrentTrack(playlistTrack);
      }
    },
    [playlist, setCurrentTrack, currentTrack, togglePlayPause]
  );

  const handleCollectionTracks = useCallback(
    (tracks: Track[]) => {
      const playlistTrack = playlist.find(
        (item) =>
          item.collection.id === tracks[0].collection.id &&
          item.id === currentTrack?.id
      );
      if (playlistTrack) {
        togglePlayPause();
        return;
      }

      const newPlaylist = handleAddToPlaylist(tracks, true);
      setCurrentTrack(newPlaylist[0]);
    },
    [
      playlist,
      handleAddToPlaylist,
      togglePlayPause,
      setCurrentTrack,
      currentTrack?.id,
    ]
  );

  const handlePlayPause = useCallback(
    (
      playSource?: "playlist" | "collection",
      track?: PlaylistItem | Track[]
    ) => {
      if (!playSource || !track) {
        togglePlayPause();
        return;
      }
      switch (playSource) {
        case "playlist":
          handlePlaylistTrack(track as PlaylistItem);
          break;
        case "collection":
          handleCollectionTracks(track as Track[]);
          break;
      }
    },
    [togglePlayPause, handlePlaylistTrack, handleCollectionTracks]
  );

  const handleNextTrack = useCallback(() => {
    const currentPlaylist = playlistRef?.current;
    const currentLoop = loopRef?.current;
    const currentTrackNow = currentTrackRef.current;

    if (!currentPlaylist || !currentTrackNow) return;

    const currentTrackIndex = currentPlaylist?.findIndex(
      (item) => item.id === currentTrackNow.id
    );

    if (currentTrackIndex === undefined) return;

    switch (currentLoop) {
      case 0:
        if (currentTrackIndex < currentPlaylist?.length - 1) {
          setCurrentTrack(currentPlaylist[currentTrackIndex + 1]);
          setTrigger(trigger + 1);
        }
        break;
      case 1:
        setCurrentTrack(
          currentPlaylist[(currentTrackIndex + 1) % currentPlaylist.length]
        );
        setTrigger(trigger + 1);
        break;
      case 2:
        setCurrentTrack(currentTrackNow);
        setTrigger(trigger + 1);
        break;
    }
  }, [
    playlistRef,
    trigger,
    loopRef,
    currentTrackRef,
    setCurrentTrack,
    setTrigger,
  ]);

  const handlePreviousTrack = useCallback(() => {
    if (!currentTrack || playlist.length === 0) return;

    const currentTrackIndex = playlist.findIndex(
      (item) => item.id === currentTrack.id
    );

    const previousTrack =
      playlist[(currentTrackIndex - 1 + playlist.length) % playlist.length];
    setCurrentTrack(previousTrack);
  }, [playlist, currentTrack, setCurrentTrack]);

  const handleSkipForward = useCallback(() => {
    const newTime = Math.min(currentTime + SKIP_DURATION, duration);
    seek(newTime);
    setCurrentTime(newTime);
  }, [currentTime, duration, seek, setCurrentTime]);

  const handleSkipBackward = useCallback(() => {
    const newTime = Math.max(currentTime - SKIP_DURATION, 0);
    seek(newTime);
    setCurrentTime(newTime);
  }, [currentTime, seek, setCurrentTime]);

  return {
    handlePlayPause,
    handleNextTrack,
    handlePreviousTrack,
    handleSkipForward,
    handleSkipBackward,
  };
}
