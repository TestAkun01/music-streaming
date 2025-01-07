"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import {
  Play,
  Pause,
  Clock,
  MusicNotes,
  User,
  Tag,
} from "@phosphor-icons/react";
import { Tables } from "@/types/DatabaseType";
import formatDuration from "@/utils/formatDuration";
import useAudioController from "@/hooks/useAudioController";

const TracksList: React.FC = () => {
  const [tracks, setTracks] = useState<Tables<"tracks">[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { playing, currentTrack, handlePlayPause } = useAudioController();
  const supabase = createClient();

  useEffect(() => {
    const fetchTracks = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase.from("tracks").select("*");
        const { data: test, error: testerror } = await supabase.from(
          "collections"
        ).select(`
          name,
          cover_url,
          collection_tracks(
            tracks(*, 
              artist:profiles(display_name))
          )
          `);
        console.log(test);

        if (error) {
          setError("Error fetching tracks: " + error.message);
        } else {
          setTracks(data || []);
        }
      } catch (err) {
        setError("Error fetching tracks: " + err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTracks();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screenflex items-center justify-center">
        <div className="loading loading-spinner loading-lg text-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="bg-red-500/10 text-red-500 p-4 rounded-lg max-w-md text-center">
          {error}
        </div>
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
            {tracks.map((track) => (
              <div
                key={track.id}
                className="bg-zinc-800/50 rounded-xl overflow-hidden backdrop-blur-sm transition-transform hover:scale-[1.02] hover:shadow-xl">
                <div className="relative group">
                  {track.cover_url ? (
                    <img
                      src={track.cover_url}
                      alt={`Cover for ${track.title}`}
                      className="w-full aspect-square object-cover"
                    />
                  ) : (
                    <div className="w-full aspect-square bg-zinc-700 flex items-center justify-center">
                      <MusicNotes size={48} className="text-zinc-600" />
                    </div>
                  )}
                  <button
                    onClick={() => handlePlayPause("external", track)}
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
                      <span className="truncate">{track.artist_id}</span>
                    </div>

                    {track.genre && (
                      <div className="flex items-center gap-2 text-zinc-400 text-sm">
                        <Tag size={16} className="text-orange-500" />
                        <span className="truncate">{track.genre}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-zinc-400 text-sm">
                      <Clock size={16} className="text-orange-500" />
                      <span>{formatDuration(track.duration)}</span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        track.visibility === "Public"
                          ? "bg-green-500/10 text-green-500"
                          : "bg-zinc-500/10 text-zinc-400"
                      }`}>
                      {track.visibility}
                    </span>
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
