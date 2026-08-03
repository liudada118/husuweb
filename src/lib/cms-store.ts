import "server-only";

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { OfficialCmsPublicState, OfficialCmsSiteState } from "@/cms/official-state";
import { resolvePublicAssetUrls } from "@/lib/public-assets";

const cmsDataPath = path.join(process.cwd(), "data", "cms-site.json");

const defaultHeader: OfficialCmsSiteState["header"] = {
  siteName: "Tiger Partners",
  siteSubtitle: "Law Firm",
  languageZhLabel: "CN",
  languageEnLabel: "EN",
  officialSiteUrl: "https://www.tigerpartners.cn",
  officialSiteLabel: "www.tigerpartners.cn",
  officialLogoUrl: "",
  navigation: [
    { id: "home", href: "/", labelZh: "\u9996\u9875", labelEn: "HOME", visible: true, order: 10 },
    { id: "about", href: "/about", labelZh: "\u5173\u4e8e\u6211\u4eec", labelEn: "ABOUT US", visible: true, order: 20 },
    { id: "team", href: "/team", labelZh: "\u864e\u8bc9\u56e2\u961f", labelEn: "OUR TEAM", visible: true, order: 30 },
    { id: "industries", href: "/industries", labelZh: "\u670d\u52a1\u884c\u4e1a", labelEn: "INDUSTRIES", visible: true, order: 40 },
    { id: "events", href: "/events", labelZh: "\u864e\u8bc9\u52a8\u6001", labelEn: "EVENTS", visible: true, order: 50 },
    { id: "contact", href: "/contact", labelZh: "\u8054\u7cfb\u6211\u4eec", labelEn: "CONTACT", visible: true, order: 60 },
  ],
  socialLinks: [],
};

