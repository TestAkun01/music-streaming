"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import SearchBar from "./SearchBar";
import UserSection from "./UserSection";
import NavbarIcons from "./NavbarIcons";
import { Tables } from "@/types/DatabaseType";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState<Tables<"profiles"> | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const session = await supabase.auth.getUser();
        if (!session.data) {
          router.push("/login");
        }
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.data.user?.id!)
          .single();
        if (data) {
          setUser(data);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router, supabase]);

  if (loading) {
    return (
      <div className="flex items-center justify-between px-6 h-16">
        <div className="flex items-center flex-1 max-w-xl">
          <div className="skeleton h-11 w-full bg-zinc-700/50 max-w-xl rounded-full" />
        </div>
        <div className="flex items-center gap-4 ml-4">
          <div className="flex gap-2">
            <div className="skeleton w-10 h-10 bg-zinc-700/50 rounded-full" />
            <div className="skeleton w-10 h-10 bg-zinc-700/50 rounded-full" />
            <div className="skeleton w-10 h-10 bg-zinc-700/50 rounded-full" />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex flex-col gap-1">
              <div className="skeleton h-8 bg-zinc-700/50 w-[5.5rem]" />
            </div>
            <div className="skeleton w-10 h-10 bg-zinc-700/50 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between px-6 h-16 transition-all duration-500">
      <div className="flex items-center flex-1 max-w-xl">
        <SearchBar search={search} setSearch={setSearch} />
      </div>
      <div className="flex items-center gap-4 ml-4">
        <NavbarIcons />
        <UserSection user={user} isLoading={loading} />
      </div>
    </div>
  );
};

export default Navbar;
