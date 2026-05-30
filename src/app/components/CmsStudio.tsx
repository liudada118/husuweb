"use client";

import Link from "next/link";
import type { ChangeEvent, ComponentType, Dispatch, FormEvent, ReactNode, RefObject, SetStateAction } from "react";
import { Children, isValidElement, useEffect, useMemo, useRef, useState, useTransition } from "react";
import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  Database,
  ExternalLink,
  Eye,
  FileImage,
  FileText,
  Globe2,
  HardDrive,
  Home,
  ImageIcon,
  Layers3,
  LayoutDashboard,
  KeyRound,
  LogOut,
  Maximize2,
  Mic2,
  Monitor,
  Newspaper,
  Palette,
  Pencil,
  Radio,
  RefreshCcw,
  Save,
  Settings2,
  Smartphone,
  Trash2,
  Upload,
} from "lucide-react";
import { CmsPuckVisualEditor } from "./CmsPuckVisualEditor";
import type {
  CmsPageId,
  PageContentField,
  PageContentRepeaterItem,
  PageContentSection,
  PageContentState,
} from "@/lib/cms-page-content";
import {
  createPastEventPlatformFields,
  createPastEventProgramFields,
  getPastEventPlatformNumber,
  getPastEventPlatformNumbersFromFields,
  getPastEventProgramNumber,
  getPastEventProgramNumbersFromFields,
  getPageContentItemField,
  isPastEventPlatformFieldId,
  defaultPageContentState,
  mergePageContentDefaults,
} from "@/lib/cms-page-content";
import type {
  CmsArticle,
  CmsAsset,
  CmsBootstrapData,
  CmsCaseStudy,
  CmsContactSubmission,
  CmsDashboardMetrics,
  CmsMediaItem,
  CmsPodcastEpisode,
  CmsVersionPayload,
  CmsVersionSnapshot,
  VisualEditorState,
} from "@/lib/cms-types";
import type { SiteContent } from "../translations/translations";
import type { Language } from "@/lib/site-types";
import type {
  OfficialCmsChronicleEvent,
  OfficialCmsChronicleYear,
  OfficialCmsEventOverride,
  OfficialCmsHonorAward,
  OfficialCmsHonorYear,
  OfficialCmsIndustryListItem,
  OfficialCmsLocalizedEventOverride,
  OfficialCmsSiteState,
  OfficialCmsTeamProfileContent,
} from "@/cms/official-state";
import { events as officialEventsData, formatEventDate } from "@/data/events";
import { teamProfiles } from "@/data/teamProfiles";
import { resolvePublicAssetUrl } from "@/lib/public-assets";
import { honorData, withZhSponsorHonors, zhHonorData } from "@/components/sections/about/Honors";
import { chronicleGroups, zhChronicleGroups } from "@/components/sections/about/Chronicle";
import {
  industries as industryDetailDefaults,
  zhIndustries as zhIndustryDetailDefaults,
  type IndustrySlug,
} from "@/components/pages/IndustryDetailPage";

type EditorValue =
  | string
  | number
  | boolean
  | null
  | EditorValue[]
  | { [key: string]: EditorValue };

type PathSegment = string | number;

type StudioPanel =
  | "overview"
  | "pageContent"
  | "visual"
  | "articles"
  | "carousel"
  | "eventAwards"
  | "homeEventCarousel"
  | "homeHonorsCarousel"
  | "officialIndustries"
  | "officialHonors"
  | "officialChronicle"
  | "officialPartners"
  | "officialSeniorAssociates"
  | "officialEvents"
  | "site"
  | "assets"
  | "cases"
  | "media"
  | "podcast"
  | "contactSubmissions"
  | "versions";

type CollectionItem = CmsArticle | CmsCaseStudy | CmsMediaItem | CmsPodcastEpisode;

const localeLabels: Record<Language, string> = {
  zh: "中文",
  en: "English",
};

const fieldLabels: Record<string, string> = {
  id: "ID",
  slug: "唯一标识",
  language: "语言",
  title: "标题",
  excerpt: "摘要",
  content: "正文",
  status: "状态",
  coverImageUrl: "封面图链接",
  publishedAt: "发布时间",
  createdAt: "创建时间",
  updatedAt: "更新时间",
  type: "类型",
  dateLabel: "日期标签",
  summary: "摘要说明",
  body: "正文内容",
  outcome: "结果说明",
  keywords: "关键词",
  source: "来源",
  externalUrl: "外部链接",
  audioUrl: "音频链接",
  durationLabel: "时长",
  filename: "文件名",
  originalName: "原始名称",
  mimeType: "文件类型",
  sizeBytes: "文件大小",
  diskPath: "磁盘路径",
  url: "访问地址",
  altText: "替代文本",
  uploadedBy: "上传人",
  name: "版本名称",
  description: "描述",
  visible: "显示",
  tone: "视觉风格",
  density: "排版密度",
  siteName: "站点名称",
  siteSubtitle: "站点副标题",
  logoUrl: "Logo 地址",
  officialSiteUrl: "官网链接",
  officialSiteLabel: "官网文字",
  headerLanguageZhLabel: "标题栏语言中文",
  headerLanguageEnLabel: "标题栏语言 English",
  headerOfficialLogoUrl: "标题栏官网 Logo",
  footerLeftLogoUrl: "页脚左侧 Logo",
  footerRightLogoUrl: "页脚右侧 Logo",
  footerOfficialLogoUrl: "页脚官网图片",
  footerEmail: "页脚邮箱",
  footerPhone: "页脚电话",
  footerQuote: "页脚引言",
  navigation: "导航结构",
  socialLinks: "社交链接",
  href: "链接地址",
  labelZh: "中文名称",
  labelEn: "英文名称",
  label: "名称",
  iconSrc: "图标地址",
  order: "排序",
  titleZh: "中文标题",
  titleEn: "英文标题",
  descriptionZh: "中文描述",
  descriptionEn: "英文描述",
  imageUrl: "图片地址",
  linkUrl: "跳转链接",
  linkLabelZh: "中文按钮",
  linkLabelEn: "英文按钮",
};

const pageSectionLabels: Record<string, string> = {
  header: "头部导航",
  hero: "首屏区域",
  about: "关于介绍",
  cases: "案例模块",
  explore: "探索模块",
  cta: "联系引导",
  footer: "页脚信息",
};

const collectionTitleMap = {
  articles: "旧内容集合",
  "case-studies": "旧内容集合",
  "media-items": "旧内容集合",
  "podcast-episodes": "旧内容集合",
} as const;

const contactSubmissionStatusLabels: Record<CmsContactSubmission["status"], string> = {
  new: "未读",
  read: "已读",
  archived: "已归档",
};

const readOnlyKeys = new Set(["id", "createdAt", "updatedAt"]);

type RepeatableManagerGroup = {
  id: string;
  title: string;
  description: string;
  pageId: CmsPageId;
  sectionId: string;
};

const carouselManagerGroups: RepeatableManagerGroup[] = [
  {
    id: "home-cases",
    title: "首页 - 案例轮播",
    description: "管理首页 Representative Cases 案例卡片。",
    pageId: "home",
    sectionId: "cases",
  },
  {
    id: "home-program",
    title: "首页 - Program 轮播",
    description: "管理首页 Program Representative 的图片、标题、日期、标签和链接。",
    pageId: "home",
    sectionId: "program",
  },
  {
    id: "about-work-life",
    title: "关于页 - Work & Life 轮播",
    description: "管理关于页 Work & Life 图片轮播。",
    pageId: "about",
    sectionId: "workLife",
  },
  {
    id: "event-schedule",
    title: "Event 页 - Schedule 轮播",
    description: "管理活动页 Schedule Carousel 的日程卡片。",
    pageId: "event",
    sectionId: "schedule",
  },
  {
    id: "podcast-special",
    title: "播客页 - Special Edition 轮播",
    description: "管理播客页 Special Edition 轮播内容。",
    pageId: "podcast",
    sectionId: "special",
  },
];

const eventAwardsManagerGroups: RepeatableManagerGroup[] = [
  {
    id: "awards-individual",
    title: "Awards 页 - 个人奖项",
    description: "管理 INDIVIDUAL LAWYER AWARDS 条目。",
    pageId: "awards",
    sectionId: "individualAwards",
  },
  {
    id: "awards-firm",
    title: "Awards 页 - 律所奖项",
    description: "管理 Law Firm Awards 条目。",
    pageId: "awards",
    sectionId: "lawFirmAwards",
  },
  {
    id: "awards-social",
    title: "Awards 页 - 新媒体奖项",
    description: "管理 Social Media Awards 条目。",
    pageId: "awards",
    sectionId: "socialAwards",
  },
  {
    id: "event-past",
    title: "Event 页 - 过往活动",
    description: "管理 Past Events 活动记录。",
    pageId: "event",
    sectionId: "pastEvents",
  },
  {
    id: "media-appearances",
    title: "Media 页 - Program Appearances",
    description: "管理媒体页节目露出内容。",
    pageId: "media",
    sectionId: "appearances",
  },
];

const navigationGroups: Array<{
  title: string;
  icon: ComponentType<{ className?: string }>;
  defaultOpen?: boolean;
  items: Array<{ id: StudioPanel; label: string }>;
}> = [
  {
    title: "仪表盘",
    icon: LayoutDashboard,
    defaultOpen: true,
    items: [{ id: "overview", label: "数据概览" }],
  },
  {
    title: "页面编辑",
    icon: Palette,
    defaultOpen: true,
    items: [{ id: "visual", label: "可视化编辑" }],
  },
  {
    title: "内容管理",
    icon: FileText,
    defaultOpen: true,
    items: [
      { id: "homeEventCarousel", label: "首页 event 事件轮播" },
      { id: "homeHonorsCarousel", label: "首页 HONORS 轮播" },
      { id: "officialIndustries", label: "服务行业" },
      { id: "officialHonors", label: "虎诉荣誉" },
      { id: "officialChronicle", label: "虎诉大事记" },
      { id: "officialPartners", label: "合伙人" },
      { id: "officialSeniorAssociates", label: "资深律师" },
      { id: "officialEvents", label: "虎诉动态" },
      { id: "assets", label: "文件管理" },
    ],
  },
  {
    title: "系统设置",
    icon: Settings2,
    defaultOpen: true,
    items: [
      { id: "site", label: "站点信息配置" },
      { id: "versions", label: "版本发布" },
    ],
  },
];

const quickActions: Array<{
  title: string;
  description: string;
  panel: StudioPanel;
  icon: ComponentType<{ className?: string }>;
  accent: string;
}> = [
  {
    title: "可视化编辑",
    description: "进入页面预览并直接修改页面文案、图片和链接。",
    panel: "visual",
    icon: Pencil,
    accent: "text-[#2563eb] bg-[#eef4ff]",
  },
  {
    title: "上传图片",
    description: "集中管理网站使用的所有图片和视频素材。",
    panel: "assets",
    icon: ImageIcon,
    accent: "text-[#059669] bg-[#ecfdf5]",
  },
  {
    title: "管理轮播",
    description: "维护首页、关于页、活动页和播客页的轮播内容。",
    panel: "homeEventCarousel",
    icon: Layers3,
    accent: "text-[#f97316] bg-[#fff7ed]",
  },
];

const systemActions: Array<{
  title: string;
  description: string;
  panel: StudioPanel;
  icon: ComponentType<{ className?: string }>;
  accent: string;
}> = [
  {
    title: "界面/外观设置",
    description: "自定义网站主题、Logo、导航和联系信息。",
    panel: "site",
    icon: Palette,
    accent: "text-[#1d4ed8] bg-[#eef2ff]",
  },
  {
    title: "页面可视化编辑",
    description: "通过拖拽画布快速调整栏目结构和模块布局。",
    panel: "visual",
    icon: Layers3,
    accent: "text-[#7c3aed] bg-[#f5f3ff]",
  },
  {
    title: "系统与版本",
    description: "创建快照、恢复历史版本并发布到站点。",
    panel: "versions",
    icon: Database,
    accent: "text-[#059669] bg-[#ecfdf5]",
  },
];

function cloneValue<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function titleCase(key: string) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^./, (char) => char.toUpperCase());
}

function getFieldLabel(key: string) {
  return fieldLabels[key] ?? titleCase(key);
}

function getPageSectionLabel(key: string) {
  return pageSectionLabels[key] ?? getFieldLabel(key);
}

function isObject(value: EditorValue): value is { [key: string]: EditorValue } {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getValueAtPath(root: EditorValue, path: PathSegment[]): EditorValue {
  return path.reduce<EditorValue>((current, segment) => {
    if (Array.isArray(current)) {
      return current[segment as number];
    }

    if (isObject(current)) {
      return current[String(segment)];
    }

    return current;
  }, root);
}

function setValueAtPath(root: EditorValue, path: PathSegment[], nextValue: EditorValue): EditorValue {
  if (path.length === 0) {
    return nextValue;
  }

  const [head, ...tail] = path;

  if (Array.isArray(root)) {
    return root.map((item, index) => (index === head ? setValueAtPath(item, tail, nextValue) : item));
  }

  if (isObject(root)) {
    return {
      ...root,
      [String(head)]: setValueAtPath(root[String(head)], tail, nextValue),
    };
  }

  return root;
}

function createEmptyValue(sample: EditorValue): EditorValue {
  if (Array.isArray(sample)) {
    const first = sample[0];
    return first === undefined ? [] : [createEmptyValue(first)];
  }

  if (isObject(sample)) {
    const result: Record<string, EditorValue> = {};

    for (const [key, value] of Object.entries(sample)) {
      if (readOnlyKeys.has(key)) {
        continue;
      }

      result[key] = createEmptyValue(value);
    }

    return result;
  }

  if (typeof sample === "number") {
    return 0;
  }

  if (typeof sample === "boolean") {
    return false;
  }

  if (sample === null) {
    return null;
  }

  return "";
}

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function formatBytes(value = 0) {
  if (value < 1024) return `${value} B`;
  if (value < 1024 * 1024) return `${(value / 1024).toFixed(1)} KB`;
  if (value < 1024 * 1024 * 1024) return `${(value / 1024 / 1024).toFixed(2)} MB`;
  return `${(value / 1024 / 1024 / 1024).toFixed(2)} GB`;
}

async function copyTextToClipboard(value: string) {
  if (navigator.clipboard?.writeText && window.isSecureContext) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  textarea.style.top = "0";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  try {
    if (!document.execCommand("copy")) {
      throw new Error("copy command failed");
    }
  } finally {
    document.body.removeChild(textarea);
  }
}

function formatDateTime(value: string) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("zh-CN", { hour12: false });
}

const assetPageCategories = [
  { id: "home", label: "首页", keywords: ["cms-home", "home", "program", "course", "case"] },
  { id: "about", label: "关于我们", keywords: ["about", "work-life", "worklife", "recognition", "leadership"] },
  { id: "team", label: "虎诉团队", keywords: ["podcast", "team", "partner", "senior-associate"] },
  { id: "industries", label: "服务行业", keywords: ["media", "industries", "industry", "appearance", "business", "cooperation", "stats"] },
  { id: "event", label: "虎诉动态", keywords: ["event", "schedule", "past"] },
  { id: "contact", label: "联系我们", keywords: ["contact"] },
  { id: "coreValue", label: "虎诉文化", keywords: ["core", "core-value", "culture"] },
  { id: "footer", label: "Footer", keywords: ["footer", "foot"] },
  { id: "title", label: "Title", keywords: ["title", "header", "logo"] },
] as const;

type AssetPageCategoryId = (typeof assetPageCategories)[number]["id"];

const cmsAssetPageSize = 40;

type AssetPagination = {
  total: number;
  limit: number;
  offset: number;
  page?: string;
  hasMore: boolean;
};

type AssetSummary = {
  count: number;
  file: number;
  image: number;
  totalBytes: number;
  video: number;
};

function getStatusLabel(status: string) {
  return (
    {
      draft: "草稿",
      published: "已发布",
      archived: "已归档",
    }[status] ?? status
  );
}

function getRoleLabel(role: string) {
  return (
    {
      admin: "管理员",
      editor: "编辑",
    }[role] ?? role
  );
}