const defaultManagedLists: OfficialCmsSiteState["lists"] = {
  industries: [
    {
      name: "Private Equity",
      zhName: "私募股权",
      slug: "private-equity",
      img: "/assets/home/INDUSTRIES1.webp",
      cls: "lg:col-span-2",
    },
    {
      name: "Finance",
      zhName: "金融",
      slug: "finance",
      img: "/assets/home/INDUSTRIES2.webp",
      cls: "lg:col-span-1",
    },
    {
      name: "Real Estate",
      zhName: "房地产",
      slug: "real-estate",
      img: "/assets/home/INDUSTRIES3.webp",
      cls: "lg:col-span-1 lg:row-span-2",
    },
    {
      name: "Sports and E-Sports",
      zhName: "体育和电子竞技",
      slug: "sports-and-e-sports",
      img: "/assets/home/INDUSTRIES4.webp",
      cls: "lg:col-span-1",
    },
    {
      name: "International Trade",
      zhName: "国际贸易",
      slug: "international-trade",
      img: "/assets/home/INDUSTRIES5.webp",
      cls: "lg:col-span-1",
    },
    {
      name: "Cyber Tech and Game",
      zhName: "互联网科技及游戏",
      slug: "cyber-tech-and-game",
      img: "/assets/home/INDUSTRIES6.png",
      cls: "lg:col-span-2",
    },
  ],
  eventSlugs: [],
  clientLogos: Array.from({ length: 42 }, (_, index) => {
    const fileNumber = index + 1;
    const pngLogoIndexes = new Set([5, 8, 10, 11, 14, 16, 18, 19, 22, 41]);
    const ext = pngLogoIndexes.has(fileNumber) ? "png" : "jpg";

    return `/assets/home/clientLogo/client-logo-${String(fileNumber).padStart(2, "0")}.${ext}`;
  }),
  homeHonorYears: ["2026", "2025", "2024", "2023", "2022", "2021", "2020", "2019"],
  homeHonorItems: [],
  honorYears: ["2026", "2025", "2024", "2023", "2022", "2021", "2020", "2019"],
  chronicleYears: ["2026", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018"],
  partnerSlugs: ["yuxuan-liu", "min-xu", "li-wan", "zoe-zhang"],
  seniorAssociateSlugs: ["mengcheng-yun", "weifan-qiu"],
};

const defaultIndustryIntros: Record<string, Pick<OfficialCmsSiteState["lists"]["industries"][number], "intro" | "zhIntro">> = {
  "private-equity": {
    intro:
      "Tiger Partners provides a full range of legal services to many well-known Chinese investment institutions, portfolio or invested companies, founders and shareholders, ranging from potential risk control, pre-litigation dispute resolution, litigation, arbitration and enforcement, to achieve their ultimate business goals.",
    zhIntro:
      "虎诉为国内众多知名投资机构、被投项目公司及创始人或股东提供从潜在风险控制、诉前争端解决，到代理诉讼仲裁和强制执行的全方位法律服务，以期为客户实现最终商业目的。",
  },
  finance: {
    intro:
      "Tiger Partners has highly specialized knowledge and extensive experience in dispute resolution relating to finance, and is able to provide early warning and prevent risks arising from various financial products, investment and finance transactions, and provide all-round dispute resolution services in civil & commercial and civil cross criminal area.",
    zhIntro:
      "虎诉在金融相关争议解决领域具有高度专业的知识技能和丰富的实操经验，能够为各类金融产品及投融资交易所衍生的争议提供风险预警和防范，以及全方位民商事、刑民交叉争议解决服务。",
  },
  "real-estate": {
    intro:
      "Tiger Partners is specialized in dispute resolution in real estate industry. From traditional disputes over construction contracts to large-scale disputes over real estate, land purchase and lease agreements, Tiger Partners has a profound theoretical basis and extensive practical experience.",
    zhIntro:
      "虎诉擅长房地产行业的争议解决法律服务，从传统建设工程合同纠纷案件到大型房地产、土地的买卖、租赁协议纠纷案件，虎诉均拥有深厚的理论基础和丰富的实操经验。",
  },
  "sports-and-e-sports": {
    intro:
      "Tiger Partners has deeply participated in the increasingly mature commercialization process of China's sports industry. E-Sports, after being selected into the Asian Games, has opened a golden era again. With a wealth of experience and foresight, Tiger Partners is energizing the dream of young talents in the industry to set sail.",
    zhIntro:
      "虎诉深度参与中国体育行业日趋成熟的商业化进程，而电子竞技入选亚运会后再次开启黄金时代，虎诉正以丰富的经验和超前的眼界，助力行业中的青年才俊梦想起航。",
  },
  "international-trade": {
    intro:
      "The Belt and Road Initiative offers new opportunities as well as challenges on an ongoing basis for foreign trade participants in all sectors. With extensive experience and academic background in foreign-related cases, the lawyers of Tiger Partners are able to provide high-quality and efficient foreign-related dispute resolution legal services to Chinese and foreign clients.",
    zhIntro:
      "“一带一路”战略为各行业对外贸易参与者提供持续的新机遇和新挑战，虎诉律师有丰富的涉外案件经验和学术背景，能够为中外客户提供优质、高效的涉外争议解决法律服务。",
  },
  "cyber-tech-and-game": {
    intro:
      "Since Internet plus initiative became a national strategy, numerous entrepreneurs have been pursuing wealth and success in the tide of the internet. With years of legal service experience cultivating in internet technology and game, Tiger Partners has greatly protected and escorted investors and young entrepreneurs in this industry.",
    zhIntro:
      "“互联网+”成为国家战略以来，海量创业者在互联网浪潮中追逐财富与成功，虎诉凭借多年深耕互联网科技及游戏行业法律服务的经验，为行业投资者和青年企业家保驾护航。",
  },
};

function normalizeIndustrySlug(value: string) {
  const normalized = String(value ?? "").trim().split("#")[0]?.split("?")[0] ?? "";
  const industryPathMatch = normalized.match(/(?:^|\/)industries\/([^/]+)$/);
  const slug = industryPathMatch?.[1] ?? normalized;

  return slug.replace(/^\/+|\/+$/g, "");
}

function enrichIndustryList(items: OfficialCmsSiteState["lists"]["industries"]) {
  return items.map((item) => {
    const slug = normalizeIndustrySlug(item.slug);

    return {
      ...defaultIndustryIntros[slug],
      ...item,
      slug,
      img: item.img ?? "",
    };
  });
}

export const defaultCmsSiteState: OfficialCmsSiteState = {
  version: 1,
  updatedAt: "2026-05-10T12:30:00.000Z",
  header: defaultHeader,
  assets: {
    titleLogo: "/assets/title/logo.svg",
    footerLogo: "/assets/foot/logo.svg",
    footerQr: "/assets/foot/QRcode.png?v=202605101205",
  },
  footer: {
    phone: "010-85885228",
    email: "contact@tigerpartners.cn",
    tagline: {
      en: "Always pursuing the extreme and seeking the perfection,\nAlways aiming at winning lawsuits and\nFulling clients' business goals",
      zh: "\u59cb\u7ec8\u8ffd\u6c42\u6781\u81f4\u4e0e\u5b8c\u7f8e\uff0c\u4e00\u5207\u4ee5\u80dc\u8bc9\u548c\u5ba2\u6237\u7684\u5546\u4e1a\u76ee\u6807\u4e3a\u5bfc\u5411",
    },
    address: {
      en: "Suite 01, 25F, Tower A, Sino-Ocean International Center, 56 East 4th Ring Middle Road, Chaoyang District, Beijing\n100025, China",
      zh: "\u5317\u4eac\u5e02\u671d\u9633\u533a\u4e1c\u56db\u73af\u4e2d\u8def56\u53f7\u8fdc\u6d0b\u56fd\u9645\u4e2d\u5fc3A\u5ea72501\u5ba4\uff0c\u90ae\u7f16\uff1a100025",
    },
    rights: {
      en: "All Rights Reserved \u00a9 2019 Tiger Partners",
      zh: "\u7248\u6743\u6240\u6709\u00a9 2019 \u864e\u8bc9\u5f8b\u5e08\u4e8b\u52a1\u6240",
    },
    disclaimerLabel: {
      en: "Disclaimer and Privacy",
      zh: "Disclaimer and Privacy",
    },
    publicSecurityText: "\u4eac\u516c\u7f51\u5b89\u5907 11010502052714\u53f7",
    publicSecurityUrl: "https://beian.mps.gov.cn/#/query/webSearch",
    icpText: "\u4eacICP\u590720002490\u53f7",
    icpUrl: "https://beian.miit.gov.cn/#/Integrated/index",
    wechatIcon: "/assets/foot/weixin.png",
    addressIcon: "/assets/foot/address.png",
    phoneIcon: "/assets/foot/phone.png",
    emailIcon: "/assets/foot/email.png",
    chinaIcon: "/assets/foot/china.png",
  },
  home: {
    heroTitle: {
      en: "WE KNOW HOW TO WIN",
      zh: "WE KNOW HOW TO WIN",
    },
    heroVideo: "/assets/home/海浪0508.mp4",
    eventSlugs: [
      "kinsey-kang-hong-kong-legal-counsel",
      "chambers-forum-beijing-2023",
      "shifoying-nanli-community-pairing",
      "tiger-partners-third-anniversary",
      "cietac-cup-voice-of-moot-sponsor",
    ],
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
    ...defaultManagedLists,
    industries: enrichIndustryList(defaultManagedLists.industries),
  },
};

function mergeCmsState(value: Partial<OfficialCmsSiteState>): OfficialCmsSiteState {
  const lists = value.lists ?? defaultCmsSiteState.lists;
  const header = value.header ?? defaultCmsSiteState.header;

  return {
    ...defaultCmsSiteState,
    ...value,
    assets: {
      ...defaultCmsSiteState.assets,
      ...value.assets,
    },
    footer: {
      ...defaultCmsSiteState.footer,
      ...value.footer,
      tagline: {
        ...defaultCmsSiteState.footer.tagline,
        ...value.footer?.tagline,
      },
      address: {
        ...defaultCmsSiteState.footer.address,
        ...value.footer?.address,
      },
      rights: {
        ...defaultCmsSiteState.footer.rights,
        ...value.footer?.rights,
      },
      disclaimerLabel: {
        ...defaultCmsSiteState.footer.disclaimerLabel,
        ...value.footer?.disclaimerLabel,
      },
    },
    header: {
      ...defaultCmsSiteState.header,
      ...header,
      navigation:
        header.navigation?.filter((item) => item.id && item.href)?.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) ??
        defaultCmsSiteState.header.navigation,
      socialLinks:
        header.socialLinks?.filter((item) => item.id && item.href)?.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) ??
        defaultCmsSiteState.header.socialLinks,
    },
    home: {
      ...defaultCmsSiteState.home,
      ...value.home,
      heroTitle: {
        ...defaultCmsSiteState.home.heroTitle,
        ...value.home?.heroTitle,
      },
      eventSlugs: value.home?.eventSlugs?.filter(Boolean) ?? defaultCmsSiteState.home.eventSlugs,
    },
    events: {
      ...defaultCmsSiteState.events,
      ...value.events,
      overrides: value.events?.overrides ?? defaultCmsSiteState.events.overrides,
    },
    content: {
      ...defaultCmsSiteState.content,
      ...value.content,
      honors: value.content?.honors ?? defaultCmsSiteState.content.honors,
      chronicle: value.content?.chronicle ?? defaultCmsSiteState.content.chronicle,
      teamProfiles: value.content?.teamProfiles ?? defaultCmsSiteState.content.teamProfiles,
    },
    lists: {
      ...defaultCmsSiteState.lists,
      ...lists,
      industries: enrichIndustryList(
        lists.industries?.filter((item) => normalizeIndustrySlug(item.slug)) ?? defaultCmsSiteState.lists.industries,
      ),
      eventSlugs: lists.eventSlugs?.filter(Boolean) ?? defaultCmsSiteState.lists.eventSlugs,
      clientLogos: lists.clientLogos?.filter(Boolean) ?? defaultCmsSiteState.lists.clientLogos,
      homeHonorYears: lists.homeHonorYears?.filter(Boolean) ?? lists.honorYears?.filter(Boolean) ?? defaultCmsSiteState.lists.homeHonorYears,
      homeHonorItems: lists.homeHonorItems?.filter(Boolean) ?? defaultCmsSiteState.lists.homeHonorItems,
      honorYears: lists.honorYears?.filter(Boolean) ?? defaultCmsSiteState.lists.honorYears,
      chronicleYears: lists.chronicleYears?.filter(Boolean) ?? defaultCmsSiteState.lists.chronicleYears,
      partnerSlugs: lists.partnerSlugs?.filter(Boolean) ?? defaultCmsSiteState.lists.partnerSlugs,
      seniorAssociateSlugs: lists.seniorAssociateSlugs?.filter(Boolean) ?? defaultCmsSiteState.lists.seniorAssociateSlugs,
    },
    previewPageContent: value.previewPageContent,
  };
}

