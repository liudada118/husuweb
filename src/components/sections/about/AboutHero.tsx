"use client";

import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { VisionCard } from "@/components/sections/about/Vision";
import { pick, useLanguage } from "@/i18n/LanguageProvider";
import { copy } from "@/i18n/copy";

export function AboutHero() {
  const { language } = useLanguage();

  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: "calc(100svh + 36rem)" }}>
      <ImageWithFallback
        src="/assets/about/hero.png"
        alt="building"
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 top-[100svh] bg-gradient-to-b from-transparent to-[#171717]" />
      <div className="absolute inset-x-0 bottom-0 top-[100svh] bg-gradient-to-r from-black/30 to-transparent" />
      <div className="relative z-10 min-h-[calc(100svh+36rem)]">
        <div className="absolute left-[var(--shell-md)] right-[var(--shell-md)] top-[55svh] border-l-[0.3rem] border-[#d9b27a] pl-8">
          <h1
            className="text-[#1b1b1b]"
            style={{
              fontWeight: 600,
              fontSize: "6rem",
              letterSpacing: "0.04em",
              textShadow: "0 0 1px rgba(0,0,0,0.4)",
              lineHeight: 1,
            }}
          >
            {pick(language, copy.about.heroTitle)}
          </h1>
          <p
            className="mt-8 max-w-[74rem] text-balance text-[#1b1b1b]"
            style={{
              fontWeight: 500,
              fontStyle: "italic",
              fontSize: "2rem",
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
        <VisionCard className="absolute left-[1.25rem] right-[1.25rem] top-[90svh] md:left-[5rem] md:right-[5rem]" />
      </div>
    </section>
  );
}
