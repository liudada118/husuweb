import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Trophy, Mic, Star, ChevronDown } from "lucide-react";

const GRADIENT = "linear-gradient(120deg, #D4C254 0%, #6B8E4E 100%)";
const FONT = "'Akshar', sans-serif";

const gradientStyle: React.CSSProperties = {
  background: GRADIENT,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

export interface HeroSectionProps {
  label: string;
  titleLine1: string;
  titleLine2: string;
  desc: string;
}

const AWARD_CARDS = [
  {
    platform: "China Business Law Journal",
    iconType: "trophy" as const,
    title: "Official Recognition\n& Inclusion",
    year: "2020",
    accentColor: "#D4C254",
  },
  {
    platform: "Bilibili · 哔哩哔哩",
    iconType: "star" as const,
    title: "2025 Knowledge Content\nCreator of the Year",
    year: "2025",
    accentColor: "#8BC34A",
  },
  {
    platform: "Xiaoyuzhou Podcast",
    iconType: "mic" as const,
    title: "Tiger Legal Talks\n30K Subscribers Plaque",
    year: "2025",
    accentColor: "#6B8E4E",
  },
];

function CardIcon({ type, color }: { type: "trophy" | "star" | "mic"; color: string }) {
  if (type === "trophy") return <Trophy size={15} color={color} />;
  if (type === "star") return <Star size={15} color={color} />;
  return <Mic size={15} color={color} />;
}

function AwardRevealCard({
  card,
  isCenter,
}: {
  card: (typeof AWARD_CARDS)[0];
  isCenter?: boolean;
}) {
  return (
    <div
      style={{
        width: "360px",
        height: "240px",
        background: isCenter ? "#1E2420" : "#191C18",
        border: isCenter
          ? "1px solid rgba(180,200,80,0.22)"
          : "1px solid rgba(255,255,255,0.07)",
        borderRadius: "20px",
        padding: "28px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        fontFamily: FONT,
        position: "relative",
        overflow: "hidden",
        boxShadow: isCenter
          ? "0 0 60px rgba(107,142,78,0.16), 0 28px 64px rgba(0,0,0,0.6)"
          : "0 20px 48px rgba(0,0,0,0.45)",
      }}
    >
      {/* Gradient top accent line — center card only */}
      {isCenter && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "14%",
            right: "14%",
            height: "1.5px",
            backgroundImage: GRADIENT,
            borderRadius: "0 0 4px 4px",
          }}
        />
      )}

      {/* Background radial glow */}
      <div
        style={{
          position: "absolute",
          bottom: -30,
          right: -30,
          width: "130px",
          height: "130px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${card.accentColor}0A 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Platform badge row */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "9px",
            background: `${card.accentColor}16`,
            border: `1px solid ${card.accentColor}2C`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <CardIcon type={card.iconType} color={card.accentColor} />
        </div>
        <span
          style={{
            color: "rgba(255,255,255,0.38)",
            fontSize: "10px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            fontFamily: FONT,
            lineHeight: 1.4,
          }}
        >
          {card.platform}
        </span>
      </div>

      {/* Thin divider */}
      <div style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} />

      {/* Award title */}
      <p
        style={{
          color: "#FFFFFF",
          fontSize: "17px",
          fontWeight: 600,
          lineHeight: 1.44,
          whiteSpace: "pre-line",
          fontFamily: FONT,
          flex: 1,
        }}
      >
        {card.title}
      </p>

      {/* Year badge */}
      <div>
        <span
          style={{
            background: `${card.accentColor}12`,
            border: `1px solid ${card.accentColor}24`,
            borderRadius: "6px",
            padding: "3px 11px",
            color: card.accentColor,
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.12em",
            fontFamily: FONT,
          }}
        >
          {card.year}
        </span>
      </div>
    </div>
  );
}

