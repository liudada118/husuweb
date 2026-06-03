"use client";

import "@puckeditor/core/puck.css";

import { Puck } from "@puckeditor/core";
import type { Config, Data, Plugin, PuckAction, Viewports } from "@puckeditor/core";
import type { ChangeEvent, CSSProperties, Dispatch, SetStateAction } from "react";
import { useEffect, useMemo, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { ArrowDown, ArrowUp, ChevronDown, ChevronLeft, Pin, Trash2, Upload, X } from "lucide-react";
import { PublicCmsProvider as OfficialPublicCmsProvider } from "@/cms/PublicCmsProvider";
import type { OfficialCmsPublicState } from "@/cms/official-state";
import { AboutPage } from "@/components/pages/AboutPage";
import { ContactPage } from "@/components/pages/ContactPage";
import { CoreValuePage } from "@/components/pages/CoreValuePage";
import { EventDetailPage } from "@/components/pages/EventDetailPage";
import { EventsPage } from "@/components/pages/EventsPage";
import { HomePage } from "@/components/pages/HomePage";
import { IndustryDetailPage } from "@/components/pages/IndustryDetailPage";
import { IndustriesPage } from "@/components/pages/IndustriesPage";
import { TeamPage } from "@/components/pages/TeamPage";
import { TeamProfilePage } from "@/components/pages/TeamProfilePage";
import {
  LanguageProvider as OfficialLanguageProvider,
  useLanguage as useOfficialLanguage,
} from "@/i18n/LanguageProvider";
import { createEmptyTeamProfile, getTeamProfile, teamProfiles } from "@/data/teamProfiles";
import {
  createPastEventPlatformFields,
  createPastEventProgramFields,
  getPastEventPlatformNumber,
  getPastEventPlatformNumbersFromFields,
  getPastEventProgramNumber,
  getPastEventProgramNumbersFromFields,
  getPageContentField,
  getPageContentItemField,
  getPageContentSectionItems,
  isPastEventPlatformFieldId,
  pageContentItemFieldKey,
  type PageContentField,
  type PageContentPage,
  type PageContentRepeaterItem,
  type PageContentSection,
  type PageContentState,
} from "@/lib/cms-page-content";
import type {
  CmsArticle,
  CmsAsset,
  CmsCaseStudy,
  CmsMediaItem,
  CmsPodcastEpisode,
  CmsVersionSnapshot,
  PublicCmsData,
  PuckSerializedData,
  VisualEditorState,
  VisualPage,
} from "@/lib/cms-types";
import type { Language } from "@/lib/site-types";
import { resolvePublicAssetUrl, resolvePublicAssetUrls } from "@/lib/public-assets";
import type { SiteContent } from "../translations/translations";

type PathSegment = string | number;
type EditorValue =
  | string
  | number
  | boolean
  | null
  | EditorValue[]
  | { [key: string]: EditorValue };
type StudioPanel =
  | "overview"
  | "pageContent"
  | "visual"
  | "articles"
  | "carousel"
  | "site"
  | "assets"
  | "cases"
  | "media"
  | "podcast"
  | "contactSubmissions"
  | "versions";

type LivePageProps = {
  id: string;
  pageId?: VisualPage;
  language?: Language;
  __contentFingerprint?: string;
  [key: string]: string | undefined;
};

type CmsPreviewDevice = "desktop" | "mobile";
const visualPreviewRefreshDelayMs = 500;
type DetailParentPage = Extract<VisualPage, "event" | "media" | "podcast">;
type SubpageSelection = {
  page: DetailParentPage;
  sectionId: string;
  slug: string;
  itemIndex: number;
};
type VisualEditorTab = VisualPage | "header" | "footer";

type CmsPuckComponents = {
  Live3UiPage: LivePageProps;
};

type CmsPuckData = Data<CmsPuckComponents>;
type PuckDispatch = (action: PuckAction) => void;
type EditableFieldMatch = {
  fieldKey: string;
  field: PageContentField;
  itemIndex?: number;
  itemId?: string;
  sectionId?: string;
  sitePath?: PathSegment[];
};

type CarouselDrawerState = {
  itemIndex?: number;
  sectionId: string;
  slug?: string;
};

const puckViewports: Viewports = [
  { width: 1920, height: "auto", label: "PC 1920", icon: "Monitor" },
  { width: 390, height: "auto", label: "Mobile", icon: "Smartphone" },
];

const previewDeviceOptions: Array<{ id: CmsPreviewDevice; label: string; width: number }> = [
  { id: "desktop", label: "PC端", width: 1920 },
  { id: "mobile", label: "手机端", width: 390 },
];

const pageTabs: Array<{ id: VisualEditorTab; label: string; navLabel: string; route: string }> = [
  { id: "header", label: "Header", navLabel: "TITLE", route: "/" },
  { id: "home", label: "首页", navLabel: "/", route: "/" },
  { id: "about", label: "关于我们", navLabel: "ABOUT US", route: "/about" },
  { id: "podcast", label: "虎诉团队", navLabel: "OUR TEAM", route: "/team" },
  { id: "media", label: "服务行业", navLabel: "INDUSTRIES", route: "/industries" },
  { id: "event", label: "虎诉动态", navLabel: "EVENTS", route: "/events" },
  { id: "contact", label: "联系我们", navLabel: "CONTACT", route: "/contact" },
  { id: "coreValue", label: "虎诉文化", navLabel: "CORE VALUE", route: "/about/core-value" },
  { id: "footer", label: "Footer", navLabel: "FOOTER", route: "/" },
];

const languageLabels: Record<Language, string> = {
  zh: "中文",
  en: "EN",
};

function puckFieldKey(sectionId: string, fieldId: string) {
  return `${sectionId}__${fieldId}`;
}

function isVisualPageTab(tab: VisualEditorTab): tab is VisualPage {
  return tab !== "header" && tab !== "footer";
}

function carouselSummaryFieldKey(sectionId: string) {
  return `${sectionId}__itemsSummary`;
}

function getSectionItemCount(section: PageContentSection) {
  return section.items?.length ?? 0;
}

function sectionHasDateItems(section: PageContentSection) {
  return Boolean(section.items?.some((item) => item.fields.some((field) => field.id === "date" || field.id === "sortDate")));
}

function getItemFieldValue(item: PageContentRepeaterItem, fieldId: string) {
  return item.fields.find((field) => field.id === fieldId)?.value ?? "";
}

function isTruthyCmsValue(value: string) {
  return ["1", "true", "yes", "y", "on", "置顶"].includes(value.trim().toLowerCase());
}

function isPinnedRepeaterItem(item: PageContentRepeaterItem | undefined) {
  return item ? isTruthyCmsValue(getItemFieldValue(item, "pinned")) : false;
}

function getSectionItemBySlugOrIndex(section: PageContentSection | undefined, itemIndex: number, slug?: string) {
  if (!section?.items?.length) return undefined;

  if (slug) {
    const matchedItem = section.items.find((item) => getItemFieldValue(item, "slug") === slug || item.id === slug);

    if (matchedItem) return matchedItem;
  }

  return section.items[itemIndex];
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

function getRepeaterThumbnail(
  sectionsByLanguage: Partial<Record<Language, PageContentSection | undefined>>,
  itemIndex: number,
  slug?: string,
) {
  for (const language of ["zh", "en"] as Language[]) {
    const item = getSectionItemBySlugOrIndex(sectionsByLanguage[language], itemIndex, slug);
    const imageField = item?.fields.find((fieldItem) => isRepeaterImageField(fieldItem));

    if (imageField?.value.trim()) {
      return resolvePublicAssetUrl(imageField.value.trim());
    }
  }

  return "";
}

function getRepeaterDisplayTitle(
  sectionsByLanguage: Partial<Record<Language, PageContentSection | undefined>>,
  itemIndex: number,
  fallback: string,
  slug?: string,
) {
  const preferredFieldIds = ["title", "name", "award", "platform", "brand", "label", "tag"];

  for (const language of ["zh", "en"] as Language[]) {
    const item = getSectionItemBySlugOrIndex(sectionsByLanguage[language], itemIndex, slug);
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
  sectionsByLanguage: Partial<Record<Language, PageContentSection | undefined>>,
  itemIndex: number,
  fallback: string,
  slug?: string,
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
    const item = getSectionItemBySlugOrIndex(sectionsByLanguage[language], itemIndex, slug);
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

const homeEventSlideFields: Array<{ fieldId: string; label: string; kind: PageContentField["kind"] }> = [
  { fieldId: "slug", label: "Slide slug / 轮播标识", kind: "text" },
  { fieldId: "image", label: "Slide image / 轮播图片", kind: "image" },
  { fieldId: "displayDate", label: "Display date / 展示日期", kind: "text" },
  { fieldId: "category", label: "Category / 分类", kind: "text" },
  { fieldId: "title", label: "Title / 标题", kind: "textarea" },
  { fieldId: "summary", label: "Slide summary / 轮播摘要", kind: "textarea" },
  { fieldId: "href", label: "Click link / 点击链接", kind: "url" },
];

function getPairedDrawerFields(
  sectionsByLanguage: Partial<Record<Language, PageContentSection | undefined>>,
  itemIndex: number,
  pageId?: VisualPage,
  sectionId?: string,
  slug?: string,
) {
  const fieldMap = new Map<string, { fieldId: string; label: string; kind: PageContentField["kind"] }>();
  const ensureField = (fieldId: string, label: string, kind: PageContentField["kind"], force = false) => {
    if (force || !fieldMap.has(fieldId)) {
      fieldMap.set(fieldId, { fieldId, label, kind });
    }
  };

  (["en", "zh"] as Language[]).forEach((language) => {
    const item = getSectionItemBySlugOrIndex(sectionsByLanguage[language], itemIndex, slug);

    item?.fields.forEach((field) => {
      if (pageId === "home" && sectionId === "events" && !homeEventSlideFields.some((item) => item.fieldId === field.id)) {
        return;
      }
      if (field.id === "pinned") {
        return;
      }
      if (
        sectionId === "list" &&
        (field.id === "content" ||
          field.id === "summary" ||
          field.id === "detailImages" ||
          field.id === "detailVideos" ||
          isGeneratedEventMediaField(field.id))
      ) {
        return;
      }
      if (!fieldMap.has(field.id)) {
        fieldMap.set(field.id, {
          fieldId: field.id,
          label: field.label,
          kind: field.kind,
        });
      }
    });
  });

  if (pageId === "home" && sectionId === "events") {
    return homeEventSlideFields;
  }

  if (pageId === "event" && sectionId === "list") {
    ensureField("slug", "标识", "text");
    ensureField("image", "缩略图", "image");
    ensureField("sortDate", "排序日期（YYYYMMDD）", "text");
    ensureField("displayDate", "展示日期", "text");
    ensureField("category", "分类", "text");
    ensureField("title", "标题", "textarea");
  }

  if (pageId === "media" && sectionId === "detailPages") {
    ensureField("slug", "标识", "text");
    ensureField("title", "详情页标题", "text");
    ensureField("image", "首屏背景图片", "image");
    ensureField("intro", "详情页简介", "textarea");
    ensureField("sections", "详情卡片（留空则使用页面默认内容）", "textarea");
  }

  if (pageId === "event" && sectionId === "detailPages") {
    ensureField("slug", "Slug / 标识", "text", true);
    ensureField("sortDate", "Sort date (YYYYMMDD) / 排序日期", "text", true);
    ensureField("displayDate", "Display date / 展示日期", "text", true);
    ensureField("category", "Category / 分类", "text", true);
    ensureField("title", "Detail title / 详情页标题", "textarea", true);
    ensureField("summary", "Detail summary / 详情页摘要", "textarea", true);
    ensureField("content", "Detail content / 详情正文", "textarea", true);
    addGeneratedEventMediaFields(fieldMap, sectionsByLanguage, itemIndex, slug);
    ensureField("detailImage1", "Detail image 1 / 详情图片 1", "image", true);
    ensureField("detailVideo1", "Detail video 1 / 详情视频 1", "url", true);
  }

  return Array.from(fieldMap.values());
}

const eventDetailImagePlaceholderPattern = /\[(?:IMAGE|Image|\u56fe\u7247|\u9365\u5267\u5896)\]?/g;
const eventDetailVideoPlaceholderText = "\u6682\u65f6\u65e0\u6cd5\u5728\u98de\u4e66\u6587\u6863\u5916\u5c55\u793a\u6b64\u5185\u5bb9";
const detailImageFieldPattern = /^detailImage(\d+)$/;
const detailVideoFieldPattern = /^detailVideo(\d+)$/;

function countEventDetailImagePlaceholders(value: string) {
  return [...value.matchAll(eventDetailImagePlaceholderPattern)].length;
}

function countEventDetailVideoPlaceholders(value: string) {
  return value.split(eventDetailVideoPlaceholderText).length - 1;
}

function isGeneratedEventMediaField(fieldId: string) {
  return detailImageFieldPattern.test(fieldId) || detailVideoFieldPattern.test(fieldId);
}

function splitDrawerList(value: string) {
  return value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function numberedEventMediaCount(item: PageContentRepeaterItem | undefined, pattern: RegExp) {
  return Math.max(
    0,
    ...(item?.fields.map((field) => {
      const match = field.id.match(pattern);
      return match ? Number(match[1]) : 0;
    }) ?? []),
  );
}

function isPageContentRepeaterItem(item: PageContentRepeaterItem | undefined): item is PageContentRepeaterItem {
  return Boolean(item);
}

function addGeneratedEventMediaFields(
  fieldMap: Map<string, { fieldId: string; label: string; kind: PageContentField["kind"] }>,
  sectionsByLanguage: Partial<Record<Language, PageContentSection | undefined>>,
  itemIndex: number,
  slug?: string,
) {
  const items = (["en", "zh"] as Language[])
    .map((language) => getSectionItemBySlugOrIndex(sectionsByLanguage[language], itemIndex, slug))
    .filter(isPageContentRepeaterItem);
  const imageCount = Math.max(
    0,
    ...items.map((item) => countEventDetailImagePlaceholders(getItemFieldValue(item, "content"))),
    ...items.map((item) => splitDrawerList(getItemFieldValue(item, "detailImages")).length),
    ...items.map((item) => numberedEventMediaCount(item, detailImageFieldPattern)),
  );
  const videoCount = Math.max(
    0,
    ...items.map((item) => countEventDetailVideoPlaceholders(getItemFieldValue(item, "content"))),
    ...items.map((item) => splitDrawerList(getItemFieldValue(item, "detailVideos")).length),
    ...items.map((item) => numberedEventMediaCount(item, detailVideoFieldPattern)),
  );

  Array.from({ length: imageCount }, (_, index) => {
    const fieldId = `detailImage${index + 1}`;
    if (!fieldMap.has(fieldId)) {
      fieldMap.set(fieldId, { fieldId, label: `详情图片 ${index + 1}`, kind: "image" });
    }
  });
  Array.from({ length: videoCount }, (_, index) => {
    const fieldId = `detailVideo${index + 1}`;
    if (!fieldMap.has(fieldId)) {
      fieldMap.set(fieldId, { fieldId, label: `详情视频 ${index + 1}`, kind: "url" });
    }
  });
}

function getGeneratedEventMediaValue(item: PageContentRepeaterItem | undefined, fieldId: string) {
  if (!item) return "";

  const imageMatch = fieldId.match(detailImageFieldPattern);
  if (imageMatch) {
    return splitDrawerList(getItemFieldValue(item, "detailImages"))[Number(imageMatch[1]) - 1] ?? "";
  }

  const videoMatch = fieldId.match(detailVideoFieldPattern);
  if (videoMatch) {
    return splitDrawerList(getItemFieldValue(item, "detailVideos"))[Number(videoMatch[1]) - 1] ?? "";
  }

  return "";
}

function getPastEventPlatformNumbersForDrawer(
  sectionsByLanguage: Partial<Record<Language, PageContentSection | undefined>>,
  itemIndex: number,
) {
  const numbers = new Set<number>();

  (["en", "zh"] as Language[]).forEach((language) => {
    const item = sectionsByLanguage[language]?.items?.[itemIndex];
    getPastEventPlatformNumbersFromFields(item?.fields ?? []).forEach((number) => numbers.add(number));
  });

  return Array.from(numbers).sort((a, b) => a - b);
}

function getPastEventProgramNumbersForDrawer(
  sectionsByLanguage: Partial<Record<Language, PageContentSection | undefined>>,
  itemIndex: number,
  platformNumber: number,
) {
  const numbers = new Set<number>();

  (["en", "zh"] as Language[]).forEach((language) => {
    const item = sectionsByLanguage[language]?.items?.[itemIndex];
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

function TextFormatHint() {
  return (
    <p className="mt-2 rounded-xl bg-slate-100 px-3 py-2 text-xs leading-5 text-slate-500">
      样式写法：<code>**加粗**</code>、<code>*斜体*</code>、<code>[color=#d9b27a]文字[/color]</code>
    </p>
  );
}

function PreviewLanguageSync({ language }: { language: Language }) {
  const { setLanguage } = useOfficialLanguage();

  useEffect(() => {
    setLanguage(language);
  }, [language, setLanguage]);

  return null;
}

function BufferedTextControl({
  name,
  fieldKey,
  language,
  value,
  multiline = false,
  rows = 4,
  type = "text",
  className,
  onCommit,
}: {
  name: string;
  fieldKey: string;
  language: Language | "site";
  value: string;
  multiline?: boolean;
  rows?: number;
  type?: "text" | "url";
  className: string;
  onCommit: (value: string) => void;
}) {
  const [draft, setDraft] = useState(value);
  const timerRef = useRef<number | null>(null);
  const onCommitRef = useRef(onCommit);
  const focusedRef = useRef(false);

  useEffect(() => {
    onCommitRef.current = onCommit;
  }, [onCommit]);

  useEffect(() => {
    if (!focusedRef.current) {
      setDraft(value);
    }
  }, [fieldKey, language, value]);

  useEffect(
    () => () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    },
    [],
  );

  const scheduleCommit = (nextValue: string) => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }

    timerRef.current = window.setTimeout(() => {
      onCommitRef.current(nextValue);
      timerRef.current = null;
    }, 250);
  };

  const commitNow = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    onCommitRef.current(draft);
  };

  if (multiline) {
    return (
      <textarea
        name={name}
        data-cms-editor-field={fieldKey}
        data-cms-editor-language={language}
        value={draft}
        rows={rows}
        onFocus={() => {
          focusedRef.current = true;
        }}
        onBlur={() => {
          focusedRef.current = false;
          commitNow();
        }}
        onChange={(event) => {
          const nextValue = event.target.value;
          setDraft(nextValue);
          scheduleCommit(nextValue);
        }}
        className={className}
      />
    );
  }

  return (
    <input
      name={name}
      data-cms-editor-field={fieldKey}
      data-cms-editor-language={language}
      value={draft}
      type={type}
      onFocus={() => {
        focusedRef.current = true;
      }}
      onBlur={() => {
        focusedRef.current = false;
        commitNow();
      }}
      onChange={(event) => {
        const nextValue = event.target.value;
        setDraft(nextValue);
        scheduleCommit(nextValue);
      }}
      className={className}
    />
  );
}

function SiteChromeInput({
  fieldKey,
  focused,
  label,
  value,
  type = "text",
  uploadable = false,
  onChange,
  onUpload,
}: {
  fieldKey: string;
  focused: boolean;
  label: string;
  value: string;
  type?: "text" | "url" | "textarea";
  uploadable?: boolean;
  onChange: (value: string) => void;
  onUpload?: (file: File) => void;
}) {
  return (
    <label className="block space-y-1.5">
      <span className={`text-xs font-bold ${focused ? "text-[#2563eb]" : "text-slate-600"}`}>{label}</span>
      {type === "textarea" ? (
        <BufferedTextControl
          name={fieldKey}
          fieldKey={fieldKey}
          language="site"
          value={value}
          multiline
          rows={4}
          onCommit={onChange}
          className={`w-full rounded-2xl border bg-white px-3 py-2 text-sm leading-6 text-slate-900 outline-none transition focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10 ${
            focused ? "border-[#2563eb] ring-4 ring-[#2563eb]/10" : "border-slate-200"
          }`}
        />
      ) : (
        <BufferedTextControl
          name={fieldKey}
          fieldKey={fieldKey}
          language="site"
          value={value}
          type={type}
          onCommit={onChange}
          className={`w-full rounded-2xl border bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10 ${
            focused ? "border-[#2563eb] ring-4 ring-[#2563eb]/10" : "border-slate-200"
          }`}
        />
      )}
      {uploadable ? (
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-500">
            <Upload className="h-3.5 w-3.5" />
            上传 Logo
          </span>
          <input
            type="file"
            accept="image/*"
            className="text-xs text-slate-500 file:mr-3 file:rounded-xl file:border-0 file:bg-[#2563eb] file:px-3 file:py-2 file:text-xs file:font-bold file:text-white"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              const file = event.target.files?.[0];
              event.target.value = "";
              if (!file) return;
              onUpload?.(file);
            }}
          />
          {value ? (
            <img
              src={resolvePublicAssetUrl(value)}
              alt=""
              className="h-12 w-20 rounded-xl border border-slate-200 bg-slate-50 object-contain"
            />
          ) : null}
        </div>
      ) : null}
    </label>
  );
}

function SiteChromeFields({
  siteContent,
  focusedFieldKey,
  mode,
  onChange,
  onUpload,
}: {
  siteContent: SiteContent;
  focusedFieldKey: string | null;
  mode: "header" | "footer";
  onChange: (path: PathSegment[], value: string) => void;
  onUpload: (path: PathSegment[], file: File) => void;
}) {
  const settings = siteContent.siteSettings;
  const headerBaseFields = [
    { path: ["siteSettings", "siteName"] as PathSegment[], label: "站点名称", value: settings.siteName },
    { path: ["siteSettings", "siteSubtitle"] as PathSegment[], label: "站点副标题", value: settings.siteSubtitle },
    { path: ["siteSettings", "logoUrl"] as PathSegment[], label: "标题栏左侧 Logo", value: settings.logoUrl },
  ];
  const headerRightFields = [
    { path: ["siteSettings", "headerLanguageZhLabel"] as PathSegment[], label: "右侧语言 / 中文", value: settings.headerLanguageZhLabel },
    { path: ["siteSettings", "headerLanguageEnLabel"] as PathSegment[], label: "右侧语言 / English", value: settings.headerLanguageEnLabel },
    {
      path: ["siteSettings", "officialSiteUrl"] as PathSegment[],
      label: "官网链接",
      value: settings.officialSiteUrl,
      type: "url" as const,
    },
    { path: ["siteSettings", "officialSiteLabel"] as PathSegment[], label: "官网文字", value: settings.officialSiteLabel },
    { path: ["siteSettings", "headerOfficialLogoUrl"] as PathSegment[], label: "标题栏官网 Logo / 图片", value: settings.headerOfficialLogoUrl },
  ];
  const footerLeftFields = [
    { path: ["siteSettings", "footerLeftLogoUrl"] as PathSegment[], label: "左侧 Logo", value: settings.footerLeftLogoUrl },
    { path: ["siteSettings", "footerAddressZh"] as PathSegment[], label: "地址 / 中文", value: settings.footerAddressZh, type: "textarea" as const },
    { path: ["siteSettings", "footerAddressEn"] as PathSegment[], label: "Address / English", value: settings.footerAddressEn, type: "textarea" as const },
    { path: ["siteSettings", "footerEmail"] as PathSegment[], label: "邮箱", value: settings.footerEmail },
    { path: ["siteSettings", "footerPhone"] as PathSegment[], label: "联系方式", value: settings.footerPhone },
    { path: ["siteSettings", "footerAddressIconUrl"] as PathSegment[], label: "地址图标", value: settings.footerAddressIconUrl },
    { path: ["siteSettings", "footerPhoneIconUrl"] as PathSegment[], label: "电话图标", value: settings.footerPhoneIconUrl },
    { path: ["siteSettings", "footerEmailIconUrl"] as PathSegment[], label: "邮箱图标", value: settings.footerEmailIconUrl },
  ];
  const footerRightFields = [
    { path: ["siteSettings", "footerRightLogoUrl"] as PathSegment[], label: "右侧 Logo", value: settings.footerRightLogoUrl },
    { path: ["siteSettings", "footerTaglineZh"] as PathSegment[], label: "右侧正文 / 中文", value: settings.footerTaglineZh, type: "textarea" as const },
    { path: ["siteSettings", "footerTaglineEn"] as PathSegment[], label: "Right body / English", value: settings.footerTaglineEn, type: "textarea" as const },
    {
      path: ["siteSettings", "officialSiteUrl"] as PathSegment[],
      label: "官网链接",
      value: settings.officialSiteUrl,
      type: "url" as const,
    },
    { path: ["siteSettings", "officialSiteLabel"] as PathSegment[], label: "官网文字", value: settings.officialSiteLabel },
    { path: ["siteSettings", "footerOfficialLogoUrl"] as PathSegment[], label: "官网图片", value: settings.footerOfficialLogoUrl },
    { path: ["siteSettings", "footerWechatIconUrl"] as PathSegment[], label: "微信图标", value: settings.footerWechatIconUrl },
  ];
  const footerQuoteFields = [
    { path: ["siteSettings", "footerQuote"] as PathSegment[], label: "最下面一行引言", value: settings.footerQuote },
    { path: ["siteSettings", "footerRightsZh"] as PathSegment[], label: "版权文字 / 中文", value: settings.footerRightsZh },
    { path: ["siteSettings", "footerRightsEn"] as PathSegment[], label: "Copyright / English", value: settings.footerRightsEn },
    { path: ["siteSettings", "footerDisclaimerLabelZh"] as PathSegment[], label: "免责声明按钮 / 中文", value: settings.footerDisclaimerLabelZh },
    { path: ["siteSettings", "footerDisclaimerLabelEn"] as PathSegment[], label: "Disclaimer label / English", value: settings.footerDisclaimerLabelEn },
    { path: ["siteSettings", "footerPublicSecurityText"] as PathSegment[], label: "公安备案文字", value: settings.footerPublicSecurityText },
    { path: ["siteSettings", "footerPublicSecurityUrl"] as PathSegment[], label: "公安备案链接", value: settings.footerPublicSecurityUrl, type: "url" as const },
    { path: ["siteSettings", "footerIcpText"] as PathSegment[], label: "ICP备案文字", value: settings.footerIcpText },
    { path: ["siteSettings", "footerIcpUrl"] as PathSegment[], label: "ICP备案链接", value: settings.footerIcpUrl, type: "url" as const },
    { path: ["siteSettings", "footerChinaIconUrl"] as PathSegment[], label: "备案图标", value: settings.footerChinaIconUrl },
  ];
  const sections =
    mode === "header"
      ? [
          { title: "标题栏左侧", fields: headerBaseFields },
          { title: "标题栏右侧", fields: headerRightFields },
        ]
      : [
          { title: "Footer 左侧", fields: footerLeftFields },
          { title: "Footer 右侧", fields: footerRightFields },
          { title: "底部引言", fields: footerQuoteFields },
        ];

  return (
    <section className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
      <div className="mb-4">
        <h3 className="text-base font-bold text-slate-950">{mode === "header" ? "Header / 标题栏" : "Footer / 页脚"}</h3>
        <p className="mt-1 text-xs text-slate-500">
          {mode === "header" ? "编辑顶部 title bar、导航和社交链接。" : "编辑页脚 Logo、官网入口和联系方式。"}
        </p>
      </div>

      <div className="space-y-4">
        {sections.map((section) => (
          <section key={section.title} className="space-y-3 rounded-[20px] border border-slate-200 bg-white p-4">
            <h4 className="text-sm font-bold text-slate-900">{section.title}</h4>
            {section.fields.map((field) => {
              const fieldKey = siteSettingsFieldKey(...field.path.slice(1));
              const uploadable = siteSettingsFieldKind(field.path.slice(1)) === "image";

              return (
                <SiteChromeInput
                  key={fieldKey}
                  fieldKey={fieldKey}
                  focused={focusedFieldKey === fieldKey}
                  label={field.label}
                  value={field.value ?? ""}
                  type={("type" in field ? field.type : undefined) as "text" | "url" | "textarea" | undefined}
                  onChange={(value) => onChange(field.path, value)}
                  uploadable={uploadable}
                  onUpload={(file) => onUpload(field.path, file)}
                />
              );
            })}
          </section>
        ))}

        {mode === "header" ? (
        <section className="space-y-3 rounded-[20px] border border-slate-200 bg-white p-4">
          <h4 className="text-sm font-bold text-slate-900">标题栏导航</h4>
          {(settings.navigation ?? []).map((item, index) => (
            <div key={item.id} className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs font-bold text-slate-500">{item.id}</p>
              {[
                { key: "labelEn", label: "English", value: item.labelEn },
                { key: "labelZh", label: "中文", value: item.labelZh },
                { key: "href", label: "链接", value: item.href, type: "url" as const },
              ].map((field) => {
                const path = ["siteSettings", "navigation", index, field.key] as PathSegment[];
                const fieldKey = siteSettingsFieldKey(...path.slice(1));
                const uploadable = siteSettingsFieldKind(path.slice(1)) === "image";

                return (
                  <SiteChromeInput
                    key={fieldKey}
                    fieldKey={fieldKey}
                    focused={focusedFieldKey === fieldKey}
                    label={field.label}
                    value={field.value ?? ""}
                    type={field.type}
                    onChange={(value) => onChange(path, value)}
                    uploadable={uploadable}
                    onUpload={(file) => onUpload(path, file)}
                  />
                );
              })}
            </div>
          ))}
        </section>
        ) : null}

        {mode === "header" ? (
        <section className="space-y-3 rounded-[20px] border border-slate-200 bg-white p-4">
          <h4 className="text-sm font-bold text-slate-900">社交链接</h4>
          {(settings.socialLinks ?? []).map((item, index) => (
            <div key={item.id} className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs font-bold text-slate-500">{item.id}</p>
              {[
                { key: "label", label: "名称", value: item.label },
                { key: "href", label: "链接", value: item.href, type: "url" as const },
                { key: "iconSrc", label: "图标地址", value: item.iconSrc },
              ].map((field) => {
                const path = ["siteSettings", "socialLinks", index, field.key] as PathSegment[];
                const fieldKey = siteSettingsFieldKey(...path.slice(1));
                const uploadable = siteSettingsFieldKind(path.slice(1)) === "image";

                return (
                  <SiteChromeInput
                    key={fieldKey}
                    fieldKey={fieldKey}
                    focused={focusedFieldKey === fieldKey}
                    label={field.label}
                    value={field.value ?? ""}
                    type={field.type}
                    onChange={(value) => onChange(path, value)}
                    uploadable={uploadable}
                    onUpload={(file) => onUpload(path, file)}
                  />
                );
              })}
            </div>
          ))}
        </section>
        ) : null}
      </div>
    </section>
  );
}

function getNextPastEventPlatformNumber(sectionsByLanguage: Partial<Record<Language, PageContentSection | undefined>>, itemIndex: number) {
  const numbers = getPastEventPlatformNumbersForDrawer(sectionsByLanguage, itemIndex);
  return (numbers[numbers.length - 1] ?? 0) + 1;
}

function getNextPastEventProgramNumber(
  sectionsByLanguage: Partial<Record<Language, PageContentSection | undefined>>,
  itemIndex: number,
  platformNumber: number,
) {
  const numbers = getPastEventProgramNumbersForDrawer(sectionsByLanguage, itemIndex, platformNumber);
  return (numbers[numbers.length - 1] ?? 0) + 1;
}

function upsertRepeaterField(
  fields: PageContentField[],
  fieldId: string,
  value: string,
  fallback: PageContentField | null,
) {
  let found = false;
  const nextFields = fields.map((field) => {
    if (field.id !== fieldId) return field;
    found = true;
    return { ...field, value };
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

function trimTrailingEmptyItems(items: string[]) {
  const nextItems = [...items];

  while (nextItems.length && !nextItems[nextItems.length - 1]?.trim()) {
    nextItems.pop();
  }

  return nextItems;
}

function upsertGeneratedEventMediaField(
  fields: PageContentField[],
  fieldId: string,
  value: string,
  fallback: PageContentField | null,
) {
  const imageMatch = fieldId.match(detailImageFieldPattern);
  const videoMatch = fieldId.match(detailVideoFieldPattern);
  const match = imageMatch ?? videoMatch;

  if (!match) return upsertRepeaterField(fields, fieldId, value, fallback);

  const legacyFieldId = imageMatch ? "detailImages" : "detailVideos";
  const legacyField = fields.find((field) => field.id === legacyFieldId);
  const mediaItems = splitDrawerList(legacyField?.value ?? "");

  mediaItems[Number(match[1]) - 1] = value.trim();

  const nextFields = upsertRepeaterField(fields, fieldId, value, fallback);
  return upsertRepeaterField(nextFields, legacyFieldId, trimTrailingEmptyItems(mediaItems).join("\n"), {
    id: legacyFieldId,
    label: legacyField?.label ?? legacyFieldId,
    kind: legacyField?.kind ?? "textarea",
    value: legacyField?.value ?? "",
  });
}

function parseSortableDate(value: string) {
  const normalized = value.trim();

  if (!normalized) return 0;

  const numericValue = normalized.replace(/\D/g, "");
  if (numericValue.length >= 8) {
    return Number(numericValue.slice(0, 8));
  }

  const directTime = Date.parse(normalized);
  if (Number.isFinite(directTime)) return directTime;

  const numericMatch = normalized.match(/(\d{4})\D+(\d{1,2})\D+(\d{1,2})/);
  if (!numericMatch) return 0;

  const [, year, month, day] = numericMatch;
  return new Date(Number(year), Number(month) - 1, Number(day)).getTime();
}

function getTodayNumericDate() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${now.getFullYear()}${month}${day}`;
}

function normalizeMatchText(value: string) {
  return value.replace(/\s+/g, " ").trim().toLowerCase();
}

function isHtmlElement(target: EventTarget | null): target is HTMLElement {
  return Boolean(
    target &&
      typeof (target as HTMLElement).closest === "function" &&
      typeof (target as HTMLElement).querySelector === "function",
  );
}

function isPreviewInteractiveControl(target: HTMLElement) {
  return Boolean(
    target.closest(
      [
        "button",
        "input",
        "textarea",
        "select",
        "option",
        "summary",
        "[role='button']",
        "[role='tab']",
        "[role='switch']",
        "[data-cms-preview-interactive='true']",
      ].join(","),
    ),
  );
}

function findEditorControl(fieldKey: string, language?: Language) {
  const controls = Array.from(
    document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
      "input[data-cms-editor-field], textarea[data-cms-editor-field]",
    ),
  );

  return (
    controls.find((control) => control.dataset.cmsEditorField === fieldKey && control.dataset.cmsEditorLanguage === language) ??
    controls.find((control) => control.dataset.cmsEditorField === fieldKey) ??
    null
  );
}

function getFieldMatchByKey(page: PageContentPage, fieldKey: string) {
  for (const section of page.sections) {
    for (const field of section.fields) {
      const currentFieldKey = puckFieldKey(section.id, field.id);

      if (currentFieldKey === fieldKey) {
        return { field, fieldKey: currentFieldKey };
      }
    }

    for (const [itemIndex, item] of (section.items ?? []).entries()) {
      for (const field of item.fields) {
        const currentFieldKey = pageContentItemFieldKey(section.id, item.id, field.id);

        if (currentFieldKey === fieldKey) {
          return {
            field,
            fieldKey: currentFieldKey,
            itemIndex,
            itemId: item.id,
            sectionId: section.id,
          };
        }
      }
    }
  }

  return null;
}

function siteSettingsFieldKey(...segments: PathSegment[]) {
  return ["siteSettings", ...segments].join("__");
}

function siteSettingsFieldLabel(path: PathSegment[]) {
  const last = String(path[path.length - 1] ?? "");
  const labels: Record<string, string> = {
    siteName: "站点名称",
    siteSubtitle: "站点副标题",
    logoUrl: "标题栏 / 页脚 Logo",
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
    footerTaglineEn: "页脚右侧正文 English",
    footerTaglineZh: "页脚右侧正文中文",
    footerAddressEn: "页脚地址 English",
    footerAddressZh: "页脚地址中文",
    footerRightsEn: "页脚版权 English",
    footerRightsZh: "页脚版权中文",
    footerDisclaimerLabelEn: "免责声明按钮 English",
    footerDisclaimerLabelZh: "免责声明按钮中文",
    footerPublicSecurityText: "公安备案文字",
    footerPublicSecurityUrl: "公安备案链接",
    footerIcpText: "ICP备案文字",
    footerIcpUrl: "ICP备案链接",
    footerWechatIconUrl: "微信图标",
    footerAddressIconUrl: "地址图标",
    footerPhoneIconUrl: "电话图标",
    footerEmailIconUrl: "邮箱图标",
    footerChinaIconUrl: "备案图标",
    href: "链接地址",
    label: "名称",
    labelEn: "英文导航文字",
    labelZh: "中文导航文字",
    iconSrc: "图标地址",
  };

  return labels[last] ?? last;
}

function siteSettingsFieldKind(path: PathSegment[]): PageContentField["kind"] {
  const last = String(path[path.length - 1] ?? "");

  if (
    last === "logoUrl" ||
    last === "iconSrc" ||
    last === "headerOfficialLogoUrl" ||
    last === "footerLeftLogoUrl" ||
    last === "footerRightLogoUrl" ||
    last === "footerOfficialLogoUrl" ||
    last === "footerWechatIconUrl" ||
    last === "footerAddressIconUrl" ||
    last === "footerPhoneIconUrl" ||
    last === "footerEmailIconUrl" ||
    last === "footerChinaIconUrl"
  ) return "image";
  if (last === "footerTaglineEn" || last === "footerTaglineZh" || last === "footerAddressEn" || last === "footerAddressZh") return "textarea";
  if (last === "officialSiteUrl" || last === "href" || last.endsWith("Url")) return "url";
  return "text";
}

function getValueAtSitePath(siteContent: SiteContent, path: PathSegment[]) {
  let value: unknown = siteContent.siteSettings;

  for (const segment of path.slice(1)) {
    if (value === null || typeof value !== "object") return "";
    value = (value as Record<string, unknown>)[String(segment)];
  }

  return typeof value === "string" ? value : "";
}

function getSiteSettingsMatchByKey(siteContent: SiteContent, fieldKey: string) {
  if (!fieldKey.startsWith("siteSettings__")) return null;

  const path = fieldKey.split("__").map((segment) => (/^\d+$/.test(segment) ? Number(segment) : segment));
  const value = getValueAtSitePath(siteContent, path);

  return {
    fieldKey,
    sitePath: path,
    field: {
      id: String(path[path.length - 1] ?? fieldKey),
      label: siteSettingsFieldLabel(path),
      kind: siteSettingsFieldKind(path),
      value,
    },
  } satisfies EditableFieldMatch;
}

function findClickedField(target: HTMLElement, page: PageContentPage, props: LivePageProps, siteContent: SiteContent) {
  const explicitFieldKey = target.closest<HTMLElement>("[data-cms-field]")?.dataset.cmsField;
  const explicitSiteFieldKey = target.closest<HTMLElement>("[data-cms-site-field]")?.dataset.cmsSiteField;
  const explicitMatch = explicitFieldKey ? getFieldMatchByKey(page, explicitFieldKey) : null;
  const explicitSiteMatch = explicitSiteFieldKey ? getSiteSettingsMatchByKey(siteContent, explicitSiteFieldKey) : null;

  if (explicitMatch) {
    return explicitMatch;
  }

  if (explicitSiteMatch) {
    return explicitSiteMatch;
  }

  const image = target.closest("img");
  const anchor = target.closest("a");
  const rawText = normalizeMatchText(target.textContent ?? "");
  const imageUrl = image ? normalizeMatchText(image.getAttribute("src") ?? image.currentSrc ?? "") : "";
  const linkUrl = anchor ? normalizeMatchText(anchor.getAttribute("href") ?? anchor.href ?? "") : "";

  const matches = page.sections.flatMap((section) =>
    [
      ...section.fields.map((field): EditableFieldMatch => ({
        field,
        fieldKey: puckFieldKey(section.id, field.id),
        sectionId: section.id,
      })),
      ...(section.items ?? []).flatMap((item, itemIndex) =>
        item.fields.map((field): EditableFieldMatch => ({
          field,
          fieldKey: pageContentItemFieldKey(section.id, item.id, field.id),
          itemIndex,
          itemId: item.id,
          sectionId: section.id,
        })),
      ),
    ],
  );

  const rankedMatches = matches
    .map((match) => {
      const rawValue = props[match.fieldKey] ?? match.field.value;
      const value = normalizeMatchText(rawValue);

      if (!value) return { match, score: 0 };

      if (match.field.kind === "image" && imageUrl && (imageUrl.includes(value) || value.includes(imageUrl))) {
        return { match, score: value.length + 2000 };
      }

      if (match.field.kind === "url" && linkUrl && (linkUrl.includes(value) || value.includes(linkUrl))) {
        return { match, score: value.length + 2000 };
      }

      if ((match.field.kind === "text" || match.field.kind === "textarea") && rawText) {
        const candidates = [value, ...value.split("\n").map(normalizeMatchText)]
          .filter(Boolean)
          .filter((item) => item.length >= 2);
        const bestLength = candidates.reduce((best, candidate) => {
          if (rawText.includes(candidate) || candidate.includes(rawText)) {
            return Math.max(best, candidate.length);
          }

          return best;
        }, 0);

        return { match, score: bestLength };
      }

      return { match, score: 0 };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  return rankedMatches[0]?.match ?? null;
}

function pageToPuckData(page: PageContentPage, language: Language): CmsPuckData {
  const props: LivePageProps = {
    id: `${language}-${page.id}-live-page`,
    pageId: page.id,
    language,
    __contentFingerprint: getPageContentFingerprint(page),
  };

  page.sections.forEach((section) => {
    section.fields.forEach((field) => {
      props[puckFieldKey(section.id, field.id)] = field.value;
    });

    if (section.items?.length) {
      props[carouselSummaryFieldKey(section.id)] = `${section.label} - ${section.items.length} items`;
    }
  });

  return {
    root: { props: {} },
    content: [
      {
        type: "Live3UiPage",
        props,
      },
    ],
    zones: {},
  };
}

function getPageContentFingerprint(page: PageContentPage) {
  return page.sections
    .map((section) => {
      const fieldValues = section.fields.map((field) => `${field.id}:${field.value}`).join("|");
      const itemValues = (section.items ?? [])
        .map((item) => `${item.id}:${item.fields.map((field) => `${field.id}:${field.value}`).join("|")}`)
        .join("||");

      return `${section.id}:${fieldValues}:${itemValues}`;
    })
    .join("\n");
}

function getSiteSettingsFingerprint(siteSettings: PublicCmsData["siteSettings"]) {
  return JSON.stringify({
    siteName: siteSettings.siteName,
    siteSubtitle: siteSettings.siteSubtitle,
    logoUrl: siteSettings.logoUrl,
    officialSiteUrl: siteSettings.officialSiteUrl,
    officialSiteLabel: siteSettings.officialSiteLabel,
    headerLanguageZhLabel: siteSettings.headerLanguageZhLabel,
    headerLanguageEnLabel: siteSettings.headerLanguageEnLabel,
    headerOfficialLogoUrl: siteSettings.headerOfficialLogoUrl,
    footerLeftLogoUrl: siteSettings.footerLeftLogoUrl,
    footerRightLogoUrl: siteSettings.footerRightLogoUrl,
    footerOfficialLogoUrl: siteSettings.footerOfficialLogoUrl,
    footerEmail: siteSettings.footerEmail,
    footerPhone: siteSettings.footerPhone,
    footerQuote: siteSettings.footerQuote,
    footerTaglineEn: siteSettings.footerTaglineEn,
    footerTaglineZh: siteSettings.footerTaglineZh,
    footerAddressEn: siteSettings.footerAddressEn,
    footerAddressZh: siteSettings.footerAddressZh,
    footerRightsEn: siteSettings.footerRightsEn,
    footerRightsZh: siteSettings.footerRightsZh,
    footerDisclaimerLabelEn: siteSettings.footerDisclaimerLabelEn,
    footerDisclaimerLabelZh: siteSettings.footerDisclaimerLabelZh,
    footerPublicSecurityText: siteSettings.footerPublicSecurityText,
    footerPublicSecurityUrl: siteSettings.footerPublicSecurityUrl,
    footerIcpText: siteSettings.footerIcpText,
    footerIcpUrl: siteSettings.footerIcpUrl,
    footerWechatIconUrl: siteSettings.footerWechatIconUrl,
    footerAddressIconUrl: siteSettings.footerAddressIconUrl,
    footerPhoneIconUrl: siteSettings.footerPhoneIconUrl,
    footerEmailIconUrl: siteSettings.footerEmailIconUrl,
    footerChinaIconUrl: siteSettings.footerChinaIconUrl,
    navigation: siteSettings.navigation,
    socialLinks: siteSettings.socialLinks,
  });
}

function getLivePageProps(data: CmsPuckData): LivePageProps {
  return (data.content.find((item) => item.type === "Live3UiPage")?.props ?? {}) as LivePageProps;
}

function updatePuckDataProp(data: CmsPuckData, propKey: string, value: string): CmsPuckData {
  return {
    ...data,
    content: data.content.map((item) =>
      item.type === "Live3UiPage"
        ? {
            ...item,
            props: {
              ...item.props,
              [propKey]: value,
            },
          }
        : item,
    ),
  };
}

function applyPuckPropsToPageContent(
  current: PageContentState,
  language: Language,
  pageId: VisualPage,
  props: LivePageProps,
) {
  const currentPage = current[language]?.[pageId];

  if (!currentPage) return current;

  const nextSections = currentPage.sections.map((section) => ({
    ...section,
    fields: section.fields.map((field) => {
      const nextValue = props[puckFieldKey(section.id, field.id)];
      return typeof nextValue === "string" ? { ...field, value: nextValue } : field;
    }),
  }));

  return {
    ...current,
    [language]: {
      ...current[language],
      [pageId]: {
        ...currentPage,
        sections: nextSections,
      },
    },
    updatedAt: new Date().toISOString(),
  };
}

function applyPuckDataToPageContent(
  current: PageContentState,
  language: Language,
  pageId: VisualPage,
  data: CmsPuckData,
) {
  return applyPuckPropsToPageContent(current, language, pageId, getLivePageProps(data));
}

function getInitialPuckData(
  pageContent: PageContentState,
  language: Language,
  pageId: VisualPage,
) {
  return pageToPuckData(pageContent[language][pageId], language);
}

function serializePuckData(data: CmsPuckData): PuckSerializedData {
  return data as unknown as PuckSerializedData;
}

function PreviewPageFrame({ page, subpage }: { page: VisualPage; subpage: SubpageSelection | null }) {
  if (subpage?.page === "event") return <EventDetailPage slug={subpage.slug} />;
  if (subpage?.page === "media") return <IndustryDetailPage slug={subpage.slug} />;
  if (subpage?.page === "podcast") {
    const profile = getTeamProfile(subpage.slug) ?? createEmptyTeamProfile(subpage.slug);
    return <TeamProfilePage profile={profile} />;
  }

  if (page === "home") return <HomePage />;
  if (page === "coreValue") return <CoreValuePage />;
  if (page === "about" || page === "awards") return <AboutPage />;
  if (page === "event") return <EventsPage />;
  if (page === "media") return <IndustriesPage />;
  if (page === "podcast") return <TeamPage />;
  return <ContactPage />;
}

function pageItems(previewData: PublicCmsData, language: Language, pageId: VisualPage, sectionId: string) {
  return getPageContentSectionItems(previewData.pageContent, language, pageId, sectionId);
}

function homeHonorItemId(year: string, index: number, date: string) {
  return `${year}-${index + 1}-${date || "award"}`;
}

function homeHonorItemIds(honors: OfficialCmsPublicState["content"]["honors"]) {
  return honors.flatMap((year) => year.awards.map((award, index) => homeHonorItemId(year.year, index, award.date)));
}

function normalizeIndustrySlugFromValue(value: string) {
  const withoutFragment = String(value ?? "").trim().split("#")[0] ?? "";
  const withoutQuery = withoutFragment.split("?")[0] ?? "";
  const industryPathMatch = withoutQuery.match(/(?:^|\/)industries\/([^/]+)$/);
  const slug = industryPathMatch?.[1] ?? withoutQuery;

  return slug.replace(/^\/+|\/+$/g, "");
}

function syncIndustriesFromPageContent(previewData: PublicCmsData, officialSiteState: OfficialCmsPublicState) {
  const enItems = pageItems(previewData, "en", "home", "industries");
  const zhItems = pageItems(previewData, "zh", "home", "industries");
  const sourceItems = enItems.length ? enItems : pageItems(previewData, "en", "media", "cards");
  const enDetailItems = pageItems(previewData, "en", "media", "detailPages");
  const zhDetailItems = pageItems(previewData, "zh", "media", "detailPages");

  if (!sourceItems.length) {
    return officialSiteState.lists.industries;
  }

  const seenSlugs = new Set<string>();

  return sourceItems
    .map((item, index) => {
      const zhItem = zhItems[index] ?? pageItems(previewData, "zh", "media", "cards")[index];
      const fallback = officialSiteState.lists.industries[index];
      const slug = normalizeIndustrySlugFromValue(getPageContentItemField(item, "slug", fallback?.slug ?? item.id));
      const href = getPageContentItemField(item, "href", slug ? `/industries/${slug}` : fallback?.slug ?? "");
      const hrefSlug = normalizeIndustrySlugFromValue(href) || slug;
      const uniqueSlug = hrefSlug || `industry-${index + 1}`;
      const enDetailItem = enDetailItems.find((detailItem) => getPageContentItemField(detailItem, "slug", detailItem.id) === uniqueSlug);
      const zhDetailItem = zhDetailItems.find((detailItem) => getPageContentItemField(detailItem, "slug", detailItem.id) === uniqueSlug);

      return {
        slug: uniqueSlug,
        name: getPageContentItemField(item, "title", fallback?.name ?? item.label),
        zhName: getPageContentItemField(zhItem, "title", fallback?.zhName ?? fallback?.name ?? item.label),
        img: getPageContentItemField(enDetailItem, "image", getPageContentItemField(item, "image", fallback?.img ?? "")),
        cls: getPageContentItemField(item, "layoutClass", fallback?.cls ?? ""),
        intro: getPageContentItemField(enDetailItem, "intro", getPageContentItemField(item, "description", fallback?.intro ?? "")),
        zhIntro: getPageContentItemField(zhDetailItem, "intro", getPageContentItemField(zhItem, "description", fallback?.zhIntro ?? "")),
        sections: getPageContentItemField(enDetailItem, "sections", fallback?.sections ?? ""),
        zhSections: getPageContentItemField(zhDetailItem, "sections", fallback?.zhSections ?? ""),
      };
    })
    .filter((item) => {
      if (seenSlugs.has(item.slug)) return false;
      seenSlugs.add(item.slug);
      return true;
    });
}

function syncClientLogosFromPageContent(previewData: PublicCmsData, officialSiteState: OfficialCmsPublicState) {
  const logos = pageItems(previewData, "en", "home", "clients")
    .map((item) => getPageContentItemField(item, "logo", ""))
    .filter(Boolean);

  return logos.length ? logos : officialSiteState.lists.clientLogos;
}

function syncHomeEventsFromPageContent(
  previewData: PublicCmsData,
  officialSiteState: OfficialCmsPublicState,
  language: Language = "en",
) {
  const enItems = pageItems(previewData, "en", "home", "events");
  const zhItems = pageItems(previewData, "zh", "home", "events");
  const enListItems = pageItems(previewData, "en", "event", "list");
  const zhListItems = pageItems(previewData, "zh", "event", "list");
  const enDetailItems = pageItems(previewData, "en", "event", "detailPages");
  const zhDetailItems = pageItems(previewData, "zh", "event", "detailPages");
  const slugs = enItems.map((item) => getPageContentItemField(item, "slug", item.id)).filter(Boolean);
  const listSlugs = enListItems.map((item) => getPageContentItemField(item, "slug", item.id)).filter(Boolean);
  const overrides = { ...officialSiteState.events.overrides };
  const homeOverrides = { ...(officialSiteState.home.eventOverrides ?? {}) };

  [...enItems, ...enListItems].forEach((item, index) => {
    const isListItem = index >= enItems.length;
    const localIndex = isListItem ? index - enItems.length : index;
    const slug = isListItem ? listSlugs[localIndex] : slugs[localIndex];
    const zhItem = isListItem ? zhListItems[localIndex] : zhItems[localIndex];

    if (!slug) return;

    const targetOverrides = isListItem ? overrides : homeOverrides;
    const existingOverride = targetOverrides[slug];
    const sortDate = getPageContentItemField(
      item,
      "sortDate",
      getPageContentItemField(item, "date", existingOverride?.sortDate ?? ""),
    );

    targetOverrides[slug] = {
      ...existingOverride,
      ...(sortDate ? { sortDate } : {}),
      image: getPageContentItemField(item, "image", existingOverride?.image ?? ""),
      ...(isListItem ? {} : { href: getPageContentItemField(item, "href", existingOverride?.href ?? "") }),
      en: {
        ...existingOverride?.en,
        displayDate: getPageContentItemField(item, "displayDate", existingOverride?.en?.displayDate ?? ""),
        category: getPageContentItemField(item, "category", existingOverride?.en?.category ?? ""),
        title: getPageContentItemField(item, "title", existingOverride?.en?.title ?? ""),
        summary: getPageContentItemField(item, "summary", existingOverride?.en?.summary ?? ""),
      },
      zh: {
        ...existingOverride?.zh,
        displayDate: getPageContentItemField(zhItem, "displayDate", existingOverride?.zh?.displayDate ?? ""),
        category: getPageContentItemField(zhItem, "category", existingOverride?.zh?.category ?? ""),
        title: getPageContentItemField(zhItem, "title", existingOverride?.zh?.title ?? ""),
        summary: getPageContentItemField(zhItem, "summary", existingOverride?.zh?.summary ?? ""),
      },
    };
  });

  enDetailItems.forEach((item, index) => {
    const slug = getPageContentItemField(item, "slug", item.id);
    const zhItem = zhDetailItems[index];

    if (!slug) return;

    const primaryMediaItem = language === "zh" ? zhItem : item;
    const secondaryMediaItem = language === "zh" ? item : zhItem;
    const detailImages = collectMergedNumberedDetailMedia(primaryMediaItem, secondaryMediaItem, "detailImages", detailImageFieldPattern);
    const detailVideos = collectMergedNumberedDetailMedia(primaryMediaItem, secondaryMediaItem, "detailVideos", detailVideoFieldPattern);
    const existingOverride = overrides[slug];
    const sortDate = getPageContentItemField(
      item,
      "sortDate",
      getPageContentItemField(item, "date", existingOverride?.sortDate ?? ""),
    );

    overrides[slug] = {
      ...existingOverride,
      ...(sortDate ? { sortDate } : {}),
      detailImages: detailImages.length ? detailImages : existingOverride?.detailImages,
      detailVideos: detailVideos.length ? detailVideos : existingOverride?.detailVideos,
      en: {
        ...existingOverride?.en,
        displayDate: getPageContentItemField(item, "displayDate", existingOverride?.en?.displayDate ?? ""),
        content: splitTextareaList(getPageContentItemField(item, "content", "")),
      },
      zh: {
        ...existingOverride?.zh,
        displayDate: getPageContentItemField(zhItem, "displayDate", existingOverride?.zh?.displayDate ?? ""),
        content: splitTextareaList(getPageContentItemField(zhItem, "content", "")),
      },
    };
  });

  return {
    eventSlugs: slugs.length ? slugs : officialSiteState.home.eventSlugs,
    homeOverrides,
    listSlugs: listSlugs.length ? listSlugs : officialSiteState.lists.eventSlugs,
    overrides,
  };
}

function collectNumberedDetailMedia(item: PageContentRepeaterItem | undefined, legacyFieldId: string, pattern: RegExp) {
  if (!item) return [];

  const list = getPageContentItemField(item, legacyFieldId, "")
    .split(/\r?\n/)
    .map((value) => value.trim());

  item.fields.forEach((field) => {
    const match = field.id.match(pattern);
    if (!match) return;

    list[Number(match[1]) - 1] = field.value.trim();
  });

  return trimTrailingEmptyItems(list);
}

function collectMergedNumberedDetailMedia(
  primaryItem: PageContentRepeaterItem | undefined,
  secondaryItem: PageContentRepeaterItem | undefined,
  legacyFieldId: string,
  pattern: RegExp,
) {
  const primary = collectNumberedDetailMedia(primaryItem, legacyFieldId, pattern);
  const secondary = collectNumberedDetailMedia(secondaryItem, legacyFieldId, pattern);
  const size = Math.max(primary.length, secondary.length);

  return trimTrailingEmptyItems(Array.from({ length: size }, (_, index) => primary[index] || secondary[index] || ""));
}

function syncHonorsFromPageContent(previewData: PublicCmsData, officialSiteState: OfficialCmsPublicState) {
  const aboutEnItems = pageItems(previewData, "en", "about", "honors");
  const aboutZhItems = pageItems(previewData, "zh", "about", "honors");
  const enItems = aboutEnItems;
  const zhItems = aboutZhItems;

  if (!enItems.length) {
    return officialSiteState.content.honors;
  }

  const groups = new Map<string, NonNullable<OfficialCmsPublicState["content"]["honors"]>[number]>();

  enItems.forEach((item, index) => {
    const zhItem = zhItems[index];
    const year = getPageContentItemField(item, "year", "2026");
    const group =
      groups.get(year) ??
      ({
        year,
        count: { en: "", zh: "" },
        awards: [],
      } satisfies OfficialCmsPublicState["content"]["honors"][number]);

    group.awards.push({
      title: {
        en: getPageContentItemField(item, "title", item.label),
        zh: getPageContentItemField(zhItem, "title", item.label),
      },
      date: getPageContentItemField(item, "date", getPageContentItemField(zhItem, "date", "")),
      body: {
        en: getPageContentItemField(item, "body", ""),
        zh: getPageContentItemField(zhItem, "body", ""),
      },
      href: getPageContentItemField(item, "href", ""),
    });

    group.count = {
      en: `${group.awards.length} Honors`,
      zh: `${group.awards.length}项荣誉`,
    };
    groups.set(year, group);
  });

  officialSiteState.content.honors.forEach((existingYear) => {
    const group = groups.get(existingYear.year);

    if (!group) {
      groups.set(existingYear.year, existingYear);
      return;
    }

    const seen = new Set(group.awards.map((award) => `${award.date}::${award.title.en}::${award.title.zh}`.toLowerCase()));
    const missingAwards = existingYear.awards.filter(
      (award) => !seen.has(`${award.date}::${award.title.en}::${award.title.zh}`.toLowerCase()),
    );

    if (missingAwards.length) {
      group.awards = [...group.awards, ...missingAwards];
      group.count = {
        en: `${group.awards.length} Honors`,
        zh: `${group.awards.length}项荣誉`,
      };
    }
  });

  return Array.from(groups.values()).sort((a, b) => Number(b.year) - Number(a.year));
}

function syncHomeHonorListsFromPageContent(previewData: PublicCmsData, officialSiteState: OfficialCmsPublicState) {
  const homeItems = pageItems(previewData, "en", "home", "honors");
  const validItemIds = new Set(homeHonorItemIds(officialSiteState.content.honors));
  const homeHonorItems = homeItems.map((item) => item.id).filter((id) => validItemIds.has(id));
  const yearSet = new Set(
    homeItems
      .map((item) => getPageContentItemField(item, "year", ""))
      .filter(Boolean),
  );

  return {
    homeHonorItems: homeHonorItems.length ? homeHonorItems : officialSiteState.lists.homeHonorItems,
    homeHonorYears: yearSet.size ? Array.from(yearSet) : officialSiteState.lists.homeHonorYears,
  };
}

const chronicleMonthNumbers: Record<string, number> = {
  jan: 1,
  january: 1,
  feb: 2,
  february: 2,
  mar: 3,
  march: 3,
  apr: 4,
  april: 4,
  may: 5,
  jun: 6,
  june: 6,
  jul: 7,
  july: 7,
  aug: 8,
  august: 8,
  sep: 9,
  sept: 9,
  september: 9,
  oct: 10,
  october: 10,
  nov: 11,
  november: 11,
  dec: 12,
  december: 12,
  一月: 1,
  二月: 2,
  三月: 3,
  四月: 4,
  五月: 5,
  六月: 6,
  七月: 7,
  八月: 8,
  九月: 9,
  十月: 10,
  十一月: 11,
  十二月: 12,
};

function inferChronicleYear(item: PageContentRepeaterItem, zhItem?: PageContentRepeaterItem) {
  const candidates = [
    getPageContentItemField(item, "year", ""),
    zhItem ? getPageContentItemField(zhItem, "year", "") : "",
    item.id,
    item.label,
    zhItem?.id ?? "",
    zhItem?.label ?? "",
    getPageContentItemField(item, "month", ""),
    zhItem ? getPageContentItemField(zhItem, "month", "") : "",
    getPageContentItemField(item, "text", ""),
    zhItem ? getPageContentItemField(zhItem, "text", "") : "",
  ];

  for (const candidate of candidates) {
    const match = String(candidate ?? "").match(/\b(19\d{2}|20\d{2})\b/);
    if (match?.[1]) return match[1];
  }

  return String(new Date().getFullYear());
}

function getChronicleMonthNumber(value: string) {
  const normalized = value.trim().toLowerCase();

  if (!normalized) return 0;

  const yearMonthMatch = normalized.match(/\b(?:19\d{2}|20\d{2})\D+(0?[1-9]|1[0-2])\b/);
  if (yearMonthMatch?.[1]) return Number(yearMonthMatch[1]);

  const numericMonthMatch = normalized.match(/(?:^|[^\d])(0?[1-9]|1[0-2])\s*月/);
  if (numericMonthMatch?.[1]) return Number(numericMonthMatch[1]);

  for (const [key, monthNumber] of Object.entries(chronicleMonthNumbers)) {
    if (normalized.includes(key)) return monthNumber;
  }

  return 0;
}

function sortChronicleEvents<T extends { month: { en: string; zh: string } }>(events: T[]) {
  return [...events].sort((left, right) => {
    const leftMonth = Math.max(getChronicleMonthNumber(left.month.en), getChronicleMonthNumber(left.month.zh));
    const rightMonth = Math.max(getChronicleMonthNumber(right.month.en), getChronicleMonthNumber(right.month.zh));
    return rightMonth - leftMonth;
  });
}

function sortChronicleYears<T extends { year: string; events: Array<{ month: { en: string; zh: string } }> }>(years: T[]) {
  return years
    .map((year) => ({ ...year, events: sortChronicleEvents(year.events) }))
    .sort((left, right) => Number(right.year) - Number(left.year));
}

function syncChronicleFromPageContent(previewData: PublicCmsData, officialSiteState: OfficialCmsPublicState) {
  const enItems = pageItems(previewData, "en", "about", "chronicle");
  const zhItems = pageItems(previewData, "zh", "about", "chronicle");

  if (!enItems.length) {
    return sortChronicleYears(officialSiteState.content.chronicle);
  }

  const groups = new Map<string, NonNullable<OfficialCmsPublicState["content"]["chronicle"]>[number]>();

  enItems.forEach((item, index) => {
    const zhItem = zhItems[index];
    const year = inferChronicleYear(item, zhItem);
    const side = getPageContentItemField(item, "side", getPageContentItemField(zhItem, "side", "left")) === "right" ? "right" : "left";
    const group =
      groups.get(year) ??
      ({
        year,
        events: [],
      } satisfies OfficialCmsPublicState["content"]["chronicle"][number]);

    group.events.push({
      month: {
        en: getPageContentItemField(item, "month", ""),
        zh: getPageContentItemField(zhItem, "month", getPageContentItemField(item, "month", "")),
      },
      side,
      text: {
        en: getPageContentItemField(item, "text", ""),
        zh: getPageContentItemField(zhItem, "text", getPageContentItemField(item, "text", "")),
      },
    });
    groups.set(year, group);
  });

  officialSiteState.content.chronicle.forEach((existingYear) => {
    const group = groups.get(existingYear.year);

    if (!group) {
      groups.set(existingYear.year, { ...existingYear, events: sortChronicleEvents(existingYear.events) });
      return;
    }

    const seen = new Set(group.events.map((event) => `${event.month.en}::${event.month.zh}::${event.text.en}::${event.text.zh}`.toLowerCase()));
    const missingEvents = existingYear.events.filter(
      (event) => !seen.has(`${event.month.en}::${event.month.zh}::${event.text.en}::${event.text.zh}`.toLowerCase()),
    );

    if (missingEvents.length) {
      group.events = [...group.events, ...missingEvents];
    }
  });

  return sortChronicleYears(Array.from(groups.values()));
}

function splitTextareaList(value: string) {
  return value
    .split(/\n+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function syncTeamProfilesFromPageContent(previewData: PublicCmsData, officialSiteState: OfficialCmsPublicState) {
  const enItems = pageItems(previewData, "en", "podcast", "memberProfiles");
  const zhItems = pageItems(previewData, "zh", "podcast", "memberProfiles");

  if (!enItems.length) {
    return {
      profiles: officialSiteState.content.teamProfiles,
      partnerSlugs: officialSiteState.lists.partnerSlugs,
      seniorAssociateSlugs: officialSiteState.lists.seniorAssociateSlugs,
    };
  }

  const profiles = { ...officialSiteState.content.teamProfiles };
  const partnerSlugs: string[] = [...officialSiteState.lists.partnerSlugs];
  const seniorAssociateSlugs: string[] = [...officialSiteState.lists.seniorAssociateSlugs];
  const zhItemsBySlug = new Map(zhItems.map((item) => [getPageContentItemField(item, "slug", item.id), item]));

  enItems.forEach((item, index) => {
    const slug = getPageContentItemField(item, "slug", item.id);
    const zhItem = zhItemsBySlug.get(slug) ?? zhItems[index];
    const title = getPageContentItemField(item, "title", "");

    if (!slug) return;

    profiles[slug] = {
      ...profiles[slug],
      slug,
      name: getPageContentItemField(item, "name", ""),
      zhName: getPageContentItemField(zhItem, "name", ""),
      title,
      zhTitle: getPageContentItemField(zhItem, "title", ""),
      image: getPageContentItemField(item, "image", ""),
      phone: getPageContentItemField(item, "phone", ""),
      email: getPageContentItemField(item, "email", ""),
      serviceIndustries: splitTextareaList(getPageContentItemField(item, "serviceIndustries", "")),
      zhServiceIndustries: splitTextareaList(getPageContentItemField(zhItem, "serviceIndustries", "")),
      education: getPageContentItemField(item, "education", ""),
      zhEducation: getPageContentItemField(zhItem, "education", ""),
      qualification: getPageContentItemField(item, "qualification", ""),
      zhQualification: getPageContentItemField(zhItem, "qualification", ""),
      languages: splitTextareaList(getPageContentItemField(item, "languages", "")),
      zhLanguages: splitTextareaList(getPageContentItemField(zhItem, "languages", "")),
      socialEngagements: getPageContentItemField(item, "socialEngagements", ""),
      zhSocialEngagements: getPageContentItemField(zhItem, "socialEngagements", ""),
      practiceArea: getPageContentItemField(item, "practiceArea", ""),
      zhPracticeArea: getPageContentItemField(zhItem, "practiceArea", ""),
      practiceExperience: getPageContentItemField(item, "practiceExperience", ""),
      zhPracticeExperience: getPageContentItemField(zhItem, "practiceExperience", ""),
      honors: splitTextareaList(getPageContentItemField(item, "honors", "")),
      zhHonors: splitTextareaList(getPageContentItemField(zhItem, "honors", "")),
      achievements: splitTextareaList(getPageContentItemField(item, "achievements", "")),
      zhAchievements: splitTextareaList(getPageContentItemField(zhItem, "achievements", "")),
    };

    const zhTitle = getPageContentItemField(zhItem, "title", "");

    if (/senior associate|资深律师/i.test(`${title} ${zhTitle}`)) {
      if (!seniorAssociateSlugs.includes(slug)) seniorAssociateSlugs.push(slug);
      const partnerIndex = partnerSlugs.indexOf(slug);
      if (partnerIndex >= 0) partnerSlugs.splice(partnerIndex, 1);
    } else {
      if (!partnerSlugs.includes(slug)) partnerSlugs.push(slug);
      const seniorIndex = seniorAssociateSlugs.indexOf(slug);
      if (seniorIndex >= 0) seniorAssociateSlugs.splice(seniorIndex, 1);
    }
  });

  return { profiles, partnerSlugs, seniorAssociateSlugs };
}

function getSubpageSectionId(page: VisualPage) {
  if (page === "event") return "detailPages";
  if (page === "media") return "detailPages";
  if (page === "podcast") return "memberProfiles";
  return null;
}

function getSubpageOptions(pageContent: PageContentState, page: VisualPage, language: Language) {
  const sectionId = getSubpageSectionId(page);

  if (!sectionId) return [];

  const detailOptions = getPageContentSectionItems(pageContent, language, page, sectionId).map((item, index) => ({
    sectionId,
    itemIndex: index,
    slug: getPageContentItemField(item, "slug", item.id),
    label: getPageContentItemField(item, "title", getPageContentItemField(item, "name", item.label)),
  }));

  if (page === "podcast") {
    const detailSlugs = new Set(detailOptions.map((item) => item.slug));
    const listOnlyOptions = ["partners", "seniorAssociates"].flatMap((listSectionId) =>
      getPageContentSectionItems(pageContent, language, page, listSectionId)
        .map((item) => ({
          sectionId,
          itemIndex: -1,
          slug: getPageContentItemField(item, "slug", item.id),
          label: getPageContentItemField(item, "name", getPageContentItemField(item, "title", item.label)),
        }))
        .filter((item) => item.slug && !detailSlugs.has(item.slug)),
    );

    return [...detailOptions, ...listOnlyOptions];
  }

  if (page === "media") {
    const detailSlugs = new Set(detailOptions.map((item) => item.slug));
    const cardOnlyOptions = getPageContentSectionItems(pageContent, language, page, "cards")
      .map((item) => ({
        sectionId,
        itemIndex: -1,
        slug: getPageContentItemField(item, "slug", item.id),
        label: getPageContentItemField(item, "title", getPageContentItemField(item, "name", item.label)),
      }))
      .filter((item) => item.slug && !detailSlugs.has(item.slug));

    return [...detailOptions, ...cardOnlyOptions];
  }

  if (page !== "event") return detailOptions;

  const detailSlugs = new Set(detailOptions.map((item) => item.slug));
  const listOnlyOptions = getPageContentSectionItems(pageContent, language, page, "list")
    .map((item) => ({
      sectionId,
      itemIndex: -1,
      slug: getPageContentItemField(item, "slug", item.id),
      label: getPageContentItemField(item, "title", getPageContentItemField(item, "name", item.label)),
    }))
    .filter((item) => item.slug && !detailSlugs.has(item.slug));

  return [...detailOptions, ...listOnlyOptions];
}

function isUploadableDrawerField(fieldId: string, kind: PageContentField["kind"]) {
  const normalized = fieldId.toLowerCase();
  return kind === "image" || normalized.includes("image") || normalized.includes("video") || normalized.includes("logo");
}

function uploadAcceptForField(fieldId: string) {
  return fieldId.toLowerCase().includes("video") ? "video/*" : "image/*";
}

function uploadLabelForField(fieldId: string) {
  return fieldId.toLowerCase().includes("video") ? "上传视频" : "上传图片";
}

function shouldAppendUploadedAsset(fieldId: string) {
  const normalized = fieldId.toLowerCase();
  return normalized.endsWith("images") || normalized.endsWith("videos");
}

function officialPreviewState(
  previewData: PublicCmsData,
  officialSiteState: OfficialCmsPublicState | null,
  language: Language = "en",
): OfficialCmsPublicState {
  const previewState: OfficialCmsPublicState = {
    version: 1,
    updatedAt: previewData.pageContent.updatedAt,
    header: {
      siteName: previewData.siteSettings.siteName || "Tiger Partners",
      siteSubtitle: previewData.siteSettings.siteSubtitle || "Law Firm",
      languageZhLabel: previewData.siteSettings.headerLanguageZhLabel || "CN",
      languageEnLabel: previewData.siteSettings.headerLanguageEnLabel || "EN",
      officialSiteUrl: previewData.siteSettings.officialSiteUrl || "https://www.tigerpartners.cn",
      officialSiteLabel: previewData.siteSettings.officialSiteLabel || "www.tigerpartners.cn",
      officialLogoUrl: previewData.siteSettings.headerOfficialLogoUrl || "",
      navigation: (previewData.siteSettings.navigation ?? [])
        .filter((item) => item.visible !== false)
        .map((item) => ({
          id: item.id,
          href: item.href,
          labelZh: item.labelZh,
          labelEn: item.labelEn,
          visible: item.visible,
          order: item.order,
        })),
      socialLinks: (previewData.siteSettings.socialLinks ?? [])
        .filter((item) => item.visible !== false)
        .map((item) => ({
          id: item.id,
          label: item.label,
          href: item.href,
          iconSrc: item.iconSrc,
          visible: item.visible,
          order: item.order,
        })),
    },
    assets: {
      titleLogo: previewData.siteSettings.logoUrl || "/assets/title/logo.svg",
      footerLogo: previewData.siteSettings.footerLeftLogoUrl || "/assets/foot/logo.svg",
      footerQr: previewData.siteSettings.footerOfficialLogoUrl || "/assets/foot/QRcode.png?v=202605101205",
    },
    footer: {
      phone: previewData.siteSettings.footerPhone || "010-85885228",
      email: previewData.siteSettings.footerEmail || "contact@tigerpartners.cn",
      tagline: {
        en: previewData.siteSettings.footerTaglineEn || previewData.siteSettings.footerQuote || "WE KNOW HOW TO WIN",
        zh: previewData.siteSettings.footerTaglineZh || previewData.siteSettings.footerQuote || "WE KNOW HOW TO WIN",
      },
      address: {
        en: previewData.siteSettings.footerAddressEn || "",
        zh: previewData.siteSettings.footerAddressZh || "",
      },
      rights: {
        en: previewData.siteSettings.footerRightsEn || "All Rights Reserved \u00a9 2019 Tiger Partners",
        zh: previewData.siteSettings.footerRightsZh || "\u7248\u6743\u6240\u6709\u00a9 2019 \u864e\u8bc9\u5f8b\u5e08\u4e8b\u52a1\u6240",
      },
      disclaimerLabel: {
        en: previewData.siteSettings.footerDisclaimerLabelEn || "Disclaimer and Privacy",
        zh: previewData.siteSettings.footerDisclaimerLabelZh || "Disclaimer and Privacy",
      },
      publicSecurityText: previewData.siteSettings.footerPublicSecurityText || "\u4eac\u516c\u7f51\u5b89\u5907 11010502052714\u53f7",
      publicSecurityUrl: previewData.siteSettings.footerPublicSecurityUrl || "https://beian.mps.gov.cn/#/query/webSearch",
      icpText: previewData.siteSettings.footerIcpText || "\u4eacICP\u590720002490\u53f7",
      icpUrl: previewData.siteSettings.footerIcpUrl || "https://beian.miit.gov.cn/#/Integrated/index",
      wechatIcon: previewData.siteSettings.footerWechatIconUrl || "/assets/foot/weixin.png",
      addressIcon: previewData.siteSettings.footerAddressIconUrl || "/assets/foot/address.png",
      phoneIcon: previewData.siteSettings.footerPhoneIconUrl || "/assets/foot/phone.png",
      emailIcon: previewData.siteSettings.footerEmailIconUrl || "/assets/foot/email.png",
      chinaIcon: previewData.siteSettings.footerChinaIconUrl || "/assets/foot/china.png",
    },
    home: {
      heroTitle: {
        en:
          getPageContentField(previewData.pageContent, "en", "home", "hero", "title", "") ||
          "WE KNOW HOW TO WIN",
        zh:
          getPageContentField(previewData.pageContent, "zh", "home", "hero", "title", "") ||
          "WE KNOW HOW TO WIN",
      },
      heroVideo:
        getPageContentField(previewData.pageContent, "en", "home", "hero", "video", "") ||
        "/assets/home/娴锋氮0508.mp4",
      eventSlugs: [
        "kinsey-kang-hong-kong-legal-counsel",
        "official-account-mini-program-upgrade",
        "benchmark-litigation-2022-dispute-resolution",
        "civil-code-contract-termination-rules-part-one",
        "wuhan-kingold-fake-gold-jurisdiction-objection",
      ],
      eventOverrides: {},
    },
    events: {
      overrides: {},
    },
    content: {
      honors: [],
      chronicle: [],
      teamProfiles: {},
    },
    lists: {
      industries: [],
      eventSlugs: [],
      clientLogos: [],
      homeHonorYears: [],
      homeHonorItems: [],
      honorYears: [],
      chronicleYears: [],
      partnerSlugs: [],
      seniorAssociateSlugs: [],
    },
  };

  const sourceOfficialState = officialSiteState ?? previewState;
  const sourceHeader = sourceOfficialState.header ?? previewState.header;
  const syncedHomeEvents = syncHomeEventsFromPageContent(previewData, sourceOfficialState, language);
  const syncedHonors = syncHonorsFromPageContent(previewData, sourceOfficialState);
  const syncedHomeHonors = syncHomeHonorListsFromPageContent(previewData, sourceOfficialState);
  const syncedChronicle = syncChronicleFromPageContent(previewData, sourceOfficialState);
  const syncedTeam = syncTeamProfilesFromPageContent(previewData, sourceOfficialState);

  return {
    ...sourceOfficialState,
    header: {
      ...sourceHeader,
      ...previewState.header,
      navigation: previewState.header.navigation.length
        ? previewState.header.navigation
        : sourceHeader.navigation,
      socialLinks: previewState.header.socialLinks.length
        ? previewState.header.socialLinks
        : sourceHeader.socialLinks,
    },
    assets: {
      ...sourceOfficialState.assets,
      titleLogo: previewState.assets.titleLogo || sourceOfficialState.assets.titleLogo,
      footerLogo: previewState.assets.footerLogo || sourceOfficialState.assets.footerLogo,
      footerQr: previewState.assets.footerQr || sourceOfficialState.assets.footerQr,
    },
    footer: {
      ...sourceOfficialState.footer,
      phone: previewState.footer.phone || sourceOfficialState.footer.phone,
      email: previewState.footer.email || sourceOfficialState.footer.email,
      tagline: {
        ...sourceOfficialState.footer.tagline,
        ...previewState.footer.tagline,
      },
      address: {
        ...sourceOfficialState.footer.address,
        ...previewState.footer.address,
      },
      rights: {
        ...sourceOfficialState.footer.rights,
        ...previewState.footer.rights,
      },
      disclaimerLabel: {
        ...sourceOfficialState.footer.disclaimerLabel,
        ...previewState.footer.disclaimerLabel,
      },
      publicSecurityText: previewState.footer.publicSecurityText || sourceOfficialState.footer.publicSecurityText,
      publicSecurityUrl: previewState.footer.publicSecurityUrl || sourceOfficialState.footer.publicSecurityUrl,
      icpText: previewState.footer.icpText || sourceOfficialState.footer.icpText,
      icpUrl: previewState.footer.icpUrl || sourceOfficialState.footer.icpUrl,
      wechatIcon: previewState.footer.wechatIcon || sourceOfficialState.footer.wechatIcon,
      addressIcon: previewState.footer.addressIcon || sourceOfficialState.footer.addressIcon,
      phoneIcon: previewState.footer.phoneIcon || sourceOfficialState.footer.phoneIcon,
      emailIcon: previewState.footer.emailIcon || sourceOfficialState.footer.emailIcon,
      chinaIcon: previewState.footer.chinaIcon || sourceOfficialState.footer.chinaIcon,
    },
    home: {
      ...sourceOfficialState.home,
      heroTitle: {
        en: previewState.home.heroTitle.en || sourceOfficialState.home.heroTitle.en,
        zh: previewState.home.heroTitle.zh || sourceOfficialState.home.heroTitle.zh,
      },
      heroVideo: previewState.home.heroVideo || sourceOfficialState.home.heroVideo,
      eventSlugs: syncedHomeEvents.eventSlugs,
      eventOverrides: syncedHomeEvents.homeOverrides,
    },
    events: {
      ...sourceOfficialState.events,
      overrides: syncedHomeEvents.overrides,
    },
    content: {
      ...sourceOfficialState.content,
      honors: syncedHonors,
      chronicle: syncedChronicle,
      teamProfiles: syncedTeam.profiles,
    },
    lists: {
      ...sourceOfficialState.lists,
      industries: syncIndustriesFromPageContent(previewData, sourceOfficialState),
      eventSlugs: syncedHomeEvents.listSlugs,
      clientLogos: syncClientLogosFromPageContent(previewData, sourceOfficialState),
      homeHonorYears: syncedHomeHonors.homeHonorYears,
      homeHonorItems: syncedHomeHonors.homeHonorItems,
      honorYears: syncedHonors.length ? syncedHonors.map((item) => item.year) : sourceOfficialState.lists.honorYears,
      chronicleYears: syncedChronicle.length ? syncedChronicle.map((item) => item.year) : sourceOfficialState.lists.chronicleYears,
      partnerSlugs: syncedTeam.partnerSlugs,
      seniorAssociateSlugs: syncedTeam.seniorAssociateSlugs,
    },
    previewPageContent: previewData.pageContent,
  } as OfficialCmsPublicState;
}

function stripPreviewOnlyCmsState(state: OfficialCmsPublicState): OfficialCmsPublicState {
  return {
    version: state.version,
    updatedAt: state.updatedAt,
    header: state.header,
    assets: state.assets,
    footer: state.footer,
    home: state.home,
    events: state.events,
    content: state.content,
    lists: state.lists,
    previewPageContent: state.previewPageContent,
  };
}

function createPuckConfig({
  activePage,
  labelPage,
  activeLanguage,
  previewDevice,
  previewRefreshKey,
  previewData,
  officialSiteState,
  subpage,
  siteContent,
  onFieldClick,
  onOpenCarouselDrawer,
}: {
  activePage: PageContentPage;
  labelPage: PageContentPage;
  activeLanguage: Language;
  previewDevice: CmsPreviewDevice;
  previewRefreshKey: number;
  previewData: PublicCmsData;
  officialSiteState: OfficialCmsPublicState | null;
  subpage: SubpageSelection | null;
  siteContent: SiteContent;
  onFieldClick: (match: EditableFieldMatch) => void;
  onOpenCarouselDrawer: (sectionId: string) => void;
}) {
  const livePageFields: Record<string, unknown> = {};
  const labelSectionMap = new Map(labelPage.sections.map((section) => [section.id, section]));

  activePage.sections.forEach((section) => {
    const labelSection = labelSectionMap.get(section.id);
    const labelFieldMap = new Map(labelSection?.fields.map((field) => [field.id, field]) ?? []);

    section.fields.forEach((field) => {
      const labelField = labelFieldMap.get(field.id);

      livePageFields[puckFieldKey(section.id, field.id)] = {
        type: field.kind === "textarea" ? "textarea" : "text",
        label: `${labelSection?.label ?? section.label} - ${labelField?.label ?? field.label}`,
      };
    });

    if (section.items?.length) {
      livePageFields[carouselSummaryFieldKey(section.id)] = {
        type: "custom",
        label: `${labelSection?.label ?? section.label} - 内容管理`,
        render: () => (
          <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div>
              <p className="text-sm font-semibold text-slate-900">{labelSection?.label ?? section.label}</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                当前内容共 {getSectionItemCount(section)} 条。右侧只保留简介，完整内容在抽屉里增删改。
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenCarouselDrawer(section.id)}
              className="w-full rounded-xl bg-[#2563eb] px-3 py-2 text-xs font-bold text-white transition hover:bg-[#1d4ed8]"
            >
              管理内容
            </button>
          </div>
        ),
      };
    }
  });

  return {
    root: {
      render: ({ children }) => children,
    },
    categories: {
      page: {
        title: "当前页面",
        components: ["Live3UiPage"],
        defaultExpanded: true,
      },
    },
    components: {
      Live3UiPage: {
        label: "真实 3.0UI 页面",
        fields: {
          pageId: { type: "text", label: "页面 ID", visible: false },
          language: { type: "text", label: "内容语言", visible: false },
          __contentFingerprint: { type: "text", label: "Content fingerprint", visible: false },
          ...livePageFields,
        },
        defaultProps: {
          id: `${activeLanguage}-${activePage.id}-live-page`,
          pageId: activePage.id,
          language: activeLanguage,
          __contentFingerprint: getPageContentFingerprint(activePage),
        },
        render: (props) => {
          const pageId = activePage.id;
          const language = activeLanguage;
          const pageContent = applyPuckPropsToPageContent(previewData.pageContent, language, pageId, props);
          const publicData: PublicCmsData = {
            ...previewData,
            pageContent,
          };
          const device = previewDeviceOptions.find((item) => item.id === previewDevice) ?? previewDeviceOptions[0];

          return (
            <div
              className="cms-puck-preview relative min-h-screen w-full bg-[#0f172a]"
              data-device={previewDevice}
              style={
                {
                  "--cms-device-width": `${device.width}px`,
                  "--cms-desktop-zoom": "1.03",
                } as CSSProperties
              }
            >
              <style>{`
                .cms-puck-preview {
                  container-type: inline-size;
                  min-height: 100vh;
                  overflow: visible;
                }

                .cms-puck-device-stage {
                  display: flex;
                  min-height: 100vh;
                  justify-content: flex-start;
                  align-items: flex-start;
                  padding: 0;
                  overflow: visible;
                }

                .cms-puck-device-shell {
                  position: relative;
                  width: 100%;
                  min-height: 100vh;
                  flex: 0 0 auto;
                  overflow: visible;
                  background: #111827;
                  transform-origin: top center;
                }

                .cms-puck-preview[data-device="desktop"] .cms-puck-device-shell {
                  border-radius: 0;
                  zoom: var(--cms-desktop-zoom);
                }

                .cms-puck-preview[data-device="mobile"] .cms-puck-device-stage {
                  justify-content: center;
                }

                .cms-puck-preview[data-device="mobile"] .cms-puck-device-stage {
                  min-height: 100vh;
                  padding: 20px;
                }

                .cms-puck-preview[data-device="mobile"] .cms-puck-device-shell {
                  width: var(--cms-device-width);
                  min-height: 844px;
                  overflow: hidden;
                  border: 10px solid #0b1120;
                  border-radius: 36px;
                  background: #111827;
                  box-shadow: 0 20px 70px rgba(15, 23, 42, 0.5);
                  zoom: min(1, calc((100cqw - 40px) / var(--cms-device-width)));
                }

                .cms-puck-preview [data-cms-field],
                .cms-puck-preview [data-cms-site-field] {
                  cursor: pointer;
                  outline: 0 solid transparent;
                  outline-offset: 6px;
                  transition: outline-color 160ms ease, background-color 160ms ease;
                }

                .cms-puck-preview [data-cms-field]:hover,
                .cms-puck-preview [data-cms-site-field]:hover {
                  outline: 2px solid rgba(37, 99, 235, 0.9);
                  background-color: rgba(37, 99, 235, 0.08);
                }

                .cms-puck-preview .pointer-events-none [data-cms-field],
                .cms-puck-preview .pointer-events-none [data-cms-site-field] {
                  pointer-events: auto;
                }

                [data-puck-overlay],
                [data-puck-overlay-portal],
                [data-puck-overlay-portal] * {
                  display: none !important;
                  pointer-events: none !important;
                }
              `}</style>
              <div
                className="cms-puck-device-stage"
                onClick={(event: ReactMouseEvent<HTMLDivElement>) => {
                  const target = event.target;

                  if (!isHtmlElement(target)) return;
                  if (isPreviewInteractiveControl(target)) return;

                  const match = findClickedField(target, pageContent[language][pageId], props, siteContent);

                  if (!match) return;

                  event.preventDefault();
                  event.stopPropagation();
                  event.nativeEvent.stopImmediatePropagation?.();
                  onFieldClick(match);
                }}
              >
                <div className="cms-puck-device-shell">
                  <OfficialPublicCmsProvider
                    key={`${language}-${pageId}-${subpage?.slug ?? "index"}-${previewRefreshKey}`}
                    initialState={resolvePublicAssetUrls(officialPreviewState(publicData, officialSiteState, language))}
                    fetchOnMount={false}
                  >
                    <OfficialLanguageProvider key={`${language}-${pageId}`} initialLanguage={language} persist={false}>
                      <PreviewLanguageSync language={language} />
                      <PreviewPageFrame page={pageId} subpage={subpage} />
                    </OfficialLanguageProvider>
                  </OfficialPublicCmsProvider>
                </div>
              </div>
            </div>
          );
        },
      },
    },
  } as Config<CmsPuckComponents>;
}

export function CmsPuckVisualEditor({
  siteContent,
  visualEditor,
  pageContent,
  officialSiteState,
  setOfficialSiteState,
  setVisualEditor,
  setPageContent,
  updateSiteContent,
  activeLanguage,
  setActiveLanguage,
  articles,
  caseStudies,
  mediaItems,
  podcastEpisodes,
  assets,
  versions,
  editingVersionId,
  submitVersionDraft,
  setPanel,
  persistWorkspace,
  setMessage,
}: {
  siteContent: SiteContent;
  visualEditor: VisualEditorState;
  pageContent: PageContentState;
  officialSiteState: OfficialCmsPublicState | null;
  setOfficialSiteState: Dispatch<SetStateAction<OfficialCmsPublicState | null>>;
  setVisualEditor: (updater: (current: VisualEditorState) => VisualEditorState) => void;
  setPageContent: Dispatch<SetStateAction<PageContentState>>;
  activeLanguage: Language;
  setActiveLanguage: Dispatch<SetStateAction<Language>>;
  updateSiteContent: (path: PathSegment[], value: EditorValue) => void;
  updatePageContent: (path: PathSegment[], value: EditorValue) => void;
  addSiteContentItem: (path: PathSegment[]) => void;
  removeSiteContentItem: (path: PathSegment[], index: number) => void;
  articles: CmsArticle[];
  caseStudies: CmsCaseStudy[];
  mediaItems: CmsMediaItem[];
  podcastEpisodes: CmsPodcastEpisode[];
  assets: CmsAsset[];
  versions: CmsVersionSnapshot[];
  editingVersionId: number | null;
  submitVersionDraft: (
    versionId: number,
    nextState?: { siteContent?: SiteContent; visualEditor?: VisualEditorState; pageContent?: PageContentState; officialSiteState?: OfficialCmsPublicState | null },
  ) => Promise<boolean>;
  setPanel: (panel: StudioPanel) => void;
  persistWorkspace: (nextState?: {
    siteContent?: SiteContent;
    visualEditor?: VisualEditorState;
    pageContent?: PageContentState;
  }) => Promise<boolean>;
  setMessage: (message: string) => void;
}) {
  const [page, setPage] = useState<VisualEditorTab>("home");
  const [puckData, setPuckData] = useState<CmsPuckData>(() =>
    getInitialPuckData(pageContent, activeLanguage, "home"),
  );
  const puckDispatchRef = useRef<PuckDispatch | null>(null);
  const puckDataRef = useRef(puckData);
  const lastSyncedOfficialStateRef = useRef("");
  const [focusedFieldKey, setFocusedFieldKey] = useState<string | null>(null);
  const [previewDevice, setPreviewDevice] = useState<CmsPreviewDevice>("desktop");
  const [previewRefreshKey, setPreviewRefreshKey] = useState(0);
  const previewRefreshTimerRef = useRef<number | null>(null);
  const skipNextPuckSyncRef = useRef(false);
  const ignorePuckChangeUntilRef = useRef(0);
  const [carouselDrawer, setCarouselDrawer] = useState<CarouselDrawerState | null>(null);
  const [expandedCarouselItems, setExpandedCarouselItems] = useState<Record<string, boolean>>({});
  const [subpageSelection, setSubpageSelection] = useState<SubpageSelection | null>(null);
  const [selectedHomeHonorSourceId, setSelectedHomeHonorSourceId] = useState("");
  const editorLanguages = ["en", "zh"] as Language[];

  useEffect(() => {
    puckDataRef.current = puckData;
  }, [puckData]);

  useEffect(() => {
    const eventPrototype = Event.prototype as Event & { getModifierState?: unknown };

    if (typeof eventPrototype.getModifierState !== "function") {
      Object.defineProperty(Event.prototype, "getModifierState", {
        configurable: true,
        value: () => false,
      });
    }

    const ensureModifierState = (event: Event) => {
      const eventWithModifier = event as Event & { getModifierState?: unknown };

      if (typeof eventWithModifier.getModifierState !== "function") {
        Object.defineProperty(event, "getModifierState", {
          configurable: true,
          value: () => false,
        });
      }
    };

    document.addEventListener("keydown", ensureModifierState, true);
    document.addEventListener("keyup", ensureModifierState, true);

    return () => {
      document.removeEventListener("keydown", ensureModifierState, true);
      document.removeEventListener("keyup", ensureModifierState, true);
    };
  }, []);
  const previewPage: VisualPage = isVisualPageTab(page) ? page : "home";
  const activeSubpage = subpageSelection?.page === previewPage ? subpageSelection : null;
  const isSiteChromeTab = page === "header" || page === "footer";
  const activeTabLabel = pageTabs.find((tab) => tab.id === page)?.label ?? pageContent.zh[previewPage].label;
  const activePage = pageContent[activeLanguage][previewPage];
  const activePagesByLanguage = {
    zh: pageContent.zh[previewPage],
    en: pageContent.en[previewPage],
  } satisfies Record<Language, PageContentPage>;
  const labelPage = pageContent.zh[previewPage];
  const basePreviewData: PublicCmsData = useMemo(
    () => ({
      siteSettings: siteContent.siteSettings,
      visualEditor,
      pageContent,
      articles,
      caseStudies,
      mediaItems,
      podcastEpisodes,
      assets,
    }),
    [articles, assets, caseStudies, mediaItems, pageContent, podcastEpisodes, siteContent.siteSettings, visualEditor],
  );
  const [debouncedPreviewData, setDebouncedPreviewData] = useState<PublicCmsData>(basePreviewData);
  const [debouncedSiteContent, setDebouncedSiteContent] = useState<SiteContent>(siteContent);

  const syncOfficialStateFromPageContent = (nextPageContent: PageContentState, nextVisualEditor = visualEditor) => {
    setOfficialSiteState((current) => {
      if (!current) return current;

      const nextState = officialPreviewState(
        {
          ...basePreviewData,
          visualEditor: nextVisualEditor,
          pageContent: nextPageContent,
        },
        current,
        activeLanguage,
      );
      const fingerprint = JSON.stringify({
        homeEventSlugs: nextState.home.eventSlugs,
        listEventSlugs: nextState.lists.eventSlugs,
        eventOverrides: nextState.events.overrides,
        homeEventOverrides: nextState.home.eventOverrides,
        industries: nextState.lists.industries,
        honors: nextState.content.honors,
        chronicle: nextState.content.chronicle,
        partnerSlugs: nextState.lists.partnerSlugs,
        seniorAssociateSlugs: nextState.lists.seniorAssociateSlugs,
        teamProfiles: nextState.content.teamProfiles,
        clientLogos: nextState.lists.clientLogos,
      });

      if (fingerprint === lastSyncedOfficialStateRef.current) return current;
      lastSyncedOfficialStateRef.current = fingerprint;

      return nextState;
    });
  };

  const scheduleOfficialStateSync = (nextPageContent: PageContentState, nextVisualEditor = visualEditor) => {
    window.setTimeout(() => syncOfficialStateFromPageContent(nextPageContent, nextVisualEditor), 0);
  };

  const updatePageContentState = (updater: (current: PageContentState) => PageContentState) => {
    setPageContent((current) => {
      const nextPageContent = updater(current);
      scheduleOfficialStateSync(nextPageContent);
      return nextPageContent;
    });
  };

  useEffect(() => {
    syncOfficialStateFromPageContent(pageContent);
  }, [activeLanguage, basePreviewData, pageContent]);

  const activeCarouselSectionsByLanguage = carouselDrawer
    ? ({
        zh: pageContent.zh[previewPage].sections.find((section) => section.id === carouselDrawer.sectionId),
        en: pageContent.en[previewPage].sections.find((section) => section.id === carouselDrawer.sectionId),
      } satisfies Partial<Record<Language, PageContentSection | undefined>>)
    : {};
  const activeCarouselSection = activeCarouselSectionsByLanguage.zh ?? activeCarouselSectionsByLanguage.en;
  const isChronicleDrawer = previewPage === "about" && activeCarouselSection?.id === "chronicle";
  const homeHonorSourceItems = useMemo(
    () =>
      (officialSiteState?.content.honors ?? []).flatMap((year) =>
        year.awards.map((award, index) => ({
          id: homeHonorItemId(year.year, index, award.date),
          year: year.year,
          award,
        })),
      ),
    [officialSiteState],
  );
  const getLocalizedCarouselItemIndex = (language: Language, fallbackIndex: number, slug?: string) => {
    const items = activeCarouselSectionsByLanguage[language]?.items;

    if (!slug || !items?.length) return fallbackIndex;

    const matchedIndex = items.findIndex((item) => getPageContentItemField(item, "slug", item.id) === slug);

    return matchedIndex >= 0 ? matchedIndex : fallbackIndex;
  };
  const activeSectionHasDate = editorLanguages.some((language) => {
    const section = activeCarouselSectionsByLanguage[language];
    return section ? sectionHasDateItems(section) : false;
  });
  const drawerItemRows = useMemo(() => {
    const maxLength = Math.max(
      activeCarouselSectionsByLanguage.zh?.items?.length ?? 0,
      activeCarouselSectionsByLanguage.en?.items?.length ?? 0,
    );
    const rows = Array.from({ length: maxLength }, (_, itemIndex) => {
      const zhItem = activeCarouselSectionsByLanguage.zh?.items?.[itemIndex];
      const enItem = activeCarouselSectionsByLanguage.en?.items?.[itemIndex];
      const zhSlug = zhItem ? getPageContentItemField(zhItem, "slug", zhItem.id) : "";
      const enSlug = enItem ? getPageContentItemField(enItem, "slug", enItem.id) : "";
      const rowSlug =
        carouselDrawer?.slug && (zhSlug === carouselDrawer.slug || enSlug === carouselDrawer.slug)
          ? carouselDrawer.slug
          : zhSlug || enSlug || undefined;

      return { itemIndex, rowSlug };
    });

    if (previewPage !== "about" || activeCarouselSection?.id !== "chronicle") {
      return rows;
    }

    return [...rows].sort((left, right) => {
      const leftEn = activeCarouselSectionsByLanguage.en?.items?.[left.itemIndex];
      const leftZh = activeCarouselSectionsByLanguage.zh?.items?.[left.itemIndex];
      const rightEn = activeCarouselSectionsByLanguage.en?.items?.[right.itemIndex];
      const rightZh = activeCarouselSectionsByLanguage.zh?.items?.[right.itemIndex];
      const leftItem = leftEn ?? leftZh;
      const rightItem = rightEn ?? rightZh;
      const leftYear = leftItem ? Number(inferChronicleYear(leftItem, leftZh)) : 0;
      const rightYear = rightItem ? Number(inferChronicleYear(rightItem, rightZh)) : 0;
      const leftMonth = Math.max(
        getChronicleMonthNumber(leftEn ? getPageContentItemField(leftEn, "month", "") : ""),
        getChronicleMonthNumber(leftZh ? getPageContentItemField(leftZh, "month", "") : ""),
      );
      const rightMonth = Math.max(
        getChronicleMonthNumber(rightEn ? getPageContentItemField(rightEn, "month", "") : ""),
        getChronicleMonthNumber(rightZh ? getPageContentItemField(rightZh, "month", "") : ""),
      );

      return rightYear - leftYear || rightMonth - leftMonth || left.itemIndex - right.itemIndex;
    });
  }, [
    activeCarouselSection?.id,
    activeCarouselSectionsByLanguage.en,
    activeCarouselSectionsByLanguage.zh,
    carouselDrawer?.slug,
    previewPage,
  ]);
  const activeVersion = editingVersionId ? versions.find((version) => version.id === editingVersionId) : null;
  const subpageOptions = isVisualPageTab(page) ? getSubpageOptions(pageContent, previewPage, activeLanguage) : [];

  useEffect(() => {
    if (previewRefreshTimerRef.current) {
      window.clearTimeout(previewRefreshTimerRef.current);
    }

    previewRefreshTimerRef.current = window.setTimeout(() => {
      setDebouncedPreviewData(basePreviewData);
      setDebouncedSiteContent(siteContent);
      setPreviewRefreshKey((current) => current + 1);
      previewRefreshTimerRef.current = null;
    }, visualPreviewRefreshDelayMs);

    return () => {
      if (previewRefreshTimerRef.current) {
        window.clearTimeout(previewRefreshTimerRef.current);
        previewRefreshTimerRef.current = null;
      }
    };
  }, [basePreviewData, siteContent]);

  const scrollEditorFieldIntoView = (fieldKey: string, language: Language = activeLanguage, delay = 140) => {
    window.setTimeout(() => {
      const editorControl = findEditorControl(fieldKey, language);

      editorControl?.focus({ preventScroll: true });
      editorControl?.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
    }, delay);
  };
  const updateSiteSettingField = (path: PathSegment[], value: string) => {
    updateSiteContent(path, value);
  };
  const uploadSiteSettingAsset = async (path: PathSegment[], file: File) => {
    const fieldName = String(path[path.length - 1] ?? "");
    const page = fieldName.startsWith("footer") ? "footer" : "title";
    const formData = new FormData();

    formData.append("file", file);
    formData.append("page", page);

    const response = await fetch("/api/cms/assets", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      setMessage(`上传失败：${file.name}`);
      return;
    }

    const payload = (await response.json()) as { assets: CmsAsset[] };
    const uploaded = payload.assets.find((asset) => asset.originalName === file.name) ?? payload.assets[0];

    if (!uploaded?.url) {
      setMessage(`上传完成，但未获取到文件地址：${file.name}`);
      return;
    }

    updateSiteSettingField(path, uploaded.url);
    setMessage(`已上传并写入 Logo：${resolvePublicAssetUrl(uploaded.url)}`);
  };
  const updatePageField = (language: Language, sectionId: string, fieldId: string, value: string) => {
    if (!isVisualPageTab(page)) return;
    const pageId = page;
    const propKey = puckFieldKey(sectionId, fieldId);

    skipNextPuckSyncRef.current = true;
    ignorePuckChangeUntilRef.current = Date.now() + 800;

    if (language === activeLanguage && pageId === previewPage) {
      const nextData = updatePuckDataProp(puckDataRef.current, propKey, value);
      puckDataRef.current = nextData;
      setPuckData(nextData);
      window.setTimeout(() => {
        puckDispatchRef.current?.({
          type: "setData",
          data: nextData,
          recordHistory: false,
        });
      }, 0);
    }

    updatePageContentState((current) => {
      const currentPage = current[language][pageId];

      return {
        ...current,
        [language]: {
          ...current[language],
          [pageId]: {
            ...currentPage,
            sections: currentPage.sections.map((section) =>
              section.id === sectionId
                ? {
                    ...section,
                    fields: section.fields.map((field) => (field.id === fieldId ? { ...field, value } : field)),
                  }
                : section,
            ),
          },
        },
        updatedAt: new Date().toISOString(),
      };
    });
  };

  const uploadPageFieldAsset = async (language: Language, sectionId: string, fieldId: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("page", previewPage);

    const response = await fetch("/api/cms/assets", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      setMessage(`上传失败：${file.name}`);
      return;
    }

    const payload = (await response.json()) as { assets: CmsAsset[] };
    const uploaded = payload.assets.find((asset) => asset.originalName === file.name) ?? payload.assets[0];

    if (!uploaded?.url) {
      setMessage(`上传完成，但未获取到文件地址：${file.name}`);
      return;
    }

    updatePageField(language, sectionId, fieldId, uploaded.url);
    setMessage(`已上传并写入字段：${resolvePublicAssetUrl(uploaded.url)}`);
  };

  const updateCarouselItems = (
    language: Language,
    sectionId: string,
    updater: (items: PageContentRepeaterItem[], section: PageContentSection) => PageContentRepeaterItem[],
  ) => {
    if (!isVisualPageTab(page)) return;
    const pageId = page;

    skipNextPuckSyncRef.current = true;
    updatePageContentState((current) => {
      const currentPage = current[language][pageId];

      return {
        ...current,
        [language]: {
          ...current[language],
          [pageId]: {
            ...currentPage,
            sections: currentPage.sections.map((section) =>
              section.id === sectionId ? { ...section, items: updater(section.items ?? [], section) } : section,
            ),
          },
        },
        updatedAt: new Date().toISOString(),
      };
    });
  };
  const createChronicleEventItem = (
    language: Language,
    year: string,
    itemId: string,
  ): PageContentRepeaterItem => ({
    id: itemId,
    label: language === "zh" ? `${year} 事件` : `${year} Event`,
    fields: [
      { id: "year", label: language === "zh" ? "年份" : "Year", kind: "text", value: year },
      { id: "month", label: language === "zh" ? "月份" : "Month", kind: "text", value: language === "zh" ? "1月" : "JANUARY" },
      { id: "side", label: language === "zh" ? "左右位置" : "Side", kind: "text", value: "left" },
      { id: "text", label: language === "zh" ? "正文" : "Text", kind: "textarea", value: "" },
    ],
  });
  const getChronicleDrawerYears = () => {
    const years = new Set<string>();

    editorLanguages.forEach((language) => {
      activeCarouselSectionsByLanguage[language]?.items?.forEach((item, index) => {
        years.add(inferChronicleYear(item, activeCarouselSectionsByLanguage.zh?.items?.[index]));
      });
    });

    return years;
  };
  const getNextChronicleDrawerYear = () => {
    const numericYears = Array.from(getChronicleDrawerYears())
      .map((year) => Number(year))
      .filter(Number.isFinite);

    return String(numericYears.length ? Math.max(...numericYears) + 1 : new Date().getFullYear());
  };
  const addChronicleEventToYear = (year: string, options: { prepend?: boolean } = {}) => {
    const targetYear = String(year || getNextChronicleDrawerYear()).trim() || String(new Date().getFullYear());
    const nextId = `chronicle-${targetYear}-${Date.now()}`;
    let drawerIndex = 0;

    editorLanguages.forEach((language) => {
      updateCarouselItems(language, "chronicle", (items) => {
        const lastSameYearIndex = items.reduce((matchedIndex, item, index) => {
          const zhItemAtIndex = activeCarouselSectionsByLanguage.zh?.items?.[index];
          return inferChronicleYear(item, zhItemAtIndex) === targetYear ? index : matchedIndex;
        }, -1);
        const insertIndex = options.prepend ? 0 : lastSameYearIndex >= 0 ? lastSameYearIndex + 1 : 0;
        const nextItem = createChronicleEventItem(language, targetYear, nextId);

        if (language === "zh") {
          drawerIndex = insertIndex;
        }

        return [...items.slice(0, insertIndex), nextItem, ...items.slice(insertIndex)];
      });
    });

    setCarouselDrawer({ sectionId: "chronicle", itemIndex: drawerIndex, slug: nextId });
    setExpandedCarouselItems((current) => ({
      ...current,
      [`chronicle-${nextId}`]: true,
    }));
  };
  const addChronicleYear = () => {
    addChronicleEventToYear(getNextChronicleDrawerYear(), { prepend: true });
  };
  const addHomeHonorSourceItem = () => {
    const source = homeHonorSourceItems.find((item) => item.id === selectedHomeHonorSourceId);

    if (!source) return;

    editorLanguages.forEach((language) => {
      updateCarouselItems(language, "honors", (items) => {
        if (items.some((item) => item.id === source.id)) return items;

        const isZh = language === "zh";

        return [
          ...items,
          {
            id: source.id,
            label: isZh ? source.award.title.zh : source.award.title.en,
            fields: [
              { id: "year", label: isZh ? "年份" : "Year", kind: "text", value: source.year },
              { id: "date", label: isZh ? "日期" : "Date", kind: "text", value: source.award.date },
              { id: "title", label: isZh ? "标题" : "Title", kind: "textarea", value: isZh ? source.award.title.zh : source.award.title.en },
              { id: "body", label: isZh ? "正文" : "Body", kind: "textarea", value: isZh ? source.award.body.zh : source.award.body.en },
              { id: "href", label: isZh ? "链接" : "Link", kind: "url", value: source.award.href ?? "" },
            ],
          },
        ];
      });
    });

    setSelectedHomeHonorSourceId("");
  };
  const updateCarouselItemField = (
    language: Language,
    sectionId: string,
    itemIndex: number,
    fieldId: string,
    value: string,
    fallback: PageContentField | null = null,
  ) => {
  const sourceItem = pageContent[language][previewPage].sections
    .find((section) => section.id === sectionId)
    ?.items?.[itemIndex];
  const sourceSlug =
    previewPage === "event" && sourceItem && (sectionId === "list" || sectionId === "detailPages")
      ? getPageContentItemField(sourceItem, "slug", sourceItem.id)
      : "";
  const syncEventSlug =
    previewPage === "event" && (sectionId === "list" || sectionId === "detailPages") && fieldId === "slug";
  const targetLanguages =
    syncEventSlug || (sectionId === "detailPages" && isGeneratedEventMediaField(fieldId)) ? editorLanguages : [language];

  targetLanguages.forEach((targetLanguage) => {
    updateCarouselItems(targetLanguage, sectionId, (items) =>
      items.map((item, index) => {
        const targetIndex = sourceSlug
          ? items.findIndex((candidate) => getPageContentItemField(candidate, "slug", candidate.id) === sourceSlug)
          : itemIndex;
        const effectiveItemIndex = targetIndex >= 0 ? targetIndex : itemIndex;

        return index === effectiveItemIndex
            ? {
                ...item,
                fields:
                  sectionId === "detailPages" && isGeneratedEventMediaField(fieldId)
                    ? upsertGeneratedEventMediaField(item.fields, fieldId, value, fallback)
                    : upsertRepeaterField(item.fields, fieldId, value, fallback),
              }
            : item;
      }),
    );
  });
  };
  const uploadCarouselItemAsset = async (
    language: Language,
    sectionId: string,
    itemIndex: number,
    fieldId: string,
    file: File,
    fallback: PageContentField,
  ) => {
    const formData = new FormData();
    const uploadPage = sectionId === "list" || previewPage === "event" ? "event" : previewPage;

    formData.append("file", file);
    formData.append("page", uploadPage);

    const response = await fetch("/api/cms/assets", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      setMessage(`上传失败：${file.name}`);
      return;
    }

    const payload = (await response.json()) as { assets: CmsAsset[] };
    const uploaded = payload.assets.find((asset) => asset.originalName === file.name) ?? payload.assets[0];

    if (!uploaded?.url) {
      setMessage(`上传完成，但未获取到文件地址：${file.name}`);
      return;
    }

    const currentItem = pageContent[language][previewPage].sections
      .find((section) => section.id === sectionId)
      ?.items?.[itemIndex];
    const currentValue =
      getPageContentItemField(currentItem, fieldId, "") || getGeneratedEventMediaValue(currentItem, fieldId);
    const nextValue = shouldAppendUploadedAsset(fieldId)
      ? [currentValue.trim(), uploaded.url].filter(Boolean).join("\n")
      : uploaded.url;

    updateCarouselItemField(language, sectionId, itemIndex, fieldId, nextValue, fallback);
    setMessage(`已上传并写入字段：${resolvePublicAssetUrl(uploaded.url)}`);
  };
  const addPastEventPlatform = (sectionId: string, itemIndex: number) => {
    const platformNumber = getNextPastEventPlatformNumber(activeCarouselSectionsByLanguage, itemIndex);

    editorLanguages.forEach((language) => {
      updateCarouselItems(language, sectionId, (items) =>
        items.map((item, index) =>
          index === itemIndex
            ? {
                ...item,
                fields: [...item.fields, ...createPastEventPlatformFields(platformNumber, language)],
              }
            : item,
        ),
      );
    });
  };
  const removePastEventPlatform = (sectionId: string, itemIndex: number, platformNumber: number) => {
    editorLanguages.forEach((language) => {
      updateCarouselItems(language, sectionId, (items) =>
        items.map((item, index) =>
          index === itemIndex
            ? {
                ...item,
                fields: item.fields.filter((field) => getPastEventPlatformNumber(field.id) !== platformNumber),
              }
            : item,
        ),
      );
    });
  };
  const addPastEventProgram = (sectionId: string, itemIndex: number, platformNumber: number) => {
    const programNumber = getNextPastEventProgramNumber(activeCarouselSectionsByLanguage, itemIndex, platformNumber);

    editorLanguages.forEach((language) => {
      updateCarouselItems(language, sectionId, (items) =>
        items.map((item, index) =>
          index === itemIndex
            ? {
                ...item,
                fields: [...item.fields, ...createPastEventProgramFields(platformNumber, programNumber, language)],
              }
            : item,
        ),
      );
    });
  };
  const removePastEventProgram = (
    sectionId: string,
    itemIndex: number,
    platformNumber: number,
    programNumber: number,
  ) => {
    editorLanguages.forEach((language) => {
      updateCarouselItems(language, sectionId, (items) =>
        items.map((item, index) =>
          index === itemIndex
            ? {
                ...item,
                fields: item.fields.filter((field) => getPastEventProgramNumber(field.id, platformNumber) !== programNumber),
              }
            : item,
        ),
      );
    });
  };
  const addCarouselItem = (section: PageContentSection) => {
    const nextId = `${section.id}-${Date.now()}`;
    const today = getTodayNumericDate();
    const nextItemIndex = Math.max(
      activeCarouselSectionsByLanguage.zh?.items?.length ?? 0,
      activeCarouselSectionsByLanguage.en?.items?.length ?? 0,
    );
    const createFallbackField = (
      fields: PageContentField[],
      id: string,
      label: string,
      kind: PageContentField["kind"],
      value = "",
    ) => {
      if (fields.some((field) => field.id === id)) return fields;

      return [...fields, { id, label, kind, value }];
    };
    const createNewFields = (
      template: PageContentRepeaterItem | undefined,
      localizedSection: PageContentSection,
      nextIndex: number,
      language: Language,
    ) => {
      const eventListTitle = language === "zh" ? "新动态" : "New Event";
      let fields =
        template?.fields.map((field) => ({
          ...field,
          label: field.label.replace(/\d+/g, String(nextIndex)),
          value:
            field.id === "slug"
              ? nextId
              : field.id === "sortDate" || field.id === "date"
                ? today
                : field.id === "displayDate"
                  ? today
                  : previewPage === "event" && section.id === "list" && field.id === "title"
                    ? eventListTitle
                  : "",
        })) ?? [];

      if (previewPage === "event" && section.id === "list") {
        fields = createFallbackField(fields, "slug", "Slug", "text", nextId);
        fields = createFallbackField(fields, "image", "Thumbnail image", "image");
        fields = createFallbackField(fields, "sortDate", "Sort date", "text", today);
        fields = createFallbackField(fields, "displayDate", "Display date", "text", today);
        fields = createFallbackField(fields, "category", "Category", "text");
        fields = createFallbackField(fields, "title", "Title", "textarea", eventListTitle);
        fields = createFallbackField(fields, "summary", "Summary", "textarea");
      }

      if (previewPage === "home" && section.id === "events") {
        fields = fields.filter((field) => homeEventSlideFields.some((item) => item.fieldId === field.id));
        fields = createFallbackField(fields, "slug", "Slide slug", "text", nextId);
        fields = createFallbackField(fields, "image", "Slide image", "image");
        fields = createFallbackField(fields, "displayDate", "Display date", "text", today);
        fields = createFallbackField(fields, "category", "Category", "text");
        fields = createFallbackField(fields, "title", "Title", "textarea", `${localizedSection.label} ${nextIndex}`);
        fields = createFallbackField(fields, "summary", "Slide summary", "textarea");
        fields = createFallbackField(fields, "href", "Click link", "url", "/events");
      }

      if (previewPage === "event" && section.id === "detailPages") {
        fields = createFallbackField(fields, "slug", "Slug", "text", nextId);
        fields = createFallbackField(fields, "sortDate", "Sort date", "text", today);
        fields = createFallbackField(fields, "displayDate", "Display date", "text", today);
        fields = createFallbackField(fields, "category", "Category", "text");
        fields = createFallbackField(fields, "title", "Detail title", "textarea", `${localizedSection.label} ${nextIndex}`);
        fields = createFallbackField(fields, "summary", "Detail summary", "textarea");
        fields = createFallbackField(fields, "content", "Detail content", "textarea");
        fields = createFallbackField(fields, "detailImage1", "Detail image 1", "image");
        fields = createFallbackField(fields, "detailVideo1", "Detail video 1", "url");
      }

      if (previewPage === "media" && section.id === "detailPages") {
        fields = createFallbackField(fields, "slug", "Slug", "text", nextId);
        fields = createFallbackField(fields, "title", "Detail title", "text", `${localizedSection.label} ${nextIndex}`);
        fields = createFallbackField(fields, "image", "Hero image", "image");
        fields = createFallbackField(fields, "intro", "Detail intro", "textarea");
        fields = createFallbackField(fields, "sections", "Detail cards", "textarea");
      }

      if (previewPage === "podcast" && (section.id === "partners" || section.id === "seniorAssociates")) {
        fields = createFallbackField(fields, "slug", "Slug", "text", nextId);
        fields = createFallbackField(fields, "image", "Thumbnail", "image");
        fields = createFallbackField(fields, "name", "Name", "text", `${localizedSection.label} ${nextIndex}`);
        fields = createFallbackField(fields, "title", "Title", "text", section.id === "partners" ? "Partner" : "Senior Associate");
        fields = createFallbackField(fields, "ctaLabel", "CTA label", "text", "Find out more");
        fields = createFallbackField(fields, "href", "Link", "url", `/team/${nextId}`);
      }

      return fields;
    };

    editorLanguages.forEach((language) => {
      updateCarouselItems(language, section.id, (items, localizedSection) => {
        const template = items[items.length - 1] ?? localizedSection.items?.[0];
        const nextIndex = items.length + 1;
        const nextItem = {
          id: nextId,
          label: previewPage === "event" && section.id === "list"
            ? language === "zh" ? "新动态" : "New Event"
            : `${localizedSection.label} ${nextIndex}`,
          fields: createNewFields(template, localizedSection, nextIndex, language),
        };

        return previewPage === "event" && section.id === "list" ? [nextItem, ...items] : [...items, nextItem];
      });
    });

    if (previewPage === "event" && section.id === "list") {
      editorLanguages.forEach((language) => {
        updateCarouselItems(language, "detailPages", (items, localizedSection) => {
          if (items.some((item) => getPageContentItemField(item, "slug", item.id) === nextId)) return items;

          const nextIndex = items.length + 1;
          const detailTitle = language === "zh" ? "新动态" : "New Event";

          return [
            ...items,
            {
              id: nextId,
              label: detailTitle || `${localizedSection.label} ${nextIndex}`,
              fields: [
                { id: "slug", label: "Slug", kind: "text", value: nextId },
                { id: "sortDate", label: "Sort date", kind: "text", value: today },
                { id: "displayDate", label: "Display date", kind: "text", value: today },
                { id: "category", label: "Category", kind: "text", value: "" },
                { id: "title", label: "Detail title", kind: "textarea", value: detailTitle },
                { id: "summary", label: "Detail summary", kind: "textarea", value: "" },
                { id: "content", label: "Detail content", kind: "textarea", value: "" },
                { id: "detailImage1", label: "Detail image 1", kind: "image", value: "" },
                { id: "detailVideo1", label: "Detail video 1", kind: "url", value: "" },
              ],
            },
          ];
        });
      });
    }

    if (previewPage === "podcast" && (section.id === "partners" || section.id === "seniorAssociates")) {
      editorLanguages.forEach((language) => {
        updateCarouselItems(language, "memberProfiles", (items, localizedSection) => {
          if (items.some((item) => getPageContentItemField(item, "slug", item.id) === nextId)) return items;

          const nextIndex = items.length + 1;
          const name = `${localizedSection.label} ${nextIndex}`;
          const title = section.id === "partners" ? "Partner" : "Senior Associate";

          return [
            ...items,
            {
              id: nextId,
              label: name,
              fields: [
                { id: "slug", label: "Slug", kind: "text", value: nextId },
                { id: "image", label: "Thumbnail", kind: "image", value: "" },
                { id: "name", label: "Name", kind: "text", value: name },
                { id: "title", label: "Title", kind: "text", value: title },
                { id: "phone", label: "Phone", kind: "text", value: "" },
                { id: "email", label: "Email", kind: "text", value: "" },
                { id: "serviceIndustries", label: "Service industries", kind: "textarea", value: "" },
                { id: "education", label: "Education", kind: "textarea", value: "" },
                { id: "qualification", label: "Qualification", kind: "textarea", value: "" },
                { id: "languages", label: "Languages", kind: "textarea", value: "" },
                { id: "socialEngagements", label: "Social engagements", kind: "textarea", value: "" },
                { id: "practiceArea", label: "Practice area", kind: "textarea", value: "" },
                { id: "practiceExperience", label: "Practice experience", kind: "textarea", value: "" },
                { id: "honors", label: "Honors", kind: "textarea", value: "" },
                { id: "achievements", label: "Performance & Achievements", kind: "textarea", value: "" },
              ],
            },
          ];
        });
      });

      const nextProfileIndex = Math.max(
        pageContent.zh.podcast.sections.find((item) => item.id === "memberProfiles")?.items?.length ?? 0,
        pageContent.en.podcast.sections.find((item) => item.id === "memberProfiles")?.items?.length ?? 0,
      );

      setSubpageSelection({
        page: "podcast",
        sectionId: "memberProfiles",
        slug: nextId,
        itemIndex: nextProfileIndex,
      });
      setCarouselDrawer({ sectionId: "memberProfiles", itemIndex: nextProfileIndex, slug: nextId });
      setExpandedCarouselItems((current) => ({
        ...current,
        [`memberProfiles-${nextId}`]: true,
      }));
      return;
    }

    if (previewPage === "event" && section.id === "list") {
      setSubpageSelection(null);
      setCarouselDrawer({ sectionId: "list", itemIndex: 0, slug: nextId });
      setExpandedCarouselItems((current) => ({
        ...current,
        [`list-${nextId}`]: true,
      }));
      return;
    }

    setCarouselDrawer({ sectionId: section.id, itemIndex: nextItemIndex, slug: nextId });
    setExpandedCarouselItems((current) => ({
      ...current,
      [`${section.id}-${nextId}`]: true,
    }));
  };
  const removeCarouselItem = (sectionId: string, itemIndex: number) => {
    editorLanguages.forEach((language) => {
      updateCarouselItems(language, sectionId, (items) => items.filter((_, index) => index !== itemIndex));
    });
  };
  const moveCarouselItem = (sectionId: string, itemIndex: number, direction: -1 | 1) => {
    const targetIndex = itemIndex + direction;

    editorLanguages.forEach((language) => {
      updateCarouselItems(language, sectionId, (items) => moveRepeaterItem(items, itemIndex, targetIndex));
    });
  };
  const togglePinCarouselItem = (sectionId: string, itemIndex: number, slug?: string) => {
    editorLanguages.forEach((language) => {
      updateCarouselItems(language, sectionId, (items) => {
        const sourceIndex = slug
          ? items.findIndex((item) => getPageContentItemField(item, "slug", item.id) === slug)
          : itemIndex;

        if (sourceIndex < 0 || sourceIndex >= items.length) return items;

        const currentlyPinned = isPinnedRepeaterItem(items[sourceIndex]);
        const nextItems = items.map((item, index) =>
          index === sourceIndex
            ? {
                ...item,
                fields: upsertRepeaterField(item.fields, "pinned", currentlyPinned ? "false" : "true", {
                  id: "pinned",
                  label: "Pinned",
                  kind: "text",
                  value: "",
                }),
              }
            : item,
        );

        return currentlyPinned ? nextItems : moveRepeaterItem(nextItems, sourceIndex, 0);
      });
    });
  };
  const sortCarouselItemsByDate = (sectionId: string, direction: "asc" | "desc") => {
    editorLanguages.forEach((language) => {
      updateCarouselItems(language, sectionId, (items) =>
        [...items].sort((a, b) => {
          const pinnedResult = Number(isPinnedRepeaterItem(b)) - Number(isPinnedRepeaterItem(a));
          if (pinnedResult !== 0) return pinnedResult;

          const aTime = parseSortableDate(getItemFieldValue(a, "sortDate") || getItemFieldValue(a, "date"));
          const bTime = parseSortableDate(getItemFieldValue(b, "sortDate") || getItemFieldValue(b, "date"));

          return direction === "asc" ? aTime - bTime : bTime - aTime;
        }),
      );
    });
  };
  const puckConfig = useMemo(
    () =>
      createPuckConfig({
        activePage,
        labelPage,
        activeLanguage,
        previewDevice,
        previewRefreshKey,
        previewData: debouncedPreviewData,
        officialSiteState,
        subpage: activeSubpage,
        siteContent: debouncedSiteContent,
        onOpenCarouselDrawer: (sectionId) => setCarouselDrawer({ sectionId }),
        onFieldClick: (match) => {
          if (isSiteChromeTab && !match.sitePath) {
            setMessage(page === "header" ? "当前在 Header 标签页，请点击标题栏内容。" : "当前在 Footer 标签页，请点击页脚内容。");
            return;
          }

          if (match.sectionId && match.itemIndex !== undefined) {
            setCarouselDrawer({ sectionId: match.sectionId, itemIndex: match.itemIndex });
            setFocusedFieldKey(match.fieldKey);
            setExpandedCarouselItems((current) => ({
              ...current,
              [`${match.sectionId}-${match.itemId ?? match.itemIndex}`]: true,
            }));
            setMessage(`已打开内容项：${match.field.label}`);
            scrollEditorFieldIntoView(match.fieldKey, activeLanguage, 180);
            return;
          }

          setFocusedFieldKey(match.fieldKey);
          setMessage(`已定位到字段：${match.field.label}`);
          window.setTimeout(() => {
            puckDispatchRef.current?.({
              type: "setUi",
              ui: {
                itemSelector: { index: 0 },
                rightSideBarVisible: false,
                field: { focus: match.fieldKey },
              },
            });

            const editorControl = findEditorControl(match.fieldKey, activeLanguage);
            editorControl?.focus({ preventScroll: true });
            editorControl?.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
          }, 120);
        },
      }),
    [
      activeLanguage,
      activePage,
      activeSubpage,
      debouncedPreviewData,
      debouncedSiteContent,
      isSiteChromeTab,
      labelPage,
      officialSiteState,
      page,
      previewDevice,
      previewRefreshKey,
      setMessage,
    ],
  );
  const puckPlugins = useMemo<Plugin<Config<CmsPuckComponents>>[]>(
    () => [
      { name: "blocks", render: () => <></> },
      { name: "outline", render: () => <></> },
      { name: "fields", render: () => <></> },
    ],
    [],
  );

  useEffect(() => {
    if (skipNextPuckSyncRef.current) {
      skipNextPuckSyncRef.current = false;
      return;
    }

    const nextPuckData = getInitialPuckData(pageContent, activeLanguage, previewPage);

    setPuckData(nextPuckData);
    puckDispatchRef.current?.({
      type: "setData",
      data: nextPuckData,
      recordHistory: false,
    });
  }, [activeLanguage, previewPage, pageContent]);

  const switchPage = (nextPage: VisualEditorTab) => {
    const nextPreviewPage = isVisualPageTab(nextPage) ? nextPage : "home";
    setFocusedFieldKey(null);
    setCarouselDrawer(null);
    setSubpageSelection((current) => (current?.page === nextPreviewPage ? current : null));
    setPuckData(getInitialPuckData(pageContent, activeLanguage, nextPreviewPage));
    setPage(nextPage);
  };

  const switchLanguage = (nextLanguage: Language) => {
    setFocusedFieldKey(null);
    setPuckData(getInitialPuckData(pageContent, nextLanguage, previewPage));
    setDebouncedPreviewData(basePreviewData);
    setDebouncedSiteContent(siteContent);
    setPreviewRefreshKey((current) => current + 1);
    setActiveLanguage(nextLanguage);
  };
  const selectSubpage = (value: string) => {
    if (!isVisualPageTab(page)) return;

    if (!value) {
      setSubpageSelection(null);
      setCarouselDrawer(null);
      return;
    }

    const option = subpageOptions.find((item) => item.slug === value);

    if (!option) return;

    let itemIndex = option.itemIndex;

    if (previewPage === "event" && option.itemIndex < 0) {
      const activeDetailItems = getPageContentSectionItems(pageContent, activeLanguage, "event", option.sectionId);
      itemIndex = activeDetailItems.length;

      updatePageContentState((current) => {
        const next = { ...current, zh: { ...current.zh }, en: { ...current.en }, updatedAt: new Date().toISOString() };

        editorLanguages.forEach((language) => {
          const currentPage = current[language].event;
          const listItem = currentPage.sections
            .find((section) => section.id === "list")
            ?.items?.find((item) => getPageContentItemField(item, "slug", item.id) === option.slug);
          const detailTitle = getPageContentItemField(listItem, "title", option.label || option.slug);
          const detailSummary = getPageContentItemField(listItem, "summary", "");
          const detailCategory = getPageContentItemField(listItem, "category", "");
          const detailDate = getPageContentItemField(listItem, "sortDate", getPageContentItemField(listItem, "date", getTodayNumericDate()));

          next[language] = {
            ...current[language],
            event: {
              ...currentPage,
              sections: currentPage.sections.map((section) => {
                if (section.id !== option.sectionId) return section;
                if (section.items?.some((item) => getPageContentItemField(item, "slug", item.id) === option.slug)) return section;

                const item: PageContentRepeaterItem = {
                  id: option.slug,
                  label: detailTitle,
                  fields: [
                    { id: "slug", label: language === "zh" ? "标识" : "Slug", kind: "text", value: option.slug },
                    { id: "date", label: language === "zh" ? "日期" : "Date", kind: "text", value: detailDate },
                    { id: "category", label: language === "zh" ? "分类" : "Category", kind: "text", value: detailCategory },
                    { id: "title", label: language === "zh" ? "详情页标题" : "Detail title", kind: "textarea", value: detailTitle },
                    { id: "summary", label: language === "zh" ? "详情页摘要" : "Detail summary", kind: "textarea", value: detailSummary },
                    { id: "content", label: language === "zh" ? "详情正文" : "Detail content", kind: "textarea", value: "" },
                    { id: "detailImage1", label: language === "zh" ? "详情图片 1" : "Detail image 1", kind: "image", value: "" },
                    { id: "detailVideo1", label: language === "zh" ? "详情视频 1" : "Detail video 1", kind: "url", value: "" },
                  ],
                };

                return { ...section, items: [...(section.items ?? []), item] };
              }),
            },
          };
        });

        return next;
      });
    }

    if (previewPage === "media" && option.itemIndex < 0) {
      const activeDetailItems = getPageContentSectionItems(pageContent, activeLanguage, "media", option.sectionId);
      itemIndex = activeDetailItems.length;

      updatePageContentState((current) => {
        const next = { ...current, zh: { ...current.zh }, en: { ...current.en }, updatedAt: new Date().toISOString() };

        editorLanguages.forEach((language) => {
          const currentPage = current[language].media;
          const cardItem = currentPage.sections
            .find((section) => section.id === "cards")
            ?.items?.find((item) => getPageContentItemField(item, "slug", item.id) === option.slug);
          const title = getPageContentItemField(cardItem, "title", option.label || option.slug);
          const image = getPageContentItemField(cardItem, "image", "");
          const intro = getPageContentItemField(cardItem, "description", "");

          next[language] = {
            ...current[language],
            media: {
              ...currentPage,
              sections: currentPage.sections.map((section) => {
                if (section.id !== option.sectionId) return section;
                if (section.items?.some((item) => getPageContentItemField(item, "slug", item.id) === option.slug)) return section;

                const item: PageContentRepeaterItem = {
                  id: option.slug,
                  label: title,
                  fields: [
                    { id: "slug", label: language === "zh" ? "标识" : "Slug", kind: "text", value: option.slug },
                    { id: "title", label: language === "zh" ? "详情页标题" : "Detail title", kind: "text", value: title },
                    { id: "image", label: language === "zh" ? "首屏背景图片" : "Hero image", kind: "image", value: image },
                    { id: "intro", label: language === "zh" ? "详情页简介" : "Detail intro", kind: "textarea", value: intro },
                    { id: "sections", label: language === "zh" ? "详情卡片" : "Detail cards", kind: "textarea", value: "" },
                  ],
                };

                return { ...section, items: [...(section.items ?? []), item] };
              }),
            },
          };
        });

        return next;
      });
    }

    if (previewPage === "podcast" && option.itemIndex < 0) {
      const activeDetailItems = getPageContentSectionItems(pageContent, activeLanguage, "podcast", option.sectionId);
      itemIndex = activeDetailItems.length;

      updatePageContentState((current) => {
        const next = { ...current, zh: { ...current.zh }, en: { ...current.en }, updatedAt: new Date().toISOString() };

        editorLanguages.forEach((language) => {
          const currentPage = current[language].podcast;
          const listItem = currentPage.sections
            .filter((section) => section.id === "partners" || section.id === "seniorAssociates")
            .flatMap((section) => section.items ?? [])
            .find((item) => getPageContentItemField(item, "slug", item.id) === option.slug);
          const name = getPageContentItemField(listItem, "name", option.label || option.slug);
          const title = getPageContentItemField(listItem, "title", "");
          const image = getPageContentItemField(listItem, "image", "");

          next[language] = {
            ...current[language],
            podcast: {
              ...currentPage,
              sections: currentPage.sections.map((section) => {
                if (section.id !== option.sectionId) return section;
                if (section.items?.some((item) => getPageContentItemField(item, "slug", item.id) === option.slug)) return section;

                const item: PageContentRepeaterItem = {
                  id: option.slug,
                  label: name,
                  fields: [
                    { id: "slug", label: "Slug", kind: "text", value: option.slug },
                    { id: "image", label: "Thumbnail", kind: "image", value: image },
                    { id: "name", label: "Name", kind: "text", value: name },
                    { id: "title", label: "Title", kind: "text", value: title },
                    { id: "phone", label: "Phone", kind: "text", value: "" },
                    { id: "email", label: "Email", kind: "text", value: "" },
                    { id: "serviceIndustries", label: "Service industries", kind: "textarea", value: "" },
                    { id: "education", label: "Education", kind: "textarea", value: "" },
                    { id: "qualification", label: "Qualification", kind: "textarea", value: "" },
                    { id: "languages", label: "Languages", kind: "textarea", value: "" },
                    { id: "socialEngagements", label: "Social engagements", kind: "textarea", value: "" },
                    { id: "practiceArea", label: "Practice area", kind: "textarea", value: "" },
                    { id: "practiceExperience", label: "Practice experience", kind: "textarea", value: "" },
                    { id: "honors", label: "Honors", kind: "textarea", value: "" },
                    { id: "achievements", label: "Performance & Achievements", kind: "textarea", value: "" },
                  ],
                };

                return { ...section, items: [...(section.items ?? []), item] };
              }),
            },
          };
        });

        return next;
      });
    }

    const nextSelection: SubpageSelection = {
      page: previewPage as DetailParentPage,
      sectionId: option.sectionId,
      slug: option.slug,
      itemIndex,
    };

    setSubpageSelection(nextSelection);
    setCarouselDrawer({ sectionId: option.sectionId, itemIndex, slug: option.slug });
    setExpandedCarouselItems((current) => ({
      ...current,
      [`${option.sectionId}-${option.slug}`]: true,
    }));
  };

  const updateDraftContent = (nextData: CmsPuckData) => {
    if (Date.now() < ignorePuckChangeUntilRef.current) {
      setPuckData(nextData);
      return;
    }

    setPuckData(nextData);
    if (isVisualPageTab(page)) {
      skipNextPuckSyncRef.current = true;
      updatePageContentState((current) => applyPuckDataToPageContent(current, activeLanguage, page, nextData));
    }
  };

  const savePuckData = async (nextData: CmsPuckData, publish: boolean) => {
    setMessage(editingVersionId ? "正在提交版本..." : publish ? "正在发布当前页..." : "正在保存草稿...");

    const nextPageContent = isVisualPageTab(page)
      ? applyPuckDataToPageContent(pageContent, activeLanguage, page, nextData)
      : pageContent;
    const nextVisualEditor: VisualEditorState = isVisualPageTab(page)
      ? {
          ...visualEditor,
          puckPages: {
            ...visualEditor.puckPages,
            [activeLanguage]: {
              ...visualEditor.puckPages?.[activeLanguage],
              [page]: serializePuckData(nextData),
            },
          },
          updatedAt: new Date().toISOString(),
        }
      : {
          ...visualEditor,
          updatedAt: new Date().toISOString(),
        };
    const nextOfficialSiteState = officialSiteState
      ? stripPreviewOnlyCmsState(
          officialPreviewState(
            {
              ...basePreviewData,
              visualEditor: nextVisualEditor,
              pageContent: nextPageContent,
            },
            officialSiteState,
            activeLanguage,
          ),
        )
      : null;

    setPuckData(nextData);
    setPageContent(nextPageContent);
    if (nextOfficialSiteState) {
      setOfficialSiteState(nextOfficialSiteState);
      lastSyncedOfficialStateRef.current = "";
    }
    setVisualEditor(() => nextVisualEditor);

    const ok = editingVersionId
      ? await submitVersionDraft(editingVersionId, {
          siteContent,
          visualEditor: nextVisualEditor,
          pageContent: nextPageContent,
          officialSiteState: nextOfficialSiteState,
        })
      : await persistWorkspace({
          siteContent,
          visualEditor: nextVisualEditor,
          pageContent: nextPageContent,
        });

    if (ok && !editingVersionId && nextOfficialSiteState) {
      const officialResponse = await fetch("/api/cms/official", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state: nextOfficialSiteState }),
      });

      if (!officialResponse.ok) {
        setMessage("页面内容已保存，但真实官网数据同步失败。");
        return;
      }
    }

    if (ok) {
      setMessage(
        editingVersionId
          ? "已提交到当前版本，可在版本管理中预览或发布。"
          : publish
            ? "已发布 Puck 草稿，并同步当前页面内容字段。"
            : "已保存 Puck 草稿，并同步当前页面内容字段。",
      );
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex flex-col bg-[#f3f5f9] text-slate-950">
      <header className="relative z-[1002] flex h-16 shrink-0 items-center gap-4 border-b border-slate-200 bg-white px-5 shadow-sm">
        <button
          type="button"
          onClick={() => setPanel("overview")}
          className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
        >
          <ChevronLeft className="h-4 w-4" />
          退出
        </button>

        <div className="h-6 w-px bg-slate-200" />

        <nav className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto">
          {pageTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => switchPage(tab.id)}
              className={`shrink-0 rounded-xl px-4 py-2 text-left transition ${
                page === tab.id ? "bg-[#2563eb] text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
              }`}
            >
              <span className="block text-sm font-bold leading-tight">{tab.label}</span>
              <span className={`mt-0.5 block text-[10px] font-bold uppercase leading-tight tracking-[0.14em] ${
                page === tab.id ? "text-white/75" : "text-slate-400"
              }`}>
                {tab.navLabel}
              </span>
            </button>
          ))}
        </nav>

        {subpageOptions.length ? (
          <div className="flex min-w-[260px] max-w-[360px] items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
            <span className="shrink-0 text-xs font-bold text-slate-500">子页面</span>
            <select
              value={activeSubpage?.slug ?? ""}
              onChange={(event) => selectSubpage(event.target.value)}
              className="min-w-0 flex-1 bg-transparent text-xs font-semibold text-slate-700 outline-none"
            >
              <option value="">当前栏目首页</option>
              {subpageOptions.map((option) => (
                <option key={`${option.sectionId}-${option.slug}`} value={option.slug}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ) : null}

        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-100 p-1 pl-3">
          <span className="text-xs font-bold text-slate-500">设备</span>
          {previewDeviceOptions.map((device) => (
            <button
              key={device.id}
              type="button"
              onClick={() => setPreviewDevice(device.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                previewDevice === device.id ? "bg-white text-[#2563eb] shadow-sm" : "text-slate-500"
              }`}
            >
              {device.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => {
            void savePuckData(puckData, false);
          }}
          className="shrink-0 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 transition hover:border-[#2563eb] hover:text-[#2563eb]"
        >
          {editingVersionId ? "提交版本" : "保存草稿"}
        </button>
        <button
          type="button"
          onClick={() => {
            if (editingVersionId) {
              window.open(`/cms/version-preview/${editingVersionId}`, "_blank", "noopener,noreferrer");
              return;
            }

            void savePuckData(puckData, true);
          }}
          className="shrink-0 rounded-xl bg-[#2563eb] px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-[#1d4ed8]"
        >
          {editingVersionId ? "预览版本" : "发布当前页"}
        </button>

        {activeVersion ? (
          <span className="hidden max-w-[180px] truncate rounded-full bg-amber-50 px-3 py-1 text-[11px] font-semibold text-amber-700 xl:inline">
            编辑中：{activeVersion.name}
          </span>
        ) : null}

        <div className="flex items-center gap-2 rounded-xl border border-[#2563eb]/20 bg-slate-100 p-1 pl-3">
          <span className="text-xs font-bold text-slate-500">语言</span>
          {(["zh", "en"] as Language[]).map((language) => (
            <button
              key={language}
              type="button"
              onClick={() => switchLanguage(language)}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                activeLanguage === language ? "bg-white text-[#2563eb] shadow-sm" : "text-slate-500"
              }`}
            >
              {languageLabels[language]}
            </button>
          ))}
        </div>
      </header>

      <div className="flex min-h-0 flex-1 overflow-hidden">
      <div className="cms-puck-shell min-h-0 flex-1 overflow-hidden">
        <style>{`
          .cms-puck-shell [class*="PuckLayout-header"],
          [class*="PuckLayout-header"] {
            display: none !important;
          }

          .cms-puck-shell [class*="PuckLayout-inner"],
          [class*="PuckLayout-inner"] {
            --puck-side-nav-width: 0px !important;
            --puck-left-side-bar-width: 0px !important;
            --puck-right-side-bar-width: 0px !important;
            --puck-user-left-side-bar-width: 0px !important;
            --puck-user-right-side-bar-width: 0px !important;
            grid-template-areas: "editor" !important;
            grid-template-columns: minmax(0, 1fr) !important;
            grid-template-rows: minmax(0, 1fr) !important;
          }

          .cms-puck-shell [class*="PuckLayout-nav"],
          .cms-puck-shell [class*="PuckHeader-leftSideBarToggle"],
          .cms-puck-shell [class*="PuckLayout-leftSideBar"],
          .cms-puck-shell [class*="PuckLayout-leftSidebar"],
          .cms-puck-shell [class*="Sidebar--left"],
          .cms-puck-shell [class*="Sidebar--right"],
          .cms-puck-shell [class*="Sidebar-resizeHandle"],
          .cms-puck-shell [class*="PuckComponents"],
          .cms-puck-shell [class*="PuckPluginTab"],
          .cms-puck-shell [class*="ComponentList"],
          [class*="PuckLayout-nav"],
          [class*="PuckHeader-leftSideBarToggle"],
          [class*="PuckLayout-leftSideBar"],
          [class*="PuckLayout-leftSidebar"],
          [class*="Sidebar--left"],
          [class*="Sidebar--right"],
          [class*="Sidebar-resizeHandle"],
          [class*="PuckComponents"],
          [class*="PuckPluginTab"],
          [class*="ComponentList"] {
            display: none !important;
          }

          .cms-puck-shell [class*="PuckCanvas"],
          [class*="PuckCanvas"] {
            grid-area: editor !important;
            min-width: 0 !important;
          }
        `}</style>
        <Puck
          key={`${activeLanguage}-${page}-${previewDevice}`}
          config={puckConfig}
          data={puckData}
          plugins={puckPlugins}
          viewports={puckViewports}
          iframe={{ enabled: true, waitForStyles: true }}
          ui={{
            itemSelector: null,
            leftSideBarVisible: false,
            rightSideBarVisible: false,
            previewMode: "interactive",
            field: { focus: focusedFieldKey },
            viewports: {
              current: { width: previewDevice === "desktop" ? 1920 : 390, height: "auto" },
              options: puckViewports,
              controlsVisible: false,
            },
          }}
          onChange={(nextData) => updateDraftContent(nextData as CmsPuckData)}
          onPublish={(nextData) => {
            void savePuckData(nextData as CmsPuckData, true);
          }}
          renderHeaderActions={({ dispatch }) => {
            puckDispatchRef.current = dispatch;
            return <></>;
          }}
          height="calc(100vh - 64px)"
        />
      </div>

      <aside className="relative z-[1004] flex w-[clamp(360px,28vw,560px)] shrink-0 flex-col border-l border-slate-200 bg-white shadow-[-18px_0_45px_rgba(15,23,42,0.12)]">
        <div className="shrink-0 border-b border-slate-200 px-5 py-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#2563eb]">Page Fields</p>
          <h2 className="mt-1 text-xl font-bold text-slate-950">{isSiteChromeTab ? activeTabLabel : labelPage.label}</h2>
          <p className="mt-1 text-sm text-slate-500">
            {isSiteChromeTab
              ? "这里编辑全站共用的 Header / Footer，不会重复出现在每个页面里。"
              : "右侧内容区同时编辑中文和英文；顶部语言按钮只切换预览画面。"}
          </p>
          {isSiteChromeTab ? null : <TextFormatHint />}
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
          <div className="space-y-5">
            {isSiteChromeTab ? (
              <SiteChromeFields
                siteContent={siteContent}
                focusedFieldKey={focusedFieldKey}
                mode={page === "footer" ? "footer" : "header"}
                onChange={updateSiteSettingField}
                onUpload={(path, file) => void uploadSiteSettingAsset(path, file)}
              />
            ) : labelPage.sections.map((labelSection) => (
              <section key={labelSection.id} className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-950">{labelSection.label}</h3>
                    {labelSection.items?.length ? (
                      <p className="mt-1 text-xs text-slate-500">列表内容请用下方管理按钮维护。</p>
                    ) : null}
                  </div>
                  {labelSection.items?.length ? (
                    <button
                      type="button"
                      onClick={() => setCarouselDrawer({ sectionId: labelSection.id })}
                      className="shrink-0 rounded-xl bg-[#2563eb] px-3 py-2 text-xs font-bold text-white transition hover:bg-[#1d4ed8]"
                    >
                      管理列表
                    </button>
                  ) : null}
                </div>
                {labelSection.fields.length ? (
                  <div className="space-y-4">
                    {labelSection.fields.map((labelField) => (
                      <section key={labelField.id} className="space-y-3 rounded-[20px] border border-slate-200 bg-white p-4">
                        <h4 className="text-sm font-bold text-slate-900">{labelField.label}</h4>
                        {editorLanguages.map((language) => {
                          const section = activePagesByLanguage[language].sections.find((item) => item.id === labelSection.id);
                          const field = section?.fields.find((fieldItem) => fieldItem.id === labelField.id);
                          const fieldKey = puckFieldKey(labelSection.id, labelField.id);
                          const focused = focusedFieldKey === fieldKey && activeLanguage === language;
                          const effectiveKind = field?.kind ?? labelField.kind;
                          const uploadable = isUploadableDrawerField(labelField.id, effectiveKind);
                          const fieldValue = field?.value ?? "";

                          return (
                            <label key={language} className="block space-y-1.5">
                              <span className={`text-xs font-bold ${focused ? "text-[#2563eb]" : "text-slate-600"}`}>
                                {language === "en" ? "English" : "中文"}
                              </span>
                              {effectiveKind === "textarea" ? (
                                <BufferedTextControl
                                  name={`${language}-${fieldKey}`}
                                  fieldKey={fieldKey}
                                  language={language}
                                  value={fieldValue}
                                  onCommit={(value) => updatePageField(language, labelSection.id, labelField.id, value)}
                                  multiline
                                  rows={4}
                                  className={`w-full rounded-2xl border bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10 ${
                                    focused ? "border-[#2563eb] ring-4 ring-[#2563eb]/10" : "border-slate-200"
                                  }`}
                                />
                              ) : (
                                <BufferedTextControl
                                  name={`${language}-${fieldKey}`}
                                  fieldKey={fieldKey}
                                  language={language}
                                  value={fieldValue}
                                  type={effectiveKind === "url" ? "url" : "text"}
                                  onCommit={(value) => updatePageField(language, labelSection.id, labelField.id, value)}
                                  className={`w-full rounded-2xl border bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10 ${
                                    focused ? "border-[#2563eb] ring-4 ring-[#2563eb]/10" : "border-slate-200"
                                  }`}
                                />
                              )}
                              {uploadable ? (
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-500">
                                    <Upload className="h-3.5 w-3.5" />
                                    {uploadLabelForField(labelField.id)}
                                  </span>
                                  <input
                                    type="file"
                                    accept={uploadAcceptForField(labelField.id)}
                                    className="text-xs text-slate-500 file:mr-3 file:rounded-xl file:border-0 file:bg-[#2563eb] file:px-3 file:py-2 file:text-xs file:font-bold file:text-white"
                                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                      const file = event.target.files?.[0];
                                      event.target.value = "";
                                      if (!file) return;
                                      void uploadPageFieldAsset(language, labelSection.id, labelField.id, file);
                                    }}
                                  />
                                  {effectiveKind === "image" && fieldValue ? (
                                    <img src={resolvePublicAssetUrl(fieldValue)} alt="" className="h-14 w-20 rounded-xl border border-slate-200 object-cover" />
                                  ) : null}
                                </div>
                              ) : null}
                            </label>
                          );
                        })}
                      </section>
                    ))}
                  </div>
                ) : null}
              </section>
            ))}
          </div>
        </div>
      </aside>
      </div>

      {activeCarouselSection ? (
        <aside className="fixed bottom-0 right-0 top-16 z-[1005] flex w-[min(520px,calc(100vw-24px))] flex-col border-l border-slate-200 bg-white shadow-[-24px_0_60px_rgba(15,23,42,0.18)]">
          <div className="flex shrink-0 items-start justify-between gap-4 border-b border-slate-200 px-5 py-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#2563eb]">Content Drawer</p>
              <h2 className="mt-1 text-xl font-bold text-slate-950">{activeCarouselSection.label}</h2>
              <p className="mt-1 text-sm text-slate-500">
                中文 {activeCarouselSectionsByLanguage.zh?.items?.length ?? 0} 条 / English {activeCarouselSectionsByLanguage.en?.items?.length ?? 0} 条
              </p>
            </div>
            <button
              type="button"
              onClick={() => setCarouselDrawer(null)}
              className="rounded-xl border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50 hover:text-slate-950"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="shrink-0 space-y-3 border-b border-slate-200 px-5 py-4">
            {previewPage === "home" && activeCarouselSection.id === "honors" ? (
              <div className="grid gap-2">
                <select
                  value={selectedHomeHonorSourceId}
                  onChange={(event) => setSelectedHomeHonorSourceId(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#2563eb]"
                >
                  <option value="">选择虎诉荣誉里的具体年份 / 月份荣誉</option>
                  {officialSiteState?.content.honors.map((year) => (
                    <optgroup key={year.year} label={year.year}>
                      {year.awards.map((award, index) => {
                        const id = homeHonorItemId(year.year, index, award.date);
                        const alreadyAdded = editorLanguages.some((language) =>
                          activeCarouselSectionsByLanguage[language]?.items?.some((item) => item.id === id),
                        );

                        return (
                          <option key={id} value={id} disabled={alreadyAdded}>
                            {award.date} / {award.title.zh || award.title.en}
                            {alreadyAdded ? "（已添加）" : ""}
                          </option>
                        );
                      })}
                    </optgroup>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={addHomeHonorSourceItem}
                  className="w-full rounded-2xl bg-[#2563eb] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#1d4ed8]"
                >
                  新增到首页虎诉荣誉
                </button>
              </div>
            ) : null}
            {isChronicleDrawer ? (
              <button
                type="button"
                onClick={addChronicleYear}
                className="w-full rounded-2xl bg-[#2563eb] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#1d4ed8]"
              >
                新增年份
              </button>
            ) : (
              <button
                type="button"
                onClick={() => addCarouselItem(activeCarouselSection)}
                className={`${previewPage === "home" && activeCarouselSection.id === "honors" ? "hidden" : "w-full"} rounded-2xl bg-[#2563eb] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#1d4ed8]`}
              >
                新增内容项
              </button>
            )}
            {activeSectionHasDate ? (
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => sortCarouselItemsByDate(activeCarouselSection.id, "desc")}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-600 transition hover:border-[#2563eb] hover:text-[#2563eb]"
              >
                时间排序：最新
              </button>
              <button
                type="button"
                onClick={() => sortCarouselItemsByDate(activeCarouselSection.id, "asc")}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-600 transition hover:border-[#2563eb] hover:text-[#2563eb]"
              >
                时间排序：最早
              </button>
            </div>
            ) : null}
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
            <div className="space-y-5">
              {drawerItemRows.map(({ itemIndex, rowSlug }, rowPosition) => {
                const zhItemAtIndex = activeCarouselSectionsByLanguage.zh?.items?.[itemIndex];
                const enItemAtIndex = activeCarouselSectionsByLanguage.en?.items?.[itemIndex];
                const primaryItem =
                  (rowSlug ? getSectionItemBySlugOrIndex(activeCarouselSectionsByLanguage.zh, itemIndex, rowSlug) : undefined) ??
                  (rowSlug ? getSectionItemBySlugOrIndex(activeCarouselSectionsByLanguage.en, itemIndex, rowSlug) : undefined) ??
                  zhItemAtIndex ??
                  enItemAtIndex;
                const itemKey = `${activeCarouselSection.id}-${rowSlug ?? primaryItem?.id ?? itemIndex}`;
                const selectedBySlug = Boolean(rowSlug && carouselDrawer?.slug === rowSlug);
                const isExpanded =
                  expandedCarouselItems[itemKey] ?? (selectedBySlug || carouselDrawer?.itemIndex === itemIndex);
                const thumbnail = getRepeaterThumbnail(activeCarouselSectionsByLanguage, itemIndex, rowSlug);
                const title = getRepeaterDisplayTitle(activeCarouselSectionsByLanguage, itemIndex, `Item ${itemIndex + 1}`, rowSlug);
                const summary =
                  previewPage === "event" && activeCarouselSection.id === "list"
                    ? ""
                    : getRepeaterDisplaySummary(activeCarouselSectionsByLanguage, itemIndex, primaryItem?.id ?? "", rowSlug);
                const isPinned = isPinnedRepeaterItem(primaryItem);
                const honorYear =
                  previewPage === "home" && activeCarouselSection.id === "honors" && primaryItem
                    ? getPageContentItemField(primaryItem, "year", "")
                    : "";
                const previousHonorYear =
                  previewPage === "home" && activeCarouselSection.id === "honors"
                    ? getPageContentItemField(
                        activeCarouselSectionsByLanguage.zh?.items?.[drawerItemRows[rowPosition - 1]?.itemIndex ?? -1] ??
                          activeCarouselSectionsByLanguage.en?.items?.[drawerItemRows[rowPosition - 1]?.itemIndex ?? -1],
                        "year",
                        "",
                      )
                    : "";
                const chronicleYear =
                  previewPage === "about" && activeCarouselSection.id === "chronicle" && primaryItem
                    ? inferChronicleYear(primaryItem, zhItemAtIndex)
                    : "";
                const chronicleMonth =
                  previewPage === "about" && activeCarouselSection.id === "chronicle" && primaryItem
                    ? getPageContentItemField(primaryItem, "month", "") ||
                      (zhItemAtIndex ? getPageContentItemField(zhItemAtIndex, "month", "") : "")
                    : "";
                const displayTitle =
                  chronicleYear && isChronicleDrawer
                    ? `${chronicleYear}${chronicleMonth ? ` / ${chronicleMonth}` : ""} 事件`
                    : title;
                const previousChronicleItem =
                  previewPage === "about" && activeCarouselSection.id === "chronicle"
                    ? activeCarouselSectionsByLanguage.en?.items?.[drawerItemRows[rowPosition - 1]?.itemIndex ?? -1] ??
                      activeCarouselSectionsByLanguage.zh?.items?.[drawerItemRows[rowPosition - 1]?.itemIndex ?? -1]
                    : undefined;
                const previousChronicleYear =
                  previousChronicleItem && previewPage === "about" && activeCarouselSection.id === "chronicle"
                    ? inferChronicleYear(
                        previousChronicleItem,
                        activeCarouselSectionsByLanguage.zh?.items?.[drawerItemRows[rowPosition - 1]?.itemIndex ?? -1],
                      )
                    : "";

                return (
                <section
                  key={primaryItem?.id ?? `drawer-item-${itemIndex}`}
                  className={`rounded-[24px] border p-4 ${
                    selectedBySlug || carouselDrawer?.itemIndex === itemIndex ? "border-[#2563eb] bg-[#eef4ff]" : "border-slate-200 bg-slate-50"
                  }`}
                >
                  {honorYear && honorYear !== previousHonorYear ? (
                    <div className="mb-3 rounded-2xl bg-[#2563eb]/10 px-4 py-2 text-sm font-bold text-[#2563eb]">
                      {honorYear}
                    </div>
                  ) : null}
                  {chronicleYear && chronicleYear !== previousChronicleYear ? (
                    <div className="mb-3 flex items-center justify-between gap-3 rounded-2xl bg-[#2563eb]/10 px-4 py-2 text-sm font-bold text-[#2563eb]">
                      <span>{chronicleYear}</span>
                      <button
                        type="button"
                        onClick={() => addChronicleEventToYear(chronicleYear)}
                        className="rounded-xl border border-[#2563eb]/30 bg-white px-3 py-1.5 text-xs font-bold text-[#2563eb] transition hover:bg-[#2563eb]/10"
                      >
                        新增事件
                      </button>
                    </div>
                  ) : null}
                  <div className="flex flex-wrap items-center gap-3">
                    {thumbnail ? (
                      <img
                        src={thumbnail}
                        alt=""
                        className="h-16 w-20 shrink-0 rounded-2xl border border-slate-200 bg-slate-100 object-cover"
                      />
                    ) : null}
                    <button
                      type="button"
                      onClick={() => setExpandedCarouselItems((current) => ({ ...current, [itemKey]: !isExpanded }))}
                      className="min-w-[160px] flex-1 text-left"
                    >
                      <p className="text-sm font-bold text-slate-900">{displayTitle}</p>
                      {isPinned ? <p className="mt-1 text-xs font-bold text-[#2563eb]">已置顶</p> : null}
                      {summary ? <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">{summary}</p> : null}
                    </button>
                    <div className="hidden">
                      <p className="text-sm font-bold text-slate-900">{primaryItem?.label || `Item ${itemIndex + 1}`}</p>
                      <p className="mt-1 text-xs text-slate-500">ID: {primaryItem?.id ?? "-"}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5">
                    {previewPage === "event" && activeCarouselSection.id === "list" ? (
                      <button
                        type="button"
                        onClick={() => togglePinCarouselItem(activeCarouselSection.id, itemIndex, rowSlug)}
                        className={`inline-flex items-center gap-1 rounded-xl border px-2.5 py-2 text-xs font-bold transition ${
                          isPinned
                            ? "border-[#2563eb] bg-[#2563eb]/10 text-[#2563eb] hover:bg-[#2563eb]/15"
                            : "border-slate-200 text-slate-600 hover:border-[#2563eb] hover:text-[#2563eb]"
                        }`}
                      >
                        <Pin className="h-3.5 w-3.5" />
                        {isPinned ? "取消置顶" : "置顶"}
                      </button>
                    ) : null}
                    {!isChronicleDrawer ? (
                      <>
                        <button
                          type="button"
                          onClick={() => moveCarouselItem(activeCarouselSection.id, itemIndex, -1)}
                          disabled={itemIndex === 0}
                          className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-2.5 py-2 text-xs font-bold text-slate-600 transition hover:border-[#2563eb] hover:text-[#2563eb] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <ArrowUp className="h-3.5 w-3.5" />
                          上移
                        </button>
                        <button
                          type="button"
                          onClick={() => moveCarouselItem(activeCarouselSection.id, itemIndex, 1)}
                          disabled={
                            itemIndex >=
                            Math.max(
                              activeCarouselSectionsByLanguage.zh?.items?.length ?? 0,
                              activeCarouselSectionsByLanguage.en?.items?.length ?? 0,
                            ) -
                              1
                          }
                          className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-2.5 py-2 text-xs font-bold text-slate-600 transition hover:border-[#2563eb] hover:text-[#2563eb] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <ArrowDown className="h-3.5 w-3.5" />
                          下移
                        </button>
                      </>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => setExpandedCarouselItems((current) => ({ ...current, [itemKey]: !isExpanded }))}
                      className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-2.5 py-2 text-xs font-bold text-slate-600 transition hover:border-[#2563eb] hover:text-[#2563eb]"
                    >
                      <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                      {isExpanded ? "收起" : "展开"}
                    </button>
                    {previewPage === "event" && activeCarouselSection.id === "list" && rowSlug ? (
                      <button
                        type="button"
                        onClick={() => selectSubpage(rowSlug)}
                        className="inline-flex items-center gap-1 rounded-xl border border-[#2563eb]/30 px-2.5 py-2 text-xs font-bold text-[#2563eb] transition hover:bg-[#2563eb]/10"
                      >
                        Edit detail
                      </button>
                    ) : null}
                    {previewPage === "podcast" &&
                    (activeCarouselSection.id === "partners" || activeCarouselSection.id === "seniorAssociates") &&
                    rowSlug ? (
                      <button
                        type="button"
                        onClick={() => selectSubpage(rowSlug)}
                        className="inline-flex items-center gap-1 rounded-xl border border-[#2563eb]/30 px-2.5 py-2 text-xs font-bold text-[#2563eb] transition hover:bg-[#2563eb]/10"
                      >
                        Edit profile
                      </button>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => removeCarouselItem(activeCarouselSection.id, itemIndex)}
                      className="inline-flex items-center gap-1 rounded-xl px-3 py-2 text-xs font-bold text-rose-500 transition hover:bg-rose-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      删除
                    </button>
                    </div>
                  </div>

                  <div className={`${isExpanded ? "mt-4 space-y-4" : "hidden"}`}>
                    {previewPage === "event" && activeCarouselSection.id === "detailPages" ? (
                      <div className="rounded-[20px] border border-[#2563eb]/20 bg-[#eef4ff] p-4 text-xs leading-6 text-slate-700">
                        <p className="font-bold text-slate-900">正文编辑格式说明</p>
                        <p className="mt-2">普通正文直接写在 Detail content 里，段落之间空一行。</p>
                        <p>插入图片：在正文对应位置写一行 [IMAGE]，然后在下方对应的 Detail image 1、Detail image 2 上传或填写图片地址。</p>
                        <p>插入视频：在正文对应位置写一行 暂时无法在飞书文档外展示此内容，然后在下方对应的 Detail video 1、Detail video 2 上传或填写视频地址。</p>
                        <p>如果只填写图片/视频地址但正文里没有占位符，系统会把剩余图片或视频追加到正文末尾。</p>
                      </div>
                    ) : null}
                    {previewPage === "media" && activeCarouselSection.id === "detailPages" ? (
                      <div className="rounded-[20px] border border-[#2563eb]/20 bg-[#eef4ff] p-4 text-xs leading-6 text-slate-700">
                        <p className="font-bold text-slate-900">Detail cards format</p>
                        <p className="mt-2">Edit the Detail cards field. Separate cards with one blank line.</p>
                        <p>The first line of each block is the card title. The following lines are bullet items.</p>
                        <p>Example: Service scope, then new lines such as - Contract review and - Arbitration strategy.</p>
                      </div>
                    ) : null}
                    {getPairedDrawerFields(activeCarouselSectionsByLanguage, itemIndex, previewPage, activeCarouselSection.id, rowSlug)
                      .filter(({ fieldId }) => activeCarouselSection.id !== "pastEvents" || !isPastEventPlatformFieldId(fieldId))
                      .map(({ fieldId, label, kind }) => (
                      <section key={fieldId} className="space-y-3 rounded-[20px] border border-slate-200 bg-white p-4">
                        <h3 className="text-xs font-bold text-slate-700">{label}</h3>
                        {fieldId === "slug" ? (
                          <p className="rounded-2xl bg-slate-50 px-3 py-2 text-xs leading-5 text-slate-500">
                            Slug 是页面 URL 标识，也是中英文同一条内容的绑定标识。动态详情页地址会使用 /events/slug；同一条动态的中文和英文 Slug 必须保持一致。建议只使用小写英文、数字和连字符，例如 alb-china-awards-2026。
                          </p>
                        ) : null}
                        {editorLanguages.map((language) => {
                          const localizedItemIndex = getLocalizedCarouselItemIndex(language, itemIndex, rowSlug);
                          const localizedItem = activeCarouselSectionsByLanguage[language]?.items?.[localizedItemIndex];
                          const field = localizedItem?.fields.find(
                            (fieldItem) => fieldItem.id === fieldId,
                          );
                          const fieldValue = field?.value ?? getGeneratedEventMediaValue(localizedItem, fieldId);
                          const fieldKey = localizedItem
                            ? pageContentItemFieldKey(activeCarouselSection.id, localizedItem.id, fieldId)
                            : `${activeCarouselSection.id}__${itemIndex}__${fieldId}`;
                          const focused = focusedFieldKey === fieldKey && activeLanguage === language;
                          const effectiveKind = field?.kind ?? kind;
                          const uploadable = isUploadableDrawerField(fieldId, effectiveKind);
                          const fallbackField = {
                            id: fieldId,
                            label,
                            kind,
                            value: fieldValue,
                          } satisfies PageContentField;

                          return (
                            <label key={language} className="block space-y-1.5">
                              <span className={`text-xs font-bold ${focused ? "text-[#2563eb]" : "text-slate-500"}`}>
                                {language === "en" ? "English" : "中文"}
                              </span>
                              {effectiveKind === "textarea" ? (
                                <BufferedTextControl
                                  name={`${language}-${fieldKey}`}
                                  fieldKey={fieldKey}
                                  language={language}
                                  value={fieldValue}
                                  onCommit={(value) =>
                                    updateCarouselItemField(language, activeCarouselSection.id, localizedItemIndex, fieldId, value, fallbackField)
                                  }
                                  multiline
                                  rows={4}
                                  className={`w-full rounded-2xl border bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10 ${
                                    focused ? "border-[#2563eb] ring-4 ring-[#2563eb]/10" : "border-slate-200"
                                  }`}
                                />
                              ) : (
                                <BufferedTextControl
                                  name={`${language}-${fieldKey}`}
                                  fieldKey={fieldKey}
                                  language={language}
                                  value={fieldValue}
                                  onCommit={(value) =>
                                    updateCarouselItemField(language, activeCarouselSection.id, localizedItemIndex, fieldId, value, fallbackField)
                                  }
                                  className={`w-full rounded-2xl border bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10 ${
                                    focused ? "border-[#2563eb] ring-4 ring-[#2563eb]/10" : "border-slate-200"
                                  }`}
                                />
                              )}
                              {uploadable ? (
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-500">
                                    <Upload className="h-3.5 w-3.5" />
                                    {uploadLabelForField(fieldId)}
                                  </span>
                                  <input
                                    type="file"
                                    accept={uploadAcceptForField(fieldId)}
                                    className="text-xs text-slate-500 file:mr-3 file:rounded-xl file:border-0 file:bg-[#2563eb] file:px-3 file:py-2 file:text-xs file:font-bold file:text-white"
                                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                      const file = event.target.files?.[0];
                                      event.target.value = "";
                                      if (!file) return;
                                      void uploadCarouselItemAsset(language, activeCarouselSection.id, localizedItemIndex, fieldId, file, fallbackField);
                                    }}
                                  />
                                  {effectiveKind === "image" && fieldValue ? (
                                    <img src={resolvePublicAssetUrl(fieldValue)} alt="" className="h-14 w-20 rounded-xl border border-slate-200 object-cover" />
                                  ) : null}
                                </div>
                              ) : null}
                            </label>
                          );
                        })}
                      </section>
                    ))}
                    {activeCarouselSection.id === "pastEvents" ? (
                      <section className="space-y-4 rounded-[20px] border border-slate-200 bg-white p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <h3 className="text-xs font-bold text-slate-700">平台与节目</h3>
                            <p className="mt-1 text-xs text-slate-500">每个活动可增删平台，每个平台下可增删节目链接。</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => addPastEventPlatform(activeCarouselSection.id, itemIndex)}
                            className="shrink-0 rounded-xl bg-[#2563eb] px-3 py-2 text-xs font-bold text-white transition hover:bg-[#1d4ed8]"
                          >
                            新增平台
                          </button>
                        </div>

                        {getPastEventPlatformNumbersForDrawer(activeCarouselSectionsByLanguage, itemIndex).map((platformNumber) => (
                          <div key={platformNumber} className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                            <div className="flex items-center justify-between gap-3">
                              <p className="text-xs font-bold text-slate-700">平台 {platformNumber}</p>
                              <button
                                type="button"
                                onClick={() => removePastEventPlatform(activeCarouselSection.id, itemIndex, platformNumber)}
                                className="rounded-xl px-2.5 py-1.5 text-xs font-bold text-rose-500 transition hover:bg-rose-50"
                              >
                                删除平台
                              </button>
                            </div>
                            {["Name", "Logo", "Layout"].map((suffix) => {
                              const fieldId = `platform${platformNumber}${suffix}`;

                              return (
                                <section key={fieldId} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-3">
                                  <h4 className="text-xs font-bold text-slate-600">
                                    {suffix === "Name" ? "平台名称" : suffix === "Logo" ? "平台 Logo" : "布局 stack/row"}
                                  </h4>
                                  {editorLanguages.map((language) => {
                                    const fallback = getPastEventFieldFallback(fieldId, language);
                                    const localizedItem = activeCarouselSectionsByLanguage[language]?.items?.[itemIndex];
                                    const field = localizedItem?.fields.find(
                                      (fieldItem) => fieldItem.id === fieldId,
                                    );
                                    const fieldKey = localizedItem
                                      ? pageContentItemFieldKey(activeCarouselSection.id, localizedItem.id, fieldId)
                                      : `${activeCarouselSection.id}__${itemIndex}__${fieldId}`;
                                    const focused = focusedFieldKey === fieldKey && activeLanguage === language;

                                    return (
                                      <label key={language} className="block space-y-1.5">
                                        <span className={`text-xs font-bold ${focused ? "text-[#2563eb]" : "text-slate-500"}`}>
                                          {language === "en" ? "English" : "中文"}
                                        </span>
                                        <BufferedTextControl
                                          name={`${language}-${fieldKey}`}
                                          fieldKey={fieldKey}
                                          language={language}
                                          value={field?.value ?? ""}
                                          onCommit={(value) =>
                                            updateCarouselItemField(
                                              language,
                                              activeCarouselSection.id,
                                              itemIndex,
                                              fieldId,
                                              value,
                                              fallback,
                                            )
                                          }
                                          className={`w-full rounded-2xl border bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10 ${
                                            focused ? "border-[#2563eb] ring-4 ring-[#2563eb]/10" : "border-slate-200"
                                          }`}
                                        />
                                      </label>
                                    );
                                  })}
                                </section>
                              );
                            })}
                            <div className="space-y-3">
                              <div className="flex items-center justify-between gap-3">
                                <p className="text-xs font-bold text-slate-600">节目</p>
                                <button
                                  type="button"
                                  onClick={() => addPastEventProgram(activeCarouselSection.id, itemIndex, platformNumber)}
                                  className="rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-bold text-slate-600 transition hover:border-[#2563eb] hover:text-[#2563eb]"
                                >
                                  新增节目
                                </button>
                              </div>
                              {getPastEventProgramNumbersForDrawer(activeCarouselSectionsByLanguage, itemIndex, platformNumber).map(
                                (programNumber) => (
                                  <div key={programNumber} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-3">
                                    <div className="flex items-center justify-between gap-3">
                                      <p className="text-xs font-bold text-slate-600">节目 {programNumber}</p>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          removePastEventProgram(activeCarouselSection.id, itemIndex, platformNumber, programNumber)
                                        }
                                        className="rounded-xl px-2.5 py-1.5 text-xs font-bold text-rose-500 transition hover:bg-rose-50"
                                      >
                                        删除节目
                                      </button>
                                    </div>
                                    {["Label", "Href"].map((suffix) => {
                                      const fieldId = `platform${platformNumber}Link${programNumber}${suffix}`;

                                      return (
                                        <section key={fieldId} className="space-y-3">
                                          <h4 className="text-xs font-bold text-slate-600">
                                            {suffix === "Label" ? "节目标题" : "节目链接"}
                                          </h4>
                                          {editorLanguages.map((language) => {
                                            const fallback = getPastEventFieldFallback(fieldId, language);
                                            const localizedItem = activeCarouselSectionsByLanguage[language]?.items?.[itemIndex];
                                            const field = localizedItem?.fields.find(
                                              (fieldItem) => fieldItem.id === fieldId,
                                            );
                                            const fieldKey = localizedItem
                                              ? pageContentItemFieldKey(activeCarouselSection.id, localizedItem.id, fieldId)
                                              : `${activeCarouselSection.id}__${itemIndex}__${fieldId}`;
                                            const focused = focusedFieldKey === fieldKey && activeLanguage === language;

                                            return (
                                              <label key={language} className="block space-y-1.5">
                                                <span className={`text-xs font-bold ${focused ? "text-[#2563eb]" : "text-slate-500"}`}>
                                                  {language === "en" ? "English" : "中文"}
                                                </span>
                                                {suffix === "Label" ? (
                                                  <BufferedTextControl
                                                    name={`${language}-${fieldKey}`}
                                                    fieldKey={fieldKey}
                                                    language={language}
                                                    value={field?.value ?? ""}
                                                    multiline
                                                    rows={3}
                                                    onCommit={(value) =>
                                                      updateCarouselItemField(
                                                        language,
                                                        activeCarouselSection.id,
                                                        itemIndex,
                                                        fieldId,
                                                        value,
                                                        fallback,
                                                      )
                                                    }
                                                    className={`w-full rounded-2xl border bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10 ${
                                                      focused ? "border-[#2563eb] ring-4 ring-[#2563eb]/10" : "border-slate-200"
                                                    }`}
                                                  />
                                                ) : (
                                                  <BufferedTextControl
                                                    name={`${language}-${fieldKey}`}
                                                    fieldKey={fieldKey}
                                                    language={language}
                                                    value={field?.value ?? ""}
                                                    type="url"
                                                    onCommit={(value) =>
                                                      updateCarouselItemField(
                                                        language,
                                                        activeCarouselSection.id,
                                                        itemIndex,
                                                        fieldId,
                                                        value,
                                                        fallback,
                                                      )
                                                    }
                                                    className={`w-full rounded-2xl border bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10 ${
                                                      focused ? "border-[#2563eb] ring-4 ring-[#2563eb]/10" : "border-slate-200"
                                                    }`}
                                                  />
                                                )}
                                              </label>
                                            );
                                          })}
                                        </section>
                                      );
                                    })}
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                        ))}
                      </section>
                    ) : null}
                  </div>
                </section>
                );
              })}
            </div>
          </div>
        </aside>
      ) : null}
    </div>
  );
}
