import { useCallback } from "react";
import { Tables } from "@/types/DatabaseType";
import PlaylistItem from "@/types/PlaylistItemType";

import { useGlobalAudioPlayer } from "react-use-audio-player";
import useAudioStore from "@/store/audioStore";
import usePlaylistController from "./usePlaylistController";

const LOOP_STATES = {
  NO_LOOP: 0,
  LOOP_PLAYLIST: 1,
  LOOP_TRACK: 2,
} as const;

const SKIP_DURATION = 5 as const;

export interface PlaybackController {
  handlePlayPause: (
    playSource?: "playlist" | "external" | "collection",
    track?: PlaylistItem | Tables<"tracks"> | Tables<"tracks">[]
  ) => void;
  handleNextTrack: () => void;
  handlePreviousTrack: () => void;
  handleSkipForward: () => void;
  handleSkipBackward: () => void;
}

export default function usePlaybackController(): PlaybackController {
  const {
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
  } = useAudioStore();
  const { togglePlayPause, duration, seek } = useGlobalAudioPlayer();
  const { handleAddToPlaylist } = usePlaylistController();

  const handleExternalTrack = useCallback(
    (track: Tables<"tracks">) => {
      const isCurrentlyPlaying = playlist.some(
        (item) =>
          item.file_url === track.file_url &&
          item.temporaryId === currentTrack?.temporaryId
      );

      if (isCurrentlyPlaying) {
        togglePlayPause();
        return;
      }

      const newTrack = handleAddToPlaylist(track, true);
      setCurrentTrack(newTrack[0]);
    },
    [
      playlist,
      currentTrack,
      togglePlayPause,
      handleAddToPlaylist,
      setCurrentTrack,
    ]
  );

  const handlePlaylistTrack = useCallback(
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

  const handleCollectionTracks = useCallback(
    (tracks: Tables<"tracks">[]) => {
      if (!tracks.length) return;

      const newPlaylist = handleAddToPlaylist(tracks, true);
      setCurrentTrack(newPlaylist[0]);
    },
    [handleAddToPlaylist, setCurrentTrack]
  );

  const handlePlayPause = useCallback(
    (
      playSource?: "playlist" | "external" | "collection",
      track?: PlaylistItem | Tables<"tracks"> | Tables<"tracks">[]
    ) => {
      if (!playSource) {
        togglePlayPause();
        return;
      }

      if (!track) return;

      switch (playSource) {
        case "playlist":
          handlePlaylistTrack(track as PlaylistItem);
          break;
        case "external":
          handleExternalTrack(track as Tables<"tracks">);
          break;
        case "collection":
          handleCollectionTracks(track as Tables<"tracks">[]);
          break;
      }
    },
    [
      togglePlayPause,
      handlePlaylistTrack,
      handleExternalTrack,
      handleCollectionTracks,
    ]
  );

  const handleNextTrack = useCallback(() => {
    const currentPlaylist = playlistRef.current;
    const currentLoop = loopRef.current;
    const currentTrackNow = currentTrackRef.current;

    if (!currentPlaylist || !currentTrackNow) return;

    const currentTrackIndex = currentPlaylist?.findIndex(
      (item) => item.temporaryId === currentTrackNow.temporaryId
    );

    if (currentTrackIndex === undefined) return;

    switch (currentLoop) {
      case LOOP_STATES.NO_LOOP:
        if (currentTrackIndex < currentPlaylist?.length - 1) {
          setCurrentTrack(currentPlaylist[currentTrackIndex + 1]);
          setTrigger(trigger + 1);
        }
        break;
      case LOOP_STATES.LOOP_PLAYLIST:
        setCurrentTrack(
          currentPlaylist[(currentTrackIndex + 1) % currentPlaylist.length]
        );
        setTrigger(trigger + 1);
        break;
      case LOOP_STATES.LOOP_TRACK:
        setCurrentTrack(currentTrackNow);
        setTrigger(trigger + 1);
        break;
    }
  }, [
    playlistRef,
    loopRef,
    currentTrackRef,
    setCurrentTrack,
    setTrigger,
    playlist,
    currentTrack,
  ]);

  const handlePreviousTrack = useCallback(() => {
    if (!currentTrack || playlist.length === 0) return;

    const currentTrackIndex = playlist.findIndex(
      (item) => item.temporaryId === currentTrack.temporaryId
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
