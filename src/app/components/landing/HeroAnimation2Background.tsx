"use client";

import HeroBandV2 from "./HeroBandV2";

const accent = "#5e4f2d";

const heroBandVariants = {
  default: {
    bandWidth: 0.14,
    intensity: 1.18,
    mouseInfluence: 0.3,
    renderScale: 0.8,
    speed: 0.2,
    targetFps: 30,
  },
  subtle: {
    bandWidth: 0.16,
    intensity: 0.96,
    mouseInfluence: 0.16,
    renderScale: 0.68,
    speed: 0.16,
    targetFps: 24,
  },
};

type HeroAnimation2BackgroundProps = {
  variant?: keyof typeof heroBandVariants;
};

export function HeroAnimation2Background({ variant = "default" }: HeroAnimation2BackgroundProps) {
  const config = heroBandVariants[variant] ?? heroBandVariants.default;

  return (
    <div className="absolute inset-0 bg-[#120F17]">
      <HeroBandV2
        className="absolute inset-0"
        color={accent}
        speed={config.speed}
        frequency={1}
        noise={0.08}
        bandWidth={config.bandWidth}
        rotation={90}
        fadeTop={1.05}
        iterations={1}
        intensity={config.intensity}
        scale={1}
        warpStrength={1}
        yOffset={0.08}
        mouseInfluence={config.mouseInfluence}
        targetFps={config.targetFps}
        renderScale={config.renderScale}
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent via-[#120F17]/60 to-[#120F17]" />
    </div>
  );
}

export default HeroAnimation2Background;
