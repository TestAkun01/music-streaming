"use client";

import { X } from "@phosphor-icons/react/X";
import { MagnifyingGlass } from "@phosphor-icons/react/MagnifyingGlass";
import { Bell } from "@phosphor-icons/react/Bell";
import { Gear } from "@phosphor-icons/react/Gear";
import { ShieldCheck } from "@phosphor-icons/react/ShieldCheck";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import Link from "next/link";

export const Navbar = () => {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const session = await supabase.auth.getUser();
      if (!session.data) {
        router.push("/login");
      } else {
        setUser(session.data.user);
      }
    };

    fetchUser();
  }, [router, supabase]);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center flex-1 max-w-xl">
        <div className="relative w-full group">
          <motion.input
            whileFocus={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for songs, artists, or albums..."
            className="w-full pl-10 pr-8 py-2 rounded-full bg-zinc-800 border-2 border-zinc-700 text-zinc-300 
                 placeholder-zinc-500 focus:border-orange-500 focus:outline-none focus:ring-0 
                 transition-all duration-300"
          />
          <MagnifyingGlass
            weight="bold"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-hover:focus-within:text-orange-500 transition-colors duration-300"
            size={20}
          />
          {search.length > 0 && (
            <X
              onClick={() => setSearch("")}
              weight="bold"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-orange-500 transition-colors duration-300 cursor-pointer"
              size={20}
            />
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 ml-4">
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-circle btn-sm bg-zinc-800 hover:bg-zinc-700 border-none">
            <Bell
              size={16}
              className="text-zinc-400 hover:text-orange-500 transition-colors duration-300"
            />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-circle btn-sm bg-zinc-800 hover:bg-zinc-700 border-none">
            <Gear
              size={16}
              className="text-zinc-400 hover:text-orange-500 transition-colors duration-300"
            />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-circle btn-sm bg-zinc-800 hover:bg-zinc-700 border-none">
            <ShieldCheck
              size={16}
              className="text-zinc-400 hover:text-orange-500 transition-colors duration-300"
            />
          </motion.button>
        </div>
        {user ? (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard"
                className="btn btn-sm bg-orange-500 hover:bg-orange-600 border-none text-white 
                       normal-case rounded-full px-4">
                Dashboard
              </Link>
              <img
                src={user.user_metadata?.avatar_url || "/default-avatar.png"}
                alt="Profile"
                className="w-8 h-8 rounded-full ring-2 ring-orange-800 object-cover"
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3">
            <Link
              href="/login"
              className="btn btn-sm bg-orange-500 hover:bg-orange-600 border-none text-white 
                     normal-case rounded-full px-4">
              Login
            </Link>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
