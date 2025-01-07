"use client";

import { motion } from "framer-motion";
import {
  House,
  ChartBar,
  Heart,
  Clock,
  Calendar,
  Playlist,
  Plus,
  UploadSimple,
} from "@phosphor-icons/react";
import SideBarMenu from "./SidebarContent";
import { MenuType } from "./shared";
import Header from "./Header";
import Footer from "./Footer";

const mainMenuItems: MenuType[] = [
  {
    icon: House,
    label: "Feed",
    active: true,
    href: "/",
  },
  { icon: UploadSimple, label: "Upload", href: "/upload" },
  { icon: ChartBar, label: "Statistics" },
];

const yourMusicItems: MenuType[] = [
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

const Sidebar = ({
  onToggle,
  isOpen,
}: {
  onToggle: () => void;
  isOpen: boolean;
}) => {
  return (
    <motion.div
      transition={{ duration: 0.5, ease: "easeInOut", delay: isOpen ? 0 : 0.5 }}
      className={`flex flex-col h-full`}>
      <Header onToggle={onToggle} isOpen={isOpen} />
      <p className="divider m-0 px-3"></p>

      <div
        className="px-3 flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-800
        hover:scrollbar-thumb-zinc-700">
        <SideBarMenu listItem={mainMenuItems} isOpen={isOpen} />
        <p className="divider m-0"></p>
        <SideBarMenu listItem={yourMusicItems} isOpen={isOpen} />
        <p className="divider m-0"></p>
        <SideBarMenu listItem={customPlaylists} isOpen={isOpen} />
      </div>

      <Footer isOpen={isOpen} />
    </motion.div>
  );
};

export default Sidebar;
