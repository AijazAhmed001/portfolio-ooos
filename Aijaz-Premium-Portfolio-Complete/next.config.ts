import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep Turbopack scoped to this app when a parent directory also contains a
  // lockfile (common in local workspaces and monorepo-style deployments).
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
