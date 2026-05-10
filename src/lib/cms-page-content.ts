import type { Language } from "./site-types";

export type CmsPageId = "home" | "about" | "awards" | "event" | "media" | "podcast" | "contact";

export type PageContentFieldKind = "text" | "textarea" | "image" | "url";

export interface PageContentField {
  id: string;
  label: string;
  kind: PageContentFieldKind;
  value: string;
}

export interface PageContentRepeaterItem {
  id: string;
  label: string;
  fields: PageContentField[];
}

export interface PageContentSection {
  id: string;
  label: string;
  fields: PageContentField[];
  items?: PageContentRepeaterItem[];
}

export interface PageContentPage {
  id: CmsPageId;
  label: string;
  route: string;
  component: string;
  sections: PageContentSection[];
}

export type PageContentLocale = Record<CmsPageId, PageContentPage>;

export interface PageContentState {
  zh: PageContentLocale;
  en: PageContentLocale;
  updatedAt: string;
}

function field(id: string, label: string, kind: PageContentFieldKind, value: string): PageContentField {
  return { id, label, kind, value };
}

function section(
  id: string,
  label: string,
  fields: PageContentField[],
  items?: PageContentRepeaterItem[],
): PageContentSection {
  return { id, label, fields, ...(items ? { items } : {}) };
}

function page(
  id: CmsPageId,
  label: string,
  route: string,
  component: string,
  sections: PageContentSection[],
): PageContentPage {
  return { id, label, route, component, sections };
}

function repeaterItem(id: string, label: string, fields: PageContentField[]): PageContentRepeaterItem {
  return { id, label, fields };
}

export function createPastEventPlatformFields(platformNumber: number, language: Language) {
  const isZh = language === "zh";

  return [
    field(`platform${platformNumber}Name`, isZh ? `平台 ${platformNumber} 名称` : `Platform ${platformNumber} name`, "text", ""),
    field(`platform${platformNumber}Logo`, isZh ? `平台 ${platformNumber} Logo` : `Platform ${platformNumber} logo`, "image", ""),
    field(`platform${platformNumber}Layout`, isZh ? `平台 ${platformNumber} 布局` : `Platform ${platformNumber} layout`, "text", "grid"),
    ...createPastEventProgramFields(platformNumber, 1, language),
  ];
}

export function createPastEventProgramFields(platformNumber: number, programNumber: number, language: Language) {
  const isZh = language === "zh";

  return [
    field(
      `platform${platformNumber}Link${programNumber}Label`,
      isZh ? `平台 ${platformNumber} 节目 ${programNumber} 标题` : `Platform ${platformNumber} program ${programNumber} title`,
      "textarea",
      "",
    ),
    field(
      `platform${platformNumber}Link${programNumber}Href`,
      isZh ? `平台 ${platformNumber} 节目 ${programNumber} 链接` : `Platform ${platformNumber} program ${programNumber} link`,
      "url",
      "",
    ),
  ];
}

export function isPastEventPlatformFieldId(fieldId: string) {
  return /^platform\d+(Name|Logo|Layout|Link\d+(Label|Href))$/.test(fieldId);
}

export function getPastEventPlatformNumber(fieldId: string) {
  const match = fieldId.match(/^platform(\d+)(Name|Logo|Layout|Link\d+(Label|Href))$/);
  return match ? Number(match[1]) : null;
}

export function getPastEventProgramNumber(fieldId: string, platformNumber: number) {
  const match = fieldId.match(new RegExp(`^platform${platformNumber}Link(\\d+)(Label|Href)$`));
  return match ? Number(match[1]) : null;
}

export function getPastEventPlatformNumbersFromFields(fields: PageContentField[]) {
  return Array.from(
    new Set(
      fields
        .map((fieldItem) => getPastEventPlatformNumber(fieldItem.id))
        .filter((value): value is number => value !== null),
    ),
  ).sort((a, b) => a - b);
}

export function getPastEventProgramNumbersFromFields(fields: PageContentField[], platformNumber: number) {
  return Array.from(
    new Set(
      fields
        .map((fieldItem) => getPastEventProgramNumber(fieldItem.id, platformNumber))
        .filter((value): value is number => value !== null),
    ),
  ).sort((a, b) => a - b);
}

