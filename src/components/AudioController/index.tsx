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
import useAudioController from "@/hooks/useAudioController";
import { Playlist } from "@phosphor-icons/react/Playlist";
import { formatTime } from "@/utils/formatTime";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const AudioController = () => {
  const {
    playing,
    duration,
    volume,
    isLoading,
    isReady,
    currentTime,
    currentTrack,
    loop,
    playlistIsOpen,
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
    handleTogglePlaylistIsOpen,
  } = useAudioController();

  return (
    <div className="w-full bg-zinc-950 px-6 py-3 space-y-2 absolute bottom-0">
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
      </div>

      <div className="flex gap-2">
        {/* Now Playing */}
        <div className="flex items-center justify-start w-1/4 overflow-hidden">
          <span className="text-sm text-gray-300">
            Now Playing: {currentTrack ? currentTrack.title : "No Track"}
          </span>
        </div>

        {/* Playback Controls */}
        <div className="w-8/12 flex justify-center items-center gap-2">
          <button
            className="btn btn-sm btn-circle hover:bg-transparent bg-transparent text-gray-50 hover:text-gray-300 border-none"
            onClick={handlePreviousTrack}>
            <SkipBack weight="bold" size={24} />
          </button>

          <button
            className="btn btn-sm btn-circle hover:bg-transparent bg-transparent text-gray-50 hover:text-gray-300 border-none"
            onClick={handleSkipBackward}>
            <Rewind weight="bold" size={24} />
          </button>

          <button
            className="btn btn-circle btn-outline hover:bg-transparent text-gray-50 hover:text-gray-300"
            onClick={() => handlePlayPause()}
            disabled={isLoading} // Disable tombol saat loading atau belum siap
          >
            {isLoading ? (
              <span className="loading loading-spinner text-gray-50"></span>
            ) : playing ? (
              <Pause weight="bold" size={24} />
            ) : (
              <Play weight="bold" size={24} />
            )}
          </button>

          <button
            className="btn  btn-sm btn-circle hover:bg-transparent bg-transparent text-gray-50 hover:text-gray-300 border-none"
            onClick={handleSkipForward}>
            <FastForward weight="bold" size={24} />
          </button>

          <button
            className="btn  btn-sm btn-circle hover:bg-transparent bg-transparent text-gray-50 hover:text-gray-300 border-none"
            onClick={handleNextTrack}>
            <SkipForward weight="bold" size={24} />
          </button>
        </div>

        {/* Additional Controls */}
        <div className="flex justify-end items-center gap-4 w-1/4">
          <button
            onClick={() => handleVolumeChange(volume === 0 ? 1 : 0)}
            className="btn btn-sm btn-circle hover:bg-transparent bg-transparent text-gray-50 hover:text-gray-300 border-none">
            {volume === 0 ? (
              <SpeakerNone weight="bold" size={24} />
            ) : volume <= 0.5 ? (
              <SpeakerLow weight="bold" size={24} />
            ) : (
              <SpeakerHigh weight="bold" size={24} />
            )}
          </button>
          <Slider
            min={0}
            max={1}
            step={0.01}
            value={volume}
            className="w-24"
            onChange={(value) => handleVolumeChange(value as number)}
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
          />
          <button
            className={`btn btn-sm btn-circle hover:bg-transparent bg-transparent border-none ${
              loop != 0
                ? "text-orange-500 hover:text-orange-700"
                : "text-gray-50 hover:text-gray-300"
            }`}
            onClick={handleLoopChange}>
            {loop !== 2 ? (
              <Repeat weight="bold" size={24} />
            ) : (
              <RepeatOnce weight="bold" size={24} />
            )}
          </button>
          <button
            className={`btn btn-sm btn-circle hover:bg-transparent bg-transparent border-none ${
              playlistIsOpen
                ? "text-orange-500 hover:text-orange-700"
                : "text-gray-50 hover:text-gray-300"
            }`}
            onClick={handleTogglePlaylistIsOpen}>
            <Playlist weight="bold" size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioController;