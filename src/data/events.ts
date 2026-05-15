import { event2Events } from "./event2Events";
import { eventInfoImagesByDate } from "./eventInfoImages";

export type EventCopy = {
  category: string;
  title: string;
  summary: string;
  content: string[];
};

export type EventItem = EventCopy & {
  slug: string;
  date: string;
  image: string;
  detailImages?: string[];
  detailVideos?: string[];
  zh: EventCopy;
};

export type LocalizedEventItem = EventItem & {
  localizedCategory: string;
  localizedTitle: string;
  localizedSummary: string;
  localizedContent: string[];
};

const allEvents: EventItem[] = [
  {
    "slug": "kinsey-kang-hong-kong-legal-counsel",
    "date": "20231117",
    "image": "/assets/event/event1.png",
    "category": "Tiger Dynamics",
    "title": "Kinsey Kang Yanan was engaged as Hong Kong Legal Counsel of Tiger Partners",
    "summary": "Tiger Partners is honored to announce that Kinsey Kang Yanan, barrister-at-law, has been engaged as our Hong Kong Legal Counsel. From this day on, Tiger Partners will work with Kinsey wholeheartedly to provide our clients with more professional, efficient and convenient legal services.",
    "content": [
      "Tiger Partners is honored to announce that Kinsey Kang Yanan, barrister-at-law, has been engaged as our Hong Kong Legal Counsel. From this day on, Tiger Partners will work with Kinsey wholeheartedly to provide our clients with more professional, efficient and convenient legal services.",
      "Kinsey was called to the Hong Kong Bar in 2012, and passed the 1st Guangdong - Hong Kong - Macau Greater Bay Area (GBA) Legal Professional Examination in 2021. Kinsey specializes in commercial disputes, employment disputes, cross-border litigation and international arbitration. She also constantly provides Hong Kong legal advice to Mainland companies and individuals in cross-border transactions and arbitration.",
      "[图片",
      "Educational Background",
      "Bachelor of Civil Law (BCL), University of Oxford",
      "Post-graduate Certificate in Laws (PCLL), City University of Hong Kong",
      "Bachelor of Laws with First Class Honours (LLB), City University of Hong Kong",
      "Main Socail Position",
      "Member of Standing Committee on Mainland, Hong Kong Bar Association",
      "Vice-President of Hong Kong Legal Professional Advancement Association",
      "Guest Lecturer of City University of Hong Kong and Peking University",
      "Arbitrator of Nanjing Arbitration Commission",
      "Arbitrator of Dongguan Arbitration Commission",
      "Kinsey also served as Deputy Presiding Officer of the Hong Kong Labour Tribunal from June 2021 to January 2022.",
      "Academic Achievements",
      "Practical Guidance for Personal Injury Claims (2015 LexisNexis)",
      "Annotated Ordinance--Mainland Judgments (Reciprocal Enforcement) Ordinance (2021 LexisNexis)",
      "[图片"
    ],
    "zh": {
      "category": "",
      "title": "虎诉动态 | 康亚男（Kinsey Kang Yanan）出庭大律师受聘为虎诉的香港法律顾问",
      "summary": "虎诉律师事务所非常荣幸地宣布，康亚男（Kinsey Kang Yanan）出庭大律师已受聘为本所香港法律顾问。自即日起，虎诉将与康大律师竭诚携手，以为我们的客户提供更优质专业、高效便捷的法律服务。",
      "content": [
        "虎诉律师事务所非常荣幸地宣布，康亚男（Kinsey Kang Yanan）出庭大律师已受聘为本所香港法律顾问。自即日起，虎诉将与康大律师竭诚携手，以为我们的客户提供更优质专业、高效便捷的法律服务。",
        "康大律师于2012年取得香港执业大律师资格，并于2021年通过第一届粤港澳大湾区律师执业资格考试。其主要执业领域为商业纠纷、雇佣纠纷、跨境诉讼、国际仲裁，曾多次为内地企业和个人在跨境交易和仲裁中提供香港法律意见。",
        "[图片",
        "教育背景",
        "牛津大学法学硕士 （BCL）",
        "香港城市大学法学专业证书 （PCLL）",
        "香港城市大学法学一等荣誉学士学位 （LLB）",
        "主要社会职务",
        "香港大律师公会内地事务委员会委员",
        "香港法律专业协进会副会长",
        "香港城市大学、北京大学客座讲师",
        "南京仲裁委员会仲裁员",
        "东莞仲裁委员会仲裁员",
        "此外，康大律师还曾于2021年6月至2022年1月期间担任香港劳资审裁处暂委审裁官。",
        "学术成就",
        "Practical Guidance for Personal Injury Claims (2015 LexisNexis)",
        "Annotated Ordinance--Mainland Judgments (Reciprocal Enforcement) Ordinance (2021 LexisNexis)",
        "康大律师深耕于跨境争议解决领域多年，并具有极高的社会责任感和学术造诣，其加入必将给虎诉注入新鲜且充沛的能量，极大提升虎诉为客户提供跨境争议解决法律服务的广度和深度！",
        "[图片"
      ]
    }
  },
  {
    "slug": "chambers-forum-beijing-2023",
    "date": "20230406",
    "image": "/assets/event/event2.png",
    "category": "Industry News",
    "title": "Tiger Partners sponsored and was invited to the Chambers Forum: Beijing 2023",
    "summary": "From April 12 to 13, the Chambers Forum: Beijing 2023 will be held at the Hilton Hotel of Wangfujing in Beijing. As one of the sponsors, Tiger Partners was invited to participate in the forum.",
    "content": [
      "From April 12 to 13, the Chambers Forum: Beijing 2023 will be held at the Hilton Hotel of Wangfujing in Beijing. As one of the sponsors, Tiger Partners was invited to participate in the forum.",
      "It is reported that this forum will focus on compliance, centering on the rich connotation of corporate compliance and the latest regulatory policies, legal practices and market trends, and discuss hot compliance issues, PE/VC, revision of arbitration law, ad hoc arbitration and other related sub-topics in global investment and M&A."
    ],
    "zh": {
      "category": "",
      "title": "行业资讯 | 虎诉赞助2023钱伯斯北京论坛并受邀参会",
      "summary": "4月12日至13日，2023钱伯斯北京论坛将在北京王府井希尔顿酒店举办。北京虎诉律师事务所作为赞助商之一，受邀参与本次论坛活动。",
      "content": [
        "4月12日至13日，2023钱伯斯北京论坛将在北京王府井希尔顿酒店举办。北京虎诉律师事务所作为赞助商之一，受邀参与本次论坛活动。",
        "据悉，本次论坛将以合规为主线，围绕企业合规的丰富内涵和最新的监管政策、法律实操和市场趋势，对全球投资并购中的合规热点问题、私募和风险投资、仲裁法修订和临时仲裁等多个相关子话题进行讨论"
      ]
    }
  },
  {
    "slug": "shifoying-nanli-community-pairing",
    "date": "20230329",
    "image": "/assets/event/event3.png",
    "category": "Tiger Dynamics",
    "title": "Tiger Dynamics | Party Branch of Tiger Partners entered into a pairing relationship with Shifoying Nanli Community to build a law-based community",
    "summary": "In order to deepen the implementation of Xi Jinping Thought on the Rule of Law and fulfill practice \"Good Lawyers to the satisfaction of the Party and the people\", the Party branch committee of Tiger Partners responded positively to the call of the Party Committee of the Lawyers' Profession of Chaoyang District of Beijing for building a law-based community and entered into a pairing relationship with the community committee of Shifoying Nanli in order to make use of the advantages of the legal profession to contribute to promoting the construction of the rule of law in the community.",
    "content": [
      "In order to deepen the implementation of Xi Jinping Thought on the Rule of Law and fulfill practice \"Good Lawyers to the satisfaction of the Party and the people\", the Party branch committee of Tiger Partners responded positively to the call of the Party Committee of the Lawyers' Profession of Chaoyang District of Beijing for building a law-based community and entered into a pairing relationship with the community committee of Shifoying Nanli in order to make use of the advantages of the legal profession to contribute to promoting the construction of the rule of law in the community.",
      "Pairing to build a law-based community",
      "On 29th March, 2023, Liu Yuxuan, Managing Partner of Tiger Partners, and Chen Mingjing, a trainee solicitor who is a commissary in charge of publicity of the Party Branch of Tiger Partners, went to Shifoying Nanli Community, where they were greeted by Zhang Xuan, the secretary of the Party Committee of the community, Liu Yunchao, the deputy secretary of the Party Committee of the community, and Lu Dongmei, the head of the Station.",
      "The committee first introduced the thorny problems and related background in recent work, and consulted the legally compliant solutions. Mr. Liu Yuxuan gave the corresponding advice from a professional point of view. Later, the two sides discussed the far-reaching value of this \"pairing relationship\" to build a law-based community, and actively exchanged views on the working modes and plans for the next step.",
      "Remain true to our original aspiration and to keep pressing ahead",
      "The Party Branch of Tiger Partners will adhere to the working method of \" the Party Branches and the Communities in pairing, the Party and the Masses hand in hand\". By organizing party branch’s members and actively mobilizing the law firm’s masses, we plan to set up the Tiger Partners’ legal service team, and better carry out the legal services oriented to the community. We look forward to truly become \"Good Lawyers to the satisfaction of the Party and the people\"."
    ],
    "zh": {
      "category": "",
      "title": "虎诉动态 | 虎诉律所党支部与石佛营南里社区结对共建法治社区",
      "summary": "为进一步深入贯彻习近平法治思想，践行“做党和人民满意的好律师”，中共北京虎诉律师事务所支部委员会积极响应北京市朝阳区律师行业党委提出的共建法治社区的号召，与石佛营南里社区委员会达成结对关系，以期利用法律专业优势，为推进社区法治进程贡献智慧。",
      "content": [
        "为进一步深入贯彻习近平法治思想，践行“做党和人民满意的好律师”，中共北京虎诉律师事务所支部委员会积极响应北京市朝阳区律师行业党委提出的共建法治社区的号召，与石佛营南里社区委员会达成结对关系，以期利用法律专业优势，为推进社区法治进程贡献智慧。",
        "结对共建法治社区",
        "3月29日，北京虎诉律师事务所管理合伙人刘煜暄律师与虎诉党支部宣传委员陈明静实习律师前往石佛营南里社区，社区党委的张铉书记、刘贇超副书记与陆冬梅站长进行了接待。",
        "社区首先介绍了近期工作中面临的棘手问题与相关背景，并向虎诉党支部咨询合法合规的解决途径。刘煜暄律师从专业的角度给予了相应的建议。后续，双方探讨了本次“结对子”共建法治社区的深远价值，并就下一步的工作模式与计划积极交换了意见。",
        "不忘初心，砥砺前行",
        "虎诉党支部将坚持运用“组织结对子，党群手拉手”的工作方法，组织支部党员并积极动员单位群众组建虎诉法律服务队，更好地开展面向社区的法律服务，以真正成为“党和人民满意的好律师”。"
      ]
    }
  },
  {
    "slug": "tiger-partners-third-anniversary",
    "date": "20221218",
    "image": "/assets/event/event4.png",
    "category": "Tiger Watch",
    "title": "Today, Tiger Partners is three years old!",
    "summary": "This year, we always uphold the spirit of Tiger Partners to serve our clients, culminating in a 30 percent increase in revenue compared to the previous year.",
    "content": [
      "This year, we always uphold the spirit of Tiger Partners to serve our clients, culminating in a 30 percent increase in revenue compared to the previous year.",
      "This year, we have been highly praised in our pursuit of excellence by many well-known legal media and rating agencies. We and our partners were honored to be recognised by Asian Legal Business, China Business Law Journal, LEGALBAND, Benchmark Litigation and others.",
      "This year, we still keep pursuing innovation and seeking breakthroughs, such as the launch of new Mini Program TigerPark, the creation of the cartoon character \"Hook\", the initiation of the first TIGERS FELLOWSHIP program, and the upgrading of the official account function......",
      "Over the past three years, Tiger Partners has faced an exceptionally tough growth environment. Thankfully, with the trust and support of every friends, this \"little tiger\" has thrived nonetheless!",
      "On the occasion of our third birthday, we are very pleased to share with you the great news that Tiger Partners will be relocated from China Central Place to Sino-Ocean International Center next year! In the new year, with the support and witness of all friends, we look forward to moving to a broader world!"
    ],
    "zh": {
      "category": "",
      "title": "虎诉动态 | 今天，虎诉三周岁啦！",
      "summary": "这一年，我们继续秉持“虎诉精神”为各位客户服务，并最终实现了相较去年30%的业务收入增长；",
      "content": [
        "这一年，我们继续秉持“虎诉精神”为各位客户服务，并最终实现了相较去年30%的业务收入增长；",
        "这一年，我们追求卓越的精神依旧为众多知名法律媒体及评级机构所欣赏，先后获得了《亚洲法律杂志》(Asian Legal Business)、《商法》(China Business Law Journal)、LEGALBAND、Benchmark Litigation等机构对虎诉及其各位合伙人的认可；",
        "这一年，我们依旧在不断尝试创新、寻求突破，上线了全新小程序TigerPark，推出了虎诉卡通形象“虎氪”，启动了第一届“虎行风从奖学金”项目，对公众号进行了功能升级……",
        "过去的三年，虎诉所面临的成长环境异常严峻。然而庆幸的是，在各位朋友的信任与支持下，这只“小老虎”还是茁壮成长了起来！",
        "值此三周岁生日，我们非常高兴能与各位分享一个好消息：虎诉明年将从华贸中心迁址远洋国际！新的一岁，期待虎诉在各位朋友的支持与见证下，走向更广阔的天地！"
      ]
    }
  },
  {
    "slug": "cietac-cup-voice-of-moot-sponsor",
    "date": "20221108",
    "image": "/assets/event/event5.png",
    "category": "Industry News",
    "title": "Tiger Partners sponsored the \"CIETAC Cup\" Voice of Moot series of training activities",
    "summary": "The 20th \"CIETAC Cup\" will be held from November 28 to December 2, 2022. More than 1000 players from more than 90 law schools, including the United Kingdom, Vietnam, the Netherlands, Uzbekistan, Hong Kong, China and Macao, China, participated in the \"CIETAC Cup\" this year.",
    "content": [
      "The 20th \"CIETAC Cup\" will be held from November 28 to December 2, 2022. More than 1000 players from more than 90 law schools, including the United Kingdom, Vietnam, the Netherlands, Uzbekistan, Hong Kong, China and Macao, China, participated in the \"CIETAC Cup\" this year.",
      "With the competition just around the corner, Tiger Patners is honored to be the silver sponsor of the Voice of Moot series of training events, and looks forward to working with CIETAC and other well-known law firms in the industry to provide a platform for young lawyers to enhance their understanding of international arbitration and international trade law, and to effectively connect theory with practice.",
      "[图片",
      "On the road of realizing its vision, Tiger partners has always paid attention to the growth of young people who are willing to engage in dispute resolution, for which the TIGERS FELLOWSHIP 2022 was established.",
      "Finally, Tiger Partners wishes that this event will be a great success and that all the young participants will have a wonderful performance!"
    ],
    "zh": {
      "category": "",
      "title": "行业资讯 | 虎诉赞助“贸仲杯”Voice of Moot系列培训活动",
      "summary": "第二十届“贸仲杯”将于2022年11月28日至12月2日举行，本届“贸仲杯”汇集来自全国以及境外，包括英国、越南、荷兰、乌兹别克斯坦、中国香港、中国澳门在内的90余所法学院校1000余名参赛队员参与比赛。",
      "content": [
        "第二十届“贸仲杯”将于2022年11月28日至12月2日举行，本届“贸仲杯”汇集来自全国以及境外，包括英国、越南、荷兰、乌兹别克斯坦、中国香港、中国澳门在内的90余所法学院校1000余名参赛队员参与比赛。",
        "开赛在即，虎诉律师事务所荣幸成为Voice of Moot系列培训活动银牌赞助商，并期待与贸仲、业内各知名律师事务所等机构共同为青年法律人提供一个增强对国际仲裁及国际贸易法热点问题的了解、实现理论与实务的有效衔接的平台。",
        "[图片",
        "虎诉在实现自身愿景的道路上，始终关注有志于从事争议解决业务的年轻人的成长，此前的“2022虎行风从奖学金”便是在此初衷之下设立的活动。",
        "最后，虎诉预祝本次活动圆满举办，各位参赛的年轻选手们亦能有精彩表现！"
      ]
    }
  },
  {
    "slug": "tigers-fellowship-winners-announced",
    "date": "20220725",
    "image": "/assets/event/event6.png",
    "category": "Tiger Dynamics",
    "title": "TIGERS FELLOWSHIP winners were announced",
    "summary": "On June 16, we officially launched the 2022 TIGERS FELLOWSHIP program. After the first round of review material and a second round of interviews, considering devotion of scholarship applicants for application, understanding and willingness of dispute resolution, ability to learn, understandi and express, and other dimensions, the Scholarship Selection Committee ultimately decided on three winners, who were Wang Lingyu, Cao Jiahao and Ma Yanru.",
    "content": [
      "On June 16, we officially launched the 2022 TIGERS FELLOWSHIP program. After the first round of review material and a second round of interviews, considering devotion of scholarship applicants for application, understanding and willingness of dispute resolution, ability to learn, understandi and express, and other dimensions, the Scholarship Selection Committee ultimately decided on three winners, who were Wang Lingyu, Cao Jiahao and Ma Yanru.",
      "the Top Award of Scholarship: Wang Lingyu",
      "the Second Award of Scholarship: Cao Jiahao",
      "the Third Award of Scholarship: Ma Yanru",
      "Please enter the official account for more information of the above winners (link: https://mp.weixin.qq.com/s/N-0VcbH9LqHZjmYADe5teg).",
      "The publicity period of this award list is from July 25 to July 28. If you have any objection to the results, you can submit a written objection application to the Scholarship Selection Committee during the publicity period. Email address: fellowship@tigerpartners.cn",
      "We have received 34 copies of applications from applicants. During the evaluation phase, the Scholarship Selection Committee carefully read the materials subscribed by the applicants and really appreciated all of your unique shining points. We are shocked by the excellence of contemporary law students and deeply moved by their sincere hearts. Moreover, we are full of confidence in the prospects for development of rule of law in China.",
      "Finally, we would like to thank you again for your attention and support. We cherish it and will always take it as the motivation to move forward."
    ],
    "zh": {
      "category": "",
      "title": "虎诉动态 | “2022虎行风从奖学金”获奖名单揭晓",
      "summary": "6月16日，我们正式启动了“2022虎行风从奖学金”项目。经过第一轮的材料审查以及第二轮的面谈，综合考虑各位奖学金申请者对本次奖学金申请的投入程度、对争议解决业务的理解与从事意愿、学习能力、理解能力及表达能力等多个维度，奖学金评选委员会最终确定了王苓瑜、曹家豪、马延茹三位获奖者。",
      "content": [
        "6月16日，我们正式启动了“2022虎行风从奖学金”项目。经过第一轮的材料审查以及第二轮的面谈，综合考虑各位奖学金申请者对本次奖学金申请的投入程度、对争议解决业务的理解与从事意愿、学习能力、理解能力及表达能力等多个维度，奖学金评选委员会最终确定了王苓瑜、曹家豪、马延茹三位获奖者。",
        "一等奖：王苓瑜",
        "二等奖：曹家豪",
        "三等奖：马延茹",
        "了解上述获奖者的更多信息，请进入公众号。（链接：https://mp.weixin.qq.com/s/N-0VcbH9LqHZjmYADe5teg）",
        "本获奖名单公示期为7月25日-7月28日，如对公示结果有异议，可在公示期内向奖学金评选委员会提出书面异议申请。",
        "联系邮箱：fellowship@tigerpartners.cn",
        "本次，我们共收到了34位奖学金申请者的申请材料。奖学金评审委员会在本次评奖的过程中，认真阅读了各位申请者准备的材料，看到了各位独特的闪光点，我们为当代法律学子之优秀感到震撼，也为各位的赤诚之心而深受感动，更对中国法治事业的发展前景充满信心。",
        "最后，再次诚挚感谢各位对虎诉的关注与支持，我们十分珍视并将始终以之为前行的动力。"
      ]
    }
  },
  {
    "slug": "hook-cartoon-character-joins",
    "date": "20220710",
    "image": "/assets/event/event7.png",
    "category": "Tiger Dynamics",
    "title": "Breaking News! An important guest announced the official joining of Tiger Partners",
    "summary": "In order to welcome the official birth of this important guest, we launched the \"Cartoon Character Naming of Tiger Partners\" on TigerPark Mini Program on June 10. In just two days, we received 176 copies of registration information. After the vote of us, it finally obtained its own name - Hook! And let‘s see its detailed introduction. [图片",
    "content": [
      "In order to welcome the official birth of this important guest, we launched the \"Cartoon Character Naming of Tiger Partners\" on TigerPark Mini Program on June 10. In just two days, we received 176 copies of registration information. After the vote of us, it finally obtained its own name - Hook! And let‘s see its detailed introduction. [图片",
      "[图片"
    ],
    "zh": {
      "category": "",
      "title": "虎诉动态 | 重磅消息！某重量级嘉宾宣布正式加入虎诉……",
      "summary": "为了迎接这位重量级嘉宾的正式诞生，我们于6月10日在TigerPark小程序上发起了“虎诉卡通形象命名活动”。短短两天时间，我们收到了176位朋友的报名信息。经过虎诉全体成员的投票，最终它拥有了自己的名字——虎氪！接下来，请看它的详细介绍~",
      "content": [
        "为了迎接这位重量级嘉宾的正式诞生，我们于6月10日在TigerPark小程序上发起了“虎诉卡通形象命名活动”。短短两天时间，我们收到了176位朋友的报名信息。经过虎诉全体成员的投票，最终它拥有了自己的名字——虎氪！接下来，请看它的详细介绍~",
        "[图片",
        "[图片"
      ]
    }
  },
  {
    "slug": "tigers-fellowship-launched",
    "date": "20220616",
    "image": "/assets/event/event8.png",
    "category": "Tiger Dynamics",
    "title": "TIGERS FELLOWSHIP was officially launched",
    "summary": "[图片",
    "content": [
      "[图片"
    ],
    "zh": {
      "category": "",
      "title": "虎诉动态 | “虎行风从奖学金”项目正式启动",
      "summary": "[图片",
      "content": [
        "[图片"
      ]
    }
  },
  {
    "slug": "china-business-law-awards-2022",
    "date": "20220615",
    "image": "/assets/event/event9.png",
    "category": "Industry News",
    "title": "Tiger Partners won the China Business Law Awards 2022",
    "summary": "On June 15, China Business Law Journal, a well-known legal media, announced the results of the China Business Law Awards 2022, and Tiger Partners was honored to be included in two of the awards.",
    "content": [
      "On June 15, China Business Law Journal, a well-known legal media, announced the results of the China Business Law Awards 2022, and Tiger Partners was honored to be included in two of the awards.",
      "Practice Awards",
      "[图片",
      "General Awards",
      "[图片",
      "It is said that during the evaluation phase, firm candidates were scored based on three sources of analysis: the firm’s submissions; endorsement from client referees; and valid nominations from the industry. Apart from peer nominations, selections from government institutions, the judiciary and academia were also received. Based on months of research and evaluation, hundreds of submissions and more than 1,000 comments from corporate executives, in-house counsel and senior practitioners, the editorial team of China Business Journal finally selected the China Business Law Awards 2022."
    ],
    "zh": {
      "category": "",
      "title": "行业资讯 | 虎诉荣获2022商法卓越律所大奖",
      "summary": "6月15日，知名法律媒体《商法》（China Business Law Journal）公布了商法卓越律所大奖2022评选结果，虎诉律师事务所荣幸入选其中两类奖项榜单。",
      "content": [
        "6月15日，知名法律媒体《商法》（China Business Law Journal）公布了商法卓越律所大奖2022评选结果，虎诉律师事务所荣幸入选其中两类奖项榜单。",
        "执业领域奖项",
        "[图片",
        "综合奖项",
        "[图片",
        "据悉，本次评选阶段系主要根据三类资料进行评分：律所申报资料、客户证明人的反馈，以及来自业界的有效提名。提名来源亦十分多元，除了业界外，还包括政府机构、司法系统和学术界。基于长达数月的调研和评价、数百份参选资料及千余项来自企业高管、法务和资深律师的评价意见，《商法》编辑团队最终评选出2022年度商法卓越律所大奖。"
      ]
    }
  },
  {
    "slug": "official-account-mini-program-upgrade",
    "date": "20220609",
    "image": "/assets/event/event10.png",
    "category": "Tiger Dynamics",
    "title": "Tiger Partners upgraded the functions of the official account and launched a new Mini Program",
    "summary": "Since its establishment, Tiger Partners has always adhered to the deep legal expertise and extensive practical experience, as well as a distinctive commercial thinking, to provide customers with professional legal services and precise business solutions. At the same time, as one of the extremely vibrant, creative and inclusive law firms, Tiger Partners has been seeking to upgrade its services, in order to bring better user experience for clients and all other friends who pay great attention to the growth of us.",
    "content": [
      "Since its establishment, Tiger Partners has always adhered to the deep legal expertise and extensive practical experience, as well as a distinctive commercial thinking, to provide customers with professional legal services and precise business solutions. At the same time, as one of the extremely vibrant, creative and inclusive law firms, Tiger Partners has been seeking to upgrade its services, in order to bring better user experience for clients and all other friends who pay great attention to the growth of us.",
      "[图片",
      "In October last year, we launched an electronic case file management system, which greatly reduced the burden of case file management for clients. In the spring of this year, we started the construction project again. This project mainly includes the upgrading of the official account function and the online of the new Mini Program. Upgrading of Official Account Function",
      "Introduction of Law Firm",
      "Considering users' browsing habits on mobile devices, we have brought the law firm introduction to the official account. There is no need to skip to the official website link, users can learn our culture, team and industries on the official account.",
      "Delivery of Resume",
      "We have observed that the most common ways to apply for jobs at law firms include sending resumes through email and making indirect contacts through introductions. From the perspective of job seekers, these methods have many inconveniences, such as the availability and validity of the email address to which the resume was sent, and the unavailability of opportunities for introductions.",
      "Therefore, we specially built a resume delivery system in the official account. Users only need to fill in a few basic information and upload their resumes to complete the application of the posted jobs.",
      "Leaving a message",
      "We have observed that there are many people who are concerned about us conveying messages to us on different platforms. Therefore, we set up a message board function. If we can receive your comments and expectations on us, we will be delighted and take it as a goal to move forward.",
      "Online of the New Mini Program",
      "TigerPark is a communication platform for those who share the same belief and passion. Online or offline communication activities will be held here from time to time， and we hope you can find your partners here and get the courage to move on.",
      "Currently, TigerPark is launching a series of Tiger Partners Co-branded peripheral products, and will launch communication meetings, scholarships and other activities. After registering as a member, users can use the above functions to participate in activities, send resumes, leave messages, purchase peripheral products and so on.",
      "Upgrading of official account function and online of the new Mini Program this time, is a bold attempt made by our team after a long period of preparation. We believe that change and innovation provide inexhaustible power and infinite possibility for upward growth. On the road to realizing our vision, we look forward to each of you who are concerned anout us to witness it together."
    ],
    "zh": {
      "category": "",
      "title": "虎诉动态 | 虎诉升级公众号功能并上线全新小程序",
      "summary": "自成立以来，虎诉始终坚持以深厚的法律功底、丰富的实战经验及与众不同的商业化思维，为客户提供专业的法律服务与精准的商业解决方案。同时，作为一家极具生命力、创造力与包容性的律师事务所，虎诉一直在寻求服务的升级换代，以期为客户及其他所有关注虎诉成长的朋友带来更好的用户体验。",
      "content": [
        "自成立以来，虎诉始终坚持以深厚的法律功底、丰富的实战经验及与众不同的商业化思维，为客户提供专业的法律服务与精准的商业解决方案。同时，作为一家极具生命力、创造力与包容性的律师事务所，虎诉一直在寻求服务的升级换代，以期为客户及其他所有关注虎诉成长的朋友带来更好的用户体验。",
        "[图片",
        "去年10月，虎诉正式推出案件电子文件管理系统，极大减轻了客户管理案件文件的负担。 今年春季，虎诉再次启动了事务所建设项目，本次项目主要包括公众号功能的升级以及全新小程序的上线。",
        "公众号功能升级",
        "律所介绍",
        "考虑到用户在移动设备上的浏览习惯，虎诉在公众号内引入了律所介绍功能。无需跳转官网，用户在公众号内即可了解虎诉文化、虎诉团队及业务领域。",
        "简历投递",
        "据我们的观察，向律所求职的常见方式包括通过邮箱投递简历、通过他人介绍间接联系。从求职者的角度而言，这些方式具有诸多不便，例如简历投递邮箱地址的可得性与有效性存疑，他人介绍的机会可遇不可求。",
        "因此，虎诉特地在公众号内构建了简历投递系统，用户仅需填写几项基本信息并上传简历，即完成了向虎诉的求职信息投递。",
        "用户留言",
        "我们注意到，有许多关注虎诉的朋友在不同平台上向虎诉传递信息。因此，虎诉特设立留言板功能，若能收到您对虎诉的评价与期许，我们将不胜欣喜，并以之为目标昂扬前行。",
        "全新小程序上线",
        "TigerPark是为有共同信念与热爱的朋友打造的交流平台，这里将不定期举办线上或线下交流活动，期待大家在这里找到携手同行的伙伴并获得继续前行的勇气。",
        "近期，TigerPark正陆续上线虎诉联名款周边，并将推出交流会、奖学金等多种活动，用户注册成为会员后，即可使用上述报名参与活动、投递简历、留言、购买周边等功能。",
        "本次公众号功能的升级与全新小程序的上线，是虎诉团队在筹备良久后做出的一次大胆尝试。虎诉相信，改变与创新为向上生长提供了不竭动力与无限可能。在虎诉实现愿景的前行道路上，期待每一位关注虎诉的朋友共同见证。"
      ]
    }
  },
  {
    "slug": "legalband-2022-top-law-firms-lawyers",
    "date": "20220517",
    "image": "/assets/event/event11.png",
    "category": "Industry News",
    "title": "Tiger Partners and Mr. Liu Yuxuan, Mr. Wan Li were selected into the ranking of 2022 China's top law firms and top lawyers",
    "summary": "On May 17, LEGALBAND released the ranking of China's top law firms and lawyers in 2022. Tiger Partners and Mr. Liu Yuxuan, Mr. Wan Li were selected into the abovementioned ranking lists.",
    "content": [
      "On May 17, LEGALBAND released the ranking of China's top law firms and lawyers in 2022. Tiger Partners and Mr. Liu Yuxuan, Mr. Wan Li were selected into the abovementioned ranking lists.",
      "Tiger Partners was honored to be selected as \"Firm to Watch\" in the fields of dispute resolution (litigation) and compliance.",
      "Mr. Liu Yuxuan, the managing partner of Tiger Partners, was rated as the \"rising star\" in the field of dispute resolution (litigation).",
      "[图片",
      "Mr. Wan Li, the partner, was rated as the \"rising star\" in the field of compliance.",
      "[图片"
    ],
    "zh": {
      "category": "",
      "title": "行业资讯 | 虎诉及其合伙人刘煜暄、万力律师分别入选2022年度LEGALBAND中国顶级律所及顶级律师排行榜",
      "summary": "5月17日，LEGALBAND发布了2022年度中国顶级律所及顶级律师排行榜，虎诉律师事务所及其合伙人刘煜暄律师、万力律师分别入选前述两个榜单。",
      "content": [
        "5月17日，LEGALBAND发布了2022年度中国顶级律所及顶级律师排行榜，虎诉律师事务所及其合伙人刘煜暄律师、万力律师分别入选前述两个榜单。",
        "虎诉律师事务所荣幸入选为争议解决（诉讼）及合规两个领域的“潜力律所”。",
        "虎诉管理合伙人刘煜暄律师被评为争议解决（诉讼）领域的“后起之秀”。",
        "[图片",
        "虎诉合伙人万力律师被评为合规领域的“后起之秀”。",
        "[图片"
      ]
    }
  },
  {
    "slug": "benchmark-litigation-2022-dispute-resolution",
    "date": "20220510",
    "image": "/assets/event/event12.png",
    "category": "Industry News",
    "title": "Tiger Partners was listed in Asia-Pacific & China on Dispute Resolution of 2022 by Benchmark Litigation",
    "summary": "Benchmark Litigation released lists of recommended law firms and lawyers for dispute resolution in Asia Pacific and China of 2022 on May 9, and Tiger Partners won the title of \"Notable Firm\" in the field of commercial disputes resolution in Beijing area by Benchmark Litigation 2022.",
    "content": [
      "Benchmark Litigation released lists of recommended law firms and lawyers for dispute resolution in Asia Pacific and China of 2022 on May 9, and Tiger Partners won the title of \"Notable Firm\" in the field of commercial disputes resolution in Beijing area by Benchmark Litigation 2022.",
      "[图片",
      "It is said that the list is based on extensive interviews with litigators, arbitrators, dispute resolution specialists and their clients, as well as as well as examining recent casework handled by law firms and lawyers."
    ],
    "zh": {
      "category": "",
      "title": "行业资讯 | 虎诉荣登Benchmark Litigation2022年度亚太地区及中国地区争议解决榜单",
      "summary": "5月9日，Benchmark Litigation发布了2022年度亚太地区及中国地区争议解决推荐律所及律师排行榜，虎诉律师事务所被评为中国北京地区商业纠纷领域“值得关注的律所（Notable Firm）”。",
      "content": [
        "5月9日，Benchmark Litigation发布了2022年度亚太地区及中国地区争议解决推荐律所及律师排行榜，虎诉律师事务所被评为中国北京地区商业纠纷领域“值得关注的律所（Notable Firm）”。",
        "[图片",
        "据悉，本次榜单系通过与诉讼律师、仲裁员、争议解决专家及其客户进行广泛访谈，并审查律师事务所及其律师近期办理的案件而得出。"
      ]
    }
  },
  {
    "slug": "legalband-rising-law-firm-2022-nomination",
    "date": "20220331",
    "image": "/assets/event/event13.png",
    "category": "Industry News",
    "title": "Tiger Partners was nominated as Rising Law Firm of 2022 by LEGALBAND",
    "summary": "LEGALBAND released 2022 China Law Awards Nominations list on March 31, and Tiger Partners was nominated as \"Rising Law Firm of the Year\".",
    "content": [
      "LEGALBAND released 2022 China Law Awards Nominations list on March 31, and Tiger Partners was nominated as \"Rising Law Firm of the Year\".",
      "It is said that the Law Awards Nominations list has been made by China team of Legalband after several months of independent research, including but not limited to obtaining feedback from clients, peers and other research materials. The final winners will be announced in April.",
      "Established in December 2019, Tiger Partners is one of the extremely vibrant, creative and inclusive law firms. In just over two years after establishment, Tiger Partners has been recognized by many international legal rating agencies and media. Tiger Partners will always pursue the extreme and seek the perfection, and aim at winning lawsuits and fulfilling clients' business goals, as well as marching forward in high spirits down the road of \"becoming the best dispute resolution law firm in China\".",
      "[图片"
    ],
    "zh": {
      "category": "",
      "title": "行业资讯 | 虎诉获LEGALBAND2022年度最佳新锐律师事务所提名",
      "summary": "3月31日，LEGALBAND发布了2022年度中国法律卓越大奖提名名单，虎诉律师事务所荣获年度最佳新锐律师事务所提名。",
      "content": [
        "3月31日，LEGALBAND发布了2022年度中国法律卓越大奖提名名单，虎诉律师事务所荣获年度最佳新锐律师事务所提名。",
        "据悉，本次法律卓越大奖提名名单系由LEGALBAND大中华区调研团队历经数月，通过包括但不限于获取客户反馈、同行反馈及其他调研资料进行独立调研后最终确定，最终获奖结果将于4月揭晓。",
        "虎诉律师事务所成立于2019年12月，是极具生命力、创造力与包容性的律师事务所之一。在成立后短短两年多的时间里，虎诉已获得多家全球知名法律评级机构或媒体的认可。虎诉将始终追求极致与完美，一切以胜诉和客户的商业目标为导向，矢志不渝地在“成为中国最顶尖争议解决律师事务所”的道路上昂扬前行。",
        "[图片"
      ]
    }
  },
  {
    "slug": "wan-li-dalian-international-arbitration-court",
    "date": "20220322",
    "image": "/assets/event/event14.png",
    "category": "Industry News",
    "title": "Mr. Wan Li was engaged as the 6th arbitrator of Dalian International Arbitration Court",
    "summary": "Today, Dalian International Arbitration Court released the namelist of arbitrators for the 6th session, and Mr. Wan Li, partner of Tiger Partners, is honored to be the selected one.",
    "content": [
      "Today, Dalian International Arbitration Court released the namelist of arbitrators for the 6th session, and Mr. Wan Li, partner of Tiger Partners, is honored to be the selected one.",
      "[图片",
      "Mr. Wan specializes in commercial dispute resolution, specifically foreign-related commercial litigation and arbitration. He has also made breakthroughs in the fields of IP-related disputes as well as matters involving both criminal and civil proceedings. Wan Li’s clients come from many industries including finance, investment, maritime, aviation, insurance, industrial manufacturing, pharmaceutical, real estate, culture and entertainment, e-sports and ect.",
      "In addition, Ms. Zoe Zhang, another partner , is engaged by Qingdao Arbitration Commission as the arbitrator.",
      "[图片",
      "Zoe Zhang specializes in commercial arbitration and litigation, and especially foreign related arbitration and international arbitration. The major sectors of her practice involve international sale of goods, construction, real estate, joint venture, equity transfer, intellectual properties, energy etc."
    ],
    "zh": {
      "category": "",
      "title": "行业资讯 | 虎诉万力律师受聘大连国际仲裁院（大连仲裁委员会）第六届仲裁员",
      "summary": "今日，大连国际仲裁院（大连仲裁委员会）发布了第六届仲裁员增聘名单，虎诉律师事务所的合伙人万力律师荣幸入选。",
      "content": [
        "今日，大连国际仲裁院（大连仲裁委员会）发布了第六届仲裁员增聘名单，虎诉律师事务所的合伙人万力律师荣幸入选。",
        "[图片",
        "万力律师专注于商事争议解决，尤以处理涉外商事诉讼和仲裁见长，并且在知识产权争议以及刑事民事交叉领域取得了突破。万力律师服务的行业客户涵盖金融、投资、海事、航空、保险、工业制造、医药、房地产、文化娱乐、电子竞技等多个领域。",
        "此外，虎诉律师事务所的合伙人张莉律师受聘于青岛仲裁委员会担任仲裁员。",
        "[图片",
        "张莉律师的专业领域为仲裁和诉讼，尤其擅长涉外仲裁和国际仲裁；主要领域包括国际货物买卖、建筑工程、房地产、中外合资、股权转让、知识产权和能源等多个领域。"
      ]
    }
  },
  {
    "slug": "liu-yuxuan-china-business-law-journal-a-list",
    "date": "20220125",
    "image": "/assets/event/event15.png",
    "category": "Industry News",
    "title": "Mr. Liu Yuxuan was listed in \"The A-List\" by China Business Law Journal",
    "summary": "On January 24, 2021, China Business Law Journal released “The A-List” for related businesses in 2021 in P.R.C. Liu Yuxuan, Managing Partner of Tiger Partners was selected as “The A-List”.",
    "content": [
      "On January 24, 2021, China Business Law Journal released “The A-List” for related businesses in 2021 in P.R.C. Liu Yuxuan, Managing Partner of Tiger Partners was selected as “The A-List”.",
      "The China Business Law Journal editorial team asserted that The A-List is based on extensive research conducted by China Business Law Journal. To identify the elite lawyers for the Chinese market, we turned to thousands of in-house counsels in China and around the world, as well as partners at Chinese and international law firms, and asked them to tell us which lawyers should make the cut. After months of review, the final list that we have produced reflects the nominations received from professionals at a wide range of Chinese and international companies, law firms and other organizations, combined with the China Business Law Journal editorial team’s years of collective experience in documenting and analyzing China’s legal market.",
      "[图片",
      "Liu Yuxuan is the managing partner of Tiger Partners, a member of the commercial arbitration committee of the Beijing Lawyers Association, and Sichuan Arbitration Research Center. Liu had over 12 years of practicing experience in dispute resolution. Before founding Tiger Partners, he worked for several top Chinese law firms, including Fangda Partners, King & Wood Mallesons and Zhong Lun Law Firm. Liu specializes in high-end civil and commercial litigation and arbitration, both domestic and foreign. His practice areas cover commerce and transactions; private equity; corporate equity and control; finance; media and entertainment; and real estate and construction, among others.",
      "Liu was featured by Asian Legal Business as An Up-and-Comer in Dispute Resolution and identified in the list of Top 40 Rising Stars 2021 by China Business Law Journal and 2021 Recommended Lawyers for Dispute Resolution in Beijing by Benchmark Litigation China. Liu was also recommended as a Leading Individual in dispute resolution litigation in the list of 2021 China Top Ranked Lawyers by LEGALBAND, and a Notable Practitioner in dispute resolution in China Legal Market 2020 by Asia Law Profiles."
    ],
    "zh": {
      "category": "",
      "title": "行业资讯 | 虎诉刘煜暄律师入选2021年度“The A-List 法律精英”名册",
      "summary": "1月24日，知名法律媒体《商法》（China Business Law Journal）公布了2021年度中国相关业务“The A-List 法律精英”名册，虎诉律师事务所的管理合伙人刘煜暄律师荣列其中。",
      "content": [
        "1月24日，知名法律媒体《商法》（China Business Law Journal）公布了2021年度中国相关业务“The A-List 法律精英”名册，虎诉律师事务所的管理合伙人刘煜暄律师荣列其中。",
        "《商法》编辑部称，“法律精英”名册上的律师是根据广泛征集提名及调研评选而来。为了评选出在中国市场表现出色的私人执业律师，《商法》向中国和全球数以千计的企业法务及众多中外顶尖律师事务所的合伙人发出了调查邀请，听取业界的声音。经历数月的评审，最终获奖名单系基于大量中外企业、律师事务所和其他机构的专业人士的提名，并结合《商法》编辑团队多年来观察和分析中国法律市场的集体经验而得出。",
        "[图片",
        "刘煜暄律师现为虎诉律师事务所管理合伙人，北京市律师协会商事仲裁法律专业委员会委员，四川省仲裁研究中心法律人库成员。刘律师在争议解决领域拥有12年以上的执业经验，专长于代理境内外高端民商事诉讼、仲裁案件，其业务范围涵盖商业与交易、私募股权、公司股权与控制权争夺、金融、传媒及娱乐、房地产及建设工程等各个领域。",
        "刘煜暄律师曾被《亚洲法律杂志》（Asian Legal Business）誉为“争议解决领域的耀眼新星”；并入选《商法》（China Business Law Journal）40位2021中国业务法律新星（Rising Stars 2021 Top 40）榜单、Benchmark Litigation China 2021北京地区争议解决推荐律师榜单；荣获2021年度LEGALBAND中国顶级律师排行榜 “争议解决·诉讼”领域的“后起之秀”、《亚洲法律概况》（Asialaw Profiles）2020年度中国法律市场“争议解决”领域“知名律师”等荣誉称号。"
      ]
    }
  },
  {
    "slug": "zoe-zhang-joined-as-partner",
    "date": "20220124",
    "image": "/assets/event/event16.png",
    "category": "Tiger Dynamics",
    "title": "Welcome Zoe Zhang has officially joined the firm as a partner",
    "summary": "Tiger Partners is pleased to announce that Zoe Zhang has officially joined the firm as a partner. Before joining Tiger Partners, Zoe was working with the Dispute Resolution Team of Zhong Lun Law Firm as an equity partner. We are in the process of fulfilling registration formalities for Zoe’s transfer.",
    "content": [
      "Tiger Partners is pleased to announce that Zoe Zhang has officially joined the firm as a partner. Before joining Tiger Partners, Zoe was working with the Dispute Resolution Team of Zhong Lun Law Firm as an equity partner. We are in the process of fulfilling registration formalities for Zoe’s transfer.",
      "Zoe specializes in commercial arbitration and litigation, and especially foreign related arbitration and international arbitration. The major sectors of her practice involve international sale of goods, construction, real estate, joint venture, equity transfer, intellectual properties, energy etc. Most of Zoe’s clients are multinational corporations, foreign-invested enterprises, private equity funds and large state-owned enterprises.",
      "Having been practicing for over 10 years, Zoe has represented clients in over 100 commercial disputes, most of which are foreign related or international arbitration cases. The applicable rules of those arbitration cases include a variety of domestic and international institutional rules, as well as ad hoc rules, such as CIETAC Rules, BAC Rules, UNCITRAL Rules, HKIAC Administered Rules, ICC Rules, and SIAC Rules. Hearings were conducted in China, Hong Kong, Singapore, India and other jurisdictions. Zoe is proficient in handling cases in both Chinese and English, and effectively safeguards the best interests of the clients with her professional legal skills and extensive experience. Her ability is fully recognized by clients.",
      "Zoe is deeply involved in the field of arbitration, and most of the cases represented by her succeeded in the end. Zoe was appraised and elected to be one of the 2021 The Legal 500 Next Generation Partners in the \"Dispute Resolution and Arbitration\" field; she and her team were recommended by one of the clients as “the best arbitration lawyers I have met in China. Their attention to details and hard-working attitudes really makes them one of the most reliable legal representatives in China.”",
      "Zoe is also the Deputy Secretary General of the China International Investment Arbitration Forum (CIAF), a member of the organizing committee of China Young Arbitration Group (CYAG) and a panelist arbitrator of Qingdao Arbitration Commission.",
      "As an expert in foreign related arbitration and international arbitration, Zoe will certainly help strengthen Tiger Partners’ business in cross-border commercial dispute resolution, further enlarging its fields in dispute resolution. [图片"
    ],
    "zh": {
      "category": "",
      "title": "虎诉动态 | 虎诉迎来合伙人张莉律师加入",
      "summary": "虎诉律师事务所荣幸宣布，张莉律师自即日起以合伙人的身份正式加盟本所。在加入虎诉之前，张律师就职于中伦律师事务所争议解决部，担任权益合伙人职位。目前，张律师的相关转所手续正在办理中。",
      "content": [
        "虎诉律师事务所荣幸宣布，张莉律师自即日起以合伙人的身份正式加盟本所。在加入虎诉之前，张律师就职于中伦律师事务所争议解决部，担任权益合伙人职位。目前，张律师的相关转所手续正在办理中。",
        "张律师的专业领域为仲裁和诉讼，尤其擅长涉外仲裁和国际仲裁；执业领域涉及国际货物买卖、建筑工程、房地产、中外合资、股权转让、知识产权和能源等多个行业领域，代理客户多为跨国公司、外商投资企业、私募投资基金和大型国有企业等。",
        "执业十多年来，张律师参与代理了一百多起商事争议解决案件，其中绝大部分为涉外及国际仲裁案件；适用规则包括贸仲委（CIETAC）、北仲（BAC）、联合国贸法会（UNCITRAL）、港仲（HKIAC）、国际商会（ICC）、新仲（SIAC）等国内、国际仲裁机构及临时仲裁规则等；并在中国、香港、新加坡、印度等多地进行开庭。张律师在代理案件时能够熟练运用中英文双语办案，并以自身专业的法律职业技能及丰富的法律职业经验切实维护客户的最大利益，工作能力受到客户的充分认可。",
        "张律师深耕仲裁领域，其代理的绝大多数案件均取得良好的结果，维持着较高的胜率。在2021 The Legal 500亚太榜单中，张律师被评为“争议解决·仲裁”领域的明日之星（“Next Generation”）；她及她的团队被客户推荐为“我在中国遇到的最好的仲裁律师。他们对细节的关注把握以及刻苦的工作态度让他们成为中国最值得信赖的代理人之一。”",
        "此外，张律师还担任中国国际投资仲裁常设论坛（CIIAF）副秘书长，同时也是中国青年仲裁小组（CYAG）组委会成员以及青岛仲裁委员会仲裁员。",
        "作为在涉外及国际仲裁领域深耕多年的资深律师，张莉律师的加入将大大强化虎诉在跨境商事争议解决这一领域的力量，进一步扩大虎诉在争议解决领域的版图。",
        "[图片"
      ]
    }
  },
  {
    "slug": "alb-china-2022-firms-to-watch",
    "date": "20220120",
    "image": "/assets/event/event17.png",
    "category": "Industry News",
    "title": "Tiger Partners was listed as \" ALB China 2022 Firms to Watch\"",
    "summary": "Recently, Asian Legal Business (“ALB”), a leading international legal magazine, announced the list of ALB China 2022 Firms to Watch. Tiger Partners, with its exquisite professional ability and high-quality reputation in area of disputes resolution, was selected as \"Firm to Watch\".",
    "content": [
      "Recently, Asian Legal Business (“ALB”), a leading international legal magazine, announced the list of ALB China 2022 Firms to Watch. Tiger Partners, with its exquisite professional ability and high-quality reputation in area of disputes resolution, was selected as \"Firm to Watch\".",
      "ALB is owned by Thomson Reuters, the world’s leading source of intelligent information for businesses and professionals. ALB has selected the ten winning firms based on the following criteria:",
      "• Size and key practice areas of the firm;",
      "• Most important achievements of the firm over the years;",
      "• Major deals/litigations worked on by the firm in the past 12 months;",
      "• Growth in business, headcount and clients of the firm in the past 12 months;",
      "• Development strategies of the firm for the next 12 months.",
      "As a boutique law firm focusing on the settlement of major and complex civil and commercial disputes, Tiger Partners has deep legal expertise and extensive practical experience, as well as a distinctive commercial thinking. In the past year, Tiger Partners burst out great energy and achieved remarkable achievements, and has been widely recognized by clients and the industry as a real boutique law firm.",
      "Tiger Partners will continue to cultivate the legal profession in order to provide clients with more professional legal services and more accurate business solutions."
    ],
    "zh": {
      "category": "",
      "title": "行业资讯 | 虎诉入选2022年度ALB China精品律所榜单",
      "summary": "今日，《亚洲法律杂志》（Asian Legal Business，“ALB”）公布2022年度ALB China精品律所榜单，北京虎诉律师事务所（Tiger Partners）凭借过去一年在民商事争议解决领域的优秀业绩，成功入选该榜单。",
      "content": [
        "今日，《亚洲法律杂志》（Asian Legal Business，“ALB”）公布2022年度ALB China精品律所榜单，北京虎诉律师事务所（Tiger Partners）凭借过去一年在民商事争议解决领域的优秀业绩，成功入选该榜单。",
        "据悉，ALB评选出10家上榜律所系基于以下标准：",
        "- 律所的规模和主要业务领域；",
        "- 律所历年来最重要的成就；",
        "- 律所过去12个月中参与了哪些重要交易/诉讼；",
        "- 律所过去12个月的业务、人员、客户的增长情况；",
        "- 律所未来12个月的发展战略。",
        "凭借深厚的法律功底与丰富的实战经验，以及与众不同的商业化思维，虎诉自入围“年度最具潜力律师事务所大奖”不到1年的时间，便已飞速成长为获得行业高度认可及客户真切信赖的“精品律所”。",
        "虎诉将始终追求极致与完美，一切以胜诉和客户的商业目标为导向。"
      ]
    }
  },
  {
    "slug": "second-anniversary-dinner",
    "date": "20211231",
    "image": "/assets/event/event18.jpg",
    "category": "Tiger Dynamics",
    "title": "Tiger Partners held its 2nd Anniversary Dinner",
    "summary": "On December 18, 2021, the 2nd anniversary dinner of Tiger Partners was held in Rose Hall, 4th floor, InterContinental Hotel, TongYing Center, Sanlitun Village, Beijing. Many Friends of Tiger Partners gathered together to celebrate its 2nd birthday.",
    "content": [
      "On December 18, 2021, the 2nd anniversary dinner of Tiger Partners was held in Rose Hall, 4th floor, InterContinental Hotel, TongYing Center, Sanlitun Village, Beijing. Many Friends of Tiger Partners gathered together to celebrate its 2nd birthday.",
      "The dinner is divided into three parts.",
      "Part 1 | Review",
      "At the beginning of the dinner, Mr. Liu Yuxuan, the managing partner of Tiger Partners, on behalf of all the colleagues, expressed his most sincere thanks to all the guests and reported on the achievements of Tiger Partners in the past year.",
      "Part 2 | Strategy",
      "The second part was kicked off by Mr. Xu Min and Mr. Wan Li, both partners of Tiger Partners. Combined with their own practice areas, they shared with the guests the steps taken by Tiger Partners. Mr. Xu Min introduced the business of foreign-related arbitration and litigation, sports and e-sports, film and television entertainment. Mr. Wan Li mainly shared the business of compliance and criminal non prosecution.",
      "Of course, Tiger Partners still plays an important role in the legal business of dispute resolution in many industries such as private equity, finance, real estate and international trade. The legal services provided cover a variety of service types such as traditional dispute resolution, civil and criminal intersection, daily legal counsel of enterprises and so on.",
      "Part 3 | Blue Print",
      "The final part of the dinner was opened by Mr. Liu Yuxuan, the managing partner of Tiger Partners. He introduced the future development direction and the positioning of the law firm to the guests, and gave a brief report on the major measures expected to be implemented by Tiger Partners in the coming year of 2022.",
      "All the past is a preface. In the days to come, Tiger Partners will continue to run down the road of \"becoming the best dispute resolution law firm in China\", and we look forward to seeing the growth of Tiger Partners with you all.",
      "[图片"
    ],
    "zh": {
      "category": "",
      "title": "虎诉动态 | 虎诉举办2周年晚宴",
      "summary": "2021年12月18日，虎诉2周年晚宴于北京市三里屯通盈中心洲际酒店4楼玫瑰厅隆重举行。虎诉众多亲朋好友欢聚一堂，共同庆祝虎诉的2周岁生日。",
      "content": [
        "2021年12月18日，虎诉2周年晚宴于北京市三里屯通盈中心洲际酒店4楼玫瑰厅隆重举行。虎诉众多亲朋好友欢聚一堂，共同庆祝虎诉的2周岁生日。",
        "本次晚宴共分为三部分进行。",
        "Part 1 | 回顾篇",
        "晚宴伊始，虎诉的管理合伙人刘煜暄律师代表虎诉全体同仁，对各位来宾的到来表示最诚挚的感谢，并汇报了虎诉在2021年度取得的成绩。",
        "案件受理：虎诉2021年接受委托的新案件数量较2020年涨幅超过50%，办案质量稳步提升，并仍然保持着令人瞩目的胜诉率。",
        "荣誉表彰：2021年，虎诉及虎诉律师在中国高端商事争议解决领域先后获得《商法》(China Business Law Journal)、LEGALBAND、《亚洲法律杂志》(Asian Legal Business)、Benchmark Litigation等多家全球知名法律评级机构或媒体的认可。",
        "服务提升：虎诉2021年先后实行了多项举措以提升服务质量，包括：建立案件电子文件管理系统、重建事务所网站、更新事务所全套UI（version 2.0）、推出“结案卷宗”服务、推出虎诉的二次元形象及相关文创产品等。",
        "Part 2 | 布局篇",
        "晚宴的第2幕由虎诉合伙人许旻律师、万力律师揭开，他们分别结合自身擅长的业务与来宾分享了虎诉在这些领域迈出的步伐。许旻律师就涉外仲裁与诉讼、体育及电子竞技、影视文娱板块的业务进行了介绍，万力律师主要分享的是合规及刑事不起诉业务。",
        "当然，虎诉仍然在私募股权、金融、房地产、国际贸易等众多行业领域的争议解决法律业务中均扮演着重要角色，提供的法律服务更是覆盖传统争议解决、民刑交叉、企业日常法律顾问等多种服务类型。",
        "Part 3 | 展望篇",
        "晚宴的终章由管理合伙人刘煜暄律师开启，他向各位来宾介绍了虎诉未来的发展方向及律所定位，并就虎诉预计在新的一年推行的重大举措进行了简要汇报。",
        "凡是过往，皆为序章。在未来的日子里，虎诉矢志不渝地在“成为中国最顶尖争议解决律师事务所”的道路上狂奔，也期待每一个关注虎诉成长的你我共同见证。",
        "[图片"
      ]
    }
  },
  {
    "slug": "tiger-partners-provided-clients-with-an-electronic-case-file-management-system",
    "date": "20211016",
    "image": "/assets/event/event19.png",
    "category": "Tiger Dynamics",
    "title": "Tiger Partners provided clients with an electronic case file management system",
    "summary": "Tiger Partners launched an electronic case file management system to help clients store, review and manage case materials more efficiently throughout dispute resolution matters.",
    "content": [
      "Tiger Partners launched an electronic case file management system to help clients store, review and manage case materials more efficiently throughout dispute resolution matters."
    ],
    "zh": {
      "category": "",
      "title": "虎诉动态 | 虎诉为客户提供案件电子文件管理系统",
      "summary": "虎诉在面对客户时，始终视自己为⼀家“服务企业”，并始终着眼于客户服务的不断完善、升级。",
      "content": [
        "虎诉在面对客户时，始终视自己为⼀家“服务企业”，并始终着眼于客户服务的不断完善、升级。",
        "1、为什么要做这样⼀个系统？",
        "在过往服务客户的过程中，虎诉发现，与律师对接的法务管理者往往面对较为复杂的工作内容。日常法务工作（包括与各业务部门对接等）占据了其时间中的大量比重，工作邮件繁杂、钉钉或微信工作群的内容也是应接不暇——而这些往往直接导致诉讼或仲裁案件的相关文件材料在各种通讯工具或纸质材料中迷失——进而导致法务管理者们在企业诉讼或仲裁文件管理时遇到很难找到甚至是找不到文件的尴尬。",
        "另一种情况是，有的客户会委托我们处理若干起案件，每起案件材料不尽相同，但由于均为同一委托客户，涉案相关主体很可能是关联企业，企业名称较为近似，沟通律师也是同一律师，这则导致文件管理上可能出现更大障碍。",
        "回顾我们手头的文件工具：1、传统邮件，作为通讯工作，显得笨重而不合时宜；2、微信，除非区分工作微信与生活微信，否则信息爆炸，同时与同⼀律师交流多起案件亦容易发生文件错乱；3、钉钉，有的客户并不使用，且容易与微信相混淆，搞不清楚⼀个案件是在微信里交流过的，还是在钉钉里交流过的。",
        "基于以上种种，我们打算在线上打造一款文件管理系统，可以全面帮助企业法务管理者管理他们委托虎诉处理的案件——只要打开这个系统，登陆，不需要学习成本，就可以简单直接地实现全部案件文件的电子管理。",
        "2、这个系统能干什么？",
        "这是⼀个“纯粹的”、“简单的”系统。对于客户需求，我们选择“直给”，绝不给客户增加任何工作负担。客户需要可以随时登录查看，不需要时电子文件也永远存档在那里，不会丢失。",
        "[图片",
        "在这个系统里客户可以：1、看到已委托虎诉处理的每⼀起案件；2、直接上传客户认为与案件相关的材料（虎诉将进行文件分类，无需客户完成）；3、下载每起案件项下的全部文件材料（虎诉已经按照案件的不同类型作好了相应分类）；4、看到案件近期的重要时间节点（案件会议、庭审、提交文件的截止时间等）。",
        "[图片",
        "3、这个系统什么时候能与客户正式见面？",
        "我们目前已在大规模完善既有的案件电子文件，近期，我们将逐步与虎诉的客户们对接，将我们已完成的电子文件系统交到客户手中。",
        "届时，客户只需要登录账号，便可查看自己的各种文件信息。",
        "[图片",
        "4、未来虎诉的愿景",
        "虎诉期待为客户们提供极致的服务，除了电子文件系统之外，虎诉也会同步就传统纸版⽂件管理为客户提供服务——⼀切以客户的利益为导向，不停迭代我们的服务，以此感谢客户对于我们的选择。"
      ]
    }
  },
  {
    "slug": "beijing-lawyers-association-professional-committee",
    "date": "20211015",
    "image": "/assets/event/event20.png",
    "category": "Industry News",
    "title": "Three partners of Tiger Partners were elected as members of the Professional Committee of the 11th Beijing Lawyer Association",
    "summary": "On October 13, the Beijing Lawyers Association released the \"Supplementary List of Members of the Beijing Lawyers Association on Publishing Professional Committees (Board)\". Through strict procedures of selection and publication, Mr. Liu Yuxuan, Mr. Xu Min and Mr. Wan Li, partners of Tiger Partners, were elected as members of the 11th Professional Committee of the Beijing Lawyers Association with their extensive experience in specialized fields. Specifically,",
    "content": [
      "On October 13, the Beijing Lawyers Association released the \"Supplementary List of Members of the Beijing Lawyers Association on Publishing Professional Committees (Board)\". Through strict procedures of selection and publication, Mr. Liu Yuxuan, Mr. Xu Min and Mr. Wan Li, partners of Tiger Partners, were elected as members of the 11th Professional Committee of the Beijing Lawyers Association with their extensive experience in specialized fields. Specifically,",
      "Member of the Professional Committee of Commercial Arbitration Law",
      "Mr. Liu Yuxuan （Managing Partner）",
      "[图片",
      "Member of the Professional Committee on Legal Affairs of Film, Television and Entertainment",
      "Mr. Xu Min （Partner）",
      "[图片",
      "Member of the Professional Committee on Legal Affairs at the Intersection of Criminal and Civil Affairs",
      "Mr. Wan Li （Partner）",
      "[图片"
    ],
    "zh": {
      "category": "",
      "title": "行业资讯 | 虎诉三名合伙人当选第十一届北京律师协会专业委员会委员",
      "summary": "北京市律师协会于10月13日发布了《北京市律师协会关于发布专业委员会（研究会）委员增补名单》，经过严格的选拔和公示程序，虎诉律师事务所的合伙人刘煜暄律师、许旻律师和万力律师，凭借其在专业领域丰富的业务经验，成功当选北京市律师协会第十一届专业委员会委员。具体如下：",
      "content": [
        "北京市律师协会于10月13日发布了《北京市律师协会关于发布专业委员会（研究会）委员增补名单》，经过严格的选拔和公示程序，虎诉律师事务所的合伙人刘煜暄律师、许旻律师和万力律师，凭借其在专业领域丰富的业务经验，成功当选北京市律师协会第十一届专业委员会委员。具体如下：",
        "商事仲裁法律专业委员会委员：刘煜暄律师（管理合伙人） [图片",
        "影视与娱乐法律事务专业委员会委员：许旻律师（合伙人） [图片",
        "刑民交叉法律事务专业委员会委员：万力律师（合伙人） [图片",
        "这充分体现出虎诉律师具备扎实的执业技能和丰富的工作经验，注重专业化、精细化的业务素养，深耕于业务领域，并取得骄人成绩。同时也反映出虎诉丰富的实战经验和一贯的优异表现受到广泛认可。",
        "虎诉将继续放眼国际、深耕专业，一如既往地为客户提供优质的法律服务。"
      ]
    }
  },
  {
    "slug": "liu-yuxuan-and-sam-liao-were-invited-to-the-29th-cross-strait-youth-perspectives",
    "date": "20210720",
    "image": "/assets/event/event21.png",
    "category": "Industry News",
    "title": "Mr. Liu Yuxuan and  Mr. Liao Mengcheng Invited to Attend the 29th Cross-Strait Youth Vision Forum",
    "summary": "On July 19, 2021, the 29th Cross-Strait Youth Vision Forum, hosted by the Central Committee of the Revolutionary Committee of the Chinese Kuomintang, was held in Beijing. With the theme of \"Heart Across the Straits · Legal Resonance of Sincere Voices\", the forum gathered young legal professionals from both sides of the Taiwan Strait to engage in in-depth discussions on industrial development and legal issues concerning cross-strait exchanges. Liu Yuxuan, Managing Partner of Tiger Partners, and Liao Mengcheng, Senior Consultant of Tiger Partners, were honored to be invited to attend the forum.",
    "content": [
      "On July 19, 2021, the 29th Cross-Strait Youth Vision Forum, hosted by the Central Committee of the Revolutionary Committee of the Chinese Kuomintang, was held in Beijing. With the theme of \"Heart Across the Straits · Legal Resonance of Sincere Voices\", the forum gathered young legal professionals from both sides of the Taiwan Strait to engage in in-depth discussions on industrial development and legal issues concerning cross-strait exchanges. Liu Yuxuan, Managing Partner of Tiger Partners, and Liao Mengcheng, Senior Consultant of Tiger Partners, were honored to be invited to attend the forum.",
      "[图片]",
      "At the invitation of the Central Committee of the Revolutionary Committee of the Chinese Kuomintang, Mr. Liu Yuxuan paired up with Cheng Weilin, a trainee lawyer from Taiwan, to co-host the forum as representatives of legal practitioners across the two sides of the Taiwan Strait.",
      "At the invitation, Mr. Liao Mengcheng delivered a keynote speech entitled Policy and Legal Framework for the Development of Cross-Strait Sports Industry. From a legal perspective, he shared his insights and reflections on the development of the cross-strait sports industry.",
      "[图片]",
      "As the forum was drawing to a close, Mr. Liu Yuxuan remarked on stage that he sincerely hopes young people on both sides of the Strait will strengthen exchanges and interactions in the legal sector, jointly explore new pathways for cross-strait integrated development, and earnestly implement the principle of promoting integration through connectivity, welfare benefits, and emotional affinity, so as to jointly create a promising future for cross-strait youth.",
      "[图片]",
      "Finally, leaders and guests attending the forum took a group photo in front of the rostrum. The 29th Cross-Strait Youth Vision Forum themed Heart Across the Straits · Legal Resonance of Sincere Voices concluded successfully."
    ],
    "zh": {
      "category": "",
      "title": "虎诉动态 | 刘煜暄律师、廖孟誠律师受邀参加第29次两岸青年观点论坛",
      "summary": "2021年7月19日，由民革中央主办的第29次两岸青年观点论坛在京举行。本次论坛以“心跨两岸·法悦心声”为主题，两岸青年法律从业者围绕行业发展和两岸交流中的法律问题展开了热烈的座谈研讨。北京虎诉律师事务所管理合伙人刘煜暄律师、高级顾问廖孟誠律师非常荣幸地受邀参加了本次观点论坛。",
      "content": [
        "2021年7月19日，由民革中央主办的第29次两岸青年观点论坛在京举行。本次论坛以“心跨两岸·法悦心声”为主题，两岸青年法律从业者围绕行业发展和两岸交流中的法律问题展开了热烈的座谈研讨。北京虎诉律师事务所管理合伙人刘煜暄律师、高级顾问廖孟誠律师非常荣幸地受邀参加了本次观点论坛。",
        "[图片",
        "受民革中央的邀请，刘煜暄律师与来自台湾的实习律师程薇霖搭档，作为来自两岸律师和法律从业者的代表，共同主持了本次论坛。",
        "廖孟誠律师作为受邀嘉宾，以《两岸体育产业发展的政策与法律框架》为题发表了主旨演讲，从法律视角分享了他对两岸体育产业发展的关心与思考。",
        "[图片",
        "本次论坛接近尾声时，刘煜暄律师在台上表示，衷心希望广大青年朋友在法律领域多交流多沟通，共同探索海峡两岸融合发展新路，努力做到“以通促融”、“以惠促融”、“以情促融”，共同创造属于两岸青年的美好未来。",
        "[图片",
        "最后，参加本次论坛的领导与嘉宾在主席台前合影留念，“心跨两岸·法悦新声”——第29次两岸青年观点论坛圆满结束。"
      ]
    }
  },
  {
    "slug": "benchmark-litigation-china-2021-recommendation",
    "date": "20210610",
    "image": "/assets/event/event22.png",
    "category": "Industry News",
    "title": "Tiger Partners and Mr. Liu Yuxuan and Mr. Wan Li recommend by Benchmark Litigation China",
    "summary": "On June 10, 2021, the international legal rating agency benchmark ligation officially released the ranking guide for China in 2021, which is also the first time that benchmark ligation has launched the ranking guide for dispute resolution in China.",
    "content": [
      "On June 10, 2021, the international legal rating agency benchmark ligation officially released the ranking guide for China in 2021, which is also the first time that benchmark ligation has launched the ranking guide for dispute resolution in China.",
      "With its outstanding performance in the field of dispute resolution in the past year, Tiger Partners was awarded as \"Notable Firm\" in the field of commercial disputes resolution in Beijing in 2021. Mr. Liu Yuxuan and Mr. Wan Li, partners of Tiger Partners, were also listed as recommended lawyers for dispute resolution in Beijing in benchmark litigation China 2021."
    ],
    "zh": {
      "category": "",
      "title": "行业资讯 | 虎诉及合伙人荣获2021 Benchmark Litigation推荐",
      "summary": "2021年6月10日，国际法律评级机构Benchmark Litigation正式发布2021年中国地区排名指南，这也是Benchmark Litigation首次在中国地区推出争议解决排名指南。",
      "content": [
        "2021年6月10日，国际法律评级机构Benchmark Litigation正式发布2021年中国地区排名指南，这也是Benchmark Litigation首次在中国地区推出争议解决排名指南。",
        "虎诉凭借过去一年在争议解决领域的突出表现，荣膺Benchmark Litigation China 2021北京地区商业纠纷领域“优秀律所”称号。虎诉合伙人刘煜暄律师、万力律师也荣登Benchmark Litigation China 2021北京地区争议解决推荐律师榜单。"
      ]
    }
  },
  {
    "slug": "china-business-law-awards-2021-firm-to-watch",
    "date": "20210518",
    "image": "/assets/event/event23.png",
    "category": "Industry News",
    "title": "Tiger Partners was listed as \"Firm to Watch\"",
    "summary": "Recently, China Business Law Journal, a leading international legal magazine, announced the results of the China Business Law Awards 2021. Tiger partners, with its exquisite professional ability and high-quality reputation, was selected as a \"Firm to Watch\".",
    "content": [
      "Recently, China Business Law Journal, a leading international legal magazine, announced the results of the China Business Law Awards 2021. Tiger partners, with its exquisite professional ability and high-quality reputation, was selected as a \"Firm to Watch\".",
      "The award was based on the unremitting efforts in covering China’s legal market, CBLJ's team had selected the winners under each category after months of research and evaluation, getting direct feedback from the market, examining thousands of votes and recommendations from domestic and international corporate counsel, decision-makers from management, legal academics and government officials, and taking into account significant transactions, cases or other notable achievements in which each firm has been involved in the past year.",
      "As a boutique law firm focusing on the settlement of major and complex civil and commercial disputes, Tiger Partners has burst out great energy in the past year and achieved remarkable achievements, which has been widely recognized by clients and the industry.",
      "Tiger Partners will continue to cultivate the legal profession in order to provide clients with more professional legal services and more accurate business solutions."
    ],
    "zh": {
      "category": "",
      "title": "行业资讯 | 虎诉荣膺2021《商法》卓越律所大奖",
      "summary": "近日，国际领先法律期刊《商法》（China Business Law Journal）公布2021年《商法》卓越律所大奖评选结果，北京虎诉律师事务所（Tiger Partners），凭借精湛的专业能力和优质的客户口碑，被评选为“备受关注律所”。",
      "content": [
        "近日，国际领先法律期刊《商法》（China Business Law Journal）公布2021年《商法》卓越律所大奖评选结果，北京虎诉律师事务所（Tiger Partners），凭借精湛的专业能力和优质的客户口碑，被评选为“备受关注律所”。",
        "该奖项是《商法》团队基于对中国法律市场的长期关注，历经数月的调研和评选，通过市场的直接反馈和数千项来自境内外企业法务、管理层决策者、法律学者和政府官员的投票和推荐，同时结合各家律所在过去一年参与过的重要交易、案例或引人注目的其他成就，从数百家参选律所之中甄选而出。",
        "虎诉作为一家专注于重大复杂民商事争议解决的精品所，在过去一年迸发出巨大能量，取得令人瞩目的战绩，受到客户和业界的广泛认可。虎诉将继续深耕法律专业，以期为客户提供更专业的法律服务和更精准的商业解决方案。"
      ]
    }
  },
  {
    "slug": "ssq-alb-china-law-awards-2021-nomination",
    "date": "20210416",
    "image": "/assets/event/event24.png",
    "category": "Industry News",
    "title": "Tiger Partners was nominated as \"Rising Law Firm of the Year\" in the 18th Annual SSQ ALB China Law Awards 2021",
    "summary": "Recently, Asian legal business (\"ALB\") published the shortlist of SSQ 2021 ALB China law award. Tiger Partners, with its superb professional ability and outstanding achievements, was shortlisted for the \"Rising Law Firm of the Year\"",
    "content": [
      "Recently, Asian legal business (\"ALB\") published the shortlist of SSQ 2021 ALB China law award. Tiger Partners, with its superb professional ability and outstanding achievements, was shortlisted for the \"Rising Law Firm of the Year\"",
      "ALB is a cutting-edge legal magazine under Thomson Reuters and one of the most influential legal media in the world. This year's ALB China law award attracted more than 1400 nominations from more than 200 law firms and corporate legal teams, reaching a new high.",
      "As a boutique law firm focusing on the settlement of major and complex civil and commercial disputes, Tiger Partenrs has profound legal skills and rich practical experience. At the same time, Tiger Partenrs has a distinctive commercial thinking and continues to maintain close cooperation with leaders in emerging fields. It is one of the most viable, creative and inclusive law firms.",
      "Tiger Partners will continue to be committed to providing clients with more professional legal services, and accurate business solutions."
    ],
    "zh": {
      "category": "",
      "title": "行业资讯 | 虎诉入围SSQ二零二一年ALB中国法律大奖",
      "summary": "近日，《亚洲法律杂志》（Asian Legal Business,“ALB”）公布SSQ二零二一年ALB中国法律大奖入围名单，北京虎诉律师事务所（Tiger Partners），凭借精湛的专业能力和突出的成绩，入围“年度最具潜力律师事务所大奖”（Rising Law Firm of the Year）",
      "content": [
        "近日，《亚洲法律杂志》（Asian Legal Business,“ALB”）公布SSQ二零二一年ALB中国法律大奖入围名单，北京虎诉律师事务所（Tiger Partners），凭借精湛的专业能力和突出的成绩，入围“年度最具潜力律师事务所大奖”（Rising Law Firm of the Year）",
        "ALB是汤森路透旗下的尖端法律杂志，是全球最具影响力的法律媒体之一。今年的ALB中国法律大奖，吸引了超过200家律师事务所以及企业法务团队共计1400余项提名，提名再创新高。",
        "虎诉作为一家专注于重大复杂民商事争议解决的精品所，具备深厚的法律功底与丰富的实战经验。同时，虎诉拥有与众不同的商业化思维，并持续与新兴领域的领军者保持紧密合作，是最具生命力、创造力与包容性的律师事务所之一。",
        "百战常胜——虎诉始终以实现客户的需求为第一目标，以“胜诉”为争议解决法律服务的最终目的，并且一直保持着令人瞩目的案件胜诉率。虎诉将继续致力于为客户提供更为专业的法律服务、精准的商业解决方案及良好的用户体验。"
      ]
    }
  },
  {
    "slug": "liu-yuxuan-legalband-2021-top-lawyers",
    "date": "20210414",
    "image": "/assets/event/event25.png",
    "category": "Industry News",
    "title": "Mr. Liu Yuxuan was listed in the top lawyers in China by LEGALBAND in 2021",
    "summary": "In April 2021, Mr. Liu Yuxuan was listed in the top lawyers in China by LEGALBAND in 2021 and selected as the \"Rising Star\" in the field of \"dispute resolution litigation\" .",
    "content": [
      "In April 2021, Mr. Liu Yuxuan was listed in the top lawyers in China by LEGALBAND in 2021 and selected as the \"Rising Star\" in the field of \"dispute resolution litigation\" .",
      "[图片]"
    ],
    "zh": {
      "category": "",
      "title": "行业资讯 | 虎诉刘煜暄律师入选LEGALBAND2021年度中国顶级律师排行榜",
      "summary": "近日，Accurate Media旗下的专业法律评级机构LEGALBAND发布了2021年度中国顶级律师排行榜（Top Ranked Lawyers）。虎诉刘煜暄律师，凭借其在争议解决领域精湛的专业能力、丰富的实战经验，以及优质的客户口碑，在本次排行中被评选为“争议解决·诉讼”领域的“后起之秀”。",
      "content": [
        "近日，Accurate Media旗下的专业法律评级机构LEGALBAND发布了2021年度中国顶级律师排行榜（Top Ranked Lawyers）。虎诉刘煜暄律师，凭借其在争议解决领域精湛的专业能力、丰富的实战经验，以及优质的客户口碑，在本次排行中被评选为“争议解决·诉讼”领域的“后起之秀”。",
        "该榜单系LEGALBAND重点参考客户反馈信息，结合LEGALBAND中国区驻地调研团队对中国律师群体的长期关注，最终评选出的2021年度各法律服务领域的中国顶级律师，旨在为各类塔尖企业和个人选聘优秀律师提供权威性指南。",
        "刘煜暄律师于2019年12月创办虎诉，作为年轻一代的管理合伙人，刘煜暄律师表示，在刚过去的2021年第一季度，虎诉延续2020年的战绩，最新接受委托的争议解决案件达十余起，其中一半以上案件的标的金额超过人民币1亿元。虎诉必将继续追求卓越，为客户提供更加优质的争议解决法律服务。",
        "[图片"
      ]
    }
  },
  {
    "slug": "tiger-partners-welcomed-sam-liao-as-senior-counsel",
    "date": "20210319",
    "image": "/assets/event/event26.png",
    "category": "Tiger Dynamics",
    "title": "Tiger Partners welcomed Sam Liao as Senior Counsel",
    "summary": "Tiger Partners announced that Sam Liao joined the firm as Senior Counsel, further strengthening the firm's professional capability in dispute resolution and related legal services.",
    "content": [
      "Tiger Partners announced that Sam Liao joined the firm as Senior Counsel, further strengthening the firm's professional capability in dispute resolution and related legal services."
    ],
    "zh": {
      "category": "",
      "title": "虎诉动态 | 虎诉迎来廖孟誠（Sam Liao）加入担任高级顾问",
      "summary": "虎诉律师事务所荣幸宣布，廖孟誠（Sam Liao）从2021年3月19日起作为高级顾问加入本所，成为虎诉团队发展道路上的重要一员。",
      "content": [
        "虎诉律师事务所荣幸宣布，廖孟誠（Sam Liao）从2021年3月19日起作为高级顾问加入本所，成为虎诉团队发展道路上的重要一员。",
        "Sam执业领域包括：資本市場，跨境交易，體育法；同时精通包括英文、葡萄牙文、中文、西班牙文、闽南语等多种语言。",
        "Sam Liao是巴西国籍的华裔，有着客家血统的他在巴西出生长大，并在中国大陆度过了他的大部分学术和职业生涯。",
        "作为北京创业圈的核心力量，Sam成功助力许多初创企业的开展。他的加入，将为本所的跨境业务以及体育法带来全新的视角。",
        "Sam在北京大学法学院获得第一个法律学位，在苏黎世大学法学院接受体育法方面的培训，并取得杜克大学法学院的法学硕士学位。",
        "Sam的法律从业生涯起源于纽约市一家专注于资本市场交易的权威律师事务所，Sam将华尔街的经验运用到每一次服务之中，确保为客户提供最优质的服务。",
        "Sam不仅是一名专业的法律人士，还是国际剑道联盟五段剑士，并是北京修道馆的馆长。",
        "[图片",
        "虎诉律师事务所主任刘煜暄律师表示：“虎诉始终致力于为客户提供完善周到的服务，不断探索优质服务的边界。我们诚挚欢迎Sam加入虎诉，他的专业经验和全新视角将为虎诉注入新的活力。”"
      ]
    }
  },
  {
    "slug": "top-40-rising-stars-2021",
    "date": "20210315",
    "image": "/assets/event/event27.png",
    "category": "Industry News",
    "title": "Attorney Liu Yuxuan and Wan Li from Tiger Partners identified in the list of Top 40 Rising Stars 2021 elite up-and-coming lawyers in China",
    "summary": "The leading legal press China Business Law Journal recently released its list of Top 40 Rising Stars 2021 - 40 elite up-and-coming lawyers in China, recognizing their outstanding performance in their respective practice areas in the past year of 2020. Liu Yuxuan and Wan Li from Tiger Partners are identified in the list for their expertise in the field of commercial dispute resolution and for their excellent client reputation.",
    "content": [
      "The leading legal press China Business Law Journal recently released its list of Top 40 Rising Stars 2021 - 40 elite up-and-coming lawyers in China, recognizing their outstanding performance in their respective practice areas in the past year of 2020. Liu Yuxuan and Wan Li from Tiger Partners are identified in the list for their expertise in the field of commercial dispute resolution and for their excellent client reputation.",
      "The endorsement is based on extensive research conducted by China Business Law Journal, in which thousands of corporate legal counsel, executives and fellow lawyers were invited to nominate noticeable private practice lawyers. The 40 young lawyers on the list all have more than 10 years of legal experience. Their practices cover dispute resolution, M&A, capital markets, intellectual property and other specialized fields. The successful listing of Liu and Wan shows that Tiger Partners lawyers' professional legal services have won high recognition from clients and legal peers.",
      "[图片]",
      "Liu Yuxuan is a founding partner of Tiger Partners. He graduated from Peking University Law School and has been practicing law for more than twelve years. His wide ranging legal expertise, strong practice, and passionate courtroom presentation style are widely recognized by his clients and the industry at large.",
      "Prior to founding Tiger Partners, Mr. Liu worked as a partner at Jingtian & Gongcheng (2018-2019). Before that, Mr. Liu worked as a dispute resolution lawyer at Fangda Partners (2014-2018), King & Wood Mallesons (2012-2014), and Zhong Lun Law Firm (2009-2010).",
      "Mr. Liu specializes in representing complex commercial litigation and arbitration cases. He has extensive experience in the field of dispute resolution, with a focus on financial investments, corporate equity and control, real estate and construction projects, as well as games, sports, media, and entertainment.",
      "Mr. Liu has extensive hands-on case experience. In the year of 2020, Mr. Liu represented more than 30 complex commercial cases, including five cases worth over 100 million RMB, and a dozen cases worth more than 50 million RMB.",
      "For cases pertaining to financial investment, Mr. Liu provided post-investment dispute resolution legal services for several well-known domestic institutions, maintaining a high success rate. In the field of corporate control, Mr. Liu successfully helped the controller of a leading battery company in China in obtaining a series of successful judgments, which secured the control of the client over the company. In the field of construction Mr. Liu was entrusted, by a famous domestic energy enterprise, with the task of handling two complex construction cases, which involved a diverse subject matter and complex legal relationships. In the field of administrative litigation, Mr. Liu was entrusted to provide legal services for a listed company's production subsidiary and successfully exempted the client from paying tens of millions of RMB in administrative penalties.",
      "Based on his consistent outstanding performance in the field of dispute resolution, Mr. Liu was awarded the title of “Notable Practitioner” in the field of dispute resolution by Asia Law for 2020 and 2021, and was featured by a leading legal publication Asian Legal Business (“ALB”) as “An Up-and-Comer in Dispute Resolution”.",
      "[图片]",
      "Wan Li is a partner of Tiger Partners and is listed in the Foreign-Related Lawyer Talent Pool of the Beijing Bar Association. Combined, he has over twelve years of experience as a lawyer and an in-house counsel. He specializes in commercial dispute resolution, specifically foreign-related commercial litigation and arbitration. He has also made breakthroughs in the fields of IP-related disputes as well as matters involving both criminal and civil proceedings.",
      "He has represented numerous well-known and leading international and domestic companies in litigation and arbitration cases in PRC courts at all levels and arbitration institutions, including the China International Economic and Trade Arbitration Commission and the Beijing Arbitration Commission. He has also represented clients in initiating criminal charge proceedings against offenders.",
      "Wan Li’s clients come from many industries including finance, investment, maritime, aviation, insurance, industrial manufacturing, pharmaceutical, real estate, culture and entertainment, and e-sports.",
      "Wan Li is adept at applying his experience as a lawyer and an in-house counsel to understand his clients' needs and ultimate goals and is always able to provide insightful and actionable legal advice to help clients make the most favorable decisions. With excellent legal expertise, a high sense of responsibility, swift turnaround, and a passion for success, Wan Li is committed to helping clients realize their interests.",
      "Wan Li joined Tiger Partners in 2020. Prior to that, Mr. Wan worked as a dispute resolution lawyer in three top Chinese law firms, and as a Litigation Director in the legal department of an A-share listed company.",
      "Wan Li graduated from the University of International Relations with a Bachelor's degree in Law, and completed his Master's degree in Law (Maritime Law) at Dalian Maritime University."
    ],
    "zh": {
      "category": "",
      "title": "行业资讯｜虎诉两位律师入选《商法》Rising Stars 2021 TOP 40榜单",
      "summary": "近日，知名法律媒体《商法》（China Business Law Journal）发布了2021中国业务法律新星（Rising Stars 2021）榜单, 该榜单收录了40位中国精英律师, 以表彰他们上年度在各自擅长业务领域中的杰出表现。北京虎诉律师事务所的刘煜暄律师和万力律师，凭借其在商事争议解决领域精湛的专业能力和优质的客户口碑，荣列榜单。",
      "content": [
        "近日，知名法律媒体《商法》（China Business Law Journal）发布了2021中国业务法律新星（Rising Stars 2021）榜单, 该榜单收录了40位中国精英律师, 以表彰他们上年度在各自擅长业务领域中的杰出表现。北京虎诉律师事务所的刘煜暄律师和万力律师，凭借其在商事争议解决领域精湛的专业能力和优质的客户口碑，荣列榜单。",
        "据了解，该榜单是《商法》团队基于多年对中国法律市场的关注以及经验，对数以千计来自公司法务、高管以及律师同行的推荐进行严谨考量和评选的结果。本次上榜的40位青年精英律师皆有超过10年的法律从业经验，业务涵盖了争议解决、并购重组、资本市场、知识产权等多个专业领域。此次虎诉两位律师成功入选榜单，表明虎诉律师专业的法律服务赢得了客户及同行们的高度认可。",
        "[图片",
        "刘煜暄律师是北京虎诉律师事务所的创始合伙人，刘律师毕业于北京大学法学院，有超过12年的法律行业从业经验，其深厚的法律功底、精湛的执业技术，以及充满激情的庭审风格受到客户和业界的广泛认可。",
        "在创立北京虎诉律师事务所之前，刘律师曾先后在中伦律师事务所（2009-2010年），金杜律师事务所（2012-2014年），方达律师事务所（2014-2018年）担任律师，竞天公诚律师事务所（2018-2019年）担任合伙人律师。",
        "刘律师专长于代理高端复杂商事诉讼及仲裁案件，在争议解决领域拥有丰富的执业经验，主要领域包括金融投资、公司股权及控制权争夺、房地产及建设工程，以及游戏、体育、传媒与娱乐等。",
        "刘律师拥有丰富的案件实操经验，仅2020年一个自然年度，刘律师即代理复杂商事案件三十余起，其中：标的过亿的案件5起，标的5000万元以上的案件10余起。",
        "在这些案件中，金融投资领域方面，刘律师为国内数个知名金融投资机构提供投后争议解决法律服务，并保持了极高的胜诉率；公司控制权争夺领域方面，刘律师亦成功帮助国内某电池龙头企业的实际控制人取得系列案件的胜诉判决，稳固了客户对于公司的实际控制；建设工程领域方面，刘律师接受一家国内知名能源央企的委托，代理其处理两起复杂建设工程案件，案涉标的巨大且法律关系复杂；行政诉讼领域方面，刘律师受托为一家上市公司的生产主体提供法律服务，在历经行政处罚听证会及多轮法律意见交换后，成功为客户免除数千万元的行政处罚。",
        "刘律师基于其在争议解决领域一贯的出色表现，获得《亚洲法律概况》（Asia Law）2020年度以及2021年度争议解决领域“知名律师”称号，并接受法律媒体《亚洲法律杂志》（ALB）的专访，被该杂志誉为“争议解决领域的耀眼新星”。 [图片",
        "万力是北京虎诉律师事务所合伙人，并入选北京市律师协会涉外律师人才库。万力有超过12年律师和公司法务的复合工作经验。万力专注于商事争议解决，尤以处理涉外商事诉讼和仲裁见长，并且在知识产权争议以及刑事民事交叉领域取得了突破。",
        "万力曾代表众多国内外知名、业界领先企业，在中国各级法院以及中国国际经济贸易仲裁委员会、北京仲裁委员会等仲裁机构处理大量诉讼和仲裁案件，并且还曾处理多起通过刑事报案追究不法分子刑事责任的案件。万力的客户涵盖金融、投资、海事、航空、保险、工业制造、医药、房地产、文化娱乐、电子竞技等多个领域。",
        "万力善于运用其律师和公司法务的经验，理解客户的诉求和最终目的，并提出富有洞察力且可落地执行的法律意见，帮助客户做出最有利的决策。万力具有精湛的专业技能、高度的责任感、极高的响应速度以及寻找一切成功可能的热情，致力于帮助客户最终实现其利益。",
        "万力于2020年加入北京虎诉律师事务所。在加入虎诉律师事务所之前，万力律师曾在国内顶尖的三家律师事务所担任争议解决律师，并在某A股上市公司法务部任诉讼总监。",
        "万力毕业于国际关系学院获法学学士学位，毕业于大连海事大学获法学硕士学位（海商法专业）。"
      ]
    }
  },
  {
    "slug": "civil-code-interpretation-series-nine-major-changes-to-contract-termination-rule",
    "date": "20210224",
    "image": "/assets/event/event28.png",
    "category": "Tiger Watch",
    "title": "Civil Code Interpretation Series: Nine Major Changes to Contract Termination Rules (Part II)",
    "summary": "Tiger Partners continued its Civil Code interpretation series by reviewing the second part of the nine major changes to contract termination rules.",
    "content": [
      "Tiger Partners continued its Civil Code interpretation series by reviewing the second part of the nine major changes to contract termination rules."
    ],
    "zh": {
      "category": "",
      "title": "虎眼观察 | 《民法典》解读系列 - 合同解除规则之九大变化（下）",
      "summary": "虎诉律师针对《民法典》合同解除制度的相关规定进行梳理，梳理出九大变化，以飨读者。",
      "content": [
        "虎诉律师针对《民法典》合同解除制度的相关规定进行梳理，梳理出九大变化，以飨读者。",
        "变化六：明确违约责任不因合同解除而免除",
        "【法条变更】",
        "[图片",
        "【规范解读】",
        "在《民法典》出台前，关于违约责任与违约解除之间的关系，存在“排斥说”与“非排斥说”两种不同的观点。前者认为，违约解除排斥违约责任，由于违约责任以合同关系存续为前提，合同解除后合同关系溯及既往的消灭，不具有适用违约责任的基础。因此，《合同法》第97条中“赔偿损失”的范围，仅限于在返还不能或解除权人自行采取补救措施时所产生的直接损失。后者认为，违约解除与违约责任并不排斥，在债务人违约的情况下，债务不履行的损害赔偿已经成立，非违约方将合同解除时，业已存在的损害赔偿并不因此而化为乌有。",
        "（当然，在《最高人民法院关于当前形势下审理民商事合同纠纷案件若干问题的指导意见》(法发〔2009〕40号)和《最高人民法院关于审理买卖合同纠纷案件适用法律问题的解释》(法释〔2012〕8号)中也规定了，合同因违约而解除后，守约方主张继续适用违约金条款的，人民法院应予支持。）",
        "《民法典》第566条采取了“非排斥说”的观点，直接明确规定：合同违约解除与违约导致的损害赔偿可以并存，解除权人可以要求违约方承担违约责任。",
        "变化七：明确担保责任不因主合同解除而免除",
        "【法条变更】",
        "[图片",
        "【规范解读】",
        "《最高人民法院关于适用<中华人民共和国担保法>若干问题的解释》第十条规定：“主合同解除后，担保人对债务人应当承担的民事责任仍应承担担保责任。但是，担保合同另有约定的除外。” 该条款在司法实践中被普遍适用，此次《民法典》将其明确规定在第五百六十六条第三款，重申了担保责任不因主合同解除而免除。",
        "变化八：赋予违约方在一定条件下的解除权",
        "【法条变更】",
        "[图片",
        "【规范解读】",
        "关于违约方能否解除合同的问题，实践中存在两种观点。一种观点认为，合同解除作为非违约方的救济方式之一，只有非违约方才享有解除权；另一种观点认为，在合同陷入僵局等特定情况下，应当允许违约方通过起诉方式由人民法院决定是否解除合同，以打破合同僵局。",
        "尽管争议颇多，但从“新宇公司诉冯玉梅商铺买卖合同纠纷案”到《九民纪要》第48条的规定，“违约方”的合同解除权一再得到司法机关的确认，《民法典》也最终肯定了《九民纪要》所总结的司法实践。",
        "违约方解除合同有如下要点值得注意：",
        "1、违约的内容仅限于“非金钱债务”，违约方单纯的“金钱债务违约”无权解除。",
        "比如：在艺人演艺合同中，艺人的演艺服务拥有极强的人身属性，并且“不适于强制履行”，试想：法院怎么去强制艺人“唱、跳和Rap”呢？即便被强制，效果也不好。",
        "再比如：根据合同卖方应当交付货物，但是因为市场原材料价格上涨，卖方交付货物的成本急剧增加，导致其履行的成本过高。那么根据实际的情况，卖方有可能可以解除合同。但如果是金钱义务的违约，则违约方无权解除合同。",
        "2、违约方解除合同不影响其违约责任的承担",
        "承上，赋予特定条件下违约方解除合同的权利，确实增加了合同的不稳定性，《民法典》特别规定，在此情形下，不影响其违约责任的承担。",
        "那么重点来了，合同里的违约责任条款就显得尤为重要，违约金的金额要合理的高，才能既抑制住违约方解约的冲动，又充分弥补违约所遭受的损失。",
        "3、违约方只能通过法院或者仲裁机构请求解除合同",
        "不同于守约方在法定或约定的情况下可以以书面通知的形式直接解除合同，违约方目前只能以提起诉讼或仲裁的方式请求法院或仲裁机构解除合同。这应该是考虑到，违约方行使解约的权利必须慎重，因此只能由法院或仲裁机构进行判断。",
        "变化九：细化了委托合同解除的赔偿范围",
        "【法条变更】",
        "[图片",
        "【规范解读】",
        "除了合同解除的一般规则外，《民法典》对典型合同解除的规定也进行了细化，明确了委托合同解除的后果。",
        "1、无偿委托合同的解除，应当赔偿因解除时间不当造成的直接损失。",
        "在无偿委托合同的情形下，解除方应当注意解除的时间。如果解除时间不当，可能会造成对方的直接损失，解除方应当赔偿。",
        "2、有偿委托合同的解除方应当赔偿对方的直接损失和合同履行后可以获得的利益。",
        "该项规定意义重大。以律师法律服务委托协议为例，客户委托律所指派律师作为代理人代理某项诉讼，客户有权利随时解除该协议。但是，如果在判决结果出现之前，客户在律所无任何过错的情形下解除协议，那么客户应当赔偿律所的直接损失（如已经产生的代理工作的律师费用），以及合同履行之后可以获得的利益（如案件胜诉的奖励费用等等）。",
        "以上便是我们整理的《民法典》中关于合同解除的九大变化，希望能给各位带来一些启发。如果各位看官有什么感兴趣的话题，也欢迎留言，我们后续择机跟大家聊一聊。"
      ]
    }
  },
  {
    "slug": "civil-code-contract-termination-rules-part-one",
    "date": "20210218",
    "image": "/assets/event/event29.png",
    "category": "Tiger Watch",
    "title": "Civil Code Interpretation Series: Nine Major Changes to Contract Termination Rules (Part I)",
    "summary": "Tiger Partners reviewed the changes brought by the Civil Code to contract termination rules, focusing on the key questions of whether, how and with what consequences a contract may be terminated.",
    "content": [
      "Tiger Partners reviewed the changes brought by the Civil Code to contract termination rules, focusing on the key questions of whether, how and with what consequences a contract may be terminated."
    ],
    "zh": {
      "category": "",
      "title": "虎眼观察 | 《民法典》解读系列 - 合同解除规则之九大变化（上）",
      "summary": "本期《民法典》解读专题为合同解除规则的变化。合同解除制度向来是民商事争议解决关注的重点。合同能不能被解除？要如何解除？解除的后果是什么？弄清楚这些问题至关重要。2021年1月1日生效施行《中华人民共和国民法典》（下称“《民法典》”）对过往的合同解除制度进行了较多的修改，对此前实务中的很多困惑作出了明确的规定。虎诉律师针对《民法典》中的合同解除制度进行了梳理，提炼出九大变化，以飨读者。",
      "content": [
        "本期《民法典》解读专题为合同解除规则的变化。合同解除制度向来是民商事争议解决关注的重点。合同能不能被解除？要如何解除？解除的后果是什么？弄清楚这些问题至关重要。2021年1月1日生效施行《中华人民共和国民法典》（下称“《民法典》”）对过往的合同解除制度进行了较多的修改，对此前实务中的很多困惑作出了明确的规定。虎诉律师针对《民法典》中的合同解除制度进行了梳理，提炼出九大变化，以飨读者。",
        "变化一：新增不定期合同任意解除制度",
        "【法条变更】",
        "[图片",
        "【规范解读】",
        "较之《合同法》第94条，《民法典》第563条将当事人在持续性不定期合同项下的任意解除权列为一般法定解除事由，看似是一条新规定，事实上，针对特定类型不定期合同的任意解除权早已有之。例如，《合同法》第232条规定了出租人与承租人对于不定期租赁合同的任意解除权；《合同法》第410条规定了委托人与受托人对于委托合同的任意解除权。可见，《民法典》第563条实则是将既有的规定进行了一般化的提炼，将其升格为合同编通则的一般性规定，凡是不定期合同的当事人，均可根据自己的意愿，从一段长期持续性的合同关系中“解脱”。",
        "值得注意的是，由于持续性不定期合同项下的任意解除权是对合同严守原则的突破，为了保护合同相对方的信赖利益，《民法典》第563条也着重强调了行使解除权一方的通知义务，解除方必须在合理期限之前通知对方，方可产生解除合同的法律效力。这个合理期限应当如何界定，法律没有明确，目前只能根据个案不同的情况进行判断。",
        "变化二：明确行使解除权的除斥期间为1年",
        "【法条变更】",
        "[图片",
        "【规范解读】",
        "关于合同解除权的行使期限，《民法典》规定了三个不同的层次：",
        "首先，优先适用法定及约定的行使期限；",
        "其次，若法律没有规定或当事人没有约定的，则行使解除权的期限为一年的除斥期间；",
        "最后，对于一年的除斥期间存在例外情形，即为对方催告后的合理期限。",
        "相较于《合同法》，《民法典》在此处的变化主要是确定了行使解除权需受一年除斥期间的限制。在《民法典》施行前，仅有《最高人民法院关于审理商品房买卖合同纠纷案件适用法律若干问题的解释》（以下简称为“《商品房买卖合同司法解释》”）第15条对商品房买卖合同领域的解除权作出了“解除权应当在解除权发生之日起一年内行使”的规定。《民法典》参照此条规定，明确合同解除权的法定除斥期间为一年，对合同解除行为起到了关键的约束作用。",
        "这样的规定在实践中带来的影响是：当出现合同解除的事由时，拥有合同解除权的一方，应当积极考虑并决定是否解除合同，如果决定解除合同，需在一年内行使，逾期不行使的，该权利消灭。",
        "另外，可能被解约的一方，也有权利不坐以待毙。当出现可能被解约的事由时，为了尽早明确合同继续的可能性，其也可以主动要求拥有解除权的一方在合理期限内明确其是否解除合同。如果对方在该期限内不解除合同，那么今后也丧失了据此解除合同的权利。",
        "值得注意的是，关于“合理期限”的界定，现行法律并无统一的适用标准。不过，《商品房买卖合同司法解释》第15条将解除权行使的合理期限规定为三个月，作为参照，司法实践中或许会将“三个月”作为“合理期限”的判断标准。当然，具体情况仍应视个案情形而定",
        "变化三：增加附履行期限的解除通知中的自动解除规则",
        "【法条变更】",
        "[图片",
        "【规范解读】",
        "《民法典》第564条中明确了合同解除权的行使可以通过两种方式：第一，可以通过发送解除通知的方式行使；第二，可以通过提起诉讼或申请仲裁的方式直接行使。这样简化了合同解除的程序。其中，通过发送解除通知，特别是发送附履行期限的解除通知，精简了合同解除的程序。 实践中有时会碰上一种情况，一方违约，但守约方想敦促违约方履约，暂时还不想解除合同。此前可能要发两次函，第一次为敦促违约方履行合同义务的函；第二次，是在违约方拒不履行合同义务时，守约方发出的合同解除函。",
        "现在不必了，守约方直接只发一封函，阐明：限贵方在某年某月某日履行合同义务，否则合同在期限届满时解除。这样既达到了敦促的效果，给了对方弥补的机会，又无须发送第二遍解约函。",
        "变化四：明确通过起诉或仲裁解除合同",
        "【法条变更】",
        "[图片",
        "【规范解读】",
        "若当事人选择通过公力救济的方式，即诉请法院或仲裁机构解除合同的，此时合同解除的时点向来是司法实践的争议点。实践中存在多种不同分歧意见，包括：①起诉说；②起诉状副本或仲裁申请书副本送达说；③判决生效说。最高院对此也有着不同的观点，例如，《民事审判指导与参考》【总第35集第145页】中最高人民法院民一庭意见为：“根据当事人诉讼请求的不同，解除合同效力的起算时间点也不同。如果一方当事人请求确认解除合同通知效力的，法院经审查认为对方的异议不成立，则合同自通知到达对方时解除；如果一方当事人起诉请求判令解除合同，法院经审查认为符合约定解除或法定解除条件的，则合同自法院判决生效之日起解除。”",
        "《民法典》第565条结束了此问题的争议，明确解除合同未必需要通过合同解除通知，而是可以直接通过提起诉讼或申请仲裁解除，如果法院或仲裁机构认可合同解除的，那么自起诉状副本或者仲裁申请书副本送达对方时合同解除。可见，《民法典》将提起诉讼或申请仲裁作为意思表示的一种，实质上起到了“通知”的法律效果。",
        "这样的改变影响巨大。解除权人没有必要提前发送合同解除通知，就可以直接提起诉讼或者申请仲裁，那么配合着财产保全，完全可以打对方一个措手不及，更是避免了此前的打草惊蛇。",
        "变化五：增加解除合同异议的诉讼当事人",
        "【法条变更】",
        "[图片",
        "【规范解读】",
        "《合同法》第96条规定，被通知解除的一方当事人，对合同解除存在异议时，有权对解除行为的效力提起确认之诉。至于通知解除方是否享有提起该等确认之诉的权利，《合同法》未置可否。 为了尽快确定合同的效力，防止合同处于不确定、不稳定的状态，《民法典》于此明确：合同任何一方当事人均有权诉请确认解除行为的效力。自此，若异议人怠于确认合同效力的，提起解除的当事人也享有了诉请确认解除的权力。"
      ]
    }
  },
  {
    "slug": "wuhan-kingold-fake-gold-jurisdiction-objection",
    "date": "20201023",
    "image": "/assets/event/event30.png",
    "category": "Tiger Watch",
    "title": "The Battlefield: Jurisdiction Objection Behind the Second Instance of the Wuhan Kingold Fake Gold Case",
    "summary": "Tiger Partners reviewed the jurisdiction objection behind the second-instance ruling in the Wuhan Kingold fake gold case and analyzed the procedural contest in a dispute involving massive underlying claims.",
    "content": [
      "Tiger Partners reviewed the jurisdiction objection behind the second-instance ruling in the Wuhan Kingold fake gold case and analyzed the procedural contest in a dispute involving massive underlying claims."
    ],
    "zh": {
      "category": "",
      "title": "虎眼观察 | “争夺战场”——“武汉金凰假黄金案” 二审背后的管辖权异议",
      "summary": "日前，中国裁判文书网公布了一份陕西高院作出的二审裁定书（案号：【2020】陕民辖终53号），对簿公堂的是中国人民财产保险股份有限公司武汉市分公司（下称“人保公司”）与长安国际信托股份有限公司（下称“长安信托”）。虽然陕西高院仅对管辖权异议做出了裁定，但该案背后所牵扯的标的之大，情节之曲折，很好地诠释了“真实的生活比戏剧更具戏剧性”。今天就带大家了解下这个涉及数百亿标的的“武汉金凰假黄金案”，顺便聊一聊人保公司二提的管辖权异议究竟是什么。",
      "content": [
        "日前，中国裁判文书网公布了一份陕西高院作出的二审裁定书（案号：【2020】陕民辖终53号），对簿公堂的是中国人民财产保险股份有限公司武汉市分公司（下称“人保公司”）与长安国际信托股份有限公司（下称“长安信托”）。虽然陕西高院仅对管辖权异议做出了裁定，但该案背后所牵扯的标的之大，情节之曲折，很好地诠释了“真实的生活比戏剧更具戏剧性”。今天就带大家了解下这个涉及数百亿标的的“武汉金凰假黄金案”，顺便聊一聊人保公司二提的管辖权异议究竟是什么。",
        "一、回顾“武汉金凰假黄金案”",
        "（一）“瞒天过海”：83.03吨质押“黄金”竟是铜合金！",
        "2015年起，从事珠宝黄金业务的武汉金凰珠宝股份有限公司（下称“武汉金凰”）以“黄金质押+保单增信”的模式，陆续向十几家金融机构融资，融资总金额高达200亿元。对于武汉金凰提供质押的黄金，数家保险公司为其开具“保质保量”的保单，其中，人保公司承担了绝大部分的保额。2019年末，债权人金融机构对质押黄金进行开箱检测，才发现其竟是“铜合金”！",
        "（二）“一石激起千层浪”：诉讼迭起",
        "牵扯其中的金融机构们顿时“如坐针毡”，考虑到武汉金凰现在是自身难保，故只得将希望寄托于保单，纷纷向保险公司索赔。此次陕西高院做出二审裁定的就是其中一起诉讼案件，所涉金额高达8.2亿元。",
        "（三）“谁来审”：人保公司二提“管辖权异议”",
        "针对长安信托在西安中院提起的诉讼，人保公司首先提出管辖权异议。西安中院一审裁定予以驳回，人保公司针对该裁定向陕西高院提起上诉。纠缠良久，陕西高院最终作出二审裁定，裁定维持一审裁定。",
        "二、“管辖权异议”是什么？",
        "通俗来说，案件在进入实体审理前，需先解决“管辖”问题，即确定案件“在何地审”（即“地域管辖”，可理解为横坐标）以及“归哪个级别管”（即“级别管辖”，可理解为纵坐标），从而就能确定唯一的管辖法院。",
        "如果当事人认为管辖法院确定错误，则有权提起管辖权异议。",
        "（一）地域管辖：何地",
        "地域管辖可简单归纳为三种确定方式：",
        "第一种方式：法律规定必须由特定的法院管辖，如不动产纠纷；",
        "第二种方式：当事人可自行约定，但不是“啥案件都行”（必须是财产权益纠纷），也不是“选哪儿都行”（所选地域需与争议有实际联系），也不能“咋选都行”（需有书面协议）；",
        "第三种方式：在不适用上述两种方式时，则依法确定。",
        "本案中，基础合同，即保险合同约定的管辖为“受益人所在地人民法院管辖”，故长安信托引用该约定，认为其自身作为保险合同受益人，本案应由西安地区具有管辖权的法院管辖。",
        "而人保公司认为，本案应由被告住所地（武汉）或保险标的物所在地（武汉）人民法院管辖。",
        "西安中院和陕西高院均认为，保险合同中的管辖约定未违反相关法律规定， 故受益人所在地法院对本案有管辖权，即本案应由西安具有管辖权的人民法院进行管辖。",
        "（二）级别管辖：何级别",
        "对于级别管辖，均有明文规定，当事人并无约定或选择的权利。一般而言，大多数第一审民事案件由基层法院管辖，在有重大情形（如案情复杂、标的额达到一定数额、当事人主体较多等）时由上级法院管辖。",
        "与此同时，根据最高院于2019年发布的通知，中院管辖第一审民事案件的诉讼标的额上限已上调为50亿元，因此，实践中有资格由高院管辖的一审案件少之又少。",
        "本案所涉标的为8.2亿元，因此，原则上应由中院管辖。",
        "综上，横、纵坐标均已确定，本案一审应由西安中院进行管辖。",
        "三、巧用“管辖权异议”：争夺主场，为谈判争取时间",
        "耗时良久在程序问题上，有意义吗？当然有！在体育竞技中有“主场优势效应”，其也同样适用于争议解决领域，占据主场具有避免案件审理受地方保护主义的影响等优势，是“兵家必争之地”。",
        "此外，巧用程序事项亦可达到延长审理周期，为各方谈判争取时间等目的。",
        "四、另择蹊径：仲裁机构选择的灵活性",
        "实践中当事人虽有“约定管辖”的选择权利，但掣肘多多，而且“时间就是金钱”，有时迅速推进争议解决对于当事人，尤其是对于商事主体而言具有重要意义。虎诉律师在此介绍另一有效的争议解决方式——仲裁，或可解决上述困境。",
        "在仲裁框架内，当事人可仅凭信任选择仲裁机构，自由度较大，加之其“一裁终局”，因此，可迅速解决争议。",
        "但需要提请各位注意的是，在起草仲裁协议时，要注意参考仲裁机构官网的示范文本及表述，避免出现“或裁或审”等可能导致仲裁协议无效的情形。"
      ]
    }
  },
  {
    "slug": "foreign-related-lawyer-talent-pool",
    "date": "20201014",
    "image": "/assets/event/event31.png",
    "category": "Industry News",
    "title": "Mr. Xu Min and Mr. Wan Li were selected into the Foreign-Related Lawyer Talent Pool of the Beijing Bar Association",
    "summary": "The Beijing Lawyers Association released the list of Foreign Lawyers Talent pool yesterday. After strict selection and publicity procedures, Mr. Xu Min and Mr. Wan Li were successfully selected into the foreign lawyers talent pool with their rich foreign business experience.",
    "content": [
      "The Beijing Lawyers Association released the list of Foreign Lawyers Talent pool yesterday. After strict selection and publicity procedures, Mr. Xu Min and Mr. Wan Li were successfully selected into the foreign lawyers talent pool with their rich foreign business experience.",
      "This fully shows the rich practical experience and consistent excellent performance of Tiger Partners lawyers in foreign-related legal services, especially in the field of civil and commercial litigation and arbitration.",
      "Tiger Partners will continue to take a broad view of the international legal affiars, and continue to provide clients with high-quality legal services."
    ],
    "zh": {
      "category": "",
      "title": "行业资讯 | 虎诉两位合伙人入选北京市律师协会涉外律师人才库",
      "summary": "北京市律师协会于昨日发布了《北京市律师协会涉外律师人才库名单》，经过严格的选拔和公示程序，虎诉律师事务所的许旻律师和万力律师，凭借其丰富的涉外业务经验，成功入选北京市律师协会涉外律师人才库。这充分显示了虎诉律师在涉外法律服务方面，尤其是民商事诉讼与仲裁领域，丰富的实战经验和一贯的优异表现。",
      "content": [
        "北京市律师协会于昨日发布了《北京市律师协会涉外律师人才库名单》，经过严格的选拔和公示程序，虎诉律师事务所的许旻律师和万力律师，凭借其丰富的涉外业务经验，成功入选北京市律师协会涉外律师人才库。这充分显示了虎诉律师在涉外法律服务方面，尤其是民商事诉讼与仲裁领域，丰富的实战经验和一贯的优异表现。",
        "许旻律师的业务领域包括：跨境投资、民商事诉讼与仲裁。",
        "万力律师的职业领域包括：国际贸易、民商事诉讼与仲裁。",
        "虎诉将继续放眼国际、深耕专业，一如既往地为客户提供优质的法律服务。"
      ]
    }
  },
  {
    "slug": "china-business-law-journal-featured-tiger-partners",
    "date": "20200927",
    "image": "/assets/event/event32.png",
    "category": "Industry News",
    "title": "China Business Law Journal officially included Tiger Partners",
    "summary": "Recently, China Business Law Journal, a well-known legal media, officially included Tiger Partners. Tiger Partners’ inclusion in the Journal’s recommended law firm list fully attests to the firm’s consistently outstanding performance in dispute resolution (litigation and arbitration).",
    "content": [
      "Recently, China Business Law Journal, a well-known legal media, officially included Tiger Partners. Tiger Partners’ inclusion in the Journal’s recommended law firm list fully attests to the firm’s consistently outstanding performance in dispute resolution (litigation and arbitration).",
      "Tiger Partners will continue to deepen its professional expertise, devote full professionalism and dedication to every case, and consistently deliver exceptional legal services to clients."
    ],
    "zh": {
      "category": "",
      "title": "行业资讯 | \"商法“收录虎诉",
      "summary": "近日，知名法律媒体《商法》（China Business Law Journal）正式收录北京虎诉律师事务所。虎诉荣登商法推荐律所榜单，充分显示了虎诉在争议解决（诉讼与仲裁）领域一贯的优异表现。",
      "content": [
        "近日，知名法律媒体《商法》（China Business Law Journal）正式收录北京虎诉律师事务所。虎诉荣登商法推荐律所榜单，充分显示了虎诉在争议解决（诉讼与仲裁）领域一贯的优异表现。",
        "虎诉将持续深耕专业，对每一起案件都倾注百分之百的技艺和热情，持续为客户提供卓越的法律服务。"
      ]
    }
  },
  {
    "slug": "private-lending-judicial-protection-rules",
    "date": "20200902",
    "image": "/assets/event/event33.png",
    "category": "Tiger Watch",
    "title": "The gun goes off, the gold is gone - The interpretation of the adjustment of judicial protection rules of private",
    "summary": "On August 20, 2020, the Supreme People's Court (\"SPC\") issued the Decision on Amending the \"Provisions on Several Issues Concerning the Application of Law in the Trial of Private Lending Cases\"(the \"New Provisions\"), which made certain amendments to the trial rules for private lending cases.",
    "content": [
      "On August 20, 2020, the Supreme People's Court (\"SPC\") issued the Decision on Amending the \"Provisions on Several Issues Concerning the Application of Law in the Trial of Private Lending Cases\"(the \"New Provisions\"), which made certain amendments to the trial rules for private lending cases.",
      "Compared with the 2015 \"Provisions of the Supreme People's Court on Several Issues Concerning the Application of Law in the Trial of Private Lending Cases\" (the \"Old Provisions\"), which were in effect before the amendments, the most concern of the market is about the changes in the private lending protection interest rate.",
      "In brief, the range of interest rates protected by the court was adjusted as follows.",
      "(1) The judicial protection cap on private lending rates has been reduced from 24% to four times the LPR (one year);",
      "(2) The grey area of natural debt between 24%-36% per annum in the Old Provisions no longer exists.",
      "[图片"
    ],
    "zh": {
      "category": "",
      "title": "枪炮一响 黄金万两 | 关于民间借贷利率司法保护规则调整的解读",
      "summary": "2020年8月20日，最高人民法院发布了《关于修改<关于审理民间借贷案件适用法律若干问题的规定>的决定》（以下简称“新《规定》”），对民间借贷案件的审判规则进行了一些修订。",
      "content": [
        "2020年8月20日，最高人民法院发布了《关于修改<关于审理民间借贷案件适用法律若干问题的规定>的决定》（以下简称“新《规定》”），对民间借贷案件的审判规则进行了一些修订。",
        "民间借贷利率保护上限的变化",
        "与修订前施行的2015年《最高人民法院关于审理民间借贷案件适用法律若干问题的规定》（以下简称“旧《规定》”）相比，其中最引发市场关注的是关于民间借贷保护利率的变化，即，自2020年8月20日起，民间借贷利率的司法保护上限由此前的“以24%和36%为基准的两线三区”的规则调整为挂钩“全国银行间同业拆借中心每月20日发布的一年期贷款市场报价利率（LPR）的4倍”为标准。",
        "简单来讲，利率受法院保护的范围调整如下：",
        "（1）民间借贷利率的司法保护上限由24%降至LPR（一年期）的四倍;",
        "（2）旧《规定》中年利率24%-36%之间自然债务的灰色地带不再存在。",
        "以2020年8月20日发布的一年期贷款市场报价利率3.85%的4倍计算，新《规定》下，民间借贷利率的司法保护上限为15.4%。",
        "具体变化我们也做了下图供大家参考：",
        "[图片",
        "我的案子适用哪个标准？",
        "此次新《规定》中，第三十二条对其适用也作出了相应规定：“本规定施行后，人民法院新受理的一审民间借贷纠纷案件，适用本规定。借贷行为发生在2019年8月20日之前的，可参照原告起诉时一年期贷款市场报价利率四倍确定受保护的利率上限。”",
        "因此，新《规定》施行后，如此前的民间借贷已经约定了超过四倍LPR但不到24%的利率，2020年8月20日后由法院受理的，则法院不会支持超过四倍LPR的利息，具体适用哪天的LPR为标准则依据借贷行为发生日期的不同稍有变化。2020年8月20日前法院受理的案件审判不受新《规定》影响，仍按照原规定执行。具体如下图所示：",
        "[图片",
        "什么是LPR？",
        "新《规定》所称的LPR（Loan Prime Rate），即贷款市场报价利率，是由各报价行于每月20日（遇节假日顺延）9时前，以0.05个百分点为步长，向全国银行间同业拆借中心提交报价，全国银行间同业拆借中心按去掉最高和最低报价后算术平均，向0.05%的整数倍就近取整计算得出LPR，于当日9时30分公布，公众可在全国银行间同业拆借中心和中国人民银行网站查询。[1",
        "自去年以来，LPR的走势持续低走（如下图所示），如果LPR长期走低的话，这意味着法院对民间借贷利率的保护上限也将长期走低。",
        "[图片",
        "4倍LPR外，可否另行主张违约金？",
        "实践中，很多商事主体习惯于在借款合同中除约定逾期利率以外，额外约定了违约金，值得关注的是，在新《规定》下，法院对于违约金数额的裁量，是否受4倍LPR的限制？",
        "根据新《规定》第三十条，“出借人与借款人既约定了逾期利率，又约定了违约金或者其他费用，出借人可以选择主张逾期利息、违约金或者其他费用，也可以一并主张，但是总计超过合同成立时一年期贷款市场报价利率四倍的部分，人民法院不予支持。”",
        "这意味着最高法关于利率的司法保护规则同时涵盖了当事人可能提起的违约金诉求，即商事主体在诉讼请求中无论选择择一主张逾期利息、违约金或者其他费用，抑或是一并主张，总计必须以4倍LPR为限，超限部分将无法得到法院的支持。",
        "实践中对商事主体的指引",
        "此外，除民间借贷纠纷外，投资回购纠纷可能也会受到新《规定》的影响。因为投资回报的底层逻辑是弥补投资方资金被占用的损失，法院将来有可能参照新《规定》,和《最高人民法院关于适用〈中华人民共和国合同法〉若干问题的解释（二）》第二十九条第二款[2 的规定，以4倍LPR的130%为上限来确认损失。",
        "基于以上对现行利率的总结介绍，我们建议商事主体在签订借款合同中适当考虑LPR的变化对合同的签署时间的影响。例如，在LPR呈下行趋势的情形下，如交易的发生恰逢该月20日新一期LPR发布前后，则借款方可将合同的签署时间定在新一期LPR发布之后，以最大化利用LPR利率变化的优势。",
        "[1 第二十六条 第二款",
        "前款所称“一年期贷款市场报价利率”，是指中国人民银行授权全国银行间同业拆借中心自2019年8月20日起每月发布的一年期贷款市场报价利率。",
        "[2 第二十九条当事人主张约定的违约金过高请求予以适当减少的，人民法院应当以实际损失为基础，兼顾合同的履行情况、当事人的过错程度以及预期利益等综合因素，根据公平原则和诚实信用原则予以衡量，并作出裁决。",
        "当事人约定的违约金超过造成损失的百分之三十的，一般可以认定为合同法第一百一十四条第二款规定的“过分高于造成的损失”。"
      ]
    }
  },
  {
    "slug": "alb-interview-liu-yuxuan",
    "date": "20200526",
    "image": "/assets/event/event34.png",
    "category": "Industry News",
    "title": "ALB report \"An up-and-comer in dispute resolution-Interview Liu Yuxuan, managing partner\"",
    "summary": "Recently, Asian Legal Business (\"ALB\"), one of the world's most influential legal media, interviewed Liu Yuxuan, Managing Partner of Tiger Partners. The article has been published in the May 2020 issue of ALB China. If you would like to read the rest of the article, please visit ALB's website http://www.legalbusinessonline.com/china.",
    "content": [
      "Recently, Asian Legal Business (\"ALB\"), one of the world's most influential legal media, interviewed Liu Yuxuan, Managing Partner of Tiger Partners. The article has been published in the May 2020 issue of ALB China. If you would like to read the rest of the article, please visit ALB's website http://www.legalbusinessonline.com/china."
    ],
    "zh": {
      "category": "",
      "title": "行业资讯 | ALB专访虎诉管理合伙人刘煜暄律师：“争议解决领域的耀眼新星”",
      "summary": "近日，全球最具影响力的法律媒体之一——亚洲法律杂志（Asian Legal Business，“ALB”）采访了虎诉管理合伙人刘煜暄律师。",
      "content": [
        "近日，全球最具影响力的法律媒体之一——亚洲法律杂志（Asian Legal Business，“ALB”）采访了虎诉管理合伙人刘煜暄律师。",
        "北京虎诉律师事务所成立于2019年12月，是一家专注于重大复杂民商事争议解决的精品律所。虎诉在争议解决领域已经赢得了越来越多的客户青睐，成为该领域里一颗耀眼的新星。",
        "ALB：虎诉律师事务所虽然成立时间不长，但已经在市场上赢得了越来越多的客户认可和良好口碑。请问虎诉的优势有哪些？",
        "刘煜暄律师：第一，我们有顶尖的团队。包括我在内的合伙人和律师们都具备丰富的实践经验。在执业领域方面，我们分工明确、覆盖范围广，能够在多个领域里提供专业化法律服务。第二，虎诉的合伙人能够全程参与到案件中去，为客户提供细致到位的服务。第三，虎诉在律师收费这方面为客户提供了超高的性价比。我们既能够为客户提供一流的法律服务，又能够帮助客户节约经济成本。",
        "ALB：虎诉律师事务所有着怎样的律所文化？ 刘律师：首先，客户利益至上。我们的核心价值观就是客户能否通过我们所提供的法律服务实现其商业目标。其次，我们极度看重律师的法律技术。我们一直强调律师的法律技术在争议解决的过程中起着决定性作用。第三，虎诉非常重视客户体验。在虎诉，我们致力于为客户提供最好的服务和最快的反馈。第四，虎诉的律师十分热爱律师行业，对职业有着深刻的认同感、尊严感和自豪感。",
        "ALB：虎诉最看重的年轻律师的品质有哪些？在虎诉，律师们拥有着怎样的发展空间？",
        "刘律师：在年轻律师身上，我们最注重的品质首先是要有一个激昂的人生态度和价值观。第二，争议解决往往涉及信用问题，因此我们看重年轻律师对客户的承诺是否可以按时实现。第三，年轻律师应该有韧性。在争议解决的过程中，律师会遇到很多的困难，如果没有韧性的话，是无法在这条职业道路上走得长远的。律师的发展根植于对每一个案子的钻研。在不断突破困难、积累经验，为客户带来价值的过程中，律师自身得到了发展，这样的发展会带动律所的发展，而后者又会为前者回馈相应的价值，并且带来更广阔的空间。",
        "ALB：虎诉的愿景是什么？未来三到五年，虎诉有着怎样的发展规划？",
        "刘律师：我们要成为中国最好的争议解决律师事务所。我们也始终朝着这个方向努力。我们希望通过做好现在手里的每一个案子，营造良好的口碑效应，积累更多的客户，今后为越来越多的客户提供专业化的法律服务和优化的体验。"
      ]
    }
  },
  {
    "slug": "retail-investors-have-power-investor-rights-protection-in-securities-misrepresen",
    "date": "20200522",
    "image": "/assets/event/event35.png",
    "category": "Tiger Watch",
    "title": "Retail Investors Have Power: Investor Rights Protection in Securities Misrepresentation Liability Litigation",
    "summary": "Tiger Partners analyzed investor rights protection in securities misrepresentation liability disputes and discussed how retail investors may protect their legitimate interests through litigation.",
    "content": [
      "Tiger Partners analyzed investor rights protection in securities misrepresentation liability disputes and discussed how retail investors may protect their legitimate interests through litigation."
    ],
    "zh": {
      "category": "",
      "title": "虎眼观察 | 我们“韭菜”有力量——证券虚假陈述责任纠纷诉讼之“投资者权利保护”",
      "summary": "瑞幸咖啡”财务造假事件余波未平，康美药业违法违规案风波又起。证监会近日对康美药业做出了行政处罚及市场进入决定。某些上市公司对市场和投资者毫无敬畏之心，肆意“收割韭菜”，严重破坏资本市场健康生态，损害了投资人的切身利益。“韭菜”们就只能“坐以待毙”嘛？本文将简单介绍大杀器“证券虚假陈述责任纠纷诉讼”。",
      "content": [
        "瑞幸咖啡”财务造假事件余波未平，康美药业违法违规案风波又起。证监会近日对康美药业做出了行政处罚及市场进入决定。某些上市公司对市场和投资者毫无敬畏之心，肆意“收割韭菜”，严重破坏资本市场健康生态，损害了投资人的切身利益。“韭菜”们就只能“坐以待毙”嘛？本文将简单介绍大杀器“证券虚假陈述责任纠纷诉讼”。",
        "什么是证券虚假陈述？",
        "证券市场虚假陈述，是指信息披露义务人违反证券法律规定，在证券发行或者交易过程中，对重大事件作出违背事实真相的虚假记载、误导性陈述，或者在披露信息时发生重大遗漏、不正当披露信息的行为。（《最高人民法院关于审理证券市场因虚假陈述引发的民事赔偿案件的若干规定》（以下简称为“《最高院虚假陈述民事赔偿司法解释》”）第十七条）",
        "2020年3月1日实施的、修正后的最新《证券法》在第五章明确规定了披露义务人的信息披露义务，以及违反该义务应当承担赔偿责任。",
        "通俗的讲，就是：信息披露义务人（包括发行人和其他义务人），应当对投资者作出价值判断和投资决策所必需的信息依法披露，且这些信息应当真实、准确、完整，简明清晰，通俗易懂，不得有虚假记载、误导性陈述或者重大遗漏。",
        "如果信披义务人未按规定披露信息，或者存在虚假记载、误导性陈述或者重大遗漏，致使投资者在证券交易中遭受损失的，信息披露义务人应当承担赔偿责任。",
        "哪些人有权利索赔？",
        "符合如下条件的投资人，有权利提出索赔：",
        "（一）投资人所投资的是与虚假陈述直接关联的证券；",
        "（二）投资人在虚假陈述实施日及以后，至揭露日或者更正日之前买入该证券；",
        "（三）投资人在虚假陈述揭露日或者更正日及以后，因卖出该证券发生亏损，或者因持续持有该证券而产生亏损。",
        "（《最高院虚假陈述民事赔偿司法解释》第十八条）",
        "索赔的范围有哪些？",
        "投资者可以索赔的范围，包括：（一）投资差额损失；和（二）投资差额损失部分的佣金和印花税。",
        "此外，投资人持股期间基于股东身份取得的收益，包括红利、红股、公积金转增所得的股份以及投资人持股期间出资购买的配股、增发股和转配股，不得冲抵虚假陈述行为人的赔偿金额。",
        "已经除权的证券，计算投资差额损失时，证券价格和证券数量应当复权计算。",
        "哪些人可能负有责任？",
        "（一）发起人、控股股东等实际控制人；",
        "（二）发行人或者上市公司；",
        "（三）证券承销商；",
        "（四）证券上市推荐人；",
        "（五）会计师事务所、律师事务所、资产评估机构等专业中介服务机构；",
        "（六）上述（二）、（三）、（四）项所涉单位中负有责任的董事、监事和经理等高级管理人员以及（五）项中直接责任人；",
        "（七）其他作出虚假陈述的机构或者自然人。",
        "有什么索赔途径？",
        "（一） 什么时候可以索赔？",
        "在证监会做出处罚、财政部（及其他行政机关或有权做出行政处罚的机构）做出处罚，或者虚假陈述行为人虽未受行政处罚但被法院认定有罪的时候，提出索赔。",
        "有了上述处罚决定或者有罪判决，投资者对于虚假陈述行为的举证负担最小。此外，法院也以前述时点计算诉讼时效。",
        "（二） 索赔的途径",
        "1. 投资者保护机构先行赔付和调解",
        "《证券法》第九十三条和第九十四条规定：",
        "发行人因欺诈发行、虚假陈述或者其他重大违法行为给投资者造成损失的，发行人的控股股东、实际控制人、相关的证券公司可以委托投资者保护机构，就赔偿事宜与受到损失的投资者达成协议，予以先行赔付。先行赔付后，可以依法向发行人以及其他连带责任人追偿。",
        "投资者与发行人、证券公司等发生纠纷的，双方可以向投资者保护机构申请调解。普通投资者与证券公司发生证券业务纠纷，普通投资者提出调解请求的，证券公司不得拒绝。",
        "2.民事诉讼",
        "投资者因证券虚假陈述而遭受损失的，可以向法院提起诉讼。",
        "（1） 管辖。有管辖权的法院按如下方式确定：",
        "1.由省、直辖市、自治区人民政府所在的市、计划单列市和经济特区中级人民法院管辖",
        "2.由发行人或者上市公司所在地有管辖权的中级人民法院管辖；",
        "3.对发行人或者上市公司以外的虚假陈述行为人提起的诉讼，由被告所在地有管辖权的中级人民法院管辖。",
        "比如：南京中院已经受理对澄星股份等4家江苏上市公司证券纠纷代表人诉讼，并在征集投资者诉讼主体登记。",
        "（见http://www.njfy.gov.cn/www/njfy/ZhggContenrJSP.jsp?rowId=110760及其他公告）。",
        "（2） 代表人诉讼",
        "这里说的代表人诉讼，通俗来讲，是指原告人数众多，其诉讼标的是同一种类，由其中一人或数个代表全体相同权益人进行诉讼，法院判决效力及于全体相同权益人的诉讼。",
        "最高院《九民纪要》中明确了此类诉讼法院可以采取代表人诉讼方式对案件进行审理。各地法院也在试水代表人诉讼的方式。如上海金融法院就发布了《关于证券纠纷代表人诉讼机制的规定（试行）》，前文所述南京中院也已在开展相关工作。",
        "特点：",
        "特别代表人：投资者保护机构受50名以上投资者委托，可以作为代表 人进行诉讼（并为结算机构确认的权利人向法院登记，但投资者明确表示不愿意参加的除外）。",
        "普通代表人：不接受投资者保护机构的代表，向法院提起诉讼的，可推举代表人作为代表进行诉讼。投资者不能协商推举代表的，由法院指定代表人代表诉讼。",
        "（3） 不加入代表人诉讼而另行起诉",
        "有些投资者的投资在共性中有一些特性，比如：投资者有更为认可的代理律师团队及服务方案，可以选择另行起诉。此时，若有投资者保护机构正在代表进行诉讼，投资人应当明示不参加。法院也可能一并审理，分别判决。",
        "法律赋予广大投资者以“证券虚假陈述诉讼”以及“代表人诉讼”的机制，是投资者维护自身权利的大杀器，让虚假陈述责任人承担赔偿责任，也促使信息披露义务人及时、全面、真实地进行信息披露，促进证券交易市场健康有序发展。",
        "如果读者有由于证券虚假陈述而遭受了损失，可随时与虎诉律所联系，我们将及时为您制定维权方案，尽早获得合法赔偿。"
      ]
    }
  },
  {
    "slug": "a-litigation-step-that-gives-courts-and-lawyers-headaches-service-of-process",
    "date": "20200514",
    "image": "/assets/event/event36.png",
    "category": "Tiger Watch",
    "title": "A Litigation Step That Gives Courts and Lawyers Headaches: Service of Process",
    "summary": "Tiger Partners discussed service of process, a procedural step that often creates practical difficulty for courts and lawyers in civil and commercial litigation.",
    "content": [
      "Tiger Partners discussed service of process, a procedural step that often creates practical difficulty for courts and lawyers in civil and commercial litigation."
    ],
    "zh": {
      "category": "",
      "title": "虎眼观察 | 一个让法院和律师都头疼的诉讼环节——送达",
      "summary": "争议解决过程中的一个十分重要、又因常被客户忽视从而引发麻烦的环节就是送达。看似简单的送达在现实中往往会遇到难以确定送达地址、对方当事人拒收等难题，虎诉律师在本文结合以往经验和最新规定对这些问题做了解析。",
      "content": [
        "争议解决过程中的一个十分重要、又因常被客户忽视从而引发麻烦的环节就是送达。看似简单的送达在现实中往往会遇到难以确定送达地址、对方当事人拒收等难题，虎诉律师在本文结合以往经验和最新规定对这些问题做了解析。",
        "送达",
        "送达，是司法机关把诉状、证据等材料，以及法院制作的传票、举证通知书、裁判文书等材料送到当事人手中，通知案件当事人已经涉诉，保障其积极行使诉讼权利的行为。",
        "然而在审判实践中，一些当事人出于厌恶或者害怕诉讼的心理考量，尤其在得知自己成为被告后，因为缺乏法律常识，以为已经面临败诉或者赔偿，往往会逃避送达。另外，客观上也存在被告联系地址不清、注册地与实际地址不一致而无法送达的情况，从而成为案件推进的一大难题，拉长了案件的审理周期，阻碍了司法的效率，原告的诉求也无法及时实现。",
        "一般来说，如果原告可以提供被告准确的送达地址，法院将适用直接送达或者邮寄送达，就是将诉讼文书直接送交或邮寄给被告、被告的同住成年家属。如被告是企业的，其门卫或前台也可以签收。",
        "那么如果被告就是无理拒收，或者原告一开始就不掌握被告的送达地址，我们要如何处理呢？今天我们就谈谈“那些难以送达的情形”。",
        "原告可以选择被告的哪些地址作为送达地址？",
        "根据最高人民法院的相关规定，除了被告的注册地址、身份证住址以外，作为原告，在进行诉讼或仲裁程序时，可以选择以下地址作为被告的送达地址：",
        "1.诉讼或仲裁程序中所涉及的合同、往来函件中明确约定的送达地址； 2.诉讼中提交的书面材料中载明的自己的地址； 3.一年内进行其他诉讼、仲裁案件中提供的地址； 4.当事人一年内进行民事活动时经常使用的地址； 5.自然人以其户籍登记的住所或者在经常居住地登记的住址； 6.法人或者其他组织以其工商登记或其他依法登记、备案的住所地。",
        "此外，今年北京高院做出的“北京市高级人民法院、北京市市场监督管理局关于推进企业等市场主体法律文书送达地址承诺确认工作的实施意见（试行）”中，特别添加了企业可以在北京市企业登记e窗通服务平台“法律文书送达地址”专栏中另行填报地址，法院将优先向该地址进行送达的规定。",
        "因此，也许日后我们也可以向法院申请向该系统中的“法律文书送达地址”送达诉讼文书，至于法院是否会同意我们的申请，以及有关企业主体是否会填写该地址还存在不确定性。",
        "如果原告无法找到被告的送达地址，该怎么办？",
        "如果以上的地址信息都无法确认，被告出于种种理由，十分抗拒向法院和原告提供地址，我们也可以尝试电话送达、电子送达或者公告送达。",
        "电话送达——电话送达需要在被告的电话可以接通且被告本人同意的情况下进行，对于除判决书、裁定书、调解书以外的诉讼文书，法院可以打电话告知被告诉讼文书的内容，并记录拨打、接听电话号码、通话时间、送达诉讼文书内容，通话过程应当录音以存卷备查。当然，在实践中，我们并未遇到过电话送达的情况。",
        "电子送达——得益于互联网技术以及各大电子平台的发展，一些地方法院富有创设性的利用电子平台对当事人积极进行了诉讼文书的送达。例如上海虹口法院的一位法官助理曾试图在抖音平台寻找当事人，经过一段时间的“追更”后又通过其抖音作品里备注的个人微信联系到了该当事人，不幸的是当他在得知法官助理的身份后还是拒绝了被电子送达。与电话送达的情况类似，目前从实践来看，法院对于电子送达仍十分谨慎，如果当事人拒绝电子送达，法院仍会走向公告送达。",
        "公告送达——如果法院穷尽一切方式后，被告仍然下落不明。法院最终可以选择公告送达，但公告送达时间周期为60天，整个诉讼程序将会因此被大大拖延。",
        "为了避免没有合适的送达地址，提前约定是关键",
        "自知负有责任的企业在涉诉后往往懈于提供甚至有意避免提供可供法院送达的联系方式及住址，以拖延诉讼。最高人民法院和各地高级人民法院虽然出台了若干规定和意见解决“送达难”的问题，但正如前述，即便法律条文规定的十分清楚，但现实往往让法院和律师头疼，直接送达找不到人，留置送达配合率低，电子送达对方不同意，邮寄送达被拒收……",
        "因此，考虑到送达过程中的种种不确定因素，虎诉建议企业在经营过程中有意识的确认和保留合作方的送达地址，例如在签订合同时将联系人、送达地址和联系电话明确约定在合同的条款中。双方同意电子送达的，应将传真号、电子邮箱地址和微信号等电子送达地址注明在合同中，在万一涉及诉讼风险时也可以最大程度避免因为送达难而导致的诉讼程序难以进行。",
        "同时，虎诉也提醒被诉企业无需因为涉诉而故意逃避送达，因为只要符合起诉条件，案子就已经立下了。不收法院的传票、不到庭参加诉讼也不会影响法院审理的进行，在缺席审判下法院做出的裁决会因为缺乏被告的抗辩而更不利于被告。最后，程序会进行到强制执行阶段，当财产被法院用强制执行力划走时被告再来找律师和法院就真的为时已晚了。",
        "诉讼中对方坚持拒收大概率会导致程序拖延，而如果当事方约定了仲裁，则情况会好很多",
        "留置送达——根据民事诉讼法的相关规定，被告拒收诉讼文书的，送达人员可以邀请当地的居委会村委会工作人员或者所在单位的代表到场见证，说明情况后在送达回证上记明拒收事由和日期，由送达人和见证人签名或者盖章，把诉讼文书留在被告的住所；另外，也可以把诉讼文书直接留在被告的住所，并用拍照、录像等方式记录送达过程，即视为已经送达。",
        "然而近些年，区分诉讼和仲裁有不同的做法。",
        "在诉讼中，法院派出专门送达人员的情况非常少见。笔者也只是在2013年遇到过一次，此后再也没有遇到。那么如果对方坚持拒收，法院为了稳妥起见，就会走向“公告送达”的程序。发出公告之日起六十日，即视为送达。整个诉讼程序会因此大大拖延。",
        "而仲裁中，仲裁机构往往会向约定的送达地址，或公司注册地址，或者是自然人的身份证住所地送达相关仲裁材料。如果有人拒收，仲裁机构则会采用“公证送达”的方式送达相关材料，在相关材料公证寄出后7日，即视为送达。",
        "由此可见，如果一方当事人坚持拒收材料，在诉讼中会产生严重拖延诉讼进程的后果。而仲裁程序中，则不会有太大影响。不过要进入仲裁程序，需要相关方签订有合法有效的仲裁协议。"
      ]
    }
  },
  {
    "slug": "three-common-misunderstandings-about-dispute-resolution-lawyers",
    "date": "20200401",
    "image": "/assets/event/event37.png",
    "category": "Tiger Watch",
    "title": "Three Common Misunderstandings About Dispute Resolution Lawyers",
    "summary": "Tiger Partners addressed several common misunderstandings about dispute resolution lawyers and explained how litigation and arbitration lawyers create value in complex disputes.",
    "content": [
      "Tiger Partners addressed several common misunderstandings about dispute resolution lawyers and explained how litigation and arbitration lawyers create value in complex disputes."
    ],
    "zh": {
      "category": "",
      "title": "虎眼观察 | 这些可能是大家对争议解决律师最大的三个误解！",
      "summary": "争议解决律师，一般协助客户通过诉讼、仲裁、谈判以及其他方式解决争议，我们同行之间也常常自我揶揄为“讼棍”。我们虎诉律师结合自身超过十年的争议解决律师实务和上市公司诉讼法务的经验，认为争议解决律师的工作内容和价值，远不限于帮人打官司。",
      "content": [
        "争议解决律师，一般协助客户通过诉讼、仲裁、谈判以及其他方式解决争议，我们同行之间也常常自我揶揄为“讼棍”。我们虎诉律师结合自身超过十年的争议解决律师实务和上市公司诉讼法务的经验，认为争议解决律师的工作内容和价值，远不限于帮人打官司。",
        "在这里聊聊可能是大家对争议解决律师最大的三个误解。",
        "误解1：有官司打才用的上争议解决律师吗？ 正解：其实在纠纷的萌芽期甚至在交易的洽谈期，就用得上我们。",
        "绝大多数人，包括很多律师同行和公司法务大大们，鲜有打过官司，可能还没有进过法庭。",
        "人们看到的争议解决律师，都是在法庭上口若悬河，据理力争。但大家可能忽视了一点，如果把诉讼比作一场战争，争议解决律师要在法庭这个战场上赢得胜利，除了充足的弹药之外，还需要什么？",
        "“国防建设”和“战争动员”！",
        "先说“国防建设”。比如讲：某公司因一份涉及诸多主体的投资协议产生了争议，争议解决律师介入之后，除搜寻证据材料之外，会在令常人眼花缭乱的协议中，去寻找法律适用条款、争议解决条款、权利义务条款，违约责任条款等等。",
        "这个时候大家会发现，这些条款约定是否有效、明确、可执行，对解决争议至关重要。法律适用是否清晰，是否选择了自身熟悉的法域的条款？争议解决是否选择了适当的方式，是仲裁，还是诉讼，是否约定了合适的管辖地，做出的仲裁裁决或法院判决是否便于执行？各方权利义务是否明确？违约责任的承担是否明确，能否最终抓住适格的责任承担主体？",
        "最重要的是，根据这些条款，裁判者会如何裁判？",
        "争议解决律师的脑回路是异于常人的，也异于我们可爱的交易律师同行。我们基本上无时无刻不在战斗或准备战斗当中，脑子里想的都是怎么让客户在极端恶劣的条件下，多占便宜不吃亏。",
        "所以在交易文件起草的阶段，争议解决律师如果介入，就有机会为你筑起一道长城。这就是国防建设，这就是“先为不可胜,以待敌之可胜”。",
        "再说“战争动员”。",
        "一般来说，在一个商事争议的早期阶段（矛盾的积累、互致商业公函以及律师函到来），就应该引入争议解决律师。争议解决律师越早介入，越能充分调动各种资源积极准备，越早搜集、固定证据，进行“专项修补”，为庭审打好基础。",
        "误解2：争议解决律师为了挣律师费，就知道成天挑事儿？ 正解：“挑事儿”是为了维护客户的权利，方式可“打”可“谈”，灵活运用，这样可以最大程度实现客户最终利益，同时节约客户的时间和经济成本。",
        "当公司被违约或被侵权，你当然可以引入争议解决律师，拿起法律的武器维护自身的权益。",
        "商事纠纷当中，不是每一个都会走到诉讼和仲裁，也不是每一个启动的诉讼和仲裁都会等到最终生效的法院判决/仲裁裁决。相关的争议经常会出现“打打谈谈、以打促谈”的情形。",
        "比如说，当协议约定明确，对方违约证据确凿充分时，公司可以“先礼后兵”，向对方发送正式公函或律师函，要求承担违约责任，包括纠正违约行为，支付违约金等等。这份函，可以由争议解决律师在全面审查证据的基础上拟就，这样可以确保事实清楚、理由充分，造成“大兵压境”之势。在这个阶段，准备越充分，对方很有可能在认真评估之后，就选择直接放弃抵抗。这样省去了漫长的法院/仲裁审理程序，实现了最终目的且节约了时间和费用。",
        "甚至，公司可以略施手段。比如，向法院申请诉前保全，扣押对方公司资产，对其经营造成障碍；再比如，……（我选择故意不说）。对方也可能迫于压力，选择尽快与我方达成和解。",
        "如果不幸，公司收到了律师函或者被告了，更需要积极应对。建议公司尽早引入争议解决律师协助全面评估风险。这种风险评估应当是全方位的，包括败诉的可能性，赔偿的金额，舆论的影响，股价的波动等等，以便公司最终决策选择应对方案。比如：",
        "有时，我们摆事实，讲道理，“不战而屈人之兵”，或者积极应诉，给对方制造极大的障碍，对方也可能撤诉，或者我们以优势地位和解，这样也尽最大可能维护自身利益，还节省时间和费用。",
        "误解3：有些案件请争议解决律师都是成本，不值得？ 正解：争议解决律师费只是公司一项小小的投资，但却往往会给公司带来大大的收益。",
        "过往我们会不时遇到，不论是原告还是被告，认为“这官司我们就该赢，为什么还要花那冤枉钱请争议解决律师呢？” 或者认为“这官司争议金额太小了，花钱请律师不值得”。",
        "凡事预则立，不立则废。诉讼的战场风云瞬息万变，如有操作不慎，必赢的官司可能没有赢或者没有全赢。如果操作得当，必输的官司也能争取不输或不全输。相较于争议解决律师费用，赢来或者少输的涉案金额，都是公司的收益，而相较于此，争议解决律师的费用就显得微不足道。如果当公司三年或五年的利润或者创始人的全部身家悬于一宗争议之时，引入专业争议解决律师处理是否更为稳妥？",
        "有些案件，就算其涉案金额较小，但是有重大影响。比如：某个案件如果败诉，将导致公司整体业务模式需要调整，或者另有上百个同类案件也在蠢蠢欲动，对公司造成风险的叠加。 再比如：如果对某种侵权/违约行为不予追究，将可能导致同类行为案件越演越烈，公司收入受损且声誉下降。 评估这样案件的重要性，其标准就不应当以单个/数个案件的金额，而应当是公司整体运营受影响的程度。引入争议解决律师妥善解决此类案件所带来的价值，相比于公司支付的律师费，是远远值得的。",
        "最后，在商业仲裁案件中，以及在越来越多的商事诉讼案件当中，败诉一方应承担对方的律师费用，也可进一步减轻公司的负担。",
        "希望本文能够消除大家对争议解决律师的一些误会。",
        "虎诉律师致力于向客户提供最优质的争议解决法律服务，并为客户创造价值。"
      ]
    }
  },
  {
    "slug": "triple-compensation-is-serious-sellers-must-tell-the-truth-about-cars",
    "date": "20200401",
    "image": "/assets/event/event38.png",
    "category": "Tiger Watch",
    "title": "Triple Compensation Is Serious: Sellers Must Tell the Truth About Cars",
    "summary": "Tiger Partners discussed consumer fraud and triple compensation claims in automobile sales, emphasizing that sellers must truthfully disclose material information.",
    "content": [
      "Tiger Partners discussed consumer fraud and triple compensation claims in automobile sales, emphasizing that sellers must truthfully disclose material information."
    ],
    "zh": {
      "category": "",
      "title": "虎眼观察 | 退一赔三很严重，卖车要说真话",
      "summary": "特斯拉因Model 3车型的“减配门”事件被工信部约谈，成为3月份车市最引人关注的话题之一。虎诉注意到，已有部分受影响的车主正在就此问题咨询法律意见，包括寻求“退一赔三”的可能性。虎诉律所里资深汽车爱好者许律师（人送称号“许师傅”）在此就谈一谈汽车销售领域广受关注的“退一赔三”问题，以期对经销商和消费者都有所帮助。",
      "content": [
        "特斯拉因Model 3车型的“减配门”事件被工信部约谈，成为3月份车市最引人关注的话题之一。虎诉注意到，已有部分受影响的车主正在就此问题咨询法律意见，包括寻求“退一赔三”的可能性。虎诉律所里资深汽车爱好者许律师（人送称号“许师傅”）在此就谈一谈汽车销售领域广受关注的“退一赔三”问题，以期对经销商和消费者都有所帮助。",
        "一、退一赔三的成立条件",
        "“退一赔三”来源于现行的2014年《消费者权益保护法》（以下简称《消保法》）第五十五条第一款的规定。简单说，要求经销商退一赔三，必须证明经销商有欺诈行为。",
        "怎样才算欺诈行为？根据最高院的司法解释，司法实践中通常要求满足以下条件：",
        "1、经销商实施了欺诈行为——比如隐瞒车辆瑕疵、谎报车型及车辆重要配置信息（MODEL3可能涉及这一情形，但特斯拉是否真为故意“谎”报，还只是特斯拉在某个工作环节失误导致系统型号登记错误还未可知）、夸大宣传等；",
        "2、经销商的欺诈行为是故意实施的——比如明知或本应知道车辆有瑕疵，但未如实告知消费者；",
        "3、消费者因经销商的欺诈行为，对车辆信息产生了错误认识，法律上称之为因果关系——比如本来是个坏车，消费者却因经销商虚假陈述或隐瞒而误认为是好车；",
        "4、消费者最终作出了与其本意相反的错误意思表示——如果知道车有问题就不会买了，结果误以为是好车就买了。",
        "下面我们通过几则案例，看看现实生活中被判退一赔三，以及免于退一赔三的典型情况。",
        "二、经销商被判退一赔三的案例",
        "案例一 交车前存在维修记录，而交车时经销商并未告知，判决退一赔一",
        "消费者购买新车，首次保养时发现，所购车辆在交车前存在维修记录，而交车时经销商并未告知。法院查明，车辆在运输至经销商的途中发生事故，确实经过钣金和喷漆修复，而经销商无法证明在交车时已告知消费者维修情况。",
        "结果：法院认定经销商销售新车时隐瞒车辆维修情况，构成欺诈。由于该案发生在2007年，按当时的《消保法》规定，判决经销商“退一赔一”。",
        "——最高院指导案例第17号，（2008）二中民终字第00453号",
        "案例二 修改里程，把二手车当新车卖，被判“赔三”",
        "本案中的劳斯莱斯实际是一辆二手车，在行驶5000多公里后被经销商收入，当作新车转卖给消费者。消费者使用一年多以后表显里程仅为1000多公里，却出现仪表盘和屏幕损坏无法显示的故障，而经销商在庭审中始终坚持这辆劳斯莱斯是新车。法院由此认定经销商进行过仪表盘拆装调表，且从未告知消费者实际行驶里程。",
        "结果：法院判定经销商构成欺诈，由于消费者已将车辆再次转卖，因此不用“退一”，但要“赔三”，经销商赔偿金额高达1380多万元。",
        "——（2018）京03民终3192号",
        "案例三 选配音响应随车出厂，出厂之后再装冒牌音响，被判“退一赔三”",
        "消费者向经销商购买保时捷Macan，合同中订明选配原装Bose品牌音响。但消费者直到转售车辆时才发现，全车音响并非Bose品牌保时捷车载音响系统。法院调查得知，虽然Bose音响是该车型的选配装置，但只要客户选配了该音响，那么音响系统应是随整车出厂的。而本案中，车辆出厂时并未预装Bose音响，是经销商接到消费者订单后，从国内上家手中购入，再自行装配冒牌音响系统。",
        "结果：法院判定经销商构成欺诈，经销商被判“退一赔三”共计240多万元。",
        "——（2019）渝01民终730号",
        "除上述3例外，虎诉检索到的被判“退一赔三”的案例，还涉及到汽车销售环节的诸多方面，如：",
        "实际交付的车型与合同约定不符且未事先告知消费者，构成欺诈——（2019）京03民终16358号；",
        "交付的车辆外观与工信部备案不符而无法年检，且未事先告知消费者，构成欺诈——（2019）京01民终5533号；",
        "将参加过展览或军演且有维修记录的车辆作为新车销售，且未事先告知消费者，构成欺诈——（2015）三中民终字第08945号、（2017）京03民终9692号、（2018）京03民终11322号；",
        "新车交车前经过钣金、喷漆、拆装等维修且未告知消费者，构成欺诈——（2017）京03民终5068号、（2018）京01民终4095号、（2019）京民申141号；",
        "新车属于召回范围但未经召回维修即交付，且未告知消费者，构成欺诈——（2014）二中民二终字第307号、（2016）京03民终9757号。",
        "三、经销商免于退一赔三的案例",
        "虎诉发现，经销商免于退一赔三的案件，多数属于消费者证据不足，无法从事实上证明经销商存在欺诈。比较典型的情形包括：",
        "消费者主张所购新车为二手车，但无证据证明案涉车辆曾被出售给他人，经销商不构成欺诈——（2017）京01民终1881号；",
        "消费者主张货不对版，但交车时的随车文件与实际交付车辆的型号、零部件规格等一致，消费者没有相反证据，经销商不构成欺诈——（2016）京02民终4909号、（2017）京03民终3672、（2017）京02民终11163号、（2018）京02民终12149号、（2019）京03民终1153号；",
        "消费者提车后发现零部件损坏或缺失，但提车时已签署交车检查单确认全车无瑕疵，无法证明损坏发生在提车之前，经销商不构成欺诈——（2016）京02民终6819号、（2017）京03民终5539号、（2019）京02民终7122号；",
        "经销商对召回车辆实施维修后再出售，消费者无其他证据证明不是新车，经销商不因未告知召回信息而构成欺诈——（2019）京01民终11233号；",
        "消费者无法证明车辆的不良信息导致自己做出了错误的意思表示，经销商不构成欺诈——（2018）京02民终10962、（2019）京02民终1153号、（2019）京02民终10219号。",
        "四、结语",
        "从以上诸多涉及新车销售的案例中不难发现，经销商隐瞒车辆的车型、零配件、维修记录等方面的瑕疵信息，或就该等信息作出虚假陈述，并且由此误导消费者付款提车，一旦被消费者留存证据，经销商将面临承担商业欺诈“退一赔三”后果的巨大风险。因此经销商保护自身的重要方法之一就是讲真话。"
      ]
    }
  },
  {
    "slug": "triple-compensation-is-serious-sellers-must-tell-the-truth-about-cars-2",
    "date": "20200317",
    "image": "/assets/event/event39.png",
    "category": "Tiger Watch",
    "title": "Triple Compensation Is Serious: Sellers Must Tell the Truth About Cars",
    "summary": "Tiger Partners continued its discussion of consumer fraud and triple compensation in automobile transactions, focusing on truthful disclosure obligations in sales.",
    "content": [
      "Tiger Partners continued its discussion of consumer fraud and triple compensation in automobile transactions, focusing on truthful disclosure obligations in sales."
    ],
    "zh": {
      "category": "",
      "title": "虎眼观察 | 退一赔三很严重，卖车要说真话",
      "summary": "中国正走在民族伟大复兴的康庄大道上，商事交易风起云涌，我们提供的法律服务绝大多数也是围绕着商事交易进行的。",
      "content": [
        "中国正走在民族伟大复兴的康庄大道上，商事交易风起云涌，我们提供的法律服务绝大多数也是围绕着商事交易进行的。",
        "而对于一个商事交易，往往是由我们可爱的非诉律师同行与公司业务部门合作起草合同文本，再由公司业务部门主导交易的实施并推进，公司法务部门在此过程中提供协助。",
        "不过天有不测风云，有的交易能够顺利进行，有的交易可能就没那么幸运，履行各方可能会出现分歧、矛盾，并有可能发生诉讼、仲裁，甚至刑事报案等火爆程度不同的开撕情形。",
        "罗马不是一天建成的，对簿公堂之前也得有个商业互喷环节，那么，正义的骑士何时入场，就是摆在我们诸多公司法务部门以及风控部门面前的一个难题。",
        "一、从“矛盾的积累”到“争议的爆发”",
        "从虎诉的办案经验来看，我们接手案件之后大量掌握的案件材料是双方在合同履行过程中的电子邮件以及微信聊天记录。这些书面文件体现了交易发生矛盾的全过程。在这个过程中，各方态度上带着一种藕断丝连的暧昧情愫，一方面想表达自己的真实诉求，一方面又碍于双方之间尚存的情份没好意思把话说透。",
        "依据我们的经验，一个争议的发展阶段可以总结如下：",
        "（1）矛盾的积累 （2）互致商业公函 （3）律师函的到来 （4）正式起诉或应诉",
        "那么，争议解决律师应在什么时间介入呢？",
        "我们建议，应该在争议发展的前三个阶段就引入争议解决律师。",
        "这是因为，请看下文——",
        "二、真打起官司——怀疑自己好像穿越了",
        "都说交易本身强调互信、诚信，但真发展到诉讼或者仲裁，我们会发现，原来交易微信群里、或者邮件群组里经常沟通的几位对方人士，一个都没有出现有庭上，来的则是素未谋面的对方律师。",
        "原本都是一些早已达成共识、“心照不宣”的交易基础事实，在法庭或仲裁庭上，对方律师却全盘否认，一概不予认可，并且坚称我方观点没有任何书面证据作为支持，不应予采信。",
        "那种被彻底否认的感觉，让我们的很多客户在庭上哭笑不得，好像是许仙睁眼不认白素贞，仿佛来到了别的平行宇宙，或者怀疑今天自己是不是穿越了。",
        "如同《罗生门》的电影，你说你的故事，我讲我的经历，谁都没有全知之眼，也没人可以还原案件的事实真相本身，因此，作为裁判者而言，相信的只能是“证据层面的正义”——即没有证据支持的观点确实不能被采信。",
        "因此，从这个角度看，若等到打算正式提起诉讼，或者已经接到对方诉状才让争议解决律师介入，有可能会错失一些对合同履行方面的证据进行固定的机会，导致在庭审中有理说不出。因此。为了能把要讲的理讲充分，争议解决律师应该提早介入案件。",
        "三、复杂交易的合同在进入正式庭审前 最好作些“专项修补”",
        "越是大型金额的商业交易，越可能涉及多个交易环节，多个关联主体，多个法律关系，最终导致交易结构极为复杂。而该合同的首要目标就是：实现签约各方的商业目的。",
        "在我们办理案件的过程中，我们经常会发现，诉讼权利的主张与商业目的之间，可能存在一定的缝隙和区别。这导致争议解决律师关注的合同焦点往往有点奇特，我们通常会关注的点是：",
        "1、法律主体问题，比如说，A公司承担了义务，却没有在合同中盖章，盖章的则是A的股东或者实际控制人； 2、法律关系问题，比如说，A享有的权利能否转让给没有签约的子公司“小a”直接享有； 3、合同的成立及有效性问题，比如说，违反资管新规及证监会意见的合同的效力问题等。",
        "争议解决律师关注的这些问题，在合同顺利履行的情况下，其实都不是问题，你好，我也好，大家都好。",
        "但怕就怕赶巧，如果合同未能顺利履行，相对方出现了二心，这些问题可能都是致命的问题，将直接关系到守约方的权利主张，一旦有障碍，将是釜底抽薪式的权利灾难。",
        "而在正式提起诉讼或仲裁之前，如果争议解决律师提前介入，就会有很大机率在矛盾积累的前几个阶段（争议或矛盾的积累期、互致商业公函期，以及律师函到来期），运用争议解决的方式修正上面提到的这些权利基础问题的瑕疵。",
        "因此，从这个角度讲，虎诉建议，只要有矛盾发生的苗头，就需要争议解决律师的介入，越早介入，之后进入诉讼或仲裁程序胜诉的可能性越大。",
        "四、争议解决律师早介入 其实不用担心律师费成本",
        "上面提到，争议解决律师介入案件的最佳时间点应该是在矛盾的积累期。",
        "可问题来了，早介入就会早收费。",
        "为了减少公司关于律师费成本的顾虑，并最终为化解矛盾，或在争议中取得胜利，虎诉在诉前争议解决法律服务的收费上采用计时收费原则，并且设置封顶收费价格。同时，如果之后矛盾升级，真正进入到争议解决阶段，即对簿公堂，我们也会将前期收取的诉前律师费用予以扣减。",
        "这种收费模式，对于公司来讲，可以最大程度地减少使用争议解决律师的预算压力，对于我们而言，则相当于为我们之后正式开战作好最充足的战前准备——借了东风，开战必胜！",
        "虎诉一直坚持公允的收费，并致力于为每位尊敬的客户的商业运营发展保驾护航。"
      ]
    }
  },
  {
    "slug": "alb-former-red-circle-lawyers-boutique-firm",
    "date": "20200311",
    "image": "/assets/event/event40.png",
    "category": "Industry News",
    "title": "ALB report\"Former red circle firm lawyers leave to set up boutique firm Tiger Partners\"",
    "summary": "Asian Legal Business (\"ALB\"), one of the world's most influential legal media, has recently noted the establishment of Tiger Partners. As a boutique firm specializing in complex commercial dispute resolution, Tiger Partners' primary objective is to realize the interests of its clients. Tiger Partners has a deep legal expertise, rich practical experience and a distinctive commercial mindset. It is committed to providing professional legal services, precise business solutions and good user experience to its clients.",
    "content": [
      "Asian Legal Business (\"ALB\"), one of the world's most influential legal media, has recently noted the establishment of Tiger Partners. As a boutique firm specializing in complex commercial dispute resolution, Tiger Partners' primary objective is to realize the interests of its clients. Tiger Partners has a deep legal expertise, rich practical experience and a distinctive commercial mindset. It is committed to providing professional legal services, precise business solutions and good user experience to its clients.",
      "The following is the original ALB article on Tiger Partners:",
      "Former red circle firm lawyers leave to set up boutique firm Tiger Partners",
      "Dispute resolution lawyers Liu Yuxuan, Xu Min and Wan Li have co-founded a boutique firm called Tiger Partners in Beijing, which is dedicated to handling complex commercial dispute resolution cases in the future.",
      "Liu has previously worked for red circle firms Zhonglun, KWM, Fangda and Jingtian & Gongcheng, and Xu has worked for KWM and Fangda, while Wan has left his position as dispute director from a Chinese listed company, with previous working experiences in Global, Grandall and Fangda.",
      "The new firm will focus on investment dispute, corporate governance dispute, commercial contract dispute and IP dispute, with special focuses on industries of finance, internet, technology, entertainment, game, education and real estate. The firm already boasts a number of key clients, including Du Xiaoman Financial, Zhongzhi Capital, Tiger Brokers, Heaven-sent Capital, Telescope investment and Mini-Kaola.",
      "Liu will be the managing partner of the new firm. He specializes on domestic litigation and arbitration, with expertise on private equity, contest of corporate equity and control, media and entertainment, real estate and construction.",
      "Meanwhile Xu and Wan will act as partners. Xu focuses on domestic and international arbitration, with special expertise on finance and investment, equity transaction, corporate governance, commercial contract review and dispute resolution and product liability, having advised industries of banking and finance, technology, new media, entertainment, education and real estate.",
      "Wan specializes on finance and investment, equity transaction, commercial contract, tort liability, IP dispute resolution and criminal accountability, with special knowledge of finance, maritime, aviation, manufacture, medicine, real estate, sports, electronic entertainment and competition industries."
    ],
    "zh": {
      "category": "",
      "title": "行业资讯 | ALB报道虎诉：“前红圈所律师组建精品律所虎诉，专注争议解决业务”",
      "summary": "近日，全球最具影响力的法律媒体之一——亚洲法律杂志（Asian Legal Business，“ALB”）关注到虎诉的成立。虎诉作为一家专注于高端商事争议解决业务的精品所，始终以实现客户需求为第一目标。虎诉拥有深厚的法律功底、丰富的实战经验及与众不同的商业化思维，致力于为客户提供专业的法律服务、精准的商业解决方案及良好的用户体验。 以下为ALB关于虎诉的报道原文。",
      "content": [
        "近日，全球最具影响力的法律媒体之一——亚洲法律杂志（Asian Legal Business，“ALB”）关注到虎诉的成立。虎诉作为一家专注于高端商事争议解决业务的精品所，始终以实现客户需求为第一目标。虎诉拥有深厚的法律功底、丰富的实战经验及与众不同的商业化思维，致力于为客户提供专业的法律服务、精准的商业解决方案及良好的用户体验。 以下为ALB关于虎诉的报道原文。",
        "前红圈所律师组建精品律所虎诉，专注争议解决业务",
        "三位争议解决律师刘煜暄、许旻、万力在北京组建了精品律所虎诉律师事务所，未来将专注于高端商事争议解决业务。",
        "刘煜暄律师此前先后就职于中伦、金杜、方达和竞天公诚律师事务所，许旻律师此前先后任职于金杜和方达律师事务所，万力律师此前先后就职于环球、国浩和方达律师事务所，并在某A股上市企业法务部任诉讼总监。",
        "虎诉未来的业务领域主要为投资纠纷、公司治理纠纷、商业合同纠纷、知识产权纠纷，重点服务行业为金融、互联网、高新科技、影视娱乐、游戏、教育、房地产等。目前律所服务客户包括度小满金融、中植资本、老虎证券、硅谷天堂、远镜创投、迷你考拉仓等。",
        "刘煜暄律师将担任虎诉的管理合伙人，其专长于代理国内诉讼及仲裁案件，主要服务领域包括私募股权、公司股权与控制权争夺、传媒及娱乐、房地产及建设工程等。",
        "许旻律师和万力律师出任虎诉合伙人。许律师专长于代理境内外仲裁案件，在投融资、股权交易、公司治理、商事合同审查及纠纷处理、产品责任等业务领域经验丰富，承办案件涉及银行金融、私募基金、高新科技、新媒体、影视娱乐、教育、房地产等领域。",
        "万力律师则在投融资、股权交易、商事合同、侵权责任及知识产权纠纷处理、法院执行、刑事追责等业务领域经验丰富，承办案件涉及金融、海事、航空、工业制造、医药、房地产、体育、电子娱乐与竞技等领域。"
      ]
    }
  },
  {
    "slug": "take-action-when-it-is-time-how-game-companies-can-use-legal-tools-to-fight-priv",
    "date": "20200304",
    "image": "/assets/event/event41.png",
    "category": "Tiger Watch",
    "title": "Take Action When It Is Time: How Game Companies Can Use Legal Tools to Fight Private Servers",
    "summary": "Tiger Partners discussed how game companies can use legal measures to combat unauthorized private servers and protect the legitimate rights of original game operators.",
    "content": [
      "Tiger Partners discussed how game companies can use legal measures to combat unauthorized private servers and protect the legitimate rights of original game operators."
    ],
    "zh": {
      "category": "",
      "title": "虎眼观察 | 该出手时就出手——谈谈游戏公司如何重拳打击私服",
      "summary": "当今精彩纷呈的世界，“游戏”，尤其是“网络游戏”早已被社会公众所认识。游戏公司也成为了巨无霸，拥有着庞大的玩家群体，获得了巨大的现金流。",
      "content": [
        "当今精彩纷呈的世界，“游戏”，尤其是“网络游戏”早已被社会公众所认识。游戏公司也成为了巨无霸，拥有着庞大的玩家群体，获得了巨大的现金流。",
        "在巨大经济利益的推动下，一些“不法分子”动起了歪脑筋，企图通过私自搭建服务器（“私服”）、让玩家不在游戏公司的服务器（“官服”）上游戏的方式，绕开游戏公司，自行获利。",
        "虎诉的合伙人团队都是80后，不光我们自己是游戏玩家，对于游戏行业的法律事务也一直有着丰富的经验，并常年向一些游戏及电子竞技公司提供法律服务。本期虎眼观察专栏文章，我们就将谈谈如何通过法律手段惩治那些非法获利的私服运营商，以维护正版游戏公司的合法权益。",
        "一、先谈谈为什么不法分子要搭建私服",
        "从玩家的角度讲，玩私人服务器，可以少花钱，但体验更爽！",
        "举个例子：正版游戏运营商这里充值10元钱，只能获得“一把宝剑，伤害值100”；私服不法分子那里充值10元钱，则能获得“一把绝世好剑，外加彩虹炫彩灯光50米开外可见，伤害50万”。正版游戏运营商这里充值30元钱，只能开1个皮肤；私服不法分子那里充值30元钱，则能开30个皮肤，外加2个限定皮肤。",
        "一言以蔽之，私服不法分子利用玩家有便宜可占的心理，攫取了正版游戏运营商的知识产权和商业利益。而事实上，开发出一款获得社会认可的游戏，往往需要花费数年时间，投入大量的人力、物力、财力，几个夭折的游戏项目才能换来一个成功的作品。如此就被私服不法分子盗取了胜利果实，着实让正版游戏运营商苦恼不已。",
        "相反，私服不法分子则可以通过爆款游戏享有巨额利润。哪怕是一个只有3个人的团伙（正常游戏公司则需要几百人的开发团队），就可以轻松获得年收入 1000 万元以上。",
        "二、私服盗取游戏公司的胜利果实，打击私服，要使用刑事铁拳",
        "私服侵犯游戏公司的合法知识产权，是违法行为，严重时可构成犯罪——《刑法》第二百一十七条规定：以营利为目的，有下列侵犯著作权情形之一，违法所得数额较大或者有其他严重情节的，处三年以下有期徒刑或者拘役，并处或者单处罚金；违法所得数额巨大或者有其他特别严重情节的，处三年以上七年以下有期徒刑，并处罚金：1、未经著作权人许可，复制发行其文字作品、音乐、电影、电视、录像作品、计算机软件及其他作品的……",
        "为给予私服不法分子重击，我们建议游戏公司必要时可以采取刑事手段，套路动作可以参考如下内容：",
        "第一步，报案要有针对性地选择公安机关",
        "首先，要搜集准确、全面的私服信息。这些信息包括：私服经营人的 QQ 号、微信号、YY 号等社交账号，私服玩家 QQ 群，私服网站和游戏的服务器、充值网站的服务器所在地，收款微信或支付宝账号等等。还要充分准备官方游戏的各类信息，比如计算机软件著作权人信息、官服以及官服网站服务器所在地等等。这些信息越准确、越全面，就越方便确定案件管辖地、方便公安机关决定立案、方便其侦查、确定犯罪嫌疑人、调取证据等等后续工作。",
        "其次，要选择适当的公安机关。公安机关打击违法犯罪责无旁贷，但权利人选择适当的公安机关会事半功倍。根据相关规定，私服案件应由犯罪地（网站服务器所在地、网络接入地、网站建立者或者管理者所在地，侵权作品上传者所在地，权利人受到实际侵害的犯罪结果发生地）公安机关立案侦查。必要时，我们建议可以由犯罪嫌疑人居住地公安机关立案侦查。",
        "在实际选择报案的公安机关时，我们还建议要考虑公安机关对侵犯知识产权案件的重视程度、对私服案件的熟悉程度、“档期”（即同一时期是否有其他重大案件，是否有充足的警力侦办私服案件）以及其他因素。",
        "第二步，在立案后，由律师对公安机关提供协助",
        "公安机关立案后将进行侦查，犯罪的黑网也将逐步浮出水面，我们作为游戏厂商的律师可以全力提供必要的协助。比如，我们可以协助提醒侦查工作的方向（以保证嫌疑人应捕尽捕，证据应查尽查）。通常私服团伙、私服服务器、充值网站服务器等分布在全国各地，需要多地同时收网，控制嫌疑人、全面扣押各类证据（如电脑、银行卡、服务器硬盘、数据库备份等等），查封财产。",
        "这些都是后续检察机关提起公诉、法院定罪量刑以及游戏厂商民事追偿的重要依据。",
        "第三步，重中之重，为游戏公司获得应有的赔偿",
        "以我们的经验，一般情况下，嫌疑人会在法院刑事判决之前与游戏厂商商议赔偿事宜，以征得游戏厂商的谅解。这是嫌疑人请求法院从轻判决的重要依据。",
        "许多游戏公司打击私服的终极目的在于惩戒违法者，震慑其他违法行为，净化网络环境。",
        "由于游戏公司在此谈判过程中具有天然的优势，我们建议游戏公司可以充分利用此机会，综合考虑刑事判决的示范效应以及和解的经济效益，取得赔偿。",
        "最后，作为玩家，我们也要给广大玩家尤其是私服玩家提个醒儿，私服并非正规经营，大多也是打一枪换一个地方。玩家一旦遭遇被盗号、无故封号、剩余充值无法退还等等情形，权益在法律上无法得到保障，要慎之又慎。"
      ]
    }
  },
  {
    "slug": "think-twice-before-terminating-or-extending-contracts-during-the-pandemic",
    "date": "20200218",
    "image": "/assets/event/event42.png",
    "category": "Tiger Watch",
    "title": "Think Twice Before Terminating or Extending Contracts During the Pandemic",
    "summary": "Tiger Partners analyzed whether contracts may be terminated, suspended or extended due to the COVID-19 pandemic and highlighted practical points for businesses and investors.",
    "content": [
      "Tiger Partners analyzed whether contracts may be terminated, suspended or extended due to the COVID-19 pandemic and highlighted practical points for businesses and investors."
    ],
    "zh": {
      "category": "",
      "title": "虎眼观察 | 疫情之下，合同终止或延期需三思而后行",
      "summary": "当前全国人民同病毒正在激战，我们坚信COVID-19终将败退。而疫情对经济生产的影响正被越来越多地关注。不可否认的是，第三产企业正面临着严峻考验，尤其是服务于餐饮、旅游、影视娱乐、线下教育等行业的企业，以及服务这些企业的金融机构、投资基金。疫情导致很多此类企业难以继续履行原有的业务合同，很多企业希望以法律上的不可抗力或情势变更为由，延缓甚至免除一定的合同义务。但是能否主张延期、变更或终止合同以减少损失，企业和投资人仍应结合自身情况具体判断。本文将重点探讨疫情之下及疫情过后的企业应对这一问题的注意要点。",
      "content": [
        "当前全国人民同病毒正在激战，我们坚信COVID-19终将败退。而疫情对经济生产的影响正被越来越多地关注。不可否认的是，第三产企业正面临着严峻考验，尤其是服务于餐饮、旅游、影视娱乐、线下教育等行业的企业，以及服务这些企业的金融机构、投资基金。疫情导致很多此类企业难以继续履行原有的业务合同，很多企业希望以法律上的不可抗力或情势变更为由，延缓甚至免除一定的合同义务。但是能否主张延期、变更或终止合同以减少损失，企业和投资人仍应结合自身情况具体判断。本文将重点探讨疫情之下及疫情过后的企业应对这一问题的注意要点。",
        "一、客观判断疫情是否直接导致特定合同的无法履行",
        "不可抗力和情势变更都有严格的适用前提。不可抗力规定在《合同法》第117条，情势变更则是《合同法司法解释（二）》第26条的内容。从法条可以看出，两者必须放到特定合同的情境之下讨论，而并非是对某个事件泛泛的定义。",
        "因此，在决定基于疫情原因终止或暂缓履行合同之前，应客观判断疫情是否对这份特定合同的履行构成影响，以及影响到何种程度。",
        "以房屋或场地租赁合同为例，不同类型、用途的房屋或场地，受疫情影响程度并不相同。商业店铺、文体活动场馆或户外场地，其使用目的都是通过聚集人群来经营获益。此次疫情中，相关政府部门对此类场所普遍要求停业，导致无法使用。对于租赁此类场所的合同各方而言，这种局面可以说难以预见和克服，因此承租方有较大可能基于不可抗力或情势变更而获得租金上的减免。",
        "而写字楼则有所不同，虽然正常情况下员工同样要聚集到办公室工作，但现在各类线上协同办公软件已较为发达，无法使用办公室不会必然导致公司经营停滞。因此，写字楼租赁合同受疫情影响可能相对有限。",
        "对于仓库、自动化厂房这种只需少量人员在场即可运营的商业用房而言，疫情在客观上的影响程度可能很小，因此承租方如果单纯基于疫情原因主张减免租金，可能就难以获得法院支持，只有在政府部门以行政手段要求不得复产复工的情况下，才可以将行政命令作为不可抗力或情势变更因素主张暂缓或终止履行此类租赁合同。",
        "消费类服务合同（俗称“2C”业务）也是创业企业需要关注的重点，尤其是线下教育培训、游戏娱乐等行业，其特点是以收取定期会员费或培训费为主要经营收益。在受疫情影响而被要求停业的情况下，企业可能会面临众多消费者基于不可抗力或情势变更而提出的退费或延期诉求。但企业并非完全处于被动，总体上需要把握一点，即疫情影响的仅是一段时间内的服务义务，并不会导致整个服务合同无法履行。因此企业可以与消费者协商延期提供服务，并适当延长会员期限，而不一定采用退款并解除合同的方式解决。",
        "对于金融机构和投资基金，如果疫情导致其参投企业生产经营困难，很可能会影响资金的回收周期，容易引发借款合同和带有回购条款的投资协议的纠纷。此时金融机构和投资基金需要谨慎行使合同中与提前收回资金相关的权利。目前，多地行政部门和人民法院已出台相关政策和指导意见，限制资金方提前收回资金的权利。因此，融资企业如果在疫情期间发生逾期未还款，或生产经营受到冲击而无法完成业绩指标的情况，资金方应审慎处理，审查融资方是否存在其他违约情形，并考虑基于疫情因素给予融资方适当的宽限。",
        "此外，某些情形下，疫情并不能构成特定合同的不可抗力或情势变更因素。比较典型的情形例如：",
        "1.合同成立于疫情爆发之后，此时合同各方对疫情的影响应有充分的预期，因此疫情不属于各方不可预见的因素，不符合不可抗力或情势变更的构成要件。 2.合同中的付款义务，通常很难因为疫情的影响而无法履行，除非疫情导致合同约定的付款方式无法实现。一般而言，以网上银行汇款转账方式即可完成的付款义务，并不一定会受到疫情影响无法办理。需要特别指出的是，合同相对方因疫情影响一时无法提供商品或服务，并不必然构成付款方延期付款或不付款的抗辩事由，除非合同中明确约定“先交货/先服务、后付款”。 3.在疫情发生之前一方已经违约，此时疫情不能成为违约方免除违约责任的抗辩事由。",
        "以上试举几例，希望能够为企业决策者们提供一个初步的概念，即疫情能否构成不可抗力或情势变更而使特定合同可以暂缓或终止履行，需要对个案具体分析，不能一概而论。",
        "二、确定疫情对合同履行构成不可抗力或情势变更后，要及时履行通知义务",
        "经过对特定合同义务的分析，如果企业判断此次疫情可以构成不可抗力，则应当立即向合同相对方发出书面通知。这是《合同法》第118条规定的必须履行的义务。没有发出过不可抗力通知，只在后续诉讼中提出不可抗力抗辩的，很难得到法院支持，无法获得疫情期间合同义务的减免。但也有案例并未将传染病疫情认定为不可抗力，而是按情势变更处理，根据公平原则酌情减免受影响一方的合同义务，其实际效果与不可抗力区别不大。",
        "根据上述法律规定及实践经验，我们建议不可抗力通知至少应当包括以下内容：",
        "1.不可抗力事件的事实描述、起始时间、终止时间（如果发通知时事件尚未结束，需要另行通知结束时间）； 2.不可抗力事件具体影响了哪些合同义务，以及导致该等义务全部无法履行，还是部分无法履行； 3.提出解决方案，即希望受影响的合同义务免于履行、延期履行或变更履行内容、方式等； 4.证明不可抗力事件确实发生的书面材料。",
        "三、在确定疫情构成不可抗力或情势变更的前提下，合同双方可灵活协商调整受影响的合同履行事项",
        "新冠疫情发生后，多地中级、高级人民法院相继发布审判指导意见，注重对中小微企业合法利益的保护。我们预计，涉及创业企业因疫情导致的合同纠纷，在后续司法实践中将有更大空间适用不可抗力和公平原则确定双方权利义务。但是，适用公平原则相当于使裁判者享有自由裁量权，其结果不一定使合同双方均满意。我们认为最佳方式仍是合同双方通过协商来确定疫情影响下的合同履行具体事项，能履行的尽可能继续履行，无法履行或履行后对一方明显不公平的，可以协商调整履行内容或免除相应义务。毕竟，在疫情的影响下，合同双方很难达到双赢或单赢的局面，也许各自分担损失、各让一步的做法，更具有现实意义。"
      ]
    }
  }
];

