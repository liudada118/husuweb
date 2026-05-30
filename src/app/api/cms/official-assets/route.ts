import { access, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { requireCmsApiUser } from "@/lib/cms-api-auth";

export const runtime = "nodejs";

const publicAssetsDir = path.join(process.cwd(), "public", "assets");
const publicUploadsDir = path.join(process.cwd(), "public", "uploads");
const assetBaseUrl =
  process.env.NEXT_PUBLIC_ASSET_BASE_URL ??
  process.env.NEXT_PUBLIC_CMS_ASSET_BASE_URL ??
  "https://img-12345.oss-cn-beijing.aliyuncs.com/husuweb";

const imageExtensions = new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".svg", ".webp"]);
const videoExtensions = new Set([".mov", ".mp4", ".webm"]);
const defaultAssetPageSize = 40;
const maxAssetPageSize = 100;
const assetCategoryOrder = [
  "home",
  "about",
  "team",
  "industries",
  "event",
  "contact",
  "core",
  "foot",
  "title",
  "other",
] as const;
const assetCategoryLabels: Record<string, string> = {
  home: "首页",
  about: "关于我们",
  team: "虎诉团队",
  industries: "服务行业",
  event: "虎诉动态",
  contact: "联系我们",
  core: "虎诉文化",
  foot: "Footer",
  title: "Title",
  other: "其他",
};
const assetCategoryAliases: Record<string, string> = {
  corevalue: "core",
  events: "event",
  footer: "foot",
  header: "title",
  media: "industries",
  podcast: "team",
  "core-value": "core",
};

type OfficialAssetItem = {
  path: string;
  url: string;
  category: string;
  categoryLabel: string;
  name: string;
  type: "file" | "image" | "video";
  sizeBytes: number;
  modifiedAt: number;
};

function normalizeAssetCategory(relativePath: string) {
  const topLevel = (relativePath.split("/")[0] || "other").toLowerCase();
  const normalized = assetCategoryAliases[topLevel] ?? topLevel;

  return assetCategoryOrder.includes(normalized as (typeof assetCategoryOrder)[number]) ? normalized : "other";
}

async function listAssetRoot(directory: string, publicPrefix: "/assets" | "/uploads"): Promise<OfficialAssetItem[]> {
  try {
    await access(directory);
  } catch {
    return [];
  }

  return listPublicFiles(directory, directory, publicPrefix);
}

async function listPublicFiles(
  directory: string,
  rootDirectory: string,
  publicPrefix: "/assets" | "/uploads",
): Promise<OfficialAssetItem[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const assets = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return listPublicFiles(entryPath, rootDirectory, publicPrefix);
      }

      if (!entry.isFile()) {
        return [];
      }

      const stats = await stat(entryPath);
      const relativePath = path.relative(rootDirectory, entryPath).split(path.sep).join("/");
      const publicPath = `${publicPrefix}/${relativePath}`;
      const extension = path.extname(entry.name).toLowerCase();
      const type: OfficialAssetItem["type"] = imageExtensions.has(extension)
        ? "image"
        : videoExtensions.has(extension)
          ? "video"
          : "file";
      const category = normalizeAssetCategory(relativePath);

      return [
        {
          path: publicPath,
          url: `${assetBaseUrl.replace(/\/$/, "")}${publicPath}`,
          category,
          categoryLabel: assetCategoryLabels[category] ?? assetCategoryLabels.other,
          name: entry.name,
          type,
          sizeBytes: stats.size,
          modifiedAt: stats.mtimeMs,
        },
      ];
    }),
  );

  return assets.flat();
}

async function listPublicAssets(): Promise<OfficialAssetItem[]> {
  const [assetFiles, uploadFiles] = await Promise.all([
    listAssetRoot(publicAssetsDir, "/assets"),
    listAssetRoot(publicUploadsDir, "/uploads"),
  ]);

  return [...assetFiles, ...uploadFiles].sort((a, b) => b.modifiedAt - a.modifiedAt || a.path.localeCompare(b.path));
}

function parsePagination(request: Request) {
  const url = new URL(request.url);
  const limit = Number(url.searchParams.get("limit") ?? defaultAssetPageSize);
  const offset = Number(url.searchParams.get("offset") ?? 0);

  return {
    category: url.searchParams.get("category")?.trim() || "all",
    limit: Number.isFinite(limit) ? Math.max(1, Math.min(maxAssetPageSize, Math.floor(limit))) : defaultAssetPageSize,
    offset: Number.isFinite(offset) ? Math.max(0, Math.floor(offset)) : 0,
    search: url.searchParams.get("search")?.trim().toLowerCase() ?? "",
  };
}

function summarizeAssets(assets: OfficialAssetItem[]) {
  return assets.reduce(
    (summary, asset) => {
      summary.count += 1;
      summary.totalBytes += asset.sizeBytes;
      summary[asset.type] += 1;
      return summary;
    },
    { count: 0, file: 0, image: 0, totalBytes: 0, video: 0 },
  );
}

export async function GET(request: Request) {
  const auth = await requireCmsApiUser();

  if (!auth.ok) {
    return auth.response;
  }

  const { category, limit, offset, search } = parsePagination(request);
  const assets = await listPublicAssets();
  const availableCategoryIds = new Set(assets.map((asset) => asset.category));
  const categories = assetCategoryOrder
    .filter((id) => availableCategoryIds.has(id))
    .map((id) => ({ id, label: assetCategoryLabels[id] ?? id }));
  const filteredAssets = assets.filter((asset) => {
    const matchesCategory = category === "all" || asset.category === category;
    const matchesSearch = !search || asset.path.toLowerCase().includes(search) || asset.url.toLowerCase().includes(search);

    return matchesCategory && matchesSearch;
  });
  const pageAssets = filteredAssets.slice(offset, offset + limit);

  return NextResponse.json({
    assets: pageAssets,
    categories,
    summary: summarizeAssets(assets),
    pagination: {
      total: filteredAssets.length,
      limit,
      offset,
      hasMore: offset + pageAssets.length < filteredAssets.length,
    },
  });
}
