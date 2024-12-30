"use client";

import React from "react";
import {
  Play,
  Heart,
  MusicNoteSimple,
  Radio,
  PlusCircle,
  Pause,
} from "@phosphor-icons/react";
import { useAudioContext } from "@/providers/AudioProvider";
const data = {
  featuredPlaylist: {
    title: "Playlist of the day",
    trackCount: 69,
    duration: "4 hours 37 minutes",
    thumbnail: "",
  },
  musics: [
    {
      id: 1,
      title: "Song 1",
      source: "/audio/song1.ogg",
      thumbnail: "",
      artist: "Lorem",
      played: "2.3k",
      date: "23 June, 2023",
    },
    {
      id: 2,
      title: "Song 2",
      source: "/audio/song2.mp3",
      thumbnail: "",
      artist: "Lorem",
      played: "2.3k",
      date: "23 June, 2023",
    },
    {
      id: 3,
      title: "Song 3",
      source: "/audio/song3.mp3",
      thumbnail: "",
      artist: "Lorem",
      played: "2.3k",
      date: "23 June, 2023",
    },
    {
      id: 4,
      title: "Song 4",
      source: "/audio/song4.mp3",
      thumbnail: "",
      artist: "Lorem",
      played: "2.3k",
      date: "23 June, 2023",
    },
    {
      id: 5,
      title: "Song 5",
      source: "/audio/song5.mp3",
      thumbnail: "",
      artist: "Lorem",
      played: "2.3k",
      date: "23 June, 2023",
    },
  ],
  playlists: [
    {
      title: "Workout at the gym",
      tracks: 29,
      duration: "2h 15m",
      date: "23 June, 2023",
      thumbnail: "",
    },
  ],
  statistics: {
    likes: 247,
    tracks: 363,
    streams: 29,
  },
  promoBanner: {
    title: "Check the power of Melo",
    description:
      "Enjoy uninterrupted music streaming with our premium subscription.",
    buttonText: "Upgrade",
    onUpgrade: () => console.log("Upgrade clicked"),
  },
};
const PlaylistView = () => {
  const { handlePlayPause, handleAddToPlaylist, currentTrack, playing } =
    useAudioContext();

  return (
    <div className=" text-white min-h-screen p-6">
      <div className="grid grid-cols-2 gap-4 bg-zinc-900/50 rounded-lg p-4 mb-8">
        <div className="space-y-2">
          <p className="text-sm text-zinc-400">
            {data.featuredPlaylist.trackCount} tracks •{" "}
            {data.featuredPlaylist.duration}
          </p>
          <h1 className="text-2xl font-bold">{data.featuredPlaylist.title}</h1>
          <img
            src={
              data.featuredPlaylist.thumbnail || "https://placehold.co/192x192"
            }
            alt="Featured playlist"
            className="w-48 h-48 rounded-lg object-cover"
          />
        </div>
      </div>

      <div className="flex gap-6 mb-6 text-sm border-b border-zinc-800 pb-2">
        <button className="text-orange-500 border-b-2 border-orange-500 pb-2">
          Musics
        </button>
        <button className="text-zinc-400 hover:text-white">Playlists</button>
        <button className="text-zinc-400 hover:text-white">Artists</button>
        <button className="text-zinc-400 hover:text-white">Albums</button>
        <button className="text-zinc-400 hover:text-white">Streams</button>
        <button className="text-zinc-400 hover:text-white">
          Friends' playlists
        </button>
      </div>

      <div className="space-y-2 mb-8">
        {data.musics.map((music, index) => (
          <div
            key={index}
            className="flex items-center justify-between hover:bg-zinc-800/50 p-4 rounded-lg transition-colors">
            <div className="flex items-center gap-4">
              <img
                src={music.thumbnail || "https://placehold.co/24"}
                alt={music.title}
                className="w-12 h-12 rounded object-cover"
              />
              <div>
                <h3 className="font-medium">{music.title}</h3>
                <p className="text-sm text-zinc-400">
                  {music.artist} • {music.played} plays
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-zinc-400">{music.date}</span>
              <button
                className="flex items-center justify-center"
                onClick={() =>
                  handlePlayPause({ sourceOrTemporaryId: "source" }, music)
                }>
                {currentTrack?.id === music.id && playing ? (
                  <Pause className="w-5 h-5 text-zinc-400" />
                ) : (
                  <Play className="w-5 h-5 text-zinc-400" />
                )}
              </button>
              <button
                className="flex items-center justify-center"
                onClick={() => handleAddToPlaylist(music)}>
                <PlusCircle className="w-5 h-5 text-zinc-400" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-zinc-900 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-zinc-400">LIKES</span>
            <Heart className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold mt-2">{data.statistics.likes}</p>
        </div>
        <div className="bg-zinc-900 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-zinc-400">TRACKS</span>
            <MusicNoteSimple className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold mt-2">{data.statistics.tracks}</p>
        </div>
        <div className="bg-zinc-900 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-zinc-400">STREAMS</span>
            <Radio className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold mt-2">{data.statistics.streams}</p>
        </div>
      </div>
    </div>
  );
};

export default PlaylistView;
