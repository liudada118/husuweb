import Database from "better-sqlite3";
import { existsSync, mkdirSync, readFileSync } from "fs";
import path from "path";
import { translations, type SiteContent } from "@/app/translations/translations";
import { hashPassword } from "./cms-auth";
import {
  defaultPageContentState,
  type PageContentLocale,
  type PageContentPage,
  type PageContentRepeaterItem,
  type PageContentSection,
  type PageContentState,
} from "./cms-page-content";
import type {
  CmsArticle,
  CmsAsset,
  CmsBootstrapData,
  CmsCaseStudy,
  CmsContactSubmission,
  CmsContactSubmissionStatus,
  CmsMediaItem,
  CmsPodcastEpisode,
  CmsRole,
  CmsUser,
  CmsVersionPayload,
  CmsVersionSnapshot,
  PublicCmsData,
  VisualEditorState,
} from "./cms-types";
import { defaultVisualEditorState } from "./cms-visual";
import type { Language } from "./site-types";
import { defaultSiteSettings } from "./site-settings";

type RawUserRow = {
  id: number;
  username: string;
  role: CmsRole;
  force_password_reset: number;
  created_at: string;
  updated_at: string;
};

const dataDir = path.join(process.cwd(), "data");
const dbPath = path.join(dataDir, "cms.db");

let database: Database.Database | null = null;

function cloneValue<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function ensureDataDirectory() {
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
  }
}

