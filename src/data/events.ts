export type EventItem = {
  slug: string;
  category: string;
  title: string;
  date: string;
  summary: string;
  image: string;
};

export type LocalizedEventItem = EventItem & {
  localizedCategory: string;
  localizedTitle: string;
  localizedSummary: string;
};

const eventImages = ["/assets/event/event1.png", "/assets/event/event2.png", "/assets/event/event3.png"];

function withImage(event: Omit<EventItem, "image">, index: number): EventItem {
  return {
    ...event,
    image: eventImages[index % eventImages.length],
  };
}

export const events: EventItem[] = [
  withImage(
    {
      slug: "kinsey-kang-hong-kong-legal-counsel",
      category: "Tiger Dynamics",
      title: "Kinsey Kang Yanan was engaged as Hong Kong Legal Counsel of Tiger Partners",
      date: "20231117",
      summary:
        "Tiger Partners is honored to announce that Kinsey Kang Yanan, barrister-at-law, has been engaged as our Hong Kong Legal Counsel. From this day on, Tiger Partners will work with Kinsey wholeheartedly to provide our clients with more professional, efficient and convenient legal services.",
    },
    0,
  ),
  withImage(
    {
      slug: "chambers-forum-beijing-2023",
      category: "Industry News",
      title: "Tiger Partners sponsored and was invited to the Chambers Forum: Beijing 2023",
      date: "20230406",
      summary:
        "From April 12 to 13, the Chambers Forum: Beijing 2023 will be held at the Hilton Hotel of Wangfujing in Beijing. As one of the sponsors, Tiger Partners was invited to participate in the forum.",
    },
    1,
  ),
  withImage(
    {
      slug: "shifoying-nanli-community-pairing",
      category: "Tiger Dynamics",
      title: "Party Branch of Tiger Partners entered into a pairing relationship with Shifoying Nanli Community",
      date: "20230329",
      summary:
        "The Party branch committee of Tiger Partners responded to the call for building a law-based community and entered into a pairing relationship with Shifoying Nanli Community to contribute legal professional support.",
    },
    2,
  ),
  withImage(
    {
      slug: "tiger-partners-third-anniversary",
      category: "Tiger Dynamics",
      title: "Today, Tiger Partners is three years old!",
      date: "20221218",
      summary:
        "This year, Tiger Partners upheld its spirit of serving clients, achieved growth, received recognition from legal media and ranking institutions, and continued to pursue innovation and breakthroughs.",
    },
    3,
  ),
  withImage(
    {
      slug: "cietac-cup-voice-of-moot-sponsor",
      category: "Industry News",
      title: 'Tiger Partners sponsored the "CIETAC Cup" Voice of Moot series of training activities',
      date: "20221108",
      summary:
        'Tiger Partners served as silver sponsor of the Voice of Moot series ahead of the 20th "CIETAC Cup", supporting young lawyers and students in international arbitration and trade law training.',
    },
    4,
  ),
  withImage(
    {
      slug: "tigers-fellowship-winners-announced",
      category: "Tiger Dynamics",
      title: "TIGERS FELLOWSHIP winners were announced",
      date: "20220725",
      summary:
        "After material review and interviews, the Scholarship Selection Committee announced Wang Lingyu, Cao Jiahao and Ma Yanru as the 2022 TIGERS FELLOWSHIP winners.",
    },
    5,
  ),
  withImage(
    {
      slug: "hook-cartoon-character-joins",
      category: "Tiger Dynamics",
      title: "Breaking News! An important guest announced the official joining of Tiger Partners",
      date: "20220710",
      summary:
        "Tiger Partners launched the Cartoon Character Naming activity on TigerPark Mini Program and, after receiving 176 submissions, named the new character Hook.",
    },
    6,
  ),
  withImage(
    {
      slug: "tigers-fellowship-launched",
      category: "Tiger Dynamics",
      title: "TIGERS FELLOWSHIP was officially launched",
      date: "20220616",
      summary:
        "Tiger Partners officially launched the TIGERS FELLOWSHIP program to support young people who are committed to dispute resolution.",
    },
    7,
  ),
  withImage(
    {
      slug: "china-business-law-awards-2022",
      category: "Industry News",
      title: "Tiger Partners won the China Business Law Awards 2022",
      date: "20220615",
      summary:
        "China Business Law Journal announced the China Business Law Awards 2022, and Tiger Partners was honored to be included in two awards.",
    },
    8,
  ),
  withImage(
    {
      slug: "official-account-mini-program-upgrade",
      category: "Tiger Dynamics",
      title: "Tiger Partners upgraded the functions of the official account and launched a new Mini Program",
      date: "20220609",
      summary:
        "Tiger Partners upgraded its official account functions and launched the TigerPark Mini Program to improve user experience, service access, recruitment delivery and interactive communication.",
    },
    9,
  ),
  withImage(
    {
      slug: "legalband-2022-top-law-firms-lawyers",
      category: "Industry News",
      title: "Tiger Partners and Liu Yuxuan, Wan Li were selected into LEGALBAND 2022 rankings",
      date: "20220517",
      summary:
        "LEGALBAND released China's top law firms and lawyers rankings in 2022, selecting Tiger Partners as a Firm to Watch and recognizing Liu Yuxuan and Wan Li.",
    },
    10,
  ),
  withImage(
    {
      slug: "benchmark-litigation-2022-dispute-resolution",
      category: "Industry News",
      title: "Tiger Partners was listed in Asia-Pacific & China on Dispute Resolution of 2022 by Benchmark Litigation",
      date: "20220510",
      summary:
        'Benchmark Litigation released its Asia-Pacific and China dispute resolution lists for 2022, and Tiger Partners won the title of "Notable Firm" in Beijing commercial disputes.',
    },
    11,
  ),
  withImage(
    {
      slug: "legalband-rising-law-firm-2022-nomination",
      category: "Industry News",
      title: "Tiger Partners was nominated as Rising Law Firm of 2022 by LEGALBAND",
      date: "20220331",
      summary:
        'LEGALBAND released its 2022 China Law Awards nominations list, and Tiger Partners was nominated as "Rising Law Firm of the Year".',
    },
    12,
  ),
  withImage(
    {
      slug: "wan-li-dalian-international-arbitration-court",
      category: "Industry News",
      title: "Wan Li was engaged as the 6th arbitrator of Dalian International Arbitration Court",
      date: "20220322",
      summary:
        "Dalian International Arbitration Court released its sixth-session arbitrator list, and Wan Li, partner of Tiger Partners, was selected as an arbitrator.",
    },
    13,
  ),
  withImage(
    {
      slug: "liu-yuxuan-china-business-law-journal-a-list",
      category: "Industry News",
      title: "Liu Yuxuan was listed in The A-List by China Business Law Journal",
      date: "20220125",
      summary:
        "China Business Law Journal released The A-List for 2021, and Liu Yuxuan, Managing Partner of Tiger Partners, was selected among elite Chinese legal practitioners.",
    },
    14,
  ),
  withImage(
    {
      slug: "zoe-zhang-joined-as-partner",
      category: "Tiger Dynamics",
      title: "Welcome Zoe Zhang has officially joined the firm as a partner",
      date: "20220124",
      summary:
        "Tiger Partners announced that Zoe Zhang officially joined the firm as a partner, strengthening the firm's cross-border commercial dispute resolution capability.",
    },
    15,
  ),
  withImage(
    {
      slug: "alb-china-2022-firms-to-watch",
      category: "Industry News",
      title: "Tiger Partners was listed as ALB China 2022 Firms to Watch",
      date: "20220120",
      summary:
        "Asian Legal Business announced the ALB China 2022 Firms to Watch list, and Tiger Partners was selected for its dispute resolution capability and market reputation.",
    },
    16,
  ),
  withImage(
    {
      slug: "second-anniversary-dinner",
      category: "Tiger Dynamics",
      title: "Tiger Partners held its 2nd Anniversary Dinner",
      date: "20211231",
      summary:
        "Tiger Partners held its second anniversary dinner at InterContinental Hotel, TongYing Center, with friends of the firm gathering to review achievements and future plans.",
    },
    17,
  ),
  withImage(
    {
      slug: "beijing-lawyers-association-professional-committee",
      category: "Industry News",
      title: "Three partners of Tiger Partners were elected as members of Beijing Lawyers Association professional committees",
      date: "20211015",
      summary:
        "Liu Yuxuan, Xu Min and Wan Li were elected as members of professional committees of the 11th Beijing Lawyers Association, reflecting their expertise in specialized fields.",
    },
    18,
  ),
  withImage(
    {
      slug: "benchmark-litigation-china-2021-recommendation",
      category: "Industry News",
      title: "Tiger Partners and Liu Yuxuan, Wan Li were recommended by Benchmark Litigation China",
      date: "20210610",
      summary:
        "Benchmark Litigation released its 2021 China dispute resolution guide, naming Tiger Partners a Notable Firm and recommending Liu Yuxuan and Wan Li for dispute resolution in Beijing.",
    },
    19,
  ),
  withImage(
    {
      slug: "china-business-law-awards-2021-firm-to-watch",
      category: "Industry News",
      title: "Tiger Partners was listed as Firm to Watch",
      date: "20210518",
      summary:
        'China Business Law Journal announced the China Business Law Awards 2021, and Tiger Partners was selected as a "Firm to Watch".',
    },
    20,
  ),
  withImage(
    {
      slug: "ssq-alb-china-law-awards-2021-nomination",
      category: "Industry News",
      title: "Tiger Partners was nominated as Rising Law Firm of the Year in the 18th Annual SSQ ALB China Law Awards 2021",
      date: "20210416",
      summary:
        "Asian Legal Business published the shortlist of the SSQ 2021 ALB China Law Awards, and Tiger Partners was shortlisted for Rising Law Firm of the Year.",
    },
    21,
  ),
  withImage(
    {
      slug: "liu-yuxuan-legalband-2021-top-lawyers",
      category: "Industry News",
      title: "Liu Yuxuan was listed in the top lawyers in China by LEGALBAND in 2021",
      date: "20210414",
      summary:
        'LEGALBAND listed Liu Yuxuan among top lawyers in China in 2021 and selected him as a Rising Star in dispute resolution litigation.',
    },
    22,
  ),
  withImage(
    {
      slug: "top-40-rising-stars-2021",
      category: "Industry News",
      title: "Liu Yuxuan and Wan Li were identified in the list of Top 40 Rising Stars 2021",
      date: "20210315",
      summary:
        "China Business Law Journal released its Top 40 Rising Stars 2021 list, recognizing Liu Yuxuan and Wan Li for commercial dispute resolution expertise and client reputation.",
    },
    23,
  ),
  withImage(
    {
      slug: "foreign-related-lawyer-talent-pool",
      category: "Industry News",
      title: "Xu Min and Wan Li were selected into the Foreign-Related Lawyer Talent Pool of the Beijing Bar Association",
      date: "20201014",
      summary:
        "The Beijing Lawyers Association released its Foreign-Related Lawyer Talent Pool, and Xu Min and Wan Li were selected after strict selection and publicity procedures.",
    },
    24,
  ),
  withImage(
    {
      slug: "private-lending-judicial-protection-rules",
      category: "Tiger Watch",
      title: "The gun goes off, the gold is gone - interpretation of private lending judicial protection rule adjustments",
      date: "20200902",
      summary:
        "Tiger Partners analyzed the Supreme People's Court amendments to private lending trial rules, including the reduced judicial protection cap on private lending rates.",
    },
    25,
  ),
  withImage(
    {
      slug: "alb-interview-liu-yuxuan",
      category: "Industry News",
      title: "ALB report: An up-and-comer in dispute resolution - Interview Liu Yuxuan",
      date: "20200526",
      summary:
        "Asian Legal Business interviewed Liu Yuxuan, Managing Partner of Tiger Partners, and published the article in the May 2020 issue of ALB China.",
    },
    26,
  ),
  withImage(
    {
      slug: "alb-former-red-circle-lawyers-boutique-firm",
      category: "Industry News",
      title: "ALB report: Former red circle firm lawyers leave to set up boutique firm Tiger Partners",
      date: "20200311",
      summary:
        "Asian Legal Business reported on the establishment of Tiger Partners as a boutique firm specializing in complex commercial dispute resolution.",
    },
    27,
  ),
];

