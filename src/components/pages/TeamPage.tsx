"use client";

import Link from "next/link";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { PageTriangle } from "@/components/shared/PageTriangle";
import { getPreviewPageField, getPreviewPageItemField, getPreviewPageSectionItems } from "@/cms/preview-page-content";
import { usePublicCms } from "@/cms/PublicCmsProvider";
import { teamProfiles } from "@/data/teamProfiles";
import { pick, useLanguage } from "@/i18n/LanguageProvider";
import { copy } from "@/i18n/copy";
import type { Language } from "@/lib/site-types";
import { rememberReturnPosition, useRestoreReturnPosition } from "@/lib/returnPosition";

const teamAssets = {
  hero: "/assets/team/hero.png",
};

type TeamListCard = {
  id: string;
  name: string;
  title: string;
  image: string;
  href: string;
  ctaLabel: string;
};

function fallbackTeamCards(language: Language, group: "partner" | "seniorAssociate"): TeamListCard[] {
  const profiles = group === "partner" ? teamProfiles.slice(0, 4) : teamProfiles.slice(4);

  return profiles.map((profile) => ({
    id: profile.slug,
    name: language === "zh" ? profile.zhName : profile.name,
    title: language === "zh" ? profile.zhTitle : profile.title,
    image: profile.image,
    href: `/team/${profile.slug}`,
    ctaLabel: pick(language, copy.common.findOutMore),
  }));
}

function getTeamCards(
  cms: ReturnType<typeof usePublicCms>,
  language: Language,
  sectionId: "partners" | "seniorAssociates",
  group: "partner" | "seniorAssociate",
) {
  const fallbackCards = fallbackTeamCards(language, group);
  const fallbackById = new Map(fallbackCards.map((card) => [card.id, card]));
  const items = getPreviewPageSectionItems(cms, language, "podcast", sectionId);

  if (!items.length) return fallbackCards;

  return items.map((item) => {
    const id = getPreviewPageItemField(item, "slug", item.id);
    const fallback = fallbackById.get(id);

    return {
      id,
      name: getPreviewPageItemField(item, "name", fallback?.name ?? item.label),
      title: getPreviewPageItemField(item, "title", fallback?.title ?? ""),
      image: getPreviewPageItemField(item, "image", fallback?.image ?? ""),
      href: getPreviewPageItemField(item, "href", fallback?.href ?? `/team/${id}`),
      ctaLabel: getPreviewPageItemField(item, "ctaLabel", fallback?.ctaLabel ?? pick(language, copy.common.findOutMore)),
    };
  });
}

