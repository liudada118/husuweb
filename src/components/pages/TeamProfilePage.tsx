import Link from "next/link";
import { ArrowLeft, ChevronRight, Mail } from "lucide-react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";

const profileImage = "/assets/prototypes/team-profile/27929c94f05ebbe6e4136776f923e8b63626bc4a.png";

const profileInfo = [
  {
    title: "Service Industries",
    items: ["Commerce & Investment", "Foreign Trade", "Corporate Governance", "M&A and Restructuring", "Banking and Securities"],
  },
  {
    title: "Professional Qualification",
    items: ["Bar admission in the People's Republic of China"],
  },
  {
    title: "Educational Background",
    items: ["LL.M, Tsinghua University", "LL.B, Peking University"],
  },
];

const achievements = [
  "Mr. Liu Yuxuan has been widely recognized by leading global legal ranking institutions and prominent media outlets in the field of dispute resolution.",
  "In November 2025, Mr. Liu Yuxuan was awarded the inaugural Legal 500 China Elite: Beijing Elite - Commercial Disputes.",
  "In January 2025, Mr. Liu Yuxuan was exclusively invited to author the Chambers Global Practice Guides 2025 - Dispute Resolution Overview (China Chapter).",
  'In May 2022, Mr. Liu Yuxuan was listed in the 2022 Top Ranked Lawyers List as "Rising Star" in the field of "Dispute Resolution - Litigation" by LEGALBAND.',
  'In January 2022, Mr. Liu Yuxuan was selected as one of "The A List" among 100 elite practitioners of Chinese law by China Business Law Journal.',
];

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="border-t border-white/10 pt-6">
      <h3 className="text-[clamp(1rem,1.25vw,1.35rem)] font-semibold tracking-[0.08em] text-[#d9b27a]">
        {title}
      </h3>
      <ul className="mt-5 space-y-3 text-[clamp(0.95rem,1vw,1.1rem)] leading-relaxed text-[#bec3cb]">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function TeamProfilePage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#171717] text-white">
      <SiteHeader active="OUR TEAM" />

      <section className="bg-[#171717] pt-[var(--header-height)]">
        <div className="site-shell flex items-center gap-2 border-b border-white/10 py-5 text-sm tracking-[0.04em] text-[#7f8792]">
          <Link href="/team" className="transition hover:text-[#d9b27a]">
            Our Team
          </Link>
          <ChevronRight className="size-4" />
          <span className="text-[#d9b27a]">Yuxuan Liu</span>
        </div>

        <div className="site-shell grid gap-12 py-16 lg:grid-cols-[minmax(18rem,32rem)_1fr] lg:py-20">
          <div className="relative aspect-[540/735] overflow-hidden bg-[#222] lg:sticky lg:top-[calc(var(--header-height)+2rem)] lg:self-start">
            <ImageWithFallback src={profileImage} alt="Yuxuan Liu" className="size-full object-cover object-bottom" />
          </div>

          <div className="min-w-0">
            <Link
              href="/team"
              className="group mb-10 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#d9b27a]"
            >
              <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to team
            </Link>

            <h1 className="text-[clamp(3rem,7vw,6.25rem)] font-semibold leading-none tracking-[0.04em] text-[#e0e0e0]">
              Yuxuan&nbsp;&nbsp;Liu
            </h1>
            <p className="mt-6 text-[clamp(1.35rem,2vw,2.5rem)] font-light leading-none tracking-[0.05em] text-[#e0e0e0]">
              Managing Partner
            </p>
            <a
              href="mailto:yuxuan.liu@tigerpartners.cn"
              className="mt-8 inline-flex items-center gap-3 text-[clamp(1rem,1.1vw,1.25rem)] text-[#bec3cb] transition hover:text-[#d9b27a]"
            >
              <Mail className="size-5 text-[#d9b27a]" />
              yuxuan.liu@tigerpartners.cn
            </a>

            <div className="mt-14 grid gap-8 lg:grid-cols-3">
              {profileInfo.map((block) => (
                <InfoBlock key={block.title} {...block} />
              ))}
            </div>

            <div className="mt-14 border-t border-white/10 pt-8">
              <h2 className="text-[clamp(1.5rem,2.4vw,3rem)] font-medium leading-none tracking-[0.02em] text-[#d9b27a]">
                Social Engagements
              </h2>
              <p className="mt-8 text-justify text-[clamp(1rem,1.25vw,1.5rem)] font-light leading-[1.75] tracking-[0.02em] text-[#bec3cb]">
                Mr. Liu currently serves as a member of the Commercial Arbitration Law Professional Committee
                of the Beijing Lawyers Association, Deputy Director of the Arbitration and Mediation Business
                Research Association of the Chaoyang District Lawyers Association, and a member of the
                &quot;Legal Experts Database&quot; of the Arbitration Research Center of the Sichuan Law and Social
                Governance Research Association.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="site-shell py-16 lg:py-24">
        <h2 className="text-[clamp(2rem,3.4vw,4rem)] font-medium leading-none tracking-[0.02em] text-[#d9b27a]">
          Experience&amp; capabilities
        </h2>
        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div className="border-t border-[#d9b27a]/50 pt-8">
            <h3 className="text-[clamp(1.35rem,2vw,2.25rem)] text-[#d9b27a]">Practice Experience</h3>
            <p className="mt-8 text-justify text-[clamp(1rem,1.2vw,1.5rem)] font-light leading-[1.7] text-[#bec3cb]">
              As the founding partner of Tiger Partners, Mr. Liu Yuxuan has been practicing law for more than
              sixteen years. Prior to founding Tiger Partners, Mr. Liu worked as a partner at Jingtian &amp;
              Gongcheng. Before that, Mr. Liu worked as a dispute resolution lawyer at Fangda Partners, King
              &amp; Wood, and Zhong Lun Law Firm.
            </p>
          </div>
          <div className="border-t border-white/10 pt-8">
            <h3 className="text-[clamp(1.35rem,2vw,2.25rem)] text-[#d9b27a]">Performance &amp; Achievements</h3>
            <ul className="mt-8 space-y-6 text-[clamp(1rem,1.1vw,1.25rem)] leading-relaxed text-[#bec3cb]/85">
              {achievements.map((item) => (
                <li key={item} className="grid grid-cols-[0.625rem_1fr] gap-5">
                  <span className="mt-[0.7em] size-2.5 rounded-full bg-[#e5e5e5]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
