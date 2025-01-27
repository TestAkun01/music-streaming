import { Gear } from "@phosphor-icons/react/dist/ssr";
import { getUser } from "@/services/Auth/User";
import { createClient } from "@/utils/supabase/server";

export default async function Navbar() {
  const supabase = await createClient();
  const user = await getUser();
  const { data: profileUser, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id!)
    .single();

  return (
    <header className="bg-zinc-900/50 backdrop-blur-sm border-b border-zinc-800 sticky top-0 z-10">
      <div className="flex items-center justify-between p-4">
        <h2 className="text-xl font-semibold text-zinc-100">Dashboard</h2>
        <div className="flex items-center gap-4">
          <button className="btn btn-ghost btn-circle">
            <Gear size={20} className="text-zinc-400" />
          </button>
          <div className="avatar">
            <div className="w-10 h-10 rounded-full bg-orange-500/20">
              {profileUser?.avatar_url ? (
                <img
                  src={profileUser.avatar_url}
                  alt={profileUser.display_name ?? ""}
                />
              ) : (
                <span className="text-orange-500 flex items-center justify-center h-full">
                  {profileUser?.display_name?.toUpperCase()}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
