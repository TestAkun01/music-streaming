"use client";

import { useEffect, useRef } from "react";
import useAudioPlayerStore from "@/stores/useAudioPlayerStore";
import { useGlobalAudioPlayer } from "react-use-audio-player";

export const useAudioPlayerEffects = () => {
  const { currentTrack, setCurrentTrack, handleEndTrack, trigger } =
    useAudioPlayerStore();

  const { load } = useGlobalAudioPlayer();

  const currentTrackRef = useRef(currentTrack);

  useEffect(() => {
    if (currentTrack) {
      load(currentTrack.file_url!, {
        autoplay: true,
        html5: true,
        format: "mp3",
        onend: handleEndTrack,
      });
    }
  }, [currentTrack, trigger, load, handleEndTrack]);

  useEffect(() => {
    return () => {
      setCurrentTrack(null);
    };
  }, [setCurrentTrack]);
};

export const AudioPlayerClient = () => {
  useAudioPlayerEffects();

  return <></>;
};
