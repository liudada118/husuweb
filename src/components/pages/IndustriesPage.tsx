import Link from "next/link";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { PageTriangle } from "@/components/shared/PageTriangle";

const cards = [
  { label: "PRIVATE EQUITY", slug: "private-equity" },
  { label: "FINANCE", slug: "finance" },
  { label: "REAL ESTATE", slug: "real-estate" },
  { label: "SPORTS AND E-SPORTS", slug: "sports-and-e-sports" },
  { label: "INTERNATIONAL TRADE", slug: "international-trade" },
  { label: "CYBER TECH AND GAME", slug: "cyber-tech-and-game" },
];

function IndustryCard({ label, slug, className }: { label: string; slug: string; className?: string }) {
  return (
    <Link
      href={`/industries/${slug}`}
      className={`group relative flex min-h-52 min-w-0 items-end justify-start overflow-hidden rounded bg-[#d9d9d9] p-[clamp(1.5rem,3vw,3.5rem)] ${className ?? ""}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#777] via-[#555] to-[#222] transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/5" />
      <div className="relative w-full">
        <h2 className="text-left text-[clamp(1.75rem,3.2vw,4rem)] font-medium uppercase tracking-[0.02em] text-white">
          {label}
        </h2>
        <span className="mt-4 block h-0.5 w-full bg-[#d9b27a]" />
      </div>
    </Link>
  );
}

export function IndustriesPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#171717] text-white">
      <PageTriangle
        className="right-0 top-[calc(56vw+5rem)] h-[calc(100%-56vw-5rem)] min-h-[80rem] w-full opacity-50"
      />
      <section className="relative min-h-[clamp(28rem,56vw,67.5rem)] w-full">
        <ImageWithFallback
          src="/assets/prototypes/industries/hero.png"
          alt=""
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(68,67,67,0.55)] mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#141414]/90" />
        <SiteHeader active="INDUSTRIES" />
        <div className="relative z-10 flex min-h-[clamp(28rem,56vw,67.5rem)] items-center justify-end px-[var(--shell-md)] pt-[var(--header-height)]">
          <h1 className="text-right text-[clamp(2.5rem,6.6vw,6rem)] font-medium uppercase tracking-[0.04em] text-white drop-shadow-lg">
            Industries
          </h1>
        </div>
      </section>

      <section className="relative">
        <div className="relative mx-[var(--shell-md)] -mt-32 rounded-lg px-[clamp(1.5rem,4vw,4rem)] py-[clamp(2rem,5vw,5.375rem)] text-white max-lg:-mt-20">
          <div
            className="absolute inset-0 z-0 rounded-lg"
            style={{ background: "linear-gradient(135deg, #464646 0%, #787269 100%)" }}
          />
          <span aria-hidden className="absolute left-4 top-2 z-10 select-none text-[clamp(3rem,5vw,6rem)] leading-none text-[#d9b27a]">
            「
          </span>
          <span aria-hidden className="absolute bottom-2 right-4 z-10 select-none text-[clamp(3rem,5vw,6rem)] leading-none text-[#d9b27a]">
            」
          </span>
          <p className="relative z-10 mx-auto max-w-[73rem] text-justify text-[clamp(1rem,1.5vw,1.75rem)] leading-relaxed tracking-[0.04em]">
            Tiger Partners plays a significant role in the dispute resolution business in various industries.
            And we are capable of offering targeted legal services in accordance with the industry
            characteristics, covering traditional disputes resolution, compliance, overlapping of civil and
            criminal, legal counselling for the corporation and so on.
          </p>
        </div>

        <div className="mx-5 mt-16 flex flex-col gap-[clamp(0.75rem,1.4vw,1.375rem)] lg:mx-[9rem]">
          <IndustryCard {...cards[0]} className="h-[clamp(10rem,16vw,18rem)]" />
          <div className="grid grid-cols-1 gap-[clamp(0.75rem,1.4vw,1.375rem)] lg:grid-cols-[2fr_1.5fr_1.5fr]">
            {cards.slice(1, 4).map((card) => (
              <IndustryCard key={card.label} {...card} className="h-[clamp(25rem,40vw,45rem)]" />
            ))}
          </div>
          <div className="grid grid-cols-1 gap-[clamp(0.75rem,1.4vw,1.375rem)] lg:grid-cols-2">
            {cards.slice(4).map((card) => (
              <IndustryCard key={card.label} {...card} className="h-[clamp(15rem,24vw,27rem)]" />
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
