"use client";

import { type CSSProperties } from "react";
import Link from "next/link";
import courseBook1 from "../../../assets/home/course-book-1.png";
import podcastImage from "../../../assets/home/podcast-feature.png";
import courseBook2 from "../../../assets/home/course-book-2.png";
import homePortrait from "../../../assets/main.png";
import { useLanguage } from "../../contexts/LanguageContext";
import { usePublicCmsData } from "../../contexts/PublicCmsDataContext";
import { renderNormalAmpersands, renderTitleAmpersands } from "../renderNormalAmpersands";
import { HeroAnimation2Background } from "./HeroAnimation2Background";
import { CourseBookShowcase } from "./CourseBookShowcase";
import { LandingCasesSection } from "./LandingCasesSection";
import { LandingFooter } from "./LandingFooter";
import { LandingHeader } from "./LandingHeader";
import { LandingRevealGroup } from "./LandingRevealGroup";
import { ScheduleCarouselSection } from "./ScheduleCarouselSection";
import {
  imageSrc,
  landingDesktopFluidTypeStyle,
  landingHeroShellClassName,
} from "./shared";
import {
  getPageContentField,
  getPageContentItemField,
  getPageContentLines,
  getPageContentSectionItems,
  pageContentItemFieldKey,
  splitPageContentParagraphs,
} from "@/lib/cms-page-content";

type Language = "zh" | "en";

const dennisProfileUrl = "/about";

type LocalizedProgramItem = {
  date: Record<Language, string>;
  description: Record<Language, string>;
  href: string;
  image: string;
  tag: Record<Language, string>;
  title: Record<Language, string>;
};

function normalizeExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://")
    ? href
    : `https://${href}`;
}

function hasCjkText(value: string) {
  return /[\u3400-\u9fff]/.test(value);
}

function getLocalizedCmsItemField(
  item: Parameters<typeof getPageContentItemField>[0],
  fieldId: string,
  fallback: string,
  language: Language,
) {
  const value = getPageContentItemField(item, fieldId, fallback);

  if (language === "en" && fieldId === "title" && hasCjkText(value)) {
    return fallback;
  }

  return value;
}

