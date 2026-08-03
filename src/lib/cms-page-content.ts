import { events, formatEventDate } from "@/data/events";
import { teamProfiles } from "@/data/teamProfiles";
import { copy } from "@/i18n/copy";
import type { Language } from "./site-types";

export type CmsPageId = "home" | "about" | "coreValue" | "awards" | "event" | "media" | "podcast" | "contact";

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

function localizedCopy<T>(language: Language, value: { en: T; zh: T }) {
  return value[language];
}

function copyLines(language: Language, value: { en: readonly string[]; zh: readonly string[] }) {
  return localizedCopy(language, value).join("\n");
}

function copyTextBlock(language: Language, value: { en: string | readonly string[]; zh: string | readonly string[] }) {
  const localized = localizedCopy(language, value);
  return typeof localized === "string" ? localized : localized.join("\n");
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

const industryDefaults = [
  {
    id: "private-equity",
    enTitle: "Private Equity",
    zhTitle: "私募股权",
    image: "/assets/home/INDUSTRIES1.webp",
    href: "/industries/private-equity",
    cls: "lg:col-span-2",
  },
  {
    id: "finance",
    enTitle: "Finance",
    zhTitle: "金融",
    image: "/assets/home/INDUSTRIES2.webp",
    href: "/industries/finance",
    cls: "lg:col-span-1",
  },
  {
    id: "real-estate",
    enTitle: "Real Estate",
    zhTitle: "房地产",
    image: "/assets/home/INDUSTRIES3.webp",
    href: "/industries/real-estate",
    cls: "lg:col-span-1 lg:row-span-2",
  },
  {
    id: "sports-and-e-sports",
    enTitle: "Sports and E-Sports",
    zhTitle: "体育和电子竞技",
    image: "/assets/home/INDUSTRIES4.webp",
    href: "/industries/sports-and-e-sports",
    cls: "lg:col-span-1",
  },
  {
    id: "international-trade",
    enTitle: "International Trade",
    zhTitle: "国际贸易",
    image: "/assets/home/INDUSTRIES5.webp",
    href: "/industries/international-trade",
    cls: "lg:col-span-1",
  },
  {
    id: "cyber-tech-and-game",
    enTitle: "Cyber Tech and Game",
    zhTitle: "互联网科技及游戏",
    image: "/assets/home/INDUSTRIES6.png",
    href: "/industries/cyber-tech-and-game",
    cls: "lg:col-span-2",
  },
];

const industryDetailDefaults: Record<string, { image: string; enIntro: string; zhIntro: string }> = {
  "private-equity": {
    image: "/assets/industries/in1.webp",
    enIntro:
      "Tiger Partners provides a full range of legal services to many well-known Chinese investment institutions, portfolio/invested companies, founders or shareholders, ranging from potential risk control, pre-litigation dispute resolution, litigation, arbitration and enforcement, to achieve their ultimate business goals.",
    zhIntro:
      "虎诉为国内众多知名投资机构、被投项目公司及创始人或股东提供从潜在风险控制、诉前争端解决，到代理诉讼仲裁和强制执行的全方位法律服务，以期为客户实现最终商业目的。",
  },
  finance: {
    image: "/assets/industries/in3.webp",
    enIntro:
      "Tiger Partners has highly specialized knowledge and extensive experience in dispute resolution relating to finance, and is able to provide early warning and prevent risks arising from various financial products, investment and finance transactions, and provide all-round dispute resolution services in civil & commercial and civil cross criminal area.",
    zhIntro:
      "虎诉在金融相关争议解决领域具有高度专业的知识技术和丰富的实操经验，能够为各类金融产品及投融资交易所衍生的争议提供风险预警和防范，以及全方位民商事、刑民交叉争议解决服务。",
  },
  "real-estate": {
    image: "/assets/industries/in4.webp",
    enIntro:
      "Tiger Partners is specialized in dispute resolution in real estate industry. From traditional disputes over construction contracts to large-scale disputes over real estate, land purchase and lease agreements, Tiger Partners has a profound theoretical basis and extensive practical experience.",
    zhIntro:
      "虎诉擅长房地产行业的争议解决法律服务，从传统建设工程合同纠纷案件到大型房地产、土地的买卖、租赁协议纠纷案件，虎诉均拥有深厚的理论基础和丰富的实操经验。",
  },
  "sports-and-e-sports": {
    image: "/assets/industries/in5.webp",
    enIntro:
      "Tiger Partners has deeply participated in the increasingly mature commercialization process of China's sports industry. E-Sports, after being selected into the Asian Games, has opened a golden era again. With a wealth of experience and foresight, Tiger Partners is energizing the dream of young talents in the industry to set sail.",
    zhIntro:
      "虎诉深度参与中国体育行业日趋成熟的商业化进程，而电子竞技入选亚运会后再次开启了黄金时代，虎诉正以丰富的经验和超前的眼界，助力行业中的青年才俊梦想起航。",
  },
  "international-trade": {
    image: "/assets/industries/in2.webp",
    enIntro:
      "The Belt and Road Initiative offers new opportunities as well as challenges on an ongoing basis for foreign trade participants in all sectors. With extensive experience and academic background in foreign-related cases, the lawyers of Tiger Partners are able to provide high-quality and efficient foreign-related dispute resolution legal services to Chinese and foreign clients.",
    zhIntro:
      "“一带一路”战略为各行业对外贸易参与者提供持续的新机遇和新挑战，虎诉律师有丰富的涉外案件经验和学术背景，能够为中外客户提供优质、高效的涉外争议解决法律服务。",
  },
  "cyber-tech-and-game": {
    image: "/assets/home/INDUSTRIES6.png",
    enIntro:
      "Since Internet plus initiative became a national strategy, numerous entrepreneurs have been pursuing wealth and success in the tide of the internet. With years of legal service experience cultivating in internet technology and game, Tiger Partners has greatly protected and escorted investors and young entrepreneurs in this industry.",
    zhIntro:
      "“互联网+”成为国家战略以来，海量创业者在互联网浪潮中追逐财富与成功，虎诉凭借多年深耕互网科技及游戏行业法律服务的经验，为行业投资者和青年企业家保驾护航。",
  },
};

const homeHonorDefaults = [
  {
    id: "alb-china-law-awards-2026",
    year: "2026",
    enDate: "Mar. 2026",
    zhDate: "2026年3月",
    enTitle: "Shortlisted for the ALB China Law Awards 2026 with two nominations",
    zhTitle: "虎诉荣登2026年度ALB中国法律大奖入围名单",
    enBody:
      "Tiger Partners was shortlisted for Dispute Resolution Boutique Law Firm of the Year and Rising Law Firm of the Year.",
    zhBody: "虎诉获得两项提名：“年度争议解决精品律师事务所大奖”、“年度最具潜力律师事务所大奖”。",
  },
  {
    id: "chambers-gcr-2026",
    year: "2026",
    enDate: "Jan. 2026",
    zhDate: "2026年1月",
    enTitle: "Chambers Greater China Region 2026: Dispute Resolution (PRC Firms)",
    zhTitle: "《钱伯斯大中华区指南2026》争议解决（中资律师事务所）",
    enBody: "Tiger Partners was listed in Chambers Greater China Region 2026 for Dispute Resolution (PRC Firms).",
    zhBody: "虎诉荣登《钱伯斯大中华区指南2026》争议解决（中资律师事务所）榜单。",
  },
  {
    id: "legal-500-china-2026",
    year: "2025",
    enDate: "Nov. 2025",
    zhDate: "2025年11月",
    enTitle: "Legal 500 China 2026: Dispute Resolution",
    zhTitle: "Legal 500 2026中国区榜单：争议解决",
    enBody:
      "Tiger Partners was listed in Legal 500 China for Dispute Resolution: Arbitration and Litigation: PRC firms.",
    zhBody: "虎诉荣登Legal 500 2026中国区争议解决仲裁及诉讼榜单。",
  },
];

const clientLogoDefaults = Array.from({ length: 42 }, (_, index) => {
  const fileNumber = index + 1;
  const pngLogoIndexes = new Set([5, 8, 10, 11, 14, 16, 18, 19, 22, 41]);
  const ext = pngLogoIndexes.has(fileNumber) ? "png" : "jpg";

  return `/assets/home/clientLogo/client-logo-${String(fileNumber).padStart(2, "0")}.${ext}`;
});

const homeEventSlugs = [
  "kinsey-kang-hong-kong-legal-counsel",
  "chambers-forum-beijing-2023",
  "shifoying-nanli-community-pairing",
  "tiger-partners-third-anniversary",
  "cietac-cup-voice-of-moot-sponsor",
];

function eventDefaults(limit?: number) {
  const selected = limit ? events.slice(0, limit) : events;
  return selected.map((eventItem) => ({
    id: eventItem.slug,
    slug: eventItem.slug,
    image: eventItem.image,
    enDate: eventItem.date,
    zhDate: eventItem.date,
    enCategory: eventItem.category,
    zhCategory: eventItem.zh.category,
    enTitle: eventItem.title,
    zhTitle: eventItem.zh.title,
    enSummary: eventItem.summary,
    zhSummary: eventItem.zh.summary,
    enContent: eventItem.content.join("\n\n"),
    zhContent: eventItem.zh.content.join("\n\n"),
    detailImages: (eventItem.detailImages ?? []).join("\n"),
    detailVideos: (eventItem.detailVideos ?? []).join("\n"),
  }));
}

const detailImagePlaceholderPattern = /\[(?:IMAGE|Image|图片|鍥剧墖|鍥剧墖)\]?/g;
const legacyDetailVideoPlaceholderText = "暂时无法在飞书文档外展示此内容";
const detailVideoPlaceholderPattern = new RegExp(String.raw`\[(?:VIDEO|Video|video)\]|${legacyDetailVideoPlaceholderText}`, "g");

function countMatches(value: string, pattern: RegExp) {
  return [...value.matchAll(pattern)].length;
}

function numberedDetailMediaFields(
  fieldPrefix: "detailImage" | "detailVideo",
  labelPrefix: string,
  kind: PageContentFieldKind,
  count: number,
  values: string,
) {
  const list = values
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
  const size = Math.max(count, list.length);

  return Array.from({ length: size }, (_, index) =>
    field(`${fieldPrefix}${index + 1}`, `${labelPrefix} ${index + 1}`, kind, list[index] ?? ""),
  );
}

function numberedDetailImageWidthFields(labelPrefix: string, count: number) {
  return Array.from({ length: count }, (_, index) =>
    field(`detailImageWidth${index + 1}`, `${labelPrefix} ${index + 1}`, "text", ""),
  );
}

function localizedIndustryItems(language: Language) {
  const isZh = language === "zh";

  return industryDefaults.map((item) =>
    repeaterItem(item.id, isZh ? item.zhTitle : item.enTitle, [
      field("slug", isZh ? "标识" : "Slug", "text", item.id),
      field("title", isZh ? "标题" : "Title", "text", isZh ? item.zhTitle : item.enTitle),
      field("image", isZh ? "缩略图" : "Thumbnail", "image", item.image),
      field("href", isZh ? "链接" : "Link", "url", item.href),
      field("layoutClass", isZh ? "布局类名" : "Layout class", "text", item.cls),
      field("description", isZh ? "子页面描述" : "Detail description", "textarea", ""),
    ]),
  );
}

function localizedIndustryPageItems(language: Language) {
  const isZh = language === "zh";

  return industryDefaults.map((item) =>
    repeaterItem(item.id, isZh ? item.zhTitle : item.enTitle, [
      field("slug", isZh ? "标识" : "Slug", "text", item.id),
      field("title", isZh ? "标题" : "Title", "text", isZh ? item.zhTitle : item.enTitle),
      field("image", isZh ? "缩略图" : "Thumbnail", "image", item.image),
      field("description", isZh ? "本页描述" : "Page description", "textarea", ""),
      field("href", isZh ? "链接" : "Link", "url", item.href),
      field("layoutClass", isZh ? "布局类名" : "Layout class", "text", item.cls),
    ]),
  );
}

function localizedIndustryDetailItems(language: Language) {
  const isZh = language === "zh";

  return industryDefaults.map((item) => {
    const detail = industryDetailDefaults[item.id] ?? {
      image: item.image,
      enIntro: "",
      zhIntro: "",
    };

    return repeaterItem(item.id, isZh ? item.zhTitle : item.enTitle, [
      field("slug", isZh ? "标识" : "Slug", "text", item.id),
      field("title", isZh ? "详情页标题" : "Detail title", "text", isZh ? item.zhTitle : item.enTitle),
      field("image", isZh ? "首屏背景图片" : "Hero background image", "image", detail.image),
      field("intro", isZh ? "详情页简介" : "Detail intro", "textarea", isZh ? detail.zhIntro : detail.enIntro),
      field(
        "sections",
        isZh ? "详情卡片（留空则使用页面默认内容）" : "Detail cards (leave empty to use page defaults)",
        "textarea",
        "",
      ),
    ]);
  });
}

function localizedHonorItems(language: Language) {
  const isZh = language === "zh";

  return homeHonorDefaults.map((item) =>
    repeaterItem(item.id, isZh ? item.zhTitle : item.enTitle, [
      field("year", isZh ? "年份" : "Year", "text", item.year),
      field("sortDate", isZh ? "排序日期（YYYYMMDD）" : "Sort date (YYYYMMDD)", "text", item.enDate),
      field("displayDate", isZh ? "展示日期" : "Display date", "text", formatEventDate(item.enDate, language)),
      field("title", isZh ? "标题" : "Title", "textarea", isZh ? item.zhTitle : item.enTitle),
      field("body", isZh ? "正文" : "Body", "textarea", isZh ? item.zhBody : item.enBody),
      field("href", isZh ? "链接" : "Link", "url", ""),
    ]),
  );
}

const chronicleDefaults = [
  {
    id: "2026-may",
    year: "2026",
    side: "left",
    enMonth: "MAY",
    zhMonth: "五月",
    enText:
      "Zoe Zhang, Partner at Tiger Partners, has been successfully selected into the new CIETAC Arbitrator Roster by virtue of her profound professional legal accomplishment and extensive experience in foreign-related dispute resolution.",
    zhText:
      "虎诉律师事务所合伙人张莉律师凭借深厚的法律专业素养、丰富的涉外争议解决经验，成功入选新一届贸仲仲裁员名册。",
  },
  {
    id: "2026-april",
    year: "2026",
    side: "right",
    enMonth: "APRIL",
    zhMonth: "四月",
    enText:
      "Xu Min, Partner at Tiger Partners, has been successfully selected into the new arbitrator roster of CCAS, owing to his solid legal expertise, extensive experience in dispute resolution, and in-depth dedication to the field of sports rule of law.",
    zhText:
      "虎诉律师事务所合伙人许旻律师凭借扎实的法律专业功底、丰富的争议解决经验及对体育法治领域的持续深耕，成功入选CCAS新仲裁员名册。",
  },
  {
    id: "2026-march",
    year: "2026",
    side: "left",
    enMonth: "MARCH",
    zhMonth: "三月",
    enText:
      "Tiger Partners has been shortlisted for the ALB China Law Awards 2026 with two nominations: Dispute Resolution Boutique Law Firm of the Year, Rising Law Firm of the Year.",
    zhText:
      "虎诉律师事务所荣登ALB2026年度中国法律大奖入围名单，获得两项提名：“年度争议解决精品律师事务所大奖”、“年度最具潜力律师事务所大奖”。",
  },
  {
    id: "2026-january",
    year: "2026",
    side: "right",
    enMonth: "JANUARY",
    zhMonth: "一月",
    enText:
      "Tiger Partners was listed in Dispute Resolution (PRC Firms) in the Chambers Greater China Region Guide 2026.",
    zhText: "虎诉荣登《钱伯斯大中华区指南2026》争议解决（中资律师事务所）榜单。",
  },
];

function localizedChronicleItems(language: Language) {
  const isZh = language === "zh";

  return chronicleDefaults.map((item) =>
    repeaterItem(item.id, `${item.year} ${isZh ? item.zhMonth : item.enMonth}`, [
      field("year", isZh ? "年份" : "Year", "text", item.year),
      field("month", isZh ? "月份" : "Month", "text", isZh ? item.zhMonth : item.enMonth),
      field("side", isZh ? "位置 left/right" : "Side left/right", "text", item.side),
      field("text", isZh ? "正文" : "Text", "textarea", isZh ? item.zhText : item.enText),
    ]),
  );
}

const coreValueDefaults = [
  {
    id: "totem",
    number: "No.1",
    image: "/assets/core/core1.webp",
    enTitle: "Our Spiritual Totem: Tiger",
    zhTitle: "价值观之一：精神图腾“虎”",
    enBody:
      "As quoted from an ancient Chinese book the Dragon Classic: \"Bi An is good at litigation\". We choose Tiger as our totem because we are just Tigers. We litigate, and we hunt like top predators.",
    zhBody:
      "《龙经》有云：“狴犴好讼”。虎诉选择“虎”作为精神图腾，象征力量、威严、专注与一击制胜。",
  },
  {
    id: "benefits",
    number: "No.2",
    image: "/assets/core/core2.webp",
    enTitle: "We focus on tangible benefits clients could get from our legal services",
    zhTitle: "价值观之二：注重法律服务给客户带来的实际利益",
    enBody:
      "Dispute resolution legal services are result-oriented. We place more attention on protecting tangible benefits of our clients in our cases.",
    zhBody:
      "争议解决法律服务具有结果导向属性。虎诉重视代理案件在结果上保障客户的实际利益。",
  },
  {
    id: "hands-on",
    number: "No.3",
    image: "/assets/core/core3.webp",
    enTitle: "The \"Hands-on\"",
    zhTitle: "价值观之三：争议解决法律服务的“属人性”",
    enBody:
      "We guarantee our partners' hands-on involvement throughout the process: communication, evidence collection, core document drafting, and court presentations.",
    zhBody:
      "我们保证合伙人全程办理案件，包括客户沟通、证据收集、核心文件起草和庭审展示。",
  },
];

function localizedCoreValueItems(language: Language) {
  const isZh = language === "zh";

  return coreValueDefaults.map((item) =>
    repeaterItem(item.id, isZh ? item.zhTitle : item.enTitle, [
      field("number", isZh ? "编号" : "Number", "text", item.number),
      field("title", isZh ? "标题" : "Title", "textarea", isZh ? item.zhTitle : item.enTitle),
      field("body", isZh ? "正文" : "Body", "textarea", isZh ? item.zhBody : item.enBody),
      field("image", isZh ? "图片" : "Image", "image", item.image),
    ]),
  );
}

function localizedEventItems(language: Language, limit?: number) {
  const isZh = language === "zh";

  return eventDefaults(limit).map((item) =>
    repeaterItem(item.slug, isZh ? item.zhTitle : item.enTitle, [
      field("slug", isZh ? "标识" : "Slug", "text", item.slug),
      field("image", isZh ? "缩略图" : "Thumbnail", "image", item.image),
      field("sortDate", isZh ? "排序日期（YYYYMMDD）" : "Sort date (YYYYMMDD)", "text", item.enDate),
      field("displayDate", isZh ? "展示日期" : "Display date", "text", formatEventDate(item.enDate, language)),
      field("category", isZh ? "分类" : "Category", "text", isZh ? item.zhCategory : item.enCategory),
      field("title", isZh ? "标题" : "Title", "textarea", isZh ? item.zhTitle : item.enTitle),
      field("summary", isZh ? "摘要" : "Summary", "textarea", isZh ? item.zhSummary : item.enSummary),
      field("content", isZh ? "详情正文" : "Detail content", "textarea", isZh ? item.zhContent : item.enContent),
      ...numberedDetailMediaFields(
        "detailImage",
        isZh ? "详情图片" : "Detail image",
        "image",
        countMatches(isZh ? item.zhContent : item.enContent, detailImagePlaceholderPattern),
        item.detailImages,
      ),
      ...numberedDetailImageWidthFields(
        isZh ? "详情图片宽度 %" : "Detail image width %",
        Math.max(countMatches(isZh ? item.zhContent : item.enContent, detailImagePlaceholderPattern), item.detailImages.split(/\r?\n/).filter(Boolean).length),
      ),
      ...numberedDetailMediaFields(
        "detailVideo",
        isZh ? "详情视频" : "Detail video",
        "url",
        countMatches(isZh ? item.zhContent : item.enContent, detailVideoPlaceholderPattern),
        item.detailVideos,
      ),
    ]),
  );
}

function localizedTeamItems(language: Language) {
  const isZh = language === "zh";

  return teamProfiles.map((profile) =>
    repeaterItem(profile.slug, isZh ? profile.zhName : profile.name, [
      field("slug", isZh ? "标识" : "Slug", "text", profile.slug),
      field("image", isZh ? "缩略图" : "Thumbnail", "image", profile.image),
      field("name", isZh ? "姓名" : "Name", "text", isZh ? profile.zhName : profile.name),
      field("title", isZh ? "职位" : "Title", "text", isZh ? profile.zhTitle : profile.title),
      field("phone", isZh ? "电话" : "Phone", "text", profile.phone),
      field("email", isZh ? "邮箱" : "Email", "text", profile.email),
      field(
        "serviceIndustries",
        isZh ? "服务行业" : "Service industries",
        "textarea",
        (isZh ? profile.zh.serviceIndustries : profile.serviceIndustries).join("\n"),
      ),
      field("education", isZh ? "教育背景" : "Education", "textarea", isZh ? profile.zh.education : profile.education),
      field("qualification", isZh ? "专业资格" : "Qualification", "textarea", isZh ? profile.zh.qualification : profile.qualification),
      field("languages", isZh ? "工作语言" : "Languages", "textarea", (isZh ? profile.zh.languages : profile.languages).join("\n")),
      field(
        "socialEngagements",
        isZh ? "社会任职" : "Social engagements",
        "textarea",
        isZh ? profile.zh.socialEngagements : profile.socialEngagements,
      ),
      field("practiceArea", isZh ? "专业领域" : "Practice area", "textarea", isZh ? profile.zh.practiceArea : profile.practiceArea),
      field(
        "practiceExperience",
        isZh ? "执业经验" : "Practice experience",
        "textarea",
        isZh ? profile.zh.practiceExperience : profile.practiceExperience,
      ),
      field("honors", isZh ? "荣誉和认可" : "Honors", "textarea", (isZh ? profile.zh.honors : profile.honors).join("\n")),
      field(
        "achievements",
        isZh ? "个人业绩" : "Performance & Achievements",
        "textarea",
        (isZh ? profile.zh.achievements : profile.achievements).join("\n\n"),
      ),
    ]),
  );
}

function localizedTeamListItems(language: Language, group: "partner" | "seniorAssociate") {
  const isZh = language === "zh";
  const profiles = group === "partner" ? teamProfiles.slice(0, 4) : teamProfiles.slice(4);

  return profiles.map((profile) =>
    repeaterItem(profile.slug, isZh ? profile.zhName : profile.name, [
      field("slug", isZh ? "标识" : "Slug", "text", profile.slug),
      field("image", isZh ? "缩略图" : "Thumbnail", "image", profile.image),
      field("name", isZh ? "姓名" : "Name", "text", isZh ? profile.zhName : profile.name),
      field("title", isZh ? "职位" : "Title", "text", isZh ? profile.zhTitle : profile.title),
      field("ctaLabel", isZh ? "查看更多文字" : "CTA label", "text", localizedCopy(language, copy.common.findOutMore)),
      field("href", isZh ? "跳转链接" : "Link", "url", `/team/${profile.slug}`),
    ]),
  );
}

function localizedEventListItems(language: Language, limit?: number) {
  const isZh = language === "zh";

  return eventDefaults(limit).map((item) =>
    repeaterItem(item.slug, isZh ? item.zhTitle : item.enTitle, [
      field("slug", isZh ? "标识" : "Slug", "text", item.slug),
      field("image", isZh ? "缩略图" : "Thumbnail", "image", item.image),
      field("sortDate", isZh ? "排序日期（YYYYMMDD）" : "Sort date (YYYYMMDD)", "text", item.enDate),
      field("displayDate", isZh ? "展示日期" : "Display date", "text", formatEventDate(item.enDate, language)),
      field("category", isZh ? "分类" : "Category", "text", isZh ? item.zhCategory : item.enCategory),
      field("title", isZh ? "标题" : "Title", "textarea", isZh ? item.zhTitle : item.enTitle),
      field("summary", isZh ? "摘要" : "Summary", "textarea", isZh ? item.zhSummary : item.enSummary),
    ]),
  );
}

function localizedHomeEventItems(language: Language) {
  const isZh = language === "zh";

  return eventDefaults()
    .filter((item) => homeEventSlugs.includes(item.id))
    .map((item) =>
      repeaterItem(item.slug, isZh ? item.zhTitle : item.enTitle, [
        field("slug", isZh ? "轮播标识" : "Slide slug", "text", item.slug),
        field("image", isZh ? "轮播图片" : "Slide image", "image", item.image),
        field("displayDate", isZh ? "展示日期" : "Display date", "text", formatEventDate(item.enDate, language)),
        field("category", isZh ? "分类" : "Category", "text", isZh ? item.zhCategory : item.enCategory),
        field("title", isZh ? "标题" : "Title", "textarea", isZh ? item.zhTitle : item.enTitle),
        field("summary", isZh ? "轮播摘要" : "Slide summary", "textarea", isZh ? item.zhSummary : item.enSummary),
        field("href", isZh ? "点击链接" : "Click link", "url", `/events/${item.slug}?from=home`),
      ]),
    );
}

function localizedEventDetailItems(language: Language, limit?: number) {
  const isZh = language === "zh";

  return eventDefaults(limit).map((item) =>
    repeaterItem(item.slug, isZh ? item.zhTitle : item.enTitle, [
      field("slug", isZh ? "标识" : "Slug", "text", item.slug),
      field("sortDate", isZh ? "排序日期（YYYYMMDD）" : "Sort date (YYYYMMDD)", "text", item.enDate),
      field("displayDate", isZh ? "展示日期" : "Display date", "text", formatEventDate(item.enDate, language)),
      field("category", isZh ? "分类" : "Category", "text", isZh ? item.zhCategory : item.enCategory),
      field("title", isZh ? "详情页标题" : "Detail title", "textarea", isZh ? item.zhTitle : item.enTitle),
      field("summary", isZh ? "详情页摘要" : "Detail summary", "textarea", isZh ? item.zhSummary : item.enSummary),
      field("content", isZh ? "详情正文" : "Detail content", "textarea", isZh ? item.zhContent : item.enContent),
      ...numberedDetailMediaFields(
        "detailImage",
        isZh ? "详情图片" : "Detail image",
        "image",
        countMatches(isZh ? item.zhContent : item.enContent, detailImagePlaceholderPattern),
        item.detailImages,
      ),
      ...numberedDetailImageWidthFields(
        isZh ? "详情图片宽度 %" : "Detail image width %",
        Math.max(countMatches(isZh ? item.zhContent : item.enContent, detailImagePlaceholderPattern), item.detailImages.split(/\r?\n/).filter(Boolean).length),
      ),
      ...numberedDetailMediaFields(
        "detailVideo",
        isZh ? "详情视频" : "Detail video",
        "url",
        countMatches(isZh ? item.zhContent : item.enContent, detailVideoPlaceholderPattern),
        item.detailVideos,
      ),
    ]),
  );
}

function localizedContactRequirementItems(language: Language) {
  const isZh = language === "zh";
  const items = copy.contact.requirements[language];

  return items.map((item, index) =>
    repeaterItem(`requirement-${index + 1}`, `${isZh ? "栏目" : "Requirement"} ${index + 1}`, [
      field("body", isZh ? "正文" : "Body", "textarea", item),
    ]),
  );
}

function localizedClientLogoItems(language: Language) {
  const isZh = language === "zh";

  return clientLogoDefaults.map((logo, index) =>
    repeaterItem(`client-logo-${String(index + 1).padStart(2, "0")}`, `${isZh ? "客户 Logo" : "Client Logo"} ${index + 1}`, [
      field("logo", isZh ? "Logo 图片" : "Logo image", "image", logo),
      field("alt", isZh ? "替代文字" : "Alt text", "text", `${isZh ? "客户" : "Client"} ${index + 1}`),
    ]),
  );
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
      ], localizedIndustryItems(language)),
      section("honors", isZh ? "虎诉荣誉" : "Honors", [
        field("title", isZh ? "标题" : "Title", "text", isZh ? "虎诉荣誉" : "HONORS"),
        field(
          "subtitle",
          isZh ? "说明" : "Subtitle",
          "textarea",
          isZh
            ? "虎诉受到全球多个权威法律评级机构与奖项组织的青睐和认可。"
            : "Tiger Partners is favored and recognized by multiple authoritative legal directories and awarding organizations all over the world.",
        ),
        field("ctaLabel", isZh ? "查看更多按钮文字" : "See more label", "text", isZh ? "查看更多" : "SEE MORE"),
        field("ctaHref", isZh ? "查看更多链接" : "See more link", "url", "/about#honors"),
      ], localizedHonorItems(language)),
      section("events", isZh ? "虎诉动态" : "Events", [
        field("title", isZh ? "标题" : "Title", "text", isZh ? "虎诉动态" : "EVENTS"),
        field("subtitle", isZh ? "说明" : "Subtitle", "textarea", isZh ? "关注虎诉最新动态与专业观察。" : "Latest Tiger Partners updates and professional insights."),
        field("ctaLabel", isZh ? "查看更多按钮文字" : "See more label", "text", localizedCopy(language, copy.common.seeMore)),
        field("ctaHref", isZh ? "查看更多链接" : "See more link", "url", "/events"),
      ], localizedHomeEventItems(language)),
      section("clients", isZh ? "客户" : "Clients", [
        field("title", isZh ? "标题" : "Title", "text", isZh ? "我们的客户" : "OUR CLIENTS"),
      ], localizedClientLogoItems(language)),
    ]),
    about: page("about", t.about, "/about", "AboutPage", [
      section("hero", isZh ? "首屏" : "Hero", [
        field("title", isZh ? "标题" : "Title", "text", isZh ? "关于我们" : "ABOUT US"),
        field("image", isZh ? "背景图片" : "Background image", "image", "/assets/about/hero.png"),
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
        field("subtitle", isZh ? "左侧正文" : "Left copy", "textarea", copyLines(language, copy.about.visionSubtitle)),
        field("body", isZh ? "正文" : "Body", "textarea", copyLines(language, copy.about.visionParagraphs)),
        field("moreBody", isZh ? "展开正文" : "Expanded body", "textarea", copyLines(language, copy.about.visionMoreParagraphs)),
        field("seeMoreLabel", isZh ? "查看更多按钮" : "See more label", "text", localizedCopy(language, copy.common.seeMore)),
        field("collapseLabel", isZh ? "收起按钮" : "Collapse label", "text", localizedCopy(language, copy.common.collapse)),
      ]),
      section("honors", isZh ? "虎诉荣誉" : "Honors", [
        field("title", isZh ? "标题" : "Title", "text", isZh ? "虎诉荣誉" : "HONORS"),
        field("subtitle", isZh ? "右侧正文" : "Right copy", "textarea", copyLines(language, copy.about.honorsSubtitle)),
      ], localizedHonorItems(language)),
      section("culture", isZh ? "虎诉文化" : "Culture", [
        field("title", isZh ? "标题" : "Title", "text", isZh ? "虎诉文化" : "CULTURE"),
        field("body", isZh ? "正文" : "Body", "textarea", localizedCopy(language, copy.about.cultureSubtitle)),
        field("ctaLabel", isZh ? "查看完整虎诉文化按钮" : "CTA label", "text", localizedCopy(language, copy.about.cultureCta)),
        field("ctaHref", isZh ? "按钮链接" : "CTA link", "url", "/about/core-value"),
      ]),
      section("chronicle", isZh ? "大事记" : "Chronicle", [
        field("title", isZh ? "标题" : "Title", "text", isZh ? "大事记" : "CHRONICLE"),
        field("subtitle", isZh ? "右侧正文" : "Right copy", "textarea", copyTextBlock(language, copy.about.chronicleSubtitle)),
        field("seeMoreLabel", isZh ? "查看更多按钮" : "See more label", "text", localizedCopy(language, copy.common.seeMore)),
        field("collapseLabel", isZh ? "收起按钮" : "Collapse label", "text", localizedCopy(language, copy.common.collapse)),
      ], localizedChronicleItems(language)),
    ]),
    coreValue: page("coreValue", isZh ? "虎诉文化" : "Core Value", "/about/core-value", "CoreValuePage", [
      section("hero", isZh ? "首屏" : "Hero", [
        field("title", isZh ? "标题" : "Title", "text", isZh ? "虎诉文化" : "Core Value"),
        field("image", isZh ? "背景图片" : "Background image", "image", "/assets/prototypes/core-value/e59638152d8ac77db9b565bfbadeeb0d328a2986.png"),
        field("breadcrumb", isZh ? "面包屑父级" : "Breadcrumb parent", "text", isZh ? "关于我们" : "About Us"),
      ]),
      section("values", isZh ? "虎诉文化正文" : "Core value items", [], localizedCoreValueItems(language)),
      section("closing", isZh ? "结尾文案" : "Closing copy", [
        field(
          "body",
          isZh ? "正文" : "Body",
          "textarea",
          isZh
            ? "我们相信，专业、极致与胜诉目标共同构成虎诉文化的核心。"
            : "We believe professionalism, perfection and the pursuit of winning cases form the core of Tiger Partners' culture.",
        ),
      ]),
    ]),
    awards: page("awards", t.honors, "/about#honors", "AboutPage", [
      section("honors", isZh ? "虎诉荣誉" : "Honors", [
        field("title", isZh ? "标题" : "Title", "text", isZh ? "虎诉荣誉" : "HONORS"),
        field("subtitle", isZh ? "说明" : "Subtitle", "textarea", isZh ? "虎诉受到多个权威法律评级机构与奖项组织的认可。" : "Tiger Partners is recognized by leading legal directories and awarding organizations."),
      ], localizedHonorItems(language)),
    ]),
    event: page("event", t.events, "/events", "EventsPage", [
      section("hero", isZh ? "首屏" : "Hero", [
        field("title", isZh ? "标题" : "Title", "text", isZh ? "虎诉动态" : "EVENTS"),
        field("body", isZh ? "正文" : "Body", "textarea", localizedCopy(language, copy.eventsPage.intro)),
        field("image", isZh ? "背景图片" : "Background image", "image", "/assets/event/hero.png"),
      ]),
      section("list", isZh ? "动态列表" : "Event list", [field("title", isZh ? "标题" : "Title", "text", isZh ? "最新动态" : "Latest Updates")], localizedEventListItems(language)),
      section("detailPages", isZh ? "动态子页面" : "Event detail pages", [], localizedEventDetailItems(language)),
    ]),
    media: page("media", t.industries, "/industries", "IndustriesPage", [
      section("hero", isZh ? "首屏" : "Hero", [
        field("title", isZh ? "标题" : "Title", "text", isZh ? "服务行业" : "INDUSTRIES"),
        field("image", isZh ? "背景图片" : "Background image", "image", "/assets/industries/hero.png"),
        field("body", isZh ? "说明" : "Description", "textarea", isZh ? "我们在重点行业提供专业、精准、高效的法律服务。" : "We provide professional, precise, and efficient legal services across key industries."),
      ]),
      section("cards", isZh ? "行业卡片" : "Industry cards", [], localizedIndustryPageItems(language)),
      section("detailPages", isZh ? "行业子页面" : "Industry detail pages", [], localizedIndustryDetailItems(language)),
    ]),
    podcast: page("podcast", t.team, "/team", "TeamPage", [
      section("hero", isZh ? "首屏" : "Hero", [
        field("title", isZh ? "标题" : "Title", "text", isZh ? "虎诉团队" : "OUR TEAM"),
        field("body", isZh ? "正文" : "Body", "textarea", localizedCopy(language, copy.team.subtitle)),
        field("image", isZh ? "背景图片" : "Background image", "image", "/assets/team/hero.png"),
      ]),
      section("specialForces", isZh ? "团队口号" : "Team slogan", [
        field("title", isZh ? "标题" : "Title", "text", isZh ? "我们，即为精锐之师" : "WE ARE SPECIAL FORCES"),
        field("body", isZh ? "右侧正文" : "Right copy", "textarea", copyLines(language, copy.team.slogan)),
      ]),
      section("members", isZh ? "团队成员" : "Members", [field("title", isZh ? "标题" : "Title", "text", isZh ? "合伙人及顾问" : "PARTNERS & COUNSELS")]),
      section("partners", isZh ? "合伙人板块" : "Partners section", [
        field("title", isZh ? "标题" : "Title", "text", localizedCopy(language, copy.team.partner)),
        field("body", isZh ? "说明" : "Description", "textarea", ""),
        field("ctaLabel", isZh ? "默认查看更多文字" : "Default CTA label", "text", localizedCopy(language, copy.common.findOutMore)),
      ], localizedTeamListItems(language, "partner")),
      section("seniorAssociates", isZh ? "资深律师板块" : "Senior associates section", [
        field("title", isZh ? "标题" : "Title", "text", localizedCopy(language, copy.team.seniorAssociate)),
        field("body", isZh ? "说明" : "Description", "textarea", ""),
        field("ctaLabel", isZh ? "默认查看更多文字" : "Default CTA label", "text", localizedCopy(language, copy.common.findOutMore)),
      ], localizedTeamListItems(language, "seniorAssociate")),
      section("memberProfiles", isZh ? "成员子页面" : "Member profile pages", [], localizedTeamItems(language)),
    ]),
    contact: page("contact", t.contact, "/contact", "ContactPage", [
      section("hero", isZh ? "首屏" : "Hero", [
        field("title", isZh ? "标题" : "Title", "text", isZh ? "联系我们" : "CONTACT"),
        field("body", isZh ? "正文" : "Body", "textarea", localizedCopy(language, copy.contact.intro)),
        field("image", isZh ? "背景图片" : "Background image", "image", "/assets/contact/hero.png"),
      ]),
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
        field("phone", isZh ? "电话" : "Phone", "text", "010-85885228"),
        field("email", isZh ? "邮箱" : "Email", "text", "contact@tigerpartners.cn"),
        field("image", isZh ? "右侧图片" : "Right image", "image", "/assets/prototypes/contact/city.webp"),
      ]),
      section("join", isZh ? "加入虎诉" : "Join us", [
        field("title", isZh ? "左侧标题" : "Left title", "textarea", copyLines(language, copy.contact.joinTitle)),
        field("body", isZh ? "右侧正文" : "Right copy", "textarea", localizedCopy(language, copy.contact.joinBody)),
        field("resumeLabel", isZh ? "简历投递文案" : "Resume label", "text", localizedCopy(language, copy.contact.resume)),
        field("resumeEmail", isZh ? "简历投递邮箱" : "Resume email", "text", "recruit@tigerpartners.cn"),
      ], localizedContactRequirementItems(language)),
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

