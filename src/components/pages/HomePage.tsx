"use client";

import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { PageTriangle } from "@/components/shared/PageTriangle";

const heroImg =
  "https://images.unsplash.com/photo-1761570255027-6c251f8fbc68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920";

const industries = [
  {
    name: "Private Equity",
    img: "https://images.unsplash.com/photo-1670383050616-682df7d57b22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    cls: "lg:col-span-2",
  },
  {
    name: "Finance",
    img: "https://images.unsplash.com/photo-1549421263-6064833b071b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    cls: "lg:col-span-1",
  },
  {
    name: "Real Estate",
    img: "https://images.unsplash.com/photo-1772723822700-5898b9f23abc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
    cls: "lg:col-span-1 lg:row-span-2",
  },
  {
    name: "Sports and E-Sports",
    img: "https://images.unsplash.com/photo-1667152657515-30103666082c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
    cls: "lg:col-span-1",
  },
  {
    name: "International Trade",
    img: "https://images.unsplash.com/photo-1759272548470-d0686d071036?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
    cls: "lg:col-span-1",
  },
  {
    name: "Cyber Tech and Game",
    img: "https://images.unsplash.com/photo-1585743876840-53866e12a598?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600",
    cls: "lg:col-span-2",
  },
];

const honorsByYear = [
  {
    year: "2026",
    title: "Benchmark Litigation Recognition",
    date: "2026-02",
    desc: "Tiger Partners continued to receive market attention for commercial disputes and cross-border contentious work.",
  },
  {
    year: "2025",
    title: "Dispute Resolution Firm",
    date: "2025-09",
    desc: "The firm was recognized for handling complex disputes with a practical, business-aware litigation strategy.",
  },
  {
    year: "2024",
    title: "Diamond Sponsor",
    date: "2024-11",
    desc: "Tiger Partners is favored and recognized by multiple authoritative legal directories and awarding organizations all over the world.",
  },
  {
    year: "2023",
    title: "Firms to Watch",
    date: "2023-12",
    desc: "The team was listed among firms to watch for its focused dispute resolution practice and growing market profile.",
  },
  {
    year: "2022",
    title: "Emerging Practice Award",
    date: "2022-08",
    desc: "Tiger Partners received recognition for its rapid development in commercial litigation and arbitration.",
  },
];

const events = [
  {
    title: "Tiger Dynamics | Kinsey Kang Yanan was engaged as Hong Kong Legal Counsel of Tiger Partners.",
    date: "Nov. 11, 2023",
    tag: "Tiger Dynamics",
    img: "https://images.unsplash.com/photo-1758600587839-56ba05596c69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    desc: "Tiger Partners is honored to announce that Kinsey Kang Yanan, barrister-at-law, has been engaged as our Hong Kong Legal Counsel.",
  },
  {
    title: "Tiger Partners sponsored the World Arbitration Update 2024 China Edition.",
    date: "May. 18, 2024",
    tag: "Arbitration",
    img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    desc: "The event brought together arbitration practitioners and business leaders to discuss practical updates in cross-border disputes.",
  },
  {
    title: "Tiger Partners was selected in the ALB China Firms to Watch list.",
    date: "Jan. 22, 2024",
    tag: "Recognition",
    img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    desc: "The selection reflects the firm's expanding profile and sustained focus on commercial litigation and dispute resolution.",
  },
  {
    title: "Tiger Partners hosted a private client roundtable on dispute strategy.",
    date: "Sep. 06, 2023",
    tag: "Roundtable",
    img: "https://images.unsplash.com/photo-1556761175-b413da4baf72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    desc: "The roundtable focused on early case assessment, enforcement planning, and practical risk control for corporate clients.",
  },
];

const pngLogoIndexes = new Set([5, 8, 10, 11, 14, 16, 18, 19, 22, 42]);

const clientLogos = Array.from({ length: 43 }, (_, index) => {
  const fileNumber = index + 1;
  const ext = pngLogoIndexes.has(fileNumber) ? "png" : "jpg";

  return `/assets/home/clientLogo/client-logo-${String(fileNumber).padStart(2, "0")}.${ext}`;
});

const logoRows = [
  clientLogos,
  [...clientLogos.slice(14), ...clientLogos.slice(0, 14)],
  [...clientLogos.slice(28), ...clientLogos.slice(0, 28)],
];

function mod(value: number, length: number) {
  return (value + length) % length;
}

