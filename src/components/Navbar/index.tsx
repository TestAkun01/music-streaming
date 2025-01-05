"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import SearchBar from "./SearchBar";
import UserSection from "./UserSection";
import NavbarIcons from "./NavbarIcons";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const session = await supabase.auth.getUser();
      if (!session.data) {
        router.push("/login");
      } else {
        setUser(session.data.user);
      }
    };

    fetchUser();
  }, [router, supabase]);

  return (
    <div className="flex items-center justify-between px-6 h-16 transition-all duration-500">
      <div className="flex items-center flex-1 max-w-xl">
        <SearchBar search={search} setSearch={setSearch} />
      </div>
      <div className="flex items-center gap-4 ml-4">
        <NavbarIcons />
        <UserSection user={user} />
      </div>
    </div>
  );
};

export default Navbar;
