import { Play, Pause, PlusCircle } from "@phosphor-icons/react";
import { formatDate } from "@/utils/formatDate";
import useAudioController from "@/hooks/useAudioController";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Tables } from "@/types/DatabaseType";
import { formatTime } from "@/utils/formatTime";
import { motion } from "framer-motion";

interface TrackExtended extends Tables<"tracks"> {
  artist: Tables<"profiles">;
}

export default function TrackList() {
  const { handlePlayPause, handleAddToPlaylist, currentTrack, playing } =
    useAudioController();
  const [tracks, setTracks] = useState<TrackExtended[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hoveredTrack, setHoveredTrack] = useState<number | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const getTracks = async () => {
      setIsLoading(true);

      const { data: trackData, error: trackError } = await supabase
        .from("tracks")
        .select("*, artist:profiles(*)");

      if (trackError) {
        console.error(trackError.message);
      } else {
        setIsLoading(false);
        setTracks(trackData);
      }
    };

    getTracks();
  }, []);

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <motion.div
      variants={listVariants}
      initial="hidden"
      animate="visible"
      className="space-y-2 mb-8">
      {isLoading
        ? Array(5)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg animate-pulse bg-zinc-800/30">
                <div className="flex items-center gap-4">
                  <div className="skeleton w-12 h-12 rounded bg-zinc-700/50"></div>
                  <div>
                    <div className="skeleton w-24 h-4 mb-2 bg-zinc-700/50"></div>
                    <div className="skeleton w-16 h-4 bg-zinc-700/50"></div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="skeleton w-20 h-4 bg-zinc-700/50"></div>
                  <div className="skeleton w-8 h-8 rounded-full bg-zinc-700/50"></div>
                  <div className="skeleton w-8 h-8 rounded-full bg-zinc-700/50"></div>
                </div>
              </div>
            ))
        : tracks.map((music: TrackExtended, index: number) => (
            <motion.div
              variants={itemVariants}
              key={index}
              className="group relative flex items-center justify-between hover:bg-zinc-800/50 p-4 rounded-lg transition-all duration-300"
              onMouseEnter={() => setHoveredTrack(index)}
              onMouseLeave={() => setHoveredTrack(null)}
              whileHover={{ scale: 1.01 }}>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <motion.img
                    src={music.cover_url!}
                    alt={music.title}
                    className={`w-12 h-12 rounded object-cover transition-all duration-300 group-hover:brightness-75`}
                  />
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredTrack === index ? 1 : 0 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/20 rounded"
                    onClick={() => handlePlayPause("external", music)}>
                    {currentTrack?.id === music.id && playing ? (
                      <Pause className="w-6 h-6 text-white" weight="fill" />
                    ) : (
                      <Play className="w-6 h-6 text-white" weight="fill" />
                    )}
                  </motion.button>
                </div>
                <div>
                  <h3 className="font-medium text-white group-hover:text-orange-500 transition-colors">
                    {music.title}
                  </h3>
                  <p className="text-sm text-zinc-400">
                    {music.artist.display_name} • {formatTime(music.duration)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-zinc-400">
                  {formatDate(music.uploaded_at?.toString() || "")}
                </span>
                <motion.button
                  className="p-2 rounded-full hover:bg-orange-500/10"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleAddToPlaylist(music)}>
                  <PlusCircle
                    className="w-5 h-5 text-zinc-400 hover:text-orange-500 transition-colors"
                    weight={hoveredTrack === index ? "fill" : "regular"}
                  />
                </motion.button>
              </div>
            </motion.div>
          ))}
    </motion.div>
  );
}
