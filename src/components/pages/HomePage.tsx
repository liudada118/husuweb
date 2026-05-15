"use client";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { PageTriangle } from "@/components/shared/PageTriangle";
import { events as eventItems, formatEventDate, localizeEvent } from "@/data/events";
import { pick, useLanguage } from "@/i18n/LanguageProvider";
import { copy } from "@/i18n/copy";
import { assetUrl } from "@/lib/assets";
import { rememberReturnPosition, useRestoreReturnPosition } from "@/lib/returnPosition";

const industries = [
  {
    name: "Private Equity",
    slug: "private-equity",
    img: "/assets/home/INDUSTRIES1.webp",
    cls: "lg:col-span-2",
  },
  {
    name: "Finance",
    slug: "finance",
    img: "/assets/home/INDUSTRIES2.webp",
    cls: "lg:col-span-1",
  },
  {
    name: "Real Estate",
    slug: "real-estate",
    img: "/assets/home/INDUSTRIES3.webp",
    cls: "lg:col-span-1 lg:row-span-2",
  },
  {
    name: "Sports and E-Sports",
    slug: "sports-and-e-sports",
    img: "/assets/home/INDUSTRIES4.webp",
    cls: "lg:col-span-1",
  },
  {
    name: "International Trade",
    slug: "international-trade",
    img: "/assets/home/INDUSTRIES5.webp",
    cls: "lg:col-span-1",
  },
  {
    name: "Cyber Tech and Game",
    slug: "cyber-tech-and-game",
    img: "/assets/home/INDUSTRIES6.png",
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
        title: 'Diamond Sponsor of the 22nd "CIETAC Cup" Voice of Moot series training activities',
        date: "Nov. 2024",
        desc: 'Tiger Partners was honored to be the Diamond Sponsor of the 22nd "CIETAC Cup" Voice of Moot series training activities.',
      },
      {
        title: "Benchmark Litigation China 2024: Dispute Resolution",
        date: "Jun. 2024",
        desc: "Tiger Partners was listed in the Benchmark Litigation China 2024 Dispute Resolution list as a Notable Firm.",
      },
      {
        title: "World Arbitration Update 2024 China Edition",
        date: "May. 2024",
        desc: "Tiger Partners sponsored the World Arbitration Update 2024 (WAU 2024) China Edition.",
      },
      {
        title: "ALB China 2024 Firms to Watch",
        date: "Jan. 2024",
        desc: "Tiger Partners was selected in the 2024 ALB China Firms to Watch list.",
      },
    ],
  },
  {
    year: "2023",
    honors: [
      {
        title: "Chambers Beijing Forum 2023",
        date: "Apr. 2023",
        desc: "Tiger Partners sponsored the Chambers Beijing Forum 2023 and was invited to participate.",
      },
    ],
  },
  {
    year: "2022",
    honors: [
      {
        title: 'Silver Sponsor of the 20th "CIETAC Cup" Voice of Moot series training activities',
        date: "Nov. 2022",
        desc: 'Tiger Partners was honored to be the Silver Sponsor of the 20th "CIETAC Cup" Voice of Moot series training activities.',
      },
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
      {
        title: "Wan Li appointed as arbitrator of Dalian International Arbitration Court",
        date: "Mar. 2022",
        desc: "Mr. Wan Li was engaged as the 6th arbitrator of Dalian International Arbitration Court.",
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
  {
    year: "2020",
    honors: [
      {
        title: "Beijing Bar Association Foreign-Related Lawyer Talent Pool",
        date: "Oct. 2020",
        desc: "Xu Min and Wan Li were selected into the Foreign-Related Lawyer Talent Pool of the Beijing Bar Association.",
      },
      {
        title: "China Business Law Journal officially included Tiger Partners",
        date: "Sep. 2020",
        desc: "China Business Law Journal officially included Beijing Tiger Partners Law Firm.",
      },
      {
        title: "ALB interview recognition",
        date: "May. 2020",
        desc: "Liu Yuxuan was interviewed by ALB and recognized as an emerging star in dispute resolution.",
      },
    ],
  },
  {
    year: "2019",
    honors: [
      {
        title: "Asialaw Profiles 2020",
        date: "Sep. 2019",
        desc: "Liu Yuxuan was recognized as a Notable Practitioner in dispute resolution in the 2020 China legal market list.",
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
  {
    year: "2020",
    honors: [
      {
        title: "许旻律师和万力律师入选北京市律师协会涉外律师人才库",
        date: "2020年10月",
        desc: "许旻律师和万力律师入选北京市律师协会涉外律师人才库。",
      },
      {
        title: "《商法》正式收录北京虎诉律师事务所",
        date: "2020年9月",
        desc: "知名法律媒体《商法》（China Business Law Journal）正式收录北京虎诉律师事务所。",
      },
      {
        title: "刘煜暄律师接受 ALB 专访",
        date: "2020年5月",
        desc: "刘煜暄律师接受 ALB 专访，被赞誉为争议解决领域的耀眼新星。",
      },
    ],
  },
  {
    year: "2019",
    honors: [
      {
        title: "刘煜暄律师获 Asialaw Profiles 知名律师称号",
        date: "2019年9月",
        desc: "刘煜暄律师获《亚洲法律概况》2020 中国法律市场争议解决领域 Notable Practitioner 称号。",
      },
    ],
  },
];

type HomeHonorYear = (typeof honorsByYear)[number];

const zhHomeSponsorHonors: Record<string, HomeHonorYear["honors"]> = {
  "2024": [
    {
      title: "虎诉荣任第二十二届“贸仲杯”VOICE OF MOOT系列培训活动钻石赞助商",
      date: "2024年11月",
      desc: "虎诉荣任第二十二届“贸仲杯”VOICE OF MOOT系列培训活动钻石赞助商。",
    },
    {
      title: "虎诉赞助2024世界仲裁最新动态大会（WAU）中国站",
      date: "2024年5月",
      desc: "虎诉赞助2024世界仲裁最新动态大会（WAU 2024）中国站。",
    },
  ],
  "2022": [
    {
      title: "虎诉荣幸成为第二十届“贸仲杯”Voice of Moot系列培训活动银牌赞助商",
      date: "2022年11月",
      desc: "虎诉荣幸成为第二十届“贸仲杯”Voice of Moot系列培训活动银牌赞助商。",
    },
    {
      title: "万力律师受聘为大连国际仲裁院（大连仲裁委员会）第六届仲裁员",
      date: "2022年3月",
      desc: "万力律师受聘为大连国际仲裁院（大连仲裁委员会）第六届仲裁员。",
    },
  ],
};

const zhHomeChambers2023: HomeHonorYear = {
  year: "2023",
  honors: [
    {
      title: "虎诉赞助2023钱伯斯北京论坛并受邀参会",
      date: "2023年4月",
      desc: "虎诉赞助2023钱伯斯北京论坛并受邀参会。",
    },
  ],
};

function withZhHomeSponsorHonors(items: HomeHonorYear[]) {
  return items.flatMap((item) => {
    if (item.year === "2024") {
      const [diamondSponsor, wauSponsor] = zhHomeSponsorHonors["2024"];
      return [
        {
          ...item,
          honors: [diamondSponsor, item.honors[0], wauSponsor, ...item.honors.slice(1)],
        },
        zhHomeChambers2023,
      ];
    }

    if (item.year === "2022") {
      const [silverSponsor, dalianArbitrator] = zhHomeSponsorHonors["2022"];
      return [
        {
          ...item,
          honors: [silverSponsor, ...item.honors, dalianArbitrator],
        },
      ];
    }

    return [item];
  });
}

const homeEventSlugs = [
  "kinsey-kang-hong-kong-legal-counsel",
  "chambers-forum-beijing-2023",
  "shifoying-nanli-community-pairing",
  "tiger-partners-third-anniversary",
  "cietac-cup-voice-of-moot-sponsor",
] as const;

function formatHomeEventDate(date: string, language: "en" | "zh") {
  if (language === "zh") {
    return `${date.slice(0, 4)}年${Number(date.slice(4, 6))}月${Number(date.slice(6, 8))}日`;
  }

  return formatEventDate(date, language);
}

function getHomeEvents(language: "en" | "zh") {
  return homeEventSlugs
    .map((slug) => eventItems.find((event) => event.slug === slug))
    .filter((event): event is NonNullable<typeof event> => Boolean(event))
    .map((event) => {
      const localized = localizeEvent(event, language);

      return {
        slug: event.slug,
        title: [localized.localizedCategory, localized.localizedTitle].filter(Boolean).join(" | "),
        date: formatHomeEventDate(event.date, language),
        img: event.image,
        desc: localized.localizedSummary,
      };
    });
}

const pngLogoIndexes = new Set([5, 8, 10, 11, 14, 16, 18, 19, 22, 41]);

const clientLogos = Array.from({ length: 42 }, (_, index) => {
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
  useRestoreReturnPosition();
  const [activeHonor, setActiveHonor] = useState(0);
  const [honorWindowStart, setHonorWindowStart] = useState(0);
  const [activeEvent, setActiveEvent] = useState(0);
  const homeHonors = language === "zh" ? withZhHomeSponsorHonors(zhHomeHonorsByYear) : honorsByYear;
  const homeEvents = getHomeEvents(language);
  const honor = homeHonors[activeHonor];
  const honorWindowSize = Math.min(5, homeHonors.length);
  const visibleHonorIndexes = Array.from({ length: honorWindowSize }, (_, offset) =>
    mod(honorWindowStart + offset, homeHonors.length),
  );
  const industryLabels = pick(language, copy.home.industries.labels);

  const updateHonor = (direction: -1 | 1) => {
    const nextHonor = mod(activeHonor + direction, homeHonors.length);
    let nextStart = honorWindowStart;

    if (!visibleHonorIndexes.includes(nextHonor)) {
      if (activeHonor === 0 && direction === -1) {
        nextStart = homeHonors.length - honorWindowSize;
      } else if (activeHonor === homeHonors.length - 1 && direction === 1) {
        nextStart = 0;
      } else {
        nextStart = direction === 1 ? mod(nextHonor - honorWindowSize + 1, homeHonors.length) : nextHonor;
      }
    }

    setHonorWindowStart(nextStart);
    setActiveHonor(nextHonor);
  };

  const updateEvent = (direction: -1 | 1) => {
    setActiveEvent((current) => mod(current + direction, homeEvents.length));
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveEvent((current) => mod(current + 1, homeEvents.length));
    }, 5000);

    return () => window.clearInterval(timer);
  }, [homeEvents.length, activeEvent]);

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#171717] text-white [&>section]:relative [&>section]:z-10">
      <PageTriangle
        className="right-0 top-[calc(100svh+135rem)] z-0 h-[calc(100%-100svh-135rem)] w-full bg-[#2a2a2a] opacity-10"
      />
      <SiteHeader active="HOME" />

      <section className="relative w-full overflow-hidden bg-[#0d0d0d]">
        <div className="absolute inset-0">
          <video
            className="absolute left-1/2 top-0 block h-full w-screen min-w-full max-w-none -translate-x-1/2 object-cover opacity-90 md:left-0 md:w-full md:translate-x-0"
            src={assetUrl("/assets/home/海浪0508.mp4")}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
          <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-b from-transparent to-[#171717]" />
        </div>

        <div className="relative z-10 flex min-h-[100svh] items-center justify-center px-5 py-32">
          <h1 className="sr-only">虎诉律师事务所 Tiger Partners</h1>
          <p
            aria-hidden="true"
            className="hero-flow-text max-w-none whitespace-nowrap text-center text-[clamp(1.8rem,7vw,3rem)] font-bold leading-none tracking-[0.02em] md:text-[6.25rem] md:tracking-[0.06em]"
          >
            WE KNOW HOW TO WIN
          </p>
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
            <p className={`relative z-10 max-w-[84rem] leading-[1.45] ${language === "zh" ? "text-[2rem]" : "text-[2.5rem]"}`}>
              {language === "en" ? (
                <>
                  {copy.home.vision.body.en.map((line, index, lines) => (
                    <span key={line} className={index === 0 ? "font-light italic" : "font-bold"}>
                      {line}
                      {index < lines.length - 1 ? <br /> : null}
                    </span>
                  ))}
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
              <span
                className={`rotate-[270deg] whitespace-nowrap font-normal leading-none tracking-[-0.03em] text-[#d9b27a]/70 ${
                  language === "zh" ? "text-[7rem]" : "text-[8.75rem]"
                }`}
              >
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
              href={`/industries/${item.slug}?from=home`}
              onClick={rememberReturnPosition}
              className={`group relative min-w-0 overflow-hidden bg-[#141414] shadow-xl transition-transform duration-500 hover:-translate-y-2 ${item.cls}`}
            >
              <div className="absolute left-0 top-0 z-20 h-[2px] w-full bg-gradient-to-r from-transparent via-[#f3dfb5] to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
              <ImageWithFallback
                src={item.img}
                alt={industryLabels[index] ?? item.name}
                decoding="sync"
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
            <h2 className="gold-title max-w-full pb-3 text-[4rem] font-light leading-[1.12] md:text-[6.875rem]">{pick(language, copy.home.honors.title)}</h2>
            <div className="lg:text-right">
              <p className="text-pretty text-[1.15rem] font-light italic capitalize leading-relaxed text-[#cfd5df]/70 md:text-[1.75rem] md:leading-[2.375rem]">
                {pick(language, copy.home.honors.subtitle).map((line, index, lines) => (
                  <span key={line} className="block">
                    {line}
                    {index < lines.length - 1 ? " " : null}
                  </span>
                ))}
              </p>
              <div className="mt-6 flex items-center gap-3 lg:justify-end">
                <button
                  type="button"
                  onClick={() => updateHonor(-1)}
                  className="flex size-11 items-center justify-center rounded-full border border-white/35 text-white/80 transition hover:scale-105 hover:border-[#d9b27a] hover:text-[#d9b27a]"
                  aria-label="Previous honor year"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => updateHonor(1)}
                  className="flex size-11 items-center justify-center rounded-full border border-white/35 text-white/80 transition hover:scale-105 hover:border-[#d9b27a] hover:text-[#d9b27a]"
                  aria-label="Next honor year"
                >
                  <ChevronRight className="size-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-2 sm:grid-cols-5">
            {visibleHonorIndexes.map((index) => {
              const item = homeHonors[index];
              const active = index === activeHonor;
              return (
                <button
                  type="button"
                  key={item.year}
                  onClick={() => setActiveHonor(index)}
                  className={`flex h-11 min-w-0 items-center justify-start px-4 text-left text-[1.1rem] font-bold transition md:text-[1.25rem] ${
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
                <div className="flex min-w-0 flex-wrap items-center gap-3 md:gap-6">
                  <h3 className="min-w-0 max-w-full break-words text-[1.45rem] font-semibold leading-snug text-[#d9b27a] md:text-[2.25rem]">
                    {item.title}
                  </h3>
                  <div className="hidden h-7 w-px bg-[#d9b27a]/50 sm:block" />
                  <span className="text-[1.15rem] font-medium text-[#d9b27a] md:text-[1.75rem]">
                    {item.date}
                  </span>
                </div>
                <p className="mt-4 break-words text-[1rem] leading-relaxed text-[#cfd5df]/70 md:text-[1.5rem]">
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
          <h2 className="text-[4rem] leading-none md:text-[7.5rem]">{pick(language, copy.home.events.title)}</h2>
          <p className="text-[1.15rem] capitalize leading-relaxed tracking-[0.04em] text-[#cfd5df]/70 md:text-[1.75rem] md:leading-[2.125rem] lg:text-right">
            {pick(language, copy.home.events.subtitle).map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>

        <div className="relative mt-8 h-[34rem] w-full overflow-hidden sm:h-[58rem] md:mt-12">
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
              <Link
                href={`/events/${event.slug}?from=home`}
                onClick={rememberReturnPosition}
                key={event.slug}
                className={`absolute top-4 w-[62.1875rem] max-w-[calc(100vw-2.5rem)] cursor-pointer overflow-visible rounded-none bg-transparent p-0 text-left shadow-2xl shadow-black/40 transition-all duration-700 ease-out md:max-w-full ${
                  position === "active" ? "hover:scale-[1.02]" : "hover:opacity-75"
                }`}
                style={styles}
                aria-label={event.title}
              >
                <div className="bg-transparent">
                  <div className="relative aspect-[16/9] overflow-hidden bg-[#151515]">
                    <ImageWithFallback
                      src={event.img}
                      alt=""
                      loading={position === "active" ? "eager" : "lazy"}
                      fetchPriority={position === "active" ? "high" : "auto"}
                      className="size-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                    <div className="absolute bottom-4 left-4 w-[calc(100%-2rem)] md:bottom-6 md:left-[4.5625rem] md:w-[calc(70%+1rem)]">
                      <p className="ml-3 text-[1rem] font-light leading-none text-[#D9B27A] md:ml-4 md:text-[1.5rem]">
                        {event.date}
                      </p>
                      <div className="mt-2 border-l-2 border-[#D79D48] pl-3 md:mt-3 md:pl-4">
                        <p className="text-[1.05rem] font-light leading-snug text-white md:text-[1.75rem]">
                          {event.title}
                        </p>
                      </div>
                    </div>
                  </div>
                  {position === "active" ? (
                    <div className="relative mt-4 overflow-hidden bg-[linear-gradient(135deg,#333333_0%,#5b5955_100%)] px-5 py-4 text-white md:mt-8 md:px-[5.5625rem] md:py-6">
                      <div className="pointer-events-none absolute bottom-0 right-0 h-full w-full bg-[#706d69] [clip-path:polygon(100%_50%,100%_100%,70%_100%)]" />
                      <p className="relative z-10 overflow-hidden text-[1rem] font-light leading-relaxed text-white/82 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:4] md:text-[1.75rem] md:[-webkit-line-clamp:5]">
                        {event.desc}
                      </p>
                    </div>
                  ) : null}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-4 flex w-full flex-col items-center gap-6 md:relative md:mt-1 md:h-12 md:block">
          <div className="flex w-max items-center gap-4 md:absolute md:left-1/2 md:top-0 md:-translate-x-1/2 md:gap-6">
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
          <div className="md:absolute md:right-0 md:top-0">
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
              >
                {[...row, ...row].map((logo, index) => (
                  <div
                    key={`${logo}-${index}`}
                    className="flex h-24 w-44 shrink-0 items-center justify-center rounded-md border border-black/10 bg-white px-6 shadow-lg shadow-black/10 sm:h-28 sm:w-56"
                  >
                    <ImageWithFallback src={logo} alt="Client logo" loading="lazy" className="h-[80%] w-auto max-w-full object-contain" />
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
