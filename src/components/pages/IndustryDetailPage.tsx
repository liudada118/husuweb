import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";

export const industries = {
  "private-equity": {
    title: "Private Equity",
    intro:
      "Tiger Partners provides a full range of legal services to many well-known Chinese investment institutions, portfolio or invested companies, founders and shareholders, ranging from potential risk control, pre-litigation dispute resolution, litigation, arbitration and enforcement, to achieve their ultimate business goals.",
  },
  finance: {
    title: "Finance",
    intro:
      "Tiger Partners advises financial institutions, investors and market participants on complex financial disputes, asset recovery, enforcement and risk control matters.",
  },
  "real-estate": {
    title: "Real Estate",
    intro:
      "Tiger Partners handles major real estate, construction, commercial leasing and distressed asset disputes with industry-focused strategy and practical enforcement planning.",
  },
  "sports-and-e-sports": {
    title: "Sports and E-Sports",
    intro:
      "Tiger Partners supports sports, e-sports and entertainment clients in competition, sponsorship, club operation, platform and commercial dispute matters.",
  },
  "international-trade": {
    title: "International Trade",
    intro:
      "Tiger Partners provides dispute resolution and risk response services for cross-border trade, supply chain, contract performance and international sale of goods matters.",
  },
  "cyber-tech-and-game": {
    title: "Cyber Tech and Game",
    intro:
      "Tiger Partners works with technology, data, platform and digital entertainment clients on complex commercial disputes and compliance-related contentious matters.",
  },
} as const;

export type IndustrySlug = keyof typeof industries;

const defaultIndustry = industries["private-equity"];

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-4 text-[clamp(1rem,1.15vw,1.25rem)] font-light leading-[1.6] tracking-[0.02em] text-[#99a1af]">
      <span className="mt-[0.6em] inline-block size-2 shrink-0 rounded-full bg-[#d9d9d9]" />
      <span>{children}</span>
    </li>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="border border-white/[0.05] bg-[#1a1a1a] px-8 py-7 lg:px-10 lg:py-8">{children}</div>;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-[clamp(1rem,1.15vw,1.25rem)] font-normal leading-[1.5] tracking-[0.02em] text-[#e5e5e5]">{children}</h3>;
}

export function IndustryDetailPage({ slug }: { slug: string }) {
  const industry = industries[slug as IndustrySlug] ?? defaultIndustry;

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#171717] text-white">
      <SiteHeader active="INDUSTRIES" />

      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback src="/assets/prototypes/industries/hero.png" alt="" className="size-full object-cover" />
          <div className="absolute inset-0 bg-[rgba(68,67,67,0.5)] mix-blend-screen" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#171717]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(56,56,56,0)_30%,#171717_93%)]" />
        </div>

        <div
          className="pointer-events-none absolute bottom-0 left-0 h-[60%] w-[86.6%] opacity-70"
          style={{
            background: "linear-gradient(135deg, rgba(39,39,39,0) 0%, rgba(39,39,39,0.6) 100%)",
            clipPath: "polygon(0 100%, 100% 100%, 0 0)",
          }}
        />

        <div className="site-shell relative z-10 pb-12 pt-[calc(var(--header-height)+5rem)] lg:pb-14 lg:pt-[14rem]">
          <div className="mb-28 flex items-center gap-2 text-[clamp(1rem,1.2vw,1.25rem)] tracking-[0.02em]">
            <Link href="/industries" className="font-light text-[#bec3cb] transition hover:text-[#d9b27a]">
              Industries
            </Link>
            <ChevronRight className="size-4 text-[#bec3cb]" />
            <span className="text-white">{industry.title}</span>
          </div>

          <div className="flex flex-col items-start gap-8 lg:flex-row lg:gap-12">
            <div className="shrink-0 lg:w-[26rem]">
              <div className="mb-8 h-[3px] w-20 bg-[#d9b27a]" />
              <h1 className="text-[clamp(2.5rem,3.6vw,3.25rem)] font-semibold leading-[1.1] tracking-[-0.01em] text-[#d9b27a]">
                {industry.title}
              </h1>
            </div>
            <p className="max-w-[60rem] flex-1 text-justify text-[clamp(1rem,1.25vw,1.25rem)] leading-[1.8] tracking-[0.02em] text-[#d1d5dc]">
              {industry.intro}
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-[#171717]">
        <div className="site-shell">
          <div className="flex max-w-[70rem] flex-col gap-6 pb-32 lg:ml-[26rem] xl:ml-[28rem]">
            <p className="mb-4 text-[clamp(1rem,1.25vw,1.25rem)] leading-[1.8] tracking-[0.02em] text-[#d1d5dc]">
              In the event of investment, financing, cross-border transaction, industry operation or commercial
              dispute, Tiger Partners provides focused services across the full life cycle:
            </p>

            <Card>
              <SectionHeading>
                1. Analysis of potential legal exposures in contracts, transaction documents and business
                arrangements
              </SectionHeading>
            </Card>

            <Card>
              <SectionHeading>2. Pre-litigation dispute resolution services:</SectionHeading>
              <ul className="mt-6 flex flex-col gap-4">
                <Bullet>Drafting and sending notices, legal letters and negotiation documents on behalf of clients;</Bullet>
                <Bullet>Calculating the specific claimable amount and evaluating commercial recovery paths;</Bullet>
                <Bullet>Participating in negotiations and strategic settlement discussions;</Bullet>
                <Bullet>Drafting and assisting in signing settlement agreements and related transaction documents.</Bullet>
              </ul>
            </Card>

            <Card>
              <SectionHeading>3. On behalf of clients in litigation, arbitration and enforcement proceedings:</SectionHeading>
              <ul className="mt-6 flex flex-col gap-4">
                <Bullet>Initiating litigation or arbitration;</Bullet>
                <Bullet>Initiating pre-litigation preservation or preservation in litigation;</Bullet>
                <Bullet>Responding to claims or filing counterclaims;</Bullet>
                <Bullet>Initiating application for enforcement;</Bullet>
                <Bullet>Participating in negotiations for settlement or mediation.</Bullet>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
