import Database from "better-sqlite3";
import { existsSync, mkdirSync } from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");
const dbPath = path.join(dataDir, "cms.db");

let analyticsDatabase: Database.Database | null = null;

function getDayKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function getAnalyticsDb() {
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
  }

  if (!analyticsDatabase) {
    analyticsDatabase = new Database(dbPath);
    analyticsDatabase.exec(`
      CREATE TABLE IF NOT EXISTS visit_events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        path TEXT NOT NULL,
        visited_on TEXT NOT NULL,
        user_agent TEXT NOT NULL DEFAULT '',
        created_at TEXT NOT NULL
      );
    `);
  }

  return analyticsDatabase;
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

  const now = new Date();

  getAnalyticsDb()
    .prepare(
      `
        INSERT INTO visit_events (path, visited_on, user_agent, created_at)
        VALUES (@path, @visitedOn, @userAgent, @createdAt)
      `,
    )
    .run({
      path: normalizedPath,
      visitedOn: getDayKey(now),
      userAgent: input.userAgent ?? "",
      createdAt: now.toISOString(),
    });
}
