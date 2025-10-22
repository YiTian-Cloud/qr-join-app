// next.config.js
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  distDir: 'Next.js', // TEMP: align to Vercel’s expectation
};
module.exports = nextConfig;
