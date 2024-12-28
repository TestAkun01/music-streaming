"use client";

import {
  Repeat as RepeatIcon,
  RepeatOne as RepeatOneIcon,
  SkipPrevious as SkipPreviousIcon,
  SkipNext as SkipNextIcon,
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
  VolumeUp as VolumeUpIcon,
  VolumeOff as VolumeOffIcon,
  FastForward as FastForwardIcon,
  FastRewind as FastRewindIcon,
} from "@mui/icons-material";
import { useAudioContext } from "@/providers/AudioProvider";
import { formatTime } from "@/utils/formatTime";

const AudioController: React.FC = () => {
  const {
    playing,
    duration,
    volume,
    currentTime,
    playlist,
    currentId,
    loop,
    handlePlayPause,
    handleLoopChange,
    handleDragEnd,
    handleDragStart,
    handleSkipBackward,
    handleSkipForward,
    handleTimeChange,
    handleVolumeChange,
    handleNextTrack,
    handlePreviousTrack,
  } = useAudioContext();

  const currentTrack = playlist.find((item) => item.id === currentId); // Menampilkan nama track yang sedang diputar

  return (
    <div className="w-full mx-auto bg-white p-3 rounded-lg shadow-lg">
      <div className="mb-3">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs text-gray-500 w-10 text-right">
            {currentTime ? formatTime(currentTime) : "00:00"}
          </span>
          <div className="flex-1">
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleTimeChange}
              // onMouseDown={handleDragStart}
              // onMouseUp={handleDragEnd}
              onTouchStart={handleDragStart}
              onTouchEnd={handleDragEnd}
              className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <span className="text-xs text-gray-500 w-10">
            {duration ? formatTime(duration) : "00:00"}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="w-1/4 flex justify-start">
          <button
            className={`p-2 transition-colors ${
              loop != 0 ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => handleLoopChange()}>
            {loop == 1 ? (
              <RepeatOneIcon className="w-5 h-5" />
            ) : (
              <RepeatIcon className="w-5 h-5" />
            )}
          </button>
        </div>

        <div className="w-2/4 flex items-center justify-center gap-4">
          <button
            className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
            onClick={handlePreviousTrack} // Ke track sebelumnya
          >
            <SkipPreviousIcon className="w-6 h-6" />
          </button>
          <button
            className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
            onClick={handleSkipBackward} // Melompat mundur dalam lagu
          >
            <FastRewindIcon className="w-6 h-6" />
          </button>

          <button
            className="p-3 bg-gray-900 text-white rounded-full hover:bg-gray-700 transition-colors"
            onClick={() => handlePlayPause()}>
            {playing ? (
              <PauseIcon className="w-7 h-7" />
            ) : (
              <PlayArrowIcon className="w-7 h-7" />
            )}
          </button>

          <button
            className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
            onClick={handleSkipForward}>
            <FastForwardIcon className="w-6 h-6" />
          </button>
          <button
            className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
            onClick={handleNextTrack}>
            <SkipNextIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="w-1/4 flex items-center justify-end gap-3">
          <div className="flex items-center gap-2">
            {volume === 0 ? (
              <VolumeOffIcon className="w-5 h-5 text-gray-600" />
            ) : (
              <VolumeUpIcon className="w-5 h-5 text-gray-600" />
            )}
            <input
              type="range"
              min="0"
              max="100"
              value={volume * 100}
              onChange={handleVolumeChange}
              className="w-16 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="mt-3 text-center text-gray-600 text-sm">
        <span>
          Now Playing: {currentTrack ? currentTrack.source : "No Track"}
        </span>
      </div>
    </div>
  );
};

export default AudioController;
