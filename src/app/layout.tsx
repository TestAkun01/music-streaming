import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import SessionProvider from "@/providers/SessionProvider";
import { AudioProvider } from "@/providers/AudioProvider";
import "../styles/globals.css";
import { Navbar } from "@/components/Navbar/Navbar";
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
        <SessionProvider>
          <AudioProvider>
            <div className="flex h-screen bg-zinc-900">
              <LeftMainComponent />
              <div className="w-full rounded rounded-s-[28px] bg-zinc-950 overflow-hidden flex flex-col relative">
                <Navbar />
                <div className="flex overflow-hidden pb-32">
                  <CenterMainComponent>{children}</CenterMainComponent>
                  <RightMainComponent />
                </div>
                <AudioController />
              </div>
            </div>
          </AudioProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
