import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

// ─── Images ──────────────────────────────────────────────────────────────────
const IMAGES = [
  "https://images.unsplash.com/photo-1744686909358-915e14866592?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWdhbCUyMHZpZGVvJTIwY29udGVudCUyMGNyZWF0b3IlMjBzdHVkaW98ZW58MXx8fHwxNzc1OTc2Mzk0fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1745848413113-4f39bdad5769?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2RjYXN0JTIwbWljcm9waG9uZSUyMHJlY29yZGluZyUyMGRhcmslMjBzdHVkaW98ZW58MXx8fHwxNzc1OTc2Mzk0fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1764162051487-1fa0cc2a18c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXZlJTIwc3RyZWFtJTIwcHJlc2VudGVyJTIwY2FtZXJhJTIwYnJvYWRjYXN0fGVufDF8fHx8MTc3NTk3NjM5NXww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1613211431746-aacbe481a84b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXd5ZXIlMjBrbm93bGVkZ2UlMjBwcmVzZW50YXRpb24lMjBzcGVha2luZ3xlbnwxfHx8fDE3NzU5NzYzOTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
];

// ─── Feature data ─────────────────────────────────────────────────────────────
const FEATURES = [
  {
    tag: "Bilibili Channel",
    title: "Knowledge Meets\nEngagement",
    desc: "We break down complex legal concepts into clear, compelling short-form videos. Our Bilibili channel has earned the Ten Thousand Followers Plaque and the prestigious 2025 Knowledge Content Creator of the Year award — proof that law can be both rigorous and riveting.",
    cta: "Explore Channel",
  },
  {
    tag: "Tiger Legal Talks",
    title: "Law Stories,\nBeautifully Told",
    desc: "Tiger Legal Talks is a podcast that brings real courtroom stories and legal insight straight to your earphones. With over thirty thousand subscribers on Xiaoyuzhou, it has become one of China's leading voices in public legal education.",
    cta: "Listen Now",
  },
  {
    tag: "Daxuange's Live Room",
    title: "Interactive Legal\nConversations",
    desc: "Stories from Daxuange's Live Room creates an open stage for real-time legal Q&A, case discussions and community dialogue. Raw, unscripted and honest — because justice deserves a human voice.",
    cta: "Watch Live",
  },
  {
    tag: "2025 Outstanding Lecturer",
    title: "Education Through\nExperience",
    desc: "Recognised as a 2025 Outstanding Lecturer of the Year, we bridge the gap between the law on paper and the law in life. Every lecture, every clip, every episode is crafted to empower ordinary people with extraordinary legal knowledge.",
    cta: "Learn More",
  },
];

// ─── Gradient accent ──────────────────────────────────────────────────────────
const GRADIENT = "linear-gradient(120deg, #D4C254 0%, #6B8E4E 100%)";
const FONT = "'Akshar', sans-serif";

