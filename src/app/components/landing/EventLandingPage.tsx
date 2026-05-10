"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { usePublicCmsData } from "../../contexts/PublicCmsDataContext";
import { renderNormalAmpersands, renderTitleAmpersands } from "../renderNormalAmpersands";
import { LandingFooter } from "./LandingFooter";
import { LandingHeader } from "./LandingHeader";
import { LandingSharedHero } from "./LandingSharedHero";
import { ScheduleCarouselSection } from "./ScheduleCarouselSection";
import { imageSrc } from "./shared";
import {
  getPageContentField,
  getPageContentItemField,
  getPageContentLines,
  getPageContentSectionItems,
  getPastEventPlatformNumbersFromFields,
  getPastEventProgramNumbersFromFields,
  pageContentItemFieldKey,
} from "@/lib/cms-page-content";

const FONT = "'Akshar', sans-serif";
const GRADIENT = "linear-gradient(120deg, #D4C254 0%, #6B8E4E 100%)";
const PAST_EVENTS_DESKTOP_VERTICAL_OFFSET = "2.5rem";
const eventHeroImageSrcDefault = imageSrc("/uploads/cms-pages/source/event.png");
const schedulePosterSrc = imageSrc("/uploads/cms-pages/source/Schedule.jpg");
const schedulePoster1Src = imageSrc("/uploads/cms-pages/source/Schedule1.jpg");
const schedulePoster2Src = imageSrc("/uploads/cms-pages/source/Schedule2.png");
const scheduleIconSrc = imageSrc("/uploads/cms-pages/source/Scheduleicon.png");
const scheduleIcon2Src = imageSrc("/uploads/cms-pages/source/Scheduleicon2.png");
const scheduleIcon3Src = imageSrc("/uploads/cms-pages/source/Scheduleicon3.png");
const eventDateLogo1Src = imageSrc("/uploads/cms-pages/source/eventdatelogo1.png");
const eventDateLogo2Src = imageSrc("/uploads/cms-pages/source/eventdatelogo2.png");
const eventDateLogo3Src = imageSrc("/uploads/cms-pages/source/eventdatelogo3.png");
const eventDateLogo4Src = imageSrc("/uploads/cms-pages/source/eventdatelogo4.png");

const SCHEDULE_CARDS = [
  {
    id: 0,
    image: schedulePosterSrc,
    date: "2025.09.27",
    time: "2025.09.27",
    title: {
      en: "Recording for Variety Show The Boss Doesn't Know Me · Podcast Special",
      zh: "《老板不知道的我·专业分享》综艺录制",
    },
    location: {
      en: "Podcast Special Recording",
      zh: "专业分享录制",
    },
    type: {
      en: "Featured Program",
      zh: "特别活动",
    },
  },
  {
    id: 1,
    image: schedulePoster1Src,
    date: "2025.10.23",
    time: "2025.10.23",
    title: {
      en: "This Is an Art: Decoding Practical Skills of Mainland Practitioners in Litigation and Arbitration",
      zh: "这是一门艺术：解码内地诉讼仲裁律师的实战技巧",
    },
    location: {
      en: "HKU Faculty of Law",
      zh: "香港大学法学院",
    },
    type: {
      en: "Law & Practice Talk",
      zh: "法律实务讲座",
    },
  },
  {
    id: 2,
    image: schedulePoster2Src,
    date: "2024.07.13",
    time: "2024.07.13",
    title: {
      en: "2024 Legal Professional Story Conference",
      zh: "2024法律人故事大会",
    },
    location: {
      en: "Legal Story Conference",
      zh: "法律人故事大会",
    },
    type: {
      en: "Conference Event",
      zh: "大会活动",
    },
  },
] as const;

const FEATURE_IMAGES = [
  imageSrc("/uploads/cms-pages/source/eventDate1.png"),
  imageSrc("/uploads/cms-pages/source/eventDate2.png"),
  imageSrc("/uploads/cms-pages/source/eventDate3.png"),
  imageSrc("/uploads/cms-pages/source/eventDate4.jpg"),
  imageSrc("/uploads/cms-pages/source/eventdate/eventDate5.jpeg"),
  imageSrc("/uploads/cms-pages/source/eventdate/event6.jpeg"),
  imageSrc("/uploads/cms-pages/source/eventdate/event7.jpeg"),
  imageSrc("/uploads/cms-pages/source/eventdate/event8.jpeg"),
  imageSrc("/uploads/cms-pages/source/eventdate/event9.jpeg"),
];

type EventLinkItem = {
  href?: string;
  label: {
    en: string;
    zh: string;
  };
};

type EventPlatformGroup = {
  logo: string;
  layout?: "stack" | "row";
  name: {
    en: string;
    zh: string;
  };
  links: EventLinkItem[];
};

type EventFeatureItem =
  | {
      variant: "past-event-detail";
      cmsItemId?: string;
      tag: string;
      date: {
        en: string;
        zh: string;
      };
      title: {
        en: string;
        zh: string;
      };
      paragraphs: {
        en: string[];
        zh: string[];
      };
      platforms: EventPlatformGroup[];
    }
  | {
      variant?: "standard";
      cmsItemId?: string;
      tag: string;
      title: string;
      desc: string;
      cta: string;
    };

