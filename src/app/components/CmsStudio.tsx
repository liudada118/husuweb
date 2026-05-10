"use client";

import Link from "next/link";
import type { ChangeEvent, ComponentType, Dispatch, FormEvent, RefObject, SetStateAction } from "react";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  Database,
  ExternalLink,
  Eye,
  FileImage,
  FileText,
  FolderOpen,
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
  isPastEventPlatformFieldId,
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
import { resolvePublicAssetUrl } from "@/lib/public-assets";

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
      { id: "carousel", label: "轮播管理" },
      { id: "eventAwards", label: "事件和奖项管理" },
      { id: "assets", label: "文件管理" },
      { id: "contactSubmissions", label: "联系提交" },
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
    panel: "carousel",
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

function formatDateTime(value: string) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("zh-CN", { hour12: false });
}

function getAssetKind(asset: CmsAsset) {
  if (asset.mimeType.startsWith("image/")) return "image";
  if (asset.mimeType.startsWith("video/")) return "video";
  return "file";
}

const assetKindLabels = {
  all: "全部",
  image: "图片",
  video: "视频",
  file: "其他附件",
} as const;

const assetPageCategories = [
  { id: "all", label: "全部页面", keywords: [] },
  { id: "home", label: "首页", keywords: ["cms-home", "home", "program", "course", "case"] },
  { id: "about", label: "关于页", keywords: ["about", "work-life", "worklife", "recognition", "leadership"] },
  { id: "awards", label: "奖项页", keywords: ["award", "awards", "law-firm", "social"] },
  { id: "event", label: "活动页", keywords: ["event", "schedule", "past"] },
  { id: "media", label: "媒体页", keywords: ["media", "appearance", "business", "cooperation", "stats"] },
  { id: "podcast", label: "播客页", keywords: ["podcast", "special", "episode"] },
  { id: "contact", label: "联系我们", keywords: ["contact"] },
] as const;

type AssetPageCategoryId = (typeof assetPageCategories)[number]["id"];

