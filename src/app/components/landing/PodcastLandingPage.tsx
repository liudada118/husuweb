"use client";

import { type CSSProperties, useRef, useState } from "react";
import { Mic } from "lucide-react";
import businessLogo1 from "../../../assets/Business1.png";
import businessLogo10 from "../../../assets/Business10.png";
import businessLogo11 from "../../../assets/Business11.png";
import businessLogo12 from "../../../assets/Business12.png";
import businessLogo2 from "../../../assets/Business2.png";
import businessLogo3 from "../../../assets/Business3.png";
import businessLogo4 from "../../../assets/Business4.png";
import businessLogo5 from "../../../assets/Business5.png";
import businessLogo6 from "../../../assets/Business6.png";
import businessLogo7 from "../../../assets/Business7.png";
import businessLogo8 from "../../../assets/Business8.png";
import businessLogo9 from "../../../assets/Business9.png";
import mediaPortrait from "../../../assets/media.png";
import media2Image from "../../../assets/media2.png";
import mediaLogo from "../../../assets/medialogo.png";
import mediaLogo1 from "../../../assets/medialogo1.png";
import mediaLogo2 from "../../../assets/medialogo2.png";
import mediaLogo3 from "../../../assets/medialogo3.png";
import programLogoBilibili from "../../../assets/programlogo_bilibili.png";
import programLogoDouyin from "../../../assets/programlogo_douyin.png";
import programLogoTencent from "../../../assets/programlogo_tengxun.png";
import programLogoYouku from "../../../assets/programlogo_youku.png";
import programLogoXyz from "../../../assets/Programlogo_xyz.png";
import { useLanguage } from "../../contexts/LanguageContext";
import { usePublicCmsData } from "../../contexts/PublicCmsDataContext";
import { renderNormalAmpersands, renderTitleAmpersands } from "../renderNormalAmpersands";
import { HeroAnimation2Background } from "./HeroAnimation2Background";
import { LandingFooter } from "./LandingFooter";
import { LandingHeader } from "./LandingHeader";
import { LandingRevealGroup } from "./LandingRevealGroup";
import { imageSrc } from "./shared";
import {
  getPageContentField,
  getPageContentItemField,
  getPageContentLines,
  getPageContentSectionItems,
  pageContentItemFieldKey,
} from "@/lib/cms-page-content";

const podcastPageShellClassName = "mx-auto w-full px-[var(--landing-shell-125)]";

type Language = "zh" | "en";

type PodcastRecognitionItem = {
  platform: Record<Language, string>;
  logo?: string;
  href?: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
};

const recognitionPlatformBadgeOverrides = {
  "Tencent Video": {
    en: "Tencent",
    zh: "腾讯视频",
    icon: "tv",
  },
  "Youku Video": {
    en: "Youku",
    zh: "优酷视频",
    icon: "tv",
  },
  Douyin: {
    en: "Douyin",
    zh: "抖音视频",
    icon: "play",
  },
} as const;

const recognitionPlatformDefaultLogos = {
  Bilibili: programLogoBilibili.src,
  Douyin: programLogoDouyin.src,
  "Tencent Video": programLogoTencent.src,
  "Xiaoyuzhou Podcast": programLogoXyz.src,
  "Youku Video": programLogoYouku.src,
} as const;

const recognitionPlatformsWithoutMeta = new Set(["Bilibili", "Xiaoyuzhou Podcast"]);

