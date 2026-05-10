"use client";

import { type CSSProperties, useState } from "react";
import podcastPortrait from "../../../assets/podcast.png";
import podcastLogo1 from "../../../assets/podcastlogo1.png";
import podcastLogo2 from "../../../assets/podcastlogo2.png";
import podcastLogo3 from "../../../assets/podcastlogo3.png";
import podcastLogo4 from "../../../assets/podcastlogo4.png";
import podcastLogo5 from "../../../assets/podcastlogo5.png";
import podcastLogo6 from "../../../assets/podcastlogo6.png";
import specialImage1 from "../../../assets/Special/封面 (1).jpg";
import specialImage2 from "../../../assets/Special/封面 (2).jpg";
import specialImage3 from "../../../assets/Special/播客封面.jpg";
import specialImage4 from "../../../assets/Special/播客封面 (1).jpg";
import specialImage5 from "../../../assets/Special/播客封面 (2).jpg";
import specialImage6 from "../../../assets/Special/播客封面 (8).jpg";
import specialImage7 from "../../../assets/Special/正片封面.jpg";
import { useLanguage } from "../../contexts/LanguageContext";
import { usePublicCmsData } from "../../contexts/PublicCmsDataContext";
import { renderNormalAmpersands, renderTitleAmpersands } from "../renderNormalAmpersands";
import { HeroAnimation2Background } from "./HeroAnimation2Background";
import { LandingFooter } from "./LandingFooter";
import { LandingHeader } from "./LandingHeader";
import { LandingRevealGroup } from "./LandingRevealGroup";
import { imageSrc, publicAssetSrc } from "./shared";
import {
  getPageContentField,
  getPageContentItemField,
  getPageContentLines,
  getPageContentSectionItems,
  pageContentItemFieldKey,
  splitPageContentParagraphs,
} from "@/lib/cms-page-content";

const mediaPageShellClassName = "mx-auto w-full px-[var(--landing-shell-125)]";
type Language = "zh" | "en";

const mediaPlatformLogos = [
  {
    src: podcastLogo1.src,
    alt: "bilibili",
    href: "https://space.bilibili.com/28756625/lists/4881575?type=season",
  },
  {
    src: podcastLogo2.src,
    alt: "Xiaoyuzhou",
    href: "https://www.xiaoyuzhoufm.com/podcast/67beafe26f6f1f20d22d69e4",
  },
  {
    src: podcastLogo3.src,
    alt: "YouTube",
    href: "https://www.youtube.com/@Tiger PartnersLiu-s9u",
  },
  {
    src: podcastLogo4.src,
    alt: "Apple Podcasts",
    href: "https://podcasts.apple.com/cn/podcast/tiger-legal-talks/id1888723086",
  },
] as const;

const mediaBodyParagraphs: Record<Language, readonly string[]> = {
  en: [
    "Tiger Partners Insights is a video podcast designed for high-level Chinese-speaking legal professionals across the Asia-Pacific region. Hosted by Tiger Partners (@虎诉), Tiger Partners Insights explores timely, engaging, and intellectually rigorous legal topics through conversations with leading practitioners, scholars, and cross-disciplinary guests.",
    "As China’s first legal-focused video podcast, Tiger Partners Insights has built a strong presence in this emerging niche. It serves as a platform for idea exchange across law, finance, and compliance, with over 30,000 paid subscribers on Bilibili and more than 40,000 followers on Xiaoyuzhou (a leading podcast platform in China).",
  ],
  zh: [
    "《Tiger Partners Insights》是一档面向亚太地区华语高端法律人才打造的专业观察节目，由虎诉（@虎诉）主持。节目围绕兼具时效性、话题性与专业深度的法律议题展开，邀请法律实务人士、学者及跨界嘉宾参与对谈。",
    "作为国内首档法律垂类专业观察，《Tiger Partners Insights》已在这一新兴赛道中建立起鲜明影响力。节目致力于为法律、金融、合规等领域专业人士提供高质量的思想交流平台，目前在B站拥有超过30,000名付费订阅用户，在小宇宙拥有超过40,000名订阅用户。",
  ],
};

