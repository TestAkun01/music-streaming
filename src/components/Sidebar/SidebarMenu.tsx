import React from "react";
import Link from "next/link";
import { MenuType, COLORS } from "./shared";

interface SidebarItemProps {
  label: string;
  href?: string;
  icon?: React.ElementType;
  isOpen?: boolean;
  iconColor?: keyof typeof COLORS;
  active?: boolean;
}

const SidebarIcon = ({
  icon,
  iconColor = "default",
}: {
  icon?: React.ElementType;
  iconColor?: keyof typeof COLORS;
}) => {
  return icon ? (
    React.createElement(icon, {
      weight: "bold",
      size: 20,
      className: "text-white group-hover:text-white",
    })
  ) : (
    <span
      className={`w-2 h-2 rounded-full ${COLORS[iconColor]} group-hover:text-white`}
    />
  );
};

const SidebarText = ({ label }: { label: string }) => (
  <span className={`whitespace-nowrap  text-white`}>{label}</span>
);

const SidebarItem = ({
  icon,
  href = "#",
  label = "Label",
  iconColor = "default",
  active = false,
  isOpen,
}: SidebarItemProps) => {
  return (
    <li>
      <Link href={href} className={` px-3 py-2 group`}>
        <div className="w-7 aspect-square flex justify-center items-center">
          <SidebarIcon icon={icon} iconColor={iconColor} />
        </div>
        {isOpen && <SidebarText label={label} />}
      </Link>
    </li>
  );
};

const SideBarMenu = ({
  listItem,
  isOpen,
}: {
  listItem: MenuType[];
  isOpen: boolean;
}) => {
  return (
    <ul className="space-y-1 menu p-0">
      {listItem.map((item, index) => (
        <SidebarItem key={index} {...item} isOpen={isOpen} />
      ))}
    </ul>
  );
};

export default SideBarMenu;
