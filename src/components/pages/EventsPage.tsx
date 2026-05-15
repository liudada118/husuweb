"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { PageTriangle } from "@/components/shared/PageTriangle";
import { events, formatEventDate, localizeEvent } from "@/data/events";
import { pick, useLanguage } from "@/i18n/LanguageProvider";
import { copy } from "@/i18n/copy";
import { rememberReturnPosition, useRestoreReturnPosition } from "@/lib/returnPosition";

function EventCard({
  slug,
  category,
  title,
  date,
  image,
  onRememberReturn,
}: {
  slug: string;
  category: string;
  title: string;
  date: string;
  image: string;
  onRememberReturn: () => void;
}) {
  return (
    <Link href={`/events/${slug}?from=events`} onClick={onRememberReturn} className="group relative block min-w-0">
      <div className="relative flex h-full flex-col bg-[#5a5955] shadow-[0_8px_20px_rgba(0,0,0,0.25)] transition-colors duration-700 hover:bg-[#5f5e5a]">
        <div className="pointer-events-none absolute bottom-0 right-0 h-[6%] w-1/2 bg-white/10 [clip-path:polygon(100%_0,100%_100%,0_100%)]" />
        <div className="relative -left-[3.3%] -top-[1.25rem] aspect-[4/3] w-[90%] overflow-hidden bg-[#0a0a0a]">
          <ImageWithFallback
            src={image}
            alt={title}
            decoding="sync"
            className="size-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105"
          />
        </div>
        <div className="relative z-20 flex flex-1 flex-col px-6 pb-8 pt-6">
          <div className="mb-6 flex items-center justify-between gap-6 text-[1.5rem] font-normal tracking-[0.02em] text-[#d8d8d8]">
            <span>{date}</span>
            <ArrowRight className="size-[clamp(2rem,3vw,3.75rem)] shrink-0 text-[#d9b27a] transition-transform duration-500 group-hover:translate-x-2" strokeWidth={1.5} />
          </div>
          <h2 className="text-[1.875rem] font-medium leading-snug tracking-[0.02em] text-white transition-colors duration-500 group-hover:text-[#f1e8dc]">
            {category ? (
              <>
                <span className="font-normal italic text-[#d1ceca]">{category}</span>
                <span className="font-light text-[#d1ceca]"> | </span>
              </>
            ) : null}
            {title}
          </h2>
        </div>
      </div>
    </Link>
  );
}

const eventsShowAllStorageKey = "tiger:events-show-all";

export function EventsPage() {
  const [showAll, setShowAll] = useState(false);
  const [restoreReady, setRestoreReady] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    if (window.sessionStorage.getItem(eventsShowAllStorageKey) === "true") {
      setShowAll(true);
    }

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setRestoreReady(true));
    });
  }, []);

  const rememberEventsReturnPosition = useCallback(() => {
    window.sessionStorage.setItem(eventsShowAllStorageKey, showAll ? "true" : "false");
    rememberReturnPosition();
  }, [showAll]);

  const clearEventsReturnState = useCallback(() => {
    window.sessionStorage.removeItem(eventsShowAllStorageKey);
  }, []);

  useRestoreReturnPosition({ enabled: restoreReady, onRestored: clearEventsReturnState });

  const visibleEvents = (showAll ? events : events.slice(0, 9)).map((event) => localizeEvent(event, language));

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#171717] text-white">
      <PageTriangle
        className="right-0 top-[calc(100svh+18rem)] h-[calc(100%-100svh-18rem)] w-full opacity-50"
      />
      <section className="relative min-h-[100svh] overflow-hidden bg-[#171717]">
        <ImageWithFallback
          src="/assets/event/hero.png"
          alt=""
          loading="eager"
          fetchPriority="high"
          className="absolute left-1/2 top-0 block h-full w-screen min-w-full max-w-none -translate-x-1/2 object-cover opacity-45 md:left-0 md:w-full md:translate-x-0"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-[#171717]/35 to-[#171717]" />
        <SiteHeader active="EVENTS" />
        <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-5 pt-[var(--header-height)] text-center md:px-[8rem]">
          <div className="flex min-h-[40svh] w-full flex-col items-center justify-center bg-gradient-to-br from-[#56524a] to-[#212121] px-[var(--shell-sm)] md:px-[var(--shell-md)]">
            <h1 className="text-center text-[3.25rem] font-semibold italic leading-none text-[#d9b27a] md:text-[6.25rem]">
              {pick(language, copy.eventsPage.title)}
            </h1>
            <p className="mt-6 max-w-[58rem] text-center text-pretty text-[2.25rem] font-normal leading-relaxed text-[#cfd5df]/80">
              {pick(language, copy.eventsPage.intro)}
            </p>
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="absolute inset-0 bg-[linear-gradient(225deg,rgba(39,39,39,0.42)_0%,rgba(23,23,23,0)_60%)]" />
        <div className="relative mx-5 py-16 md:mx-[6rem] lg:py-24">
          <div className="grid grid-cols-1 gap-x-24 gap-y-16 md:grid-cols-2 xl:grid-cols-3">
            {visibleEvents.map((event) => (
              <EventCard
                key={event.slug}
                slug={event.slug}
                category={event.localizedCategory}
                title={event.localizedTitle}
                date={formatEventDate(event.date, language)}
                image={event.image}
                onRememberReturn={rememberEventsReturnPosition}
              />
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((value) => !value)}
              className="group relative inline-flex items-center gap-4 border border-[#D9B27A] bg-[#D9B27A] px-9 py-4 text-[1.125rem] font-medium uppercase tracking-[0.08em] text-white transition-all duration-500 hover:bg-transparent"
              aria-expanded={showAll}
            >
              {showAll ? pick(language, copy.common.collapse) : pick(language, copy.common.seeMore)}
              <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-2" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
