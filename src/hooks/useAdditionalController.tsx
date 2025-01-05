import { useGlobalAudioPlayer } from "react-use-audio-player";
import useAudioStore from "@/store/audioStore";

export interface AdditionalController {
  handleVolumeChange: (volume: number) => void;
  handleLoopChange: () => void;
}

export default function useAdditionalController(): AdditionalController {
  const { loop, setLoop } = useAudioStore();
  const { setVolume } = useGlobalAudioPlayer();

  const handleVolumeChange = (volume: number) => {
    setVolume(Math.max(0, Math.min(1, volume)));
  };

  const handleLoopChange = () => {
    setLoop(((loop + 1) % 3) as 0 | 1 | 2);
  };

  return {
    handleVolumeChange,
    handleLoopChange,
  };
}
