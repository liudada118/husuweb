"use client";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { BackToTop } from "@/components/shared/BackToTop";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { SubpageBreadcrumb } from "@/components/shared/SubpageBreadcrumb";
import { localizeCmsEvent } from "@/cms/events";
import { getPreviewPageItemField, getPreviewPageSectionItems } from "@/cms/preview-page-content";
import { usePublicCms } from "@/cms/PublicCmsProvider";
import { events, formatEventDate, normalizeEventDisplayDate } from "@/data/events";
import { pick, useLanguage } from "@/i18n/LanguageProvider";
import { copy } from "@/i18n/copy";
import { useSearchParams } from "next/navigation";

type EventPageItem = ReturnType<typeof getPreviewPageSectionItems>[number];

function trimTrailingEmptyItems(list: string[]) {
  const next = [...list];

  while (next.length && !next[next.length - 1]) {
    next.pop();
  }

  return next;
}

function collectDetailMedia(item: EventPageItem | undefined, legacyFieldId: string, pattern: RegExp) {
  if (!item) return [];

  const list = getPreviewPageItemField(item, legacyFieldId, "")
    .split(/\r?\n/)
    .map((value) => value.trim());

  item.fields.forEach((field) => {
    const match = field.id.match(pattern);
    if (!match) return;

    list[Number(match[1]) - 1] = field.value.trim();
  });

  return trimTrailingEmptyItems(list);
}

function hasDetailMediaField(item: EventPageItem | undefined, legacyFieldId: string, pattern: RegExp) {
  return Boolean(item?.fields.some((field) => field.id === legacyFieldId || pattern.test(field.id)));
}

function pickCmsDetailMedia(
  primaryItem: EventPageItem | undefined,
  secondaryItem: EventPageItem | undefined,
  legacyFieldId: string,
  pattern: RegExp,
  fallback: string[],
  useExplicitEmptyCmsValue = false,
) {
  const primary = collectDetailMedia(primaryItem, legacyFieldId, pattern);
  if (useExplicitEmptyCmsValue && hasDetailMediaField(primaryItem, legacyFieldId, pattern)) return primary;
  if (primary.some(Boolean)) return primary;

  const secondary = collectDetailMedia(secondaryItem, legacyFieldId, pattern);
  if (useExplicitEmptyCmsValue && hasDetailMediaField(secondaryItem, legacyFieldId, pattern)) return secondary;
  if (secondary.some(Boolean)) return secondary;

  return fallback;
}

function firstFilledValue(...values: Array<string | undefined>) {
  return values.find((value) => typeof value === "string" && value.trim())?.trim() ?? "";
}

function normalizeMediaWidthPercent(value: string | undefined, fallback = 70) {
  if (!value?.trim()) return fallback;

  const percent = Number(value.replace("%", "").trim());
  if (!Number.isFinite(percent)) return fallback;

  return Math.min(100, Math.max(10, percent));
}

