"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { pick, useLanguage } from "@/i18n/LanguageProvider";
import { copy } from "@/i18n/copy";

export const industries = {
  "private-equity": {
    title: "Private Equity",
    image: "/assets/industries/in1.png",
    intro:
      "Tiger Partners provides a full range of legal services to many well-known Chinese investment institutions, portfolio or invested companies, founders and shareholders, ranging from potential risk control, pre-litigation dispute resolution, litigation, arbitration and enforcement, to achieve their ultimate business goals.",
    sections: [
      {
        title:
          "1. Analysis of potential legal exposures in contracts such as partnership agreements or investment agreements",
      },
      {
        title: "2. Pre-litigation dispute resolution services:",
        items: [
          "Drafting and sending repurchase notice, deficiency supplement notice and other legal letters on behalf of investors;",
          "Calculating the specific claimable amount, including but not limited to investment principal, overdue payment interest, repurchase amount, etc.;",
          "Participating in negotiations;",
          "Drafting and assisting in signing settlement agreements, etc.",
        ],
      },
      {
        title: "3. On behalf of investors, fund managers or invested companies:",
        items: [
          "Initiating litigation or arbitration;",
          "Initiating pre-litigation preservation or preservation in litigation;",
          "Responding to claims or filing counterclaims;",
          "Initiating application for enforcement;",
          "Assisting in preservation or enforcement proceedings by visiting institutions in person, such as Shanghai Stock Exchange or China Securities Depository and Clearing Corporation Limited;",
          "Participating in negotiations for settlement or mediation.",
        ],
      },
    ],
  },
  finance: {
    title: "Finance",
    image: "/assets/industries/in3.png",
    intro:
      "Tiger Partners has highly specialized knowledge and extensive experience in dispute resolution relating to finance, and is able to provide early warning and prevent risks arising from various financial products, investment and finance transactions, and provide all-round dispute resolution services in civil & commercial and civil cross criminal area.",
    sections: [
      {
        title: "1. Legal Services at the Initial Stage of Disputes:",
        items: [
          "Early warning analysis of disputes;",
          "Pre-litigation negotiations;",
          "Drafting and sending attorney's letters, etc.",
        ],
      },
      {
        title:
          "2. Provide all-round services in respect of civil and commercial matters and matters involving both civil and criminal issues arising out of financing matters, such as credit financing, project financing, asset financing, merger financing, and various investment and financing disputes and security disputes arising therefrom:",
        items: [
          "Initiating litigation or arbitration;",
          "Applying for pre-litigation property preservation or property preservation during litigation;",
          "Responding to claim or filing counterclaims;",
          "Initiating special procedures for realization of security rights;",
          "Initiating application for enforcement;",
          "Participating in negotiations for settlement or mediation.",
        ],
      },
    ],
  },
  "real-estate": {
    title: "Real Estate",
    image: "/assets/industries/in4.png",
    intro:
      "Tiger Partners is specialized in dispute resolution in real estate industry. From traditional disputes over construction contracts to large-scale disputes over real estate, land purchase and lease agreements, Tiger Partners has a profound theoretical basis and extensive practical experience.",
    sections: [
      {
        title: "1. Analysis and assessment of potential legal exposures of contracts",
      },
      {
        title: "2. Pre-litigation disputes resolution services:",
        items: [
          "Sending attorney's letters;",
          "Participating in negotiations;",
          "Drafting and assisting in signing settlement agreements, etc.",
        ],
      },
      {
        title:
          "3. Representing real estate developers or constructors in disputes over construction contracts, or representing lessors or lessees in disputes over large real estate leasing contracts:",
        items: [
          "Initiating litigation or arbitration;",
          "Initiating pre-litigation preservation or preservation during litigation;",
          "Responding to claims or filing counterclaims;",
          "Conducting on-site investigation to collect evidence, and assisting clients to complete evidence collection;",
          "Initiating applications for judicial authentication of quality, construction period, actual leased area, etc., and providing cross-examination opinions;",
          "Initiating application for enforcement, and assisting clients to achieve their ultimate business goal;",
          "Participating in negotiations for settlement or mediation.",
        ],
      },
    ],
  },
  "sports-and-e-sports": {
    title: "Sports and E-Sports",
    image: "/assets/industries/in5.png",
    intro:
      "Tiger Partners has deeply participated in the increasingly mature commercialization process of China's sports industry. E-Sports, after being selected into the Asian Games, has opened a golden era again. With a wealth of experience and foresight, Tiger Partners is energizing the dream of young talents in the industry to set sail.",
    sections: [
      {
        title: "1. Long-term Legal Counsel Services",
        items: [
          "Diagnosis and control of legal risks in the daily management of the company;",
          "Examining and witnessing procedural compliance and content legality of board meetings and shareholders' meetings;",
          "Diagnosis and perfection of labor relationship compliance;",
          "Drafting and review of business contracts.",
        ],
      },
      {
        title: "2. Contract drafting, review and legal risks judgment services:",
        items: [
          "Labor, service and training contracts between clubs and athletes;",
          "Athlete transfer contracts;",
          "Competition contracts;",
          "Sponsorship contracts;",
          "Broadcast and rebroadcast contracts;",
          "Club assignment contracts.",
        ],
      },
      {
        title: "3. Pre-litigation resolution service of legal disputes:",
        items: [
          "Sending attorney's letters;",
          "Participating in negotiation;",
          "Drafting and assisting in signing settlement agreements, etc.",
        ],
      },
      {
        title: "4. Litigation and arbitration agency services:",
        items: [
          "Initiating litigation or arbitration;",
          "Initiating pre-litigation preservation or preservation during litigation;",
          "Responding to claims or filing counterclaims;",
          "Investigating and collecting evidence and assisting clients to complete evidence collection;",
          "Initiating application for enforcement, and assisting clients to achieve their ultimate business goals;",
          "Participating in negotiation on settlement or mediation.",
        ],
      },
    ],
  },
  "international-trade": {
    title: "International Trade",
    image: "/assets/industries/in2.png",
    intro:
      "The Belt and Road Initiative offers new opportunities as well as challenges on an ongoing basis for foreign trade participants in all sectors. With extensive experience and academic background in foreign-related cases, the lawyers of Tiger Partners are able to provide high-quality and efficient foreign-related dispute resolution legal services to Chinese and foreign clients.",
    sections: [
      {
        title: "Representing parties in international trade:",
        items: [
          "Contract review and risk assessment;",
          "Pre-litigation risk warning;",
          "Chinese domestic litigation and arbitration;",
          "International litigation and arbitration, including preservation, prosecution or responding;",
          "Recognition and enforcement of international arbitration awards and foreign court judgments in China;",
          "Participating in negotiation on settlement or mediation.",
        ],
      },
    ],
  },
  "cyber-tech-and-game": {
    title: "Cyber Tech and Game",
    image: "/assets/industries/in6.png",
    intro:
      "Since Internet plus initiative became a national strategy, numerous entrepreneurs have been pursuing wealth and success in the tide of the internet. With years of legal service experience cultivating in internet technology and game, Tiger Partners has greatly protected and escorted investors and young entrepreneurs in this industry.",
    sections: [
      {
        title: "1. Long-term legal counsel services:",
        items: [
          "Diagnosis and control of legal risks in the daily management of the company;",
          "Examining and witnessing procedural compliance and content legality of board meetings and shareholders' meetings;",
          "Diagnosis and perfection of employment relationship compliance;",
          "Drafting and review of business contracts.",
        ],
      },
      {
        title: "2. Contract drafting, review and legal risk judgment services:",
        items: [
          "Game development and creation contracts;",
          "Game publicity and distribution contracts;",
          "Game live broadcasting service contracts;",
          "Internet user service agreements.",
        ],
      },
      {
        title: "3. Diagnosis and perfection service for data compliance and privacy protection system",
      },
      {
        title: "4. Pre-litigation resolution service of legal disputes:",
        items: [
          "Sending attorney's letters;",
          "Participating in negotiation;",
          "Drafting and assisting in signing settlement agreements, etc.",
        ],
      },
      {
        title: "5. Litigation and arbitration agency services:",
        items: [
          "Initiating litigation or arbitration;",
          "Initiating pre-litigation preservation or preservation during litigation;",
          "Responding to claims or filing counterclaims;",
          "Investigating and collecting evidence, and assisting clients in evidence collection;",
          "Initiating application for enforcement, and assisting clients in achieving their ultimate business goals;",
          "Participating in negotiation on settlement or mediation.",
        ],
      },
    ],
  },
} as const;

