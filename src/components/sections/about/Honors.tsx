"use client";

import { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";

type Award = { title: string; date: string; body: string };
type YearItem = { year: string; count: string; awards?: Award[] };

const data: YearItem[] = [
  {
    year: "2026",
    count: "2 Distinctions",
    awards: [
      {
        title: "January 2026, Chambers Greater China Region 2026, listed in Dispute Resolution (PRC Firms).",
        date: "2026-01",
        body: "In January 2026, Tiger Partners was listed in Dispute Resolution (PRC Firms) in the Chambers Greater China Region Guide 2026.",
      },
      {
        title: "March 2026, shortlisted for the ALB China Law Awards 2026 with two nominations.",
        date: "2026-03",
        body: "In March 2026, Tiger Partners has been shortlisted for the ALB China Law Awards 2026 with two nominations: Dispute Resolution Boutique Law Firm of the Year, Rising Law Firm of the Year.",
      },
    ],
  },
  { year: "2025", count: "2 Distinctions" },
  { year: "2024", count: "2 Distinctions" },
  { year: "2023", count: "2 Distinctions" },
  { year: "2022", count: "2 Distinctions" },
  { year: "2021", count: "2 Distinctions" },
  { year: "2020", count: "2 Distinctions" },
  { year: "2019", count: "2 Distinctions" },
];

function YearRow({ item, open, onToggle }: { item: YearItem; open: boolean; onToggle: () => void }) {
  const awards = item.awards ?? [
    {
      title: `${item.year} recognition and directory updates.`,
      date: item.year,
      body: "Tiger Partners continued to receive market recognition for its focused dispute resolution practice.",
    },
  ];

  return (
    <div
      className="overflow-hidden rounded-lg shadow-[0_1.25rem_1.5rem_-0.3rem_rgba(0,0,0,0.4)] transition-colors duration-500"
      style={{ background: "#363535" }}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-6 px-6 py-8 text-left md:px-12"
      >
        <div className="flex min-w-0 items-center gap-6 md:gap-8">
          <span
            className="shrink-0 text-[clamp(2.2rem,3.63vw,3.3rem)] leading-none tracking-[0.04em]"
            style={{ color: "#c1c1c1" }}
          >
            {item.year}
          </span>
          <div className="min-w-0 border-l-2 border-[#d9b27a] pl-5 md:pl-8">
            <div className="text-lg font-semibold text-[#d6a866] md:text-xl">Awards Won</div>
            <div className="mt-1 text-sm text-[#c1c1c1] md:text-base">
              {item.count}
            </div>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="hidden text-[1.225rem] font-semibold tracking-[0.07em] text-[#dea552] sm:inline">
            {open ? "Close Directory" : "View Directory"}
          </span>
          <span
            className={`flex size-11 items-center justify-center text-[#dea552] transition-transform duration-500 ${
              open ? "rotate-180" : ""
            }`}
          >
            <ChevronDown className="size-5" />
          </span>
        </div>
      </button>

      <div className={`grid transition-all duration-700 ease-in-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <div className="relative">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1556111314-0927abbbd15a?w=1600&q=80"
              alt=""
              className="absolute inset-0 size-full object-cover opacity-10"
            />
            <div className="relative space-y-10 border-t border-black/20 bg-[#777777]/95 px-6 py-10 md:px-12">
              {awards.map((award) => (
                <div key={award.date} className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_auto]">
                  <div className="border-l-4 border-[#d9b27a] pl-5">
                    <h3 className="text-[clamp(1.35rem,1.8vw,1.8rem)] font-semibold leading-relaxed text-black">
                      {award.title}
                    </h3>
                    <p className="mt-5 leading-relaxed text-black text-[var(--type-body)]">
                      {award.body}
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-4 lg:min-w-48 lg:items-end">
                    <button className="flex h-11 items-center gap-2 border-2 border-black px-5 text-sm font-semibold tracking-[0.1em] text-black transition hover:bg-black hover:text-white">
                      View Award
                      <ArrowRight className="size-4" />
                    </button>
                    <span className="text-2xl font-medium text-black">{award.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Honors() {
  const [openYear, setOpenYear] = useState<string | null>("2026");

  return (
    <section className="site-shell mt-32">
      <div className="mb-12 grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-[auto_1fr] lg:items-baseline">
        <h2
          className="bg-clip-text pb-3 pr-4 text-transparent italic"
          style={{
            fontWeight: 700,
            fontSize: "clamp(4rem, 8vw, 7.5rem)",
            letterSpacing: "0.02em",
            backgroundImage: "linear-gradient(112deg, #d19d51 16%, #d9b27a 100%)",
            lineHeight: 1.12,
          }}
        >
          HONORS
        </h2>
        <p className="max-w-[56rem] text-pretty capitalize leading-relaxed text-[#c2c2c2]/85 text-[clamp(1rem,1.3vw,1.5rem)]">
          Tiger Partners is favored and recognized by multiple authoritative legal directories and awarding
          organizations all over the world.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {data.map((item) => (
          <YearRow
            key={item.year}
            item={item}
            open={openYear === item.year}
            onToggle={() => setOpenYear(openYear === item.year ? null : item.year)}
          />
        ))}
      </div>
    </section>
  );
}
