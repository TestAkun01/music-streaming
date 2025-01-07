import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Tables } from "@/types/DatabaseType";
import { TrackItem } from "./TrackItem";

export interface TrackExtended extends Tables<"tracks"> {
  artist: Tables<"profiles">;
}

function TrackSkeleton() {
  return (
    <div className="w-[35rem] flex items-center justify-between p-4 rounded-lg animate-pulse bg-zinc-800/30">
      <div className="flex items-center gap-4">
        <div className="skeleton w-12 h-12 rounded bg-zinc-700/50"></div>
        <div>
          <div className="skeleton w-24 h-4 mb-2 bg-zinc-700/50"></div>
          <div className="skeleton w-16 h-4 bg-zinc-700/50"></div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="skeleton w-20 h-4 bg-zinc-700/50"></div>
        <div className="skeleton w-8 h-8 rounded-full bg-zinc-700/50"></div>
        <div className="skeleton w-8 h-8 rounded-full bg-zinc-700/50"></div>
      </div>
    </div>
  );
}

export default function TrackList() {
  const [tracks, setTracks] = useState<TrackExtended[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const supabase = createClient();

  useEffect(() => {
    const getTracks = async () => {
      setIsLoading(true);

      const { data: trackData, error: trackError } = await supabase
        .from("distinct_tracks")
        .select("*, artist:profiles(*)");

      if (trackError) {
        console.error(trackError.message);
      } else {
        setIsLoading(false);
        setTracks(trackData as TrackExtended[]);
      }
    };

    getTracks();
  }, []);

  return (
    <div className="overflow-x-auto scrollbar-none">
      <div className="grid grid-rows-5 grid-flow-col auto-cols-max gap-4 mb-8">
        {isLoading
          ? Array(15)
              .fill(0)
              .map((_, index) => <TrackSkeleton key={index} />)
          : tracks.map((music, index) => (
              <TrackItem key={music.id} music={music} />
            ))}
      </div>
    </div>
  );
}
