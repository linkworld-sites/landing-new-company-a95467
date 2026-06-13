import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  allowedDevOrigins: ['*.run.linkworld.ai'],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
