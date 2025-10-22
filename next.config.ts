/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  // Force a visible build dir so we can verify output
  //distDir: 'build',
};

module.exports = nextConfig;
