import StatisticsGrid from "@/app/(main)/_components/Home/StatisticCard";
import TrackCarousel from "./_components/Home/TrackCarousel";
import CollectionCarousel from "./_components/Home/CollectionCarousel";
import { Suspense } from "react";
import CardSkeleton from "./_components/Home/CardSkeleton";
import NavigationTabs from "./_components/Home/NavigationTabs";

const Home = () => {
  const statistics = {
    likes: 247,
    tracks: 363,
    streams: 29,
  };

  return (
    <div className="p-6">
      <NavigationTabs />
      <Suspense fallback={<CardSkeleton />}>
        <TrackCarousel />
        <CollectionCarousel />
      </Suspense>
      <StatisticsGrid statistics={statistics} />
    </div>
  );
};
export default Home;
