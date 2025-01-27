"use client";

import { ReactNode } from "react";
import usePlaylistStore from "@/stores/usePlaylistComponentStore";

export default function CenterMainComponent({
  children,
}: {
  children: ReactNode;
}) {
  const { playlistIsOpen } = usePlaylistStore();

  return (
    <div
      className={`flex-1 h-full overflow-y-auto transition-[margin] duration-700 ease-in-out scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-800 hover:scrollbar-thumb-zinc-700 ${
        playlistIsOpen ? "mr-80" : "mr-0"
      }`}>
      {children}
    </div>
  );
}
