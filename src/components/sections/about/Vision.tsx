"use client";

import { useState } from "react";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { pick, useLanguage } from "@/i18n/LanguageProvider";
import { copy } from "@/i18n/copy";

export function VisionCard({ className = "" }: { className?: string }) {
  const { language } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const paragraphs = pick(language, copy.about.visionParagraphs);
  const moreParagraphs = pick(language, copy.about.visionMoreParagraphs);

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
          src="/assets/about/aboutVision.webp"
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(47,47,47,0.72)_0%,rgba(47,47,47,0.42)_48%,rgba(30,30,30,0.78)_100%)]" />
        <div className="relative z-10 mx-auto max-w-[95rem]">
          <div className="mb-8 flex min-w-0 flex-col items-start justify-end gap-5 lg:flex-row lg:items-center lg:pl-[7rem] lg:text-right">
            <p className="relative min-w-0 max-w-full break-words text-[1.1rem] font-medium leading-relaxed text-[#D9B27A] md:max-w-[56rem] md:text-[1.5rem]">
              {pick(language, copy.about.visionSubtitle).map((line, index, lines) => (
                <span key={line} className={language === "en" && index === 1 ? "md:whitespace-nowrap" : undefined}>
                  {line}
                  {index < lines.length - 1 ? <br /> : null}
                </span>
              ))}
            </p>
            <h2
              className="relative inline-block max-w-full shrink-0 break-words bg-clip-text pb-2 text-[3rem] text-transparent md:text-[5rem]"
              style={{
                fontWeight: 800,
                lineHeight: 1.12,
                backgroundImage: "linear-gradient(153deg, #dbdbdb 10%, #946c32 130%)",
              }}
            >
              {pick(language, copy.about.visionTitle)}
            </h2>
          </div>

          <div className="relative space-y-6">
            {paragraphs.map((paragraph, index) => (
              <p
                key={paragraph}
                className={`relative break-words text-left text-[1.05rem] font-medium leading-relaxed text-white/80 md:text-justify md:text-[1.5rem] ${
                  index === 0 ? "lg:[text-indent:-3rem]" : ""
                }`}
              >
                {index === 0 ? (
                  <span className="relative mr-2 hidden h-[1em] w-[8.4375rem] align-baseline lg:inline-block">
                    <ImageWithFallback
                      src="/assets/about/Icon.svg"
                      alt=""
                      loading="lazy"
                      className="pointer-events-none absolute bottom-[-0.2rem] left-0 w-[8.4375rem] max-w-none opacity-80"
                    />
                  </span>
                ) : null}
                {paragraph}
              </p>
            ))}

            {expanded ? (
              <div className="space-y-6">
                {moreParagraphs.map((paragraph) => (
                  <p key={paragraph} className="break-words text-left text-[1.05rem] font-medium leading-relaxed text-white/80 md:text-justify md:text-[1.5rem]">
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : null}

            <button
              type="button"
              onClick={() => setExpanded((value) => !value)}
              className="relative mx-auto mb-8 mt-10 flex w-max flex-col items-center"
            >
              <span className="text-[1.15rem] font-semibold text-[#e1ab5c] md:text-[1.5rem]">
                {expanded ? pick(language, copy.common.collapse) : pick(language, copy.common.seeMore)}
              </span>
              <span className="mt-1 block h-0.5 w-28 bg-[#e1ab5c]" />
            </button>
          </div>
        </div>
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
