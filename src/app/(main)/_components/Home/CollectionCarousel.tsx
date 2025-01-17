import { getCollectionTracks } from "@/services/Database/tracks_view";
import React from "react";
import BaseCarousel from "./BaseCarousel";
import MusicCollectionCard from "./CollectionCard";

export default async function CollectionCarousel() {
  const data = await getCollectionTracks({ groupBy: "collection", offset: 15 });

  return (
    <BaseCarousel title="Top Track">
      {data.map(({ tracks }, index) => (
        <MusicCollectionCard key={index} tracks={tracks} />
      ))}
    </BaseCarousel>
  );
}
