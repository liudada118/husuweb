import type { SiteContent } from "@/app/translations/translations";
import type { CmsPageId, PageContentState } from "./cms-page-content";
import type { Language } from "./site-types";
import type { HomeCarouselItem, SiteNavigationItem, SiteSettings, SiteSocialLink } from "./site-settings";

export type CmsRole = "admin" | "editor";
export type CmsStatus = "draft" | "published" | "archived";

export interface CmsUser {
  id: number;
  username: string;
  role: CmsRole;
  forcePasswordReset: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CmsAsset {
  id: number;
  filename: string;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  diskPath: string;
  url: string;
  altText: string;
  uploadedBy: number | null;
  createdAt: string;
}

export interface CmsArticle {
  id: number;
  slug: string;
  language: Language;
  title: string;
  excerpt: string;
  content: string;
  status: CmsStatus;
  coverImageUrl: string;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CmsCaseStudy {
  id: number;
  slug: string;
  language: Language;
  type: string;
  title: string;
  dateLabel: string;
  summary: string;
  body: string;
  outcome: string;
  keywords: string[];
  status: CmsStatus;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CmsMediaItem {
  id: number;
  slug: string;
  language: Language;
  title: string;
  summary: string;
  source: string;
  externalUrl: string;
  publishedAt: string | null;
  status: CmsStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CmsPodcastEpisode {
  id: number;
  slug: string;
  language: Language;
  title: string;
  summary: string;
  externalUrl: string;
  audioUrl: string;
  durationLabel: string;
  publishedAt: string | null;
  status: CmsStatus;
  createdAt: string;
  updatedAt: string;
}

export type CmsContactSubmissionStatus = "new" | "read" | "archived";

export interface CmsContactSubmission {
  id: number;
  name: string;
  contactInfo: string;
  organization: string;
  position: string;
  subject: string;
  message: string;
  language: Language;
  status: CmsContactSubmissionStatus;
  pagePath: string;
  userAgent: string;
  ipAddress: string;
  createdAt: string;
  updatedAt: string;
}

export type VisualPage = CmsPageId;

export interface VisualPreviewRoute {
  id: VisualPage;
  route: string;
  component: string;
}

export type PuckSerializedData = {
  root: Record<string, unknown>;
  content: Array<{
    type: string;
    props: Record<string, unknown>;
    [key: string]: unknown;
  }>;
  zones?: Record<string, unknown>;
};

export interface VisualEditorState {
  source: "3.0UI";
  routes: VisualPreviewRoute[];
  puckPages?: Partial<Record<Language, Partial<Record<VisualPage, PuckSerializedData>>>>;
  updatedAt: string;
}

export interface CmsVersionSnapshot {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  isPublished: boolean;
  authorUsername: string;
}

export interface CmsStorageMetric {
  key: string;
  label: string;
  path: string;
  bytes: number;
}

export interface CmsDashboardMetrics {
  todayVisits: number;
  yesterdayVisits: number;
  publishedArticles: number;
  publishedUpdates: number;
  assetsCount: number;
  totalStorageBytes: number;
  storage: CmsStorageMetric[];
  cacheBytes: number;
  trackedAt: string;
}

export type {
  HomeCarouselItem,
  SiteNavigationItem,
  SiteSettings,
  SiteSocialLink,
};

export interface CmsVersionPayload {
  siteContent: SiteContent;
  visualEditor: VisualEditorState;
  pageContent: PageContentState;
  articles: CmsArticle[];
  caseStudies: CmsCaseStudy[];
  mediaItems: CmsMediaItem[];
  podcastEpisodes: CmsPodcastEpisode[];
}

export interface PublicCmsData {
  siteSettings: SiteSettings;
  visualEditor: VisualEditorState;
  pageContent: PageContentState;
  articles: CmsArticle[];
  caseStudies: CmsCaseStudy[];
  mediaItems: CmsMediaItem[];
  podcastEpisodes: CmsPodcastEpisode[];
  assets: CmsAsset[];
}

export interface CmsBootstrapData {
  currentUser: CmsUser;
  dashboard?: CmsDashboardMetrics;
  siteContent: SiteContent;
  visualEditor: VisualEditorState;
  pageContent: PageContentState;
  articles: CmsArticle[];
  caseStudies: CmsCaseStudy[];
  mediaItems: CmsMediaItem[];
  podcastEpisodes: CmsPodcastEpisode[];
  assets: CmsAsset[];
  versions: CmsVersionSnapshot[];
  contactSubmissions: CmsContactSubmission[];
}
