import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "picsum.photos" },
      { hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;

