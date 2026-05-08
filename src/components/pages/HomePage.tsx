"use client";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { PageTriangle } from "@/components/shared/PageTriangle";
import { pick, useLanguage } from "@/i18n/LanguageProvider";
import { copy } from "@/i18n/copy";

const heroImg = "/assets/home/hero.png";

const industries = [
  {
    name: "Private Equity",
    img: "/assets/home/INDUSTRIES1.png",
    cls: "lg:col-span-2",
  },
  {
    name: "Finance",
    img: "/assets/home/INDUSTRIES2.png",
    cls: "lg:col-span-1",
  },
  {
    name: "Real Estate",
    img: "/assets/home/INDUSTRIES3.png",
    cls: "lg:col-span-1 lg:row-span-2",
  },
  {
    name: "Sports and E-Sports",
    img: "/assets/home/INDUSTRIES4.png",
    cls: "lg:col-span-1",
  },
  {
    name: "International Trade",
    img: "/assets/home/INDUSTRIES5.png",
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
    honors: [
      {
        title: "Shortlisted for the ALB China Law Awards 2026 with two nominations",
        date: "Mar. 2026",
        desc: "Tiger Partners was shortlisted for Dispute Resolution Boutique Law Firm of the Year and Rising Law Firm of the Year.",
      },
      {
        title: "Chambers Greater China Region 2026: Dispute Resolution (PRC Firms)",
        date: "Jan. 2026",
        desc: "Tiger Partners was listed in Chambers Greater China Region 2026 for Dispute Resolution (PRC Firms).",
      },
    ],
  },
  {
    year: "2025",
    honors: [
      {
        title: "Legal 500 China 2026: Dispute Resolution",
        date: "Nov. 2025",
        desc: "Tiger Partners was listed in Legal 500 China for Dispute Resolution: Arbitration: PRC firms and Dispute Resolution: Litigation: PRC firms.",
      },
      {
        title: "Legal 500 China Elite: Beijing Elite - Commercial Disputes",
        date: "Nov. 2025",
        desc: "Liu Yuxuan, Wan Li and Zoe Zhang were recognized in the first Legal 500 China Elite list for Beijing Elite - Commercial Disputes.",
      },
      {
        title: "China Business Law Journal Excellence Awards 2025",
        date: "Jul. 2025",
        desc: "Tiger Partners won the China Business Law Journal 2025 Excellence Award in Cross-border Litigation.",
      },
    ],
  },
  {
    year: "2024",
    honors: [
      {
        title: "Benchmark Litigation China 2024: Dispute Resolution",
        date: "Jun. 2024",
        desc: "Tiger Partners was listed in the Benchmark Litigation China 2024 Dispute Resolution list as a Notable Firm.",
      },
      {
        title: "ALB China 2024 Firms to Watch",
        date: "Jan. 2024",
        desc: "Tiger Partners was selected in the 2024 ALB China Firms to Watch list.",
      },
    ],
  },
  {
    year: "2022",
    honors: [
      {
        title: "China Business Law Awards 2022",
        date: "Jun. 2022",
        desc: "Tiger Partners was listed in Dispute Resolution (Domestic) of Practice Awards and Pro-bono of General Awards.",
      },
      {
        title: "LEGALBAND China Top Law Firms 2022",
        date: "May. 2022",
        desc: "Tiger Partners was recognized as Firm to Watch in dispute resolution (litigation) and compliance.",
      },
      {
        title: "Benchmark Litigation Asia-Pacific & China 2022",
        date: "May. 2022",
        desc: "Tiger Partners was listed as a Notable Firm for commercial disputes resolution in Beijing.",
      },
    ],
  },
  {
    year: "2021",
    honors: [
      {
        title: "Beijing Lawyers Association professional committees",
        date: "Oct. 2021",
        desc: "Liu Yuxuan, Xu Min and Wan Li were elected as members of professional committees of the 11th Beijing Lawyers Association.",
      },
      {
        title: "Benchmark Litigation China 2021",
        date: "Jun. 2021",
        desc: "Tiger Partners was recognized as a Notable Firm, and Liu Yuxuan and Wan Li were listed as recommended dispute resolution lawyers in Beijing.",
      },
      {
        title: "China Business Law Journal Firm to Watch",
        date: "May. 2021",
        desc: "Tiger Partners was selected as Firm to Watch by China Business Law Journal.",
      },
    ],
  },
];

