import { Play, Pause, PlusCircle } from "@phosphor-icons/react";
import { formatDate } from "@/utils/formatDate";
import { formatTime } from "@/utils/formatTime";
import { TrackExtended } from "./TrackList";
import useAudioController from "@/hooks/useAudioController";

interface TrackItemProps {
  music: TrackExtended;
}

export function TrackItem({ music }: TrackItemProps) {
  const { currentTrack, handlePlayPause, playing, handleAddToPlaylist } =
    useAudioController();
  return (
    <div
      className="group w-[35rem] relative flex items-center justify-between hover:bg-zinc-800/50 p-4 rounded-lg 
        transition-all duration-300 ease-out hover:scale-[1.01] animate-slide-down">
      <div className="flex items-center gap-4">
        <div className="relative">
          <img
            src={music.cover_url!}
            alt={music.title}
            className="w-12 h-12 rounded object-cover transition-all duration-300 
              group-hover:brightness-75"
          />
          <button
            className={`absolute inset-0 flex items-center justify-center bg-black/20 rounded opacity-0 group-hover:opacity-100
              transition-opacity duration-300 }`}
            onClick={() => handlePlayPause("external", music)}>
            {currentTrack?.id === music.id && playing ? (
              <Pause size={24} className="text-white" weight="fill" />
            ) : (
              <Play size={24} className="text-white" weight="fill" />
            )}
          </button>
        </div>
        <div>
          <h3 className="font-medium text-white group-hover:text-orange-500 transition-colors">
            {music.title}
          </h3>
          <p className="text-sm text-zinc-400">
            {music.artist.display_name} • {formatTime(music.duration)}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-zinc-400">
          {formatDate(music.uploaded_at?.toString() || "")}
        </span>
        <button
          className="p-2 rounded-full hover:bg-orange-500/10 transition-all duration-300
            hover:scale-110 active:scale-90"
          onClick={() => handleAddToPlaylist(music)}>
          <PlusCircle
            className="w-5 h-5 text-zinc-400 hover:text-orange-500 transition-colors"
            weight={"regular"}
          />
        </button>
      </div>
    </div>
  );
}
