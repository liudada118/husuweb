import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { events } from "@/components/pages/EventsPage";

const detailImages = {
  first: "/assets/prototypes/event-detail/eb00e06a7abf4ba3d84f9c93380d52e3195ca702.png",
  second: "/assets/prototypes/event-detail/4de850f9ce30024823740a3ebd5711fd74ffc4a9.png",
};

const educationItems = [
  "Bachelor of Civil Law (BCL), University of Oxford",
  "Post-graduate Certificate in Laws (PCLL), City University of Hong Kong",
  "Bachelor of Laws with First Class Honours (LLB), City University of Hong Kong",
  "Main Social Position",
  "Member of Standing Committee on Mainland, Hong Kong Bar Association",
  "Vice-President of Hong Kong Legal Professional Advancement Association",
  "Guest Lecturer of City University of Hong Kong and Peking University",
  "Arbitrator of Nanjing Arbitration Commission",
  "Arbitrator of Dongguan Arbitration Commission",
  "Kinsey also served as Deputy Presiding Officer of the Hong Kong Labour Tribunal from June 2021 to January 2022.",
];

const academicItems = [
  "Practical Guidance for Personal Injury Claims (2015 LexisNexis)",
  "Annotated Ordinance--Mainland Judgments (Reciprocal Enforcement) Ordinance (2021 LexisNexis)",
];

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-5">
          <span className="mt-[0.95em] size-1.5 shrink-0 rounded-full bg-[#d9d9d9]" />
          <p className="flex-1 text-[clamp(1rem,1.2vw,1.4rem)] font-light leading-[1.7] tracking-[0.02em] text-[#99a1af]">
            {item}
          </p>
        </li>
      ))}
    </ul>
  );
}

export function EventDetailPage({ slug }: { slug: string }) {
  const event = events.find((item) => item.slug === slug) ?? events[0];

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#171717] text-white">
      <SiteHeader active="EVENTS" />

      <section className="relative w-full">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(50,50,50,0)_0%,#333_89%)] mix-blend-difference" />
        <div className="site-shell relative z-10 pb-12 pt-[calc(var(--header-height)+5rem)] lg:pb-14 lg:pt-[12rem]">
          <p className="flex flex-wrap items-center gap-2 text-[clamp(1rem,1.2vw,1.25rem)] font-light leading-relaxed tracking-[0.02em]">
            <Link href="/events" className="text-[#dedede] transition hover:text-[#d9b27a]">
              Events
            </Link>
            <ChevronRight className="size-4 text-[#bec3cb]" />
            <span className="font-medium text-white">{event.category} | {event.title}</span>
          </p>

          <h1 className="mt-16 max-w-[97rem] text-[clamp(2.25rem,4vw,3.5rem)] font-semibold leading-[1.2] tracking-[-0.01em] text-white">
            {event.category} | {event.title}
          </h1>

          <p className="mt-20 text-[clamp(1.15rem,1.5vw,1.5rem)] font-normal leading-relaxed tracking-[0.02em] text-[#d9b27a]">
            {event.date.replace(".", " ,")}
          </p>

          <div className="mt-14 h-px bg-[#d9b27a]" />
        </div>
      </section>

      <section className="site-shell">
        <div className="w-full overflow-hidden">
          <ImageWithFallback src={detailImages.first} alt="" className="h-auto w-full object-cover" />
        </div>
      </section>

      <section className="site-shell py-20">
        <div className="max-w-[91rem]">
          <p className="text-justify text-[clamp(1rem,1.2vw,1.4rem)] font-light italic leading-[1.7] tracking-[0.02em] text-[#d1d5dc]">
            Tiger Partners is honored to announce that Kinsey Kang Yanan, barrister-at-law, has been engaged
            as our Hong Kong Legal Counsel. From this day on, Tiger Partners will work with Kinsey wholeheartedly
            to provide our clients with more professional, efficient and convenient legal services.
          </p>

          <p className="mt-8 text-justify text-[clamp(1rem,1.2vw,1.4rem)] leading-[1.7] tracking-[0.02em] text-[#d1d5dc]">
            Kinsey was called to the Hong Kong Bar in 2012, and passed the 1st Guangdong - Hong Kong - Macau
            Greater Bay Area Legal Professional Examination in 2021. Kinsey specializes in commercial disputes,
            employment disputes, cross-border litigation and international arbitration. She also constantly
            provides Hong Kong legal advice to Mainland companies and individuals in cross-border transactions
            and arbitration.
          </p>

          <h2 className="mt-16 text-[clamp(1.25rem,1.5vw,1.5rem)] font-semibold leading-relaxed tracking-[0.02em] text-[#ededed]">
            Educational Background
          </h2>
          <BulletList items={educationItems} />

          <h2 className="mt-16 text-[clamp(1.25rem,1.5vw,1.5rem)] font-semibold leading-relaxed tracking-[0.02em] text-[#ededed]">
            Academic Achievements
          </h2>
          <BulletList items={academicItems} />

          <p className="mt-12 text-justify text-[clamp(1rem,1.2vw,1.4rem)] leading-[1.7] tracking-[0.02em] text-[#d1d5dc]">
            Having been engaged in the field of cross-border dispute resolution for years, Kinsey also has a
            strong sense of social responsibility and academic attainments. Her accession to the team will
            certainly inject fresh and abundant energy into Tiger Partners and greatly enhance the breadth and
            depth of services provided by Tiger Partners to our clients on cross-border dispute resolution.
          </p>
        </div>
      </section>

      <section className="site-shell pb-24">
        <div className="w-full overflow-hidden">
          <ImageWithFallback src={detailImages.second} alt="" className="h-auto w-full object-cover" />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
