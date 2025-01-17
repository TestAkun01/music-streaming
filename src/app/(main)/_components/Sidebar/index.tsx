"use client";

import {
  House,
  ChartBar,
  Heart,
  Clock,
  Calendar,
  Plus,
  BookBookmark,
} from "@phosphor-icons/react";
import SideBarMenu from "./SidebarContent";
import { MenuType } from "./shared";
import Header from "./Header";
import Footer from "./Footer";
import { useState } from "react";

const mainMenuItems: MenuType[] = [
  {
    icon: House,
    label: "Feed",
    active: true,
    href: "/",
  },
  { icon: BookBookmark, label: "Library", href: "/library" },
  { icon: ChartBar, label: "Statistics" },
  { icon: Heart, label: "Favourites" },
  { icon: Clock, label: "Listen Later" },
  { icon: Calendar, label: "History" },
];

const customPlaylists: MenuType[] = [
  { label: "Metalcore", iconColor: "red" },
  { label: "Electro", iconColor: "red" },
  { label: "Funk", iconColor: "yellow" },
  { label: "Disco", iconColor: "purple" },
  { icon: Plus, label: "New Playlist" },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className={`flex flex-col h-full transition-all ease-in-out duration-300 ${
        isOpen ? "w-[200px]" : "w-[76px]"
      }`}>
      <Header onToggle={handleIsOpen} isOpen={isOpen} />
      <p className="divider m-0 px-3"></p>

      <div
        className="px-3 flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-800
        hover:scrollbar-thumb-zinc-700">
        <SideBarMenu listItem={mainMenuItems} isOpen={isOpen} />
        <p className="divider m-0"></p>
        <SideBarMenu listItem={customPlaylists} isOpen={isOpen} />
      </div>

      <Footer isOpen={isOpen} />
    </div>
  );
};

export default Sidebar;
