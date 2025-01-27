"use client";

import React from "react";
import { MusicNotes, Playlist, ChartLineUp } from "@phosphor-icons/react";
import { Collection, Track } from "../type";
import QuickActions from "./QuickAction";
import StatCard from "./StatCard";

interface DashboardProps {
  tracks: Track[];
  collections: Collection[];
}

const Dashboard: React.FC<DashboardProps> = ({ tracks, collections }) => {
  const stats = [
    {
      title: "Total Tracks",
      value: tracks.length,
      change: 12,
      icon: <MusicNotes size={24} />,
    },
    {
      title: "Collections",
      value: collections.length,
      change: 5,
      icon: <Playlist size={24} />,
    },
    {
      title: "Total Plays",
      value: "12.5K",
      change: 8,
      icon: <ChartLineUp size={24} />,
    },
  ];

  return (
    <>
      <QuickActions />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card bg-zinc-900">
          <div className="card-body">
            <h3 className="card-title text-zinc-100">Recent Tracks</h3>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="text-zinc-400">
                    <th>Title</th>
                    <th>Plays</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tracks.slice(0, 5).map((track) => (
                    <tr key={track.id} className="text-zinc-300">
                      <td>{track.title}</td>
                      <td>1,234</td>
                      <td>
                        <span
                          className={`badge ${
                            track.visibility === "Public"
                              ? "badge-success"
                              : "badge-warning"
                          }`}>
                          {track.visibility}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="card bg-zinc-900">
          <div className="card-body">
            <h3 className="card-title text-zinc-100">Recent Collections</h3>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="text-zinc-400">
                    <th>Name</th>
                    <th>Tracks</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {collections.slice(0, 5).map((collection) => (
                    <tr key={collection.id} className="text-zinc-300">
                      <td>{collection.name}</td>
                      <td>12</td>
                      <td>
                        <span
                          className={`badge ${
                            collection.is_public
                              ? "badge-success"
                              : "badge-warning"
                          }`}>
                          {collection.is_public ? "Public" : "Private"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
