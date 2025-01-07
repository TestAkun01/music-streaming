"use client";

import { useRouter } from "next/navigation";
import "@/styles/globals.css";

export default function NotFound() {
  const router = useRouter();

  return (
    <html>
      <body>
        <div className="h-screen w-full flex flex-col items-center justify-center bg-zinc-900">
          <div className="text-center space-y-6">
            <h1 className="text-9xl font-bold text-orange-500">404</h1>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-zinc-100">
                Page not found
              </h2>
              <p className="text-zinc-400 max-w-md">
                Sorry, we couldn't find the page you're looking for. Perhaps
                you've mistyped the URL or the page has been moved.
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
                className="px-6 py-2 text-sm text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors duration-300">
                Go Home
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
