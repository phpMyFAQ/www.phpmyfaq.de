/** @type {import('next').NextConfig} */
const isE2E = process.env.PLAYWRIGHT_TEST === '1';
const nextConfig = {
  basePath: process.env.PAGES_BASE_PATH,
  images: {
    unoptimized: true,
  },
  output: isE2E ? undefined : 'export',
  reactStrictMode: true,
  // TypeScript 7 no longer exposes the compiler API Next.js used; run the
  // TypeScript CLI instead. This flag panics the Turbopack dev server, so
  // `next dev` runs on webpack (see the dev script in package.json).
  experimental: {
    useTypeScriptCli: true,
  },
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: '/api/news/:path',
        destination: '/api/news/:path.json',
      },
    ];
  },
};

export default nextConfig;
