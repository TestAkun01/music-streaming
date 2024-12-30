"use client";

import { Repeat } from "@phosphor-icons/react/Repeat";
import { RepeatOnce } from "@phosphor-icons/react/RepeatOnce";
import { SkipBack } from "@phosphor-icons/react/SkipBack";
import { SkipForward } from "@phosphor-icons/react/SkipForward";
import { Play } from "@phosphor-icons/react/Play";
import { Pause } from "@phosphor-icons/react/Pause";
import { SpeakerNone } from "@phosphor-icons/react/SpeakerNone";
import { SpeakerLow } from "@phosphor-icons/react/SpeakerLow";
import { SpeakerHigh } from "@phosphor-icons/react/SpeakerHigh";
import { Rewind } from "@phosphor-icons/react/Rewind";
import { FastForward } from "@phosphor-icons/react/FastForward";

import { useAudioContext } from "@/providers/AudioProvider";
import { formatTime } from "@/utils/formatTime";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const AudioController = () => {
  const {
    playing,
    duration,
    volume,
    currentTime,
    currentTrack,
    loop,
    handlePlayPause,
    handleLoopChange,
    handleSeekEnd,
    handleSeekStart,
    handleSkipBackward,
    handleSkipForward,
    handleTimeChange,
    handleVolumeChange,
    handleNextTrack,
    handlePreviousTrack,
  } = useAudioContext();

  return (
    <div className="w-full mx-auto backdrop-blur-lg bg-zinc-950 px-6 py-3 items-center space-y-2 absolute bottom-0">
      <div className="flex items-center gap-4 flex-grow">
        <span className="text-gray-50 text-sm">
          {currentTime ? formatTime(currentTime) : "00:00"}
        </span>
        <Slider
          className="w-full"
          min={0}
          max={duration}
          value={currentTime}
          styles={{
            track: { backgroundColor: "#00ADB5" },
            rail: { backgroundColor: "#393E46" },
            handle: { backgroundColor: "#00ADB5", opacity: 1, border: "none" },
          }}
          onChange={(value) => handleTimeChange(value as number)}
        />
        <span className="text-gray-50 text-sm">
          {duration ? formatTime(duration) : "00:00"}
        </span>
      </div>

      <div className="flex gap-2">
        {/* Now Playing */}
        <div className="flex items-center justify-start w-2/12">
          <span className="text-sm text-gray-300">
            Now Playing: {currentTrack ? currentTrack.source : "No Track"}
          </span>
        </div>

        {/* Playback Controls */}
        <div className="w-8/12 flex justify-center items-center gap-2">
          <button
            className="btn btn-sm btn-circle hover:bg-transparent bg-transparent text-gray-50 hover:text-gray-300 border-none"
            onClick={handlePreviousTrack}>
            <SkipBack size={24} />
          </button>

          <button
            className="btn btn-sm btn-circle hover:bg-transparent bg-transparent text-gray-50 hover:text-gray-300 border-none"
            onClick={handleSkipBackward}>
            <Rewind size={24} />
          </button>

          <button
            className="btn btn-circle btn-outline hover:bg-transparent text-gray-50 hover:text-gray-300"
            onClick={() => handlePlayPause()}>
            {playing ? <Pause size={28} /> : <Play size={28} />}
          </button>

          <button
            className="btn  btn-sm btn-circle hover:bg-transparent bg-transparent text-gray-50 hover:text-gray-300 border-none"
            onClick={handleSkipForward}>
            <FastForward size={24} />
          </button>

          <button
            className="btn  btn-sm btn-circle hover:bg-transparent bg-transparent text-gray-50 hover:text-gray-300 border-none"
            onClick={handleNextTrack}>
            <SkipForward size={24} />
          </button>
        </div>

        {/* Additional Controls */}
        <div className="flex justify-end items-center gap-2 w-2/12">
          <button
            onClick={() => handleVolumeChange(volume === 0 ? 1 : 0)}
            className="btn  btn-sm btn-circle hover:bg-transparent bg-transparent text-gray-50 hover:text-gray-300 border-none">
            {volume === 0 ? (
              <SpeakerNone size={20} />
            ) : volume <= 0.5 ? (
              <SpeakerLow size={20} />
            ) : (
              <SpeakerHigh size={20} />
            )}
          </button>
          <Slider
            min={0}
            max={1}
            step={0.01}
            value={volume}
            className="slider"
            onChange={(value) => handleVolumeChange(value as number)}
            styles={{
              track: { backgroundColor: "#00ADB5" },
              rail: { backgroundColor: "#393E46" },
              handle: {
                backgroundColor: "#00ADB5",
                opacity: 1,
                border: "none",
              },
            }}
          />
          <button
            className={`btn btn-sm btn-circle hover:bg-transparent bg-transparent border-none ${
              loop != 0
                ? "text-blue-400 hover:text-blue-500"
                : "text-gray-50 hover:text-gray-300"
            }`}
            onClick={handleLoopChange}>
            {loop !== 2 ? <Repeat size={20} /> : <RepeatOnce size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioController;
