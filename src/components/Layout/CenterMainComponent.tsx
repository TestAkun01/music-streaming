"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import useAudiocontroller from "@/hooks/useAudioController";

export default function CenterMainComponent({
  children,
}: {
  children: ReactNode;
}) {
  const { playlistIsOpen } = useAudiocontroller();

  return (
    <motion.div
      animate={{
        marginRight: playlistIsOpen ? "24rem" : "0%",
      }}
      transition={{ duration: 0.75, ease: "easeInOut" }}
      className="flex-1 h-full overflow-y-auto
          scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-800
          hover:scrollbar-thumb-zinc-700 scroll-smooth">
      {children}
    </motion.div>
  );
}
