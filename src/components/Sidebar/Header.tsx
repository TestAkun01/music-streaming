import { List, X } from "@phosphor-icons/react";

const Header = ({
  onToggle,
  isOpen,
}: {
  onToggle: () => void;
  isOpen: boolean;
}) => {
  return (
    <div className={`flex items-center justify-start px-3 h-16 `}>
      <button
        onClick={onToggle}
        className={`btn min-h-11 h-11 text-white bg-transparent hover:bg-[#a6adbb1a] border-none`}>
        <label
          className={`swap swap-rotate ${isOpen ? "swap-active" : ""}
        `}>
          <X weight="bold" className="swap-on" size={20} />
          <List weight="bold" className="swap-off" size={20} />
        </label>
      </button>
    </div>
  );
};

export default Header;
