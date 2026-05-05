"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

type ChronicleEvent = { month: string; side: "left" | "right"; text: string };
type YearGroup = { year: string; events: ChronicleEvent[] };

const groups: YearGroup[] = [
  {
    year: "2026",
    events: [
      {
        month: "JANUARY",
        side: "left",
        text: "Tiger Partners was listed in Dispute Resolution (PRC Firms) in the Chambers Greater China Region Guide 2026.",
      },
      {
        month: "NOVEMBER",
        side: "left",
        text: "Tiger Partners was listed in the 2026 Legal 500 China rankings for dispute resolution arbitration and litigation.",
      },
      {
        month: "JULY",
        side: "right",
        text: "Mr. Liu Yuxuan, Mr. Wan Li and Ms. Zhang Li of Tiger Partners were awarded the inaugural Legal 500 China Elite Beijing Elite Commercial Disputes.",
      },
    ],
  },
  {
    year: "2025",
    events: [
      {
        month: "JUNE",
        side: "left",
        text: "Tiger Partners was listed in ALB China Dispute Resolution Rankings, and recognized as a notable firm in the litigation field.",
      },
      {
        month: "APRIL",
        side: "right",
        text: "Tiger Partners was nominated for the Boutique Law Firm of the Year award at the ALB China Law Awards 2025.",
      },
    ],
  },
  {
    year: "2024",
    events: [
      {
        month: "NOVEMBER",
        side: "left",
        text: "Tiger Partners was honored to be the Diamond Sponsor of the 22nd CIETAC Cup Voice of Moot series training activities.",
      },
    ],
  },
];

function EventRow({ event }: { event: ChronicleEvent }) {
  const isLeft = event.side === "left";

  return (
    <div className="group relative grid grid-cols-1 items-center py-8 md:grid-cols-[1fr_2.5rem_1fr]">
      <div
        className={`${isLeft ? "md:col-start-1 md:border-l-0 md:border-r-2 md:border-[#d9b27a] md:text-right" : "md:col-start-3 md:border-l-2 md:border-[#d9b27a] md:text-left"} rounded border-l-2 border-[#d9b27a] p-6 transition-transform duration-500 md:p-8 md:group-hover:-translate-y-1`}
        style={{
          background: isLeft
            ? "linear-gradient(126deg, rgba(217,178,122,0) 4%, rgba(115,115,115,0.28) 92%)"
            : "linear-gradient(-126deg, rgba(217,178,122,0) 4%, rgba(115,115,115,0.28) 92%)",
        }}
      >
        <div className={`mb-4 flex items-center gap-4 ${isLeft ? "md:justify-end" : "md:justify-start"}`}>
          {!isLeft ? <span className="hidden h-px w-8 bg-[#d9b27a]/60 md:block" /> : null}
          <span className="text-lg font-semibold tracking-[0.18em] text-[#d9b27a] md:text-xl">
            {event.month}
          </span>
          {isLeft ? <span className="hidden h-px w-8 bg-[#d9b27a]/60 md:block" /> : null}
        </div>
        <p className={`${isLeft ? "md:ml-auto" : ""} w-[85%] font-light leading-relaxed text-[#c8c8c8] text-[var(--type-body)]`}>
          {event.text}
        </p>
      </div>
      <div className="absolute left-0 top-9 md:static md:col-start-2 md:flex md:self-stretch md:justify-center">
        <span className="mt-2 block size-3.5 rounded-full border-2 border-[#e5e5e5] bg-[#141414] transition-all duration-500 group-hover:bg-[#e5e5e5] group-hover:shadow-[0_0_15px_rgba(229,229,229,0.5)]" />
      </div>
    </div>
  );
}

function ChronicleYear({ group, open, onToggle }: { group: YearGroup; open: boolean; onToggle: () => void }) {
  return (
    <div className="relative z-10 w-full">
      <div className="relative z-20 mb-8 flex justify-start md:mb-10 md:justify-center">
        <button
          type="button"
          onClick={onToggle}
          className="group ml-[20px] flex -translate-x-1/2 items-center gap-5 border border-[#d9b27a] bg-[#202020] px-6 py-3 shadow-[0_0_30px_rgba(20,20,20,1)] transition-colors duration-500 hover:border-[#f8d097] md:ml-0 md:translate-x-0 md:px-10"
          aria-expanded={open}
        >
          <span className="text-2xl font-light leading-none tracking-[0.2em] text-[#e5e5e5] md:text-4xl">
            {group.year}
          </span>
          <span className="hidden text-xs uppercase tracking-[0.18em] text-white/45 sm:inline">
            {open ? "Close" : "Open"}
          </span>
          <ChevronDown
            className={`size-5 text-[#e5e5e5] transition-transform duration-500 ${
              open ? "rotate-180" : "group-hover:translate-y-0.5"
            }`}
            strokeWidth={1.5}
          />
        </button>
      </div>

      <div
        className={`grid transition-all duration-700 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div
            className={`relative pb-12 transition-transform duration-700 ease-in-out ${
              open ? "translate-y-0" : "-translate-y-4"
            }`}
          >
            {group.events.map((event, index) => (
              <EventRow key={`${group.year}-${index}`} event={event} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Chronicle() {
  const [openYear, setOpenYear] = useState("2026");

  return (
    <section className="site-shell mt-32 pb-24">
      <div className="mb-12 flex flex-col justify-between gap-6 border-b-2 border-[#736654] pb-8 lg:flex-row lg:items-end">
        <h2 className="text-[clamp(3.5rem,7vw,6rem)] font-bold leading-none tracking-[0.02em] text-[#d9b27a]">
          CHRONICLE
        </h2>
        <p className="max-w-[30rem] leading-relaxed text-white lg:text-right text-[clamp(1rem,1.25vw,1.5rem)]">
          Events and Milestones during our development
        </p>
      </div>

      <div className="relative mt-20 pl-8 md:pl-0">
        <div className="absolute bottom-0 left-[20px] top-0 z-0 w-px bg-white/10 md:left-1/2 md:-translate-x-1/2" />
        <div className="space-y-10 md:space-y-16">
          {groups.map((group) => (
            <ChronicleYear
              key={group.year}
              group={group}
              open={openYear === group.year}
              onToggle={() => setOpenYear((current) => (current === group.year ? "" : group.year))}
            />
          ))}
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <a href="#" className="inline-flex flex-col items-center">
          <span className="text-xl font-semibold text-[#f8d097]">See More</span>
          <span className="mt-1 block h-0.5 w-28 bg-[#f8d097]" />
        </a>
      </div>
    </section>
  );
}
