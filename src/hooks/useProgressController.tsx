import { useCallback } from "react";
import useAudioStore from "@/store/audioStore";
import { useGlobalAudioPlayer } from "react-use-audio-player";
export interface ProgressController {
  handleTimeChange: (time: number) => void;
  handleSeekStart: () => void;
  handleSeekEnd: () => void;
}
export default function useProgressController(): ProgressController {
  const { setSeekTime, setCurrentTime, setIsSeeking, currentTime, seekTime } =
    useAudioStore();
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
