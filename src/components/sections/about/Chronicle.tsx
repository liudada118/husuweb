"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { pick, useLanguage } from "@/i18n/LanguageProvider";
import { copy } from "@/i18n/copy";

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
    ],
  },
  {
    year: "2025",
    events: [
      {
        month: "NOVEMBER",
        side: "left",
        text: "Tiger Partners was listed in the 2026 Legal 500 China rankings for Dispute Resolution: Arbitration: PRC firms and Dispute Resolution: Litigation: PRC firms.",
      },
      {
        month: "NOVEMBER",
        side: "right",
        text: "Liu Yuxuan, Wan Li and Zoe Zhang were awarded in the inaugural Legal 500 China Elite: Beijing Elite - Commercial Disputes.",
      },
      {
        month: "JULY",
        side: "left",
        text: "Tiger Partners was awarded the 2025 Excellence Award in Cross-Border Litigation by China Business Law Journal.",
      },
      {
        month: "JUNE",
        side: "right",
        text: "Tiger Partners was listed in ALB China Dispute Resolution Rankings and recognized as a Notable Firm in the Litigation field.",
      },
      {
        month: "APRIL",
        side: "left",
        text: "Tiger Partners was nominated for Boutique Law Firm of the Year at the ALB China Law Awards 2025.",
      },
      {
        month: "FEBRUARY",
        side: "right",
        text: "Tiger Partners was listed in the Chambers Global Guide 2025 in Dispute Resolution (PRC Firms).",
      },
      {
        month: "JANUARY",
        side: "left",
        text: "Tiger Partners was listed in the Chambers Greater China Region 2025 in Dispute Resolution (PRC Firms).",
      },
      {
        month: "JANUARY",
        side: "right",
        text: "Liu Yuxuan, Xu Min, Wan Li and Zoe Zhang were exclusively invited to author the Chambers Global Practice Guides 2025 - Dispute Resolution Overview China Chapter.",
      },
    ],
  },
  {
    year: "2024",
    events: [
      {
        month: "NOVEMBER",
        side: "left",
        text: 'Tiger Partners was honored to be the Diamond Sponsor of the 22nd "CIETAC Cup" Voice of Moot series training activities.',
      },
      {
        month: "JUNE",
        side: "right",
        text: "Tiger Partners was honored to be selected as a Firm to Watch on the 2024 Benchmark Litigation China Dispute Resolution list.",
      },
      {
        month: "MAY",
        side: "left",
        text: "Tiger Partners sponsored the World Arbitration Update 2024 China Edition.",
      },
      {
        month: "JANUARY",
        side: "right",
        text: "Tiger Partners was selected as one of the 2024 ALB China Firms to Watch by Asian Legal Business.",
      },
    ],
  },
  {
    year: "2023",
    events: [
      {
        month: "NOVEMBER",
        side: "left",
        text: "Kinsey Kang Yanan was engaged as Hong Kong Legal Counsel of Tiger Partners.",
      },
      {
        month: "APRIL",
        side: "right",
        text: "Tiger Partners sponsored the Chambers Forum: Beijing 2023 and was invited to participate in the forum.",
      },
      {
        month: "MARCH",
        side: "left",
        text: "The Party branch committee of Tiger Partners entered into a pairing relationship with the community committee of Shifoying Nanli.",
      },
    ],
  },
  {
    year: "2022",
    events: [
      {
        month: "NOVEMBER",
        side: "left",
        text: 'Tiger Partners was honored to be the Silver Sponsor of the 20th "CIETAC Cup" Voice of Moot series training activities.',
      },
      {
        month: "JUNE",
        side: "right",
        text: "Tiger Partners was listed in Dispute Resolution (Domestic) and Pro-Bono in China Business Law Awards 2022.",
      },
      {
        month: "MAY",
        side: "left",
        text: "Tiger Partners, Liu Yuxuan and Wan Li were selected into the 2022 China's top law firms and top lawyers list.",
      },
      {
        month: "MAY",
        side: "right",
        text: "Tiger Partners won the title of Notable Firm in commercial disputes resolution in Beijing by Benchmark Litigation.",
      },
      {
        month: "MARCH",
        side: "left",
        text: "Wan Li was engaged as the 6th arbitrator of Dalian International Arbitration Court.",
      },
      {
        month: "MARCH",
        side: "right",
        text: "LEGALBAND released the 2022 China Law Awards nominations list, and Tiger Partners was nominated as Rising Law Firm of the Year.",
      },
      {
        month: "JANUARY",
        side: "left",
        text: "Zoe Zhang joined Tiger Partners as Partner.",
      },
      {
        month: "JANUARY",
        side: "right",
        text: "Tiger Partners was selected as one of the 2022 ALB China Firms to Watch.",
      },
      {
        month: "JANUARY",
        side: "left",
        text: "Liu Yuxuan was selected for The A-List 2021 by China Business Law Journal.",
      },
    ],
  },
  {
    year: "2021",
    events: [
      {
        month: "OCTOBER",
        side: "left",
        text: "Three partners of Tiger Partners were elected as members of Professional Committees of the 11th Beijing Lawyer Association.",
      },
      {
        month: "JUNE",
        side: "right",
        text: "Tiger Partners won the title of Notable Firm in commercial disputes resolution in Beijing by Benchmark Litigation China 2021.",
      },
      {
        month: "MAY",
        side: "left",
        text: "Tiger Partners was listed as Firm to Watch by China Business Law Journal.",
      },
      {
        month: "APRIL",
        side: "right",
        text: "Tiger Partners was nominated as Rising Law Firm of the Year in the 18th Annual SSQ ALB China Law Awards 2021.",
      },
      {
        month: "APRIL",
        side: "left",
        text: "Liu Yuxuan was listed in the top lawyers in China by LEGALBAND and selected as a rising star in dispute resolution litigation.",
      },
      {
        month: "MARCH",
        side: "right",
        text: "Liu Yuxuan and Wan Li were rated as Rising Stars 2021 Top 40 by China Business Law Journal.",
      },
    ],
  },
  {
    year: "2020",
    events: [
      {
        month: "OCTOBER",
        side: "left",
        text: "Xu Min and Wan Li were selected into the Foreign-Related Lawyer Talent Pool of the Beijing Bar Association.",
      },
      {
        month: "SEPTEMBER",
        side: "right",
        text: "China Business Law Journal officially included Tiger Partners.",
      },
    ],
  },
  {
    year: "2019",
    events: [
      {
        month: "DECEMBER",
        side: "left",
        text: "Tiger Partners was established.",
      },
      {
        month: "SEPTEMBER",
        side: "right",
        text: "Asialaw Profiles recognized Liu Yuxuan as a Notable Practitioner in dispute resolution in the 2020 China legal market list.",
      },
    ],
  },
  {
    year: "2018",
    events: [
      {
        month: "MAY",
        side: "left",
        text: "Liu Yuxuan left Fangda Partners Beijing office and joined Jingtian & Gongcheng as partner.",
      },
      {
        month: "FEBRUARY",
        side: "right",
        text: "Wan Li left Fangda Partners Beijing office and joined Perfect World Co., Ltd. as litigation director in the Legal Department.",
      },
    ],
  },
];

