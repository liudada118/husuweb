"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useLanguage } from "../../contexts/LanguageContext";
import { usePublicCmsData } from "../../contexts/PublicCmsDataContext";
import {
  getPageContentField,
  getPageContentItemField,
  getPageContentSectionItems,
  pageContentItemFieldKey,
} from "@/lib/cms-page-content";
import { LandingRevealGroup } from "./LandingRevealGroup";
import { landingCasesData } from "./landingCasesData";
import {
  landingCarouselShellClassName,
  landingDesktopFluidTypeStyle,
} from "./shared";
import { renderNormalAmpersands, renderTitleAmpersands } from "../renderNormalAmpersands";

const englishMonthShortMap: Record<string, string> = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sep",
  October: "Oct",
  November: "Nov",
  December: "Dec",
};

function revealStyle(durationMs = 700, y = 24): CSSProperties {
  return {
    opacity: 0,
    transform: `translateY(${y}px)`,
    transition: `opacity ${durationMs / 1000}s ease, transform ${durationMs / 1000}s ease`,
  };
}

function formatCaseDisplayDate(date: string, isZh: boolean) {
  if (isZh) {
    return date;
  }

  const match = date.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
  if (!match) {
    return date;
  }

  const [, day, month, year] = match;
  return `${day} ${englishMonthShortMap[month] ?? month.slice(0, 3)} ${year}`;
}

function interpolateFontSize(value: number, minValue: number, maxValue: number, minSize: number, maxSize: number) {
  if (value <= minValue) {
    return maxSize;
  }

  if (value >= maxValue) {
    return minSize;
  }

  const progress = (value - minValue) / (maxValue - minValue);
  return maxSize + (minSize - maxSize) * progress;
}

function pxToRem(value: number) {
  return `${(value / 16).toFixed(3)}rem`;
}

function getDialogTitleFontSize(title: string, isZh: boolean) {
  const compactLength = title.replace(/\s+/g, "").length;

  const maxPx = isZh
    ? interpolateFontSize(compactLength, 18, 44, 29, 48)
    : interpolateFontSize(compactLength, 55, 140, 30, 48);
  const minPx = isZh
    ? interpolateFontSize(compactLength, 18, 44, 22, 30)
    : interpolateFontSize(compactLength, 55, 140, 21, 30);
  const fluidBasePx = isZh
    ? Math.max(minPx - 3, 18)
    : Math.max(minPx - 4, 17);
  const fluidVw = isZh ? 1.55 : 1.35;

  return `clamp(${pxToRem(minPx)}, calc(${pxToRem(fluidBasePx)} + ${fluidVw}vw), ${pxToRem(maxPx)})`;
}

function DetailBlock({
  title,
  content,
  headingClassName,
  bodyClassName,
}: {
  title: string;
  content: string;
  headingClassName: string;
  bodyClassName: string;
}) {
  return (
    <section className="rounded-[22px] border border-[#232722] bg-[#10130f] p-5 md:p-6">
      <h3 className={`${headingClassName} text-[0.95rem] font-semibold leading-[1.4] text-[#d9b27a]`}>
        {renderTitleAmpersands(title)}
      </h3>
      <p className={`${bodyClassName} mt-4 text-[clamp(1rem,1.1vw,1.08rem)] leading-[1.8] text-[#d7d9d4]`}>
        {renderNormalAmpersands(content)}
      </p>
    </section>
  );
}

function KeywordBlock({
  title,
  items,
  headingClassName,
  bodyClassName,
  stackItems = false,
}: {
  title: string;
  items: string[];
  headingClassName: string;
  bodyClassName: string;
  stackItems?: boolean;
}) {
  return (
    <section className="rounded-[22px] border border-[#232722] bg-[#10130f] p-5 md:p-6">
      <h3 className={`${headingClassName} text-[0.95rem] font-semibold leading-[1.4] text-[#d9b27a]`}>
        {renderTitleAmpersands(title)}
      </h3>
      <div className={`mt-4 flex gap-2.5 ${stackItems ? "flex-col items-start" : "flex-wrap"}`}>
        {items.map((item) => (
          <span
            key={item}
            className={`rounded-full border border-[#2c312b] bg-black/35 px-3 py-1.5 text-center whitespace-pre-line ${bodyClassName} text-[0.92rem] text-[#c3c7c1] ${stackItems ? "inline-flex items-center justify-center" : ""}`}
          >
            {renderNormalAmpersands(item)}
          </span>
              ))}
      </div>
    </section>
  );
}

function expandKeywords(items: string[]) {
  return items.flatMap((item) => item.split("\n").map((part) => part.trim()).filter(Boolean));
}

function splitKeywordValue(value: string, fallback: string[]) {
  const keywords = value
    .split(/\n+/)
    .map((item) => item.trim())
    .filter(Boolean);

  return keywords.length > 0 ? keywords : fallback;
}

