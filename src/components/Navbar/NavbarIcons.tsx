import { Bell, Gear, ShieldCheck } from "@phosphor-icons/react";

const NavbarIcons = () => {
  const icons = [Bell, Gear, ShieldCheck];

  return (
    <div className="flex items-center gap-2">
      {icons.map((Icon, index) => (
        <button
          key={index}
          className="btn btn-circle btn-sm bg-zinc-800 hover:bg-zinc-700 border-none transition-transform 
                     duration-300 hover:scale-110">
          <Icon
            size={16}
            className="text-zinc-400 hover:text-orange-500 transition-colors duration-300"
          />
        </button>
      ))}
    </div>
  );
};

export default NavbarIcons;
