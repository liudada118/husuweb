export interface SiteNavigationItem {
  id: string;
  href: string;
  labelZh: string;
  labelEn: string;
  visible: boolean;
  order: number;
}

export interface SiteSocialLink {
  id: string;
  label: string;
  href: string;
  iconSrc: string;
  visible: boolean;
  order: number;
}

export interface HomeCarouselItem {
  id: string;
  titleZh: string;
  titleEn: string;
  descriptionZh: string;
  descriptionEn: string;
  imageUrl: string;
  linkUrl: string;
  linkLabelZh: string;
  linkLabelEn: string;
  visible: boolean;
  order: number;
}

export interface SiteSettings {
  siteName: string;
  siteSubtitle: string;
  logoUrl: string;
  officialSiteUrl: string;
  officialSiteLabel: string;
  headerLanguageZhLabel: string;
  headerLanguageEnLabel: string;
  headerOfficialLogoUrl: string;
  footerLeftLogoUrl: string;
  footerRightLogoUrl: string;
  footerOfficialLogoUrl: string;
  footerEmail: string;
  footerPhone: string;
  footerQuote: string;
  navigation: SiteNavigationItem[];
  socialLinks: SiteSocialLink[];
  homeCarousel: HomeCarouselItem[];
}

export const defaultSiteSettings: SiteSettings = {
  siteName: "Tiger Partners",
  siteSubtitle: "Law Firm",
  logoUrl: "/assets/title/logo.svg",
  officialSiteUrl: "https://www.tigerpartners.cn",
  officialSiteLabel: "www.tigerpartners.cn",
  headerLanguageZhLabel: "CN",
  headerLanguageEnLabel: "EN",
  headerOfficialLogoUrl: "",
  footerLeftLogoUrl: "/assets/foot/logo.svg",
  footerRightLogoUrl: "/assets/title/logo.svg",
  footerOfficialLogoUrl: "/assets/foot/QRcode.png?v=202605101205",
  footerEmail: "contact@tigerpartners.cn",
  footerPhone: "010-85885228",
  footerQuote: "WE KNOW HOW TO WIN",
  navigation: [
    { id: "home", href: "/", labelZh: "首页", labelEn: "HOME", visible: true, order: 10 },
    { id: "about", href: "/about", labelZh: "关于我们", labelEn: "ABOUT US", visible: true, order: 20 },
    { id: "team", href: "/team", labelZh: "虎诉团队", labelEn: "OUR TEAM", visible: true, order: 30 },
    { id: "industries", href: "/industries", labelZh: "服务行业", labelEn: "INDUSTRIES", visible: true, order: 40 },
    { id: "events", href: "/events", labelZh: "虎诉动态", labelEn: "EVENTS", visible: true, order: 50 },
    { id: "contact", href: "/contact", labelZh: "联系我们", labelEn: "CONTACT", visible: true, order: 60 },
  ],
  socialLinks: [
    {
      id: "official",
      label: "Official Website",
      href: "https://www.tigerpartners.cn",
      iconSrc: "/assets/title/logo.svg",
      visible: true,
      order: 10,
    },
    {
      id: "wechat",
      label: "WeChat",
      href: "/assets/foot/QRcode.png?v=202605101205",
      iconSrc: "/assets/foot/QRcode.png?v=202605101205",
      visible: true,
      order: 20,
    },
  ],
  homeCarousel: [
    {
      id: "home-slide-1",
      titleZh: "争议解决精品律所",
      titleEn: "Boutique Dispute Resolution Practice",
      descriptionZh: "虎诉专注高价值、复杂商事争议，强调合伙人深度参与、精细化策略和结果导向。",
      descriptionEn: "Tiger Partners focuses on high-value, complex commercial disputes with partner-led execution, precise strategy, and outcome-driven service.",
      imageUrl: "/assets/home/hero.png",
      linkUrl: "/about",
      linkLabelZh: "了解虎诉",
      linkLabelEn: "About Tiger Partners",
      visible: true,
      order: 10,
    },
    {
      id: "home-slide-2",
      titleZh: "重点行业与专业团队",
      titleEn: "Industries and Team",
      descriptionZh: "覆盖私募股权、金融、房地产、国际贸易、体育电竞、互联网科技及游戏等领域。",
      descriptionEn: "Serving private equity, finance, real estate, international trade, sports and e-sports, cyber tech, and game industries.",
      imageUrl: "/assets/home/INDUSTRIES1.png",
      linkUrl: "/industries",
      linkLabelZh: "查看服务行业",
      linkLabelEn: "View Industries",
      visible: true,
      order: 20,
    },
  ],
};
