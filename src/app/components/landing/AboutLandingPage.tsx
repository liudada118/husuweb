"use client";

import Link from "next/link";
import { type CSSProperties } from "react";
import aboutBackgroundImage from "../../../assets/about2.png";
import aboutBannerImage from "../../../assets/about3.png";
import aboutIcon1 from "../../../assets/abouticon1.png";
import aboutIcon2 from "../../../assets/abouticon2.png";
import aboutIcon3 from "../../../assets/abouticon3.png";
import aboutHeroImage from "../../../assets/about.png";
import awardsImage from "../../../assets/awards.png";
import thoughtMediaImage from "../../../assets/Thought.png";
import { HeroAnimation2Background } from "./HeroAnimation2Background";
import { LandingFooter } from "./LandingFooter";
import { LandingHeader } from "./LandingHeader";
import { LandingRevealGroup } from "./LandingRevealGroup";
import { defaultWorkLifeSlides, WorkLifeCarousel } from "./WorkLifeCarousel";
import { useLanguage } from "../../contexts/LanguageContext";
import { usePublicCmsData } from "../../contexts/PublicCmsDataContext";
import { renderNormalAmpersands, renderTitleAmpersands } from "../renderNormalAmpersands";
import {
  imageSrc,
  officialSiteHref,
  landingSocialItems,
} from "./shared";
import {
  getPageContentItemField,
  getPageContentField,
  getPageContentLines,
  getPageContentSectionItems,
  pageContentItemFieldKey,
  splitPageContentParagraphs,
} from "@/lib/cms-page-content";

const aboutPageShellClassName = "mx-auto w-full px-[var(--landing-shell-125)]";
const defaultTigerPartnersLogoSrc = "/uploads/home/1778001310228-hu.svg";

const professionalBackgroundParagraphs = {
  en: [
    `Tiger Partners began his legal career in 2009 after graduating from Peking University Law School, one of the top law schools in Asia. Over the following decade, he honed his craft at four of China's most prestigious "Red Circle" law firms - Zhong Lun Law Firm, King & Wood Mallesons, Fangda Partners, and Jingtian & Gongcheng - where he quickly earned a reputation for tenacity, strategic creativity, and an unusual willingness to take ownership of complex matters far beyond his seniority. By 2018, he had made partner at Jingtian & Gongcheng.`,
    `Then, rather than settling into the comfort of partnership at an established firm, he made a bold move: in 2019, he co-founded Tiger Partners to pursue a vision of what a modern dispute resolution practice could be - lean, focused, and unafraid to challenge convention.`,
    `At the same time, Tiger Partners has continued to invest in his academic and professional development. As of 2026, he is pursuing an Executive LL.M. degree at Columbia Law School.`,
  ],
  zh: [
    `虎诉（Tiger Partners）于2009年从亚洲顶尖法学院之一的北京大学法学院毕业后，正式开启律师职业生涯。在随后的十年间，他先后在中伦律师事务所、金杜律师事务所、方达律师事务所、竞天公诚律师事务所这四家中国顶尖“红圈所”深耕历练，凭借坚韧的办案风格、富有策略性的创新思路，以及远超自身资历、主动承担复杂案件的突出态度，迅速树立专业口碑。2018年，他晋升为竞天公诚律师事务所合伙人。`,
    `彼时，他并未安于成熟律所的合伙人席位，而是做出大胆选择：2019年，他联合创立了虎诉律师事务所，致力于打造一家团队精简、业务专注、勇于突破传统的现代化争议解决精品律所。`,
    `与此同时，虎诉亦持续投入学术与专业进阶。2026年，他正在哥伦比亚大学法学院攻读 Executive LL.M. 学位。`,
  ],
} as const;

const tigerPartnersContent = {
  en: {
    intro:
      "Tiger Partners is built on a simple belief: a lean team of top-tier lawyers, unburdened by the layers and bureaucracy of large firms, can deliver superior results in the most complex commercial disputes. The firm takes on bet-the-company cases involving cross-border litigation, shareholder disputes, investment arbitration, and insurance coverage battles, regularly handling matters with claims exceeding tens of millions of US dollars.",
    recognitionLead:
      "In just over six years, the firm has been recognized by virtually every major legal directory and publication covering the Asia-Pacific market.",
    recognitionItems: [
      {
        title: "Chambers and Partners:",
        description:
          "Ranked in the Global Guide (2025, 2026) and the Greater China Region Guide (2025, 2026) for Dispute Resolution",
      },
      {
        title: "The Legal 500:",
        description:
          "Listed in Dispute Resolution — Arbitration and Litigation (China, 2026)",
      },
      {
        title: "Benchmark Litigation:",
        description:
          'Named a "Notable Firm" in Commercial Disputes, Beijing',
      },
      {
        title: "China Business Law Journal:",
        description:
          "Winner of the 2025 Excellence Award for Cross-Border Litigation, and multiple prior recognitions",
      },
    ],
  },
  zh: {
    intro:
      "虎诉律师事务所秉持一项朴素信念：一支由顶尖律师组成的精悍团队，摆脱大型律所的繁冗流程，能够在最复杂的商事争议中实现更优的办案效果。该所专注办理跨境诉讼、股权纠纷、投资仲裁、保险理赔争议等涉企业核心利益的案件，常处理标的额超数千万美元的法律事务。",
    recognitionLead:
      "成立仅六年多，该所便获得覆盖亚太市场的几乎所有主流法律评级机构与权威法律媒体的认可。",
    recognitionItems: [
      {
        title: "钱伯斯（Chambers and Partners）：",
        description:
          "荣登《钱伯斯全球指南2025》《钱伯斯全球指南2026》《钱伯斯大中华区指南2025》《钱伯斯大中华区指南2026》，均入选争议解决（中资律师事务所）榜单",
      },
      {
        title: "The Legal 500：",
        description:
          "入选 Legal 500 2026 中国区榜单争议解决：仲裁 - 中国律所、争议解决：诉讼 - 中国律所",
      },
      {
        title: "Benchmark Litigation：",
        description:
          "获评中国北京地区商业纠纷领域“值得关注的律所”",
      },
      {
        title: "《商法》（China Business Law Journal）：",
        description:
          "荣获2025年度卓越律所大奖（跨境诉讼），此前曾多次获得该机构奖项",
      },
    ],
  },
} as const;

