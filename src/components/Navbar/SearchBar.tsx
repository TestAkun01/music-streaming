import { X, MagnifyingGlass } from "@phosphor-icons/react";

interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
}

const SearchBar = ({ search, setSearch }: SearchBarProps) => {
  return (
    <div className="relative w-full group">
      <label className="input h-11 input-bordered rounded-full flex items-center gap-2 focus-within:outline-orange-500/90">
        <MagnifyingGlass weight="bold" size={20} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for songs, artists, or albums..."
          className="grow "
        />
        {search.length > 0 && (
          <X onClick={() => setSearch("")} weight="bold" size={20} />
        )}
      </label>
    </div>
  );
};

export default SearchBar;
