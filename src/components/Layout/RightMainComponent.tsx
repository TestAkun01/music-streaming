"use client";

import { motion } from "framer-motion";

import { useAudioContext } from "@/providers/AudioProvider";
import Playlist from "../Audio/Playlist";

export default function RightMainComponent() {
  const { playlistIsOpen } = useAudioContext();

  return (
    <motion.div
      className="overflow-y-auto"
      initial={{ width: 0, opacity: 0 }}
      animate={{
        width: playlistIsOpen ? "28%" : 0,
        opacity: playlistIsOpen ? 1 : 0,
      }}
      transition={{ duration: 0.8, ease: "easeInOut" }}>
      <Playlist />
    </motion.div>
  );
}
