import { X, MagnifyingGlass } from "@phosphor-icons/react";

interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
}

const SearchBar = ({ search, setSearch }: SearchBarProps) => {
  return (
    <div className="relative w-full group">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for songs, artists, or albums..."
        className="w-full pl-10 pr-8 py-2 rounded-full bg-zinc-800 border-2 border-zinc-700 text-zinc-300 
                   placeholder-zinc-500 focus:border-orange-500 focus:outline-none focus:ring-0 
                   transition-all duration-300"
      />
      <MagnifyingGlass
        weight="bold"
        className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-hover:text-orange-500 transition-colors duration-300"
        size={20}
      />
      {search.length > 0 && (
        <X
          onClick={() => setSearch("")}
          weight="bold"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-orange-500 transition-colors duration-300 cursor-pointer"
          size={20}
        />
      )}
    </div>
  );
};

export default SearchBar;