const zhHomeHonorsByYear = [
  {
    year: "2026",
    honors: [
      {
        title: "虎诉荣登ALB2026年度中国法律大奖入围名单",
        date: "2026年3月",
        desc: "虎诉获得两项提名：“年度争议解决精品律师事务所大奖”、“年度最具潜力律师事务所大奖”。",
      },
      {
        title: "虎诉荣登《钱伯斯大中华区指南2026》",
        date: "2026年1月",
        desc: "虎诉入选争议解决（中资律师事务所）榜单。",
      },
    ],
  },
  {
    year: "2025",
    honors: [
      {
        title: "虎诉入选Legal 500 2026 中国区榜单",
        date: "2025年11月",
        desc: "虎诉入选争议解决-仲裁-中国律所、争议解决-诉讼-中国律所。",
      },
      {
        title: "虎诉律师荣获Legal 500中国精英榜单奖项",
        date: "2025年11月",
        desc: "虎诉刘煜暄律师、万力律师、张莉律师荣获首届Legal 500中国精英-“北京精英·商业争议”。",
      },
      {
        title: "虎诉荣获《商法》卓越律所大奖2025",
        date: "2025年7月",
        desc: "虎诉荣获执业领域奖项：跨境诉讼/Cross-border litigation。",
      },
    ],
  },
  {
    year: "2024",
    honors: [
      {
        title: "虎诉荣登2024 Benchmark Litigation中国争议解决榜单",
        date: "2024年6月",
        desc: "虎诉律师事务所荣幸入选为受关注律所。",
      },
      {
        title: "虎诉入选2024 ALB China 精品律所榜单",
        date: "2024年1月",
        desc: "虎诉入选 2024 ALB China 精品律所榜单。",
      },
    ],
  },
  {
    year: "2022",
    honors: [
      {
        title: "虎诉荣获2022《商法》卓越律所大奖",
        date: "2022年6月",
        desc: "虎诉入选“境内争议解决”推荐榜单、荣获“卓越公益律所”。",
      },
      {
        title: "虎诉入选2022年度LEGALBAND中国顶级律所排行榜",
        date: "2022年5月",
        desc: "虎诉在争议解决（诉讼）及合规两个领域获评“潜力律所”。",
      },
      {
        title: "虎诉荣登Benchmark Litigation 2022年度争议解决榜单",
        date: "2022年5月",
        desc: "虎诉被评为中国北京地区商业纠纷领域“值得关注的律所（Notable Firm）”。",
      },
    ],
  },
  {
    year: "2021",
    honors: [
      {
        title: "虎诉三名合伙人当选北京律师协会专业委员会委员",
        date: "2021年10月",
        desc: "刘煜暄律师、许旻律师、万力律师当选第十一届北京律师协会专业委员会委员。",
      },
      {
        title: "虎诉荣膺Benchmark Litigation China 2021北京地区商业纠纷领域“优秀律所”称号",
        date: "2021年6月",
        desc: "虎诉获评“优秀律所”，刘煜暄律师、万力律师荣登北京地区争议解决推荐律师榜单。",
      },
      {
        title: "虎诉荣膺2021《商法》卓越律所大奖",
        date: "2021年5月",
        desc: "虎诉被评为“备受关注律所”。",
      },
    ],
  },
];

const events = [
  {
    title: "Tiger Dynamics | Kinsey Kang Yanan was engaged as Hong Kong Legal Counsel of Tiger Partners",
    date: "Nov. 11, 2023",
    tag: "Tiger Dynamics",
    img: "/assets/home/event1.png",
    desc: "Tiger Partners is honored to announce that Kinsey Kang Yanan, barrister-at-law, has been engaged as our Hong Kong Legal Counsel.",
  },
  {
    title: "Tiger Dynamics | Tiger Partners upgraded the functions of the official account and launched a new Mini Program",
    date: "Jun. 09, 2022",
    tag: "Tiger Dynamics",
    img: "/assets/home/event2.png",
    desc: "Tiger Partners upgraded its official account functions and launched the new TigerPark Mini Program after a long period of preparation.",
  },
  {
    title: "Industry News | Tiger Partners was listed in Asia-Pacific & China on Dispute Resolution of 2022 by Benchmark Litigation",
    date: "May. 10, 2022",
    tag: "Industry News",
    img: "/assets/home/event3.png",
    desc: "Tiger Partners won the title of Notable Firm in commercial disputes resolution in Beijing by Benchmark Litigation 2022.",
  },
];

