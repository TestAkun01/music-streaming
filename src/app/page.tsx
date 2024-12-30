"use client";

import { useEffect, useState } from "react";
import { useAudioContext } from "@/providers/AudioProvider";

const Home = () => {
  const { handlePlayPause, handleAddToPlaylist, currentTrack, playing } =
    useAudioContext();

  const [songs, setSongs] = useState<any[]>([]);

  useEffect(() => {
    const fetchSongs = async () => {
      const fetchedSongs = [
        { id: 1, title: "Song 1", source: "/audio/song1.ogg" },
        { id: 2, title: "Song 2", source: "/audio/song2.mp3" },
        { id: 3, title: "Song 3", source: "/audio/song3.mp3" },
      ];
      setSongs(fetchedSongs);
    };

    fetchSongs();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Home - Daftar Lagu</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {songs.map((song) => {
          return (
            <div
              key={song.id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="text-lg font-semibold mb-4">{song.title}</div>
              <div className="flex justify-between">
                <button
                  onClick={() => handlePlayPause({ source: song.source })}
                  className={`${
                    playing && currentTrack?.id == song.id
                      ? "bg-green-500"
                      : "bg-blue-500"
                  } text-white py-2 px-4 rounded-md shadow-md focus:outline-none hover:bg-opacity-90`}>
                  {playing && currentTrack?.id == song.id ? "Pause" : "Play"}
                </button>
                <button
                  onClick={() => handleAddToPlaylist(song.source)}
                  className="bg-indigo-500 text-white py-2 px-4 rounded-md shadow-md focus:outline-none hover:bg-opacity-90">
                  Add to Playlist
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
