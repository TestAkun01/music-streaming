import { Metadata } from "next";
import { Poppins } from "next/font/google";
import React from "react";
import "@/styles/globals.css";
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
        <main>{children}</main>
      </body>
    </html>
  );
}