const zhGroups: YearGroup[] = [
  {
    year: "2026",
    events: [
      {
        month: "一月",
        side: "left",
        text: "虎诉荣登《钱伯斯大中华区指南2026》争议解决（中资律师事务所）榜单。",
      },
    ],
  },
  {
    year: "2025",
    events: [
      {
        month: "十一月",
        side: "left",
        text: "虎诉入选Legal 500 2026 中国区榜单争议解决-仲裁-中国律所、争议解决-诉讼-中国律所。",
      },
      {
        month: "十一月",
        side: "right",
        text: "虎诉刘煜暄律师、万力律师、张莉律师荣获首届Legal 500中国精英-“北京精英·商业争议”。",
      },
      {
        month: "七月",
        side: "left",
        text: "虎诉荣获《商法》（China Business Law Journal）卓越律所大奖2025执业领域奖项：跨境诉讼/Cross-border litigation。",
      },
      {
        month: "六月",
        side: "right",
        text: "虎诉荣登2025年ALB China争议解决业务排名榜单，并在诉讼领域荣获“值得关注律所/Notable Firms”。",
      },
      {
        month: "四月",
        side: "left",
        text: "虎诉荣获2025年ALB“年度精品律师事务所大奖”提名。",
      },
      {
        month: "二月",
        side: "right",
        text: "虎诉荣登《钱伯斯全球指南2025》，入选争议解决（中资律师事务所）榜单。",
      },
      {
        month: "一月",
        side: "left",
        text: "虎诉荣登《钱伯斯大中华区指南2025》，入选争议解决（中资律师事务所）榜单。",
      },
      {
        month: "一月",
        side: "right",
        text: "虎诉刘煜暄律师、许旻律师、万力律师、张莉律师受邀撰写《2025钱伯斯全球指南-中国争议解决概览》。",
      },
    ],
  },
  {
    year: "2024",
    events: [
      {
        month: "十一月",
        side: "left",
        text: "虎诉荣任第二十二届“贸仲杯”VOICE OF MOOT系列培训活动钻石赞助商。",
      },
      {
        month: "六月",
        side: "right",
        text: "虎诉荣登2024 Benchmark Litigation中国争议解决榜单，虎诉律师事务所荣幸入选为受关注律所。",
      },
      {
        month: "五月",
        side: "left",
        text: "虎诉赞助2024世界仲裁最新动态大会（WAU）中国站。",
      },
      {
        month: "一月",
        side: "right",
        text: "虎诉律师事务所荣幸入选为《亚洲法律杂志》2024年度ALB China精品律所。",
      },
    ],
  },
  {
    year: "2023",
    events: [
      {
        month: "十一月",
        side: "left",
        text: "康亚男（Kinsey Kang Yanan）出庭大律师受聘为虎诉的香港法律顾问。",
      },
      {
        month: "四月",
        side: "right",
        text: "虎诉律师事务所赞助2023钱伯斯北京论坛，并受邀参与本次论坛活动。",
      },
      {
        month: "三月",
        side: "left",
        text: "中共北京虎诉律师事务所支部委员会积极响应北京市朝阳区律师行业党委提出的共建法治社区的号召，与石佛营南里社区委员会结对共建法治社区。",
      },
    ],
  },
  {
    year: "2022",
    events: [
      {
        month: "十一月",
        side: "left",
        text: "虎诉荣幸成为第二十届“贸仲杯”Voice of Moot系列培训活动银牌赞助商。",
      },
      {
        month: "六月",
        side: "right",
        text: "虎诉律师事务所荣幸入选《商法》“卓越律所大奖2022”执业领域奖项的境内争议解决榜单，以及综合奖项的卓越公益律所榜单。",
      },
      {
        month: "五月",
        side: "left",
        text: "虎诉律师事务所及合伙人刘煜暄、万力律师分别入选2022年度LEGALBAND中国顶级律所及顶级律师排行榜。",
      },
      {
        month: "五月",
        side: "right",
        text: "虎诉律师事务所被Benchmark Litigation评为2022年度中国北京地区商业纠纷领域“值得关注的律所（Notable Firm）”。",
      },
      {
        month: "三月",
        side: "left",
        text: "万力律师受聘为大连国际仲裁院（大连仲裁委员会）第六届仲裁员。",
      },
      {
        month: "三月",
        side: "right",
        text: "LEGALBAND发布2022年度中国法律卓越大奖名单，虎诉律师事务所被提名为年度最佳新锐律师事务所。",
      },
      {
        month: "一月",
        side: "left",
        text: "张莉律师加入虎诉律师事务所，担任合伙人。",
      },
      {
        month: "一月",
        side: "right",
        text: "《亚洲法律杂志》公布2022年度ALB China精品律所榜单，虎诉律师事务所成功入选该榜单。",
      },
      {
        month: "一月",
        side: "left",
        text: "刘煜暄律师入选《商法》（China Business Law Journal）评选的2021年度中国相关业务“The A-List 法律精英”名册。",
      },
    ],
  },
  {
    year: "2021",
    events: [
      {
        month: "十月",
        side: "left",
        text: "虎诉三名合伙人当选第十一届北京市律师协会专业委员会委员。",
      },
      {
        month: "六月",
        side: "right",
        text: "虎诉律师事务所荣膺Benchmark Litigation China 2021北京地区商业纠纷领域“优秀律所”称号，同时合伙人刘煜暄律师、万力律师被收录。",
      },
      {
        month: "五月",
        side: "left",
        text: "虎诉律师事务所被《商法》评为“备受关注律所”。",
      },
      {
        month: "四月",
        side: "right",
        text: "虎诉律师事务所入围SSQ二零二一年ALB中国法律大奖“年度最具潜力律师事务所大奖”提名名单。",
      },
      {
        month: "四月",
        side: "left",
        text: "刘煜暄律师入选2021年度LEGALBAND中国顶级律师排行榜，被评选为“争议解决·诉讼”领域的“后起之秀”。",
      },
      {
        month: "三月",
        side: "right",
        text: "刘煜暄律师和万力律师入选《商法》40位2021中国业务法律新星（Rising Stars 2021 Top 40）榜单。",
      },
    ],
  },
  {
    year: "2020",
    events: [
      {
        month: "十月",
        side: "left",
        text: "许旻律师和万力律师入选北京市律师协会涉外律师人才库。",
      },
      {
        month: "九月",
        side: "right",
        text: "知名法律媒体《商法》（China Business Law Journal）正式收录北京虎诉律师事务所。",
      },
    ],
  },
  {
    year: "2019",
    events: [
      {
        month: "十二月",
        side: "left",
        text: "北京虎诉律师事务所成立。",
      },
      {
        month: "九月",
        side: "right",
        text: "国际法律评级机构《亚洲法律概况》（Asialaw Profiles）发布2020年度中国法律市场榜单，刘煜暄律师获“争议解决”领域“知名律师”（Notable Practitioner）称号。",
      },
    ],
  },
  {
    year: "2018",
    events: [
      {
        month: "五月",
        side: "left",
        text: "刘煜暄律师离开上海市方达（北京）律师事务所，加入北京市竞天公诚律师事务所担任合伙人。",
      },
      {
        month: "二月",
        side: "right",
        text: "万力律师离开上海市方达（北京）律师事务所，加入完美世界股份有限公司任法务部诉讼总监。",
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
          <span className="text-[1.5rem] font-semibold tracking-[0.18em] text-[#d9b27a]">
            {event.month}
          </span>
          {isLeft ? <span className="hidden h-px w-8 bg-[#d9b27a]/60 md:block" /> : null}
        </div>
        <p className={`${isLeft ? "md:ml-auto" : ""} w-[85%] text-[1.5rem] font-light leading-relaxed text-[#c8c8c8]`}>
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
  const { language } = useLanguage();

  return (
    <div className="relative z-10 w-full">
      <div className="relative z-20 mb-8 flex justify-start md:mb-10 md:justify-center">
        <button
          type="button"
          onClick={onToggle}
          className="group ml-[20px] flex -translate-x-1/2 items-center gap-5 border border-[#d9b27a] bg-[#202020] px-6 py-3 text-white shadow-[0_0_30px_rgba(20,20,20,1)] transition-all duration-500 hover:bg-[#d9b27a] md:ml-0 md:translate-x-0 md:px-10"
          aria-expanded={open}
        >
          <span className="text-[2.25rem] font-medium leading-none tracking-[0.2em] text-current">
            {group.year}
          </span>
          <span className="hidden text-xs uppercase tracking-[0.18em] text-current opacity-60 transition-opacity duration-500 group-hover:opacity-100 sm:inline">
            {open ? pick(language, copy.common.close) : pick(language, copy.common.open)}
          </span>
          <ChevronDown
            className={`size-5 text-current transition-transform duration-500 ${
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
  const [showAll, setShowAll] = useState(false);
  const { language } = useLanguage();
  const displayGroups = language === "zh" ? zhGroups : groups;
  const visibleGroups = showAll ? displayGroups : displayGroups.slice(0, 3);

  return (
    <section className="site-shell mt-32 pb-24">
      <div className="mb-12 flex flex-col justify-between gap-6 border-b-2 border-[#736654] pb-8 lg:flex-row lg:items-end">
        <h2 className="text-[5rem] font-medium leading-none tracking-[0.02em] text-[#d9b27a]">
          {pick(language, copy.about.chronicleTitle)}
        </h2>
        <p className="max-w-[30rem] text-[1.75rem] font-light leading-relaxed text-white lg:text-right">
          {pick(language, copy.about.chronicleSubtitle)}
        </p>
      </div>

      <div className="relative mt-20 pl-8 md:pl-0">
        <div className="absolute bottom-0 left-[20px] top-0 z-0 w-px bg-white/10 md:left-1/2 md:-translate-x-1/2" />
        <div className="space-y-10 md:space-y-16">
          {visibleGroups.map((group) => (
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
        <button
          type="button"
          onClick={() => setShowAll((value) => !value)}
          className="group relative inline-flex items-center gap-4 border border-[#D9B27A] bg-[#D9B27A] px-9 py-4 text-[1.125rem] font-medium uppercase tracking-[0.08em] text-white transition-all duration-500 hover:bg-transparent"
          aria-expanded={showAll}
        >
          {showAll ? pick(language, copy.common.collapse) : pick(language, copy.common.seeMore)}
          <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-2" strokeWidth={1.5} />
        </button>
      </div>
    </section>
  );
}
