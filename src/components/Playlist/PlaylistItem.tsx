import { Play, Pause, X, DotsSixVertical } from "@phosphor-icons/react";
import useAudioController from "@/hooks/useAudioController";
import { formatTime } from "@/utils/formatTime";
import PlaylistItemType from "@/types/PlaylistItemType";
import { useEffect, useState } from "react";

export default function PlaylistItem({ track }: { track: PlaylistItemType }) {
  const { currentTrack, playing, handlePlayPause, handleRemoveFromPlaylist } =
    useAudioController();
  const [isFirstMount, setIsFirstMount] = useState(true);

  const isActive = currentTrack?.temporaryId === track.temporaryId;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFirstMount(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`flex items-center justify-between gap-4 p-3 rounded-lg hover:bg-zinc-800/80 transition-colors duration-300 group cursor-pointer
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
        <DotsSixVertical className="w-5 h-5 cursor-grab text-zinc-500 group-hover:text-zinc-300 transition-colors" />
        <div className="relative">
          <img
            src={track.cover_url || "/api/placeholder/48/48"}
            alt={track.title || "Song Thumbnail"}
            className={`w-12 h-12 object-cover rounded-md group-hover:brightness-75 transition-all ${
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
          <span className="text-sm font-medium text-zinc-200 truncate max-w-[150px]">
            {track.title}
          </span>
          <span className="text-xs text-zinc-400">
            {formatTime(track.duration)}
          </span>
        </div>
      </div>
      <button
        className="btn btn-circle btn-sm opacity-0 group-hover:opacity-100 bg-zinc-700 hover:bg-red-500 hover:text-white border-none transition-all duration-300"
        onClick={(e) => {
          e.stopPropagation();
          handleRemoveFromPlaylist(track.temporaryId ?? "");
        }}>
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
