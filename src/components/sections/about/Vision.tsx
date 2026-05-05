export function VisionCard({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <div
        className="relative overflow-hidden rounded-none p-6 md:p-10 lg:p-12"
        style={{
          background: "linear-gradient(to bottom right, #585551 0%, #2f2f2f 100%)",
          backdropFilter: "blur(2px)",
        }}
      >
        <div className="mb-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
          <div className="hidden size-40 opacity-40 md:block">
            <svg viewBox="0 0 170 170" fill="none" aria-hidden="true">
              <circle cx="85" cy="85" r="80" stroke="#C5C5C5" strokeOpacity="0.6" strokeWidth="1.5" />
              <path
                d="M30 85 Q 85 30, 140 85 T 30 85"
                stroke="#C5C5C5"
                strokeOpacity="0.6"
                strokeWidth="1.5"
                fill="none"
              />
              <path d="M85 20 L85 150 M20 85 L150 85" stroke="#C5C5C5" strokeOpacity="0.4" strokeWidth="1" />
            </svg>
          </div>
          <div className="flex flex-1 flex-col items-start justify-end gap-5 lg:flex-row lg:items-center lg:text-right">
            <p className="max-w-[34rem] capitalize leading-relaxed text-white text-[clamp(1rem,1.4vw,1.5rem)]">
              We are determined to be one of the extraordinary law firms in disputes resolution area
            </p>
            <h2
              className="inline-block shrink-0 bg-clip-text text-transparent"
              style={{
                fontWeight: 800,
                fontSize: "clamp(2.75rem, 5.5vw, 5rem)",
                lineHeight: 1,
                backgroundImage: "linear-gradient(153deg, #dbdbdb 10%, #946c32 130%)",
              }}
            >
              VISION
            </h2>
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-justify leading-relaxed text-white/80 text-[var(--type-body)]">
            Established in December 2019, Tiger Partners is one of the extremely vibrant, creative and
            inclusive law firms. As a boutique law firm focused on major and complex civil and commercial
            dispute resolution, we have deep legal expertise and extensive practical experience, as well as
            a distinctive commercial thinking, enabling us to provide our clients with professional legal
            services, precise business solutions and a great client experience.
          </p>
          <p className="text-justify leading-relaxed text-white/80 text-[var(--type-body)]">
            We have a professional and excellent dispute resolution team. All of them are graduated from
            prestigious universities at home and abroad, and have extensive experience in arbitration
            institutions and courts at all levels. We have played an important role in many complex and
            difficult cases with wide influence, and have maintained an impressive success rate.
          </p>
        </div>

        <a href="#" className="mx-auto mt-10 flex w-max flex-col items-center">
          <span className="text-xl font-semibold text-[#e1ab5c]">See More</span>
          <span className="mt-1 block h-0.5 w-28 bg-[#e1ab5c]" />
        </a>
      </div>
    </div>
  );
}

export function Vision() {
  return (
    <section className="site-shell relative z-20 -mt-72 max-lg:-mt-28">
      <VisionCard />
    </section>
  );
}
