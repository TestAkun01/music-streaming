import { ReactNode } from "react";

export default function CenterMainComponent({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="flex-1 overflow-y-auto">{children}</div>;
}
