import { Play, Pause, User, DotsThree } from "@phosphor-icons/react";
import { formatTime } from "@/utils/formatTime";
import { Track } from "@/services/Database/tracks_view";
import useAudioPlayerStore from "@/stores/useAudioPlayerStore";
import { useGlobalAudioPlayer } from "react-use-audio-player";

const TrackItem = ({ track }: { track: Track }) => {
  const { currentTrack, handlePlayCollection } = useAudioPlayerStore();
  const { playing, togglePlayPause } = useGlobalAudioPlayer();
  return (
    <div className="group p-3 rounded-lg bg-zinc-700/20 hover:bg-zinc-700/40 transition-all duration-200">
      <div className="flex items-center gap-4">
        <div className="w-8 text-center text-sm text-zinc-500">
          {track.track_order}
        </div>

        <button
          onClick={() => {
            if (currentTrack?.id === track.id) {
              togglePlayPause();
            } else {
              handlePlayCollection([track]);
            }
          }}
          className="opacity-0 group-hover:opacity-100 transition-opacity">
          {currentTrack?.id === track.id && playing ? (
            <Pause size={20} weight="fill" className="text-orange-500" />
          ) : (
            <Play size={20} weight="fill" className="text-orange-500" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <h3 className="text-white text-sm font-medium truncate">
            {track.title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <User size={12} />
            <span className="truncate">{track.artist.display_name}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-zinc-400">
            {formatTime(track.duration || 0)}
          </span>
          <button className="opacity-0 group-hover:opacity-100 transition-opacity">
            <DotsThree size={20} className="text-zinc-400 hover:text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default TrackItem;
