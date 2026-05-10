export type LandingCase = {
  id: string;
  category: {
    en: string;
    zh: string;
  };
  date: {
    en: string;
    zh: string;
  };
  cardTitle: string;
  cardSummary: string;
  name: {
    en: string;
    zh: string;
  };
  description: {
    en: string;
    zh: string;
  };
  keywords: {
    en: string[];
    zh: string[];
  };
};

export const landingCasesData: LandingCase[] = [
  {
    id: "commercial-property-dispute",
    category: {
      en: "Commercial Real Estate / Litigation",
      zh: "商业地产 / 诉讼",
    },
    date: {
      en: "08 January 2025",
      zh: "2025年1月8日",
    },
    cardTitle: "Commercial Property Vacant Possession and Occupation Fees Dispute",
    cardSummary:
      "Represented an investment platform of a major real estate fund in a dispute concerning vacant possession of commercial property and occupation fees.",
    name: {
      en: "Represented an investment platform of a major real estate fund in a dispute concerning vacant possession of commercial property and occupation fees.",
      zh: "代表某大型地产基金旗下投资公司处理商业物业腾退及使用费争议诉讼案件",
    },
    description: {
      en: "Mr Liu represented an investment platform company under a real estate fund with assets under management exceeding RMB 100 billion in a dispute involving a commercial property valued at over RMB 100 million. The client sought to recover vacant possession from a state-owned financial institution and to claim occupation fees. The key issues included the legality of the opposing party's possession, whether such possession could be asserted against the lawful owner, and the appropriate methodology for calculating occupation fees. The court of first instance rendered a judgment substantially supporting the client's claims. During the second-instance proceedings, leveraging the favourable first-instance judgment, Mr Liu successfully negotiated a settlement with the opposing party, ultimately achieving the client's commercial objectives.",
      zh: "刘律师曾代理某千亿级地产基金旗下的投资平台公司，就一处价值逾亿元的商业不动产，要求某国有金融机构腾退物业并支付占有使用费。案件争议焦点包括不动产占有的合法性以及是否可对抗所有权人、占有使用费的计算标准等。一审法院基本全面支持了客户诉求及主张；二审阶段，刘律师代表客户在优势地位下与对方达成和解，最终顺利实现客户商业目标。",
    },
    keywords: {
      en: ["Commercial Real Estate", "Financial Institutions", "Possession and Vacation of Property"],
      zh: ["商业地产", "金融机构", "物业的占有与腾退"],
    },
  },
  {
    id: "patent-ownership-spc",
    category: {
      en: "Patent Ownership / Supreme People's Court",
      zh: "专利权属 / 最高院",
    },
    date: {
      en: "16 December 2022",
      zh: "2022年12月16日",
    },
    cardTitle: "Supreme People's Court Patent Ownership Dispute",
    cardSummary:
      "Represented a leading mobile power bank rental company in a patent ownership dispute before the Supreme People's Court.",
    name: {
      en: "Represented a leading mobile power bank rental company in a patent ownership dispute before the Supreme People's Court.",
      zh: "代表某移动电源租赁领军企业应对由最高院审理的专利权属纠纷诉讼案件",
    },
    description: {
      en: "Mr Liu represented a leading domestic mobile power bank rental company in defending a patent ownership claim brought by another enterprise, with the second-instance proceedings heard by the Supreme People's Court. The disputed patent constituted a core asset underpinning the client's business operations and multiple rounds of financing. Its ownership determination was therefore critical to the stability and predictability of the client's commercial activities. Mr Liu developed the defence by analysing the companies' respective development histories and control relationships, the actual process of patent development and registration, and the commercial implications of the ownership determination. Mr Liu ultimately secured a complete victory for the client.",
      zh: "刘律师曾代表某国内移动电源租赁龙头企业应对另一企业针对客户某项专利权属提起的诉讼案件，该案件由最高人民法院进行二审审理。在该案中，案涉专利作为该龙头企业的业务基石与数次融资的基础，其实际权属将对客户的正常业务以及商业交易的稳定性和可预见性造成极大影响。刘律师从两家企业的发展背景和历史控制关系、案涉专利开发与登记的实际过程，以及对于商业交易的影响等角度进行抗辩。刘律师最终代表客户取得了全面胜诉。",
    },
    keywords: {
      en: ["Supreme People's Court", "Intellectual Property", "Patent", "Commercial Substance"],
      zh: ["最高院", "知识产权", "专利", "商业实质"],
    },
  },
  {
    id: "do-insurance-arbitration",
    category: {
      en: "D&O Liability Insurance / Arbitration",
      zh: "董监高责任保险 / 仲裁",
    },
    date: {
      en: "26 April 2024",
      zh: "2024年4月26日",
    },
    cardTitle: "Landmark D&O Liability Insurance Arbitration Before SHIAC",
    cardSummary:
      "Represented a domestic NASDAQ-listed leading enterprise in the retail industry in handling a D&O liability insurance claim arbitration case.",
    name: {
      en: "Represented a domestic NASDAQ-listed leading enterprise in the retail industry in handling a D&O liability insurance claim arbitration case.",
      zh: "代表某纳斯达克上市国内零售行业龙头企业处理董监高责任保险索赔仲裁案件",
    },
    description: {
      en: "Mr. Liu represented a NASDAQ-listed leading domestic beverage retail enterprise in a directors and officers (D&O) liability insurance dispute before the Shanghai International Arbitration Center (SHIAC) against a top-tier domestic insurance company. This case was the first D&O liability insurance dispute in China with a clear arbitral award, involving multi-layered D&O insurance coverage, and was widely followed by the media for its landmark significance to the development of D&O liability insurance in China. In this case, Mr. Liu drew on international D&O insurance claim scenarios and precedents, conducting an in-depth analysis and argumentation on the application of key provisions such as “severability” and “exclusions.” He ultimately succeeded in persuading the arbitral tribunal to accept his arguments, securing a comprehensive victory for the client and achieving full indemnity across all layers of insurance coverage.",
      zh: "刘律师曾代表一家纳斯达克上市的国内饮品零售行业龙头企业，在上海国际仲裁中心针对国内头部保险公司提起了一起董监高责任保险纠纷案件。该案是国内首起有明确裁决结果的董监高责任保险纠纷案件，同时涉及多层嵌套的董监高责任保险，对国内董监高责任险的发展具有里程碑式意义，因而备受媒体关注。在该案中，刘律师借鉴境外董责险业务的赔付情形及案例，深入分析论证了“可分割性”“责任免除”等关键条款的适用，最终成功说服仲裁庭采纳我方主张，代表客户取得全面胜诉，实现各层保险的全额赔付。",
    },
    keywords: {
      en: ["D&O Liability Insurance", "Insurance Claim", "Interpretation of Contract Clauses"],
      zh: ["董监高责任保险", "保险索赔", "合同条款解读"],
    },
  },
  {
    id: "film-investment-dispute",
    category: {
      en: "Film Investment / Litigation and Enforcement",
      zh: "影视投资 / 诉讼与执行",
    },
    date: {
      en: "27 December 2025",
      zh: "2025年12月27日",
    },
    cardTitle: "Film Project Investment Dispute and Enforcement Recovery",
    cardSummary:
      "Represented a top-tier listed film and entertainment enterprise in handling dispute resolution cases concerning investment in film and television projects.",
    name: {
      en: "Represented a top-tier listed film and entertainment enterprise in handling dispute resolution cases concerning investment in film and television projects.",
      zh: "代表某顶尖影视娱乐上市企业处理影视项目投资争议纠纷案件",
    },
    description: {
      en: "Represented a film and television entertainment company listed on the Hong Kong Stock Exchange with a market capitalization exceeding HKD 10 billion, Mr. Liu handled an investment dispute arising from a major film production project. The project's producer had entered into separate agreements with multiple investors and a distributor, and the conflicting rights and interests across these agreements led to a dispute among the producer, distributor, and investors over the ownership of film distribution revenue. The case amount was approximately RMB 150 million. The core legal issues involved the rights and obligations under a jointly managed account for distribution revenue, and the application of multiple conflicting agreements. Representing the distributor of the film project, Mr. Liu secured comprehensive victories through the first instance, second instance, and retrial proceedings before the Supreme People's Court. Meanwhile, during the litigation, the project's producer, in collusion with its affiliated investors, transferred the distribution revenue to a third-party related entity. Mr. Liu, through procedures such as enforcement objection and enforcement objection litigation, successfully compelled the producer and its affiliated investors to return and transfer the funds to the client, resulting in full actual recovery of the amount.",
      zh: "代表一家市值超百亿港元的香港证券交易所影视娱乐上市企业，处理一起因大制作影视项目引发的投资争议纠纷。该项目的出品方分别与多个投资方、宣发方单独签署了多份协议，不同协议之间的权益约定存在冲突，导致出品方、宣发方及投资方就电影发行收入的归属产生争议，案件标的额约人民币1.5亿元。核心法律争议包括：发行收入共管账户的权利义务关系，以及多份冲突协议的适用关系。刘律师代表影视项目的宣发方，历经一审、二审及最高人民法院再审程序，均取得全面胜诉。同时，在诉讼过程中，项目出品方伙同其关联投资方将发行收入转移至第三方关联主体。刘律师通过执行异议、执行异议之诉等程序，成功促使出品方及关联投资方将款项回转并执行至客户名下，帮助客户实现全额实际回款。",
    },
    keywords: {
      en: ["Supreme People's Court", "Film and Television Entertainment", "Objection to Enforcement", "Commercial Investment"],
      zh: ["最高院", "影视娱乐", "执行异议", "商业投资"],
    },
  },
  {
    id: "equity-repurchase-cietac",
    category: {
      en: "Equity Repurchase / Arbitration",
      zh: "股权回购 / 仲裁",
    },
    date: {
      en: "16 November 2023",
      zh: "2023年11月16日",
    },
    cardTitle: "CIETAC Equity Repurchase Arbitration",
    cardSummary:
      "Represented an enterprise under a top-tier investment institution in handling an equity repurchase dispute arbitration case.",
    name: {
      en: "Represented an enterprise under a top-tier investment institution in handling an equity repurchase dispute arbitration case",
      zh: "代表某头部投资机构旗下的企业处理股权回购纠纷仲裁案件",
    },
    description: {
      en: "Represented an enterprise affiliated with an investment institution whose cumulative assets under management exceed RMB 100 billion, Mr. Liu filed an equity repurchase arbitration application with the China International Economic and Trade Arbitration Commission (CIETAC) against the invested company and its de facto controller, with a case amount of approximately RMB 100 million. Through communications with the client and other means, Mr. Liu conducted in-depth research and analysis of the counterparty's business operations and core activities, identified its key assets, and immediately took property preservation measures to seize and freeze those core assets, thereby forcing the counterparty to proactively seek a settlement. Ultimately, Mr. Liu led the client to a settlement from a position of strong advantage, and after the client had actually recovered the payment, applied to the preservation court for the lifting of the property preservation measures.",
      zh: "代表一家累计资产管理规模超千亿的投资机构旗下的企业，针对被投公司及其实际控制人，向中国国际经济贸易仲裁委员会提起股权回购仲裁申请，案件标的额约人民币1亿元。刘律师通过与客户沟通等方式，对相对方的经营状况、主营业务等展开深入调研与分析，锁定其核心资产，并立即采取财产保全措施，查封冻结该等核心资产，从而迫使相对方主动寻求和解。最终，刘律师代表客户以绝对优势地位达成和解，并在客户实际取得回款后，向保全法院申请解除财产保全措施。",
    },
    keywords: {
      en: ["Equity Repurchase", "Asset Preservation", "Commercial Investment"],
      zh: ["股权回购", "财产保全", "商业投资"],
    },
  },
  {
    id: "third-party-revocation-equity-transfer",
    category: {
      en: "Third-Party Revocation Action",
      zh: "第三人撤销之诉 / 股权转让",
    },
    date: {
      en: "15 January 2025",
      zh: "2025年1月15日",
    },
    cardTitle: "Third-Party Revocation Action over a Major Equity Transfer",
    cardSummary:
      "Representing a Hong Kong-listed entertainment company in a third-party revocation action arising from a major equity transfer dispute.",
    name: {
      en: "Representing a Hong Kong-listed entertainment company in a third-party revocation action arising from a major equity transfer dispute",
      zh: "代表某港股上市影视娱乐企业提起重大股权交易第三人撤销之诉案件",
    },
    description: {
      en: "Mr Liu represented a Hong Kong-listed entertainment company with a market capitalisation exceeding RMB 10 billion in initiating a third-party revocation action before the Beijing High People's Court in connection with a creditor's revocation dispute arising from an equity transfer transaction valued at over USD 30 million. The case involved complex and significant issues, including the conditions and boundaries for exercising creditor's revocation rights, the standards for assessing good faith and commercial reasonableness in an equity transfer, and the judicial protection of a third party's lawful transactional interests. The matter was legally intricate and high in value. Mr Liu secured a substantive victory for the client at first instance. The case has now proceeded to the second instance before the Supreme People's Court.",
      zh: "刘律师代理某市值逾百亿的港股上市影视娱乐企业，就一项交易价值超过3,000万美元的股权转让所涉债权人撤销权纠纷，向北京市高级人民法院提起第三人撤销之诉。案件围绕债权人撤销权的行使要件与边界、股权交易中善意与合理对价的认定标准，以及第三人合法交易利益的司法保护等核心问题展开，法律关系复杂、争议金额重大。刘律师代表客户在一审程序中取得实质性胜诉，目前案件已进入二审程序，由最高人民法院审理。",
    },
    keywords: {
      en: ["Supreme People's Court", "Third-Party Revocation Action", "Creditor's Revocation Right", "Equity Transfer Dispute"],
      zh: ["最高院", "第三人撤销之诉", "股权转让纠纷"],
    },
  },
  {
    id: "shortfall-compensation-arbitration",
    category: {
      en: "Shortfall Compensation Agreement",
      zh: "差额补足协议 / 仲裁",
    },
    date: {
      en: "13 January 2020",
      zh: "2020年1月13日",
    },
    cardTitle: "BAC Shortfall Compensation Agreement Arbitration",
    cardSummary:
      "Represented a leading large-scale investment institution in a dispute over a value adjustment and compensation agreement.",
    name: {
      en: "Represented a leading large-scale investment institution in a dispute over a value adjustment and compensation agreement",
      zh: "代表某大型顶尖投资机构处理差额补足协议纠纷案件",
    },
    description: {
      en: "Mr Liu represented a major investment institution with assets under management exceeding RMB 40 billion in commencing arbitration before the Beijing Arbitration Commission against the actual controller of a leading entertainment group in a dispute arising from a value adjustment and compensation agreement, with an amount in dispute of approximately RMB 450 million. The case involved a number of complex legal issues, including defects in contract execution procedures, the validity of downside protection arrangements entered into by the actual controller of a listed company, and the allocation of transactional relationships and liabilities within a multi-layered trust-based investment structure. Both the legal relationships and the underlying transaction structure were highly complex. Mr Liu ultimately secured a complete victory for the client, effectively safeguarding its substantial investment interests.",
      zh: "刘律师曾代表某投资规模逾400亿元的大型投资机构，针对某头部娱乐集团实际控制人向北京仲裁委员会提起差额补足协议纠纷仲裁，案件标的金额约人民币4.5亿元。该案围绕合同签署程序瑕疵、上市公司实际控制人签署保底合同的效力认定，以及多层信托嵌套投资结构下交易关系与责任承担等复杂法律问题展开，法律关系与交易结构均较为复杂。刘律师最终代表客户取得全面胜诉，切实维护了客户重大投资利益。",
    },
    keywords: {
      en: ["Shortfall Compensation Agreement", "Multi-layered Trust Investment Structure", ],
      zh: ["差额补足协议", "多层信托投资结构", "上市公司实控人"],
    },
  },
  {
    id: "owners-committee-retrial",
    category: {
      en: "Property Dispute / Retrial",
      zh: "物业纠纷 / 再审",
    },
    date: {
      en: "17 December 2021",
      zh: "2021年12月17日",
    },
    cardTitle: "Landmark Owners' Committee Retrial Before the SPC",
    cardSummary:
      "Represented a certain owners' committee in handling the country's first property management dispute case.",
    name: {
      en: "Represented a certain owners' committee in handling the country's first property management dispute case",
      zh: "代表某业主委员会处理全国首例与房地产公司间物业纠纷再审案件",
    },
    description: {
      en: "Mr. Liu represented an owners' committee in a dispute with a real estate developer and, in the name of the owners' committee, applied for a retrial before the Supreme People's Court, with the amount in dispute exceeding CNY 50 million. Ultimately, Mr. Liu successfully persuaded the Supreme People's Court to overturn the findings of the first-instance and second-instance judgments, and for the first time recognized the owners' committee as having standing in civil litigation, achieving a breakthrough ruling on a key legal issue. The case has been included in the “People's Court Case Database” and has become a landmark case in the field of disputes over commodity housing sale and purchase contracts.",
      zh: "刘律师曾代理某业主委员会，就其与房地产开发公司间纠纷，以业主委员会自身名义向最高人民法院申请再审程序，案涉总金额超人民币5000万元。最终，刘律师成功说服了最高院在该案中推翻一审、二审判决的认定，首次认可了业主委员会的民事诉讼主体资格，实现关键法律争点的突破性改判。该案件现已成为“人民法院案例库”入库案例，以及房屋买卖合同纠纷领域具有标志意义的经典案例。",
    },
    keywords: {
      en: ["Supreme People's Court\nRetrial reversal"],
      zh: ["最高院\n再审改判"],
    },
  },
  {
    id: "administrative-penalty-hearing",
    category: {
      en: "Administrative Penalty / Hearing",
      zh: "行政处罚 / 听证",
    },
    date: {
      en: "30 November 2020",
      zh: "2020年11月30日",
    },
    cardTitle: "Administrative Penalty Hearing on Epidemic Materials Pricing",
    cardSummary:
      "Represented a subsidiary of a top listed medical device company in China's first administrative penalty hearing over epidemic-material pricing.",
    name: {
      en: "Represented a top domestic listed medical equipment company in an administrative penalty hearing proceeding.",
      zh: "代表某国内顶尖医疗设备上市公司应对行政处罚听证程序",
    },
    description: {
      en: "Mr. Liu represented a subsidiary of a leading listed medical device company in an administrative penalty hearing conducted by the market regulatory authority in relation to the pricing of epidemic prevention materials. This case was the first in Mainland China involving an administrative penalty for alleged price gouging of epidemic prevention materials and therefore attracted significant public attention. Ultimately, Mr. Liu successfully caused the market regulatory authority to reduce the originally proposed administrative penalty from nearly CNY 100 million to CNY 3 million, thereby preventing the substantial stock price volatility that could have been caused by a massive penalty.",
      zh: "刘律师曾代理一家国内顶尖医疗设备上市公司旗下子公司，参与一起由市场监管部门就防疫物资价格问题拟作出的行政处罚听证程序。该案为全国首起因涉嫌哄抬防疫物资价格而面临行政处罚的案例，因而社会关注度较高。最终，刘律师成功促使市场监管部门将原定近亿元的行政处罚减少至300万元，为该上市公司成功避免了因巨额行政处罚所可能导致的巨额股价波动损失。",
    },
    keywords: {
      en: ["Administrative Penalty", "Hearing Procedure", "Market Supervision"],
      zh: ["行政处罚", "听证程序", "市场监管"],
    },
  },
];
