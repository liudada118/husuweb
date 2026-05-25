import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { requireCmsApiUser } from "@/lib/cms-api-auth";

export const runtime = "nodejs";

const publicAssetsDir = path.join(process.cwd(), "public", "assets");
const assetBaseUrl =
  process.env.NEXT_PUBLIC_ASSET_BASE_URL ??
  process.env.NEXT_PUBLIC_CMS_ASSET_BASE_URL ??
  "https://img-12345.oss-cn-beijing.aliyuncs.com/husuweb";

const imageExtensions = new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".svg", ".webp"]);
const videoExtensions = new Set([".mov", ".mp4", ".webm"]);

type OfficialAssetItem = {
  path: string;
  url: string;
  category: string;
  name: string;
  type: "file" | "image" | "video";
  sizeBytes: number;
};

async function listPublicAssets(directory: string): Promise<OfficialAssetItem[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const assets = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return listPublicAssets(entryPath);
      }

      if (!entry.isFile()) {
        return [];
      }

      const stats = await stat(entryPath);
      const relativePath = path.relative(publicAssetsDir, entryPath).split(path.sep).join("/");
      const publicPath = `/assets/${relativePath}`;
      const extension = path.extname(entry.name).toLowerCase();
      const type: OfficialAssetItem["type"] = imageExtensions.has(extension)
        ? "image"
        : videoExtensions.has(extension)
          ? "video"
          : "file";

      return [
        {
          path: publicPath,
          url: `${assetBaseUrl.replace(/\/$/, "")}${publicPath}`,
          category: relativePath.split("/")[0] ?? "other",
          name: entry.name,
          type,
          sizeBytes: stats.size,
        },
      ];
    }),
  );

  return assets.flat().sort((a, b) => a.path.localeCompare(b.path));
}

export async function GET() {
  const auth = await requireCmsApiUser();

  if (!auth.ok) {
    return auth.response;
  }

  const assets = await listPublicAssets(publicAssetsDir);
  const categories = Array.from(new Set(assets.map((asset) => asset.category))).sort();

  return NextResponse.json({ assets, categories });
}
