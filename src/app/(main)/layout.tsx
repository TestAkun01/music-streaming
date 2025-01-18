import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/app/(main)/_components/Navbar";
import Sidebar from "./_components/Sidebar";
import Playlist from "./_components/Playlist";
import CenterMainComponent from "@/app/(main)/_components/CenterMainComponent";
import AudioController from "@/app/(main)/_components/AudioController";
import { SpeedInsights } from "@vercel/speed-insights/next";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Modern Music App",
  description: "A modern music app layout",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiase  h-screen`}>
        <SpeedInsights />
        <div className="flex h-screen bg-zinc-900">
          <Sidebar />
          <div className="flex flex-col w-full h-full rounded rounded-s-[28px] bg-zinc-950 overflow-hidden">
            <Navbar />
            <p className="divider m-0 px-6"></p>
            <div className="flex-1 overflow-hidden relative h-full">
              <CenterMainComponent>{children}</CenterMainComponent>
              <Playlist />
            </div>
            <AudioController />
          </div>
        </div>
      </body>
    </html>
  );
}