const specialEditionParagraphs: Record<Language, string> = {
  zh: "“Special Edition”是Tiger Partners Insights推出的特别加更栏目，聚焦全网实时热点，以更生动、更深入的方式回应当下议题，更新频次不固定。Special Edition推出以来，已获得广泛关注与认可，目前选题涵盖娃哈哈家族财产争议、虞书欣家族国有资产关联风波、犯罪记录封存新规、南京博物院文物文化解读、爱泼斯坦案件、美以伊地缘冲突，以及脑力劳动者运动方式科普等内容。",
  en: "Special Edition is a bonus segment launched by Tiger Partners Insights, focusing on real-time trending topics across the internet and responding to current issues in a more vivid and in-depth manner. Published on an irregular basis, the segment has gained broad attention and positive recognition since its launch. Topics covered to date include the Wahaha family inheritance dispute, controversies surrounding Yu Shuxin’s family and alleged links to state-owned assets, new regulations on criminal record sealing, cultural interpretations of artifacts from the Nanjing Museum, the Epstein case, the U.S.–Israel–Iran geopolitical tensions, and science-based guidance on exercise for knowledge workers.",
};

const specialEditionSlides = [
  { src: specialImage3.src, altEn: "Special Edition cover 1", altZh: "Special Edition 封面 1" },
  { src: specialImage1.src, altEn: "Special Edition cover 2", altZh: "Special Edition 封面 2" },
  { src: specialImage2.src, altEn: "Special Edition cover 3", altZh: "Special Edition 封面 3" },
  { src: specialImage4.src, altEn: "Special Edition cover 4", altZh: "Special Edition 封面 4" },
  { src: specialImage5.src, altEn: "Special Edition cover 5", altZh: "Special Edition 封面 5" },
  { src: specialImage6.src, altEn: "Special Edition cover 6", altZh: "Special Edition 封面 6" },
  { src: specialImage7.src, altEn: "Special Edition cover 7", altZh: "Special Edition 封面 7" },
] as const;

function revealStyle(durationMs = 700, y = 24): CSSProperties {
  return {
    opacity: 0,
    transform: `translateY(${y}px)`,
    transition: `opacity ${durationMs / 1000}s ease, transform ${durationMs / 1000}s ease`,
  };
}

function restoreLegacyPodcastCopy(value: string, fallback: string) {
  const normalizedValue = value.trim();

  if (!normalizedValue) {
    return fallback;
  }

  if (
    normalizedValue ===
    "Special editions use deeper interview formats to explore legal careers, business context, and cross-disciplinary experience."
  ) {
    return fallback;
  }

  return value;
}

