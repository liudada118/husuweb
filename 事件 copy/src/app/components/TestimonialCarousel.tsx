import React, { useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import imageSrc from "../../imports/image.png";

const FONT = "'Akshar', sans-serif";
const GRADIENT = "linear-gradient(120deg, #D4C254 0%, #6B8E4E 100%)";

const gradientStyle: React.CSSProperties = {
  background: GRADIENT,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const CARDS_DATA = [
  {
    id: 0,
    title: "September 2020, China Business Law Journal officially included Tiger Partners.",
    organization: "The Daily Journal",
    details:
      "In September 2020, China Business Law Journal, a well-known legal media, officially included Tiger Partners — a testament to the firm's rising prominence in legal circles.",
  },
  {
    id: 1,
    title: "Recognized among the Top 100 Global Litigation Firms by leading legal authorities.",
    organization: "Global Legal Times",
    details:
      "Outstanding commitment to complex cross-border dispute resolution and strategic corporate legal counsel spanning multiple jurisdictions.",
  },
  {
    id: 2,
    title: "Awarded 'Law Firm of the Year' for excellence in digital media and public legal education.",
    organization: "Asian Legal Awards",
    details:
      "Pioneering the intersection of traditional legal practice with modern digital media outreach — creating a new standard for public legal education.",
  },
];

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () =>
    setCurrentIndex((prev) => (prev + 1) % CARDS_DATA.length);
  const handlePrev = () =>
    setCurrentIndex((prev) => (prev - 1 + CARDS_DATA.length) % CARDS_DATA.length);

  const getCardProps = (index: number) => {
    let diff = index - currentIndex;
    if (diff === 2) diff = -1;
    if (diff === -2) diff = 1;

    const isCenter = diff === 0;
    const isLeft = diff === -1;
    const isRight = diff === 1;

    let x = "0%";
    let scale = 1;
    let rotateY = 0;
    let opacity = 1;
    let zIndex = 30;
    let translateZ = 0;

    if (isLeft) {
      x = "-62%";
      scale = 0.78;
      rotateY = 18;
      opacity = 0.32;
      zIndex = 20;
      translateZ = -80;
    } else if (isRight) {
      x = "62%";
      scale = 0.78;
      rotateY = -18;
      opacity = 0.32;
      zIndex = 20;
      translateZ = -80;
    } else {
      translateZ = 40;
    }

    return { x, scale, rotateY, opacity, zIndex, translateZ, isCenter, isLeft, isRight };
  };

  return (
    <section
      style={{ background: "#161915", fontFamily: FONT }}
      className="py-36 overflow-hidden relative"
    >
      {/* ── Header region ── */}
      <div className="max-w-[1440px] mx-auto px-16">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-24 flex flex-col items-center"
        >
          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08, duration: 0.7, ease: "easeOut" }}
            style={{
              ...gradientStyle,
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "28px",
              fontFamily: FONT,
            }}
          >
            Media Recognition
          </motion.span>

          {/* Big headline with fade-through gradient */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: FONT }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight uppercase flex flex-col gap-0.5 items-center leading-none"
          >
            <span
              style={{
                background: "linear-gradient(to bottom, #4a7a55 0%, #161915 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              CHINA BUSINESS
            </span>
            <span
              style={{
                background: "linear-gradient(to bottom, #D4A93A 0%, #161915 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              LAW JOURNAL
            </span>
          </motion.h2>

          {/* Gradient divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
            style={{
              width: "64px",
              height: "2px",
              backgroundImage: GRADIENT,
              borderRadius: "2px",
              margin: "32px 0 24px",
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.36, duration: 0.7, ease: "easeOut" }}
            style={{ color: "rgba(255,255,255,0.52)", fontSize: "17px", lineHeight: 1.75, fontFamily: FONT }}
            className="max-w-xl"
          >
            Outstanding commitment to excellence in legal practice, public defense, and
            cross-border dispute resolution.
          </motion.p>
        </motion.div>

        {/* ── Carousel region ── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="relative w-full max-w-5xl mx-auto flex items-center justify-center"
            style={{ height: "480px", perspective: "1800px" }}
          >
            {CARDS_DATA.map((item, index) => {
              const {
                x,
                scale,
                rotateY,
                opacity,
                zIndex,
                translateZ,
                isCenter,
                isLeft,
                isRight,
              } = getCardProps(index);

              return (
                <motion.div
                  key={item.id}
                  animate={{ x, scale, rotateY, opacity, zIndex, translateZ }}
                  whileHover={
                    !isCenter
                      ? { opacity: 0.72, scale: scale * 1.03 }
                      : { scale: scale * 1.015 }
                  }
                  transition={{
                    duration: 0.65,
                    type: "spring",
                    bounce: 0.08,
                    damping: 22,
                    stiffness: 120,
                  }}
                  className="absolute w-full flex flex-col group cursor-pointer"
                  style={{
                    maxWidth: "460px",
                    height: "430px",
                    borderRadius: "24px",
                    background: isCenter ? "#111A13" : "#0E1510",
                    border: isCenter
                      ? "1px solid rgba(255,255,255,0.10)"
                      : "1px solid rgba(255,255,255,0.06)",
                    padding: "36px",
                    transformStyle: "preserve-3d",
                    boxShadow: isCenter
                      ? "0 -12px 48px rgba(217,178,122,0.14), 0 28px 60px rgba(0,0,0,0.6)"
                      : "0 20px 48px rgba(0,0,0,0.55)",
                  }}
                  onClick={() => {
                    if (isLeft) handlePrev();
                    if (isRight) handleNext();
                  }}
                >
                  {/* Gold top edge highlight — center only */}
                  {isCenter && (
                    <div
                      className="absolute top-0 left-0 right-0 rounded-t-[24px]"
                      style={{
                        height: "1.5px",
                        background:
                          "linear-gradient(90deg, transparent 0%, #D9B27A 35%, #E8C97A 50%, #D9B27A 65%, transparent 100%)",
                        opacity: 0.95,
                        boxShadow: "0 0 14px rgba(217,178,122,0.45)",
                      }}
                    />
                  )}

                  {/* Hover shimmer overlay */}
                  <div
                    className="absolute inset-0 rounded-[24px] pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                    style={{ background: "rgba(255,255,255,0.03)" }}
                  />

                  {/* Corner quote icon */}
                  <div
                    className="absolute top-8 right-8"
                    style={{ opacity: isCenter ? 0.18 : 0.08 }}
                  >
                    <Quote size={28} color={isCenter ? "#D9B27A" : "#FFFFFF"} />
                  </div>

                  {/* Card content */}
                  <div className="flex flex-col h-full">
                    {/* Title quote */}
                    <p
                      style={{
                        color: "#FFFFFF",
                        fontSize: "19px",
                        fontWeight: 600,
                        lineHeight: 1.55,
                        letterSpacing: "-0.01em",
                        fontFamily: FONT,
                        flex: 1,
                      }}
                    >
                      "{item.title}"
                    </p>

                    {/* Organization */}
                    <div className="mb-4 mt-4">
                      <span
                        style={{
                          color: "#D9B27A",
                          fontSize: "10px",
                          fontWeight: 600,
                          letterSpacing: "0.22em",
                          textTransform: "uppercase",
                          display: "block",
                          marginBottom: "5px",
                          fontFamily: FONT,
                        }}
                      >
                        Organization
                      </span>
                      <p
                        style={{
                          color: "rgba(255,255,255,0.55)",
                          fontSize: "14px",
                          fontFamily: FONT,
                        }}
                      >
                        {item.organization}
                      </p>
                    </div>

                    {/* Details */}
                    <div className="mb-6">
                      <span
                        style={{
                          color: "rgba(255,255,255,0.32)",
                          fontSize: "10px",
                          fontWeight: 600,
                          letterSpacing: "0.22em",
                          textTransform: "uppercase",
                          display: "block",
                          marginBottom: "5px",
                          fontFamily: FONT,
                        }}
                      >
                        Details
                      </span>
                      <p
                        style={{
                          color: "rgba(255,255,255,0.72)",
                          fontSize: "13px",
                          lineHeight: 1.68,
                          fontFamily: FONT,
                        }}
                        className="line-clamp-3"
                      >
                        {item.details}
                      </p>
                    </div>

                    {/* Footer: logo + label */}
                    <div
                      className="flex items-center justify-between mt-auto pt-5"
                      style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      <img
                        src={imageSrc}
                        alt="Award Logo"
                        className="h-10 w-auto object-contain brightness-0 invert opacity-50 mix-blend-screen"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                      <span
                        style={{
                          color: "rgba(255,255,255,0.18)",
                          fontSize: "9px",
                          letterSpacing: "0.20em",
                          textTransform: "uppercase",
                          fontFamily: FONT,
                          marginLeft: "auto",
                        }}
                      >
                        Official Inclusion
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ── Navigation ── */}
          <div className="flex justify-center items-center gap-10 mt-14">
            <motion.button
              whileHover={{ scale: 1.08, borderColor: "rgba(217,178,122,0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrev}
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.10)",
                background: "#142016",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(255,255,255,0.45)",
                cursor: "pointer",
                transition: "color 0.25s, box-shadow 0.25s",
                fontFamily: FONT,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "#FFFFFF";
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 0 18px rgba(217,178,122,0.12)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color =
                  "rgba(255,255,255,0.45)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
              }}
            >
              <ChevronLeft size={24} />
            </motion.button>

            {/* Dot indicators */}
            <div className="flex gap-3 items-center">
              {CARDS_DATA.map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  animate={{
                    width: currentIndex === idx ? 32 : 8,
                    background:
                      currentIndex === idx
                        ? "#D9B27A"
                        : "rgba(255,255,255,0.18)",
                  }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  style={{
                    height: "8px",
                    borderRadius: "4px",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    boxShadow:
                      currentIndex === idx
                        ? "0 0 10px rgba(217,178,122,0.55)"
                        : "none",
                  }}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.08, borderColor: "rgba(217,178,122,0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.10)",
                background: "#142016",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(255,255,255,0.45)",
                cursor: "pointer",
                transition: "color 0.25s, box-shadow 0.25s",
                fontFamily: FONT,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "#FFFFFF";
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 0 18px rgba(217,178,122,0.12)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color =
                  "rgba(255,255,255,0.45)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
              }}
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
