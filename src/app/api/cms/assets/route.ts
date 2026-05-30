import { mkdir, readdir, rm, stat, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { requireCmsApiUser } from "@/lib/cms-api-auth";
import { countAssets, createAsset, deleteAssetRecord, findAssetById, listAssets } from "@/lib/cms-db";
import { getCmsDashboardMetrics } from "@/lib/cms-dashboard";
import { deletePublicAssetFromOss, uploadPublicAssetToOss } from "@/lib/oss-assets";

export const runtime = "nodejs";

const uploadDir = path.join(process.cwd(), "public", "uploads");
const defaultAssetPageSize = 40;
const maxAssetPageSize = 100;

const uploadPageDirectories: Record<string, string> = {
  home: "home",
  about: "about",
  team: "team",
  industries: "industries",
  event: "event",
  contact: "contact",
  coreValue: "coreValue",
  footer: "footer",
  title: "title",
};

const uploadPageAliases: Record<string, keyof typeof uploadPageDirectories> = {
  about: "about",
  contact: "contact",
  core: "coreValue",
  "core-value": "coreValue",
  corevalue: "coreValue",
  event: "event",
  events: "event",
  foot: "footer",
  footer: "footer",
  header: "title",
  home: "home",
  industries: "industries",
  industry: "industries",
  media: "industries",
  podcast: "team",
  team: "team",
  title: "title",
};

const mimeByExtension: Record<string, string> = {
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".mov": "video/quicktime",
  ".mp4": "video/mp4",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webm": "video/webm",
  ".webp": "image/webp",
};

function toPublicUploadUrl(filePath: string) {
  const relativePath = path.relative(uploadDir, filePath).split(path.sep).join("/");
  return `/uploads/${relativePath}`;
}

function isMissingOssCredentials(error: unknown) {
  return error instanceof Error && error.message === "OSS credentials are not configured.";
}

function normalizeUploadPage(value?: string | null) {
  const normalized = value?.trim().toLowerCase();
  return normalized ? uploadPageAliases[normalized] : undefined;
}

function parsePagination(request: Request) {
  const url = new URL(request.url);
  const limit = Number(url.searchParams.get("limit") ?? defaultAssetPageSize);
  const offset = Number(url.searchParams.get("offset") ?? 0);
  const page = normalizeUploadPage(url.searchParams.get("page"));

  return {
    limit: Number.isFinite(limit) ? Math.max(1, Math.min(maxAssetPageSize, Math.floor(limit))) : defaultAssetPageSize,
    offset: Number.isFinite(offset) ? Math.max(0, Math.floor(offset)) : 0,
    page,
  };
}

function createAssetListPayload(pagination = { limit: defaultAssetPageSize, offset: 0, page: undefined as string | undefined }) {
  const total = countAssets(pagination.page);
  const assets = listAssets(pagination);

  return {
    assets,
    pagination: {
      total,
      limit: pagination.limit,
      offset: pagination.offset,
      page: pagination.page,
      hasMore: pagination.offset + assets.length < total,
    },
    dashboard: getCmsDashboardMetrics(),
  };
}

async function listUploadFiles(directory: string): Promise<string[]> {
  try {
    const entries = await readdir(directory, { withFileTypes: true });
    const files = await Promise.all(
      entries.map(async (entry) => {
        const entryPath = path.join(directory, entry.name);
        if (entry.isDirectory()) {
          return listUploadFiles(entryPath);
        }
        if (entry.isFile()) {
          return [entryPath];
        }
        return [];
      }),
    );

    return files.flat();
  } catch {
    return [];
  }
}

async function syncUploadDirectoryAssets() {
  const existingUrls = new Set(listAssets().map((asset) => asset.url));
  const files = await listUploadFiles(uploadDir);

  for (const filePath of files) {
    const urlPath = toPublicUploadUrl(filePath);
    if (existingUrls.has(urlPath)) {
      continue;
    }

    const fileStats = await stat(filePath);
    const filename = path.basename(filePath);
    const extension = path.extname(filename).toLowerCase();

    createAsset({
      filename,
      originalName: filename,
      mimeType: mimeByExtension[extension] ?? "application/octet-stream",
      sizeBytes: fileStats.size,
      diskPath: filePath,
      urlPath,
      uploadedBy: undefined,
    });
  }
}

export async function GET(request: Request) {
  const auth = await requireCmsApiUser();

  if (!auth.ok) {
    return auth.response;
  }

  await syncUploadDirectoryAssets();

  return NextResponse.json(createAssetListPayload(parsePagination(request)));
}

export async function POST(request: Request) {
  const auth = await requireCmsApiUser();

  if (!auth.ok) {
    return auth.response;
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const altText = String(formData.get("altText") ?? "");
  const uploadPage = normalizeUploadPage(String(formData.get("page") ?? ""));

  if (!(file instanceof File)) {
    return NextResponse.json({ message: "必须上传文件。" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]+/g, "-")}`;
  const uploadPageDirectory = uploadPage ? uploadPageDirectories[uploadPage] : undefined;
  const targetDir = uploadPageDirectory ? path.join(uploadDir, uploadPageDirectory) : uploadDir;
  const uploadUrlPrefix = uploadPageDirectory ? `/uploads/${uploadPageDirectory}` : "/uploads";
  const diskPath = path.join(targetDir, safeName);
  const urlPath = `${uploadUrlPrefix}/${safeName}`;

  await mkdir(targetDir, { recursive: true });
  await writeFile(diskPath, buffer);

  let ossWarning: string | undefined;

  try {
    await uploadPublicAssetToOss({
      publicPath: urlPath,
      buffer,
      contentType: file.type || "application/octet-stream",
    });
  } catch (error) {
    if (isMissingOssCredentials(error)) {
      ossWarning = "OSS 未配置，文件已保存到本地 public/uploads。";
    } else {
      await rm(diskPath, { force: true });
      return NextResponse.json(
        { message: error instanceof Error ? error.message : "OSS 上传失败。" },
        { status: 502 },
      );
    }
  }

  createAsset({
    filename: safeName,
    originalName: file.name,
    mimeType: file.type || "application/octet-stream",
    sizeBytes: buffer.length,
    diskPath,
    urlPath,
    altText,
    uploadedBy: auth.user.id,
  });

  return NextResponse.json({
    ok: true,
    warning: ossWarning,
    ...createAssetListPayload({ limit: defaultAssetPageSize, offset: 0, page: uploadPage }),
  });
}

export async function DELETE(request: Request) {
  const auth = await requireCmsApiUser();

  if (!auth.ok) {
    return auth.response;
  }

  const payload = (await request.json()) as { id?: number };
  const id = Number(payload.id);

  if (!Number.isFinite(id) || id <= 0) {
    return NextResponse.json({ message: "素材 ID 无效。" }, { status: 400 });
  }

  const asset = findAssetById(id);

  if (!asset) {
    return NextResponse.json({ message: "素材不存在。" }, { status: 404 });
  }

  const resolvedDiskPath = path.resolve(asset.diskPath);
  const resolvedUploadDir = path.resolve(path.join(process.cwd(), "public", "uploads"));

  if (resolvedDiskPath.startsWith(resolvedUploadDir)) {
    await rm(resolvedDiskPath, { force: true });
  }

  if (asset.url.startsWith("/uploads/")) {
    try {
      await deletePublicAssetFromOss(asset.url);
    } catch (error) {
      if (isMissingOssCredentials(error)) {
        deleteAssetRecord(id);
        return NextResponse.json({ ok: true, ...createAssetListPayload() });
      }

      return NextResponse.json(
        { message: error instanceof Error ? error.message : "OSS 删除失败。" },
        { status: 502 },
      );
    }
  }

  deleteAssetRecord(id);

  return NextResponse.json({ ok: true, ...createAssetListPayload() });
}
