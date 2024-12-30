"use client";

import {
  House,
  MagnifyingGlass,
  MusicNotes,
  PlusCircle,
  Heart,
  ArrowCircleDown,
} from "@phosphor-icons/react";

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  const menuItems = [
    { icon: House, label: "Home" },
    { icon: MagnifyingGlass, label: "Search" },
    { icon: MusicNotes, label: "Your Library" },
    { icon: ArrowCircleDown, label: "Create Playlist" },
    { icon: Heart, label: "Liked Songs" },
  ];

  const playlists = [
    "Recently Added",
    "Liked Songs",
    "Your Top Songs 2023",
    "Discover Weekly",
    "Chill Mix",
    "Dance Party",
  ];

  return (
    <div className={`flex flex-col h-full bg-gray-800 ${className}`}>
      <div className="p-6">
        <ul className="menu menu-vertical space-y-4">
          {menuItems.map((item) => (
            <li key={item.label}>
              <a className="text-gray-400 hover:text-white flex items-center gap-4">
                <item.icon size={20} />
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="px-6">
        <div className="h-[1px] bg-gray-700" />
      </div>

      <ul className="menu menu-vertical flex-1 px-6 py-4 space-y-2">
        {playlists.map((playlist, i) => (
          <li key={i}>
            <a className="text-sm text-gray-400 hover:text-white">{playlist}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};
