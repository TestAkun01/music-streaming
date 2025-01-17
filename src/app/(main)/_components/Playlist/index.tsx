"use client";

import { ReactSortable } from "react-sortablejs";
import useAudioController from "@/hooks/useAudioController";
import PlaylistEmpty from "./PlaylistEmpty";
import PlaylistHeader from "./PlaylistHeader";
import PlaylistItem from "./PlaylistItem";
import usePlaylistStore from "../../_store/playlistStore";

export default function Playlist() {
  const { playlist, setPlaylist } = useAudioController();
  const { playlistIsOpen } = usePlaylistStore();

  return (
    <div
      className={`absolute right-0 top-0 h-full w-80 transition-all duration-700 ease-in-out
        ${
          playlistIsOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }`}>
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
              setList={setPlaylist!}
              animation={200}
              className="space-y-1">
              {playlist.map((track, index) => (
                <PlaylistItem key={index} track={track} />
              ))}
            </ReactSortable>
          )}
        </div>
      </div>
    </div>
  );
}
