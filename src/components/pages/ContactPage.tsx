import { Mail, Phone } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";

const cards = [
  "Graduated from well-known law schools in China, with profound legal knowledge.",
  "Passed the Bar Examination.",
  "Positive and energetic, with good communication skills.",
  "Have one or two abiding hobbies.",
];

const contactShell = "w-full pl-5 pr-5 md:pl-[9rem] md:pr-[var(--shell-md)]";

export function ContactPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#171717] text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[40rem] bg-gradient-to-b from-[#1e1e1e] to-[#d9b27a]/25 mix-blend-color-dodge" />
        <div className="absolute left-0 top-0 h-[40rem] w-full bg-gradient-to-b from-[#121212] to-transparent [clip-path:polygon(0_0,7%_0,100%_100%,0_100%)]" />
        <SiteHeader active="CONTACT" />

        <div className={`${contactShell} relative z-10 pt-[calc(var(--header-height)+7rem)]`}>
          <h1 className="text-[clamp(4rem,8vw,6rem)] font-medium uppercase italic leading-none tracking-[-0.03em] text-[#d9b27a]">
            CONTACT
          </h1>
          <p className="mt-12 max-w-[90rem] text-pretty font-light leading-relaxed tracking-[0.04em] text-[#868686] text-[clamp(1.25rem,2.2vw,2.25rem)]">
            When you face legal problems, please contact us without hesitation. On our way achieving our
            goals, we are also looking for partners with the same professional ideal.
          </p>
          <div className="mt-14 h-0.5 w-24 bg-[#3a3a3a]" />
        </div>
      </section>

      <section className="relative w-full overflow-hidden">
        <div className="grid min-h-[80vh] grid-cols-1 lg:grid-cols-2">
          <div className="relative flex flex-col justify-center bg-[#a88d61] py-20 pl-5 pr-5 md:pl-[9rem] lg:pr-20">
            <svg
              className="pointer-events-none absolute bottom-[60px] left-[-90px] w-[420px] max-w-[72vw] text-[rgba(120,96,58,0.35)] opacity-[0.1] mix-blend-multiply"
              viewBox="0 0 420 420"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="210" cy="210" r="168" stroke="currentColor" strokeWidth="18" />
              <path d="M86 210C126 120 294 120 334 210C294 300 126 300 86 210Z" stroke="currentColor" strokeWidth="18" />
              <path d="M210 58V362M58 210H362" stroke="currentColor" strokeWidth="14" />
            </svg>
            <h2 className="relative text-[clamp(2.5rem,4vw,4rem)] font-bold leading-none text-black">
              Contact us
            </h2>
            <p className="relative mt-10 max-w-[48rem] text-justify leading-relaxed text-black text-[clamp(1rem,1.3vw,1.5rem)]">
              Should you have any legal questions or disputes, please feel free to contact us. We sincerely
              look forward to providing you with professional legal services and are committed to safeguarding
              your legitimate rights and interests.
            </p>
            <div className="relative mt-10 space-y-5 text-[clamp(1rem,1.25vw,1.375rem)] font-semibold text-black">
              <div className="flex items-center gap-4">
                <Phone className="size-5 shrink-0 text-black" strokeWidth={1.6} />
                <span>010-85885228</span>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="size-5 shrink-0 text-black" strokeWidth={1.6} />
                <span>contact@tigerpartners.cn</span>
              </div>
            </div>
          </div>
          <div className="group relative min-h-[24rem] overflow-hidden lg:min-h-[80vh]">
            <ImageWithFallback
              src="/assets/prototypes/contact/city.png"
              alt="city"
              className="absolute inset-0 size-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105"
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: "linear-gradient(to right, #a88d61 0%, rgba(168, 141, 97, 0) 30%)" }}
              aria-hidden="true"
            />
          </div>
        </div>
      </section>

      <div className="relative -mb-20 overflow-hidden pb-20">
        <div
          className="pointer-events-none absolute inset-0 z-20 bg-[#1d1d1d] opacity-50 [clip-path:polygon(100%_0,100%_100%,50%_100%)]"
          aria-hidden="true"
        />

        <section className={`${contactShell} relative z-30 grid gap-10 py-20 lg:grid-cols-[minmax(auto,26.75rem)_1px_1fr] lg:gap-16`}>
          <div className="text-[clamp(3.25rem,6vw,5.625rem)] font-light italic leading-tight tracking-[-0.03em] text-[#f1efec]">
            <div>Welcome</div>
            <div>To</div>
            <div className="text-[#d9b27a]">Join Us</div>
          </div>
          <div className="hidden h-64 w-px bg-[#d9b27a] lg:block" />
          <p className="text-pretty leading-relaxed tracking-[0.04em] text-white/70 text-[clamp(1rem,1.5vw,1.75rem)]">
            We are looking for candidates with ambition and enthusiasm for life, who recognize lawyers&apos;
            status and dignity in social life, and embrace the work of disputes resolution as the cornerstone
            for law school graduates to realize their value.
          </p>
        </section>

        <section className={`${contactShell} relative grid gap-6 sm:grid-cols-2 xl:grid-cols-4`}>
          {cards.map((text) => (
            <article
              key={text}
              className="relative min-h-80 overflow-hidden border-2 border-[#2d2b27] p-8 lg:min-h-[29rem]"
            >
              <div className="absolute inset-0 z-0 bg-[linear-gradient(154deg,#202020_0%,#292723_72%,#4b3f31_160%)]" />
              <div className="relative z-30 mt-16 h-1.5 w-20 bg-[#d9b27a]" />
              <p className="relative z-30 mt-12 text-pretty text-[clamp(1.125rem,1.5vw,1.75rem)] font-bold italic leading-relaxed tracking-[0.04em] text-white/75">
                {text}
              </p>
            </article>
          ))}
        </section>

        <section className={`${contactShell} relative z-30 py-20 text-right`}>
          <p className="text-[clamp(1.5rem,2.6vw,2.5rem)] leading-relaxed tracking-[0.04em]">
            <span className="font-light italic text-[#b7b7b7]/70">Please send your resume to</span>{" "}
            <span className="text-[#d9b27a]">recruit@tigerpartners.cn</span>
          </p>
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}
