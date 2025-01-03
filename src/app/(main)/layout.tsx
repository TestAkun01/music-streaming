import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/styles/globals.css";
import { Navbar } from "@/components/Navbar";
import LeftMainComponent from "@/components/Layout/LeftMainComponent";
import CenterMainComponent from "@/components/Layout/CenterMainComponent";
import RightMainComponent from "@/components/Layout/RightMainComponent";
import AudioController from "@/components/Audio/AudioController";

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
        <div className="flex h-screen bg-zinc-900">
          <LeftMainComponent />
          <div className="w-full h-full rounded rounded-s-[28px] bg-[linear-gradient(200deg,_rgba(255,165,0,0.05)_0%,_rgba(10,10,10,1)_30%)] overflow-hidden flex flex-col relative">
            <Navbar />
            <div className="flex overflow-hidden relative h-full">
              <CenterMainComponent>{children}</CenterMainComponent>
              <RightMainComponent />
            </div>
            <AudioController />
          </div>
        </div>
      </body>
    </html>
  );
}
