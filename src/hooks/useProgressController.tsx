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

  const handleTimeChange = (time: number) => {
    setSeekTime(time);
    seek(time);
    setCurrentTime(time);
  };

  const handleSeekStart = () => {
    setIsSeeking(true);
    setSeekTime(currentTime);
  };

  const handleSeekEnd = () => {
    setIsSeeking(false);
    seek(seekTime);
  };

  return {
    handleTimeChange,
    handleSeekStart,
    handleSeekEnd,
  };
}
