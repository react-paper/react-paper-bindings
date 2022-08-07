/** @type {import('next').NextConfig} */
const prod = process.env.NODE_ENV === "production";
const nextConfig = {
  basePath: prod ? "/react-paper-bindings" : "",
  assetPrefix: prod ? "/react-paper-bindings" : "",
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    externalDir: true,
  },
};

module.exports = nextConfig;
