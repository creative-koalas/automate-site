import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    qualities: [75, 95],
  },
  async rewrites() {
    return [
      {
        source: "/download.html",
        destination: "/download",
      },
    ];
  },
};

export default nextConfig;
