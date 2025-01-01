"use client";

import { useState } from "react";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { Sidebar } from "../Sidebar";

export default function LeftMainComponent() {
  const [isOpen, setIsOpen] = useState(true);

  const handleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className={`
        relative
        transition-[width] duration-300 ease-in-out h-full
        ${isOpen ? "w-[15%]" : "w-20"}
      `}>
      <Sidebar onToggle={handleIsOpen} isOpen={isOpen} />
    </div>
  );
}
