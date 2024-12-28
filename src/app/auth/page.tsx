"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthenticationPage() {
  const router = useRouter();

  const handleLogin = (provider: string) => {
    signIn(provider);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Login to Your Account
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Choose a provider to log in.
        </p>

        <div className="space-y-4">
          <button
            onClick={() => handleLogin("google")}
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200">
            Login with Google
          </button>
          <button
            onClick={() => handleLogin("github")}
            className="w-full py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition duration-200">
            Login with GitHub
          </button>
        </div>
      </div>
    </div>
  );
}
