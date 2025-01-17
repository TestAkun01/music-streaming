export const COLORS = {
  default: "bg-zinc-800",
  green: "bg-green-500",
  red: "bg-red-500",
  blue: "bg-blue-500",
  yellow: "bg-yellow-500",
  purple: "bg-purple-500",
  orange: "bg-orange-500",
  pink: "bg-pink-500",
};

export interface MenuType {
  label: string;
  href?: string;
  icon?: React.ElementType;
  active?: boolean;
  iconColor?: keyof typeof COLORS;
}
