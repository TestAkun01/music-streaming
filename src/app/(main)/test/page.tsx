"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Track } from "@/types/TableDatabaseType"; // Pastikan Track type telah diupdate sesuai dengan perubahan tabel

export default function Testing() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const getTracks = async () => {
      const { data, error } = await supabase.from("tracks").select("*");

      if (data) {
        console.log(data);
        setTracks(data);
      }
      if (error) {
        console.error(error.message);
      }
    };
    getTracks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">Tracks</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tracks.map((track) => (
          <motion.div
            key={track.id}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}>
            <img
              src={track.cover_url || "https://via.placeholder.com/150"}
              alt={track.title}
              className="w-full h-32 object-cover rounded-md mb-4"
            />
            <h2 className="text-lg font-semibold text-gray-800">
              {track.title}
            </h2>
            <p className="text-gray-600">Artist ID: {track.artist_id}</p>
            <p className="text-gray-600">Genre: {track.genre}</p>
            <p className="text-gray-500 text-sm">
              Duration: {track.duration} sec
            </p>
            <p className="text-gray-500 text-sm">
              Visibility: {track.visibility}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
