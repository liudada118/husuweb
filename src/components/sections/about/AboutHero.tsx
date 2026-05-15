"use client";

import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { VisionCard } from "@/components/sections/about/Vision";
import { pick, useLanguage } from "@/i18n/LanguageProvider";
import { copy } from "@/i18n/copy";

export function AboutHero() {
  const { language } = useLanguage();

  return (
    <section className="relative w-full overflow-hidden pb-20">
      <ImageWithFallback
        src="/assets/about/hero.png"
        alt="building"
        loading="eager"
        fetchPriority="high"
        className="absolute left-1/2 top-0 block h-full w-screen min-w-full max-w-none -translate-x-1/2 object-cover md:left-0 md:w-full md:translate-x-0"
      />
      <div className="absolute inset-x-0 bottom-0 top-[100svh] bg-gradient-to-b from-transparent to-[#171717]" />
      <div className="absolute inset-x-0 bottom-0 top-[100svh] bg-gradient-to-r from-black/30 to-transparent" />
      <div className="relative z-10">
        <div className="relative min-h-[100svh]">
        <div className="absolute left-[var(--shell-md)] right-[var(--shell-md)] top-[55svh] border-l-[0.3rem] border-[#d9b27a] pl-8">
          <h1
            className="text-[3.75rem] text-[#1b1b1b] md:text-[6rem]"
            style={{
              fontWeight: 600,
              letterSpacing: "0.04em",
              textShadow: "0 0 1px rgba(0,0,0,0.4)",
              lineHeight: 1,
            }}
          >
            {pick(language, copy.about.heroTitle)}
          </h1>
          <p
            className="mt-8 max-w-[74rem] text-balance text-[1.35rem] text-[#1b1b1b] md:text-[2rem]"
            style={{
              fontWeight: 500,
              fontStyle: "italic",
              lineHeight: 1.4,
            }}
          >
            {pick(language, copy.about.heroIntro).map((line, index, lines) => (
              <span key={line}>
                {line}
                {index < lines.length - 1 ? <br /> : null}
              </span>
            ))}
          </p>
        </div>
        </div>
        <VisionCard className="relative mx-[1.25rem] -mt-[10svh] md:mx-[5rem]" />
      </div>
    </section>
  );
}
