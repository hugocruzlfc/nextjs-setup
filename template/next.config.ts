import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   experimental: {
    browserDebugInfoInTerminal: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
