import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface SidebarItemProps {
  label: string;
  href?: string;
  icon?: React.ElementType;
  isOpen?: boolean;
  iconColor?: keyof typeof colors;
  textColor?: keyof typeof colors;
  activeColor?: keyof typeof colors;
  active?: boolean;
}

export const colors = {
  default: {
    bg: "bg-zinc-800",
    text: "text-zinc-400",
  },
  green: {
    bg: "bg-green-500",
    text: "text-green-500",
  },
  red: {
    bg: "bg-red-500",
    text: "text-red-500",
  },
  blue: {
    bg: "bg-blue-500",
    text: "text-blue-500",
  },
  yellow: {
    bg: "bg-yellow-500",
    text: "text-yellow-500",
  },
  purple: {
    bg: "bg-purple-500",
    text: "text-purple-500",
  },
  orange: {
    bg: "bg-orange-500",
    text: "text-orange-500",
  },
  pink: {
    bg: "bg-pink-500",
    text: "text-pink-500",
  },
};

const SidebarItem = ({
  icon,
  href = "#",
  label = "Label",
  isOpen = true,
  iconColor = "default",
  textColor = "default",
  activeColor = "orange",
  active = false,
}: SidebarItemProps) => {
  const { bg: defaultBg, text: defaultText } = colors.default;
  const { bg: iconBg, text: iconText } = colors[iconColor];
  const { bg: activeBg, text: activeText } = colors[activeColor];

  const bgClass = active ? activeBg : defaultBg;
  const textClass = active
    ? activeText
    : colors[textColor]?.text || defaultText;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: isOpen ? 0 : 0.5 }}>
      <Link
        href={href}
        className={`flex items-center px-3 py-2 ${textClass} group rounded-md group relative ${
          isOpen ? "" : "mx-auto tooltip tooltip-right"
        }`}
        data-tip={label}>
        <motion.div
          className={`min-w-[20px] aspect-square flex justify-center items-center`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}>
          {icon ? (
            React.createElement(icon, {
              weight: "bold",
              size: 20,
              className: active
                ? `${activeText} `
                : `${iconText} group-hover:text-white`,
            })
          ) : (
            <span
              className={`w-2 h-2 p-auto rounded-full ${iconBg} ${
                active ? "" : "group-hover:text-white"
              }`}
            />
          )}
        </motion.div>

        <motion.span
          className={`whitespace-nowrap ml-2 ${textClass} ${
            active ? "" : "group-hover:text-white"
          }`}
          initial={{ width: 0, opacity: 0 }}
          animate={{
            width: isOpen ? "auto" : 0,
            opacity: isOpen ? 1 : 0,
            visibility: isOpen ? "visible" : "hidden",
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}>
          {label}
        </motion.span>
      </Link>
    </motion.div>
  );
};

export default SidebarItem;
