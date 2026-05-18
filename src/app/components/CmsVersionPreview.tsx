"use client";

import { type MouseEvent, useState } from "react";
import dynamic from "next/dynamic";
import { PublicCmsProvider as OfficialPublicCmsProvider } from "@/cms/PublicCmsProvider";
import type { OfficialCmsPublicState } from "@/cms/official-state";
import { getTeamProfile, teamProfiles } from "@/data/teamProfiles";
import { LanguageProvider as OfficialLanguageProvider } from "@/i18n/LanguageProvider";
import { getPageContentField } from "@/lib/cms-page-content";
import type { CmsVersionSnapshot, PublicCmsData, VisualPage } from "@/lib/cms-types";
import type { Language } from "@/lib/site-types";
import type { SiteContent } from "../translations/translations";

const previewLoading = () => (
  <div className="flex min-h-[70vh] items-center justify-center bg-slate-950 text-sm font-semibold text-white/70">
    正在加载版本预览...
  </div>
);

const HomePreview = dynamic(() => import("@/components/pages/HomePage").then((mod) => mod.HomePage), {
  ssr: false,
  loading: previewLoading,
});
const AboutPreview = dynamic(() => import("@/components/pages/AboutPage").then((mod) => mod.AboutPage), {
  ssr: false,
  loading: previewLoading,
});
const CoreValuePreview = dynamic(() => import("@/components/pages/CoreValuePage").then((mod) => mod.CoreValuePage), {
  ssr: false,
  loading: previewLoading,
});
const EventPreview = dynamic(() => import("@/components/pages/EventsPage").then((mod) => mod.EventsPage), {
  ssr: false,
  loading: previewLoading,
});
const EventDetailPreview = dynamic(() => import("@/components/pages/EventDetailPage").then((mod) => mod.EventDetailPage), {
  ssr: false,
  loading: previewLoading,
});
const IndustriesPreview = dynamic(() => import("@/components/pages/IndustriesPage").then((mod) => mod.IndustriesPage), {
  ssr: false,
  loading: previewLoading,
});
const IndustryDetailPreview = dynamic(() => import("@/components/pages/IndustryDetailPage").then((mod) => mod.IndustryDetailPage), {
  ssr: false,
  loading: previewLoading,
});
const TeamPreview = dynamic(() => import("@/components/pages/TeamPage").then((mod) => mod.TeamPage), {
  ssr: false,
  loading: previewLoading,
});
const TeamProfilePreview = dynamic(() => import("@/components/pages/TeamProfilePage").then((mod) => mod.TeamProfilePage), {
  ssr: false,
  loading: previewLoading,
});
const ContactPreview = dynamic(() => import("@/components/pages/ContactPage").then((mod) => mod.ContactPage), {
  ssr: false,
  loading: previewLoading,
});

type PreviewRoute = {
  page: VisualPage;
  detail?: {
    type: "event" | "industry" | "team";
    slug: string;
  };
};

function PreviewPage({ route }: { route: PreviewRoute }) {
  if (route.detail?.type === "event") return <EventDetailPreview slug={route.detail.slug} />;
  if (route.detail?.type === "industry") return <IndustryDetailPreview slug={route.detail.slug} />;
  if (route.detail?.type === "team") {
    const profile = getTeamProfile(route.detail.slug) ?? teamProfiles[0];
    return <TeamProfilePreview profile={profile} />;
  }

  if (route.page === "home") return <HomePreview />;
  if (route.page === "coreValue") return <CoreValuePreview />;
  if (route.page === "about" || route.page === "awards") return <AboutPreview />;
  if (route.page === "event") return <EventPreview />;
  if (route.page === "media") return <IndustriesPreview />;
  if (route.page === "podcast") return <TeamPreview />;
  return <ContactPreview />;
}

