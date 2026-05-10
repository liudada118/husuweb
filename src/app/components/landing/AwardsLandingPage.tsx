"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  Award,
  Calendar,
  ChevronDown,
  Globe,
  Trophy,
  Video,
} from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties, type RefObject } from "react";
import awardHeroImage from "../../../assets/award.png";
import awardFirmImage1 from "../../../assets/award1.png";
import awardFirmImage2 from "../../../assets/award2.png";
import awardFirmImage3 from "../../../assets/award3.png";
import awardFirmImage4 from "../../../assets/award4.png";
import awardFirmImage5 from "../../../assets/award5.png";
import awardFirmImage6 from "../../../assets/award6.png";
import bilibiliLogo from "../../../assets/bilibili.png";
import mediaAward1 from "../../../assets/mediaAward1.png";
import mediaAward2 from "../../../assets/mediaAward2.png";
import mediaAward3 from "../../../assets/mediaAward3.png";
import mediaAward4 from "../../../assets/mediaAward4.png";
import mediaAward5 from "../../../assets/mediaAward5.png";
import xiaoyuzhouLogo from "../../../assets/xiaoyuzhou.png";
import { useLanguage } from "../../contexts/LanguageContext";
import { usePublicCmsData } from "../../contexts/PublicCmsDataContext";
import { renderNormalAmpersands, renderTitleAmpersands } from "../renderNormalAmpersands";
import { HeroAnimation2Background } from "./HeroAnimation2Background";
import { LandingFooter } from "./LandingFooter";
import { LandingHeader } from "./LandingHeader";
import { LandingRevealGroup } from "./LandingRevealGroup";
import { imageSrc, publicAssetSrc } from "./shared";
import {
  getPageContentField,
  getPageContentItemField,
  getPageContentSectionItems,
  pageContentItemFieldKey,
} from "@/lib/cms-page-content";

const awardsPageShellClassName = "mx-auto w-full px-[var(--landing-shell-125)]";
const initialVisibleTimelineItems = 6;
const initialVisibleLawFirmItems = 6;

type Language = "zh" | "en";

type AwardsTimelineItem = {
  cmsItemId?: string;
  id: number | string;
  date: string;
  image: string;
  titleEn: string;
  titleZh: string;
  descriptionEn: string;
  descriptionZh: string;
};

type AwardsEventItem = {
  id: number;
  date: string;
  image: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
};

type LawFirmAwardItem = {
  cmsItemId?: string;
  id: number | string;
  date: string;
  image: string;
  awardEn: string;
  awardZh: string;
  detailsEn: string;
  detailsZh: string;
};

type AwardsScheduleItem = {
  id: number;
  date: string;
  image: string;
  location: Record<Language, string>;
  live: boolean;
  speakers: Record<Language, string>;
  time: string;
  title: Record<Language, string>;
  type: Record<Language, string>;
};

type SocialMediaAwardItem = {
  cmsItemId?: string;
  id: number | string;
  brandEn: string;
  brandZh: string;
  image: string;
  logo: string;
  awardEn: string;
  awardZh: string;
  href: string;
};

const awardImages = [
  "https://images.unsplash.com/photo-1554459843-54f8368c480d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1774557937677-7041873b227a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1656761961831-bf4f231500b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1632341198257-bf5b859a56bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1766722906733-609eebf3b63a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
];

const awardImgSrc = (fileName: string) =>
  publicAssetSrc(`/awardimg/${encodeURIComponent(fileName)}`, awardHeroImage);

const lawFirmAwardImageByDate = {
  "2020.09": awardImgSrc("202009.png"),
  "2021.04": awardImgSrc("202104.jpeg"),
  "2021.05.18": awardImgSrc("20210518.jpeg"),
  "2021.06.10": awardImgSrc("2021610.png"),
  "2022.01.20": awardImgSrc("20220120.png"),
  "2022.03.31": awardImgSrc("20220331.jpeg"),
  "2022.05.09": awardImgSrc("20220509.png"),
  "2022.05.17": awardImgSrc("20220517.jpeg"),
  "2022.06.15": awardImgSrc("20220615.png"),
  "2024.01.22": awardImgSrc("20240122.png"),
  "2024.06.04": awardImgSrc("20240604.png"),
  "2025.01.16": awardImgSrc("20250116.jpeg"),
  "2025.02.13": awardImgSrc("20250213.png"),
  "2025.04.16": awardImgSrc("20250416.png"),
  "2025.06.19": awardImgSrc("20250619.png"),
  "2025.07.23": awardImgSrc("20250723.jpg"),
  "2025.11.19": awardImgSrc("20251119.png"),
  "2026.01.15": awardImgSrc("20260115.png"),
  "2026.03.16": awardImgSrc("20260320.png"),
} as const;

const individualAwardImageByDate = {
  "2019.09": awardImgSrc("201909.png"),
  "2020.05.26": awardImgSrc("20200526.png"),
  "2021.03.15": awardImgSrc("20210315.jpeg"),
  "2021.04.14": awardImgSrc("20210414.png"),
  "2021.06.10": awardImgSrc("20210610.png"),
  "2022.01.24": awardImgSrc("20220124.png"),
  "2022.05.17": awardImgSrc("20220517 (2).jpeg"),
  "2025.01": awardImgSrc("202501.png"),
  "2025.11.19": awardImgSrc("b74d4a97719a5658765b78e5568c3ca5.png"),
} as const;

const timelineItems: AwardsTimelineItem[] = [
  {
    id: 1,
    date: "2025.11.19",
    image: individualAwardImageByDate["2025.11.19"],
    titleEn: "Legal 500 China Elite: Beijing Elite – Commercial Disputes.",
    titleZh: "Legal 500中国精英-“北京精英·商业争议”",
    descriptionEn:
      "In November 2025, Mr. Tiger Partners was awarded the inaugural Legal 500 China Elite: Beijing Elite – Commercial Disputes.",
    descriptionZh: "2025年11月，虎诉荣获首届Legal 500中国精英-“北京精英·商业争议”",
  },
  {
    id: 2,
    date: "2025.01",
    image: individualAwardImageByDate["2025.01"],
    titleEn:
      "Invited to author the Chambers Global Practice Guides 2025 - Dispute Resolution Overview (PRC Firms)",
    titleZh: "受邀撰写《2025钱伯斯全球指南-争议解决概览·中资所》",
    descriptionEn:
      "In January 2025, Mr. Tiger Partners was invited to author the Chambers Global Practice Guides 2025 - Dispute Resolution Overview (PRC Firms).",
    descriptionZh:
      "2025年1月，虎诉受邀撰写《2025钱伯斯全球指南-争议解决概览·中资所》专题文章。",
  },
  {
    id: 3,
    date: "2022.05.17",
    image: individualAwardImageByDate["2022.05.17"],
    titleEn: "LEGALBAND 2022 Top Ranked Lawyers List",
    titleZh: "入选2022年度LEGALBAND中国顶级律师排行榜",
    descriptionEn:
      'In May 2022, Mr. Tiger Partners was listed in the 2022 Top Ranked Lawyers List as "Rising Star" in the field of "Dispute Resolution · Litigation" by LEGALBAND.',
    descriptionZh:
      "2022年5月，虎诉入选LEGALBAND“2022年度中国顶级律师排行榜”，并获评“争议解决·诉讼”领域后起之秀（Rising Star）。",
  },
  {
    id: 4,
    date: "2022.01.24",
    image: individualAwardImageByDate["2022.01.24"],
    titleEn: 'China Business Law Journal 2021 "The-A List"',
    titleZh: "入选2021年度《商法》“The A-List 法律精英”名册",
    descriptionEn:
      'In January 2022, Mr. Tiger Partners was selected as one of "The A List" among 100 elite practitioners of Chinese law by China Business Law Journal.',
    descriptionZh:
      "2022年1月，虎诉入选《商法》（China Business Law Journal）2021年度“The A-List 法律精英”名册，获评为100位中国法精英律师之一。",
  },
  {
    id: 5,
    date: "2021.06.10",
    image: individualAwardImageByDate["2021.06.10"],
    titleEn:
      "Benchmark Litigation China 2021 list of lawyers recommended for dispute resolution in Beijing.",
    titleZh: "入选Benchmark Litigation China 2021北京地区争议解决推荐律师榜单",
    descriptionEn:
      "In June 2021, Mr. Tiger Partners was listed on the Benchmark Litigation China 2021 list of lawyers recommended for dispute resolution in Beijing.",
    descriptionZh:
      "2021年6月，虎诉入选Benchmark Litigation China 2021北京地区争议解决推荐律师榜单。",
  },
  {
    id: 6,
    date: "2021.04.14",
    image: individualAwardImageByDate["2021.04.14"],
    titleEn: "LEGALBAND 2021 Top Ranked Lawyers List",
    titleZh: "入选2021年度LEGALBAND中国顶级律师排行榜",
    descriptionEn:
      'In April 2021, Mr. Tiger Partners was listed in the LEGALBAND 2021 Top Ranked Lawyers, and ranked as the "Rising Star" in the field of "dispute resolution and litigation".',
    descriptionZh:
      "2021年4月，虎诉入选LEGALBAND“2021年度中国顶级律师排行榜”，并获评“争议解决·诉讼”领域后起之秀（Rising Star）。",
  },
  {
    id: 7,
    date: "2021.03.15",
    image: individualAwardImageByDate["2021.03.15"],
    titleEn: "China Business Law Journal Rising Stars 2021 Top 40.",
    titleZh: "入选《商法》Rising Stars 2021 TOP 40榜单",
    descriptionEn:
      "In March 2021, Mr. Tiger Partners was identified by the notable legal media China Business Law Journal in the list of Rising Stars 2021 Top 40.",
    descriptionZh:
      "2021年3月，虎诉入选知名法律媒体《商法》（China Business Law Journal）“2021年度Rising Stars 40强”榜单。",
  },
  {
    id: 8,
    date: "2020.05.26",
    image: individualAwardImageByDate["2020.05.26"],
    titleEn:
      'Featured in an exclusive interview with ALB and recognized as a “rising star in dispute resolution.”',
    titleZh: "接受ALB专访，被赞誉为“争议解决领域的耀眼新星”",
    descriptionEn:
      'In May 2020, Mr. Tiger Partners once received an exclusive interview with Asian Legal Business (ALB), a well-known legal media, and was featured by ALB as “rising star in dispute resolution.”',
    descriptionZh:
      "2020年5月，虎诉接受知名法律媒体《亚洲法律杂志》（Asian Legal Business，ALB）专访，被赞誉为“争议解决领域的耀眼新星”。",
  },
  {
    id: 9,
    date: "2019.09",
    image: individualAwardImageByDate["2019.09"],
    titleEn: "Asialaw Profiles 2020 China Legal Market Rankings",
    titleZh: "入选Asialaw Profiles 2020中国法律市场榜单",
    descriptionEn:
      'In September 2019, Mr. Tiger Partners was awarded the title of “Notable Practitioner” in the field of dispute resolution in China legal market by Asialaw Profiles for 2020.',
    descriptionZh:
      "2019年9月，虎诉入选 Asialaw Profiles 2020 中国法律市场榜单，被评为争议解决领域“知名律师”（Notable Practitioner）。",
  },
];

