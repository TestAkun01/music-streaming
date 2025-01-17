"use client";

import { useState, useEffect } from "react";
import CollectionCard from "@/components/Upload/CollectionCard";
import TrackList from "@/components/Upload/TrackList";
import {
  getCollectionTracks,
  GroupedTracks,
} from "@/services/Database/tracks_view";
import { getUser } from "@/services/Auth/User";

const CollectionsList: React.FC = () => {
  const [collections, setCollections] = useState<GroupedTracks>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCollections = async () => {
      setIsLoading(true);
      const user = await getUser();
      const data = await getCollectionTracks({ artistId: user?.id ?? "" });

      setCollections(data || []);
    };

    fetchCollections().then(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-lg text-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid gap-8">
          {collections.map((collection, index) => (
            <div key={index} className="overflow-hidden">
              <div className="p-6 flex flex-col md:flex-row gap-6">
                <CollectionCard collection={collection.tracks} />
                <TrackList tracks={collection.tracks} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionsList;
