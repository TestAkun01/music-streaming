import { useCallback } from "react";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import useAudioStore from "@/store/audioStore";

export interface AdditionalController {
  handleVolumeChange: (volume: number) => void;
  handleLoopChange: () => void;
}

export default function useAdditionalController(): AdditionalController {
  const setLoop = useAudioStore((state) => state.setLoop);
  const loop = useAudioStore((state) => state.loop);
  const { setVolume } = useGlobalAudioPlayer();

  const handleVolumeChange = useCallback(
    (volume: number) => {
      setVolume(Math.max(0, Math.min(1, volume)));
    },
    [setVolume]
  );

  const handleLoopChange = useCallback(() => {
    setLoop(((loop + 1) % 3) as 0 | 1 | 2);
  }, [loop, setLoop]);

  return {
    handleVolumeChange,
    handleLoopChange,
  };
}