const podcastRecognitionItems: PodcastRecognitionItem[] = [
  {
    platform: { zh: "小宇宙播客", en: "Xiaoyuzhou Podcast" },
    logo: programLogoXyz.src,
    href: "https://www.xiaoyuzhoufm.com/episode/69b01b032d38299a03b2eaa1?s=eyJ1IjogIjYzMzExY2RlZWRjZTY3MTA0YWIyNTMzZCJ9",
    title: {
      zh: "《Slightly Open 191｜虎诉：颜值红利与颜值焦虑》",
      en: "Slightly Open 191 | Tiger Partners: The Beauty Advantage and Appearance Anxiety",
    },
    description: {
      zh: "2026.03.10 · Slightly Open – 小宇宙播客",
      en: "2026.03.10 · Slightly Open – Xiaoyuzhou Podcast",
    },
  },
  {
    platform: { zh: "小宇宙播客", en: "Xiaoyuzhou Podcast" },
    logo: programLogoXyz.src,
    href: "https://www.xiaoyuzhoufm.com/episode/69a7bad666e2c303773817a7?s=eyJ1IjogIjY2MDIzOTA3ZWRjZTY3MTA0YTc3NTI2MiJ9",
    title: {
      zh: "《088.和虎诉聊天｜你缺的不是努力，是一股狠劲儿》",
      en: "088. A Conversation with Tiger Partners | What You Lack Is Not Effort, but Edge",
    },
    description: {
      zh: "2026.03.05 · Haixiu – 小宇宙播客",
      en: "2026.03.05 · Haixiu – Xiaoyuzhou Podcast",
    },
  },
  {
    platform: { zh: "小宇宙播客", en: "Xiaoyuzhou Podcast" },
    logo: programLogoXyz.src,
    href: "https://www.xiaoyuzhoufm.com/episode/69778ac2109824f9e1b5de95?s=eyJ1IjogIjYxZGQ5ZDYxMmNiZDdjMDE3NjY5Y2FiMCJ9",
    title: {
      zh: "《E58.虎诉：社会运行的显秘之学，从劳动者的法律处境说起》",
      en: "E58. Tiger Partners: The Explicit and Hidden Logic of Society, Starting from the Legal Reality of Workers",
    },
    description: {
      zh: "2026.01.27 · Wanderers and Icebreakers – 小宇宙播客",
      en: "2026.01.27 · Wanderers and Icebreakers – Xiaoyuzhou Podcast",
    },
  },
  {
    platform: { zh: "抖音", en: "Douyin" },
    logo: programLogoDouyin.src,
    href: "https://www.douyin.com/video/7585458307876293934?modeFrom=searchResult",
    title: {
      zh: "《老板不知道的我·财富课》-第一桶金来自于？",
      en: "Where Does One’s First Pot of Gold Come From?",
    },
    description: {
      zh: "2025.12.26 · 《老板不知道的我·财富课》-抖音",
      en: "2025.12.26 · The Boss Doesn’t Know Me · Wealth Course – Douyin",
    },
  },
  {
    platform: { zh: "抖音", en: "Douyin" },
    logo: programLogoDouyin.src,
    href: "https://www.douyin.com/video/7585465465460362547?modeFrom=searchResult",
    title: {
      zh: "《老板不知道的我·财富课》-现在还有赚大钱的机会吗？",
      en: "Are There Still Opportunities to Make Big Money Nowadays?",
    },
    description: {
      zh: "2025.12.26 · 《老板不知道的我·财富课》-抖音",
      en: "2025.12.26 · The Boss Doesn’t Know Me · Wealth Course – Douyin",
    },
  },
  {
    platform: { zh: "抖音", en: "Douyin" },
    logo: programLogoDouyin.src,
    href: "https://www.douyin.com/video/7585475165916532006?modeFrom=searchResult",
    title: {
      zh: "《老板不知道的我·财富课》-什么样的员工最值得被投资？",
      en: "What Kind of Employees Are Most Worth Investing In?",
    },
    description: {
      zh: "2025.12.26 · 《老板不知道的我·财富课》-抖音",
      en: "2025.12.26 · The Boss Doesn’t Know Me · Wealth Course – Douyin",
    },
  },
  {
    platform: { zh: "腾讯视频", en: "Tencent Video" },
    href: "https://v.qq.com/x/cover/mzc00200rtspg8d/r4101wiivba.html",
    title: {
      zh: "《老板不知道的我·老友季2》-第8期",
      en: "The Boss Doesn’t Know Me · Season 2 – Episode 8",
    },
    description: {
      zh: "2025.12.16 · 腾讯视频",
      en: "2025.12.16 · Tencent Video",
    },
  },
  {
    platform: { zh: "优酷视频", en: "Youku Video" },
    href: "https://v.youku.com/v_show/id_XNjUwODAxNzA2MA==.html?s=fdfdb4c717d44d418613&scm=20140719.apircmd.298671.video_XNjUwODAxNzA2MA==&spm=a2hkt.13141534.1_7.d_2_19",
    title: {
      zh: "《老板不知道的我·老友季2》-第8期",
      en: "The Boss Doesn’t Know Me · Season 2 – Episode 8",
    },
    description: {
      zh: "2025.12.16 · 优酷视频",
      en: "2025.12.16 · Youku Video",
    },
  },
  {
    platform: { zh: "腾讯视频", en: "Tencent Video" },
    href: "https://v.qq.com/x/cover/mzc00200rtspg8d/x41010bzaum.html",
    title: {
      zh: "《老板不知道的我·老友季2》-第8期加更彩蛋",
      en: "The Boss Doesn’t Know Me · Season 2 – Episode 8 Bonus Clip",
    },
    description: {
      zh: "2025.12.16 · 腾讯视频",
      en: "2025.12.16 · Tencent Video",
    },
  },
  {
    platform: { zh: "优酷视频", en: "Youku Video" },
    href: "https://v.youku.com/v_show/id_XNjUxNTcwMDYwOA==.html?s=fdfdb4c717d44d418613&scm=20140719.apircmd.298671.video_XNjUxNTcwMDYwOA==&spm=a2hkt.13141534.1_7.d_2_20",
    title: {
      zh: "《老板不知道的我·老友季2》-第8期加更彩蛋",
      en: "The Boss Doesn’t Know Me · Season 2 – Episode 8 Bonus Clip",
    },
    description: {
      zh: "2025.12.16 · 优酷视频",
      en: "2025.12.16 · Youku Video",
    },
  },
  {
    platform: { zh: "小宇宙播客", en: "Xiaoyuzhou Podcast" },
    logo: programLogoXyz.src,
    href: "https://www.xiaoyuzhoufm.com/episode/6929590aba2292550f32cb74?s=eyJ1IjogIjYzMzExY2RlZWRjZTY3MTA0YWIyNTMzZCJ9",
    title: {
      zh: "《当闺蜜成为“职场拖油瓶”该怎么办 虎诉何运晨漆漆》",
      en: "When Your Best Friend Becomes Dead Weight at Work: What Should You Do?",
    },
    description: {
      zh: "2025.11.28 · 老板不知道的我·专业分享-小宇宙播客",
      en: "2025.11.28 · The Boss Doesn’t Know Me · Podcast Edition – Xiaoyuzhou Podcast",
    },
  },
  {
    platform: { zh: "小宇宙播客", en: "Xiaoyuzhou Podcast" },
    logo: programLogoXyz.src,
    href: "https://www.xiaoyuzhoufm.com/episode/69242b9418565034c38596cb?s=eyJ1IjogIjYzMzExY2RlZWRjZTY3MTA0YWIyNTMzZCJ9",
    title: {
      zh: "《职场友谊是毒药还是解药 何运晨漆漆虎诉》",
      en: "Are Workplace Friendships Poison or Cure?",
    },
    description: {
      zh: "2025.11.25 · 老板不知道的我·专业分享-小宇宙播客",
      en: "2025.11.25 · The Boss Doesn’t Know Me · Podcast Edition – Xiaoyuzhou Podcast",
    },
  },
  {
    platform: { zh: "腾讯视频", en: "Tencent Video" },
    href: "https://v.qq.com/x/cover/mzc00200rtspg8d/p41012g4fm3.html",
    title: {
      zh: "老板不知道的我·老友季2-第4期上",
      en: "The Boss Doesn’t Know Me · Season 2 – Episode 4 (Part 1)",
    },
    description: {
      zh: "2025.11.18 · 腾讯视频",
      en: "2025.11.18 · Tencent Video",
    },
  },
  {
    platform: { zh: "优酷视频", en: "Youku Video" },
    href: "https://v.youku.com/v_show/id_XNjQ5OTY0NDgyMA==.html?s=fdfdb4c717d44d418613&scm=20140719.apircmd.298671.video_XNjQ5OTY0NDgyMA==&spm=a2hkt.13141534.1_7.d_2_11",
    title: {
      zh: "老板不知道的我·老友季2-第4期上",
      en: "The Boss Doesn’t Know Me · Season 2 – Episode 4 (Part 1)",
    },
    description: {
      zh: "2025.11.18 · 优酷视频",
      en: "2025.11.18 · Youku Video",
    },
  },
  {
    platform: { zh: "腾讯视频", en: "Tencent Video" },
    href: "https://v.qq.com/x/cover/mzc00200rtspg8d/c4101f2sqib.html",
    title: {
      zh: "老板不知道的我·老友季2-第4期下",
      en: "The Boss Doesn’t Know Me · Season 2 – Episode 4 (Part 2)",
    },
    description: {
      zh: "2025.11.18 · 腾讯视频",
      en: "2025.11.18 · Tencent Video",
    },
  },
  {
    platform: { zh: "优酷视频", en: "Youku Video" },
    href: "https://v.youku.com/v_show/id_XNjUwMzAzNTYzNg==.html?s=fdfdb4c717d44d418613&scm=20140719.apircmd.298671.video_XNjUwMzAzNTYzNg==&spm=a2hkt.13141534.1_7.d_2_12",
    title: {
      zh: "老板不知道的我·老友季2-第4期下",
      en: "The Boss Doesn’t Know Me · Season 2 – Episode 4 (Part 2)",
    },
    description: {
      zh: "2025.11.18 · 优酷视频",
      en: "2025.11.18 · Youku Video",
    },
  },
  {
    platform: { zh: "腾讯视频", en: "Tencent Video" },
    href: "https://v.qq.com/x/cover/mzc00200rtspg8d/t41019sn6mg.html",
    title: {
      zh: "老板不知道的我·老友季2-第4期加更彩蛋",
      en: "The Boss Doesn’t Know Me · Season 2 – Episode 4 Bonus Clip",
    },
    description: {
      zh: "2025.11.18 · 腾讯视频",
      en: "2025.11.18 · Tencent Video",
    },
  },
  {
    platform: { zh: "优酷视频", en: "Youku Video" },
    href: "https://v.youku.com/v_show/id_XNjUxMTUxMzE3Mg==.html?s=fdfdb4c717d44d418613&scm=20140719.apircmd.298671.video_XNjUxMTUxMzE3Mg==&spm=a2hkt.13141534.1_7.d_2_13",
    title: {
      zh: "老板不知道的我·老友季2-第4期加更彩蛋",
      en: "The Boss Doesn’t Know Me · Season 2 – Episode 4 Bonus Clip",
    },
    description: {
      zh: "2025.11.18 · 优酷视频",
      en: "2025.11.18 · Youku Video",
    },
  },
  {
    platform: { zh: "哔哩哔哩", en: "Bilibili" },
    logo: programLogoBilibili.src,
    href: "https://www.bilibili.com/video/BV1RDazzYEP9/?share_source=copy_web&vd_source=0b24c587b649fa1195f58cc52d8e890b",
    title: {
      zh: "《虎诉：我的成人礼发生在小学三年级【老蒋播客03】》",
      en: "Tiger Partners: My Coming-of-Age Moment Happened in Third Grade",
    },
    description: {
      zh: "2025.09.03 · @老蒋巨靠谱-Bilibili",
      en: "2025.09.03 · Laojiangjukaopu – Bilibili",
    },
  },
  {
    platform: { zh: "小宇宙播客", en: "Xiaoyuzhou Podcast" },
    logo: programLogoXyz.src,
    href: "https://www.xiaoyuzhoufm.com/episode/68b3b46617c8c11bfba1e294",
    title: {
      zh: "《Slightly Open 170｜虎诉：那些别人不告诉你的人生真相》",
      en: "Slightly Open 170 | Tiger Partners: The Life Truths No One Tells You",
    },
    description: {
      zh: "2025.08.31 · @Slightly Open-小宇宙播客",
      en: "2025.08.31 · Slightly Open – Xiaoyuzhou Podcast",
    },
  },
  {
    platform: { zh: "哔哩哔哩", en: "Bilibili" },
    logo: programLogoBilibili.src,
    href: "https://www.bilibili.com/video/BV1wqh2zYEph/?share_source=copy_web&vd_source=0b24c587b649fa1195f58cc52d8e890b",
    title: {
      zh: "《【精剪版】虎诉谈 Dark Force：负面情感是前进动力？》",
      en: "Edited Version Tiger Partners on the Dark Force: Can Negative Emotions Become a Driving Force?",
    },
    description: {
      zh: "2025.08.29 · @蜉蝣天地Meanders-Bilibili",
      en: "2025.08.29 · Fuyou Tiandi Meanders – Bilibili",
    },
  },
  {
    platform: { zh: "哔哩哔哩", en: "Bilibili" },
    logo: programLogoBilibili.src,
    href: "https://www.bilibili.com/video/BV1rwYQzUEyc/?share_source=copy_web&vd_source=0b24c587b649fa1195f58cc52d8e890b",
    title: {
      zh: "《虎诉：赢家的饥饿、欲望与黑暗原力；做题家的一种人生解法》",
      en: "Tiger Partners: The Hunger, Desire, and Dark Force of Winners; One Life Strategy for Exam-Oriented Achievers",
    },
    description: {
      zh: "2025.08.22 · @蜉蝣天地Meanders-Bilibili",
      en: "2025.08.22 · Fuyou Tiandi Meanders – Bilibili",
    },
  },
  {
    platform: { zh: "小宇宙播客", en: "Xiaoyuzhou Podcast" },
    logo: programLogoXyz.src,
    href: "https://www.xiaoyuzhoufm.com/episode/686d168793fd2d72b82ae097",
    title: {
      zh: "《饭统戴老板x虎诉：世界是一张卷子，做题也是天赋》",
      en: "Dai Laoban × Tiger Partners: The World Is a Test Paper, and Taking Tests Is Also a Talent",
    },
    description: {
      zh: "2025.07.09 · @精选奇遇记-小宇宙播客",
      en: "2025.07.09 · Selected Encounters – Xiaoyuzhou Podcast",
    },
  },
  {
    platform: { zh: "哔哩哔哩", en: "Bilibili" },
    logo: programLogoBilibili.src,
    href: "https://www.bilibili.com/video/BV1cN3LzxEJS/?share_source=copy_web&vd_source=0b24c587b649fa1195f58cc52d8e890b",
    title: {
      zh: "《文科生吃尽时代黑利？怎么才能不把出路走窄》",
      en: "Are Liberal Arts Students Taking the Full Brunt of the Times? How Can You Avoid Narrowing Your Path?",
    },
    description: {
      zh: "2025.07.04 · @王艺妍妤Yanyu-Bilibili",
      en: "2025.07.04 · Wang Yiyanyu Yanyu – Bilibili",
    },
  },
  {
    platform: { zh: "哔哩哔哩", en: "Bilibili" },
    logo: programLogoBilibili.src,
    href: "https://www.bilibili.com/video/BV1vSKgzHE5D/?share_source=copy_web&vd_source=0b24c587b649fa1195f58cc52d8e890b",
    title: {
      zh: "《对话虎诉：世界很残酷，但年轻人不要放弃》",
      en: "A Conversation with Tiger Partners: The World Is Harsh, but Young People Shouldn’t Give Up",
    },
    description: {
      zh: "2025.06.24 · @听懂涨声-Bilibili",
      en: "2025.06.24 · Tingdong Zhangsheng – Bilibili",
    },
  },
  {
    platform: { zh: "哔哩哔哩", en: "Bilibili" },
    logo: mediaLogo.src,
    href: "https://www.bilibili.com/video/BV1sPJzzQE12/?share_source=copy_web&vd_source=0b24c587b649fa1195f58cc52d8e890b",
    title: {
      zh: "虎诉：充电构建创作者与观众的正向循环",
      en: "Tiger Partners: Charging Support Builds a Positive Cycle Between Creators and Audiences",
    },
    description: {
      zh: "2025.05.21 · @UP主发电机-Bilibili",
      en: "2025.05.21 · Bilibili Creator Center – Bilibili",
    },
  },
  {
    platform: { zh: "小宇宙播客", en: "Xiaoyuzhou Podcast" },
    logo: programLogoXyz.src,
    href: "https://www.xiaoyuzhoufm.com/episode/680b6d087a449ae858ac5597",
    title: {
      zh: "《顶级律师分享黑暗育儿，快乐教育是富豪骗局？顺便聊点婚姻真相》",
      en: "A Top Lawyer Talks About Dark Parenting: Is Happy Education a Myth for the Rich?",
    },
    description: {
      zh: "2025.04.25 · @全嘻嘻-小宇宙播客",
      en: "2025.04.25 · Quan Xixi – Xiaoyuzhou Podcast",
    },
  },
  {
    platform: { zh: "哔哩哔哩", en: "Bilibili" },
    logo: programLogoBilibili.src,
    href: "https://www.bilibili.com/video/BV1Qa57zsE5X/?share_source=copy_web&vd_source=0b24c587b649fa1195f58cc52d8e890b",
    title: {
      zh: "《【刘律talk talk】你可能是个后期英雄，所以时刻做好给机会开门的准备》",
      en: "Ms.Tiger Partners’s Talk: You May Be a Late-Game Hero, So Always Be Ready When Opportunity Knocks",
    },
    description: {
      zh: "2025.04.18 · @思远的南阁子-Bilibili",
      en: "2025.04.18 · Siyuan’s Nangezi – Bilibili",
    },
  },
  {
    platform: { zh: "小宇宙播客", en: "Xiaoyuzhou Podcast" },
    logo: mediaLogo3.src,
    href: "https://www.xiaoyuzhoufm.com/episode/67f5aed6f9578163d6e20643",
    title: {
      zh: "《对话虎诉：世界很残酷，但年轻人不要放弃》",
      en: "A Conversation with Tiger Partners: The World Is Harsh, but Young People Shouldn’t Give Up",
    },
    description: {
      zh: "2025.04.09 · @听懂涨声-小宇宙播客",
      en: "2025.04.09 · Tingdong Zhangsheng – Xiaoyuzhou Podcast",
    },
  },
  {
    platform: { zh: "哔哩哔哩", en: "Bilibili" },
    logo: programLogoBilibili.src,
    href: "https://www.bilibili.com/video/BV1teZ1Y8E47/?share_source=copy_web&vd_source=0b24c587b649fa1195f58cc52d8e890b",
    title: {
      zh: "《「现在靠婚姻暴富，女的难，男的容易」》",
      en: "Getting Rich Through Marriage Is Hard for Women but Easier for Men Today?",
    },
    description: {
      zh: "2025.04.03 · @全嘻嘻-Bilibili",
      en: "2025.04.03 · Quan Xixi – Bilibili",
    },
  },
  {
    platform: { zh: "哔哩哔哩", en: "Bilibili" },
    logo: mediaLogo.src,
    href: "https://www.bilibili.com/video/BV124X6YwEnH/?share_source=copy_web&vd_source=0b24c587b649fa1195f58cc52d8e890b",
    title: {
      zh: "《我，顶级律师，辅导孩子作业3年后：疯了》",
      en: "Me, a Top Lawyer, After Tutoring My Child for Three Years: I’ve Lost My Mind",
    },
    description: {
      zh: "2025.03.21 · @全嘻嘻-Bilibili",
      en: "2025.03.21 · Quan Xixi – Bilibili",
    },
  },
  {
    platform: { zh: "哔哩哔哩", en: "Bilibili" },
    logo: mediaLogo.src,
    href: "https://www.bilibili.com/video/BV1noQgYKEmb/?share_source=copy_web&vd_source=0b24c587b649fa1195f58cc52d8e890b",
    title: {
      zh: "《传播焦虑第一人又来了，聊聊你是否有【成功的基因】》",
      en: "The No. 1 Anxiety Spreader Is Back Again: Do You Have the Gene for Success?",
    },
    description: {
      zh: "2025.03.14 · @全嘻嘻-Bilibili",
      en: "2025.03.14 · Quan Xixi – Bilibili",
    },
  },
  {
    platform: { zh: "哔哩哔哩", en: "Bilibili" },
    logo: mediaLogo.src,
    href: "https://www.bilibili.com/video/BV1ix4y1x7Xb/?share_source=copy_web&vd_source=0b24c587b649fa1195f58cc52d8e890b",
    title: {
      zh: "《虎诉律师事务所管理合伙人虎诉：<开个“小作坊”也挺好>》",
      en: "Tiger Partners, Managing Partner of Tiger Partners: It’s Also Nice to Run a Small Practice",
    },
    description: {
      zh: "2024.07.16 · @法天使合同库-Bilibili",
      en: "2024.07.16 · Fatianshi Contract Library – Bilibili",
    },
  },
  {
    platform: { zh: "小宇宙播客", en: "Xiaoyuzhou Podcast" },
    logo: mediaLogo3.src,
    href: "https://www.xiaoyuzhoufm.com/episode/6660208394977a26ef602d7d",
    title: {
      zh: "《北大毕业15年，年入千万律师职场大实话。过度储蓄vs超前消费，谁更快乐？》",
      en: "15 Years After Graduating from Peking University: A Million-Yuan Lawyer’s Honest Take on Work and Life",
    },
    description: {
      zh: "2024.06.05 · @全嘻嘻-小宇宙播客",
      en: "2024.06.05 · Quan Xixi – Xiaoyuzhou Podcast",
    },
  },
  {
    platform: { zh: "哔哩哔哩", en: "Bilibili" },
    logo: mediaLogo.src,
    href: "https://www.bilibili.com/video/BV1cH4y1G7fH/?share_source=copy_web&vd_source=0b24c587b649fa1195f58cc52d8e890b",
    title: {
      zh: "《「传播焦虑第一人」，他又来了》",
      en: "The No. 1 Anxiety Spreader Is Back Again",
    },
    description: {
      zh: "2024.05.06 · @全嘻嘻-Bilibili",
      en: "2024.05.06 · Quan Xixi – Bilibili",
    },
  },
  {
    platform: { zh: "哔哩哔哩", en: "Bilibili" },
    logo: mediaLogo.src,
    href: "https://www.bilibili.com/video/BV1Ri42127DW/?share_source=copy_web&vd_source=0b24c587b649fa1195f58cc52d8e890b",
    title: {
      zh: "《我，37岁男的，认清消费主义陷阱后仍然热爱消费》",
      en: "I’m a 37-Year-Old Man: Even After Seeing Through Consumerism, I Still Love Spending",
    },
    description: {
      zh: "2024.04.26 · @全嘻嘻-Bilibili",
      en: "2024.04.26 · Quan Xixi – Bilibili",
    },
  },
  {
    platform: { zh: "小宇宙播客", en: "Xiaoyuzhou Podcast" },
    logo: mediaLogo3.src,
    href: "https://www.xiaoyuzhoufm.com/episode/6618f5175dae7932c60d8d74",
    title: {
      zh: "《律师行业的祛魅：与虎诉争议解决虎诉聊聊顶级红圈所降薪、裁员和跳槽的那些事儿》",
      en: "Demystifying the Legal Profession: A Conversation with Tiger Partners from Tiger Partners on Pay Cuts, Layoffs, and Job Mobility at Top-Tier Red Circle Law Firms",
    },
    description: {
      zh: "2024.04.12 · @今天不开庭-小宇宙播客",
      en: "2024.04.12 · Today No Court Session – Xiaoyuzhou Podcast",
    },
  },
  {
    platform: { zh: "哔哩哔哩", en: "Bilibili" },
    logo: mediaLogo.src,
    href: "https://www.bilibili.com/video/BV1J54y1W79y/?share_source=copy_web&vd_source=0b24c587b649fa1195f58cc52d8e890b",
    title: {
      zh: "《南希X 虎诉｜学习、面试和职场之道》",
      en: "Nanxi × Tiger Partners: Study, Interviews, and Career Insights",
    },
    description: {
      zh: "2021.02.07 · @赵南希小核桃-Bilibili",
      en: "2021.02.07 · Zhao Nanxi Little Walnut – Bilibili",
    },
  },
  {
    platform: { zh: "哔哩哔哩", en: "Bilibili" },
    logo: mediaLogo.src,
    href: "https://www.bilibili.com/video/BV1UX4y1P7Vy/?share_source=copy_web&vd_source=0b24c587b649fa1195f58cc52d8e890b",
    title: {
      zh: "《#核桃录# 虎诉和Tiffany网友奔现啦～开心！》",
      en: "Walnut Notes: Tiger Partners Meets Tiffany in Real Life",
    },
    description: {
      zh: "2021.01.31 · @赵南希小核桃-Bilibili",
      en: "2021.01.31 · Zhao Nanxi Little Walnut – Bilibili",
    },
  },
];

