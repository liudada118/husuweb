import type { NextConfig } from "next";

const basePath = process.env.NEXT_SNAPSHOT_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "standalone",
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: Boolean(basePath),
};

export default nextConfig;
