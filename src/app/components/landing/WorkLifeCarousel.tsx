"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import workLifeImage1 from "../../../assets/workandlife/0a575519339c4e1e8e30e16fcd10e29f.jpeg";
import workLifeImage2 from "../../../assets/workandlife/136f1ff4d2484f1ab28b7ab27c5ecec8.jpeg";
import workLifeImage3 from "../../../assets/workandlife/246a4c00fa854cdba2dc186950c9c823.jpeg";
import workLifeImage4 from "../../../assets/workandlife/2ea5b4c13df74888a6cf6b6d411a56a7.jpeg";
import workLifeImage5 from "../../../assets/workandlife/667abc64fe134af9a00caf7fe5f8de69.jpeg";
import workLifeImage6 from "../../../assets/workandlife/6ea3b67a9cd6494cbfbac49518c90085.jpeg";
import workLifeImage7 from "../../../assets/workandlife/eb680bb1cc504421bda802c5e9e349de.jpeg";
import workLifeImage8 from "../../../assets/workandlife/ec95ebd35030dd8f0cdd9eb3811db0702f5aae82.png";
import { renderTitleAmpersands } from "../renderNormalAmpersands";
import { imageSrc } from "./shared";

export const defaultWorkLifeSlides = [
  workLifeImage1,
  workLifeImage2,
  workLifeImage3,
  workLifeImage4,
  workLifeImage5,
  workLifeImage6,
  workLifeImage7,
  workLifeImage8,
].map((src, index) => ({
  id: `work-life-${index + 1}`,
  alt: `Work and life moment ${index + 1}`,
  cmsFields: undefined,
  src: imageSrc(src),
}));

type WorkLifeSlide = {
  alt: string;
  cmsFields?: {
    alt?: string;
    image?: string;
  };
  id: string;
  src: string;
};

function getWrappedIndex(index: number, length: number) {
  return (index + length) % length;
}

export function WorkLifeCarousel({
  slides = defaultWorkLifeSlides,
  title = "Work & Life",
  titleCmsField,
}: {
  slides?: WorkLifeSlide[];
  title?: string;
  titleCmsField?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const resolvedSlides = slides.length > 0 ? slides : defaultWorkLifeSlides;

  const previousIndex = getWrappedIndex(activeIndex - 1, resolvedSlides.length);
  const nextIndex = getWrappedIndex(activeIndex + 1, resolvedSlides.length);
  const visibleIndices = [previousIndex, activeIndex, nextIndex];
  const visibleSlides = visibleIndices.map((index) => ({
    index,
    slide: resolvedSlides[index],
  }));

  useEffect(() => {
    const autoplayTimer = window.setInterval(() => {
      setActiveIndex((currentIndex) => getWrappedIndex(currentIndex + 1, resolvedSlides.length));
    }, 3000);

    return () => {
      window.clearInterval(autoplayTimer);
    };
  }, [resolvedSlides.length]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <h3
          className="font-['Akshar'] text-[clamp(1.8rem,3vw,3rem)] font-semibold  leading-none text-white"
          data-cms-field={titleCmsField}
        >
          {renderTitleAmpersands(title)}
        </h3>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setActiveIndex(previousIndex)}
            aria-label="Previous work and life slide"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[rgba(10,13,11,0.52)] text-white transition-colors duration-300 hover:border-[#d9b27a] hover:text-[#d9b27a]"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setActiveIndex(nextIndex)}
            aria-label="Next work and life slide"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[rgba(10,13,11,0.52)] text-white transition-colors duration-300 hover:border-[#d9b27a] hover:text-[#d9b27a]"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="relative h-[clamp(18rem,42vw,33rem)] overflow-hidden">
        {visibleSlides.map(({ slide, index }) => {
          const isActive = index === activeIndex;
          const isPrevious = index === previousIndex;
          const isNext = index === nextIndex;

          let layoutClassName =
            "pointer-events-none opacity-0 scale-90 left-1/2 w-[12%] -translate-x-1/2";

          if (isPrevious) {
            layoutClassName =
              "left-0 w-[18%] translate-x-0 opacity-70 scale-[0.9] md:w-[16%]";
          } else if (isActive) {
            layoutClassName =
              "left-1/2 w-[70%] -translate-x-1/2 opacity-100 scale-100 z-20";
          } else if (isNext) {
            layoutClassName =
              "right-0 w-[18%] translate-x-0 opacity-70 scale-[0.9] md:w-[16%]";
          }

          return (
            <div
              key={slide.id}
              className={`absolute inset-y-0 overflow-hidden rounded-[28px] border border-white/10 bg-[#0d110e] shadow-[0_24px_80px_rgba(0,0,0,0.32)] transition-all duration-500 ease-out ${layoutClassName}`}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                loading="eager"
                decoding="async"
                fetchPriority={isActive ? "high" : "low"}
                className="h-full w-full object-cover object-center"
                data-cms-field={slide.cmsFields?.image}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,11,9,0.04)_0%,rgba(8,11,9,0.14)_50%,rgba(8,11,9,0.36)_100%)]" />
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-3">
        {resolvedSlides.map((slide, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to work and life slide ${index + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                isActive ? "w-10 bg-[#d9b27a]" : "w-2.5 bg-white/25 hover:bg-white/45"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