const eventDatesFromEnglishSource = new Set([
  "20231117",
  "20230406",
  "20230329",
  "20221218",
  "20221108",
  "20220725",
  "20220710",
  "20220616",
  "20220615",
  "20220609",
  "20220517",
  "20220510",
  "20220331",
  "20220322",
  "20220125",
  "20220124",
  "20220120",
  "20211231",
  "20211015",
  "20210720",
  "20210610",
  "20210518",
  "20210416",
  "20210414",
  "20210315",
  "20201014",
  "20200927",
  "20200526",
  "20200311",
]);

export const events: EventItem[] = [
  ...[...event2Events].sort((a, b) => getEvent2ImageOrder(a) - getEvent2ImageOrder(b)),
  ...allEvents
    .filter((event) => eventDatesFromEnglishSource.has(event.date))
    .map((event) => {
      const detailImages = eventInfoImagesByDate[event.date];
      return detailImages ? { ...event, detailImages } : event;
    }),
];

function getEvent2ImageOrder(event: EventItem) {
  const match = event.image.match(/\/event2\/(\d+)\.(?:jpe?g|png|webp)$/i);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
}

function normalizeLocalizedCopy(copy: EventCopy): EventCopy {
  const titleSeparator = copy.title.includes("｜") ? "｜" : "|";
  const [rawCategory, ...titleParts] = copy.title.split(titleSeparator);
  const titleCategory = rawCategory.trim();
  const title = titleParts.join(titleSeparator).trim();
  const knownCategories = ["虎诉动态", "行业资讯", "虎眼观察"];

  if (title && knownCategories.includes(titleCategory)) {
    return {
      ...copy,
      category: titleCategory,
      title,
    };
  }

  return copy;
}

export function localizeEvent(event: EventItem, language: "en" | "zh"): LocalizedEventItem {
  const localized = language === "zh" ? normalizeLocalizedCopy(event.zh) : event;

  return {
    ...event,
    localizedCategory: localized.category,
    localizedTitle: localized.title,
    localizedSummary: localized.summary,
    localizedContent: localized.content,
  };
}

export function formatEventDate(date: string, language: "en" | "zh" = "en") {
  const year = date.slice(0, 4);
  const rawMonth = date.slice(4, 6);
  const rawDay = date.slice(6, 8);
  const month = Number(rawMonth);
  const day = Number(rawDay);
  const monthNames = ["Jan.", "Feb.", "Mar.", "Apr.", "May.", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];

  if (language === "zh") {
    return `${year}.${rawMonth}.${rawDay}`;
  }

  return `${monthNames[month - 1]} ${day}, ${year}`;
}