const FEATURE_ITEMS: EventFeatureItem[] = [
  {
    variant: "past-event-detail",
    tag: "Variety Show / Podcast Special",
    date: {
      en: "Date: September 27, 2025",
      zh: "日期：2025年9月27日",
    },
    title: {
      en: "Recording for Variety Show The Boss Doesn't Know Me · Podcast Special",
      zh: "《老板不知道的我·专业分享》综艺录制",
    },
    paragraphs: {
      en: [
        'The Boss Doesn’t Know Me: Old Friends Season 2, produced by BOSS Zhipin, is a workplace documentary series focusing on entrepreneurship, professional relationships, and career growth. Invited as a guest for its Podcast Special, Tiger Partners joined fellow guests in discussions on "emotion and reason in the workplace", sharing thoughtful insights on conflict, trust, and personal growth through stories from guests and audience submissions.',
      ],
      zh: [
        "《老板不知道的我・老友季2》是由 BOSS 直聘出品的职场纪实观察节目，聚焦合作创业、职场关系与职业成长。作为专业分享受邀嘉宾，虎诉与多位嘉宾围绕“职场关系中的情与理”参与对谈，结合嘉宾故事与观众投稿，就冲突、默契与成长等话题分享了真诚而有见地的观察与思考。",
      ],
    },
    platforms: [
      {
        logo: eventDateLogo1Src,
        name: {
          en: "Tencent Video",
          zh: "腾讯视频",
        },
        links: [
          {
            href: "https://v.qq.com/x/cover/mzc00200rtspg8d/p41012g4fm3.html",
            label: {
              en: "The Boss Doesn’t Know Me - Episode 4 Part 1",
              zh: "《老板不知道的我》-第4期上集",
            },
          },
          {
            href: "https://v.qq.com/x/cover/mzc00200rtspg8d/c4101f2sqib.html",
            label: {
              en: "The Boss Doesn’t Know Me - Episode 4 Part 2",
              zh: "《老板不知道的我》-第4期下集",
            },
          },
          {
            href: "https://v.qq.com/x/cover/mzc00200rtspg8d/r4101wiivba.html",
            label: {
              en: "The Boss Doesn’t Know Me - Episode 8",
              zh: "《老板不知道的我》-第8期",
            },
          },
        ],
      },
      {
        logo: eventDateLogo2Src,
        name: {
          en: "Youku Video",
          zh: "优酷视频",
        },
        links: [
          {
            href: "https://v.youku.com/v_show/id_XNjQ5OTY0NDgyMA==.html",
            label: {
              en: "The Boss Doesn’t Know Me - Episode 4 Part 1",
              zh: "《老板不知道的我》-第4期上集",
            },
          },
          {
            href: "https://v.youku.com/v_show/id_XNjUwMzAzNTYzNg==.html",
            label: {
              en: "The Boss Doesn’t Know Me - Episode 8 Part 2",
              zh: "《老板不知道的我》-第8期下集",
            },
          },
          {
            href: "https://v.youku.com/v_show/id_XNjUwODAxNzA2MA==.html",
            label: {
              en: "The Boss Doesn’t Know Me - Episode 8",
              zh: "《老板不知道的我》-第8期",
            },
          },
        ],
      },
      {
        logo: eventDateLogo3Src,
        name: {
          en: "Douyin Video",
          zh: "抖音视频",
        },
        links: [
          {
            href: "https://www.douyin.com/video/7585458307876293934",
            label: {
              en: "《Wealth Course 1》 - Where Does One’s First Pot of Gold Come From?",
              zh: "《老板不知道的我·财富课》-第一桶金来自于？",
            },
          },
          {
            href: "https://www.douyin.com/video/7585465465460362547",
            label: {
              en: "《Wealth Course 2》 - Are There Still Opportunities to Make Big Money Nowadays?",
              zh: "《老板不知道的我·财富课》-现在还有赚大钱的机会吗？",
            },
          },
          {
            href: "https://www.douyin.com/video/7585475165916532006",
            label: {
              en: "《Wealth Course 3》 - What Kind of Employees Are Most Worth Investing In?",
              zh: "《老板不知道的我·财富课》-什么样的员工最值得被投资？",
            },
          },
        ],
      },
    ],
  },
  {
    variant: "past-event-detail",
    tag: "Conference / Guest Sharing",
    date: {
      en: "Date: November 28, 2025",
      zh: "日期：2025 年 11 月 28 日",
    },
    title: {
      en: "Beijing International Audiovisual Conference",
      zh: "北京国际视听大会",
    },
    paragraphs: {
      en: [
        "On November 28, 2025, Tiger Partners, as a leading legal content creator on Bilibili, was invited to speak at the 2025 Beijing International Audiovisual Conference · New Mass Literature & Art Ecosystem Forum, hosted by the Beijing Radio and Television Bureau and the Administrative Committee of Beijing Economic-Technological Development Area.",
        "In his talk, “Breaking Barriers with Long-form Videos,” he drew on his legal content practice to discuss the rising demand for in-depth knowledge amid content saturation. He highlighted Bilibili’s role in advancing long-form knowledge videos that connect professional fields with the public, and emphasized the importance of shifting from traffic-driven creation to building dedicated audiences through high-quality content.",
      ],
      zh: [
        "2025年11月28日，虎诉作为B站法律垂类头部创作者，受邀出席由北京市广播电视局、北京经济技术开发区管委会主办的2025北京国际视听大会·新大众文艺生态论坛并发表专题分享。",
        "他以“长视频破局”为主题，结合自身法律内容创作实践，分享了对深度知识需求增长、知识长视频价值以及内容创作方向转变的观察，强调应以高质量内容连接专业领域与公众，推动更具深度与影响力的知识传播。",
      ],
    },
    platforms: [],
  },
  {
    variant: "past-event-detail",
    tag: "HKU Law / Practice Talk",
    date: {
      en: "Date: 23 October 2025",
      zh: "日期：2025 年 10 月 23 日",
    },
    title: {
      en: "Law & Practice talk at HKU Law",
      zh: "香港大学法学院法律实务讲座",
    },
    paragraphs: {
      en: [
        "On 23 October 2025, Tiger Partners was invited to speak at the CCL Talk hosted by the Faculty of Law, The University of Hong Kong, delivering a lecture titled This Is an Art: Decoding the Practical Skills of Mainland Practitioners in Litigation and Arbitration. The session was moderated by Dr. Ying Xia, Assistant Professor at HKU Faculty of Law and Director of the Philip K. Wong Centre for Chinese Law. It focused on the institutional and practical differences between Mainland China and Hong Kong, including heavy caseloads, tight hearing schedules, reliance on documentary evidence, and limited witness examination.",
        "Centering on the challenge of persuading adjudicators within limited time, Tiger Partners presented a systematic framework of litigation and arbitration practice. He outlined key strategies across the full process, including pre-hearing preparation and evidence organization, concise and focused courtroom advocacy, and post-hearing refinement of submissions and follow-up communication.",
        "Theme: This Is an Art: Decoding Practical Skills of Mainland Practitioners in Litigation and Arbitration",
      ],
      zh: [
        "2025年10月23日，虎诉受邀做客香港大学法学院CCL Talk，主讲《这是一门艺术：解码内地诉讼仲裁律师的实战技巧》。本次讲座由香港大学法学院助理教授、黄乾亨中国法研究中心主任夏颖主持，围绕内地与香港庭审制度及实务路径差异展开，重点介绍了内地法院案多人少、庭审节奏紧凑、书面证据占主导以及证人询问相对有限等特点。",
        "围绕“在有限时间内说服裁判者”这一核心问题，虎诉系统梳理了诉讼仲裁全流程实战方法，涵盖庭前准备与证据组织、庭上简洁聚焦的表达，以及庭后文书打磨与沟通跟进，完整呈现了内地律师的实务方法论。",
        "分享主题：这是一门艺术：解码内地诉讼仲裁律师的实战技巧",
      ],
    },
    platforms: [],
  },
  {
    variant: "past-event-detail",
    tag: "Bilibili Charging Creator Event",
    date: {
      en: "Date: May 10, 2025",
      zh: "日期：2025年5月10日",
    },
    title: {
      en: "Bilibili Charging Creator Offline Exchange Event",
      zh: "B站充电UP主交流日的线下活动",
    },
    paragraphs: {
      en: [
        "Tiger Partners was invited to Wuzhen to attend the 2025 Bilibili Charging Creator Exchange Day, and was selected as one of only three guest speakers on stage. At the event, Tiger Partners communicated face-to-face with high-quality creators and platform partners from across the country. He shared the complete development journey and practical experience of Tiger Partners Insights — starting as a niche legal program, adhering to professional long-form content creation, focusing on content value, and growing into a leading legal video podcast. He also conducted in-depth discussions on content production, fan operation, platform ecosystem and long-term value, enabling mutual inspiration and joint progress among all participants.",
        "Theme: When Long-Form Content Meets Professionalism: A Charging Experiment of a Legal Video Podcast",
      ],
      zh: [
        "虎诉（@虎诉）受邀前往乌镇，参与2025 B 站充电 UP 主交流日活动，并有幸作为全场三位分享嘉宾之一登台发言。虎诉在现场与来自全国各地的优质创作者、平台伙伴面对面交流，完整分享了《Tiger Partners Insights》从法律垂类起步、坚持专业长视频创作、深耕内容价值、成长为头部法律专业观察的创作历程与实战心得，也围绕内容创作、粉丝运营、平台生态与长期价值展开深度探讨，在交流中互相启发、共同成长。",
        "主题：当长视频遇上专业主义：一档法律专业观察的充电试验",
      ],
    },
    platforms: [
      {
        logo: eventDateLogo4Src,
        name: {
          en: "Bilibili Video",
          zh: "bilibili 视频",
        },
        links: [
          {
            label: {
              en: "A Pleasant Business Trip - Wuzhen \"Charging\" Journey!",
              zh: "快乐出差 - 乌镇充电之旅！",
            },
          },
          {
            label: {
              en: "Charging: Building a Positive Cycle Between Creators and Audiences",
              zh: "充电构建创作者与观众的正向循环",
            },
          },
        ],
      },
    ],
  },
  {
    variant: "past-event-detail",
    tag: "Legal Professional Story Conference",
    date: {
      en: "Date: 13 July 2024",
      zh: "日期：2024年7月13日",
    },
    title: {
      en: "2024 Legal Professional Story Conference",
      zh: "2024法律人故事大会",
    },
    paragraphs: {
      en: [
        "On 13 July 2024, the 2024 Legal Professional Story Conference was held, themed “The Life I Want.” Hosted by Fatianshi and co-hosted by Jincheng Tongda Law Firm and Shihui Law Firm, the event attracted over 230 offline attendees and 13,678 online participants. Speakers included legendary law firm founders, best-selling legal authors, and cross-industry influencers.",
        "Among them, Tiger Partners gave a talk titled “Running a ‘Small Workshop’ Is Great.” He shared his struggles and growth from student days to early practice, expressing his commitment to professional purity: focusing on cases, embracing long-termism, and valuing longevity over scale. Tiger Partners was voted “Second Place Storyteller” based on live sound-wave voting.",
      ],
      zh: [
        "2024年7月13日，2024法律人故事大会圆满举行。本次活动由法天使主办，金诚同达律师事务所、世辉律师事务所联合主办，主题为「我想要的生活」。线下230余位观众与线上13678位网友共同参与。大会汇聚了律师界传奇创始人、法律畅销书作者、跨界法律大V等行业代表，分享真实经历与人生感悟。",
        "其中，虎诉以「开个‘小作坊’也挺好」为主题，讲述了自己从求学成长到执业初期的挫折与蜕变，表达了对专业纯粹性的坚守: 专注办案、深耕专业、长期主义，不求最大，但求最久。经现场音浪统计，虎诉获评「故事二大王」。",
      ],
    },
    platforms: [],
  },
  {
    variant: "past-event-detail",
    tag: "PKU Law Alumni Event",
    date: {
      en: "Date: October 15, 2025",
      zh: "日期：2025年10月15日",
    },
    title: {
      en: "PKU Law School Alumnus Interview and Exchange Event",
      zh: "北京大学法学院校友专访交流活动",
    },
    paragraphs: {
      en: [
        "On 15 October 2025, Tiger Partners was invited back to Peking University Law School for an alumni interview and exchange event hosted by the Law School Alumni Association. Under the theme “Aspire to Law, Innovate through Media,” Tiger Partners shared how to uphold professional legal integrity while using new media to break down knowledge barriers and bring legal services to the public. Drawing on his 16 years of legal practice and self-media experience, he discussed his school days, career choices, dispute resolution, legal content creation, and long-form video communication. He offered law students practical insights into career planning, cross-disciplinary growth, and personal value realization.",
      ],
      zh: [
        "2025年10月15日，虎诉受邀回到北京大学法学院，参加由法学院校友会主办的校友专访交流活动，与在校师弟师妹面对面深度对话。本次活动以「以法为志，媒体拓新」为主题。虎诉团队结合自身16年法律实务经验与自媒体创作实践，分享如何在坚守专业法律初心的同时，借助新媒体平台打破知识壁垒，让专业法律服务走向大众。他从求学时光、职业选择、争议解决实务，到法律内容创作、长视频传播与公众普法等多个维度展开交流，为法科学子提供了职业规划、跨界成长与价值实现的真实经验与启发。",
      ],
    },
    platforms: [],
  },
  {
    variant: "past-event-detail",
    tag: "Tiger Partners Scholarship",
    date: {
      en: "Date: 16 June 2022",
      zh: "日期：2022年6月16日",
    },
    title: {
      en: "2022 Tiger Partners Scholarship for Dispute Resolution Talent",
      zh: "2022虎行风从奖学金",
    },
    paragraphs: {
      en: [
        "Established by Tiger Partners, the Tiger Partners Scholarship for Dispute Resolution Talent (\"Huxing Fengcong Scholarship\") is designed to identify and support outstanding law students with strong potential in dispute resolution. More than a conventional scholarship, the program emphasizes long-term guidance, professional development, and practical exposure. In addition to financial support, recipients are offered valuable opportunities to engage directly with the firm's partners and receive mentorship from experienced practitioners. Outstanding awardees may also be invited to intern at the firm, gaining first-hand insight into the daily practice of dispute resolution lawyers. In 2022, the scholarship received 34 applications. Following a two-stage selection process consisting of written review and interviews, the committee selected three recipients.",
      ],
      zh: [
        "“虎行风从奖学金”由北京虎诉律师事务所设立，旨在发掘并支持在争议解决领域具有潜力的优秀法律学子，帮助他们拓展专业视野、深化实践认知，并在学习与成长中释放潜能。不同于传统以资助为主的奖学金项目，该奖学金更强调对青年法律人才的引导与培养。获奖者不仅可获得现金奖励，还可与虎诉合伙人进行深入交流，接受资深律师的专业指导；表现优异者更有机会进入律所实习，沉浸式了解争议解决律师的实际工作。2022年度奖学金共收到34份申请。经材料审查与面试两轮评选，评审委员会最终选出三位获奖者。",
      ],
    },
    platforms: [],
  },
  {
    variant: "past-event-detail",
    tag: "Rednote Talk Salon",
    date: {
      en: "Date: 6 September 2025",
      zh: "日期：2025年9月6日",
    },
    title: {
      en: "Rednote “Talk Show Week” Healing Offline Talk Salon",
      zh: "小红书「脱口秀周」笑愈企划线下 TALK 沙龙局",
    },
    paragraphs: {
      en: [
        "On 6 September 2025, Tiger Partners was invited to participate in Rednote’s “Talk Show Week” Healing Talk Salon in Shanghai as a featured guest speaker. Centered on the theme of “tearing off disguises and labels,” the event explored authentic self-expression and emotional reconciliation amid the pressures of urban life. During the session, Tiger Partners shared reflections on his personal growth, everyday observations, and lived experiences in a relaxed yet candid manner. Although not a professional stand-up comedian, he engaged the audience through compelling and sincere storytelling, encouraging a dialogue on how to move beyond externally imposed roles and rediscover a more genuine and unburdened self. Warm and humorous in tone, the salon created a space for participants to release stress and connect through open, honest conversation.",
      ],
      zh: [
        "2025年9月6日，虎诉(@虎诉)受邀以小红书特邀分享官身份，参与小红书「脱口秀周」笑愈企划线下TALK沙龙上海专场。本次活动以“撕掉伪装和标签”为主题，聚焦都市人在高压生活中的真实表达与自我和解。活动现场，虎诉围绕成长经历、生活观察与个人感受，进行了轻松真诚的分享。虽然并非职业脱口秀演员，他仍以富有感染力的表达方式，与现场观众共同探讨如何卸下外界赋予的角色束缚，找回更真实、更松弛的自我。整场沙龙氛围温暖幽默，也为参与者提供了一个释放压力、坦诚交流的空间。",
      ],
    },
    platforms: [],
  },
  {
    variant: "past-event-detail",
    tag: "Cross-Strait Youth Forum",
    date: {
      en: "Date: 19 July 2021",
      zh: "日期：2021年7月19日",
    },
    title: {
      en: "The 29th Cross-Strait Youth Forum on Perspectives",
      zh: "第29次两岸青年观点论坛",
    },
    paragraphs: {
      en: [
        'On 19 July 2021, the 29th Cross-Strait Youth Forum on Perspectives was held in Beijing, hosted by the Central Committee of the Revolutionary Committee of the Chinese Kuomintang. Under the theme “Hearts Across the Straits · Legal Voices with Sincerity,” the forum brought together young legal professionals from both sides of the Taiwan Strait to discuss legal issues related to professional development and cross-strait exchange. Tiger Partners, as the managing partner of Tiger Partners, and Liao Mengcheng, as the senior consultant of the firm, were invited to attend.',
        "During the forum, Tiger Partners expressed his sincere hope that young professionals on both sides would strengthen exchanges and communication in the legal field, jointly explore new paths for integrated development across the Taiwan Strait, and promote integration through connectivity, benefits and mutual affection, so as to build a promising future for young people from both sides.",
      ],
      zh: [
        "2021年7月19日，第29次两岸青年观点论坛在北京举行。本次论坛由民革中央主办，以“心跨两岸·法悦心声”为主题，聚焦两岸青年法律从业者在行业发展与两岸交流中的法律议题。北京虎诉律师事务所管理合伙人虎诉、高级顾问廖孟誠律师受邀参加本次论坛。",
        "论坛期间，虎诉表示，衷心希望广大青年朋友在法律领域多交流多沟通，共同探索海峡两岸融合发展新路，努力做到“以通促融”、“以惠促融”、“以情促融”，共同创造属于两岸青年的美好未来。",
      ],
    },
    platforms: [],
  },
];
const EVENT_FEATURE_ITEMS = FEATURE_ITEMS;