const eventItems: AwardsEventItem[] = [
  {
    id: 1,
    date: "2025.09.27",
    image: awardImages[0],
    title: {
      zh: "缁艰壓鐗瑰埆鑺傜洰鎾褰曞埗",
      en: "Special Variety Podcast Recording",
    },
    description: {
      zh: "鍥寸粫鑱屽満鍏崇郴涓庡唴瀹硅〃杈惧睍寮€闀垮璇濓紝寤朵几濂栭」椤电殑鍐呭涓婚涓庝汉鐗╁奖鍝嶅姏銆?",
      en: "A long conversation on workplace dynamics and content expression.",
    },
  },
  {
    id: 2,
    date: "2025.08.15",
    image: awardImages[1],
    title: {
      zh: "棣欐腐澶у涓婚璁插骇",
      en: "Guest Lecture at HKU",
    },
    description: {
      zh: "鍒嗕韩琛屼笟瓒嬪娍銆佽亴涓氱粡楠屼笌鏈潵鍒涙柊瑙傚療锛岃ˉ鍏呰崳瑾夐〉鐨勫叕鍏辫〃杈剧淮搴︺€?",
      en: "Shared industry trends, career lessons, and future innovation insights.",
    },
  },
  {
    id: 3,
    date: "2025.06.20",
    image: awardImages[2],
    title: {
      zh: "涔岄晣鍏呯數鍒嗕韩浼?",
      en: "Wuzhen Recharge Session",
    },
    description: {
      zh: "璁ㄨ璺ㄧ晫鍒涙柊銆佷釜浜哄搧鐗屼笌琛ㄨ揪鏂规硶锛岃濂栭」涔嬪鐨勫疄璺佃绯荤粺鍛堢幇銆?",
      en: "Focused on cross-disciplinary innovation, personal brand, and expression.",
    },
  },
  {
    id: 4,
    date: "2024.11.05",
    image: awardImages[3],
    title: {
      zh: "鍖椾含澶у浜ゆ祦鍒嗕韩",
      en: "Peking University Exchange",
    },
    description: {
      zh: "璁ㄨ涓撲笟瀹炶返鍜屽晢涓氬垱鏂颁箣闂寸殑鏂版満浼氾紝寤剁画椤甸潰涓殑鎴愰暱涓庡奖鍝嶄富棰樸€?",
      en: "Explored the new opportunities between practice and business innovation.",
    },
  },
  {
    id: 5,
    date: "2024.04.10",
    image: awardImages[4],
    title: {
      zh: "灏忕孩涔﹁劚鍙ｇ鐗瑰埆娲诲姩",
      en: "Xiaohongshu Talk Show Event",
    },
    description: {
      zh: "鐢ㄨ交鏉句絾閿嬪埄鐨勬柟寮忚璁虹幇瀹炲洶鎯戯紝浣撶幇濂栭」涔嬪鐨勫叕浼楄Е杈捐兘鍔涖€?",
      en: "Used a playful but sharp tone to discuss real-life tension points.",
    },
  },
  {
    id: 6,
    date: "2023.08.18",
    image: awardImages[0],
    title: {
      zh: "鍝佺墝鍛ㄥ勾搴嗗吀",
      en: "Brand Anniversary Celebration",
    },
    description: {
      zh: "鍥為【骞村害鍏抽敭鑺傜偣骞跺垎浜笅涓€闃舵甯冨眬锛屼娇鑽ｈ獕鍘嗗彶涓庢湭鏉ヨ鍒掑舰鎴愯繛鎺ャ€?",
      en: "Reviewed major milestones and shared the next stage roadmap.",
    },
  },
];

