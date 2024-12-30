"use client";

import {
  Repeat,
  RepeatOnce,
  SkipBack,
  SkipForward,
  Play,
  Pause,
  SpeakerHigh,
  SpeakerNone,
  Rewind,
  FastForward,
} from "@phosphor-icons/react";
import { useAudioContext } from "@/providers/AudioProvider";
import { formatTime } from "@/utils/formatTime";

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
    <div className="w-full mx-auto bg-gray-800 p-4 rounded-lg shadow-lg">
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">
            {currentTime ? formatTime(currentTime) : "00:00"}
          </span>
          <input
            type="range"
            className="range range-xs flex-1"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={(e) => handleTimeChange(e)}
          />
          <span className="text-gray-400 text-sm">
            {duration ? formatTime(duration) : "00:00"}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="w-1/4 flex justify-start">
          <button className="btn btn-circle btn-sm" onClick={handleLoopChange}>
            {loop === 1 ? (
              <RepeatOnce size={20} className="text-gray-400" />
            ) : (
              <Repeat size={20} className="text-gray-400" />
            )}
          </button>
        </div>

        <div className="w-2/4 flex items-center justify-center gap-2">
          <button
            className="btn btn-circle btn-sm"
            onClick={handlePreviousTrack}>
            <SkipBack size={24} className="text-gray-400" />
          </button>

          <button
            className="btn btn-circle btn-sm"
            onClick={handleSkipBackward}>
            <Rewind size={24} className="text-gray-400" />
          </button>

          <button
            className="btn btn-circle btn-primary btn-lg"
            onClick={() => handlePlayPause()}>
            {playing ? <Pause size={28} /> : <Play size={28} />}
          </button>

          <button className="btn btn-circle btn-sm" onClick={handleSkipForward}>
            <FastForward size={24} className="text-gray-400" />
          </button>

          <button className="btn btn-circle btn-sm" onClick={handleNextTrack}>
            <SkipForward size={24} className="text-gray-400" />
          </button>
        </div>

        <div className="w-1/4 flex justify-end items-center gap-2">
          <button className="btn btn-circle btn-sm">
            {volume === 0 ? (
              <SpeakerNone size={20} className="text-gray-400" />
            ) : (
              <SpeakerHigh size={20} className="text-gray-400" />
            )}
          </button>
          <input
            type="range"
            className="range range-xs w-32"
            min="0"
            max="100"
            value={volume * 100}
            onChange={(e) => handleVolumeChange(e)}
          />
        </div>
      </div>

      <div className="mt-4 text-center text-gray-400 text-sm">
        <span>
          Now Playing: {currentTrack ? currentTrack.source : "No Track"}
        </span>
      </div>
    </div>
  );
};

export default AudioController;
