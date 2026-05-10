import { mkdir, readdir, rm, stat, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { requireCmsApiUser } from "@/lib/cms-api-auth";
import { createAsset, deleteAssetRecord, findAssetById, listAssets } from "@/lib/cms-db";
import { getCmsDashboardMetrics } from "@/lib/cms-dashboard";
import { deletePublicAssetFromOss, uploadPublicAssetToOss } from "@/lib/oss-assets";

export const runtime = "nodejs";

const uploadDir = path.join(process.cwd(), "public", "uploads");

const uploadPageDirs = new Set(["home", "about", "awards", "event", "media", "podcast", "contact"]);

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

export async function GET() {
  const auth = await requireCmsApiUser();

  if (!auth.ok) {
    return auth.response;
  }

  await syncUploadDirectoryAssets();

  return NextResponse.json({ assets: listAssets(), dashboard: getCmsDashboardMetrics() });
}

export async function POST(request: Request) {
  const auth = await requireCmsApiUser();

  if (!auth.ok) {
    return auth.response;
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const altText = String(formData.get("altText") ?? "");
  const uploadPage = String(formData.get("page") ?? "").trim().toLowerCase();

  if (!(file instanceof File)) {
    return NextResponse.json({ message: "必须上传文件。" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]+/g, "-")}`;
  const targetDir = uploadPageDirs.has(uploadPage) ? path.join(uploadDir, uploadPage) : uploadDir;
  const uploadUrlPrefix = uploadPageDirs.has(uploadPage) ? `/uploads/${uploadPage}` : "/uploads";
  const diskPath = path.join(targetDir, safeName);
  const urlPath = `${uploadUrlPrefix}/${safeName}`;

  await mkdir(targetDir, { recursive: true });
  await writeFile(diskPath, buffer);

  try {
    await uploadPublicAssetToOss({
      publicPath: urlPath,
      buffer,
      contentType: file.type || "application/octet-stream",
    });
  } catch (error) {
    await rm(diskPath, { force: true });
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "OSS 上传失败。" },
      { status: 502 },
    );
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

  return NextResponse.json({ ok: true, assets: listAssets(), dashboard: getCmsDashboardMetrics() });
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
      return NextResponse.json(
        { message: error instanceof Error ? error.message : "OSS 删除失败。" },
        { status: 502 },
      );
    }
  }

  deleteAssetRecord(id);

  return NextResponse.json({ ok: true, assets: listAssets(), dashboard: getCmsDashboardMetrics() });
}
