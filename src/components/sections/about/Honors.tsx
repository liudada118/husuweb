"use client";

import { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { pick, useLanguage } from "@/i18n/LanguageProvider";
import { copy } from "@/i18n/copy";

type Award = { title: string; date: string; body: string; href?: string };
type YearItem = { year: string; count: string; awards: Award[] };

const data: YearItem[] = [
  {
    year: "2026",
    count: "2 Distinctions",
    awards: [
      {
        title: "Chambers Greater China Region 2026",
        date: "2026-01",
        body: "Tiger Partners was listed in Dispute Resolution (PRC Firms) in the Chambers Greater China Region Guide 2026.",
        href: "https://mp.weixin.qq.com/s/_qdY3mqxeVy6Dw8LB_ap7Q",
      },
      {
        title: "ALB China Law Awards 2026",
        date: "2026-03",
        body: "Tiger Partners was shortlisted with two nominations: Dispute Resolution Boutique Law Firm of the Year and Rising Law Firm of the Year.",
        href: "https://mp.weixin.qq.com/s/EBs3ZNGEgBuYQedRRfpQEQ",
      },
    ],
  },
  {
    year: "2025",
    count: "8 Distinctions",
    awards: [
      {
        title: "Legal 500 China 2026",
        date: "2025-11",
        body: "Tiger Partners was listed in Dispute Resolution: Arbitration: PRC firms and Dispute Resolution: Litigation: PRC firms.",
        href: "https://mp.weixin.qq.com/s/mOZ5OQfwytgjlTcba_6ItA",
      },
      {
        title: "Legal 500 China Elite",
        date: "2025-11",
        body: "Liu Yuxuan, Wan Li and Zoe Zhang were awarded in the inaugural Beijing Elite - Commercial Disputes list.",
        href: "https://mp.weixin.qq.com/s/mOZ5OQfwytgjlTcba_6ItA",
      },
      {
        title: "China Business Law Journal Excellence Awards 2025",
        date: "2025-07",
        body: "Tiger Partners won the Excellence Award in the Practice Area: Cross-Border Litigation.",
        href: "https://mp.weixin.qq.com/s/IElL0MRiOeuHn3OzokXfFA",
      },
      {
        title: "ALB China Dispute Resolution Rankings 2025",
        date: "2025-06",
        body: "Tiger Partners was listed in the rankings and recognized as a Notable Firm in the Litigation field.",
        href: "https://mp.weixin.qq.com/s/radqvqkstgSvqUEVtYRK3Q",
      },
      {
        title: "ALB China Law Awards 2025",
        date: "2025-04",
        body: "Tiger Partners was nominated for Boutique Law Firm of the Year.",
        href: "https://mp.weixin.qq.com/s/AtccRm2aC-5BZRn6_2avWQ",
      },
      {
        title: "Chambers Global Guide 2025",
        date: "2025-02",
        body: "Tiger Partners was listed in Dispute Resolution (PRC Firms).",
        href: "https://mp.weixin.qq.com/s/jDgYCExH_ZsVHdxW00QoMw",
      },
      {
        title: "Chambers Greater China Region 2025",
        date: "2025-01",
        body: "Tiger Partners was listed in Dispute Resolution (PRC Firms).",
        href: "https://mp.weixin.qq.com/s/hzEG_wO_RskxHZ85VtZ-Ww",
      },
      {
        title: "Chambers Global Practice Guides 2025",
        date: "2025-01",
        body: "Liu Yuxuan, Xu Min, Wan Li and Zoe Zhang were exclusively invited to author the Dispute Resolution Overview China Chapter.",
      },
    ],
  },
  {
    year: "2024",
    count: "2 Distinctions",
    awards: [
      {
        title: "Benchmark Litigation China 2024",
        date: "2024-06",
        body: "Tiger Partners was listed in the Dispute Resolution list as a Firm to Watch.",
        href: "https://mp.weixin.qq.com/s/1BLkOkRN9_AXkw--ubFNQQ",
      },
      {
        title: "ALB China Firms to Watch 2024",
        date: "2024-01",
        body: "Tiger Partners was selected in the ALB China Firms to Watch list.",
        href: "https://mp.weixin.qq.com/s/E0M5Jwa0ElgDc5-zvnVsew",
      },
    ],
  },
  {
    year: "2022",
    count: "7 Distinctions",
    awards: [
      {
        title: "China Business Law Awards 2022",
        date: "2022-06",
        body: "Tiger Partners was listed in Dispute Resolution (Domestic) and Pro-Bono categories.",
        href: "https://mp.weixin.qq.com/s/Dcahw4a2gWtAeAZ5_oTkXg",
      },
      {
        title: "LEGALBAND China Top Law Firms 2022",
        date: "2022-05",
        body: "Tiger Partners was recognized as Firm to Watch in dispute resolution litigation and compliance.",
        href: "https://mp.weixin.qq.com/s/2dhrPQ18vC8m860xllZteg",
      },
      {
        title: "Benchmark Litigation China 2022",
        date: "2022-05",
        body: "Tiger Partners was recognized as a Notable Firm in commercial disputes resolution in Beijing.",
        href: "https://mp.weixin.qq.com/s/S9S9_u4eqfX-SLjCHHIFWw",
      },
      {
        title: "LEGALBAND China Top Lawyers 2022",
        date: "2022-05",
        body: "Liu Yuxuan was recognized as a rising star in dispute resolution litigation and Wan Li was recognized in compliance.",
        href: "https://mp.weixin.qq.com/s/2dhrPQ18vC8m860xllZteg",
      },
      {
        title: "LEGALBAND China Law Awards 2022",
        date: "2022-03",
        body: "Tiger Partners was nominated for Rising Law Firm of the Year.",
        href: "https://mp.weixin.qq.com/s/XZXux5kRZ65PHROSJbj7hg",
      },
      {
        title: "China Business Law Journal A-List 2021",
        date: "2022-01",
        body: "Liu Yuxuan was selected for The A-List legal elite.",
        href: "https://mp.weixin.qq.com/s/fJpKTpsvv13xsNTegaDWKw",
      },
      {
        title: "ALB China Firms to Watch 2022",
        date: "2022-01",
        body: "Tiger Partners was selected for the ALB China Firms to Watch list.",
        href: "https://mp.weixin.qq.com/s/V6URAotVuKqOc5FPCNrcLA",
      },
    ],
  },
  {
    year: "2021",
    count: "6 Distinctions",
    awards: [
      {
        title: "Beijing Lawyers Association Professional Committees",
        date: "2021-10",
        body: "Liu Yuxuan, Xu Min and Wan Li were elected as members of professional committees of the 11th Beijing Lawyers Association.",
        href: "https://mp.weixin.qq.com/s/ZnKhh9BgIU55Fiq_F-n3qQ",
      },
      {
        title: "Benchmark Litigation China 2021",
        date: "2021-06",
        body: "Tiger Partners was recognized as a Notable Firm, and Liu Yuxuan and Wan Li were listed as recommended dispute resolution lawyers in Beijing.",
        href: "https://mp.weixin.qq.com/s/QY2BANTbmd43qWi_CKziwQ",
      },
      {
        title: "China Business Law Journal Firm to Watch",
        date: "2021-05",
        body: "Tiger Partners was selected as Firm to Watch.",
        href: "https://mp.weixin.qq.com/s/jE77_1FcZgSmlS9KY0TYCg",
      },
      {
        title: "LEGALBAND China Top Lawyers 2021",
        date: "2021-04",
        body: "Liu Yuxuan was recognized as a rising star in dispute resolution litigation.",
        href: "https://mp.weixin.qq.com/s/j-99ykPm_F1MY0DNkTFNIQ",
      },
      {
        title: "ALB China Law Awards 2021",
        date: "2021-04",
        body: "Tiger Partners was nominated for Rising Law Firm of the Year.",
        href: "https://mp.weixin.qq.com/s/d2zm09itvvEOcAMjwkxFvg",
      },
      {
        title: "China Business Law Journal Rising Stars 2021",
        date: "2021-03",
        body: "Liu Yuxuan and Wan Li were rated as Rising Stars Top 40.",
        href: "https://mp.weixin.qq.com/s/rP92POWLpql0e0SokZFAEg",
      },
    ],
  },
  {
    year: "2020",
    count: "3 Distinctions",
    awards: [
      {
        title: "Beijing Bar Association Foreign-Related Lawyer Talent Pool",
        date: "2020-10",
        body: "Xu Min and Wan Li were selected into the Foreign-Related Lawyer Talent Pool of the Beijing Bar Association.",
        href: "https://mp.weixin.qq.com/s/xjJ_NZ1wAF5UWhBBFBXR0g",
      },
      {
        title: "China Business Law Journal",
        date: "2020-09",
        body: "China Business Law Journal officially included Tiger Partners.",
        href: "https://mp.weixin.qq.com/s/pNYkFIjQAdk9-FihC9ruRw",
      },
      {
        title: "ALB Interview Recognition",
        date: "2020-05",
        body: "Liu Yuxuan was interviewed by ALB and recognized as an emerging star in dispute resolution.",
        href: "https://mp.weixin.qq.com/s/qAbZbbU28WuUpSNMRPMXtg",
      },
    ],
  },
  {
    year: "2019",
    count: "1 Distinction",
    awards: [
      {
        title: "Asialaw Profiles 2020",
        date: "2019-09",
        body: "Liu Yuxuan was recognized as a Notable Practitioner in dispute resolution in the 2020 China legal market list.",
      },
    ],
  },
];

const zhData: YearItem[] = [
  {
    year: "2026",
    count: "2项荣誉",
    awards: [
      {
        title: "虎诉荣登《钱伯斯大中华区指南2026》争议解决榜单",
        date: "2026-01",
        body: "虎诉荣登《钱伯斯大中华区指南2026》争议解决（中资律师事务所）榜单。",
        href: "https://mp.weixin.qq.com/s/_qdY3mqxeVy6Dw8LB_ap7Q",
      },
      {
        title: "虎诉荣登ALB2026年度中国法律大奖入围名单",
        date: "2026-03",
        body: "虎诉获得两项提名：“年度争议解决精品律师事务所大奖”、“年度最具潜力律师事务所大奖”。",
        href: "https://mp.weixin.qq.com/s/EBs3ZNGEgBuYQedRRfpQEQ",
      },
    ],
  },
  {
    year: "2025",
    count: "8项荣誉",
    awards: [
      {
        title: "虎诉入选Legal 500 2026 中国区榜单",
        date: "2025-11",
        body: "虎诉入选争议解决-仲裁-中国律所、争议解决-诉讼-中国律所。",
        href: "https://mp.weixin.qq.com/s/mOZ5OQfwytgjlTcba_6ItA",
      },
      {
        title: "虎诉律师荣获首届Legal 500中国精英奖项",
        date: "2025-11",
        body: "虎诉刘煜暄律师、万力律师、张莉律师荣获首届Legal 500中国精英-“北京精英·商业争议”。",
        href: "https://mp.weixin.qq.com/s/mOZ5OQfwytgjlTcba_6ItA",
      },
      {
        title: "虎诉荣获《商法》卓越律所大奖2025",
        date: "2025-07",
        body: "虎诉荣获《商法》（China Business Law Journal）卓越律所大奖2025执业领域奖项：跨境诉讼/Cross-border litigation。",
        href: "https://mp.weixin.qq.com/s/IElL0MRiOeuHn3OzokXfFA",
      },
      {
        title: "虎诉荣登2025年ALB China争议解决业务排名榜单",
        date: "2025-06",
        body: "虎诉在诉讼领域荣获“值得关注律所/Notable Firms”。",
        href: "https://mp.weixin.qq.com/s/radqvqkstgSvqUEVtYRK3Q",
      },
      {
        title: "虎诉荣获2025年ALB“年度精品律师事务所大奖”提名",
        date: "2025-04",
        body: "虎诉荣获2025年ALB“年度精品律师事务所大奖”提名。",
        href: "https://mp.weixin.qq.com/s/AtccRm2aC-5BZRn6_2avWQ",
      },
      {
        title: "虎诉荣登《钱伯斯全球指南2025》",
        date: "2025-02",
        body: "虎诉入选争议解决（中资律师事务所）榜单。",
        href: "https://mp.weixin.qq.com/s/jDgYCExH_ZsVHdxW00QoMw",
      },
      {
        title: "虎诉荣登《钱伯斯大中华区指南2025》",
        date: "2025-01",
        body: "虎诉入选争议解决（中资律师事务所）榜单。",
        href: "https://mp.weixin.qq.com/s/hzEG_wO_RskxHZ85VtZ-Ww",
      },
      {
        title: "虎诉律师受邀撰写《2025钱伯斯全球指南-中国争议解决概览》",
        date: "2025-01",
        body: "虎诉刘煜暄律师、许旻律师、万力律师、张莉律师受邀撰写《2025钱伯斯全球指南-中国争议解决概览》。",
      },
    ],
  },
  {
    year: "2024",
    count: "2项荣誉",
    awards: [
      {
        title: "虎诉荣登2024 Benchmark Litigation中国争议解决榜单",
        date: "2024-06",
        body: "虎诉律师事务所荣幸入选为受关注律所。",
        href: "https://mp.weixin.qq.com/s/1BLkOkRN9_AXkw--ubFNQQ",
      },
      {
        title: "虎诉入选2024 ALB China 精品律所榜单",
        date: "2024-01",
        body: "虎诉入选 2024 ALB China 精品律所榜单。",
        href: "https://mp.weixin.qq.com/s/E0M5Jwa0ElgDc5-zvnVsew",
      },
    ],
  },
  {
    year: "2022",
    count: "7项荣誉",
    awards: [
      {
        title: "虎诉荣获2022《商法》卓越律所大奖",
        date: "2022-06",
        body: "虎诉入选“境内争议解决”推荐榜单、荣获“卓越公益律所”。",
        href: "https://mp.weixin.qq.com/s/Dcahw4a2gWtAeAZ5_oTkXg",
      },
      {
        title: "虎诉入选2022年度LEGALBAND中国顶级律所排行榜",
        date: "2022-05",
        body: "虎诉入选争议解决（诉讼）及合规两个领域的“潜力律所”。",
        href: "https://mp.weixin.qq.com/s/2dhrPQ18vC8m860xllZteg",
      },
      {
        title: "虎诉荣登Benchmark Litigation 2022年度争议解决榜单",
        date: "2022-05",
        body: "虎诉被评为中国北京地区商业纠纷领域“值得关注的律所（Notable Firm）”。",
        href: "https://mp.weixin.qq.com/s/S9S9_u4eqfX-SLjCHHIFWw",
      },
      {
        title: "刘煜暄律师、万力律师入选LEGALBAND中国顶级律师排行榜",
        date: "2022-05",
        body: "刘煜暄律师获评争议解决（诉讼）领域“后起之秀”，万力律师获评合规领域“后起之秀”。",
        href: "https://mp.weixin.qq.com/s/2dhrPQ18vC8m860xllZteg",
      },
      {
        title: "虎诉获LEGALBAND2022年度最佳新锐律师事务所提名",
        date: "2022-03",
        body: "虎诉获LEGALBAND2022年度最佳新锐律师事务所提名。",
        href: "https://mp.weixin.qq.com/s/XZXux5kRZ65PHROSJbj7hg",
      },
      {
        title: "刘煜暄律师入选《商法》The A-List 法律精英名册",
        date: "2022-01",
        body: "刘煜暄律师入选2021年度《商法》“The A-List 法律精英”名册。",
        href: "https://mp.weixin.qq.com/s/fJpKTpsvv13xsNTegaDWKw",
      },
      {
        title: "虎诉入选2022年度ALB China精品律所榜单",
        date: "2022-01",
        body: "虎诉入选2022年度ALB China精品律所榜单。",
        href: "https://mp.weixin.qq.com/s/V6URAotVuKqOc5FPCNrcLA",
      },
    ],
  },
  {
    year: "2021",
    count: "6项荣誉",
    awards: [
      {
        title: "虎诉三名合伙人当选第十一届北京律师协会专业委员会委员",
        date: "2021-10",
        body: "刘煜暄律师、许旻律师、万力律师当选第十一届北京律师协会专业委员会委员。",
        href: "https://mp.weixin.qq.com/s/ZnKhh9BgIU55Fiq_F-n3qQ",
      },
      {
        title: "虎诉荣膺Benchmark Litigation China 2021优秀律所称号",
        date: "2021-06",
        body: "虎诉荣膺Benchmark Litigation China 2021北京地区商业纠纷领域“优秀律所”称号，刘煜暄律师、万力律师荣登推荐律师榜单。",
        href: "https://mp.weixin.qq.com/s/QY2BANTbmd43qWi_CKziwQ",
      },
      {
        title: "虎诉荣膺2021《商法》卓越律所大奖",
        date: "2021-05",
        body: "虎诉被评为“备受关注律所”。",
        href: "https://mp.weixin.qq.com/s/jE77_1FcZgSmlS9KY0TYCg",
      },
      {
        title: "刘煜暄律师入选LEGALBAND中国顶级律师排行榜",
        date: "2021-04",
        body: "刘煜暄律师在争议解决·诉讼领域获评“后起之秀”。",
        href: "https://mp.weixin.qq.com/s/j-99ykPm_F1MY0DNkTFNIQ",
      },
      {
        title: "虎诉入围SSQ2021年ALB中国法律大奖",
        date: "2021-04",
        body: "虎诉获“年度最具潜力律师事务所大奖”（Rising Law Firm of the Year）提名。",
        href: "https://mp.weixin.qq.com/s/d2zm09itvvEOcAMjwkxFvg",
      },
      {
        title: "刘煜暄律师和万力律师入选《商法》Rising Stars 2021 TOP 40榜单",
        date: "2021-03",
        body: "刘煜暄律师和万力律师入选《商法》Rising Stars 2021 TOP 40榜单。",
        href: "https://mp.weixin.qq.com/s/rP92POWLpql0e0SokZFAEg",
      },
    ],
  },
  {
    year: "2020",
    count: "3项荣誉",
    awards: [
      {
        title: "许旻律师和万力律师入选北京市律师协会涉外律师人才库",
        date: "2020-10",
        body: "许旻律师和万力律师入选北京市律师协会涉外律师人才库。",
        href: "https://mp.weixin.qq.com/s/xjJ_NZ1wAF5UWhBBFBXR0g",
      },
      {
        title: "知名法律媒体《商法》正式收录北京虎诉律师事务所",
        date: "2020-09",
        body: "知名法律媒体《商法》（China Business Law Journal）正式收录北京虎诉律师事务所。",
        href: "https://mp.weixin.qq.com/s/pNYkFIjQAdk9-FihC9ruRw",
      },
      {
        title: "刘煜暄律师接受ALB专访",
        date: "2020-05",
        body: "刘煜暄律师接受ALB专访，被赞誉为“争议解决领域的耀眼新星”。",
        href: "https://mp.weixin.qq.com/s/qAbZbbU28WuUpSNMRPMXtg",
      },
    ],
  },
  {
    year: "2019",
    count: "1项荣誉",
    awards: [
      {
        title: "刘煜暄律师荣获Asialaw Profiles知名律师称号",
        date: "2019-09",
        body: "刘煜暄律师荣获《亚洲法律概况》（Asialaw Profiles）2020中国法律市场争议解决领域“知名律师”（Notable Practitioner）称号。",
      },
    ],
  },
];

function YearRow({ item, open, onToggle }: { item: YearItem; open: boolean; onToggle: () => void }) {
  const { language } = useLanguage();

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
            className="shrink-0 text-[3rem] font-normal leading-none tracking-[0.04em]"
            style={{ color: "#c1c1c1" }}
          >
            {item.year}
          </span>
          <div className="min-w-0 border-l-2 border-[#d9b27a] pl-5 md:pl-8">
            <div className="text-[1.5rem] font-semibold text-[#d6a866]">Awards Won</div>
            <div className="mt-1 text-[1.125rem] font-normal text-[#c1c1c1]">
              {item.count}
            </div>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="hidden text-[1.225rem] font-semibold tracking-[0.07em] text-[#dea552] sm:inline">
            {open ? pick(language, copy.common.closeDirectory) : pick(language, copy.common.viewDirectory)}
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
          <div className="relative border-t border-black/20 bg-[#777777] px-6 py-10 md:px-12">
            <ImageWithFallback
              src="/assets/about/awardbg.png"
              alt=""
              className="pointer-events-none absolute inset-y-0 right-0 h-full w-[58%] object-cover object-right opacity-35"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#777777_0%,rgba(119,119,119,0.98)_46%,rgba(119,119,119,0.76)_100%)]" />
            <div className="relative z-10 space-y-10">
              {item.awards.map((award) => (
                <div key={`${item.year}-${award.date}-${award.title}`} className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[minmax(0,1fr)_13rem]">
                  <div className="border-l-4 border-[#d9b27a] pl-5">
                    <h3 className="text-[1.75rem] font-semibold leading-relaxed text-black">
                      {award.title}
                    </h3>
                    <p className="mt-5 text-[1.5rem] font-normal leading-relaxed text-black">
                      {award.body}
                    </p>
                  </div>
                  <div className="flex flex-col items-start justify-between gap-4 lg:items-end">
                    {award.href ? (
                      <a
                        href={award.href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-11 items-center gap-2 border-2 border-black px-5 text-[1rem] font-semibold tracking-[0.1em] text-black transition hover:bg-black hover:text-white"
                      >
                        {pick(language, copy.common.viewAward)}
                        <ArrowRight className="size-4" />
                      </a>
                    ) : (
                      <span className="h-11" aria-hidden="true" />
                    )}
                    <span className="text-[1.75rem] font-medium leading-none text-black">{award.date}</span>
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
  const { language } = useLanguage();
  const displayData = language === "zh" ? zhData : data;

  return (
    <section id="honors" className="site-shell mt-32 scroll-mt-[var(--header-height)]">
      <div className="mb-12 grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-end">
        <h2
          className="bg-clip-text pb-3 pr-4 text-transparent italic"
          style={{
            fontWeight: 600,
            fontSize: "7.5rem",
            letterSpacing: "0.02em",
            backgroundImage: "linear-gradient(112deg, #d19d51 16%, #d9b27a 100%)",
            lineHeight: 1.12,
          }}
        >
          {pick(language, copy.about.honorsTitle)}
        </h2>
        <p className="max-w-full justify-self-end pb-7 text-right text-[1.5rem] font-medium leading-[2rem] text-[#c2c2c2]/85 lg:max-w-[calc(100vw-var(--shell-md)*2)]">
          {pick(language, copy.about.honorsSubtitle).map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {displayData.map((item) => (
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
