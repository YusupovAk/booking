import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
  },
  experimental: {
    turbo: {
      resolveAlias: {
        '@': './app',
      },
    },
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, './app');
    return config;
  },
};

export default nextConfig;
