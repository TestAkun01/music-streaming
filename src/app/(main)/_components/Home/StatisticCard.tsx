"use client";
import { Heart, Icon, MusicNoteSimple, Radio } from "@phosphor-icons/react";

export default function StatisticsGrid({
  statistics,
}: {
  statistics: {
    likes: number | string;
    tracks: number | string;
    streams: number | string;
  };
}) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      <StatCard title="LIKES" value={statistics.likes} Icon={Heart} />
      <StatCard
        title="TRACKS"
        value={statistics.tracks}
        Icon={MusicNoteSimple}
      />
      <StatCard title="STREAMS" value={statistics.streams} Icon={Radio} />
    </div>
  );
}

function StatCard({
  title,
  value,
  Icon,
}: {
  title: string;
  value: string | number;
  Icon: Icon;
}) {
  return (
    <div className="bg-zinc-900 p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <span className="text-zinc-400">{title}</span>
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}