const representativeWorkContent = {
  en: {
    title: "Representative Work",
    body:
      "Tiger Partners's practice is defined by cases that break new ground. He represented a formerly NASDAQ-listed company in what became the first Directors & Officers liability insurance dispute in China to result in a definitive arbitral award, ultimately securing over USD 20 million in insurance recovery across multiple coverage layers spanning Mainland China, Hong Kong, and the United States. He has defended leading international accounting firms in high-profile tort disputes brought by major state-owned banks with claims exceeding USD 50 million. He has won complex investment arbitrations, shareholder disputes, and real estate cases at the Beijing Arbitration Commission, the Shanghai International Arbitration Center, and the Supreme People's Court of China.",
    highlight:
      "One of his landmark achievements was persuading the Supreme People's Court to overturn both the first-instance and second-instance judgments in a case that, for the first time, recognized the civil litigation standing of a homeowners' committee - a decision now included in the People's Court Case Database as a leading case in its field.",
  },
  zh: {
    title: "代表业绩",
    body:
      "虎诉擅长于承办具有开创性意义的案件。他曾代理一家前纳斯达克上市公司处理中国首例获得终局仲裁裁决的董监高责任保险纠纷，最终通过覆盖中国大陆、中国香港及美国的多层保险赔付机制，成功追回超2000万美元保险赔偿金。他曾为多家国际顶尖会计师事务所提供辩护，应对由大型国有银行提起、标的额超5000万美元的重大侵权纠纷案件。同时，他在北京仲裁委员会、上海国际仲裁中心及中华人民共和国最高人民法院代理的多起复杂投资仲裁、股权争议、房地产案件均取得胜诉结果。",
    highlight:
      "其里程碑式业绩之一，是成功推动最高人民法院在一起案件中撤销一审及二审判决。该案首次在司法实践中确认业主委员会的民事诉讼主体资格，现已被收录入人民法院案例库，成为该领域指导性案例。",
  },
} as const;

const individualRecognitionContent = {
  en: {
    title: "Individual Recognition",
    subtitle:
      "Tiger Partners has been individually recognized across the legal industry:",
    items: [
      {
        title: "The Legal 500 China Elite:",
        description: "Beijing Elite in Commercial Disputes (2025)",
      },
      {
        title: "Chambers Global Practice Guide:",
        description:
          "Invited author of the China Dispute Resolution Overview (2025 & 2026)",
      },
      {
        title: "China Business Law Journal:",
        description:
          '"The A-List" Legal Elites: "Rising Stars Top 40"',
      },
      {
        title: "LEGALBAND:",
        description:
          "Top Ranked Lawyers - Rising Star in Dispute Resolution",
      },
      {
        title: "Benchmark Litigation China:",
        description:
          "Recommended Lawyer for Dispute Resolution, Beijing",
      },
      {
        title: "Asialaw Profiles:",
        description: "Notable Practitioner in Dispute Resolution",
      },
    ],
  },
  zh: {
    title: "个人荣誉",
    subtitle: "虎诉在法律行业屡获殊荣：",
    items: [
      {
        title: "The Legal 500：",
        description: "荣获“北京精英·商事争议”奖项",
      },
      {
        title: "《钱伯斯全球指南》（Chambers Global Practice Guide）：",
        description:
          "受邀撰写2025年、2026年《中国产争议解决概览》",
      },
      {
        title: "《商法》（China Business Law Journal）：",
        description:
          "入选“The A-List法律精英”名册；荣登“40位中国业务法律新星（Rising Stars Top 40）”榜单",
      },
      {
        title: "LEGALBAND：",
        description:
          "入选中国顶级律师排行榜，被评为争议解决（诉讼）领域的“后起之秀”",
      },
      {
        title: "Benchmark Litigation China：",
        description: "鑽ｇ櫥鍖椾含鍦板尯浜夎瑙ｅ喅鎺ㄨ崘寰嬪笀姒滃崟",
      },
      {
        title: "《亚洲法律概况》（Asialaw Profiles）：",
        description:
          "获评中国法律市场争议解决领域“知名律师”",
      },
    ],
  },
} as const;

const thoughtLeadershipContent = {
  en: {
    title: "Thought Leadership & Media",
    body:
      "Beyond the courtroom, Tiger Partners is one of the most influential legal media voices in the Asia-Pacific region. He is the creator and host of Tiger Partners Insights, a video podcast that has grown into one of the most prominent legal content programs in China. The show is among Bilibili's key supported video podcasts, with over 320,000 followers and 32,000 monthly paid subscribers on that platform alone. The audio version of the Tiger Partners Insights has attracted 42,000 followers on Xiaoyuzhou (a leading Chinese podcast platform), while its short-form video adaptations have gained 150,000 followers on Douyin (the Chinese version of TikTok). Each episode achieves 100,000 to 500,000 impressions across platforms, reaching a highly targeted audience of senior professionals in the legal, financial, and technology sectors across major Asia-Pacific cities.",
    highlight:
      `His media work has earned recognition not only for its reach but for its substance. As one senior partner at a leading international law firm has observed: "Tiger Partners has a unique talent in spotting what topics would be 'trendy' and the ways of most succinctly and effectively broadcasting them... He shed a precious light on the legal profession for law students, young lawyers, and business personnel curious about the law."`,
  },
  zh: {
    title: "思想引领与媒体影响力",
    body:
      "除法律实务之外，虎诉亦是亚太地区极具影响力的法律媒体意见领袖之一。他是Tiger Partners Insights专业观察的创始人和主持人，该播客现已成长为中国境内极具影响力的法律内容节目之一。该节目为视频网站Bilibili重点支持专业观察之一，仅在该网站就拥有超32万粉丝、3.2万月度付费订阅用户。节目的音频版在小宇宙拥有4.2万粉丝，短视频剪辑版在抖音拥有15万粉丝。每期节目全平台曝光量达10万-50万次，精准覆盖亚太一线城市法律、金融、科技领域资深专业人士。",
    highlight:
      "他的媒体工作不仅因其传播广度备受认可，更因其内容深度备受赞誉。正如一家具国际顶尖律所资深合伙人评价：“虎诉具备捕捉热点议题并将其以最简洁高效的方式传播的独特天赋……他为法学生、青年律师及关注法律的商业人士照亮了法律行业的珍贵图景。”",
  },
} as const;

const industryEngagementContent = {
  en: {
    title: "Industry Engagement",
    body:
      "Tiger Partners is actively involved in the development of arbitration practice in the Asia-Pacific. He serves as a Member of the Commercial Arbitration Law Professional Committee of the Beijing Lawyers Association and as Deputy Director of the Arbitration and Mediation Business Research Association of the Beijing Chaoyang District Lawyers Association. Tiger Partners has sponsored major arbitration events organized by institutions including the Hong Kong International Arbitration Centre, the China International Economic and Trade Arbitration Commission (CIETAC), and the Beijing Arbitration Commission.",
    secondary:
      "His published work includes the 2025 Chambers Global Practice Guide on China Dispute Resolution, and his writing has been included in a criminal law textbook authored by Professor Xingliang Chen of Peking University, based on the professor's nationally recognized course.",
  },
  zh: {
    title: "行业交流",
    body:
      "虎诉积极投身亚太地区仲裁实务发展，现任北京市律师协会商事仲裁法律专业委员会委员、北京市朝阳区律师协会仲裁与调解业务研究会副主任。虎诉律师事务所曾赞助由香港国际仲裁中心、中国国际经济贸易仲裁委员会（CIETAC）、北京仲裁委员会等机构主办的重大仲裁领域活动。",
    secondary:
      "他的出版成果包括《2025钱伯斯全球指南·中国争议解决概览》，撰写的相关文章亦被收录入北京大学陈兴良教授基于其国家级精品课程编著的刑法教材中。",
  },
} as const;

