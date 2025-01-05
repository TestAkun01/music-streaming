import Link from "next/link";
import { User } from "@supabase/supabase-js";
interface UserSectionProps {
  user: User | null;
}

const UserSection = ({ user }: UserSectionProps) => {
  if (user) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard"
          className="btn btn-sm bg-orange-500 hover:bg-orange-600 border-none text-white 
                     normal-case rounded-full px-4">
          Dashboard
        </Link>
        <img
          src={user.user_metadata?.avatar_url || "/default-avatar.png"}
          alt="Profile"
          className="w-8 h-8 rounded-full ring-2 ring-orange-800 object-cover"
        />
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
