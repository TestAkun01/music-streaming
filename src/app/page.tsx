"use client";

import AudioController from "@/components/Audio/AudioController";
import Playlist from "@/components/Audio/Playlist";
import { useAudioContext } from "@/providers/AudioProvider";
import { PlayArrow, Pause, Add, Delete } from "@mui/icons-material";
import { Button, IconButton, Typography, Box } from "@mui/material";

const dataDummy = ["/audio/song.ogg", "/audio/song2.mp3", "/audio/song3.mp3"];

const Home = () => {
  const {
    handlePlayPause,
    playing,
    handleAddToPlaylist,
    playlist,
    currentId,
    handleClearPlaylist,
  } = useAudioContext();

  function handleSetPlaylist() {
    dataDummy.map((source) => handleAddToPlaylist(source));
  }
  const currentTrack = playlist.find((item) => item.id === currentId);
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 p-8">
      <Typography variant="h3" className="text-white font-bold mb-4">
        YT Music Tapi Tapi Lebih Ampas
      </Typography>

      <Button
        variant="contained"
        color="secondary"
        onClick={handleSetPlaylist}
        className="mb-6"
        sx={{
          padding: "12px 24px",
          backgroundColor: "#1db954", // Warna hijau Spotify
          "&:hover": {
            backgroundColor: "#1aa34a",
          },
        }}>
        Set Playlist
      </Button>

      <Box className="mt-4 w-full max-w-md">
        <Typography variant="h6" className="text-white mb-2">
          Current Playlist:
        </Typography>
        <ul className="list-none text-white">
          {playlist.map((audio, index) => (
            <li
              key={index}
              className="text-gray-200 mb-2 flex items-center justify-between">
              <span>{audio.source}</span>
              <IconButton
                color="error"
                onClick={() => handleClearPlaylist()}
                size="small"
                aria-label="clear playlist"
                sx={{ fontSize: "16px" }}>
                <Delete />
              </IconButton>
            </li>
          ))}
        </ul>
      </Box>

      {/* Daftar track dengan tombol Play/Pause */}
      <Box className="mt-8 w-full max-w-md">
        {dataDummy.map((source, index) => {
          // Cek apakah source sedang diputar
          const isCurrentTrack = currentTrack?.source === source;

          return (
            <Box
              key={index}
              className="flex items-center justify-between p-4 mb-2 bg-gray-800 rounded-lg shadow-md">
              {/* Tombol Play/Pause */}
              <IconButton
                color={isCurrentTrack && playing ? "primary" : "default"}
                onClick={() => handlePlayPause({ source })}
                sx={{
                  borderRadius: "8px",
                  backgroundColor:
                    isCurrentTrack && playing ? "#1db954" : "#333",
                  "&:hover": {
                    backgroundColor: "#555",
                  },
                  padding: "8px",
                }}>
                {isCurrentTrack && playing ? <Pause /> : <PlayArrow />}
              </IconButton>

              {/* Tombol Add to Playlist */}
              <IconButton
                color="primary"
                onClick={() => handleAddToPlaylist(source)}
                sx={{
                  borderRadius: "8px",
                  backgroundColor: "#333",
                  "&:hover": {
                    backgroundColor: "#555",
                  },
                  padding: "8px",
                }}>
                <Add />
              </IconButton>

              <span className="text-white">{source}</span>
            </Box>
          );
        })}
      </Box>

      <Playlist />
      <AudioController />
    </div>
  );
};

export default Home;
