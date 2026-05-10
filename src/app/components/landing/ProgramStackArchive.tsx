"use client";

import type { CSSProperties } from "react";
import { useLayoutEffect, useRef } from "react";
import rightArrowIcon from "../../../assets/right-arrow.svg";
import styles from "./program-stack-archive.module.css";
import { imageSrc } from "./shared";

type ProgramStackArchiveItem = {
  description: string;
  href?: string;
  image: string;
  tag: string;
  title: string;
};

type ProgramStackArchiveProps = {
  desktopWidth?: string;
  items: ProgramStackArchiveItem[];
};

function AnimatedWords({
  baseDelay,
  text,
}: {
  baseDelay: number;
  text: string;
}) {
  const words = text.trim().split(/\s+/);

  return (
    <>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className={styles.wordWrap}>
          <span
            className={styles.word}
            style={{ "--delay": `${baseDelay + index * 60}ms` } as CSSProperties}
          >
            {word}
          </span>
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}

// Archived snapshot of the homepage Program Representative stack before the
// switch to the shared schedule carousel.
export function ProgramStackArchive({ desktopWidth, items }: ProgramStackArchiveProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const heroRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  useLayoutEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const revealThreshold = 0.88;
    const revealedItems = new Set<number>();
    let frameId: number | null = null;
    let isNearViewport = true;

    heroRefs.current.forEach((hero) => hero?.classList.remove(styles.visible));

    const revealItem = (index: number) => {
      const hero = heroRefs.current[index];

      if (!hero || revealedItems.has(index)) {
        return;
      }

      hero.classList.add(styles.visible);
      revealedItems.add(index);
    };

    const updateStack = () => {
      const viewport = window.innerHeight;
      const rect = root.getBoundingClientRect();
      const stackTop = 0;
      const topOffset = Math.round(viewport * 0.2);
      const maxScroll = Math.max(root.offsetHeight - viewport, 0);
      const scrollTop = Math.min(Math.max(stackTop - rect.top, 0), maxScroll);
      const firstTag = root.querySelector("[data-stack-tag='true']") as HTMLElement | null;
      const tagHeight = firstTag?.offsetHeight || 36;
      const gap = tagHeight + 40;
      const startLift = viewport - stackTop + 140;

      itemRefs.current.forEach((item, index) => {
        if (!item) {
          return;
        }

        if (index === 0) {
          item.style.setProperty("--offset", `${topOffset}px`);
          item.style.setProperty("--z", `${10 + index}`);

          if (scrollTop > 0 || rect.top <= stackTop) {
            revealItem(index);
          }

          return;
        }

        const progress = Math.min(Math.max((scrollTop - (index - 1) * viewport) / viewport, 0), 1);
        const isLastItem = index === items.length - 1;
        const endOffset = isLastItem ? topOffset : topOffset + index * gap;
        const startOffset = startLift + index * gap;
        const offset = startOffset - (startOffset - endOffset) * progress;

        item.style.setProperty("--offset", `${offset}px`);
        item.style.setProperty("--z", `${10 + index}`);

        if (progress >= revealThreshold) {
          revealItem(index);
        }
      });
    };

    const scheduleUpdate = () => {
      if (!isNearViewport || frameId !== null) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = null;
        updateStack();
      });
    };

    let intersectionObserver: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          isNearViewport = entry?.isIntersecting ?? true;
          if (isNearViewport) {
            updateStack();
          }
        },
        { rootMargin: "25% 0px 25% 0px", threshold: 0 },
      );
      intersectionObserver.observe(root);
    }

    updateStack();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
      if (intersectionObserver) {
        intersectionObserver.disconnect();
      }
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [items.length]);

  return (
    <div
      ref={rootRef}
      className={styles.root}
      style={
        {
          "--stack-desktop-width": desktopWidth ?? "min(84vw, 75.625rem)",
          "--stack-length": `${Math.max(items.length + 1, 1)}`,
          "--stack-bottom-padding": `${items.length * 2.5}rem`,
        } as CSSProperties
      }
      aria-label="Program highlights"
    >
      <div className={styles.stack}>
        {items.map((item, index) => (
          <div
            key={item.title}
            ref={(element) => {
              itemRefs.current[index] = element;
            }}
            className={`${styles.stackItem} ${index === 0 ? styles.leadItem : ""}`}
            data-index={index}
            style={
              {
                "--offset": index === 0 ? "20vh" : "100vh",
                "--z": `${10 + index}`,
              } as CSSProperties
            }
          >
            <a
              ref={(element) => {
                heroRefs.current[index] = element;
              }}
              data-index={index}
              className={styles.hero}
              href={item.href}
              target={item.href ? "_blank" : undefined}
              rel={item.href ? "noreferrer" : undefined}
              aria-label={item.href ? `${item.title} external link` : undefined}
            >
              <div className={styles.heroMedia}>
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className={styles.heroImage}
                />
                <div className={styles.heroGlow} />
              </div>

              <div className={styles.heroContent}>
                <div className={styles.heroHeader}>
                  <div className={styles.tag} data-stack-tag={index === 0 ? "true" : undefined}>
                    <svg
                      viewBox="0 0 190 36"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                      className={styles.tagSvg}
                    >
                      <rect
                        x="1"
                        y="1"
                        width="188"
                        height="34"
                        rx="4"
                        ry="4"
                        className={styles.tagRect}
                      />
                    </svg>
                    <span className={styles.tagText}>{item.tag}</span>
                  </div>
                </div>

                <h3 className={styles.title}>{item.title}</h3>

                <p className={styles.copy}>
                  <span className={styles.reveal}>
                    <AnimatedWords baseDelay={260} text={item.description} />
                  </span>
                </p>
              </div>

              <img
                src={imageSrc(rightArrowIcon)}
                alt=""
                aria-hidden="true"
                className={styles.heroArrow}
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
