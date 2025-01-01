import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import formatDuration from "@/utils/formatDuration";
import { Collection, Track } from "@/types/TableDatabaseType";

interface CollectionExtended extends Collection {
  total_duration: number;
  total_track: number;
}

export default function FeaturedCollection() {
  const supabase = createClient();
  const [collection, setCollection] = useState<CollectionExtended | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getCollection = async () => {
      const query = supabase
        .from("collections")
        .select(`*, collection_tracks(tracks(*))`)
        .limit(1)
        .single();
      const { data: collectionData, error: collectionError } = await query;

      if (collectionError) {
        console.error(collectionError.message);
      } else {
        const updatedCollection: CollectionExtended = collectionData
          ? {
              ...collectionData,
              total_duration: collectionData?.collection_tracks?.reduce(
                (acc: number, data: { tracks: Track }) => {
                  return acc + data.tracks.duration;
                },
                0
              ),
              total_track: collectionData?.collection_tracks?.length,
            }
          : null;

        if (updatedCollection) {
          setIsLoading(false);
          setCollection(updatedCollection);
        }
      }
    };

    getCollection();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 bg-zinc-900/50 rounded-lg p-4 mb-8">
      <div className="space-y-2">
        {isLoading ? (
          <>
            <div className="skeleton w-32 h-4"></div>
            <div className="skeleton w-48 h-8"></div>
            <div className="skeleton w-48 h-48 rounded-lg"></div>
          </>
        ) : (
          <>
            <p className={`text-sm text-zinc-400`}>
              {collection?.total_track} tracks •{" "}
              {formatDuration(collection?.total_duration!)}
            </p>
            <h1 className={`text-2xl font-bold`}>{collection?.name}</h1>
            <img
              src={collection?.cover_url || "https://placehold.co/192x192"}
              alt="Featured playlist"
              className={`w-48 h-48 rounded-lg object-cover`}
            />
          </>
        )}
      </div>
    </div>
  );
}
