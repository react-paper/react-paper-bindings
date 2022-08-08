// @ts-check

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath,
  assetPrefix: basePath,
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    externalDir: true,
  },
};

module.exports = nextConfig;
