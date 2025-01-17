import MusicCard from "./TrackCard";
import { getCollectionTracks } from "@/services/Database/tracks_view";
import BaseCarousel from "./BaseCarousel";

export default async function TrackCarousel() {
  const data = await getCollectionTracks({ offset: 15 });
  return (
    <BaseCarousel title="Top Track">
      {data.map(({ tracks }) =>
        tracks.map((track, index) => <MusicCard key={index} track={track} />)
      )}
    </BaseCarousel>
  );
}
