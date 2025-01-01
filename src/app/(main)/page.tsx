"use client";

import FeaturedCollection from "@/components/Home/FeaturedCollection";
import NavigationTabs from "@/components/Home/NavigationTabs";
import TrackList from "@/components/Home/TrackList";
import StatisticsGrid from "@/components/Home/StatisticCard";

const Home = () => {
  const statistics = {
    likes: 247,
    tracks: 363,
    streams: 29,
  };

  return (
    <div className="p-6 pb-32">
      <FeaturedCollection />
      <NavigationTabs />
      <TrackList />
      <StatisticsGrid statistics={statistics} />
    </div>
  );
};
export default Home;
