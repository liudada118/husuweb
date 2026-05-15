"use client";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { BackToTop } from "@/components/shared/BackToTop";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { SubpageBreadcrumb } from "@/components/shared/SubpageBreadcrumb";
import { events, formatEventDate, localizeEvent } from "@/data/events";
import { pick, useLanguage } from "@/i18n/LanguageProvider";
import { copy } from "@/i18n/copy";
import { useSearchParams } from "next/navigation";

export function EventDetailPage({ slug }: { slug: string }) {
  const { language } = useLanguage();
  const searchParams = useSearchParams();
  const event = localizeEvent(events.find((item) => item.slug === slug) ?? events[0], language);
  const fullTitle = [event.localizedCategory, event.localizedTitle].filter(Boolean).join(" | ");
  const fromHome = searchParams.get("from") === "home";
  const parentLabel = fromHome ? pick(language, copy.nav.home) : pick(language, copy.nav.events);
  const fallbackHref = fromHome ? "/" : "/events";
  const imagePlaceholderSource = String.raw`\[(?:IMAGE|Image|\u56fe\u7247|\u9365\u5267\u5896)\]?`;
  const videoPlaceholderText = "\u6682\u65f6\u65e0\u6cd5\u5728\u98de\u4e66\u6587\u6863\u5916\u5c55\u793a\u6b64\u5185\u5bb9";
  const mediaPlaceholderPattern = new RegExp(`${imagePlaceholderSource}|${videoPlaceholderText}`, "g");
  const cleanText = (text: string) => text.replace(mediaPlaceholderPattern, "").trim();
  const summary = cleanText(event.localizedSummary);
  const detailImages = event.detailImages ?? [];
  const detailVideos = event.detailVideos ?? [];
  let detailImageIndex = 0;
  let detailVideoIndex = 0;
  const detailBlocks = event.localizedContent
    .flatMap((paragraph, index) => {
      const blocks: Array<
        | { type: "image"; src: string; index: number }
        | { type: "video"; src: string; index: number }
        | { type: "text"; text: string; index: number }
      > = [];
      const matches = [...paragraph.matchAll(mediaPlaceholderPattern)];

      if (matches.length === 0) {
        const text = cleanText(paragraph);
        if (!text || (index === 0 && text === summary)) return blocks;

        blocks.push({ type: "text", text, index });
        return blocks;
      }

      let cursor = 0;
      matches.forEach((match, matchIndex) => {
        const text = paragraph.slice(cursor, match.index).trim();
        if (text && !(index === 0 && text === summary)) {
          blocks.push({ type: "text", text, index });
        }

        const placeholder = match[0];
        if (placeholder === videoPlaceholderText) {
          const src = detailVideos[detailVideoIndex];
          detailVideoIndex += 1;
          if (src) blocks.push({ type: "video", src, index: index * 100 + matchIndex });
        } else {
          const src = detailImages[detailImageIndex];
          detailImageIndex += 1;
          if (src) blocks.push({ type: "image", src, index: index * 100 + matchIndex });
        }

        cursor = (match.index ?? 0) + match[0].length;
      });

      const trailingText = paragraph.slice(cursor).trim();
      if (trailingText && !(index === 0 && trailingText === summary)) {
        blocks.push({ type: "text", text: trailingText, index });
      }

      return blocks;
    })
    .filter(
      (block): block is
        | { type: "image"; src: string; index: number }
        | { type: "video"; src: string; index: number }
        | { type: "text"; text: string; index: number } => Boolean(block),
    );

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#171717] text-white">
      <SiteHeader active="EVENTS" />

      <section className="relative bg-[#171717]">
        <div className="site-shell pb-20 pt-[calc(var(--header-height)+5rem)] lg:pb-24 lg:pt-[12rem]">
          <SubpageBreadcrumb
            parentLabel={parentLabel}
            currentLabel={fullTitle}
            fallbackHref={fallbackHref}
          />

          <h1 className="mt-16 max-w-[98rem] text-[4rem] font-semibold leading-[1.15] tracking-[-0.02em] text-white">
            {fullTitle}
          </h1>

          <p className="mt-12 text-[1.75rem] font-normal leading-none tracking-[0.02em] text-[#d9b27a]">
            {formatEventDate(event.date, language)}
          </p>

          <div className="mt-12 h-px bg-[#d9b27a]" />
        </div>
      </section>

      <section className="site-shell pb-28">
        <div className="max-w-[108rem]">
          <div>
            <p className="text-justify text-[1.5rem] font-light italic leading-[1.7] tracking-[0.02em] text-[#d1d5dc]">
              {summary}
            </p>
            {detailBlocks.map((block, blockIndex) =>
              block.type === "image" ? (
                <div key={`${event.slug}-image-${block.index}-${blockIndex}`} className="mx-auto mt-10 w-full overflow-hidden bg-[#272727] md:w-[70%]">
                  <ImageWithFallback src={block.src} alt={fullTitle} loading="lazy" className="h-auto w-full object-contain" />
                </div>
              ) : block.type === "video" ? (
                <div key={`${event.slug}-video-${block.index}-${blockIndex}`} className="mx-auto mt-10 w-full overflow-hidden bg-[#272727] md:w-[70%]">
                  <video
                    src={block.src}
                    controls
                    playsInline
                    preload="metadata"
                    className="block w-full"
                  />
                </div>
              ) : (
                <p
                  key={`${event.slug}-paragraph-${block.index}-${blockIndex}`}
                  className="mt-10 text-justify text-[1.5rem] font-light leading-[1.7] tracking-[0.02em] text-[#d1d5dc]"
                >
                  {block.text}
                </p>
              ),
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
      <BackToTop fallbackHref={fallbackHref} />
    </main>
  );
}
