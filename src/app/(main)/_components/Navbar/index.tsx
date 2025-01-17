import SearchBar from "./SearchBar";
import UserSection from "./UserSection";
import NavbarIcons from "./NavbarIcons";
import { Suspense } from "react";
import NavbarSkeleton from "./NavbarSkeleton";

const Navbar = () => {
  return (
    <Suspense fallback={<NavbarSkeleton />}>
      <div className="flex items-center justify-between px-6 h-16 transition-all duration-500">
        <div className="flex items-center flex-1 max-w-xl">
          <SearchBar />
        </div>
        <div className="flex items-center gap-4 ml-4">
          <NavbarIcons />
          <UserSection />
        </div>
      </div>
    </Suspense>
  );
};

export default Navbar;