function EventRecognitionCarousel() {
  const { language } = useLanguage();
  const { pageContent } = usePublicCmsData();
  const isZh = language === "zh";
  const title = getPageContentField(pageContent, language, "event", "schedule", "title", isZh ? "日程轮播" : "Schedule Carousel");
  const description = getPageContentField(
    pageContent,
    language,
    "event",
    "schedule",
    "description",
    isZh ? "近期活动安排与重要日程" : "Upcoming event schedules and important dates",
  );
  const scheduleItems = getPageContentSectionItems(pageContent, language, "event", "schedule");
  const liveButtonLabel = getPageContentField(
    pageContent,
    language,
    "event",
    "schedule",
    "viewLiveLabel",
    isZh ? "观看视频" : "View Live",
  );
  const items = (scheduleItems.length > 0 ? scheduleItems : SCHEDULE_CARDS).map((item, index) => {
    if ("fields" in item) {
      return {
        buttonLabel: isZh ? "查看详情" : "View Details",
        cmsFields: {
          buttonLabel: "schedule__viewLiveLabel",
          href: pageContentItemFieldKey("schedule", item.id, "href"),
          image: pageContentItemFieldKey("schedule", item.id, "image"),
          metaLeft: pageContentItemFieldKey("schedule", item.id, "date"),
          metaRight: pageContentItemFieldKey("schedule", item.id, "tag"),
          title: pageContentItemFieldKey("schedule", item.id, "title"),
        },
        href: getPageContentItemField(item, "href"),
        id: item.id,
        image: getPageContentItemField(item, "image", SCHEDULE_CARDS[index]?.image ?? SCHEDULE_CARDS[0].image),
        metaLeft: getPageContentItemField(item, "time", getPageContentItemField(item, "date")),
        metaRight: getPageContentItemField(item, "tag", getPageContentItemField(item, "location")),
        title: getPageContentItemField(item, "title"),
      };
    }

    return {
      buttonLabel: isZh ? "查看详情" : "View Details",
      cmsFields: {
        buttonLabel: "schedule__viewLiveLabel",
      },
      id: item.id,
      image: item.image,
      metaLeft: item.date,
      metaRight: isZh ? item.type.zh : item.type.en,
      title: isZh ? item.title.zh : item.title.en,
    };
  });
  const liveItems = items.map((item) => ({
    ...item,
    buttonLabel: isZh ? "观看视频" : "View Live",
  }));

  return (
    <ScheduleCarouselSection
      imageFit="contain"
      items={items.map((item) => ({ ...item, buttonLabel: liveButtonLabel }))}
      theme="homeProgram"
      title={title}
      description={description}
      titleCmsField="schedule__title"
      descriptionCmsField="schedule__description"
      titleIsEnglish={!isZh}
    />
  );

  const headingFontClass = "font-['Akshar']";
  const bodyFontClass = "font-['Abel']";
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % SCHEDULE_CARDS.length);
  const handlePrev = () =>
    setCurrentIndex((prev) => (prev - 1 + SCHEDULE_CARDS.length) % SCHEDULE_CARDS.length);

  const getCardProps = (index: number) => {
    let diff = index - currentIndex;
    if (diff === 2) diff = -1;
    if (diff === -2) diff = 1;

    const isCenter = diff === 0;
    const isLeft = diff === -1;
    const isRight = diff === 1;

    let x = "0%";
    let scale = 1;
    let rotateY = 0;
    let opacity = 1;
    let zIndex = 30;
    let translateZ = 0;

    if (isLeft) {
      x = "-62%";
      scale = 0.78;
      rotateY = 18;
      opacity = 0.32;
      zIndex = 20;
      translateZ = -80;
    } else if (isRight) {
      x = "62%";
      scale = 0.78;
      rotateY = -18;
      opacity = 0.32;
      zIndex = 20;
      translateZ = -80;
    } else {
      translateZ = 40;
    }

    return { x, scale, rotateY, opacity, zIndex, translateZ, isCenter, isLeft, isRight };
  };

  return (
    <section className="relative overflow-hidden bg-black py-24 lg:py-36" style={{ fontFamily: FONT }}>
      <div className="mx-auto max-w-[90rem] px-[var(--landing-shell-8)]">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-14 flex max-w-4xl flex-col items-center text-center lg:mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className={`${headingFontClass} text-[clamp(2rem,4.4vw,4rem)] font-bold leading-[1] tracking-[-0.03em] text-[#d9b27a] ${isZh ? "" : ""}`}
          >
            {isZh ? "日程轮播" : "Schedule Carousel"}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18, duration: 0.7, ease: "easeOut" }}
            className={`${bodyFontClass} mt-5 max-w-[42rem] text-[clamp(1rem,1.18vw,1.14rem)] leading-[1.72] text-[rgba(255,255,255,0.72)]`}
          >
            {isZh
              ? "近期活动安排与重要日程"
              : "Upconming event schedules and important dates"}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="mx-auto flex w-full max-w-5xl flex-col items-center"
            style={{
              transform: "scale(var(--landing-event-carousel-scale))",
              transformOrigin: "center top",
            }}
          >
            <div
              className="relative flex w-full items-center justify-center"
              style={{
                perspective: "1800px",
                minHeight: "calc(var(--landing-carousel-stage-height) * 0.8)",
              }}
            >
              {SCHEDULE_CARDS.map((item, index) => {
                const { x, scale, rotateY, opacity, zIndex, translateZ, isCenter, isLeft, isRight } =
                  getCardProps(index);

                return (
                  <motion.div
                    key={item.id}
                    animate={{ x, scale, rotateY, opacity, zIndex, translateZ }}
                    whileHover={!isCenter ? { opacity: 0.72, scale: scale * 1.03 } : { scale: scale * 1.015 }}
                    transition={{
                      duration: 0.65,
                      type: "spring",
                      bounce: 0.08,
                      damping: 22,
                      stiffness: 120,
                    }}
                    className="absolute flex w-full cursor-pointer flex-col"
                    style={{
                      maxWidth: "28.75rem",
                      minHeight: "calc(var(--landing-carousel-card-min-height) * 0.8)",
                      borderRadius: "24px",
                      background: isCenter ? "#111A13" : "#0E1510",
                      border: isCenter
                        ? "1px solid rgba(255,255,255,0.10)"
                        : "1px solid rgba(255,255,255,0.06)",
                      padding: "18px",
                      transformStyle: "preserve-3d",
                      boxShadow: isCenter
                        ? "0 -12px 48px rgba(217,178,122,0.14), 0 28px 60px rgba(0,0,0,0.6)"
                        : "0 20px 48px rgba(0,0,0,0.55)",
                    }}
                    onClick={() => {
                      if (isLeft) handlePrev();
                      if (isRight) handleNext();
                    }}
                  >
                    {isCenter && (
                      <div
                        className="absolute left-0 right-0 top-0 rounded-t-[24px]"
                        style={{
                          height: "1.5px",
                          background:
                            "linear-gradient(90deg, transparent 0%, #D9B27A 35%, #E8C97A 50%, #D9B27A 65%, transparent 100%)",
                          opacity: 0.95,
                          boxShadow: "0 0 14px rgba(217,178,122,0.45)",
                        }}
                      />
                    )}

                    <div
                      className="pointer-events-none absolute inset-0 rounded-[24px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ background: "rgba(255,255,255,0.03)" }}
                    />

                    <div className="flex h-full flex-col p-[18px]">
                      <div className="aspect-[16/10] overflow-hidden rounded-[16px] border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
                        <img
                          src={item.image}
                          alt={isZh ? item.title.zh : item.title.en}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover"
                        />
                      </div>

                    <p
                      className={`${headingFontClass} mt-5 text-white ${isZh ? "" : ""}`}
                      style={{
                        fontSize: "var(--landing-type-card-title)",
                        fontWeight: 600,
                        lineHeight: 1.08,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {isZh ? item.title.zh : item.title.en}
                    </p>

                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 text-[#D9B27A]">
                        <img src={scheduleIconSrc} alt="" aria-hidden="true" className="h-4 w-4 object-contain opacity-90" />
                        <span className={`${bodyFontClass} text-[0.98rem] leading-none text-[#D9B27A]`}>
                          {item.date}
                        </span>
                      </div>

                      <div className="flex items-center justify-end gap-2">
                        <img src={scheduleIcon2Src} alt="" aria-hidden="true" className="h-4 w-4 object-contain opacity-85" />
                        <span
                          className={`${bodyFontClass} rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-3 py-[6px] text-[0.78rem] leading-none text-[rgba(255,255,255,0.56)]`}
                        >
                          {isZh ? item.type.zh : item.type.en}
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 h-px w-full bg-[rgba(255,255,255,0.08)]" />

                    <button
                      type="button"
                      className="mt-auto flex h-[44px] w-full items-center justify-center gap-2 rounded-full border border-[#D9B27A]/25 bg-[linear-gradient(90deg,#E6C48A_0%,#DDA321_100%)] text-[#2B2416]"
                    >
                      <img src={scheduleIcon3Src} alt="" aria-hidden="true" className="h-4 w-4 object-contain" />
                      <span className={`${bodyFontClass} text-[0.92rem] font-semibold`}>
                        {isZh ? "查看详情" : "View Details"}
                      </span>
                    </button>

                    {false && (<>
                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <span className="mb-[5px] block text-[10px] font-semibold  tracking-[0.22em] text-[#D9B27A]">
                        {isZh ? "地点" : "Location"}
                      </span>
                      <p className={`${bodyFontClass} text-[14px] text-[rgba(255,255,255,0.55)]`}>
                        {isZh ? item.location.zh : item.location.en}
                      </p>
                    </div>

                    <div
                      className="mt-auto flex items-center justify-between pt-5"
                      style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      <span className="text-[10px]  tracking-[0.2em] text-[rgba(255,255,255,0.18)]">
                        {isZh ? "重要节点" : "Key Date"}
                      </span>
                      <span className={`${bodyFontClass} ml-auto text-[12px] text-[rgba(255,255,255,0.56)]`}>
                        {item.date} / {item.time}
                      </span>
                    </div>
                    </>)}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-14 flex items-center justify-center gap-10">
              <motion.button
                whileHover={{ scale: 1.08, borderColor: "rgba(217,178,122,0.5)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrev}
                className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-[rgba(255,255,255,0.10)] bg-[#142016] text-[rgba(255,255,255,0.45)]"
              >
                <ChevronLeft size={24} />
              </motion.button>

              <div className="flex items-center gap-3">
                {SCHEDULE_CARDS.map((_, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    animate={{
                      width: currentIndex === idx ? 32 : 8,
                      background: currentIndex === idx ? "#D9B27A" : "rgba(255,255,255,0.18)",
                    }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="h-2 rounded-[4px] border-none p-0"
                    style={{
                      boxShadow: currentIndex === idx ? "0 0 10px rgba(217,178,122,0.55)" : "none",
                    }}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.08, borderColor: "rgba(217,178,122,0.5)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-[rgba(255,255,255,0.10)] bg-[#142016] text-[rgba(255,255,255,0.45)]"
              >
                <ChevronRight size={24} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function EventFeatureBlock({
  feature,
  index,
  active,
  isZh,
  bodyFontClass,
}: {
  feature: EventFeatureItem;
  index: number;
  active: boolean;
  isZh: boolean;
  bodyFontClass: string;
}) {
  if (feature.variant === "past-event-detail") {
    const isFirstPlatformFeature = feature.tag === "Variety Show / Podcast Special";
    const isLastBilibiliFeature = feature.tag === "Bilibili Charging Creator Event";
    const platformGridClassName =
      isFirstPlatformFeature
        ? "mt-10 grid gap-6 xl:[grid-template-columns:31fr_31fr_38fr]"
        : isLastBilibiliFeature
          ? "mt-10 grid gap-6 xl:grid-cols-1 xl:justify-items-start"
          : feature.platforms.length === 1
            ? "mt-10 grid gap-6 xl:grid-cols-1"
            : "mt-10 grid gap-6 xl:grid-cols-3";
    const platformSectionClassName = isLastBilibiliFeature
      ? "w-full max-w-[22.5rem] space-y-4"
      : isFirstPlatformFeature
        ? "w-full min-w-0 space-y-4"
        : "w-full space-y-4";
    const platformCardBaseClassName = isFirstPlatformFeature
      ? "rounded-[0.75rem] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.02)] px-[0.6rem] py-[0.45rem]"
      : "rounded-[0.75rem] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.02)] px-4 py-3";
    const platformCardClassName = isLastBilibiliFeature
      ? `inline-flex w-fit max-w-full ${platformCardBaseClassName}`
      : isFirstPlatformFeature
        ? `block w-full ${platformCardBaseClassName}`
      : `block ${platformCardBaseClassName}`;
    const platformLinkCardClassName = isFirstPlatformFeature
      ? `${platformCardClassName} transition-colors hover:border-[#d9b27a]/65 hover:bg-[rgba(217,178,122,0.06)]`
      : `${platformCardClassName} transition-colors hover:border-[#d9b27a]/65 hover:bg-[rgba(217,178,122,0.06)]`;
    const platformCardLabelClassName = isFirstPlatformFeature
      ? `${bodyFontClass} ${isLastBilibiliFeature ? "whitespace-nowrap" : "whitespace-pre-line"} text-[0.62rem] leading-[1.55] text-[#d9b27a]`
      : `${bodyFontClass} ${isLastBilibiliFeature ? "whitespace-nowrap" : "whitespace-pre-line"} text-[0.6875rem] leading-[1.55] text-[#d9b27a]`;

    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingRight: "2rem",
          paddingTop: "3rem",
          paddingBottom: "3rem",
          opacity: active ? 1 : 0.32,
          transform: active ? "translateY(0)" : "translateY(0.75rem)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
      >
        <div
          style={{
            transform: `translateY(${PAST_EVENTS_DESKTOP_VERTICAL_OFFSET})`,
          }}
        >
          <p
            className={`${bodyFontClass} text-[0.975rem] font-medium text-[#d9b27a]`}
            data-cms-field={feature.cmsItemId ? pageContentItemFieldKey("pastEvents", feature.cmsItemId, "date") : undefined}
          >
            {renderNormalAmpersands(isZh ? feature.date.zh : feature.date.en)}
          </p>

          <h3
            className={`mt-5 w-full max-w-full text-white ${isZh ? bodyFontClass : ""}`}
            style={{
              fontSize: "1.4375rem",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
            data-cms-field={feature.cmsItemId ? pageContentItemFieldKey("pastEvents", feature.cmsItemId, "title") : undefined}
          >
            {renderTitleAmpersands(isZh ? feature.title.zh : feature.title.en)}
          </h3>

          <div className="mt-6 h-[2px] rounded-full" style={{ backgroundImage: GRADIENT, width: "var(--landing-accent-line)" }} />

          <div className="mt-8 max-w-[45rem] space-y-4">
            {(isZh ? feature.paragraphs.zh : feature.paragraphs.en).map((paragraph) => (
              <p
                key={paragraph}
                className={`${bodyFontClass} text-[1.01rem] leading-[1.72] text-[rgba(255,255,255,0.72)] [text-align:justify]`}
                data-cms-field={feature.cmsItemId ? pageContentItemFieldKey("pastEvents", feature.cmsItemId, "description") : undefined}
              >
                {renderNormalAmpersands(paragraph)}
              </p>
            ))}
          </div>

          {feature.platforms.length > 0 ? (
            <div className={platformGridClassName}>
              {feature.platforms.map((platform, platformIndex) => (
                <div key={platform.name.en} className={platformSectionClassName}>
                  <div className="flex items-center gap-3">
                    <img
                      src={platform.logo}
                      alt={platform.name.en}
                      className="h-9 w-auto object-contain"
                      data-cms-field={pastEventCmsField(feature, `platform${platformIndex + 1}Logo`)}
                    />
                    <span
                      className={`${bodyFontClass} text-[0.90625rem] font-semibold text-white`}
                      data-cms-field={pastEventCmsField(feature, `platform${platformIndex + 1}Name`)}
                    >
                      {renderNormalAmpersands(isZh ? platform.name.zh : platform.name.en)}
                    </span>
                  </div>

                  <div className={isLastBilibiliFeature ? "flex flex-row items-start gap-3" : platform.layout === "row" ? "grid grid-cols-2 gap-3" : "space-y-3"}>
                    {platform.links.map((link, linkIndex) => (
                      link.href ? (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className={platformLinkCardClassName}
                          data-cms-field={pastEventCmsField(feature, `platform${platformIndex + 1}Link${linkIndex + 1}Href`)}
                        >
                          <span
                            className={platformCardLabelClassName}
                            data-cms-field={pastEventCmsField(feature, `platform${platformIndex + 1}Link${linkIndex + 1}Label`)}
                          >
                            {renderNormalAmpersands(isZh ? link.label.zh : link.label.en)}
                          </span>
                        </a>
                      ) : (
                        <div
                          key={link.label.en}
                          className={platformCardClassName}
                        >
                          <span
                            className={platformCardLabelClassName}
                            data-cms-field={pastEventCmsField(feature, `platform${platformIndex + 1}Link${linkIndex + 1}Label`)}
                          >
                            {renderNormalAmpersands(isZh ? link.label.zh : link.label.en)}
                          </span>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div
        style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingRight: "2rem",
        paddingTop: "3rem",
        paddingBottom: "3rem",
        opacity: active ? 1 : 0.32,
        transform: active ? "translateY(0)" : "translateY(0.75rem)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      <div
        style={{
          transform: `translateY(${PAST_EVENTS_DESKTOP_VERTICAL_OFFSET})`,
        }}
      >
        <span
          className="mb-5 inline-block text-[0.6875rem] font-semibold  tracking-[0.22em]"
          style={{
            background: GRADIENT,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {renderNormalAmpersands(`${String(index + 1).padStart(2, "0")} / ${feature.tag}`)}
        </span>

        <h3
          className="mb-6 whitespace-pre-line text-white"
          style={{
            fontSize: "42px",
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
          }}
          data-cms-field={feature.cmsItemId ? pageContentItemFieldKey("pastEvents", feature.cmsItemId, "title") : undefined}
        >
          {renderTitleAmpersands(feature.title)}
        </h3>

        <div className="mb-6 h-[2px] w-10 rounded-full" style={{ backgroundImage: GRADIENT }} />

        <p
          className="mb-9 max-w-[30rem] text-[1rem] leading-[1.75] text-[rgba(255,255,255,0.70)] [text-align:justify]"
          data-cms-field={feature.cmsItemId ? pageContentItemFieldKey("pastEvents", feature.cmsItemId, "description") : undefined}
        >
          {renderNormalAmpersands(feature.desc)}
        </p>

        <div>
          <button
            className="inline-flex items-center gap-2 rounded-[0.625rem] border border-[#3A3A3A] bg-black px-6 py-3 text-[0.9375rem] font-medium text-white transition-colors hover:border-[#6B8E4E] hover:bg-[#0d0d0d]"
          >
            {renderNormalAmpersands(feature.cta)}
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

function EventPastEventMobile({
  feature,
  isZh,
  bodyFontClass,
}: {
  feature: Extract<EventFeatureItem, { variant: "past-event-detail" }>;
  isZh: boolean;
  bodyFontClass: string;
}) {
  return (
    <article className="overflow-hidden rounded-[1.5rem] border border-[rgba(255,255,255,0.08)] bg-[#111814] p-7">
      <p className={`${bodyFontClass} text-[0.65rem] font-medium text-[#d9b27a]`}>
        {renderNormalAmpersands(isZh ? feature.date.zh : feature.date.en)}
      </p>

      <h3
        className={`mt-4 text-white ${isZh ? bodyFontClass : ""}`}
        style={{
          fontSize: "clamp(0.690625rem, 2.975vw, 1.009375rem)",
          fontWeight: 700,
          lineHeight: 1.08,
          letterSpacing: "-0.02em",
        }}
      >
        {renderTitleAmpersands(isZh ? feature.title.zh : feature.title.en)}
      </h3>

      <div className="mt-5 h-[2px] rounded-full" style={{ backgroundImage: GRADIENT, width: "var(--landing-accent-line)" }} />

      <div className="mt-6 space-y-4">
        {(isZh ? feature.paragraphs.zh : feature.paragraphs.en).map((paragraph) => (
          <p
            key={paragraph}
            className={`${bodyFontClass} text-[0.8rem] leading-[1.72] text-[rgba(255,255,255,0.7)] [text-align:justify]`}
          >
            {renderNormalAmpersands(paragraph)}
          </p>
        ))}
      </div>

      {feature.platforms.length > 0 ? (
        <div className="mt-8 space-y-5">
          {feature.platforms.map((platform, platformIndex) => (
            <div key={platform.name.en} className="space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={platform.logo}
                  alt={platform.name.en}
                  className="h-8 w-auto object-contain"
                  data-cms-field={pastEventCmsField(feature, `platform${platformIndex + 1}Logo`)}
                />
                <span
                  className={`${bodyFontClass} text-[0.833rem] font-semibold text-white`}
                  data-cms-field={pastEventCmsField(feature, `platform${platformIndex + 1}Name`)}
                >
                  {renderNormalAmpersands(isZh ? platform.name.zh : platform.name.en)}
                </span>
              </div>

              <div className={feature.tag === "Bilibili Charging Creator Event" ? "flex flex-row items-start gap-3" : platform.layout === "row" ? "grid grid-cols-2 gap-3" : "space-y-3"}>
                {platform.links.map((link, linkIndex) => (
                  link.href ? (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      data-cms-field={pastEventCmsField(feature, `platform${platformIndex + 1}Link${linkIndex + 1}Href`)}
                      className={feature.tag === "Bilibili Charging Creator Event"
                        ? "inline-flex w-fit max-w-full rounded-[0.75rem] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.02)] px-4 py-3"
                        : "block rounded-[0.75rem] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.02)] px-4 py-3"}
                    >
                      <span
                        className={`${bodyFontClass} ${feature.tag === "Bilibili Charging Creator Event" ? "whitespace-nowrap" : "whitespace-pre-line"} text-[0.68rem] leading-[1.55] text-[#d9b27a]`}
                        data-cms-field={pastEventCmsField(feature, `platform${platformIndex + 1}Link${linkIndex + 1}Label`)}
                      >
                        {renderNormalAmpersands(isZh ? link.label.zh : link.label.en)}
                      </span>
                    </a>
                  ) : (
                    <div
                      key={link.label.en}
                      className={feature.tag === "Bilibili Charging Creator Event"
                        ? "inline-flex w-fit max-w-full rounded-[0.75rem] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.02)] px-4 py-3"
                        : "block rounded-[0.75rem] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.02)] px-4 py-3"}
                    >
                      <span
                        className={`${bodyFontClass} ${feature.tag === "Bilibili Charging Creator Event" ? "whitespace-nowrap" : "whitespace-pre-line"} text-[0.68rem] leading-[1.55] text-[#d9b27a]`}
                        data-cms-field={pastEventCmsField(feature, `platform${platformIndex + 1}Link${linkIndex + 1}Label`)}
                      >
                        {renderNormalAmpersands(isZh ? link.label.zh : link.label.en)}
                      </span>
                    </div>
                  )
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </article>
  );
}

function EventImageStack({
  features,
  images,
  progress,
}: {
  features: typeof EVENT_FEATURE_ITEMS;
  images: string[];
  progress: number;
}) {
  const { language } = useLanguage();
  const isZh = language === "zh";
  const itemCount = images.length;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        borderRadius: "1.5rem",
        display: "grid",
      }}
    >
      {images.map((src, i) => {
        const feature = features[i] ?? EVENT_FEATURE_ITEMS[i];
        const clipFraction = Math.min(Math.max(progress - i, 0), 1);
        const clipBottomPct = clipFraction * 100;
        const revealFraction = i === 0 ? 1 : Math.min(Math.max(progress - (i - 1), 0), 1);
        const translateYRem = ((1 - revealFraction) * 48) / 16;
        const zIndex = itemCount - i;

        return (
          <div
            key={i}
            style={{
              position: "relative",
              gridArea: "1 / 1",
              zIndex,
              clipPath: `inset(0 0 ${clipBottomPct}% 0 round 1.5rem)`,
              willChange: "clip-path, transform",
            }}
          >
            <img
              src={src}
              alt={feature?.tag ?? `Past event ${i + 1}`}
              loading="lazy"
              decoding="async"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "1.5rem",
                display: "block",
                transform: `translateY(${translateYRem}rem)`,
                willChange: "transform",
                transition: "transform 0.05s linear",
              }}
            />

            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "1.5rem",
                background: "linear-gradient(to top, rgba(22,25,21,0.6) 0%, transparent 50%)",
                pointerEvents: "none",
              }}
            />

            <div
              style={{
                position: "absolute",
                bottom: "1.25rem",
                left: "1.25rem",
                background: "rgba(0,0,0,0.55)",
                backdropFilter: "blur(0.625rem)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "0.5rem",
                padding: "0.5rem 0.875rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <div
                style={{
                  width: "0.375rem",
                  height: "0.375rem",
                  borderRadius: "50%",
                  backgroundImage: GRADIENT,
                  flexShrink: 0,
                }}
              />
              <span className="text-[0.75rem] font-medium tracking-[0.06em] text-[rgba(255,255,255,0.85)]">
                {feature?.variant === "past-event-detail"
                  ? isZh
                    ? feature?.title.zh
                    : feature?.title.en
                  : feature?.tag}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function getRawPageContentItemField(item: Parameters<typeof getPageContentItemField>[0], fieldId: string) {
  return item?.fields.find((fieldItem) => fieldItem.id === fieldId)?.value;
}

function getCmsPastEventPlatforms(
  item: Parameters<typeof getPageContentItemField>[0],
  fallbackPlatforms: EventPlatformGroup[],
): EventPlatformGroup[] {
  const platformNumbers = item ? getPastEventPlatformNumbersFromFields(item.fields) : [];

  return platformNumbers.map((platformNumber): EventPlatformGroup | null => {
    const fallbackPlatform = fallbackPlatforms[platformNumber - 1];
    const rawName = getRawPageContentItemField(item, `platform${platformNumber}Name`);
    const rawLogo = getRawPageContentItemField(item, `platform${platformNumber}Logo`);
    const rawLayout = getRawPageContentItemField(item, `platform${platformNumber}Layout`);
    const name = rawName ?? "";
    const logo = rawLogo ?? "";
    const layout = rawLayout ?? fallbackPlatform?.layout ?? "";
    const programNumbers = item ? getPastEventProgramNumbersFromFields(item.fields, platformNumber) : [];
    const links = programNumbers.map((linkNumber) => {
      const fallbackLink = fallbackPlatform?.links[linkNumber - 1];
      const rawLabel = getRawPageContentItemField(item, `platform${platformNumber}Link${linkNumber}Label`);
      const rawHref = getRawPageContentItemField(item, `platform${platformNumber}Link${linkNumber}Href`);
      const label = rawLabel ?? "";
      const href = rawHref ?? fallbackLink?.href ?? "";

      if (!label.trim() && !href.trim()) return null;

      return {
        ...(href.trim() ? { href } : {}),
        label: {
          en: label,
          zh: label,
        },
      };
    }).filter((link): link is EventLinkItem => Boolean(link));

    if (!name.trim() && !logo.trim() && links.length === 0) return null;

    const normalizedLayout: EventPlatformGroup["layout"] = layout === "row" ? "row" : "stack";

    return {
      logo,
      layout: normalizedLayout,
      name: {
        en: name,
        zh: name,
      },
      links,
    };
  }).filter((platform): platform is EventPlatformGroup => platform !== null);
}

function pastEventCmsField(feature: EventFeatureItem, fieldId: string) {
  return feature.cmsItemId ? pageContentItemFieldKey("pastEvents", feature.cmsItemId, fieldId) : undefined;
}

function EventInnovationFlow() {
  const { language } = useLanguage();
  const { pageContent } = usePublicCmsData();
  const isZh = language === "zh";
  const title = getPageContentField(pageContent, language, "event", "pastEvents", "title", isZh ? "过往活动" : "Past Events");
  const description = getPageContentField(
    pageContent,
    language,
    "event",
    "pastEvents",
    "description",
    isZh ? "过往活动回顾及精彩瞬间" : "Past event recaps and highlight moments",
  );
  const cmsPastItems = getPageContentSectionItems(pageContent, language, "event", "pastEvents");
  const featureItems: EventFeatureItem[] =
    cmsPastItems.length > 0
      ? EVENT_FEATURE_ITEMS.map((fallbackFeature, index) => {
          const item = cmsPastItems[index];
          if (!item) {
            return fallbackFeature;
          }

          if (fallbackFeature.variant === "past-event-detail") {
            const fallbackTitle = isZh ? fallbackFeature.title.zh : fallbackFeature.title.en;
            const fallbackDate = isZh ? fallbackFeature.date.zh : fallbackFeature.date.en;
            const fallbackParagraphs = isZh ? fallbackFeature.paragraphs.zh : fallbackFeature.paragraphs.en;
            const cmsTitle = getPageContentItemField(item, "title", fallbackTitle);
            const cmsDate = getPageContentItemField(item, "date", fallbackDate);
            const cmsDescription = getPageContentItemField(
              item,
              "description",
              fallbackParagraphs.join("\n"),
            );
            const paragraphs = cmsDescription
              .split(/\n{1,}/)
              .map((paragraph) => paragraph.trim())
              .filter(Boolean);

            return {
              ...fallbackFeature,
              cmsItemId: item.id,
              date: {
                en: cmsDate,
                zh: cmsDate,
              },
              paragraphs: {
                en: paragraphs,
                zh: paragraphs,
              },
              platforms: getCmsPastEventPlatforms(item, fallbackFeature.platforms),
              title: {
                en: cmsTitle,
                zh: cmsTitle,
              },
            };
          }

          return {
            ...fallbackFeature,
            cmsItemId: item.id,
            cta: isZh ? "查看回顾" : "View Review",
            desc: getPageContentItemField(item, "description", fallbackFeature.desc),
            tag: getPageContentItemField(item, "date", fallbackFeature.tag),
            title: getPageContentItemField(item, "title", fallbackFeature.title),
          };
        })
      : EVENT_FEATURE_ITEMS;
  const featureImages =
    cmsPastItems.length > 0
      ? FEATURE_IMAGES.map((fallbackImage, index) =>
          getPageContentItemField(cmsPastItems[index], "image", fallbackImage),
        )
      : FEATURE_IMAGES;
  const headingFontClass = "font-['Akshar']";
  const bodyFontClass = "font-['Abel']";
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const itemCount = featureItems.length;

  useEffect(() => {
    let frameId: number | null = null;
    let isNearViewport = true;

    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrolled = -rect.top;
      const nextProgress = scrolled / window.innerHeight;
      setProgress(Math.max(0, Math.min(itemCount - 1 + 0.999, nextProgress)));
    };

    const scheduleScroll = () => {
      if (!isNearViewport || frameId !== null) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = null;
        handleScroll();
      });
    };

    let intersectionObserver: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window && containerRef.current) {
      intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          isNearViewport = entry?.isIntersecting ?? true;
          if (isNearViewport) {
            handleScroll();
          }
        },
        { rootMargin: "25% 0px 25% 0px", threshold: 0 },
      );
      intersectionObserver.observe(containerRef.current);
    }

    window.addEventListener("scroll", scheduleScroll, { passive: true, capture: true });
    document.addEventListener("scroll", scheduleScroll, { passive: true, capture: true });
    window.addEventListener("resize", scheduleScroll);
    handleScroll();

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
      if (intersectionObserver) {
        intersectionObserver.disconnect();
      }
      window.removeEventListener("scroll", scheduleScroll, { capture: true });
      document.removeEventListener("scroll", scheduleScroll, { capture: true });
      window.removeEventListener("resize", scheduleScroll);
    };
  }, [itemCount]);

  const activeIndex = Math.min(Math.floor(progress), itemCount - 1);

  return (
    <section className="bg-[#161915] py-24 lg:py-0" style={{ fontFamily: FONT }}>
      <div className="mx-auto max-w-[90rem] px-[var(--landing-shell-125)] pt-4 lg:pt-28">
        <div className="flex flex-col gap-3">
          <h2
            className={`${headingFontClass} text-[#d9b27a] ${isZh ? "" : ""}`}
            data-cms-field="pastEvents__title"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
            }}
          >
            {renderTitleAmpersands(title)}
          </h2>
          <p
            className={`${bodyFontClass} mt-2 max-w-[32.5rem] text-[1rem] leading-[1.7] text-[rgba(255,255,255,0.55)]`}
            data-cms-field="pastEvents__description"
          >
            {renderNormalAmpersands(description)}
          </p>
        </div>

        <div className="mt-10 hidden gap-2 lg:flex">
          {featureItems.map((_, i) => (
            <div
              key={i}
              style={{
                height: "0.125rem",
                flex: 1,
                borderRadius: "0.125rem",
                backgroundImage: i <= activeIndex ? GRADIENT : undefined,
                background: i <= activeIndex ? undefined : "rgba(255,255,255,0.12)",
              }}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-[90rem] px-[var(--landing-shell-125)] lg:hidden">
        <div className="space-y-10">
          {featureItems.map((feature, index) => (
            feature.variant === "past-event-detail" ? (
              <EventPastEventMobile
                key={feature.tag}
                feature={feature}
                isZh={isZh}
                bodyFontClass={bodyFontClass}
              />
            ) : (
              <article
                key={feature.tag}
                className="overflow-hidden rounded-[1.5rem] border border-[rgba(255,255,255,0.08)] bg-[#111814]"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={featureImages[index] ?? FEATURE_IMAGES[index]}
                    alt={feature.tag}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-7">
                  <p
                    className="text-[0.6875rem] font-semibold  tracking-[0.22em]"
                    style={{
                      background: GRADIENT,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {renderNormalAmpersands(feature.tag)}
                  </p>
                  <h3 className="mt-4 whitespace-pre-line text-[1.75rem] leading-[1.14] text-white">
                    {renderTitleAmpersands(feature.title)}
                  </h3>
                  <p className="mt-5 text-[1rem] leading-[1.72] text-[rgba(255,255,255,0.68)] [text-align:justify]">
                    {renderNormalAmpersands(feature.desc)}
                  </p>
                </div>
              </article>
            )
          ))}
        </div>
      </div>

      <div
        ref={containerRef}
        className="mx-auto hidden max-w-[90rem] gap-12 px-[var(--landing-shell-125)] lg:flex"
        style={{ height: `${itemCount * 100}vh` }}
      >
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {featureItems.map((feature, index) => (
            <EventFeatureBlock
              key={feature.tag}
              feature={feature}
              index={index}
              active={activeIndex === index}
              isZh={isZh}
              bodyFontClass={bodyFontClass}
            />
          ))}
        </div>

        <div style={{ width: "clamp(22.5rem, 40%, 31.25rem)", flexShrink: 0 }}>
          <div
            style={{
              position: "sticky",
              top: 0,
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ transform: `translateY(${PAST_EVENTS_DESKTOP_VERTICAL_OFFSET})` }}>
              <div style={{ transform: "scale(0.9)", transformOrigin: "center center" }}>
                <EventImageStack features={featureItems} images={featureImages} progress={progress} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden h-24 lg:block" />
    </section>
  );
}

export function EventLandingPage() {
  const { language } = useLanguage();
  const { pageContent } = usePublicCmsData();
  const isZh = language === "zh";
  const eventHeroTitleLines = getPageContentLines(
    pageContent,
    language,
    "event",
    "hero",
    ["titleLine1", "titleLine2"],
    isZh ? ["活动纪事"] : ["EVENT", "CHRONICLE"],
  );
  const eventHeroSignature = getPageContentField(pageContent, language, "event", "hero", "signature", "");
  const eventHeroImageSrc = getPageContentField(pageContent, language, "event", "hero", "heroImage", "") || eventHeroImageSrcDefault;

  return (
    <div className="min-h-screen bg-[#161915] text-white">
      <LandingHeader />

      <main>
        <LandingSharedHero
          desktopImageContainerClassName="left-auto right-[5vw] w-max justify-end"
          desktopImageContainerStyle={{ left: "auto", right: "5vw", height: "100vh" }}
          desktopImageStyle={{ height: "100vh" }}
          image={eventHeroImageSrc}
          imageAlt="Tiger Partners event portrait"
          titleLines={eventHeroTitleLines}
          signature={eventHeroSignature}
          centered
          underlineWidth="12vw"
          cmsFields={{
            image: "hero__heroImage",
            signature: "hero__signature",
            titleLines: ["hero__titleLine1", "hero__titleLine2"],
          }}
        />
        <EventRecognitionCarousel />
        <EventInnovationFlow />
      </main>

      <LandingFooter />
    </div>
  );
}