function officialPreviewState(publicData: PublicCmsData): OfficialCmsPublicState {
  if (publicData.officialSiteState) {
    return {
      ...publicData.officialSiteState,
      previewPageContent: publicData.pageContent,
    } as OfficialCmsPublicState;
  }

  return {
    version: 1,
    updatedAt: new Date().toISOString(),
    header: {
      siteName: publicData.siteSettings.siteName || "Tiger Partners",
      siteSubtitle: publicData.siteSettings.siteSubtitle || "Law Firm",
      languageZhLabel: publicData.siteSettings.headerLanguageZhLabel || "CN",
      languageEnLabel: publicData.siteSettings.headerLanguageEnLabel || "EN",
      officialSiteUrl: publicData.siteSettings.officialSiteUrl || "https://www.tigerpartners.cn",
      officialSiteLabel: publicData.siteSettings.officialSiteLabel || "www.tigerpartners.cn",
      officialLogoUrl: publicData.siteSettings.headerOfficialLogoUrl || "",
      navigation: (publicData.siteSettings.navigation ?? [])
        .filter((item) => item.visible !== false)
        .map((item) => ({
          id: item.id,
          href: item.href,
          labelZh: item.labelZh,
          labelEn: item.labelEn,
          visible: item.visible,
          order: item.order,
        })),
      socialLinks: (publicData.siteSettings.socialLinks ?? [])
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
      titleLogo: publicData.siteSettings.logoUrl || "/assets/title/logo.svg",
      footerLogo: publicData.siteSettings.footerLeftLogoUrl || "/assets/foot/logo.svg",
      footerQr: publicData.siteSettings.footerOfficialLogoUrl || "/assets/foot/QRcode.png?v=202605101205",
    },
    footer: {
      phone: publicData.siteSettings.footerPhone || "010-85885228",
      email: publicData.siteSettings.footerEmail || "contact@tigerpartners.cn",
      tagline: {
        en: publicData.siteSettings.footerTaglineEn || publicData.siteSettings.footerQuote || "WE KNOW HOW TO WIN",
        zh: publicData.siteSettings.footerTaglineZh || publicData.siteSettings.footerQuote || "WE KNOW HOW TO WIN",
      },
      address: {
        en: publicData.siteSettings.footerAddressEn || "",
        zh: publicData.siteSettings.footerAddressZh || "",
      },
      rights: {
        en: publicData.siteSettings.footerRightsEn || "All Rights Reserved \u00a9 2019 Tiger Partners",
        zh: publicData.siteSettings.footerRightsZh || "\u7248\u6743\u6240\u6709\u00a9 2019 \u864e\u8bc9\u5f8b\u5e08\u4e8b\u52a1\u6240",
      },
      disclaimerLabel: {
        en: publicData.siteSettings.footerDisclaimerLabelEn || "Disclaimer and Privacy",
        zh: publicData.siteSettings.footerDisclaimerLabelZh || "Disclaimer and Privacy",
      },
      publicSecurityText: publicData.siteSettings.footerPublicSecurityText || "\u4eac\u516c\u7f51\u5b89\u5907 11010502052714\u53f7",
      publicSecurityUrl: publicData.siteSettings.footerPublicSecurityUrl || "https://beian.mps.gov.cn/#/query/webSearch",
      icpText: publicData.siteSettings.footerIcpText || "\u4eacICP\u590720002490\u53f7",
      icpUrl: publicData.siteSettings.footerIcpUrl || "https://beian.miit.gov.cn/#/Integrated/index",
      wechatIcon: publicData.siteSettings.footerWechatIconUrl || "/assets/foot/weixin.png",
      addressIcon: publicData.siteSettings.footerAddressIconUrl || "/assets/foot/address.png",
      phoneIcon: publicData.siteSettings.footerPhoneIconUrl || "/assets/foot/phone.png",
      emailIcon: publicData.siteSettings.footerEmailIconUrl || "/assets/foot/email.png",
      chinaIcon: publicData.siteSettings.footerChinaIconUrl || "/assets/foot/china.png",
    },
    home: {
      heroTitle: {
        en: getPageContentField(publicData.pageContent, "en", "home", "hero", "title", "") || "WE KNOW HOW TO WIN",
        zh: getPageContentField(publicData.pageContent, "zh", "home", "hero", "title", "") || "WE KNOW HOW TO WIN",
      },
      heroVideo:
        getPageContentField(publicData.pageContent, "en", "home", "hero", "video", "") ||
        "/assets/home/海浪0508.mp4",
      eventSlugs: [
        "kinsey-kang-hong-kong-legal-counsel",
        "official-account-mini-program-upgrade",
        "benchmark-litigation-2022-dispute-resolution",
        "civil-code-contract-termination-rules-part-one",
        "wuhan-kingold-fake-gold-jurisdiction-objection",
      ],
    },
    events: { overrides: {} },
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
    previewPageContent: publicData.pageContent,
  } as OfficialCmsPublicState;
}

