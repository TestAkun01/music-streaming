import Link from "next/link";
import { getUser } from "@/services/Auth/User";
import { getProfileById } from "@/services/Database/profiles";
import Image from "next/image";

const UserSection = async () => {
  const user = await getUser();

  if (user) {
    const profile = await getProfileById(user.id);
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard"
          className="btn btn-sm bg-orange-500 hover:bg-orange-600 border-none text-white 
                     normal-case rounded-full px-4">
          Dashboard
        </Link>
        {profile?.avatar_url ? (
          <Image
            src={profile.avatar_url || "/default-avatar.png"}
            alt="Profile"
            width={500}
            height={500}
            className="w-10 h-10 rounded-full ring-2 ring-orange-800 object-cover"
          />
        ) : (
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content w-10 aspect-square rounded-full">
              <span className="text-xs">
                {profile?.display_name
                  ?.match(/(\b\S)?/g)
                  ?.join("")
                  .toUpperCase() ?? "G"}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/login"
        className="btn btn-sm bg-orange-500 hover:bg-orange-600 border-none text-white normal-case rounded-full px-4">
        Login
      </Link>
    </div>
  );
};

export default UserSection;