const normalizedPodcastRecognitionItems = podcastRecognitionItems.map((item) => ({
  ...item,
  logo:
    recognitionPlatformDefaultLogos[
      item.platform.en as keyof typeof recognitionPlatformDefaultLogos
    ] ?? item.logo,
}));

const businessCooperationLogos = [
  businessLogo1.src,
  businessLogo2.src,
  businessLogo3.src,
  businessLogo4.src,
  businessLogo5.src,
  businessLogo6.src,
  businessLogo7.src,
  businessLogo8.src,
  businessLogo9.src,
  businessLogo10.src,
  businessLogo11.src,
  businessLogo12.src,
] as const;

const mediaMetricsLogos = [
  { src: mediaLogo.src, alt: "Bilibili" },
  { src: mediaLogo3.src, alt: "Xiaoyuzhou FM" },
  { src: mediaLogo1.src, alt: "Douyin" },
  { src: mediaLogo2.src, alt: "Xiaohongshu" },
] as const;

const podcastCopy = {
  en: {
    heroTitleLines: ["SOCIAL MEDIA"],
    heroSignature: "",
    intro:
      "With years of deep experience in the legal industry, Lawyer Tiger Partners has leveraged his solid professional expertise and strong industry reputation to expand from the professional field to public content platforms, becoming a highly popular knowledge creator among netizens.",
    statsTitleLines: ["HIS CORE FOLLOWER COUNT ACROSS MAJOR PLATFORMS STANDS AT THE FOLLOWING:"],
    statsBody:
      "With a sharp, insightful yet humorous and sincere style, he transforms specialized legal knowledge and workplace experience into down-to-earth, in-depth content. By continuously delivering diverse perspectives on personal growth, he has earned wide recognition and support from his audience.",
    stats: [
      { label: "Bilibili", value: "325,000", suffix: "subscribers" },
      { label: "Xiaoyuzhou", value: "60,000", suffix: "subscribers" },
      { label: "Douyin", value: "158,000", suffix: "subscribers" },
      { label: "Xiaohongshu", value: "133,000", suffix: "subscribers" },
    ],
    recognitionTitle: "Program Appearances",
    recognitionSubtitle: "record of my program and podcast appearances to date",
    influenceTitle:
      "Build a top legal influencer and multi-platform video podcaster, forming an influence matrix across legal and lifestyle fields.",
    influenceBody:
      "Garner recognition from mainstream platforms and media, achieve cross-industry influence through workplace variety shows, university lectures and alumni sharing, integrating legal expertise with public communication.",
    cooperationTitle: "Business Cooperation",
  },
  zh: {
    heroTitleLines: ["社交媒体"],
    heroSignature: "",
    intro:
      "凭借多年深耕法律行业所积累的深厚经验，虎诉以扎实的专业能力和突出的行业声誉，从专业领域延展至公众内容平台，成为广受网友欢迎的知识型内容创作者。",
    statsTitleLines: ["目前全网覆盖多平台核心粉丝："],
    statsBody:
      "他以犀利、洞察力强而又不失幽默与真诚的风格，把专业法律知识和职场经验转化为接地气且有深度的内容。通过持续输出关于个人成长的多元视角，他也赢得了广泛的认可与支持。",
    stats: [
      { label: "B站", value: "325,000", suffix: "订阅" },
      { label: "小宇宙", value: "60,000", suffix: "订阅" },
      { label: "抖音", value: "158,000", suffix: "订阅" },
      { label: "小红书", value: "133,000", suffix: "订阅" },
    ],
    recognitionTitle: "节目出镜记录",
    recognitionSubtitle: "截至目前我参与的节目与播客出镜记录",
    influenceTitle: "打造法律头部意见领袖与多平台头部专业观察，形成覆盖法律与生活领域的影响力矩阵。",
    influenceBody:
      "获得主流平台与媒体认可，通过职场综艺、高校讲座及校友分享实现跨界影响力，融合法律专业与大众传播。",
    cooperationTitle: "商务合作",
  },
} as const;

