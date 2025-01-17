"use client";
import { useCallback, useEffect, useMemo, useRef } from "react";
import useAdditionalController from "@/hooks/useAdditionalController";
import useProgressController from "@/hooks/useProgressController";
import usePlaybackController from "@/hooks/usePlaybackController";
import usePlaylistController from "@/hooks/usePlaylistController";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import useAudioStore from "@/store/audioStore";

export default function useAudioController() {
  const currentTime = useAudioStore((state) => state.currentTime);
  const setCurrentTime = useAudioStore((state) => state.setCurrentTime);
  const seekTime = useAudioStore((state) => state.seekTime);
  const setSeekTime = useAudioStore((state) => state.setSeekTime);
  const isSeeking = useAudioStore((state) => state.isSeeking);
  const setIsSeeking = useAudioStore((state) => state.setIsSeeking);
  const loop = useAudioStore((state) => state.loop);
  const setLoop = useAudioStore((state) => state.setLoop);
  const trigger = useAudioStore((state) => state.trigger);
  const setTrigger = useAudioStore((state) => state.setTrigger);
  const playlist = useAudioStore((state) => state.playlist);
  const setPlaylist = useAudioStore((state) => state.setPlaylist);
  const currentTrack = useAudioStore((state) => state.currentTrack);
  const setCurrentTrack = useAudioStore((state) => state.setCurrentTrack);
  const currentTrackRef = useAudioStore((state) => state.currentTrackRef);
  const playlistRef = useAudioStore((state) => state.playlistRef);
  const loopRef = useAudioStore((state) => state.loopRef);

  const { handleTimeChange, handleSeekStart, handleSeekEnd } =
    useProgressController({
      currentTime,
      seekTime,
      setSeekTime,
      setCurrentTime,
      setIsSeeking,
    });

  const { handleAddToPlaylist, handleRemoveFromPlaylist, handleClearPlaylist } =
    usePlaylistController({
      playlist,
      currentTrack,
      setPlaylist,
      setCurrentTrack,
      setCurrentTime,
    });

  const {
    handlePlayPause,
    handleNextTrack,
    handlePreviousTrack,
    handleSkipForward,
    handleSkipBackward,
  } = usePlaybackController({
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
  });

  const { handleVolumeChange, handleLoopChange } = useAdditionalController({
    loop,
    setLoop,
  });

  const { duration, playing, volume, isLoading, isReady, load } =
    useGlobalAudioPlayer();

  useEffect(() => {
    loopRef.current = loop;
    playlistRef.current = playlist;
  }, [loop, playlist]);

  useEffect(() => {
    if (currentTrack && currentTrackRef.current?.id !== currentTrack.id) {
      load(currentTrack.file_url!, {
        autoplay: true,
        html5: true,
        format: "mp3",
        onend: handleNextTrack,
      });
      currentTrackRef.current = currentTrack;
    }
  }, [currentTrack?.id, trigger, load, handleNextTrack]);

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
      currentTrack,
      setCurrentTrack,
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
    }),
    [
      duration,
      playing,
      volume,
      isLoading,
      isReady,
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
    ]
  );
  return handler;
}
