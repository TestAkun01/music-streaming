"use client";
import { useCallback, useEffect, useMemo } from "react";
import useAdditionalController from "@/hooks/useAdditionalController";
import useProgressController from "@/hooks/useProgressController";
import usePlaybackController from "@/hooks/usePlaybackController";
import usePlaylistController from "@/hooks/usePlaylistController";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import useAudioStore from "@/store/audioStore";

const UPDATE_TIME_INTERVAL = 500 as const;

export default function useAudioController() {
  const {
    currentTime,
    setCurrentTime,
    seekTime,
    setSeekTime,
    isSeeking,
    setIsSeeking,
    loop,
    setLoop,
    trigger,
    setTrigger,
    playlist,
    setPlaylist,
    playlistIsOpen,
    setPlaylistIsOpen,
    currentTrack,
    setCurrentTrack,
    currentTrackRef,
    isSeekingRef,
    playlistRef,
    loopRef,
  } = useAudioStore();

  const { handleTimeChange, handleSeekStart, handleSeekEnd } =
    useProgressController();

  const {
    handlePlayPause,
    handleNextTrack,
    handlePreviousTrack,
    handleSkipForward,
    handleSkipBackward,
  } = usePlaybackController();

  const {
    handleAddToPlaylist,
    handleRemoveFromPlaylist,
    handleClearPlaylist,
    handleTogglePlaylistIsOpen,
  } = usePlaylistController();

  const { handleVolumeChange, handleLoopChange } = useAdditionalController();

  const { duration, playing, volume, isLoading, isReady, load, getPosition } =
    useGlobalAudioPlayer();

  const updateCurrentTime = useCallback(() => {
    if (!isSeekingRef.current) {
      const currentTimeNow = parseFloat(getPosition().toFixed(2));
      setCurrentTime(currentTimeNow);
    }
  }, [isSeekingRef, getPosition, setCurrentTime]);

  useEffect(() => {
    loopRef.current = loop;
    playlistRef.current = playlist;
  }, [loop, playlist]);

  useEffect(() => {
    if (
      currentTrack &&
      currentTrackRef.current?.temporaryId !== currentTrack.temporaryId
    ) {
      console.log("get called");
      console.log(currentTrack.file_url);

      let intervalId: NodeJS.Timeout;
      load(currentTrack.file_url, {
        autoplay: true,
        html5: true,
        format: "mp3",
        onload: () => {
          intervalId = setInterval(updateCurrentTime, UPDATE_TIME_INTERVAL);
        },
        onend: handleNextTrack,
      });
      currentTrackRef.current = currentTrack;

      return () => {
        if (intervalId) {
          clearInterval(intervalId);
        }
      };
    }
  }, [
    currentTrack?.temporaryId,
    trigger,
    updateCurrentTime,
    load,
    handleNextTrack,
  ]);

  const handler = useMemo(
    () => ({
      duration,
      playing,
      volume,
      isLoading,
      isReady,
      currentTime,
      setCurrentTime,
      seekTime,
      setSeekTime,
      isSeeking,
      setIsSeeking,
      loop,
      setLoop,
      trigger,
      setTrigger,
      playlist,
      setPlaylist,
      playlistIsOpen,
      setPlaylistIsOpen,
      currentTrack,
      setCurrentTrack,
      currentTrackRef,
      isSeekingRef,
      playlistRef,
      loopRef,
      handleTimeChange,
      handleSeekStart,
      handleSeekEnd,
      handlePlayPause,
      handleNextTrack,
      handlePreviousTrack,
      handleSkipForward,
      handleSkipBackward,
      handleVolumeChange,
      handleLoopChange,
      handleAddToPlaylist,
      handleRemoveFromPlaylist,
      handleClearPlaylist,
      handleTogglePlaylistIsOpen,
    }),
    [
      duration,
      playing,
      volume,
      isLoading,
      isReady,
      playlistIsOpen,
      loop,
      trigger,
      playlist,
      currentTrack,
      currentTime,
      seekTime,
      handleTimeChange,
      handleSeekStart,
      handleSeekEnd,
      handlePlayPause,
      handleNextTrack,
      handlePreviousTrack,
      handleSkipForward,
      handleSkipBackward,
      handleVolumeChange,
      handleLoopChange,
      handleAddToPlaylist,
      handleRemoveFromPlaylist,
      handleClearPlaylist,
      handleTogglePlaylistIsOpen,
    ]
  );
  return handler;
}