const internalRouteToPage = new Map<string, VisualPage>([
  ["/", "home"],
  ["/about", "about"],
  ["/about/core-value", "coreValue"],
  ["/about#honors", "awards"],
  ["/events", "event"],
  ["/industries", "media"],
  ["/team", "podcast"],
  ["/contact", "contact"],
]);

function resolvePreviewRoute(pathname: string): PreviewRoute | null {
  const pathWithoutBase = (pathname.replace(/^\/test(?=\/|$)/, "") || "/").replace(/\/+$/, "") || "/";
  const exactPage = internalRouteToPage.get(pathWithoutBase);

  if (exactPage) {
    return { page: exactPage };
  }

  const eventMatch = pathWithoutBase.match(/^\/events\/([^/]+)$/);
  if (eventMatch) {
    return { page: "event", detail: { type: "event", slug: decodeURIComponent(eventMatch[1]) } };
  }

  const industryMatch = pathWithoutBase.match(/^\/industries\/([^/]+)$/);
  if (industryMatch) {
    return { page: "media", detail: { type: "industry", slug: decodeURIComponent(industryMatch[1]) } };
  }

  const teamMatch = pathWithoutBase.match(/^\/team\/([^/]+)$/);
  if (teamMatch) {
    return { page: "podcast", detail: { type: "team", slug: decodeURIComponent(teamMatch[1]) } };
  }

  return null;
}

export function CmsVersionPreview({
  publicData,
  siteContent,
  version,
}: {
  publicData: PublicCmsData;
  siteContent: SiteContent;
  version: CmsVersionSnapshot;
}) {
  const [route, setRoute] = useState<PreviewRoute>({ page: "home" });
  const [language] = useState<Language>("en");

  const handlePreviewClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    const target = event.target instanceof Element ? event.target : null;
    const anchor = target?.closest("a[href]");

    if (!(anchor instanceof HTMLAnchorElement)) {
      return;
    }

    const href = anchor.getAttribute("href");

    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
      return;
    }

    const url = new URL(href, window.location.origin);

    if (url.origin !== window.location.origin) {
      return;
    }

    const nextRoute = resolvePreviewRoute(url.pathname);

    if (!nextRoute) {
      return;
    }

    event.preventDefault();
    setRoute(nextRoute);

    window.requestAnimationFrame(() => {
      if (url.hash) {
        document.querySelector(url.hash)?.scrollIntoView({ block: "start" });
        return;
      }

      window.scrollTo({ top: 0, behavior: "instant" });
    });
  };

  return (
    <div className="min-h-screen bg-[#161915] text-slate-950">
      <div onClickCapture={handlePreviewClick}>
        <OfficialPublicCmsProvider initialState={officialPreviewState(publicData)} fetchOnMount={false}>
          <OfficialLanguageProvider key={`${version.id}-${route.page}-${route.detail?.slug ?? "index"}-${language}`} initialLanguage={language} persist={false}>
            <PreviewPage route={route} />
          </OfficialLanguageProvider>
        </OfficialPublicCmsProvider>
      </div>
    </div>
  );
}
