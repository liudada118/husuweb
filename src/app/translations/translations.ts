import type { Language } from "@/lib/site-types";
import type { SiteSettings } from "@/lib/site-settings";

export const translations = {
  zh: {
    // Header
    header: {
      home: '关于',
      about: '奖项',
      events: '活动',
      media: '媒体',
      podcast: '播客',
      contact: '联系方式',
      logoName: 'Tiger Partners',
      logoSubtitle: 'Tiger Partners'
    },
    // Hero
    hero: {
      tagline1: '极力倡导，',
      tagline2: '策略为先。',
      mainTitle: '跨境商事争议与国际仲裁律师',
      description: '老虎律盟创始和管理合伙人，为客户提供涉案金额数千万美元级别的高风险跨境争议的咨询和代理服务。',
      viewProfile: '查看完整履历',
      viewCases: '代表性案例',
      nameLabel: 'Tiger Partners',
      nameSubLabel: '创始和管理合伙人，老虎律盟'
    },
    // About
    about: {
      title: '关于 Tiger Partners',
      paragraph1: 'Tiger Partners 是老虎律盟的创始和管理合伙人，专注于跨境商事争议和国际仲裁，涉案争议金额达数千万美元。',
      paragraph2: '在六年时间内，他带领老虎律盟获得了 Chambers、The Legal 500 和 ALB 的认可，他本人也被评选为《法律 500 强》中国精英律师以及《商法》杂志的 A-List 律师。',
      paragraph3: '他还主持专业观察《虎诉观察》，每集可触达数十万专业听众。',
      moreAbout: '了解更多关于 Tiger Partners'
    },
    // Cases
    cases: {
      title: '代表性案例',
      subtitle: '在中国领先的法院和仲裁机构处理的高价值、复杂的争议案件。',
      viewCase: '查看案例',
      casesData: [
        {
          type: '第三人撤销之诉 · 诉讼',
          title: '代表某港股上市影视娱乐企业提起重大股权交易第三人撤销之诉案件',
          date: '2025 年 1 月 15 日',
          summary: '虎诉团队代理某市值逾百亿的港股上市影视娱乐企业，就一项交易价值超过 3,000 万美元的股权转让所涉债权人撤销权纠纷，向北京市高级人民法院提起第三人撤销之诉。案件围绕债权人撤销权的行使要件与边界、股权交易中善意与合理对价的认定标准，以及第三人合法交易利益的司法保护等核心问题展开，法律关系复杂、争议金额重大。虎诉团队代表客户在一审程序中取得实质性胜诉，目前案件已进入二审程序，由最高人民法院审理。',
          keywords: ['最高院', '第三人撤销之诉', '股权转让纠纷']
        },
        {
          type: '商业地产 · 诉讼',
          title: '涉及超过 1 亿人民币商业房产的交付占有争议',
          date: '2025 年 1 月 8 日',
          summary: '虎诉团队代表一家资产管理规模超过 1000 亿人民币的房地产基金旗下投资平台，与一家国有金融机构就房产交付占有和占用费问题发生争议。主要争议点包括对方占有的合法性以及占用费的计算方法。在取得高度有利的一审判决后，他利用这一优势在二审阶段通过协商达成和解，完全实现了客户的商业目标。',
          keywords: ['商业地产', '金融机构', '房产占有与交付']
        },
        {
          type: '董责险 · 仲裁',
          title: '上海国际仲裁中心标志性董责险仲裁案',
          date: '2024 年 4 月 26 日',
          summary: '虎诉团队代表一家纳斯达克上市的领先饮料零售公司，在上海国际仲裁中心针对一家顶级国内保险公司提起董责险争议仲裁。这是中国大陆第一起有明确裁决结果的董责险案件，涉及多层董责险保障，引起了媒体的广泛关注。他借鉴国际先例，分析"可分性"和"除外责任"等关键条款，为客户赢得了全面胜利，获得了所有层级保障的全额赔付。',
          keywords: ['董责险', '保险索赔', '合同解释']
        },
        {
          type: '最高人民法院 · 诉讼',
          title: '最高法院高风险股东权益争议达成和解',
          date: '2023 年 11 月 12 日',
          summary: '在一起涉及非上市公众公司的复杂公司治理和股权争议中，虎诉团队为少数股东提供咨询服务，成功抵御了大股东的挤出企图。他的团队制定的战略诉讼计划迫使对方达成和解，承认了少数股东以溢价估值退出的权利。',
          keywords: ['公司治理', '股东争议', '最高人民法院']
        },
        {
          type: '跨境技术 · 仲裁',
          title: '香港国际仲裁中心数百万美元软件许可仲裁案',
          date: '2023 年 9 月 15 日',
          summary: '成功为一家中国顶级科技集团辩护，应对欧洲软件提供商提起的复杂软件许可和版税争议。该仲裁适用香港国际仲裁中心规则，涉及关于源代码部署的复杂技术专家证人证词和交叉询问。最终获得有利裁决，驳回了原告超过 85% 的损害赔偿要求。',
          keywords: ['香港国际仲裁中心', '技术转移', '跨境']
        },
        {
          type: '商业秘密 · 诉讼',
          title: '抵御 5000 万人民币商业秘密侵权索赔',
          date: '2023 年 3 月 3 日',
          summary: '代表一家领先的国内自动驾驶初创企业及其创始人，应对前雇主关于商业秘密侵权的指控。通过严格的技术鉴定和战略性的程序挑战，虎诉团队的团队成功证明了所声称秘密缺乏新颖性，导致所有索赔被完全驳回，保护了客户的核心知识产权资产。',
          keywords: ['商业秘密', '不正当竞争', '知识产权诉讼']
        },
        {
          type: '物业纠纷 · 再审',
          title: '代表某业主委员会处理全国首例与房地产公司间物业纠纷再审案件',
          date: '2021 年 12 月 17 日',
          summary: '虎诉团队曾代理某业主委员会，就其与房地产开发公司间纠纷，以业主委员会自身名义向最高人民法院申请再审程序，案涉总金额超人民币 5,000 万元。最终，虎诉团队成功说服最高院在该案中推翻一审、二审判决的认定，首次认可了业主委员会的民事诉讼主体资格，实现关键法律争点的突破性改判。该案件现已成为“人民法院案例库”入库案例，以及房屋买卖合同纠纷领域具有标志意义的经典案例。',
          keywords: ['最高院', '再审改判']
        },
        {
          type: '投资争议 · 仲裁',
          title: '代表某大型顶尖投资机构处理差额补足协议纠纷案件',
          date: '2020 年 1 月 13 日',
          summary: '虎诉团队曾代表某投资规模逾 400 亿元的大型投资机构，针对某头部娱乐集团实际控制人向北京仲裁委员会提起差额补足协议纠纷仲裁，案件标的金额约人民币 4.5 亿元。该案围绕合同签署程序瑕疵、上市公司实际控制人签署保底合同的效力认定，以及多层信托嵌套投资结构下交易关系与责任承担等复杂法律问题展开，法律关系与交易结构均较为复杂。虎诉团队最终代表客户取得全面胜诉，切实维护了客户重大投资利益。',
          keywords: ['差额补足协议', '多层信托投资结构', '上市公司实控人']
        }
      ]
    },
    // Explore
    explore: {
      title: '探索更多',
      cards: [
        {
          title: '事件与案例',
          desc: '精选的 Tiger Partners 处理的关键争议、仲裁和标志性判决时间线。',
          btn: '查看所有事件'
        },
        {
          title: '媒体与荣誉',
          desc: '媒体报道、排名和案例报告，包括 Chambers、The Legal 500、ALB 和领先的司法案例数据库。',
          btn: '查看媒体'
        },
        {
          title: '播客 – 虎诉观察',
          desc: '由 Tiger Partners 主持的专业观察，专注于复杂争议、仲裁和跨境执行，每集触达数十万专业听众。',
          btn: '立即收听'
        }
      ]
    },
    // CTA
    cta: {
      badge: '联系我们',
      title: '讨论复杂争议或仲裁事宜',
      description: '如果您正在处理高价值、复杂的跨境争议或国际仲裁，欢迎直接联系。',
      contactButton: '联系 Tiger Partners',
      email: 'your.email@tiger-partners.com',
      phone: '+86 XX-XXXX XXXX'
    },
    // Footer
    footer: {
      subtitle: '跨境商事争议与国际仲裁律师',
      contact: '联系方式',
      platforms: 'Tiger Partners 及平台',
      tigerPartners: 'Tiger Partners',
      linkedin: 'LinkedIn',
      bilibili: 'bilibili',
      xiaohongshu: '小红书',
      subscribe: '订阅',
      subscribeDesc: '订阅以获取标志性案例更新和实用见解。',
      emailPlaceholder: '邮箱地址',
      copyright: 'Tiger Partners. 保留所有权利。',
      privacy: '隐私政策',
      terms: '服务条款',
      watermark: 'Tiger Partners'
    }
  },
  en: {
    // Header
    header: {
      home: 'ABOUT',
      about: 'AWARDS',
      events: 'EVENT',
      media: 'MEDIA',
      podcast: 'PODCAST',
      contact: 'CONTACT',
      logoName: 'Tiger Partners',
      logoSubtitle: 'Tiger Partners'
    },
    // Hero
    hero: {
      tagline1: 'Relentless in Advocacy. ',
      tagline2: 'Strategic by Design.',
      mainTitle: 'Cross-Border Commercial Disputes & International Arbitration Lawyer',
      description: 'Founding and Managing Partner of Tiger Partners, advising and representing clients in high-stakes cross-border disputes at the tens-of-millions-of-US-dollars level.',
      viewProfile: 'View Full Profile',
      viewCases: 'Representative Cases',
      nameLabel: 'Tiger Partners',
      nameSubLabel: 'Founding & Managing Partner, Tiger Partners'
    },
    // About
    about: {
      title: 'About Tiger Partners',
      paragraph1: 'Tiger Partners is the Founding and Managing Partner of Tiger Partners. His practice focuses on cross-border commercial disputes and international arbitration involving amounts in dispute in the tens of millions of US dollars.',
      paragraph2: 'Within six years, he has led Tiger Partners to recognition by Chambers, The Legal 500 and ALB, and has himself been named to The Legal 500 China Elite and the A-List by China Business Law Journal.',
      paragraph3: 'He also hosts the legal podcast \'Tiger Partners Insights\', which reaches hundreds of thousands of professionals with each episode.',
      moreAbout: 'More about Tiger Partners'
    },
    // Cases
    cases: {
      title: 'Representative Cases',
      subtitle: 'High-value, complex disputes before leading courts and arbitral institutions in China.',
      viewCase: 'View Case',
      casesData: [
        {
          type: 'Third-Party Revocation Action · Litigation',
          title: 'Representing a Hong Kong-Listed Entertainment Company in a Third-Party Revocation Action Arising from a Major Equity Transfer Dispute',
          date: '15 January 2025',
          summary: 'Tiger Partners represented a Hong Kong-listed entertainment company with a market capitalisation exceeding RMB 10 billion in initiating a third-party revocation action before the Beijing High People\'s Court in connection with a creditor\'s revocation dispute arising from an equity transfer transaction valued at over USD 30 million. The case involved complex and significant issues, including the conditions and boundaries for exercising creditor\'s revocation rights, the standards for assessing good faith and commercial reasonableness in an equity transfer, and the judicial protection of a third party\'s lawful transactional interests. The matter was legally intricate and high in value. Tiger Partners secured a substantive victory for the client at first instance. The case has now proceeded to the second instance before the Supreme People\'s Court.',
          keywords: ['Supreme People\'s Court', 'Third-Party Revocation Action', 'Creditor\'s Revocation Right', 'Equity Transfer Dispute']
        },
        {
          type: 'Commercial Real Estate · Litigation',
          title: 'Vacant Possession Dispute Involving a Commercial Property Exceeding RMB 100 Million',
          date: '8 January 2025',
          summary: 'Tiger Partners represented an investment platform under a real estate fund with assets under management exceeding RMB 100 billion in a dispute with a state-owned financial institution over vacant possession and occupation fees. The key issues included the legality of the counterparty\'s possession and the methodology for calculating occupation fees. After obtaining a highly favourable first-instance judgment, he used this position to negotiate a settlement on appeal, fully achieving the client\'s commercial objectives.',
          keywords: ['Commercial Real Estate', 'Financial Institutions', 'Possession & Vacation of Property']
        },
        {
          type: 'D&O Liability Insurance · Arbitration',
          title: 'Landmark D&O Liability Insurance Arbitration Before SHIAC',
          date: '26 April 2024',
          summary: 'Tiger Partners represented a NASDAQ-listed leading beverage retail company in a D&O liability insurance dispute before SHIAC against a top-tier domestic insurance company. This was the first D&O liability insurance case in Mainland China with a clear arbitral award, involving multi-layered D&O coverage and attracting significant media attention. Drawing on international precedents and analysing key clauses such as \'severability\' and \'exclusions\', he secured a comprehensive victory and full indemnity across all layers of coverage.',
          keywords: ['D&O Liability Insurance', 'Insurance Claim', 'Contract Interpretation']
        },
        {
          type: 'Supreme People\'s Court · Litigation',
          title: 'High-Stakes Shareholder Equity Dispute Settled in Supreme Court',
          date: '12 November 2023',
          summary: 'In a complex corporate governance and equity dispute involving an unlisted public company, Tiger Partners advised minority shareholders in successfully defending against a squeeze-out attempt by the majority stakeholder. His team\'s strategic litigation plan forced the opposing side into a settlement that recognized the minority shareholders\' exit rights at a premium valuation.',
          keywords: ['Corporate Governance', 'Shareholder Dispute', 'Supreme People\'s Court']
        },
        {
          type: 'Cross-Border Technology · Arbitration',
          title: 'Multi-Million Dollar Software Licensing Arbitration at HKIAC',
          date: '15 September 2023',
          summary: 'Successfully defended a top-tier Chinese technology conglomerate in a complex software licensing and royalty dispute initiated by a European software provider. The arbitration, seated in Hong Kong under HKIAC rules, involved intricate technical expert witness testimonies and cross-examination on source code deployment. Secured a favorable award that dismissed over 85% of the claimant\'s damages.',
          keywords: ['HKIAC', 'Technology Transfer', 'Cross-Border']
        },
        {
          type: 'Trade Secret · Litigation',
          title: 'Defending Against a RMB 50 Million Trade Secret Misappropriation Claim',
          date: '3 March 2023',
          summary: 'Represented a leading domestic autonomous driving startup and its founders against allegations of trade secret misappropriation by their former employer. Through rigorous technical appraisal and strategic procedural challenges, Tiger Partners\'s team successfully demonstrated the lack of novelty in the claimed secrets, leading to a complete dismissal of the claims and protecting the client\'s core IP assets.',
          keywords: ['Trade Secrets', 'Unfair Competition', 'IP Litigation']
        },
        {
          type: 'Property Dispute · Retrial',
          title: 'Represented a Certain Owners\' Committee in Handling the Country\'s First Property Management Dispute Case',
          date: '17 December 2021',
          summary: 'Tiger Partners represented an owners\' committee in a dispute with a real estate developer and, in the name of the owners\' committee, applied for a retrial before the Supreme People\'s Court, with the amount in dispute exceeding CNY 50 million. Ultimately, Tiger Partners successfully persuaded the Supreme People\'s Court to overturn the findings of the first-instance and second-instance judgments, and for the first time recognized the owners\' committee as having standing in civil litigation, achieving a breakthrough ruling on a key legal issue. The case has been included in the "People\'s Court Case Database" and has become a landmark case in the field of disputes over commodity housing sale and purchase contracts.',
          keywords: ['Supreme People\'s Court', 'Retrial Reversal']
        },
        {
          type: 'Investment Dispute · Arbitration',
          title: 'Represented a Leading Large-Scale Investment Institution in a Dispute over a Value Adjustment and Compensation Agreement',
          date: '13 January 2020',
          summary: 'Tiger Partners represented a major investment institution with assets under management exceeding RMB 40 billion in commencing arbitration before the Beijing Arbitration Commission against the actual controller of a leading entertainment group in a dispute arising from a value adjustment and compensation agreement, with an amount in dispute of approximately RMB 450 million. The case involved a number of complex legal issues, including defects in contract execution procedures, the validity of downside protection arrangements entered into by the actual controller of a listed company, and the allocation of transactional relationships and liabilities within a multi-layered trust-based investment structure. Both the legal relationships and the underlying transaction structure were highly complex. Tiger Partners ultimately secured a complete victory for the client, effectively safeguarding its substantial investment interests.',
          keywords: ['Shortfall Compensation Agreement', 'Multi-layered Trust Investment Structure', ]
        }
      ]
    },
    // Explore
    explore: {
      title: 'Explore More',
      cards: [
        {
          title: 'Events & Cases',
          desc: 'A curated timeline of key disputes, arbitrations and landmark decisions handled by Tiger Partners.',
          btn: 'View All Events'
        },
        {
          title: 'Media & Recognitions',
          desc: 'Media coverage, rankings and case reports, including Chambers, The Legal 500, ALB and leading judicial case databases.',
          btn: 'View Media'
        },
        {
          title: 'Podcast – Tiger Partners Insights',
          desc: 'A legal podcast hosted by Tiger Partners, focusing on complex disputes, arbitration and cross-border enforcement, and reaching hundreds of thousands of professional listeners per episode.',
          btn: 'Listen Now'
        }
      ]
    },
    // CTA
    cta: {
      badge: 'Get in touch',
      title: 'Discuss a Complex Dispute or Arbitration Matter',
      description: 'If you are dealing with a high-value, complex cross-border dispute or international arbitration, you are welcome to get in touch directly.',
      contactButton: 'Contact Tiger Partners',
      email: 'your.email@tiger-partners.com',
      phone: '+86 XX-XXXX XXXX'
    },
    // Footer
    footer: {
      subtitle: 'Cross-Border Commercial Disputes & International Arbitration Lawyer',
      contact: 'Contact',
      platforms: 'Tiger Partners & Platforms',
      tigerPartners: 'Tiger Partners',
      linkedin: 'LinkedIn',
      bilibili: 'bilibili',
      xiaohongshu: 'Xiaohongshu',
      subscribe: 'Subscribe',
      subscribeDesc: 'Subscribe for updates on landmark cases and practical insights.',
      emailPlaceholder: 'Email address',
      copyright: 'Tiger Partners. All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      watermark: 'Tiger Partners'
    }
  }
};

export type SiteTranslations = typeof translations;
export type SiteContent = SiteTranslations & {
  siteSettings: SiteSettings;
};
export type SiteLocaleContent = SiteTranslations[Language];

export function useTranslation(lang: Language) {
  return translations[lang];
}