function mergeDefaultFields(fields: PageContentField[] = [], defaultFields: PageContentField[]) {
  const defaultFieldMap = new Map(defaultFields.map((fieldItem) => [fieldItem.id, fieldItem]));
  const existingIds = new Set(fields.map((fieldItem) => fieldItem.id));

  return [
    ...fields.map((fieldItem) => {
      const defaultField = defaultFieldMap.get(fieldItem.id);

      if (!defaultField?.value.trim()) return fieldItem;
      if (!fieldItem.value.trim()) return { ...fieldItem, value: defaultField.value };
      if (
        fieldItem.id === "image" &&
        fieldItem.value.includes("/assets/home/INDUSTRIES") &&
        defaultField.value.includes("/assets/industries/")
      ) {
        return { ...fieldItem, value: defaultField.value };
      }

      return fieldItem;
    }),
    ...defaultFields.filter((fieldItem) => !existingIds.has(fieldItem.id)),
  ];
}

function shouldAppendDefaultItems(pageId: CmsPageId, sectionId: string) {
  if (pageId === "home" && sectionId === "industries") return false;
  if (pageId === "event" && (sectionId === "list" || sectionId === "detailPages")) return false;
  if (pageId === "media" && (sectionId === "cards" || sectionId === "detailPages")) return false;

  return true;
}

