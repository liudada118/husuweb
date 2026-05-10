"use client";

import type { CSSProperties, ReactNode } from "react";
import { useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { renderNormalAmpersands, renderTitleAmpersands } from "../renderNormalAmpersands";
import { imageSrc } from "./shared";

const schedulePosterSrc = imageSrc("/uploads/cms-pages/source/Schedule.jpg");
const schedulePoster1Src = imageSrc("/uploads/cms-pages/source/Schedule1.jpg");
const schedulePoster2Src = imageSrc("/uploads/cms-pages/source/Schedule2.png");
const scheduleIconSrc = imageSrc("/uploads/cms-pages/source/Scheduleicon.png");
const scheduleIcon3Src = imageSrc("/uploads/cms-pages/source/Scheduleicon3.png");

const SCHEDULE_CARDS = [
  {
    id: 0,
    image: schedulePosterSrc,
    date: "2025.09.27",
    title: {
      en: "Recording for Variety Show The Boss Doesn't Know Me 路 Podcast Special",
      zh: "《老板不知道的我·播客场》综艺录制",
    },
    type: {
      en: "Featured Program",
      zh: "特别活动",
    },
  },
  {
    id: 1,
    image: schedulePoster1Src,
    date: "2025.10.23",
    title: {
      en: "This Is an Art: Decoding Practical Skills of Mainland Practitioners in Litigation and Arbitration",
      zh: "这是一门艺术：解码内地诉讼仲裁律师的实战技巧",
    },
    type: {
      en: "Law & Practice Talk",
      zh: "法律实务讲座",
    },
  },
  {
    id: 2,
    image: schedulePoster2Src,
    date: "2024.07.13",
    title: {
      en: "2024 Legal Professional Story Conference",
      zh: "2024法律人故事大会",
    },
    type: {
      en: "Conference Event",
      zh: "大会活动",
    },
  },
] as const;

export type CarouselCardItem = {
  buttonLabel?: string;
  cmsFields?: {
    buttonLabel?: string;
    description?: string;
    href?: string;
    image?: string;
    metaLeft?: string;
    metaRight?: string;
    title?: string;
  };
  description?: string;
  href?: string;
  id: number | string;
  image: string;
  metaLeft?: string;
  metaRight?: string;
  title: string;
};

type ScheduleCarouselSectionProps = {
  contentMaxWidthClassName?: string;
  description?: ReactNode;
  descriptionClassName?: string;
  descriptionStyle?: CSSProperties;
  imageFit?: "cover" | "contain";
  items?: CarouselCardItem[];
  sectionCmsField?: string;
  singleLineChineseText?: boolean;
  theme?: "default" | "homeProgram";
  title?: ReactNode;
  titleClassName?: string;
  titleCmsField?: string;
  titleIsEnglish?: boolean;
  titleStyle?: CSSProperties;
  descriptionCmsField?: string;
};

export function ScheduleCarouselSection({
  contentMaxWidthClassName = "max-w-4xl",
  description,
  descriptionClassName,
  descriptionStyle,
  imageFit = "cover",
  items,
  sectionCmsField,
  singleLineChineseText = false,
  theme = "default",
  title,
  titleClassName,
  titleCmsField,
  titleIsEnglish = false,
  titleStyle,
  descriptionCmsField,
}: ScheduleCarouselSectionProps) {
  const { language } = useLanguage();
  const isZh = language === "zh";
  const headingFontClass = "font-['Akshar']";
  const bodyFontClass = "font-['Abel']";
  const isHomeProgram = theme === "homeProgram";
  const shouldKeepChineseTitleOnOneLine = isHomeProgram && isZh && singleLineChineseText;
  const shouldKeepHomeProgramMetaOnOneLine = isHomeProgram && singleLineChineseText;
  const [currentIndex, setCurrentIndex] = useState(0);

  const carouselItems: CarouselCardItem[] =
    items ??
    SCHEDULE_CARDS.map((item) => ({
      buttonLabel: isZh ? "查看详情" : "View Details",
      id: item.id,
      image: item.image,
      metaLeft: item.date,
      metaRight: isZh ? item.type.zh : item.type.en,
      title: isZh ? item.title.zh : item.title.en,
    }));

  const resolvedTitle = title ?? (isZh ? "日程轮播" : "Schedule Carousel");
  const resolvedDescription =
    description ?? (isZh ? "近期活动安排与重要日程" : "Upcoming event schedules and important dates");

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
  const handlePrev = () =>
    setCurrentIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);

  const getCardProps = (index: number) => {
    const total = carouselItems.length;
    let diff = (index - currentIndex + total) % total;
    if (diff > total / 2) {
      diff -= total;
    }

    const isCenter = diff === 0;
    const isLeft = diff === -1;
    const isRight = diff === 1;
    const isHidden = !isCenter && !isLeft && !isRight;

    let x = "0%";
    let scale = 1;
    let rotateY = 0;
    let opacity = 1;
    let zIndex = 30;
    let translateZ = 0;

    if (isLeft) {
      x = "-62%";
      scale = 0.78;
      opacity = 0.32;
      zIndex = 20;
    } else if (isRight) {
      x = "62%";
      scale = 0.78;
      opacity = 0.32;
      zIndex = 20;
    } else if (isHidden) {
      scale = 0.64;
      opacity = 0;
      zIndex = 5;
    } else if (!isHomeProgram) {
      translateZ = 40;
    }

    return { x, scale, rotateY, opacity, zIndex, translateZ, isCenter, isLeft, isRight, isHidden };
  };

  return (
    <section
      className="relative overflow-hidden py-24 lg:py-36"
      style={{ backgroundColor: isHomeProgram ? "#121411" : "#000000" }}
      data-cms-field={sectionCmsField}
    >
      <div className="mx-auto max-w-[90rem] px-[var(--landing-shell-8)]">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className={`mx-auto mb-14 flex ${contentMaxWidthClassName} flex-col items-center text-center lg:mb-16`}
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className={
              titleClassName ??
              `${titleIsEnglish || !isZh ? "font-['Akshar'] " : headingFontClass} text-[clamp(2rem,4.4vw,4rem)] font-bold leading-[1] tracking-[-0.03em] text-[#d9b27a]`
            }
            style={titleStyle}
            data-cms-field={titleCmsField}
          >
            {typeof resolvedTitle === "string" ? renderTitleAmpersands(resolvedTitle) : resolvedTitle}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18, duration: 0.7, ease: "easeOut" }}
            className={
              descriptionClassName ??
              `${bodyFontClass} mt-5 max-w-[42rem] text-[clamp(1rem,1.18vw,1.14rem)] leading-[1.72] text-[rgba(255,255,255,0.72)]`
            }
            style={descriptionStyle}
            data-cms-field={descriptionCmsField}
          >
            {typeof resolvedDescription === "string" ? renderNormalAmpersands(resolvedDescription) : resolvedDescription}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mx-auto flex w-full max-w-[72rem] flex-col items-center">
            <div
              className="relative flex w-full items-center justify-center"
              style={{
                perspective: isHomeProgram ? "none" : "112.5rem",
                minHeight: "calc(var(--landing-carousel-stage-height) * 0.8)",
              }}
            >
              {carouselItems.map((item, index) => {
                const { x, scale, rotateY, opacity, zIndex, translateZ, isCenter, isLeft, isRight, isHidden } =
                  getCardProps(index);

                return (
                  <motion.div
                    key={item.id}
                    animate={{ x, scale, rotateY, opacity, zIndex, translateZ }}
                    whileHover={!isCenter ? { opacity: 0.72, scale: scale * 1.03 } : { scale: scale * 1.015 }}
                    transition={{
                      duration: 0.65,
                      type: "spring",
                      bounce: 0.08,
                      damping: 22,
                      stiffness: 120,
                    }}
                    className="absolute flex w-full cursor-pointer flex-col"
                    data-cms-field={item.cmsFields?.title}
                    style={{
                      maxWidth: "28.75rem",
                      minHeight: "27rem",
                      borderRadius: "1.5rem",
                      background: isHomeProgram
                        ? "linear-gradient(180deg, #D9B27A 0%, #434A41 100%)"
                        : isCenter
                          ? "#111A13"
                          : "#0E1510",
                      border: isHomeProgram
                        ? "none"
                        : isCenter
                          ? "1px solid rgba(255,255,255,0.10)"
                          : "1px solid rgba(255,255,255,0.06)",
                      padding: isHomeProgram ? "0.078125rem" : "1.125rem",
                      transformStyle: isHomeProgram || !isCenter ? "flat" : "preserve-3d",
                      boxShadow: isCenter
                        ? "0 -12px 48px rgba(217,178,122,0.14), 0 28px 60px rgba(0,0,0,0.6)"
                        : "0 20px 48px rgba(0,0,0,0.55)",
                    }}
                    onClick={() => {
                      if (isHidden) return;
                      if (isLeft) handlePrev();
                      if (isRight) handleNext();
                    }}
                  >
                    {isCenter && !isHomeProgram && (
                      <div
                        className="absolute left-0 right-0 top-0 rounded-t-[1.5rem]"
                        style={{
                          height: "0.09375rem",
                          background:
                            "linear-gradient(90deg, transparent 0%, #D9B27A 35%, #E8C97A 50%, #D9B27A 65%, transparent 100%)",
                          opacity: 0.95,
                          boxShadow: "0 0 14px rgba(217,178,122,0.45)",
                        }}
                      />
                    )}

                    <div
                      className="pointer-events-none absolute inset-0 rounded-[1.5rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ background: "rgba(255,255,255,0.03)" }}
                    />

                    <div className={`flex h-full flex-col rounded-[1.4375rem] bg-[#121411] ${isHomeProgram ? "px-[8%] py-[1.125rem]" : "p-[1.125rem]"}`}>
                      <div
                        className={`flex aspect-[16/10] items-center justify-center overflow-hidden rounded-[1rem] ${
                          isHomeProgram
                            ? ""
                            : "border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]"
                        }`}
                      >
                        <div className="flex h-full w-full items-center justify-center">
                          <div className={`overflow-hidden rounded-[0.875rem] ${isHomeProgram ? "h-full w-full" : "h-[85%] w-[85%]"}`}>
                          <img
                            src={item.image}
                            alt={item.title}
                            loading="lazy"
                            decoding="async"
                            className={`h-full w-full ${imageFit === "contain" ? "object-contain" : "object-cover"}`}
                            data-cms-field={item.cmsFields?.image}
                          />
                          </div>
                        </div>
                      </div>

                      <p
                        className={`${headingFontClass} mt-5 text-white ${
                          shouldKeepChineseTitleOnOneLine ? "whitespace-nowrap" : ""
                        } ${isZh && !shouldKeepChineseTitleOnOneLine ? "whitespace-normal [overflow-wrap:anywhere] [word-break:normal]" : ""}`}
                        style={{
                          fontSize: shouldKeepChineseTitleOnOneLine ? "clamp(1rem, 2vw, 1.375rem)" : "1.375rem",
                          fontWeight: 600,
                          lineHeight: isZh && !shouldKeepChineseTitleOnOneLine ? 1.16 : 1.08,
                          letterSpacing: "-0.01em",
                        }}
                        data-cms-field={item.cmsFields?.title}
                      >
                        {renderTitleAmpersands(item.title)}
                      </p>

                      <div
                        className={`grid gap-3 ${
                          shouldKeepHomeProgramMetaOnOneLine ? "grid-cols-[auto_minmax(0,1fr)] mt-4" : `grid-cols-2 ${isHomeProgram ? "mt-4" : "mt-5"}`
                        }`}
                      >
                        <div className="flex min-w-0 items-center gap-2 text-[#D9B27A]">
                          {item.metaLeft ? (
                            <img src={scheduleIconSrc} alt="" aria-hidden="true" className="h-[1rem] w-[1rem] object-contain opacity-90" />
                          ) : null}
                          <span className={`${bodyFontClass} whitespace-nowrap text-[1rem] leading-none text-[#D9B27A]`}>
                            <span data-cms-field={item.cmsFields?.metaLeft}>
                            {item.metaLeft ? renderNormalAmpersands(item.metaLeft) : null}
                            </span>
                          </span>
                        </div>

                        <div className="flex min-w-0 items-center justify-end gap-2">
                          {item.metaRight ? (
                            <span
                              className={`${bodyFontClass} min-w-0 text-right text-[1rem] leading-none text-[#D9B27A] ${
                                shouldKeepHomeProgramMetaOnOneLine ? "whitespace-nowrap" : ""
                              }`}
                              style={shouldKeepHomeProgramMetaOnOneLine ? { fontSize: "clamp(0.75rem, 1.35vw, 1rem)" } : undefined}
                            >
                              <span data-cms-field={item.cmsFields?.metaRight}>
                              {item.metaRight ? renderNormalAmpersands(item.metaRight) : null}
                              </span>
                            </span>
                          ) : null}
                        </div>
                      </div>

                      <div
                        className={`h-px w-full bg-[rgba(255,255,255,0.08)] ${
                          item.description ? "mt-5" : isHomeProgram ? "mt-4" : "mt-auto pt-5"
                        }`}
                      />

                      {item.description ? (
                        <p
                          className={`${bodyFontClass} mt-5 line-clamp-3 text-[0.9375rem] leading-[1.68] text-[rgba(255,255,255,0.72)]`}
                          data-cms-field={item.cmsFields?.description}
                        >
                          {renderNormalAmpersands(item.description)}
                        </p>
                      ) : null}

                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                            className={`flex h-[2.75rem] w-full items-center justify-center gap-2 rounded-full border border-[#D9B27A]/25 bg-[linear-gradient(90deg,#E6C48A_0%,#DDA321_100%)] text-black ${isHomeProgram ? "mt-4" : "mt-5"}`}
                          data-cms-field={item.cmsFields?.href}
                        >
                          <img src={scheduleIcon3Src} alt="" aria-hidden="true" className="h-[1rem] w-[1rem] object-contain" />
                          <span
                            className={`${bodyFontClass} text-[0.9375rem] font-semibold text-black`}
                            data-cms-field={item.cmsFields?.buttonLabel}
                          >
                            {renderNormalAmpersands(item.buttonLabel ?? (isZh ? "查看详情" : "View Details"))}
                          </span>
                        </a>
                      ) : (
                        <button
                          type="button"
                            className={`flex h-[2.75rem] w-full items-center justify-center gap-2 rounded-full border border-[#D9B27A]/25 bg-[linear-gradient(90deg,#E6C48A_0%,#DDA321_100%)] text-black ${isHomeProgram ? "mt-4" : "mt-5"}`}
                        >
                          <img src={scheduleIcon3Src} alt="" aria-hidden="true" className="h-[1rem] w-[1rem] object-contain" />
                          <span
                            className={`${bodyFontClass} text-[0.9375rem] font-semibold text-black`}
                            data-cms-field={item.cmsFields?.buttonLabel}
                          >
                            {renderNormalAmpersands(item.buttonLabel ?? (isZh ? "查看详情" : "View Details"))}
                          </span>
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-14 flex items-center justify-center gap-10">
              <motion.button
                whileHover={{ scale: 1.08, borderColor: "rgba(217,178,122,0.5)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrev}
                className="flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-full border border-[rgba(255,255,255,0.10)] bg-[#142016] text-[rgba(255,255,255,0.45)]"
              >
                <ChevronLeft className="h-6 w-6" />
              </motion.button>

              <div className="flex items-center gap-3">
                {carouselItems.map((_, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    animate={{
                      width: currentIndex === idx ? "2rem" : "0.5rem",
                      background: currentIndex === idx ? "#D9B27A" : "rgba(255,255,255,0.18)",
                    }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="h-[0.5rem] rounded-[0.25rem] border-none p-0"
                    style={{
                      boxShadow: currentIndex === idx ? "0 0 10px rgba(217,178,122,0.55)" : "none",
                    }}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.08, borderColor: "rgba(217,178,122,0.5)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                className="flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-full border border-[rgba(255,255,255,0.10)] bg-[#142016] text-[rgba(255,255,255,0.45)]"
              >
                <ChevronRight className="h-6 w-6" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
