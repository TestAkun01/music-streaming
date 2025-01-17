import type { NextConfig } from "next";

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
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
    loader: "custom",
    loaderFile: "./src/services/Storage/image-loader.ts",
  },
};

export default withBundleAnalyzer(nextConfig);
