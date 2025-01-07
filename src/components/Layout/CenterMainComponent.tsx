"use client";

import { ReactNode } from "react";
import useAudiocontroller from "@/hooks/useAudioController";

export default function CenterMainComponent({
  children,
}: {
  children: ReactNode;
}) {
  const { playlistIsOpen } = useAudiocontroller();

  return (
    <div
      className={`flex-1 h-full overflow-y-auto transition-[margin] duration-700 ease-in-out
        scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-800
        hover:scrollbar-thumb-zinc-700
        ${playlistIsOpen ? "mr-96" : "mr-0"}`}>
      {children}
    </div>
  );
}