export function HomePage() {
  const [activeHonor, setActiveHonor] = useState(2);
  const [activeEvent, setActiveEvent] = useState(0);
  const honor = honorsByYear[activeHonor];

  const updateEvent = (direction: -1 | 1) => {
    setActiveEvent((current) => mod(current + direction, events.length));
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#171717] text-white">
      <PageTriangle
        className="right-0 top-[calc(100svh+22rem)] h-[calc(100%-100svh-22rem)] w-full opacity-50"
      />
      <section className="relative w-full overflow-hidden bg-[#0d0d0d]">
        <div className="absolute inset-0">
          <ImageWithFallback src={heroImg} alt="" className="size-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-[#483f33]/70" />
          <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-b from-transparent to-[#171717]" />
        </div>

        <SiteHeader active="HOME" />

        <div className="relative z-10 flex min-h-[100svh] items-center justify-center px-5 py-32">
          <h1 className="max-w-none whitespace-nowrap text-center text-[clamp(1.265rem,4.004vw,4.092rem)] font-bold uppercase leading-none tracking-[0.06em] text-[#f9efe2]/90">
            we know how to win
          </h1>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#171717]">
        <div className="relative px-[2.5rem] py-20 lg:py-28">
          <div
            className="relative w-full overflow-hidden rounded-none border border-white/10 py-10 shadow-2xl shadow-black/30 lg:py-14 xl:flex xl:min-h-[32rem] xl:flex-col xl:justify-center"
            style={{
              background:
                "linear-gradient(to bottom right, rgb(36, 36, 36) 9%, #303033 28%, #403f3f 68%, #514c45 100%)",
              paddingLeft: "max(1.2rem, calc(var(--shell-md) - 1.3rem))",
              paddingRight: "max(1.2rem, calc(var(--shell-md) - 1.3rem))",
            }}
          >
            <div className="relative z-10 mb-7 h-1 w-12 bg-[#d9b27a]" />
            <p className="relative z-10 max-w-[84rem] text-[clamp(1.65rem,2.64vw,2.772rem)] font-bold capitalize leading-[1.45]">
              We are committed to be one of the extraordinary
              <br />
              dispute resolution law firms in the Asia Pacific
              <br />
              Region
            </p>
            <a
              href="/about"
              className="group relative z-10 mt-10 inline-flex w-max items-center gap-4 border border-white !bg-white px-9 py-4 text-xs font-semibold uppercase tracking-[0.2em] !text-[#09090b] transition-all duration-500 hover:!bg-transparent hover:!text-white"
            >
              GET TO KNOW US
              <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-2" strokeWidth={1.5} />
            </a>
            <div
              className="pointer-events-none absolute inset-y-0 hidden w-[clamp(5rem,11vw,10rem)] items-center justify-center xl:flex"
              style={{ right: "calc(var(--shell-md) - 2.5rem)" }}
            >
              <span className="rotate-[270deg] whitespace-nowrap text-[clamp(4.275rem,9vw,7.875rem)] font-semibold uppercase leading-none tracking-[-0.03em] text-[#d9b27a]/70">
                Vision
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="industries" className="site-shell bg-[#171717] py-20 lg:py-28">
        <div className="mb-12 flex flex-col gap-6 lg:mb-16">
          <h2 className="bg-gradient-to-r from-[#f6ebe4] to-[#d9b27a] bg-clip-text text-[clamp(2.5rem,5.4vw,5.4rem)] font-light leading-[0.95] text-transparent">
            INDUSTRIES <span className="font-semibold">&amp;</span>{" "}
            <span className="font-semibold">SERVICES</span>
          </h2>
          <p className="w-full text-pretty text-[calc(var(--type-body)*1.8)] italic leading-relaxed text-[#cfd5df]/80">
            Tiger Partners is capable of offering targeted legal services in accordance with the industry
            characteristics, covering traditional disputes resolution, compliance, matters involving both civil
            and criminal issues, legal consulting for corporation and etc.
          </p>
        </div>

        <div className="grid auto-rows-[18rem] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[20rem]">
          {industries.map((item) => (
            <a
              key={item.name}
              href="/industries"
              className={`group relative min-w-0 overflow-hidden bg-[#141414] shadow-xl transition-transform duration-500 hover:-translate-y-2 ${item.cls}`}
            >
              <div className="absolute left-0 top-0 z-20 h-[2px] w-full bg-gradient-to-r from-transparent via-[#f3dfb5] to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
              <ImageWithFallback
                src={item.img}
                alt={item.name}
                className="size-full object-cover opacity-60 grayscale transition-all duration-1000 group-hover:scale-110 group-hover:opacity-80 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-[#09090b]/55 transition-colors duration-700 group-hover:bg-[#09090b]/25" />
              <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10 bg-gradient-to-t from-[#101010] via-[#101010]/92 to-transparent p-7">
                <h3 className="flex items-center justify-between gap-5 text-balance text-[clamp(1.25rem,1.8vw,1.85rem)] font-light leading-tight">
                  {item.name}
                  <ArrowRight
                    className="size-5 shrink-0 -translate-x-4 text-[#d9b27a] opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"
                    strokeWidth={1.5}
                  />
                </h3>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="py-20 lg:py-28" style={{ background: "linear-gradient(170deg, #242424 9%, #383838 113%)" }}>
        <div className="site-shell">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[auto_1fr]">
            <h2 className="gold-title text-[clamp(3rem,7vw,6.5rem)] font-light leading-none">HONORS</h2>
            <div className="lg:text-right">
              <p className="text-pretty text-[clamp(1.54rem,1.848vw,2.156rem)] italic capitalize leading-relaxed text-[#cfd5df]/70">
                Tiger Partners is favored and recognized by multiple
                <br />
                authoritative legal directories and awarding organizations all
                <br />
                over the world
              </p>
              <div className="mt-6 flex items-center gap-3 lg:justify-end">
                <button
                  type="button"
                  onClick={() => setActiveHonor((current) => mod(current - 1, honorsByYear.length))}
                  className="flex size-11 items-center justify-center rounded-full border border-white/35 text-white/80 transition hover:scale-105 hover:border-[#d9b27a] hover:text-[#d9b27a]"
                  aria-label="Previous honor year"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveHonor((current) => mod(current + 1, honorsByYear.length))}
                  className="flex size-11 items-center justify-center rounded-full border border-white/35 text-white/80 transition hover:scale-105 hover:border-[#d9b27a] hover:text-[#d9b27a]"
                  aria-label="Next honor year"
                >
                  <ChevronRight className="size-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-5 gap-2">
            {honorsByYear.map((item, index) => {
              const active = index === activeHonor;
              return (
                <button
                  type="button"
                  key={item.year}
                  onClick={() => setActiveHonor(index)}
                  className={`flex h-11 items-center justify-center text-base transition ${
                    active ? "bg-[#d9b27a] font-bold text-black" : "bg-[#484643] text-black/80 opacity-70 hover:opacity-100"
                  }`}
                >
                  {item.year}
                </button>
              );
            })}
          </div>
          <div className="mt-4 h-[5px] w-full bg-black" />

          <div className="mt-4 border-b border-white/15 py-8 lg:py-10">
            <div className="grid grid-cols-1 gap-4 lg:items-center">
              <div className="flex min-w-0 flex-wrap items-center gap-6">
                <h3 className="text-[clamp(1.8rem,2.64vw,2.52rem)] font-semibold text-[#d9b27a]">
                  {honor.title}
                </h3>
                <div className="hidden h-7 w-px bg-[#d9b27a]/50 sm:block" />
                <span className="text-[clamp(1rem,1.4vw,1.4rem)] font-medium text-[#d9b27a]">
                  {honor.date}
                </span>
              </div>
            </div>
            <p className="mt-4 text-[calc(var(--type-body)*1.5)] capitalize leading-relaxed text-[#cfd5df]/70">
              {honor.desc}
            </p>
          </div>
        </div>
      </section>

      <section id="events" className="site-shell bg-[#171717] py-20 lg:py-28">
        <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-[auto_1fr]">
          <h2 className="text-[clamp(3.5rem,8vw,7.5rem)] leading-none">Events</h2>
          <p className="text-[clamp(1.3rem,1.56vw,1.82rem)] capitalize leading-snug tracking-[0.04em] text-[#cfd5df]/70 lg:text-right">
            Welcome your attention to our real-time
            <br />
            dynamics and industry news
          </p>
        </div>

        <div className="relative mx-auto mt-12 h-[44rem] max-w-[78rem] overflow-hidden sm:h-[48rem]">
          {events.map((event, index) => {
            const offset = mod(index - activeEvent, events.length);
            const position = offset === 0 ? "active" : offset === 1 ? "next" : offset === events.length - 1 ? "prev" : "hidden";
            const styles = {
              active: {
                left: "50%",
                opacity: 1,
                transform: "translateX(-50%) scale(1)",
                zIndex: 30,
              },
              prev: {
                left: "16%",
                opacity: 0.5,
                transform: "translateX(-50%) scale(0.82)",
                zIndex: 20,
              },
              next: {
                left: "84%",
                opacity: 0.5,
                transform: "translateX(-50%) scale(0.82)",
                zIndex: 20,
              },
              hidden: {
                left: "50%",
                opacity: 0,
                transform: "translateX(-50%) scale(0.7)",
                zIndex: 0,
              },
            }[position];

            return (
              <button
                type="button"
                key={event.title}
                onClick={() => {
                  if (position === "prev") updateEvent(-1);
                  if (position === "next") updateEvent(1);
                }}
                className={`absolute top-4 w-[78%] max-w-[44rem] cursor-pointer overflow-hidden rounded-none bg-gradient-to-br from-[#d9b27a] to-[#4e6651] p-px text-left shadow-2xl shadow-black/40 transition-all duration-700 ease-out sm:w-[64%] ${
                  position === "active" ? "hover:scale-[1.02]" : "hover:opacity-75"
                }`}
                style={styles}
                aria-label={event.title}
              >
                <div className="overflow-hidden bg-transparent">
                  <div className="relative aspect-[16/9] overflow-hidden bg-[#151515]">
                    <ImageWithFallback src={event.img} alt="" className="size-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                    <p className="absolute inset-x-0 bottom-0 p-5 text-[clamp(1rem,1.5vw,1.35rem)] font-semibold leading-snug text-white">
                      {event.title}
                    </p>
                  </div>
                  <div className="mt-8 bg-[#cecccc] px-6 py-6 text-[#2f2f2f] lg:px-8">
                    <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#6a5a45]">
                      <span>{event.date}</span>
                      <span className="h-1 w-1 rounded-full bg-[#6a5a45]" />
                      <span>{event.tag}</span>
                    </div>
                    <div className="my-4 h-px bg-black/15" />
                    <p className="text-sm leading-relaxed text-[#4a4a4a]">{event.desc}</p>
                    <span className="mt-6 inline-flex items-center gap-3 bg-gradient-to-r from-[#d9b27a] to-[#95703b] px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-black">
                      Read More
                      <ArrowRight className="size-4" />
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => updateEvent(-1)}
            className="flex size-12 items-center justify-center rounded-full border-2 border-white/50 opacity-70 transition hover:scale-105 hover:border-[#d9b27a] hover:opacity-100"
            aria-label="Previous event"
          >
            <ChevronLeft className="size-5" />
          </button>
          <div className="flex items-center gap-3">
            {events.map((event, index) => (
              <button
                type="button"
                key={event.date}
                onClick={() => setActiveEvent(index)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  index === activeEvent
                    ? "w-12 bg-[#d9b27a] shadow-[0_0_8px_rgba(217,178,122,0.5)]"
                    : "w-2 bg-white/25 hover:bg-white/50"
                }`}
                aria-label={`Show event ${index + 1}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => updateEvent(1)}
            className="flex size-12 items-center justify-center rounded-full border-2 border-[#d9b27a] transition hover:scale-105 hover:bg-[#d9b27a]/10"
            aria-label="Next event"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </section>

      <section className="overflow-hidden bg-[#202020] py-20 lg:py-28">
        <div className="w-full pl-[5rem] pr-[var(--shell-md)]">
          <h2 className="max-w-[62rem] text-balance text-[clamp(1.5rem,2.5vw,2.25rem)] font-medium uppercase leading-snug">
            Our clients are our most solid foundation, whose trust gives us enormous power and let us blaze our paths
          </h2>
        </div>

        <div className="relative mt-12 space-y-5">
          {logoRows.map((row, rowIndex) => (
            <div key={rowIndex} className="client-logo-row overflow-hidden">
              <div
                className={`client-logo-track flex w-max gap-5 ${rowIndex === 1 ? "client-logo-track-reverse" : ""}`}
                style={{ animationDuration: "135s" }}
              >
                {[...row, ...row].map((logo, index) => (
                  <div
                    key={`${logo}-${index}`}
                    className="flex h-24 w-44 shrink-0 items-center justify-center bg-[#f0f0f0] px-6 shadow-lg shadow-black/20 sm:h-28 sm:w-56"
                  >
                    <ImageWithFallback src={logo} alt="Client logo" className="max-h-[70%] max-w-full object-contain" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
