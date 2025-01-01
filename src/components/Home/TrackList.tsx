import { Play, Pause, PlusCircle } from "@phosphor-icons/react";
import { formatDate } from "@/utils/formatDate";
import { useAudioContext } from "@/providers/AudioProvider";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Profile, Track } from "@/types/TableDatabaseType";

interface TrackExtended extends Track {
  artist: Profile;
}

export default function TrackList() {
  const { handlePlayPause, handleAddToPlaylist, currentTrack, playing } =
    useAudioContext();
  const [tracks, setTracks] = useState<TrackExtended[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const supabase = createClient();

  useEffect(() => {
    const getTracks = async () => {
      setIsLoading(true);

      const { data: trackData, error: trackError } = await supabase
        .from("tracks")
        .select("*, artist:profiles(*)");

      if (trackError) {
        console.error(trackError.message);
      } else {
        setIsLoading(false);
        setTracks(trackData);
      }
    };

    getTracks();
  }, []);

  return (
    <div className="space-y-2 mb-8">
      {isLoading
        ? Array(5)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg animate-pulse">
                <div className="flex items-center gap-4">
                  <div className="skeleton w-12 h-12 rounded"></div>
                  <div>
                    <div className="skeleton w-24 h-4 mb-2"></div>
                    <div className="skeleton w-16 h-4"></div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="skeleton w-20 h-4"></div>
                  <div className="skeleton w-8 h-8 rounded-full"></div>
                  <div className="skeleton w-8 h-8 rounded-full"></div>
                </div>
              </div>
            ))
        : tracks.map((music: TrackExtended, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between hover:bg-zinc-800/50 p-4 rounded-lg transition-colors">
              <div className="flex items-center gap-4">
                <img
                  src={music.cover_url!}
                  alt={music.title}
                  className={`w-12 h-12 rounded object-cover`}
                />
                <div>
                  <h3 className={`font-medium`}>{music.title}</h3>
                  <p className={`text-sm text-zinc-400`}>
                    {music.artist.display_name} • {music.genre}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-sm text-zinc-400`}>
                  {formatDate(music.uploaded_at)}
                </span>
                <button
                  className={`flex items-center justify-center`}
                  onClick={() =>
                    handlePlayPause({ sourceOrTemporaryId: "source" }, music)
                  }>
                  {currentTrack?.id === music.id && playing ? (
                    <Pause className="w-5 h-5 text-zinc-400" />
                  ) : (
                    <Play className="w-5 h-5 text-zinc-400" />
                  )}
                </button>
                <button
                  className={`flex items-center justify-center`}
                  onClick={() => handleAddToPlaylist(music)}>
                  <PlusCircle className="w-5 h-5 text-zinc-400" />
                </button>
              </div>
            </div>
          ))}
    </div>
  );
}