const zhEventCopy: Record<string, { category: string; title: string; summary: string }> = {
  "20231117": {
    category: "虎诉动态",
    title: "康亚男（Kinsey Kang Yanan）出庭大律师受聘为虎诉的香港法律顾问",
    summary:
      "虎诉律师事务所非常荣幸地宣布，康亚男出庭大律师已受聘为本所香港法律顾问。自即日起，虎诉将与康大律师竭诚携手，为客户提供更优质、专业、高效便捷的法律服务。",
  },
  "20230406": {
    category: "行业资讯",
    title: "虎诉赞助2023钱伯斯北京论坛并受邀参会",
    summary: "2023钱伯斯北京论坛将在北京王府井希尔顿酒店举办。北京虎诉律师事务所作为赞助商之一，受邀参与本次论坛活动。",
  },
  "20230329": {
    category: "虎诉动态",
    title: "虎诉律所党支部与石佛营南里社区结对共建法治社区",
    summary: "中共北京虎诉律师事务所支部委员会积极响应共建法治社区的号召，与石佛营南里社区委员会达成结对关系，为推进社区法治进程贡献智慧。",
  },
  "20221218": {
    category: "虎诉动态",
    title: "今天，虎诉三周岁啦！",
    summary: "过去三年，虎诉在朋友们的信任与支持下持续成长，并将从华贸中心迁址远洋国际，走向更广阔的天地。",
  },
  "20221108": {
    category: "行业资讯",
    title: "虎诉赞助“贸仲杯”Voice of Moot系列培训活动",
    summary: "虎诉律师事务所荣幸成为Voice of Moot系列培训活动银牌赞助商，期待共同为青年法律人提供了解国际仲裁及国际贸易法热点问题的平台。",
  },
  "20220725": {
    category: "虎诉动态",
    title: "“2022虎行风从奖学金”获奖名单揭晓",
    summary: "经过材料审查及面谈，奖学金评选委员会最终确定王苓瑜、曹家豪、马延茹三位获奖者。",
  },
  "20220710": {
    category: "虎诉动态",
    title: "重磅消息！某重量级嘉宾宣布正式加入虎诉",
    summary: "虎诉在TigerPark小程序上发起卡通形象命名活动，经过全体成员投票，最终它拥有了自己的名字——虎氪。",
  },
  "20220616": {
    category: "虎诉动态",
    title: "“虎行风从奖学金”项目正式启动",
    summary: "虎诉正式启动“虎行风从奖学金”项目，持续关注有志于从事争议解决业务的年轻人的成长。",
  },
  "20220615": {
    category: "行业资讯",
    title: "虎诉荣获2022商法卓越律所大奖",
    summary: "虎诉律师事务所荣幸入选《商法》“卓越律所大奖2022”执业领域奖项的境内争议解决榜单，以及综合奖项的卓越公益律所榜单。",
  },
  "20220609": {
    category: "虎诉动态",
    title: "虎诉升级公众号功能并上线全新小程序",
    summary: "虎诉对公众号功能进行升级，并上线全新TigerPark小程序，进一步提升用户体验和服务触达效率。",
  },
  "20220517": {
    category: "行业资讯",
    title: "虎诉律师事务所及刘煜暄、万力律师入选LEGALBAND 2022榜单",
    summary: "虎诉律师事务所及合伙人刘煜暄、万力律师分别入选2022年度LEGALBAND中国顶级律所及顶级律师排行榜。",
  },
  "20220510": {
    category: "行业资讯",
    title: "虎诉荣登Benchmark Litigation 2022年度亚太地区及中国地区争议解决榜单",
    summary: "虎诉被Benchmark Litigation评为2022年度中国北京地区商业纠纷领域“值得关注的律所”。",
  },
};

export function localizeEvent(event: EventItem, language: "en" | "zh"): LocalizedEventItem {
  const zh = language === "zh" ? zhEventCopy[event.date] : undefined;

  return {
    ...event,
    localizedCategory: zh?.category ?? event.category,
    localizedTitle: zh?.title ?? event.title,
    localizedSummary: zh?.summary ?? event.summary,
  };
}

export function formatEventDate(date: string) {
  const year = date.slice(0, 4);
  const month = Number(date.slice(4, 6));
  const day = Number(date.slice(6, 8));
  const monthNames = ["Jan.", "Feb.", "Mar.", "Apr.", "May.", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];

  return `${monthNames[month - 1]} ${day}, ${year}`;
}
