"use client";

import Link from "next/link";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { PageTriangle } from "@/components/shared/PageTriangle";
import { getPreviewPageField, getPreviewPageItemField, getPreviewPageSectionItems } from "@/cms/preview-page-content";
import { usePublicCms } from "@/cms/PublicCmsProvider";
import { pick, useLanguage } from "@/i18n/LanguageProvider";
import { copy } from "@/i18n/copy";
import { rememberReturnPosition, useRestoreReturnPosition } from "@/lib/returnPosition";

const cards = [
  { label: { en: "Private Equity", zh: "\u79c1\u52df\u80a1\u6743" }, slug: "private-equity", image: "/assets/industries/in1.webp" },
  { label: { en: "International\nTrade", zh: "\u56fd\u9645\u8d38\u6613\u884c\u4e1a" }, slug: "international-trade", image: "/assets/industries/in2.webp" },
  { label: { en: "Finance", zh: "\u91d1\u878d" }, slug: "finance", image: "/assets/industries/in3.webp" },
  { label: { en: "Real Estate", zh: "\u623f\u5730\u4ea7\u884c\u4e1a" }, slug: "real-estate", image: "/assets/industries/in4.webp" },
  { label: { en: "Sports and\nE-Sports", zh: "\u4f53\u80b2\u53ca\u7535\u5b50\u7ade\u6280\u884c\u4e1a" }, slug: "sports-and-e-sports", image: "/assets/industries/in5.webp" },
  { label: { en: "Cyber Tech and\nGame", zh: "\u4e92\u8054\u7f51\u79d1\u6280\u53ca\u6e38\u620f\u884c\u4e1a" }, slug: "cyber-tech-and-game", image: "/assets/home/INDUSTRIES6.png" },
];

function IndustryCard({
  label,
  href,
  image,
  className,
}: {
  label: string;
  href: string;
  image: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      onClick={rememberReturnPosition}
      className={`group relative flex min-h-52 min-w-0 items-end justify-start overflow-hidden rounded bg-[#d9d9d9] p-[clamp(1.5rem,3vw,3.5rem)] ${className ?? ""}`}
    >
      <ImageWithFallback
        src={image}
        alt=""
        decoding="sync"
        className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/35 transition-colors duration-500 group-hover:bg-black/20" />
      <div className="relative w-full">
        <h2 className="whitespace-pre-line text-left text-[clamp(2rem,3vw,3rem)] font-semibold leading-[1.1] tracking-[0.02em] text-white">
          {label}
        </h2>
        <span className="mt-4 block h-0.5 w-full bg-[#d9b27a]" />
      </div>
    </Link>
  );
}

export function IndustriesPage() {
  const { language } = useLanguage();
  const cms = usePublicCms();
  useRestoreReturnPosition();
  const pageCardItems = getPreviewPageSectionItems(cms, language, "media", "cards");
  const fallbackCards = cards.map((card) => ({
    id: card.slug,
    label: pick(language, card.label),
    slug: card.slug,
    image: card.image,
    href: `/industries/${card.slug}?from=industries`,
  }));
  const fallbackById = new Map(fallbackCards.map((card) => [card.id, card]));
  const localizedCards = pageCardItems.length
    ? pageCardItems.map((item) => {
        const slug = getPreviewPageItemField(item, "slug", item.id);
        const fallback = fallbackById.get(slug);

        return {
          id: slug,
          label: getPreviewPageItemField(item, "title", fallback?.label ?? item.label),
          slug,
          image: getPreviewPageItemField(item, "image", fallback?.image ?? ""),
          href: getPreviewPageItemField(item, "href", fallback?.href ?? `/industries/${slug}?from=industries`),
        };
      })
    : fallbackCards;
  const heroTitle = getPreviewPageField(cms, language, "media", "hero", "title", pick(language, copy.industriesPage.title));
  const heroBody = getPreviewPageField(cms, language, "media", "hero", "body", pick(language, copy.industriesPage.intro));
  const heroImage = getPreviewPageField(cms, language, "media", "hero", "image", "/assets/industries/hero.png");

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#171717] text-white">
      <PageTriangle
        className="right-0 top-[calc(56vw+5rem)] h-[calc(100%-56vw-5rem)] min-h-[80rem] w-full opacity-50"
      />
      <section className="relative min-h-[clamp(28rem,56vw,67.5rem)] w-full">
        <ImageWithFallback
          src={heroImage}
          alt=""
          loading="eager"
          fetchPriority="high"
          className="absolute left-1/2 top-0 block h-full w-screen min-w-full max-w-none -translate-x-1/2 object-cover md:left-0 md:w-full md:translate-x-0"
        />
        <div className="absolute inset-0 bg-[rgba(68,67,67,0.55)] mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#141414]/90" />
        <SiteHeader active="INDUSTRIES" />
        <div className="relative z-10 flex min-h-[clamp(28rem,56vw,67.5rem)] flex-col items-start justify-start gap-[clamp(1.5rem,3.5vw,4rem)] px-[var(--shell-md)] pt-[36.875rem]">
          <h1 className="text-left text-[3.4rem] font-medium leading-none text-white drop-shadow-lg md:text-[clamp(4rem,5vw,6rem)]">
            {heroTitle}
          </h1>
          <div className="relative w-full rounded-lg px-[clamp(2rem,4vw,4.5rem)] py-[clamp(2rem,4.5vw,5.375rem)] text-white">
            <div
              className="absolute inset-0 z-0 rounded-lg"
              style={{ background: "linear-gradient(135deg, #464646 0%, #787269 100%)" }}
            />
            <span
              aria-hidden
              className="absolute left-[1.75rem] top-[1.75rem] z-10 h-[3rem] w-[3rem] border-l-2 border-t-2 border-[#d9b27a]"
            />
            <span
              aria-hidden
              className="absolute bottom-[1.75rem] right-[1.75rem] z-10 h-[3rem] w-[3rem] border-b-2 border-r-2 border-[#d9b27a]"
            />
            <p className="relative z-10 mx-auto max-w-[73rem] text-justify text-[clamp(1.25rem,1.45vw,1.75rem)] font-normal leading-relaxed tracking-[0.02em]">
              {heroBody}
            </p>
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="mx-5 mt-16 flex flex-col gap-[clamp(0.75rem,1.4vw,1.375rem)] lg:mx-[9rem]">
          <IndustryCard {...localizedCards[0]} className="h-[clamp(10rem,16vw,18rem)]" />
          <div className="grid grid-cols-1 gap-[clamp(0.75rem,1.4vw,1.375rem)] lg:grid-cols-[2fr_3fr]">
            <IndustryCard {...localizedCards[1]} className="h-[clamp(25rem,40vw,45rem)]" />
            <div className="grid gap-[clamp(0.75rem,1.4vw,1.375rem)] lg:grid-rows-2">
              {localizedCards.slice(2, 4).map((card) => (
                <IndustryCard key={card.id} {...card} className="h-[clamp(12rem,19.3vw,21.8125rem)]" />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-[clamp(0.75rem,1.4vw,1.375rem)] lg:grid-cols-2">
            {localizedCards.slice(4).map((card) => (
              <IndustryCard key={card.id} {...card} className="h-[clamp(15rem,24vw,27rem)]" />
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
