"use client";

import useAudioController from "@/hooks/useAudioController";
import Playlist from "@/components/Playlist";
import { useEffect, useState } from "react";

export default function RightMainComponent() {
  const { playlistIsOpen } = useAudioController();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`absolute right-0 top-0 h-full w-96 transition-all duration-700 ease-in-out
        ${
          playlistIsOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }`}>
      <Playlist />
    </div>
  );
}
