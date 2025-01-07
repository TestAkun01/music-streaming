import { Trash } from "@phosphor-icons/react";
import useAudioController from "@/hooks/useAudioController";

export default function PlaylistHeader() {
  const { playlist, handleClearPlaylist } = useAudioController();

  return (
    <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
      <h2 className="font-semibold text-zinc-100 text-lg animate-slide-down py-1">
        Playlist ({playlist.length})
      </h2>
      {playlist.length > 0 && (
        <button
          className="btn btn-circle btn-sm bg-zinc-800 hover:bg-red-500 text-zinc-200 hover:text-white border-none transition-all duration-300"
          onClick={handleClearPlaylist}>
          <Trash size={16} />
        </button>
      )}
    </div>
  );
}