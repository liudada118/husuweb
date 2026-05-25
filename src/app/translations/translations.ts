import type { Language } from "@/lib/site-types";
import type { SiteSettings } from "@/lib/site-settings";

const zhCases = [
  {
    type: "商事争议",
    title: "重大商事争议解决",
    date: "2026",
    summary: "虎诉团队持续为客户处理高价值、复杂民商事争议案件。",
    keywords: ["争议解决", "商事诉讼", "仲裁"],
  },
];

const enCases = [
  {
    type: "Commercial Disputes",
    title: "Major Commercial Dispute Resolution",
    date: "2026",
    summary: "Tiger Partners continues to represent clients in high-value and complex civil and commercial disputes.",
    keywords: ["Dispute Resolution", "Commercial Litigation", "Arbitration"],
  },
];

export const translations = {
  zh: {
    header: {
      home: "首页",
      about: "关于我们",
      events: "虎诉动态",
      media: "服务行业",
      podcast: "虎诉团队",
      contact: "联系我们",
      logoName: "Tiger Partners",
      logoSubtitle: "虎诉律师事务所",
    },
    hero: {
      tagline1: "WE KNOW",
      tagline2: "HOW TO WIN",
      mainTitle: "重大、复杂民商事争议解决精品律所",
      description: "虎诉专注于重大、复杂民商事争议解决，为客户提供专业、精准、高效的法律服务。",
      viewProfile: "了解虎诉",
      viewCases: "代表业绩",
      nameLabel: "Tiger Partners",
      nameSubLabel: "虎诉律师事务所",
    },
    about: {
      title: "关于虎诉",
      paragraph1: "虎诉是一家专注于重大、复杂民商事争议解决的精品律师事务所。",
      paragraph2: "我们始终以实现客户需求作为第一目标，以胜诉作为争议解决法律服务的最终目的。",
      paragraph3: "我们追求卓越，致力于维护客户的合法权益。",
      moreAbout: "了解更多",
    },
    cases: {
      title: "代表业绩",
      subtitle: "重大、复杂争议解决案件。",
      viewCase: "查看案例",
      casesData: zhCases,
    },
    explore: {
      title: "探索更多",
      cards: [
        { title: "关于我们", desc: "了解虎诉的愿景、文化与发展历程。", btn: "查看关于我们" },
        { title: "服务行业", desc: "查看虎诉重点服务行业。", btn: "查看服务行业" },
        { title: "虎诉动态", desc: "查看虎诉最新动态与专业观察。", btn: "查看虎诉动态" },
      ],
    },
    cta: {
      badge: "联系我们",
      title: "欢迎与虎诉联系",
      description: "如您有任何法律疑问或争议，欢迎随时与我们联系。",
      contactButton: "联系我们",
      email: "contact@tigerpartners.cn",
      phone: "010-85885228",
    },
    footer: {
      subtitle: "Always aiming at winning lawsuits and fulfilling clients' business goals",
      contact: "联系我们",
      platforms: "虎诉平台",
      tigerPartners: "Tiger Partners",
      linkedin: "LinkedIn",
      bilibili: "微信公众号",
      xiaohongshu: "小红书",
      subscribe: "订阅",
      subscribeDesc: "订阅虎诉动态。",
      emailPlaceholder: "邮箱地址",
      copyright: "Tiger Partners. All rights reserved.",
      privacy: "隐私政策",
      terms: "服务条款",
      watermark: "Tiger Partners",
    },
  },
  en: {
    header: {
      home: "HOME",
      about: "ABOUT US",
      events: "EVENTS",
      media: "INDUSTRIES",
      podcast: "OUR TEAM",
      contact: "CONTACT",
      logoName: "Tiger Partners",
      logoSubtitle: "Law Firm",
    },
    hero: {
      tagline1: "WE KNOW",
      tagline2: "HOW TO WIN",
      mainTitle: "Boutique Law Firm Focused on Major and Complex Disputes",
      description: "Tiger Partners focuses on major and complex civil and commercial dispute resolution.",
      viewProfile: "About Tiger Partners",
      viewCases: "Representative Matters",
      nameLabel: "Tiger Partners",
      nameSubLabel: "Law Firm",
    },
    about: {
      title: "About Tiger Partners",
      paragraph1: "Tiger Partners is a boutique law firm focused on major and complex civil and commercial dispute resolution.",
      paragraph2: "We take the realization of clients' needs as the first goal and winning the case as the ultimate goal of our dispute resolution services.",
      paragraph3: "We pursue excellence and are committed to protecting clients' lawful rights and interests.",
      moreAbout: "Learn More",
    },
    cases: {
      title: "Representative Matters",
      subtitle: "Major and complex dispute resolution matters.",
      viewCase: "View Case",
      casesData: enCases,
    },
    explore: {
      title: "Explore More",
      cards: [
        { title: "About Us", desc: "Learn about Tiger Partners' vision, culture, and history.", btn: "View About Us" },
        { title: "Industries", desc: "Explore Tiger Partners' key service industries.", btn: "View Industries" },
        { title: "Events", desc: "Read Tiger Partners updates and professional insights.", btn: "View Events" },
      ],
    },
    cta: {
      badge: "Contact",
      title: "Contact Tiger Partners",
      description: "If you have any legal questions or disputes, please feel free to contact us.",
      contactButton: "Contact Us",
      email: "contact@tigerpartners.cn",
      phone: "010-85885228",
    },
    footer: {
      subtitle: "Always aiming at winning lawsuits and fulfilling clients' business goals",
      contact: "Contact",
      platforms: "Tiger Partners Platforms",
      tigerPartners: "Tiger Partners",
      linkedin: "LinkedIn",
      bilibili: "WeChat",
      xiaohongshu: "Xiaohongshu",
      subscribe: "Subscribe",
      subscribeDesc: "Subscribe to Tiger Partners updates.",
      emailPlaceholder: "Email address",
      copyright: "Tiger Partners. All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      watermark: "Tiger Partners",
    },
  },
};

export type SiteTranslations = typeof translations;
export type SiteContent = SiteTranslations & {
  siteSettings: SiteSettings;
};
export type SiteLocaleContent = SiteTranslations[Language];

export function useTranslation(lang: Language) {
  return translations[lang];
}
