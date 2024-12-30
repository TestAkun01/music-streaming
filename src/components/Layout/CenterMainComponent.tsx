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
          visibility: "auto",
          autoHide: "scroll",
        },
      }}
      className="flex-1 px-2">
      {children}
    </OverlayScrollbarsComponent>
  );
}
