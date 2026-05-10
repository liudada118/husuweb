import type { NextConfig } from "next";

const basePath = process.env.NEXT_SNAPSHOT_BASE_PATH || "";
const assetBaseUrl = process.env.NEXT_PUBLIC_ASSET_BASE_URL || "";

const nextConfig: NextConfig = {
  output: "standalone",
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: Boolean(basePath),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_ASSET_BASE_URL: assetBaseUrl,
  },
};

export default nextConfig;
