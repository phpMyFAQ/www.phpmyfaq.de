/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.PAGES_BASE_PATH,
  images: {
    unoptimized: true,
  },
  output: 'export',
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