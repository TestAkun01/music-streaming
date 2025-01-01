"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const useAudioTiming = (getPosition: () => number) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const isSeekingRef = useRef(isSeeking);

  useEffect(() => {
    isSeekingRef.current = isSeeking;
  }, [isSeeking]);

  const updateCurrentTime = useCallback(() => {
    if (!isSeekingRef.current) {
      const currentTimeNow = parseFloat(getPosition().toFixed(2));
      setCurrentTime(currentTimeNow);
    }
  }, [getPosition]);

  return {
    currentTime,
    seekTime,
    isSeeking,
    setCurrentTime,
    setSeekTime,
    setIsSeeking,
    updateCurrentTime,
  };
};

export default useAudioTiming;
