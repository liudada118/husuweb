"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { events, formatEventDate, localizeEvent } from "@/data/events";
import { pick, useLanguage } from "@/i18n/LanguageProvider";
import { copy } from "@/i18n/copy";

export function EventDetailPage({ slug }: { slug: string }) {
  const { language } = useLanguage();
  const event = localizeEvent(events.find((item) => item.slug === slug) ?? events[0], language);
  const fullTitle = `${event.localizedCategory} | ${event.localizedTitle}`;

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#171717] text-white">
      <SiteHeader active="EVENTS" />

      <section className="relative bg-[#171717]">
        <div className="site-shell pb-20 pt-[calc(var(--header-height)+5rem)] lg:pb-24 lg:pt-[12rem]">
          <p className="flex flex-wrap items-center gap-2 text-[1.25rem] font-light leading-relaxed tracking-[0.02em]">
            <Link href="/events" className="text-[#dedede] transition hover:text-[#d9b27a]">
              {pick(language, copy.eventsPage.title)}
            </Link>
            <ChevronRight className="size-4 text-[#bec3cb]" />
            <span className="font-medium text-white">{fullTitle}</span>
          </p>

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
              {event.localizedSummary}
            </p>
            {language === "en" ? (
              <p className="mt-10 text-justify text-[1.5rem] font-light leading-[1.7] tracking-[0.02em] text-[#d1d5dc]">
                This event entry is sourced from the English events document and shares the official date,
                category and summary used by the Events listing page.
              </p>
            ) : null}
          </div>
          <div className="relative aspect-[4/3] overflow-hidden bg-[#272727]">
            <ImageWithFallback src={event.image} alt={fullTitle} className="absolute inset-0 size-full object-cover" />
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