const homeProgramItems: LocalizedProgramItem[] = [
  {
    date: {
      zh: "2025-09-03",
      en: "2025-09-03",
    },
    image: imageSrc("/uploads/cms-pages/source/program/program1.png"),
    href: normalizeExternalHref("https://www.bilibili.com/video/BV1RDazzYEP9/?spm_id_from=333.1391.0.0"),
    tag: {
      zh: "@蜉蝣天地",
      en: "@蜉蝣天地",
    },
    title: {
      zh: "虎诉：赢家的饥饿、欲望与黑暗原力",
      en: "Tiger Partners: The Hunger, Desire and Dark Force",
    },
    description: {
      zh: "做题家的一种人生解法",
      en: "A Life Solution for the Exam-Oriented Achiever",
    },
  },
  {
    date: {
      zh: "2025-03-14",
      en: "2025-03-14",
    },
    image: imageSrc("/uploads/cms-pages/source/program/program2.png"),
    href: normalizeExternalHref("https://www.bilibili.com/video/BV1noQgYKEmb/?spm_id_from=333.1387.upload.video_card.click"),
    tag: {
      zh: "@全嘻嘻",
      en: "@全嘻嘻",
    },
    title: {
      zh: "传播焦虑第一人又来了",
      en: "The King of Spreading Anxiety is back.",
    },
    description: {
      zh: "聊聊你是否有【成功的基因】",
      en: `Let's talk about whether you have the "success gene".`,
    },
  },
  {
    date: {
      zh: "2025-11-18",
      en: "2025-11-18",
    },
    image: imageSrc("/uploads/cms-pages/source/program/program3.png"),
    href: normalizeExternalHref("https://v.qq.com/x/cover/mzc00200rtspg8d/p41012g4fm3.html"),
    tag: {
      zh: "《老板不知道的我·专业分享》",
      en: "The Boss Doesn't Know Me · Podcast Special",
    },
    title: {
      zh: "节目秉持“直接谈”理念，",
      en: 'Guided by the philosophy of "speak plainly and directly",',
    },
    description: {
      zh: "真实呈现老友创业的专业与情感平衡。",
      en: "the show authentically portrays the balance between professionalism and emotion in entrepreneurship among old friends.",
    },
  },
  {
    date: {
      zh: "2025-08-08",
      en: "2025-08-08",
    },
    image: imageSrc("/uploads/cms-pages/source/program/program4.png"),
    href: normalizeExternalHref("https://www.bilibili.com/video/BV18vt1zPEsi/?spm_id_from=333.1387.upload.video_card.click"),
    tag: {
      zh: "@虎诉",
      en: "@虎诉",
    },
    title: {
      zh: "作为reaction领域代表人物，",
      en: "As a leading figure in the reaction content field,",
    },
    description: {
      zh: "被网友誉为“人性观察大师”。",
      en: 'he is hailed by netizens as a "Master of Human Nature Observation".',
    },
  },
  {
    date: {
      zh: "",
      en: "",
    },
    image: imageSrc("/uploads/cms-pages/source/program/program5.jpeg"),
    href: normalizeExternalHref("https://b23.tv/NchQcXX"),
    tag: {
      zh: "@思远的南阁子",
      en: "@思远的南阁子",
    },
    title: {
      zh: "你可能是个后期英雄",
      en: "You might be a late-game hero,",
    },
    description: {
      zh: "所以时刻做好给机会开门的准备",
      en: "so always stay ready to keep the door open for opportunities.",
    },
  },
  {
    date: {
      zh: "",
      en: "",
    },
    image: imageSrc("/uploads/cms-pages/source/program/program6.jpeg"),
    href: normalizeExternalHref("https://b23.tv/PLUGnDl"),
    tag: {
      zh: "@王一快",
      en: "@王一快",
    },
    title: {
      zh: "职场饭局生存法则",
      en: "Survival Rules for Workplace Dinners",
    },
    description: {
      zh: "商务宴请全流程演示",
      en: "Full-Scenario Demo of Business Banquets",
    },
  },
  {
    date: {
      zh: "2023",
      en: "2023",
    },
    image: imageSrc("/uploads/cms-pages/source/program/program7.jpeg"),
    href: normalizeExternalHref("https://b23.tv/HBtcPdq"),
    tag: {
      zh: "@虎诉",
      en: "@虎诉",
    },
    title: {
      zh: "2023年受邀参与《蔚来说》",
      en: "Invited to participate in the official interview",
    },
    description: {
      zh: "官方采访。",
      en: "of NIO Says in 2023.",
    },
  },
  {
    date: {
      zh: "",
      en: "",
    },
    image: imageSrc("/uploads/cms-pages/source/program/program8.jpeg"),
    href: normalizeExternalHref("https://b23.tv/kubID0p"),
    tag: {
      zh: "@老蒋巨靠谱",
      en: "@老蒋巨靠谱",
    },
    title: {
      zh: "虎诉：我的成人礼发生在小学三年级",
      en: "My Coming-of-Age Happened in the Third Grade",
    },
    description: {
      zh: "【老蒋播客03】",
      en: "Episode 03: The Old Jiang Podcast",
    },
  },
];

