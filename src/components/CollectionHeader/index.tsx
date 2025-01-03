import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Tables } from "@/types/DatabaseType";
import useAudioController from "@/hooks/useAudioController";
import CollectionImage from "./CollectionImage";
import CollectionInfo from "./CollectionInfo";
import ActionButtons from "./ActionButtons";
import { motion } from "framer-motion";

interface CollectionExtended extends Tables<"collections"> {
  collection_tracks: { tracks: Tables<"tracks"> }[];
  total_duration: number;
  total_track: number;
}

const CollectionHeader = () => {
  const { handleAddToPlaylist, handlePlayPause } = useAudioController();
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
        const updatedCollection: CollectionExtended | null = collectionData
          ? {
              ...collectionData,
              total_duration: collectionData?.collection_tracks?.reduce(
                (acc: number, data: { tracks: Tables<"tracks"> }) => {
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
    <div className="relative bg-zinc-900 overflow-hidden mb-8">
      <div className="relative">
        {isLoading ? (
          <div className="max-w-7xl mx-auto py-12 px-4 flex flex-col lg:flex-row gap-8">
            <div className="skeleton w-64 h-64 rounded-lg bg-zinc-800"></div>
            <div className="space-y-4">
              <div className="skeleton w-32 h-4 bg-zinc-800"></div>
              <div className="skeleton w-96 h-12 bg-zinc-800"></div>
              <div className="skeleton w-48 h-4 bg-zinc-800"></div>
              <div className="skeleton w-full h-12 bg-zinc-800"></div>
            </div>
          </div>
        ) : (
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.3 },
              },
            }}
            initial="hidden"
            animate="visible"
            className="max-w-7xl mx-auto py-12 px-4 flex flex-col lg:flex-row gap-8">
            <CollectionImage
              imageUrl={collection?.cover_url || ""}
              altText={collection?.name || ""}
              onPlayClick={
                () => {}
                // handlePlayPause(
                //   { from: "collection" },
                //   collection?.collection_tracks.map(
                //     (track) => track.tracks
                //   ) as Tables<"tracks">[]
                // )
              }
            />
            <div>
              <CollectionInfo
                name={collection?.name || ""}
                totalTrack={collection?.total_track || 0}
                totalDuration={collection?.total_duration || 0}
              />
              <ActionButtons
                onPlayAllClick={() =>
                  handlePlayPause(
                    "collection",
                    collection?.collection_tracks.map(
                      (track) => track.tracks
                    ) as Tables<"tracks">[]
                  )
                }
                onShuffleClick={() => {}}
                onAddToPlaylistClick={() =>
                  handleAddToPlaylist(
                    collection?.collection_tracks.map(
                      (track) => track.tracks
                    ) as Tables<"tracks">[]
                  )
                }
              />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CollectionHeader;
