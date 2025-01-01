"use client";

import { motion } from "framer-motion";
import { House } from "@phosphor-icons/react/House";
import { ChartBar } from "@phosphor-icons/react/ChartBar";
import { Heart } from "@phosphor-icons/react/Heart";
import { Clock } from "@phosphor-icons/react/Clock";
import { Calendar } from "@phosphor-icons/react/Calendar";
import { Playlist } from "@phosphor-icons/react/Playlist";
import { Plus } from "@phosphor-icons/react/Plus";
import { List } from "@phosphor-icons/react/List";
import SidebarItem from "./SidebarItem";
import { colors } from "./SidebarItem";

interface SidebarProps {
  className?: string;
  onToggle?: () => void;
  isOpen?: boolean;
}

interface MainMenuItem {
  label: string;
  href?: string;
  icon?: React.ElementType;
  active?: boolean;
  iconColor?: keyof typeof colors;
  textColor?: keyof typeof colors;
  activeColor?: keyof typeof colors;
}

const mainMenuItems: MainMenuItem[] = [
  {
    icon: House,
    label: "Feed",
    active: true,
    activeColor: "orange",
    href: "/",
  },
  { icon: Playlist, label: "Playlists" },
  { icon: ChartBar, label: "Statistics" },
];

const yourMusicItems: MainMenuItem[] = [
  { icon: Heart, label: "Favourites" },
  { icon: Clock, label: "Listen Later" },
  { icon: Calendar, label: "History" },
];

const customPlaylists: MainMenuItem[] = [
  { label: "Metalcore", iconColor: "red" },
  { label: "Electro", iconColor: "red" },
  { label: "Funk", iconColor: "yellow" },
  { label: "Disco", iconColor: "purple" },
];

export const Sidebar = ({ className, onToggle, isOpen }: SidebarProps) => {
  return (
    <motion.div
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={`flex flex-col h-full text-sm ${className} py-6 px-3`}>
      {/* Header */}
      <div className="px-3 py-1">
        <button onClick={onToggle} className="text-zinc-400 hover:text-white">
          <List weight="regular" size={20} />
        </button>
      </div>
      <p className="divider  m-0"></p>

      {/* Main Menu */}
      <div className="space-y-1 ">
        {mainMenuItems.map((item) => (
          <SidebarItem key={item.label} {...item} isOpen={isOpen} />
        ))}
      </div>

      <p className="divider  m-0"></p>
      <div className="space-y-1 ">
        {yourMusicItems.map((item) => (
          <SidebarItem key={item.label} {...item} isOpen={isOpen} />
        ))}
      </div>

      <p className="divider  m-0"></p>
      <div className="space-y-1 ">
        {customPlaylists.map((item) => (
          <SidebarItem key={item.label} {...item} isOpen={isOpen} />
        ))}
      </div>

      <div className="">
        <SidebarItem
          key={"Create"}
          label={"New Playlist"}
          icon={Plus}
          active={true}
          iconColor={"orange"}
          textColor={"orange"}
          isOpen={isOpen}
        />
      </div>

      {/* Footer */}
      <div className="mt-auto relative h-16 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: "100%" }}
          animate={{
            opacity: isOpen ? 1 : 0,
            y: isOpen ? "0%" : "100%",
            visibility: isOpen ? "visible" : "hidden",
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 25,
            delay: isOpen ? 0.3 : 0,
          }}
          className="absolute left-0 right-0 bottom-0 text-xs text-zinc-zinc  py-4">
          <p>&copy; 2024 Your Company. All Rights Reserved.</p>
        </motion.div>
      </div>
    </motion.div>
  );
};
