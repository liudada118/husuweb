import type { NextConfig } from "next";

const basePath = process.env.NEXT_SNAPSHOT_BASE_PATH || "";
const assetBaseUrl = process.env.NEXT_PUBLIC_ASSET_BASE_URL || "";

const nextConfig: NextConfig = {
  output: "standalone",
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: Boolean(basePath),
  async redirects() {
    return [
      {
        source: "/client",
        destination: "/",
        permanent: false,
      },
      {
        source: "/client/:path*",
        destination: "/",
        permanent: false,
      },
      {
        source: "/zh",
        destination: "/",
        permanent: false,
      },
      {
        source: "/zh/:path*",
        destination: "/:path*",
        permanent: false,
      },
      {
        source: "/en",
        destination: "/",
        permanent: false,
      },
      {
        source: "/en/:path*",
        destination: "/:path*",
        permanent: false,
      },
    ];
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_ASSET_BASE_URL: assetBaseUrl,
  },
};

export default nextConfig;
