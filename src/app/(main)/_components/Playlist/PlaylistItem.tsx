import { Play, Pause, X } from "@phosphor-icons/react";
import useAudioController from "@/hooks/useAudioController";
import PlaylistItemType from "@/types/PlaylistItemType";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function PlaylistItem({ track }: { track: PlaylistItemType }) {
  const { currentTrack, playing, handlePlayPause, handleRemoveFromPlaylist } =
    useAudioController();
  const [isFirstMount, setIsFirstMount] = useState(true);

  const isActive = currentTrack?.id === track.id;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFirstMount(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`flex items-center justify-between gap-4 p-2 rounded-lg hover:bg-zinc-800/80 transition-colors duration-300 group cursor-pointer
        ${isFirstMount ? "animate-slide-in" : ""}
        ${
          isActive
            ? "bg-zinc-800/80 border-l-2 border-orange-500"
            : "border-l-2 border-transparent"
        }`}
      onClick={() => {
        handlePlayPause("playlist", track);
      }}>
      <div className="flex gap-3 items-center flex-1 min-w-0">
        <div className="relative">
          <Image
            src={track.cover_url || "/api/placeholder/48/48"}
            alt={track.title || "Song Thumbnail"}
            width={500}
            height={500}
            className={`w-14 h-14 object-cover rounded-md group-hover:brightness-75 transition-all ${
              isActive ? "brightness-75" : ""
            }`}
          />
          {isActive && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-md">
              {playing ? (
                <Pause className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 text-white" />
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col min-w-0">
          <span
            className={`text-sm font-medium truncate max-w-[150px] ${
              isActive ? "text-orange-500" : "text-zinc-200"
            }`}>
            {track.title}
          </span>
          <span className="text-sm text-zinc-400">
            {track.artist.display_name}
          </span>
        </div>
      </div>
      <button
        className="btn btn-circle btn-sm opacity-0 group-hover:opacity-100 bg-zinc-700 hover:bg-red-500 hover:text-white border-none transition-all duration-300"
        onClick={(e) => {
          e.stopPropagation();
          handleRemoveFromPlaylist(track.id ?? "");
        }}>
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