export function MediaLandingPage() {
  const { language } = useLanguage();
  const { pageContent } = usePublicCmsData();
  const [activeSpecialSlide, setActiveSpecialSlide] = useState(0);
  const isZh = language === "zh";
  const headingFontClass = "font-['Akshar']";
  const bodyFontClass = "font-['Abel']";
  const activeLanguage = language as Language;
  const heroTitleLines = getPageContentLines(pageContent, activeLanguage, "podcast", "hero", ["titleLine1", "titleLine2"], ["Tiger Partners Insights"]);
  const heroImageSrc = getPageContentField(pageContent, activeLanguage, "podcast", "hero", "heroImage", "") || imageSrc(podcastPortrait);
  const introBody = getPageContentField(pageContent, activeLanguage, "podcast", "intro", "body", mediaBodyParagraphs[activeLanguage][0] ?? "");
  const introBody2 = getPageContentField(pageContent, activeLanguage, "podcast", "intro", "body2", mediaBodyParagraphs[activeLanguage][1] ?? "");
  const introParagraphs = splitPageContentParagraphs([introBody, introBody2].filter(Boolean).join("\n"), mediaBodyParagraphs[activeLanguage]);
  const introLogoImage = getPageContentField(pageContent, activeLanguage, "podcast", "intro", "logoImage", podcastLogo5.src);
  const introCoverImage = getPageContentField(pageContent, activeLanguage, "podcast", "intro", "coverImage", podcastLogo6.src);
  const introVideoSrc = getPageContentField(pageContent, activeLanguage, "podcast", "intro", "videoSrc", "/assets/video/video.mp4");
  const specialTitle = getPageContentField(pageContent, activeLanguage, "podcast", "special", "title", "Special Edition");
  const specialBody = restoreLegacyPodcastCopy(
    getPageContentField(pageContent, activeLanguage, "podcast", "special", "body", specialEditionParagraphs[activeLanguage]),
    specialEditionParagraphs[activeLanguage],
  );
  const specialViewMoreLabel = getPageContentField(
    pageContent,
    activeLanguage,
    "podcast",
    "special",
    "viewMoreLabel",
    isZh ? "查看更多" : "View More",
  );
  const specialViewMoreHref = getPageContentField(
    pageContent,
    activeLanguage,
    "podcast",
    "special",
    "viewMoreHref",
    "https://www.bilibili.com/video/BV1HmcMzjEai/?spm_id_from=333.1387.upload.video_card.click&vd_source=f70496417dad601b9801b3cfa6558ce0",
  );
  const cmsPlatformItems = getPageContentSectionItems(pageContent, activeLanguage, "podcast", "platforms");
  const cmsSpecialItems = getPageContentSectionItems(pageContent, activeLanguage, "podcast", "special");
  const platformItems =
    cmsPlatformItems.length > 0
      ? cmsPlatformItems.map((item, index) => ({
          cmsItemId: item.id,
          href: getPageContentItemField(item, "href", mediaPlatformLogos[index % mediaPlatformLogos.length]?.href ?? ""),
          label: getPageContentItemField(item, "label", mediaPlatformLogos[index % mediaPlatformLogos.length]?.alt ?? ""),
          src: getPageContentItemField(item, "icon", mediaPlatformLogos[index % mediaPlatformLogos.length]?.src ?? ""),
        }))
      : mediaPlatformLogos.map((logo) => ({
          cmsItemId: undefined,
          href: logo.href,
          label: logo.alt,
          src: logo.src,
        }));
  const specialSlides =
    cmsSpecialItems.length > 0
      ? cmsSpecialItems.map((item, index) => ({
          altEn: getPageContentItemField(item, "alt", specialEditionSlides[index % specialEditionSlides.length]?.altEn ?? ""),
          altZh: getPageContentItemField(item, "alt", specialEditionSlides[index % specialEditionSlides.length]?.altZh ?? ""),
          cmsItemId: item.id,
          href: getPageContentItemField(item, "href"),
          src: getPageContentItemField(item, "image", specialEditionSlides[index % specialEditionSlides.length]?.src ?? ""),
          title: getPageContentItemField(item, "title", `Special Edition ${index + 1}`),
        }))
      : specialEditionSlides.map((slide, index) => ({
          ...slide,
          cmsItemId: undefined,
          href: index === 0 ? "https://www.bilibili.com/video/BV1HmcMzjEai/?spm_id_from=333.1387.upload.video_card.click&vd_source=f70496417dad601b9801b3cfa6558ce0" : "",
          title: isZh ? slide.altZh : slide.altEn,
        }));
  const currentSpecialSlide = specialSlides[activeSpecialSlide] ?? specialSlides[0];

  function showPreviousSpecialSlide() {
    setActiveSpecialSlide((current) =>
      current === 0 ? specialSlides.length - 1 : current - 1,
    );
  }

  function showNextSpecialSlide() {
    setActiveSpecialSlide((current) =>
      current === specialSlides.length - 1 ? 0 : current + 1,
    );
  }

  return (
    <div className="min-h-screen bg-[#161915] text-white">
      <LandingHeader />

      <main>
        <section className="relative flex h-[100svh] min-h-[100svh] items-center overflow-hidden">
          <div className="absolute inset-0">
            <HeroAnimation2Background variant="subtle" />
          </div>

          <LandingRevealGroup className="relative z-10 h-[100svh] min-h-[100svh] w-full" threshold={0.2}>
            <div
              className={`${mediaPageShellClassName} relative flex h-[100svh] min-h-[100svh] w-full flex-col items-start justify-center gap-0 py-[var(--landing-hero-padding-y)]`}
            >
              <div className="w-full lg:mr-auto lg:max-w-[var(--landing-hero-copy-width)]" data-animate style={revealStyle(900, 30)}>
                <h1
                  className={
                    isZh
                      ? `${headingFontClass} mt-5 max-w-full text-center font-bold leading-[1.02] tracking-[-0.03em] text-transparent`
                      : `${headingFontClass} mt-5 max-w-full text-center font-bold leading-[1.02] tracking-[-0.04em] text-transparent`
                  }
                  style={{
                    fontSize: isZh ? "var(--landing-type-hero-zh)" : "var(--landing-type-hero-en)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    backgroundImage:
                      "linear-gradient(101deg, rgb(255,255,255) 3%, rgb(217,178,122) 85%)",
                  }}
                >
                  {heroTitleLines.map((line, index) => (
                    <span key={`${line}-${index}`} className="block pb-[0.08em]" data-cms-field={`hero__titleLine${index + 1}`}>
                      {renderTitleAmpersands(line)}
                    </span>
                  ))}
                </h1>

                <div className="mt-6 flex w-full justify-center">
                  <div className="h-[2px] w-[12vw] rounded-full bg-[#d9b27a]" />
                </div>
              </div>

              <div
                className="relative mt-12 flex w-full max-w-[var(--landing-hero-mobile-art-width)] shrink-0 items-center justify-center lg:hidden"
                data-animate
                style={revealStyle(900, 30)}
              >
                <div className="absolute inset-x-[14%] top-[16%] h-[68%] rounded-full bg-[rgba(205,142,25,0.14)] blur-[90px]" />
                <img
                  src={heroImageSrc}
                  alt="Tiger Partners"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className="relative w-full object-contain drop-shadow-[0_40px_90px_rgba(0,0,0,0.45)]"
                  data-cms-field="hero__heroImage"
                />
              </div>
            </div>

            <div
              className="pointer-events-none absolute left-auto right-[5vw] top-0 hidden h-[100vh] w-max items-end justify-end lg:flex"
              data-animate
              style={revealStyle(900, 30)}
            >
              <div className="absolute inset-x-[10%] top-[14%] h-[72%] rounded-full bg-[rgba(205,142,25,0.14)] blur-[110px]" />
              <img
                src={heroImageSrc}
                alt="Tiger Partners"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="relative h-[100vh] w-auto max-w-none object-contain object-bottom drop-shadow-[0_40px_90px_rgba(0,0,0,0.45)]"
                data-cms-field="hero__heroImage"
              />
            </div>
          </LandingRevealGroup>
        </section>

        <section className="bg-[rgba(18,20,16,0.86)] py-20 md:py-28">
          <LandingRevealGroup className={mediaPageShellClassName} threshold={0.12}>
            <div
              className="flex w-full flex-wrap items-center justify-center gap-x-10 gap-y-8 py-8 md:flex-nowrap md:justify-between md:gap-x-8"
              data-animate
              style={revealStyle(760, 22)}
            >
              {platformItems.map((logo) => (
                <a
                  key={logo.label}
                  href={logo.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${logo.label}`}
                  className="transition-opacity duration-200 hover:opacity-80 md:shrink-0"
                  data-cms-field={logo.cmsItemId ? pageContentItemFieldKey("platforms", logo.cmsItemId, "href") : undefined}
                >
                  <img
                    src={logo.src}
                    alt={logo.label}
                    className="h-[2.125rem] w-auto max-w-full object-contain md:h-[2.375rem] xl:h-[2.6875rem]"
                    data-cms-field={logo.cmsItemId ? pageContentItemFieldKey("platforms", logo.cmsItemId, "icon") : undefined}
                  />
                </a>
              ))}
            </div>
          </LandingRevealGroup>
        </section>

        <section className="bg-[#161915] py-20 md:py-28">
          <div className={mediaPageShellClassName}>
            <div className="flex justify-center">
              <img
                src={introLogoImage}
                alt="Tiger Partners Insights logo"
                className="h-auto w-[24rem] object-contain md:w-[28rem]"
                data-cms-field="intro__logoImage"
              />
            </div>

            <div className="mt-12 w-full rounded-[2rem] border border-[rgba(217,178,122,0.32)] bg-[linear-gradient(180deg,rgba(34,37,31,0.94)_0%,rgba(24,27,23,0.98)_100%)] px-5 py-5 shadow-[0_26px_72px_rgba(0,0,0,0.3)] md:px-8 md:py-7">
              <div className="flow-root">
                <img
                  src={introCoverImage}
                  alt="Tiger Partners Insights cover"
                  loading="lazy"
                  decoding="async"
                  className="mx-auto mb-5 h-auto w-[10.5rem] rounded-[0.8rem] object-contain shadow-[0_14px_32px_rgba(0,0,0,0.28)] md:float-left md:mr-7 md:mb-3 md:ml-0 md:mt-1 md:w-[11rem]"
                  data-cms-field="intro__coverImage"
                />
                <div className="space-y-5">
                  {introParagraphs.map((paragraph, paragraphIndex) => (
                    <p
                      key={paragraphIndex}
                      className={`${bodyFontClass} text-[clamp(1.3rem,1.48vw,1.46rem)] leading-[1.78] text-[#d8d5cf]`}
                      style={{ textAlign: "justify" }}
                      data-cms-field={paragraphIndex === 0 ? "intro__body" : "intro__body2"}
                    >
                      {renderNormalAmpersands(paragraph)}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-14 w-full overflow-hidden rounded-[1.8rem] border border-[rgba(217,178,122,0.18)] bg-[rgba(10,12,10,0.78)] shadow-[0_26px_72px_rgba(0,0,0,0.28)]">
              <video
                src={publicAssetSrc(introVideoSrc, podcastPortrait)}
                autoPlay
                muted
                loop
                playsInline
                controls
                preload="metadata"
                className="block h-auto w-full"
                data-cms-field="intro__videoSrc"
              />
            </div>
          </div>
        </section>

        <section className="bg-[rgba(14,16,14,0.72)] py-20 md:py-28">
          <LandingRevealGroup
            className={`${mediaPageShellClassName} grid items-start gap-12 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:gap-14`}
            threshold={0.12}
          >
            <div data-animate style={revealStyle(720, 22)}>
              <h2 className={`${headingFontClass} text-[clamp(2rem,4vw,4rem)] font-semibold  leading-[1.02] text-[#d9b27a]`}>
                <span data-cms-field="special__title">{renderTitleAmpersands(specialTitle)}</span>
              </h2>
              <div className="mt-5 h-px w-[50%] min-w-[8rem] bg-[#d9b27a]" />
              <p
                className={`${bodyFontClass} mt-8 max-w-[30rem] text-[clamp(1rem,1.18vw,1.12rem)] leading-[1.86] text-[#d7d4ce]`}
                style={{ textAlign: "justify" }}
              >
                <span data-cms-field="special__body">{renderNormalAmpersands(specialBody)}</span>
              </p>
            </div>

            <div className="space-y-6" data-animate style={revealStyle(820, 26)}>
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={showPreviousSpecialSlide}
                  aria-label="Previous special edition slide"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(217,178,122,0.24)] text-[#d9b27a] transition hover:border-[#d9b27a] hover:bg-[rgba(217,178,122,0.08)]"
                >
                  {"<"}
                </button>
                <button
                  type="button"
                  onClick={showNextSpecialSlide}
                  aria-label="Next special edition slide"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(217,178,122,0.24)] text-[#d9b27a] transition hover:border-[#d9b27a] hover:bg-[rgba(217,178,122,0.08)]"
                >
                  {">"}
                </button>
              </div>

              <div className="overflow-hidden rounded-[1.8rem] border border-[rgba(217,178,122,0.46)] shadow-[0_22px_58px_rgba(0,0,0,0.28)]">
                <img
                  src={currentSpecialSlide.src}
                  alt={isZh ? currentSpecialSlide.altZh : currentSpecialSlide.altEn}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full object-cover"
                  data-cms-field={
                    currentSpecialSlide.cmsItemId
                      ? pageContentItemFieldKey("special", currentSpecialSlide.cmsItemId, "image")
                      : undefined
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {specialSlides.map((slide, index) => (
                    <button
                      key={`${slide.src}-${index}`}
                      type="button"
                      onClick={() => setActiveSpecialSlide(index)}
                      aria-label={`Go to special edition slide ${index + 1}`}
                      className={`h-[0.625rem] rounded-full transition ${
                        index === activeSpecialSlide ? "w-[2rem] bg-[#d9b27a]" : "w-[0.625rem] bg-[rgba(217,178,122,0.28)]"
                      }`}
                    />
                  ))}
                </div>
                <a
                  href={specialViewMoreHref || currentSpecialSlide.href || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className={`${headingFontClass} inline-block border-b border-[#6B8E4E] pb-1 text-[0.92rem] font-semibold  tracking-[0.06em] text-[#efede9] transition hover:text-[#d9b27a]`}
                  data-cms-field="special__viewMoreHref"
                >
                  <span data-cms-field="special__viewMoreLabel">{renderNormalAmpersands(specialViewMoreLabel)}</span>
                </a>
              </div>
            </div>
          </LandingRevealGroup>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
