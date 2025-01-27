"use client";

import {
  ChartLineUp,
  Gear,
  House,
  MusicNotes,
  Playlist,
  User,
} from "@phosphor-icons/react";
import Link from "next/link";

const Sidebar: React.FC = () => (
  <div className="w-64 bg-zinc-900 h-screen fixed left-0 top-0 p-4">
    <div className="flex items-center gap-2 mb-8">
      <MusicNotes size={24} className="text-orange-500" />
      <h1 className="text-xl font-bold text-zinc-100">Music Manager</h1>
    </div>

    <nav className="space-y-2">
      {[
        {
          icon: <House size={20} />,
          label: "Dashboard",
          active: true,
          href: "/test-artist/dashboard",
        },
        {
          icon: <MusicNotes size={20} />,
          label: "Tracks",
          href: "/test-artist/track",
        },
        {
          icon: <Playlist size={20} />,
          label: "Collections",
          href: "/test-artist/collection",
        },
        { icon: <ChartLineUp size={20} />, label: "Analytics" },
        { icon: <User size={20} />, label: "Profile" },
        { icon: <Gear size={20} />, label: "Settings" },
      ].map((item) => (
        <Link
          href={item.href ?? "#"}
          key={item.label}
          className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors
              ${
                item.active
                  ? "bg-orange-500/10 text-orange-500"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
              }`}>
          {item.icon}
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  </div>
);

export default Sidebar;
