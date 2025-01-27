"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SignOut } from "@phosphor-icons/react";

const Logout = () => {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const logout = async () => {
      await supabase.auth.signOut();
      router.push("/");
    };

    logout();
  }, [router, supabase]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4 fade-in">
      <div className="max-w-md w-full">
        <div className="bg-zinc-900 rounded-2xl shadow-lg border border-zinc-800 p-8 text-center slide-up">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-zinc-800 rounded-full">
              <SignOut size={32} className="text-zinc-300" />
            </div>
          </div>

          <h1 className="text-xl font-semibold text-zinc-100 mb-2">
            Signing you out...
          </h1>

          <p className="text-zinc-400 mb-6">
            You&apos;ll be redirected to the login page shortly
          </p>

          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-zinc-500 border-t-zinc-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logout;