export function EventDetailPage({ slug }: { slug: string }) {
  const { language } = useLanguage();
  const cms = usePublicCms();
  const searchParams = useSearchParams();
  const staticEvent = events.find((item) => item.slug === slug);
  const baseEvent = staticEvent ?? events[0];
  const event = localizeCmsEvent(baseEvent, language, cms?.events.overrides[slug]);
  const fromHome = searchParams.get("from") === "home";
  const parentLabel = fromHome ? pick(language, copy.nav.home) : pick(language, copy.nav.events);
  const fallbackHref = fromHome ? "/" : "/events";
  const imagePlaceholderSource = String.raw`\[(?:IMAGE|Image|\u56fe\u7247|\u9365\u5267\u5896)\]?`;
  const videoPlaceholderSource = String.raw`\[(?:VIDEO|Video|video)\]`;
  const legacyVideoPlaceholderText = "\u6682\u65f6\u65e0\u6cd5\u5728\u98de\u4e66\u6587\u6863\u5916\u5c55\u793a\u6b64\u5185\u5bb9";
  const videoPlaceholderPattern = new RegExp(`^(?:${videoPlaceholderSource}|${legacyVideoPlaceholderText})$`);
  const mediaPlaceholderPattern = new RegExp(`${imagePlaceholderSource}|${videoPlaceholderSource}|${legacyVideoPlaceholderText}`, "g");
  const cleanText = (text: string) => text.replace(mediaPlaceholderPattern, "").trim();
  const currentLanguageItems = getPreviewPageSectionItems(cms, language, "event", "detailPages");
  const fallbackLanguageItems = getPreviewPageSectionItems(cms, language === "zh" ? "en" : "zh", "event", "detailPages");
  const currentListItems = getPreviewPageSectionItems(cms, language, "event", "list");
  const fallbackListItems = getPreviewPageSectionItems(cms, language === "zh" ? "en" : "zh", "event", "list");
  const findItemBySlug = (item: EventPageItem) => getPreviewPageItemField(item, "slug", item.id) === slug;
  const currentDetailItem = currentLanguageItems.find(findItemBySlug);
  const fallbackDetailItem = fallbackLanguageItems.find(findItemBySlug);
  const currentListItem = currentListItems.find(findItemBySlug);
  const fallbackListItem = fallbackListItems.find(findItemBySlug);
  const currentPageItem = currentDetailItem ?? currentListItem;
  const fallbackPageItem = fallbackDetailItem ?? fallbackListItem;
  const localizedOverride = language === "zh" ? cms?.events.overrides[slug]?.zh : cms?.events.overrides[slug]?.en;
  const cmsSortDate = firstFilledValue(
    getPreviewPageItemField(currentDetailItem, "sortDate", ""),
    getPreviewPageItemField(currentListItem, "sortDate", ""),
    getPreviewPageItemField(fallbackDetailItem, "sortDate", ""),
    getPreviewPageItemField(fallbackListItem, "sortDate", ""),
    getPreviewPageItemField(currentPageItem, "date", ""),
    cms?.events.overrides[slug]?.sortDate,
    event.date,
  );
  const detailDisplayDate = normalizeEventDisplayDate(firstFilledValue(
    getPreviewPageItemField(currentDetailItem, "displayDate", ""),
    getPreviewPageItemField(currentListItem, "displayDate", ""),
    getPreviewPageItemField(fallbackDetailItem, "displayDate", ""),
    getPreviewPageItemField(fallbackListItem, "displayDate", ""),
    localizedOverride?.displayDate,
    cmsSortDate ? formatEventDate(cmsSortDate, language) : formatEventDate(event.date, language),
  ), language);
  const localizedCategory = getPreviewPageItemField(currentPageItem, "category", staticEvent ? event.localizedCategory : "");
  const localizedTitle = getPreviewPageItemField(currentPageItem, "title", staticEvent ? event.localizedTitle : slug);
  const localizedSummary = getPreviewPageItemField(currentPageItem, "summary", staticEvent ? event.localizedSummary : "");
  const localizedContentValue = getPreviewPageItemField(currentPageItem, "content", "");
  const localizedContent = localizedContentValue.trim()
    ? localizedContentValue
        .split(/\n\s*\n/)
        .map((item) => item.trim())
        .filter(Boolean)
    : staticEvent
      ? event.localizedContent
      : [];
  const fullTitle = [localizedCategory, localizedTitle].filter(Boolean).join(" | ");
  const summary = cleanText(localizedSummary);
  const normalizeDetailText = (text: string) => cleanText(text).replace(/\s+/g, " ");
  const summaryForCompare = normalizeDetailText(localizedSummary);
  const detailImageFieldPattern = /^detailImage(\d+)$/;
  const detailImageWidthFieldPattern = /^detailImageWidth(\d+)$/;
  const detailVideoFieldPattern = /^detailVideo(\d+)$/;
  const customEventOverride = staticEvent ? undefined : cms?.events.overrides[slug];
  const customDetailImages = Array.isArray(customEventOverride?.detailImages)
    ? customEventOverride.detailImages.map((item) => item.trim()).filter(Boolean)
    : undefined;
  const customDetailImageWidths = Array.isArray(customEventOverride?.detailImageWidths)
    ? customEventOverride.detailImageWidths.map((item) => item.trim())
    : undefined;
  const customDetailVideos = Array.isArray(customEventOverride?.detailVideos)
    ? customEventOverride.detailVideos.map((item) => item.trim()).filter(Boolean)
    : undefined;
  const detailImages =
    customDetailImages ??
    pickCmsDetailMedia(currentDetailItem, fallbackDetailItem, "detailImages", detailImageFieldPattern, staticEvent ? event.detailImages ?? [] : [], true);
  const detailImageWidths =
    customDetailImageWidths ??
    pickCmsDetailMedia(currentDetailItem, fallbackDetailItem, "detailImageWidths", detailImageWidthFieldPattern, []);
  const detailVideos =
    customDetailVideos ??
    pickCmsDetailMedia(currentDetailItem, fallbackDetailItem, "detailVideos", detailVideoFieldPattern, staticEvent ? event.detailVideos ?? [] : [], true);
  let detailImageIndex = 0;
  let detailVideoIndex = 0;
  const detailBlocks = localizedContent
    .flatMap((paragraph, index) => {
      const blocks: Array<
        | { type: "image"; src: string; index: number; widthPercent: number }
        | { type: "video"; src: string; index: number }
        | { type: "text"; text: string; index: number }
      > = [];
      const matches = [...paragraph.matchAll(mediaPlaceholderPattern)];

      if (matches.length === 0) {
        const text = cleanText(paragraph);
        if (!text || normalizeDetailText(text) === summaryForCompare) return blocks;

        blocks.push({ type: "text", text, index });
        return blocks;
      }

      let cursor = 0;
      matches.forEach((match, matchIndex) => {
        const text = paragraph.slice(cursor, match.index).trim();
        const cleanedText = cleanText(text);
        if (cleanedText && normalizeDetailText(cleanedText) !== summaryForCompare) {
          blocks.push({ type: "text", text: cleanedText, index });
        }

        const placeholder = match[0];
        if (videoPlaceholderPattern.test(placeholder)) {
          const src = detailVideos[detailVideoIndex];
          detailVideoIndex += 1;
          if (src) blocks.push({ type: "video", src, index: index * 100 + matchIndex });
        } else {
          const src = detailImages[detailImageIndex];
          const widthPercent = normalizeMediaWidthPercent(detailImageWidths[detailImageIndex]);
          detailImageIndex += 1;
          if (src) blocks.push({ type: "image", src, widthPercent, index: index * 100 + matchIndex });
        }

        cursor = (match.index ?? 0) + match[0].length;
      });

      const trailingText = paragraph.slice(cursor).trim();
      const cleanedTrailingText = cleanText(trailingText);
      if (cleanedTrailingText && normalizeDetailText(cleanedTrailingText) !== summaryForCompare) {
        blocks.push({ type: "text", text: cleanedTrailingText, index });
      }

      return blocks;
    })
    .filter(
      (block): block is
        | { type: "image"; src: string; index: number; widthPercent: number }
        | { type: "video"; src: string; index: number }
        | { type: "text"; text: string; index: number } => Boolean(block),
    );
  const renderedBlocks = [
    ...detailBlocks,
    ...detailImages.slice(detailImageIndex).filter(Boolean).map((src, index) => ({
      type: "image" as const,
      src,
      widthPercent: normalizeMediaWidthPercent(detailImageWidths[detailImageIndex + index]),
      index: 100000 + index,
    })),
    ...detailVideos.slice(detailVideoIndex).filter(Boolean).map((src, index) => ({
      type: "video" as const,
      src,
      index: 200000 + index,
    })),
  ];

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
            {detailDisplayDate}
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
            {renderedBlocks.map((block, blockIndex) =>
              block.type === "image" ? (
                <div
                  key={`${event.slug}-image-${block.index}-${blockIndex}-${block.src}`}
                  className="mx-auto mt-10 max-w-full overflow-hidden bg-[#272727]"
                  style={{ width: `${block.widthPercent}%` }}
                >
                  <ImageWithFallback key={block.src} src={block.src} alt={fullTitle} loading="lazy" className="h-auto w-full object-contain" />
                </div>
              ) : block.type === "video" ? (
                <div key={`${event.slug}-video-${block.index}-${blockIndex}-${block.src}`} className="mx-auto mt-10 w-full overflow-hidden bg-[#272727] md:w-[70%]">
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
