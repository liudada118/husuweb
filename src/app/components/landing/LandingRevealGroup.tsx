"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef } from "react";

type LandingRevealGroupProps = {
  children: ReactNode;
  className?: string;
  rootMargin?: string;
  staggerMs?: number;
  style?: CSSProperties;
  threshold?: number;
};

export function LandingRevealGroup({
  children,
  className,
  rootMargin = "0px 0px -5% 0px",
  staggerMs = 150,
  style,
  threshold = 0.1,
}: LandingRevealGroupProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const timers: number[] = [];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const children = entry.target.querySelectorAll<HTMLElement>("[data-animate]");

            children.forEach((child, index) => {
              const delay = Number(child.dataset.delay || index * staggerMs);
              const targetTransform = child.dataset.animateTransform || "translateY(0)";

              const timer = window.setTimeout(() => {
                child.style.opacity = "1";
                child.style.transform = targetTransform;
              }, delay);

              timers.push(timer);
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin, threshold },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [rootMargin, staggerMs, threshold]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