const lawFirmAwardItems: LawFirmAwardItem[] = [
  {
    id: 1,
    date: "2026.03.16",
    image: imageSrc(awardFirmImage1),
    awardEn: "ALB China Law Awards 2026",
    awardZh: "ALB 2026年度中国法律大奖",
    detailsEn:
      "In March 2026, Tiger Partners was shortlisted for the ALB China Law Awards 2026 with two nominations: Dispute Resolution Boutique Law Firm of the Year and Rising Law Firm of the Year.",
    detailsZh:
      "2026年3月，虎诉律师事务所入围ALB 2026年度中国法律大奖，并获得“年度争议解决精品律师事务所”和“年度最具潜力律师事务所”两项提名。",
  },
  {
    id: 2,
    date: "2026.01.15",
    image: imageSrc(awardFirmImage2),
    awardEn: "Chambers Greater China Region Guide 2026",
    awardZh: "钱伯斯大中华区指南2026",
    detailsEn:
      "In January 2026, Tiger Partners was listed in the Chambers Greater China Region Guide 2026 in the practice area of Dispute Resolution (PRC Firms).",
    detailsZh:
      "2026年1月，虎诉律师事务所入选《钱伯斯大中华区指南2026》争议解决（中资律师事务所）推荐榜单。",
  },
  {
    id: 3,
    date: "2025.11.19",
    image: imageSrc(awardFirmImage3),
    awardEn: "The Legal 500 China Ranking 2026",
    awardZh: "The Legal 500中国区2026榜单",
    detailsEn:
      "In November 2025, Tiger Partners was listed in The Legal 500 China 2026 rankings for Dispute Resolution: Arbitration (PRC Firms) and Dispute Resolution: Litigation (PRC Firms).",
    detailsZh:
      "2025年11月，虎诉律师事务所入选The Legal 500中国区2026榜单，荣获以下两个领域的推荐：“争议解决：仲裁（中国律所）”和“争议解决：诉讼（中国律所）”。",
  },
  {
    id: 4,
    date: "2025.07.23",
    image: imageSrc(awardFirmImage5),
    awardEn: "China Business Law Awards 2025",
    awardZh: "《商法》2025卓越律所大奖",
    detailsEn:
      "In July 2025, Tiger Partners was awarded the China Business Law Awards 2025 Excellence Award in the practice area of Cross-Border Litigation.",
    detailsZh:
      "2025年7月，虎诉律师事务所在《商法》2025卓越律所大奖中荣获“跨境诉讼”领域奖项。",
  },
  {
    id: 5,
    date: "2025.06.19",
    image: imageSrc(awardFirmImage6),
    awardEn: "ALB China Dispute Resolution Rankings 2025",
    awardZh: "ALB中国争议解决榜单2025",
    detailsEn:
      "In June 2025, Tiger Partners was listed in the ALB China Dispute Resolution Rankings 2025 and recognized as a Notable Firm in the field of Litigation.",
    detailsZh:
      "2025年6月，虎诉律师事务所入选ALB中国争议解决榜单2025，并在诉讼领域获评“值得关注律所”。",
  },
  {
    id: 6,
    date: "2025.04.16",
    image: imageSrc(awardFirmImage4),
    awardEn: "ALB China Law Awards 2025 (Nomination)",
    awardZh: "ALB 2025年度中国法律大奖（入围）",
    detailsEn:
      "In April 2025, Tiger Partners was nominated for Boutique Law Firm of the Year at the ALB China Law Awards 2025.",
    detailsZh:
      "2025年4月，虎诉律师事务所入围ALB 2025年度中国法律大奖“年度精品律师事务所”提名。",
  },
  {
    id: 7,
    date: "2025.02.13",
    image: lawFirmAwardImageByDate["2025.02.13"],
    awardEn: "Chambers Global Guide 2025",
    awardZh: "钱伯斯全球指南2025",
    detailsEn:
      "In February 2025, Tiger Partners was listed in the Chambers Global Guide 2025 in the practice area of Dispute Resolution (PRC Firms).",
    detailsZh:
      "2025年2月，虎诉律师事务所入选《钱伯斯全球指南2025》争议解决（中资律师事务所）推荐榜单。",
  },
  {
    id: 8,
    date: "2025.01.16",
    image: lawFirmAwardImageByDate["2025.01.16"],
    awardEn: "Chambers Greater China Region Guide 2025",
    awardZh: "钱伯斯大中华区指南2025",
    detailsEn:
      "In January 2025, Tiger Partners was listed in the Chambers Greater China Region Guide 2025 in the practice area of Dispute Resolution (PRC Firms).",
    detailsZh:
      "2025年1月，虎诉律师事务所入选《钱伯斯大中华区指南2025》争议解决（中资律师事务所）推荐榜单。",
  },
  {
    id: 9,
    date: "2024.06.04",
    image: lawFirmAwardImageByDate["2024.06.04"],
    awardEn: "Benchmark Litigation China 2024 Dispute Resolution Rankings",
    awardZh: "Benchmark Litigation中国2024争议解决榜单",
    detailsEn:
      'In June 2024, Tiger Partners was listed in the Benchmark Litigation China 2024 Dispute Resolution rankings and recognized as a "Firm to Watch".',
    detailsZh:
      "2024年6月，虎诉律师事务所入选Benchmark Litigation中国2024争议解决榜单，并获评“值得关注律所”。",
  },
  {
    id: 10,
    date: "2024.01.22",
    image: lawFirmAwardImageByDate["2024.01.22"],
    awardEn: "ALB China Firms to Watch 2024",
    awardZh: "ALB中国精品律所榜单2024",
    detailsEn: "In January 2024, Tiger Partners was listed in the ALB China Firms to Watch 2024.",
    detailsZh: "2024年1月，虎诉律师事务所入选ALB中国精品律所榜单2024。",
  },
  {
    id: 11,
    date: "2022.06.15",
    image: lawFirmAwardImageByDate["2022.06.15"],
    awardEn: "China Business Law Awards 2022",
    awardZh: "《商法》2022卓越律所大奖",
    detailsEn:
      "In June 2022, Tiger Partners was listed in the Dispute Resolution (Domestic) ranking and received recognition in the Pro Bono ranking of the China Business Law Awards 2022.",
    detailsZh:
      "2022年6月，虎诉律师事务所入选《商法》2022卓越律所大奖“境内争议解决”榜单，并获评“卓越公益律所”。",
  },
  {
    id: 12,
    date: "2022.05.17",
    image: lawFirmAwardImageByDate["2022.05.17"],
    awardEn: "LEGALBAND 2022 China Top Law Firms Rankings",
    awardZh: "LEGALBAND 2022中国顶级律所榜单",
    detailsEn:
      "In May 2022, Tiger Partners was listed as a Firm to Watch in Dispute Resolution (Litigation) and Compliance in the LEGALBAND 2022 China Top Law Firms Rankings.",
    detailsZh:
      "2022年5月，虎诉律师事务所入选LEGALBAND 2022中国顶级律所榜单，并在“争议解决（诉讼）”及“合规”领域获评“潜力律所”。",
  },
  {
    id: 13,
    date: "2022.05.09",
    image: lawFirmAwardImageByDate["2022.05.09"],
    awardEn: "Benchmark Litigation China 2022",
    awardZh: "Benchmark Litigation中国榜单2022",
    detailsEn:
      "In May 2022, Tiger Partners was recognized as a Notable Firm in commercial disputes in Beijing by Benchmark Litigation China 2022.",
    detailsZh:
      "2022年5月，虎诉律师事务所在Benchmark Litigation中国争议解决榜单2022中获评北京地区商业纠纷领域“值得关注律所”。",
  },
  {
    id: 14,
    date: "2022.03.31",
    image: lawFirmAwardImageByDate["2022.03.31"],
    awardEn: "LEGALBAND China Law Awards 2022 (Nomination)",
    awardZh: "LEGALBAND 2022中国法律大奖（入围）",
    detailsEn:
      "In March 2022, Tiger Partners was nominated for Rising Law Firm of the Year at the LEGALBAND China Law Awards 2022.",
    detailsZh:
      "2022年3月，虎诉律师事务所入围LEGALBAND 2022中国法律大奖“年度最佳新锐律师事务所”提名。",
  },
  {
    id: 15,
    date: "2022.01.20",
    image: lawFirmAwardImageByDate["2022.01.20"],
    awardEn: "ALB China Firms to Watch 2022",
    awardZh: "ALB中国精品律所榜单2022",
    detailsEn: "In January 2022, Tiger Partners was listed in the ALB China Firms to Watch 2022.",
    detailsZh: "2022年1月，虎诉律师事务所入选ALB中国精品律所榜单2022。",
  },
  {
    id: 16,
    date: "2021.06.10",
    image: lawFirmAwardImageByDate["2021.06.10"],
    awardEn: "Benchmark Litigation China 2021",
    awardZh: "Benchmark Litigation中国榜单2021",
    detailsEn:
      "In June 2021, Tiger Partners was recognized as a Notable Firm in commercial disputes in Beijing by Benchmark Litigation China 2021.",
    detailsZh:
      "2021年6月，虎诉律师事务所在Benchmark Litigation中国榜单2021中获评北京地区商业纠纷领域“值得关注律所”。",
  },
  {
    id: 17,
    date: "2021.05.18",
    image: lawFirmAwardImageByDate["2021.05.18"],
    awardEn: "China Business Law Awards 2021",
    awardZh: "《商法》2021卓越律所大奖",
    detailsEn: "In May 2021, Tiger Partners was listed as a Firm to Watch in the China Business Law Awards 2021.",
    detailsZh: "2021年5月，虎诉律师事务所在《商法》2021卓越律所大奖中获评“备受关注律所”。",
  },
  {
    id: 18,
    date: "2021.04",
    image: lawFirmAwardImageByDate["2021.04"],
    awardEn: "ALB China Law Awards 2021 (Nomination)",
    awardZh: "ALB 2021年度中国法律大奖（入围）",
    detailsEn:
      "In April 2021, Tiger Partners was nominated for Rising Law Firm of the Year at the ALB China Law Awards 2021.",
    detailsZh:
      "2021年4月，虎诉律师事务所入围ALB 2021年度中国法律大奖“年度最具潜力律师事务所”提名。",
  },
  {
    id: 19,
    date: "2020.09",
    image: lawFirmAwardImageByDate["2020.09"],
    awardEn: "China Business Law Journal Recognition",
    awardZh: "《商法》正式收录虎诉律师事务所",
    detailsEn:
      "In September 2020, Tiger Partners was officially recognized and included by China Business Law Journal.",
    detailsZh: "2020年9月，虎诉律师事务所获《商法》正式收录。",
  },
];

