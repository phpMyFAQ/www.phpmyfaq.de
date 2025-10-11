/** @type {import('next').NextConfig} */
const isE2E = process.env.PLAYWRIGHT_TEST === '1'
const nextConfig = {
  basePath: process.env.PAGES_BASE_PATH,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  output: isE2E ? undefined : 'export',
  reactStrictMode: true,
  trailingSlash: true,
};

export default nextConfig;
