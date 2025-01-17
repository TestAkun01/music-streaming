import { useCallback } from "react";
import { useGlobalAudioPlayer } from "react-use-audio-player";

export interface AdditionalController {
  handleVolumeChange: (volume: number) => void;
  handleLoopChange: () => void;
}

interface Props {
  loop: number;
  setLoop: (loop: 0 | 1 | 2) => void;
}

export default function useAdditionalController({
  loop,
  setLoop,
}: Props): AdditionalController {
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
