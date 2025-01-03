"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { motion } from "framer-motion";
import { UserCircle, SignOut, DotsThreeOutline } from "@phosphor-icons/react";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
const playlists = [
  {
    id: 1,
    name: "My Favorites",
    songCount: 125,
    coverImage: "https://placehold.co/200",
    description: "Your most played tracks",
  },
  {
    id: 2,
    name: "Workout Mix",
    songCount: 45,
    coverImage: "https://placehold.co/200",
    description: "Perfect for your gym sessions",
  },
  {
    id: 3,
    name: "Chill Vibes",
    songCount: 82,
    coverImage: "https://placehold.co/200",
    description: "Relaxing tunes for your downtime",
  },
  {
    id: 4,
    name: "Chill Vibes",
    songCount: 82,
    coverImage: "https://placehold.co/200",
    description: "Relaxing tunes for your downtime",
  },
  {
    id: 5,
    name: "Chill Vibes",
    songCount: 82,
    coverImage: "https://placehold.co/200",
    description: "Relaxing tunes for your downtime",
  },
  {
    id: 6,
    name: "Chill Vibes",
    songCount: 82,
    coverImage: "https://placehold.co/200",
    description: "Relaxing tunes for your downtime",
  },
];

const recentlyPlayed = [
  {
    id: 1,
    title: "Bohemian Rhapsody",
    artist: "Queen",
    duration: "5:55",
    albumArt: "https://placehold.co/120",
  },
  {
    id: 2,
    title: "Hotel California",
    artist: "Eagles",
    duration: "6:30",
    albumArt: "https://placehold.co/120",
  },
  {
    id: 3,
    title: "Sweet Child O' Mine",
    artist: "Guns N' Roses",
    duration: "5:56",
    albumArt: "https://placehold.co/120",
  },
];
const LoadingSkeleton = () => {
  return (
    <div className="min-h-screen bg-zinc-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="skeleton h-48 w-full bg-zinc-900/50 rounded-3xl mb-6"></div>
        <div className="skeleton h-[480px] w-full bg-zinc-900/50 rounded-3xl mb-6"></div>
        <div className="skeleton h-96 w-full bg-zinc-900/50 rounded-3xl"></div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const session = await supabase.auth.getUser();
      if (!session.data.user) {
        router.push("/login");
      } else {
        setUser(session.data.user);
      }
      setLoading(false);
    };

    fetchUser();
  }, [router, supabase]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* User Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-zinc-900/90 to-zinc-900/50 backdrop-blur-xl rounded-3xl p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative group">
              <div className="w-20 h-20 rounded-full bg-orange-500/10 flex items-center justify-center">
                <UserCircle
                  size={48}
                  className="text-orange-500"
                  weight="light"
                />
              </div>
            </div>

            <div className="flex-1">
              <h1 className="text-2xl font-medium text-zinc-100">
                {user?.user_metadata?.full_name || user?.email?.split("@")[0]}
              </h1>
              <p className="text-zinc-400 text-sm mt-1">{user?.email}</p>
            </div>

            <Link
              href={"/logout"}
              className="text-zinc-500 hover:text-orange-500 transition-colors">
              <SignOut size={20} weight="light" />
            </Link>
          </div>
        </motion.div>

        {/* Playlists */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-zinc-900/90 to-zinc-900/50 backdrop-blur-xl rounded-3xl p-6 md:p-8 mb-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-medium text-zinc-100">Playlists</h2>
          </div>

          <div className="flex gap-4 overflow-x-auto scrollbar-none">
            {playlists.map((playlist) => (
              <div key={playlist.id} className="carousel-item w-48">
                <div className="flex flex-col items-center">
                  <img
                    src={playlist.coverImage}
                    alt={playlist.name}
                    className="w-48 h-48 rounded-2xl object-cover"
                  />
                  <h3 className="mt-4 text-zinc-100 font-medium">
                    {playlist.name}
                  </h3>
                  <p className="text-zinc-400 text-sm">
                    {playlist.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recently Played */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-zinc-900/90 to-zinc-900/50 backdrop-blur-xl rounded-3xl p-6 md:p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-medium text-zinc-100">
              Recently Played
            </h2>
            <button className="text-zinc-500 hover:text-orange-500 transition-colors">
              <DotsThreeOutline size={24} weight="light" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {recentlyPlayed.map((song) => (
              <div key={song.id} className="carousel-item w-max">
                <div className="flex items-center gap-4">
                  <img
                    src={song.albumArt}
                    alt={song.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="text-zinc-100 font-medium">{song.title}</h4>
                    <p className="text-zinc-400 text-sm">{song.artist}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