type LandingCasesSectionProps = {
  sectionCmsField?: string;
  subtitle?: string;
  subtitleCmsField?: string;
  title?: string;
  titleCmsField?: string;
};

export function LandingCasesSection({
  sectionCmsField,
  subtitle,
  subtitleCmsField,
  title,
  titleCmsField,
}: LandingCasesSectionProps = {}) {
  const { language } = useLanguage();
  const { pageContent } = usePublicCmsData();
  const isZh = language === "zh";
  const casesTitle = isZh ? "代表性案例" : "Representative Cases";
  const casesSubtitle = isZh
    ? "专注高价值复杂商事争议与国际仲裁"
    : "Focused on high-value, complex commercial disputes and international arbitration";
  const resolvedCasesTitle = title ?? casesTitle;
  const resolvedCasesSubtitle = subtitle ?? casesSubtitle;
  const cmsCaseItems = getPageContentSectionItems(pageContent, language, "home", "cases");
  const editableCasesData = (cmsCaseItems.length > 0 ? cmsCaseItems : landingCasesData).map((cmsItem, index) => {
    const fallback = landingCasesData[index] ?? landingCasesData[0];
    const isCmsItem = "fields" in cmsItem;
    const itemId = isCmsItem ? cmsItem.id : fallback.id;
    const fieldPrefix = `case${index + 1}`;
    const cmsFieldKey = (fieldId: string, legacyFieldId: string) =>
      isCmsItem ? pageContentItemFieldKey("cases", itemId, fieldId) : `cases__${legacyFieldId}`;
    const category = isCmsItem
      ? getPageContentItemField(cmsItem, "category", fallback.category[language])
      : fallback.category[language];
    const date = isCmsItem ? getPageContentItemField(cmsItem, "date", fallback.date[language]) : fallback.date[language];
    const description = isCmsItem
      ? getPageContentItemField(cmsItem, "description", fallback.description[language])
      : fallback.description[language];
    const keywordsValue = isCmsItem
      ? getPageContentItemField(cmsItem, "keywords", fallback.keywords[language].join("\n"))
      : fallback.keywords[language].join("\n");
    const name = isCmsItem ? getPageContentItemField(cmsItem, "title", fallback.name[language]) : fallback.name[language];

    return {
      ...fallback,
      id: itemId,
      category: {
        ...fallback.category,
        [language]: category,
      },
      cmsFields: {
        category: cmsFieldKey("category", `${fieldPrefix}Category`),
        date: cmsFieldKey("date", `${fieldPrefix}Date`),
        description: cmsFieldKey("description", `${fieldPrefix}Description`),
        keywords: cmsFieldKey("keywords", `${fieldPrefix}Keywords`),
        title: cmsFieldKey("title", `${fieldPrefix}Title`),
      },
      date: {
        ...fallback.date,
        [language]: date,
      },
      description: {
        ...fallback.description,
        [language]: description,
      },
      keywords: {
        ...fallback.keywords,
        [language]: splitKeywordValue(keywordsValue, fallback.keywords[language]),
      },
      name: {
        ...fallback.name,
        [language]: name,
      },
    };
  });
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [selectedSnap, setSelectedSnap] = useState(0);
  const [scrollSnapCount, setScrollSnapCount] = useState(0);

  const selectedCase = useMemo(
    () => editableCasesData.find((item) => item.id === selectedCaseId) ?? null,
    [editableCasesData, selectedCaseId],
  );
  const selectedCaseKeywords = selectedCase ? expandKeywords(selectedCase.keywords[language]) : [];
  const selectedCaseStackKeywords =
    selectedCaseKeywords.length > 1 &&
    selectedCase?.keywords[language].some((item) => item.includes("\n"));
  const selectedCaseTitleFontSize = selectedCase
    ? getDialogTitleFontSize(selectedCase.name[language], isZh)
    : "clamp(1.8rem, 1.28rem + 2.2vw, 3rem)";

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    const updateCarouselState = () => {
      setSelectedSnap(carouselApi.selectedScrollSnap());
      setScrollSnapCount(carouselApi.scrollSnapList().length);
    };

    updateCarouselState();
    carouselApi.on("select", updateCarouselState);
    carouselApi.on("reInit", updateCarouselState);

    return () => {
      carouselApi.off("select", updateCarouselState);
      carouselApi.off("reInit", updateCarouselState);
    };
  }, [carouselApi]);

  const headingFontClass = `font-['Akshar']${isZh ? "" : " "}`;
  const bodyFontClass = "font-['Abel']";
  const sectionTitleFluidStyle = landingDesktopFluidTypeStyle(35.28, 48);
  const sectionSubtitleFluidStyle = landingDesktopFluidTypeStyle(15.552, 17.28);
  const copy = {
    title: isZh ? "代表性案例" : "Representative Cases",
    subtitle: isZh
      ? "专注高价值复杂商事争议与国际仲裁"
      : "High-value, complex disputes before leading courts and arbitral institutions in China.",
    viewCase: isZh ? "查看案例" : "View Case",
    descriptionLabel: isZh ? "案例介绍" : "Case Description",
    keywordsLabel: isZh ? "关键词" : "Keywords",
  };

  return (
    <section className="relative overflow-hidden py-20 md:py-28" data-cms-field={sectionCmsField}>
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[240px] w-[min(680px,92vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(205,142,25,0.07)] blur-[120px]" />

      <LandingRevealGroup className={`${landingCarouselShellClassName} relative`} threshold={0.1}>
        <div className="mb-14 text-center">
          <div data-animate style={revealStyle(600, 20)}>
            <h2
              className={`landing-desktop-fluid-text mx-auto max-w-[18ch] ${headingFontClass} text-[clamp(1.55rem,2.45vw,3rem)] font-bold tracking-[-0.03em] text-[#d9b27a] [text-wrap:balance]`}
              style={sectionTitleFluidStyle}
              data-cms-field={titleCmsField}
            >
              {renderTitleAmpersands(resolvedCasesTitle)}
            </h2>
          </div>
          <div data-animate style={revealStyle(600, 20)}>
            <p
              className={`landing-desktop-fluid-text mx-auto mt-4 max-w-[42rem] ${bodyFontClass} text-[clamp(0.84rem,1.08vw,1.08rem)] text-[#a5a8a3] [text-wrap:pretty]`}
              style={sectionSubtitleFluidStyle}
              data-cms-field={subtitleCmsField}
            >
              {renderNormalAmpersands(resolvedCasesSubtitle)}
            </p>
          </div>
        </div>

        <div className="relative px-12 lg:px-16" data-animate style={revealStyle(700, 24)}>
          <Carousel
            opts={{ align: "start", containScroll: "trimSnaps", loop: true }}
            setApi={setCarouselApi}
            className="w-full"
          >
            <CarouselContent className="items-stretch pb-10 lg:pb-12">
              {editableCasesData.map((item) => {
                const cardKeywords = expandKeywords(item.keywords[language]);
                const stackCardKeywords =
                  cardKeywords.length > 1 && item.keywords[language].some((tag) => tag.includes("\n"));

                return (
                  <CarouselItem
                    key={item.id}
                    className="flex basis-full sm:basis-[78%] lg:basis-1/2 xl:basis-1/3"
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedCaseId(item.id)}
                      className="landing-bottom-edge-glow-card group relative flex h-full w-full flex-col overflow-visible rounded-[20px] border border-[#3a342b] bg-[#121410] p-7 text-left shadow-[0_18px_42px_rgba(0,0,0,0.3),0_0_34px_rgba(217,178,122,0.1)] transition-all duration-300 hover:border-[#d9b27a]/55 hover:shadow-[0_20px_50px_rgba(0,0,0,0.34),0_0_42px_rgba(217,178,122,0.15)] focus:outline-none focus:ring-2 focus:ring-[#d9b27a]/50"
                      data-cms-field={item.cmsFields.title}
                    >
                      <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
                        <div className="rounded-[0.375rem] border border-[#2b2f28] bg-[#22241f] px-3 py-1">
                          <span
                            className={`${isZh ? bodyFontClass : "font-['Akshar'] "} text-[0.625rem] font-semibold tracking-[0.04em] text-[#d4d4d4]`}
                            data-cms-field={item.cmsFields.category}
                          >
                            {renderNormalAmpersands(item.category[language])}
                          </span>
                        </div>
                        <span
                          className={`${bodyFontClass} text-[0.8rem] tracking-tight text-[#8a8a8a]`}
                          data-cms-field={item.cmsFields.date}
                        >
                          {formatCaseDisplayDate(item.date[language], isZh)}
                        </span>
                      </div>

                      <h3
                        className={`line-clamp-3 ${headingFontClass} text-[clamp(0.972rem,1.332vw,1.26rem)] font-bold leading-[1.2] text-transparent`}
                        style={{
                          WebkitBackgroundClip: "text",
                          backgroundClip: "text",
                          backgroundImage:
                            "linear-gradient(133deg, rgb(255,255,255) 8%, rgb(217,178,122) 110%)",
                        }}
                        data-cms-field={item.cmsFields.title}
                      >
                        {renderTitleAmpersands(item.name[language])}
                      </h3>

                      <p
                        className={`mt-5 line-clamp-3 ${bodyFontClass} text-[0.9rem] leading-[1.7] text-[#c7c7c7]`}
                        data-cms-field={item.cmsFields.description}
                      >
                        {renderNormalAmpersands(item.description[language])}
                      </p>

                      <div
                        className={`mt-6 flex min-h-[4.5rem] gap-2 ${stackCardKeywords ? "flex-col items-start" : "flex-wrap content-start"}`}
                        data-cms-field={item.cmsFields.keywords}
                      >
                        {cardKeywords.map((tag) => (
                          <span
                            key={tag}
                            className={`rounded-full border border-[#262626] bg-black/45 px-3 py-1 text-center whitespace-pre-line ${bodyFontClass} text-[0.6875rem] text-[#a1a1a1] ${stackCardKeywords ? "inline-flex items-center justify-center" : ""}`}
                          >
                            {renderNormalAmpersands(tag)}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto border-t border-[#262626]/60 pt-5">
                        <span className={`inline-flex items-center gap-2 ${isZh ? bodyFontClass : "font-['Akshar'] "} text-[0.83rem] font-semibold tracking-[0.04em] text-white transition-colors duration-300 group-hover:text-[#d9b27a]`}>
                          {copy.viewCase}
                          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </button>
                  </CarouselItem>
                );
              })}
            </CarouselContent>

            <CarouselPrevious className="-left-14 top-1/2 hidden h-11 w-11 -translate-y-1/2 border-[#343834] bg-[#121410] text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-all duration-300 hover:border-[#d9b27a] hover:bg-[#181b16] hover:text-[#d9b27a] disabled:opacity-30 lg:flex" />
            <CarouselNext className="-right-14 top-1/2 hidden h-11 w-11 -translate-y-1/2 border-[#343834] bg-[#121410] text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-all duration-300 hover:border-[#d9b27a] hover:bg-[#181b16] hover:text-[#d9b27a] disabled:opacity-30 lg:flex" />
          </Carousel>

          {scrollSnapCount > 1 ? (
            <div className="mt-8 flex items-center justify-center gap-3">
              {Array.from({ length: scrollSnapCount }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => carouselApi?.scrollTo(index)}
                  aria-label={`Go to case slide ${index + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    index === selectedSnap
                      ? "h-2.5 w-7 bg-[#d9b27a]"
                      : "h-2.5 w-2.5 bg-[#4b4f48] hover:bg-[#8e7752]"
                  }`}
                />
              ))}
            </div>
          ) : null}
        </div>
      </LandingRevealGroup>

      <Dialog open={selectedCase !== null} onOpenChange={(open) => !open && setSelectedCaseId(null)}>
        {selectedCase ? (
          <DialogContent className="max-h-[92vh] max-w-[calc(100%-1.5rem)] gap-0 overflow-hidden rounded-[28px] border-[#2a2f29] bg-[#0c0f0c] p-0 text-white shadow-[0_25px_80px_rgba(0,0,0,0.55)] sm:max-w-[min(1120px,calc(100%-3rem))]">
            <div className="max-h-[92vh] overflow-y-auto px-6 py-14 sm:px-8 lg:px-12">
              <DialogHeader className="mb-10 gap-4 text-left">
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`rounded-[999px] border border-[#333932] bg-[#171b16] px-4 py-1.5 ${isZh ? bodyFontClass : "font-['Akshar'] "} text-[0.78rem] font-semibold tracking-[0.08em] text-[#d9b27a]`}>
                    {renderNormalAmpersands(selectedCase.category[language])}
                  </span>
                  <span className={`${bodyFontClass} text-[0.96rem] text-[#9ca19b]`}>
                    {formatCaseDisplayDate(selectedCase.date[language], isZh)}
                  </span>
                </div>

                <DialogTitle
                  className={`${headingFontClass} max-w-full font-bold leading-[1.08] tracking-[-0.03em] text-white [text-wrap:balance] [overflow-wrap:anywhere]`}
                  style={{ fontSize: selectedCaseTitleFontSize }}
                >
                  {renderTitleAmpersands(selectedCase.name[language])}
                </DialogTitle>
              </DialogHeader>

              <div className="grid gap-6 border-t border-[#232722] pt-8">
                <DetailBlock
                  title={copy.descriptionLabel}
                  content={selectedCase.description[language]}
                  headingClassName={isZh ? bodyFontClass : "font-['Akshar'] "}
                  bodyClassName={bodyFontClass}
                />
                <KeywordBlock
                  title={copy.keywordsLabel}
                  items={selectedCaseKeywords}
                  headingClassName={isZh ? bodyFontClass : "font-['Akshar'] "}
                  bodyClassName={bodyFontClass}
                  stackItems={selectedCaseStackKeywords}
                />
              </div>
            </div>
          </DialogContent>
        ) : null}
      </Dialog>
    </section>
  );
}
