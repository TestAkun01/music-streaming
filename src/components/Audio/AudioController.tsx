"use client";

import {
  Repeat,
  RepeatOne,
  SkipPrevious,
  SkipNext,
  PlayArrow,
  Pause,
  VolumeUp,
  VolumeOff,
  FastForward,
  FastRewind,
} from "@mui/icons-material";
import { IconButton, Slider, Typography, Box, Button } from "@mui/material";
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
    handleSeekEnd,
    handleSeekStart,
    handleSkipBackward,
    handleSkipForward,
    handleTimeChange,
    handleVolumeChange,
    handleNextTrack,
    handlePreviousTrack,
  } = useAudioContext();

  const currentTrack = playlist.find((item) => item.id === currentId); // Menampilkan nama track yang sedang diputar

  return (
    <div className="w-full mx-auto bg-gray-900 p-4 rounded-lg shadow-lg">
      <div className="mb-3">
        <div className="flex items-center gap-2 mb-1">
          <Typography variant="body2" className="text-gray-400 w-10 text-right">
            {currentTime ? formatTime(currentTime) : "00:00"}
          </Typography>
          <div className="flex-1 px-2">
            <Slider
              value={currentTime}
              min={0}
              max={duration}
              onChange={handleTimeChange}
              // onTouchStart={handleSeekStart}
              // onTouchEnd={handleSeekEnd}
              sx={{
                color: "#1DB954",
                height: 2,
                "& .MuiSlider-thumb": {
                  backgroundColor: "#fff",
                  width: 16,
                  height: 16,
                },
                "& .MuiSlider-rail": {
                  backgroundColor: "#4a4a4a",
                },
              }}
            />
          </div>
          <Typography variant="body2" className="text-gray-400 w-10">
            {duration ? formatTime(duration) : "00:00"}
          </Typography>
        </div>
      </div>

      <div className="flex items-center justify-between">
        {/* Loop Control - Left Side (1/4) */}
        <div className="w-1/4 flex justify-start">
          <IconButton
            onClick={handleLoopChange}
            color={loop !== 0 ? "primary" : "default"}
            sx={{
              color: loop !== 0 ? "#1DB954" : "gray",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}>
            {loop === 1 ? (
              <RepeatOne className="w-5 h-5" />
            ) : (
              <Repeat className="w-5 h-5" />
            )}
          </IconButton>
        </div>

        {/* Center Controls (Play, Previous, Skip, Next, etc. - 2/4) */}
        <div className="w-2/4 flex items-center justify-center gap-4">
          <IconButton
            onClick={handlePreviousTrack}
            sx={{
              color: "gray",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
            }}>
            <SkipPrevious className="w-6 h-6" />
          </IconButton>

          <IconButton
            onClick={handleSkipBackward}
            sx={{
              color: "gray",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
            }}>
            <FastRewind className="w-6 h-6" />
          </IconButton>

          <Button
            variant="contained"
            color="primary"
            sx={{
              padding: "12px",
              borderRadius: "50%",
              backgroundColor: "#1DB954",
              "&:hover": {
                backgroundColor: "#1aa34a",
              },
            }}
            onClick={() => handlePlayPause()}>
            {playing ? (
              <Pause className="w-7 h-7" />
            ) : (
              <PlayArrow className="w-7 h-7" />
            )}
          </Button>

          <IconButton
            onClick={handleSkipForward}
            sx={{
              color: "gray",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
            }}>
            <FastForward className="w-6 h-6" />
          </IconButton>

          <IconButton
            onClick={handleNextTrack}
            sx={{
              color: "gray",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
            }}>
            <SkipNext className="w-6 h-6" />
          </IconButton>
        </div>

        {/* Volume Control - Right Side (1/4) */}
        <div className="w-1/4 flex justify-end items-center gap-2">
          <IconButton sx={{ color: volume === 0 ? "gray" : "#1DB954" }}>
            {volume === 0 ? (
              <VolumeOff className="w-5 h-5" />
            ) : (
              <VolumeUp className="w-5 h-5" />
            )}
          </IconButton>
          <div className="px-2">
            <Slider
              value={volume * 100}
              min={0}
              max={100}
              onChange={handleVolumeChange}
              sx={{
                width: 100,
                color: "#1DB954",
                "& .MuiSlider-thumb": {
                  backgroundColor: "#fff",
                  width: 16,
                  height: 16,
                },
                "& .MuiSlider-rail": {
                  backgroundColor: "#4a4a4a",
                },
              }}
            />
          </div>
        </div>
      </div>

      <div className="mt-3 text-center text-gray-400 text-sm">
        <span>
          Now Playing: {currentTrack ? currentTrack.source : "No Track"}
        </span>
      </div>
    </div>
  );
};

export default AudioController;