export function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0 .. N-1

  const N = FEATURES.length;

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // How many vh we've scrolled into the container
      const scrolled = -rect.top;
      const p = scrolled / window.innerHeight;
      setProgress(Math.max(0, Math.min(N - 1 + 0.999, p)));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [N]);

  // Which feature block is active (for left-side highlight)
  const activeIndex = Math.min(Math.floor(progress), N - 1);

  return (
    <section
      style={{
        background: "#161915",
        fontFamily: FONT,
      }}
    >
      {/* ── Section intro ── */}
      <div
        style={{ maxWidth: "1440px", margin: "0 auto", padding: "112px 80px 72px" }}
      >
        <div className="flex flex-col gap-3">
          <span
            style={{
              background: GRADIENT,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontSize: "12px",
              letterSpacing: "0.25em",
              fontWeight: 500,
            }}
            className="uppercase"
          >
            Features
          </span>
          <h2
            style={{
              color: "#FFFFFF",
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
            }}
          >
            Transform Legal Understanding
            <br />
            Through Digital Innovation
          </h2>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "16px", marginTop: "8px", maxWidth: "520px", lineHeight: 1.7 }}>
            Four platforms. One mission — making law accessible, engaging and human.
          </p>
        </div>
        {/* progress bar row */}
        <div className="flex gap-2 mt-10">
          {FEATURES.map((_, i) => (
            <div
              key={i}
              style={{
                height: "2px",
                flex: 1,
                borderRadius: "2px",
                background: i <= activeIndex ? "url(#g) " + GRADIENT : "rgba(255,255,255,0.12)",
                backgroundImage: i <= activeIndex ? GRADIENT : undefined,
                transition: "background-image 0.4s",
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Scroll-driven main block ── */}
      <div
        ref={containerRef}
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "0 80px",
          display: "flex",
          gap: "48px",
          // Total height = N screens so sticky panel has room to work
          height: `${N * 100}vh`,
        }}
      >
        {/* LEFT: stacked full-height content blocks */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {FEATURES.map((f, i) => (
            <FeatureBlock
              key={i}
              feature={f}
              index={i}
              active={activeIndex === i}
            />
          ))}
        </div>

        {/* RIGHT: sticky image stack */}
        <div
          style={{
            width: "clamp(360px, 40%, 500px)",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              position: "sticky",
              top: 0,
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ImageStack progress={progress} />
          </div>
        </div>
      </div>

      {/* ── Bottom padding ── */}
      <div style={{ height: "96px" }} />
    </section>
  );
}

// ─── Feature Text Block ───────────────────────────────────────────────────────
function FeatureBlock({
  feature,
  index,
  active,
}: {
  feature: (typeof FEATURES)[number];
  index: number;
  active: boolean;
}) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingRight: "32px",
        paddingTop: "48px",
        paddingBottom: "48px",
        opacity: active ? 1 : 0.32,
        transform: active ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      {/* Tag */}
      <span
        style={{
          display: "inline-block",
          background: GRADIENT,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          fontSize: "11px",
          letterSpacing: "0.22em",
          fontWeight: 600,
          marginBottom: "20px",
          textTransform: "uppercase",
        }}
      >
        {String(index + 1).padStart(2, "0")} &nbsp;·&nbsp; {feature.tag}
      </span>

      {/* Title */}
      <h3
        style={{
          color: "#FFFFFF",
          fontSize: "clamp(28px, 3.2vw, 42px)",
          fontWeight: 700,
          lineHeight: 1.15,
          letterSpacing: "-0.01em",
          marginBottom: "24px",
          whiteSpace: "pre-line",
        }}
      >
        {feature.title}
      </h3>

      {/* Divider */}
      <div
        style={{
          width: "40px",
          height: "2px",
          backgroundImage: GRADIENT,
          borderRadius: "2px",
          marginBottom: "24px",
        }}
      />

      {/* Description */}
      <p
        style={{
          color: "rgba(255,255,255,0.70)",
          fontSize: "16px",
          lineHeight: 1.75,
          maxWidth: "480px",
          marginBottom: "36px",
          fontWeight: 400,
        }}
      >
        {feature.desc}
      </p>

      {/* CTA Button */}
      <div>
        <button
          style={{
            background: "#000000",
            color: "#FFFFFF",
            border: "1px solid #3A3A3A",
            borderRadius: "10px",
            padding: "12px 24px",
            fontSize: "15px",
            fontWeight: 500,
            fontFamily: FONT,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            letterSpacing: "0.02em",
            transition: "border-color 0.2s, background 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#6B8E4E";
            e.currentTarget.style.background = "#0d0d0d";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#3A3A3A";
            e.currentTarget.style.background = "#000000";
          }}
        >
          {feature.cta}
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}

// ─── Image Stack ──────────────────────────────────────────────────────────────
function ImageStack({ progress }: { progress: number }) {
  const N = IMAGES.length;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        // Tall enough to feel immersive, shorter than 100vh so it's centred
        height: "min(72vh, 640px)",
        borderRadius: "24px",
      }}
    >
      {IMAGES.map((src, i) => {
        // How much of this image has been clipped away from the bottom
        const clipFraction = Math.min(Math.max(progress - i, 0), 1);
        const clipBottomPct = clipFraction * 100;

        // Parallax: image i slides in from below as it's being revealed
        // revealed when progress goes from i-1 to i
        const revealFraction =
          i === 0 ? 1 : Math.min(Math.max(progress - (i - 1), 0), 1);
        const translateY = (1 - revealFraction) * 48;

        // z-index: first image on top
        const zIndex = N - i;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              inset: 0,
              zIndex,
              clipPath: `inset(0 0 ${clipBottomPct}% 0 round 24px)`,
              willChange: "clip-path, transform",
            }}
          >
            <img
              src={src}
              alt={FEATURES[i].tag}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "24px",
                display: "block",
                transform: `translateY(${translateY}px)`,
                willChange: "transform",
                transition: "transform 0.05s linear",
              }}
            />

            {/* Subtle gradient overlay at bottom of each image */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "24px",
                background:
                  "linear-gradient(to top, rgba(22,25,21,0.6) 0%, transparent 50%)",
                pointerEvents: "none",
              }}
            />

            {/* Feature label badge on image */}
            <div
              style={{
                position: "absolute",
                bottom: "20px",
                left: "20px",
                background: "rgba(0,0,0,0.55)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                padding: "8px 14px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundImage: GRADIENT,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  color: "rgba(255,255,255,0.85)",
                  fontSize: "12px",
                  fontFamily: FONT,
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                }}
              >
                {FEATURES[i].tag}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}