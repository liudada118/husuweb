"use client";

import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { pick, useLanguage } from "@/i18n/LanguageProvider";
import { copy } from "@/i18n/copy";

export function VisionCard({ className = "" }: { className?: string }) {
  const { language } = useLanguage();
  const paragraphs = pick(language, copy.about.visionParagraphs);

  return (
    <div className={className}>
      <div
        className="relative overflow-hidden rounded-none p-6 md:p-10 lg:p-12"
        style={{
          background: "linear-gradient(to bottom right, #585551 0%, #2f2f2f 100%)",
          backdropFilter: "blur(2px)",
        }}
      >
        <ImageWithFallback
          src="/assets/about/aboutVision.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(47,47,47,0.72)_0%,rgba(47,47,47,0.42)_48%,rgba(30,30,30,0.78)_100%)]" />
        <div className="mb-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
          <div className="hidden size-40 opacity-40 md:block">
            <svg viewBox="0 0 170 170" fill="none" aria-hidden="true">
              <circle cx="85" cy="85" r="80" stroke="#C5C5C5" strokeOpacity="0.6" strokeWidth="1.5" />
              <path
                d="M30 85 Q 85 30, 140 85 T 30 85"
                stroke="#C5C5C5"
                strokeOpacity="0.6"
                strokeWidth="1.5"
                fill="none"
              />
              <path d="M85 20 L85 150 M20 85 L150 85" stroke="#C5C5C5" strokeOpacity="0.4" strokeWidth="1" />
            </svg>
          </div>
          <div className="flex flex-1 flex-col items-start justify-end gap-5 lg:flex-row lg:items-center lg:text-right">
            <p className="relative max-w-[56rem] text-[1.5rem] font-medium leading-relaxed text-[#D9B27A]">
              {pick(language, copy.about.visionSubtitle).map((line, index, lines) => (
                <span key={line} className={language === "en" && index === 1 ? "whitespace-nowrap" : undefined}>
                  {line}
                  {index < lines.length - 1 ? <br /> : null}
                </span>
              ))}
            </p>
            <h2
              className="relative inline-block shrink-0 bg-clip-text text-transparent"
              style={{
                fontWeight: 800,
                fontSize: "5rem",
                lineHeight: 1,
                backgroundImage: "linear-gradient(153deg, #dbdbdb 10%, #946c32 130%)",
              }}
            >
              {pick(language, copy.about.visionTitle)}
            </h2>
          </div>
        </div>

        <div className="relative space-y-6">
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-justify text-[1.5rem] font-medium leading-relaxed text-white/80">
              {paragraph}
            </p>
          ))}
        </div>

        <a href="#" className="relative mx-auto mb-8 mt-10 flex w-max flex-col items-center">
          <span className="text-[1.5rem] font-semibold text-[#e1ab5c]">{pick(language, copy.common.seeMore)}</span>
          <span className="mt-1 block h-0.5 w-28 bg-[#e1ab5c]" />
        </a>
      </div>
    </div>
  );
}

export function Vision() {
  return (
    <section className="site-shell relative z-20 -mt-72 max-lg:-mt-28">
      <VisionCard />
    </section>
  );
}
