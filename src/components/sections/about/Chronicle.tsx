"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { pick, useLanguage } from "@/i18n/LanguageProvider";
import { copy } from "@/i18n/copy";

type ChronicleEvent = { month: string; side: "left" | "right"; text: string };
type YearGroup = { year: string; events: ChronicleEvent[] };

const groups: YearGroup[] = [
  {
    "year": "2026",
    "events": [
      {
        "month": "MAY",
        "text": "Zoe Zhang, Partner at Tiger Partners, has been successfully selected into the new CIETAC Arbitrator Roster by virtue of her profound professional legal accomplishment and extensive experience in foreign-related dispute resolution.",
        "side": "left"
      },
      {
        "month": "APRIL",
        "text": "Xu Min, Partner at Tiger Partners, has been successfully selected into the new arbitrator roster of CCAS, owing to his solid legal expertise, extensive experience in dispute resolution, and in-depth dedication to the field of sports rule of law.",
        "side": "right"
      },
      {
        "month": "MARCH",
        "text": "Tiger Partners has been shortlisted for the ALB China Law Awards 2026 with two nominations: Dispute Resolution Boutique Law Firm of the Year, Rising Law Firm of the Year.",
        "side": "left"
      },
      {
        "month": "JANUARY",
        "side": "right",
        "text": "Tiger Partners was listed in “Dispute Resolution (PRC Firms)” in the Chambers Greater China Region Guide 2026."
      }
    ]
  },
  {
    "year": "2025",
    "events": [
      {
        "month": "NOVEMBER",
        "side": "left",
        "text": "Tiger Partners was listed in the 2026 Legal 500 China rankings for “Dispute resolution: Arbitration: PRC firms” and “Dispute resolution: Litigation: PRC firms”."
      },
      {
        "month": "NOVEMBER",
        "side": "right",
        "text": "Mr. Liu Yuxuan, Mr. Wan Li and Ms. Zhang Li(Zoe) of Tiger Partners were awarded the inaugural Legal 500 China Elite: Beijing Elite – Commercial Disputes."
      },
      {
        "month": "JULY",
        "side": "left",
        "text": "Tiger Partners was awarded the 2025 Excellence Awards in the Practice Area: Cross-Border Litigation by China Business Law Journal."
      },
      {
        "month": "JUNE",
        "side": "right",
        "text": "Tiger Partners was listed in ALB China Dispute Resolution Rankings, and recognized as a “Notable Firms” in the Litigation field."
      },
      {
        "month": "APRIL",
        "side": "left",
        "text": "Tiger Partners was nominated for the “Boutique Law Firm of the Year” award at the ALB China Law Awards 2025."
      },
      {
        "month": "FEBRUARY",
        "side": "right",
        "text": "Tiger Partners was listed in the Chambers Global Guide 2025 in the practice area of Dispute Resolution (PRC Firms)."
      },
      {
        "month": "JANUARY",
        "side": "left",
        "text": "Tiger Partners was listed in the Chambers Greater China Region 2025 in the practice area of Dispute Resolution (PRC Firms)."
      },
      {
        "month": "JANUARY",
        "side": "right",
        "text": "Mr. Liu Yuxuan, Mr. Xu Min, Mr. Wan Li and Ms. Zhang Li(Zoe) of Tiger Partners were exclusively invited to author the Chambers Global Practice Guides 2025 - Dispute Resolution Overview (China Chapter)."
      }
    ]
  },
  {
    "year": "2024",
    "events": [
      {
        "month": "NOVEMBER",
        "side": "left",
        "text": "Tiger Partners was honored to be the Diamond Sponsor of the 22nd \"CIETAC Cup\" Voice of Moot series training activities."
      },
      {
        "month": "JUNE",
        "side": "right",
        "text": "Tiger Partners was honored to be selected as a Firm to Watch on the 2024 Benchmark Litigation China Dispute Resolution list."
      },
      {
        "month": "MAY",
        "side": "left",
        "text": "Tiger Partners sponsored the World Arbitration Update 2024 (WAU 2024) China Edition."
      },
      {
        "month": "JANUARY",
        "side": "right",
        "text": "Tiger Partners was honored to be selected as 2024 ALB China\" Firms to Watch\" by Asian Legal Business."
      }
    ]
  },
  {
    "year": "2023",
    "events": [
      {
        "month": "NOVEMBER",
        "side": "left",
        "text": "Kinsey Kang Yanan was engaged as Hong Kong Legal Counsel of Tiger Partners."
      },
      {
        "month": "APRIL",
        "side": "right",
        "text": "Tiger Partners sponsored the Chambers Forum: Beijing 2023, and was invited to participate in the forum."
      },
      {
        "month": "MARCH",
        "side": "left",
        "text": "The Party branch committee of Tiger Partners responded positively to the call of the Party Committee of the Lawyers' Profession of Chaoyang District of Beijing for building a law-based community and entered into a pairing relationship with the community committee of Shifoying Nanli."
      }
    ]
  },
  {
    "year": "2022",
    "events": [
      {
        "month": "NOVEMBER",
        "side": "left",
        "text": "Tiger Partners is honored to be the Silver Sponsor of the 20th \"CIETAC Cup\" Voice of Moot series training activities."
      },
      {
        "month": "JUNE",
        "side": "right",
        "text": "Tiger Partners was listed to DISPUTE RESOLUTION (DOMESTIC) of Practical Awards, and PRO-BONO of General Awards in China Business Law Awards 2022."
      },
      {
        "month": "MAY",
        "side": "left",
        "text": "Tiger Partners and Mr. Liu Yuxuan, Mr. Wan Li were selected into the list of 2022 China's top law firms and top lawyers."
      },
      {
        "month": "MAY",
        "side": "right",
        "text": "Tiger Partners won the title of 2022 \"Notable Firm\" in the field of commercial disputes resolution in Beijing area by Benchmark Litigation."
      },
      {
        "month": "MARCH",
        "side": "left",
        "text": "Mr. Wan Li was engaged as the 6th arbitrator of Dalian International Arbitration Court."
      },
      {
        "month": "MARCH",
        "side": "right",
        "text": "LEGALBAND released 2022 China Law Awards Nominations list, and Tiger Partners was nominated as \"Rising Law Firm of the Year\"."
      },
      {
        "month": "JANUARY",
        "side": "left",
        "text": "Ms. Zoe Zhang joined Tiger Partners as Partner."
      },
      {
        "month": "JANUARY",
        "side": "right",
        "text": "Tiger Partners was selected as one of 2022 ALB China Firms to Watch for its outstanding performance in the area of civil and commercial dispute resolution over the past year, as announced by Asian Legal Business (\"ALB\")."
      },
      {
        "month": "JANUARY",
        "side": "left",
        "text": "Mr. Liu Yuxuan was selected for THE A-LIST 2021 by China Business Law Journal."
      }
    ]
  },
  {
    "year": "2021",
    "events": [
      {
        "month": "OCTOBER",
        "side": "left",
        "text": "Three partners of Tiger Partners were elected as members of the Professional Committee of the 11th Beijing Lawyer Association, which are Professional Committee of Commercial Arbitration Law, Professional Committee on Legal Affairs of Film, and Professional Committee on Legal Affairs at the Intersection of Criminal and Civil Affairs."
      },
      {
        "month": "JUNE",
        "side": "right",
        "text": "Tiger Partners won the title of \"Notable Firm\" in the field of commercial disputes resolution in Beijing area by benchmark litigation China 2021. At the same time, Mr. Liu Yuxuan and Mr. Wan Li were included on the Benchmark Litigation China."
      },
      {
        "month": "MAY",
        "side": "left",
        "text": "China Business Law Journal, a well-known legal media, announced the results of China Business Law Awards 2021, and Tiger Partners was listed as \"Firm to Watch\" ."
      },
      {
        "month": "APRIL",
        "side": "right",
        "text": "Tiger Partners was nominated as \"Rising Law Firm of the Year\" in the 18th Annual SSQ ALB China Law Awards 2021."
      },
      {
        "month": "APRIL",
        "side": "left",
        "text": "Mr. Liu Yuxuan was listed in the top lawyers in China by LEGALBAND in 2021 and selected as the \"Rising Star\" in the field of \"dispute resolution litigation\" ."
      },
      {
        "month": "MARCH",
        "side": "right",
        "text": "Mr. Liu Yuxuan and Mr. Wan Li were rated as Rising Stars 2021 Top 40 by China Business Law Journal, a well-known legal media."
      }
    ]
  },
  {
    "year": "2020",
    "events": [
      {
        "month": "OCTOBER",
        "side": "left",
        "text": "Mr. Xu Min and Mr. Wan Li were selected into the Foreign-Related Lawyer Talent Pool of the Beijing Bar Association."
      },
      {
        "month": "SEPTEMBER",
        "side": "right",
        "text": "China Business Law Journal, a well-known legal media, officially included Tiger Partners."
      }
    ]
  },
  {
    "year": "2019",
    "events": [
      {
        "month": "DECEMBER",
        "side": "left",
        "text": "Tiger Partners was established."
      },
      {
        "month": "SEPTEMBER",
        "side": "right",
        "text": "Asialaw Profiles, an international legal directory, released the list of China's legal market in 2020. Lawyer Liu Yuxuan won the title of \"notable practitioner\" in the field of \"dispute resolution\" ."
      }
    ]
  },
  {
    "year": "2018",
    "events": [
      {
        "month": "MAY",
        "side": "left",
        "text": "Mr. Liu Yuxuan left Fangda Partners Beijing office and joined Jingtian & Gongcheng as partner."
      },
      {
        "month": "FEBRUARY",
        "side": "right",
        "text": "Mr. Wan Li left Fangda Partners Beijing office and joined Perfect World Co., Ltd. as litigation director in Legal Department."
      }
    ]
  }
];

