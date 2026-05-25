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
  footerTaglineEn: string;
  footerTaglineZh: string;
  footerAddressEn: string;
  footerAddressZh: string;
  footerRightsEn: string;
  footerRightsZh: string;
  footerDisclaimerLabelEn: string;
  footerDisclaimerLabelZh: string;
  footerPublicSecurityText: string;
  footerPublicSecurityUrl: string;
  footerIcpText: string;
  footerIcpUrl: string;
  footerWechatIconUrl: string;
  footerAddressIconUrl: string;
  footerPhoneIconUrl: string;
  footerEmailIconUrl: string;
  footerChinaIconUrl: string;
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
  footerTaglineEn: "Always pursuing the extreme and seeking the perfection,\nAlways aiming at winning lawsuits and\nFulling clients' business goals",
  footerTaglineZh: "\u59cb\u7ec8\u8ffd\u6c42\u6781\u81f4\u4e0e\u5b8c\u7f8e\uff0c\u4e00\u5207\u4ee5\u80dc\u8bc9\u548c\u5ba2\u6237\u7684\u5546\u4e1a\u76ee\u6807\u4e3a\u5bfc\u5411",
  footerAddressEn: "Suite 01, 25F, Tower A, Sino-Ocean International Center, 56 East 4th Ring Middle Road, Chaoyang District, Beijing\n100025, China",
  footerAddressZh: "\u5317\u4eac\u5e02\u671d\u9633\u533a\u4e1c\u56db\u73af\u4e2d\u8def56\u53f7\u8fdc\u6d0b\u56fd\u9645\u4e2d\u5fc3A\u5ea72501\u5ba4\uff0c\u90ae\u7f16\uff1a100025",
  footerRightsEn: "All Rights Reserved \u00a9 2019 Tiger Partners",
  footerRightsZh: "\u7248\u6743\u6240\u6709\u00a9 2019 \u864e\u8bc9\u5f8b\u5e08\u4e8b\u52a1\u6240",
  footerDisclaimerLabelEn: "Disclaimer and Privacy",
  footerDisclaimerLabelZh: "Disclaimer and Privacy",
  footerPublicSecurityText: "\u4eac\u516c\u7f51\u5b89\u5907 11010502052714\u53f7",
  footerPublicSecurityUrl: "https://beian.mps.gov.cn/#/query/webSearch",
  footerIcpText: "\u4eacICP\u590720002490\u53f7",
  footerIcpUrl: "https://beian.miit.gov.cn/#/Integrated/index",
  footerWechatIconUrl: "/assets/foot/weixin.png",
  footerAddressIconUrl: "/assets/foot/address.png",
  footerPhoneIconUrl: "/assets/foot/phone.png",
  footerEmailIconUrl: "/assets/foot/email.png",
  footerChinaIconUrl: "/assets/foot/china.png",
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
