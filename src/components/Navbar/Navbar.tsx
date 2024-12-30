"use client";

import {
  MagnifyingGlass,
  Bell,
  Gear,
  ShieldCheck,
} from "@phosphor-icons/react";

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-2 bg-gray-800 border-b border-gray-700">
      <div className="flex items-center flex-1 max-w-xl">
        <div className="relative w-full">
          <MagnifyingGlass
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={16}
          />
          <input
            type="search"
            placeholder="Search for songs, artists, or albums..."
            className="input input-sm input-bordered w-full pl-10 bg-gray-700 border-gray-600 focus:border-primary"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 ml-4">
        <button className="btn btn-circle btn-ghost">
          <Bell size={20} />
        </button>
        <button className="btn btn-circle btn-ghost">
          <Gear size={20} />
        </button>
        <button className="btn btn-circle btn-ghost">
          <ShieldCheck size={20} />
        </button>
      </div>
    </nav>
  );
};
