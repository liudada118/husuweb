import { existsSync, mkdirSync, readdirSync, rmSync, statSync } from "fs";
import path from "path";
import type { CmsDashboardMetrics, CmsStorageMetric } from "./cms-types";
import { getCmsDb } from "./cms-db";

const rootDir = process.cwd();
const trackedDirectories: Array<{ key: string; label: string; path: string }> = [
  { key: "uploads", label: "媒体上传", path: path.join(rootDir, "public", "uploads") },
  { key: "database", label: "CMS 数据", path: path.join(rootDir, "data") },
  { key: "next-cache", label: "Next.js 缓存", path: path.join(rootDir, ".next", "cache") },
];

function getDayKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function getDirectorySize(targetPath: string): number {
  if (!existsSync(targetPath)) {
    return 0;
  }

  const stats = statSync(targetPath);

  if (stats.isFile()) {
    return stats.size;
  }

  if (!stats.isDirectory()) {
    return 0;
  }

  return readdirSync(targetPath).reduce((total, entry) => {
    return total + getDirectorySize(path.join(targetPath, entry));
  }, 0);
}

function countPublished(table: string) {
  const db = getCmsDb();
  return Number(
    (db.prepare(`SELECT COUNT(*) as count FROM ${table} WHERE status = 'published'`).get() as
      | { count: number }
      | undefined)?.count ?? 0,
  );
}

export function recordPublicVisit(input: { path: string; userAgent?: string }) {
  const normalizedPath = input.path.trim();

  if (
    !normalizedPath ||
    normalizedPath.startsWith("/cms") ||
    normalizedPath.startsWith("/api") ||
    normalizedPath.startsWith("/_next")
  ) {
    return;
  }

  const db = getCmsDb();
  const now = new Date();

  db.prepare(`
    INSERT INTO visit_events (path, visited_on, user_agent, created_at)
    VALUES (@path, @visitedOn, @userAgent, @createdAt)
  `).run({
    path: normalizedPath,
    visitedOn: getDayKey(now),
    userAgent: input.userAgent ?? "",
    createdAt: now.toISOString(),
  });
}

export function getCmsDashboardMetrics(): CmsDashboardMetrics {
  const db = getCmsDb();
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);

  const countVisits = (dayKey: string) =>
    Number(
      (db.prepare("SELECT COUNT(*) as count FROM visit_events WHERE visited_on = ?").get(dayKey) as
        | { count: number }
        | undefined)?.count ?? 0,
    );

  const storage: CmsStorageMetric[] = trackedDirectories.map((entry) => ({
    ...entry,
    bytes: getDirectorySize(entry.path),
  }));
  const totalStorageBytes = storage.reduce((total, entry) => total + entry.bytes, 0);
  const cacheBytes = storage.find((entry) => entry.key === "next-cache")?.bytes ?? 0;

  return {
    todayVisits: countVisits(getDayKey(today)),
    yesterdayVisits: countVisits(getDayKey(yesterday)),
    publishedArticles: countPublished("articles"),
    publishedUpdates: countPublished("media_items"),
    assetsCount: Number(
      (db.prepare("SELECT COUNT(*) as count FROM assets").get() as { count: number } | undefined)?.count ?? 0,
    ),
    totalStorageBytes,
    storage,
    cacheBytes,
    trackedAt: new Date().toISOString(),
  };
}

export function clearCmsCaches() {
  const cacheDir = path.join(rootDir, ".next", "cache");
  const bytesBefore = getDirectorySize(cacheDir);

  if (existsSync(cacheDir)) {
    const resolvedCacheDir = path.resolve(cacheDir);
    const resolvedRoot = path.resolve(rootDir);

    if (!resolvedCacheDir.startsWith(resolvedRoot)) {
      throw new Error("Refusing to delete cache outside the workspace.");
    }

    rmSync(resolvedCacheDir, { recursive: true, force: true });
  }

  mkdirSync(cacheDir, { recursive: true });

  return {
    clearedBytes: bytesBefore,
    dashboard: getCmsDashboardMetrics(),
  };
}
