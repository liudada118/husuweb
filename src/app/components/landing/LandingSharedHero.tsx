"use client";

import { type CSSProperties } from "react";
import { renderNormalAmpersands, renderTitleAmpersands } from "../renderNormalAmpersands";
import { HeroAnimation2Background } from "./HeroAnimation2Background";
import { LandingRevealGroup } from "./LandingRevealGroup";
import { imageSrc, landingContentShellClassName } from "./shared";

type HeroAsset = string | { src: string };

type LandingSharedHeroProps = {
  cmsFields?: {
    image?: string;
    signature?: string;
    titleLines?: readonly string[];
  };
  image: HeroAsset;
  imageAlt: string;
  titleLines?: readonly string[];
  signature?: string;
  centered?: boolean;
  desktopImageContainerClassName?: string;
  desktopImageContainerStyle?: CSSProperties;
  desktopImageStyle?: CSSProperties;
  underlineWidth?: string;
};

const defaultTitleLines = ["RELENTLESS IN", "ADVOCACY, STRATEGIC", "BY DESIGN."] as const;
const defaultSignature = "TIGER PARTNERS";

function revealStyle(durationMs = 700, y = 24): CSSProperties {
  return {
    opacity: 0,
    transform: `translateY(${y}px)`,
    transition: `opacity ${durationMs / 1000}s ease, transform ${durationMs / 1000}s ease`,
  };
}

export function LandingSharedHero({
  cmsFields,
  image,
  imageAlt,
  titleLines = defaultTitleLines,
  signature = defaultSignature,
  centered = false,
  desktopImageContainerClassName,
  desktopImageContainerStyle,
  desktopImageStyle,
  underlineWidth,
}: LandingSharedHeroProps) {
  const hasSignature = signature.trim().length > 0;
  const titleAlignmentClassName = centered ? "text-center" : "text-left";
  const signatureAlignmentClassName = centered ? "justify-center" : "justify-end";
  const copyWrapperClassName = centered
    ? "w-full lg:mr-auto lg:max-w-[var(--landing-hero-copy-width)]"
    : "w-full lg:max-w-[var(--landing-hero-copy-width)]";

  return (
    <section className="relative flex h-[100svh] min-h-[100svh] items-center overflow-hidden">
      <div className="absolute inset-0">
        <HeroAnimation2Background variant="subtle" />
      </div>

      <LandingRevealGroup className="relative z-10 h-[100svh] min-h-[100svh] w-full" threshold={0.2}>
        <div
          className={`${landingContentShellClassName} relative flex h-[100svh] min-h-[100svh] w-full flex-col items-start justify-center gap-0 py-[var(--landing-hero-padding-y)]`}
        >
          <div className={copyWrapperClassName} data-animate style={revealStyle(900, 30)}>
            <h1
              className={`mt-5 max-w-full ${titleAlignmentClassName} pb-[0.12em] font-['Akshar'] font-bold  leading-[1.04] tracking-[-0.04em] text-transparent`}
              style={{
                fontSize: "var(--landing-type-hero-en)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                backgroundImage:
                  "linear-gradient(101deg, rgb(255,255,255) 3%, rgb(217,178,122) 85%)",
              }}
            >
              {titleLines.map((line, index) => (
                <span key={`${line}-${index}`} className="block" data-cms-field={cmsFields?.titleLines?.[index]}>
                  {renderTitleAmpersands(line)}
                </span>
              ))}
            </h1>

            {underlineWidth ? (
              <div className="mt-6 flex w-full justify-center">
                <div className="h-[2px] rounded-full bg-[#d9b27a]" style={{ width: underlineWidth }} />
              </div>
            ) : null}

            {hasSignature ? (
              <div className={`mt-8 flex w-full min-w-0 items-center ${signatureAlignmentClassName} gap-3`}>
                <div className="h-px w-8 bg-[#8b8f8a]" />
                <span
                  className="min-w-0 text-right font-['Abel'] tracking-[0.12em] text-[#b9b9b9]"
                  style={{ fontSize: "var(--landing-type-signature)" }}
                  data-cms-field={cmsFields?.signature}
                >
                  {renderNormalAmpersands(signature)}
                </span>
              </div>
            ) : null}
          </div>

          <div
            className="relative mt-12 flex w-full max-w-[var(--landing-hero-mobile-art-width)] shrink-0 items-center justify-center lg:hidden"
            data-animate
            style={revealStyle(900, 30)}
          >
            <div className="absolute inset-x-[14%] top-[16%] h-[68%] rounded-full bg-[rgba(205,142,25,0.14)] blur-[90px]" />
            <img
              src={imageSrc(image)}
              alt={imageAlt}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="relative w-full object-contain drop-shadow-[0_40px_90px_rgba(0,0,0,0.45)]"
              data-cms-field={cmsFields?.image}
            />
          </div>
        </div>

        <div
          className={`pointer-events-none absolute left-auto top-0 hidden h-[100vh] w-max items-end justify-end right-[5vw] lg:flex ${desktopImageContainerClassName ?? ""}`}
          data-animate
          style={{ ...revealStyle(900, 30), ...desktopImageContainerStyle }}
        >
          <div className="absolute inset-x-[10%] top-[14%] h-[72%] rounded-full bg-[rgba(205,142,25,0.14)] blur-[110px]" />
          <img
            src={imageSrc(image)}
            alt={imageAlt}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="relative h-[100vh] w-auto max-w-none object-contain object-bottom drop-shadow-[0_40px_90px_rgba(0,0,0,0.45)]"
            style={desktopImageStyle}
            data-cms-field={cmsFields?.image}
          />
        </div>
      </LandingRevealGroup>
    </section>
  );
}
