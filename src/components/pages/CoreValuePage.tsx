"use client";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CoreValueScrollFlow } from "@/components/sections/core-value/CoreValueScrollFlow";
import { BackToTop } from "@/components/shared/BackToTop";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { SubpageBreadcrumb } from "@/components/shared/SubpageBreadcrumb";
import { pick, useLanguage } from "@/i18n/LanguageProvider";
import { copy } from "@/i18n/copy";

const coreValueAssets = "/assets/prototypes/core-value";

const valueImages = {
  hero: `${coreValueAssets}/e59638152d8ac77db9b565bfbadeeb0d328a2986.png`,
};

function CoreValueHero() {
  const { language } = useLanguage();

  return (
    <section className="relative h-[28rem] overflow-hidden md:h-[32rem] lg:h-[35rem]">
      <ImageWithFallback
        src={valueImages.hero}
        alt=""
        loading="eager"
        fetchPriority="high"
        className="absolute inset-0 size-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,18,18,0.7)_0%,rgba(23,23,23,0.95)_90%)]" />
      <div className="absolute inset-0 hidden bg-[linear-gradient(115deg,rgba(18,18,18,0.85)_0%,rgba(18,18,18,0.4)_60%,rgba(217,178,122,0.15)_100%)] lg:block" />

      <div className="site-shell relative z-10 flex h-full flex-col justify-center pt-[var(--header-height)]">
        <SubpageBreadcrumb
          parentLabel={pick(language, copy.coreValue.breadcrumb)}
          currentLabel={pick(language, copy.coreValue.title)}
          fallbackHref="/about"
        />
        <div className="mt-12 h-[3px] w-16 bg-[#d9b27a]" />
        <h1 className="mt-12 text-[clamp(3rem,7vw,6rem)] font-semibold leading-[0.9] text-[#d9b27a]">
          {pick(language, copy.coreValue.title)}
        </h1>
      </div>
    </section>
  );
}

function QuoteIcon({ flip }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 96 96"
      fill="none"
      className="size-14 shrink-0 lg:size-20"
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
      aria-hidden="true"
    >
      <path
        d="M30 30 C18 30 10 40 10 52 C10 64 18 74 30 74 L30 64 C24 64 20 58 20 52 C20 46 24 40 30 40 Z"
        stroke="#d9b27a"
        strokeOpacity="0.5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M62 30 C50 30 42 40 42 52 C42 64 50 74 62 74 L62 64 C56 64 52 58 52 52 C52 46 56 40 62 40 Z"
        stroke="#d9b27a"
        strokeOpacity="0.5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClosingStatement() {
  const { language } = useLanguage();

  return (
    <section className="relative">
      <div className="mx-auto max-w-[105rem] px-[var(--shell-sm)] py-20 md:px-[var(--shell-md)] lg:px-20 lg:py-28">
        <div className="flex items-start gap-4 lg:gap-8">
          <QuoteIcon />
          <p className="flex-1 text-center text-[clamp(1rem,1.4vw,1.5rem)] leading-[1.875] tracking-[0.02em] text-[#d1d5dc]">
            {pick(language, copy.coreValue.closing)}
          </p>
          <QuoteIcon flip />
        </div>
      </div>
    </section>
  );
}

export function CoreValuePage() {
  return (
    <main className="min-h-screen bg-[#171717] text-white">
      <SiteHeader active="ABOUT US" />
      <CoreValueHero />
      <CoreValueScrollFlow />
      <ClosingStatement />
      <SiteFooter />
      <BackToTop />
    </main>
  );
}
