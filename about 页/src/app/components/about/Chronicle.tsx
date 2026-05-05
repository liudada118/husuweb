type Event = { month: string; side: "left" | "right"; text: string };
type YearGroup = { year: string; events: Event[] };

const groups: YearGroup[] = [
  {
    year: "2026",
    events: [
      {
        month: "JANUARY",
        side: "left",
        text: "Tiger Partners was listed in \u201CDispute Resolution (PRC Firms)\u201D in the Chambers Greater China Region Guide 2026.",
      },
      {
        month: "NOVEMBER",
        side: "left",
        text: "Tiger Partners was listed in the 2026 Legal 500 China rankings for \u201CDispute resolution: Arbitration: PRC firms\u201D and \u201CDispute resolution: Litigation: PRC firms\u201D.",
      },
      {
        month: "JULY",
        side: "right",
        text: "Mr. Liu Yuxuan, Mr. Wan Li and Ms. Zhang Li (Zoe) of Tiger Partners were awarded the inaugural Legal 500 China Elite: Beijing Elite \u2014 Commercial Disputes.",
      },
    ],
  },
  {
    year: "2025",
    events: [
      {
        month: "JUNE",
        side: "left",
        text: "Tiger Partners was listed in ALB China Dispute Resolution Rankings, and recognized as a \u201CNotable Firms\u201D in the Litigation field.",
      },
      {
        month: "APRIL",
        side: "right",
        text: "Tiger Partners was nominated for the \u201CBoutique Law Firm of the Year\u201D award at the ALB China Law Awards 2025.",
      },
    ],
  },
  {
    year: "2024",
    events: [
      {
        month: "NOVEMBER",
        side: "left",
        text: "Tiger Partners was honored to be the Diamond Sponsor of the 22nd \u201CCIETAC Cup\u201D Voice of Moot series training activities.",
      },
    ],
  },
];

function YearLabel({ year }: { year: string }) {
  return (
    <div className="relative flex justify-center my-[3rem]">
      <div
        className="bg-[#212121] border border-[#d9b27a]/30 px-[2.5rem] py-[0.875rem]"
      >
        <span
          style={{
            fontFamily: 'Poppins',
            fontWeight: 500,
            fontSize: 'clamp(1.5rem, 2vw, 2.25rem)',
            color: '#d9b27a',
            letterSpacing: '0.2em',
          }}
        >
          {year}
        </span>
      </div>
    </div>
  );
}

function EventRow({ ev }: { ev: Event }) {
  const isLeft = ev.side === "left";
  return (
    <div className="relative grid grid-cols-[1fr_2.5rem_1fr] items-center py-[2.5rem]">
      <div
        className={`relative ${isLeft ? "" : "lg:col-start-3"}`}
        style={{
          gridColumn: isLeft ? '1 / 2' : '3 / 4',
          background: isLeft
            ? 'linear-gradient(126deg, rgba(217,178,122,0) 4%, rgba(115,115,115,0.2) 92%)'
            : 'linear-gradient(-126deg, rgba(217,178,122,0) 4%, rgba(115,115,115,0.2) 92%)',
          padding: '2rem',
          borderRadius: '0.25rem',
          textAlign: isLeft ? 'right' : 'left',
        }}
      >
        <div className={`flex items-center gap-[1rem] mb-[1rem] ${isLeft ? 'justify-end' : 'justify-start'}`}>
          {isLeft && <span className="block w-[2rem] h-px bg-[#d9b27a]/60" />}
          <span
            style={{
              fontFamily: 'Poppins',
              fontWeight: 600,
              fontSize: '1.25rem',
              color: '#d9b27a',
              letterSpacing: '0.18em',
            }}
          >
            {ev.month}
          </span>
          {!isLeft && <span className="block w-[2rem] h-px bg-[#d9b27a]/60" />}
        </div>
        <p
          style={{
            fontFamily: 'Poppins',
            fontWeight: 300,
            fontSize: 'clamp(0.9375rem, 1.15vw, 1.25rem)',
            color: '#fff',
            lineHeight: 1.6,
          }}
        >
          {ev.text}
        </p>
      </div>
      <div className="col-start-2 flex justify-center self-stretch relative">
        <span
          className="block bg-[#18181b] border-2 border-[#d9b27a] rounded-full"
          style={{ width: '0.875rem', height: '0.875rem', marginTop: '0.5rem' }}
        />
      </div>
    </div>
  );
}

export function Chronicle() {
  return (
    <section className="relative mx-auto max-w-[120rem] px-[2.5rem] mt-[8rem] pb-[6rem]">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-[1.5rem] mb-[3rem] pb-[2rem] border-b-2 border-[#736654]">
        <h2
          style={{
            fontFamily: 'Poppins',
            fontWeight: 700,
            fontSize: 'clamp(3.5rem, 7vw, 6rem)',
            color: '#d9b27a',
            letterSpacing: '0.02em',
            lineHeight: 1,
          }}
        >
          CHRONICLE
        </h2>
        <p
          className="text-right max-w-[30rem]"
          style={{
            fontFamily: 'Inter',
            fontWeight: 300,
            fontSize: 'clamp(1rem, 1.25vw, 1.5rem)',
            color: '#fff',
            lineHeight: 1.4,
          }}
        >
          Events and Milestones during our development
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-[3px] bg-[#d9b27a]/30 -translate-x-1/2" />
        {groups.map((g) => (
          <div key={g.year}>
            <YearLabel year={g.year} />
            {g.events.map((ev, i) => (
              <EventRow key={`${g.year}-${i}`} ev={ev} />
            ))}
          </div>
        ))}

        <div className="flex justify-center mt-[3rem]">
          <button className="inline-flex flex-col items-center">
            <span
              style={{
                fontFamily: 'Poppins',
                fontWeight: 600,
                fontSize: '1.25rem',
                color: '#f8d097',
              }}
            >
              See More
            </span>
            <span className="block mt-[0.25rem] h-[2px] w-[7.125rem] bg-[#f8d097]" />
          </button>
        </div>
      </div>
    </section>
  );
}