const zhGroups: YearGroup[] = [
  {
    "year": "2026",
    "events": [
      {
        "month": "五月",
        "text": "虎诉律师事务所合伙人张莉律师凭借深厚的法律专业素养、丰富的涉外争议解决经验，成功入选新一届贸仲仲裁员名册，主要裁判领域为国际贸易、公司股权、建设工程和国际商事仲裁。",
        "side": "left"
      },
      {
        "month": "四月",
        "text": "虎诉律师事务所合伙人许旻律师凭借扎实的法律专业功底、丰富的争议解决经验及对体育法治领域的持续深耕，成功入选CCAS新仲裁员名册。",
        "side": "right"
      },
      {
        "month": "三月",
        "text": "虎诉律师事务所荣登ALB2026年度中国法律大奖入围名单，获得两项提名：“年度争议解决精品律师事务所大奖”、“年度最具潜力律师事务所大奖”。",
        "side": "left"
      },
      {
        "month": "一月",
        "side": "right",
        "text": "虎诉荣登《钱伯斯大中华区指南2026》争议解决（中资律师事务所）榜单。"
      }
    ]
  },
  {
    "year": "2025",
    "events": [
      {
        "month": "十一月",
        "side": "left",
        "text": "虎诉入选Legal 500 2026 中国区榜单争议解决-仲裁-中国律所、争议解决-诉讼-中国律所。"
      },
      {
        "month": "十一月",
        "side": "right",
        "text": "虎诉刘煜暄律师、万力律师、张莉律师荣获首届Legal 500中国精英-“北京精英·商业争议”。"
      },
      {
        "month": "七月",
        "side": "left",
        "text": "虎诉荣获《商法》（China Business Law Journal）卓越律所大奖2025执业领域奖项：跨境诉讼/Cross-border litigation。"
      },
      {
        "month": "六月",
        "side": "right",
        "text": "虎诉荣登2025年ALB China争议解决业务排名榜单，并在诉讼领域荣获“值得关注律所/Notable Firms”。"
      },
      {
        "month": "四月",
        "side": "left",
        "text": "虎诉荣获2025年ALB“年度精品律师事务所大奖”提名。"
      },
      {
        "month": "二月",
        "side": "right",
        "text": "虎诉荣登《钱伯斯全球指南2025》，入选争议解决（中资律师事务所）榜单。"
      },
      {
        "month": "一月",
        "side": "left",
        "text": "虎诉荣登《钱伯斯大中华区指南2025》，入选争议解决（中资律师事务所）榜单。"
      },
      {
        "month": "一月",
        "side": "right",
        "text": "虎诉刘煜暄律师、许旻律师、万力律师、张莉律师受邀撰写《2025钱伯斯全球指南-中国争议解决概览》。"
      }
    ]
  },
  {
    "year": "2024",
    "events": [
      {
        "month": "十一月",
        "side": "left",
        "text": "虎诉荣任第二十二届“贸仲杯”VOICE OF MOOT系列培训活动钻石赞助商。"
      },
      {
        "month": "六月",
        "side": "right",
        "text": "虎诉荣登2024 Benchmark Litigation中国争议解决榜单，虎诉律师事务所荣幸入选为受关注律所。"
      },
      {
        "month": "五月",
        "side": "left",
        "text": "虎诉赞助2024世界仲裁最新动态大会（WAU）中国站。"
      },
      {
        "month": "一月",
        "side": "right",
        "text": "虎诉律师事务所荣幸入选为《亚洲法律杂志》2024年度ALB China精品律所。"
      }
    ]
  },
  {
    "year": "2023",
    "events": [
      {
        "month": "十一月",
        "side": "left",
        "text": "康亚男（Kinsey Kang Yanan）出庭大律师受聘为虎诉的香港法律顾问。"
      },
      {
        "month": "四月",
        "side": "right",
        "text": "虎诉律师事务所赞助2023钱伯斯北京论坛，并受邀参与本次论坛活动。"
      },
      {
        "month": "三月",
        "side": "left",
        "text": "中共北京虎诉律师事务所支部委员会积极响应北京市朝阳区律师行业党委提出的共建法治社区的号召，与石佛营南里社区委员会结对共建法治社区。"
      }
    ]
  },
  {
    "year": "2022",
    "events": [
      {
        "month": "十一月",
        "side": "left",
        "text": "虎诉荣幸成为第二十届“贸仲杯”Voice of Moot系列培训活动银牌赞助商。"
      },
      {
        "month": "六月",
        "side": "right",
        "text": "虎诉律师事务所荣幸入选《商法》“卓越律所大奖2022”执业领域奖项的境内争议解决榜单，以及综合奖项的卓越公益律所榜单。"
      },
      {
        "month": "五月",
        "side": "left",
        "text": "虎诉律师事务所及合伙人刘煜暄、万力律师分别入选2022年度LEGALBAND中国顶级律所及顶级律师排行榜。"
      },
      {
        "month": "五月",
        "side": "right",
        "text": "虎诉律师事务所被Benchmark Litigation评为2022年度中国北京地区商业纠纷领域“值得关注的律所（Notable Firm）”。"
      },
      {
        "month": "三月",
        "side": "left",
        "text": "万力律师受聘为大连国际仲裁院（大连仲裁委员会）第六届仲裁员。"
      },
      {
        "month": "三月",
        "side": "right",
        "text": "LEGALBAND发布2022年度中国法律卓越大奖名单，虎诉律师事务所被提名为年度最佳新锐律师事务所。"
      },
      {
        "month": "一月",
        "side": "left",
        "text": "张莉律师加入虎诉律师事务所，担任合伙人。"
      },
      {
        "month": "一月",
        "side": "right",
        "text": "《亚洲法律杂志》（Asian Legal Business，“ALB”）公布2022年度ALB China精品律所榜单，虎诉律师事务所（Tiger Partners）凭借过去一年在民商事争议解决领域的优秀业绩，成功入选该榜单。"
      },
      {
        "month": "一月",
        "side": "left",
        "text": "刘煜暄律师入选《商法》（China Business Law Journal）评选的2021年度中国相关业务“The A-List 法律精英”名册。"
      }
    ]
  },
  {
    "year": "2021",
    "events": [
      {
        "month": "十月",
        "side": "left",
        "text": "虎诉三名合伙人当选第十一届北京市律师协会专业委员会，分别为商事仲裁法律专业委员会、影视与娱乐法律事务专业委员会及刑民交叉法律事务专业委员会委员。"
      },
      {
        "month": "六月",
        "side": "right",
        "text": "虎诉律师事务所荣膺Benchmark Litigation China 2021北京地区商业纠纷领域“优秀律所”称号。同时，合伙人刘煜暄律师、万力律师被Benchmark Litigation China 2021收录。"
      },
      {
        "month": "五月",
        "side": "left",
        "text": "知名法律媒体《商法》（China Business Law Journal）公布2021年《商法》卓越律所大奖评选结果，虎诉律师事务所被评为“备受关注律所”。"
      },
      {
        "month": "四月",
        "side": "right",
        "text": "虎诉律师事务所入围SSQ二零二一年ALB中国法律大奖“年度最具潜力律师事务所大奖”提名名单。"
      },
      {
        "month": "四月",
        "side": "left",
        "text": "刘煜暄律师入选2021年度LEGALBAND中国顶级律师排行榜，被评选为“争议解决·诉讼”领域的“后起之秀”。"
      },
      {
        "month": "三月",
        "side": "right",
        "text": "刘煜暄律师和万力律师入选知名法律媒体《商法》（China Business Law Journal）评选的40位2021中国业务法律新星（Rising Stars 2021 Top 40）榜单。"
      }
    ]
  },
  {
    "year": "2020",
    "events": [
      {
        "month": "十月",
        "side": "left",
        "text": "许旻律师和万力律师入选北京市律师协会涉外律师人才库。"
      },
      {
        "month": "九月",
        "side": "right",
        "text": "知名法律媒体《商法》（China Business Law Journal）正式收录北京虎诉律师事务所。"
      }
    ]
  },
  {
    "year": "2019",
    "events": [
      {
        "month": "十二月",
        "side": "left",
        "text": "北京虎诉律师事务所成立。"
      },
      {
        "month": "九月",
        "side": "right",
        "text": "国际法律评级机构《亚洲法律概况》（Asialaw Profiles）发布2020年度中国法律市场榜单，刘煜暄律师获“争议解决”领域“知名律师”（Notable Practitioner）称号。"
      }
    ]
  },
  {
    "year": "2018",
    "events": [
      {
        "month": "五月",
        "side": "left",
        "text": "刘煜暄律师离开上海市方达（北京）律师事务所，加入北京市竞天公诚律师事务所担任合伙人。"
      },
      {
        "month": "二月",
        "side": "right",
        "text": "万力律师离开上海市方达（北京）律师事务所，加入完美世界股份有限公司任法务部诉讼总监。"
      }
    ]
  }
];