function getAssetPageCategory(asset: CmsAsset): AssetPageCategoryId {
  const haystack = `${asset.url} ${asset.originalName} ${asset.filename}`.toLowerCase();
  return assetPageCategories.find((category) =>
    category.id !== "all" && category.keywords.some((keyword) => haystack.includes(keyword)),
  )?.id ?? "all";
}

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
  const [siteContent, setSiteContent] = useState<SiteContent>(cloneValue(initialData.siteContent));
  const [visualEditor, setVisualEditor] = useState<VisualEditorState>(cloneValue(initialData.visualEditor));
  const [pageContent, setPageContent] = useState<PageContentState>(cloneValue(initialData.pageContent));
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
  const defaultVersionLoadedRef = useRef(false);

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

  const applyVersionPayload = (payload: CmsVersionPayload) => {
    setSiteContent(cloneValue(payload.siteContent));
    setVisualEditor(cloneValue(payload.visualEditor));
    setPageContent(cloneValue(payload.pageContent));
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
  }): CmsVersionPayload => ({
    siteContent: nextState?.siteContent ?? siteContent,
    visualEditor: nextState?.visualEditor ?? visualEditor,
    pageContent: nextState?.pageContent ?? pageContent,
    articles,
    caseStudies,
    mediaItems,
    podcastEpisodes,
  });

  const loadVersionForEditing = async (versionId: number | null) => {
    if (!versionId) {
      setMessage("请先选择一个版本。");
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
    if (defaultVersionLoadedRef.current || editingVersionId || versions.length === 0) return;

    defaultVersionLoadedRef.current = true;
    void loadVersionForEditing(versions[0].id);
  }, [editingVersionId, versions]);

  const submitVersionDraft = async (
    versionId: number,
    nextState?: { siteContent?: SiteContent; visualEditor?: VisualEditorState; pageContent?: PageContentState },
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

    const payload = (await response.json()) as { versions: CmsVersionSnapshot[] };
    setVersions(payload.versions);
    setMessage("版本内容已更新，可在版本管理中预览或发布。");
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
    nextState?: { siteContent?: SiteContent; visualEditor?: VisualEditorState; pageContent?: PageContentState },
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
        loadVersionForEditing={props.loadVersionForEditing}
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
  const selectedVersionId = props.editingVersionId ?? props.versions[0]?.id ?? "";

  return (
    <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-600">
      <span>版本</span>
      <select
        value={selectedVersionId}
        onChange={(event) => {
          void props.loadVersionForEditing(Number(event.target.value));
        }}
        disabled={props.versions.length === 0}
        className="min-w-[180px] rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10"
      >
        {props.versions.length === 0 ? <option value="">暂无版本</option> : null}
        {props.versions.map((version) => (
          <option key={version.id} value={version.id}>
            {version.name}
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
    if (!props.editingVersionId && props.versions.length > 0) {
      props.setMessage("默认版本正在加载，请稍后再保存。");
      return;
    }

    const ok = props.editingVersionId
      ? await props.submitVersionDraft(props.editingVersionId, { siteContent: props.siteContent })
      : await props.persistWorkspace({ siteContent: props.siteContent });
    props.setMessage(ok ? "站点信息已保存。" : "站点信息保存失败。");
  };

  return (
    <section className="space-y-5">
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold text-slate-950">{props.title}</h2>
            <p className="mt-1 text-sm text-slate-500">
              站点名称、标题栏 Logo、标题栏/页脚社交 icon、导航链接和页脚联系方式都在这里维护。
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <CmsVersionSelect
              versions={props.versions}
              editingVersionId={props.editingVersionId}
              loadVersionForEditing={props.loadVersionForEditing}
            />
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
    if (!props.editingVersionId && props.versions.length > 0) {
      props.setMessage("默认版本正在加载，请稍后再保存。");
      return;
    }

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
          <CmsVersionSelect
            versions={props.versions}
            editingVersionId={props.editingVersionId}
            loadVersionForEditing={props.loadVersionForEditing}
          />
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
  const [assetFilter, setAssetFilter] = useState<keyof typeof assetKindLabels>("all");
  const [assetPageFilter, setAssetPageFilter] = useState<AssetPageCategoryId>("all");
  const [assetUploadPage, setAssetUploadPage] = useState<Exclude<AssetPageCategoryId, "all">>("home");
  const [assetSearch, setAssetSearch] = useState("");
  const assetStats = useMemo(() => {
    return props.assets.reduce(
      (stats, asset) => {
        const kind = getAssetKind(asset);
        stats.totalBytes += asset.sizeBytes;
        stats[kind] += 1;
        return stats;
      },
      { file: 0, image: 0, totalBytes: 0, video: 0 },
    );
  }, [props.assets]);
  const visibleAssets = useMemo(() => {
    const keyword = assetSearch.trim().toLowerCase();

    return props.assets.filter((asset) => {
      const kind = getAssetKind(asset);
      const matchesKind = assetFilter === "all" || assetFilter === kind;
      const pageCategory = getAssetPageCategory(asset);
      const matchesPage = assetPageFilter === "all" || pageCategory === assetPageFilter;
      const matchesKeyword =
        !keyword ||
        asset.originalName.toLowerCase().includes(keyword) ||
        asset.url.toLowerCase().includes(keyword) ||
        asset.mimeType.toLowerCase().includes(keyword);

      return matchesKind && matchesPage && matchesKeyword;
    });
  }, [assetFilter, assetPageFilter, assetSearch, props.assets]);

  const applyAssetPayload = (payload: { assets: CmsAsset[]; dashboard?: CmsDashboardMetrics }) => {
    props.setAssets(payload.assets);
    if (payload.dashboard) {
      props.setDashboard(payload.dashboard);
    }
  };

  const refreshAssets = async () => {
    const response = await fetch("/api/cms/assets");

    if (!response.ok) {
      props.setMessage("刷新文件列表失败。");
      return;
    }

    const payload = (await response.json()) as { assets: CmsAsset[]; dashboard?: CmsDashboardMetrics };
    applyAssetPayload(payload);
    props.setMessage("文件列表已刷新。");
  };

  useEffect(() => {
    void refreshAssets();
  }, []);

  const uploadAsset = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) return;

    let latestPayload: { assets: CmsAsset[]; dashboard?: CmsDashboardMetrics } | null = null;

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

      latestPayload = (await response.json()) as { assets: CmsAsset[]; dashboard?: CmsDashboardMetrics };
    }

    if (latestPayload) {
      applyAssetPayload(latestPayload);
    }
    props.setMessage(`${files.length} 个文件已上传。`);
    event.target.value = "";
  };

  const deleteAsset = async (id: number) => {
    const response = await fetch("/api/cms/assets", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      props.setMessage("素材删除失败。");
      return;
    }

    const payload = (await response.json()) as { assets: CmsAsset[]; dashboard?: CmsDashboardMetrics };
    applyAssetPayload(payload);
    props.setMessage("文件已删除。");
  };

  const copyUrl = async (url: string) => {
    await navigator.clipboard?.writeText(url);
    props.setMessage("文件地址已复制。");
  };

  return (
    <section className="space-y-5">
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-950">文件管理</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
              查看和管理文章、新闻、页面编辑时上传过的图片、视频和其他附件。刷新时会同步扫描
              <span className="font-mono text-slate-700"> public/uploads </span>
              中的历史文件。
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={refreshAssets}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#2563eb] hover:text-[#2563eb]"
            >
              <RefreshCcw className="h-4 w-4" />
              刷新列表
            </button>
            <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-600">
              <span>上传到</span>
              <select
                value={assetUploadPage}
                onChange={(event) => setAssetUploadPage(event.target.value as Exclude<AssetPageCategoryId, "all">)}
                className="min-w-[120px] rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10"
              >
                {assetPageCategories
                  .filter((category) => category.id !== "all")
                  .map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  ))}
              </select>
            </label>
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

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs text-slate-500">全部文件</p>
            <p className="mt-2 text-2xl font-semibold text-slate-950">{props.assets.length}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs text-slate-500">图片</p>
            <p className="mt-2 text-2xl font-semibold text-slate-950">{assetStats.image}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs text-slate-500">视频</p>
            <p className="mt-2 text-2xl font-semibold text-slate-950">{assetStats.video}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs text-slate-500">附件空间</p>
            <p className="mt-2 text-2xl font-semibold text-slate-950">{formatBytes(assetStats.totalBytes)}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm xl:flex-row xl:items-center xl:justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {assetPageCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setAssetPageFilter(category.id)}
                className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                  assetPageFilter === category.id
                    ? "bg-[#2563eb] text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-[#2563eb] hover:text-[#2563eb]"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(assetKindLabels) as Array<keyof typeof assetKindLabels>).map((kind) => (
              <button
                key={kind}
                type="button"
                onClick={() => setAssetFilter(kind)}
                className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                  assetFilter === kind
                    ? "bg-slate-900 text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-[#2563eb] hover:text-[#2563eb]"
                }`}
              >
                {assetKindLabels[kind]}
              </button>
            ))}
          </div>
        </div>
        <input
          value={assetSearch}
          onChange={(event) => setAssetSearch(event.target.value)}
          placeholder="搜索文件名、类型或 URL..."
          className="h-11 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-[#2563eb] focus:bg-white xl:w-[320px]"
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visibleAssets.map((asset) => {
          const publicUrl = resolvePublicAssetUrl(asset.url);

          return (
          <article key={asset.id} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
            {asset.mimeType.startsWith("image/") ? (
              <div className="mb-4 flex h-72 w-full items-center justify-center overflow-hidden rounded-[20px] bg-[#d8dce0] p-3">
                <img
                  src={publicUrl}
                  alt={asset.altText || asset.originalName}
                  className="block max-h-full w-auto max-w-full object-contain"
                />
              </div>
            ) : asset.mimeType.startsWith("video/") ? (
              <div className="mb-4 flex h-72 w-full items-center justify-center overflow-hidden rounded-[20px] bg-[#d8dce0] p-3">
                <video
                  src={publicUrl}
                  className="block max-h-full w-auto max-w-full bg-black object-contain"
                  controls
                  preload="metadata"
                />
              </div>
            ) : (
              <div className="mb-4 flex h-44 w-full items-center justify-center rounded-[20px] bg-slate-100 text-slate-400">
                <FolderOpen className="h-10 w-10" />
              </div>
            )}
            <p className="line-clamp-1 text-sm font-semibold text-slate-900">{asset.originalName}</p>
            <p className="mt-2 text-xs text-slate-500">{asset.mimeType}</p>
            <p className="mt-1 text-xs text-slate-500">{formatBytes(asset.sizeBytes)}</p>
            <p className="mt-1 text-xs text-slate-400">上传时间：{formatDateTime(asset.createdAt)}</p>
            <p className="mt-3 break-all text-xs text-[#2563eb]">{publicUrl}</p>
            <div className="mt-4 flex flex-wrap justify-end gap-2">
              <a
                href={publicUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                打开
              </a>
              <button
                type="button"
                onClick={() => copyUrl(publicUrl)}
                className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
              >
                复制地址
              </button>
              <button
                type="button"
                onClick={() => deleteAsset(asset.id)}
                className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold text-rose-500 transition hover:bg-rose-50"
              >
                <Trash2 className="h-3.5 w-3.5" />
                删除
              </button>
            </div>
          </article>
          );
        })}
      </div>

      {visibleAssets.length === 0 ? (
        <div className="rounded-[28px] border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
          当前筛选条件下没有文件。
        </div>
      ) : null}
    </section>
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
    const response = await fetch(`/api/cms/versions/${id}/${action}`, { method: "POST" });

    if (!response.ok) {
      props.setMessage(action === "restore" ? "恢复版本失败。" : "发布版本失败。");
      return;
    }

    const payload = (await response.json()) as { versions: CmsVersionSnapshot[] };
    props.setVersions(payload.versions);
    props.setMessage(action === "restore" ? "版本已恢复。" : "版本已发布。");
    window.location.reload();
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
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700"
                >
                  恢复
                </button>
                <button
                  type="button"
                  onClick={() => runVersionAction(version.id, "publish")}
                  className="rounded-2xl bg-[#2563eb] px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(37,99,235,0.2)]"
                >
                  发布
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
