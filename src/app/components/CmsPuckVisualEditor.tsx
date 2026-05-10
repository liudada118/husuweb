"use client";

import "@puckeditor/core/puck.css";

import { Puck } from "@puckeditor/core";
import type { Config, Data, Plugin, PuckAction, Viewports } from "@puckeditor/core";
import type { CSSProperties, Dispatch, SetStateAction } from "react";
import { useEffect, useMemo, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { ArrowDown, ArrowUp, ChevronDown, ChevronLeft, Trash2, X } from "lucide-react";
import { PublicCmsProvider as OfficialPublicCmsProvider } from "@/cms/PublicCmsProvider";
import type { OfficialCmsPublicState } from "@/cms/official-state";
import { AboutPage } from "@/components/pages/AboutPage";
import { ContactPage } from "@/components/pages/ContactPage";
import { EventsPage } from "@/components/pages/EventsPage";
import { HomePage } from "@/components/pages/HomePage";
import { IndustriesPage } from "@/components/pages/IndustriesPage";
import { TeamPage } from "@/components/pages/TeamPage";
import { LanguageProvider as OfficialLanguageProvider } from "@/i18n/LanguageProvider";
import {
  createPastEventPlatformFields,
  createPastEventProgramFields,
  getPastEventPlatformNumber,
  getPastEventPlatformNumbersFromFields,
  getPastEventProgramNumber,
  getPastEventProgramNumbersFromFields,
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
  { id: "awards", label: "虎诉荣誉", navLabel: "HONORS", route: "/about#honors" },
  { id: "event", label: "虎诉动态", navLabel: "EVENTS", route: "/events" },
  { id: "media", label: "服务行业", navLabel: "INDUSTRIES", route: "/industries" },
  { id: "podcast", label: "虎诉团队", navLabel: "OUR TEAM", route: "/team" },
  { id: "contact", label: "联系我们", navLabel: "CONTACT", route: "/contact" },
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
  return Boolean(section.items?.some((item) => item.fields.some((field) => field.id === "date")));
}

function getItemFieldValue(item: PageContentRepeaterItem, fieldId: string) {
  return item.fields.find((field) => field.id === fieldId)?.value ?? "";
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
) {
  for (const language of ["zh", "en"] as Language[]) {
    const item = sectionsByLanguage[language]?.items?.[itemIndex];
    const imageField = item?.fields.find((fieldItem) => isRepeaterImageField(fieldItem));

    if (imageField?.value.trim()) {
      return imageField.value.trim();
    }
  }

  return "";
}

function getRepeaterDisplayTitle(
  sectionsByLanguage: Partial<Record<Language, PageContentSection | undefined>>,
  itemIndex: number,
  fallback: string,
) {
  const preferredFieldIds = ["title", "name", "award", "platform", "brand", "label", "tag"];

  for (const language of ["zh", "en"] as Language[]) {
    const item = sectionsByLanguage[language]?.items?.[itemIndex];
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
    const item = sectionsByLanguage[language]?.items?.[itemIndex];
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

function getPairedDrawerFields(
  sectionsByLanguage: Partial<Record<Language, PageContentSection | undefined>>,
  itemIndex: number,
) {
  const fieldMap = new Map<string, { fieldId: string; label: string; kind: PageContentField["kind"] }>();

  (["en", "zh"] as Language[]).forEach((language) => {
    const item = sectionsByLanguage[language]?.items?.[itemIndex];

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

function SiteChromeInput({
  fieldKey,
  focused,
  label,
  value,
  type = "text",
  onChange,
}: {
  fieldKey: string;
  focused: boolean;
  label: string;
  value: string;
  type?: "text" | "url";
  onChange: (value: string) => void;
}) {
  return (
    <label className="block space-y-1.5">
      <span className={`text-xs font-bold ${focused ? "text-[#2563eb]" : "text-slate-600"}`}>{label}</span>
      <input
        name={fieldKey}
        data-cms-editor-field={fieldKey}
        data-cms-editor-language="site"
        value={value}
        type={type}
        onChange={(event) => onChange(event.target.value)}
        className={`w-full rounded-2xl border bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10 ${
          focused ? "border-[#2563eb] ring-4 ring-[#2563eb]/10" : "border-slate-200"
        }`}
      />
    </label>
  );
}

function SiteChromeFields({
  siteContent,
  focusedFieldKey,
  mode,
  onChange,
}: {
  siteContent: SiteContent;
  focusedFieldKey: string | null;
  mode: "header" | "footer";
  onChange: (path: PathSegment[], value: string) => void;
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
    { path: ["siteSettings", "footerEmail"] as PathSegment[], label: "邮箱", value: settings.footerEmail },
    { path: ["siteSettings", "footerPhone"] as PathSegment[], label: "联系方式", value: settings.footerPhone },
  ];
  const footerRightFields = [
    { path: ["siteSettings", "footerRightLogoUrl"] as PathSegment[], label: "右侧 Logo", value: settings.footerRightLogoUrl },
    {
      path: ["siteSettings", "officialSiteUrl"] as PathSegment[],
      label: "官网链接",
      value: settings.officialSiteUrl,
      type: "url" as const,
    },
    { path: ["siteSettings", "officialSiteLabel"] as PathSegment[], label: "官网文字", value: settings.officialSiteLabel },
    { path: ["siteSettings", "footerOfficialLogoUrl"] as PathSegment[], label: "官网图片", value: settings.footerOfficialLogoUrl },
  ];
  const footerQuoteFields = [
    { path: ["siteSettings", "footerQuote"] as PathSegment[], label: "最下面一行引言", value: settings.footerQuote },
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

              return (
                <SiteChromeInput
                  key={fieldKey}
                  fieldKey={fieldKey}
                  focused={focusedFieldKey === fieldKey}
                  label={field.label}
                  value={field.value ?? ""}
                  type={("type" in field ? field.type : undefined) as "text" | "url" | undefined}
                  onChange={(value) => onChange(field.path, value)}
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

                return (
                  <SiteChromeInput
                    key={fieldKey}
                    fieldKey={fieldKey}
                    focused={focusedFieldKey === fieldKey}
                    label={field.label}
                    value={field.value ?? ""}
                    type={field.type}
                    onChange={(value) => onChange(path, value)}
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

                return (
                  <SiteChromeInput
                    key={fieldKey}
                    fieldKey={fieldKey}
                    focused={focusedFieldKey === fieldKey}
                    label={field.label}
                    value={field.value ?? ""}
                    type={field.type}
                    onChange={(value) => onChange(path, value)}
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

function parseSortableDate(value: string) {
  const normalized = value.trim();

  if (!normalized) return 0;

  const directTime = Date.parse(normalized);
  if (Number.isFinite(directTime)) return directTime;

  const numericMatch = normalized.match(/(\d{4})\D+(\d{1,2})\D+(\d{1,2})/);
  if (!numericMatch) return 0;

  const [, year, month, day] = numericMatch;
  return new Date(Number(year), Number(month) - 1, Number(day)).getTime();
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
    last === "footerOfficialLogoUrl"
  ) return "image";
  if (last === "officialSiteUrl" || last === "href") return "url";
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

function getLivePageProps(data: CmsPuckData): LivePageProps {
  return (data.content.find((item) => item.type === "Live3UiPage")?.props ?? {}) as LivePageProps;
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

function PreviewPageFrame({ page }: { page: VisualPage }) {
  if (page === "home") return <HomePage />;
  if (page === "about" || page === "awards") return <AboutPage />;
  if (page === "event") return <EventsPage />;
  if (page === "media") return <IndustriesPage />;
  if (page === "podcast") return <TeamPage />;
  return <ContactPage />;
}

function officialPreviewState(previewData: PublicCmsData): OfficialCmsPublicState {
  return {
    version: 1,
    updatedAt: new Date().toISOString(),
    assets: {
      titleLogo: previewData.siteSettings.logoUrl || "/assets/title/logo.svg",
      footerLogo: previewData.siteSettings.footerLeftLogoUrl || "/assets/foot/logo.svg",
      footerQr: previewData.siteSettings.footerOfficialLogoUrl || "/assets/foot/QRcode.png?v=202605101205",
    },
    footer: {
      phone: previewData.siteSettings.footerPhone || "010-85885228",
      email: previewData.siteSettings.footerEmail || "contact@tigerpartners.cn",
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
        "/assets/home/海浪0508.mp4",
      eventSlugs: [
        "kinsey-kang-hong-kong-legal-counsel",
        "official-account-mini-program-upgrade",
        "benchmark-litigation-2022-dispute-resolution",
        "civil-code-contract-termination-rules-part-one",
        "wuhan-kingold-fake-gold-jurisdiction-objection",
      ],
    },
    events: {
      overrides: {},
    },
  };
}

function createPuckConfig({
  activePage,
  labelPage,
  activeLanguage,
  previewDevice,
  previewData,
  siteContent,
  onFieldClick,
  onOpenCarouselDrawer,
}: {
  activePage: PageContentPage;
  labelPage: PageContentPage;
  activeLanguage: Language;
  previewDevice: CmsPreviewDevice;
  previewData: PublicCmsData;
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
        label: `${labelSection?.label ?? section.label} / ${labelField?.label ?? field.label}`,
      };
    });

    if (section.items?.length) {
      livePageFields[carouselSummaryFieldKey(section.id)] = {
        type: "custom",
        label: `${labelSection?.label ?? section.label} / 内容管理`,
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
          ...livePageFields,
        },
        defaultProps: {
          id: `${activeLanguage}-${activePage.id}-live-page`,
          pageId: activePage.id,
          language: activeLanguage,
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

                .cms-puck-preview [data-cms-field] {
                  cursor: pointer;
                  outline: 0 solid transparent;
                  outline-offset: 6px;
                  transition: outline-color 160ms ease, background-color 160ms ease;
                }

                .cms-puck-preview [data-cms-field]:hover {
                  outline: 2px solid rgba(37, 99, 235, 0.9);
                  background-color: rgba(37, 99, 235, 0.08);
                }

                .cms-puck-preview .pointer-events-none [data-cms-field] {
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
                  <OfficialPublicCmsProvider initialState={officialPreviewState(publicData)}>
                    <OfficialLanguageProvider key={`${language}-${pageId}`} initialLanguage={language} persist={false}>
                      <PreviewPageFrame page={pageId} />
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
  loadVersionForEditing,
  submitVersionDraft,
  setPanel,
  persistWorkspace,
  setMessage,
}: {
  siteContent: SiteContent;
  visualEditor: VisualEditorState;
  pageContent: PageContentState;
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
  loadVersionForEditing: (versionId: number | null) => Promise<void>;
  submitVersionDraft: (
    versionId: number,
    nextState?: { siteContent?: SiteContent; visualEditor?: VisualEditorState; pageContent?: PageContentState },
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
  const [focusedFieldKey, setFocusedFieldKey] = useState<string | null>(null);
  const [previewDevice, setPreviewDevice] = useState<CmsPreviewDevice>("desktop");
  const [carouselDrawer, setCarouselDrawer] = useState<CarouselDrawerState | null>(null);
  const [expandedCarouselItems, setExpandedCarouselItems] = useState<Record<string, boolean>>({});
  const editorLanguages = ["en", "zh"] as Language[];
  const previewPage: VisualPage = isVisualPageTab(page) ? page : "home";
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
  const activeCarouselSectionsByLanguage = carouselDrawer
    ? ({
        zh: pageContent.zh[previewPage].sections.find((section) => section.id === carouselDrawer.sectionId),
        en: pageContent.en[previewPage].sections.find((section) => section.id === carouselDrawer.sectionId),
      } satisfies Partial<Record<Language, PageContentSection | undefined>>)
    : {};
  const activeCarouselSection = activeCarouselSectionsByLanguage.zh ?? activeCarouselSectionsByLanguage.en;
  const activeSectionHasDate = editorLanguages.some((language) => {
    const section = activeCarouselSectionsByLanguage[language];
    return section ? sectionHasDateItems(section) : false;
  });
  const activeVersion = editingVersionId ? versions.find((version) => version.id === editingVersionId) : null;
  const selectedVersionId = editingVersionId ?? versions[0]?.id ?? "";
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
  const updatePageField = (language: Language, sectionId: string, fieldId: string, value: string) => {
    if (!isVisualPageTab(page)) return;
    const pageId = page;

    setPageContent((current) => {
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
  const updateCarouselItems = (
    language: Language,
    sectionId: string,
    updater: (items: PageContentRepeaterItem[], section: PageContentSection) => PageContentRepeaterItem[],
  ) => {
    if (!isVisualPageTab(page)) return;
    const pageId = page;

    setPageContent((current) => {
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
  const updateCarouselItemField = (
    language: Language,
    sectionId: string,
    itemIndex: number,
    fieldId: string,
    value: string,
    fallback: PageContentField | null = null,
  ) => {
    updateCarouselItems(language, sectionId, (items) =>
      items.map((item, index) =>
        index === itemIndex
          ? { ...item, fields: upsertRepeaterField(item.fields, fieldId, value, fallback) }
          : item,
      ),
    );
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

    editorLanguages.forEach((language) => {
      updateCarouselItems(language, section.id, (items, localizedSection) => {
        const template = items[items.length - 1] ?? localizedSection.items?.[0];
        const nextIndex = items.length + 1;

        return [
          ...items,
          {
            id: nextId,
            label: `${localizedSection.label} ${nextIndex}`,
            fields:
              template?.fields.map((field) => ({
                ...field,
                label: field.label.replace(/\d+/g, String(nextIndex)),
                value: "",
              })) ?? [],
          },
        ];
      });
    });
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
  const sortCarouselItemsByDate = (sectionId: string, direction: "asc" | "desc") => {
    editorLanguages.forEach((language) => {
      updateCarouselItems(language, sectionId, (items) =>
        [...items].sort((a, b) => {
          const aTime = parseSortableDate(getItemFieldValue(a, "date"));
          const bTime = parseSortableDate(getItemFieldValue(b, "date"));

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
        previewData: basePreviewData,
        siteContent,
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
    [activeLanguage, activePage, basePreviewData, isSiteChromeTab, labelPage, page, previewDevice, setMessage, siteContent],
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
    setPuckData(getInitialPuckData(pageContent, activeLanguage, nextPreviewPage));
    setPage(nextPage);
  };

  const switchLanguage = (nextLanguage: Language) => {
    setFocusedFieldKey(null);
    setPuckData(getInitialPuckData(pageContent, nextLanguage, previewPage));
    setActiveLanguage(nextLanguage);
  };

  const updateDraftContent = (nextData: CmsPuckData) => {
    setPuckData(nextData);
    if (isVisualPageTab(page)) {
      setPageContent((current) => applyPuckDataToPageContent(current, activeLanguage, page, nextData));
    }
  };

  const savePuckData = async (nextData: CmsPuckData, publish: boolean) => {
    if (!editingVersionId && versions.length > 0) {
      setMessage("默认版本正在加载，请稍后再保存。");
      return;
    }

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

    setPuckData(nextData);
    setPageContent(nextPageContent);
    setVisualEditor(() => nextVisualEditor);

    const ok = editingVersionId
      ? await submitVersionDraft(editingVersionId, {
          siteContent,
          visualEditor: nextVisualEditor,
          pageContent: nextPageContent,
        })
      : await persistWorkspace({
          siteContent,
          visualEditor: nextVisualEditor,
          pageContent: nextPageContent,
        });

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

        <div className="flex min-w-[220px] items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
          <span className="shrink-0 text-xs font-bold text-slate-500">版本</span>
          <select
            value={selectedVersionId}
            onChange={(event) => {
              void loadVersionForEditing(Number(event.target.value));
            }}
            disabled={versions.length === 0}
            className="min-w-0 flex-1 bg-transparent text-xs font-semibold text-slate-700 outline-none"
          >
            {versions.length === 0 ? <option value="">暂无版本</option> : null}
            {versions.map((version) => (
              <option key={version.id} value={version.id}>
                {version.name}
              </option>
            ))}
          </select>
        </div>

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

                          return (
                            <label key={language} className="block space-y-1.5">
                              <span className={`text-xs font-bold ${focused ? "text-[#2563eb]" : "text-slate-600"}`}>
                                {language === "en" ? "English" : "中文"}
                              </span>
                              {(field?.kind ?? labelField.kind) === "textarea" ? (
                                <textarea
                                  name={`${language}-${fieldKey}`}
                                  data-cms-editor-field={fieldKey}
                                  data-cms-editor-language={language}
                                  value={field?.value ?? ""}
                                  onChange={(event) => updatePageField(language, labelSection.id, labelField.id, event.target.value)}
                                  rows={4}
                                  className={`w-full rounded-2xl border bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10 ${
                                    focused ? "border-[#2563eb] ring-4 ring-[#2563eb]/10" : "border-slate-200"
                                  }`}
                                />
                              ) : (
                                <input
                                  name={`${language}-${fieldKey}`}
                                  data-cms-editor-field={fieldKey}
                                  data-cms-editor-language={language}
                                  value={field?.value ?? ""}
                                  type={(field?.kind ?? labelField.kind) === "url" ? "url" : "text"}
                                  onChange={(event) => updatePageField(language, labelSection.id, labelField.id, event.target.value)}
                                  className={`w-full rounded-2xl border bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10 ${
                                    focused ? "border-[#2563eb] ring-4 ring-[#2563eb]/10" : "border-slate-200"
                                  }`}
                                />
                              )}
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
            <button
              type="button"
              onClick={() => addCarouselItem(activeCarouselSection)}
              className="w-full rounded-2xl bg-[#2563eb] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#1d4ed8]"
            >
              新增内容项
            </button>
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
              {Array.from({
                length: Math.max(
                  activeCarouselSectionsByLanguage.zh?.items?.length ?? 0,
                  activeCarouselSectionsByLanguage.en?.items?.length ?? 0,
                ),
              }).map((_, itemIndex) => {
                const primaryItem = activeCarouselSectionsByLanguage.zh?.items?.[itemIndex] ??
                  activeCarouselSectionsByLanguage.en?.items?.[itemIndex];
                const itemKey = `${activeCarouselSection.id}-${primaryItem?.id ?? itemIndex}`;
                const isExpanded = expandedCarouselItems[itemKey] ?? carouselDrawer?.itemIndex === itemIndex;
                const thumbnail = getRepeaterThumbnail(activeCarouselSectionsByLanguage, itemIndex);
                const title = getRepeaterDisplayTitle(activeCarouselSectionsByLanguage, itemIndex, `Item ${itemIndex + 1}`);
                const summary = getRepeaterDisplaySummary(activeCarouselSectionsByLanguage, itemIndex, primaryItem?.id ?? "");

                return (
                <section
                  key={primaryItem?.id ?? `drawer-item-${itemIndex}`}
                  className={`rounded-[24px] border p-4 ${
                    carouselDrawer?.itemIndex === itemIndex ? "border-[#2563eb] bg-[#eef4ff]" : "border-slate-200 bg-slate-50"
                  }`}
                >
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
                      <p className="text-sm font-bold text-slate-900">{title}</p>
                      <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">{summary}</p>
                    </button>
                    <div className="hidden">
                      <p className="text-sm font-bold text-slate-900">{primaryItem?.label || `Item ${itemIndex + 1}`}</p>
                      <p className="mt-1 text-xs text-slate-500">ID: {primaryItem?.id ?? "-"}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5">
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
                    <button
                      type="button"
                      onClick={() => setExpandedCarouselItems((current) => ({ ...current, [itemKey]: !isExpanded }))}
                      className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-2.5 py-2 text-xs font-bold text-slate-600 transition hover:border-[#2563eb] hover:text-[#2563eb]"
                    >
                      <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                      {isExpanded ? "折叠" : "展开"}
                    </button>
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
                    {getPairedDrawerFields(activeCarouselSectionsByLanguage, itemIndex)
                      .filter(({ fieldId }) => activeCarouselSection.id !== "pastEvents" || !isPastEventPlatformFieldId(fieldId))
                      .map(({ fieldId, label, kind }) => (
                      <section key={fieldId} className="space-y-3 rounded-[20px] border border-slate-200 bg-white p-4">
                        <h3 className="text-xs font-bold text-slate-700">{label}</h3>
                        {editorLanguages.map((language) => {
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
                              {(field?.kind ?? kind) === "textarea" ? (
                                <textarea
                                  name={`${language}-${fieldKey}`}
                                  data-cms-editor-field={fieldKey}
                                  data-cms-editor-language={language}
                                  value={field?.value ?? ""}
                                  onChange={(event) =>
                                    updateCarouselItemField(language, activeCarouselSection.id, itemIndex, fieldId, event.target.value, {
                                      id: fieldId,
                                      label,
                                      kind,
                                      value: "",
                                    })
                                  }
                                  rows={4}
                                  className={`w-full rounded-2xl border bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10 ${
                                    focused ? "border-[#2563eb] ring-4 ring-[#2563eb]/10" : "border-slate-200"
                                  }`}
                                />
                              ) : (
                                <input
                                  name={`${language}-${fieldKey}`}
                                  data-cms-editor-field={fieldKey}
                                  data-cms-editor-language={language}
                                  value={field?.value ?? ""}
                                  onChange={(event) =>
                                    updateCarouselItemField(language, activeCarouselSection.id, itemIndex, fieldId, event.target.value, {
                                      id: fieldId,
                                      label,
                                      kind,
                                      value: "",
                                    })
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
                                        <input
                                          name={`${language}-${fieldKey}`}
                                          data-cms-editor-field={fieldKey}
                                          data-cms-editor-language={language}
                                          value={field?.value ?? ""}
                                          onChange={(event) =>
                                            updateCarouselItemField(
                                              language,
                                              activeCarouselSection.id,
                                              itemIndex,
                                              fieldId,
                                              event.target.value,
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
                                                  <textarea
                                                    name={`${language}-${fieldKey}`}
                                                    data-cms-editor-field={fieldKey}
                                                    data-cms-editor-language={language}
                                                    value={field?.value ?? ""}
                                                    rows={3}
                                                    onChange={(event) =>
                                                      updateCarouselItemField(
                                                        language,
                                                        activeCarouselSection.id,
                                                        itemIndex,
                                                        fieldId,
                                                        event.target.value,
                                                        fallback,
                                                      )
                                                    }
                                                    className={`w-full rounded-2xl border bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10 ${
                                                      focused ? "border-[#2563eb] ring-4 ring-[#2563eb]/10" : "border-slate-200"
                                                    }`}
                                                  />
                                                ) : (
                                                  <input
                                                    name={`${language}-${fieldKey}`}
                                                    data-cms-editor-field={fieldKey}
                                                    data-cms-editor-language={language}
                                                    value={field?.value ?? ""}
                                                    type="url"
                                                    onChange={(event) =>
                                                      updateCarouselItemField(
                                                        language,
                                                        activeCarouselSection.id,
                                                        itemIndex,
                                                        fieldId,
                                                        event.target.value,
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
