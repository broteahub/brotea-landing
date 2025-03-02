import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
