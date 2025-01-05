"use client";

import { createClient } from "@/utils/supabase/client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Pencil, Trash, MusicNotes, Plus } from "@phosphor-icons/react";
import { User, Session } from "@supabase/supabase-js";
import { Tables } from "@/types/DatabaseType";
import { useRouter } from "next/navigation";

const ArtistTrackManagement: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [tracks, setTracks] = useState<Tables<"tracks">[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async (): Promise<void> => {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) throw userError;

        if (!user) {
          router.push("/login");
          return;
        }

        setUser(user);

        const { data: tracksData, error: tracksError } = await supabase
          .from("tracks")
          .select(`*`)
          .eq("artist_id", user.id)
          .order("uploaded_at", { ascending: false });

        if (tracksError) throw tracksError;

        setTracks(tracksData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [router]);

  const handleDeleteTrack = async (trackId: number): Promise<void> => {
    try {
      const { error } = await supabase
        .from("tracks")
        .delete()
        .eq("id", trackId)
        .eq("artist_id", user?.id!);

      if (error) throw error;

      setTracks(tracks.filter((track) => track.id !== trackId));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    }
  };

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-orange-500 text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="text-red-500 text-xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">My Tracks</h1>
            <p className="text-zinc-400 mt-2">Welcome back, {user?.email}</p>
          </div>
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="/test-studio/create"
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Plus size={20} />
            Upload New Track
          </motion.a>
        </div>

        {tracks.length === 0 ? (
          <div className="bg-zinc-800 rounded-xl p-8 text-center">
            <MusicNotes size={48} className="text-orange-500 mx-auto mb-4" />
            <h2 className="text-white text-xl mb-2">No tracks yet</h2>
            <p className="text-zinc-400">
              Start by uploading your first track!
            </p>
          </div>
        ) : (
          <div className="bg-zinc-800 rounded-xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-zinc-700 text-zinc-400 font-medium">
              <div className="col-span-5">Title</div>
              <div className="col-span-2">Genre</div>
              <div className="col-span-2">Duration</div>
              <div className="col-span-2">Upload Date</div>
              <div className="col-span-1">Actions</div>
            </div>

            {tracks.map((track) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-12 gap-4 p-4 border-b border-zinc-700 hover:bg-zinc-700/50 transition-colors">
                <div className="col-span-5 flex items-center gap-3">
                  <div className="w-12 h-12 bg-zinc-700 rounded overflow-hidden">
                    <img
                      src={track.cover_url || "/api/placeholder/60/60"}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-medium">
                      {track.title}
                    </span>
                    <span className="text-zinc-400 text-sm">
                      {track.visibility === "Public" ? "Public" : "Private"}
                    </span>
                  </div>
                </div>
                <div className="col-span-2 flex items-center text-zinc-300">
                  {track.genre}
                </div>
                <div className="col-span-2 flex items-center text-zinc-300">
                  {formatDuration(track.duration)}
                </div>
                <div className="col-span-2 flex items-center text-zinc-300">
                  {formatDate(track.uploaded_at ?? "")}
                </div>
                <div className="col-span-1 flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="btn btn-sm btn-circle bg-transparent hover:bg-zinc-600 text-zinc-400 hover:text-orange-500">
                    <Pencil size={20} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDeleteTrack(track.id)}
                    className="btn btn-sm btn-circle bg-transparent hover:bg-zinc-600 text-zinc-400 hover:text-orange-500">
                    <Trash size={20} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtistTrackManagement;
