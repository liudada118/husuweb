import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { VisionCard } from "@/components/sections/about/Vision";

export function AboutHero() {
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: "calc(100svh + 36rem)" }}>
      <ImageWithFallback
        src="https://images.unsplash.com/photo-1662647326416-7f7bc8f86eef?w=1920&q=80"
        alt="building"
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#171717]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
      <div className="relative z-10 min-h-[calc(100svh+36rem)]">
        <div className="absolute left-[var(--shell-md)] right-[var(--shell-md)] top-[55svh] border-l-[0.3rem] border-[#d9b27a] pl-8">
          <h1
            className="text-[#1b1b1b]"
            style={{
              fontWeight: 700,
              fontSize: "clamp(3rem, 6.5vw, 6rem)",
              letterSpacing: "0.04em",
              textShadow: "0 0 1px rgba(0,0,0,0.4)",
              lineHeight: 1,
            }}
          >
            About us
          </h1>
          <p
            className="mt-8 max-w-[74rem] text-balance text-[#1b1b1b]"
            style={{
              fontWeight: 600,
              fontSize: "clamp(1.25rem, 2.2vw, 2.25rem)",
              lineHeight: 1.4,
            }}
          >
            Tiger crouching in a mountain remote feels the wind roar
            <br />
            Dragon awaits the tide to rise, when lying on a shallow shoal
          </p>
        </div>
        <VisionCard className="absolute left-[1.25rem] right-[1.25rem] top-[90svh] md:left-[5rem] md:right-[5rem]" />
      </div>
    </section>
  );
}