function ContentField({
  label,
  value,
  path,
  onChange,
  onAddItem,
  onRemoveItem,
}: {
  label: string;
  value: EditorValue;
  path: PathSegment[];
  onChange: (path: PathSegment[], value: EditorValue) => void;
  onAddItem: (path: PathSegment[]) => void;
  onRemoveItem: (path: PathSegment[], index: number) => void;
}) {
  const fieldKey = String(path[path.length - 1] ?? "");
  const readOnly = readOnlyKeys.has(fieldKey);

  if (typeof value === "string") {
    const longText =
      value.length > 120 ||
      value.includes("\n") ||
      ["content", "body", "description", "descriptionZh", "descriptionEn", "excerpt", "summary"].includes(fieldKey);

    return (
      <label className="block space-y-2">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        {longText ? (
          <textarea
            value={value}
            readOnly={readOnly}
            onChange={(event) => onChange(path, event.target.value)}
            rows={fieldKey === "content" || fieldKey === "body" ? 10 : 5}
            className="min-h-32 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10 read-only:bg-slate-50 read-only:text-slate-500"
          />
        ) : (
          <input
            value={value}
            readOnly={readOnly}
            onChange={(event) => onChange(path, event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10 read-only:bg-slate-50 read-only:text-slate-500"
          />
        )}
      </label>
    );
  }

  if (typeof value === "number") {
    return (
      <label className="block space-y-2">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        <input
          type="number"
          value={value}
          readOnly={readOnly}
          onChange={(event) => onChange(path, Number(event.target.value))}
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10 read-only:bg-slate-50"
        />
      </label>
    );
  }

  if (typeof value === "boolean") {
    return (
      <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700">
        <input
          type="checkbox"
          checked={value}
          onChange={(event) => onChange(path, event.target.checked)}
          className="h-4 w-4 rounded accent-[#2563eb]"
        />
        {label}
      </label>
    );
  }

  if (Array.isArray(value)) {
    return (
      <section className="space-y-4 rounded-[24px] border border-slate-200 bg-slate-50 p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-slate-900">{label}</h3>
            <p className="mt-1 text-xs text-slate-500">支持新增、删除和编辑多条记录。</p>
          </div>
          <button
            type="button"
            onClick={() => onAddItem(path)}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-[#2563eb] hover:text-[#2563eb]"
          >
            新增项
          </button>
        </div>
        <div className="space-y-4">
          {value.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-6 text-sm text-slate-500">
              暂无数据，点击右上角新增。
            </div>
          ) : null}
          {value.map((item, index) => (
            <div key={`${label}-${index}`} className="space-y-4 rounded-[22px] border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-semibold text-slate-700">项目 {index + 1}</span>
                <button
                  type="button"
                  onClick={() => onRemoveItem(path, index)}
                  className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold text-rose-500 transition hover:bg-rose-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  删除
                </button>
              </div>
              <ContentField
                label={Array.isArray(item) || isObject(item) ? label : "值"}
                value={item}
                path={[...path, index]}
                onChange={onChange}
                onAddItem={onAddItem}
                onRemoveItem={onRemoveItem}
              />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (isObject(value)) {
    return (
      <section className="space-y-4 rounded-[24px] border border-slate-200 bg-slate-50 p-5">
        <h3 className="text-base font-semibold text-slate-900">{label}</h3>
        <div className="grid gap-4 lg:grid-cols-2">
          {Object.entries(value).map(([key, nestedValue]) => (
            <ContentField
              key={key}
              label={getFieldLabel(key)}
              value={nestedValue}
              path={[...path, key]}
              onChange={onChange}
              onAddItem={onAddItem}
              onRemoveItem={onRemoveItem}
            />
          ))}
        </div>
      </section>
    );
  }

  return null;
}

export function CmsStudio({ initialData }: { initialData: CmsBootstrapData }) {
  const [panel, setPanel] = useState<StudioPanel>("overview");
  const [groupState, setGroupState] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(navigationGroups.map((group) => [group.title, group.defaultOpen !== false])),
  );
  const initialOfficialSiteState = initialData.officialSiteState
    ? normalizeOfficialSiteStateForEditor(
        cloneValue(initialData.officialSiteState),
        mergePageContentDefaults(cloneValue(initialData.pageContent)),
      )
    : null;
  const [siteContent, setSiteContent] = useState<SiteContent>(cloneValue(initialData.siteContent));
  const [visualEditor, setVisualEditor] = useState<VisualEditorState>(cloneValue(initialData.visualEditor));
  const [pageContent, setPageContent] = useState<PageContentState>(
    initialOfficialSiteState
      ? syncPageContentFromOfficialSiteState(mergePageContentDefaults(cloneValue(initialData.pageContent)), initialOfficialSiteState)
      : mergePageContentDefaults(cloneValue(initialData.pageContent)),
  );
  const [officialSiteState, setOfficialSiteState] = useState<OfficialCmsSiteState | null>(initialOfficialSiteState);
  const [dashboard, setDashboard] = useState<CmsDashboardMetrics | undefined>(
    initialData.dashboard ? cloneValue(initialData.dashboard) : undefined,
  );
  const [articles, setArticles] = useState<CmsArticle[]>(cloneValue(initialData.articles));
  const [caseStudies, setCaseStudies] = useState<CmsCaseStudy[]>(cloneValue(initialData.caseStudies));
  const [mediaItems, setMediaItems] = useState<CmsMediaItem[]>(cloneValue(initialData.mediaItems));
  const [podcastEpisodes, setPodcastEpisodes] = useState<CmsPodcastEpisode[]>(cloneValue(initialData.podcastEpisodes));
  const [contactSubmissions, setContactSubmissions] = useState<CmsContactSubmission[]>(
    cloneValue(initialData.contactSubmissions ?? []),
  );
  const [assets, setAssets] = useState<CmsAsset[]>(cloneValue(initialData.assets));
  const [versions, setVersions] = useState<CmsVersionSnapshot[]>(cloneValue(initialData.versions));
  const [editingVersionId, setEditingVersionId] = useState<number | null>(null);
  const [activeLanguage, setActiveLanguage] = useState<Language>("zh");
  const [activePageSection, setActivePageSection] = useState<keyof SiteContent["zh"]>("hero");
  const [selectedCollectionItem, setSelectedCollectionItem] = useState<Record<string, number | null>>({
    articles: initialData.articles[0]?.id ?? null,
    cases: initialData.caseStudies[0]?.id ?? null,
    media: initialData.mediaItems[0]?.id ?? null,
    podcast: initialData.podcastEpisodes[0]?.id ?? null,
  });
  const [message, setMessage] = useState("");
  const [versionName, setVersionName] = useState("");
  const [versionDescription, setVersionDescription] = useState("");
  const [versionSourceId, setVersionSourceId] = useState<number | "current">(initialData.versions[0]?.id ?? "current");
  const [, startTransition] = useTransition();
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isPasswordSaving, setIsPasswordSaving] = useState(false);
  const assetInputRef = useRef<HTMLInputElement>(null);

  const pageSections = useMemo(
    () => Object.keys(siteContent[activeLanguage]) as Array<keyof SiteContent["zh"]>,
    [activeLanguage, siteContent],
  );

  const currentPageSectionValue = siteContent[activeLanguage][activePageSection] as EditorValue;

  useEffect(() => {
    if (!message) return;

    const timer = window.setTimeout(() => setMessage(""), 5000);
    return () => window.clearTimeout(timer);
  }, [message]);

  useEffect(() => {
    let cancelled = false;

    async function loadOfficialState() {
      if (officialSiteState) return;

      const response = await fetch("/api/cms/official");

      if (!response.ok) {
        if (!cancelled) setMessage("官网内容数据加载失败。");
        return;
      }

      const payload = (await response.json()) as { state: OfficialCmsSiteState };
      if (!cancelled) setOfficialSiteState(normalizeOfficialSiteStateForEditor(payload.state, pageContent));
    }

    void loadOfficialState();

    return () => {
      cancelled = true;
    };
  }, [officialSiteState]);

  useEffect(() => {
    if (versions.length === 0) {
      setVersionSourceId("current");
      return;
    }

    if (versionSourceId === "current" || !versions.some((version) => version.id === versionSourceId)) {
      setVersionSourceId(versions[0].id);
    }
  }, [versionSourceId, versions]);

  const persistWorkspace = async (nextState?: { siteContent?: SiteContent; visualEditor?: VisualEditorState; pageContent?: PageContentState }) => {
    const response = await fetch("/api/cms/site", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        siteContent: nextState?.siteContent ?? siteContent,
        visualEditor: nextState?.visualEditor ?? visualEditor,
        pageContent: nextState?.pageContent ?? pageContent,
      }),
    });

    if (!response.ok) {
      setMessage("保存失败，请稍后重试。");
      return false;
    }

    setMessage("站点配置已保存。");
    return true;
  };

  const saveOfficialSiteState = async (nextState: OfficialCmsSiteState) => {
    const normalizedState = normalizeOfficialSiteStateForEditor(nextState, pageContent);
    const syncedPageContent = syncPageContentFromOfficialSiteState(pageContent, normalizedState);
    const stateForSave = { ...normalizedState, previewPageContent: syncedPageContent };
    const response = await fetch("/api/cms/official", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ state: stateForSave }),
    });

    if (!response.ok) {
      setMessage("官网内容保存失败。");
      return false;
    }

    const payload = (await response.json()) as { state: OfficialCmsSiteState };
    setOfficialSiteState(normalizeOfficialSiteStateForEditor(payload.state, syncedPageContent));
    setPageContent(syncedPageContent);
    setMessage("官网内容已保存，并同步到真实前台数据。");
    return true;
  };

  const applyVersionPayload = (payload: CmsVersionPayload) => {
    setSiteContent(cloneValue(payload.siteContent));
    setVisualEditor(cloneValue(payload.visualEditor));
    const payloadPageContent = mergePageContentDefaults(cloneValue(payload.pageContent));
    const normalizedOfficialState = payload.officialSiteState
      ? normalizeOfficialSiteStateForEditor(cloneValue(payload.officialSiteState), payloadPageContent)
      : null;
    const nextPageContent = normalizedOfficialState
      ? syncPageContentFromOfficialSiteState(payloadPageContent, normalizedOfficialState)
      : payloadPageContent;
    const nextOfficialState = normalizedOfficialState
      ? normalizeOfficialSiteStateForEditor({ ...normalizedOfficialState, previewPageContent: nextPageContent }, nextPageContent)
      : null;
    setPageContent(nextPageContent);
    if (nextOfficialState) {
      setOfficialSiteState({ ...nextOfficialState, previewPageContent: nextPageContent });
    }
    setArticles(cloneValue(payload.articles));
    setCaseStudies(cloneValue(payload.caseStudies));
    setMediaItems(cloneValue(payload.mediaItems));
    setPodcastEpisodes(cloneValue(payload.podcastEpisodes));
    setSelectedCollectionItem({
      articles: payload.articles[0]?.id ?? null,
      cases: payload.caseStudies[0]?.id ?? null,
      media: payload.mediaItems[0]?.id ?? null,
      podcast: payload.podcastEpisodes[0]?.id ?? null,
    });
  };

  const buildVersionPayload = (nextState?: {
    siteContent?: SiteContent;
    visualEditor?: VisualEditorState;
    pageContent?: PageContentState;
    officialSiteState?: OfficialCmsSiteState | null;
  }): CmsVersionPayload => {
    const officialMergePageContent = nextState?.pageContent ?? pageContent;
    const normalizedOfficialState = nextState?.officialSiteState
      ? normalizeOfficialSiteStateForEditor(nextState.officialSiteState, officialMergePageContent)
      : officialSiteState
        ? normalizeOfficialSiteStateForEditor(officialSiteState, officialMergePageContent)
        : undefined;
    const nextPageContent =
      nextState?.pageContent ??
      (nextState?.officialSiteState && normalizedOfficialState
        ? syncPageContentFromOfficialSiteState(pageContent, normalizedOfficialState)
        : pageContent);

    return {
      siteContent: nextState?.siteContent ?? siteContent,
      visualEditor: nextState?.visualEditor ?? visualEditor,
      pageContent: nextPageContent,
      officialSiteState: normalizedOfficialState
        ? { ...normalizedOfficialState, previewPageContent: nextPageContent }
        : undefined,
      articles,
      caseStudies,
      mediaItems,
      podcastEpisodes,
    };
  };

  const loadVersionForEditing = async (versionId: number | null) => {
    if (!versionId) {
      const [siteResponse, officialResponse] = await Promise.all([
        fetch("/api/cms/site"),
        fetch("/api/cms/official"),
      ]);

      if (!siteResponse.ok || !officialResponse.ok) {
        setMessage("加载当前站点内容失败。");
        return;
      }

      const sitePayload = (await siteResponse.json()) as {
        siteContent: SiteContent;
        visualEditor: VisualEditorState;
        pageContent: PageContentState;
      };
      const officialPayload = (await officialResponse.json()) as { state: OfficialCmsSiteState };
      const sitePageContent = mergePageContentDefaults(cloneValue(sitePayload.pageContent));
      const normalizedOfficialState = normalizeOfficialSiteStateForEditor(cloneValue(officialPayload.state), sitePageContent);
      const nextPageContent = syncPageContentFromOfficialSiteState(
        sitePageContent,
        normalizedOfficialState,
      );

      setSiteContent(cloneValue(sitePayload.siteContent));
      setVisualEditor(cloneValue(sitePayload.visualEditor));
      setPageContent(nextPageContent);
      setOfficialSiteState({ ...normalizedOfficialState, previewPageContent: nextPageContent });
      setEditingVersionId(null);
      setMessage("已切换到当前站点内容，后续保存会直接更新当前站点。");
      return;
    }

    const response = await fetch(`/api/cms/versions/${versionId}`);

    if (!response.ok) {
      setMessage("加载版本失败。");
      return;
    }

    const payload = (await response.json()) as {
      version: CmsVersionSnapshot;
      payload: CmsVersionPayload;
    };

    applyVersionPayload(payload.payload);
    setEditingVersionId(versionId);
    setMessage(`已切换到版本：${payload.version.name}，后续可视化保存会提交到该版本。`);
  };

  useEffect(() => {
    if (editingVersionId || versions.length === 0) return;

    const defaultVersion = versions.find((version) => version.isPublished) ?? versions[0];
    if (!defaultVersion) return;

    setVersionSourceId(defaultVersion.id);
    void loadVersionForEditing(defaultVersion.id);
  }, [editingVersionId, versions]);

  const submitVersionDraft = async (
    versionId: number,
    nextState?: { siteContent?: SiteContent; visualEditor?: VisualEditorState; pageContent?: PageContentState; officialSiteState?: OfficialCmsSiteState | null },
  ) => {
    const response = await fetch(`/api/cms/versions/${versionId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        payload: buildVersionPayload(nextState),
      }),
    });

    if (!response.ok) {
      setMessage("提交版本失败。");
      return false;
    }

    const payload = (await response.json()) as {
      versions: CmsVersionSnapshot[];
      appliedToCurrentSite?: boolean;
      unpublishedAfterEdit?: boolean;
    };
    setVersions(payload.versions);
    setMessage(
      payload.appliedToCurrentSite
        ? "已发布版本内容已更新，并同步到当前站点。"
        : payload.unpublishedAfterEdit
          ? "版本内容已更新。该版本已转为未发布状态，请在版本管理中预览确认后再发布。"
          : "版本内容已更新，可在版本管理中预览或发布。",
    );
    return true;
  };

  const logout = () => {
    startTransition(async () => {
      await fetch("/api/cms/auth/logout", { method: "POST" });
      window.location.href = "/cms/login";
    });
  };

  const submitPasswordChange = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage("两次输入的新密码不一致。");
      return;
    }

    setIsPasswordSaving(true);

    try {
      const response = await fetch("/api/cms/auth/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });
      const payload = (await response.json().catch(() => ({}))) as { message?: string };

      if (!response.ok) {
        setMessage(payload.message || "密码修改失败。");
        return;
      }

      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setPasswordDialogOpen(false);
      setMessage("密码已修改。");
    } finally {
      setIsPasswordSaving(false);
    }
  };

  const updateSiteContent = (path: PathSegment[], nextValue: EditorValue) => {
    setSiteContent((current) =>
      setValueAtPath(current as unknown as EditorValue, path, nextValue) as unknown as SiteContent,
    );
  };

  const updatePageContent = (path: PathSegment[], nextValue: EditorValue) => {
    setPageContent((current) => {
      const nextPageContent = setValueAtPath(current as unknown as EditorValue, path, nextValue) as unknown as PageContentState;

      return {
        ...nextPageContent,
        updatedAt: new Date().toISOString(),
      };
    });
  };

  const addSiteContentItem = (path: PathSegment[]) => {
    setSiteContent((current) => {
      const currentValue = getValueAtPath(current as unknown as EditorValue, path);

      if (!Array.isArray(currentValue)) {
        return current;
      }

      const sample = currentValue[0];
      const nextArray = [...currentValue, sample === undefined ? "" : createEmptyValue(sample)];

      return setValueAtPath(current as unknown as EditorValue, path, nextArray) as unknown as SiteContent;
    });
  };

  const removeSiteContentItem = (path: PathSegment[], index: number) => {
    setSiteContent((current) => {
      const currentValue = getValueAtPath(current as unknown as EditorValue, path);

      if (!Array.isArray(currentValue)) {
        return current;
      }

      const nextArray = currentValue.filter((_, itemIndex) => itemIndex !== index);
      return setValueAtPath(current as unknown as EditorValue, path, nextArray) as unknown as SiteContent;
    });
  };

  const saveCollection = async (collection: keyof typeof collectionTitleMap, item: Record<string, unknown>) => {
    const response = await fetch(`/api/cms/collections/${collection}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      setMessage(`${collectionTitleMap[collection]}保存失败。`);
      return null;
    }

    const payload = (await response.json()) as { items: CollectionItem[] };
    setMessage(`${collectionTitleMap[collection]}已保存。`);
    return payload.items;
  };

  const deleteCollection = async (collection: keyof typeof collectionTitleMap, id: number) => {
    const response = await fetch(`/api/cms/collections/${collection}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      setMessage(`${collectionTitleMap[collection]}删除失败。`);
      return null;
    }

    const payload = (await response.json()) as { items: CollectionItem[] };
    setMessage(`${collectionTitleMap[collection]}已删除。`);
    return payload.items;
  };

  const toggleGroup = (title: string) => {
    setGroupState((current) => ({ ...current, [title]: !current[title] }));
  };

  const isVisualPanel = panel === "visual";

  return (
    <div className="h-screen overflow-hidden bg-[#eff2f7] text-slate-900">
      {message ? (
        <div
          role="status"
          aria-live="polite"
          className="fixed right-5 top-5 z-[2000] max-w-[min(28rem,calc(100vw-2.5rem))] rounded-2xl border border-slate-800/10 bg-slate-950 px-5 py-3 text-sm font-semibold leading-6 text-white shadow-[0_18px_45px_rgba(15,23,42,0.28)]"
        >
          {message}
        </div>
      ) : null}
      <div
        className={
          isVisualPanel
            ? "flex min-h-screen flex-col"
            : "flex h-[125vh] w-[125%] origin-top-left flex-col overflow-hidden"
        }
        style={isVisualPanel ? undefined : { transform: "scale(0.8)", transformOrigin: "top left" }}
      >
        <header className="hidden">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                <Monitor className="h-4 w-4 text-slate-200" />
                <Smartphone className="h-4 w-4 text-slate-500" />
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-slate-200">
              <Home className="h-4 w-4" />
              <span>{isVisualPanel ? "/admin/visual-editor" : "/admin"}</span>
            </div>
            <div className="flex items-center gap-3">
              <button type="button" className="rounded-full border border-white/10 bg-white/5 p-2 transition hover:bg-white/10">
                <ExternalLink className="h-4 w-4" />
              </button>
              <button type="button" className="rounded-full border border-white/10 bg-white/5 p-2 transition hover:bg-white/10">
                <RefreshCcw className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setPanel("visual")}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm transition hover:bg-white/10"
              >
                <Pencil className="h-4 w-4" />
                编辑
              </button>
              <button type="button" className="rounded-full border border-white/10 bg-white/5 p-2 transition hover:bg-white/10">
                <Maximize2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </header>

        <div className={isVisualPanel ? "min-h-0 flex flex-1" : "grid min-h-0 flex-1 lg:grid-cols-[332px_minmax(0,1fr)]"}>
          {!isVisualPanel ? (
            <aside className="flex min-h-0 flex-col border-r border-slate-200 bg-white">
            <div className="border-b border-slate-200 px-7 py-6">
              <div className="flex items-center gap-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2563eb] text-lg font-bold text-white">
                  虎
                </div>
                <div>
                  <p className="text-xl font-semibold text-slate-950">管理后台</p>
                  <p className="mt-1 text-sm text-slate-500">CMS Studio</p>
                </div>
              </div>
              <div className="mt-5">
                <CmsVersionSelect
                  versions={versions}
                  editingVersionId={editingVersionId}
                  loadVersionForEditing={loadVersionForEditing}
                />
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5">
              <div className="space-y-4">
                {navigationGroups.map((group) => {
                  const Icon = group.icon;
                  const open = groupState[group.title] ?? true;

                  return (
                    <section key={group.title} className="space-y-2">
                      <button
                        type="button"
                        onClick={() => toggleGroup(group.title)}
                        className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition hover:bg-slate-50"
                      >
                        <span className="flex items-center gap-3 text-[15px] font-semibold text-slate-700">
                          <Icon className="h-4.5 w-4.5 text-slate-500" />
                          {group.title}
                        </span>
                        <ChevronDown className={`h-4 w-4 text-slate-400 transition ${open ? "" : "-rotate-90"}`} />
                      </button>
                      {open ? (
                        <div className="space-y-1 pl-4">
                          {group.items.map((item) => (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => setPanel(item.id)}
                              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-[15px] transition ${
                                panel === item.id
                                  ? "bg-[#eaf1ff] font-semibold text-[#2563eb]"
                                  : "text-slate-600 hover:bg-slate-50"
                              }`}
                            >
                              <span
                                className={`h-2.5 w-2.5 rounded-full ${
                                  panel === item.id ? "bg-[#2563eb]" : "bg-slate-400"
                                }`}
                              />
                              {item.label}
                            </button>
                          ))}
                        </div>
                      ) : null}
                    </section>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-slate-200 px-5 py-5">
              <div className="space-y-1">
                <Link
                  href="/"
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 text-[15px] text-slate-700 transition hover:bg-slate-50"
                >
                  <ExternalLink className="h-4.5 w-4.5 text-slate-500" />
                  返回官网
                </Link>
                <button
                  type="button"
                  onClick={() => setPasswordDialogOpen(true)}
                  className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-[15px] text-slate-700 transition hover:bg-slate-50"
                >
                  <KeyRound className="h-4.5 w-4.5 text-slate-500" />
                  修改密码
                </button>
                <button
                  type="button"
                  onClick={logout}
                  className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-[15px] text-slate-700 transition hover:bg-slate-50"
                >
                  <LogOut className="h-4.5 w-4.5 text-slate-500" />
                  退出登录
                </button>
              </div>
              <div className="mt-5 border-t border-slate-100 pt-4">
                <p className="text-sm font-medium text-slate-900">{initialData.currentUser.username}</p>
                <p className="mt-1 text-xs text-slate-500">{getRoleLabel(initialData.currentUser.role)}</p>
              </div>
            </div>
            </aside>
          ) : null}

          <main className={isVisualPanel ? "min-h-0 flex-1 overflow-hidden" : "min-h-0 overflow-y-auto px-6 py-6 lg:px-10 lg:py-8"}>
            <div className={isVisualPanel ? "h-full" : "space-y-6"}>
              {!isVisualPanel ? (
                <>
                  <section>
                    <h1 className="text-[35px] font-semibold tracking-tight text-slate-950">
                      {getPanelHeadline(panel)}
                    </h1>
                    <p className="mt-2 text-base text-slate-500">{getPanelDescription(panel)}</p>
                  </section>

                </>
              ) : null}

              <CmsMainPanel
                panel={panel}
                setPanel={setPanel}
                activeLanguage={activeLanguage}
                setActiveLanguage={setActiveLanguage}
                activePageSection={activePageSection}
                setActivePageSection={setActivePageSection}
                pageSections={pageSections}
                currentPageSectionValue={currentPageSectionValue}
                updateSiteContent={updateSiteContent}
                addSiteContentItem={addSiteContentItem}
                removeSiteContentItem={removeSiteContentItem}
                siteContent={siteContent}
                visualEditor={visualEditor}
                pageContent={pageContent}
                officialSiteState={officialSiteState}
                setOfficialSiteState={setOfficialSiteState}
                setVisualEditor={setVisualEditor}
                setPageContent={setPageContent}
                updatePageContent={updatePageContent}
                dashboard={dashboard}
                setDashboard={setDashboard}
                articles={articles}
                setArticles={setArticles}
                caseStudies={caseStudies}
                setCaseStudies={setCaseStudies}
                mediaItems={mediaItems}
                setMediaItems={setMediaItems}
                podcastEpisodes={podcastEpisodes}
                setPodcastEpisodes={setPodcastEpisodes}
                contactSubmissions={contactSubmissions}
                setContactSubmissions={setContactSubmissions}
                assets={assets}
                setAssets={setAssets}
                versions={versions}
                setVersions={setVersions}
                editingVersionId={editingVersionId}
                loadVersionForEditing={loadVersionForEditing}
                submitVersionDraft={submitVersionDraft}
                selectedCollectionItem={selectedCollectionItem}
                setSelectedCollectionItem={setSelectedCollectionItem}
                versionName={versionName}
                setVersionName={setVersionName}
                versionDescription={versionDescription}
                setVersionDescription={setVersionDescription}
                versionSourceId={versionSourceId}
                setVersionSourceId={setVersionSourceId}
                assetInputRef={assetInputRef}
                saveCollection={saveCollection}
                deleteCollection={deleteCollection}
                persistWorkspace={persistWorkspace}
                saveOfficialSiteState={saveOfficialSiteState}
                setMessage={setMessage}
              />
            </div>
          </main>
        </div>
      </div>
      {passwordDialogOpen ? (
        <div className="fixed inset-0 z-[2100] flex items-center justify-center bg-slate-950/55 px-5">
          <form
            onSubmit={submitPasswordChange}
            className="w-full max-w-[26rem] rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.28)]"
          >
            <div>
              <h2 className="text-xl font-semibold text-slate-950">修改密码</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">修改当前登录账号的后台密码。</p>
            </div>

            <div className="mt-5 space-y-4">
              <label className="block space-y-2">
                <span className="text-sm font-semibold text-slate-700">当前密码</span>
                <input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(event) => setPasswordForm((current) => ({ ...current, currentPassword: event.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
                  autoComplete="current-password"
                />
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-semibold text-slate-700">新密码</span>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(event) => setPasswordForm((current) => ({ ...current, newPassword: event.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
                  autoComplete="new-password"
                />
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-semibold text-slate-700">确认新密码</span>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(event) => setPasswordForm((current) => ({ ...current, confirmPassword: event.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
                  autoComplete="new-password"
                />
              </label>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setPasswordDialogOpen(false);
                  setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
                }}
                className="rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                取消
              </button>
              <button
                type="submit"
                disabled={isPasswordSaving}
                className="rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
              >
                {isPasswordSaving ? "保存中..." : "保存新密码"}
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
}

function CmsMainPanel(props: {
  panel: StudioPanel;
  setPanel: Dispatch<SetStateAction<StudioPanel>>;
  activeLanguage: Language;
  setActiveLanguage: Dispatch<SetStateAction<Language>>;
  activePageSection: keyof SiteContent["zh"];
  setActivePageSection: Dispatch<SetStateAction<keyof SiteContent["zh"]>>;
  pageSections: Array<keyof SiteContent["zh"]>;
  currentPageSectionValue: EditorValue;
  updateSiteContent: (path: PathSegment[], value: EditorValue) => void;
  addSiteContentItem: (path: PathSegment[]) => void;
  removeSiteContentItem: (path: PathSegment[], index: number) => void;
  siteContent: SiteContent;
  visualEditor: VisualEditorState;
  pageContent: PageContentState;
  officialSiteState: OfficialCmsSiteState | null;
  setOfficialSiteState: Dispatch<SetStateAction<OfficialCmsSiteState | null>>;
  setVisualEditor: (updater: (current: VisualEditorState) => VisualEditorState) => void;
  setPageContent: Dispatch<SetStateAction<PageContentState>>;
  updatePageContent: (path: PathSegment[], value: EditorValue) => void;
  dashboard?: CmsDashboardMetrics;
  setDashboard: Dispatch<SetStateAction<CmsDashboardMetrics | undefined>>;
  articles: CmsArticle[];
  setArticles: Dispatch<SetStateAction<CmsArticle[]>>;
  caseStudies: CmsCaseStudy[];
  setCaseStudies: Dispatch<SetStateAction<CmsCaseStudy[]>>;
  mediaItems: CmsMediaItem[];
  setMediaItems: Dispatch<SetStateAction<CmsMediaItem[]>>;
  podcastEpisodes: CmsPodcastEpisode[];
  setPodcastEpisodes: Dispatch<SetStateAction<CmsPodcastEpisode[]>>;
  contactSubmissions: CmsContactSubmission[];
  setContactSubmissions: Dispatch<SetStateAction<CmsContactSubmission[]>>;
  assets: CmsAsset[];
  setAssets: Dispatch<SetStateAction<CmsAsset[]>>;
  versions: CmsVersionSnapshot[];
  setVersions: Dispatch<SetStateAction<CmsVersionSnapshot[]>>;
  editingVersionId: number | null;
  loadVersionForEditing: (versionId: number | null) => Promise<void>;
  submitVersionDraft: (
    versionId: number,
    nextState?: { siteContent?: SiteContent; visualEditor?: VisualEditorState; pageContent?: PageContentState; officialSiteState?: OfficialCmsSiteState | null },
  ) => Promise<boolean>;
  selectedCollectionItem: Record<string, number | null>;
  setSelectedCollectionItem: Dispatch<SetStateAction<Record<string, number | null>>>;
  versionName: string;
  setVersionName: Dispatch<SetStateAction<string>>;
  versionDescription: string;
  setVersionDescription: Dispatch<SetStateAction<string>>;
  versionSourceId: number | "current";
  setVersionSourceId: Dispatch<SetStateAction<number | "current">>;
  assetInputRef: RefObject<HTMLInputElement>;
  saveCollection: (collection: keyof typeof collectionTitleMap, item: Record<string, unknown>) => Promise<CollectionItem[] | null>;
  deleteCollection: (collection: keyof typeof collectionTitleMap, id: number) => Promise<CollectionItem[] | null>;
  persistWorkspace: (nextState?: { siteContent?: SiteContent; visualEditor?: VisualEditorState; pageContent?: PageContentState }) => Promise<boolean>;
  saveOfficialSiteState: (nextState: OfficialCmsSiteState) => Promise<boolean>;
  setMessage: (message: string) => void;
}) {
  if (props.panel === "overview") {
    return (
      <OverviewPanel
        dashboard={props.dashboard}
        articles={props.articles}
        assets={props.assets}
        versions={props.versions}
        setPanel={props.setPanel}
        setDashboard={props.setDashboard}
        setMessage={props.setMessage}
      />
    );
  }

  if (props.panel === "pageContent") {
    return (
      <PageContentPanel
        activePageSection={props.activePageSection}
        setActivePageSection={props.setActivePageSection}
        pageSections={props.pageSections}
        siteContent={props.siteContent}
        updateSiteContent={props.updateSiteContent}
        addSiteContentItem={props.addSiteContentItem}
        removeSiteContentItem={props.removeSiteContentItem}
      />
    );
  }

  if (props.panel === "visual") {
    return (
      <CmsPuckVisualEditor
        siteContent={props.siteContent}
        visualEditor={props.visualEditor}
        pageContent={props.pageContent}
        officialSiteState={props.officialSiteState}
        setOfficialSiteState={props.setOfficialSiteState}
        setVisualEditor={props.setVisualEditor}
        setPageContent={props.setPageContent}
        activeLanguage={props.activeLanguage}
        setActiveLanguage={props.setActiveLanguage}
        updatePageContent={props.updatePageContent}
        updateSiteContent={props.updateSiteContent}
        addSiteContentItem={props.addSiteContentItem}
        removeSiteContentItem={props.removeSiteContentItem}
        articles={props.articles}
        caseStudies={props.caseStudies}
        mediaItems={props.mediaItems}
        podcastEpisodes={props.podcastEpisodes}
        assets={props.assets}
        versions={props.versions}
        editingVersionId={props.editingVersionId}
        submitVersionDraft={props.submitVersionDraft}
        setPanel={props.setPanel}
        persistWorkspace={props.persistWorkspace}
        setMessage={props.setMessage}
      />
    );
  }

  if (props.panel === "carousel") {
    return (
      <RepeatableContentManagerPanel
        title="轮播管理"
        description="按页面管理所有轮播内容，进入小标题后可增删改每条卡片。"
        groups={carouselManagerGroups}
        activeLanguage={props.activeLanguage}
        setActiveLanguage={props.setActiveLanguage}
        pageContent={props.pageContent}
        setPageContent={props.setPageContent}
        persistWorkspace={props.persistWorkspace}
        versions={props.versions}
        editingVersionId={props.editingVersionId}
        loadVersionForEditing={props.loadVersionForEditing}
        submitVersionDraft={props.submitVersionDraft}
        setMessage={props.setMessage}
      />
    );
  }

  if (
    props.panel === "homeEventCarousel" ||
    props.panel === "homeHonorsCarousel" ||
    props.panel === "officialIndustries" ||
    props.panel === "officialHonors" ||
    props.panel === "officialChronicle" ||
    props.panel === "officialPartners" ||
    props.panel === "officialSeniorAssociates" ||
    props.panel === "officialEvents"
  ) {
    return (
      <OfficialSiteSectionPanel
        panel={props.panel}
        pageContent={props.pageContent}
        officialSiteState={props.officialSiteState}
        setOfficialSiteState={props.setOfficialSiteState}
        setPageContent={props.setPageContent}
        editingVersionId={props.editingVersionId}
        submitVersionDraft={props.submitVersionDraft}
        saveOfficialSiteState={props.saveOfficialSiteState}
        setMessage={props.setMessage}
      />
    );
  }

  if (props.panel === "eventAwards") {
    return (
      <RepeatableContentManagerPanel
        title="事件和奖项管理"
        description="集中管理 Awards、Event、Media 页面中的奖项、活动和节目露出列表。"
        groups={eventAwardsManagerGroups}
        activeLanguage={props.activeLanguage}
        setActiveLanguage={props.setActiveLanguage}
        pageContent={props.pageContent}
        setPageContent={props.setPageContent}
        persistWorkspace={props.persistWorkspace}
        versions={props.versions}
        editingVersionId={props.editingVersionId}
        loadVersionForEditing={props.loadVersionForEditing}
        submitVersionDraft={props.submitVersionDraft}
        setMessage={props.setMessage}
      />
    );
  }

  if (props.panel === "site") {
    return (
      <SiteContentPanel
        title="站点信息配置"
        description="维护站点名称、Logo、导航、社交链接、邮箱与电话。"
        label="站点信息"
        value={props.siteContent.siteSettings as unknown as EditorValue}
        path={["siteSettings"]}
        siteContent={props.siteContent}
        updateSiteContent={props.updateSiteContent}
        addSiteContentItem={props.addSiteContentItem}
        removeSiteContentItem={props.removeSiteContentItem}
        persistWorkspace={props.persistWorkspace}
        versions={props.versions}
        editingVersionId={props.editingVersionId}
        loadVersionForEditing={props.loadVersionForEditing}
        submitVersionDraft={props.submitVersionDraft}
        setMessage={props.setMessage}
      />
    );
  }

  if (props.panel === "articles") {
    return (
      <CollectionPanel
        title="旧内容集合"
        apiCollection="articles"
        items={props.articles}
        setItems={props.setArticles}
        selectedId={props.selectedCollectionItem.articles}
        setSelectedId={(id) =>
          props.setSelectedCollectionItem((current) => ({ ...current, articles: id }))
        }
        createItem={() => ({
          id: 0,
          slug: "",
          language: "zh",
          title: "",
          excerpt: "",
          content: "",
          status: "draft",
          coverImageUrl: "",
          publishedAt: "",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })}
        saveCollection={props.saveCollection}
        deleteCollection={props.deleteCollection}
      />
    );
  }

  if (props.panel === "cases") {
    return (
      <CollectionPanel
        title="旧内容集合"
        apiCollection="case-studies"
        items={props.caseStudies}
        setItems={props.setCaseStudies}
        selectedId={props.selectedCollectionItem.cases}
        setSelectedId={(id) =>
          props.setSelectedCollectionItem((current) => ({ ...current, cases: id }))
        }
        createItem={() => ({
          id: 0,
          slug: "",
          language: "zh",
          type: "",
          title: "",
          dateLabel: "",
          summary: "",
          body: "",
          outcome: "",
          keywords: [],
          status: "draft",
          publishedAt: "",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })}
        saveCollection={props.saveCollection}
        deleteCollection={props.deleteCollection}
      />
    );
  }

  if (props.panel === "media") {
    return (
      <CollectionPanel
        title="旧内容集合"
        apiCollection="media-items"
        items={props.mediaItems}
        setItems={props.setMediaItems}
        selectedId={props.selectedCollectionItem.media}
        setSelectedId={(id) =>
          props.setSelectedCollectionItem((current) => ({ ...current, media: id }))
        }
        createItem={() => ({
          id: 0,
          slug: "",
          language: "zh",
          title: "",
          summary: "",
          source: "",
          externalUrl: "",
          status: "draft",
          publishedAt: "",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })}
        saveCollection={props.saveCollection}
        deleteCollection={props.deleteCollection}
      />
    );
  }

  if (props.panel === "podcast") {
    return (
      <CollectionPanel
        title="旧内容集合"
        apiCollection="podcast-episodes"
        items={props.podcastEpisodes}
        setItems={props.setPodcastEpisodes}
        selectedId={props.selectedCollectionItem.podcast}
        setSelectedId={(id) =>
          props.setSelectedCollectionItem((current) => ({ ...current, podcast: id }))
        }
        createItem={() => ({
          id: 0,
          slug: "",
          language: "zh",
          title: "",
          summary: "",
          externalUrl: "",
          audioUrl: "",
          durationLabel: "",
          status: "draft",
          publishedAt: "",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })}
        saveCollection={props.saveCollection}
        deleteCollection={props.deleteCollection}
      />
    );
  }

  if (props.panel === "contactSubmissions") {
    return (
      <ContactSubmissionsPanel
        submissions={props.contactSubmissions}
        setSubmissions={props.setContactSubmissions}
        setMessage={props.setMessage}
      />
    );
  }

  if (props.panel === "assets") {
    return (
      <AssetsPanel
        assets={props.assets}
        setAssets={props.setAssets}
        setDashboard={props.setDashboard}
        assetInputRef={props.assetInputRef}
        setMessage={props.setMessage}
      />
    );
  }

  return (
      <VersionsPanel
        versions={props.versions}
        setVersions={props.setVersions}
        editingVersionId={props.editingVersionId}
        loadVersionForEditing={props.loadVersionForEditing}
        versionName={props.versionName}
      setVersionName={props.setVersionName}
        versionDescription={props.versionDescription}
        setVersionDescription={props.setVersionDescription}
        versionSourceId={props.versionSourceId}
        setVersionSourceId={props.setVersionSourceId}
        setMessage={props.setMessage}
      />
  );
}

function splitLines(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function serializeIndustries(items: OfficialCmsIndustryListItem[]) {
  return items.map((item) => [item.slug, item.name, item.zhName ?? "", item.img, item.cls ?? ""].join(" | ")).join("\n");
}

function parseIndustries(value: string): OfficialCmsIndustryListItem[] {
  return splitLines(value)
    .map((line) => {
      const [slug = "", name = "", zhName = "", img = "", cls = ""] = line.split("|").map((part) => part.trim());
      return { slug, name, zhName, img, cls };
    })
    .filter((item) => item.slug && item.name && item.img);
}

function serializeIndustryDetailSections(slug: string, language: Language) {
  const source =
    language === "zh"
      ? zhIndustryDetailDefaults[slug as IndustrySlug]?.sections
      : industryDetailDefaults[slug as IndustrySlug]?.sections;

  return (
    source
      ?.map((section) => [section.title, ...("items" in section && section.items ? section.items : [])].join("\n"))
      .join("\n\n") ?? ""
  );
}

const emptyLocalizedText = { en: "", zh: "" };

function createEmptyHonorYear(): OfficialCmsHonorYear {
  return {
    year: String(new Date().getFullYear()),
    count: {
      en: honorCountText(0, "en"),
      zh: honorCountText(0, "zh"),
    },
    awards: [],
  };
}

function createEmptyHonorAward(): OfficialCmsHonorAward {
  return {
    title: { ...emptyLocalizedText },
    date: "",
    body: { ...emptyLocalizedText },
    href: "",
  };
}

function createEmptyChronicleYearForExisting(existingYears: string[]): OfficialCmsChronicleYear {
  const numericYears = existingYears.map((year) => Number(year)).filter(Number.isFinite);
  const nextYear = numericYears.length ? Math.max(...numericYears) + 1 : new Date().getFullYear();

  return {
    year: String(nextYear),
    events: [],
  };
}

function createEmptyChronicleEvent(): OfficialCmsChronicleEvent {
  return {
    month: { en: "JANUARY", zh: "一月" },
    side: "left",
    text: { ...emptyLocalizedText },
  };
}

function createTeamProfileOverride(slug: string): OfficialCmsTeamProfileContent {
  return { slug };
}

function createEmptyTeamProfileOverride(slug: string, group: "partner" | "seniorAssociate"): OfficialCmsTeamProfileContent {
  return {
    slug,
    name: "",
    zhName: "",
    title: group === "partner" ? "Partner" : "Senior Associate",
    zhTitle: group === "partner" ? "合伙人" : "资深律师",
    image: "",
    phone: "",
    email: "",
    serviceIndustries: [],
    zhServiceIndustries: [],
    education: "",
    zhEducation: "",
    qualification: "",
    zhQualification: "",
    languages: [],
    zhLanguages: [],
    socialEngagements: "",
    zhSocialEngagements: "",
    practiceArea: "",
    zhPracticeArea: "",
    practiceExperience: "",
    zhPracticeExperience: "",
    honors: [],
    zhHonors: [],
    achievements: [],
    zhAchievements: [],
  };
}

function createUniqueTeamSlug(profiles: Record<string, OfficialCmsTeamProfileContent>, group: "partner" | "seniorAssociate") {
  const prefix = group === "partner" ? "partner" : "senior-associate";
  let index = Object.keys(profiles).length + 1;
  let slug = `${prefix}-${index}`;

  while (profiles[slug]) {
    index += 1;
    slug = `${prefix}-${index}`;
  }

  return slug;
}

function createLocalizedEventOverride(): OfficialCmsLocalizedEventOverride {
  return {
    category: "",
    title: "",
    summary: "",
    content: [],
  };
}

function createEventOverride(): OfficialCmsEventOverride {
  return {
    image: "",
    sortDate: "",
    en: createLocalizedEventOverride(),
    zh: createLocalizedEventOverride(),
  };
}

function formatEventSortDate(date = new Date()) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${date.getFullYear()}${month}${day}`;
}

function createUniqueEventSlug(existingSlugs: string[]) {
  const base = `event-${formatEventSortDate()}`;
  const usedSlugs = new Set([...existingSlugs, ...officialEventsData.map((event) => event.slug)]);
  let index = existingSlugs.length + 1;
  let slug = `${base}-${index}`;

  while (usedSlugs.has(slug)) {
    index += 1;
    slug = `${base}-${index}`;
  }

  return slug;
}

function createBlankEventOverride(): OfficialCmsEventOverride {
  return {
    ...createEventOverride(),
    sortDate: formatEventSortDate(),
    en: {
      ...createLocalizedEventOverride(),
      title: "New Event",
    },
    zh: {
      ...createLocalizedEventOverride(),
      title: "新动态",
    },
  };
}

function createDefaultHonorContent(): OfficialCmsHonorYear[] {
  const zhByYear = new Map(withZhSponsorHonors(zhHonorData).map((item) => [item.year, item]));

  return honorData.map((item) => {
    const zhItem = zhByYear.get(item.year);

    return {
      year: item.year,
      count: {
        en: item.count,
        zh: zhItem?.count ?? item.count,
      },
      awards: item.awards.map((award, index) => {
        const zhAward = zhItem?.awards[index];

        return {
          title: {
            en: award.title,
            zh: zhAward?.title ?? award.title,
          },
          date: award.date,
          body: {
            en: award.body,
            zh: zhAward?.body ?? award.body,
          },
          href: award.href ?? zhAward?.href,
        };
      }),
    };
  });
}

function createDefaultChronicleContent(): OfficialCmsChronicleYear[] {
  const zhByYear = new Map(zhChronicleGroups.map((item) => [item.year, item]));

  return chronicleGroups.map((item) => {
    const zhItem = zhByYear.get(item.year);

    return {
      year: item.year,
      events: item.events.map((event, index) => {
        const zhEvent = zhItem?.events[index];

        return {
          month: {
            en: event.month,
            zh: zhEvent?.month ?? event.month,
          },
          side: event.side,
          text: {
            en: event.text,
            zh: zhEvent?.text ?? event.text,
          },
        };
      }),
    };
  });
}

function createDefaultTeamProfileContent(): Record<string, OfficialCmsTeamProfileContent> {
  return Object.fromEntries(
    teamProfiles.map((profile) => [
      profile.slug,
      {
        slug: profile.slug,
        name: profile.name,
        zhName: profile.zhName,
        title: profile.title,
        zhTitle: profile.zhTitle,
        image: profile.image,
        phone: profile.phone,
        email: profile.email,
        serviceIndustries: profile.serviceIndustries,
        zhServiceIndustries: profile.zh.serviceIndustries,
        education: profile.education,
        zhEducation: profile.zh.education,
        qualification: profile.qualification,
        zhQualification: profile.zh.qualification,
        languages: profile.languages,
        zhLanguages: profile.zh.languages,
        socialEngagements: profile.socialEngagements,
        zhSocialEngagements: profile.zh.socialEngagements,
        practiceArea: profile.practiceArea,
        zhPracticeArea: profile.zh.practiceArea,
        practiceExperience: profile.practiceExperience,
        zhPracticeExperience: profile.zh.practiceExperience,
        honors: profile.honors,
        zhHonors: profile.zh.honors,
        achievements: profile.achievements,
        zhAchievements: profile.zh.achievements,
      },
    ]),
  );
}

function createDefaultEventOverrides(): Record<string, OfficialCmsEventOverride> {
  return Object.fromEntries(
    officialEventsData.map((event) => [
      event.slug,
      {
        image: event.image,
        sortDate: event.date,
        en: {
          category: event.category,
          title: event.title,
          summary: event.summary,
          content: event.content,
        },
        zh: {
          category: event.zh?.category ?? event.category,
          title: event.zh?.title ?? event.title,
          summary: event.zh?.summary ?? event.summary,
          content: event.zh?.content ?? event.content,
        },
      },
    ]),
  );
}

function mergeLocalizedEventOverride(
  defaults: OfficialCmsLocalizedEventOverride | undefined,
  override: OfficialCmsLocalizedEventOverride | undefined,
): OfficialCmsLocalizedEventOverride {
  return {
    ...(defaults ?? {}),
    ...(override ?? {}),
    content: override?.content ?? defaults?.content ?? [],
  };
}

function mergeEventOverrides(
  overrides: Record<string, OfficialCmsEventOverride>,
): Record<string, OfficialCmsEventOverride> {
  const defaults = createDefaultEventOverrides();
  const slugs = Array.from(new Set([...Object.keys(defaults), ...Object.keys(overrides)]));

  return Object.fromEntries(
    slugs.map((slug) => {
      const defaultOverride = defaults[slug] ?? createEventOverride();
      const override = overrides[slug] ?? createEventOverride();

      return [
        slug,
        {
          ...defaultOverride,
          ...override,
          image: override.image ?? defaultOverride.image,
          sortDate: override.sortDate ?? defaultOverride.sortDate,
          en: mergeLocalizedEventOverride(defaultOverride.en, override.en),
          zh: mergeLocalizedEventOverride(defaultOverride.zh, override.zh),
        },
      ];
    }),
  );
}

function mergeHonorContent(current: OfficialCmsHonorYear[]): OfficialCmsHonorYear[] {
  if (current.length) {
    return current
      .map((item) => normalizeHonorCount({ ...item, awards: [...item.awards] }))
      .sort((a, b) => Number(b.year) - Number(a.year));
  }

  return createDefaultHonorContent()
    .map((item) => normalizeHonorCount(item))
    .sort((a, b) => Number(b.year) - Number(a.year));
}

function mergeChronicleContent(current: OfficialCmsChronicleYear[]): OfficialCmsChronicleYear[] {
  if (current.length) {
    return current
      .map((item) => ({ ...item, events: [...item.events] }))
      .sort((a, b) => Number(b.year) - Number(a.year));
  }

  const defaults = createDefaultChronicleContent();
  const groups = new Map(current.map((item) => [item.year, { ...item, events: [...item.events] }]));

  defaults.forEach((defaultYear) => {
    const group = groups.get(defaultYear.year);

    if (!group) {
      groups.set(defaultYear.year, defaultYear);
      return;
    }

    const seen = new Set(group.events.map((event) => `${event.month.en}::${event.month.zh}::${event.text.en}::${event.text.zh}`.toLowerCase()));
    const missingEvents = defaultYear.events.filter(
      (event) => !seen.has(`${event.month.en}::${event.month.zh}::${event.text.en}::${event.text.zh}`.toLowerCase()),
    );

    if (missingEvents.length) {
      group.events = [...group.events, ...missingEvents];
    }
  });

  return Array.from(groups.values()).sort((a, b) => Number(b.year) - Number(a.year));
}

function mergeTeamProfileContent(
  overrides: Record<string, OfficialCmsTeamProfileContent>,
): Record<string, OfficialCmsTeamProfileContent> {
  const defaults = createDefaultTeamProfileContent();
  const slugs = Array.from(new Set([...Object.keys(defaults), ...Object.keys(overrides)]));

  return Object.fromEntries(
    slugs.map((slug) => [
      slug,
      {
        ...(defaults[slug] ?? createTeamProfileOverride(slug)),
        ...(overrides[slug] ?? {}),
      },
    ]),
  );
}

const defaultPartnerSlugs = ["yuxuan-liu", "min-xu", "li-wan", "zoe-zhang"];
const defaultSeniorAssociateSlugs = ["mengcheng-yun", "weifan-qiu"];

function mergeOrderedSlugs(current: string[], defaults: string[]) {
  return Array.from(new Set([...current, ...defaults])).filter(Boolean);
}

function teamProfileGroup(profile: OfficialCmsTeamProfileContent) {
  return /senior associate|资深律师/i.test(`${profile.title ?? ""} ${profile.zhTitle ?? ""}`) ? "seniorAssociate" : "partner";
}

function slugsFromTeamProfiles(
  profiles: Record<string, OfficialCmsTeamProfileContent>,
  group: "partner" | "seniorAssociate",
) {
  return Object.entries(profiles)
    .filter(([, profile]) => teamProfileGroup(profile) === group)
    .map(([slug]) => slug);
}

function studioField(id: string, label: string, kind: PageContentField["kind"], value = ""): PageContentField {
  return { id, label, kind, value };
}

function studioItem(id: string, label: string, fields: PageContentField[]): PageContentRepeaterItem {
  return { id, label, fields };
}

function updatePageSection(
  pageContent: PageContentState,
  language: Language,
  pageId: CmsPageId,
  sectionId: string,
  updater: (section: PageContentSection) => PageContentSection,
) {
  return {
    ...pageContent,
    [language]: {
      ...pageContent[language],
      [pageId]: {
        ...pageContent[language][pageId],
        sections: pageContent[language][pageId].sections.map((section) =>
          section.id === sectionId ? updater(section) : section,
        ),
      },
    },
    updatedAt: new Date().toISOString(),
  };
}

function replaceSectionItems(
  pageContent: PageContentState,
  language: Language,
  pageId: CmsPageId,
  sectionId: string,
  items: PageContentRepeaterItem[],
) {
  return updatePageSection(pageContent, language, pageId, sectionId, (section) => ({ ...section, items }));
}

function profileLineList(value: string[] | undefined) {
  return (value ?? []).join("\n");
}

function honorCountText(count: number, language: Language) {
  if (language === "zh") return `${count}项荣誉`;
  return `${count} ${count === 1 ? "Distinction" : "Distinctions"}`;
}

function normalizeHonorCount(year: OfficialCmsHonorYear): OfficialCmsHonorYear {
  return {
    ...year,
    count: {
      en: honorCountText(year.awards.length, "en"),
      zh: honorCountText(year.awards.length, "zh"),
    },
  };
}

function getExistingPageItemField(
  pageContent: PageContentState,
  language: Language,
  pageId: CmsPageId,
  sectionId: string,
  itemId: string,
  fieldId: string,
) {
  const section = pageContent[language]?.[pageId]?.sections.find((item) => item.id === sectionId);
  const item = section?.items?.find((sectionItem) => sectionItem.id === itemId);
  return item?.fields.find((field) => field.id === fieldId)?.value ?? "";
}

function getExistingOrDefaultPageItemField(
  pageContent: PageContentState,
  language: Language,
  pageId: CmsPageId,
  sectionId: string,
  itemId: string,
  fieldId: string,
) {
  return (
    getExistingPageItemField(pageContent, language, pageId, sectionId, itemId, fieldId) ||
    getExistingPageItemField(defaultPageContentState, language, pageId, sectionId, itemId, fieldId)
  );
}

function normalizeIndustrySlugForStudio(value: string) {
  const withoutFragment = String(value ?? "").trim().split("#")[0] ?? "";
  const withoutQuery = withoutFragment.split("?")[0] ?? "";
  const industryPathMatch = withoutQuery.match(/(?:^|\/)industries\/([^/]+)$/);
  const slug = industryPathMatch?.[1] ?? withoutQuery;

  return slug.replace(/^\/+|\/+$/g, "");
}

function getPageItemsBySlug(
  pageContent: PageContentState | undefined,
  language: Language,
  pageId: CmsPageId,
  sectionId: string,
) {
  const items = pageContent?.[language]?.[pageId]?.sections.find((section) => section.id === sectionId)?.items ?? [];

  return new Map(
    items
      .map((item) => [normalizeIndustrySlugForStudio(getPageContentItemField(item, "slug", item.id)), item] as const)
      .filter(([slug]) => Boolean(slug)),
  );
}

function mergeIndustriesWithPageContent(
  industries: OfficialCmsIndustryListItem[],
  pageContent: PageContentState | undefined,
) {
  const bySlug = new Map<string, OfficialCmsIndustryListItem>();
  const orderedSlugs: string[] = [];
  const addSlug = (value: string) => {
    const slug = normalizeIndustrySlugForStudio(value);

    if (!slug) return "";
    if (!orderedSlugs.includes(slug)) orderedSlugs.push(slug);
    return slug;
  };

  industries.forEach((industry) => {
    const slug = addSlug(industry.slug);

    if (!slug) return;
    bySlug.set(slug, { ...industry, slug, img: industry.img ?? "" });
  });

  const enCards = getPageItemsBySlug(pageContent, "en", "media", "cards");
  const zhCards = getPageItemsBySlug(pageContent, "zh", "media", "cards");
  const enDetails = getPageItemsBySlug(pageContent, "en", "media", "detailPages");
  const zhDetails = getPageItemsBySlug(pageContent, "zh", "media", "detailPages");

  [enCards, zhCards, enDetails, zhDetails].forEach((items) => {
    items.forEach((_item, slug) => addSlug(slug));
  });

  return orderedSlugs
    .map((slug) => {
      const current = bySlug.get(slug);
      const enCard = enCards.get(slug);
      const zhCard = zhCards.get(slug);
      const enDetail = enDetails.get(slug);
      const zhDetail = zhDetails.get(slug);
      const name =
        current?.name ||
        getPageContentItemField(enCard, "title", getPageContentItemField(enDetail, "title", slug));
      const zhName =
        current?.zhName ||
        getPageContentItemField(zhCard, "title", getPageContentItemField(zhDetail, "title", name));

      return {
        ...current,
        slug,
        name,
        zhName,
        img:
          current?.img ||
          getPageContentItemField(enDetail, "image", getPageContentItemField(enCard, "image", "")) ||
          getPageContentItemField(zhDetail, "image", getPageContentItemField(zhCard, "image", "")),
        cls:
          current?.cls ||
          getPageContentItemField(enCard, "layoutClass", getPageContentItemField(zhCard, "layoutClass", "")),
        intro:
          current?.intro ||
          getPageContentItemField(enDetail, "intro", getPageContentItemField(enCard, "description", "")),
        zhIntro:
          current?.zhIntro ||
          getPageContentItemField(zhDetail, "intro", getPageContentItemField(zhCard, "description", "")),
        sections: current?.sections || getPageContentItemField(enDetail, "sections", ""),
        zhSections: current?.zhSections || getPageContentItemField(zhDetail, "sections", ""),
      } satisfies OfficialCmsIndustryListItem;
    })
    .filter((industry) => industry.slug && (industry.name || industry.zhName));
}

function homeHonorItemId(year: string, index: number, date: string) {
  return `${year}-${index + 1}-${date || "award"}`;
}

function homeHonorItemIds(honors: OfficialCmsHonorYear[]) {
  return honors.flatMap((year) => year.awards.map((award, index) => homeHonorItemId(year.year, index, award.date)));
}

function eventLocalizedCopyForLanguage(
  event: (typeof officialEventsData)[number] | undefined,
  override: OfficialCmsEventOverride | undefined,
  language: Language,
) {
  const localizedOverride = language === "zh" ? override?.zh : override?.en;
  const title = localizedOverride?.title ?? (language === "zh" ? event?.zh?.title : event?.title) ?? "";
  const summary = localizedOverride?.summary ?? (language === "zh" ? event?.zh?.summary : event?.summary) ?? "";
  const category = localizedOverride?.category ?? (language === "zh" ? event?.zh?.category : event?.category) ?? "";
  const content = localizedOverride?.content ?? (language === "zh" ? event?.zh?.content : event?.content) ?? [];
  const sortDate = override?.sortDate ?? event?.date ?? "";
  const displayDate =
    localizedOverride?.displayDate ?? (sortDate ? formatEventDate(sortDate, language) : "");

  return { title, summary, category, content, sortDate, displayDate };
}

function syncPageContentFromOfficialSiteState(pageContent: PageContentState, officialState: OfficialCmsSiteState) {
  let next = mergePageContentDefaults(cloneValue(pageContent));

  (["en", "zh"] as Language[]).forEach((language) => {
    const isZh = language === "zh";
    const honors = officialState.content.honors.flatMap((year) =>
      year.awards.map((award, index) =>
        studioItem(`${year.year}-${index + 1}-${award.date || "award"}`, isZh ? award.title.zh : award.title.en, [
          studioField("year", isZh ? "年份" : "Year", "text", year.year),
          studioField("date", isZh ? "日期" : "Date", "text", award.date),
          studioField("title", isZh ? "标题" : "Title", "textarea", isZh ? award.title.zh : award.title.en),
          studioField("body", isZh ? "正文" : "Body", "textarea", isZh ? award.body.zh : award.body.en),
          studioField("href", isZh ? "链接" : "Link", "url", award.href ?? ""),
        ]),
      ),
    );
    const honorsById = new Map(honors.map((item) => [item.id, item]));
    const selectedHomeHonors = officialState.lists.homeHonorItems
      .map((id) => honorsById.get(id))
      .filter((item): item is (typeof honors)[number] => Boolean(item));
    const homeHonorYears = officialState.lists.homeHonorYears.length ? officialState.lists.homeHonorYears : officialState.lists.honorYears;
    const yearOrderedHomeHonors = homeHonorYears.flatMap((year) => honors.filter((item) => item.id.startsWith(`${year}-`)));
    const homeHonors = selectedHomeHonors.length ? selectedHomeHonors : yearOrderedHomeHonors;
    next = replaceSectionItems(next, language, "home", "honors", homeHonors.length ? homeHonors : honors);
    next = replaceSectionItems(next, language, "about", "honors", honors);

    const chronicle = officialState.content.chronicle.flatMap((year) =>
      year.events.map((event, index) =>
        studioItem(`${year.year}-${index + 1}`, `${year.year} ${isZh ? event.month.zh : event.month.en}`, [
          studioField("year", isZh ? "年份" : "Year", "text", year.year),
          studioField("month", isZh ? "月份" : "Month", "text", isZh ? event.month.zh : event.month.en),
          studioField("side", isZh ? "位置 left/right" : "Side left/right", "text", event.side),
          studioField("text", isZh ? "正文" : "Text", "textarea", isZh ? event.text.zh : event.text.en),
        ]),
      ),
    );
    next = replaceSectionItems(next, language, "about", "chronicle", chronicle);

    const mergedIndustries = mergeIndustriesWithPageContent(officialState.lists.industries, next);
    const industries = mergedIndustries.map((industry) =>
      studioItem(industry.slug, isZh ? industry.zhName || industry.name : industry.name, [
        studioField("slug", isZh ? "标识" : "Slug", "text", industry.slug),
        studioField("title", isZh ? "标题" : "Title", "text", isZh ? industry.zhName || industry.name : industry.name),
        studioField("image", isZh ? "图片" : "Image", "image", industry.img),
        studioField("description", isZh ? "描述" : "Description", "textarea", isZh ? industry.zhIntro ?? "" : industry.intro ?? ""),
        studioField("href", isZh ? "链接" : "Link", "url", `/industries/${industry.slug}?from=home`),
        studioField("layoutClass", isZh ? "布局类名" : "Layout class", "text", industry.cls ?? ""),
      ]),
    );
    next = replaceSectionItems(next, language, "home", "industries", industries);
    next = replaceSectionItems(next, language, "media", "cards", industries);

    const industryDetailItems = mergedIndustries.map((industry) =>
      studioItem(industry.slug, isZh ? industry.zhName || industry.name : industry.name, [
        studioField("slug", isZh ? "标识" : "Slug", "text", industry.slug),
        studioField(
          "title",
          isZh ? "详情页标题" : "Detail title",
          "text",
          getExistingPageItemField(next, language, "media", "detailPages", industry.slug, "title") ||
            (isZh ? industry.zhName || industry.name : industry.name),
        ),
        studioField(
          "image",
          isZh ? "首屏背景图片" : "Hero image",
          "image",
          getExistingPageItemField(next, language, "media", "detailPages", industry.slug, "image") || industry.img,
        ),
        studioField(
          "intro",
          isZh ? "详情页简介" : "Detail intro",
          "textarea",
          getExistingPageItemField(next, language, "media", "detailPages", industry.slug, "intro") ||
            (isZh ? industry.zhIntro ?? "" : industry.intro ?? ""),
        ),
        studioField(
          "sections",
          isZh ? "详情卡片" : "Detail cards",
          "textarea",
          (isZh ? industry.zhSections : industry.sections) ??
            (getExistingOrDefaultPageItemField(next, language, "media", "detailPages", industry.slug, "sections") ||
              serializeIndustryDetailSections(industry.slug, language)),
        ),
      ]),
    );
    next = replaceSectionItems(next, language, "media", "detailPages", industryDetailItems);

    const homeEventItems = officialState.home.eventSlugs.map((slug) => {
      const event = officialEventsData.find((item) => item.slug === slug);
      const override = officialState.home.eventOverrides?.[slug] ?? officialState.events.overrides[slug];
      const localized = eventLocalizedCopyForLanguage(event, override, language);

      return studioItem(slug, localized.title || slug, [
        studioField("slug", isZh ? "轮播标识" : "Slide slug", "text", slug),
        studioField("image", isZh ? "轮播图片" : "Slide image", "image", override?.image ?? event?.image ?? ""),
        studioField("displayDate", isZh ? "展示日期" : "Display date", "text", localized.displayDate),
        studioField("category", isZh ? "分类" : "Category", "text", localized.category),
        studioField("title", isZh ? "标题" : "Title", "textarea", localized.title),
        studioField("summary", isZh ? "轮播摘要" : "Slide summary", "textarea", localized.summary),
        studioField("href", isZh ? "点击链接" : "Click link", "url", override?.href ?? `/events/${slug}?from=home`),
      ]);
    });
    next = replaceSectionItems(next, language, "home", "events", homeEventItems);

    const clientLogoItems = officialState.lists.clientLogos.map((logo, index) =>
      studioItem(`client-logo-${String(index + 1).padStart(2, "0")}`, `${isZh ? "客户 Logo" : "Client Logo"} ${index + 1}`, [
        studioField("logo", isZh ? "Logo 图片" : "Logo image", "image", logo),
        studioField("alt", isZh ? "替代文字" : "Alt text", "text", `${isZh ? "客户" : "Client"} ${index + 1}`),
      ]),
    );
    next = replaceSectionItems(next, language, "home", "clients", clientLogoItems);

    const teamProfileItems = Object.values(officialState.content.teamProfiles).map((profile) =>
      studioItem(profile.slug, isZh ? profile.zhName || profile.name || profile.slug : profile.name || profile.slug, [
        studioField("slug", isZh ? "标识" : "Slug", "text", profile.slug),
        studioField("image", isZh ? "缩略图" : "Thumbnail", "image", profile.image ?? ""),
        studioField("name", isZh ? "姓名" : "Name", "text", isZh ? profile.zhName ?? profile.name ?? "" : profile.name ?? ""),
        studioField("title", isZh ? "职位" : "Title", "text", isZh ? profile.zhTitle ?? profile.title ?? "" : profile.title ?? ""),
        studioField("phone", isZh ? "电话" : "Phone", "text", profile.phone ?? ""),
        studioField("email", isZh ? "邮箱" : "Email", "text", profile.email ?? ""),
        studioField("serviceIndustries", isZh ? "服务行业" : "Service industries", "textarea", profileLineList(isZh ? profile.zhServiceIndustries : profile.serviceIndustries)),
        studioField("education", isZh ? "教育背景" : "Education", "textarea", isZh ? profile.zhEducation ?? "" : profile.education ?? ""),
        studioField("qualification", isZh ? "专业资格" : "Qualification", "textarea", isZh ? profile.zhQualification ?? "" : profile.qualification ?? ""),
        studioField("languages", isZh ? "工作语言" : "Languages", "textarea", profileLineList(isZh ? profile.zhLanguages : profile.languages)),
        studioField("socialEngagements", isZh ? "社会任职" : "Social engagements", "textarea", isZh ? profile.zhSocialEngagements ?? "" : profile.socialEngagements ?? ""),
        studioField("practiceArea", isZh ? "专业领域" : "Practice area", "textarea", isZh ? profile.zhPracticeArea ?? "" : profile.practiceArea ?? ""),
        studioField("practiceExperience", isZh ? "执业经验" : "Practice experience", "textarea", isZh ? profile.zhPracticeExperience ?? "" : profile.practiceExperience ?? ""),
        studioField("honors", isZh ? "荣誉" : "Honors", "textarea", profileLineList(isZh ? profile.zhHonors : profile.honors)),
        studioField("achievements", isZh ? "个人业绩" : "Performance & Achievements", "textarea", profileLineList(isZh ? profile.zhAchievements : profile.achievements)),
      ]),
    );
    next = replaceSectionItems(next, language, "podcast", "memberProfiles", teamProfileItems);

    const teamListItems = (slugs: string[]) =>
      slugs.map((slug) => {
        const profile = officialState.content.teamProfiles[slug] ?? { slug };
        return studioItem(slug, isZh ? profile.zhName || profile.name || slug : profile.name || slug, [
          studioField("slug", isZh ? "标识" : "Slug", "text", slug),
          studioField("image", isZh ? "缩略图" : "Thumbnail", "image", profile.image ?? ""),
          studioField("name", isZh ? "姓名" : "Name", "text", isZh ? profile.zhName ?? profile.name ?? "" : profile.name ?? ""),
          studioField("title", isZh ? "职位" : "Title", "text", isZh ? profile.zhTitle ?? profile.title ?? "" : profile.title ?? ""),
          studioField("ctaLabel", isZh ? "CTA 文案" : "CTA label", "text", isZh ? "了解更多" : "Find out more"),
          studioField("href", isZh ? "链接" : "Link", "url", `/team/${slug}`),
        ]);
      });
    next = replaceSectionItems(next, language, "podcast", "partners", teamListItems(officialState.lists.partnerSlugs));
    next = replaceSectionItems(next, language, "podcast", "seniorAssociates", teamListItems(officialState.lists.seniorAssociateSlugs));

    const eventListItems = officialState.lists.eventSlugs.map((slug) => {
      const event = officialEventsData.find((item) => item.slug === slug);
      const override = officialState.events.overrides[slug] ?? {};
      const localized = eventLocalizedCopyForLanguage(event, override, language);
      return studioItem(slug, localized.title || slug, [
        studioField("slug", isZh ? "标识" : "Slug", "text", slug),
        studioField("image", isZh ? "缩略图" : "Thumbnail", "image", override.image ?? event?.image ?? ""),
        studioField("sortDate", isZh ? "排序日期（YYYYMMDD）" : "Sort date (YYYYMMDD)", "text", localized.sortDate),
        studioField("displayDate", isZh ? "展示日期" : "Display date", "text", localized.displayDate),
        studioField("category", isZh ? "分类" : "Category", "text", localized.category),
        studioField("title", isZh ? "标题" : "Title", "textarea", localized.title),
      ]);
    });
    next = replaceSectionItems(next, language, "event", "list", eventListItems);

    const eventDetailItems = officialState.lists.eventSlugs.map((slug) => {
      const event = officialEventsData.find((item) => item.slug === slug);
      const override = officialState.events.overrides[slug] ?? {};
      const localized = eventLocalizedCopyForLanguage(event, override, language);
      const content = localized.content.join("\n\n");
      const detailImages = override.detailImages ?? event?.detailImages ?? [];
      const detailVideos = override.detailVideos ?? event?.detailVideos ?? [];

      return studioItem(slug, localized.title || slug, [
        studioField("slug", isZh ? "标识" : "Slug", "text", slug),
        studioField("sortDate", isZh ? "排序日期（YYYYMMDD）" : "Sort date (YYYYMMDD)", "text", localized.sortDate),
        studioField("displayDate", isZh ? "展示日期" : "Display date", "text", localized.displayDate),
        studioField("category", isZh ? "分类" : "Category", "text", localized.category),
        studioField("title", isZh ? "详情页标题" : "Detail title", "textarea", localized.title),
        studioField("summary", isZh ? "详情页摘要" : "Detail summary", "textarea", localized.summary),
        studioField("content", isZh ? "详情正文" : "Detail content", "textarea", content),
        ...detailImages.map((image, index) =>
          studioField(`detailImage${index + 1}`, `${isZh ? "详情图片" : "Detail image"} ${index + 1}`, "image", image),
        ),
        ...detailVideos.map((video, index) =>
          studioField(`detailVideo${index + 1}`, `${isZh ? "详情视频" : "Detail video"} ${index + 1}`, "url", video),
        ),
      ]);
    });
    next = replaceSectionItems(next, language, "event", "detailPages", eventDetailItems);
  });

  return next;
}

function normalizeOfficialSiteStateForEditor(
  current: OfficialCmsSiteState,
  pageContentOverride?: PageContentState,
): OfficialCmsSiteState {
  const honors = mergeHonorContent(current.content.honors);
  const chronicle = mergeChronicleContent(current.content.chronicle);
  const teamProfileOverrides = mergeTeamProfileContent(current.content.teamProfiles);
  const eventOverrides = mergeEventOverrides(current.events.overrides);
  const honorYearDefaults = honors.map((item) => item.year);
  const homeHonorItemDefaults = homeHonorItemIds(honors);
  const chronicleYearDefaults = chronicle.map((item) => item.year);
  const industries = mergeIndustriesWithPageContent(current.lists.industries, pageContentOverride ?? current.previewPageContent);

  return {
    ...current,
    content: {
      ...current.content,
      honors,
      chronicle,
      teamProfiles: teamProfileOverrides,
    },
    events: {
      ...current.events,
      overrides: eventOverrides,
    },
    lists: {
      ...current.lists,
      industries,
      homeHonorYears: mergeOrderedSlugs(current.lists.homeHonorYears, honorYearDefaults),
      homeHonorItems: current.lists.homeHonorItems?.length
        ? current.lists.homeHonorItems.filter((item) => homeHonorItemDefaults.includes(item))
        : [],
      honorYears: mergeOrderedSlugs(current.lists.honorYears, honorYearDefaults),
      chronicleYears: mergeOrderedSlugs(current.lists.chronicleYears, chronicleYearDefaults),
      eventSlugs: current.lists.eventSlugs.length ? current.lists.eventSlugs : officialEventsData.map((event) => event.slug),
      partnerSlugs: mergeOrderedSlugs(
        current.lists.partnerSlugs,
        [...defaultPartnerSlugs, ...slugsFromTeamProfiles(teamProfileOverrides, "partner")],
      ),
      seniorAssociateSlugs: mergeOrderedSlugs(
        current.lists.seniorAssociateSlugs,
        [...defaultSeniorAssociateSlugs, ...slugsFromTeamProfiles(teamProfileOverrides, "seniorAssociate")],
      ),
    },
  };
}

function moveArrayItem<T>(items: T[], fromIndex: number, toIndex: number) {
  if (toIndex < 0 || toIndex >= items.length) return items;
  const next = [...items];
  const [item] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, item);
  return next;
}

function parseEventSortDate(value?: string) {
  const normalized = (value ?? "").replace(/\D/g, "");
  if (normalized.length >= 8) return Number(normalized.slice(0, 8));
  return 0;
}

function MultilingualField(props: {
  label: string;
  en: string;
  zh: string;
  onChange: (language: Language, value: string) => void;
  textarea?: boolean;
}) {
  return (
    <section className="space-y-3 rounded-[22px] border border-slate-200 bg-slate-50 p-4">
      <h4 className="text-sm font-semibold text-slate-900">{props.label}</h4>
      {(["en", "zh"] as Language[]).map((language) => (
        <label key={language} className="block space-y-2">
          <span className="text-sm font-medium text-slate-700">{language === "en" ? "English" : "中文"}</span>
          {props.textarea ? (
            <textarea
              value={language === "en" ? props.en : props.zh}
              rows={5}
              onChange={(event) => props.onChange(language, event.target.value)}
              className="min-h-32 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10"
            />
          ) : (
            <input
              value={language === "en" ? props.en : props.zh}
              onChange={(event) => props.onChange(language, event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10"
            />
          )}
        </label>
      ))}
    </section>
  );
}

function OfficialSiteSectionPanel(props: {
  panel: Extract<
    StudioPanel,
    | "homeEventCarousel"
    | "homeHonorsCarousel"
    | "officialIndustries"
    | "officialHonors"
    | "officialChronicle"
    | "officialPartners"
    | "officialSeniorAssociates"
    | "officialEvents"
  >;
  pageContent: PageContentState;
  officialSiteState: OfficialCmsSiteState | null;
  setOfficialSiteState: Dispatch<SetStateAction<OfficialCmsSiteState | null>>;
  setPageContent: Dispatch<SetStateAction<PageContentState>>;
  editingVersionId: number | null;
  submitVersionDraft: (
    versionId: number,
    nextState?: { siteContent?: SiteContent; visualEditor?: VisualEditorState; pageContent?: PageContentState; officialSiteState?: OfficialCmsSiteState | null },
  ) => Promise<boolean>;
  saveOfficialSiteState: (nextState: OfficialCmsSiteState) => Promise<boolean>;
  setMessage: (message: string) => void;
}) {
  const rawState = props.officialSiteState;
  const state = useMemo(() => (rawState ? normalizeOfficialSiteStateForEditor(rawState) : null), [rawState]);
  const [expandedOfficialItemIds, setExpandedOfficialItemIds] = useState<Record<string, boolean>>({});
  const [selectedHomeEventSlug, setSelectedHomeEventSlug] = useState("");
  const [selectedHomeHonorYear, setSelectedHomeHonorYear] = useState("");
  const [selectedOfficialEventSlug, setSelectedOfficialEventSlug] = useState("");

  useEffect(() => {
    setExpandedOfficialItemIds({});
    setSelectedHomeEventSlug("");
    setSelectedHomeHonorYear("");
    setSelectedOfficialEventSlug("");
  }, [props.panel]);

  const updateState = (updater: (current: OfficialCmsSiteState) => OfficialCmsSiteState) => {
    props.setOfficialSiteState((current) => (current ? updater(current) : current));
  };

  useEffect(() => {
    if (!rawState || !state || JSON.stringify(rawState) === JSON.stringify(state)) return;
    props.setOfficialSiteState(state);
  }, [
    rawState,
    state,
    props,
  ]);

  if (!state) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-950">官网内容管理</h2>
        <p className="mt-3 text-sm leading-6 text-slate-500">正在加载真实官网内容数据。</p>
      </section>
    );
  }

  const updateList = (key: Exclude<keyof OfficialCmsSiteState["lists"], "industries">, value: string[]) => {
    updateState((current) => ({
      ...current,
      lists: {
        ...current.lists,
        [key]: value,
      },
    }));
  };

  const panelTitles: Record<typeof props.panel, string> = {
    homeEventCarousel: "首页 event 事件轮播",
    homeHonorsCarousel: "首页 HONORS 轮播",
    officialIndustries: "服务行业",
    officialHonors: "虎诉荣誉",
    officialChronicle: "虎诉大事记",
    officialPartners: "合伙人",
    officialSeniorAssociates: "资深律师",
    officialEvents: "虎诉动态",
  };
  const panelDescriptions: Record<typeof props.panel, string> = {
    homeEventCarousel: "控制首页 Events 轮播显示哪些动态，以及它们的显示顺序。",
    homeHonorsCarousel: "控制首页 HONORS 轮播显示哪些年份，以及年份显示顺序。",
    officialIndustries: "管理首页服务行业模块的中英文名称、背景图和布局类名。",
    officialHonors: "管理 About 页虎诉荣誉年份范围和显示顺序。",
    officialChronicle: "管理 About 页 CHRONICLE 年份范围和显示顺序。",
    officialPartners: "管理团队页 Partner 分组成员及排序，个人子页面信息跟随同一份成员数据展示。",
    officialSeniorAssociates: "管理团队页 Senior Associate 分组成员及排序，个人子页面信息跟随同一份成员数据展示。",
    officialEvents: "管理 Events 页动态内容与排序。",
  };
  const saveCurrentPanel = () => {
    if (!props.editingVersionId) {
      props.setMessage("请先在“版本发布”中创建或选择一个版本，再保存内容；保存后需要发布版本才会同步到前台。");
      return;
    }

    const normalizedState = normalizeOfficialSiteStateForEditor(state, props.pageContent);
    const syncedPageContent = syncPageContentFromOfficialSiteState(props.pageContent, normalizedState);
    const stateForSave = { ...normalizedState, previewPageContent: syncedPageContent };
    props.setOfficialSiteState(stateForSave);
    props.setPageContent(syncedPageContent);

    void props.submitVersionDraft(props.editingVersionId, { officialSiteState: stateForSave, pageContent: syncedPageContent });
  };

  const officialSplitEditorClassName = "grid gap-4 xl:col-span-2 xl:grid-cols-[22rem_minmax(0,1fr)] xl:items-start";

  const toggleExpanded = (id: string) => {
    setExpandedOfficialItemIds({ [id]: true });
  };

  const toggleInlineExpanded = (id: string) => {
    setExpandedOfficialItemIds((current) => ({ ...current, [id]: !(current[id] ?? false) }));
  };

  const isExpanded = (id: string) => expandedOfficialItemIds[id] ?? false;

  const renderItemShell = (params: {
    id: string;
    title: string;
    summary?: string;
    thumbnail?: string;
    layout?: "inline" | "split";
    defaultOpen?: boolean;
    children: React.ReactNode;
    onPinTop?: () => void;
    onMoveUp?: () => void;
    onMoveDown?: () => void;
    onDelete?: () => void;
  }) => {
    const hasSelectedSplitItem = Object.values(expandedOfficialItemIds).some(Boolean);
    const open = params.layout === "inline" ? isExpanded(params.id) : hasSelectedSplitItem ? isExpanded(params.id) : Boolean(params.defaultOpen);

    if (params.layout === "inline") {
      return (
        <article key={params.id} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex min-w-0 flex-wrap items-center gap-4">
            {params.thumbnail ? (
              <img
                src={params.thumbnail}
                alt=""
                className="h-20 w-28 shrink-0 rounded-2xl border border-slate-200 bg-slate-100 object-cover"
              />
            ) : null}
            <button type="button" onClick={() => toggleInlineExpanded(params.id)} className="min-w-[220px] flex-1 text-left">
              <p className="text-sm font-semibold text-slate-950">{params.title}</p>
              {params.summary ? <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">{params.summary}</p> : null}
            </button>
            <div className="flex flex-wrap items-center gap-2">
              {params.onPinTop ? (
                <button
                  type="button"
                  onClick={params.onPinTop}
                  className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-[#2563eb] hover:text-[#2563eb]"
                >
                  <ArrowUp className="h-3.5 w-3.5" />
                  置顶
                </button>
              ) : null}
              {params.onMoveUp ? (
                <button
                  type="button"
                  onClick={params.onMoveUp}
                  className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-[#2563eb] hover:text-[#2563eb]"
                >
                  <ArrowUp className="h-3.5 w-3.5" />
                  上移
                </button>
              ) : null}
              {params.onMoveDown ? (
                <button
                  type="button"
                  onClick={params.onMoveDown}
                  className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-[#2563eb] hover:text-[#2563eb]"
                >
                  <ArrowDown className="h-3.5 w-3.5" />
                  下移
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => toggleInlineExpanded(params.id)}
                className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-[#2563eb] hover:text-[#2563eb]"
              >
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
                {open ? "折叠" : "展开"}
              </button>
              {params.onDelete ? (
                <button
                  type="button"
                  onClick={params.onDelete}
                  className="inline-flex items-center gap-1 rounded-xl px-3 py-2 text-xs font-bold text-rose-500 transition hover:bg-rose-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  删除
                </button>
              ) : null}
            </div>
          </div>
          <div className={open ? "mt-5 space-y-4 rounded-[24px] border border-slate-100 bg-slate-50/60 p-4" : "hidden"}>
            {params.children}
          </div>
        </article>
      );
    }

    return [
      <article
        key={`${params.id}-nav`}
        className={`rounded-[28px] border p-5 shadow-sm transition xl:col-start-1 ${
          open ? "border-[#2563eb] bg-[#eef4ff]" : "border-slate-200 bg-white"
        }`}
      >
        <div className="flex min-w-0 flex-wrap items-center gap-4 xl:flex-col xl:items-stretch">
          {params.thumbnail ? (
            <img
              src={params.thumbnail}
              alt=""
              className="h-20 w-28 shrink-0 rounded-2xl border border-slate-200 bg-slate-100 object-cover xl:h-36 xl:w-full"
            />
          ) : null}
          <button type="button" onClick={() => toggleExpanded(params.id)} className="min-w-[220px] flex-1 text-left xl:min-w-0">
            <p className="text-sm font-semibold text-slate-950">{params.title}</p>
            {params.summary ? <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">{params.summary}</p> : null}
          </button>
          <div className="flex flex-wrap items-center gap-2">
            {params.onPinTop ? (
              <button
                type="button"
                onClick={params.onPinTop}
                className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-[#2563eb] hover:text-[#2563eb]"
              >
                <ArrowUp className="h-3.5 w-3.5" />
                置顶
              </button>
            ) : null}
            {params.onMoveUp ? (
              <button
                type="button"
                onClick={params.onMoveUp}
                className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-[#2563eb] hover:text-[#2563eb]"
              >
                <ArrowUp className="h-3.5 w-3.5" />
                上移
              </button>
            ) : null}
            {params.onMoveDown ? (
              <button
                type="button"
                onClick={params.onMoveDown}
                className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-[#2563eb] hover:text-[#2563eb]"
              >
                <ArrowDown className="h-3.5 w-3.5" />
                下移
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => toggleExpanded(params.id)}
              className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-[#2563eb] hover:text-[#2563eb]"
            >
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
              {open ? "折叠" : "展开"}
            </button>
            {params.onDelete ? (
              <button
                type="button"
                onClick={params.onDelete}
                className="inline-flex items-center gap-1 rounded-xl px-3 py-2 text-xs font-bold text-rose-500 transition hover:bg-rose-50"
              >
                <Trash2 className="h-3.5 w-3.5" />
                删除
              </button>
            ) : null}
          </div>
        </div>
      </article>,
      open ? (
        <section
          key={`${params.id}-editor`}
          className="min-w-0 space-y-4 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm xl:col-start-2 xl:row-start-1 xl:row-span-[999]"
        >
          <div className="border-b border-slate-100 pb-4">
            <p className="text-sm font-semibold text-slate-950">{params.title}</p>
            {params.summary ? <p className="mt-1 text-xs leading-5 text-slate-500">{params.summary}</p> : null}
          </div>
          {params.children}
        </section>
      ) : null,
    ];
  };

  const renderStickySplitNodes = (nodes: ReactNode) => {
    const items = Children.toArray(nodes);
    const navNodes: ReactNode[] = [];
    const editorNodes: ReactNode[] = [];

    items.forEach((node) => {
      const key = isValidElement(node) ? String(node.key ?? "") : "";
      if (key.includes("-editor")) {
        editorNodes.push(node);
      } else {
        navNodes.push(node);
      }
    });

    return (
      <>
        <aside className="space-y-4 xl:sticky xl:top-24 xl:col-start-1 xl:max-h-[calc(100vh-7rem)] xl:overflow-y-auto xl:pr-1">
          {navNodes}
        </aside>
        <div className="min-w-0 space-y-4 xl:col-start-2">
          {editorNodes.length ? (
            editorNodes
          ) : (
            <section className="rounded-[28px] border border-dashed border-slate-300 bg-white p-8 text-sm text-slate-500">
              点击左侧导航后在这里编辑内容。
            </section>
          )}
        </div>
      </>
    );
  };

  const renderIndustriesEditor = () => (
    <div className={officialSplitEditorClassName}>
      {renderStickySplitNodes([
      <div key="industry-actions" className="flex justify-end">
        <button
          type="button"
          onClick={() =>
            updateState((current) => ({
              ...current,
              lists: {
                ...current.lists,
                industries: [
                  ...current.lists.industries,
                  {
                    slug: `industry-${Date.now()}`,
                    name: "New Industry",
                    zhName: "新服务行业",
                    img: "",
                    cls: "lg:col-span-1",
                    intro: "",
                    zhIntro: "",
                    sections: "",
                    zhSections: "",
                  },
                ],
              },
            }))
          }
          className="rounded-2xl bg-[#2563eb] px-4 py-3 text-sm font-semibold text-white"
        >
          新增服务行业
        </button>
      </div>,
      ...state.lists.industries.map((industry, index) =>
        renderItemShell({
          id: `industry-${industry.slug}-${index}`,
          defaultOpen: index === 0,
          title: `${industry.zhName || "未填写中文"} / ${industry.name || "Untitled"}`,
          summary: industry.img,
          thumbnail: industry.img,
          onMoveUp:
            index > 0
              ? () =>
                  updateState((current) => ({
                    ...current,
                    lists: { ...current.lists, industries: moveArrayItem(current.lists.industries, index, index - 1) },
                  }))
              : undefined,
          onMoveDown:
            index < state.lists.industries.length - 1
              ? () =>
                  updateState((current) => ({
                    ...current,
                    lists: { ...current.lists, industries: moveArrayItem(current.lists.industries, index, index + 1) },
                  }))
              : undefined,
          onDelete: () =>
            updateState((current) => ({
              ...current,
              lists: { ...current.lists, industries: current.lists.industries.filter((_, itemIndex) => itemIndex !== index) },
            })),
          children: (
            <div className="grid gap-4 xl:grid-cols-2">
              {[
                ["slug", "Slug"],
                ["name", "英文名称"],
                ["zhName", "中文名称"],
                ["img", "背景图片"],
                ["cls", "布局类名"],
              ].map(([key, label]) => (
                <label key={key} className="block space-y-2">
                  <span className="text-sm font-medium text-slate-700">{label}</span>
                  <input
                    value={String(industry[key as keyof OfficialCmsIndustryListItem] ?? "")}
                    onChange={(event) =>
                      updateState((current) => ({
                        ...current,
                        lists: {
                          ...current.lists,
                          industries: current.lists.industries.map((item, itemIndex) =>
                            itemIndex === index ? { ...item, [key]: event.target.value } : item,
                          ),
                        },
                      }))
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#2563eb]"
                  />
                </label>
              ))}
              {[
                ["intro", "英文子页面描述"],
                ["zhIntro", "中文子页面描述"],
                ["sections", "英文子页面详情卡片"],
                ["zhSections", "中文子页面详情卡片"],
              ].map(([key, label]) => (
                <label key={key} className="block space-y-2 xl:col-span-2">
                  <span className="text-sm font-medium text-slate-700">{label}</span>
                  <textarea
                    value={String(
                      industry[key as keyof OfficialCmsIndustryListItem] ||
                        (key === "sections"
                          ? getExistingOrDefaultPageItemField(
                              props.pageContent,
                              "en",
                              "media",
                              "detailPages",
                              industry.slug,
                              "sections",
                            ) || serializeIndustryDetailSections(industry.slug, "en")
                          : key === "zhSections"
                            ? getExistingOrDefaultPageItemField(
                                props.pageContent,
                                "zh",
                                "media",
                                "detailPages",
                                industry.slug,
                                "sections",
                              ) || serializeIndustryDetailSections(industry.slug, "zh")
                            : key === "intro"
                              ? getExistingOrDefaultPageItemField(
                                  props.pageContent,
                                  "en",
                                  "media",
                                  "detailPages",
                                  industry.slug,
                                  "intro",
                                )
                              : key === "zhIntro"
                                ? getExistingOrDefaultPageItemField(
                                    props.pageContent,
                                    "zh",
                                    "media",
                                    "detailPages",
                                    industry.slug,
                                    "intro",
                                  )
                            : ""),
                    )}
                    rows={5}
                    onChange={(event) =>
                      updateState((current) => ({
                        ...current,
                        lists: {
                          ...current.lists,
                          industries: current.lists.industries.map((item, itemIndex) =>
                            itemIndex === index ? { ...item, [key]: event.target.value } : item,
                          ),
                        },
                      }))
                    }
                    className="min-h-32 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#2563eb]"
                  />
                  {key === "sections" || key === "zhSections" ? (
                    <p className="text-xs leading-5 text-slate-500">
                      Detail cards 格式：每个卡片用一个空行分隔；第一行是卡片标题，后续每行是该卡片的正文或要点。留空时使用页面默认内容。
                    </p>
                  ) : null}
                </label>
              ))}
            </div>
          ),
          }),
      ),
      ])}
    </div>
  );

  const updateEventOverride = (slug: string, updater: (override: OfficialCmsEventOverride) => OfficialCmsEventOverride) => {
    updateState((current) => ({
      ...current,
      events: {
        ...current.events,
        overrides: {
          ...current.events.overrides,
          [slug]: updater(current.events.overrides[slug] ?? createEventOverride()),
        },
      },
    }));
  };

  const updateLocalizedEventOverride = (
    slug: string,
    language: "en" | "zh",
    updater: (override: OfficialCmsLocalizedEventOverride) => OfficialCmsLocalizedEventOverride,
  ) => {
    updateEventOverride(slug, (override) => ({
      ...override,
      [language]: updater(override[language] ?? createLocalizedEventOverride()),
    }));
  };

  const renderHomeEventCarouselEditor = () => {
    const selectedSlugs = state.home.eventSlugs;
    const availableEvents = officialEventsData.filter((event) => !selectedSlugs.includes(event.slug));
    const updateHomeEventOverride = (slug: string, updater: (override: OfficialCmsEventOverride) => OfficialCmsEventOverride) => {
      updateState((current) => ({
        ...current,
        home: {
          ...current.home,
          eventOverrides: {
            ...(current.home.eventOverrides ?? {}),
            [slug]: updater(current.home.eventOverrides?.[slug] ?? current.events.overrides[slug] ?? createEventOverride()),
          },
        },
      }));
    };
    const updateLocalizedHomeEventOverride = (
      slug: string,
      language: "en" | "zh",
      updater: (override: OfficialCmsLocalizedEventOverride) => OfficialCmsLocalizedEventOverride,
    ) => {
      updateHomeEventOverride(slug, (override) => ({
        ...override,
        [language]: updater(override[language] ?? createLocalizedEventOverride()),
      }));
    };

    return (
      <div className="space-y-4 xl:col-span-2">
        <div className="flex flex-wrap justify-end gap-3">
          <select
            value={selectedHomeEventSlug}
            onChange={(event) => setSelectedHomeEventSlug(event.target.value)}
            className="min-w-[18rem] rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#2563eb]"
          >
            <option value="">选择要加入首页轮播的事件</option>
            {availableEvents.map((event) => (
              <option key={event.slug} value={event.slug}>
                {event.date} / {event.zh?.title ?? event.title}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => {
              if (!selectedHomeEventSlug) return;
              updateState((current) => ({
                ...current,
                home: { ...current.home, eventSlugs: [...current.home.eventSlugs, selectedHomeEventSlug] },
              }));
              setSelectedHomeEventSlug("");
            }}
            className="rounded-2xl bg-[#2563eb] px-4 py-3 text-sm font-semibold text-white"
          >
            新增到轮播
          </button>
        </div>
        {selectedSlugs.map((slug, index) => {
          const event = officialEventsData.find((item) => item.slug === slug);
          const override = state.home.eventOverrides?.[slug] ?? state.events.overrides[slug] ?? createEventOverride();
          const title = override.zh?.title || override.en?.title || event?.zh?.title || event?.title || slug;
          const thumbnail = override.image || event?.image;

          return renderItemShell({
            id: `home-event-${slug}`,
            title,
            summary: slug,
            thumbnail,
            layout: "inline",
            onMoveUp:
              index > 0
                ? () =>
                    updateState((current) => ({
                      ...current,
                      home: { ...current.home, eventSlugs: moveArrayItem(current.home.eventSlugs, index, index - 1) },
                    }))
                : undefined,
            onMoveDown:
              index < selectedSlugs.length - 1
                ? () =>
                    updateState((current) => ({
                      ...current,
                      home: { ...current.home, eventSlugs: moveArrayItem(current.home.eventSlugs, index, index + 1) },
                    }))
                : undefined,
            onDelete: () =>
              updateState((current) => ({
                ...current,
                home: { ...current.home, eventSlugs: current.home.eventSlugs.filter((item) => item !== slug) },
              })),
            children: (
              <div className="grid gap-4 xl:grid-cols-2">
                <label className="block space-y-2 xl:col-span-2">
                  <span className="text-sm font-medium text-slate-700">封面图片</span>
                  <input
                    value={override.image ?? ""}
                    placeholder={event?.image}
                    onChange={(inputEvent) =>
                      updateHomeEventOverride(slug, (currentOverride) => ({ ...currentOverride, image: inputEvent.target.value }))
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#2563eb]"
                  />
                </label>
                <label className="block space-y-2 xl:col-span-2">
                  <span className="text-sm font-medium text-slate-700">点击链接</span>
                  <input
                    value={override.href ?? ""}
                    placeholder={`/events/${slug}?from=home`}
                    onChange={(inputEvent) =>
                      updateHomeEventOverride(slug, (currentOverride) => ({ ...currentOverride, href: inputEvent.target.value }))
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#2563eb]"
                  />
                </label>
                {(["en", "zh"] as const).map((language) => {
                  const localized = override[language] ?? createLocalizedEventOverride();

                  return (
                    <section key={language} className="space-y-4 rounded-[22px] border border-slate-200 bg-slate-50 p-4">
                      <h4 className="text-sm font-semibold text-slate-900">{language === "en" ? "English" : "中文"}</h4>
                      {(["displayDate", "category", "title", "summary"] as const).map((field) => (
                        <label key={field} className="block space-y-2">
                          <span className="text-sm font-medium text-slate-700">{field}</span>
                          <input
                            value={String(localized[field] ?? "")}
                            onChange={(inputEvent) =>
                              updateLocalizedHomeEventOverride(slug, language, (currentLocalized) => ({
                                ...currentLocalized,
                                [field]: inputEvent.target.value,
                              }))
                            }
                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#2563eb]"
                          />
                        </label>
                      ))}
                      {false ? (
                      <label className="block space-y-2">
                        <span className="text-sm font-medium text-slate-700">content（每行一段）</span>
                        <textarea
                          value={(localized.content ?? []).join("\n")}
                          rows={8}
                          onChange={(inputEvent) =>
                            updateLocalizedEventOverride(slug, language, (currentLocalized) => ({
                              ...currentLocalized,
                              content: splitLines(inputEvent.target.value),
                            }))
                          }
                          className="min-h-44 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#2563eb]"
                        />
                      </label>
                      ) : null}
                    </section>
                  );
                })}
              </div>
            ),
          });
        })}
      </div>
    );
  };

  const renderHomeHonorsCarouselEditor = () => (
    <div className={officialSplitEditorClassName}>
      {(state.lists.homeHonorYears.length ? state.lists.homeHonorYears : state.content.honors.map((item) => item.year)).map((year, index, years) =>
        renderItemShell({
          id: `home-honor-${year}-${index}`,
          defaultOpen: index === 0,
          title: year,
          summary: state.content.honors.find((item) => item.year === year)?.awards.map((award) => award.title.zh || award.title.en).join("，"),
          onMoveUp:
            index > 0 ? () => updateList("homeHonorYears", moveArrayItem(years, index, index - 1)) : undefined,
          onMoveDown:
            index < years.length - 1 ? () => updateList("homeHonorYears", moveArrayItem(years, index, index + 1)) : undefined,
          onDelete: () => updateList("homeHonorYears", years.filter((item) => item !== year)),
          children: (
            <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
              首页 HONORS 轮播会展示这个年份下的荣誉内容。具体荣誉正文在“虎诉荣誉”里编辑。
            </p>
          ),
        }),
      )}
      <div className="flex flex-wrap justify-end gap-3 xl:col-start-1">
        <select
          value=""
          onChange={(event) => {
            const year = event.target.value;
            if (!year) return;
            updateList("homeHonorYears", [...state.lists.homeHonorYears, year]);
          }}
          className="min-w-[14rem] rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#2563eb]"
        >
          <option value="">新增年份到首页轮播</option>
          {state.content.honors
            .map((item) => item.year)
            .filter((year) => !state.lists.homeHonorYears.includes(year))
            .map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
        </select>
      </div>
    </div>
  );

  const renderHomeHonorsSelectionEditor = () => {
    const selectedYears = state.lists.homeHonorYears;
    const honorYearOptions = state.content.honors.map((item) => item.year).filter(Boolean);

    return (
      <div className="space-y-4 xl:col-span-2">
        <div className="flex flex-wrap justify-end gap-3 xl:col-start-1">
          <select
            value={selectedHomeHonorYear}
            onChange={(event) => setSelectedHomeHonorYear(event.target.value)}
            className="min-w-[18rem] rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#2563eb]"
          >
            <option value="">选择要加入首页 HONORS 轮播的年份</option>
            {honorYearOptions.map((year) => {
              const honorYear = state.content.honors.find((item) => item.year === year);
              const alreadySelected = selectedYears.includes(year);
              return (
                <option key={year} value={year} disabled={alreadySelected}>
                  {year} / {honorYear?.awards[0]?.title.zh || honorYear?.awards[0]?.title.en || "HONORS"}
                  {alreadySelected ? "（已在轮播）" : ""}
                </option>
              );
            })}
          </select>
          <button
            type="button"
            onClick={() => {
              if (!selectedHomeHonorYear) return;
              if (selectedYears.includes(selectedHomeHonorYear)) {
                setSelectedHomeHonorYear("");
                return;
              }
              updateList("homeHonorYears", [...selectedYears, selectedHomeHonorYear]);
              setSelectedHomeHonorYear("");
            }}
            className="rounded-2xl bg-[#2563eb] px-4 py-3 text-sm font-semibold text-white"
          >
            新增到轮播
          </button>
        </div>
        {selectedYears.map((year, index, years) =>
          renderItemShell({
            id: `home-honor-${year}-${index}`,
            defaultOpen: index === 0,
            title: year,
            summary: state.content.honors
              .find((item) => item.year === year)
              ?.awards.map((award) => award.title.zh || award.title.en)
              .join("，"),
            onMoveUp:
              index > 0 ? () => updateList("homeHonorYears", moveArrayItem(years, index, index - 1)) : undefined,
            onMoveDown:
              index < years.length - 1 ? () => updateList("homeHonorYears", moveArrayItem(years, index, index + 1)) : undefined,
            onDelete: () => updateList("homeHonorYears", years.filter((item) => item !== year)),
            children: (
              <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                首页 HONORS 轮播会展示这个年份下的荣誉内容。具体荣誉正文在“虎诉荣誉”里编辑。
              </p>
            ),
          }),
        )}
      </div>
    );
  };

  const renderHomeHonorItemsSelectionEditor = () => {
    const honorItems = state.content.honors.flatMap((year) =>
      year.awards.map((award, awardIndex) => ({
        id: homeHonorItemId(year.year, awardIndex, award.date),
        year: year.year,
        title: award.title.zh || award.title.en || "HONORS",
        date: award.date,
        body: award.body.zh || award.body.en || "",
      })),
    );
    const selectedItemIds = state.lists.homeHonorItems;
    const selectedItems = selectedItemIds
      .map((id) => honorItems.find((item) => item.id === id))
      .filter((item): item is (typeof honorItems)[number] => Boolean(item));
    const honorItemsByYear = state.content.honors.map((year) => ({
      year: year.year,
      items: honorItems.filter((item) => item.year === year.year),
    }));

    return (
      <div className={officialSplitEditorClassName}>
        <div className="flex flex-wrap justify-end gap-3 xl:col-start-1">
          <select
            value={selectedHomeHonorYear}
            onChange={(event) => setSelectedHomeHonorYear(event.target.value)}
            className="min-w-[18rem] rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#2563eb]"
          >
            <option value="">选择要加入首页 HONORS 轮播的具体荣誉</option>
            {honorItemsByYear.map((group) => (
              <optgroup key={group.year} label={group.year}>
                {group.items.map((item) => {
                  const alreadySelected = selectedItemIds.includes(item.id);

                  return (
                    <option key={item.id} value={item.id} disabled={alreadySelected}>
                      {item.date} / {item.title}
                      {alreadySelected ? "（已加入）" : ""}
                    </option>
                  );
                })}
              </optgroup>
            ))}
          </select>
          <button
            type="button"
            onClick={() => {
              if (!selectedHomeHonorYear) return;
              if (selectedItemIds.includes(selectedHomeHonorYear)) {
                setSelectedHomeHonorYear("");
                return;
              }
              updateList("homeHonorItems", [...selectedItemIds, selectedHomeHonorYear]);
              setSelectedHomeHonorYear("");
            }}
            className="rounded-2xl bg-[#2563eb] px-4 py-3 text-sm font-semibold text-white"
          >
            新增到轮播
          </button>
        </div>
        {selectedItems.map((item, index) =>
          renderItemShell({
            id: `home-honor-${item.id}`,
            defaultOpen: index === 0,
            title: item.year,
            summary: [item.title, item.date, item.body].filter(Boolean).join(" / "),
            onMoveUp:
              index > 0 ? () => updateList("homeHonorItems", moveArrayItem(selectedItemIds, index, index - 1)) : undefined,
            onMoveDown:
              index < selectedItemIds.length - 1
                ? () => updateList("homeHonorItems", moveArrayItem(selectedItemIds, index, index + 1))
                : undefined,
            onDelete: () => updateList("homeHonorItems", selectedItemIds.filter((id) => id !== item.id)),
            children: (
              <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                首页 HONORS 轮播按这里选中的具体荣誉展示。具体标题、日期、正文在“虎诉荣誉”里编辑。
              </p>
            ),
          }),
        )}
      </div>
    );
  };

  const renderHomeHonorYearNavigationEditor = () => {
    const honorItems = state.content.honors.flatMap((year) =>
      year.awards.map((award, awardIndex) => ({
        id: homeHonorItemId(year.year, awardIndex, award.date),
        year: year.year,
        title: award.title.zh || award.title.en || "HONORS",
        date: award.date,
        body: award.body.zh || award.body.en || "",
      })),
    );
    const years = state.lists.homeHonorYears.length ? state.lists.homeHonorYears : state.content.honors.map((item) => item.year);
    const selectedItemIds = state.lists.homeHonorItems;
    const findHonorItem = (id: string) => honorItems.find((item) => item.id === id);
    const selectedItemsForYear = (year: string) =>
      selectedItemIds
        .map((id) => findHonorItem(id))
        .filter((item): item is (typeof honorItems)[number] => item?.year === year);

    return (
      <div className={officialSplitEditorClassName}>
        <div className="flex flex-wrap justify-end gap-3 xl:col-start-1">
          <select
            value=""
            onChange={(event) => {
              const year = event.target.value;
              if (!year) return;
              updateList("homeHonorYears", [...years, year]);
            }}
            className="min-w-[14rem] rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#2563eb]"
          >
            <option value="">新增年份到首页 HONORS</option>
            {state.content.honors
              .map((item) => item.year)
              .filter((year) => year && !years.includes(year))
              .map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
          </select>
        </div>
        {years.map((year, yearIndex) => {
          const sourceItems = honorItems.filter((item) => item.year === year);
          const selectedYearItems = selectedItemsForYear(year);
          const availableYearItems = sourceItems.filter((item) => !selectedItemIds.includes(item.id));
          const yearSelectValue = availableYearItems.some((item) => item.id === selectedHomeHonorYear)
            ? selectedHomeHonorYear
            : "";

          return renderItemShell({
            id: `home-honor-year-${year}-${yearIndex}`,
            defaultOpen: yearIndex === 0,
            title: year,
            summary: selectedYearItems.length
              ? selectedYearItems.map((item) => item.title).join("，")
              : `${sourceItems.length} 条虎诉荣誉可加入首页 HONORS`,
            onMoveUp: yearIndex > 0 ? () => updateList("homeHonorYears", moveArrayItem(years, yearIndex, yearIndex - 1)) : undefined,
            onMoveDown:
              yearIndex < years.length - 1
                ? () => updateList("homeHonorYears", moveArrayItem(years, yearIndex, yearIndex + 1))
                : undefined,
            onDelete: () => {
              updateList("homeHonorYears", years.filter((item) => item !== year));
              updateList(
                "homeHonorItems",
                selectedItemIds.filter((id) => findHonorItem(id)?.year !== year),
              );
            },
            children: (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <select
                    value={yearSelectValue}
                    onChange={(event) => setSelectedHomeHonorYear(event.target.value)}
                    className="min-w-[18rem] rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#2563eb]"
                  >
                    <option value="">选择这个年份下的具体荣誉</option>
                    {availableYearItems.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.date} / {item.title}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => {
                      if (!yearSelectValue) return;
                      updateList("homeHonorItems", [...selectedItemIds, yearSelectValue]);
                      setSelectedHomeHonorYear("");
                    }}
                    className="rounded-2xl bg-[#2563eb] px-4 py-3 text-sm font-semibold text-white"
                  >
                    新增到轮播
                  </button>
                </div>
                {selectedYearItems.length ? (
                  <div className="space-y-3">
                    {selectedYearItems.map((item) => {
                      const itemIndex = selectedItemIds.indexOf(item.id);

                      return (
                        <article key={item.id} className="rounded-[22px] border border-slate-200 bg-slate-50 p-4">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                              <p className="text-sm font-semibold text-slate-950">{item.title}</p>
                              <p className="mt-1 text-xs text-slate-500">{item.date}</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {itemIndex > 0 ? (
                                <button
                                  type="button"
                                  onClick={() => updateList("homeHonorItems", moveArrayItem(selectedItemIds, itemIndex, itemIndex - 1))}
                                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600"
                                >
                                  上移
                                </button>
                              ) : null}
                              {itemIndex < selectedItemIds.length - 1 ? (
                                <button
                                  type="button"
                                  onClick={() => updateList("homeHonorItems", moveArrayItem(selectedItemIds, itemIndex, itemIndex + 1))}
                                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600"
                                >
                                  下移
                                </button>
                              ) : null}
                              <button
                                type="button"
                                onClick={() => updateList("homeHonorItems", selectedItemIds.filter((id) => id !== item.id))}
                                className="rounded-xl px-3 py-2 text-xs font-bold text-rose-500 hover:bg-rose-50"
                              >
                                删除
                              </button>
                            </div>
                          </div>
                          {item.body ? <p className="mt-3 text-sm leading-6 text-slate-600">{item.body}</p> : null}
                        </article>
                      );
                    })}
                  </div>
                ) : (
                  <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                    这个年份还没有选择具体荣誉。未选择任何具体荣誉时，首页 HONORS 会按年份列表回退展示。
                  </p>
                )}
              </div>
            ),
          });
        })}
      </div>
    );
  };

  const renderHomeHonorStickyYearEditor = () => {
    const honorItems = state.content.honors.flatMap((year) =>
      year.awards.map((award, awardIndex) => ({
        id: homeHonorItemId(year.year, awardIndex, award.date),
        year: year.year,
        title: award.title.zh || award.title.en || "HONORS",
        date: award.date,
        body: award.body.zh || award.body.en || "",
      })),
    );
    const years = state.lists.homeHonorYears.length ? state.lists.homeHonorYears : state.content.honors.map((item) => item.year);
    const selectedItemIds = state.lists.homeHonorItems;
    const findHonorItem = (id: string) => honorItems.find((item) => item.id === id);
    const selectedItemsForYear = (year: string) =>
      selectedItemIds
        .map((id) => findHonorItem(id))
        .filter((item): item is (typeof honorItems)[number] => item?.year === year);
    const activeYear = years.find((year) => expandedOfficialItemIds[`home-honor-year-${year}`]) ?? years[0] ?? "";
    const sourceItems = honorItems.filter((item) => item.year === activeYear);
    const selectedYearItems = selectedItemsForYear(activeYear);
    const availableYearItems = sourceItems.filter((item) => !selectedItemIds.includes(item.id));
    const yearSelectValue = availableYearItems.some((item) => item.id === selectedHomeHonorYear) ? selectedHomeHonorYear : "";

    return (
      <div className={officialSplitEditorClassName}>
        <aside className="space-y-4 xl:sticky xl:top-24 xl:col-start-1 xl:max-h-[calc(100vh-7rem)] xl:overflow-y-auto xl:pr-1">
          <select
            value=""
            onChange={(event) => {
              const year = event.target.value;
              if (!year) return;
              updateList("homeHonorYears", [...years, year]);
            }}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#2563eb]"
          >
            <option value="">新增年份到首页 HONORS</option>
            {state.content.honors
              .map((item) => item.year)
              .filter((year) => year && !years.includes(year))
              .map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
          </select>
          <div className="space-y-3">
            {years.map((year, yearIndex) => {
              const sourceCount = honorItems.filter((item) => item.year === year).length;
              const selectedCount = selectedItemsForYear(year).length;
              const active = year === activeYear;

              return (
                <article
                  key={year}
                  className={`rounded-[24px] border p-4 shadow-sm transition ${
                    active ? "border-[#2563eb] bg-[#eef4ff]" : "border-slate-200 bg-white"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setExpandedOfficialItemIds({ [`home-honor-year-${year}`]: true })}
                    className="block w-full text-left"
                  >
                    <p className="text-sm font-semibold text-slate-950">{year}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      已选 {selectedCount} 条 / 可选 {sourceCount} 条
                    </p>
                  </button>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {yearIndex > 0 ? (
                      <button
                        type="button"
                        onClick={() => updateList("homeHonorYears", moveArrayItem(years, yearIndex, yearIndex - 1))}
                        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600"
                      >
                        上移
                      </button>
                    ) : null}
                    {yearIndex < years.length - 1 ? (
                      <button
                        type="button"
                        onClick={() => updateList("homeHonorYears", moveArrayItem(years, yearIndex, yearIndex + 1))}
                        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600"
                      >
                        下移
                      </button>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => {
                        updateList("homeHonorYears", years.filter((item) => item !== year));
                        updateList(
                          "homeHonorItems",
                          selectedItemIds.filter((id) => findHonorItem(id)?.year !== year),
                        );
                      }}
                      className="rounded-xl px-3 py-2 text-xs font-bold text-rose-500 hover:bg-rose-50"
                    >
                      删除
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </aside>
        <section className="min-w-0 space-y-4 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm xl:col-start-2">
          <div className="border-b border-slate-100 pb-4">
            <p className="text-sm font-semibold text-slate-950">{activeYear || "未选择年份"}</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">从该年份的虎诉荣誉中选择具体条目加入首页 HONORS 轮播。</p>
          </div>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <select
                value={yearSelectValue}
                onChange={(event) => setSelectedHomeHonorYear(event.target.value)}
                className="min-w-[18rem] rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#2563eb]"
              >
                <option value="">选择这个年份下的具体荣誉</option>
                {availableYearItems.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.date} / {item.title}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => {
                  if (!yearSelectValue) return;
                  updateList("homeHonorItems", [...selectedItemIds, yearSelectValue]);
                  setSelectedHomeHonorYear("");
                }}
                className="rounded-2xl bg-[#2563eb] px-4 py-3 text-sm font-semibold text-white"
              >
                新增到轮播
              </button>
            </div>
            {selectedYearItems.length ? (
              <div className="space-y-3">
                {selectedYearItems.map((item) => {
                  const itemIndex = selectedItemIds.indexOf(item.id);

                  return (
                    <article key={item.id} className="rounded-[22px] border border-slate-200 bg-slate-50 p-4">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-slate-950">{item.title}</p>
                          <p className="mt-1 text-xs text-slate-500">{item.date}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {itemIndex > 0 ? (
                            <button
                              type="button"
                              onClick={() => updateList("homeHonorItems", moveArrayItem(selectedItemIds, itemIndex, itemIndex - 1))}
                              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600"
                            >
                              上移
                            </button>
                          ) : null}
                          {itemIndex < selectedItemIds.length - 1 ? (
                            <button
                              type="button"
                              onClick={() => updateList("homeHonorItems", moveArrayItem(selectedItemIds, itemIndex, itemIndex + 1))}
                              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600"
                            >
                              下移
                            </button>
                          ) : null}
                          <button
                            type="button"
                            onClick={() => updateList("homeHonorItems", selectedItemIds.filter((id) => id !== item.id))}
                            className="rounded-xl px-3 py-2 text-xs font-bold text-rose-500 hover:bg-rose-50"
                          >
                            删除
                          </button>
                        </div>
                      </div>
                      {item.body ? <p className="mt-3 text-sm leading-6 text-slate-600">{item.body}</p> : null}
                    </article>
                  );
                })}
              </div>
            ) : (
              <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                这个年份还没有选择具体荣誉。未选择任何具体荣誉时，首页 HONORS 会按年份列表回退展示。
              </p>
            )}
          </div>
        </section>
      </div>
    );
  };

  const renderHonorsEditor = () => {
    const updateYear = (yearIndex: number, updater: (year: OfficialCmsHonorYear) => OfficialCmsHonorYear) => {
      updateState((current) => ({
          ...current,
          content: {
            ...current.content,
          honors: current.content.honors.map((item, index) => (index === yearIndex ? normalizeHonorCount(updater(item)) : item)),
          },
        }));
    };

    return (
      <div className={officialSplitEditorClassName}>
        {renderStickySplitNodes([
        <div key="honor-actions" className="flex justify-end">
          <button
            type="button"
            onClick={() =>
              updateState((current) => ({
                ...current,
                content: { ...current.content, honors: [createEmptyHonorYear(), ...current.content.honors] },
              }))
            }
            className="rounded-2xl bg-[#2563eb] px-4 py-3 text-sm font-semibold text-white"
          >
            新增年份
          </button>
        </div>,
        ...state.content.honors.map((year, yearIndex) =>
          renderItemShell({
            id: `honor-${yearIndex}`,
            defaultOpen: yearIndex === 0,
            title: `${year.year || "未填写年份"} / ${honorCountText(year.awards.length, "zh")}`,
            summary: year.awards.map((award) => award.title.zh || award.title.en).filter(Boolean).join("，"),
            onMoveUp: yearIndex > 0
              ? () =>
                  updateState((current) => ({
                    ...current,
                    content: { ...current.content, honors: moveArrayItem(current.content.honors, yearIndex, yearIndex - 1) },
                  }))
              : undefined,
            onMoveDown: yearIndex < state.content.honors.length - 1
              ? () =>
                  updateState((current) => ({
                    ...current,
                    content: { ...current.content, honors: moveArrayItem(current.content.honors, yearIndex, yearIndex + 1) },
                  }))
              : undefined,
            onDelete: () =>
              updateState((current) => ({
                ...current,
                content: { ...current.content, honors: current.content.honors.filter((_, index) => index !== yearIndex) },
              })),
            children: (
              <div className="space-y-4">
                <div className="grid gap-4 xl:grid-cols-3">
                  <label className="block space-y-2">
                    <span className="text-sm font-medium text-slate-700">年份</span>
                    <input
                      value={year.year}
                      onChange={(event) => updateYear(yearIndex, (item) => ({ ...item, year: event.target.value }))}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#2563eb]"
                    />
                  </label>
                  <div className="space-y-2 rounded-[22px] border border-slate-200 bg-slate-50 p-4">
                    <span className="text-sm font-medium text-slate-700">数量文案</span>
                    <p className="text-sm font-semibold text-slate-950">{honorCountText(year.awards.length, "zh")}</p>
                    <p className="text-xs text-slate-500">{honorCountText(year.awards.length, "en")}</p>
                    <p className="text-xs leading-5 text-slate-400">根据当前年份下荣誉条目数量自动生成。</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => updateYear(yearIndex, (item) => ({ ...item, awards: [...item.awards, createEmptyHonorAward()] }))}
                    className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600"
                  >
                    新增荣誉
                  </button>
                </div>
                {year.awards.map((award, awardIndex) => (
                  <div key={`${yearIndex}-${awardIndex}`} className="space-y-4 rounded-[22px] border border-slate-200 bg-slate-50 p-4">
                    <div className="flex justify-between gap-3">
                      <p className="text-sm font-semibold text-slate-900">荣誉 {awardIndex + 1}</p>
                      <button
                        type="button"
                        onClick={() =>
                          updateYear(yearIndex, (item) => ({
                            ...item,
                            awards: item.awards.filter((_, index) => index !== awardIndex),
                          }))
                        }
                        className="text-xs font-bold text-rose-500"
                      >
                        删除荣誉
                      </button>
                    </div>
                    <div className="grid gap-4 xl:grid-cols-2">
                      <MultilingualField
                        label="标题"
                        en={award.title.en}
                        zh={award.title.zh}
                        onChange={(language, value) =>
                          updateYear(yearIndex, (item) => ({
                            ...item,
                            awards: item.awards.map((currentAward, index) =>
                              index === awardIndex
                                ? { ...currentAward, title: { ...currentAward.title, [language]: value } }
                                : currentAward,
                            ),
                          }))
                        }
                      />
                      <section className="space-y-3 rounded-[22px] border border-slate-200 bg-white p-4">
                        <label className="block space-y-2">
                          <span className="text-sm font-medium text-slate-700">日期</span>
                          <input
                            value={award.date}
                            onChange={(event) =>
                              updateYear(yearIndex, (item) => ({
                                ...item,
                                awards: item.awards.map((currentAward, index) =>
                                  index === awardIndex ? { ...currentAward, date: event.target.value } : currentAward,
                                ),
                              }))
                            }
                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#2563eb]"
                          />
                        </label>
                        <label className="block space-y-2">
                          <span className="text-sm font-medium text-slate-700">链接</span>
                          <input
                            value={award.href ?? ""}
                            onChange={(event) =>
                              updateYear(yearIndex, (item) => ({
                                ...item,
                                awards: item.awards.map((currentAward, index) =>
                                  index === awardIndex ? { ...currentAward, href: event.target.value } : currentAward,
                                ),
                              }))
                            }
                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#2563eb]"
                          />
                        </label>
                      </section>
                      <MultilingualField
                        label="正文"
                        en={award.body.en}
                        zh={award.body.zh}
                        textarea
                        onChange={(language, value) =>
                          updateYear(yearIndex, (item) => ({
                            ...item,
                            awards: item.awards.map((currentAward, index) =>
                              index === awardIndex
                                ? { ...currentAward, body: { ...currentAward.body, [language]: value } }
                                : currentAward,
                            ),
                          }))
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            ),
          }),
        ),
        ])}
      </div>
    );
  };

  const renderChronicleEditor = () => {
    const updateYear = (yearIndex: number, updater: (year: OfficialCmsChronicleYear) => OfficialCmsChronicleYear) => {
      updateState((current) => {
        const nextChronicle = state.content.chronicle.map((item, index) => (index === yearIndex ? updater(item) : item));
        return {
          ...current,
          content: {
            ...current.content,
            chronicle: nextChronicle,
          },
          lists: {
            ...current.lists,
            chronicleYears: nextChronicle.map((item) => item.year).filter(Boolean),
          },
        };
      });
    };

    return (
      <div className={officialSplitEditorClassName}>
        {renderStickySplitNodes([
        <div key="chronicle-actions" className="flex justify-end">
          <button
            type="button"
            onClick={() =>
              updateState((current) => {
                const newYear = createEmptyChronicleYearForExisting(state.content.chronicle.map((item) => item.year));
                const nextChronicle = [newYear, ...state.content.chronicle];
                return {
                  ...current,
                  content: { ...current.content, chronicle: nextChronicle },
                  lists: {
                    ...current.lists,
                    chronicleYears: nextChronicle.map((item) => item.year).filter(Boolean),
                  },
                };
              })
            }
            className="rounded-2xl bg-[#2563eb] px-4 py-3 text-sm font-semibold text-white"
          >
            新增年份
          </button>
        </div>,
        ...state.content.chronicle.map((year, yearIndex) =>
          renderItemShell({
            id: `chronicle-${yearIndex}`,
            defaultOpen: yearIndex === 0,
            title: `${year.year || "未填写年份"} / ${year.events.length} 条事件`,
            summary: year.events.map((event) => `${event.month.zh || event.month.en}：${event.text.zh || event.text.en}`).join("，"),
            onMoveUp: yearIndex > 0
              ? () =>
                  updateState((current) => {
                    const nextChronicle = moveArrayItem(state.content.chronicle, yearIndex, yearIndex - 1);
                    return {
                      ...current,
                      content: { ...current.content, chronicle: nextChronicle },
                      lists: { ...current.lists, chronicleYears: nextChronicle.map((item) => item.year).filter(Boolean) },
                    };
                  })
              : undefined,
            onMoveDown: yearIndex < state.content.chronicle.length - 1
              ? () =>
                  updateState((current) => {
                    const nextChronicle = moveArrayItem(state.content.chronicle, yearIndex, yearIndex + 1);
                    return {
                      ...current,
                      content: { ...current.content, chronicle: nextChronicle },
                      lists: { ...current.lists, chronicleYears: nextChronicle.map((item) => item.year).filter(Boolean) },
                    };
                  })
              : undefined,
            onDelete: () =>
              updateState((current) => {
                const nextChronicle = state.content.chronicle.filter((_, index) => index !== yearIndex);
                return {
                  ...current,
                  content: { ...current.content, chronicle: nextChronicle },
                  lists: {
                    ...current.lists,
                    chronicleYears: nextChronicle.map((item) => item.year).filter(Boolean),
                  },
                };
              }),
            children: (
              <div className="space-y-4">
                <label className="block max-w-xs space-y-2">
                  <span className="text-sm font-medium text-slate-700">年份</span>
                  <input
                    value={year.year}
                    onChange={(event) => {
                      const nextYear = event.target.value;
                      updateState((current) => {
                        const nextChronicle = state.content.chronicle.map((item, index) =>
                          index === yearIndex ? { ...item, year: nextYear } : item,
                        );
                        return {
                          ...current,
                          content: {
                            ...current.content,
                            chronicle: nextChronicle,
                          },
                          lists: {
                            ...current.lists,
                            chronicleYears: nextChronicle.map((item) => item.year).filter(Boolean),
                          },
                        };
                      });
                    }}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#2563eb]"
                  />
                </label>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => updateYear(yearIndex, (item) => ({ ...item, events: [...item.events, createEmptyChronicleEvent()] }))}
                    className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600"
                  >
                    新增事件
                  </button>
                </div>
                {year.events.map((chronicleEvent, eventIndex) => (
                  <div key={`${yearIndex}-${eventIndex}`} className="space-y-4 rounded-[22px] border border-slate-200 bg-slate-50 p-4">
                    <div className="flex justify-between gap-3">
                      <p className="text-sm font-semibold text-slate-900">事件 {eventIndex + 1}</p>
                      <button
                        type="button"
                        onClick={() =>
                          updateYear(yearIndex, (item) => ({
                            ...item,
                            events: item.events.filter((_, index) => index !== eventIndex),
                          }))
                        }
                        className="text-xs font-bold text-rose-500"
                      >
                        删除事件
                      </button>
                    </div>
                    <div className="grid gap-4 xl:grid-cols-2">
                      <MultilingualField
                        label="月份"
                        en={chronicleEvent.month.en}
                        zh={chronicleEvent.month.zh}
                        onChange={(language, value) =>
                          updateYear(yearIndex, (item) => ({
                            ...item,
                            events: item.events.map((currentEvent, index) =>
                              index === eventIndex
                                ? { ...currentEvent, month: { ...currentEvent.month, [language]: value } }
                                : currentEvent,
                            ),
                          }))
                        }
                      />
                      <section className="space-y-3 rounded-[22px] border border-slate-200 bg-white p-4">
                        <label className="block space-y-2">
                          <span className="text-sm font-medium text-slate-700">左右位置</span>
                          <select
                            value={chronicleEvent.side}
                            onChange={(event) =>
                              updateYear(yearIndex, (item) => ({
                                ...item,
                                events: item.events.map((currentEvent, index) =>
                                  index === eventIndex
                                    ? { ...currentEvent, side: event.target.value === "right" ? "right" : "left" }
                                    : currentEvent,
                                ),
                              }))
                            }
                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#2563eb]"
                          >
                            <option value="left">左侧</option>
                            <option value="right">右侧</option>
                          </select>
                        </label>
                      </section>
                      <MultilingualField
                        label="正文"
                        en={chronicleEvent.text.en}
                        zh={chronicleEvent.text.zh}
                        textarea
                        onChange={(language, value) =>
                          updateYear(yearIndex, (item) => ({
                            ...item,
                            events: item.events.map((currentEvent, index) =>
                              index === eventIndex
                                ? { ...currentEvent, text: { ...currentEvent.text, [language]: value } }
                                : currentEvent,
                            ),
                          }))
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            ),
          }),
        ),
        ])}
      </div>
    );
  };

  const renderTeamEditor = () => {
    const slugs = props.panel === "officialPartners" ? state.lists.partnerSlugs : state.lists.seniorAssociateSlugs;
    const listKey = props.panel === "officialPartners" ? "partnerSlugs" : "seniorAssociateSlugs";
    const group = props.panel === "officialPartners" ? "partner" : "seniorAssociate";
    const allSlugs = slugs;

    const updateProfile = (slug: string, updater: (profile: OfficialCmsTeamProfileContent) => OfficialCmsTeamProfileContent) => {
      updateState((current) => ({
        ...current,
        content: {
          ...current.content,
          teamProfiles: {
            ...current.content.teamProfiles,
            [slug]: updater(current.content.teamProfiles[slug] ?? createTeamProfileOverride(slug)),
          },
        },
      }));
    };

    const setProfileStringArray = (slug: string, key: keyof OfficialCmsTeamProfileContent, value: string) => {
      updateProfile(slug, (profile) => ({ ...profile, [key]: splitLines(value) }));
    };

    return (
      <div className={officialSplitEditorClassName}>
        {renderStickySplitNodes([
        <div key="team-actions" className="flex flex-wrap justify-end gap-3">
          <button
            type="button"
            onClick={() => {
              updateState((current) => {
                const slug = createUniqueTeamSlug(current.content.teamProfiles, group);
                return {
                  ...current,
                  content: {
                    ...current.content,
                    teamProfiles: {
                      ...current.content.teamProfiles,
                      [slug]: createEmptyTeamProfileOverride(slug, group),
                    },
                  },
                  lists: {
                    ...current.lists,
                    [listKey]: [...current.lists[listKey], slug],
                  },
                };
              });
            }}
            className="rounded-2xl bg-[#2563eb] px-4 py-3 text-sm font-semibold text-white"
          >
            新增成员
          </button>
        </div>,
        ...allSlugs.map((slug, index) => {
          const profile = state.content.teamProfiles[slug] ?? createTeamProfileOverride(slug);
          const sourceProfile = teamProfiles.find((item) => item.slug === slug);

          return renderItemShell({
            id: `team-${slug}`,
            defaultOpen: index === 0,
            title: `${profile.zhName || sourceProfile?.zhName || slug} / ${profile.name || sourceProfile?.name || ""}`,
            summary: profile.zhTitle || profile.title || sourceProfile?.zhTitle || sourceProfile?.title,
            thumbnail: profile.image || sourceProfile?.image,
            onMoveUp:
              index > 0 && slugs.includes(slug)
                ? () => updateList(listKey, moveArrayItem(slugs, slugs.indexOf(slug), slugs.indexOf(slug) - 1))
                : undefined,
            onMoveDown:
              index < slugs.length - 1 && slugs.includes(slug)
                ? () => updateList(listKey, moveArrayItem(slugs, slugs.indexOf(slug), slugs.indexOf(slug) + 1))
                : undefined,
            onDelete: slugs.includes(slug)
              ? () =>
                  updateState((current) => {
                    const { [slug]: _removedProfile, ...teamProfiles } = current.content.teamProfiles;

                    return {
                      ...current,
                      content: {
                        ...current.content,
                        teamProfiles,
                      },
                      lists: {
                        ...current.lists,
                        [listKey]: current.lists[listKey].filter((item) => item !== slug),
                      },
                    };
                  })
              : undefined,
            children: (
              <div className="grid gap-4 xl:grid-cols-2">
                {[
                  ["name", "英文姓名"],
                  ["zhName", "中文姓名"],
                  ["title", "英文职位"],
                  ["zhTitle", "中文职位"],
                  ["image", "卡片图片"],
                  ["phone", "电话"],
                  ["email", "邮箱"],
                ].map(([key, label]) => (
                  <label key={key} className="block space-y-2">
                    <span className="text-sm font-medium text-slate-700">{label}</span>
                    <input
                      value={String(profile[key as keyof OfficialCmsTeamProfileContent] ?? "")}
                      placeholder={String(sourceProfile?.[key as keyof typeof sourceProfile] ?? "")}
                      onChange={(event) =>
                        updateProfile(slug, (currentProfile) => ({ ...currentProfile, [key]: event.target.value }))
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#2563eb]"
                    />
                  </label>
                ))}
                {[
                  ["serviceIndustries", "英文服务行业"],
                  ["zhServiceIndustries", "中文服务行业"],
                  ["languages", "英文工作语言"],
                  ["zhLanguages", "中文工作语言"],
                  ["honors", "英文荣誉"],
                  ["zhHonors", "中文荣誉"],
                  ["achievements", "英文个人业绩"],
                  ["zhAchievements", "中文个人业绩"],
                ].map(([key, label]) => (
                  <label key={key} className="block space-y-2">
                    <span className="text-sm font-medium text-slate-700">{label}（每行一条）</span>
                    <textarea
                      value={((profile[key as keyof OfficialCmsTeamProfileContent] as string[] | undefined) ?? []).join("\n")}
                      rows={6}
                      onChange={(event) => setProfileStringArray(slug, key as keyof OfficialCmsTeamProfileContent, event.target.value)}
                      className="min-h-32 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#2563eb]"
                    />
                  </label>
                ))}
                {[
                  ["education", "英文教育背景"],
                  ["zhEducation", "中文教育背景"],
                  ["qualification", "英文专业资格"],
                  ["zhQualification", "中文专业资格"],
                  ["socialEngagements", "英文社会任职"],
                  ["zhSocialEngagements", "中文社会任职"],
                  ["practiceArea", "英文专业领域"],
                  ["zhPracticeArea", "中文专业领域"],
                  ["practiceExperience", "英文执业经验"],
                  ["zhPracticeExperience", "中文执业经验"],
                ].map(([key, label]) => (
                  <label key={key} className="block space-y-2">
                    <span className="text-sm font-medium text-slate-700">{label}</span>
                    <textarea
                      value={String(profile[key as keyof OfficialCmsTeamProfileContent] ?? "")}
                      rows={5}
                      onChange={(event) =>
                        updateProfile(slug, (currentProfile) => ({ ...currentProfile, [key]: event.target.value }))
                      }
                      className="min-h-32 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#2563eb]"
                    />
                  </label>
                ))}
              </div>
            ),
          });
        }),
        ])}
      </div>
    );
  };

  const renderEventOverridesEditor = () => {
    const slugs = state.lists.eventSlugs.length ? state.lists.eventSlugs : officialEventsData.map((event) => event.slug);
    const availableEvents = officialEventsData.filter((event) => !slugs.includes(event.slug));

    const updateOverride = (slug: string, updater: (override: OfficialCmsEventOverride) => OfficialCmsEventOverride) => {
      updateState((current) => ({
        ...current,
        events: {
          ...current.events,
          overrides: {
            ...current.events.overrides,
            [slug]: updater(current.events.overrides[slug] ?? createEventOverride()),
          },
        },
      }));
    };

    const updateLocalizedOverride = (
      slug: string,
      language: "en" | "zh",
      updater: (override: OfficialCmsLocalizedEventOverride) => OfficialCmsLocalizedEventOverride,
    ) => {
      updateOverride(slug, (override) => ({
        ...override,
        [language]: updater(override[language] ?? createLocalizedEventOverride()),
      }));
    };

    const sortEventSlugsByDate = (direction: "asc" | "desc") => {
      const sortedSlugs = [...slugs].sort((leftSlug, rightSlug) => {
        const leftEvent = officialEventsData.find((event) => event.slug === leftSlug);
        const rightEvent = officialEventsData.find((event) => event.slug === rightSlug);
        const leftSortDate = state.events.overrides[leftSlug]?.sortDate || leftEvent?.date || "";
        const rightSortDate = state.events.overrides[rightSlug]?.sortDate || rightEvent?.date || "";
        const result = parseEventSortDate(leftSortDate) - parseEventSortDate(rightSortDate);

        return direction === "asc" ? result : -result;
      });

      updateList("eventSlugs", sortedSlugs);
    };

    return (
      <div className="space-y-4 xl:col-span-2">
        <div className="flex flex-wrap justify-end gap-3">
          <select
            value={selectedOfficialEventSlug}
            onChange={(event) => setSelectedOfficialEventSlug(event.target.value)}
            className="min-w-[18rem] rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#2563eb]"
          >
            <option value="">选择要加入 Events 页的动态</option>
            {availableEvents.map((event) => (
              <option key={event.slug} value={event.slug}>
                {event.date} / {event.zh?.title ?? event.title}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => {
              const nextSlug =
                selectedOfficialEventSlug ||
                createUniqueEventSlug([...slugs, ...Object.keys(state.events.overrides)]);

              updateState((current) => {
                const currentSlugs = current.lists.eventSlugs.length
                  ? current.lists.eventSlugs
                  : officialEventsData.map((event) => event.slug);
                const nextOverrides = selectedOfficialEventSlug
                  ? current.events.overrides
                  : {
                      ...current.events.overrides,
                      [nextSlug]: current.events.overrides[nextSlug] ?? createBlankEventOverride(),
                    };

                return {
                  ...current,
                  lists: {
                    ...current.lists,
                    eventSlugs: [nextSlug, ...currentSlugs.filter((slug) => slug !== nextSlug)],
                  },
                  events: {
                    ...current.events,
                    overrides: nextOverrides,
                  },
                };
              });
              setSelectedOfficialEventSlug("");
              setExpandedOfficialItemIds({ [`event-${nextSlug}`]: true });
            }}
            className="rounded-2xl bg-[#2563eb] px-4 py-3 text-sm font-semibold text-white"
          >
            新增动态
          </button>
          <button
            type="button"
            onClick={() => sortEventSlugsByDate("desc")}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#2563eb] hover:text-[#2563eb]"
          >
            时间排序：最新
          </button>
          <button
            type="button"
            onClick={() => sortEventSlugsByDate("asc")}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#2563eb] hover:text-[#2563eb]"
          >
            时间排序：最早
          </button>
        </div>
        {slugs.map((slug, index) => {
          const sourceEvent = officialEventsData.find((event) => event.slug === slug);
          const override = state.events.overrides[slug] ?? createEventOverride();

          return renderItemShell({
            id: `event-${slug}`,
            title: override.zh?.title || override.en?.title || sourceEvent?.zh?.title || sourceEvent?.title || slug,
            summary: slug,
            thumbnail: override.image || sourceEvent?.image,
            layout: "inline",
            onPinTop: index > 0 ? () => updateList("eventSlugs", moveArrayItem(slugs, index, 0)) : undefined,
            onMoveUp:
              index > 0 ? () => updateList("eventSlugs", moveArrayItem(slugs, index, index - 1)) : undefined,
            onMoveDown:
              index < slugs.length - 1 ? () => updateList("eventSlugs", moveArrayItem(slugs, index, index + 1)) : undefined,
            onDelete: () => updateList("eventSlugs", slugs.filter((item) => item !== slug)),
            children: (
              <div className="grid gap-4 xl:grid-cols-2">
                <label className="block space-y-2 xl:col-span-2">
                  <span className="text-sm font-medium text-slate-700">封面图片</span>
                  <input
                    value={override.image ?? ""}
                    placeholder={sourceEvent?.image}
                    onChange={(event) => updateOverride(slug, (currentOverride) => ({ ...currentOverride, image: event.target.value }))}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#2563eb]"
                  />
                </label>
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-slate-700">排序日期（YYYYMMDD）</span>
                  <input
                    value={override.sortDate ?? sourceEvent?.date ?? ""}
                    placeholder={sourceEvent?.date}
                    onChange={(event) =>
                      updateOverride(slug, (currentOverride) => ({ ...currentOverride, sortDate: event.target.value }))
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#2563eb]"
                  />
                </label>
                {(["en", "zh"] as const).map((language) => {
                  const localized = override[language] ?? createLocalizedEventOverride();

                  return (
                    <section key={language} className="space-y-4 rounded-[22px] border border-slate-200 bg-slate-50 p-4">
                      <h4 className="text-sm font-semibold text-slate-900">{language === "en" ? "English" : "中文"}</h4>
                      {(["category", "title", "summary"] as const).map((field) => (
                        <label key={field} className="block space-y-2">
                          <span className="text-sm font-medium text-slate-700">{field}</span>
                          <input
                            value={String(localized[field] ?? "")}
                            onChange={(event) =>
                              updateLocalizedOverride(slug, language, (currentLocalized) => ({
                                ...currentLocalized,
                                [field]: event.target.value,
                              }))
                            }
                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#2563eb]"
                          />
                        </label>
                      ))}
                      <label className="block space-y-2">
                        <span className="text-sm font-medium text-slate-700">正文（每行一段，图片占位用 [IMAGE] / [图片]）</span>
                        <textarea
                          value={(localized.content ?? []).join("\n")}
                          rows={12}
                          onChange={(event) =>
                            updateLocalizedOverride(slug, language, (currentLocalized) => ({
                              ...currentLocalized,
                              content: event.target.value.split(/\r?\n/),
                            }))
                          }
                          className="min-h-64 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#2563eb]"
                        />
                      </label>
                    </section>
                  );
                })}
              </div>
            ),
          });
        })}
      </div>
    );
  };

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-950">{panelTitles[props.panel]}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">
              {panelDescriptions[props.panel]}{" "}
              {props.editingVersionId
                ? "当前保存到所选版本，只有在版本发布里点击“发布”后才会同步到前台。"
                : "当前未选择版本，请先在“版本发布”中创建或选择版本。"}
            </p>
          </div>
          <button
            type="button"
            onClick={saveCurrentPanel}
            disabled={!props.editingVersionId}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-45"
          >
            <Save className="h-4 w-4" />
            {props.editingVersionId ? `保存${panelTitles[props.panel]}到版本` : "先选择版本"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {props.panel === "officialIndustries" ? renderIndustriesEditor() : null}
        {props.panel === "homeEventCarousel" ? renderHomeEventCarouselEditor() : null}
        {props.panel === "homeHonorsCarousel" ? renderHomeHonorStickyYearEditor() : null}
        {props.panel === "officialHonors" ? renderHonorsEditor() : null}
        {props.panel === "officialChronicle" ? renderChronicleEditor() : null}
        {props.panel === "officialPartners" || props.panel === "officialSeniorAssociates" ? renderTeamEditor() : null}
        {props.panel === "officialEvents" ? renderEventOverridesEditor() : null}
      </div>
    </section>
  );
}

function OverviewPanel(props: {
  dashboard?: CmsDashboardMetrics;
  articles: CmsArticle[];
  assets: CmsAsset[];
  versions: CmsVersionSnapshot[];
  setPanel: Dispatch<SetStateAction<StudioPanel>>;
  setDashboard: Dispatch<SetStateAction<CmsDashboardMetrics | undefined>>;
  setMessage: (message: string) => void;
}) {
  const totalPublished =
    (props.dashboard?.publishedArticles ?? 0) + (props.dashboard?.publishedUpdates ?? 0);
  const metrics = [
    {
      title: "今日访问量",
      value: props.dashboard?.todayVisits ?? 0,
      subtitle: "按自然日统计官网访问",
      icon: Eye,
      accent: "text-[#2563eb] bg-[#eef4ff]",
    },
    {
      title: "昨日访问量",
      value: props.dashboard?.yesterdayVisits ?? 0,
      subtitle: "用于对比每日流量变化",
      icon: RefreshCcw,
      accent: "text-[#0f766e] bg-[#ecfdf5]",
    },
    {
      title: "已发布文章",
      value: props.dashboard?.publishedArticles ?? 0,
      subtitle: `文章库共 ${props.articles.length} 条`,
      icon: Newspaper,
      accent: "text-[#f59e0b] bg-[#fffbeb]",
    },
    {
      title: "已发布动态",
      value: props.dashboard?.publishedUpdates ?? 0,
      subtitle: `文章+动态共 ${totalPublished} 条`,
      icon: Radio,
      accent: "text-[#9333ea] bg-[#faf5ff]",
    },
    {
      title: "服务器空间占用",
      value: formatBytes(props.dashboard?.totalStorageBytes ?? 0),
      subtitle: `附件 ${props.dashboard?.assetsCount ?? props.assets.length} 个`,
      icon: HardDrive,
      accent: "text-[#475569] bg-slate-100",
    },
  ];

  const refreshDashboard = async () => {
    const response = await fetch("/api/cms/dashboard");

    if (!response.ok) {
      props.setMessage("刷新数据概览失败。");
      return;
    }

    const payload = (await response.json()) as { dashboard: CmsDashboardMetrics };
    props.setDashboard(payload.dashboard);
    props.setMessage("数据概览已刷新。");
  };

  const clearCache = async () => {
    const response = await fetch("/api/cms/system/cache", { method: "POST" });

    if (!response.ok) {
      props.setMessage("清理缓存失败。");
      return;
    }

    const payload = (await response.json()) as {
      clearedBytes: number;
      dashboard: CmsDashboardMetrics;
    };

    props.setDashboard(payload.dashboard);
    props.setMessage(`缓存已清理，释放 ${formatBytes(payload.clearedBytes)}。`);
  };

  return (
    <section className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">网站运行概览</h2>
          <p className="mt-2 text-sm text-slate-500">
            展示访问量、已发布内容、附件数量和服务器空间占用。最后统计时间：
            {formatDateTime(props.dashboard?.trackedAt ?? "")}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={refreshDashboard}
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#2563eb] hover:text-[#2563eb]"
          >
            <RefreshCcw className="h-4 w-4" />
            刷新数据
          </button>
          <button
            type="button"
            onClick={clearCache}
            className="inline-flex items-center gap-2 rounded-2xl bg-[#2563eb] px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(37,99,235,0.22)] transition hover:bg-[#1d4ed8]"
          >
            <Trash2 className="h-4 w-4" />
            清理无用缓存
          </button>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-5">
        {metrics.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[15px] text-slate-500">{item.title}</p>
                  <p className="mt-8 text-4xl font-semibold tracking-tight text-slate-950">{item.value}</p>
                  <p className="mt-3 text-xs text-slate-400">{item.subtitle}</p>
                </div>
                <div className={`rounded-2xl p-3 ${item.accent}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <section className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-[30px] font-semibold tracking-tight text-slate-950">服务器空间占用</h2>
              <p className="mt-2 text-sm text-slate-500">
                总占用 {formatBytes(props.dashboard?.totalStorageBytes ?? 0)}，其中缓存{" "}
                {formatBytes(props.dashboard?.cacheBytes ?? 0)}。
              </p>
            </div>
            <button
              type="button"
              onClick={() => props.setPanel("assets")}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#2563eb] hover:text-[#2563eb]"
            >
              查看文件管理
            </button>
          </div>
          <div className="mt-8 space-y-4">
            {(props.dashboard?.storage ?? []).map((item) => {
              const percent =
                props.dashboard?.totalStorageBytes && props.dashboard.totalStorageBytes > 0
                  ? Math.max(3, Math.round((item.bytes / props.dashboard.totalStorageBytes) * 100))
                  : 0;

              return (
                <div key={item.key} className="space-y-2">
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="font-semibold text-slate-700">{item.label}</span>
                    <span className="text-slate-500">{formatBytes(item.bytes)}</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-[#2563eb]" style={{ width: `${percent}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-[30px] font-semibold tracking-tight text-slate-950">内容管理快速入口</h2>
          <div className="mt-8 space-y-3">
            {quickActions.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => props.setPanel(item.panel)}
                  className="flex w-full items-center gap-4 rounded-[20px] border border-slate-200 bg-white px-5 py-5 text-left transition hover:border-[#2563eb] hover:shadow-sm"
                >
                  <div className={`rounded-2xl p-3 ${item.accent}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-slate-950">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-500">{item.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </section>
  );
}

function PageContentPanel(props: {
  activePageSection: keyof SiteContent["zh"];
  setActivePageSection: Dispatch<SetStateAction<keyof SiteContent["zh"]>>;
  pageSections: Array<keyof SiteContent["zh"]>;
  siteContent: SiteContent;
  updateSiteContent: (path: PathSegment[], value: EditorValue) => void;
  addSiteContentItem: (path: PathSegment[]) => void;
  removeSiteContentItem: (path: PathSegment[], index: number) => void;
}) {
  return (
    <section className="space-y-5">
      <div className="grid gap-5 xl:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm">
          <div className="space-y-1">
            {props.pageSections.map((section) => (
              <button
                key={String(section)}
                type="button"
                onClick={() => props.setActivePageSection(section)}
                className={`flex w-full rounded-2xl px-4 py-3 text-left text-sm transition ${
                  props.activePageSection === section
                    ? "bg-[#eaf1ff] font-semibold text-[#2563eb]"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {getPageSectionLabel(String(section))}
              </button>
            ))}
          </div>
        </aside>
        <div className="grid gap-5 2xl:grid-cols-2">
          {(Object.keys(localeLabels) as Language[]).map((language) => (
            <div key={language} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="text-base font-semibold text-slate-950">{localeLabels[language]}</h3>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                  {language.toUpperCase()}
                </span>
              </div>
              <ContentField
                label={getPageSectionLabel(String(props.activePageSection))}
                value={(props.siteContent[language][props.activePageSection] ?? "") as EditorValue}
                path={[language, props.activePageSection]}
                onChange={props.updateSiteContent}
                onAddItem={props.addSiteContentItem}
                onRemoveItem={props.removeSiteContentItem}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CmsVersionSelect(props: {
  versions: CmsVersionSnapshot[];
  editingVersionId: number | null;
  loadVersionForEditing: (versionId: number | null) => Promise<void>;
}) {
  const publishedVersion = props.versions.find((version) => version.isPublished);
  const selectedVersionId = props.editingVersionId
    ? String(props.editingVersionId)
    : String(publishedVersion?.id ?? props.versions[0]?.id ?? "");

  return (
    <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-600">
      <span>版本</span>
      <select
        value={selectedVersionId}
        onChange={(event) => {
          if (!event.target.value) return;
          void props.loadVersionForEditing(Number(event.target.value));
        }}
        disabled={props.versions.length === 0}
        className="min-w-[180px] rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10"
      >
        {props.versions.length === 0 ? <option value="">暂无版本</option> : null}
        {props.versions.map((version) => (
          <option key={version.id} value={version.id}>
            {version.name}{version.isPublished ? "（已发布）" : ""}
          </option>
        ))}
      </select>
    </label>
  );
}

function SiteContentPanel(props: {
  title: string;
  description: string;
  label: string;
  value: EditorValue;
  path: PathSegment[];
  siteContent: SiteContent;
  updateSiteContent: (path: PathSegment[], value: EditorValue) => void;
  addSiteContentItem: (path: PathSegment[]) => void;
  removeSiteContentItem: (path: PathSegment[], index: number) => void;
  persistWorkspace: (nextState?: { siteContent?: SiteContent }) => Promise<boolean>;
  versions: CmsVersionSnapshot[];
  editingVersionId: number | null;
  loadVersionForEditing: (versionId: number | null) => Promise<void>;
  submitVersionDraft: (versionId: number, nextState?: { siteContent?: SiteContent }) => Promise<boolean>;
  setMessage: (message: string) => void;
}) {
  const editableValue = isObject(props.value)
    ? (Object.fromEntries(Object.entries(props.value).filter(([key]) => key !== "homeCarousel")) as EditorValue)
    : props.value;

  const saveSiteContent = async () => {
    const ok = props.editingVersionId
      ? await props.submitVersionDraft(props.editingVersionId, { siteContent: props.siteContent })
      : await props.persistWorkspace({ siteContent: props.siteContent });
    props.setMessage(ok ? "站点信息已保存。" : "站点信息保存失败。");
  };

  return (
    <section className="cms-assets-panel space-y-5">
      <style>{`
        .cms-assets-panel .text-xs { font-size: 0.975rem; }
        .cms-assets-panel .text-sm { font-size: 1.1375rem; }
        .cms-assets-panel .text-base { font-size: 1.3rem; }
        .cms-assets-panel .text-2xl { font-size: 1.95rem; }
        .cms-assets-panel .text-\\[11px\\] { font-size: 0.89375rem; }
      `}</style>
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold text-slate-950">{props.title}</h2>
            <p className="mt-1 text-sm text-slate-500">
              站点名称、标题栏 Logo、标题栏/页脚社交 icon、导航链接和页脚联系方式都在这里维护。
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={saveSiteContent}
              className="inline-flex items-center gap-2 rounded-2xl bg-[#2563eb] px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(37,99,235,0.2)] transition hover:bg-[#1d4ed8]"
            >
              <Save className="h-4 w-4" />
              保存站点信息
            </button>
          </div>
        </div>
        <ContentField
          label={props.label}
          value={editableValue}
          path={props.path}
          onChange={props.updateSiteContent}
          onAddItem={props.addSiteContentItem}
          onRemoveItem={props.removeSiteContentItem}
        />
      </div>
    </section>
  );
}

function RepeatableContentManagerPanel(props: {
  title: string;
  description: string;
  groups: RepeatableManagerGroup[];
  activeLanguage: Language;
  setActiveLanguage: Dispatch<SetStateAction<Language>>;
  pageContent: PageContentState;
  setPageContent: Dispatch<SetStateAction<PageContentState>>;
  persistWorkspace: (nextState?: { pageContent?: PageContentState }) => Promise<boolean>;
  versions: CmsVersionSnapshot[];
  editingVersionId: number | null;
  loadVersionForEditing: (versionId: number | null) => Promise<void>;
  submitVersionDraft: (versionId: number, nextState?: { pageContent?: PageContentState }) => Promise<boolean>;
  setMessage: (message: string) => void;
}) {
  const [selectedGroupId, setSelectedGroupId] = useState(props.groups[0]?.id ?? "");
  const [expandedItemIds, setExpandedItemIds] = useState<Record<string, boolean>>({});
  const selectedGroup = props.groups.find((group) => group.id === selectedGroupId) ?? props.groups[0];
  const primaryLanguage: Language = "zh";
  const editorLanguages: Language[] = ["en", "zh"];
  const activePage = selectedGroup ? props.pageContent[primaryLanguage]?.[selectedGroup.pageId] : undefined;
  const activeSection = activePage?.sections.find((sectionItem) => sectionItem.id === selectedGroup.sectionId);
  const activeItemsByLanguage = Object.fromEntries(
    editorLanguages.map((language) => {
      const section = selectedGroup
        ? props.pageContent[language]?.[selectedGroup.pageId]?.sections.find(
            (sectionItem) => sectionItem.id === selectedGroup.sectionId,
          )
        : undefined;

      return [language, section?.items ?? []];
    }),
  ) as Record<Language, PageContentRepeaterItem[]>;
  const activeItems = activeItemsByLanguage[primaryLanguage] ?? [];
  const visibleItemCount = Math.max(...editorLanguages.map((language) => activeItemsByLanguage[language]?.length ?? 0), 0);
  const hasDateField = editorLanguages.some((language) =>
    (activeItemsByLanguage[language] ?? []).some((item) => item.fields.some((fieldItem) => fieldItem.id === "date")),
  );

  const updateSectionItems = (
    language: Language,
    group: RepeatableManagerGroup,
    updater: (items: PageContentRepeaterItem[], section: PageContentSection) => PageContentRepeaterItem[],
  ) => {
    props.setPageContent((current) => {
      const page = current[language][group.pageId];

      return {
        ...current,
        updatedAt: new Date().toISOString(),
        [language]: {
          ...current[language],
          [group.pageId]: {
            ...page,
            sections: page.sections.map((sectionItem) =>
              sectionItem.id === group.sectionId
                ? { ...sectionItem, items: updater(sectionItem.items ?? [], sectionItem) }
                : sectionItem,
            ),
          },
        },
      };
    });
  };

  const updateFieldValue = (
    language: Language,
    itemIndex: number,
    fieldId: string,
    value: string,
    fallback: PageContentField | null = null,
  ) => {
    if (!selectedGroup) return;
    updateSectionItems(language, selectedGroup, (items) =>
      items.map((item, currentItemIndex) =>
        currentItemIndex === itemIndex
          ? {
              ...item,
              fields: upsertPageContentField(item.fields, fieldId, value, fallback),
            }
          : item,
      ),
    );
  };

  const addPastEventPlatform = (itemIndex: number) => {
    if (!selectedGroup) return;
    const numbers = getPastEventPlatformNumbersForItems(activeItemsByLanguage, itemIndex);
    const platformNumber = (numbers[numbers.length - 1] ?? 0) + 1;

    editorLanguages.forEach((language) => {
      updateSectionItems(language, selectedGroup, (items) =>
        items.map((item, currentItemIndex) =>
          currentItemIndex === itemIndex
            ? { ...item, fields: [...item.fields, ...createPastEventPlatformFields(platformNumber, language)] }
            : item,
        ),
      );
    });
  };

  const removePastEventPlatform = (itemIndex: number, platformNumber: number) => {
    if (!selectedGroup) return;
    editorLanguages.forEach((language) => {
      updateSectionItems(language, selectedGroup, (items) =>
        items.map((item, currentItemIndex) =>
          currentItemIndex === itemIndex
            ? { ...item, fields: item.fields.filter((fieldItem) => getPastEventPlatformNumber(fieldItem.id) !== platformNumber) }
            : item,
        ),
      );
    });
  };

  const addPastEventProgram = (itemIndex: number, platformNumber: number) => {
    if (!selectedGroup) return;
    const numbers = getPastEventProgramNumbersForItems(activeItemsByLanguage, itemIndex, platformNumber);
    const programNumber = (numbers[numbers.length - 1] ?? 0) + 1;

    editorLanguages.forEach((language) => {
      updateSectionItems(language, selectedGroup, (items) =>
        items.map((item, currentItemIndex) =>
          currentItemIndex === itemIndex
            ? { ...item, fields: [...item.fields, ...createPastEventProgramFields(platformNumber, programNumber, language)] }
            : item,
        ),
      );
    });
  };

  const removePastEventProgram = (itemIndex: number, platformNumber: number, programNumber: number) => {
    if (!selectedGroup) return;
    editorLanguages.forEach((language) => {
      updateSectionItems(language, selectedGroup, (items) =>
        items.map((item, currentItemIndex) =>
          currentItemIndex === itemIndex
            ? {
                ...item,
                fields: item.fields.filter(
                  (fieldItem) => getPastEventProgramNumber(fieldItem.id, platformNumber) !== programNumber,
                ),
              }
            : item,
        ),
      );
    });
  };

  const addItem = () => {
    if (!selectedGroup || !activeSection) return;
    const nextId = `${activeSection.id}-${Date.now()}`;

    editorLanguages.forEach((language) => {
      updateSectionItems(language, selectedGroup, (items, section) => {
      const template = items[items.length - 1] ?? section.items?.[0];
      const nextIndex = items.length + 1;

      if (!template) {
        return [
          {
            id: nextId,
            label: `${section.label} ${nextIndex}`,
            fields: [createPageContentField("title", "标题", "text")],
          },
        ];
      }

      return [
        ...items,
        {
          ...template,
          id: nextId,
          label: `${section.label} ${nextIndex}`,
          fields: template.fields.map((fieldItem) => ({ ...fieldItem, value: "" })),
        },
      ];
      });
    });
  };

  const deleteItem = (itemIndex: number) => {
    if (!selectedGroup) return;
    editorLanguages.forEach((language) => {
      updateSectionItems(language, selectedGroup, (items) =>
        items.filter((_, currentItemIndex) => currentItemIndex !== itemIndex),
      );
    });
  };

  const moveItem = (itemIndex: number, direction: -1 | 1) => {
    if (!selectedGroup) return;
    const targetIndex = itemIndex + direction;

    editorLanguages.forEach((language) => {
      updateSectionItems(language, selectedGroup, (items) => moveRepeaterItem(items, itemIndex, targetIndex));
    });
  };

  const sortByDate = (direction: "asc" | "desc") => {
    if (!selectedGroup) return;
    editorLanguages.forEach((language) => {
      updateSectionItems(language, selectedGroup, (items) =>
        [...items].sort((itemA, itemB) => {
          const valueA = getPageContentRepeaterField(itemA, "date");
          const valueB = getPageContentRepeaterField(itemB, "date");
          return direction === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        }),
      );
    });
  };

  const savePageContent = async () => {
    const ok = props.editingVersionId
      ? await props.submitVersionDraft(props.editingVersionId, { pageContent: props.pageContent })
      : await props.persistWorkspace({ pageContent: props.pageContent });
    props.setMessage(ok ? "内容已保存。" : "内容保存失败。");
  };

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-4 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">{props.title}</h2>
          <p className="mt-2 text-sm text-slate-500">{props.description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-600">
            中文 / English
          </span>
          <button
            type="button"
            onClick={savePageContent}
            className="inline-flex items-center gap-2 rounded-2xl bg-[#2563eb] px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(37,99,235,0.2)] transition hover:bg-[#1d4ed8]"
          >
            <Save className="h-4 w-4" />
            保存内容
          </button>
        </div>
      </div>

      <div className="grid min-h-0 gap-5 xl:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm xl:sticky xl:top-0 xl:max-h-[calc(125vh-14rem)] xl:overflow-y-auto">
          <p className="px-4 pb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">内容分组</p>
          <div className="space-y-2">
            {props.groups.map((group) => {
              const zhSection = props.pageContent.zh?.[group.pageId]?.sections.find(
                (sectionItem) => sectionItem.id === group.sectionId,
              );
              const enSection = props.pageContent.en?.[group.pageId]?.sections.find(
                (sectionItem) => sectionItem.id === group.sectionId,
              );

              return (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => setSelectedGroupId(group.id)}
                  className={`w-full rounded-2xl px-4 py-4 text-left transition ${
                    selectedGroup?.id === group.id
                      ? "border border-[#2563eb] bg-[#eef4ff] text-[#1d4ed8]"
                      : "border border-transparent text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span className="block text-sm font-semibold">{group.title}</span>
                  <span className="mt-1 block text-xs text-slate-400">
                    中文 {zhSection?.items?.length ?? 0} / EN {enSection?.items?.length ?? 0}
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        <div className="space-y-5">
          {selectedGroup && activeSection ? (
            <>
              <div className="flex flex-wrap items-start justify-between gap-4 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                <div>
                  <h3 className="text-xl font-semibold text-slate-950">{selectedGroup.title}</h3>
                  <p className="mt-2 text-sm text-slate-500">{selectedGroup.description}</p>
                  <p className="mt-2 text-xs text-slate-400">
                    页面：{selectedGroup.pageId} / 模块：{activeSection.label}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {hasDateField ? (
                    <>
                      <button
                        type="button"
                        onClick={() => sortByDate("asc")}
                        className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#2563eb] hover:text-[#2563eb]"
                      >
                        时间升序
                      </button>
                      <button
                        type="button"
                        onClick={() => sortByDate("desc")}
                        className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#2563eb] hover:text-[#2563eb]"
                      >
                        时间降序
                      </button>
                    </>
                  ) : null}
                  <button
                    type="button"
                    onClick={addItem}
                    className="rounded-2xl bg-[#2563eb] px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(37,99,235,0.2)] transition hover:bg-[#1d4ed8]"
                  >
                    新增内容
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {visibleItemCount === 0 ? (
                  <div className="rounded-[28px] border border-dashed border-slate-300 bg-white p-8 text-sm text-slate-500">
                    当前分组暂无内容，点击“新增内容”创建第一条。
                  </div>
                ) : null}
                {Array.from({ length: visibleItemCount }).map((_, itemIndex) => {
                  const primaryItem = activeItemsByLanguage[primaryLanguage]?.[itemIndex];
                  const itemKey = `${selectedGroup.id}-${primaryItem?.id ?? itemIndex}`;
                  const isExpanded = expandedItemIds[itemKey] ?? false;
                  const thumbnail = getRepeaterThumbnail(activeItemsByLanguage, itemIndex);
                  const title = getRepeaterDisplayTitle(activeItemsByLanguage, itemIndex, `内容 ${itemIndex + 1}`);
                  const summary = getRepeaterDisplaySummary(activeItemsByLanguage, itemIndex, primaryItem?.id ?? "");

                  return (
                  <article key={primaryItem?.id ?? `item-${itemIndex}`} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-wrap items-center gap-4">
                      {thumbnail ? (
                        <img
                          src={thumbnail}
                          alt=""
                          className="h-20 w-28 shrink-0 rounded-2xl border border-slate-200 bg-slate-100 object-cover"
                        />
                      ) : null}
                      <button
                        type="button"
                        onClick={() => setExpandedItemIds((current) => ({ ...current, [itemKey]: !isExpanded }))}
                        className="min-w-[220px] flex-1 text-left"
                      >
                        <p className="text-sm font-semibold text-slate-950">{title}</p>
                        <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">{summary}</p>
                      </button>
                      <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => moveItem(itemIndex, -1)}
                        disabled={itemIndex === 0}
                        className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-[#2563eb] hover:text-[#2563eb] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <ArrowUp className="h-3.5 w-3.5" />
                        上移
                      </button>
                      <button
                        type="button"
                        onClick={() => moveItem(itemIndex, 1)}
                        disabled={itemIndex >= visibleItemCount - 1}
                        className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-[#2563eb] hover:text-[#2563eb] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <ArrowDown className="h-3.5 w-3.5" />
                        下移
                      </button>
                      <button
                        type="button"
                        onClick={() => setExpandedItemIds((current) => ({ ...current, [itemKey]: !isExpanded }))}
                        className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-[#2563eb] hover:text-[#2563eb]"
                      >
                        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                        {isExpanded ? "折叠" : "展开"}
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteItem(itemIndex)}
                        className="inline-flex items-center gap-1 rounded-xl px-3 py-2 text-xs font-bold text-rose-500 transition hover:bg-rose-50"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        删除
                      </button>
                      </div>
                    </div>
                    <div className={isExpanded ? "mt-5 grid gap-4 xl:grid-cols-2" : "hidden"}>
                      {getPairedRepeaterFields(activeItemsByLanguage, itemIndex)
                        .filter(({ fieldId }) => selectedGroup.sectionId !== "pastEvents" || !isPastEventPlatformFieldId(fieldId))
                        .map(({ fieldId, label, kind }) => (
                        <section key={fieldId} className="space-y-3 rounded-[22px] border border-slate-200 bg-slate-50 p-4">
                          <h4 className="text-sm font-semibold text-slate-900">{label}</h4>
                          {editorLanguages.map((language) => {
                            const field = activeItemsByLanguage[language]?.[itemIndex]?.fields.find(
                              (fieldItem) => fieldItem.id === fieldId,
                            );

                            return (
                              <PageContentFieldInput
                                key={language}
                                field={{
                                  id: fieldId,
                                  label: language === "en" ? "English" : "中文",
                                  kind: field?.kind ?? kind,
                                  value: field?.value ?? "",
                                }}
                                onChange={(value) =>
                                  updateFieldValue(language, itemIndex, fieldId, value, {
                                    id: fieldId,
                                    label,
                                    kind,
                                    value: "",
                                  })
                                }
                              />
                            );
                          })}
                        </section>
                      ))}
                      {selectedGroup.sectionId === "pastEvents" ? (
                        <section className="space-y-4 rounded-[22px] border border-slate-200 bg-slate-50 p-4 xl:col-span-2">
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                              <h4 className="text-sm font-semibold text-slate-900">平台与节目</h4>
                              <p className="mt-1 text-xs text-slate-500">每个活动可增删平台，每个平台下可增删节目链接。</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => addPastEventPlatform(itemIndex)}
                              className="rounded-2xl bg-[#2563eb] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#1d4ed8]"
                            >
                              新增平台
                            </button>
                          </div>

                          {getPastEventPlatformNumbersForItems(activeItemsByLanguage, itemIndex).map((platformNumber) => (
                            <div key={platformNumber} className="space-y-4 rounded-[22px] border border-slate-200 bg-white p-4">
                              <div className="flex flex-wrap items-center justify-between gap-3">
                                <p className="text-sm font-semibold text-slate-900">平台 {platformNumber}</p>
                                <button
                                  type="button"
                                  onClick={() => removePastEventPlatform(itemIndex, platformNumber)}
                                  className="rounded-xl px-3 py-2 text-xs font-bold text-rose-500 transition hover:bg-rose-50"
                                >
                                  删除平台
                                </button>
                              </div>
                              <div className="grid gap-4 xl:grid-cols-3">
                                {["Name", "Logo", "Layout"].map((suffix) => {
                                  const fieldId = `platform${platformNumber}${suffix}`;

                                  return (
                                    <section key={fieldId} className="space-y-3 rounded-[18px] border border-slate-200 bg-slate-50 p-3">
                                      <h5 className="text-xs font-bold text-slate-600">
                                        {suffix === "Name" ? "平台名称" : suffix === "Logo" ? "平台 Logo" : "布局 stack/row"}
                                      </h5>
                                      {editorLanguages.map((language) => {
                                        const fallback = getPastEventFieldFallback(fieldId, language);
                                        const field = activeItemsByLanguage[language]?.[itemIndex]?.fields.find(
                                          (fieldItem) => fieldItem.id === fieldId,
                                        );

                                        return (
                                          <PageContentFieldInput
                                            key={language}
                                            field={{
                                              id: fieldId,
                                              label: language === "en" ? "English" : "中文",
                                              kind: field?.kind ?? fallback?.kind ?? "text",
                                              value: field?.value ?? "",
                                            }}
                                            onChange={(value) => updateFieldValue(language, itemIndex, fieldId, value, fallback)}
                                          />
                                        );
                                      })}
                                    </section>
                                  );
                                })}
                              </div>
                              <div className="space-y-3">
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                  <p className="text-sm font-semibold text-slate-900">节目</p>
                                  <button
                                    type="button"
                                    onClick={() => addPastEventProgram(itemIndex, platformNumber)}
                                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-[#2563eb] hover:text-[#2563eb]"
                                  >
                                    新增节目
                                  </button>
                                </div>
                                {getPastEventProgramNumbersForItems(activeItemsByLanguage, itemIndex, platformNumber).map(
                                  (programNumber) => (
                                    <div key={programNumber} className="space-y-3 rounded-[18px] border border-slate-200 bg-slate-50 p-3">
                                      <div className="flex flex-wrap items-center justify-between gap-3">
                                        <p className="text-xs font-bold text-slate-600">节目 {programNumber}</p>
                                        <button
                                          type="button"
                                          onClick={() => removePastEventProgram(itemIndex, platformNumber, programNumber)}
                                          className="rounded-xl px-3 py-2 text-xs font-bold text-rose-500 transition hover:bg-rose-50"
                                        >
                                          删除节目
                                        </button>
                                      </div>
                                      <div className="grid gap-4 xl:grid-cols-2">
                                        {["Label", "Href"].map((suffix) => {
                                          const fieldId = `platform${platformNumber}Link${programNumber}${suffix}`;

                                          return (
                                            <section key={fieldId} className="space-y-3 rounded-[18px] border border-slate-200 bg-white p-3">
                                              <h5 className="text-xs font-bold text-slate-600">
                                                {suffix === "Label" ? "节目标题" : "节目链接"}
                                              </h5>
                                              {editorLanguages.map((language) => {
                                                const fallback = getPastEventFieldFallback(fieldId, language);
                                                const field = activeItemsByLanguage[language]?.[itemIndex]?.fields.find(
                                                  (fieldItem) => fieldItem.id === fieldId,
                                                );

                                                return (
                                                  <PageContentFieldInput
                                                    key={language}
                                                    field={{
                                                      id: fieldId,
                                                      label: language === "en" ? "English" : "中文",
                                                      kind: field?.kind ?? fallback?.kind ?? "text",
                                                      value: field?.value ?? "",
                                                    }}
                                                    onChange={(value) =>
                                                      updateFieldValue(language, itemIndex, fieldId, value, fallback)
                                                    }
                                                  />
                                                );
                                              })}
                                            </section>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  ),
                                )}
                              </div>
                            </div>
                          ))}
                        </section>
                      ) : null}
                    </div>
                  </article>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="rounded-[28px] border border-dashed border-slate-300 bg-white p-8 text-sm text-slate-500">
              没有找到对应的页面内容模块。
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function PageContentFieldInput(props: { field: PageContentField; onChange: (value: string) => void }) {
  const isLongText = props.field.kind === "textarea" || props.field.value.length > 120 || props.field.value.includes("\n");

  return (
    <label className={isLongText ? "block space-y-2 lg:col-span-2" : "block space-y-2"}>
      <span className="text-sm font-medium text-slate-700">{props.field.label}</span>
      {isLongText ? (
        <textarea
          value={props.field.value}
          rows={5}
          onChange={(event) => props.onChange(event.target.value)}
          className="min-h-32 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10"
        />
      ) : (
        <input
          value={props.field.value}
          type={props.field.kind === "url" ? "url" : "text"}
          onChange={(event) => props.onChange(event.target.value)}
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10"
        />
      )}
    </label>
  );
}

function getPairedRepeaterFields(itemsByLanguage: Record<Language, PageContentRepeaterItem[]>, itemIndex: number) {
  const fieldMap = new Map<string, { fieldId: string; label: string; kind: PageContentField["kind"] }>();

  (["en", "zh"] as Language[]).forEach((language) => {
    const item = itemsByLanguage[language]?.[itemIndex];

    item?.fields.forEach((field) => {
      if (!fieldMap.has(field.id)) {
        fieldMap.set(field.id, {
          fieldId: field.id,
          label: field.label,
          kind: field.kind,
        });
      }
    });
  });

  return Array.from(fieldMap.values());
}

function getPastEventPlatformNumbersForItems(itemsByLanguage: Record<Language, PageContentRepeaterItem[]>, itemIndex: number) {
  const numbers = new Set<number>();

  (["en", "zh"] as Language[]).forEach((language) => {
    const item = itemsByLanguage[language]?.[itemIndex];
    getPastEventPlatformNumbersFromFields(item?.fields ?? []).forEach((number) => numbers.add(number));
  });

  return Array.from(numbers).sort((a, b) => a - b);
}

function getPastEventProgramNumbersForItems(
  itemsByLanguage: Record<Language, PageContentRepeaterItem[]>,
  itemIndex: number,
  platformNumber: number,
) {
  const numbers = new Set<number>();

  (["en", "zh"] as Language[]).forEach((language) => {
    const item = itemsByLanguage[language]?.[itemIndex];
    getPastEventProgramNumbersFromFields(item?.fields ?? [], platformNumber).forEach((number) => numbers.add(number));
  });

  return Array.from(numbers).sort((a, b) => a - b);
}

function getPastEventFieldFallback(fieldId: string, language: Language) {
  const platformNumber = getPastEventPlatformNumber(fieldId);

  if (!platformNumber) return null;

  const programNumber = getPastEventProgramNumber(fieldId, platformNumber);
  const fields = programNumber
    ? createPastEventProgramFields(platformNumber, programNumber, language)
    : createPastEventPlatformFields(platformNumber, language);

  return fields.find((field) => field.id === fieldId) ?? null;
}

function upsertPageContentField(
  fields: PageContentField[],
  fieldId: string,
  value: string,
  fallback: PageContentField | null,
) {
  let found = false;
  const nextFields = fields.map((fieldItem) => {
    if (fieldItem.id !== fieldId) return fieldItem;
    found = true;
    return { ...fieldItem, value };
  });

  if (found) return nextFields;

  return [
    ...nextFields,
    {
      id: fieldId,
      label: fallback?.label ?? fieldId,
      kind: fallback?.kind ?? "text",
      value,
    },
  ];
}

function createPageContentField(id: string, label: string, kind: PageContentField["kind"]): PageContentField {
  return { id, label, kind, value: "" };
}

function getPageContentRepeaterField(item: PageContentRepeaterItem, fieldId: string) {
  return item.fields.find((fieldItem) => fieldItem.id === fieldId)?.value ?? "";
}

function getPageContentRepeaterSummary(item: PageContentRepeaterItem) {
  return (
    getPageContentRepeaterField(item, "date") ||
    getPageContentRepeaterField(item, "platform") ||
    getPageContentRepeaterField(item, "tag") ||
    getPageContentRepeaterField(item, "href") ||
    getPageContentRepeaterField(item, "link") ||
    getPageContentRepeaterField(item, "linkUrl")
  );
}

function moveRepeaterItem(items: PageContentRepeaterItem[], fromIndex: number, toIndex: number) {
  if (fromIndex < 0 || toIndex < 0 || fromIndex >= items.length || toIndex >= items.length) {
    return items;
  }

  const nextItems = [...items];
  const [item] = nextItems.splice(fromIndex, 1);
  nextItems.splice(toIndex, 0, item);
  return nextItems;
}

function getRepeaterThumbnail(itemsByLanguage: Record<Language, PageContentRepeaterItem[]>, itemIndex: number) {
  for (const language of ["zh", "en"] as Language[]) {
    const item = itemsByLanguage[language]?.[itemIndex];
    const imageField = item?.fields.find((fieldItem) => isRepeaterImageField(fieldItem));

    if (imageField?.value.trim()) {
      return imageField.value.trim();
    }
  }

  return "";
}

function getRepeaterDisplayTitle(
  itemsByLanguage: Record<Language, PageContentRepeaterItem[]>,
  itemIndex: number,
  fallback: string,
) {
  const preferredFieldIds = ["title", "name", "award", "platform", "brand", "label", "tag"];

  for (const language of ["zh", "en"] as Language[]) {
    const item = itemsByLanguage[language]?.[itemIndex];
    const value =
      getPreferredRepeaterFieldValue(item, preferredFieldIds) ||
      item?.label ||
      item?.fields.find((fieldItem) => fieldItem.kind !== "image" && fieldItem.kind !== "url")?.value;

    if (value?.trim()) {
      return truncateRepeaterText(value, 96);
    }
  }

  return fallback;
}

function getRepeaterDisplaySummary(
  itemsByLanguage: Record<Language, PageContentRepeaterItem[]>,
  itemIndex: number,
  fallback: string,
) {
  const preferredFieldIds = [
    "description",
    "summary",
    "details",
    "body",
    "subtitle",
    "date",
    "time",
    "location",
    "href",
    "link",
    "linkUrl",
  ];

  for (const language of ["zh", "en"] as Language[]) {
    const item = itemsByLanguage[language]?.[itemIndex];
    const value =
      getPreferredRepeaterFieldValue(item, preferredFieldIds) ||
      item?.fields.find((fieldItem) => fieldItem.kind !== "image")?.value;

    if (value?.trim()) {
      return truncateRepeaterText(value, 180);
    }
  }

  return fallback || "No summary";
}

function getPreferredRepeaterFieldValue(item: PageContentRepeaterItem | undefined, fieldIds: string[]) {
  if (!item) return "";

  for (const fieldId of fieldIds) {
    const value = item.fields.find((fieldItem) => fieldItem.id === fieldId)?.value;

    if (value?.trim()) {
      return value.trim();
    }
  }

  return "";
}

function isRepeaterImageField(field: PageContentField) {
  const fieldId = field.id.toLowerCase();

  return (
    field.kind === "image" ||
    ["image", "img", "logo", "icon", "poster", "cover", "thumbnail", "portrait", "banner", "background"].some(
      (keyword) => fieldId.includes(keyword),
    )
  );
}

function truncateRepeaterText(value: string, maxLength: number) {
  const normalized = value.replace(/\s+/g, " ").trim();

  return normalized.length > maxLength ? `${normalized.slice(0, maxLength - 1)}...` : normalized;
}

function CollectionPanel<T extends CollectionItem>(props: {
  title: string;
  apiCollection: keyof typeof collectionTitleMap;
  items: T[];
  setItems: Dispatch<SetStateAction<T[]>>;
  selectedId: number | null;
  setSelectedId: (id: number | null) => void;
  createItem: () => T;
  saveCollection: (collection: keyof typeof collectionTitleMap, item: Record<string, unknown>) => Promise<CollectionItem[] | null>;
  deleteCollection: (collection: keyof typeof collectionTitleMap, id: number) => Promise<CollectionItem[] | null>;
}) {
  const [draft, setDraft] = useState<EditorValue>(() => {
    const existing = props.items.find((item) => item.id === props.selectedId);
    return cloneValue(existing ?? props.createItem()) as unknown as EditorValue;
  });

  const selected = props.items.find((item) => item.id === props.selectedId);

  const updateDraft = (path: PathSegment[], nextValue: EditorValue) => {
    setDraft((current) => setValueAtPath(current, path, nextValue));
  };

  const addDraftItem = (path: PathSegment[]) => {
    setDraft((current) => {
      const currentValue = getValueAtPath(current, path);
      if (!Array.isArray(currentValue)) return current;
      const sample = currentValue[0];
      return setValueAtPath(current, path, [...currentValue, sample === undefined ? "" : createEmptyValue(sample)]);
    });
  };

  const removeDraftItem = (path: PathSegment[], index: number) => {
    setDraft((current) => {
      const currentValue = getValueAtPath(current, path);
      if (!Array.isArray(currentValue)) return current;
      return setValueAtPath(current, path, currentValue.filter((_, itemIndex) => itemIndex !== index));
    });
  };

  const selectItem = (id: number | null) => {
    props.setSelectedId(id);
    const next =
      id === null ? props.createItem() : props.items.find((item) => item.id === id) ?? props.createItem();
    setDraft(cloneValue(next) as unknown as EditorValue);
  };

  const saveCurrent = async () => {
    const record = cloneValue(draft as Record<string, unknown>);
    if (!record.slug && typeof record.title === "string") {
      record.slug = slugify(record.title);
    }
    const nextItems = (await props.saveCollection(props.apiCollection, record)) as T[] | null;
    if (!nextItems) return;
    props.setItems(nextItems);
    const savedItem =
      nextItems.find((item) => item.slug === record.slug) ??
      nextItems.find((item) => item.id === (record.id as number | undefined)) ??
      nextItems[0];
    selectItem(savedItem?.id ?? null);
  };

  const deleteCurrent = async () => {
    if (!selected?.id) return;
    const nextItems = (await props.deleteCollection(props.apiCollection, selected.id)) as T[] | null;
    if (!nextItems) return;
    props.setItems(nextItems);
    selectItem(nextItems[0]?.id ?? null);
  };

  return (
    <section className="grid gap-5 xl:grid-cols-[300px_minmax(0,1fr)]">
      <aside className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm">
        <button
          type="button"
          onClick={() => selectItem(null)}
          className="flex w-full items-center justify-center rounded-2xl bg-[#2563eb] px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(37,99,235,0.2)]"
        >
          新建{props.title}
        </button>
        <div className="mt-4 space-y-2">
          {props.items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => selectItem(item.id)}
              className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                props.selectedId === item.id
                  ? "border-[#bfd5ff] bg-[#eef4ff]"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <div className="line-clamp-1 text-sm font-semibold text-slate-900">{item.title}</div>
              <div className="mt-1 text-xs text-slate-500">
                {localeLabels[item.language]} / {getStatusLabel(item.status)}
              </div>
            </button>
          ))}
        </div>
      </aside>

      <div className="space-y-5">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={saveCurrent}
            className="inline-flex items-center gap-2 rounded-2xl bg-[#2563eb] px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(37,99,235,0.2)]"
          >
            <Save className="h-4 w-4" />
            保存{props.title}
          </button>
          {selected?.id ? (
            <button
              type="button"
              onClick={deleteCurrent}
              className="inline-flex items-center gap-2 rounded-2xl border border-rose-200 bg-white px-4 py-3 text-sm font-semibold text-rose-500"
            >
              <Trash2 className="h-4 w-4" />
              删除
            </button>
          ) : null}
        </div>
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <ContentField
            label={props.title}
            value={draft}
            path={[]}
            onChange={updateDraft}
            onAddItem={addDraftItem}
            onRemoveItem={removeDraftItem}
          />
        </div>
      </div>
    </section>
  );
}

function ContactSubmissionsPanel(props: {
  submissions: CmsContactSubmission[];
  setSubmissions: Dispatch<SetStateAction<CmsContactSubmission[]>>;
  setMessage: (message: string) => void;
}) {
  const requestSubmissions = async (
    method: "GET" | "PATCH" | "DELETE",
    body?: Record<string, unknown>,
    successMessage = "联系提交已更新。",
  ) => {
    const response = await fetch("/api/cms/contact-submissions", {
      method,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      props.setMessage("联系提交操作失败。");
      return;
    }

    const payload = (await response.json()) as { submissions: CmsContactSubmission[] };
    props.setSubmissions(payload.submissions);
    props.setMessage(successMessage);
  };

  const unreadCount = props.submissions.filter((item) => item.status === "new").length;

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
        <div>
          <p className="text-sm font-semibold text-slate-500">共 {props.submissions.length} 条提交</p>
          <h2 className="mt-1 text-2xl font-semibold text-slate-950">未读 {unreadCount} 条</h2>
        </div>
        <button
          type="button"
          onClick={() => requestSubmissions("GET", undefined, "联系提交已刷新。")}
          className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#2563eb] hover:text-[#2563eb]"
        >
          <RefreshCcw className="h-4 w-4" />
          刷新
        </button>
      </div>

      <div className="space-y-4">
        {props.submissions.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
            暂无联系表单提交。
          </div>
        ) : null}

        {props.submissions.map((submission) => (
          <article key={submission.id} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      submission.status === "new"
                        ? "bg-rose-50 text-rose-600"
                        : submission.status === "read"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {contactSubmissionStatusLabels[submission.status]}
                  </span>
                  <h3 className="line-clamp-1 text-xl font-semibold text-slate-950">
                    {submission.subject || "无主题"}
                  </h3>
                </div>

                <div className="mt-4 grid gap-3 text-sm text-slate-600 md:grid-cols-2 xl:grid-cols-3">
                  <p><span className="font-semibold text-slate-900">姓名：</span>{submission.name}</p>
                  <p><span className="font-semibold text-slate-900">联系方式：</span>{submission.contactInfo}</p>
                  <p><span className="font-semibold text-slate-900">语言：</span>{localeLabels[submission.language]}</p>
                  <p><span className="font-semibold text-slate-900">单位：</span>{submission.organization || "-"}</p>
                  <p><span className="font-semibold text-slate-900">职位：</span>{submission.position || "-"}</p>
                  <p><span className="font-semibold text-slate-900">提交时间：</span>{submission.createdAt}</p>
                </div>

                <p className="mt-5 whitespace-pre-wrap rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-slate-700">
                  {submission.message}
                </p>

                <p className="mt-4 break-all text-xs text-slate-400">
                  {submission.pagePath} / {submission.ipAddress || "unknown ip"} / {submission.userAgent || "unknown ua"}
                </p>
              </div>

              <div className="flex shrink-0 flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() =>
                    requestSubmissions("PATCH", {
                      id: submission.id,
                      status: submission.status === "new" ? "read" : "new",
                    })
                  }
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700"
                >
                  {submission.status === "new" ? "标记已读" : "标记未读"}
                </button>
                <button
                  type="button"
                  onClick={() => requestSubmissions("PATCH", { id: submission.id, status: "archived" }, "联系提交已归档。")}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700"
                >
                  归档
                </button>
                <button
                  type="button"
                  onClick={() => requestSubmissions("DELETE", { id: submission.id }, "联系提交已删除。")}
                  className="rounded-2xl border border-rose-200 bg-white px-4 py-3 text-sm font-semibold text-rose-500"
                >
                  删除
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function AssetsPanel(props: {
  assets: CmsAsset[];
  setAssets: Dispatch<SetStateAction<CmsAsset[]>>;
  setDashboard: Dispatch<SetStateAction<CmsDashboardMetrics | undefined>>;
  assetInputRef: RefObject<HTMLInputElement>;
  setMessage: (message: string) => void;
}) {
  const [assetUploadPage, setAssetUploadPage] = useState<AssetPageCategoryId>("home");
  const [officialAssetSummary, setOfficialAssetSummary] = useState({
    count: 0,
    file: 0,
    image: 0,
    totalBytes: 0,
    video: 0,
  });
  const [officialAssetRefreshKey, setOfficialAssetRefreshKey] = useState(0);
  const [assetPagination, setAssetPagination] = useState<AssetPagination>({
    total: props.assets.length,
    limit: cmsAssetPageSize,
    offset: 0,
    hasMore: false,
  });
  const totalAssetStats = officialAssetSummary;
  const applyAssetPayload = (
    payload: { assets: CmsAsset[]; dashboard?: CmsDashboardMetrics; pagination?: AssetPagination },
    mode: "replace" | "append" = "replace",
  ) => {
    props.setAssets((current) => (mode === "append" ? [...current, ...payload.assets] : payload.assets));
    if (payload.pagination) {
      setAssetPagination(payload.pagination);
    }
    if (payload.dashboard) {
      props.setDashboard(payload.dashboard);
    }
  };

  const refreshAssets = async (offset = 0, mode: "replace" | "append" = "replace") => {
    const response = await fetch(
      `/api/cms/assets?limit=${cmsAssetPageSize}&offset=${offset}&page=${encodeURIComponent(assetUploadPage)}`,
    );

    if (!response.ok) {
      props.setMessage("刷新文件列表失败。");
      return;
    }

    const payload = (await response.json()) as {
      assets: CmsAsset[];
      dashboard?: CmsDashboardMetrics;
      pagination?: AssetPagination;
    };
    applyAssetPayload(payload, mode);
    props.setMessage("文件列表已刷新。");
  };

  useEffect(() => {
    void refreshAssets();
  }, [assetUploadPage]);

  const uploadAsset = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) return;

    let latestPayload: { assets: CmsAsset[]; dashboard?: CmsDashboardMetrics; pagination?: AssetPagination; warning?: string } | null =
      null;
    const uploadedUrls: string[] = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("page", assetUploadPage);

      const response = await fetch("/api/cms/assets", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        props.setMessage(`文件上传失败：${file.name}`);
        event.target.value = "";
        return;
      }

      latestPayload = (await response.json()) as {
        assets: CmsAsset[];
        dashboard?: CmsDashboardMetrics;
        pagination?: AssetPagination;
        warning?: string;
      };

      const uploaded = latestPayload.assets.find((asset) => asset.originalName === file.name) ?? latestPayload.assets[0];
      if (uploaded?.url) {
        uploadedUrls.push(resolvePublicAssetUrl(uploaded.url));
      }
    }

    if (latestPayload) {
      applyAssetPayload(latestPayload);
      setOfficialAssetRefreshKey((current) => current + 1);
    }
    props.setMessage(
      uploadedUrls.length
        ? `${files.length} 个文件已上传。最新地址：${uploadedUrls.join("；")}`
        : `${files.length} 个文件已上传，请在 OSS 静态资源分类中查看。`,
    );
    event.target.value = "";
  };
  return (
    <section className="cms-assets-panel space-y-5">
      <style>{`
        .cms-assets-panel .text-xs { font-size: 0.975rem; }
        .cms-assets-panel .text-sm { font-size: 1.1375rem; }
        .cms-assets-panel .text-base { font-size: 1.3rem; }
        .cms-assets-panel .text-2xl { font-size: 1.95rem; }
        .cms-assets-panel .text-\\[11px\\] { font-size: 0.89375rem; }
      `}</style>
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-950">文件管理</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
              查看和管理 OSS 静态资源、文章、新闻、页面编辑时上传过的图片、视频和其他附件。刷新时会同步扫描
              <span className="font-mono text-slate-700"> public/uploads </span>
              中的历史文件，并在下方合并扫描 <span className="font-mono text-slate-700"> public/assets </span>。
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => void refreshAssets()}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#2563eb] hover:text-[#2563eb]"
            >
              <RefreshCcw className="h-4 w-4" />
              刷新列表
            </button>
            <button
              type="button"
              onClick={() => props.assetInputRef.current?.click()}
              className="inline-flex items-center gap-2 rounded-2xl bg-[#2563eb] px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(37,99,235,0.2)]"
            >
              <Upload className="h-4 w-4" />
              上传附件
            </button>
            <input
              ref={props.assetInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={uploadAsset}
            />
          </div>
        </div>

        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-slate-700">按页面查看 / 上传到当前页面</p>
            <p className="text-xs text-slate-400">当前页面：{assetPageCategories.find((category) => category.id === assetUploadPage)?.label}</p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {assetPageCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setAssetUploadPage(category.id)}
                className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
                  assetUploadPage === category.id
                    ? "border-[#2563eb] bg-[#2563eb] text-white shadow-[0_10px_20px_rgba(37,99,235,0.18)]"
                    : "border-slate-200 bg-white text-slate-700 hover:border-[#2563eb] hover:text-[#2563eb]"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs text-slate-500">当前页上传记录</p>
            <p className="mt-2 text-2xl font-semibold text-slate-950">{assetPagination.total}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs text-slate-500">真实图片数</p>
            <p className="mt-2 text-2xl font-semibold text-slate-950">{totalAssetStats.image}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs text-slate-500">真实视频数</p>
            <p className="mt-2 text-2xl font-semibold text-slate-950">{totalAssetStats.video}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs text-slate-500">真实文件空间</p>
            <p className="mt-2 text-2xl font-semibold text-slate-950">{formatBytes(totalAssetStats.totalBytes)}</p>
          </div>
        </div>

      </div>

      <OfficialAssetBrowser
        refreshKey={officialAssetRefreshKey}
        setMessage={props.setMessage}
        onSummary={setOfficialAssetSummary}
      />
    </section>
  );
}

type OfficialAssetBrowserItem = {
  path: string;
  url: string;
  category: string;
  categoryLabel: string;
  name: string;
  type: "file" | "image" | "video";
  sizeBytes: number;
};

type OfficialAssetCategory = {
  id: string;
  label: string;
};

type OfficialAssetPayload = {
  assets: OfficialAssetBrowserItem[];
  categories: OfficialAssetCategory[];
  pagination: AssetPagination;
  summary: AssetSummary;
};

function OfficialAssetBrowser(props: {
  refreshKey: number;
  setMessage: (message: string) => void;
  onSummary: (summary: AssetSummary) => void;
}) {
  const [assets, setAssets] = useState<OfficialAssetBrowserItem[]>([]);
  const [categories, setCategories] = useState<OfficialAssetCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState<AssetPagination>({
    total: 0,
    limit: cmsAssetPageSize,
    offset: 0,
    hasMore: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const requestAssets = async (options?: {
    category?: string;
    search?: string;
    offset?: number;
    mode?: "replace" | "append";
  }) => {
    const nextCategory = options?.category ?? activeCategory;
    const nextSearch = options?.search ?? search;
    const offset = options?.offset ?? 0;
    const mode = options?.mode ?? "replace";
    const params = new URLSearchParams({
      category: nextCategory,
      limit: String(cmsAssetPageSize),
      offset: String(offset),
    });

    if (nextSearch.trim()) {
      params.set("search", nextSearch.trim());
    }

    setIsLoading(true);
    const response = await fetch(`/api/cms/official-assets?${params.toString()}`);
    setIsLoading(false);

    if (!response.ok) {
      props.setMessage("OSS 文件列表刷新失败。");
      return;
    }

    const payload = (await response.json()) as OfficialAssetPayload;
    setAssets((current) => (mode === "append" ? [...current, ...payload.assets] : payload.assets));
    setCategories(payload.categories);
    setPagination(payload.pagination);
    props.onSummary(payload.summary);
    props.setMessage("OSS 文件列表已刷新。");
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void requestAssets({ offset: 0, mode: "replace" });
    }, 200);

    return () => window.clearTimeout(timer);
  }, [activeCategory, search, props.refreshKey]);

  const loadMoreOfficialAssets = async () => {
    if (!pagination.hasMore || isLoading) return;
    await requestAssets({ offset: assets.length, mode: "append" });
  };

  const refresh = async () => {
    await requestAssets({ offset: 0, mode: "replace" });
  };

  const visibleAssets = assets;

  const copyUrl = async (url: string) => {
    try {
      await copyTextToClipboard(url);
      props.setMessage("OSS 地址已复制。");
    } catch {
      props.setMessage("OSS 地址复制失败，请手动选中地址复制。");
    }
  };

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-slate-950">OSS 静态资源</h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
            扫描 public/assets 和 public/uploads 并生成对应 OSS 地址，按页面分类，方便检查线上资源路径。
          </p>
        </div>
        <button
          type="button"
          onClick={() => void refresh()}
          className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#2563eb] hover:text-[#2563eb]"
        >
          <RefreshCcw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          刷新 OSS 列表
        </button>
      </div>

      <div className="mt-5 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-wrap gap-2">
          {[{ id: "all", label: "全部" }, ...categories].map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategory(category.id)}
              className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                activeCategory === category.id
                  ? "bg-slate-900 text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-[#2563eb] hover:text-[#2563eb]"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="搜索 OSS 路径..."
          className="h-11 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-[#2563eb] focus:bg-white xl:w-[320px]"
        />
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {visibleAssets.map((asset) => (
          <article key={asset.path} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
            {asset.type === "image" ? (
              <div className="mb-3 flex h-32 items-center justify-center overflow-hidden rounded-xl bg-white">
                <img src={asset.url} alt={asset.name} className="max-h-full max-w-full object-contain" />
              </div>
            ) : asset.type === "video" ? (
              <div className="mb-3 flex h-32 items-center justify-center overflow-hidden rounded-xl bg-black">
                <video src={asset.url} className="h-full w-full object-contain" controls preload="metadata" />
              </div>
            ) : (
              <div className="mb-3 flex h-32 items-center justify-center rounded-xl bg-white text-slate-400">
                <FileText className="h-8 w-8" />
              </div>
            )}
            <p className="line-clamp-1 text-sm font-semibold text-slate-900">{asset.name}</p>
            <p className="mt-1 text-xs text-slate-500">
              {asset.categoryLabel} / {asset.category} / {formatBytes(asset.sizeBytes)}
            </p>
            <p className="mt-2 break-all font-mono text-[11px] leading-5 text-blue-600">{asset.url}</p>
            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={() => void copyUrl(asset.url)}
                className="rounded-full px-3 py-1 text-xs font-semibold text-slate-600 transition hover:bg-white"
              >
                复制地址
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
        <span>
          已加载 OSS 文件 {visibleAssets.length} / {pagination.total}
        </span>
        {pagination.hasMore ? (
          <button
            type="button"
            onClick={() => void loadMoreOfficialAssets()}
            disabled={isLoading}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 font-semibold text-slate-600 transition hover:border-[#2563eb] hover:text-[#2563eb] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCcw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
            加载更多 OSS 文件
          </button>
        ) : null}
      </div>
    </div>
  );
}

function VersionsPanel(props: {
  versions: CmsVersionSnapshot[];
  setVersions: Dispatch<SetStateAction<CmsVersionSnapshot[]>>;
  editingVersionId: number | null;
  loadVersionForEditing: (versionId: number | null) => Promise<void>;
  versionName: string;
  setVersionName: Dispatch<SetStateAction<string>>;
  versionDescription: string;
  setVersionDescription: Dispatch<SetStateAction<string>>;
  versionSourceId: number | "current";
  setVersionSourceId: Dispatch<SetStateAction<number | "current">>;
  setMessage: (message: string) => void;
}) {
  const [runningAction, setRunningAction] = useState<"restore" | "publish" | null>(null);

  const createVersionAction = async () => {
    const response = await fetch("/api/cms/versions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: props.versionName,
        description: props.versionDescription,
        sourceVersionId: props.versionSourceId === "current" ? null : props.versionSourceId,
      }),
    });

    if (!response.ok) {
      props.setMessage("创建版本失败。");
      return;
    }

    const payload = (await response.json()) as { versions: CmsVersionSnapshot[] };
    props.setVersions(payload.versions);
    props.setVersionName("");
    props.setVersionDescription("");
    props.setVersionSourceId(payload.versions[0]?.id ?? "current");
    if (payload.versions[0]) {
      void props.loadVersionForEditing(payload.versions[0].id);
    }
    props.setMessage("版本快照已创建。");
  };

  const runVersionAction = async (id: number, action: "restore" | "publish") => {
    setRunningAction(action);

    try {
      const response = await fetch(`/api/cms/versions/${id}/${action}`, { method: "POST" });

      if (!response.ok) {
        props.setMessage(action === "restore" ? "恢复版本失败。" : "发布版本失败。");
        return;
      }

      const payload = (await response.json()) as { versions: CmsVersionSnapshot[] };
      props.setVersions(payload.versions);
      props.setVersionSourceId(id);
      await props.loadVersionForEditing(id);
      props.setMessage(action === "restore" ? "版本已恢复。" : "版本已发布。");
    } finally {
      setRunningAction(null);
    }
  };

  return (
    <section className="space-y-5">
      <div className="grid gap-4 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm lg:grid-cols-[1fr_1fr_240px_auto]">
        <input
          value={props.versionName}
          onChange={(event) => props.setVersionName(event.target.value)}
          placeholder="版本名称"
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10"
        />
        <input
          value={props.versionDescription}
          onChange={(event) => props.setVersionDescription(event.target.value)}
          placeholder="版本说明"
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10"
        />
        <select
          value={props.versionSourceId}
          onChange={(event) =>
            props.setVersionSourceId(event.target.value === "current" ? "current" : Number(event.target.value))
          }
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10"
        >
          {props.versions.length === 0 ? <option value="current">创建第一个版本</option> : null}
          {props.versions.map((version) => (
            <option key={version.id} value={version.id}>
              复制版本：{version.name}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={createVersionAction}
          className="inline-flex items-center justify-center rounded-2xl bg-[#2563eb] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(37,99,235,0.2)]"
        >
          创建版本
        </button>
      </div>

      <div className="rounded-[24px] border border-[#bfd5ff] bg-[#eef4ff] p-5 text-sm leading-7 text-slate-700">
        当前流程：先创建版本，然后在可视化编辑顶部选择该版本进行修改；提交后这里会显示更新时间，可预览确认后再发布。
        {props.editingVersionId ? (
          <span className="ml-2 font-semibold text-[#2563eb]">
            当前编辑版本：{props.versions.find((version) => version.id === props.editingVersionId)?.name ?? props.editingVersionId}
          </span>
        ) : null}
      </div>

      <div className="space-y-4">
        {props.versions.map((version) => (
          <article key={version.id} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-xl font-semibold text-slate-950">{version.name}</h3>
                  {version.isPublished ? (
                    <span className="rounded-full bg-[#eef4ff] px-3 py-1 text-xs font-semibold text-[#2563eb]">
                      已发布
                    </span>
                  ) : null}
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {version.description || "暂无版本说明。"}
                </p>
                <p className="mt-2 text-xs text-slate-400">
                  创建：{formatDateTime(version.createdAt)} / 更新：{formatDateTime(version.updatedAt)} / {version.authorUsername}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => {
                    void props.loadVersionForEditing(version.id);
                  }}
                  className={`rounded-2xl px-4 py-3 text-sm font-semibold ${
                    props.editingVersionId === version.id
                      ? "bg-[#eef4ff] text-[#2563eb]"
                      : "border border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  {props.editingVersionId === version.id ? "编辑中" : "选择编辑"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    window.location.href = `/cms/version-preview/${version.id}`;
                  }}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700"
                >
                  预览
                </button>
                <button
                  type="button"
                  onClick={() => runVersionAction(version.id, "restore")}
                  disabled={runningAction !== null}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:text-slate-400"
                >
                  {runningAction === "restore" ? "恢复中..." : "恢复"}
                </button>
                <button
                  type="button"
                  onClick={() => runVersionAction(version.id, "publish")}
                  disabled={runningAction !== null}
                  className="rounded-2xl bg-[#2563eb] px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(37,99,235,0.2)] disabled:cursor-not-allowed disabled:bg-blue-300"
                >
                  {runningAction === "publish" ? "发布中..." : "发布"}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function getPanelHeadline(panel: StudioPanel) {
  return (
    {
      overview: "仪表盘",
      pageContent: "可视化编辑",
      visual: "可视化编辑",
      articles: "旧内容集合",
      carousel: "轮播管理",
      homeEventCarousel: "首页 event 事件轮播",
      homeHonorsCarousel: "首页 HONORS 轮播",
      officialIndustries: "服务行业",
      officialHonors: "虎诉荣誉",
      officialChronicle: "虎诉大事记",
      officialPartners: "合伙人",
      officialSeniorAssociates: "资深律师",
      officialEvents: "虎诉动态",
      eventAwards: "事件和奖项管理",
      site: "站点信息配置",
      assets: "文件管理",
      cases: "旧内容集合",
      media: "旧内容集合",
      podcast: "旧内容集合",
      contactSubmissions: "联系提交",
      versions: "版本发布",
    }[panel] ?? "管理后台"
  );
}

function getPanelDescription(panel: StudioPanel) {
  return (
    {
      overview: "管理官网内容、图片、文件、访问数据和版本发布。",
      pageContent: "维护多语言页面文案、模块字段和展示内容。",
      visual: "通过拖拽组件调整页面结构和布局层级。",
      articles: "发布、编辑和删除站点文章与新闻内容。",
      carousel: "集中管理首页、关于页、活动页和播客页的轮播内容。",
      homeEventCarousel: "控制首页 Events 轮播显示哪些动态，以及它们的排序。",
      homeHonorsCarousel: "控制首页 HONORS 轮播展示年份和顺序。",
      officialIndustries: "单独管理服务行业模块。",
      officialHonors: "单独管理虎诉荣誉模块。",
      officialChronicle: "单独管理虎诉大事记模块。",
      officialPartners: "单独管理合伙人和对应子页面内容。",
      officialSeniorAssociates: "单独管理资深律师和对应子页面内容。",
      officialEvents: "单独管理虎诉动态内容。",
      eventAwards: "集中管理奖项、过往活动和媒体节目露出内容。",
      site: "配置网站名称、Logo、导航和联系信息。",
      assets: "统一管理已上传的图片、视频和内容附件。",
      cases: "维护案例条目和案例详情内容。",
      media: "管理媒体露出、外链和摘要信息。",
      podcast: "该旧内容入口已从 CMS 导航中移除。",
      contactSubmissions: "查看官网联系方式页面提交的咨询、合作和留言记录。",
      versions: "创建快照、恢复历史版本并发布当前站点。",
    }[panel] ?? "CMS 工作区"
  );
}
