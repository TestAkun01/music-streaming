import Link from "next/link";
import { Tables } from "@/types/DatabaseType";

interface UserSectionProps {
  user: Tables<"profiles"> | null;
  isLoading: boolean;
}

const UserSection = ({ user, isLoading }: UserSectionProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center gap-3">
        {/* Skeleton untuk tombol */}
        <div
          className="btn btn-sm bg-orange-500 hover:bg-orange-600 border-none text-white 
                     normal-case rounded-full px-4 skeleton w-20"></div>

        {/* Skeleton untuk avatar */}
        <div className="w-8 h-8 rounded-full skeleton bg-gray-300"></div>
      </div>
    );
  }

  if (user && Object.keys(user).length > 0) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard"
          className="btn btn-sm bg-orange-500 hover:bg-orange-600 border-none text-white 
                     normal-case rounded-full px-4">
          Dashboard
        </Link>
        {user.avatar_url ? (
          <img
            src={user.avatar_url || "/default-avatar.png"}
            alt="Profile"
            className="w-8 h-8 rounded-full ring-2 ring-orange-800 object-cover"
          />
        ) : (
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content w-8 aspect-square rounded-full">
              <span className="text-3xl">{user?.display_name ?? "G"}</span>
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
        className="btn btn-sm bg-orange-500 hover:bg-orange-600 border-none text-white 
                   normal-case rounded-full px-4">
        Login
      </Link>
    </div>
  );
};

export default UserSection;
