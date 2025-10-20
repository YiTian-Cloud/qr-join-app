// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep default build output directory (.next) for Vercel.
  // Do NOT set `output: "export"` or a custom `distDir`.
  eslint: { ignoreDuringBuilds: true },   // optional: prevents lint from blocking deploys
  // typescript: { ignoreBuildErrors: true }, // <- uncomment only if type errors block builds
};

export default nextConfig;
