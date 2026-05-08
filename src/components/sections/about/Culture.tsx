"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { pick, useLanguage } from "@/i18n/LanguageProvider";
import { copy } from "@/i18n/copy";

export function Culture() {
  const { language } = useLanguage();

  return (
    <section className="relative mt-32 w-full overflow-hidden">
      <div className="relative grid min-h-[80vh] w-full grid-cols-1 lg:grid-cols-2">
        <div className="group relative min-h-[24rem] overflow-hidden lg:min-h-[80vh]">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1650638952928-da7470403d86?w=1400&q=80"
            alt="city"
            className="absolute inset-0 size-full object-cover opacity-[0.68] grayscale transition-all duration-[2000ms] ease-out group-hover:scale-105 group-hover:opacity-[0.74]"
            style={{ filter: "grayscale(0.62) sepia(0.34) saturate(0.78) brightness(0.68) contrast(0.96)" }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "linear-gradient(to left, #a88d61 0%, rgba(168, 141, 97, 0) 30%)" }}
            aria-hidden="true"
          />
        </div>
        <div
          className="pointer-events-none absolute inset-0 z-10"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(90deg, rgba(168, 141, 97, 0) 0%, rgba(168, 141, 97, 0) 42%, rgba(148, 123, 84, 0.34) 52%, rgba(168, 141, 97, 0.76) 64%, rgba(168, 141, 97, 0.96) 78%, rgba(168, 141, 97, 1) 100%), linear-gradient(180deg, rgba(44, 36, 28, 0.04) 0%, rgba(44, 36, 28, 0) 45%, rgba(44, 36, 28, 0.08) 100%)",
          }}
        />
        <div className="relative z-20 flex flex-col justify-center bg-[#a88d61] px-[var(--shell-md)] py-20 lg:px-20">
          <svg
            className="pointer-events-none absolute bottom-[60px] right-[-40px] w-[420px] max-w-[72vw] text-[rgba(120,96,58,0.35)] opacity-[0.1] mix-blend-multiply"
            viewBox="0 0 420 420"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="210" cy="210" r="168" stroke="currentColor" strokeWidth="18" />
            <path d="M86 210C126 120 294 120 334 210C294 300 126 300 86 210Z" stroke="currentColor" strokeWidth="18" />
            <path d="M210 58V362M58 210H362" stroke="currentColor" strokeWidth="14" />
          </svg>
          <h2 className="relative text-[4rem] font-semibold leading-none text-white">{pick(language, copy.about.cultureTitle)}</h2>
          <p className="relative mt-10 max-w-[42rem] text-justify text-[1.75rem] font-normal leading-relaxed text-white">
            {pick(language, copy.about.cultureSubtitle)}
          </p>
          <Link
            href="/about/core-value"
            className="group relative mt-10 inline-flex items-center gap-4 self-start border border-[#D9B27A] bg-[#D9B27A] px-9 py-4 text-[1.125rem] font-medium uppercase tracking-[0.08em] text-white transition-all duration-500 hover:bg-transparent"
          >
            {pick(language, copy.about.cultureCta)}
            <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-2" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}