const zhIndustries = {
  "private-equity": {
    title: "私募股权",
    intro:
      "虎诉为国内众多知名投资机构、被投项目公司及创始人或股东提供从潜在风险控制、诉前争端解决，到代理诉讼仲裁和强制执行的全方位法律服务，以期为客户实现最终商业目的。",
    sections: [
      {
        title: "在信托制、有限合伙制、公司制等模式下的私募股权或私募基金投资中：",
      },
      {
        title: "1、合伙协议或投资协议等合同潜在纠纷法律风险研判",
      },
      {
        title: "2、诉前纠纷法律争端解决服务：",
        items: [
          "代表投资者起草、发送回购通知书、差额补足通知书等律师函件；",
          "代表投资者计算具体的可诉请金额，包括但不限于投资本金、逾期付款利息、回购金额等；",
          "参与谈判；",
          "起草并协助签署和解协议等。",
        ],
      },
      {
        title: "3、代表投资者或基金管理人或项目企业：",
        items: [
          "提起诉讼或仲裁；",
          "提起诉前或诉中保全，包括针对相对方银行账户、所持股权或投资收益等财产的司法保全；",
          "应诉答辩或提起反诉，或提起仲裁反请求；",
          "提起强制执行申请；",
          "在诉讼或仲裁程序中，前往上海证券交易所、中国证券登记结算有限责任公司等机构，完成保全或执行程序，协助委托人实现最终商业目标；",
          "参与和解或调解谈判。",
        ],
      },
    ],
  },
  finance: {
    title: "金融",
    intro:
      "虎诉在金融相关争议解决领域具有高度专业的知识技术和丰富的实操经验，能够为各类金融产品及投融资交易所衍生的争议提供风险预警和防范，以及全方位民商事、刑民交叉争议解决服务。",
    sections: [
      {
        title: "1、争议初期法律服务：",
        items: ["争议预警分析；", "诉前谈判；", "起草并发送律师函等。"],
      },
      {
        title:
          "2、为信贷融资、项目融资、资产融资、并购融资及衍生的各类投、融资纠纷及担保纠纷提供全方位民商事及刑民交叉争议解决服务：",
        items: [
          "提起诉讼或仲裁；",
          "申请诉前或诉中财产保全；",
          "应诉答辩或提起反诉，或提起仲裁反请求；",
          "提起实现担保物权特别程序；",
          "提起强制执行申请；",
          "参与和解或调解谈判。",
        ],
      },
    ],
  },
  "real-estate": {
    title: "房地产行业",
    intro:
      "虎诉擅长房地产行业的争议解决法律服务，从传统建设工程合同纠纷案件到大型房地产、土地的买卖、租赁协议纠纷案件，虎诉均拥有深厚的理论基础和丰富的实操经验。",
    sections: [
      {
        title: "1、合同潜在纠纷法律风险研判",
      },
      {
        title: "2、诉前纠纷法律争端解决服务：",
        items: ["发送律师函；", "参与谈判；", "起草并协助签署和解协议等。"],
      },
      {
        title: "3、在建设工程合同纠纷中，代表房地产开发商或施工主体；或在大型房地产租赁合同纠纷中，代表出租人或承租人，参与以下争议解决程序，或提供相应法律服务：",
        items: [
          "提起诉讼或仲裁；",
          "提起诉前或诉中保全，包括针对相对方银行账户、所持股权或案涉物业、在建工程等财产的司法保全；",
          "应诉答辩或提起反诉，或提起仲裁反请求；",
          "实地考察取证，并协助委托人完成证据搜集工作；",
          "在诉讼或仲裁程序中，提起相应质量、工期、实际承租面积等司法鉴定申请，并对相对方提供的鉴定或评估报告提出相应质证意见；",
          "提起强制执行申请，并协助委托人实现最终商业目标；",
          "参与和解或调解谈判。",
        ],
      },
    ],
  },
  "sports-and-e-sports": {
    title: "体育及电子竞技行业",
    intro:
      "虎诉深度参与中国体育行业日趋成熟的商业化进程，而电子竞技入选亚运会后再次开启了黄金时代，虎诉正以丰富的经验和超前的眼界，助力行业中的青年才俊梦想起航。",
    sections: [
      {
        title: "1、常年法律顾问服务：",
        items: [
          "公司日常管理法律风险诊断与完善；",
          "董事会、股东会召开程序合规性及内容合法性审查及见证；",
          "劳动关系合规诊断与完善；",
          "业务合同起草与审查。",
        ],
      },
      {
        title: "2、合同起草、审查与法律风险研判服务：",
        items: [
          "俱乐部与运动员劳动/劳务/训练合同；",
          "运动员转会合同；",
          "参赛合同；",
          "赞助合同；",
          "赛事直播及转播合同；",
          "俱乐部转让合同。",
        ],
      },
      {
        title: "3、法律纠纷诉前解决服务：",
        items: ["发送律师函；", "参与谈判；", "起草并协助签署和解协议等。"],
      },
      {
        title: "4、诉讼与仲裁代理服务：",
        items: [
          "提起诉讼或仲裁；",
          "提起诉前或诉中保全，包括针对相对方银行账户、所持股权、知识产权、收益权等有形和无形财产的司法保全；",
          "应诉答辩或提起反诉，或提起仲裁反请求；",
          "调查取证，协助委托人完成证据搜集工作；",
          "提起强制执行申请，并协助委托人实现最终商业目标；",
          "参与和解或调解谈判。",
        ],
      },
    ],
  },
  "international-trade": {
    title: "国际贸易行业",
    intro:
      "“一带一路”战略为各行业对外贸易参与者提供持续的新机遇和新挑战，虎诉律师有丰富的涉外案件经验和学术背景，能够为中外客户提供优质、高效的涉外争议解决法律服务。",
    sections: [
      {
        title: "代表国际贸易当事方，进行：",
        items: [
          "合同审阅及风险评估；",
          "诉前风险预警；",
          "中国国内诉讼与仲裁；",
          "国际诉讼与仲裁，包括保全、起诉或应诉等；",
          "国际仲裁裁决和外国法院判决在华承认与执行；",
          "参与和解或调解谈判。",
        ],
      },
    ],
  },
  "cyber-tech-and-game": {
    title: "互联网科技及游戏行业",
    intro:
      "“互联网+”成为国家战略以来，海量创业者在互联网浪潮中追逐财富与成功，虎诉凭借多年深耕互网科技及游戏行业法律服务的经验，为行业投资者和青年企业家保驾护航。",
    sections: [
      {
        title: "1、常年法律顾问服务：",
        items: [
          "公司日常管理法律风险诊断与完善；",
          "董事会、股东会召开程序合规性及内容合法性审查及见证；",
          "劳动关系合规诊断与完善；",
          "业务合同起草与审查。",
        ],
      },
      {
        title: "2、合同起草、审查与法律风险研判服务：",
        items: ["游戏开发创作合同；", "游戏宣传及发行合同；", "游戏直播劳务合同；", "网络用户服务协议。"],
      },
      {
        title: "3、数据合规及隐私保护制度诊断与完善服务",
      },
      {
        title: "4、法律纠纷诉前解决服务：",
        items: ["发送律师函；", "参与谈判；", "起草并协助签署和解协议等。"],
      },
      {
        title: "5、诉讼与仲裁代理服务：",
        items: [
          "提起诉讼或仲裁；",
          "提起诉前或诉中保全，包括针对相对方银行账户、所持股权、知识产权、收益权等有形和无形财产的司法保全；",
          "应诉答辩或提起反诉，或提起仲裁反请求；",
          "调查取证，协助委托人完成证据搜集工作；",
          "提起强制执行申请，并协助委托人实现最终商业目标；",
          "参与和解或调解谈判。",
        ],
      },
    ],
  },
} as const;

