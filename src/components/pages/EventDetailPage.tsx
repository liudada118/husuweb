"use client";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { BackToTop } from "@/components/shared/BackToTop";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { SubpageBreadcrumb } from "@/components/shared/SubpageBreadcrumb";
import { events, formatEventDate, localizeEvent } from "@/data/events";
import { pick, useLanguage } from "@/i18n/LanguageProvider";
import { copy } from "@/i18n/copy";

export function EventDetailPage({ slug }: { slug: string }) {
  const { language } = useLanguage();
  const event = localizeEvent(events.find((item) => item.slug === slug) ?? events[0], language);
  const fullTitle = `${event.localizedCategory} | ${event.localizedTitle}`;
  const cleanText = (text: string) => text.replace(/\[图片\]?/g, "").replace(/\[Image\]?/gi, "").trim();
  const summary = cleanText(event.localizedSummary);
  const detailParagraphs = event.localizedContent
    .map(cleanText)
    .filter((paragraph, index) => paragraph && (index > 0 || paragraph !== summary));

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#171717] text-white">
      <SiteHeader active="EVENTS" />

      <section className="relative bg-[#171717]">
        <div className="site-shell pb-20 pt-[calc(var(--header-height)+5rem)] lg:pb-24 lg:pt-[12rem]">
          <SubpageBreadcrumb
            parentLabel={pick(language, copy.eventsPage.title)}
            currentLabel={fullTitle}
            fallbackHref="/events"
          />

          <h1 className="mt-16 max-w-[98rem] text-[4rem] font-semibold leading-[1.15] tracking-[-0.02em] text-white">
            {fullTitle}
          </h1>

          <p className="mt-12 text-[1.75rem] font-normal leading-none tracking-[0.02em] text-[#d9b27a]">
            {formatEventDate(event.date)}
          </p>

          <div className="mt-12 h-px bg-[#d9b27a]" />
        </div>
      </section>

      <section className="site-shell pb-28">
        <div className="grid max-w-[108rem] gap-12 lg:grid-cols-[minmax(0,1fr)_28rem]">
          <div>
            <p className="text-justify text-[1.5rem] font-light italic leading-[1.7] tracking-[0.02em] text-[#d1d5dc]">
              {summary}
            </p>
            {detailParagraphs.map((paragraph, index) => (
              <p
                key={`${event.slug}-paragraph-${index}`}
                className="mt-10 text-justify text-[1.5rem] font-light leading-[1.7] tracking-[0.02em] text-[#d1d5dc]"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <div className="relative aspect-[4/3] overflow-hidden bg-[#272727]">
            <ImageWithFallback src={event.image} alt={fullTitle} loading="lazy" className="absolute inset-0 size-full object-cover" />
          </div>
        </div>
      </section>

      <SiteFooter />
      <BackToTop />
    </main>
  );
}
