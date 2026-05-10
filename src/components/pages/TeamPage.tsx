"use client";

import Link from "next/link";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { PageTriangle } from "@/components/shared/PageTriangle";
import { teamProfiles } from "@/data/teamProfiles";
import { pick, useLanguage } from "@/i18n/LanguageProvider";
import { copy } from "@/i18n/copy";

const teamAssets = {
  hero: "/assets/team/hero.png",
};

function TeamCard({
  name,
  zhName,
  title,
  zhTitle,
  image,
  slug,
}: {
  name: string;
  zhName: string;
  title: string;
  zhTitle: string;
  image: string;
  slug: string;
}) {
  const { language } = useLanguage();
  const displayName = language === "zh" ? zhName : name;
  const displayTitle = language === "zh" ? zhTitle : title;

  return (
    <article className="group flex min-w-0 flex-col">
      <div className="relative aspect-[745/392] w-full overflow-hidden bg-[#9b9b9b]">
        <ImageWithFallback
          src={image}
          alt={displayName}
          decoding="sync"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-105"
        />
      </div>
      <div className="mt-7 border-t border-[#a1a1a1] pt-7">
        <h3 className="text-[3.4375rem] font-medium uppercase leading-[1.1] tracking-[-0.08em] text-white">
          {displayName}
        </h3>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <p className="text-[2.25rem] font-extralight uppercase leading-[1.3] text-[#979797]">
            {displayTitle}
          </p>
          <Link href={`/team/${slug}`} className="group/link inline-flex shrink-0 flex-col items-end text-[#d9b27a]">
            <span className="text-[1.75rem] font-medium uppercase leading-[1.3]">
              {pick(language, copy.common.findOutMore)}
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

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#171717] text-white">
      <PageTriangle
        className="right-0 top-[calc(100svh+7rem)] h-[calc(100%-100svh-7rem)] w-full opacity-20"
      />
      <section className="relative h-[min(67.5rem,100svh)] min-h-[40rem] w-full overflow-hidden">
        <ImageWithFallback
          src={teamAssets.hero}
          alt=""
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(68,67,67,0.5)] mix-blend-screen" />
        <div className="absolute inset-0 bg-[linear-gradient(180.182deg,rgba(56,56,56,0)_30.211%,rgb(23,23,23)_93.072%)]" />
        <SiteHeader active="OUR TEAM" />

        <div className="site-shell relative z-10 flex h-full flex-col justify-end pb-[clamp(5rem,11vw,12rem)] pt-[var(--header-height)]">
          <div className="text-[5.625rem] font-light uppercase leading-none text-[#dea552]">
            #
          </div>
          <h1 className="mt-5 text-[7.5rem] font-semibold uppercase leading-none text-white">
            {pick(language, copy.team.title)}
          </h1>
          <p className="mt-10 max-w-[55rem] text-[1.75rem] font-normal leading-[1.3] tracking-[0.05em] text-white">
            {pick(language, copy.team.subtitle)}
          </p>
        </div>
      </section>

      <section className="relative z-10 w-full">
        <div className="site-shell pb-20 pt-16">
          <div className="flex flex-col items-start justify-between gap-8 border-b border-white/45 pb-10 xl:flex-row xl:items-end">
            <h2 className="text-left text-[6rem] font-semibold italic uppercase leading-[0.92] tracking-[-0.04em] text-white">
              {pick(language, copy.team.sloganTitle).map((line, index, lines) => (
                <span key={line}>
                  {line}
                  {index < lines.length - 1 ? <br /> : null}
                </span>
              ))}
            </h2>
            <p className="max-w-[20rem] shrink-0 self-end text-right text-[1.75rem] font-medium uppercase leading-[1.3] text-white">
              {pick(language, copy.team.slogan).map((line, index, lines) => (
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
            {pick(language, copy.team.partner)}
          </h2>
          {teamProfiles.slice(0, 4).map((person, index) => (
            <TeamCard key={`${person.name}-${index}`} {...person} />
          ))}
          <h2 className="mb-[-2.5rem] mt-8 text-[4rem] font-normal italic uppercase leading-[1.1] tracking-[-0.04em] text-white lg:col-span-2">
            {pick(language, copy.team.seniorAssociate)}
          </h2>
          {teamProfiles.slice(4).map((person, index) => (
            <TeamCard key={`${person.name}-${index + 4}`} {...person} />
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