const socialMediaAwardItems: SocialMediaAwardItem[] = [
  {
    id: 1,
    brandEn: "Bilibili",
    brandZh: "Bilibili",
    image: imageSrc(mediaAward1),
    logo: imageSrc(bilibiliLogo),
    awardEn: "Bilibili 100,000 Followers Award",
    awardZh: "Bilibili 十万粉丝成就",
    href: "/media",
  },
  {
    id: 2,
    brandEn: "Bilibili",
    brandZh: "Bilibili",
    image: imageSrc(mediaAward2),
    logo: imageSrc(bilibiliLogo),
    awardEn: 'Bilibili 10,000 "Charging" Award',
    awardZh: "Bilibili 一万充电成就",
    href: "/media",
  },
  {
    id: 3,
    brandEn: "Bilibili",
    brandZh: "Bilibili",
    image: imageSrc(mediaAward3),
    logo: imageSrc(bilibiliLogo),
    awardEn: "Bilibili 2025 Knowledge Creator of the Year",
    awardZh: "Bilibili 2025年度知识up主",
    href: "/media",
  },
  {
    id: 4,
    brandEn: "Bilibili",
    brandZh: "Bilibili",
    image: imageSrc(mediaAward1),
    logo: imageSrc(bilibiliLogo),
    awardEn: "Bilibili 2025 Outstanding Instructor",
    awardZh: "Bilibili 2025年度优质讲师",
    href: "/media",
  },
  {
    id: 5,
    brandEn: "Xiaoyuzhou",
    brandZh: "小宇宙",
    image: imageSrc(mediaAward4),
    logo: imageSrc(xiaoyuzhouLogo),
    awardEn: 'Xiaoyuzhou "Stories from Tiger Partners’s Live Room" 10,000 Followers Award',
    awardZh: "小宇宙 “虎诉直播间的故事”一万订阅成就",
    href: "/media",
  },
  {
    id: 6,
    brandEn: "Xiaoyuzhou",
    brandZh: "小宇宙",
    image: imageSrc(mediaAward5),
    logo: imageSrc(xiaoyuzhouLogo),
    awardEn: 'Xiaoyuzhou "Tiger Partners Insights" 30,000 Followers Award',
    awardZh: "小宇宙 “Tiger Partners Insights” 三万订阅成就",
    href: "/media",
  },
];

const scheduleItems: AwardsScheduleItem[] = [
  {
    id: 1,
    date: "04.15",
    time: "14:00 - 15:30",
    image: awardImages[0],
    location: {
      zh: "涓讳細鍦?A 鍖?",
      en: "Main Hall, Zone A",
    },
    live: true,
    speakers: {
      zh: "闄堝崥澹?/ 鎶€鏈洟闃?",
      en: "Dr. Chen / Tech Team",
    },
    title: {
      zh: "2026 骞村害绉戞妧鍒涙柊鍙戝竷浼?",
      en: "2026 Tech Innovation Press Conference",
    },
    type: {
      zh: "鍏ㄧ悆鐩存挱",
      en: "Global Live",
    },
  },
  {
    id: 2,
    date: "04.16",
    time: "10:00 - 11:00",
    image: awardImages[2],
    location: {
      zh: "濯掍綋涓績 302 瀹?",
      en: "Media Center, Room 302",
    },
    live: false,
    speakers: {
      zh: "璁捐涓績璐熻矗浜?",
      en: "Design Leads",
    },
    title: {
      zh: "鐙濯掍綋缇よ",
      en: "Exclusive Group Interview",
    },
    type: {
      zh: "濯掍綋缇よ",
      en: "Group Interview",
    },
  },
  {
    id: 3,
    date: "04.17",
    time: "19:00 - 21:00",
    image: awardImages[1],
    location: {
      zh: "鍥介檯瀹翠細鍘?",
      en: "International Banquet Hall",
    },
    live: true,
    speakers: {
      zh: "鐗归個鍢夊",
      en: "Keynote Guests",
    },
    title: {
      zh: "鍙寔缁彂灞曢濂栨櫄瀹?",
      en: "Sustainable Development Gala",
    },
    type: {
      zh: "鏅氬鐩存挱",
      en: "Gala Live Stream",
    },
  },
  {
    id: 4,
    date: "04.18",
    time: "09:00 - 12:00",
    image: awardImages[3],
    location: {
      zh: "鍒涙柊瀹為獙棣?B 鍘?",
      en: "Innovation Lab, Pavilion B",
    },
    live: false,
    speakers: {
      zh: "鍏ㄧ悆瑙勫垝涓撳",
      en: "Global Experts",
    },
    title: {
      zh: "鏈潵鍩庡競瑙勫垝宸ヤ綔鍧?",
      en: "Future City Planning Workshop",
    },
    type: {
      zh: "闂棬鐮旇",
      en: "Closed Workshop",
    },
  },
];

const awardsIntroParagraph: Record<Language, string> = {
  en: "Tiger Partners has earned recognition as a lawyer, a legal media creator, and the founding and managing partner of Tiger Partners. His individual honors, the firm’s directory rankings in leading legal directories, and the growing influence of Tiger Partners Insights each testify to a career defined by excellence, innovation, and an unwavering commitment to redefining dispute resolution.",
  zh: "作为律师、法律内容创作者及虎诉律师事务所的创始及管理合伙人，虎诉在多个领域持续获得广泛认可。其个人荣誉、律所在权威法律评级中的优异表现，以及《Tiger Partners Insights》不断扩大的影响力，共同印证了一段以卓越、创新和重塑争议解决为使命的职业生涯。",
};

function getCopy(language: Language) {
  return {
    detailsCta: language === "zh" ? "展开" : "Details",
    detailsLabel: language === "zh" ? "奖项说明" : "Award Note",
    eventsEyebrow: "Section 02",
    eventsSubtitle:
      language === "zh"
        ? "娲诲姩鍐呭琚帴鍒版椂闂寸嚎涔嬪悗锛屾祻瑙堣矾寰勬洿杩炵画銆?"
        : "Event content now follows the timeline for a more continuous reading flow.",
    eventsTitle: language === "zh" ? "往期活动" : "Past Events",
    heroDescription: "",
    heroPrimary: language === "zh" ? "荣誉与" : "AWARDS AND",
    heroSecondary: language === "zh" ? "成就" : "ACHIEVEMENTS",
    hideCta: language === "zh" ? "收起" : "Hide",
    historyEyebrow: "Section 01",
    historySubtitle:
      language === "zh"
        ? "鏃堕棿绾垮尯鍧椾繚鐣欐姌鍙犲睍寮€缁嗚妭锛屼絾涓嶅啀闇€瑕佸垏鎹㈤〉闈€?"
        : "The timeline keeps its expandable details without requiring page switching.",
    historyTitle: language === "zh" ? "鑽ｈ獕鍘嗗彶" : "Awards History",
    reserveCta: language === "zh" ? "棰勭害鎻愰啋" : "Reserve",
    scheduleEyebrow: "Section 03",
    scheduleSubtitle:
      language === "zh"
        ? "濯掍綋鏃ョ▼浣滀负闀块〉鏈€鍚庝竴娈碉紝淇濈暀妯悜杞挱鐨勬祻瑙堟柟寮忋€?"
        : "The media schedule closes the long page while keeping its horizontal carousel.",
    scheduleTitle: language === "zh" ? "濯掍綋鏃ョ▼" : "Media Schedule",
    viewReviewCta: language === "zh" ? "鏌ョ湅鍥為【" : "View Review",
    watchLiveCta: language === "zh" ? "观看视频" : "Watch Live",
    viewMoreCta: language === "zh" ? "查看更多" : "View More",
    viewLessCta: language === "zh" ? "收起" : "Collapse",
  };
}

function revealStyle(durationMs = 700, y = 24): CSSProperties {
  return {
    opacity: 0,
    transform: `translateY(${y}px)`,
    transition: `opacity ${durationMs / 1000}s ease, transform ${durationMs / 1000}s ease`,
  };
}