export type IndustrySlug = keyof typeof industries;

const defaultIndustry = industries["private-equity"];

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-4 text-[clamp(1rem,1.15vw,1.25rem)] font-light leading-[1.6] tracking-[0.02em] text-[#99a1af]">
      <span className="mt-[0.6em] inline-block size-2 shrink-0 rounded-full bg-[#d9d9d9]" />
      <span>{children}</span>
    </li>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="border border-white/[0.05] bg-[#1a1a1a] px-8 py-7 lg:px-10 lg:py-8">{children}</div>;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-[clamp(1rem,1.15vw,1.25rem)] font-normal leading-[1.5] tracking-[0.02em] text-[#e5e5e5]">{children}</h3>;
}

export function IndustryDetailPage({ slug }: { slug: string }) {
  const { language } = useLanguage();
  const industry = industries[slug as IndustrySlug] ?? defaultIndustry;
  const zhIndustry = zhIndustries[slug as IndustrySlug] ?? zhIndustries["private-equity"];
  const displayIndustry = language === "zh" ? { ...industry, ...zhIndustry } : industry;

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#171717] text-white">
      <SiteHeader active="INDUSTRIES" />

      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback src={displayIndustry.image} alt="" className="size-full object-cover" />
          <div className="absolute inset-0 bg-[rgba(68,67,67,0.5)] mix-blend-screen" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#171717]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(56,56,56,0)_30%,#171717_93%)]" />
        </div>

        <div
          className="pointer-events-none absolute bottom-0 left-0 h-[60%] w-[86.6%] opacity-70"
          style={{
            background: "linear-gradient(135deg, rgba(39,39,39,0) 0%, rgba(39,39,39,0.6) 100%)",
            clipPath: "polygon(0 100%, 100% 100%, 0 0)",
          }}
        />

        <div className="site-shell relative z-10 pb-12 pt-[calc(var(--header-height)+5rem)] lg:pb-14 lg:pt-[14rem]">
          <div className="mb-28 flex items-center gap-2 text-[clamp(1rem,1.2vw,1.25rem)] tracking-[0.02em]">
            <Link href="/industries" className="font-light text-[#bec3cb] transition hover:text-[#d9b27a]">
              {pick(language, copy.industriesPage.title)}
            </Link>
            <ChevronRight className="size-4 text-[#bec3cb]" />
            <span className="text-white">{displayIndustry.title}</span>
          </div>

          <div className="flex flex-col items-start gap-8 lg:flex-row lg:gap-12">
            <div className="shrink-0 lg:w-[26rem]">
              <div className="mb-8 h-[3px] w-20 bg-[#d9b27a]" />
              <h1 className="text-[clamp(2.5rem,3.6vw,3.25rem)] font-semibold leading-[1.1] tracking-[-0.01em] text-[#d9b27a]">
                {displayIndustry.title}
              </h1>
            </div>
            <p className="max-w-[60rem] flex-1 text-justify text-[clamp(1rem,1.25vw,1.25rem)] leading-[1.8] tracking-[0.02em] text-[#d1d5dc]">
              {displayIndustry.intro}
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-[#171717]">
        <div className="site-shell">
          <div className="flex max-w-[70rem] flex-col gap-6 pb-32 lg:ml-[26rem] xl:ml-[28rem]">
            {displayIndustry.sections.map((section) => (
              <Card key={section.title}>
                <SectionHeading>{section.title}</SectionHeading>
                {"items" in section && section.items ? (
                  <ul className="mt-6 flex flex-col gap-4">
                    {section.items.map((item) => (
                      <Bullet key={item}>{item}</Bullet>
                    ))}
                  </ul>
                ) : null}
              </Card>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