const landingHomeCopy = {
  en: {
    heroTitleLines: ["Relentless in Advocacy.", "Strategic by Design."],
    heroName: "Tiger Partners",
    profileTitle: "One of the most influential commercial dispute resolution lawyers in Asia.",
    aboutCta: "More about Tiger Partners",
    profileParagraphs: [
      "Tiger Partners, Founding & Managing Partner of Tiger Partners, specializes in cross-border disputes and international arbitration involving tens of millions of USD.",
      "Within six years, he earned firm recognition from Chambers, Legal 500 & ALB, and personal spots on Legal 500 China Elite and CBLJA-List.",
      "He also hosts the podcast Tiger Partners Insights, reaching a professional audience of over one million.",
    ],
    beyondTitle: "From Law, And Beyond",
    beyondDescription:
      "Leveraging his profound legal expertise and professional credibility, Lawyer Tiger Partners has extended his professional insights to the general public and become a popular legal content creator with over 700,000 followers across online platforms.",
    programTitle: "Program Representative",
    programDescription:
      "With a confident, humorous, sincere and incisive style, he transforms specialized legal knowledge and practical workplace experience into accessible, inspiring and high-quality content, earning wide affection and recognition from his audience.",
    coursesTitle: "TIGER PARTNERS HAS CURRENTLY LAUNCHED TWO COURSES:",
    courses: [
      "One is 《The Way to Win Cases: A Required Course for Dispute Resolution Lawyers》, which draws on his more than ten years of practice at leading law firms and entrepreneurial experience to share a real-life lawyer's career.",
      'The other is 《The "dispute resolution" Guide to Life Growth》, a practical life guide tailored for young people based on his personal growth journey.',
    ],
  },
  zh: {
    heroTitleLines: ["坚定捍卫所托，", "深谙策略之道"],
    heroName: "虎诉",
    profileTitle: "亚太地区极具影响力的法律媒体意见领袖之一",
    aboutCta: "了解更多",
    profileParagraphs: [
      "虎诉作为虎诉律师事务所的创始与管理合伙人，长期专注于千万美元级别的跨境商事争议与国际仲裁业务。",
      "六年来，他带领虎诉获得 Chambers、The Legal 500、ALB 等权威法律指南的认可；其本人也入选 The Legal 500 China Elite 和《商法》A-List等榜单。",
      "此外，他还主持极具影响力的专业观察 Tiger Partners Insights，吸引上百万专业人士关注。",
    ],
    beyondTitle: "始于法律，不止于法律",
    beyondDescription:
      "依托法律领域的深厚积淀与专业公信力，虎诉将专业智慧延伸至大众视野，成为全网超70万粉丝的人气法律UP主。",
    programTitle: "课程代表",
    programDescription:
      "他以自信幽默、真诚犀利的风格，把专业法律知识与实用职场经验，转化为通俗易懂、极具启发的优质内容，深受观众喜爱与认可。",
    coursesTitle: "虎诉现已推出两门课程：",
    courses: [
      "一是《胜诉之道·争议解决律师必修课》，结合十余年红圈所执业与创业经历，分享真实律师生涯。",
      "二是《\"争议解决\"的人生成长指南》，基于个人成长经历，为年轻人打造的实操型人生指南。",
    ],
  },
} as const;

function revealStyle(durationMs = 700, y = 24): CSSProperties {
  return {
    opacity: 0,
    transform: `translateY(${y}px)`,
    transition: `opacity ${durationMs / 1000}s ease, transform ${durationMs / 1000}s ease`,
  };
}

function renderEnglishProfileTitleLine(line: string, index: number) {
  const commercialMatch = line.match(/commercial/i);
  if (index === 1 && commercialMatch?.index !== undefined) {
    const beforeCommercial = line.slice(0, commercialMatch.index);
    const commercialText = line.slice(commercialMatch.index, commercialMatch.index + commercialMatch[0].length);
    const afterCommercial = line.slice(commercialMatch.index + commercialMatch[0].length);

    return (
      <>
        {renderTitleAmpersands(beforeCommercial)}
        <span className="text-[#d9b27a]">{renderTitleAmpersands(commercialText)}</span>
        {renderTitleAmpersands(afterCommercial)}
      </>
    );
  }

  if (index === 2) {
    return <span className="text-[#d9b27a]">{renderTitleAmpersands(line)}</span>;
  }

  return renderTitleAmpersands(line);
}

function editableField(sectionId: string, fieldId: string) {
  return { "data-cms-field": `${sectionId}__${fieldId}` };
}

