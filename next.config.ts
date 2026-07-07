import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.vecteezy.com",
      },
    ],
  },
};

module.exports = nextConfig;