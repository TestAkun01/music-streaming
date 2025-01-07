"use client";

import { ReactSortable } from "react-sortablejs";
import useAudioController from "@/hooks/useAudioController";
import PlaylistEmpty from "./PlaylistEmpty";
import PlaylistHeader from "./PlaylistHeader";
import PlaylistItem from "./PlaylistItem";

export default function Playlist() {
  const { playlist, setPlaylist } = useAudioController();

  return (
    <div className="flex flex-col h-full rounded-lg px-6 pt-6 animate-fade-in">
      <PlaylistHeader />
      <div
        className="flex-1 my-2 overflow-y-auto  scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-800
        hover:scrollbar-thumb-zinc-700">
        {playlist.length === 0 ? (
          <PlaylistEmpty />
        ) : (
          <ReactSortable
            list={playlist}
            setList={setPlaylist}
            animation={200}
            className="space-y-1">
            {playlist.map((track) => (
              <PlaylistItem key={track.temporaryId} track={track} />
            ))}
          </ReactSortable>
        )}
      </div>
    </div>
  );
}
