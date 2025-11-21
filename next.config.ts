import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true, // Forces /about/index.html structure
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