function officialPageContentLocale(language: Language): PageContentLocale {
  const isZh = language === "zh";
  const t = {
    home: isZh ? "首页" : "Home",
    about: isZh ? "关于我们" : "About Us",
    honors: isZh ? "虎诉荣誉" : "Honors",
    events: isZh ? "虎诉动态" : "Events",
    industries: isZh ? "服务行业" : "Industries",
    team: isZh ? "虎诉团队" : "Our Team",
    contact: isZh ? "联系我们" : "Contact",
  };

  return {
    home: page("home", t.home, "/", "HomePage", [
      section("hero", isZh ? "首页首屏" : "Hero", [
        field("title", isZh ? "主标题" : "Title", "text", "WE KNOW HOW TO WIN"),
        field("video", isZh ? "背景视频" : "Background video", "url", "/assets/home/海浪0508.mp4"),
      ]),
      section("vision", isZh ? "愿景" : "Vision", [
        field("title", isZh ? "标题" : "Title", "text", isZh ? "虎诉愿景" : "Vision"),
        field(
          "body",
          isZh ? "正文" : "Body",
          "textarea",
          isZh
            ? "我们致力于成为亚太地区卓越的争议解决律师事务所之一。"
            : "We are committed to be one of the extraordinary dispute resolution law firms in the Asia Pacific Region.",
        ),
        field("ctaLabel", isZh ? "按钮文字" : "CTA label", "text", isZh ? "了解更多" : "GET TO KNOW US"),
        field("ctaHref", isZh ? "按钮链接" : "CTA link", "url", "/about"),
      ]),
      section("industries", isZh ? "服务行业" : "Industries", [
        field("title", isZh ? "标题" : "Title", "text", isZh ? "服务行业" : "INDUSTRIES & SERVICES"),
        field(
          "body",
          isZh ? "说明" : "Description",
          "textarea",
          isZh
            ? "虎诉能够结合行业特征提供有针对性的法律服务，覆盖争议解决、合规、民刑交叉及公司法律咨询等。"
            : "Tiger Partners offers targeted legal services based on industry characteristics, covering dispute resolution, compliance, civil-criminal crossover matters, and corporate legal consulting.",
        ),
      ]),
      section("events", isZh ? "虎诉动态" : "Events", [
        field("title", isZh ? "标题" : "Title", "text", isZh ? "虎诉动态" : "EVENTS"),
        field("subtitle", isZh ? "说明" : "Subtitle", "textarea", isZh ? "关注虎诉最新动态与专业观察。" : "Latest Tiger Partners updates and professional insights."),
      ]),
      section("clients", isZh ? "客户" : "Clients", [
        field("title", isZh ? "标题" : "Title", "text", isZh ? "我们的客户" : "OUR CLIENTS"),
      ]),
    ]),
    about: page("about", t.about, "/about", "AboutPage", [
      section("hero", isZh ? "首屏" : "Hero", [
        field("title", isZh ? "标题" : "Title", "text", isZh ? "关于我们" : "ABOUT US"),
        field(
          "body",
          isZh ? "正文" : "Body",
          "textarea",
          isZh
            ? "虎诉是一家专注于重大、复杂民商事争议解决的精品律师事务所。"
            : "Tiger Partners is a boutique law firm focused on major and complex civil and commercial dispute resolution.",
        ),
      ]),
      section("vision", isZh ? "愿景" : "Vision", [
        field("title", isZh ? "标题" : "Title", "text", isZh ? "虎诉愿景" : "VISION"),
        field("body", isZh ? "正文" : "Body", "textarea", isZh ? "我们追求卓越，致力于维护客户的合法权益。" : "We pursue excellence and are committed to protecting clients' lawful rights and interests."),
      ]),
      section("honors", isZh ? "虎诉荣誉" : "Honors", [field("title", isZh ? "标题" : "Title", "text", isZh ? "虎诉荣誉" : "HONORS")]),
      section("culture", isZh ? "虎诉文化" : "Culture", [field("title", isZh ? "标题" : "Title", "text", isZh ? "虎诉文化" : "CULTURE")]),
      section("chronicle", isZh ? "大事记" : "Chronicle", [field("title", isZh ? "标题" : "Title", "text", isZh ? "大事记" : "CHRONICLE")]),
    ]),
    awards: page("awards", t.honors, "/about#honors", "AboutPage", [
      section("honors", isZh ? "虎诉荣誉" : "Honors", [
        field("title", isZh ? "标题" : "Title", "text", isZh ? "虎诉荣誉" : "HONORS"),
        field("subtitle", isZh ? "说明" : "Subtitle", "textarea", isZh ? "虎诉受到多个权威法律评级机构与奖项组织的认可。" : "Tiger Partners is recognized by leading legal directories and awarding organizations."),
      ]),
    ]),
    event: page("event", t.events, "/events", "EventsPage", [
      section("hero", isZh ? "首屏" : "Hero", [field("title", isZh ? "标题" : "Title", "text", isZh ? "虎诉动态" : "EVENTS")]),
      section("list", isZh ? "动态列表" : "Event list", [field("title", isZh ? "标题" : "Title", "text", isZh ? "最新动态" : "Latest Updates")]),
    ]),
    media: page("media", t.industries, "/industries", "IndustriesPage", [
      section("hero", isZh ? "首屏" : "Hero", [
        field("title", isZh ? "标题" : "Title", "text", isZh ? "服务行业" : "INDUSTRIES"),
        field("body", isZh ? "说明" : "Description", "textarea", isZh ? "我们在重点行业提供专业、精准、高效的法律服务。" : "We provide professional, precise, and efficient legal services across key industries."),
      ]),
      section("cards", isZh ? "行业卡片" : "Industry cards", [], [
        repeaterItem("private-equity", isZh ? "私募股权" : "Private Equity", [
          field("title", isZh ? "标题" : "Title", "text", isZh ? "私募股权" : "Private Equity"),
          field("href", isZh ? "链接" : "Link", "url", "/industries/private-equity"),
        ]),
        repeaterItem("finance", isZh ? "金融" : "Finance", [
          field("title", isZh ? "标题" : "Title", "text", isZh ? "金融" : "Finance"),
          field("href", isZh ? "链接" : "Link", "url", "/industries/finance"),
        ]),
        repeaterItem("real-estate", isZh ? "房地产" : "Real Estate", [
          field("title", isZh ? "标题" : "Title", "text", isZh ? "房地产" : "Real Estate"),
          field("href", isZh ? "链接" : "Link", "url", "/industries/real-estate"),
        ]),
      ]),
    ]),
    podcast: page("podcast", t.team, "/team", "TeamPage", [
      section("hero", isZh ? "首屏" : "Hero", [field("title", isZh ? "标题" : "Title", "text", isZh ? "虎诉团队" : "OUR TEAM")]),
      section("specialForces", isZh ? "团队口号" : "Team slogan", [
        field("title", isZh ? "标题" : "Title", "text", isZh ? "我们，即为精锐之师" : "WE ARE SPECIAL FORCES"),
      ]),
      section("members", isZh ? "团队成员" : "Members", [field("title", isZh ? "标题" : "Title", "text", isZh ? "合伙人及顾问" : "PARTNERS & COUNSELS")]),
    ]),
    contact: page("contact", t.contact, "/contact", "ContactPage", [
      section("hero", isZh ? "首屏" : "Hero", [field("title", isZh ? "标题" : "Title", "text", isZh ? "联系我们" : "CONTACT")]),
      section("contact", isZh ? "联系文案" : "Contact copy", [
        field("title", isZh ? "标题" : "Title", "text", isZh ? "联系我们" : "Contact us"),
        field(
          "body",
          isZh ? "正文" : "Body",
          "textarea",
          isZh
            ? "如您有任何法律疑问或争议，欢迎随时与我们联系。我们诚挚期待为您提供专业的法律服务，致力于维护您的合法权益。"
            : "If you have any legal questions or disputes, please feel free to contact us. We look forward to providing professional legal services and protecting your lawful rights and interests.",
        ),
      ]),
      section("join", isZh ? "加入虎诉" : "Join us", [field("title", isZh ? "标题" : "Title", "text", isZh ? "加入虎诉" : "Join Us")]),
    ]),
  };
}