const beyondTheLawContent = {
  en: {
    title: "Beyond the Law",
    body:
      "Tiger Partners brings the same competitive drive to life outside the office. An avid gamer since his university days - when he captained the Peking University Warcraft III team - he remains a dedicated player across platforms, with a particular fondness for Overwatch. He is also a lifelong basketball player who has represented both King & Wood and Fangda Partners in firm-wide tournaments, with LeBron James as his all-time favorite player.",
  },
  zh: {
    title: "业余生活",
    body:
      "工作之外，虎诉同样保持着积极进取的生活态度。自大学时期起便是资深游戏爱好者，曾担任北京大学《魔兽争霸3》战队队长，至今仍活跃于各大游戏平台，尤其钟爱《守望先锋》。他同时也是一名篮球爱好者，曾代表金杜律师事务所、方达律师事务所参与所内赛事，最喜爱的篮球运动员是勒布朗·詹姆斯。",
  },
} as const;

function revealStyle(durationMs = 700, y = 24): CSSProperties {
  return {
    opacity: 0,
    transform: `translateY(${y}px)`,
    transition: `opacity ${durationMs / 1000}s ease, transform ${durationMs / 1000}s ease`,
  };
}

function renderWithItalicPhrase(text: string, phrase: string) {
  const parts = text.split(phrase);
  if (parts.length === 1) {
    return renderNormalAmpersands(text);
  }

  return parts.map((part, index) => (
    <span key={`${phrase}-${index}`}>
      {renderNormalAmpersands(part)}
      {index < parts.length - 1 ? <em>{renderNormalAmpersands(phrase)}</em> : null}
    </span>
  ));
}

function renderHeroName(text: string) {
  const marker = "(Tiger Partners)";
  const parts = text.split(marker);

  if (parts.length === 1) {
    return renderTitleAmpersands(text);
  }

  return (
    <>
      <span>{renderTitleAmpersands(parts[0])}</span>
      <span className="inline-block text-[0.875em]">{marker}</span>
      <span>{renderTitleAmpersands(parts.slice(1).join(marker))}</span>
    </>
  );
}

function renderRepresentativeWorkTitle(title: string, language: string) {
  if (language === "zh") {
    return <span className="text-[#d9b27a]">{renderTitleAmpersands(title)}</span>;
  }

  const words = title.trim().split(/\s+/);

  if (words.length < 2) {
    return <span className="text-white">{renderTitleAmpersands(title)}</span>;
  }

  return (
    <>
      <span className="text-white">{renderTitleAmpersands(words.slice(0, -1).join(" "))}</span>{" "}
      <span className="text-[#d9b27a]">{renderTitleAmpersands(words[words.length - 1])}</span>
    </>
  );
}

