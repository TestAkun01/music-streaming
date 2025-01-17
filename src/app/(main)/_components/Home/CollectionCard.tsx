"use client";

import React from "react";
import { Play, Pause } from "@phosphor-icons/react";
import { formatTime } from "@/utils/formatTime";
import useAudioController from "@/hooks/useAudioController";
import { Track } from "@/services/Database/tracks_view";
import Image from "next/image";

interface MusicCollectionCardProps {
  tracks: Track[];
}

export default function CollectionCard({ tracks }: MusicCollectionCardProps) {
  const { currentTrack, handlePlayPause, playing } = useAudioController();

  return (
    <div className="w-48 group hover:bg-zinc-900/10 rounded-xl p-3 transition-all duration-300 backdrop-blur-sm">
      <div className="relative aspect-square w-full mb-4 overflow-hidden rounded-xl group">
        <Image
          src={tracks[0].collection.cover_url!}
          alt={tracks[0].collection.name || "???"}
          width={180}
          height={180}
          priority={true}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <button
          onClick={() => handlePlayPause("collection", tracks)}
          className="absolute bottom-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2 p-3 
                     bg-orange-500 hover:bg-orange-600 rounded-full opacity-0 group-hover:opacity-100 
                     transition-all duration-300 shadow-lg hover:shadow-orange-500/20">
          {currentTrack?.collection.id === tracks[0].collection.id &&
          playing ? (
            <Pause size={24} className="text-white" weight="fill" />
          ) : (
            <Play size={24} className="text-white" weight="fill" />
          )}
        </button>
      </div>
      <div className="space-y-1.5">
        <h2 className="font-medium text-white truncate hover:text-orange-400 transition-colors duration-200">
          {tracks[0].collection.name}
        </h2>
        <div className="flex items-center justify-between">
          <p className="text-sm text-zinc-400 truncate hover:text-zinc-300 transition-colors duration-200">
            {tracks[0].collection.artists
              .map((artist) => artist.display_name)
              .join(" & ")}
          </p>
          <span className="text-xs text-zinc-500">
            {formatTime(
              tracks.reduce((time, item) => time + (item.duration || 0), 0)
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
