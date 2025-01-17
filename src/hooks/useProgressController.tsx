import { useCallback } from "react";
import { useGlobalAudioPlayer } from "react-use-audio-player";

export interface ProgressController {
  handleTimeChange: (time: number) => void;
  handleSeekStart: () => void;
  handleSeekEnd: () => void;
}

interface Props {
  currentTime: number;
  seekTime: number;
  setSeekTime: (time: number) => void;
  setCurrentTime: (time: number) => void;
  setIsSeeking: (isSeeking: boolean) => void;
}

export default function useProgressController({
  currentTime,
  seekTime,
  setSeekTime,
  setCurrentTime,
  setIsSeeking,
}: Props): ProgressController {
  const { seek } = useGlobalAudioPlayer();

  const handleTimeChange = useCallback(
    (time: number) => {
      setSeekTime(time);
      seek(time);
      setCurrentTime(time);
    },
    [setSeekTime, setCurrentTime, seek]
  );

  const handleSeekStart = useCallback(() => {
    setIsSeeking(true);
    setSeekTime(currentTime);
  }, [setIsSeeking, setSeekTime, currentTime]);

  const handleSeekEnd = useCallback(() => {
    setIsSeeking(false);
    seek(seekTime);
  }, [setIsSeeking, seek, seekTime]);

  return {
    handleTimeChange,
    handleSeekStart,
    handleSeekEnd,
  };
}
