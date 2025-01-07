// app/forbidden/page.tsx
"use client";

import { useRouter } from "next/navigation";
import "@/styles/globals.css";

export default function Forbidden() {
  const router = useRouter();

  return (
    <html>
      <body>
        <div className="h-screen w-full flex flex-col items-center justify-center bg-zinc-900">
          <div className="text-center space-y-6">
            <div className="relative">
              <h1 className="text-9xl font-bold text-red-500">403</h1>
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 rotate-12">
                <div className="px-4 py-1 bg-red-500 text-white text-sm rounded-lg">
                  Access Denied
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-zinc-100">
                Forbidden Access
              </h2>
              <p className="text-zinc-400 max-w-md">
                Sorry, you don't have permission to access this page. Please
                contact your administrator if you think this is a mistake.
              </p>
            </div>
            <div className="space-x-4">
              <button
                onClick={() => router.back()}
                className="px-6 py-2 text-sm text-zinc-200 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors duration-300">
                Go Back
              </button>
              <button
                onClick={() => router.push("/")}
                className="px-6 py-2 text-sm text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors duration-300">
                Go Home
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
