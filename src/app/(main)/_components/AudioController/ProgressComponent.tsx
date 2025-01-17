import useAudioController from "@/hooks/useAudioController";
import useAudioTime from "@/hooks/useAudioTime";
import { formatTime } from "@/utils/formatTime";
import Slider from "rc-slider";
import React from "react";

export default function ProgressComponent() {
  const { duration, handleTimeChange } = useAudioController();
  const pos = useAudioTime();

  return (
    <>
      <span className="text-gray-50 text-sm">
        {pos ? formatTime(pos) : "00:00"}
      </span>
      <Slider
        className="w-full"
        min={0}
        max={duration}
        value={pos}
        styles={{
          track: { backgroundColor: "#f97316" },
          rail: { backgroundColor: "#393E46" },
          handle: {
            backgroundColor: "#f97316",
            opacity: 1,
            border: "none",
            boxShadow: "none",
          },
        }}
        onChange={(value) => handleTimeChange(value as number)}
      />
      <span className="text-gray-50 text-sm">
        {duration ? formatTime(duration) : "00:00"}
      </span>
    </>
  );
}