function TeamCard({
  name,
  title,
  image,
  href,
  ctaLabel,
}: {
  name: string;
  title: string;
  image: string;
  href: string;
  ctaLabel: string;
}) {
  return (
    <article className="group flex min-w-0 flex-col">
      <div className="relative aspect-[745/392] w-full overflow-hidden bg-[#9b9b9b]">
        {image ? (
          <ImageWithFallback
            src={image}
            alt={name}
            decoding="sync"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[#343434] px-6 text-center text-[1.125rem] font-medium uppercase tracking-[0.08em] text-[#d9b27a]">
            {name}
          </div>
        )}
      </div>
      <div className="mt-7 border-t border-[#a1a1a1] pt-7">
        <h3 className="text-[3.4375rem] font-medium uppercase leading-[1.1] tracking-[-0.08em] text-white">
          {name}
        </h3>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <p className="text-[2.25rem] font-extralight uppercase leading-[1.3] text-[#979797]">
            {title}
          </p>
          <Link href={href} onClick={rememberReturnPosition} className="group/link inline-flex shrink-0 flex-col items-end text-[#d9b27a]">
            <span className="text-[1.75rem] font-medium uppercase leading-[1.3]">
              {ctaLabel}
            </span>
            <span className="mt-2 block h-0.5 w-full bg-[#d9b27a] origin-right transition-transform duration-300 group-hover/link:scale-x-75" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function TeamPage() {
  const { language } = useLanguage();
  const cms = usePublicCms();
  useRestoreReturnPosition();
  const heroTitle = getPreviewPageField(cms, language, "podcast", "hero", "title", pick(language, copy.team.title));
  const heroBody = getPreviewPageField(cms, language, "podcast", "hero", "body", pick(language, copy.team.subtitle));
  const heroImage = getPreviewPageField(cms, language, "podcast", "hero", "image", teamAssets.hero);
  const sloganTitle = getPreviewPageField(cms, language, "podcast", "specialForces", "title", pick(language, copy.team.sloganTitle).join("\n"));
  const sloganBody = getPreviewPageField(cms, language, "podcast", "specialForces", "body", pick(language, copy.team.slogan).join("\n"));
  const partnersTitle = getPreviewPageField(cms, language, "podcast", "partners", "title", pick(language, copy.team.partner));
  const partnersBody = getPreviewPageField(cms, language, "podcast", "partners", "body", "");
  const seniorTitle = getPreviewPageField(cms, language, "podcast", "seniorAssociates", "title", pick(language, copy.team.seniorAssociate));
  const seniorBody = getPreviewPageField(cms, language, "podcast", "seniorAssociates", "body", "");
  const orderedPartners = getTeamCards(cms, language, "partners", "partner");
  const orderedSeniorAssociates = getTeamCards(cms, language, "seniorAssociates", "seniorAssociate");

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#171717] text-white">
      <PageTriangle
        className="right-0 top-[calc(67.5rem+7rem)] h-[calc(100%-67.5rem-7rem)] w-full opacity-20"
      />
      <section className="relative h-[100svh] w-full overflow-hidden md:h-[67.5rem]">
        <ImageWithFallback
          src={heroImage}
          alt=""
          loading="eager"
          fetchPriority="high"
          className="absolute left-0 top-0 block !h-auto !w-full max-w-none object-cover md:inset-0 md:!h-full"
        />
        <div className="absolute inset-0 bg-[rgba(68,67,67,0.5)] mix-blend-screen" />
        <div className="absolute inset-0 bg-[linear-gradient(180.182deg,rgba(56,56,56,0)_30.211%,rgb(23,23,23)_93.072%)]" />
        <SiteHeader active="OUR TEAM" />

        <div className="site-shell relative z-10 flex h-full flex-col justify-end pb-12 pt-[var(--header-height)] md:pb-[clamp(5rem,11vw,12rem)]">
          <div className="text-[3.25rem] font-light uppercase leading-none text-[#dea552] md:text-[5.625rem]">
            #
          </div>
          <h1 className="mt-4 text-[4rem] font-semibold uppercase leading-none text-white md:mt-5 md:text-[7.5rem]">
            {heroTitle}
          </h1>
          <p className="mt-6 max-w-[55rem] text-[1.2rem] font-normal leading-[1.3] tracking-[0.05em] text-white md:mt-10 md:text-[1.75rem]">
            {heroBody}
          </p>
        </div>
      </section>

      <section className="relative z-10 w-full">
        <div className="site-shell pb-20 pt-8 md:pt-16">
          <div className="flex flex-col items-start justify-between gap-8 border-b border-white/45 pb-10 xl:flex-row xl:items-end">
            <h2 className="text-left text-[6rem] font-semibold italic uppercase leading-[0.92] tracking-[-0.04em] text-white">
              {sloganTitle.split(/\r?\n/).filter(Boolean).map((line, index, lines) => (
                <span key={line}>
                  {line}
                  {index < lines.length - 1 ? <br /> : null}
                </span>
              ))}
            </h2>
            <p className="max-w-[20rem] shrink-0 self-end text-right text-[1.75rem] font-medium uppercase leading-[1.3] text-white">
              {sloganBody.split(/\r?\n/).filter(Boolean).map((line, index, lines) => (
                <span key={line}>
                  {line}
                  {index < lines.length - 1 ? <br /> : null}
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>

      <section className="site-shell relative z-10 pb-32">
        <div className="grid grid-cols-1 gap-x-20 gap-y-20 lg:grid-cols-2">
          <h2 className="mb-[-2.5rem] text-[4rem] font-normal italic uppercase leading-[1.1] tracking-[-0.04em] text-white lg:col-span-2">
            {partnersTitle}
          </h2>
          {partnersBody ? (
            <p className="mt-[-3rem] max-w-[52rem] text-[1.5rem] font-light leading-[1.6] text-[#d1d5dc] lg:col-span-2">
              {partnersBody}
            </p>
          ) : null}
          {orderedPartners.map((person, index) => (
            <TeamCard key={`${person.id}-${index}`} {...person} />
          ))}
          <h2 className="mb-[-2.5rem] mt-8 text-[4rem] font-normal italic uppercase leading-[1.1] tracking-[-0.04em] text-white lg:col-span-2">
            {seniorTitle}
          </h2>
          {seniorBody ? (
            <p className="mt-[-3rem] max-w-[52rem] text-[1.5rem] font-light leading-[1.6] text-[#d1d5dc] lg:col-span-2">
              {seniorBody}
            </p>
          ) : null}
          {orderedSeniorAssociates.map((person, index) => (
            <TeamCard key={`${person.id}-${index + 4}`} {...person} />
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
