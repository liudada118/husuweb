import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";

const coreValueAssets = "/assets/prototypes/core-value";

const valueImages = {
  hero: `${coreValueAssets}/e59638152d8ac77db9b565bfbadeeb0d328a2986.png`,
  tiger: `${coreValueAssets}/726388d359722eb98a4a4f64a9ad9635507e621f.png`,
  tangibleBenefits: `${coreValueAssets}/9163a166bb835a1e5108e675c20957a6c614ae5e.png`,
  handsOn: `${coreValueAssets}/79b78758f1da724528bc109f0187074b9d1f6340.png`,
};

function CoreValueHero() {
  return (
    <section className="relative h-[28rem] overflow-hidden md:h-[32rem] lg:h-[35rem]">
      <ImageWithFallback src={valueImages.hero} alt="" className="absolute inset-0 size-full object-cover opacity-60" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,18,18,0.7)_0%,rgba(23,23,23,0.95)_90%)]" />
      <div className="absolute inset-0 hidden bg-[linear-gradient(115deg,rgba(18,18,18,0.85)_0%,rgba(18,18,18,0.4)_60%,rgba(217,178,122,0.15)_100%)] lg:block" />

      <div className="site-shell relative z-10 flex h-full flex-col justify-center pt-[var(--header-height)]">
        <p className="text-sm font-light tracking-[0.04em] text-[#bec3cb] md:text-base">
          About us / CULTURE / <span className="font-medium text-white">Core Value</span>
        </p>
        <div className="mt-12 h-[3px] w-16 bg-[#d9b27a]" />
        <h1 className="mt-12 text-[clamp(3rem,7vw,6rem)] font-semibold leading-[0.9] text-[#d9b27a]">
          Core Value
        </h1>
      </div>
    </section>
  );
}

interface ValueSectionProps {
  number: string;
  title: string;
  body: ReactNode;
  image: string;
  imageOpacity?: number;
}

function ValueSection({ number, title, body, image, imageOpacity = 1 }: ValueSectionProps) {
  return (
    <section className="relative">
      <div className="site-shell py-12 lg:py-[4.5rem]">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_28rem] lg:gap-14">
          <div>
            <h2 className="text-[clamp(1.25rem,1.6vw,1.625rem)] font-semibold leading-normal tracking-[0.02em] text-[#d9b27a]">
              {number} {title}
            </h2>
            <div className="mt-8 text-justify text-[clamp(0.95rem,1.05vw,1.125rem)] leading-[1.75] tracking-[0.01em] text-[#d1d5dc]">
              {body}
            </div>
          </div>
          <div className="relative aspect-[662/543] w-full overflow-hidden">
            <ImageWithFallback
              src={image}
              alt=""
              className="absolute inset-0 size-full object-cover"
              style={{ opacity: imageOpacity }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function QuoteIcon({ flip }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 96 96"
      fill="none"
      className="size-14 shrink-0 lg:size-20"
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
      aria-hidden="true"
    >
      <path
        d="M30 30 C18 30 10 40 10 52 C10 64 18 74 30 74 L30 64 C24 64 20 58 20 52 C20 46 24 40 30 40 Z"
        stroke="#d9b27a"
        strokeOpacity="0.5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M62 30 C50 30 42 40 42 52 C42 64 50 74 62 74 L62 64 C56 64 52 58 52 52 C52 46 56 40 62 40 Z"
        stroke="#d9b27a"
        strokeOpacity="0.5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClosingStatement() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-[105rem] px-[var(--shell-sm)] py-20 md:px-[var(--shell-md)] lg:px-20 lg:py-28">
        <div className="flex items-start gap-4 lg:gap-8">
          <QuoteIcon />
          <p className="flex-1 text-center text-[clamp(1rem,1.4vw,1.5rem)] leading-[1.875] tracking-[0.02em] text-[#d1d5dc]">
            We believe that, in our dispute resolution practice, only by offering Partner&apos;s
            &quot;Hands-on&quot; approach could we provide the best service of our top capability and prime effort,
            just to secure our clients&apos; tangible interests to the greatest extent. And this is the only way
            for us to realize our professional dreams.
          </p>
          <QuoteIcon flip />
        </div>
      </div>
    </section>
  );
}

export function CoreValuePage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#171717] text-white">
      <SiteHeader active="ABOUT US" />
      <CoreValueHero />
      <ValueSection
        number="No.1"
        title="Our Spiritual Totem: Tiger"
        image={valueImages.tiger}
        imageOpacity={0.7}
        body={
          <>
            As quoted from an ancient Chinese book the Dragon Classic: &quot;Bi An is good at litigation&quot;.
            Bi An is a mythical creature in charge of litigation in Chinese mythology, which is also the
            seventh son of the Dragon. In the real world, it presents itself in the image of Tiger. Therefore,
            Tiger, powerful and solemn, appears on all Chinese cultural relics related to litigation. Tiger, as
            the king of the forest, is strong and powerful itself, but meanwhile it keeps itself invisible
            before taking a critical strike at its prey. We choose Tiger as our totem because we are just
            Tigers. We litigate, and we hunt like top predators.
          </>
        }
      />
      <ValueSection
        number="No.2"
        title="We focus on tangible benefits clients could get from our legal services"
        image={valueImages.tangibleBenefits}
        body={
          <>
            Dispute Resolution Legal Services are inherently different from non-litigation legal services. The
            result-oriented nature of the legal services makes the dispute resolution full of challenges. While
            emphasizing the quality of legal services itself, we place more attention on protecting tangible
            benefits of our clients in our cases. We believe that our value as dispute resolution lawyers would
            not be ultimately realized, when our clients&apos; ultimate interests are not realized.
          </>
        }
      />
      <ValueSection
        number="No.3"
        title={'The "Hands-on"'}
        image={valueImages.handsOn}
        body={
          <>
            <p>
              The result of a dispute resolution case could be as far removed as heaven from earth, that is
              because different lawyers handle a case in different ways during the whole process, from strategic
              planning at the beginning, to evidence collecting, trial presentation, and post-trial briefing,
              which attributes to the lawyer&apos;s personal legal foundation, presentation ability, working and
              social experience. But as the win or lose of a major and complicated case often rest with the
              judge&apos;s judgment just one remove from another, the lawyer who is actually handing the case
              plays a vital role in the ultimate outcome. Therefore, we guaranty our partners&apos; Hands-on
              throughout the process:
            </p>
            <ul className="mt-6 space-y-3 text-[#99a1af]">
              {[
                "Hands on communication directly with clients on substantial and procedural issues.",
                "Hands on evidence collecting and organization.",
                "Hands on drafting core legal documents.",
                "Hands on court presentations.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-[0.65em] block size-2 shrink-0 rounded-full bg-[#d9d9d9]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </>
        }
      />
      <ClosingStatement />
      <SiteFooter />
    </main>
  );
}
