import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { PageTriangle } from "@/components/shared/PageTriangle";

export const events = [
  {
    slug: "kinsey-kang-hong-kong-legal-counsel",
    category: "Tiger Dynamics",
    title: "Kinsey Kang Yanan was engaged as Hong Kong Legal Counsel of Tiger Partners",
    date: "Nov 17. 2023",
    summary:
      "Tiger Partners is honored to announce that Kinsey Kang Yanan, barrister-at-law, has been engaged as our Hong Kong Legal Counsel.",
    image: "/assets/prototypes/events/card.png",
  },
  {
    slug: "world-arbitration-update-2024",
    category: "Arbitration",
    title: "Tiger Partners sponsored the World Arbitration Update 2024 China Edition",
    date: "May 18. 2024",
    summary:
      "The program gathered dispute resolution practitioners and business leaders to exchange views on international arbitration practice.",
    image: "/assets/prototypes/events/card.png",
  },
  {
    slug: "alb-china-firms-to-watch",
    category: "Recognition",
    title: "Tiger Partners was selected in the ALB China Firms to Watch list",
    date: "Jan 22. 2024",
    summary:
      "The selection reflects the firm's growing profile and sustained focus on complex commercial litigation and arbitration.",
    image: "/assets/prototypes/events/card.png",
  },
  {
    slug: "private-client-roundtable",
    category: "Roundtable",
    title: "Tiger Partners hosted a private client roundtable on dispute strategy",
    date: "Sep 06. 2023",
    summary:
      "The roundtable focused on early case assessment, enforcement planning, and practical risk control for corporate clients.",
    image: "/assets/prototypes/events/card.png",
  },
  {
    slug: "commercial-dispute-resolution-trends",
    category: "Insight",
    title: "Tiger Partners shared updates on commercial dispute resolution trends",
    date: "Jul 28. 2023",
    summary:
      "The team summarized recent developments in litigation strategy, arbitration procedure, and cross-border enforcement.",
    image: "/assets/prototypes/events/card.png",
  },
  {
    slug: "cross-border-enforcement-practice",
    category: "Practice",
    title: "Tiger Partners discussed cross-border enforcement practice with corporate clients",
    date: "Jun 16. 2023",
    summary: "The session focused on evidence planning, asset tracing, preservation and enforcement strategy.",
    image: "/assets/prototypes/events/card.png",
  },
  {
    slug: "arbitration-procedure-seminar",
    category: "Seminar",
    title: "Tiger Partners joined a seminar on arbitration procedure and advocacy",
    date: "Apr 12. 2023",
    summary: "The team shared practical observations on procedural strategy and tribunal communication.",
    image: "/assets/prototypes/events/card.png",
  },
  {
    slug: "complex-commercial-litigation-update",
    category: "Update",
    title: "Tiger Partners released a briefing on complex commercial litigation updates",
    date: "Mar 08. 2023",
    summary: "The briefing reviewed recent court decisions and their implications for corporate dispute strategy.",
    image: "/assets/prototypes/events/card.png",
  },
  {
    slug: "young-lawyers-training",
    category: "Training",
    title: "Tiger Partners held an internal training session for young dispute lawyers",
    date: "Feb 20. 2023",
    summary: "The training covered case theory building, witness preparation and written advocacy standards.",
    image: "/assets/prototypes/events/card.png",
  },
];

function EventCard({
  slug,
  category,
  title,
  date,
  image,
}: {
  slug: string;
  category: string;
  title: string;
  date: string;
  image: string;
}) {
  return (
    <Link href={`/events/${slug}`} className="group relative block min-w-0 pt-[22%]">
      <div className="relative flex h-full flex-col bg-[#5a5955] shadow-[0_8px_20px_rgba(0,0,0,0.25)] transition-colors duration-700 hover:bg-[#5f5e5a]">
        <div className="pointer-events-none absolute bottom-0 right-0 h-[6%] w-1/2 bg-white/10 [clip-path:polygon(100%_0,100%_100%,0_100%)]" />
        <div className="absolute -left-[3.3%] -top-[3.3%] aspect-[4/3] w-[90%] overflow-hidden bg-[#0a0a0a]">
          <ImageWithFallback
            src={image}
            alt={title}
            className="absolute inset-0 size-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105"
          />
        </div>
        <div className="relative z-20 flex flex-1 flex-col px-6 pb-8 pt-[calc(54%+6rem)]">
          <div className="mb-6 flex items-center justify-between gap-6 text-[clamp(1.1rem,1.45vw,1.75rem)] font-light tracking-[0.02em] text-[#d8d8d8]">
            <span>{date}</span>
            <ArrowRight className="size-[clamp(2rem,3vw,3.75rem)] shrink-0 text-[#d9b27a] transition-transform duration-500 group-hover:translate-x-2" strokeWidth={1.5} />
          </div>
          <h2 className="text-[clamp(0.945rem,1.47vw,1.785rem)] font-semibold leading-snug tracking-[0.02em] text-white transition-colors duration-500 group-hover:text-[#f1e8dc]">
            <span className="italic text-[#d1ceca]">{category}</span>
            <span className="font-light text-[#d1ceca]"> | </span>
            {title}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export function EventsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#171717] text-white">
      <PageTriangle
        className="right-0 top-[calc(100svh+18rem)] h-[calc(100%-100svh-18rem)] w-full opacity-50"
      />
      <section className="relative min-h-[100svh] overflow-hidden bg-[#171717]">
        <SiteHeader active="EVENTS" />
        <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-5 pt-[var(--header-height)] text-center md:px-[8rem]">
          <div className="flex min-h-[40svh] w-full flex-col items-center justify-center bg-gradient-to-br from-[#56524a] to-[#212121] px-[var(--shell-sm)] md:px-[var(--shell-md)]">
            <h1 className="text-center text-[clamp(3.5rem,8vw,7.5rem)] leading-none text-[#d9b27a]">Events</h1>
            <p className="mt-6 max-w-[42rem] text-center text-pretty capitalize leading-relaxed text-[#cfd5df]/80 text-[clamp(1rem,1.3vw,1.5rem)]">
              Welcome your attention to our real-time dynamics and industry news
            </p>
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="absolute inset-0 bg-[linear-gradient(225deg,rgba(39,39,39,0.42)_0%,rgba(23,23,23,0)_60%)]" />
        <div className="relative mx-5 py-16 md:mx-[6rem] lg:py-24">
          <div className="grid grid-cols-1 gap-x-24 gap-y-16 md:grid-cols-2 xl:grid-cols-3">
            {events.map((event) => (
              <EventCard
                key={event.slug}
                slug={event.slug}
                category={event.category}
                title={event.title}
                date={event.date}
                image={event.image}
              />
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <a href="#" className="border-b-2 border-[#e1ab5c] px-4 pb-1 text-xl font-semibold text-[#e1ab5c] transition hover:opacity-80">
              See More
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
