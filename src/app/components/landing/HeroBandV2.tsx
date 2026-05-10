"use client";

import { memo } from "react";
import type { CSSProperties } from "react";

type HeroBandV2Props = {
  className?: string;
  style?: CSSProperties;
  color?: string;
  rotation?: number;
  speed?: number;
  scale?: number;
  frequency?: number;
  warpStrength?: number;
  noise?: number;
  bandWidth?: number;
  yOffset?: number;
  fadeTop?: number;
  mouseInfluence?: number;
  iterations?: number;
  intensity?: number;
  targetFps?: number;
  renderScale?: number;
};

function hexToRgb(hex: string) {
  const value = hex.replace("#", "").trim();
  const normalized =
    value.length === 3
      ? value
          .split("")
          .map((char) => `${char}${char}`)
          .join("")
      : value.padEnd(6, "0").slice(0, 6);

  const intValue = Number.parseInt(normalized, 16);
  return {
    r: (intValue >> 16) & 255,
    g: (intValue >> 8) & 255,
    b: intValue & 255,
  };
}

const HeroBandV2 = memo(function HeroBandV2({
  className = "",
  style,
  color = "#A855F7",
  rotation = 0,
  speed = 0.2,
  scale = 1,
  bandWidth = 1.4,
  yOffset = 0,
  intensity = 1,
}: HeroBandV2Props) {
  const rgb = hexToRgb(color);
  const duration = `${Math.max(6, 18 / Math.max(speed, 0.1))}s`;
  const opacity = Math.max(0, Math.min(1, intensity));
  const thickness = `${Math.max(14, Math.min(70, bandWidth * 30))}%`;
  const cssVars = {
    "--hero-band-rgb": `${rgb.r} ${rgb.g} ${rgb.b}`,
    "--hero-band-rotation": `${rotation}deg`,
    "--hero-band-duration": duration,
    "--hero-band-scale": scale,
    "--hero-band-thickness": thickness,
    "--hero-band-y": `${yOffset * 100}%`,
    "--hero-band-opacity": opacity,
  } as CSSProperties;

  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        ...style,
        ...cssVars,
      }}
    >
      <div className="hero-band-v2__glow" />
      <style jsx>{`
        div {
          position: relative;
          overflow: hidden;
          pointer-events: none;
          opacity: var(--hero-band-opacity);
        }

        .hero-band-v2__glow {
          position: absolute;
          inset: -35%;
          transform: translateY(var(--hero-band-y)) rotate(var(--hero-band-rotation)) scale(var(--hero-band-scale));
          background:
            radial-gradient(circle at 50% 50%, rgb(var(--hero-band-rgb) / 0.55), transparent 34%),
            linear-gradient(
              90deg,
              transparent 0%,
              rgb(var(--hero-band-rgb) / 0) calc(50% - var(--hero-band-thickness)),
              rgb(var(--hero-band-rgb) / 0.58) 50%,
              rgb(var(--hero-band-rgb) / 0) calc(50% + var(--hero-band-thickness)),
              transparent 100%
            );
          filter: blur(22px) saturate(1.15);
          animation: hero-band-v2-flow var(--hero-band-duration) ease-in-out infinite alternate;
        }

        @keyframes hero-band-v2-flow {
          from {
            transform: translate3d(-5%, var(--hero-band-y), 0) rotate(var(--hero-band-rotation)) scale(var(--hero-band-scale));
          }
          to {
            transform: translate3d(5%, var(--hero-band-y), 0) rotate(var(--hero-band-rotation)) scale(calc(var(--hero-band-scale) * 1.06));
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-band-v2__glow {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
});

export default HeroBandV2;