function revealStyle(durationMs = 700, y = 24): CSSProperties {
  return {
    opacity: 0,
    transform: `translateY(${y}px)`,
    transition: `opacity ${durationMs / 1000}s ease, transform ${durationMs / 1000}s ease`,
  };
}

function parseRecognitionMeta(text: string) {
  const [datePart, sourcePart = ""] = text.split(" · ", 2);
  const separatorMatch = sourcePart.match(/\s*[–-]\s*/);

  if (!separatorMatch) {
    return {
      date: datePart,
      sourceTitle: sourcePart,
      sourceMeta: "",
    };
  }

  const separatorIndex = separatorMatch.index ?? 0;
  const separator = separatorMatch[0];

  return {
    date: datePart,
    sourceTitle: sourcePart.slice(0, separatorIndex).trim(),
    sourceMeta: sourcePart.slice(separatorIndex + separator.length).trim(),
  };
}

function restoreLegacyMediaCopy(value: string, fallback: string, legacyValues: readonly string[]) {
  const normalizedValue = value.trim();

  if (!normalizedValue) {
    return fallback;
  }

  return legacyValues.includes(normalizedValue) ? fallback : value;
}

export function PodcastLandingPage() {
  const { language } = useLanguage();
  const { pageContent } = usePublicCmsData();
  const [showAllRecognition, setShowAllRecognition] = useState(false);
  const recognitionToggleRef = useRef<HTMLButtonElement | null>(null);
  const activeLanguage = language as Language;
  const copy = podcastCopy[activeLanguage];
  const isZh = language === "zh";
  const heroTitleLines = getPageContentLines(pageContent, activeLanguage, "media", "hero", ["titleLine1", "titleLine2"], copy.heroTitleLines);
  const heroImageSrc = getPageContentField(pageContent, activeLanguage, "media", "hero", "heroImage", "") || imageSrc(mediaPortrait);
  const intro = getPageContentField(pageContent, activeLanguage, "media", "intro", "body", copy.intro);
  const statsTitle = restoreLegacyMediaCopy(
    getPageContentField(pageContent, activeLanguage, "media", "stats", "title", copy.statsTitleLines[0]),
    copy.statsTitleLines[0],
    ["Multi-platform legal content influence"],
  );
  const statsBody = restoreLegacyMediaCopy(
    getPageContentField(pageContent, activeLanguage, "media", "stats", "body", copy.statsBody),
    copy.statsBody,
    ["Through sustained high-quality legal content, Tiger Partners has built broad attention across multiple social platforms."],
  );
  const appearancesTitle = getPageContentField(pageContent, activeLanguage, "media", "appearances", "title", copy.recognitionTitle);
  const appearancesSubtitle = restoreLegacyMediaCopy(
    getPageContentField(pageContent, activeLanguage, "media", "appearances", "subtitle", copy.recognitionSubtitle),
    copy.recognitionSubtitle,
    ["Cross-platform program, podcast, and interview appearances"],
  );
  const appearancesViewMoreLabel = getPageContentField(
    pageContent,
    activeLanguage,
    "media",
    "appearances",
    "viewMoreLabel",
    isZh ? "查看更多" : "View More",
  );
  const appearancesViewLessLabel = getPageContentField(
    pageContent,
    activeLanguage,
    "media",
    "appearances",
    "viewLessLabel",
    isZh ? "收起" : "Collapse",
  );
  const influenceTitle = restoreLegacyMediaCopy(
    getPageContentField(pageContent, activeLanguage, "media", "influence", "title", copy.influenceTitle),
    copy.influenceTitle,
    ["Influence Matrix"],
  );
  const influenceBody = restoreLegacyMediaCopy(
    getPageContentField(pageContent, activeLanguage, "media", "influence", "body", copy.influenceBody),
    copy.influenceBody,
    ["Professional legal content and public communication connect to form cross-platform influence."],
  );
  const cooperationTitle = getPageContentField(pageContent, activeLanguage, "media", "cooperation", "title", copy.cooperationTitle);
  const cmsStatItems = getPageContentSectionItems(pageContent, activeLanguage, "media", "stats");
  const cmsAppearanceItems = getPageContentSectionItems(pageContent, activeLanguage, "media", "appearances");
  const cmsCooperationItems = getPageContentSectionItems(pageContent, activeLanguage, "media", "cooperation");
  const headingFontClass = "font-['Akshar']";
  const bodyFontClass = "font-['Abel']";
  const podcastTitleWrapClassName =
    "w-full min-w-0 max-w-full [text-wrap:balance] [overflow-wrap:anywhere]";
  const businessCooperationItems =
    cmsCooperationItems.length > 0
      ? cmsCooperationItems.map((item, index) => ({
          cmsItemId: item.id,
          href: getPageContentItemField(item, "href"),
          label: getPageContentItemField(item, "label", `Business cooperation logo ${index + 1}`),
          logo: getPageContentItemField(item, "icon", businessCooperationLogos[index % businessCooperationLogos.length]),
        }))
      : businessCooperationLogos.map((logo, index) => ({
          cmsItemId: undefined,
          href: "",
          label: `Business cooperation logo ${index + 1}`,
          logo,
        }));
  const businessCooperationLogoRows = [
    businessCooperationItems.slice(0, Math.ceil(businessCooperationItems.length / 2)),
    businessCooperationItems.slice(Math.ceil(businessCooperationItems.length / 2)),
  ].filter((row) => row.length > 0);
  const mediaMetricsStats = cmsStatItems.length > 0
    ? cmsStatItems.map((item, index) => ({
        cmsItemId: item.id,
        label: getPageContentItemField(item, "label"),
        logo: getPageContentItemField(item, "icon", mediaMetricsLogos[index]?.src ?? ""),
        logoAlt: getPageContentItemField(item, "label", mediaMetricsLogos[index]?.alt ?? ""),
        suffix: getPageContentItemField(item, "suffix"),
        value: getPageContentItemField(item, "value"),
      }))
    : copy.stats.map((item, index) => ({
        ...item,
        value: item.value,
        suffix: item.suffix,
        logo: mediaMetricsLogos[index]?.src,
        logoAlt: mediaMetricsLogos[index]?.alt ?? item.label,
      }));
  const normalizedVisibleRecognitionItems =
    cmsAppearanceItems.length > 0
      ? normalizedPodcastRecognitionItems.map((fallbackItem, index) => {
          const item = cmsAppearanceItems[index];
          if (!item) {
            return fallbackItem;
          }

          const fallbackPlatform = fallbackItem.platform[activeLanguage];
          const fallbackTitle = fallbackItem.title[activeLanguage];
          const fallbackDescription = fallbackItem.description[activeLanguage];
          const fallbackDate = fallbackDescription.split(" · ")[0] ?? "";
          const fallbackSource = fallbackDescription.slice(fallbackDate.length).replace(/^ 路 /, "") || fallbackPlatform;
          const platform = getPageContentItemField(item, "platform", fallbackPlatform);
          const title = getPageContentItemField(item, "title", fallbackTitle);
          const date = getPageContentItemField(item, "date", fallbackDate);
          return {
            cmsItemId: item.id,
            description: {
              en: date,
              zh: date,
            },
            href: getPageContentItemField(item, "href", fallbackItem.href),
            logo: getPageContentItemField(item, "logo", fallbackItem.logo ?? "") || undefined,
            platform: { en: platform, zh: platform },
            title: { en: title, zh: title },
          };
        })
      : normalizedPodcastRecognitionItems;
  const recognitionPreviewCount = 6;
  const hasMoreRecognition = normalizedVisibleRecognitionItems.length > recognitionPreviewCount;
  const visibleRecognitionItems = showAllRecognition
    ? normalizedVisibleRecognitionItems
    : normalizedVisibleRecognitionItems.slice(0, recognitionPreviewCount);
  const recognitionToggleLabel = isZh
    ? showAllRecognition
      ? appearancesViewLessLabel
      : appearancesViewMoreLabel
    : showAllRecognition
      ? appearancesViewLessLabel
      : appearancesViewMoreLabel;
  const handleRecognitionToggle = () => {
    if (showAllRecognition) {
      setShowAllRecognition(false);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          recognitionToggleRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        });
      });
      return;
    }

    setShowAllRecognition(true);
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-[#161915] text-white">
      <LandingHeader />

      <main>
        <section className="relative flex h-[100svh] min-h-[100svh] items-center overflow-hidden">
          <div className="absolute inset-0">
            <HeroAnimation2Background variant="subtle" />
          </div>

          <LandingRevealGroup className="relative z-10 h-[100svh] min-h-[100svh] w-full" threshold={0.2}>
            <div
              className={`${podcastPageShellClassName} relative flex h-[100svh] min-h-[100svh] w-full flex-col items-start justify-center gap-0 py-[var(--landing-hero-padding-y)]`}
            >
              <div className="w-full min-w-0 lg:mr-auto lg:max-w-[var(--landing-hero-copy-width)]" data-animate style={revealStyle(900, 30)}>
                <h1
                  className={
                    isZh
                      ? `${headingFontClass} ${podcastTitleWrapClassName} mt-5 text-center font-bold leading-[1.02] tracking-[-0.03em] text-transparent`
                      : `${headingFontClass} ${podcastTitleWrapClassName} mt-5 text-center font-bold  leading-[0.96] tracking-[-0.04em] text-transparent`
                  }
                  style={{
                    fontSize: isZh ? "var(--landing-type-hero-zh)" : "var(--landing-type-hero-en)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    backgroundImage:
                      "linear-gradient(101deg, rgb(255,255,255) 3%, rgb(217,178,122) 85%)",
                  }}
                >
                  {heroTitleLines.map((line, index) => (
                    <span key={`${line}-${index}`} className="block" data-cms-field={`hero__titleLine${index + 1}`}>
                      {renderTitleAmpersands(line)}
                    </span>
                  ))}
                </h1>

                <div className="mt-6 flex w-full justify-center">
                  <div className="h-[2px] w-[12vw] rounded-full bg-[#d9b27a]" />
                </div>
              </div>

              <div
                className="relative mt-12 flex w-full max-w-[var(--landing-hero-mobile-art-width)] shrink-0 items-center justify-center lg:hidden"
                data-animate
                style={revealStyle(900, 30)}
              >
                <div className="absolute inset-x-[14%] top-[16%] h-[68%] rounded-full bg-[rgba(205,142,25,0.14)] blur-[90px]" />
                <img
                  src={heroImageSrc}
                  alt="Tiger Partners"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className="relative w-full object-contain drop-shadow-[0_40px_90px_rgba(0,0,0,0.45)]"
                  data-cms-field="hero__heroImage"
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
                src={heroImageSrc}
                alt="Tiger Partners"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="relative h-[100vh] w-auto max-w-none object-contain object-bottom drop-shadow-[0_40px_90px_rgba(0,0,0,0.45)]"
                data-cms-field="hero__heroImage"
              />
            </div>
          </LandingRevealGroup>
        </section>

        <section className="bg-black py-20 md:py-28">
          <div className="mx-auto w-full px-[var(--landing-shell-8)] lg:px-[20vw]">
            <p className={`${bodyFontClass} text-center text-[clamp(1.3rem,1.82vw,1.66rem)] leading-[1.72] text-[#d7d8d5]`} data-cms-field="intro__body">
              {renderNormalAmpersands(intro)}
            </p>
          </div>
        </section>

        <section className="bg-[rgba(14,16,14,0.72)] py-20 md:py-28">
          <LandingRevealGroup
            className={podcastPageShellClassName}
            threshold={0.12}
          >
            <div
              className="overflow-hidden rounded-[2rem] border border-[rgba(141,116,68,0.55)] bg-[radial-gradient(circle_at_bottom,rgba(217,178,122,0.12)_0%,rgba(17,20,16,0.96)_48%,rgba(15,17,14,0.98)_100%)] px-8 py-10 shadow-[0_30px_90px_rgba(0,0,0,0.32)] md:px-10 md:py-12 lg:px-12"
              data-animate
              style={revealStyle(760, 26)}
            >
              <div className="grid gap-8 lg:grid-cols-[minmax(0,0.46fr)_minmax(0,0.54fr)] lg:items-start lg:gap-12">
                <div className="min-w-0 self-start">
                  <p
                    className={`${bodyFontClass} max-w-none text-[clamp(1.3rem,1.87vw,1.74rem)] font-bold leading-[1.42] text-transparent [text-align:left]`}
                    style={{
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      backgroundImage: "linear-gradient(101deg, rgb(255,232,187) 8%, rgb(217,178,122) 58%, rgb(201,141,42) 100%)",
                    }}
                  >
                    <span data-cms-field="stats__title">{renderTitleAmpersands(statsTitle)}</span>
                  </p>
                </div>

                <p
                  className={`${bodyFontClass} min-w-0 max-w-[40rem] self-start text-[clamp(1rem,1.22vw,1.18rem)] leading-[1.72] text-[#d5d1cb] [text-align:justify]`}
                >
                  <span data-cms-field="stats__body">{renderNormalAmpersands(statsBody)}</span>
                </p>
              </div>

              <div className="mt-8 h-px w-full bg-[rgba(217,178,122,0.24)] md:mt-10" />

              <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {mediaMetricsStats.map((item) => (
                  <div key={item.label} className="flex flex-col items-center text-center">
                    <div className="flex h-[3rem] items-center justify-center">
                      {item.logo ? (
                        <img
                          src={item.logo}
                          alt={item.logoAlt}
                          className="max-h-[2.1rem] w-auto max-w-full object-contain"
                          data-cms-field={"cmsItemId" in item ? pageContentItemFieldKey("stats", item.cmsItemId, "icon") : undefined}
                        />
                      ) : (
                        <p
                          className={`${headingFontClass} text-[clamp(1rem,1.15vw,1.1rem)] font-semibold text-[#d9b27a]`}
                          data-cms-field={"cmsItemId" in item ? pageContentItemFieldKey("stats", item.cmsItemId, "label") : undefined}
                        >
                          {renderTitleAmpersands(item.label)}
                        </p>
                      )}
                    </div>
                    <p
                      className={`${headingFontClass} mt-2 text-[clamp(2rem,3vw,3.2rem)] font-semibold leading-none text-[#d9b27a]`}
                      data-cms-field={"cmsItemId" in item ? pageContentItemFieldKey("stats", item.cmsItemId, "value") : undefined}
                    >
                      {renderTitleAmpersands(item.value.endsWith("+") ? item.value : `${item.value}+`)}
                    </p>
                    <p
                      className={`${bodyFontClass} mt-3 text-[clamp(0.92rem,0.96vw,1rem)] text-[#d9b27a]`}
                      data-cms-field={"cmsItemId" in item ? pageContentItemFieldKey("stats", item.cmsItemId, "suffix") : undefined}
                    >
                      {renderNormalAmpersands(item.suffix)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </LandingRevealGroup>
        </section>

        <section className="bg-[#161915] py-20 md:py-28">
          <div className={podcastPageShellClassName}>
            <div className="mb-12 min-w-0 max-w-[min(100%,56rem)]">
              <h2 className={`${headingFontClass} ${podcastTitleWrapClassName} max-w-[18ch] text-[clamp(1.84rem,3.28vw,3.84rem)] font-bold  leading-[0.96] text-[#d9b27a]`}>
                <span data-cms-field="appearances__title">{renderTitleAmpersands(appearancesTitle)}</span>
              </h2>
              {appearancesSubtitle ? (
                <p className={`${bodyFontClass} mt-5 max-w-[56rem] text-[clamp(0.9rem,1.188vw,1.215rem)] leading-[1.65] text-[#d7d7d2]`} data-cms-field="appearances__subtitle">
                  {renderNormalAmpersands(appearancesSubtitle)}
                </p>
              ) : null}
            </div>

            <div className="mx-auto w-full min-w-0 max-w-6xl">
              <div className="relative pt-4 pl-8 md:pl-12">
                <div className="absolute bottom-0 left-[0.71875rem] top-4 w-px bg-[linear-gradient(180deg,rgba(217,178,122,0.08)_0%,rgba(217,178,122,0.75)_14%,rgba(217,178,122,0.75)_86%,rgba(217,178,122,0.08)_100%)] md:left-[0.90625rem]" />
                <div className="space-y-5">
                {visibleRecognitionItems.map((item) => {
                  const recognitionCardLogo =
                    item.logo ??
                    recognitionPlatformDefaultLogos[
                      item.platform.en as keyof typeof recognitionPlatformDefaultLogos
                    ];
                  const cardMeta = parseRecognitionMeta(item.description[language as Language]);
                  const shouldHideSourceMeta = recognitionPlatformsWithoutMeta.has(item.platform.en);
                  const content = (
                    <article
                      className="relative min-w-0 overflow-hidden rounded-[1.6rem] border border-[rgba(217,178,122,0.28)] bg-[linear-gradient(180deg,rgba(36,39,33,0.96)_0%,rgba(28,31,27,0.98)_100%)] px-6 py-5 shadow-[0_18px_44px_rgba(0,0,0,0.22)] transition-colors md:px-7 md:py-6"
                    >
                      <div className="space-y-5">
                        <div className="flex min-w-0 items-center gap-4">
                          {recognitionCardLogo ? (
                            <div className="flex h-[2.75rem] min-w-[7.5rem] shrink-0 items-center justify-center rounded-[0.35rem] bg-[#d9b27a] px-3">
                              <img
                                src={recognitionCardLogo}
                                alt={`${item.platform.en} logo`}
                                className="h-5 w-auto object-contain md:h-6"
                              />
                            </div>
                          ) : (
                            <div className={`${headingFontClass} flex h-[2.75rem] min-w-[7.5rem] shrink-0 items-center justify-center rounded-[0.35rem] bg-[#d9b27a] px-3 text-[0.72rem] font-semibold  tracking-[0.08em] text-[#201a10]`}>
                              <span data-cms-field={"cmsItemId" in item ? pageContentItemFieldKey("appearances", item.cmsItemId, "platform") : undefined}>
                                {renderTitleAmpersands(item.platform[language as Language])}
                              </span>
                            </div>
                          )}

                          <div className="min-w-0 flex flex-1 items-center gap-3">
                            <span className={`${headingFontClass} shrink-0 border-b border-[#d9b27a] pb-1 text-[1.4375rem] font-semibold text-[#d9b27a]`}>
                              <span data-cms-field={"cmsItemId" in item ? pageContentItemFieldKey("appearances", item.cmsItemId, "platform") : undefined}>
                                {renderTitleAmpersands(cardMeta.sourceTitle || item.platform[language as Language])}
                              </span>
                            </span>
                            {cardMeta.sourceMeta && !shouldHideSourceMeta ? (
                              <span className={`${bodyFontClass} min-w-0 truncate text-[1.0625rem] text-[rgba(239,237,233,0.72)]`}>
                                {renderNormalAmpersands(cardMeta.sourceMeta)}
                              </span>
                            ) : null}
                          </div>

                          <span className={`${headingFontClass} shrink-0 text-[1.5rem] font-semibold tracking-[0.03em] text-[rgba(255,255,255,0.58)]`}>
                            <span data-cms-field={"cmsItemId" in item ? pageContentItemFieldKey("appearances", item.cmsItemId, "date") : undefined}>
                                {renderNormalAmpersands(cardMeta.date)}
                            </span>
                          </span>
                        </div>

                        <div className="flex min-w-0 items-center justify-between gap-5">
                          <h3 className={`${bodyFontClass} min-w-0 flex-1 text-[2rem] font-medium leading-[1.28] text-[#efede9]`}>
                            <span data-cms-field={"cmsItemId" in item ? pageContentItemFieldKey("appearances", item.cmsItemId, "title") : undefined}>
                              {renderTitleAmpersands(item.title[language as Language])}
                            </span>
                          </h3>
                          <div className="flex h-[2.625rem] w-[2.625rem] items-center justify-center rounded-full border border-[#d9b27a]/60 text-[#d9b27a]">
                            <Mic className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.75} />
                          </div>
                        </div>
                      </div>
                    </article>
                  );

                  return (
                    <div key={`${item.description.en}-${item.title.en}-${item.href ?? item.platform.en}`} className="relative">
                      <div className="absolute left-[-1.9rem] top-1/2 z-10 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full border border-[#d9b27a]/55 bg-[#1b1f19] shadow-[0_0_0_5px_rgba(22,25,21,0.95)] md:left-[-2.7rem]">
                        <div className="h-2.5 w-2.5 rounded-full bg-[#d9b27a]" />
                      </div>
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          className="block hover:[&_article]:border-[#d9b27a]/55 hover:[&_article]:bg-[linear-gradient(180deg,rgba(42,46,38,0.98)_0%,rgba(30,34,29,1)_100%)]"
                        >
                          {content}
                        </a>
                      ) : (
                        content
                      )}
                    </div>
                  );
                })}
                </div>
                {hasMoreRecognition ? (
                  <div className="mt-8 flex justify-center">
                    <button
                      ref={recognitionToggleRef}
                      type="button"
                      onClick={handleRecognitionToggle}
                      className={`${bodyFontClass} inline-flex items-center justify-center rounded-full border border-[#d9b27a]/30 bg-[rgba(217,178,122,0.08)] px-6 py-3 text-[0.95rem] font-medium text-[#d9b27a] transition-colors hover:border-[#d9b27a]/55 hover:bg-[rgba(217,178,122,0.14)]`}
                    >
                      {renderNormalAmpersands(recognitionToggleLabel)}
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-black">
          <div className="relative w-full">
            <img
              src={imageSrc(media2Image)}
              alt="Podcast influence matrix"
              loading="lazy"
              decoding="async"
              className="block h-auto w-full object-contain"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,12,10,0.42)_0%,rgba(10,12,10,0.2)_30%,rgba(10,12,10,0.2)_70%,rgba(10,12,10,0.48)_100%)]" />
            <div className={`${podcastPageShellClassName} absolute inset-0 z-10 flex items-center justify-center py-16 md:py-20`}>
              <div className="w-full min-w-0 max-w-[58rem] text-center">
                <h2 className={`${headingFontClass} ${podcastTitleWrapClassName} text-[clamp(1.3rem,2.24vw,2.66rem)] font-bold  leading-[1.04] text-[#d9b27a]`}>
                  <span data-cms-field="influence__title">{renderTitleAmpersands(influenceTitle)}</span>
                </h2>
                <p className={`${bodyFontClass} mx-auto mt-5 max-w-[52rem] text-[clamp(1rem,1.18vw,1.18rem)] leading-[1.72] text-[#efede9]`} data-cms-field="influence__body">
                  {renderNormalAmpersands(influenceBody)}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-black py-20 md:py-28">
          <LandingRevealGroup className="w-full" threshold={0.12}>
            <div className={podcastPageShellClassName} data-animate style={revealStyle(760, 24)}>
              <h2 className={`${headingFontClass} ${podcastTitleWrapClassName} mx-auto max-w-[18ch] text-center text-[clamp(2rem,4vw,4rem)] font-semibold  text-[#d9b27a]`}>
                <span data-cms-field="cooperation__title">{renderTitleAmpersands(cooperationTitle)}</span>
              </h2>
            </div>

            <div className="mt-14 space-y-[1.125rem]" data-animate style={revealStyle(820, 26)}>
              {businessCooperationLogoRows.map((row, rowIndex) => (
                <div key={rowIndex} className="relative overflow-hidden">
                  <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[3.5rem] bg-[linear-gradient(to_right,#080d09,transparent)] md:w-[7.5rem]" />
                  <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[3.5rem] bg-[linear-gradient(to_left,#080d09,transparent)] md:w-[7.5rem]" />
                  <div
                    className={`flex w-max will-change-transform hover:[animation-play-state:paused] ${
                      rowIndex === 0
                        ? "animate-[business-cooperation-marquee_40s_linear_infinite] lg:translate-x-[3vw]"
                        : "animate-[business-cooperation-marquee-reverse_40s_linear_infinite] [animation-delay:-8s] lg:-translate-x-[3vw]"
                    }`}
                  >
                    {[0, 1].map((copyIndex) => (
                      <div
                        key={copyIndex}
                        aria-hidden={copyIndex === 1}
                        className="flex shrink-0 gap-[0.875rem] pr-[0.875rem] md:gap-[1.5rem] md:pr-[1.5rem]"
                      >
                        {row.map((logoItem, logoIndex) => (
                          <a
                            key={`${copyIndex}-${logoIndex}-${logoItem.logo}-${logoItem.label}`}
                            href={logoItem.href || "#"}
                            target={logoItem.href ? "_blank" : undefined}
                            rel={logoItem.href ? "noreferrer" : undefined}
                            aria-label={logoItem.label}
                            className="flex h-[2.0125rem] w-[7rem] shrink-0 items-center justify-center rounded-[0.25rem] bg-white text-center shadow-[0_1rem_2.25rem_rgba(0,0,0,0.16)] md:h-[2.8rem] md:w-[9.75rem] md:rounded-[0.375rem] lg:h-[5.6rem] lg:w-[15vw]"
                            data-cms-field={
                              logoItem.cmsItemId
                                ? pageContentItemFieldKey("cooperation", logoItem.cmsItemId, "href")
                                : undefined
                            }
                          >
                            <img
                              src={logoItem.logo}
                              alt={logoItem.label}
                              className="h-[52%] w-auto max-w-[72%] object-contain"
                              data-cms-field={
                                logoItem.cmsItemId
                                  ? pageContentItemFieldKey("cooperation", logoItem.cmsItemId, "icon")
                                  : undefined
                              }
                            />
                          </a>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </LandingRevealGroup>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
