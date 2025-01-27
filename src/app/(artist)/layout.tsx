import { Metadata } from "next";
import { Poppins } from "next/font/google";
import React from "react";
import "@/styles/globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "./test-artist/_component/Navbar";
import Sidebar from "./test-artist/_component/Sidebar";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Modern Music App",
  description: "A modern music app layout",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable}`}>
        <SpeedInsights />
        <div className="min-h-screen bg-zinc-950">
          <Sidebar />

          <div className="pl-64">
            <Navbar />
            <main className="p-6">{children} </main>
          </div>
        </div>
      </body>
    </html>
  );
}