function readLegacySiteContent(): Partial<SiteContent> {
  const legacyPath = path.join(process.cwd(), "content", "site-content.json");

  if (!existsSync(legacyPath)) {
    return {};
  }

  try {
    const raw = readFileSync(legacyPath, "utf8");
    return raw.trim() ? (JSON.parse(raw) as Partial<SiteContent>) : {};
  } catch {
    return {};
  }
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeStoredAssetUrl(value: string) {
  return value.startsWith("/awardimg/")
    ? `/uploads/awards/source/${value.slice("/awardimg/".length)}`
    : value;
}

function mergeContent<T>(base: T, override: unknown): T {
  if (Array.isArray(base)) {
    return (Array.isArray(override) ? override : base) as T;
  }

  if (isPlainObject(base)) {
    const overrideObject = isPlainObject(override) ? override : {};
    const result: Record<string, unknown> = {};

    for (const key of Object.keys(base)) {
      result[key] = mergeContent(
        (base as Record<string, unknown>)[key],
        overrideObject[key],
      );
    }

    return result as T;
  }

  return (override ?? base) as T;
}

function mergePageContentFields(
  baseFields: PageContentSection["fields"],
  overrideFields: unknown,
) {
  const overrideById = new Map(
    Array.isArray(overrideFields)
      ? overrideFields
          .filter(isPlainObject)
          .map((fieldItem) => [String(fieldItem.id ?? ""), fieldItem])
      : [],
  );

  return baseFields.map((baseField) => {
    const overrideField = overrideById.get(baseField.id);

    if (!overrideField) {
      return baseField;
    }

    return {
      ...baseField,
      value:
        typeof overrideField.value === "string" && (overrideField.value !== "" || baseField.value === "")
          ? normalizeStoredAssetUrl(overrideField.value)
          : baseField.value,
    };
  });
}

const legacyRepeaterFieldMap: Record<string, Record<string, string>> = {
  cases: {
    Category: "category",
    Date: "date",
    Title: "title",
    Keywords: "keywords",
    Description: "description",
  },
  program: {
    Image: "image",
    Title: "title",
    Date: "date",
    Tag: "tag",
    Href: "href",
  },
};

function normalizeRepeaterField(fieldItem: unknown, fallback?: PageContentSection["fields"][number]) {
  if (!isPlainObject(fieldItem)) {
    return fallback ?? null;
  }

  const id = typeof fieldItem.id === "string" ? fieldItem.id : fallback?.id;

  if (!id) {
    return fallback ?? null;
  }

  return {
    id,
    label: typeof fieldItem.label === "string" ? fieldItem.label : fallback?.label ?? id,
    kind:
      fieldItem.kind === "textarea" || fieldItem.kind === "image" || fieldItem.kind === "url" || fieldItem.kind === "text"
        ? fieldItem.kind
        : fallback?.kind ?? "text",
    value:
      typeof fieldItem.value === "string" && (fieldItem.value !== "" || fallback?.value === "")
        ? normalizeStoredAssetUrl(fieldItem.value)
        : fallback?.value ?? "",
  };
}

const retiredRepeaterFieldsBySection: Record<string, Set<string>> = {
  schedule: new Set(["details"]),
};

function normalizeRepeaterItem(
  item: unknown,
  fallback?: PageContentRepeaterItem,
  sectionId?: string,
): PageContentRepeaterItem | null {
  if (!isPlainObject(item)) {
    return fallback ?? null;
  }

  const fallbackFieldMap = new Map(fallback?.fields.map((fieldItem) => [fieldItem.id, fieldItem]) ?? []);
  const rawFields = Array.isArray(item.fields) ? item.fields : fallback?.fields ?? [];
  const retiredFieldIds = sectionId ? retiredRepeaterFieldsBySection[sectionId] : undefined;
  const normalizedOverrideFields = rawFields
    .map((fieldItem) => {
      const fieldId = isPlainObject(fieldItem) ? String(fieldItem.id ?? "") : "";
      return normalizeRepeaterField(fieldItem, fallbackFieldMap.get(fieldId));
    })
    .filter(
      (fieldItem): fieldItem is PageContentSection["fields"][number] =>
        fieldItem !== null && !retiredFieldIds?.has(fieldItem.id),
    );
  const normalizedOverrideFieldIds = new Set(normalizedOverrideFields.map((fieldItem) => fieldItem.id));
  const missingFallbackFields =
    fallback?.fields.filter((fieldItem) => !normalizedOverrideFieldIds.has(fieldItem.id) && !retiredFieldIds?.has(fieldItem.id)) ??
    [];
  const fields = [...normalizedOverrideFields, ...missingFallbackFields];

  return {
    id: typeof item.id === "string" && item.id ? item.id : fallback?.id ?? `item-${Date.now()}`,
    label: typeof item.label === "string" && item.label ? item.label : fallback?.label ?? "Item",
    fields,
  };
}

const preserveBaseTailSectionIds = new Set([
  "individualAwards",
  "lawFirmAwards",
  "socialAwards",
  "schedule",
  "pastEvents",
  "appearances",
  "special",
]);

function legacyFieldsToRepeaterItems(
  sectionId: string,
  baseItems: PageContentRepeaterItem[],
  overrideFields: unknown,
) {
  if (!Array.isArray(overrideFields)) {
    return baseItems;
  }

  const legacyMap = legacyRepeaterFieldMap[sectionId];

  if (!legacyMap) {
    return baseItems;
  }

  const overrideById = new Map(
    overrideFields.filter(isPlainObject).map((fieldItem) => [String(fieldItem.id ?? ""), fieldItem]),
  );

  return baseItems.map((item, index) => ({
    ...item,
    fields: item.fields.map((fieldItem) => {
      const legacyPrefix = sectionId === "cases" ? `case${index + 1}` : `item${index + 1}`;
      const legacySuffix = Object.entries(legacyMap).find(([, mappedId]) => mappedId === fieldItem.id)?.[0];
      const overrideField = legacySuffix ? overrideById.get(`${legacyPrefix}${legacySuffix}`) : undefined;

      if (!overrideField || !isPlainObject(overrideField)) {
        return fieldItem;
      }

      return {
        ...fieldItem,
        value:
          typeof overrideField.value === "string" && (overrideField.value !== "" || fieldItem.value === "")
            ? normalizeStoredAssetUrl(overrideField.value)
            : fieldItem.value,
      };
    }),
  }));
}

function mergePageContentRepeaterItems(
  sectionId: string,
  baseItems: PageContentRepeaterItem[] | undefined,
  overrideSection: Record<string, unknown> | undefined,
) {
  if (!baseItems) {
    return undefined;
  }

  if (overrideSection && "items" in overrideSection && Array.isArray(overrideSection.items)) {
    const overrideItems = overrideSection.items;

    if (preserveBaseTailSectionIds.has(sectionId)) {
      if (overrideItems.length < baseItems.length) {
        return baseItems;
      }

      const mergedItems = baseItems.map(
        (baseItem, index) => normalizeRepeaterItem(overrideItems[index], baseItem, sectionId) ?? baseItem,
      );
      const appendedItems = overrideItems
        .slice(baseItems.length)
        .map((item) => normalizeRepeaterItem(item, undefined, sectionId))
        .filter((item): item is PageContentRepeaterItem => Boolean(item));

      return [...mergedItems, ...appendedItems];
    }

    return overrideItems
      .map((item, index) => normalizeRepeaterItem(item, baseItems[index], sectionId))
      .filter((item): item is PageContentRepeaterItem => Boolean(item));
  }

  return legacyFieldsToRepeaterItems(sectionId, baseItems, overrideSection?.fields);
}

function mergePageContentSections(
  baseSections: PageContentSection[],
  overrideSections: unknown,
) {
  const overrideById = new Map(
    Array.isArray(overrideSections)
      ? overrideSections
          .filter(isPlainObject)
          .map((sectionItem) => [String(sectionItem.id ?? ""), sectionItem])
      : [],
  );

  return baseSections.map((baseSection) => {
    const overrideSection = overrideById.get(baseSection.id);

    if (!overrideSection) {
      return baseSection;
    }

    return {
      ...baseSection,
      fields: mergePageContentFields(baseSection.fields, overrideSection.fields),
      items: mergePageContentRepeaterItems(baseSection.id, baseSection.items, overrideSection),
    };
  });
}

function mergePageContentPage(basePage: PageContentPage, overridePage: unknown): PageContentPage {
  if (!isPlainObject(overridePage)) {
    return basePage;
  }

  return {
    ...basePage,
    sections: mergePageContentSections(basePage.sections, overridePage.sections),
  };
}

function mergePageContentLocale(baseLocale: PageContentLocale, overrideLocale: unknown): PageContentLocale {
  const overrideObject = isPlainObject(overrideLocale) ? overrideLocale : {};
  const result = {} as PageContentLocale;

  (Object.keys(baseLocale) as Array<keyof PageContentLocale>).forEach((pageId) => {
    result[pageId] = mergePageContentPage(baseLocale[pageId], overrideObject[pageId]);
  });

  return result;
}

function mergePageContentState(base: PageContentState, override: unknown): PageContentState {
  const overrideObject = isPlainObject(override) ? override : {};

  return {
    zh: mergePageContentLocale(base.zh, overrideObject.zh),
    en: mergePageContentLocale(base.en, overrideObject.en),
    updatedAt: typeof overrideObject.updatedAt === "string" ? overrideObject.updatedAt : base.updatedAt,
  };
}

function getSeedSiteContent(): SiteContent {
  return mergeContent(
    {
      ...cloneValue(translations),
      siteSettings: cloneValue(defaultSiteSettings),
    } satisfies SiteContent,
    readLegacySiteContent(),
  );
}

function parseJsonField<T>(value: string, fallback: T): T {
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function mapUser(row: RawUserRow): CmsUser {
  return {
    id: row.id,
    username: row.username,
    role: row.role,
    forcePasswordReset: Boolean(row.force_password_reset),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapArticle(row: Record<string, unknown>): CmsArticle {
  return {
    id: Number(row.id),
    slug: String(row.slug),
    language: row.language as CmsArticle["language"],
    title: String(row.title),
    excerpt: String(row.excerpt),
    content: String(row.content),
    status: row.status as CmsArticle["status"],
    coverImageUrl: String(row.cover_image_url ?? ""),
    publishedAt: row.published_at ? String(row.published_at) : null,
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

function mapCaseStudy(row: Record<string, unknown>): CmsCaseStudy {
  return {
    id: Number(row.id),
    slug: String(row.slug),
    language: row.language as CmsCaseStudy["language"],
    type: String(row.type_label),
    title: String(row.title),
    dateLabel: String(row.date_label),
    summary: String(row.summary),
    body: String(row.body),
    outcome: String(row.outcome),
    keywords: parseJsonField(String(row.keywords_json ?? "[]"), [] as string[]),
    status: row.status as CmsCaseStudy["status"],
    publishedAt: row.published_at ? String(row.published_at) : null,
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

function mapMediaItem(row: Record<string, unknown>): CmsMediaItem {
  return {
    id: Number(row.id),
    slug: String(row.slug),
    language: row.language as CmsMediaItem["language"],
    title: String(row.title),
    summary: String(row.summary),
    source: String(row.source),
    externalUrl: String(row.external_url),
    publishedAt: row.published_at ? String(row.published_at) : null,
    status: row.status as CmsMediaItem["status"],
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

function mapPodcastEpisode(row: Record<string, unknown>): CmsPodcastEpisode {
  return {
    id: Number(row.id),
    slug: String(row.slug),
    language: row.language as CmsPodcastEpisode["language"],
    title: String(row.title),
    summary: String(row.summary),
    externalUrl: String(row.external_url),
    audioUrl: String(row.audio_url),
    durationLabel: String(row.duration_label),
    publishedAt: row.published_at ? String(row.published_at) : null,
    status: row.status as CmsPodcastEpisode["status"],
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

function mapAsset(row: Record<string, unknown>): CmsAsset {
  return {
    id: Number(row.id),
    filename: String(row.filename),
    originalName: String(row.original_name),
    mimeType: String(row.mime_type),
    sizeBytes: Number(row.size_bytes),
    diskPath: String(row.disk_path),
    url: String(row.url_path),
    altText: String(row.alt_text ?? ""),
    uploadedBy: row.uploaded_by ? Number(row.uploaded_by) : null,
    createdAt: String(row.created_at),
  };
}

function mapContactSubmission(row: Record<string, unknown>): CmsContactSubmission {
  return {
    id: Number(row.id),
    name: String(row.name ?? ""),
    contactInfo: String(row.contact_info ?? ""),
    organization: String(row.organization ?? ""),
    position: String(row.position ?? ""),
    subject: String(row.subject ?? ""),
    message: String(row.message ?? ""),
    language: row.language === "en" ? "en" : "zh",
    status: (row.status === "read" || row.status === "archived" ? row.status : "new") as CmsContactSubmissionStatus,
    pagePath: String(row.page_path ?? ""),
    userAgent: String(row.user_agent ?? ""),
    ipAddress: String(row.ip_address ?? ""),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

function getNow() {
  return new Date().toISOString();
}

function initializeSchema(db: Database.Database) {
  db.exec(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('admin', 'editor')),
      force_password_reset INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      token_hash TEXT NOT NULL UNIQUE,
      expires_at TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS site_state (
      id INTEGER PRIMARY KEY CHECK(id = 1),
      site_content_json TEXT NOT NULL,
      visual_editor_json TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      updated_by INTEGER
    );

    CREATE TABLE IF NOT EXISTS articles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      language TEXT NOT NULL CHECK(language IN ('zh', 'en')),
      title TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      content TEXT NOT NULL,
      status TEXT NOT NULL CHECK(status IN ('draft', 'published', 'archived')),
      cover_image_url TEXT NOT NULL DEFAULT '',
      published_at TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS case_studies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      language TEXT NOT NULL CHECK(language IN ('zh', 'en')),
      type_label TEXT NOT NULL,
      title TEXT NOT NULL,
      date_label TEXT NOT NULL,
      summary TEXT NOT NULL,
      body TEXT NOT NULL,
      outcome TEXT NOT NULL,
      keywords_json TEXT NOT NULL,
      status TEXT NOT NULL CHECK(status IN ('draft', 'published', 'archived')),
      published_at TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS media_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      language TEXT NOT NULL CHECK(language IN ('zh', 'en')),
      title TEXT NOT NULL,
      summary TEXT NOT NULL,
      source TEXT NOT NULL,
      external_url TEXT NOT NULL,
      status TEXT NOT NULL CHECK(status IN ('draft', 'published', 'archived')),
      published_at TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS podcast_episodes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      language TEXT NOT NULL CHECK(language IN ('zh', 'en')),
      title TEXT NOT NULL,
      summary TEXT NOT NULL,
      external_url TEXT NOT NULL,
      audio_url TEXT NOT NULL DEFAULT '',
      duration_label TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL CHECK(status IN ('draft', 'published', 'archived')),
      published_at TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS assets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      filename TEXT NOT NULL,
      original_name TEXT NOT NULL,
      mime_type TEXT NOT NULL,
      size_bytes INTEGER NOT NULL,
      disk_path TEXT NOT NULL,
      url_path TEXT NOT NULL,
      alt_text TEXT NOT NULL DEFAULT '',
      uploaded_by INTEGER,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS versions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      payload_json TEXT NOT NULL,
      is_published INTEGER NOT NULL DEFAULT 0,
      created_by INTEGER,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT '',
      FOREIGN KEY(created_by) REFERENCES users(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS visit_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      path TEXT NOT NULL,
      visited_on TEXT NOT NULL,
      user_agent TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS contact_submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL DEFAULT '',
      contact_info TEXT NOT NULL DEFAULT '',
      organization TEXT NOT NULL DEFAULT '',
      position TEXT NOT NULL DEFAULT '',
      subject TEXT NOT NULL DEFAULT '',
      message TEXT NOT NULL,
      language TEXT NOT NULL CHECK(language IN ('zh', 'en')) DEFAULT 'zh',
      status TEXT NOT NULL CHECK(status IN ('new', 'read', 'archived')) DEFAULT 'new',
      page_path TEXT NOT NULL DEFAULT '/contact',
      user_agent TEXT NOT NULL DEFAULT '',
      ip_address TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);
}

function ensureSiteStateColumns(db: Database.Database) {
  const columns = db.prepare("PRAGMA table_info(site_state)").all() as Array<{ name: string }>;
  const columnNames = new Set(columns.map((column) => column.name));

  if (!columnNames.has("page_content_json")) {
    db.prepare("ALTER TABLE site_state ADD COLUMN page_content_json TEXT NOT NULL DEFAULT '{}'").run();
  }
}

function ensureVersionColumns(db: Database.Database) {
  const columns = db.prepare("PRAGMA table_info(versions)").all() as Array<{ name: string }>;
  const columnNames = new Set(columns.map((column) => column.name));

  if (!columnNames.has("updated_at")) {
    db.prepare("ALTER TABLE versions ADD COLUMN updated_at TEXT NOT NULL DEFAULT ''").run();
  }

  db.prepare("UPDATE versions SET updated_at = created_at WHERE updated_at = ''").run();
}

function seedBaseState(db: Database.Database) {
  const now = getNow();
  const existingState = db.prepare("SELECT id FROM site_state WHERE id = 1").get();

  if (!existingState) {
    db.prepare(`
      INSERT INTO site_state (id, site_content_json, visual_editor_json, page_content_json, updated_at)
      VALUES (1, @siteContentJson, @visualEditorJson, @pageContentJson, @updatedAt)
    `).run({
      siteContentJson: JSON.stringify(getSeedSiteContent()),
      visualEditorJson: JSON.stringify(defaultVisualEditorState),
      pageContentJson: JSON.stringify(defaultPageContentState),
      updatedAt: now,
    });
  }

  const userCount = Number(
    (db.prepare("SELECT COUNT(*) as count FROM users").get() as { count: number } | undefined)?.count ?? 0,
  );

  if (userCount === 0) {
    const username = process.env.CMS_ADMIN_USERNAME || "admin";
    const password = process.env.CMS_ADMIN_PASSWORD || "ChangeMe123!";

    db.prepare(`
      INSERT OR IGNORE INTO users (username, password_hash, role, force_password_reset, created_at, updated_at)
      VALUES (@username, @passwordHash, 'admin', @forcePasswordReset, @createdAt, @updatedAt)
    `).run({
      username,
      passwordHash: hashPassword(password),
      forcePasswordReset: process.env.CMS_ADMIN_PASSWORD ? 0 : 1,
      createdAt: now,
      updatedAt: now,
    });
  }

  const caseCount = Number(
    (db.prepare("SELECT COUNT(*) as count FROM case_studies").get() as { count: number } | undefined)?.count ?? 0,
  );

  if (caseCount === 0) {
    const insertCase = db.prepare(`
      INSERT INTO case_studies (
        slug, language, type_label, title, date_label, summary, body, outcome,
        keywords_json, status, published_at, created_at, updated_at
      ) VALUES (
        @slug, @language, @typeLabel, @title, @dateLabel, @summary, @body, @outcome,
        @keywordsJson, 'published', @publishedAt, @createdAt, @updatedAt
      )
    `);

    (["zh", "en"] as const).forEach((language) => {
      const localeCases = translations[language].cases.casesData;

      localeCases.forEach((item, index) => {
        const slugBase =
          item.title
            .toLowerCase()
            .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
            .replace(/^-+|-+$/g, "") || `case-${language}-${index + 1}`;

        insertCase.run({
          slug: `${slugBase}-${language}-${index + 1}`,
          language,
          typeLabel: item.type,
          title: item.title,
          dateLabel: item.date,
          summary: item.summary,
          body: item.summary,
          outcome:
            language === "zh"
              ? "该案件结果与核心策略可在后台进一步完善。"
              : "Outcome and litigation strategy can be expanded further in the CMS.",
          keywordsJson: JSON.stringify(item.keywords),
          publishedAt: now,
          createdAt: now,
          updatedAt: now,
        });
      });
    });
  }
}

export function getCmsDb() {
  if (!database) {
    ensureDataDirectory();
    database = new Database(dbPath);
    initializeSchema(database);
    ensureSiteStateColumns(database);
    ensureVersionColumns(database);
    seedBaseState(database);
  }

  return database;
}

export function getSiteState() {
  const db = getCmsDb();
  const row = db.prepare(`
    SELECT site_content_json, visual_editor_json, page_content_json
    FROM site_state
    WHERE id = 1
  `).get() as { site_content_json: string; visual_editor_json: string; page_content_json: string } | undefined;

  if (!row) {
    return {
      siteContent: getSeedSiteContent(),
      visualEditor: cloneValue(defaultVisualEditorState),
      pageContent: cloneValue(defaultPageContentState),
    };
  }

  return {
    siteContent: mergeContent(
      getSeedSiteContent(),
      parseJsonField(row.site_content_json, {} as Partial<SiteContent>),
    ),
    visualEditor: mergeContent(
      cloneValue(defaultVisualEditorState),
      parseJsonField(row.visual_editor_json, {} as Partial<VisualEditorState>),
    ),
    pageContent: mergePageContentState(
      cloneValue(defaultPageContentState),
      parseJsonField(row.page_content_json, {} as Partial<PageContentState>),
    ),
  };
}

export function saveSiteState(input: {
  siteContent: SiteContent;
  visualEditor: VisualEditorState;
  pageContent: PageContentState;
  updatedBy?: number;
}) {
  const db = getCmsDb();

  db.prepare(`
    UPDATE site_state
    SET site_content_json = @siteContentJson,
        visual_editor_json = @visualEditorJson,
        page_content_json = @pageContentJson,
        updated_at = @updatedAt,
        updated_by = @updatedBy
    WHERE id = 1
  `).run({
    siteContentJson: JSON.stringify(input.siteContent),
    visualEditorJson: JSON.stringify(input.visualEditor),
    pageContentJson: JSON.stringify(input.pageContent),
    updatedAt: getNow(),
    updatedBy: input.updatedBy ?? null,
  });
}

export function listCmsUsers() {
  const db = getCmsDb();
  const rows = db.prepare(`
    SELECT id, username, role, force_password_reset, created_at, updated_at
    FROM users
    ORDER BY id ASC
  `).all() as RawUserRow[];

  return rows.map(mapUser);
}

export function findUserByUsername(username: string) {
  const db = getCmsDb();
  return db.prepare("SELECT * FROM users WHERE username = ?").get(username) as
    | (RawUserRow & { password_hash: string })
    | undefined;
}

export function updateUserPassword(userId: number, password: string) {
  const db = getCmsDb();
  db.prepare(`
    UPDATE users
    SET password_hash = @passwordHash,
        force_password_reset = 0,
        updated_at = @updatedAt
    WHERE id = @userId
  `).run({
    userId,
    passwordHash: hashPassword(password),
    updatedAt: getNow(),
  });
}

export function findUserById(id: number) {
  const db = getCmsDb();
  const row = db.prepare(`
    SELECT id, username, role, force_password_reset, created_at, updated_at
    FROM users
    WHERE id = ?
  `).get(id) as RawUserRow | undefined;

  return row ? mapUser(row) : null;
}

export function createSession(input: { userId: number; tokenHash: string; expiresAt: string }) {
  const db = getCmsDb();
  db.prepare(`
    INSERT INTO sessions (user_id, token_hash, expires_at, created_at)
    VALUES (@userId, @tokenHash, @expiresAt, @createdAt)
  `).run({
    userId: input.userId,
    tokenHash: input.tokenHash,
    expiresAt: input.expiresAt,
    createdAt: getNow(),
  });
}

export function findSessionByTokenHash(tokenHash: string) {
  const db = getCmsDb();
  return db.prepare(`
    SELECT s.id, s.user_id, s.expires_at, u.username, u.role, u.force_password_reset, u.created_at, u.updated_at
    FROM sessions s
    JOIN users u ON u.id = s.user_id
    WHERE s.token_hash = ?
  `).get(tokenHash) as
    | {
        id: number;
        user_id: number;
        expires_at: string;
        username: string;
        role: CmsRole;
        force_password_reset: number;
        created_at: string;
        updated_at: string;
      }
    | undefined;
}

export function deleteSessionByTokenHash(tokenHash: string) {
  const db = getCmsDb();
  db.prepare("DELETE FROM sessions WHERE token_hash = ?").run(tokenHash);
}

export function cleanupExpiredSessions() {
  const db = getCmsDb();
  db.prepare("DELETE FROM sessions WHERE expires_at <= ?").run(getNow());
}

function listRows<T>(sql: string, mapper: (row: Record<string, unknown>) => T) {
  const db = getCmsDb();
  const rows = db.prepare(sql).all() as Record<string, unknown>[];
  return rows.map(mapper);
}

export function listArticles(includeAllStatuses = true) {
  return listRows(
    `SELECT * FROM articles ${includeAllStatuses ? "" : "WHERE status = 'published'"} ORDER BY COALESCE(published_at, created_at) DESC, id DESC`,
    mapArticle,
  );
}

export function listCaseStudies(includeAllStatuses = true) {
  return listRows(
    `SELECT * FROM case_studies ${includeAllStatuses ? "" : "WHERE status = 'published'"} ORDER BY COALESCE(published_at, created_at) DESC, id DESC`,
    mapCaseStudy,
  );
}

export function listMediaItems(includeAllStatuses = true) {
  return listRows(
    `SELECT * FROM media_items ${includeAllStatuses ? "" : "WHERE status = 'published'"} ORDER BY COALESCE(published_at, created_at) DESC, id DESC`,
    mapMediaItem,
  );
}

export function listPodcastEpisodes(includeAllStatuses = true) {
  return listRows(
    `SELECT * FROM podcast_episodes ${includeAllStatuses ? "" : "WHERE status = 'published'"} ORDER BY COALESCE(published_at, created_at) DESC, id DESC`,
    mapPodcastEpisode,
  );
}

export function listAssets() {
  return listRows("SELECT * FROM assets ORDER BY created_at DESC, id DESC", mapAsset);
}

export function listContactSubmissions(includeArchived = false) {
  return listRows(
    `SELECT * FROM contact_submissions ${includeArchived ? "" : "WHERE status != 'archived'"} ORDER BY created_at DESC, id DESC`,
    mapContactSubmission,
  );
}

export function createContactSubmission(input: {
  name?: string;
  contactInfo?: string;
  organization?: string;
  position?: string;
  subject?: string;
  message: string;
  language?: Language;
  pagePath?: string;
  userAgent?: string;
  ipAddress?: string;
}) {
  const db = getCmsDb();
  const now = getNow();

  db.prepare(`
    INSERT INTO contact_submissions (
      name, contact_info, organization, position, subject, message, language,
      status, page_path, user_agent, ip_address, created_at, updated_at
    ) VALUES (
      @name, @contactInfo, @organization, @position, @subject, @message, @language,
      'new', @pagePath, @userAgent, @ipAddress, @createdAt, @updatedAt
    )
  `).run({
    name: input.name ?? "",
    contactInfo: input.contactInfo ?? "",
    organization: input.organization ?? "",
    position: input.position ?? "",
    subject: input.subject ?? "",
    message: input.message,
    language: input.language === "en" ? "en" : "zh",
    pagePath: input.pagePath ?? "/contact",
    userAgent: input.userAgent ?? "",
    ipAddress: input.ipAddress ?? "",
    createdAt: now,
    updatedAt: now,
  });
}

export function updateContactSubmissionStatus(id: number, status: CmsContactSubmissionStatus) {
  const db = getCmsDb();
  db.prepare("UPDATE contact_submissions SET status = ?, updated_at = ? WHERE id = ?").run(status, getNow(), id);
}

export function deleteContactSubmission(id: number) {
  const db = getCmsDb();
  db.prepare("DELETE FROM contact_submissions WHERE id = ?").run(id);
}

export function findAssetById(id: number) {
  const db = getCmsDb();
  const row = db.prepare("SELECT * FROM assets WHERE id = ?").get(id) as
    | Record<string, unknown>
    | undefined;

  return row ? mapAsset(row) : null;
}

type CollectionName = "articles" | "caseStudies" | "mediaItems" | "podcastEpisodes";

export function listCollectionItems(collection: CollectionName) {
  if (collection === "articles") return listArticles(true);
  if (collection === "caseStudies") return listCaseStudies(true);
  if (collection === "mediaItems") return listMediaItems(true);
  return listPodcastEpisodes(true);
}

export function saveCollectionItem(collection: CollectionName, payload: Record<string, unknown>) {
  const db = getCmsDb();
  const now = getNow();

  if (collection === "articles") {
    const data = payload as Partial<CmsArticle>;
    const params = {
      slug: data.slug ?? "",
      language: data.language ?? "zh",
      title: data.title ?? "",
      excerpt: data.excerpt ?? "",
      content: data.content ?? "",
      status: data.status ?? "draft",
      coverImageUrl: data.coverImageUrl ?? "",
      publishedAt: data.publishedAt ?? null,
      createdAt: data.createdAt ?? now,
      updatedAt: now,
      id: data.id ?? null,
    };

    if (data.id) {
      db.prepare(`
        UPDATE articles
        SET slug = @slug,
            language = @language,
            title = @title,
            excerpt = @excerpt,
            content = @content,
            status = @status,
            cover_image_url = @coverImageUrl,
            published_at = @publishedAt,
            updated_at = @updatedAt
        WHERE id = @id
      `).run(params);
    } else {
      db.prepare(`
        INSERT INTO articles (
          slug, language, title, excerpt, content, status,
          cover_image_url, published_at, created_at, updated_at
        ) VALUES (
          @slug, @language, @title, @excerpt, @content, @status,
          @coverImageUrl, @publishedAt, @createdAt, @updatedAt
        )
      `).run(params);
    }

    return;
  }

  if (collection === "caseStudies") {
    const data = payload as Partial<CmsCaseStudy>;
    const params = {
      slug: data.slug ?? "",
      language: data.language ?? "zh",
      typeLabel: data.type ?? "",
      title: data.title ?? "",
      dateLabel: data.dateLabel ?? "",
      summary: data.summary ?? "",
      body: data.body ?? "",
      outcome: data.outcome ?? "",
      keywordsJson: JSON.stringify(data.keywords ?? []),
      status: data.status ?? "draft",
      publishedAt: data.publishedAt ?? null,
      createdAt: data.createdAt ?? now,
      updatedAt: now,
      id: data.id ?? null,
    };

    if (data.id) {
      db.prepare(`
        UPDATE case_studies
        SET slug = @slug,
            language = @language,
            type_label = @typeLabel,
            title = @title,
            date_label = @dateLabel,
            summary = @summary,
            body = @body,
            outcome = @outcome,
            keywords_json = @keywordsJson,
            status = @status,
            published_at = @publishedAt,
            updated_at = @updatedAt
        WHERE id = @id
      `).run(params);
    } else {
      db.prepare(`
        INSERT INTO case_studies (
          slug, language, type_label, title, date_label, summary, body, outcome,
          keywords_json, status, published_at, created_at, updated_at
        ) VALUES (
          @slug, @language, @typeLabel, @title, @dateLabel, @summary, @body, @outcome,
          @keywordsJson, @status, @publishedAt, @createdAt, @updatedAt
        )
      `).run(params);
    }

    return;
  }

  if (collection === "mediaItems") {
    const data = payload as Partial<CmsMediaItem>;
    const params = {
      slug: data.slug ?? "",
      language: data.language ?? "zh",
      title: data.title ?? "",
      summary: data.summary ?? "",
      source: data.source ?? "",
      externalUrl: data.externalUrl ?? "",
      status: data.status ?? "draft",
      publishedAt: data.publishedAt ?? null,
      createdAt: data.createdAt ?? now,
      updatedAt: now,
      id: data.id ?? null,
    };

    if (data.id) {
      db.prepare(`
        UPDATE media_items
        SET slug = @slug,
            language = @language,
            title = @title,
            summary = @summary,
            source = @source,
            external_url = @externalUrl,
            status = @status,
            published_at = @publishedAt,
            updated_at = @updatedAt
        WHERE id = @id
      `).run(params);
    } else {
      db.prepare(`
        INSERT INTO media_items (
          slug, language, title, summary, source, external_url, status,
          published_at, created_at, updated_at
        ) VALUES (
          @slug, @language, @title, @summary, @source, @externalUrl, @status,
          @publishedAt, @createdAt, @updatedAt
        )
      `).run(params);
    }

    return;
  }

  const data = payload as Partial<CmsPodcastEpisode>;
  const params = {
    slug: data.slug ?? "",
    language: data.language ?? "zh",
    title: data.title ?? "",
    summary: data.summary ?? "",
    externalUrl: data.externalUrl ?? "",
    audioUrl: data.audioUrl ?? "",
    durationLabel: data.durationLabel ?? "",
    status: data.status ?? "draft",
    publishedAt: data.publishedAt ?? null,
    createdAt: data.createdAt ?? now,
    updatedAt: now,
    id: data.id ?? null,
  };

  if (data.id) {
    db.prepare(`
      UPDATE podcast_episodes
      SET slug = @slug,
          language = @language,
          title = @title,
          summary = @summary,
          external_url = @externalUrl,
          audio_url = @audioUrl,
          duration_label = @durationLabel,
          status = @status,
          published_at = @publishedAt,
          updated_at = @updatedAt
      WHERE id = @id
    `).run(params);
  } else {
    db.prepare(`
      INSERT INTO podcast_episodes (
        slug, language, title, summary, external_url, audio_url, duration_label,
        status, published_at, created_at, updated_at
      ) VALUES (
        @slug, @language, @title, @summary, @externalUrl, @audioUrl, @durationLabel,
        @status, @publishedAt, @createdAt, @updatedAt
      )
    `).run(params);
  }
}

export function deleteCollectionItem(collection: CollectionName, id: number) {
  const db = getCmsDb();
  const table = {
    articles: "articles",
    caseStudies: "case_studies",
    mediaItems: "media_items",
    podcastEpisodes: "podcast_episodes",
  }[collection];

  db.prepare(`DELETE FROM ${table} WHERE id = ?`).run(id);
}

export function createAsset(input: {
  filename: string;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  diskPath: string;
  urlPath: string;
  altText?: string;
  uploadedBy?: number;
}) {
  const db = getCmsDb();
  db.prepare(`
    INSERT INTO assets (
      filename, original_name, mime_type, size_bytes, disk_path, url_path,
      alt_text, uploaded_by, created_at
    ) VALUES (
      @filename, @originalName, @mimeType, @sizeBytes, @diskPath, @urlPath,
      @altText, @uploadedBy, @createdAt
    )
  `).run({
    ...input,
    altText: input.altText ?? "",
    uploadedBy: input.uploadedBy ?? null,
    createdAt: getNow(),
  });
}

export function updateAssetDetails(input: { id: number; altText: string }) {
  const db = getCmsDb();
  db.prepare(`
    UPDATE assets
    SET alt_text = @altText
    WHERE id = @id
  `).run({
    id: input.id,
    altText: input.altText,
  });
}

export function deleteAssetRecord(id: number) {
  const db = getCmsDb();
  db.prepare("DELETE FROM assets WHERE id = ?").run(id);
}

export function getPublicCmsData(): PublicCmsData {
  const state = getSiteState();

  return {
    siteSettings: state.siteContent.siteSettings,
    visualEditor: state.visualEditor,
    pageContent: state.pageContent,
    articles: listArticles(false),
    caseStudies: listCaseStudies(false),
    mediaItems: listMediaItems(false),
    podcastEpisodes: listPodcastEpisodes(false),
    assets: listAssets(),
  };
}

export function listVersions() {
  const db = getCmsDb();
  const rows = db.prepare(`
    SELECT v.id, v.name, v.description, v.created_at, v.updated_at, v.is_published, u.username AS author_username
    FROM versions v
    LEFT JOIN users u ON u.id = v.created_by
    ORDER BY COALESCE(NULLIF(v.updated_at, ''), v.created_at) DESC, v.id DESC
  `).all() as Array<{
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
    is_published: number;
    author_username: string | null;
  }>;

  return rows.map((row): CmsVersionSnapshot => ({
    id: row.id,
    name: row.name,
    description: row.description,
    createdAt: row.created_at,
    updatedAt: row.updated_at || row.created_at,
    isPublished: Boolean(row.is_published),
    authorUsername: row.author_username ?? "unknown",
  }));
}

function createVersionPayload(): CmsVersionPayload {
  const state = getSiteState();

  return {
    siteContent: state.siteContent,
    visualEditor: state.visualEditor,
    pageContent: state.pageContent,
    articles: listArticles(true),
    caseStudies: listCaseStudies(true),
    mediaItems: listMediaItems(true),
    podcastEpisodes: listPodcastEpisodes(true),
  };
}

export function createVersion(input: { name: string; description: string; createdBy?: number; sourceVersionId?: number | null }) {
  const db = getCmsDb();
  const now = getNow();
  const sourceVersion = input.sourceVersionId ? getVersionEditorData(input.sourceVersionId) : null;
  const sourcePayload = sourceVersion?.payload ?? createVersionPayload();
  const payload = sourcePayload;

  db.prepare(`
    INSERT INTO versions (name, description, payload_json, created_by, created_at, updated_at)
    VALUES (@name, @description, @payloadJson, @createdBy, @createdAt, @updatedAt)
  `).run({
    name: input.name,
    description: input.description,
    payloadJson: JSON.stringify(payload),
    createdBy: input.createdBy ?? null,
    createdAt: now,
    updatedAt: now,
  });
}

export function updateVersionPayload(input: {
  versionId: number;
  payload: CmsVersionPayload;
  name?: string;
  description?: string;
}) {
  const db = getCmsDb();
  const existing = db.prepare("SELECT id FROM versions WHERE id = ?").get(input.versionId);

  if (!existing) {
    throw new Error("Version not found.");
  }
  const payload = input.payload;

  db.prepare(`
    UPDATE versions
    SET payload_json = @payloadJson,
        name = COALESCE(@name, name),
        description = COALESCE(@description, description),
        updated_at = @updatedAt
    WHERE id = @versionId
  `).run({
    versionId: input.versionId,
    payloadJson: JSON.stringify(payload),
    name: input.name ?? null,
    description: input.description ?? null,
    updatedAt: getNow(),
  });
}

export function getVersionEditorData(versionId: number) {
  const preview = getVersionPreviewData(versionId);

  if (!preview) {
    return null;
  }

  return {
    version: preview.version,
    payload: {
      siteContent: preview.siteContent,
      visualEditor: preview.publicData.visualEditor,
      pageContent: preview.publicData.pageContent,
      articles: preview.publicData.articles,
      caseStudies: preview.publicData.caseStudies,
      mediaItems: preview.publicData.mediaItems,
      podcastEpisodes: preview.publicData.podcastEpisodes,
    } satisfies CmsVersionPayload,
  };
}

export function restoreVersion(versionId: number, updatedBy?: number) {
  const db = getCmsDb();
  const row = db.prepare("SELECT payload_json FROM versions WHERE id = ?").get(versionId) as
    | { payload_json: string }
    | undefined;

  if (!row) {
    throw new Error("Version not found.");
  }

  const payload = parseJsonField(row.payload_json, null as CmsVersionPayload | null);

  if (!payload) {
    throw new Error("Version payload is invalid.");
  }

  const restore = db.transaction(() => {
    saveSiteState({
      siteContent: payload.siteContent,
      visualEditor: payload.visualEditor,
      pageContent: payload.pageContent ?? cloneValue(defaultPageContentState),
      updatedBy,
    });

    db.prepare("DELETE FROM articles").run();
    db.prepare("DELETE FROM case_studies").run();
    db.prepare("DELETE FROM media_items").run();
    db.prepare("DELETE FROM podcast_episodes").run();

    payload.articles.forEach((item) => saveCollectionItem("articles", { ...item, id: undefined } as unknown as Record<string, unknown>));
    payload.caseStudies.forEach((item) => saveCollectionItem("caseStudies", { ...item, id: undefined } as unknown as Record<string, unknown>));
    payload.mediaItems.forEach((item) => saveCollectionItem("mediaItems", { ...item, id: undefined } as unknown as Record<string, unknown>));
    payload.podcastEpisodes.forEach((item) => saveCollectionItem("podcastEpisodes", { ...item, id: undefined } as unknown as Record<string, unknown>));
  });

  restore();
}

export function publishVersion(versionId: number, updatedBy?: number) {
  const db = getCmsDb();
  db.prepare("UPDATE versions SET is_published = 0").run();
  db.prepare("UPDATE versions SET is_published = 1 WHERE id = ?").run(versionId);
  restoreVersion(versionId, updatedBy);
}

export function getVersionPreviewData(versionId: number) {
  const db = getCmsDb();
  const row = db.prepare(`
    SELECT v.id, v.name, v.description, v.payload_json, v.created_at, v.updated_at, v.is_published, u.username AS author_username
    FROM versions v
    LEFT JOIN users u ON u.id = v.created_by
    WHERE v.id = ?
  `).get(versionId) as
    | {
        id: number;
        name: string;
        description: string;
        payload_json: string;
        created_at: string;
        updated_at: string;
        is_published: number;
        author_username: string | null;
      }
    | undefined;

  if (!row) {
    return null;
  }

  const payload = parseJsonField(row.payload_json, null as CmsVersionPayload | null);

  if (!payload) {
    return null;
  }

  const siteContent = mergeContent(getSeedSiteContent(), payload.siteContent);
  const visualEditor = mergeContent(cloneValue(defaultVisualEditorState), payload.visualEditor);
  const pageContent = mergePageContentState(cloneValue(defaultPageContentState), payload.pageContent);

  return {
    version: {
      id: row.id,
      name: row.name,
      description: row.description,
      createdAt: row.created_at,
      updatedAt: row.updated_at || row.created_at,
      isPublished: Boolean(row.is_published),
      authorUsername: row.author_username ?? "unknown",
    } satisfies CmsVersionSnapshot,
    siteContent,
    publicData: {
      siteSettings: siteContent.siteSettings,
      visualEditor,
      pageContent,
      articles: payload.articles,
      caseStudies: payload.caseStudies,
      mediaItems: payload.mediaItems,
      podcastEpisodes: payload.podcastEpisodes,
      assets: listAssets(),
    } satisfies PublicCmsData,
  };
}

export function getCmsBootstrapData(userId: number): CmsBootstrapData {
  const state = getSiteState();
  const currentUser = findUserById(userId);

  if (!currentUser) {
    throw new Error("User not found.");
  }

  return {
    currentUser,
    siteContent: state.siteContent,
    visualEditor: state.visualEditor,
    pageContent: state.pageContent,
    articles: listArticles(true),
    caseStudies: listCaseStudies(true),
    mediaItems: listMediaItems(true),
    podcastEpisodes: listPodcastEpisodes(true),
    assets: listAssets(),
    versions: listVersions(),
    contactSubmissions: listContactSubmissions(true),
  };
}