export function HomeLandingPage() {
  const { language } = useLanguage();
  const { pageContent } = usePublicCmsData();
  const copy = landingHomeCopy[language];
  const isZh = language === "zh";
  const heroTitleFieldIds = ["titleLine1", "titleLine2", "titleLine3"] as const;
  const heroTitleLines = getPageContentLines(
    pageContent,
    language,
    "home",
    "hero",
    ["titleLine1", "titleLine2", "titleLine3"],
    ["RELENTLESS IN", "ADVOCACY. STRATEGIC", "BY DESIGN."],
  );
  const heroName = getPageContentField(pageContent, language, "home", "hero", "name", "Tiger Partners");
  const heroPortraitSrc = getPageContentField(pageContent, language, "home", "hero", "portraitImage", "") || imageSrc(homePortrait);
  const profileTitleFieldIds = ["titleLine1", "titleLine2", "titleLine3", "titleLine4"] as const;
  const profileTitleLines = getPageContentLines(
    pageContent,
    language,
    "home",
    "profile",
    profileTitleFieldIds,
    isZh
      ? [copy.profileTitle]
      : ["One of the most", "influential commercial", "dispute resolution", "lawyers in Asia."],
  );
  const profileParagraphs = splitPageContentParagraphs(
    getPageContentField(pageContent, language, "home", "profile", "body", copy.profileParagraphs.join("\n")),
    copy.profileParagraphs,
  );
  const aboutCtaLabel = getPageContentField(pageContent, language, "home", "profile", "ctaLabel", copy.aboutCta);
  const aboutCtaHref = dennisProfileUrl;
  const casesTitle = getPageContentField(pageContent, language, "home", "cases", "title", isZh ? "代表性案例" : "Representative Cases");
  const casesSubtitle = getPageContentField(
    pageContent,
    language,
    "home",
    "cases",
    "subtitle",
    isZh
      ? "专注高价值复杂商事争议与国际仲裁"
      : "High-value, complex disputes before leading courts and arbitral institutions in China.",
  );
  const beyondTitle = getPageContentField(pageContent, language, "home", "beyond", "title", copy.beyondTitle);
  const beyondBody = getPageContentField(pageContent, language, "home", "beyond", "body", copy.beyondDescription);
  const beyondImageSrc = getPageContentField(pageContent, language, "home", "beyond", "image", "") || imageSrc(podcastImage);
  const programTitle = getPageContentField(pageContent, language, "home", "program", "title", copy.programTitle);
  const programDescription = getPageContentField(pageContent, language, "home", "program", "description", copy.programDescription);
  const coursesTitle = getPageContentField(pageContent, language, "home", "courses", "title", copy.coursesTitle);
  const courses = [
    getPageContentField(pageContent, language, "home", "courses", "course1", copy.courses[0]),
    getPageContentField(pageContent, language, "home", "courses", "course2", copy.courses[1]),
  ].filter(Boolean);
  const course1ImageSrc = getPageContentField(pageContent, language, "home", "courses", "course1Image", "") || imageSrc(courseBook1);
  const course2ImageSrc = getPageContentField(pageContent, language, "home", "courses", "course2Image", "") || imageSrc(courseBook2);
  const zhBeyondDescription =
    "依托法律领域的深厚积淀与专业公信力，虎诉将专业智慧延伸至大众视野，成为全网超70万粉丝的人气法律UP主。";
  const zhProgramTitle = "代表性节目";
  const zhCoursesTitle = "虎诉现已推出两部课程：";
  const zhCourses = [
    "一是结合十余年红圈所执业与创业经历，分享真实律师生涯的《胜诉之道 · 争议解决律师必修课》；",
    "二是基于个人成长经历，为年轻人打造的实操型人生指南《\"争议解决\"的人生成长指南》。",
  ] as const;
  const displayEnglishCoursesParagraphs = [
    [
      "One is The Way to Win Cases: A Required Course for Dispute Resolution Lawyers,",
      "which draws on his more than ten years of practice at leading law firms and",
      "entrepreneurial experience to share a real-life lawyer's career.",
    ],
    [
      "The other is A Real-World Guide to Personal Growth, a practical life guide",
      "tailored for young people based on his personal growth journey.",
    ],
  ] as const;
  const headingFontClass = "font-['Akshar']";
  const bodyFontClass = "font-['Abel']";
  const englishHeroTitleLines = ["RELENTLESS IN", "ADVOCACY. STRATEGIC", "BY DESIGN."] as const;
  const englishProfileParagraph =
    "Tiger Partners, Founding & Managing Partner of Tiger Partners, specializes in cross-border disputes and international arbitration involving tens of millions of USD. Within six years, he earned firm recognition from Chambers, Legal 500 & ALB, and personal spots on Legal 500 China Elite and CBLJA-List. He also hosts the podcast Tiger Partners Insights, reaching a professional audience of over one million.";
  const englishBeyondDescriptionLines = [
    "Leveraging his profound legal expertise and professional credibility,",
    "Lawyer Tiger Partners has extended his professional insights to the",
    "general public and become a popular legal content creator with over",
    "700,000 followers across online platforms.",
  ] as const;
  const programCarouselItems = homeProgramItems.map((item) => ({
    buttonLabel: isZh ? "观看视频" : "Watch Live",
    href: item.href,
    id: item.href,
    image: item.image,
    metaLeft: item.date[language as Language],
    metaRight: item.tag[language as Language],
    title: item.title[language as Language],
  }));
  const cmsProgramItems = getPageContentSectionItems(pageContent, language, "home", "program");
  const editableProgramCarouselItems = (cmsProgramItems.length > 0 ? cmsProgramItems : homeProgramItems).map((item, index) => {
    const fieldPrefix = `item${index + 1}`;
    const isCmsItem = "fields" in item;
    const fallbackItem = homeProgramItems[index];
    const itemId = isCmsItem ? item.id : item.href;
    const fieldKey = (fieldId: string, legacyFieldId: string) =>
      isCmsItem ? pageContentItemFieldKey("program", itemId, fieldId) : `program__${legacyFieldId}`;
    const fallbackHref = fallbackItem?.href ?? "";
    const fallbackImage = fallbackItem?.image ?? "";
    const fallbackDate = fallbackItem?.date[language as Language] ?? "";
    const fallbackTag = fallbackItem?.tag[language as Language] ?? "";
    const fallbackTitle = fallbackItem?.title[language as Language] ?? "";

    return {
      buttonLabel: isZh ? "观看视频" : "Watch Live",
      cmsFields: {
        href: fieldKey("href", `${fieldPrefix}Href`),
        image: fieldKey("image", `${fieldPrefix}Image`),
        metaLeft: fieldKey("date", `${fieldPrefix}Date`),
        metaRight: fieldKey("tag", `${fieldPrefix}Tag`),
        title: fieldKey("title", `${fieldPrefix}Title`),
      },
      href: isCmsItem ? getPageContentItemField(item, "href", fallbackHref) : item.href,
      id: itemId,
      image: isCmsItem ? getPageContentItemField(item, "image", fallbackImage) || fallbackImage : item.image,
      metaLeft: isCmsItem ? getPageContentItemField(item, "date", fallbackDate) : item.date[language as Language],
      metaRight: isCmsItem ? getPageContentItemField(item, "tag", fallbackTag) : item.tag[language as Language],
      title: isCmsItem
        ? getLocalizedCmsItemField(item, "title", fallbackTitle, language as Language)
        : item.title[language as Language],
    };
  });
  const englishCoursesTitleLines = [
    "TIGER PARTNERS HAS CURRENTLY",
    "LAUNCHED TWO COURSES:",
  ] as const;
  const englishCoursesParagraphs = [
    [
      "One is 《The Way to Win Cases: A Required Course for Dispute Resolution Lawyers》, which draws",
      "on his more than ten years of practice at leading law firms and entrepreneurial experience",
      "to share a real-life lawyer's career.",
    ],
    [
      "The other is 《The “dispute resolution” Guide to Life Growth》, a practical life guide tailored for young",
      "people based on his personal growth journey.",
    ],
  ] as const;
  const profileTitleFluidStyle = isZh
    ? landingDesktopFluidTypeStyle(24.3, 28.8)
    : landingDesktopFluidTypeStyle(33.826, 38.88);
  const profileBodyFluidStyle = isZh
    ? landingDesktopFluidTypeStyle(22.651, 25.41)
    : landingDesktopFluidTypeStyle(23.993, 26.681);
  const profileCtaFluidStyle = isZh
    ? landingDesktopFluidTypeStyle(18.24, 20)
    : landingDesktopFluidTypeStyle(18, 21);
  const beyondTitleFluidStyle = landingDesktopFluidTypeStyle(54.4, 62);
  const beyondBodyFluidStyle = landingDesktopFluidTypeStyle(24.8, 28);
  const programTitleFluidStyle = landingDesktopFluidTypeStyle(45.6, 52);
  const programBodyFluidStyle = landingDesktopFluidTypeStyle(18.88, 21.5);
  const coursesTitleFluidStyle = isZh
    ? landingDesktopFluidTypeStyle(40.32, 46)
    : landingDesktopFluidTypeStyle(32.256, 38);
  const coursesBodyFluidStyle = landingDesktopFluidTypeStyle(20, 23);
  return (
    <div className="min-h-screen bg-[#161915] text-white">
      <LandingHeader />

      <main>
        <section className="relative flex h-[100svh] min-h-[100svh] items-center overflow-hidden">
          <div className="absolute inset-0">
            <HeroAnimation2Background />
          </div>

          <LandingRevealGroup className="relative z-10 h-[100svh] min-h-[100svh] w-full" threshold={0.2}>
            <div
              className={`${landingHeroShellClassName} relative flex h-[100svh] min-h-[100svh] w-full flex-col items-start gap-0 justify-center py-[var(--landing-hero-padding-y)] pl-[var(--landing-shell-125)] pr-[var(--landing-shell-8)]`}
            >
              <div className="w-full max-w-full lg:inline-block lg:w-auto" data-animate style={revealStyle(900, 30)}>
                <h1
                  className="mt-5 max-w-full text-left font-['Akshar'] font-bold  leading-[0.96] tracking-[-0.04em] text-transparent"
                  style={{
                    fontSize: "var(--landing-type-hero-en)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    backgroundImage:
                      "linear-gradient(101deg, rgb(255,255,255) 3%, rgb(217,178,122) 85%)",
                  }}
                >
                  {heroTitleLines.map((line, index) => (
                    <span
                      key={line}
                      className="block"
                      {...editableField("hero", heroTitleFieldIds[index] ?? "titleLine1")}
                    >
                      {renderTitleAmpersands(line)}
                    </span>
                  ))}
                </h1>

                <div className="mt-8 flex w-full min-w-0 items-center justify-end gap-3">
                  <div className="h-px w-8 bg-[#8b8f8a]" />
                  <span
                    className="min-w-0 text-right font-['Abel'] tracking-[0.12em] text-[#b9b9b9]"
                    style={{ fontSize: "var(--landing-type-signature)" }}
                    {...editableField("hero", "name")}
                  >
                    {renderNormalAmpersands(heroName)}
                  </span>
                </div>
              </div>

              <div
                className="relative mt-12 flex w-full max-w-[var(--landing-hero-mobile-art-width)] shrink-0 items-center justify-center lg:hidden"
                data-animate
                style={revealStyle(900, 30)}
              >
                <div className="absolute inset-x-[14%] top-[16%] h-[68%] rounded-full bg-[rgba(205,142,25,0.14)] blur-[90px]" />
                <img
                  src={heroPortraitSrc}
                  alt="Tiger Partners"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className="relative w-full object-contain drop-shadow-[0_40px_90px_rgba(0,0,0,0.45)]"
                  {...editableField("hero", "portraitImage")}
                />
              </div>
            </div>

              <div
                className="absolute left-auto right-[5vw] top-0 hidden h-[100vh] w-max items-end justify-end lg:flex"
                data-animate
                style={revealStyle(900, 30)}
              >
              <div className="absolute inset-x-[10%] top-[14%] h-[72%] rounded-full bg-[rgba(205,142,25,0.14)] blur-[110px]" />
              <img
                src={heroPortraitSrc}
                alt="Tiger Partners"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="relative h-[100vh] w-auto max-w-none object-contain object-bottom drop-shadow-[0_40px_90px_rgba(0,0,0,0.45)]"
                {...editableField("hero", "portraitImage")}
              />
            </div>
          </LandingRevealGroup>
        </section>

        <section className="overflow-hidden bg-[rgba(14,16,14,0.72)] py-20 md:py-28">
          <LandingRevealGroup
            className="mx-auto w-full px-[var(--landing-shell-8)] lg:px-[var(--landing-shell-11)]"
            threshold={0.15}
          >
            <div className="mx-auto grid w-full gap-10 lg:w-fit lg:max-w-full lg:grid-cols-[minmax(22rem,max-content)_minmax(32rem,42rem)] lg:items-start lg:justify-center lg:gap-20">
              <div className="flex items-start lg:justify-end" data-animate style={revealStyle(700, 24)}>
                {isZh ? (
                  <p
                    className={`${headingFontClass} landing-desktop-fluid-text text-right text-[clamp(0.74rem,2vw,1.68rem)] font-semibold leading-[1.32] text-white [text-wrap:balance]`}
                    style={profileTitleFluidStyle}
                    {...editableField("profile", "title")}
                  >
                    {profileTitleLines.map((line, index) => (
                      <span
                        key={`${line}-${index}`}
                        className="block"
                        {...editableField("profile", profileTitleFieldIds[index] ?? "titleLine1")}
                      >
                        {renderTitleAmpersands(line)}
                      </span>
                    ))}
                  </p>
                ) : (
                  <p
                    className="landing-desktop-fluid-text text-right font-['Akshar'] text-[clamp(1.25rem,2.9vw,3rem)] font-semibold  leading-[1.276] text-white"
                    style={profileTitleFluidStyle}
                    {...editableField("profile", "title")}
                  >
                    {profileTitleLines.map((line, index) => (
                      <span
                        key={`${line}-${index}`}
                        className="block whitespace-normal md:whitespace-nowrap"
                        {...editableField("profile", profileTitleFieldIds[index] ?? "titleLine1")}
                      >
                        {renderEnglishProfileTitleLine(line, index)}
                      </span>
                    ))}
                  </p>
                )}
              </div>

              <div className="w-full lg:w-[42rem]" data-animate style={revealStyle(700, 24)}>
                {isZh ? (
                  <div className="space-y-4">
                    {profileParagraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className={`${bodyFontClass} landing-desktop-fluid-text max-w-full [overflow-wrap:anywhere] text-[clamp(0.846rem,1.458vw,1.17rem)] leading-[1.278] text-[#e4e5e2]`}
                        style={profileBodyFluidStyle}
                        {...editableField("profile", "body")}
                      >
                        {renderNormalAmpersands(paragraph)}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p
                    className="landing-desktop-fluid-text font-['Abel'] text-[clamp(0.882rem,1.53vw,1.422rem)] leading-[1.17] text-[#e4e5e2]"
                    style={profileBodyFluidStyle}
                    {...editableField("profile", "body")}
                  >
                    {renderNormalAmpersands(profileParagraphs.join(" "))}
                  </p>
                )}
                <Link
                  href={aboutCtaHref}
                  className={
                    isZh
                      ? `landing-desktop-fluid-text mt-8 inline-flex max-w-full flex-wrap items-center gap-2 border-b-2 border-[#2d5f4f] pb-1 ${bodyFontClass} text-[clamp(0.91rem,1.2vw,1.14rem)] font-semibold text-white transition-colors duration-300 hover:border-[#d9b27a] hover:text-[#d9b27a]`
                      : "landing-desktop-fluid-text mt-8 inline-flex items-center gap-2 border-b-2 border-[#2d5f4f] pb-1 font-['Akshar'] text-[1.125rem] font-semibold tracking-tight text-white transition-colors duration-300 hover:border-[#d9b27a] hover:text-[#d9b27a]"
                  }
                  style={profileCtaFluidStyle}
                  {...editableField("profile", "ctaHref")}
                >
                  <span {...editableField("profile", "ctaLabel")}>{renderNormalAmpersands(aboutCtaLabel)}</span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path
                      d="M4.167 10h11.667M10.833 5l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1.667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </LandingRevealGroup>
        </section>

        <LandingCasesSection
          sectionCmsField="cases__title"
          subtitle={casesSubtitle}
          subtitleCmsField="cases__subtitle"
          title={casesTitle}
          titleCmsField="cases__title"
        />

        <section className="bg-[rgba(14,16,14,0.72)] py-20 md:py-28">
          <LandingRevealGroup
            className="mx-auto w-full px-[var(--landing-shell-8)] lg:px-[var(--landing-shell-14)]"
            threshold={0.1}
          >
            <div className="mx-auto grid w-full max-w-[min(100%,72rem)] items-center gap-12 lg:grid-cols-[20vw_minmax(0,42rem)] lg:justify-center lg:gap-16">
              <div
                className="overflow-hidden rounded-[26px] border border-white/10 bg-[#11150f] shadow-[0_25px_70px_rgba(0,0,0,0.35)] lg:w-[20vw]"
                data-animate
                style={revealStyle(700, 24)}
              >
                <img
                  src={beyondImageSrc}
                  alt="Tiger Partners Insights"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                  {...editableField("beyond", "image")}
                />
              </div>

              <div data-animate style={revealStyle(700, 24)}>
                <h2
                  className={`${headingFontClass} landing-desktop-fluid-text text-[clamp(1.87rem,3.91vw,3.4rem)] font-bold leading-[1.08] text-[#d9b27a] ${isZh ? "" : ""}`}
                  style={beyondTitleFluidStyle}
                  {...editableField("beyond", "title")}
                >
                  {renderTitleAmpersands(beyondTitle)}
                </h2>
                {isZh ? (
                  <p
                    className={`landing-desktop-fluid-text mt-8 ${bodyFontClass} text-[clamp(1.08rem,1.65vw,1.55rem)] leading-[1.72] text-[#dcdcdc]`}
                    style={beyondBodyFluidStyle}
                    {...editableField("beyond", "body")}
                  >
                    {renderNormalAmpersands(beyondBody)}
                  </p>
                ) : (
                  <p
                    className="landing-desktop-fluid-text mt-8 font-['Abel'] text-[clamp(1.08rem,1.65vw,1.55rem)] leading-[1.62] text-[#dcdcdc]"
                    style={beyondBodyFluidStyle}
                    {...editableField("beyond", "body")}
                  >
                    {splitPageContentParagraphs(beyondBody, [copy.beyondDescription]).map((line) => (
                      <span key={line} className="block">
                        {renderNormalAmpersands(line)}
                      </span>
                    ))}
                  </p>
                )}
              </div>
            </div>
          </LandingRevealGroup>
        </section>

        <ScheduleCarouselSection
          theme="homeProgram"
          title={programTitle}
          titleCmsField="program__title"
          titleIsEnglish
          titleClassName="landing-desktop-fluid-text font-['Akshar'] text-[clamp(1.35rem,3.2vw,2.85rem)] font-semibold  leading-[1.08] text-[#d9b27a]"
          titleStyle={programTitleFluidStyle}
          description={programDescription}
          descriptionCmsField="program__description"
          descriptionClassName={`${bodyFontClass} landing-desktop-fluid-text mt-5 max-w-[52rem] text-[clamp(0.9rem,1.25vw,1.18rem)] leading-[1.72] text-[#dcdcdc] [text-wrap:pretty] text-center`}
          descriptionStyle={programBodyFluidStyle}
          contentMaxWidthClassName="max-w-[52rem]"
          items={editableProgramCarouselItems}
          sectionCmsField="program__title"
          singleLineChineseText
        />

        <section className="relative overflow-hidden bg-[#161915] py-20 md:py-28" data-cms-field="courses__title">
          <div
            className="absolute left-0 right-0 top-1/2 h-[clamp(14.25rem,30vw,18.75rem)] -translate-y-1/2"
            style={{ backgroundColor: "#1F251A" }}
          />

          <LandingRevealGroup
            className="relative z-10 mx-auto w-full px-[var(--landing-shell-8)]"
            threshold={0.1}
          >
            <div className="mx-auto grid w-full items-center gap-14 lg:w-fit lg:max-w-full lg:grid-cols-[minmax(16rem,20rem)_minmax(34rem,44rem)] lg:justify-center lg:gap-[4vw]">
            <div data-animate style={revealStyle(800, 24)}>
              <CourseBookShowcase
                primaryCmsField="courses__course1Image"
                primaryImage={course1ImageSrc}
                primaryAlt="The Way to Win Cases"
                secondaryCmsField="courses__course2Image"
                secondaryImage={course2ImageSrc}
                secondaryAlt="The dispute resolution Guide to Life Growth"
              />
            </div>

            <div className="w-full lg:w-[44rem]" data-animate style={revealStyle(700, 24)}>
              {isZh ? (
                <>
                  <h2
                    className={`${headingFontClass} landing-desktop-fluid-text text-[clamp(1.8rem,2.8vw,2.7rem)] font-semibold leading-[1.2] text-[#d8b67b]`}
                    style={coursesTitleFluidStyle}
                    {...editableField("courses", "title")}
                  >
                    {renderTitleAmpersands(coursesTitle)}
                  </h2>
                  <div className="mt-6 space-y-5">
                    {courses.map((course, index) => (
                      <p
                        key={course}
                        className={`${bodyFontClass} landing-desktop-fluid-text text-[clamp(1rem,1.45vw,1.25rem)] leading-[1.53] text-[#eaeaea]`}
                        style={coursesBodyFluidStyle}
                        {...editableField("courses", index === 0 ? "course1" : "course2")}
                      >
                        {renderNormalAmpersands(course)}
                      </p>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <h2
                    className={`${headingFontClass} landing-desktop-fluid-text text-[clamp(1.44rem,2.24vw,2.16rem)] font-semibold  leading-[1.08] text-[#d8b67b]`}
                    style={coursesTitleFluidStyle}
                    {...editableField("courses", "title")}
                  >
                    {splitPageContentParagraphs(coursesTitle, [coursesTitle]).map((line) => (
                      <span key={line} className="block">
                        {renderTitleAmpersands(line)}
                      </span>
                    ))}
                  </h2>
                  <div className="mt-6 space-y-0">
                    {courses.map((course, index) => [course, index] as const).map(([course, index]) => (
                      <p
                        key={course}
                        className="landing-desktop-fluid-text font-['Abel'] text-[clamp(1rem,1.45vw,1.25rem)] leading-[1.53] text-[#eaeaea]"
                        style={coursesBodyFluidStyle}
                        {...editableField("courses", index === 0 ? "course1" : "course2")}
                      >
                        {[course].map((line) => (
                          <span key={line} className="block">
                            {renderNormalAmpersands(line)}
                          </span>
                        ))}
                      </p>
                    ))}
                  </div>
                </>
              )}
            </div>
            </div>
          </LandingRevealGroup>
        </section>
        </main>

        <LandingFooter />
    </div>
  );
}
