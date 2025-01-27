"use client";

import { useState, useEffect } from "react";
import {
  Play,
  Pause,
  Clock,
  MusicNotes,
  User,
  Tag,
} from "@phosphor-icons/react";
import formatDuration from "@/utils/formatDuration";
import {
  getCollectionTracks,
  GroupedTracks,
} from "@/services/Database/tracks_view";
import Image from "next/image";
import { useAudioController } from "@/stores/useAudioPlayerStore";
import { useGlobalAudioPlayer } from "react-use-audio-player";

const TracksList: React.FC = () => {
  const [tracks, setTracks] = useState<GroupedTracks>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { currentTrack, handlePlayCollection } = useAudioController();
  const { playing, togglePlayPause } = useGlobalAudioPlayer();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCollectionTracks({});
      setTracks(data || []);
    };

    fetchData().then(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screenflex items-center justify-center">
        <div className="loading loading-spinner loading-lg text-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <MusicNotes size={32} className="text-orange-500" />
          <h1 className="text-3xl font-bold text-white">Your Tracks</h1>
        </div>

        {tracks.length === 0 ? (
          <div className="text-center py-16 bg-zinc-800/50 rounded-lg">
            <MusicNotes size={48} className="text-zinc-600 mx-auto mb-4" />
            <p className="text-zinc-400">No tracks found.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {tracks[0].tracks.map((track, index) => (
              <div
                key={index}
                className="bg-zinc-800/50 rounded-xl overflow-hidden backdrop-blur-sm transition-transform hover:scale-[1.02] hover:shadow-xl">
                <div className="relative group">
                  {track.title ? (
                    <Image
                      src={track.cover_url || ""}
                      alt={track.title || "Image"}
                      width={180}
                      height={180}
                      className="w-full aspect-square object-cover"
                    />
                  ) : (
                    <div className="w-full aspect-square bg-zinc-700 flex items-center justify-center">
                      <MusicNotes size={48} className="text-zinc-600" />
                    </div>
                  )}
                  <button
                    onClick={() => {
                      if (currentTrack?.id === track.id) {
                        togglePlayPause();
                      } else {
                        handlePlayCollection([track]);
                      }
                    }}
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    {currentTrack?.id === track.id && playing ? (
                      <Pause size={48} className="text-white" weight="fill" />
                    ) : (
                      <Play size={48} className="text-white" weight="fill" />
                    )}
                  </button>
                </div>

                <div className="p-4">
                  <h2 className="text-lg font-semibold text-white mb-2 truncate">
                    {track.title}
                  </h2>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-zinc-400 text-sm">
                      <User size={16} className="text-orange-500" />
                      <span className="truncate">
                        {track.artist.display_name}
                      </span>
                    </div>

                    {track.genre && (
                      <div className="flex items-center gap-2 text-zinc-400 text-sm">
                        <Tag size={16} className="text-orange-500" />
                        <span className="truncate">{track.genre}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-zinc-400 text-sm">
                      <Clock size={16} className="text-orange-500" />
                      <span>{formatDuration(track.duration || 0)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TracksList;
