"use client";

import { MusicNotes, Pause, Play } from "@phosphor-icons/react";
import formatDuration from "@/utils/formatDuration";
import { Track } from "@/services/Database/tracks_view";
import Image from "next/image";
import useAudioPlayerStore from "@/stores/useAudioPlayerStore";
import { useGlobalAudioPlayer } from "react-use-audio-player";

interface CollectionCardProps {
  collection: Track[];
}

const CollectionCard: React.FC<CollectionCardProps> = ({ collection }) => {
  const { handlePlayCollection, currentTrack } = useAudioPlayerStore();
  const { togglePlayPause, playing } = useGlobalAudioPlayer();
  return (
    <div className="w-64 flex-shrink-0">
      <div className="group relative">
        {collection[0].collection.cover_url ? (
          <Image
            src={collection[0].collection.cover_url}
            alt={collection[0].title || "Image"}
            width={200}
            height={200}
            quality={50}
            className="w-full aspect-square object-cover rounded-lg shadow-lg"
          />
        ) : (
          <div className="w-full aspect-square bg-zinc-700/50 rounded-lg flex items-center justify-center">
            <MusicNotes size={48} weight="fill" className="text-zinc-600" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
          <button
            className="bg-orange-500 p-3 rounded-full transform transition-transform hover:scale-110"
            onClick={() => {
              if (currentTrack?.collection.id === collection[0].collection.id) {
                togglePlayPause();
              } else {
                handlePlayCollection(collection);
              }
            }}>
            {currentTrack?.collection.id === collection[0].collection.id &&
            playing ? (
              <Pause size={24} className="text-white" weight="fill" />
            ) : (
              <Play size={24} className="text-white" weight="fill" />
            )}
          </button>
        </div>
      </div>

      <div className="mt-4 space-y-1">
        <h2 className="text-xl font-semibold text-white">
          {collection[0].collection.name}
        </h2>
        <p className="text-sm text-zinc-400">{collection[0].collection.name}</p>
        <div className="flex items-center gap-4 text-xs text-zinc-500">
          <span>{collection.length} tracks</span>
          <span>
            {formatDuration(
              collection.reduce((sum, item) => sum + (item.duration || 0), 0)
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
