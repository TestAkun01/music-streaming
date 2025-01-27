"use client";

import React from "react";
import { Play, Pause } from "@phosphor-icons/react";
import { formatTime } from "@/utils/formatTime";
import { Track } from "@/services/Database/tracks_view";
import Image from "next/image";
import { useAudioController } from "@/stores/useAudioPlayerStore";
import { useGlobalAudioPlayer } from "react-use-audio-player";

interface MusicCardProps {
  track: Track;
}

export default function TrackCard({ track }: MusicCardProps) {
  const { currentTrack, handlePlayCollection } = useAudioController();
  const { playing, togglePlayPause } = useGlobalAudioPlayer();

  return (
    <div className="w-48 group hover:bg-zinc-900/10 rounded-xl p-3 transition-all duration-300 backdrop-blur-sm">
      <div className="relative aspect-square w-full mb-4 overflow-hidden rounded-xl group">
        <Image
          src={track.cover_url!}
          alt={track.title || "???"}
          width={180}
          height={180}
          quality={50}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <button
          onClick={() => {
            if (track.id === currentTrack?.id) {
              togglePlayPause();
            } else {
              handlePlayCollection([track]);
            }
          }}
          className="absolute bottom-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2 p-3 bg-orange-500 hover:bg-orange-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:shadow-orange-500/20">
          {currentTrack?.id === track.id && playing ? (
            <Pause size={24} className="text-white" weight="fill" />
          ) : (
            <Play size={24} className="text-white" weight="fill" />
          )}
        </button>
      </div>
      <div className="space-y-1.5">
        <h2 className="font-medium text-white truncate hover:text-orange-400 transition-colors duration-200">
          {track.title}
        </h2>
        <div className="flex items-center justify-between">
          <p className="text-sm text-zinc-400 truncate hover:text-zinc-300 transition-colors duration-200">
            {track.artist.display_name}
          </p>
          <span className="text-xs text-zinc-500">
            {formatTime(track.duration || 0)}
          </span>
        </div>
      </div>
    </div>
  );
}
