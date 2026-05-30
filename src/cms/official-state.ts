import type { PageContentState } from "@/lib/cms-page-content";

export type OfficialCmsLocalizedText = {
  en: string;
  zh: string;
};

export type OfficialCmsHeaderNavItem = {
  id: string;
  href: string;
  labelZh: string;
  labelEn: string;
  visible?: boolean;
  order?: number;
};

export type OfficialCmsHeaderSocialLink = {
  id: string;
  label: string;
  href: string;
  iconSrc: string;
  visible?: boolean;
  order?: number;
};

export type OfficialCmsLocalizedEventOverride = {
  category?: string;
  title?: string;
  summary?: string;
  displayDate?: string;
  content?: string[];
};

export type OfficialCmsEventOverride = {
  image?: string;
  href?: string;
  sortDate?: string;
  detailImages?: string[];
  detailVideos?: string[];
  en?: OfficialCmsLocalizedEventOverride;
  zh?: OfficialCmsLocalizedEventOverride;
};

export type OfficialCmsIndustryListItem = {
  slug: string;
  name: string;
  zhName?: string;
  img: string;
  cls?: string;
  intro?: string;
  zhIntro?: string;
  sections?: string;
  zhSections?: string;
};

export type OfficialCmsHonorAward = {
  title: OfficialCmsLocalizedText;
  date: string;
  body: OfficialCmsLocalizedText;
  href?: string;
};

export type OfficialCmsHonorYear = {
  year: string;
  count: OfficialCmsLocalizedText;
  awards: OfficialCmsHonorAward[];
};

export type OfficialCmsChronicleEvent = {
  month: OfficialCmsLocalizedText;
  side: "left" | "right";
  text: OfficialCmsLocalizedText;
};

export type OfficialCmsChronicleYear = {
  year: string;
  events: OfficialCmsChronicleEvent[];
};

export type OfficialCmsTeamProfileContent = {
  slug: string;
  name?: string;
  zhName?: string;
  title?: string;
  zhTitle?: string;
  image?: string;
  phone?: string;
  email?: string;
  serviceIndustries?: string[];
  zhServiceIndustries?: string[];
  education?: string;
  zhEducation?: string;
  qualification?: string;
  zhQualification?: string;
  languages?: string[];
  zhLanguages?: string[];
  socialEngagements?: string;
  zhSocialEngagements?: string;
  practiceArea?: string;
  zhPracticeArea?: string;
  practiceExperience?: string;
  zhPracticeExperience?: string;
  honors?: string[];
  zhHonors?: string[];
  achievements?: string[];
  zhAchievements?: string[];
};

export type OfficialCmsContentOverrides = {
  honors: OfficialCmsHonorYear[];
  chronicle: OfficialCmsChronicleYear[];
  teamProfiles: Record<string, OfficialCmsTeamProfileContent>;
};

export type OfficialCmsManagedLists = {
  industries: OfficialCmsIndustryListItem[];
  eventSlugs: string[];
  clientLogos: string[];
  homeHonorYears: string[];
  homeHonorItems: string[];
  honorYears: string[];
  chronicleYears: string[];
  partnerSlugs: string[];
  seniorAssociateSlugs: string[];
};

export type OfficialCmsSiteState = {
  version: 1;
  updatedAt: string;
  header: {
    siteName: string;
    siteSubtitle: string;
    languageZhLabel: string;
    languageEnLabel: string;
    officialSiteUrl: string;
    officialSiteLabel: string;
    officialLogoUrl: string;
    navigation: OfficialCmsHeaderNavItem[];
    socialLinks: OfficialCmsHeaderSocialLink[];
  };
  assets: {
    titleLogo: string;
    footerLogo: string;
    footerQr: string;
  };
  footer: {
    phone: string;
    email: string;
    tagline: OfficialCmsLocalizedText;
    address: OfficialCmsLocalizedText;
    rights: OfficialCmsLocalizedText;
    disclaimerLabel: OfficialCmsLocalizedText;
    publicSecurityText: string;
    publicSecurityUrl: string;
    icpText: string;
    icpUrl: string;
    wechatIcon: string;
    addressIcon: string;
    phoneIcon: string;
    emailIcon: string;
    chinaIcon: string;
  };
  home: {
    heroTitle: OfficialCmsLocalizedText;
    heroVideo: string;
    eventSlugs: string[];
    eventOverrides?: Record<string, OfficialCmsEventOverride>;
  };
  events: {
    overrides: Record<string, OfficialCmsEventOverride>;
  };
  content: OfficialCmsContentOverrides;
  lists: OfficialCmsManagedLists;
  previewPageContent?: PageContentState;
};

export type OfficialCmsPublicState = OfficialCmsSiteState;
