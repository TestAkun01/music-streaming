"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/auth");
    }
  }, [session, router]);

  if (status === "loading") {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Welcome to Your Dashboard
        </h1>
        <p className="text-center text-gray-600 mb-4">
          Hello, {session?.user?.name}
        </p>
        <p className="text-center text-gray-600 mb-6">
          Email: {session?.user?.email}
        </p>

        <div className="flex justify-center">
          <button
            onClick={() => signOut()}
            className="py-2 px-6 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200">
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
