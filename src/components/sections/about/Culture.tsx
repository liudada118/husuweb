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
            src="/assets/home/INDUSTRIES3.png"
            alt="city"
            decoding="sync"
            className="absolute inset-0 size-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "linear-gradient(to left, #a88d61 0%, rgba(168, 141, 97, 0) 30%)" }}
            aria-hidden="true"
          />
        </div>
        <div className="relative flex flex-col justify-center bg-[#A1865F] px-[var(--shell-md)] py-20 lg:px-20">
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
          <h2 className="relative text-[clamp(2.5rem,2.708vw,3.25rem)] font-semibold leading-none text-black">
            {pick(language, copy.about.cultureTitle)}
          </h2>
          <p className="relative mt-10 max-w-[48rem] text-justify text-[clamp(1.25rem,1.46vw,1.75rem)] italic leading-relaxed text-black">
            {pick(language, copy.about.cultureSubtitle)}
          </p>
          <Link
            href="/about/core-value"
            className="group relative mt-10 inline-flex items-center gap-4 self-start border border-[#D9B27A] bg-[#D9B27A] px-9 py-4 text-[1.125rem] font-medium uppercase tracking-[0.08em] text-white transition-all duration-500 hover:bg-transparent hover:text-black"
          >
            {pick(language, copy.about.cultureCta)}
            <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-2" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}