function SectionHeader({
  bodyClassName,
  eyebrow,
  headingClassName,
  subtitle,
  title,
}: {
  bodyClassName: string;
  eyebrow: string;
  headingClassName: string;
  subtitle: string;
  title: string;
}) {
  return (
    <div className="mb-10 max-w-4xl">
      <p className={`mb-4 text-xs  tracking-[0.35em] text-[#D9B27A] md:text-sm ${headingClassName}`}>
        {eyebrow}
      </p>
      <h2 className={`text-3xl font-black tracking-tight text-white md:text-5xl ${headingClassName}`}>
        {title}
      </h2>
      <p className={`mt-4 text-base leading-relaxed text-gray-400 md:text-lg ${bodyClassName}`}>{subtitle}</p>
    </div>
  );
}

function TimelineCard({
  bodyClassName,
  headingClassName,
  item,
  language,
  index,
}: {
  bodyClassName: string;
  headingClassName: string;
  item: AwardsTimelineItem;
  language: Language;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const copy = getCopy(language);
  const activeTitle = language === "zh" ? item.titleZh : item.titleEn;
  const activeDescription = language === "zh" ? item.descriptionZh : item.descriptionEn;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className="relative pb-10 pl-8 md:pb-14 md:pl-14"
    >
      <div className="absolute left-[9px] top-7 z-10 h-[1.125rem] w-[1.125rem] rounded-full border-2 border-[#D9B27A] bg-[#161915] md:left-[13px] md:h-5 md:w-5">
        <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D9B27A]" />
      </div>

      <div
        onClick={() => setOpen((value) => !value)}
        className={`group relative w-full cursor-pointer rounded-[22px] border border-[rgba(170,140,80,0.22)] p-5 transition-all md:p-7 lg:p-8 ${
          open
            ? "shadow-[0_0_36px_rgba(217,178,122,0.22),0_18px_44px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,220,140,0.05)]"
            : "shadow-[inset_0_1px_0_rgba(255,220,140,0.05)]"
        }`}
        style={{
          background:
            "radial-gradient(80% 60% at 0% 0%, rgba(55, 65, 44, 0.18) 0%, rgba(55, 65, 44, 0) 45%), radial-gradient(90% 70% at 100% 0%, rgba(120, 92, 35, 0.18) 0%, rgba(120, 92, 35, 0) 50%), linear-gradient(180deg, #171812 0%, #15160f 24%, #121410 48%, #121410 100%)",
        }}
      >
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex-1">
            <span
              className={`mb-3 inline-flex items-center rounded-full border border-[#D9B27A]/55 bg-[rgba(217,178,122,0.12)] px-3.5 py-1.5 text-xs font-bold text-[#D9B27A] md:text-sm ${headingClassName}`}
              data-cms-field={item.cmsItemId ? pageContentItemFieldKey("individualAwards", item.cmsItemId, "date") : undefined}
            >
              {renderNormalAmpersands(item.date)}
            </span>

            <div className="space-y-2">
              <h3
                className={`flex items-start gap-2.5 text-[1.08rem] font-bold text-gray-100 transition-colors group-hover:text-white md:text-[1.36rem] ${headingClassName}`}
              >
                <Trophy className="mt-1 hidden h-5 w-5 shrink-0 text-[#D9B27A] sm:block" />
                <span data-cms-field={item.cmsItemId ? pageContentItemFieldKey("individualAwards", item.cmsItemId, "title") : undefined}>
                  {renderTitleAmpersands(activeTitle)}
                </span>
              </h3>
            </div>
          </div>

          <div
            className={`flex shrink-0 items-center gap-2 rounded-full border border-[#D9B27A]/55 bg-[rgba(217,178,122,0.12)] px-4 py-2.5 text-sm font-medium text-[#D9B27A] md:text-base ${headingClassName}`}
          >
            {open ? copy.hideCta : copy.detailsCta}
            <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
              <ChevronDown className="h-[1.125rem] w-[1.125rem]" />
            </motion.div>
          </div>
        </div>

        <AnimatePresence>
          {open ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="mt-6 flex flex-col gap-6 border-t border-[#D9B27A]/25 pt-5 md:flex-row">
                <div className="flex min-h-40 w-full items-center overflow-hidden rounded-[1.15rem] bg-[#3f5b50] md:min-h-48 md:w-64">
                  <img
                    src={item.image}
                    alt={activeTitle}
                    loading="lazy"
                    decoding="async"
                    className="block h-auto w-full opacity-80"
                    data-cms-field={item.cmsItemId ? pageContentItemFieldKey("individualAwards", item.cmsItemId, "image") : undefined}
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h4
                      className={`mb-3 flex items-center gap-2 text-base font-semibold text-[#D9B27A] md:text-lg ${headingClassName}`}
                    >
                      <Award className="h-[1.125rem] w-[1.125rem]" />
                      {copy.detailsLabel}
                    </h4>
                    <p
                      className={`text-[0.95rem] leading-relaxed text-gray-300/80 md:text-base ${bodyClassName}`}
                      data-cms-field={item.cmsItemId ? pageContentItemFieldKey("individualAwards", item.cmsItemId, "description") : undefined}
                    >
                      {renderNormalAmpersands(activeDescription)}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function SocialMediaAwardsCarousel({
  bodyClassName,
  headingClassName,
  items,
  language,
  subtitle,
  viewMoreLabel,
}: {
  bodyClassName: string;
  headingClassName: string;
  items: SocialMediaAwardItem[];
  language: Language;
  subtitle: string;
  viewMoreLabel: string;
}) {
  return (
    <div className="w-full">
      <div className="mb-8 border-b border-[rgba(217,178,122,0.3)] pb-4">
        <p
          className={`${bodyClassName} max-w-[56rem] text-[clamp(0.9rem,1.188vw,1.215rem)] leading-[1.65] text-[#d7d7d2]`}
        >
          <span data-cms-field="socialAwards__subtitle">{renderNormalAmpersands(subtitle)}</span>
        </p>
      </div>

      <div>
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item, index) => {
          const brand = language === "zh" ? item.brandZh : item.brandEn;
          const award = language === "zh" ? item.awardZh : item.awardEn;

          return (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
              className="group relative overflow-hidden rounded-[1.15rem] border border-[rgba(132,118,48,0.5)] bg-[linear-gradient(180deg,#121510_0%,#10130f_100%)] p-5 shadow-[0_18px_36px_rgba(0,0,0,0.28)]"
            >
              <div className="pointer-events-none absolute inset-x-[10%] top-[-1.25rem] h-16 rounded-full bg-[radial-gradient(circle,rgba(217,178,122,0.28)_0%,rgba(217,178,122,0)_75%)] blur-2xl" />
              <div className="pointer-events-none absolute inset-x-[18%] bottom-[-1.1rem] h-10 rounded-full bg-[radial-gradient(circle,rgba(217,178,122,0.16)_0%,rgba(217,178,122,0)_75%)] blur-xl" />

              <div className="relative z-10">
                <div className="mb-4 min-w-0">
                  <div className="min-w-0">
                    <div
                      className={`text-[clamp(1.125rem,1.18vw,1.375rem)] font-bold  leading-none tracking-[0.03em] text-[#D9B27A] ${headingClassName}`}
                      data-cms-field={item.cmsItemId ? pageContentItemFieldKey("socialAwards", item.cmsItemId, "brand") : undefined}
                    >
                      {renderTitleAmpersands(brand)}
                    </div>
                    <div
                      className={`mt-2 text-[clamp(0.875rem,0.94vw,1.0625rem)] font-semibold  leading-[1.28] text-[#efe7cf] ${bodyClassName}`}
                      data-cms-field={item.cmsItemId ? pageContentItemFieldKey("socialAwards", item.cmsItemId, "award") : undefined}
                    >
                      {renderTitleAmpersands(award)}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between gap-4">
                    <img
                      src={item.logo}
                      alt={`${brand} logo`}
                      className="h-[1.25rem] w-[1.25rem] object-contain"
                      data-cms-field={item.cmsItemId ? pageContentItemFieldKey("socialAwards", item.cmsItemId, "logo") : undefined}
                    />
                    <a
                      href={item.href}
                      className={`shrink-0 border-b border-[rgba(57,104,80,0.85)] pb-1 text-[clamp(0.6875rem,0.68vw,0.8125rem)]  tracking-[0.08em] text-[rgba(255,255,255,0.78)] transition hover:border-[#D9B27A] hover:text-[#D9B27A] ${headingClassName}`}
                      data-cms-field={item.cmsItemId ? pageContentItemFieldKey("socialAwards", item.cmsItemId, "href") : undefined}
                    >
                      {renderNormalAmpersands(viewMoreLabel)}
                    </a>
                  </div>
                </div>

                <div className="overflow-hidden rounded-[0.95rem] bg-[rgba(255,255,255,0.03)]">
                  <img
                    src={item.image}
                    alt={award}
                    loading="lazy"
                    decoding="async"
                    className="block aspect-[16/10] h-auto w-full object-cover"
                    data-cms-field={item.cmsItemId ? pageContentItemFieldKey("socialAwards", item.cmsItemId, "image") : undefined}
                  />
                </div>
              </div>
            </motion.article>
          );
        })}
        </div>
      </div>
    </div>
  );
}