const zhHomeEvents = [
  {
    title: "虎诉动态 | 康亚男（Kinsey Kang Yanan）出庭大律师受聘为虎诉的香港法律顾问",
    date: "2023年11月17日",
    tag: "虎诉动态",
    img: "/assets/home/event1.png",
    desc: "虎诉律师事务所非常荣幸地宣布，康亚男出庭大律师已受聘为本所香港法律顾问。",
  },
  {
    title: "虎诉动态 | 虎诉升级公众号功能并上线全新小程序",
    date: "2022年6月9日",
    tag: "虎诉动态",
    img: "/assets/home/event2.png",
    desc: "经过长期筹备，虎诉对公众号功能进行升级，并上线全新TigerPark小程序。",
  },
  {
    title: "行业资讯 | 虎诉荣登Benchmark Litigation 2022年度亚太地区及中国地区争议解决榜单",
    date: "2022年5月10日",
    tag: "行业资讯",
    img: "/assets/home/event3.png",
    desc: "虎诉被Benchmark Litigation评为2022年度中国北京地区商业纠纷领域“值得关注的律所”。",
  },
];

const pngLogoIndexes = new Set([5, 8, 10, 11, 14, 16, 18, 19, 22, 42]);

const clientLogos = Array.from({ length: 43 }, (_, index) => {
  const fileNumber = index + 1;
  const ext = pngLogoIndexes.has(fileNumber) ? "png" : "jpg";

  return `/assets/home/clientLogo/client-logo-${String(fileNumber).padStart(2, "0")}.${ext}`;
});

const logoRows = [
  clientLogos.slice(0, 15),
  clientLogos.slice(15, 29),
  clientLogos.slice(29),
];

function mod(value: number, length: number) {
  return (value + length) % length;
}

