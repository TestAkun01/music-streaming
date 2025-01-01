"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { motion } from "framer-motion";
import { UserCircle, SignOut } from "@phosphor-icons/react";
import { User } from "@supabase/supabase-js";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const session = await supabase.auth.getSession();
      console.log(session.data.session);

      if (!session.data.session) {
        router.push("/login");
      } else {
        setUser(session.data.session.user);
      }
      setLoading(false);
    };

    fetchUser();
  }, [router, supabase]);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-zinc-950">
        <div className="animate-pulse text-zinc-400 text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <motion.div
      className="h-full flex items-center justify-center bg-zinc-950"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}>
      <div className="max-w-md w-full">
        <motion.div
          className="bg-zinc-900 rounded-2xl shadow-lg border border-zinc-800 p-8"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}>
          <div className="flex justify-end mb-2">
            <a
              href="/logout"
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-200 transition-colors duration-200">
              <SignOut size={20} />
              <span className="text-sm">Logout</span>
            </a>
          </div>

          <div className="flex justify-center mb-6">
            <div className="p-3 bg-zinc-800 rounded-full">
              <UserCircle size={40} className="text-zinc-300" />
            </div>
          </div>

          <motion.div
            className="space-y-2 mb-8 text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}>
            <h1 className="text-2xl font-semibold text-zinc-100">
              Welcome Back
            </h1>
            <p className="text-zinc-400">
              {user?.user_metadata?.full_name || user?.email}
            </p>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}>
            <div className="p-4 bg-zinc-800 rounded-xl border border-zinc-700">
              <p className="text-sm font-medium text-zinc-500 mb-1">Email</p>
              <p className="text-zinc-300">{user?.email}</p>
            </div>

            <button className="w-full bg-zinc-700 hover:bg-zinc-600 text-zinc-100 py-3 px-4 rounded-xl font-medium transition-colors duration-200">
              Edit Profile
            </button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