export function HeroSection({ label, titleLine1, titleLine2, desc }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /* ── Title animations ── */
  const titleOpacity = useTransform(scrollYProgress, [0, 0.09], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.09], [72, 0]);

  /* ── Description + divider ── */
  const descOpacity = useTransform(scrollYProgress, [0.07, 0.2], [0, 1]);
  const descY = useTransform(scrollYProgress, [0.07, 0.2], [32, 0]);

  /* ── Card fan: stacked → spread ── */
  // Card 1 (left)
  const card1X = useTransform(scrollYProgress, [0.22, 0.84], [0, -540]);
  const card1RotateY = useTransform(scrollYProgress, [0.22, 0.84], [0, 24]);
  const card1RotateZ = useTransform(scrollYProgress, [0.22, 0.84], [-4, -3]);
  const card1Opacity = useTransform(scrollYProgress, [0.17, 0.30], [0, 0.85]);

  // Card 2 (center — comes forward)
  const card2Scale = useTransform(scrollYProgress, [0.22, 0.84], [0.86, 1.07]);
  const card2Y = useTransform(scrollYProgress, [0.22, 0.84], [28, -22]);
  const card2Opacity = useTransform(scrollYProgress, [0.14, 0.27], [0, 1]);

  // Card 3 (right)
  const card3X = useTransform(scrollYProgress, [0.22, 0.84], [0, 540]);
  const card3RotateY = useTransform(scrollYProgress, [0.22, 0.84], [0, -24]);
  const card3RotateZ = useTransform(scrollYProgress, [0.22, 0.84], [4, 3]);
  const card3Opacity = useTransform(scrollYProgress, [0.17, 0.30], [0, 0.85]);

  /* ── Ambient glow ── */
  const glowOpacity = useTransform(scrollYProgress, [0.18, 0.68], [0, 1]);

  /* ── Scroll hint ── */
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.07], [1, 0]);

  return (
    <section
      ref={containerRef}
      style={{ height: "300vh", background: "#161915", fontFamily: FONT }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "80px", // account for fixed header
        }}
      >
        {/* ── Ambient glow ── */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            opacity: glowOpacity,
            background:
              "radial-gradient(ellipse 100% 70% at 50% 72%, rgba(107,142,78,0.11) 0%, rgba(180,200,80,0.055) 45%, transparent 72%)",
            pointerEvents: "none",
          }}
        />

        {/* ── Subtle grid overlay ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.014) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.014) 1px, transparent 1px)",
            backgroundSize: "90px 90px",
            maskImage:
              "radial-gradient(ellipse at 50% 28%, black 5%, transparent 68%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 50% 28%, black 5%, transparent 68%)",
            pointerEvents: "none",
          }}
        />

        {/* ── Main content ── */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {/* Title block */}
          <motion.div style={{ opacity: titleOpacity, y: titleY }}>
            <span
              style={{
                ...gradientStyle,
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "28px",
              }}
            >
              {label}
            </span>
            <h1
              style={{
                color: "#FFFFFF",
                fontSize: "clamp(50px, 6vw, 96px)",
                fontWeight: 700,
                letterSpacing: "0.025em",
                lineHeight: 1.07,
                textTransform: "uppercase",
                fontFamily: FONT,
              }}
            >
              {titleLine1}
              <br />
              <span style={gradientStyle}>{titleLine2}</span>
            </h1>
          </motion.div>

          {/* Description + divider */}
          <motion.div
            style={{
              opacity: descOpacity,
              y: descY,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "68px",
                height: "2px",
                backgroundImage: GRADIENT,
                borderRadius: "2px",
                margin: "36px 0 28px",
              }}
            />
            <p
              style={{
                color: "rgba(255,255,255,0.50)",
                fontSize: "17px",
                lineHeight: 1.78,
                maxWidth: "520px",
                fontFamily: FONT,
              }}
            >
              {desc}
            </p>
          </motion.div>

          {/* ── 3D Card Fan ── */}
          <div
            style={{
              marginTop: "60px",
              perspective: "1600px",
              perspectiveOrigin: "50% 38%",
            }}
          >
            {/*
              Cards start stacked at center (x=0).
              On scroll they fan out: left card slides left + rotates back,
              center card comes forward (scale up + float up),
              right card slides right + rotates back.
            */}
            <div
              style={{
                position: "relative",
                width: "360px",
                height: "240px",
              }}
            >
              {/* Card 1 — left */}
              <motion.div
                style={{
                  x: card1X,
                  rotateY: card1RotateY,
                  rotateZ: card1RotateZ,
                  opacity: card1Opacity,
                  position: "absolute",
                  inset: 0,
                  zIndex: 1,
                  transformStyle: "preserve-3d",
                }}
              >
                <AwardRevealCard card={AWARD_CARDS[0]} />
              </motion.div>

              {/* Card 2 — center (always on top) */}
              <motion.div
                style={{
                  scale: card2Scale,
                  y: card2Y,
                  opacity: card2Opacity,
                  position: "absolute",
                  inset: 0,
                  zIndex: 3,
                }}
              >
                <AwardRevealCard card={AWARD_CARDS[1]} isCenter />
              </motion.div>

              {/* Card 3 — right */}
              <motion.div
                style={{
                  x: card3X,
                  rotateY: card3RotateY,
                  rotateZ: card3RotateZ,
                  opacity: card3Opacity,
                  position: "absolute",
                  inset: 0,
                  zIndex: 2,
                  transformStyle: "preserve-3d",
                }}
              >
                <AwardRevealCard card={AWARD_CARDS[2]} />
              </motion.div>
            </div>
          </div>
        </div>

        {/* ── Scroll hint ── */}
        <motion.div
          style={{
            opacity: scrollHintOpacity,
            position: "absolute",
            bottom: "44px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              color: "rgba(255,255,255,0.26)",
              fontSize: "10px",
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              fontFamily: FONT,
            }}
          >
            Scroll to Explore
          </span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={17} color="rgba(255,255,255,0.26)" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
