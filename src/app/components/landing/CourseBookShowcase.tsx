"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

type CourseBookShowcaseProps = {
  primaryAlt: string;
  primaryCmsField?: string;
  primaryImage: string;
  secondaryAlt: string;
  secondaryCmsField?: string;
  secondaryImage: string;
};

const showcaseTransition = {
  duration: 0.95,
  ease: [0.22, 1, 0.36, 1] as const,
};

export function CourseBookShowcase({
  primaryAlt,
  primaryCmsField,
  primaryImage,
  secondaryAlt,
  secondaryCmsField,
  secondaryImage,
}: CourseBookShowcaseProps) {
  const [frontBook, setFrontBook] = useState<"primary" | "secondary">("primary");

  useEffect(() => {
    const swapTimer = window.setInterval(() => {
      setFrontBook((current) => (current === "primary" ? "secondary" : "primary"));
    }, 3200);

    return () => {
      window.clearInterval(swapTimer);
    };
  }, []);

  const books = [
    {
      alt: secondaryAlt,
      cmsField: secondaryCmsField,
      id: "secondary" as const,
      image: secondaryImage,
    },
    {
      alt: primaryAlt,
      cmsField: primaryCmsField,
      id: "primary" as const,
      image: primaryImage,
    },
  ];

  return (
    <div className="relative flex h-[20rem] items-center justify-center md:h-[26rem] lg:w-[16.8rem]">
      <div className="pointer-events-none absolute inset-x-[14%] top-[22%] h-[42%] rounded-full bg-[rgba(217,178,122,0.12)] blur-[32px]" />

      {books.map((book) => {
        const isFront = book.id === frontBook;

        return (
          <div key={book.id} className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{
                opacity: isFront ? 1 : 0.82,
                rotate: isFront ? 13 : 9,
                scale: isFront ? 1 : 0.92,
                x: isFront ? 22 : -34,
                y: isFront ? -4 : 18,
                zIndex: isFront ? 2 : 1,
              }}
              transition={showcaseTransition}
              className="w-[clamp(6rem,15vw,10.5rem)]"
              style={{
                filter: isFront ? "none" : "saturate(0.88) brightness(0.9)",
                transformOrigin: "center center",
              }}
            >
              <div
                className="overflow-hidden rounded-[0.65rem]"
                style={{
                  boxShadow: isFront
                    ? "0.25rem 0.3125rem 0.9375rem 0.125rem rgba(20,23,18,0.4)"
                    : "0.25rem 0.25rem 0.9375rem 0.25rem rgba(20,23,18,0.5)",
                }}
              >
                <img
                  src={book.image}
                  alt={book.alt}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full object-contain"
                  data-cms-field={book.cmsField}
                />
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
