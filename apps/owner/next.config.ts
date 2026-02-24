import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    externalDir: true,
  },
  transpilePackages: [
    "@compasser/design-system",
    "@compasser/tailwind-config",
  ],
};

export default nextConfig;