import type { NextConfig } from "next";

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "umnjqrkzfftphwhddgbr.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/music-streaming/**",
        search: "",
      },
    ],
  },
};

export default withBundleAnalyzer(nextConfig);
