"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import {
  Play,
  Pause,
  MusicNotes,
  CaretDown,
  CaretUp,
} from "@phosphor-icons/react";
import formatDuration from "@/utils/formatDuration";
import useAudioController from "@/hooks/useAudioController";

const CollectionsList: React.FC = () => {
  const [collections, setCollections] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedCollection, setExpandedCollection] = useState<string | null>(
    null
  );
  const { playing, currentTrack, handlePlayPause } = useAudioController();
  const supabase = createClient();

  useEffect(() => {
    const fetchCollections = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase.from("collections").select(`
            name,
            cover_url,
            collection_tracks(
              tracks(*, artist:profiles(display_name))
            )
          `);

        if (error) {
          setError("Error fetching collections: " + error.message);
        } else {
          setCollections(data || []);
        }
      } catch (err) {
        setError("Error fetching collections: " + err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCollections();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-lg text-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-500/10 text-red-500 p-4 rounded-lg max-w-md text-center">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {collections.map((collection) => (
          <div
            key={collection.name}
            className="bg-zinc-800/50 rounded-lg overflow-hidden mb-4 p-4 flex flex-col md:flex-row items-stretch">
            {/* Info Album */}
            <div className="w-64 flex-shrink-0 mb-4 md:mb-0 md:pr-4">
              {collection.cover_url ? (
                <img
                  src={collection.cover_url}
                  alt={`Cover for ${collection.name}`}
                  className="w-full aspect-square object-cover rounded-lg"
                />
              ) : (
                <div className="w-full aspect-square bg-zinc-700 flex items-center justify-center rounded-lg">
                  <MusicNotes size={48} className="text-zinc-600" />
                </div>
              )}
              <h2 className="text-lg font-semibold text-white mt-4 truncate">
                {collection.name}
              </h2>
            </div>

            {/* Daftar Trek */}
            <div className="w-full">
              <div className="space-y-2">
                {(expandedCollection === collection.name
                  ? collection.collection_tracks
                  : collection.collection_tracks.slice(0, 3)
                ).map((item: any) => (
                  <div
                    key={item.tracks.id}
                    className="p-3 rounded-lg bg-zinc-900/50 flex justify-between items-center">
                    <div>
                      <h3 className="text-white text-sm font-medium">
                        {item.tracks.title}
                      </h3>
                      <p className="text-zinc-400 text-xs">
                        {item.tracks.artist.display_name}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-zinc-400 text-xs">
                        {formatDuration(item.tracks.duration)}
                      </p>
                      <button
                        onClick={() => handlePlayPause("external", item.tracks)}
                        className="text-orange-500">
                        {currentTrack?.id === item.tracks.id && playing ? (
                          <Pause size={20} />
                        ) : (
                          <Play size={20} />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tombol Buka/Tutup */}
              {collection.collection_tracks.length > 3 && (
                <button
                  onClick={() =>
                    setExpandedCollection(
                      expandedCollection === collection.name
                        ? null
                        : collection.name
                    )
                  }
                  className="mt-4 text-orange-500 flex items-center gap-1 text-sm">
                  {expandedCollection === collection.name ? (
                    <>
                      <CaretUp size={16} />
                      Show Less
                    </>
                  ) : (
                    <>
                      <CaretDown size={16} />
                      Show More
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionsList;
