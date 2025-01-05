"use client";

import { motion } from "framer-motion";

import useAudioController from "@/hooks/useAudioController";
import Playlist from "@/components/Playlist";

export default function RightMainComponent() {
  const { playlistIsOpen } = useAudioController();

  return (
    <motion.div
      className="absolute right-0 top-0 h-full w-96"
      initial={{ x: "100%", opacity: 0 }}
      animate={{
        x: playlistIsOpen ? "0%" : "100%",
        opacity: playlistIsOpen ? 1 : 0,
      }}
      transition={{ duration: 0.75, ease: "easeInOut" }}>
      <Playlist />
    </motion.div>
  );
}