export function AboutLandingPage() {
  const defaultThoughtIcons = [
    { ...landingSocialItems[0], cmsItemId: undefined, iconSrc: imageSrc(aboutIcon1) },
    { ...landingSocialItems[1], cmsItemId: undefined, iconSrc: imageSrc(aboutIcon2) },
    { ...landingSocialItems[2], cmsItemId: undefined, iconSrc: imageSrc(aboutIcon3) },
  ];
  const { language } = useLanguage();
  const { pageContent } = usePublicCmsData();
  const defaultProfessionalParagraphs =
    language === "zh"
      ? professionalBackgroundParagraphs.zh
      : professionalBackgroundParagraphs.en;
  const aboutIntroBody = getPageContentField(
    pageContent,
    language,
    "about",
    "intro",
    "body",
    language === "zh"
      ? "虎诉（Tiger Partners）系虎诉律师事务所的创始合伙人兼管理合伙人。该所为一家总部位于北京的精品律师事务所，专注于重大商事争议解决业务。自2019年创立以来，虎诉团队已将虎诉打造为亚太地区最具知名度的争议解决律所之一。尽管事务所始终坚持精简规模的发展理念，仍已斩获本地区几乎所有主要法律奖项。"
      : "Tiger Partners is the Founding and Managing Partner of Tiger Partners, a Beijing-based boutique law firm specializing in high-stakes commercial dispute resolution. Since establishing the firm in 2019, he has built it into one of the most recognized dispute resolution practices in the Asia-Pacific region - a firm that, despite its deliberately lean size, has earned virtually every major legal accolade the region has to offer.",
  );
  const professionalTitle = getPageContentField(
    pageContent,
    language,
    "about",
    "professional",
    "title",
    language === "zh" ? "职业背景" : "Professional Background",
  );
  const professionalBannerImageSrc =
    getPageContentField(pageContent, language, "about", "professional", "bannerImage", "") || imageSrc(aboutBannerImage);
  const professionalBackgroundImageSrc =
    getPageContentField(pageContent, language, "about", "professional", "backgroundImage", "") || imageSrc(aboutBackgroundImage);
  const professionalParagraphs = getPageContentLines(
    pageContent,
    language,
    "about",
    "professional",
    ["paragraph1", "paragraph2", "paragraph3"],
    splitPageContentParagraphs(
      getPageContentField(pageContent, language, "about", "professional", "paragraphs", defaultProfessionalParagraphs.join("\n")),
      defaultProfessionalParagraphs,
    ),
  );
  const professionalParagraphClassName =
    language === "zh"
      ? "font-['Abel'] text-[clamp(1.02rem,1.42vw,1.28rem)] leading-[1.9] text-[#cdd0ce] [text-wrap:pretty] [text-align:justify]"
      : "font-['Abel'] text-[clamp(1.02rem,1.42vw,1.28rem)] leading-[1.72] text-[#cdd0ce] [text-align:justify]";
  const tigerPartnersBlock =
    language === "zh" ? tigerPartnersContent.zh : tigerPartnersContent.en;
  const tigerPartnersTitle = getPageContentField(
    pageContent,
    language,
    "about",
    "firm",
    "title",
    language === "zh" ? "虎诉律师事务所" : "Tiger Partners",
  );
  const tigerPartnersLogoSrc = getPageContentField(
    pageContent,
    language,
    "about",
    "firm",
    "logo",
    defaultTigerPartnersLogoSrc,
  );
  const tigerPartnersIntro = getPageContentField(pageContent, language, "about", "firm", "intro", tigerPartnersBlock.intro);
  const tigerPartnersRecognitionLead = getPageContentField(
    pageContent,
    language,
    "about",
    "firm",
    "recognitionLead",
    tigerPartnersBlock.recognitionLead,
  );
  const tigerPartnersRecognitionTitle = getPageContentField(
    pageContent,
    language,
    "about",
    "firm",
    "recognitionTitle",
    language === "zh" ? "核心荣誉：" : "Core Recognition",
  );
  const tigerPartnersRecognitionItems = getPageContentSectionItems(pageContent, language, "about", "firm");
  const tigerPartnersCtaLabel = getPageContentField(pageContent, language, "about", "firm", "ctaLabel", "visit Tiger Partners");
  const tigerPartnersCtaHref = getPageContentField(pageContent, language, "about", "firm", "ctaHref", officialSiteHref);
  const tigerPartnersBodyClassName =
    language === "zh"
      ? "font-['Abel'] text-[clamp(1.08rem,1.6vw,1.45rem)] leading-[1.88] text-[#cdd0ce] [text-wrap:pretty]"
      : "font-['Abel'] text-[clamp(1.08rem,1.6vw,1.45rem)] leading-[1.7] text-[#cdd0ce]";
  const tigerPartnersJustifiedBodyClassName = `${tigerPartnersBodyClassName} [text-align:justify]`;
  const tigerPartnersCardBodyClassName =
    language === "zh"
      ? "font-['Abel'] text-[0.98rem] leading-[1.82] text-[#e5e5e5] [text-wrap:pretty]"
      : "font-['Abel'] text-[1rem] leading-[1.65] text-[#e5e5e5]";
  const tigerPartnersCardTitleClassName =
    language === "zh"
      ? "font-['Akshar'] text-[1rem] font-semibold text-[#d9b27a]"
      : "font-['Akshar'] text-[1.05rem] font-medium  text-[#d9b27a]";
  const representativeWorkFallback = language === "zh" ? representativeWorkContent.zh : representativeWorkContent.en;
  const representativeWorkBlock = {
    title: getPageContentField(pageContent, language, "about", "representativeWork", "title", representativeWorkFallback.title),
    body: getPageContentField(pageContent, language, "about", "representativeWork", "body", representativeWorkFallback.body),
    highlight: getPageContentField(pageContent, language, "about", "representativeWork", "highlight", representativeWorkFallback.highlight),
  };
  const representativeBodyClassName =
    language === "zh"
      ? "font-['Abel'] text-[clamp(1.04rem,1.48vw,1.3rem)] leading-[1.9] text-[#e5e7e4] [text-wrap:pretty] [text-align:justify]"
      : "font-['Abel'] text-[clamp(1.04rem,1.48vw,1.3rem)] leading-[1.75] text-[#e5e7e4] [text-align:justify]";
  const representativeHighlightClassName =
    language === "zh"
      ? "relative z-10 mt-8 border-l-[3px] border-[#2d6a4f] pl-5 font-['Abel'] text-[clamp(1.04rem,1.48vw,1.3rem)] leading-[1.9] text-[#d5d8d4] [text-wrap:pretty] [text-align:justify] md:pl-6"
      : "relative z-10 mt-8 border-l-[3px] border-[#2d6a4f] pl-5 font-['Abel'] text-[clamp(1.04rem,1.48vw,1.3rem)] leading-[1.75] text-[#d5d8d4] [text-align:justify] md:pl-6";
  const individualRecognitionFallback = language === "zh" ? individualRecognitionContent.zh : individualRecognitionContent.en;
  const individualRecognitionItems = getPageContentSectionItems(pageContent, language, "about", "individualRecognition");
  const individualRecognitionBlock = {
    title: getPageContentField(pageContent, language, "about", "individualRecognition", "title", individualRecognitionFallback.title),
    subtitle: getPageContentField(pageContent, language, "about", "individualRecognition", "subtitle", individualRecognitionFallback.subtitle),
    overlayLine1: getPageContentField(pageContent, language, "about", "individualRecognition", "imageOverlayLine1", "Recognition validates excellence"),
    overlayLine2: getPageContentField(pageContent, language, "about", "individualRecognition", "imageOverlayLine2", "and inspires continuous pursuit"),
    items:
      individualRecognitionItems.length > 0
        ? individualRecognitionItems.map((item) => ({
            cmsItemId: item.id,
            title: getPageContentItemField(item, "title"),
            description: getPageContentItemField(item, "description"),
          }))
        : individualRecognitionFallback.items,
  };
  const individualRecognitionSubtitleClassName =
    language === "zh"
      ? "mt-5 font-['Abel'] text-[clamp(0.9rem,1.305vw,1.125rem)] leading-[1.78] text-[#d6dad5] [text-wrap:pretty]"
      : "mt-5 font-['Abel'] text-[clamp(0.9rem,1.305vw,1.125rem)] leading-[1.65] text-[#d6dad5]";
  const individualRecognitionTitleClassName =
    language === "zh"
      ? "font-['Akshar'] text-[clamp(0.85rem,1vw,0.97rem)] font-semibold leading-[1.5] text-[#d9b27a]"
      : "font-['Akshar'] text-[clamp(0.85rem,1vw,0.97rem)] font-semibold  leading-[1.2] text-[#d9b27a]";
  const individualRecognitionBodyClassName =
    language === "zh"
      ? "font-['Abel'] text-[clamp(0.77rem,0.86vw,0.86rem)] leading-[1.82] text-[#e5e5e5] [text-wrap:pretty]"
      : "font-['Abel'] text-[clamp(0.77rem,0.86vw,0.86rem)]  leading-[1.6] text-[#e5e5e5]";
  const thoughtLeadershipFallback = language === "zh" ? thoughtLeadershipContent.zh : thoughtLeadershipContent.en;
  const thoughtLeadershipBlock = {
    title: getPageContentField(pageContent, language, "about", "thoughtLeadership", "title", thoughtLeadershipFallback.title),
    body: getPageContentField(pageContent, language, "about", "thoughtLeadership", "body", thoughtLeadershipFallback.body),
    highlight: getPageContentField(pageContent, language, "about", "thoughtLeadership", "highlight", thoughtLeadershipFallback.highlight),
    image: getPageContentField(pageContent, language, "about", "thoughtLeadership", "image", "") || imageSrc(thoughtMediaImage),
  };
  const aboutThoughtIcons = getPageContentSectionItems(pageContent, language, "about", "thoughtLeadership").map((item, index) => ({
    cmsItemId: item.id,
    href: getPageContentItemField(item, "href", defaultThoughtIcons[index % defaultThoughtIcons.length]?.href ?? ""),
    iconSrc: getPageContentItemField(item, "icon", defaultThoughtIcons[index % defaultThoughtIcons.length]?.iconSrc ?? ""),
    label: getPageContentItemField(item, "label", defaultThoughtIcons[index % defaultThoughtIcons.length]?.label ?? ""),
  }));
  const resolvedThoughtIcons = aboutThoughtIcons.length > 0 ? aboutThoughtIcons : defaultThoughtIcons;
  const individualRecognitionImageSrc =
    getPageContentField(pageContent, language, "about", "individualRecognition", "image", "") || imageSrc(awardsImage);
  const individualRecognitionCtaLabel = getPageContentField(pageContent, language, "about", "individualRecognition", "ctaLabel", "View Awards");
  const individualRecognitionCtaHref = getPageContentField(pageContent, language, "about", "individualRecognition", "ctaHref", "/awards");
  const thoughtLeadershipBodyClassName =
    language === "zh"
      ? "mt-8 font-['Abel'] text-[clamp(0.972rem,1.44vw,1.305rem)] leading-[1.88] text-[#acacac] [text-wrap:pretty] [text-align:justify]"
      : "mt-8 font-['Abel'] text-[clamp(0.788rem,1.166vw,1.058rem)] leading-[1.7] text-[#acacac] [text-align:justify]";
  const thoughtLeadershipHighlightClassName =
    language === "zh"
      ? "mt-6 border-l-[3px] border-[#2d6a4f] pl-5 font-['Abel'] text-[clamp(0.918rem,1.305vw,1.134rem)] leading-[1.88] text-[#d6dad5] [text-wrap:pretty] [text-align:justify] md:pl-6"
      : "mt-6 border-l-[3px] border-[#2d6a4f] pl-5 font-['Abel'] text-[clamp(0.816rem,1.16vw,1.008rem)] leading-[1.8] text-[#d6dad5] [text-align:justify] md:pl-6";
  const industryEngagementFallback = language === "zh" ? industryEngagementContent.zh : industryEngagementContent.en;
  const industryEngagementBlock = {
    title: getPageContentField(pageContent, language, "about", "industryEngagement", "title", industryEngagementFallback.title),
    body: getPageContentField(pageContent, language, "about", "industryEngagement", "body", industryEngagementFallback.body),
    secondary: getPageContentField(pageContent, language, "about", "industryEngagement", "secondary", industryEngagementFallback.secondary),
  };
  const beyondTheLawFallback = language === "zh" ? beyondTheLawContent.zh : beyondTheLawContent.en;
  const beyondTheLawBlock = {
    title: getPageContentField(pageContent, language, "about", "beyondTheLaw", "title", beyondTheLawFallback.title),
    body: getPageContentField(pageContent, language, "about", "beyondTheLaw", "body", beyondTheLawFallback.body),
  };
  const workLifeTitle = getPageContentField(pageContent, language, "about", "workLife", "title", "Work & Life");
  const workLifeSlides = getPageContentSectionItems(pageContent, language, "about", "workLife").map((item, index) => ({
    alt: getPageContentItemField(item, "alt", defaultWorkLifeSlides[index]?.alt ?? `Work and life moment ${index + 1}`),
    cmsFields: {
      alt: pageContentItemFieldKey("workLife", item.id, "alt"),
      image: pageContentItemFieldKey("workLife", item.id, "image"),
    },
    id: item.id,
    src: getPageContentItemField(item, "image", defaultWorkLifeSlides[index]?.src ?? defaultWorkLifeSlides[0]?.src ?? ""),
  }));
  const sectionBodyClassName =
    language === "zh"
      ? "mt-8 max-w-[72rem] font-['Abel'] text-[clamp(1.08rem,1.6vw,1.45rem)] leading-[1.88] text-[#d9d9d9] [text-wrap:pretty] [text-align:justify]"
      : "mt-8 max-w-[72rem] font-['Abel'] text-[clamp(1.08rem,1.6vw,1.45rem)] leading-[1.7] text-[#d9d9d9] [text-align:justify]";
  const sectionSecondaryBodyClassName =
    language === "zh"
      ? "mt-6 max-w-[72rem] font-['Abel'] text-[clamp(1.08rem,1.6vw,1.45rem)] leading-[1.88] text-[#d4d4d4] [text-wrap:pretty] [text-align:justify]"
      : "mt-6 max-w-[72rem] font-['Abel'] text-[clamp(1.08rem,1.6vw,1.45rem)] leading-[1.7] text-[#d4d4d4] [text-align:justify]";
  const tigerPartnersSecondaryBodyClassName = `${sectionSecondaryBodyClassName} [text-align:justify]`;
  const isZh = language === "zh";
  const aboutHeroImageSrc = getPageContentField(pageContent, language, "about", "hero", "portraitImage", "") || imageSrc(aboutHeroImage);
  const heroEyebrow = getPageContentField(pageContent, language, "about", "hero", "eyebrow", "ABOUT");
  const heroName = getPageContentField(pageContent, language, "about", "hero", "name", "Tiger Partners");
  const heroQuoteLines = getPageContentLines(
    pageContent,
    language,
    "about",
    "hero",
    ["quoteLine1", "quoteLine2"],
    ['THE ADOLESCENT "Dispute Resolution" SPIRIT TAUGHT ME TO FACE LIFE\'S', "COMMERCIAL DISPUTES."],
  );
  const heroRole = renderTitleAmpersands(
    getPageContentField(pageContent, language, "about", "hero", "role", "Founding & Managing Partner"),
  );
  const heroFirm = getPageContentField(pageContent, language, "about", "hero", "firm", "Tiger Partners");
  const heroEyebrowClassName =
    "font-['Abel'] text-[clamp(0.82rem,calc(0.68rem+0.22vw),0.95rem)]  tracking-[0.22em] text-[rgba(255,255,255,0.7)]";
  const heroNameClassName =
    "mt-5 font-['Akshar'] font-bold leading-[0.96] tracking-[-0.04em] text-white";
  const heroQuoteClassName =
    "font-['Akshar'] text-[clamp(1.2rem,calc(1.466rem+0.948vw),2.64rem)] leading-[1.06] tracking-[0.01em] text-white";
  const heroMetaClassName =
    "font-['Inter'] text-[clamp(0.79rem,calc(0.57rem+0.34vw),0.99rem)] text-[rgba(255,255,255,0.8)]";
  const heroFirmClassName =
    "font-['Inter'] text-[clamp(0.79rem,calc(0.57rem+0.34vw),0.99rem)] font-semibold text-[rgba(255,255,255,0.8)]";

  return (
    <div className="min-h-screen bg-[#161915] text-white">
        <LandingHeader />

        <main className="overflow-hidden">
        <section className="relative flex h-[100svh] min-h-[100svh] items-center overflow-hidden">
          <div className="absolute inset-0">
            <HeroAnimation2Background variant="subtle" />
          </div>

          <LandingRevealGroup className="relative z-10 h-[100svh] min-h-[100svh] w-full" threshold={0.2}>
            <div className={`${aboutPageShellClassName} relative flex h-[100svh] min-h-[100svh] w-full flex-col items-start justify-center gap-0 py-[var(--landing-hero-padding-y)]`}>
              <div className="w-full lg:max-w-[var(--landing-hero-copy-width)]" data-animate style={revealStyle(900, 30)}>
                <p
                  className={heroEyebrowClassName}
                  data-cms-field="hero__eyebrow"
                >
                  {renderTitleAmpersands(heroEyebrow)}
                </p>
                <h1
                  className={heroNameClassName}
                  style={{
                    fontSize: "clamp(1.9rem, calc(1.75rem + 1.15vw), 3.2rem)",
                  }}
                  data-cms-field="hero__name"
                >
                  {renderHeroName(heroName)}
                </h1>

                <div className="mt-8 max-w-[48rem] border-l-4 border-[#d9b27a] pl-5 lg:pl-6">
                  <p className={heroQuoteClassName}>
                    {heroQuoteLines.map((line, index) => (
                      <span key={`${line}-${index}`} className="block" data-cms-field={`hero__quoteLine${index + 1}`}>
                        {line.includes('"Dispute Resolution"') ? (
                          <>
                            {renderTitleAmpersands(line.split('"Dispute Resolution"')[0])}
                            <span className="text-[#d9b27a]">{renderTitleAmpersands('"Dispute Resolution"')}</span>
                            {renderTitleAmpersands(line.split('"Dispute Resolution"')[1] ?? "")}
                          </>
                        ) : (
                          renderTitleAmpersands(line)
                        )}
                      </span>
                    ))}
                  </p>
                </div>

                <div className="mt-8 space-y-2">
                  <p className={heroMetaClassName} data-cms-field="hero__role">
                    {heroRole}
                  </p>
                  <p className={heroFirmClassName} data-cms-field="hero__firm">
                    {renderTitleAmpersands(heroFirm)}
                  </p>
                </div>
              </div>

              <div
                className="relative mt-12 flex w-full max-w-[var(--landing-hero-mobile-art-width)] shrink-0 items-center justify-center lg:hidden"
                data-animate
                style={revealStyle(900, 30)}
              >
                <div className="absolute inset-x-[14%] top-[16%] h-[68%] rounded-full bg-[rgba(205,142,25,0.14)] blur-[90px]" />
                <img
                  src={aboutHeroImageSrc}
                  alt="Tiger Partners"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className="relative w-full object-contain drop-shadow-[0_40px_90px_rgba(0,0,0,0.45)]"
                  data-cms-field="hero__portraitImage"
                />
              </div>
            </div>

            <div
              className="pointer-events-none absolute left-auto right-[5vw] top-0 hidden h-[100vh] w-max items-end justify-end lg:flex"
              data-animate
              style={revealStyle(900, 30)}
            >
              <div className="absolute inset-x-[10%] top-[14%] h-[72%] rounded-full bg-[rgba(205,142,25,0.14)] blur-[110px]" />
              <img
                src={aboutHeroImageSrc}
                alt="Tiger Partners"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="relative h-[100vh] w-auto max-w-none object-contain object-bottom drop-shadow-[0_40px_90px_rgba(0,0,0,0.45)]"
                data-cms-field="hero__portraitImage"
              />
            </div>
          </LandingRevealGroup>
        </section>

        <section className="bg-black py-20 md:py-28">
  <div className={aboutPageShellClassName}>
    <p
      className={
        language === "zh"
          ? "font-['Abel'] text-[clamp(1.3rem,1.82vw,1.66rem)] leading-[1.9] text-[#d7d8d5] [text-wrap:pretty]"
          : "font-['Abel'] text-[clamp(1.24rem,1.73vw,1.58rem)] leading-[1.72] text-[#d7d8d5]"
      }
      data-cms-field="intro__body"
    >
      {renderNormalAmpersands(aboutIntroBody)}
    </p>
  </div>
</section>
        <section className="bg-[#090c0a] pb-20 md:pb-28">
          <div className="relative lg:pb-[20rem]">
            <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden">
              <img
                src={professionalBannerImageSrc}
                alt="Tiger Partners professional background"
                loading="lazy"
                decoding="async"
                className="block h-auto w-full"
                data-cms-field="professional__bannerImage"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(9,12,10,0)_0%,rgba(9,12,10,0)_48%,rgba(9,12,10,0.18)_62%,rgba(9,12,10,0.72)_78%,rgba(9,12,10,0.94)_90%,rgba(9,12,10,1)_100%)]" />
            </div>

            <div
              className={`${aboutPageShellClassName} relative z-10 mt-[var(--landing-about-overlap)] grid items-start gap-10 sm:mt-[var(--landing-about-overlap-sm)] lg:absolute lg:inset-x-0 lg:top-[40%] lg:mt-0 lg:grid-cols-[minmax(240px,0.62fr)_minmax(0,1fr)] lg:gap-16`}
            >
              <div className="relative z-10 max-w-[24rem]">
                <h2
                  className={
                    isZh
                      ? "font-['Akshar'] text-[clamp(1.76rem,3.4vw,3.2rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-[#d9b27a] [text-shadow:0_10px_28px_rgba(0,0,0,0.42)]"
                      : "font-['Akshar'] text-[clamp(1.76rem,3.68vw,3.84rem)] font-bold  leading-[0.94] tracking-[-0.04em] text-[#d9b27a] [text-shadow:0_10px_28px_rgba(0,0,0,0.42)]"
                  }
                >
                  {professionalTitle.split(/\s+/).map((line, index) => (
                    <span key={`${line}-${index}`} className="block" data-cms-field="professional__title">
                      {renderTitleAmpersands(line)}
                    </span>
                  ))}
                </h2>
              </div>

              <div className="space-y-8">
                <p className={professionalParagraphClassName} data-cms-field="professional__paragraph1">
                  {renderNormalAmpersands(professionalParagraphs[0])}
                </p>
                <p className={`relative z-10 ${professionalParagraphClassName}`} data-cms-field="professional__paragraph2">
                  {renderNormalAmpersands(professionalParagraphs[1])}
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-0 mt-6 ml-[calc(50%-50vw)] hidden w-screen max-w-none overflow-hidden lg:block">
            <img
              src={professionalBackgroundImageSrc}
              alt="Tiger Partners professional background"
              loading="lazy"
              decoding="async"
              className="block h-auto w-full"
              data-cms-field="professional__backgroundImage"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(9,12,10,0.94)_0%,rgba(9,12,10,0.78)_10%,rgba(9,12,10,0.42)_22%,rgba(9,12,10,0.12)_36%,rgba(9,12,10,0)_48%,rgba(9,12,10,0)_100%)]" />
            <div className={`${aboutPageShellClassName} absolute inset-x-0 top-[20%] z-10`}>
              <div className="grid items-start gap-16 lg:grid-cols-[minmax(240px,0.62fr)_minmax(0,1fr)]">
                <div aria-hidden="true" />
                <div className="max-w-[36rem]">
                  <p className={`relative z-10 ${professionalParagraphClassName}`} data-cms-field="professional__paragraph3">
                    {renderNormalAmpersands(professionalParagraphs[2])}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-0 mt-6 ml-[calc(50%-50vw)] w-screen max-w-none overflow-hidden lg:hidden">
            <img
              src={professionalBackgroundImageSrc}
              alt="Tiger Partners professional background"
              loading="lazy"
              decoding="async"
              className="block h-auto w-full"
              data-cms-field="professional__backgroundImage"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(9,12,10,1)_0%,rgba(9,12,10,0.92)_8%,rgba(9,12,10,0.62)_20%,rgba(9,12,10,0.24)_34%,rgba(9,12,10,0)_48%,rgba(9,12,10,0)_100%)]" />
            <div className={`${aboutPageShellClassName} absolute inset-x-0 top-[20%] z-10`}>
              <div className="max-w-[32rem]">
                <p className={professionalParagraphClassName} data-cms-field="professional__paragraph3">
                  {renderNormalAmpersands(professionalParagraphs[2])}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[rgba(14,16,14,0.72)] py-20 md:py-28">
          <div className={`${aboutPageShellClassName} grid gap-10 lg:justify-between lg:gap-[min(4vw,4rem)] lg:grid-cols-[32vw_32vw]`}>
            <div className="lg:w-[32vw]">
              <div className="mb-8 flex items-center gap-4">
                <img
                  src={tigerPartnersLogoSrc}
                  alt="Tiger Partners logo"
                  className="h-[clamp(2.016rem,2.88vw,2.88rem)] w-auto object-contain"
                  data-cms-field="firm__logo"
                />
                <h2
                  className={
                    isZh
                      ? "font-['Akshar'] text-[clamp(1.48rem,2.45vw,2.5rem)] font-semibold leading-none tracking-[0.02em] text-[#d9b27a]"
                      : "font-['Akshar'] text-[clamp(1.7rem,2.8vw,3rem)] font-semibold  leading-none tracking-[0.08em] text-[#d9b27a]"
                  }
                  data-cms-field="firm__title"
                >
                  {renderTitleAmpersands(tigerPartnersTitle)}
                </h2>
              </div>
              <p className={tigerPartnersJustifiedBodyClassName} data-cms-field="firm__intro">
                {renderNormalAmpersands(tigerPartnersIntro)}
              </p>
              <p className={tigerPartnersSecondaryBodyClassName} data-cms-field="firm__recognitionLead">
                {renderNormalAmpersands(tigerPartnersRecognitionLead)}
              </p>
            </div>

            <div className="landing-bottom-edge-glow-card rounded-[28px] border border-[rgba(81,96,91,0.5)] bg-[rgba(18,20,16,0.58)] p-7 shadow-[0_0_40px_rgba(217,178,122,0.08)] lg:w-[32vw]">
              <h3
                className={
                  isZh
                    ? "font-['Akshar'] text-[clamp(1.6rem,2.5vw,2.5rem)] font-semibold leading-[1.18] text-white"
                    : "font-['Akshar'] text-[clamp(1.8rem,2.7vw,3rem)] font-semibold text-white"
                }
                data-cms-field="firm__recognitionTitle"
              >
                {renderTitleAmpersands(tigerPartnersRecognitionTitle)}
              </h3>
              <div className="mt-8 space-y-6">
                {(tigerPartnersRecognitionItems.length > 0 ? tigerPartnersRecognitionItems : tigerPartnersBlock.recognitionItems).map((item) => {
                  const itemId = "id" in item ? item.id : undefined;
                  const title = "fields" in item ? getPageContentItemField(item, "title") : item.title;
                  const description = "fields" in item ? getPageContentItemField(item, "description") : item.description;

                  return (
                  <div key={title} className="flex gap-4">
                    <div className="mt-2 size-2.5 shrink-0 rounded-full bg-[#36805f]" />
                    <div>
                      <p
                        className={tigerPartnersCardTitleClassName}
                        data-cms-field={itemId ? pageContentItemFieldKey("firm", itemId, "title") : undefined}
                      >
                        {renderTitleAmpersands(title)}
                      </p>
                      <p
                        className={`mt-2 ${tigerPartnersCardBodyClassName}`}
                        data-cms-field={itemId ? pageContentItemFieldKey("firm", itemId, "description") : undefined}
                      >
                        {renderNormalAmpersands(description)}
                      </p>
                    </div>
                  </div>
                  );
                })}
              </div>
              <div className="mt-8 h-px w-full bg-[rgba(217,178,122,0.28)]" />
              <a
                href={tigerPartnersCtaHref}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 font-['Akshar'] text-[clamp(0.95rem,1vw,1.04rem)] font-semibold  tracking-[0.04em] text-[#d9b27a] transition-colors duration-300 hover:text-white"
                data-cms-field="firm__ctaHref"
              >
                <span data-cms-field="firm__ctaLabel">{renderNormalAmpersands(tigerPartnersCtaLabel)}</span>
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path
                    d="M4.167 10h11.667M10.833 5l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
          </section>

        <section className="overflow-hidden bg-[linear-gradient(180deg,rgba(10,13,11,0.96)_0%,rgba(18,24,20,0.9)_100%)] py-20 md:py-28">
          <div className={`${aboutPageShellClassName} relative space-y-10`}>
            <div className="relative">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 select-none font-['Akshar'] text-[clamp(3.8rem,10vw,8rem)] font-bold  leading-none tracking-[0.16em] text-transparent opacity-35 -translate-y-[78%]"
                style={{
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  backgroundImage:
                    "linear-gradient(135deg, rgba(208,213,205,0.32) 0%, rgba(132,140,134,0.16) 48%, rgba(27,31,28,0.02) 100%)",
                }}
              >
                RFPEFS
              </div>

              <h2 className="relative z-10 max-w-[18ch] font-['Akshar'] text-[clamp(1.76rem,3.36vw,3.52rem)] font-bold  leading-[0.96] text-white [text-wrap:balance]" data-cms-field="representativeWork__title">
                {renderRepresentativeWorkTitle(representativeWorkBlock.title, language)}
              </h2>
            </div>

            <div className="relative">
              <p className={`relative z-10 ${representativeBodyClassName}`} data-cms-field="representativeWork__body">
                {renderNormalAmpersands(representativeWorkBlock.body)}
              </p>
              <p className={representativeHighlightClassName} data-cms-field="representativeWork__highlight">
                {renderNormalAmpersands(representativeWorkBlock.highlight)}
              </p>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-6 top-full mt-5 select-none font-['Akshar'] text-[clamp(3.2rem,8vw,6.8rem)] font-bold  leading-none tracking-[0.14em] text-transparent opacity-30 md:right-8 md:mt-6"
                style={{
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  backgroundImage:
                    "linear-gradient(135deg, rgba(208,213,205,0.28) 0%, rgba(132,140,134,0.14) 54%, rgba(27,31,28,0.02) 100%)",
                }}
              >
                ENTATIVE
              </div>
            </div>
          </div>
        </section>

        <section id="awards" className="py-20 md:py-28">
          <div className={aboutPageShellClassName}>
            <div className="mb-12">
              <h2 className="font-['Akshar'] text-[clamp(1.6rem,3.2vw,3.2rem)] font-bold  leading-[1.08] text-white" data-cms-field="individualRecognition__title">
                {renderTitleAmpersands(individualRecognitionBlock.title)}
              </h2>
              <p className={individualRecognitionSubtitleClassName} data-cms-field="individualRecognition__subtitle">
                {renderNormalAmpersands(individualRecognitionBlock.subtitle)}
              </p>
            </div>

            <div className="mx-auto space-y-6">
              <div className="relative mx-auto flex h-[70vh] min-h-[20rem] w-full items-center justify-center">
                <div className="relative flex w-[63vw] max-w-none items-center justify-center">
                  <img
                    src={individualRecognitionImageSrc}
                    alt="Tiger Partners awards and recognition"
                    loading="lazy"
                    decoding="async"
                    className="h-auto max-h-full w-full object-contain"
                    data-cms-field="individualRecognition__image"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,11,9,0.16)_0%,rgba(8,11,9,0.08)_35%,rgba(8,11,9,0.22)_100%)]" />
                  <p className="pointer-events-none absolute left-1/2 top-1/2 z-10 w-[min(90%,40rem)] -translate-x-1/2 -translate-y-1/2 px-6 text-center font-['Akshar'] text-[clamp(1.44rem,2.25vw,2.34rem)] font-bold  leading-[1.05] tracking-[0.06em] text-white">
                    <span className="block" data-cms-field="individualRecognition__imageOverlayLine1">
                      {renderTitleAmpersands(individualRecognitionBlock.overlayLine1)}
                    </span>
                    <span className="block" data-cms-field="individualRecognition__imageOverlayLine2">
                      {renderTitleAmpersands(individualRecognitionBlock.overlayLine2)}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mx-auto mt-10 grid w-[56.7vw] max-w-none gap-6 md:mt-12 md:auto-rows-fr md:grid-cols-2 xl:grid-cols-3">
              {individualRecognitionBlock.items.map((item) => (
                <article
                  key={item.title}
                  className="flex h-full self-stretch rounded-[24px] border border-[rgba(90,99,93,0.45)] bg-[linear-gradient(156deg,rgba(25,36,30,0.82)_0%,rgba(12,14,13,0.88)_80%)] px-6 py-[1.4rem] transition-all duration-300 hover:scale-[1.02] hover:border-[rgba(217,178,122,0.45)] hover:shadow-[0_0_30px_rgba(217,178,122,0.08)]"
                >
                  <div className="flex h-full flex-col gap-3">
                    <p
                      className={individualRecognitionTitleClassName}
                      data-cms-field={"cmsItemId" in item ? pageContentItemFieldKey("individualRecognition", item.cmsItemId, "title") : undefined}
                    >
                      {renderTitleAmpersands(item.title)}
                    </p>
                    <p
                      className={individualRecognitionBodyClassName}
                      data-cms-field={"cmsItemId" in item ? pageContentItemFieldKey("individualRecognition", item.cmsItemId, "description") : undefined}
                    >
                      {renderNormalAmpersands(item.description)}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mx-auto mt-10 flex w-[56.7vw] max-w-none justify-start md:mt-12">
              <Link
                href={individualRecognitionCtaHref}
                className="inline-flex items-center gap-3 rounded-full border border-[rgba(79,213,193,0.16)] bg-[radial-gradient(circle_at_bottom,rgba(69,239,199,0.18)_0%,rgba(30,82,69,0.88)_55%,rgba(22,55,48,0.96)_100%)] px-7 py-3 font-['Akshar'] text-[clamp(0.95rem,1vw,1.05rem)] font-semibold text-[#d8edf7] shadow-[0_0_28px_rgba(55,180,150,0.22)] transition-transform duration-300 hover:scale-[1.02]"
                data-cms-field="individualRecognition__ctaHref"
              >
                <span className="leading-none text-white" data-cms-field="individualRecognition__ctaLabel">
                  {renderNormalAmpersands(individualRecognitionCtaLabel)}
                </span>
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path
                    d="M4.167 10h11.667M10.833 5l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className={`${aboutPageShellClassName} grid gap-10 lg:grid-cols-[minmax(24rem,0.62fr)_minmax(0,0.96fr)] lg:items-stretch lg:gap-16`}>
            <div className="relative flex h-full min-w-0 flex-col justify-between items-end gap-5 pt-10 md:pt-12">
              <div aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-[clamp(2rem,3vw,2.5rem)] w-full">
                <div className="h-px w-full bg-[rgba(79,213,193,0.32)]" />
                <div className="h-full w-px bg-[rgba(79,213,193,0.32)]" />
              </div>
              <div className="flex w-fit self-end gap-8">
                {resolvedThoughtIcons.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    className="flex h-[4.4rem] w-[4.4rem] items-center justify-center rounded-[10px] border border-[#8d7444] bg-[rgba(17,21,15,0.92)] transition-colors duration-300 hover:border-[#d9b27a] hover:bg-[rgba(23,29,21,0.96)] md:h-[4.8rem] md:w-[4.8rem]"
                    data-cms-field={
                      typeof item.cmsItemId === "string"
                        ? pageContentItemFieldKey("thoughtLeadership", item.cmsItemId, "href")
                        : undefined
                    }
                  >
                    <img
                      src={item.iconSrc}
                      alt=""
                      className="h-5 w-auto object-contain md:h-6"
                      data-cms-field={
                        typeof item.cmsItemId === "string"
                          ? pageContentItemFieldKey("thoughtLeadership", item.cmsItemId, "icon")
                          : undefined
                      }
                    />
                  </a>
                ))}
              </div>
              <div className="relative w-full max-w-[36rem] self-end overflow-hidden rounded-[28px] border border-white/10 bg-[#11150f] shadow-[0_28px_72px_rgba(0,0,0,0.34)]">
                <img
                  src={thoughtLeadershipBlock.image}
                  alt="Thought leadership and media"
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full object-contain object-right"
                  data-cms-field="thoughtLeadership__image"
                />
              </div>
            </div>

            <div>
              <h2 className="font-['Akshar'] text-[clamp(1.6rem,3.2vw,3.2rem)] font-semibold  leading-[1.08] text-white" data-cms-field="thoughtLeadership__title">
                {renderTitleAmpersands(thoughtLeadershipBlock.title)}
              </h2>
              <p className={thoughtLeadershipBodyClassName} data-cms-field="thoughtLeadership__body">
                {renderWithItalicPhrase(thoughtLeadershipBlock.body, "Tiger Partners Insights")}
              </p>
              <p className={thoughtLeadershipHighlightClassName} data-cms-field="thoughtLeadership__highlight">
                {renderNormalAmpersands(thoughtLeadershipBlock.highlight)}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[rgba(14,16,14,0.72)] py-20 md:py-28">
          <div className={`${aboutPageShellClassName} space-y-16`}>
            <div>
              <h2 className="font-['Akshar'] text-[clamp(2rem,4vw,4rem)] font-bold  leading-[1.08] text-white" data-cms-field="industryEngagement__title">
                {renderTitleAmpersands(industryEngagementBlock.title)}
              </h2>
              <div className="mt-5 h-px w-[clamp(7rem,12vw,10rem)] bg-[#d9b27a]" />
              <p className={sectionBodyClassName} data-cms-field="industryEngagement__body">
                {renderNormalAmpersands(industryEngagementBlock.body)}
              </p>
              <p className={sectionSecondaryBodyClassName} data-cms-field="industryEngagement__secondary">
                {renderNormalAmpersands(industryEngagementBlock.secondary)}
              </p>
            </div>

            <div>
              <h2 className="font-['Akshar'] text-[clamp(2rem,4vw,4rem)] font-bold  leading-[1.08] text-white" data-cms-field="beyondTheLaw__title">
                {renderTitleAmpersands(beyondTheLawBlock.title)}
              </h2>
              <div className="mt-5 h-px w-[clamp(7rem,12vw,10rem)] bg-[#d9b27a]" />
              <p className={sectionSecondaryBodyClassName} data-cms-field="beyondTheLaw__body">
                {renderNormalAmpersands(beyondTheLawBlock.body)}
              </p>
            </div>

            <div>
              <WorkLifeCarousel slides={workLifeSlides} title={workLifeTitle} titleCmsField="workLife__title" />
            </div>
          </div>
        </section>
        </main>

        <LandingFooter />
    </div>
  );
}


