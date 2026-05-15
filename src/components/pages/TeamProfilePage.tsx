"use client";

import { useState } from "react";
import { Mail, Phone } from "lucide-react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { BackToTop } from "@/components/shared/BackToTop";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { SubpageBreadcrumb } from "@/components/shared/SubpageBreadcrumb";
import type { TeamProfile } from "@/data/teamProfiles";
import { pick, useLanguage } from "@/i18n/LanguageProvider";
import { copy } from "@/i18n/copy";

function ViewMoreButton({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) {
  const { language } = useLanguage();

  return (
    <button
      type="button"
      onClick={onClick}
      className="group inline-flex flex-col items-center"
      aria-expanded={open}
    >
      <span className="text-xl font-semibold text-[#f8d097] transition-colors group-hover:text-white">
        {open ? pick(language, copy.common.collapse) : pick(language, copy.common.findOutMore)}
      </span>
      <span className="mt-1 block h-0.5 w-28 origin-center bg-[#f8d097] transition-transform duration-300 group-hover:scale-x-125" />
    </button>
  );
}

const detailLabels = {
  serviceIndustries: { en: "Service Industries", zh: "服务行业" },
  professionalQualification: { en: "Professional Qualification", zh: "专业资格" },
  languageSkills: { en: "Language Skills", zh: "工作语言" },
  educationalBackground: { en: "Educational Background", zh: "教育背景" },
  socialEngagements: { en: "Social Engagements", zh: "社会任职" },
  experienceCapabilities: { en: "Experience& capabilities", zh: "经验与能力" },
  practiceArea: { en: "Practice Area", zh: "专业领域" },
  practiceExperience: { en: "Practice Experience", zh: "执业经验" },
  honors: { en: "Honors", zh: "荣誉和认可" },
  achievements: { en: "Performance & Achievements", zh: "个人业绩" },
};

const profileHeroImages: Record<string, string> = {
  "yuxuan-liu": "/assets/team/1.png",
  "min-xu": "/assets/team/2.png",
  "li-wan": "/assets/team/3.png",
  "zoe-zhang": "/assets/team/4.png",
  "mengcheng-yun": "/assets/team/5.png",
  "weifan-qiu": "/assets/team/6.png",
};

const mobileProfileHeroImages: Record<string, string> = {
  "yuxuan-liu": "/assets/team/team1.png",
  "min-xu": "/assets/team/team2.png",
  "li-wan": "/assets/team/team3.png",
  "zoe-zhang": "/assets/team/team4.png",
  "mengcheng-yun": "/assets/team/team5.png",
  "weifan-qiu": "/assets/team/team6.png",
};

function splitEducation(education: string) {
  return education
    .split(/[;；]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function splitParagraphs(text: string) {
  return text
    .split(/\n+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function HonorItem({ item, itemKey }: { item: string; itemKey: string }) {
  const isIntro = item.endsWith(":") || item.endsWith("：");

  if (isIntro) {
    return <li key={itemKey}>{item}</li>;
  }

  return (
    <li key={itemKey} className="grid grid-cols-[0.45rem_1fr] gap-4">
      <span className="mt-[0.7em] size-1.5 rounded-full bg-white/80" />
      <span>{item}</span>
    </li>
  );
}

function AchievementCard({ item, className = "" }: { item: string; className?: string }) {
  return (
    <article className={`bg-[#3a3a3a] px-8 py-7 ${className}`}>
      <p className="grid grid-cols-[0.5rem_1fr] gap-5 text-[1.5rem] font-normal leading-[1.6] text-white/72">
        <span className="mt-[0.6em] size-2 rounded-full bg-[#d9b27a]" />
        <span>{item}</span>
      </p>
    </article>
  );
}

export function TeamProfilePage({ profile }: { profile: TeamProfile }) {
  const { language } = useLanguage();
  const [honorsOpen, setHonorsOpen] = useState(false);
  const [achievementsOpen, setAchievementsOpen] = useState(false);
  const details = language === "zh" ? profile.zh : profile;
  const displayName = language === "zh" ? profile.zhName : profile.name;
  const displayTitle = language === "zh" ? profile.zhTitle : profile.title;
  const heroImage = profileHeroImages[profile.slug] ?? profile.image;
  const mobileHeroImage = mobileProfileHeroImages[profile.slug] ?? profile.image;
  const hasHonors = details.honors.length > 0;
  const hasSocialEngagements = details.socialEngagements.trim().length > 0;
  const regularAchievementTail =
    profile.slug === "li-wan" ? details.achievements.slice(6, -3) : details.achievements.slice(6);
  const liWanAchievementTail = profile.slug === "li-wan" ? details.achievements.slice(-3) : [];

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#171717] text-white">
      <SiteHeader active="OUR TEAM" />

      <section className="relative w-full overflow-hidden bg-[#171717] pt-[var(--header-height)] md:h-[45.9375rem] md:bg-transparent">
        <ImageWithFallback
          src={heroImage}
          alt={displayName}
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0 hidden h-full w-full object-cover object-center md:block"
        />
        <div className="relative md:hidden">
          <ImageWithFallback
            src={mobileHeroImage}
            alt={displayName}
            loading="eager"
            fetchPriority="high"
            className="block h-auto w-full object-contain"
          />
        </div>
        <div className="relative z-10 flex px-[var(--shell-sm)] pb-8 pt-8 md:h-full md:items-center md:px-[var(--shell-md)] md:py-[calc(var(--header-height)+2rem)] xl:pl-[55.625rem]">
          <div className="min-w-0 max-w-[58rem] text-white">
            <h1 className="text-[3rem] font-semibold leading-none tracking-[-0.04em] md:text-[6.25rem]">
              {displayName}
            </h1>
            <p className="mt-5 text-[1.35rem] font-light capitalize leading-[1.15] md:mt-8 md:text-[2.5rem] md:leading-none">
              {displayTitle}
            </p>
            <div className="mt-8 h-px w-full max-w-[28rem] bg-white/80 md:mt-10" />
            <a
              href={`tel:${profile.phone.replace(/[^+\d]/g, "")}`}
              className="mt-8 flex w-max max-w-full items-center gap-3 text-[1.15rem] font-light text-white underline underline-offset-4 transition hover:text-[#d9b27a] md:mt-10 md:gap-4 md:text-[1.75rem]"
            >
              <Phone className="size-5 shrink-0 text-white md:size-7" strokeWidth={1.5} />
              {profile.phone}
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="mt-4 inline-flex max-w-full items-center gap-3 break-all text-[1.15rem] font-light text-white underline underline-offset-4 transition hover:text-[#d9b27a] md:mt-5 md:gap-4 md:text-[1.75rem]"
            >
              <Mail className="size-5 shrink-0 text-white md:size-7" strokeWidth={1.5} />
              {profile.email}
            </a>
          </div>
        </div>
      </section>

      <div className="bg-black px-[var(--shell-md)] py-8">
        <SubpageBreadcrumb
          parentLabel={pick(language, copy.team.title)}
          currentLabel={displayName}
          fallbackHref="/team"
        />
      </div>

      <section className="bg-[linear-gradient(180deg,#333231_0%,#433e38_100%)] px-[8rem] pb-16 pt-8">
        <div className="grid gap-x-24 gap-y-16 lg:grid-cols-3">
          <div>
            <h2 className="text-[2rem] font-semibold leading-none text-[#d9b27a]">
              {pick(language, detailLabels.serviceIndustries)}
            </h2>
            <ul className="mt-6 space-y-2 text-[1.5rem] font-light leading-[1.35] text-white/72">
              {details.serviceIndustries.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[2rem] font-semibold leading-none text-[#d9b27a]">
              {pick(language, detailLabels.professionalQualification)}
            </h2>
            <p className="mt-6 text-[1.5rem] font-light leading-[1.45] text-white/72">
              {details.qualification}
            </p>
            <h2 className="mt-12 text-[2rem] font-semibold leading-none text-[#d9b27a]">
              {pick(language, detailLabels.languageSkills)}
            </h2>
            <p className="mt-6 text-[1.5rem] font-light leading-[1.45] text-white/72">
              {details.languages.map((item) => (
                <span key={item} className="block">
                  {item}
                </span>
              ))}
            </p>
          </div>

          <div>
            <h2 className="text-[2rem] font-semibold leading-none text-[#d9b27a]">
              {pick(language, detailLabels.educationalBackground)}
            </h2>
            <div className="mt-6 space-y-4 text-[1.5rem] font-light leading-[1.45] text-white/72">
              {splitEducation(details.education).map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </div>

          {hasSocialEngagements ? (
            <div className="lg:col-span-3">
              <h2 className="text-[2rem] font-semibold leading-none text-[#d9b27a]">
                {pick(language, detailLabels.socialEngagements)}
              </h2>
              <p className="mt-6 text-[1.5rem] font-light leading-[1.55] text-white/72">
                {details.socialEngagements}
              </p>
            </div>
          ) : null}
        </div>
      </section>

      <section className="bg-[#171717] px-[8rem] py-20">
        <h2 className="text-[3rem] font-medium leading-none text-[#d9b27a]">
          {pick(language, detailLabels.experienceCapabilities)}
        </h2>
        <div
          className={`mt-12 grid gap-12 ${
            hasHonors ? "lg:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)]" : "lg:grid-cols-1"
          }`}
        >
          <div className="space-y-20">
            <div>
              <h3 className="border-l-2 border-[#d9b27a] pl-7 text-[2.25rem] font-normal leading-none text-[#d9b27a]">
                {pick(language, detailLabels.practiceArea)}
              </h3>
              <p className="mt-8 text-[1.5rem] font-light leading-[1.75] text-white/72">
                {details.practiceArea}
              </p>
            </div>
            <div>
              <h3 className="border-l-2 border-[#d9b27a] pl-7 text-[2.25rem] font-normal leading-none text-[#d9b27a]">
                {pick(language, detailLabels.practiceExperience)}
              </h3>
              <div className="mt-8 space-y-5 text-[1.5rem] font-light leading-[1.75] text-white/72">
                {splitParagraphs(details.practiceExperience).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
          {hasHonors ? (
            <>
              <div className="hidden bg-white/15 lg:block" />
              <div>
                <h3 className="border-l-2 border-[#d9b27a] pl-7 text-[2.25rem] font-normal leading-none text-[#d9b27a]">
                  {pick(language, detailLabels.honors)}
                </h3>
                <ul className="mt-8 space-y-5 text-[1.5rem] font-light leading-[1.65] text-white/72">
                  {details.honors.slice(0, 5).map((item, index) => (
                    <HonorItem key={`${index}-${item}`} item={item} itemKey={`${index}-${item}`} />
                  ))}
                </ul>
                {details.honors.length > 5 ? (
                  <>
                    <div
                      className={`grid transition-all duration-700 ease-in-out ${
                        honorsOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <ul className="mt-5 space-y-5 text-[1.5rem] font-light leading-[1.65] text-white/72">
                          {details.honors.slice(5).map((item, index) => (
                            <HonorItem key={`${index}-${item}`} item={item} itemKey={`${index}-${item}`} />
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="mt-10 flex justify-center">
                      <ViewMoreButton open={honorsOpen} onClick={() => setHonorsOpen((value) => !value)} />
                    </div>
                  </>
                ) : null}
              </div>
            </>
          ) : null}
        </div>
      </section>

      <section className="bg-[#262626] px-[8rem] py-20">
        <h2 className="text-[3rem] font-medium leading-none text-[#d9b27a]">
          {pick(language, detailLabels.achievements)}
        </h2>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {details.achievements.slice(0, 6).map((item, index) => (
            <AchievementCard key={`${index}-${item}`} item={item} />
          ))}
        </div>
        {details.achievements.length > 6 ? (
          <>
            <div
              className={`grid transition-all duration-700 ease-in-out ${
                achievementsOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                {regularAchievementTail.length > 0 ? (
                  <div className="mt-6 grid gap-6 text-left lg:grid-cols-2">
                    {regularAchievementTail.map((item, index) => (
                      <AchievementCard key={`${index}-${item}`} item={item} />
                    ))}
                  </div>
                ) : null}
                {liWanAchievementTail.length === 3 ? (
                  <div className="mt-6 grid gap-6 text-left lg:grid-cols-2 lg:items-stretch">
                    <div className="grid gap-6 lg:h-full lg:grid-rows-[1fr_auto]">
                      <AchievementCard item={liWanAchievementTail[0]} className="lg:h-full" />
                      <AchievementCard item={liWanAchievementTail[2]} />
                    </div>
                    <AchievementCard item={liWanAchievementTail[1]} className="lg:h-full" />
                  </div>
                ) : null}
              </div>
            </div>
            <div className="mt-10 flex justify-center">
              <ViewMoreButton open={achievementsOpen} onClick={() => setAchievementsOpen((value) => !value)} />
            </div>
          </>
        ) : null}
      </section>

      <SiteFooter />
      <BackToTop fallbackHref="/team" />
    </main>
  );
}
