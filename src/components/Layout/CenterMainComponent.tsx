"use client";

import { ReactNode } from "react";
import "overlayscrollbars/overlayscrollbars.css";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

export default function CenterMainComponent({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <OverlayScrollbarsComponent
      defer
      options={{
        scrollbars: {
          visibility: "hidden",
        },
      }}
      className="flex-1 px-2 mb-32 h-full">
      {children}
    </OverlayScrollbarsComponent>
  );
}
