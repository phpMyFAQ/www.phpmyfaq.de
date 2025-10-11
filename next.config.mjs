/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.PAGES_BASE_PATH,
  distDir: 'out',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  output: 'export',
  reactStrictMode: true,
  trailingSlash: false,
};

export default nextConfig;
