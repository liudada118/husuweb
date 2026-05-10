"use client";

import { type MouseEvent, useState } from "react";
import dynamic from "next/dynamic";
import { PublicCmsProvider as OfficialPublicCmsProvider } from "@/cms/PublicCmsProvider";
import type { OfficialCmsPublicState } from "@/cms/official-state";
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
const EventPreview = dynamic(() => import("@/components/pages/EventsPage").then((mod) => mod.EventsPage), {
  ssr: false,
  loading: previewLoading,
});
const IndustriesPreview = dynamic(() => import("@/components/pages/IndustriesPage").then((mod) => mod.IndustriesPage), {
  ssr: false,
  loading: previewLoading,
});
const TeamPreview = dynamic(() => import("@/components/pages/TeamPage").then((mod) => mod.TeamPage), {
  ssr: false,
  loading: previewLoading,
});
const ContactPreview = dynamic(() => import("@/components/pages/ContactPage").then((mod) => mod.ContactPage), {
  ssr: false,
  loading: previewLoading,
});

function PreviewPage({ page }: { page: VisualPage }) {
  if (page === "home") return <HomePreview />;
  if (page === "about" || page === "awards") return <AboutPreview />;
  if (page === "event") return <EventPreview />;
  if (page === "media") return <IndustriesPreview />;
  if (page === "podcast") return <TeamPreview />;
  return <ContactPreview />;
}

function officialPreviewState(publicData: PublicCmsData): OfficialCmsPublicState {
  return {
    version: 1,
    updatedAt: new Date().toISOString(),
    assets: {
      titleLogo: publicData.siteSettings.logoUrl || "/assets/title/logo.svg",
      footerLogo: publicData.siteSettings.footerLeftLogoUrl || "/assets/foot/logo.svg",
      footerQr: publicData.siteSettings.footerOfficialLogoUrl || "/assets/foot/QRcode.png?v=202605101205",
    },
    footer: {
      phone: publicData.siteSettings.footerPhone || "010-85885228",
      email: publicData.siteSettings.footerEmail || "contact@tigerpartners.cn",
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
  };
}

const internalRouteToPage = new Map<string, VisualPage>([
  ["/", "home"],
  ["/about", "about"],
  ["/about#honors", "awards"],
  ["/events", "event"],
  ["/industries", "media"],
  ["/team", "podcast"],
  ["/contact", "contact"],
]);

export function CmsVersionPreview({
  publicData,
  siteContent,
  version,
}: {
  publicData: PublicCmsData;
  siteContent: SiteContent;
  version: CmsVersionSnapshot;
}) {
  const [page, setPage] = useState<VisualPage>("home");
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

    const pathWithoutBase = (url.pathname.replace(/^\/test(?=\/|$)/, "") || "/").replace(/\/+$/, "") || "/";
    const nextPage = internalRouteToPage.get(pathWithoutBase);

    if (!nextPage) {
      return;
    }

    event.preventDefault();
    setPage(nextPage);

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
        <OfficialPublicCmsProvider initialState={officialPreviewState(publicData)}>
          <OfficialLanguageProvider key={`${version.id}-${page}-${language}`} initialLanguage={language} persist={false}>
            <PreviewPage page={page} />
          </OfficialLanguageProvider>
        </OfficialPublicCmsProvider>
      </div>
    </div>
  );
}
