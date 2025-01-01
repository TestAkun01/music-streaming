"use client";

import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { Provider } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import { GoogleLogo, GithubLogo } from "@phosphor-icons/react";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleLogin = async (provider: Provider) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: "http://localhost:3000/api/auth/callback/",
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error("Error signing in with provider:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-zinc-950 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}>
      <div className="max-w-md w-full">
        <motion.div
          className="bg-zinc-900 rounded-2xl shadow-lg border border-zinc-800 p-8"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}>
          <motion.div
            className="text-center mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}>
            <h1 className="text-3xl font-bold text-zinc-100 mb-2">
              Welcome Back
            </h1>
            <p className="text-zinc-400">Sign in to continue to your account</p>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}>
            <button
              onClick={() => handleLogin("google")}
              disabled={loading}
              className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-100 py-3 px-4 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center gap-3 border border-zinc-700">
              <GoogleLogo size={24} weight="fill" className="text-zinc-100" />
              Continue with Google
            </button>

            <button
              onClick={() => handleLogin("github")}
              disabled={loading}
              className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-100 py-3 px-4 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center gap-3 border border-zinc-700">
              <GithubLogo size={24} weight="fill" className="text-zinc-100" />
              Continue with GitHub
            </button>
          </motion.div>

          {loading && (
            <motion.div
              className="mt-6 text-center text-zinc-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}>
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-zinc-400 border-t-transparent mr-2" />
              Connecting...
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Login;