function mergeDefaultItems(
  items: PageContentRepeaterItem[] = [],
  defaultItems: PageContentRepeaterItem[] = [],
  appendMissingItems = true,
) {
  const defaultItemMap = new Map(defaultItems.map((item) => [item.id, item]));
  const existingIds = new Set(items.map((item) => item.id));

  return [
    ...items.map((item) => {
      const defaultItem = defaultItemMap.get(item.id);

      return defaultItem
        ? { ...item, fields: mergeDefaultFields(item.fields, defaultItem.fields) }
        : item;
    }),
    ...(appendMissingItems ? defaultItems.filter((item) => !existingIds.has(item.id)) : []),
  ];
}

function mergeDefaultSections(
  pageId: CmsPageId,
  sections: PageContentSection[] = [],
  defaultSections: PageContentSection[],
) {
  const defaultSectionMap = new Map(defaultSections.map((sectionItem) => [sectionItem.id, sectionItem]));
  const existingIds = new Set(sections.map((sectionItem) => sectionItem.id));

  return [
    ...sections.map((sectionItem) => {
      const defaultSection = defaultSectionMap.get(sectionItem.id);

      return defaultSection
        ? {
            ...sectionItem,
            fields: mergeDefaultFields(sectionItem.fields, defaultSection.fields),
            items:
              sectionItem.items || defaultSection.items
                ? mergeDefaultItems(
                    sectionItem.items,
                    defaultSection.items,
                    shouldAppendDefaultItems(pageId, sectionItem.id),
                  )
                : undefined,
          }
        : sectionItem;
    }),
    ...defaultSections.filter((sectionItem) => !existingIds.has(sectionItem.id)),
  ];
}

function mergeDefaultLocale(locale: PageContentLocale, defaultLocale: PageContentLocale) {
  return (Object.keys(defaultLocale) as CmsPageId[]).reduce((next, pageId) => {
    const currentPage = locale?.[pageId];
    const defaultPage = defaultLocale[pageId];

    next[pageId] = currentPage
      ? { ...currentPage, sections: mergeDefaultSections(pageId, currentPage.sections, defaultPage.sections) }
      : defaultPage;

    return next;
  }, {} as PageContentLocale);
}

export function mergePageContentDefaults(pageContent: PageContentState): PageContentState {
  return {
    zh: mergeDefaultLocale(pageContent.zh, defaultPageContentState.zh),
    en: mergeDefaultLocale(pageContent.en, defaultPageContentState.en),
    updatedAt: pageContent.updatedAt,
  };
}

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

export function getPageContentItemFieldValue(item: PageContentRepeaterItem | undefined, fieldId: string) {
  return item?.fields.find((fieldItem) => fieldItem.id === fieldId)?.value;
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