function EventRow({ event }: { event: ChronicleEvent }) {
  const isLeft = event.side === "left";

  return (
    <div className="group relative grid min-w-0 grid-cols-1 items-center py-6 md:grid-cols-[1fr_2.5rem_1fr] md:py-8">
      <div
        className={`${isLeft ? "md:col-start-1 md:border-l-0 md:border-r-2 md:border-[#d9b27a] md:text-right" : "md:col-start-3 md:border-l-2 md:border-[#d9b27a] md:text-left"} min-w-0 max-w-full rounded border-l-2 border-[#d9b27a] p-4 transition-transform duration-500 md:p-8 md:group-hover:-translate-y-1`}
        style={{
          background: isLeft
            ? "linear-gradient(126deg, rgba(217,178,122,0) 4%, rgba(115,115,115,0.28) 92%)"
            : "linear-gradient(-126deg, rgba(217,178,122,0) 4%, rgba(115,115,115,0.28) 92%)",
        }}
      >
        <div className={`mb-4 flex items-center gap-4 ${isLeft ? "md:justify-end" : "md:justify-start"}`}>
          {!isLeft ? <span className="hidden h-px w-8 bg-[#d9b27a]/60 md:block" /> : null}
          <span className="break-words text-[1.05rem] font-semibold tracking-[0.12em] text-[#d9b27a] md:text-[1.5rem] md:tracking-[0.18em]">
            {event.month}
          </span>
          {isLeft ? <span className="hidden h-px w-8 bg-[#d9b27a]/60 md:block" /> : null}
        </div>
        <p className={`${isLeft ? "md:ml-auto" : ""} w-full break-words text-left text-[1rem] font-light leading-relaxed text-[#c8c8c8] md:w-[85%] md:text-[1.5rem] ${isLeft ? "md:text-right" : "md:text-left"}`}>
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
          className="group flex max-w-full items-center gap-3 border border-[#d9b27a] bg-[#202020] px-5 py-3 text-white shadow-[0_0_30px_rgba(20,20,20,1)] transition-all duration-500 hover:bg-[#d9b27a] md:gap-5 md:px-10"
          aria-expanded={open}
        >
          <span className="text-[1.55rem] font-medium leading-none tracking-[0.12em] text-current md:text-[2.25rem] md:tracking-[0.2em]">
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
  const subtitle = pick(language, copy.about.chronicleSubtitle);
  const subtitleLines = Array.isArray(subtitle) ? subtitle : [subtitle];

  return (
    <section className="site-shell mt-32 pb-24">
      <div className="mb-12 flex flex-col justify-between gap-6 border-b-2 border-[#736654] pb-8 lg:flex-row lg:items-end">
        <h2 className="max-w-full break-words text-[3rem] font-medium leading-none tracking-[0.02em] text-[#d9b27a] md:text-[5rem]">
          {pick(language, copy.about.chronicleTitle)}
        </h2>
        <p className="max-w-full break-words text-[1.1rem] font-light leading-relaxed text-white md:max-w-[30rem] md:text-[1.75rem] lg:text-right">
          {subtitleLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
      </div>

      <div className="relative mt-12 min-w-0 pl-7 md:mt-20 md:pl-0">
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
          className="group relative inline-flex max-w-full items-center gap-3 border border-[#D9B27A] bg-[#D9B27A] px-7 py-4 text-[1rem] font-medium uppercase tracking-[0.06em] text-white transition-all duration-500 hover:bg-transparent md:gap-4 md:px-9 md:text-[1.125rem] md:tracking-[0.08em]"
          aria-expanded={showAll}
        >
          {showAll ? pick(language, copy.common.collapse) : pick(language, copy.common.seeMore)}
          <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-2" strokeWidth={1.5} />
        </button>
      </div>
    </section>
  );
}
