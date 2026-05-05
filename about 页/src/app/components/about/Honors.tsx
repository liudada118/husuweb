import { useState } from "react";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

type Award = { title: string; date: string; body: string };
type YearItem = { year: string; count: string; awards?: Award[] };

const data: YearItem[] = [
  {
    year: "2026",
    count: "2 Distinctions",
    awards: [
      {
        title: "January 2026, Chambers Greater China Region 2026, listed in \u201CDispute Resolution (PRC Firms)\u201D.",
        date: "2026-01",
        body: "In January 2026, Tiger Partners was listed in \u201CDispute Resolution (PRC Firms)\u201D in the Chambers Greater China Region Guide 2026.",
      },
      {
        title: "March 2026, Shortlisted for the ALB China Law Awards 2026 with two nominations.",
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
  const dark = open;
  return (
    <div
      className={`rounded-[0.625rem] overflow-hidden shadow-[0_1.25rem_1.5rem_-0.3rem_rgba(0,0,0,0.4)] transition-colors`}
      style={{ background: dark ? "#363535" : "#e9e9e9" }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-[2rem] md:px-[3rem] py-[2.25rem] gap-[1.5rem]"
      >
        <div className="flex items-center gap-[1.5rem] md:gap-[2rem] min-w-0">
          <span
            style={{
              fontFamily: 'Poppins',
              fontWeight: 400,
              fontSize: 'clamp(2rem, 3.3vw, 3rem)',
              letterSpacing: '0.04em',
              color: dark ? '#c1c1c1' : '#27272a',
              lineHeight: 1,
            }}
          >
            {item.year}
          </span>
          <div className="border-l-2 border-[#d9b27a] pl-[1.25rem] md:pl-[2rem]">
            <div style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '1.25rem', color: '#d6a866' }}>
              Awards Won
            </div>
            <div className="mt-[0.25rem]" style={{ fontFamily: 'Poppins', fontSize: '1rem', color: dark ? '#c1c1c1' : '#27272a' }}>
              {item.count}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-[0.75rem] shrink-0">
          <span
            style={{
              fontFamily: 'Poppins',
              fontWeight: 600,
              fontSize: '1rem',
              color: '#dea552',
              letterSpacing: '0.07em',
            }}
            className="hidden sm:inline"
          >
            {open ? 'Close Directory' : 'View Directory'}
          </span>
          {open ? (
            <ChevronUp className="w-5 h-5" style={{ color: '#d9b27a' }} />
          ) : (
            <ChevronDown className="w-5 h-5" style={{ color: '#dea552' }} />
          )}
        </div>
      </button>

      {open && item.awards && (
        <div className="relative">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1556111314-0927abbbd15a?w=1600&q=80"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(168deg, rgba(115,115,115,0.95) 50%, rgba(233,233,233,0.5) 220%)' }}
          />
          <div className="relative border-t border-black/20 px-[2rem] md:px-[3rem] py-[2.5rem] space-y-[2.5rem] bg-white/85">
            {item.awards.map((a) => (
              <div key={a.date} className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-[1.5rem] items-start">
                <div className="border-l-4 border-[#d9b27a] pl-[1.25rem]">
                  <h3
                    style={{
                      fontFamily: 'Poppins',
                      fontWeight: 600,
                      fontSize: 'clamp(1.125rem, 1.5vw, 1.5rem)',
                      color: '#27272a',
                      lineHeight: 1.4,
                    }}
                  >
                    {a.title}
                  </h3>
                  <p
                    className="mt-[1.25rem]"
                    style={{
                      fontFamily: 'Poppins',
                      fontWeight: 400,
                      fontSize: 'clamp(0.9375rem, 1.15vw, 1.25rem)',
                      color: 'rgba(39,39,42,0.8)',
                      lineHeight: 1.5,
                    }}
                  >
                    {a.body}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-[1rem] lg:min-w-[12rem]">
                  <button
                    className="border-2 border-black px-[1.25rem] h-[2.625rem] flex items-center gap-[0.5rem] hover:bg-black/5 transition"
                    style={{
                      fontFamily: 'Poppins',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      color: '#d4a35d',
                      letterSpacing: '0.1em',
                    }}
                  >
                    View Award
                    <ArrowRight className="w-4 h-4" style={{ color: '#d3a25b' }} />
                  </button>
                  <span
                    style={{
                      fontFamily: 'Poppins',
                      fontWeight: 500,
                      fontSize: '1.5rem',
                      color: '#000',
                    }}
                  >
                    {a.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function Honors() {
  const [openYear, setOpenYear] = useState<string | null>("2026");
  return (
    <section className="relative mx-auto max-w-[120rem] px-[2.5rem] mt-[8rem]">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-[2rem] mb-[3rem]">
        <h2
          className="bg-clip-text text-transparent italic"
          style={{
            fontFamily: 'Poppins',
            fontWeight: 700,
            fontSize: 'clamp(4rem, 8vw, 7.5rem)',
            letterSpacing: '0.02em',
            backgroundImage: 'linear-gradient(112deg, #d19d51 16%, #d9b27a 100%)',
            lineHeight: 1,
          }}
        >
          HONORS
        </h2>
        <p
          className="capitalize text-right max-w-[42rem]"
          style={{
            fontFamily: 'Poppins',
            fontWeight: 400,
            fontSize: 'clamp(1rem, 1.3vw, 1.5rem)',
            color: 'rgba(194,194,194,0.85)',
            lineHeight: 1.4,
          }}
        >
          Tiger Partners is favored and recognized by
          <br />
          multiple authoritative legal directories and awarding organizations all over the world
        </p>
      </div>
      <div className="flex flex-col gap-[0.875rem]">
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