export function normalizePageContentTitleCasing(pageContent: PageContentState): PageContentState {
  return pageContent;
}

export const defaultPageContentState: PageContentState = {
  zh: officialPageContentLocale("zh"),
  en: officialPageContentLocale("en"),
  updatedAt: new Date("2026-05-10T14:00:00.000Z").toISOString(),
};

export function getPageContentField(
  pageContent: PageContentState,
  language: Language,
  pageId: CmsPageId,
  sectionId: string,
  fieldId: string,
  fallback = "",
) {
  const fieldValue = pageContent[language]?.[pageId]?.sections
    .find((sectionItem) => sectionItem.id === sectionId)
    ?.fields.find((fieldItem) => fieldItem.id === fieldId)?.value;

  return fieldValue === undefined || fieldValue === "" ? fallback : fieldValue;
}

export function getPageContentSectionItems(
  pageContent: PageContentState,
  language: Language,
  pageId: CmsPageId,
  sectionId: string,
) {
  return pageContent[language]?.[pageId]?.sections.find((sectionItem) => sectionItem.id === sectionId)?.items ?? [];
}

export function getPageContentItemField(item: PageContentRepeaterItem | undefined, fieldId: string, fallback = "") {
  const value = item?.fields.find((fieldItem) => fieldItem.id === fieldId)?.value;
  return value === undefined || value === "" ? fallback : value;
}

export function getPageContentLines(
  pageContent: PageContentState,
  language: Language,
  pageId: CmsPageId,
  sectionId: string,
  fieldIds: readonly string[],
  fallback: readonly string[],
) {
  return fieldIds
    .map((fieldId, index) => getPageContentField(pageContent, language, pageId, sectionId, fieldId, fallback[index] ?? ""))
    .filter(Boolean);
}

export function splitPageContentParagraphs(value: string, fallback: readonly string[]) {
  const lines = value
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

  return lines.length ? lines : [...fallback];
}

export function pageContentItemFieldKey(sectionId: string, itemId: string, fieldId: string) {
  return `${sectionId}__${itemId}__${fieldId}`;
}
