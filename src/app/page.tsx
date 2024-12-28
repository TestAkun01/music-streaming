"use client";

import AudioController from "@/components/Audio/AudioPlayer";
import Playlist from "@/components/Audio/Playlist";
import { useAudioContext } from "@/providers/AudioProvider";
import { useState } from "react";

const Home = () => {
  const { handlePlayPause, playing, handleAddToPlaylist, playlist } =
    useAudioContext();
  const [newAudio, setNewAudio] = useState<string>("");

  function handleSetPlaylist() {
    const newPlaylist = [
      "/audio/song.ogg",
      "/audio/song2.mp3",
      "/audio/song3.mp3",
    ];
    newPlaylist.map((source) => handleAddToPlaylist(source));
    handlePlayPause();
    console.log("Playlist Set:", newPlaylist);
  }

  function handleAddAudio() {
    if (newAudio) {
      handleAddToPlaylist(newAudio);
      setNewAudio("");
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">
        YT Music Tapi Tapi Lebih Ampas
      </h1>

      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => handlePlayPause("/audio/song.ogg")}>
        {playing ? "Pause" : "Play"} Test
      </button>

      <button
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
        onClick={handleSetPlaylist}>
        Set Playlist
      </button>

      <div className="mt-4 flex items-center gap-2">
        <input
          type="text"
          value={newAudio}
          onChange={(e) => setNewAudio(e.target.value)}
          placeholder="Add audio URL"
          className="p-2 border border-gray-300 rounded"
        />
        <button
          className="px-4 py-2 bg-yellow-500 text-white rounded"
          onClick={handleAddAudio}>
          Add to Playlist
        </button>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Current Playlist:</h3>
        <ul>
          {playlist.map((audio, index) => (
            <li key={index} className="text-gray-700">
              {audio.source}
            </li>
          ))}
        </ul>
      </div>
      <Playlist />
      <AudioController />
      <AudioController />
    </div>
  );
};

export default Home;
