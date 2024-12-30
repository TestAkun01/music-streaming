"use client";

import { House } from "@phosphor-icons/react/House";
import { ChartBar } from "@phosphor-icons/react/ChartBar";
import { Heart } from "@phosphor-icons/react/Heart";
import { Clock } from "@phosphor-icons/react/Clock";
import { Calendar } from "@phosphor-icons/react/Calendar";
import { Playlist } from "@phosphor-icons/react/Playlist";
import { Broadcast } from "@phosphor-icons/react/Broadcast";
import { Plus } from "@phosphor-icons/react/Plus";
import { List } from "@phosphor-icons/react/List";

interface SidebarProps {
  className?: string;
  onToggle?: () => void;
  isOpen?: boolean;
}

type MainMenuItem = {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  gradient?: string;
};

type CustomPlaylist = {
  name: string;
  color: string;
};

export const Sidebar = ({
  className,
  onToggle,
  isOpen = true,
}: SidebarProps) => {
  const mainMenuItems: MainMenuItem[] = [
    { icon: House, label: "Feed", active: true, gradient: "text-orange-500" },
    { icon: Playlist, label: "Playlists", active: false },
    { icon: ChartBar, label: "Statistics", active: false },
  ];

  const yourMusicItems: MainMenuItem[] = [
    { icon: Heart, label: "Favourites" },
    { icon: Clock, label: "Listen Later" },
    { icon: Calendar, label: "History" },
    { icon: Broadcast, label: "Podcasts" },
  ];

  const customPlaylists: CustomPlaylist[] = [
    { name: "Metalcore", color: "bg-red-500" },
    { name: "Electro", color: "bg-green-500" },
    { name: "Funk", color: "bg-yellow-500" },
    { name: "Disco", color: "bg-purple-500" },
  ];

  return (
    <div className={`flex flex-col h-full bg-zinc-900 text-sm ${className}`}>
      {/* Toggle Button */}
      <div className="p-6 pb-16">
        <button
          onClick={onToggle}
          className="text-zinc-400 hover:text-white transition-colors duration-200">
          <List weight="bold" size={24} />
        </button>
      </div>

      {/* Main Menu */}
      <div className="space-y-2 px-3">
        {mainMenuItems.map((item, index) => (
          <a
            href="#"
            key={item.label}
            className={`
              flex items-center gap-3 px-3 py-2 
              transition-colors duration-200
              rounded-md
              ${
                item.active
                  ? item.gradient ?? "text-orange-500"
                  : "text-zinc-400 hover:text-white"
              }
            `}>
            <div className={`relative`}>
              <item.icon weight="fill" size={20} />
            </div>
            {item.label}
          </a>
        ))}
      </div>

      {/* Your Music Section */}
      <div className="mt-8">
        <p className="text-xs font-medium text-zinc-500 px-6 mb-2">
          YOUR MUSIC
        </p>
        <div className="space-y-2 px-3">
          {yourMusicItems.map((item) => (
            <a
              href="#"
              key={item.label}
              className="
                flex items-center gap-3 px-3 py-2
                text-zinc-400 hover:text-white
                transition-colors duration-200
                rounded-md hover:bg-zinc-900
              ">
              <item.icon weight="regular" size={20} />
              {item.label}
            </a>
          ))}
        </div>
      </div>

      {/* Custom Playlists Section */}
      <div className="mt-8">
        <p className="text-xs font-medium text-zinc-500 px-6 mb-2">
          YOUR PLAYLISTS
        </p>
        <div className="space-y-2 px-3">
          {customPlaylists.map((playlist) => (
            <a
              href="#"
              key={playlist.name}
              className="
                flex items-center gap-3 px-3 py-2
                text-zinc-400 hover:text-white
                transition-colors duration-200
                rounded-md hover:bg-zinc-900
              ">
              <div className={`w-2 h-2 rounded-full ${playlist.color}`} />
              {playlist.name}
            </a>
          ))}
        </div>
      </div>

      {/* Create New Playlist Button */}
      <button
        className="
        mt-4 mx-6 flex items-center gap-2
        text-orange-500 hover:text-orange-400
        transition-colors duration-200
        text-sm
      ">
        <Plus weight="bold" size={16} />
        Create new playlist
      </button>
    </div>
  );
};
