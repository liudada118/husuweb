"use client";

import { type MouseEvent, useState } from "react";
import dynamic from "next/dynamic";
import { LanguageProvider } from "../contexts/LanguageContext";
import { PublicCmsDataProvider } from "../contexts/PublicCmsDataContext";
import { SiteContentProvider } from "../contexts/SiteContentContext";
import type { CmsVersionSnapshot, PublicCmsData, VisualPage } from "@/lib/cms-types";
import type { Language } from "@/lib/site-types";
import type { SiteContent } from "../translations/translations";

const previewLoading = () => (
  <div className="flex min-h-[70vh] items-center justify-center bg-slate-950 text-sm font-semibold text-white/70">
    正在加载版本预览...
  </div>
);

const HomePreview = dynamic(() => import("./landing/HomeLandingPage").then((mod) => mod.HomeLandingPage), {
  ssr: false,
  loading: previewLoading,
});
const AboutPreview = dynamic(() => import("./landing/AboutLandingPage").then((mod) => mod.AboutLandingPage), {
  ssr: false,
  loading: previewLoading,
});
const AwardsPreview = dynamic(() => import("./landing/AwardsLandingPage").then((mod) => mod.AwardsLandingPage), {
  ssr: false,
  loading: previewLoading,
});
const EventPreview = dynamic(() => import("./landing/EventLandingPage").then((mod) => mod.EventLandingPage), {
  ssr: false,
  loading: previewLoading,
});
const MediaPreview = dynamic(() => import("./landing/PodcastLandingPage").then((mod) => mod.PodcastLandingPage), {
  ssr: false,
  loading: previewLoading,
});
const PodcastPreview = dynamic(() => import("./landing/MediaLandingPage").then((mod) => mod.MediaLandingPage), {
  ssr: false,
  loading: previewLoading,
});
const ContactPreview = dynamic(() => import("./landing/ContactLandingPage").then((mod) => mod.ContactLandingPage), {
  ssr: false,
  loading: previewLoading,
});

function PreviewPage({ page }: { page: VisualPage }) {
  if (page === "home") return <HomePreview />;
  if (page === "about") return <AboutPreview />;
  if (page === "awards") return <AwardsPreview />;
  if (page === "event") return <EventPreview />;
  if (page === "media") return <MediaPreview />;
  if (page === "podcast") return <PodcastPreview />;
  return <ContactPreview />;
}

const internalRouteToPage = new Map<string, VisualPage>([
  ["/", "home"],
  ["/about", "about"],
  ["/awards", "awards"],
  ["/event", "event"],
  ["/media", "media"],
  ["/podcast", "podcast"],
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
        <PublicCmsDataProvider data={publicData}>
          <SiteContentProvider content={siteContent}>
            <LanguageProvider key={`${version.id}-${page}-${language}`} initialLanguage={language} persist={false}>
              <PreviewPage page={page} />
            </LanguageProvider>
          </SiteContentProvider>
        </PublicCmsDataProvider>
      </div>
    </div>
  );
}