export async function getCmsSiteState(): Promise<OfficialCmsSiteState> {
  try {
    const raw = await readFile(cmsDataPath, "utf8");
    return mergeCmsState(JSON.parse(raw) as Partial<OfficialCmsSiteState>);
  } catch {
    return defaultCmsSiteState;
  }
}

export async function saveCmsSiteState(nextState: OfficialCmsSiteState): Promise<OfficialCmsSiteState> {
  const state = mergeCmsState({
    ...nextState,
    version: 1,
    updatedAt: new Date().toISOString(),
  });

  await mkdir(path.dirname(cmsDataPath), { recursive: true });
  await writeFile(cmsDataPath, `${JSON.stringify(state, null, 2)}\n`, "utf8");

  return state;
}

export async function getPublicCmsState(): Promise<OfficialCmsPublicState> {
  return resolvePublicAssetUrls(await getCmsSiteState());
}

export function getCmsSiteStateSync(): OfficialCmsSiteState {
  if (!existsSync(cmsDataPath)) {
    return defaultCmsSiteState;
  }

  try {
    return mergeCmsState(JSON.parse(readFileSync(cmsDataPath, "utf8")) as Partial<OfficialCmsSiteState>);
  } catch {
    return defaultCmsSiteState;
  }
}

export function saveCmsSiteStateSync(nextState: OfficialCmsSiteState): OfficialCmsSiteState {
  const state = mergeCmsState({
    ...nextState,
    version: 1,
    updatedAt: new Date().toISOString(),
  });

  mkdirSync(path.dirname(cmsDataPath), { recursive: true });
  writeFileSync(cmsDataPath, `${JSON.stringify(state, null, 2)}\n`, "utf8");

  return state;
}
