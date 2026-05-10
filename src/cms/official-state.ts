export type OfficialCmsLocalizedText = {
  en: string;
  zh: string;
};

export type OfficialCmsLocalizedEventOverride = {
  category?: string;
  title?: string;
  summary?: string;
  content?: string[];
};

export type OfficialCmsEventOverride = {
  image?: string;
  en?: OfficialCmsLocalizedEventOverride;
  zh?: OfficialCmsLocalizedEventOverride;
};

export type OfficialCmsSiteState = {
  version: 1;
  updatedAt: string;
  assets: {
    titleLogo: string;
    footerLogo: string;
    footerQr: string;
  };
  footer: {
    phone: string;
    email: string;
  };
  home: {
    heroTitle: OfficialCmsLocalizedText;
    heroVideo: string;
    eventSlugs: string[];
  };
  events: {
    overrides: Record<string, OfficialCmsEventOverride>;
  };
};

export type OfficialCmsPublicState = OfficialCmsSiteState;