export function AwardsLandingPage() {
  const { language, setLanguage } = useLanguage();
  const { pageContent } = usePublicCmsData();
  const copy = getCopy(language as Language);
  const isZh = language === "zh";
  const heroPrimary = getPageContentField(pageContent, language as Language, "awards", "hero", "primary", copy.heroPrimary);
  const heroSecondary = getPageContentField(pageContent, language as Language, "awards", "hero", "secondary", copy.heroSecondary);
  const heroDescription = getPageContentField(pageContent, language as Language, "awards", "hero", "description", copy.heroDescription);
  const heroImage = getPageContentField(pageContent, language as Language, "awards", "hero", "heroImage", "") || imageSrc(awardHeroImage);
  const introBody = getPageContentField(pageContent, language as Language, "awards", "intro", "body", awardsIntroParagraph[language as Language]);
  const individualAwardsTitle = getPageContentField(pageContent, language as Language, "awards", "individualAwards", "title", language === "zh" ? "律师个人奖项" : "INDIVIDUAL LAWYER AWARDS");
  const individualAwardsSubtitle = getPageContentField(
    pageContent,
    language as Language,
    "awards",
    "individualAwards",
    "subtitle",
    language === "zh"
      ? "以精研法律的专业能力、客户至上的执业理念以及卓越的争议解决成就，铸就职业生涯。"
      : "Celebrating a career defined by legal mastery, client-first advocacy, and excellence in dispute resolution",
  );
  const individualAwardsViewMoreLabel = getPageContentField(
    pageContent,
    language as Language,
    "awards",
    "individualAwards",
    "viewMoreLabel",
    copy.viewMoreCta,
  );
  const individualAwardsViewLessLabel = getPageContentField(
    pageContent,
    language as Language,
    "awards",
    "individualAwards",
    "viewLessLabel",
    copy.viewLessCta,
  );
  const lawFirmAwardsTitle = getPageContentField(pageContent, language as Language, "awards", "lawFirmAwards", "title", language === "zh" ? "律所奖项" : "LAW FIRM AWARDS");
  const lawFirmAwardsSubtitle = getPageContentField(
    pageContent,
    language as Language,
    "awards",
    "lawFirmAwards",
    "subtitle",
    language === "zh"
      ? "展现虎诉律师事务所在业内树立的卓越声望与领先实力"
      : "Honoring the collective prestige and market-leading excellence of Tiger Partners I founded and lead",
  );
  const lawFirmAwardsViewMoreLabel = getPageContentField(
    pageContent,
    language as Language,
    "awards",
    "lawFirmAwards",
    "viewMoreLabel",
    copy.viewMoreCta,
  );
  const lawFirmAwardsViewLessLabel = getPageContentField(
    pageContent,
    language as Language,
    "awards",
    "lawFirmAwards",
    "viewLessLabel",
    copy.viewLessCta,
  );
  const socialAwardsTitle = getPageContentField(pageContent, language as Language, "awards", "socialAwards", "title", language === "zh" ? "新媒体奖项" : "SOCIAL MEDIA AWARDS");
  const socialAwardsSubtitle = getPageContentField(
    pageContent,
    language as Language,
    "awards",
    "socialAwards",
    "subtitle",
    language === "zh"
      ? "展现数字传播中的广泛共鸣、深度连接以及卓越创意表达"
      : "Honoring digital resonance, meaningful connection, and exceptional creative expression",
  );
  const socialAwardsViewMoreLabel = getPageContentField(
    pageContent,
    language as Language,
    "awards",
    "socialAwards",
    "viewMoreLabel",
    language === "zh" ? "查看更多" : "View more",
  );
  const cmsIndividualAwardItems = getPageContentSectionItems(pageContent, language as Language, "awards", "individualAwards");
  const cmsLawFirmAwardItems = getPageContentSectionItems(pageContent, language as Language, "awards", "lawFirmAwards");
  const cmsSocialAwardItems = getPageContentSectionItems(pageContent, language as Language, "awards", "socialAwards");
  const allTimelineItems: AwardsTimelineItem[] =
    cmsIndividualAwardItems.length > 0
      ? timelineItems.map((fallbackItem, index) => {
          const item = cmsIndividualAwardItems[index];
          if (!item) {
            return fallbackItem;
          }

          const title = getPageContentItemField(item, "title");
          const description = getPageContentItemField(item, "description");
          return {
            cmsItemId: item.id,
            date: getPageContentItemField(item, "date", fallbackItem.date),
            descriptionEn: description,
            descriptionZh: description,
            id: fallbackItem.id,
            image: getPageContentItemField(item, "image", fallbackItem.image),
            titleEn: title,
            titleZh: title,
          };
        })
      : timelineItems;
  const allLawFirmAwardItems: LawFirmAwardItem[] =
    cmsLawFirmAwardItems.length > 0
      ? lawFirmAwardItems.map((fallbackItem, index) => {
          const item = cmsLawFirmAwardItems[index];
          if (!item) {
            return fallbackItem;
          }

          const title = getPageContentItemField(item, "title");
          const description = getPageContentItemField(item, "description");
          return {
            awardEn: title,
            awardZh: title,
            cmsItemId: item.id,
            date: getPageContentItemField(item, "date", fallbackItem.date),
            detailsEn: description,
            detailsZh: description,
            id: fallbackItem.id,
            image: getPageContentItemField(item, "image", fallbackItem.image),
          };
        })
      : lawFirmAwardItems;
  const allSocialMediaAwardItems: SocialMediaAwardItem[] =
    cmsSocialAwardItems.length > 0
      ? socialMediaAwardItems.map((fallbackItem, index) => {
          const item = cmsSocialAwardItems[index];
          if (!item) {
            return fallbackItem;
          }

          const brand = getPageContentItemField(item, "brand");
          const award = getPageContentItemField(item, "award");
          return {
            awardEn: award,
            awardZh: award,
            brandEn: brand,
            brandZh: brand,
            cmsItemId: item.id,
            href: getPageContentItemField(item, "href", fallbackItem.href),
            id: fallbackItem.id,
            image: getPageContentItemField(item, "image", fallbackItem.image),
            logo: getPageContentItemField(item, "logo", fallbackItem.logo),
          };
        })
      : socialMediaAwardItems;
  const headingFontClass = "font-['Akshar']";
  const bodyFontClass = "font-['Abel']";
  const [showAllTimelineItems, setShowAllTimelineItems] = useState(false);
  const [showAllLawFirmItems, setShowAllLawFirmItems] = useState(false);
  const timelineButtonRef = useRef<HTMLButtonElement | null>(null);
  const lawFirmButtonRef = useRef<HTMLButtonElement | null>(null);
  const lawFirmImageFrameRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [lawFirmImageFrameHeights, setLawFirmImageFrameHeights] = useState<number[]>([]);
  const visibleTimelineItems = showAllTimelineItems
    ? allTimelineItems
    : allTimelineItems.slice(0, initialVisibleTimelineItems);
  const visibleLawFirmItems = showAllLawFirmItems
    ? allLawFirmAwardItems
    : allLawFirmAwardItems.slice(0, initialVisibleLawFirmItems);
  const visibleLawFirmImageSignature = visibleLawFirmItems.map((item) => `${item.id}:${item.image}`).join("|");

  useEffect(() => {
    let frameId = 0;

    const measureRowImageHeights = () => {
      const frames = lawFirmImageFrameRefs.current.slice(0, visibleLawFirmItems.length);
      const rows: Array<{ top: number; indexes: number[] }> = [];

      frames.forEach((frame, index) => {
        if (!frame) {
          return;
        }

        const top = Math.round(frame.getBoundingClientRect().top);
        const row = rows.find((candidate) => Math.abs(candidate.top - top) <= 2);
        if (row) {
          row.indexes.push(index);
        } else {
          rows.push({ top, indexes: [index] });
        }
      });

      const nextHeights = Array.from({ length: visibleLawFirmItems.length }, () => 0);
      rows.forEach((row) => {
        const maxImageHeight = Math.max(
          ...row.indexes.map((index) => {
            const image = frames[index]?.querySelector("img");
            return image?.getBoundingClientRect().height ?? 0;
          }),
        );

        row.indexes.forEach((index) => {
          nextHeights[index] = Math.ceil(maxImageHeight);
        });
      });

      setLawFirmImageFrameHeights((previousHeights) => {
        if (
          previousHeights.length === nextHeights.length &&
          previousHeights.every((height, index) => height === nextHeights[index])
        ) {
          return previousHeights;
        }

        return nextHeights;
      });
    };

    const scheduleMeasurement = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(measureRowImageHeights);
    };

    scheduleMeasurement();
    window.addEventListener("resize", scheduleMeasurement);

    const resizeObserver = new ResizeObserver(scheduleMeasurement);
    lawFirmImageFrameRefs.current.slice(0, visibleLawFirmItems.length).forEach((frame) => {
      if (frame) {
        resizeObserver.observe(frame);
        const image = frame.querySelector("img");
        image?.addEventListener("load", scheduleMeasurement);
      }
    });

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", scheduleMeasurement);
      resizeObserver.disconnect();
      lawFirmImageFrameRefs.current.slice(0, visibleLawFirmItems.length).forEach((frame) => {
        frame?.querySelector("img")?.removeEventListener("load", scheduleMeasurement);
      });
    };
  }, [visibleLawFirmImageSignature, visibleLawFirmItems.length]);

  const scrollToSection = (id: "timeline" | "events" | "schedule") => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggleExpandedSection = (
    isExpanded: boolean,
    setExpanded: (value: boolean) => void,
    buttonRef: RefObject<HTMLButtonElement | null>,
  ) => {
    if (!isExpanded) {
      setExpanded(true);
      return;
    }

    setExpanded(false);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        buttonRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    });
  };

  return (
    <div className="min-h-screen bg-[#161915] text-white selection:bg-[#D9B27A]/30 selection:text-[#D9B27A]">
      <LandingHeader />

      <main className="relative z-10 pb-12">
        <section className="relative flex h-[100svh] min-h-[100svh] items-center overflow-hidden">
          <div className="absolute inset-0">
            <HeroAnimation2Background variant="subtle" />
          </div>

          <LandingRevealGroup className="relative z-10 h-[100svh] min-h-[100svh] w-full" threshold={0.2}>
            <div
              className={`${awardsPageShellClassName} relative flex h-[100svh] min-h-[100svh] w-full flex-col justify-center py-[var(--landing-hero-padding-y)]`}
            >
              <div className="grid items-stretch gap-12 lg:grid-cols-[minmax(0,0.78fr)_minmax(440px,1.22fr)] lg:gap-10">
                <div
                  className="flex w-full items-center justify-center pt-16 md:pt-20 lg:max-w-[var(--landing-hero-copy-width)] lg:pt-10"
                  data-animate
                  style={revealStyle(900, 30)}
                >
                  <div className="w-full">
                    <h1
                      className={`${headingFontClass} mt-5 text-center font-bold  tracking-[-0.04em] text-transparent ${
                        isZh
                          ? "inline-flex w-full flex-nowrap items-baseline justify-center gap-0 whitespace-nowrap px-2 pb-[0.12em] leading-[1.04] md:px-0"
                          : "max-w-full leading-[0.92]"
                      }`}
                      style={{
                        fontSize: "var(--landing-type-hero-en)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        backgroundImage:
                          "linear-gradient(101deg, rgb(255,255,255) 3%, rgb(217,178,122) 85%)",
                      }}
                    >
                      <span className={isZh ? "shrink-0" : "block"} data-cms-field="hero__primary">
                        {renderTitleAmpersands(heroPrimary)}
                      </span>
                      <span className={isZh ? "shrink-0" : "block"} data-cms-field="hero__secondary">
                        {renderTitleAmpersands(heroSecondary)}
                      </span>
                    </h1>
                    <div className="mt-6 flex w-full justify-center">
                      <div className="h-[2px] w-[12vw] rounded-full bg-[#d9b27a]" />
                    </div>
                  </div>
                </div>

                <div
                  className="relative mx-auto flex w-full max-w-[760px] min-h-[clamp(28rem,68svh,46rem)] items-end justify-center lg:absolute lg:left-auto lg:right-[5vw] lg:top-0 lg:h-[100vh] lg:w-max lg:justify-end"
                  data-animate
                  style={revealStyle(1100, 38)}
                >
                  <img
                    src={heroImage}
                    alt="Awards and achievements"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    className="relative h-full w-full rounded-[2rem] object-contain object-bottom lg:h-[100vh] lg:w-auto lg:max-w-none lg:rounded-none"
                    data-cms-field="hero__heroImage"
                  />
                </div>
              </div>
            </div>
          </LandingRevealGroup>
        </section>

        <section className="hidden">
          <div className="mb-6 flex justify-end">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 p-1.5 backdrop-blur-sm">
              <button
                type="button"
                onClick={() => setLanguage("zh")}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all md:text-base ${
                  language === "zh"
                    ? "bg-gradient-to-r from-[#D9B27A] to-[#CD8E19] text-[#161915]"
                    : "text-gray-400 hover:text-[#D9B27A]"
                }`}
              >
                ZH
              </button>
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-medium transition-all md:text-base ${
                  language === "en"
                    ? "bg-gradient-to-r from-[#D9B27A] to-[#CD8E19] text-[#161915]"
                    : "text-gray-400 hover:text-[#D9B27A]"
                }`}
              >
                <Globe className="h-4 w-4" />
                EN
              </button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center pt-8 text-center"
          >
            <div className="mb-5 inline-flex items-center justify-center rounded-full border border-[#D9B27A]/20 bg-[#D9B27A]/10 p-3.5 text-[#D9B27A]">
              <Trophy className="h-8 w-8 md:h-10 md:w-10" />
            </div>

            <h1 className="mb-5 flex flex-col items-center justify-center gap-4 text-5xl font-black leading-none tracking-tighter md:flex-row md:gap-8 md:text-7xl lg:text-[6.25rem] xl:text-[6.875rem]">
              <span className="bg-gradient-to-b from-[#4bc06c] via-[#337045] to-[#161915] bg-clip-text text-transparent">
                {renderTitleAmpersands(heroPrimary)}
              </span>
              <span className="bg-gradient-to-b from-[#fcd17a] via-[#CD8E19] to-[#161915] bg-clip-text text-transparent">
                {renderTitleAmpersands(heroSecondary)}
              </span>
            </h1>

            {heroDescription ? (
              <p className="mx-auto max-w-4xl px-4 text-lg leading-relaxed text-gray-400 md:text-xl" data-cms-field="hero__description">
                {renderNormalAmpersands(heroDescription)}
              </p>
            ) : null}
          </motion.div>
        </section>

        <section className="hidden">
          <div className="mx-auto flex w-fit max-w-full flex-wrap items-center justify-center gap-3 rounded-full border border-white/10 bg-[#161915]/75 p-2 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl md:gap-4">
            <button
              type="button"
              onClick={() => scrollToSection("timeline")}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-gray-200 hover:bg-[#D9B27A] hover:text-[#161915] md:px-7 md:py-3 md:text-base ${headingFontClass}`}
            >
              <Award className="h-4 w-4 md:h-5 md:w-5" />
              {renderTitleAmpersands(copy.historyTitle)}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("events")}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-gray-200 hover:bg-[#D9B27A] hover:text-[#161915] md:px-7 md:py-3 md:text-base ${headingFontClass}`}
            >
              <Video className="h-4 w-4 md:h-5 md:w-5" />
              {renderTitleAmpersands(copy.eventsTitle)}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("schedule")}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-gray-200 hover:bg-[#D9B27A] hover:text-[#161915] md:px-7 md:py-3 md:text-base ${headingFontClass}`}
            >
              <Calendar className="h-4 w-4 md:h-5 md:w-5" />
              {renderTitleAmpersands(copy.scheduleTitle)}
            </button>
          </div>
        </section>

        <div className={`${awardsPageShellClassName} space-y-12 pt-12 md:space-y-16 md:pt-16 lg:space-y-20 lg:pt-20`}>
          <section className="mx-auto max-w-[72rem] text-center">
            <p
              className={`${bodyFontClass} text-[clamp(1.3rem,1.82vw,1.66rem)] leading-[1.72] text-[#d7d8d5] ${
                isZh ? "text-center" : "[text-align:justify]"
              }`}
              data-cms-field="intro__body"
            >
              {renderNormalAmpersands(introBody)}
            </p>
          </section>

          <section id="timeline" className="scroll-mt-32 p-5 md:p-8 lg:p-10">
            <div className="mb-10 lg:mb-14">
              <div className="flex flex-col items-center gap-6 text-center">
                <h2
                  className={`${headingFontClass} text-[clamp(1.84rem,3.28vw,3.84rem)] font-bold  leading-[0.96] tracking-[-0.04em] text-[#D9B27A]`}
                  data-cms-field="individualAwards__title"
                >
                  {renderTitleAmpersands(individualAwardsTitle)}
                </h2>
                <p
                  className={`${bodyFontClass} max-w-[56rem] text-[clamp(0.9rem,1.188vw,1.215rem)] leading-[1.65] text-[#d7d7d2]`}
                  data-cms-field="individualAwards__subtitle"
                >
                  {renderNormalAmpersands(individualAwardsSubtitle)}
                </p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative mx-auto max-w-5xl lg:w-[80%]"
            >
              <div className="absolute left-[18px] top-4 bottom-10 z-0 w-[2px] -translate-x-1/2 bg-black md:left-[23px]" />
              <div className="relative z-10 space-y-0 pt-4">
                {visibleTimelineItems.map((item, index) => (
                  <TimelineCard
                    key={item.id}
                    bodyClassName={bodyFontClass}
                    headingClassName={headingFontClass}
                    item={item}
                    index={index}
                    language={language as Language}
                  />
                ))}
              </div>
            </motion.div>

            <div className="mt-10 flex justify-center">
              <button
                ref={timelineButtonRef}
                type="button"
                onClick={() =>
                  toggleExpandedSection(showAllTimelineItems, setShowAllTimelineItems, timelineButtonRef)
                }
                className="inline-flex items-center border-b-2 border-[#2d5f4f] pb-1 font-['Akshar'] text-[1.125rem] font-semibold tracking-tight text-white transition-colors duration-300 hover:border-[#d9b27a] hover:text-[#d9b27a]"
              >
                {renderNormalAmpersands(showAllTimelineItems ? individualAwardsViewLessLabel : individualAwardsViewMoreLabel)}
              </button>
            </div>
          </section>

          <section id="events" className="scroll-mt-32 p-5 md:p-8 lg:p-10">
            <div className="mb-10 lg:mb-14">
              <div className="flex flex-col items-center gap-6 text-center">
                <h2
                  className={`${headingFontClass} text-[clamp(1.84rem,3.28vw,3.84rem)] font-bold  leading-[0.96] tracking-[-0.04em] text-[#D9B27A]`}
                  data-cms-field="lawFirmAwards__title"
                >
                  {renderTitleAmpersands(lawFirmAwardsTitle)}
                </h2>
                <p
                  className={`${bodyFontClass} max-w-[56rem] text-[clamp(0.9rem,1.188vw,1.215rem)] leading-[1.65] text-[#d7d7d2]`}
                  data-cms-field="lawFirmAwards__subtitle"
                >
                  {renderNormalAmpersands(lawFirmAwardsSubtitle)}
                </p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mx-auto grid w-full max-w-[106.25rem] grid-cols-1 items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3"
            >
              {visibleLawFirmItems.map((item, index) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  className="group relative flex h-full w-full min-w-0 flex-col overflow-hidden rounded-[0.875rem] bg-transparent p-6 transition-all shadow-[0_18px_50px_rgba(0,0,0,0.18)]"
                >
                  <div
                    ref={(node) => {
                      lawFirmImageFrameRefs.current[index] = node;
                    }}
                    className="mb-5 flex w-full items-center justify-center overflow-hidden rounded-[0.875rem] bg-[#2C2F2B]"
                    style={lawFirmImageFrameHeights[index] ? { height: lawFirmImageFrameHeights[index] } : undefined}
                  >
                    <img
                      src={item.image}
                      alt={language === "zh" ? item.awardZh : item.awardEn}
                      loading="lazy"
                      decoding="async"
                      className="block h-auto w-full"
                      data-cms-field={item.cmsItemId ? pageContentItemFieldKey("lawFirmAwards", item.cmsItemId, "image") : undefined}
                    />
                  </div>

                  <div className="mb-4 min-h-[3.6rem] md:min-h-[4.6rem]">
                    <h3 className={`text-[clamp(1.125rem,1.14vw,1.375rem)] font-bold leading-[1.25] text-[#D9B27A] ${headingFontClass}`}>
                      <span
                        className="inline"
                        data-cms-field={item.cmsItemId ? pageContentItemFieldKey("lawFirmAwards", item.cmsItemId, "title") : undefined}
                        style={{
                          textDecorationLine: "underline",
                          textDecorationColor: "rgba(217,178,122,0.58)",
                          textDecorationThickness: "1px",
                          textUnderlineOffset: "0.22em",
                        }}
                      >
                        {renderTitleAmpersands(language === "zh" ? item.awardZh : item.awardEn)}
                      </span>
                    </h3>
                  </div>

                  <p
                    className={`mb-4 text-[clamp(0.875rem,0.92vw,1rem)] font-semibold leading-none text-[#efe7cf] ${bodyFontClass}`}
                    data-cms-field={item.cmsItemId ? pageContentItemFieldKey("lawFirmAwards", item.cmsItemId, "date") : undefined}
                  >
                    {renderNormalAmpersands(language === "zh" ? `日期：${item.date}` : `date: ${item.date}`)}
                  </p>

                  <p
                    className={`whitespace-pre-line text-[clamp(0.875rem,0.96vw,1rem)] leading-relaxed text-gray-300 ${bodyFontClass} [text-align:justify]`}
                    data-cms-field={item.cmsItemId ? pageContentItemFieldKey("lawFirmAwards", item.cmsItemId, "description") : undefined}
                  >
                    {renderNormalAmpersands(language === "zh" ? item.detailsZh : item.detailsEn)}
                  </p>
                </motion.article>
              ))}
            </motion.div>

            <div className="mt-10 flex justify-center">
              <button
                ref={lawFirmButtonRef}
                type="button"
                onClick={() =>
                  toggleExpandedSection(showAllLawFirmItems, setShowAllLawFirmItems, lawFirmButtonRef)
                }
                className="inline-flex items-center border-b-2 border-[#2d5f4f] pb-1 font-['Akshar'] text-[1.125rem] font-semibold tracking-tight text-white transition-colors duration-300 hover:border-[#d9b27a] hover:text-[#d9b27a]"
              >
                {renderNormalAmpersands(showAllLawFirmItems ? lawFirmAwardsViewLessLabel : lawFirmAwardsViewMoreLabel)}
              </button>
            </div>
          </section>
          <section id="schedule" className="scroll-mt-32 p-5 md:p-8 lg:p-10">
            <div className="mb-10 lg:mb-14">
              <div className="flex flex-col items-start gap-6 text-left">
                <h2
                  className={`${headingFontClass} text-[clamp(1.84rem,3.28vw,3.84rem)] font-bold  leading-[0.96] tracking-[-0.04em] text-[#D9B27A]`}
                  data-cms-field="socialAwards__title"
                >
                  {renderTitleAmpersands(socialAwardsTitle)}
                </h2>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mx-auto w-full max-w-[106.25rem]"
            >
              <SocialMediaAwardsCarousel
                bodyClassName={bodyFontClass}
                headingClassName={headingFontClass}
                items={allSocialMediaAwardItems}
                language={language as Language}
                subtitle={socialAwardsSubtitle}
                viewMoreLabel={socialAwardsViewMoreLabel}
              />
            </motion.div>
          </section>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}