export function HomePage() {
  const { language } = useLanguage();
  const [activeHonor, setActiveHonor] = useState(2);
  const [activeEvent, setActiveEvent] = useState(0);
  const homeHonors = language === "zh" ? zhHomeHonorsByYear : honorsByYear;
  const homeEvents = language === "zh" ? zhHomeEvents : events;
  const honor = homeHonors[activeHonor];
  const industryLabels = pick(language, copy.home.industries.labels);

  const updateEvent = (direction: -1 | 1) => {
    setActiveEvent((current) => mod(current + direction, homeEvents.length));
  };

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#171717] text-white [&>section]:relative [&>section]:z-10">
      <PageTriangle
        className="right-0 top-[calc(100svh+135rem)] z-0 h-[calc(100%-100svh-135rem)] w-full bg-[#2a2a2a] opacity-10"
      />
      <SiteHeader active="HOME" />

      <section className="relative w-full overflow-hidden bg-[#0d0d0d]">
        <div className="absolute inset-0">
          <ImageWithFallback src={heroImg} alt="" className="size-full object-cover opacity-90" />
          <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-b from-transparent to-[#171717]" />
        </div>

        <div className="relative z-10 flex min-h-[100svh] items-center justify-center px-5 py-32">
          <h1 className="max-w-none whitespace-nowrap bg-[linear-gradient(135deg,#DBC39F_0%,#D09E57_100%)] bg-clip-text text-center text-[6.25rem] font-bold leading-none tracking-[0.06em] text-transparent">
            WE KNOW HOW TO WIN
          </h1>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#171717]">
        <div className="relative z-10 px-[2.5rem] py-20 lg:py-28">
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
            <p className="relative z-10 max-w-[84rem] text-[2.5rem] leading-[1.45]">
              {language === "en" ? (
                <>
                  <span className="font-light italic">{copy.home.vision.body.en[0]}</span>{" "}
                  <span className="font-bold">{copy.home.vision.body.en[1]}</span>
                  <br />
                  <span className="font-bold">{copy.home.vision.body.en[2]}</span>
                  <br />
                  <span className="font-bold">{copy.home.vision.body.en[3]}</span>
                </>
              ) : (
                <span className="font-bold">{copy.home.vision.body.zh[0]}</span>
              )}
            </p>
            <Link
              href="/about"
              className="group relative z-10 mt-10 inline-flex w-max items-center gap-4 border border-white !bg-white px-9 py-4 text-[1.5rem] font-semibold uppercase tracking-[0.08em] !text-[#09090b] transition-all duration-500 hover:!bg-transparent hover:!text-white"
            >
              {pick(language, copy.home.vision.cta)}
              <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-2" strokeWidth={1.5} />
            </Link>
            <div
              className="pointer-events-none absolute inset-y-0 hidden w-[clamp(5rem,11vw,10rem)] items-center justify-center xl:flex"
              style={{ right: "calc(var(--shell-md) - 2.5rem)" }}
            >
              <span className="rotate-[270deg] whitespace-nowrap text-[8.75rem] font-normal leading-none tracking-[-0.03em] text-[#d9b27a]/70">
                {pick(language, copy.home.vision.title)}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="industries" className="site-shell relative bg-[#171717] py-20 lg:py-28 [&>*]:relative [&>*]:z-10">
        <div className="mb-12 flex flex-col gap-6 lg:mb-16">
          <h2 className="bg-gradient-to-r from-[#f6ebe4] to-[#d9b27a] bg-clip-text text-[5.625rem] font-light leading-[0.95] text-transparent">
            {language === "en" ? (
              <>
                INDUSTRIES <span className="font-semibold">&amp;</span>{" "}
                <span className="font-semibold">SERVICES</span>
              </>
            ) : (
              pick(language, copy.home.industries.title)
            )}
          </h2>
          <p className="w-full text-pretty text-[1.75rem] font-light italic leading-relaxed text-[#cfd5df]/80">
            {pick(language, copy.home.industries.subtitle)}
          </p>
          <div className="h-px w-full bg-[#6f6f6f]/70" />
        </div>

        <div className="grid auto-rows-[18rem] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[20rem]">
          {industries.map((item, index) => (
            <Link
              key={item.name}
              href="/industries"
              className={`group relative min-w-0 overflow-hidden bg-[#141414] shadow-xl transition-transform duration-500 hover:-translate-y-2 ${item.cls}`}
            >
              <div className="absolute left-0 top-0 z-20 h-[2px] w-full bg-gradient-to-r from-transparent via-[#f3dfb5] to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
              <ImageWithFallback
                src={item.img}
                alt={industryLabels[index] ?? item.name}
                className="size-full object-cover opacity-60 grayscale transition-all duration-1000 group-hover:scale-110 group-hover:opacity-80 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-[#09090b]/55 transition-colors duration-700 group-hover:bg-[#09090b]/25" />
              <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10 bg-gradient-to-t from-[#101010] via-[#101010]/92 to-transparent p-7">
                <h3 className="flex items-center justify-between gap-5 text-balance text-[2.25rem] font-light leading-tight">
                  {industryLabels[index] ?? item.name}
                  <ArrowRight
                    className="size-5 shrink-0 -translate-x-4 text-[#d9b27a] opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"
                    strokeWidth={1.5}
                  />
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative py-20 lg:py-28 [&>*]:relative [&>*]:z-10" style={{ background: "linear-gradient(170deg, #242424 9%, #383838 113%)" }}>
        <div className="site-shell">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[auto_1fr]">
            <h2 className="gold-title text-[6.875rem] font-light leading-none">{pick(language, copy.home.honors.title)}</h2>
            <div className="lg:text-right">
              <p className="text-pretty text-[1.75rem] font-light italic capitalize leading-[2.375rem] text-[#cfd5df]/70">
                {pick(language, copy.home.honors.subtitle).map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
              <div className="mt-6 flex items-center gap-3 lg:justify-end">
                <button
                  type="button"
                  onClick={() => setActiveHonor((current) => mod(current - 1, homeHonors.length))}
                  className="flex size-11 items-center justify-center rounded-full border border-white/35 text-white/80 transition hover:scale-105 hover:border-[#d9b27a] hover:text-[#d9b27a]"
                  aria-label="Previous honor year"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveHonor((current) => mod(current + 1, homeHonors.length))}
                  className="flex size-11 items-center justify-center rounded-full border border-white/35 text-white/80 transition hover:scale-105 hover:border-[#d9b27a] hover:text-[#d9b27a]"
                  aria-label="Next honor year"
                >
                  <ChevronRight className="size-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-5 gap-2">
            {homeHonors.map((item, index) => {
              const active = index === activeHonor;
              return (
                <button
                  type="button"
                  key={item.year}
                  onClick={() => setActiveHonor(index)}
                  className={`flex h-11 items-center justify-start px-4 text-left text-[1.25rem] font-bold transition ${
                    active ? "bg-[#d9b27a] font-bold text-black" : "bg-[#484643] text-black/80 opacity-70 hover:opacity-100"
                  }`}
                >
                  {item.year}
                </button>
              );
            })}
          </div>
          <div className="mt-4 h-[5px] w-full bg-black" />

          <div className="mt-4 divide-y divide-white/15 border-b border-white/15">
            {honor.honors.map((item) => (
              <div key={`${honor.year}-${item.date}-${item.title}`} className="py-8 lg:py-10">
                <div className="flex min-w-0 flex-wrap items-center gap-6">
                  <h3 className="text-[2.25rem] font-semibold text-[#d9b27a]">
                    {item.title}
                  </h3>
                  <div className="hidden h-7 w-px bg-[#d9b27a]/50 sm:block" />
                  <span className="text-[1.75rem] font-medium text-[#d9b27a]">
                    {item.date}
                  </span>
                </div>
                <p className="mt-4 text-[1.5rem] leading-relaxed text-[#cfd5df]/70">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              href="/about#honors"
              className="group inline-flex items-center gap-4 border-b-2 border-[#d9b27a] pb-2 text-[1.5rem] font-semibold uppercase tracking-[0.12em] text-[#d9b27a] transition-all duration-300 hover:translate-x-1 hover:border-white hover:text-white"
            >
              {pick(language, copy.common.seeMore)}
              <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-2" strokeWidth={1.5} />
            </Link>
          </div>
          </div>
      </section>

      <section id="events" className="site-shell relative bg-[#171717] py-20 lg:py-28 [&>*]:relative [&>*]:z-10">
        <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-[auto_1fr]">
          <h2 className="text-[7.5rem] leading-none">{pick(language, copy.home.events.title)}</h2>
          <p className="text-[1.75rem] capitalize leading-[2.125rem] tracking-[0.04em] text-[#cfd5df]/70 lg:text-right">
            {pick(language, copy.home.events.subtitle).map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>

        <div className="relative mt-12 h-[56rem] w-full overflow-hidden sm:h-[58rem]">
          {homeEvents.map((event, index) => {
            const offset = mod(index - activeEvent, homeEvents.length);
            const position = offset === 0 ? "active" : offset === 1 ? "next" : offset === homeEvents.length - 1 ? "prev" : "hidden";
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
                className={`absolute top-4 w-[62.1875rem] max-w-full cursor-pointer overflow-visible rounded-none bg-transparent p-0 text-left shadow-2xl shadow-black/40 transition-all duration-700 ease-out ${
                  position === "active" ? "hover:scale-[1.02]" : "hover:opacity-75"
                }`}
                style={styles}
                aria-label={event.title}
              >
                <div className="bg-transparent">
                  <div className="relative aspect-[16/9] overflow-hidden bg-[#151515]">
                    <ImageWithFallback src={event.img} alt="" className="size-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                    <div className="absolute bottom-6 left-[4.5625rem] w-[calc(70%+1rem)]">
                      <p className="ml-4 text-[1.5rem] font-light leading-none text-[#D9B27A]">
                        {event.date}
                      </p>
                      <div className="mt-3 border-l-2 border-[#D79D48] pl-4">
                        <p className="text-[1.75rem] font-light leading-snug text-white">
                          {event.title}
                        </p>
                      </div>
                    </div>
                  </div>
                  {position === "active" ? (
                    <div className="relative mt-8 overflow-hidden bg-[linear-gradient(135deg,#333333_0%,#5b5955_100%)] px-[5.5625rem] py-6 text-white">
                      <div className="pointer-events-none absolute bottom-0 right-0 h-full w-full bg-[#706d69] [clip-path:polygon(100%_50%,100%_100%,70%_100%)]" />
                      <p className="relative z-10 text-[1.75rem] font-light leading-relaxed text-white/82">{event.desc}</p>
                    </div>
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>

        <div className="relative mt-1 h-12 w-full">
          <div className="absolute left-1/2 top-0 flex w-max -translate-x-1/2 items-center gap-6">
            <button
              type="button"
              onClick={() => updateEvent(-1)}
              className="flex size-12 items-center justify-center rounded-full border-2 border-white/50 opacity-70 transition hover:scale-105 hover:border-[#d9b27a] hover:opacity-100"
              aria-label="Previous event"
            >
              <ChevronLeft className="size-5" />
            </button>
            <div className="flex items-center gap-3">
              {homeEvents.map((event, index) => (
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
          <div className="absolute right-0 top-0">
            <Link
              href="/events"
              className="group inline-flex items-center gap-3 border-b-2 border-[#d9b27a] pb-2 text-[1.5rem] font-semibold uppercase tracking-[0.12em] text-[#d9b27a] transition-all duration-300 hover:translate-x-1 hover:border-white hover:text-white"
            >
              {pick(language, copy.common.seeMore)}
              <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-2" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#202020] py-20 lg:py-28 [&>*]:relative [&>*]:z-10">
        <div className="w-full pl-[5rem] pr-[var(--shell-md)]">
          <h2 className="max-w-[62rem] text-balance text-[2.25rem] font-medium uppercase leading-snug">
            {pick(language, copy.home.clients.title)}
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
                    className="flex h-24 w-44 shrink-0 items-center justify-center rounded-md border border-black/10 bg-white px-6 shadow-lg shadow-black/10 sm:h-28 sm:w-56"
                  >
                    <ImageWithFallback src={logo} alt="Client logo" className="max-h-[70%] max-w-full object-contain" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="relative z-10">
        <SiteFooter />
      </div>
    </main>
  );
}
