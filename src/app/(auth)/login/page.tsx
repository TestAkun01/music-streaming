"use client";

import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { Provider } from "@supabase/supabase-js";
import { motion, AnimatePresence } from "framer-motion";
import {
  GoogleLogo,
  GithubLogo,
  Envelope,
  Lock,
  Eye,
  EyeSlash,
  Warning,
} from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [isEmailLogin, setIsEmailLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const supabase = createClient();
  const router = useRouter();
  const handleLogin = async (provider: Provider) => {
    setLoading(true);
    setError("");
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo:
            "http://localhost:3000/api/auth/callback/?next=/dashboard",
        },
      });
      if (error) throw error;
    } catch (error: any) {
      setError(error.message || "An error occurred during sign in");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      if (data) router.push("/dashboard");
    } catch (error: any) {
      setError(error.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setError("");
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
            <h2 className="text-2xl font-bold text-orange-500 mb-2">
              Welcome Back
            </h2>
            <p className="text-zinc-400">Sign in to continue to your account</p>
          </motion.div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 mb-4 flex items-start gap-3"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}>
                <Warning className="text-red-500 mt-0.5" size={20} />
                <p className="text-red-500 text-sm">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            className="space-y-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}>
            {isEmailLogin ? (
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div className="relative">
                  <Envelope
                    className="absolute left-3 top-3.5 text-zinc-400"
                    size={20}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-800 text-zinc-100 py-3 px-10 rounded-xl border border-zinc-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all duration-200"
                  />
                </div>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-3.5 text-zinc-400"
                    size={20}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-zinc-800 text-zinc-100 py-3 px-10 rounded-xl border border-zinc-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-zinc-400 hover:text-zinc-300">
                    {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-xl font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                  Sign In
                </button>
              </form>
            ) : (
              <>
                <button
                  onClick={() => handleLogin("google")}
                  disabled={loading}
                  className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-100 py-3 px-4 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center gap-3 border border-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed">
                  <GoogleLogo
                    size={24}
                    weight="fill"
                    className="text-zinc-100"
                  />
                  Continue with Google
                </button>

                <button
                  onClick={() => handleLogin("github")}
                  disabled={loading}
                  className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-100 py-3 px-4 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center gap-3 border border-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed">
                  <GithubLogo
                    size={24}
                    weight="fill"
                    className="text-zinc-100"
                  />
                  Continue with GitHub
                </button>
              </>
            )}

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-zinc-400 bg-zinc-900">Or</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsEmailLogin(!isEmailLogin);
                resetForm();
              }}
              className="w-full text-orange-500 hover:text-orange-400 transition-colors duration-200">
              {isEmailLogin
                ? "Sign in with social accounts"
                : "Sign in with email"}
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
