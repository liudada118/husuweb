export type TeamProfile = {
  slug: string;
  name: string;
  zhName: string;
  title: string;
  zhTitle: string;
  image: string;
  phone: string;
  email: string;
  serviceIndustries: string[];
  education: string;
  qualification: string;
  languages: string[];
  socialEngagements: string;
  practiceArea: string;
  practiceExperience: string;
  honors: string[];
  achievements: string[];
  zh: {
    serviceIndustries: string[];
    education: string;
    qualification: string;
    languages: string[];
    socialEngagements: string;
    practiceArea: string;
    practiceExperience: string;
    honors: string[];
    achievements: string[];
  };
};

const yuxuanAchievements = [
  "Represented an investment institution with an investment scale of over RMB 40 billion in a dispute with the controller of a top entertainment company in the Beijing Arbitration Commission over a deficiency agreement, with the subject matter of the case over RMB 450 million.",
  "Represented a domestic sanitation giant in a share transfer dispute lawsuit against a subsidiary corporation belonging to a Hong Kong Stock Exchange-listed group company, involving a subject matter of over RMB 370 million.",
  "Represented a well-known domestic entrepreneur in the energy industry in a corporate control dispute regarding a leading domestic mobile charger enterprise, involving share interests valued at upwards of RMB 2 billion.",
  "Represented a well-known real estate investment company in a lease contract dispute with the subsidiary of the largest state-owned oil and gas company in China before the Beijing No.3 Intermediate People's Court, with a subject matter of approximately RMB 360 million.",
  "Represented a homeowners' committee in the Supreme People's Court in a retrial case against a real estate development company, involving a total amount exceeding RMB 50 million.",
  "Represented a Hong Kong listed company in a construction contract dispute with a well-known domestic construction company in the Liaoning Higher People's Court, with the case value up to RMB 800 million.",
  "Represented a leading industrial investment and merger and acquisition institution in a stock repurchase dispute with a domestic leading artificial intelligence and big data enterprise in the Beijing Arbitration Commission, with a subject matter of around RMB 300 million.",
  "Represented a leading domestic construction company in an arbitration against a well-known real estate enterprise and its actual controller at the Beijing Arbitration Commission, involving a claim exceeding RMB 300 million.",
  "Represented a leading domestic investment institution in an arbitration against a foreign enterprise at the Beijing Arbitration Commission, involving a claim of approximately RMB 140 million.",
  "Represented a subsidiary of a domestic top listed medical equipment company in an administrative penalty hearing proceeding, successfully reducing the original administrative penalty from nearly RMB 100 million to RMB 3 million.",
  "Represented the actual controller of a well-known domestic investment institution in an equity transfer dispute case against three enterprises at the China International Economic and Trade Arbitration Commission, involving a claim of over RMB 140 million.",
  "Represented a leading domestic technology innovation investment company in an equity repurchase arbitration against the invested company and its actual controllers at the China International Economic and Trade Arbitration Commission, involving a claim of approximately RMB 100 million.",
  "Represented a subsidiary of an investment institution with over RMB 100 billion in assets under its management to request a state-owned financial institution to vacate from the property, with a subject matter of approximately RMB 100 million.",
  "Represented a large estate enterprise in an arbitration dispute in the Beijing Arbitration Commission against its cooperation party in relation to a large-scale real estate investment and construction project, with both parties' total claims amounting to nearly RMB 600 million.",
  "Represented a leading NASDAQ-listed sales company in a directors and officers liability insurance dispute case at the Shanghai International Arbitration Center, achieving a recovery of USD 25 million.",
  "Representing a Hong Kong Stock Exchange-listed film and entertainment company to file a third-party rescission lawsuit in the Beijing High People's Court, involving equities worth over USD 30 million.",
  "Represented a leading entrepreneur in the technology sector in equity repurchase arbitration cases initiated by a Fortune 500 foreign investment company and a Chinese local government fund at the Shanghai International Arbitration Center, with a total claim amount exceeding RMB 1 billion.",
  "Represented a leading domestic film entertainment and ticket sales company in handling ticket revenue disputes related to concert projects involving project partners and actual controllers.",
  "Represented a Hong Kong-listed film and entertainment company in an investment dispute arising from a major film production project regarding the allocation of distribution revenues, involving an amount of approximately RMB 150 million.",
  "Represented a leading domestic enterprise in the health and technology sector in a share transfer dispute filed by a limited partner of a fund, involving an equity valuation of over RMB 350 million.",
  "Represented a subsidiary of a major high-end commercial real estate development and operation company in an arbitration case concerning a share repurchase dispute against a health technology company, involving an amount of over RMB 100 million.",
];

const minAchievements = [
  "Represented a well-known film investment and production company in handling a film investment and distribution contract dispute with a large state-owned publishing group before the Beijing High People's Court and the Beijing First Intermediate People's Court. The subject matter of the case is approximately RMB 160 million.",
  "Represented a prominent film investment company in handling investment contract and guarantee disputes with a domestic cultural and entertainment enterprise and its founder in the Tianjin Binhai New District People's Court and the Beijing Arbitration Commission. The subject matter of the case is approximately RMB 23 million.",
  "Represented a leading enterprise listed on the U.S. NASDAQ in handling a directors and officers liability insurance contract dispute with eight large domestic insurance companies before the Shanghai International Arbitration Center. The subject matter of the case is approximately RMB 200 million.",
  "Represented a well-known private equity fund in disputes with a domestic tech startup and its founder regarding shareholder rights litigation in two levels of courts in Hangzhou, as well as a dispute over a share repurchase agreement in the Beijing Arbitration Commission. The subject matter of the case is approximately RMB 200 million.",
  "Represented a large domestic securities company in a litigation concerning equity transfer and repurchase rights with a private enterprise before the Beijing High People's Court. The subject matter of the case is approximately RMB 1 billion.",
  "Represented a trust company in a financial loan contract dispute with a private enterprise in the Beijing Fourth Intermediate People's Court, with a dispute amount of approximately RMB 200 million.",
  "Represented a French private equity fund in a dispute over a VIE structured equity transfer and repurchase with a private medical institution before the Chengdu Intermediate People's Court. The subject matter of the case is approximately RMB 30 million.",
  "Represented a prominent private equity fund in a partnership share transfer and repurchase agreement dispute with a holding platform of a domestic entertainment industry listed company before the Beijing Arbitration Commission. The subject matter of the case is approximately RMB 40 million.",
  "Represented a state-owned trust company in a series of corporate resolution validity disputes with a state-owned shareholder in the Beijing Second Intermediate People's Court and the Beijing Xicheng District People's Court.",
  "Represented a state-owned enterprise group in Yunnan in a bulk commodity financing and sale contract dispute with a local private enterprise in the Kunming Intermediate People's Court and the Yunnan High People's Court. The subject matter of the case is approximately RMB 160 million.",
  "Represented a Hong Kong-based real estate investment fund in a warehouse lease contract dispute with a private enterprise in the Tianjin First Intermediate People's Court, involving a dispute amount of approximately RMB 30 million.",
  "Represented a prominent U.S. multinational in a financial leasing contract dispute with a private enterprise in the Shenyang Intermediate People's Court and the Liaoning High People's Court. The subject matter of the case is approximately RMB 20 million.",
  "Represented a well-known Hong Kong real estate development company in a construction project bid and contract dispute with a general contractor in mainland China. The subject matter of the case is approximately RMB 300 million.",
  "Represented a state-owned private equity fund in a partnership share return and repurchase dispute with the parent company of a private listed company before the China International Economic and Trade Arbitration Commission, with a dispute amount of approximately RMB 200 million.",
  "Represented an asset management company in a lending and mortgage contract dispute with a domestic real estate enterprise and participated in the enterprise's bankruptcy reorganization process before the Shanghai Third Intermediate People's Court. The subject matter of the case is approximately RMB 120 million.",
];

const liWanAchievements = [
  "Acted as PRC counsel for a prominent offshore USD fund in an equity repurchase and debt settlement dispute against a high-tech enterprise and its founder at HKIAC, with a dispute amount exceeding USD 27 million. The arbitration was conducted in English. Wan Li assisted the client in securing property preservation in Mainland China and facilitated a substantial pre-hearing settlement.",
  "Acted as PRC counsel for a well-known offshore USD fund in a loan contract dispute against a domestic medical device company and its founder at HKIAC, with a dispute amount exceeding USD 9 million. Wan Li assisted the client in securing property preservation in Mainland China and ultimately obtained a favorable award.",
  "Represented a Hong Kong biotech company in an equity repurchase arbitration initiated by an investor at CIETAC, with the investor claiming a repurchase amount of over RMB 120 million. Wan Li assisted the client in reducing the repurchase amount by over RMB 40 million.",
  "Represented a leading real estate company in a CIETAC arbitration over a real estate development cooperation framework agreement, with a dispute amount of approximately RMB 250 million. The tribunal fully upheld all of the client's claims.",
  "Represented a prominent investment company in an arbitration against a leading petrochemical enterprise at the Beijing Arbitration Commission concerning a loan and guarantee agreement with a total dispute amount of approximately RMB 150 million, reaching a full settlement that is currently being executed.",
  "Represented an energy company in an arbitration at the Beijing Arbitration Commission in connection with a joint investment agreement, seeking to compel the counterparty to redeem the client's shareholding. The dispute involved approximately RMB 17 million and the tribunal fully upheld all claims.",
  "Represented an investment company in litigation involving a film investment agreement against a leading domestic film company, with a dispute amount of approximately RMB 80 million. Wan Li achieved complete victories at both trial and appellate courts, and the judgment is currently being enforced.",
  "Represented a leading domestic gaming company in lawsuits filed by minority shareholders regarding damage to company interests and shareholders' information rights before Beijing courts, with a dispute amount exceeding RMB 60 million. Wan Li secured a complete victory in the liability action and later negotiated a favorable settlement.",
  "Represented the founder of a unicorn cross-border e-commerce startup in a corporate control dispute involving parallel litigation and arbitration proceedings before the Grand Court of the Cayman Islands, HKIAC, and Beijing courts, helping the client preserve and maintain control of the company.",
  "Represented an overseas investment fund in a corporate control dispute with the former management of its portfolio company, involving an investment amount exceeding USD 80 million. Wan Li helped confirm and secure control over the portfolio company and defeated related company resolution challenges.",
  "Represented a renowned offshore USD fund before the Suzhou Intermediate People's Court International Commercial Division, applying for recognition and enforcement of an HKIAC arbitration award with a dispute amount exceeding USD 6 million. The court granted recognition of the award.",
  "Represented a leading offshore USD fund before the Shanghai No. 1 Intermediate People's Court, applying for recognition and enforcement of an HKIAC arbitration award with a dispute amount exceeding USD 27 million, and coordinated U.S. enforcement work that led to full recovery.",
  "Represented a Philippine construction company in an independent guarantee fraud dispute before the Beijing No. 4 Intermediate People's Court, with a dispute amount of approximately USD 20 million, securing full recognition of the client's claims.",
  "In collaboration with a leading international law firm, represented a renowned domestic travel agency in litigation before the Hong Kong High Court against a Hong Kong airline in a contract dispute worth approximately USD 30 million. The initial judgment substantially reduced the client's compensation liability and the case is currently on appeal.",
  "Represented a leading domestic gaming company in a copyright infringement lawsuit before the Beijing Haidian District People's Court and the Beijing Intellectual Property Court, securing the maximum statutory penalty. The case was selected as one of Beijing Court's Top 10 Typical Copyright Judicial Cases for 2020.",
  "Represented a leading domestic gene technology company and its founder in responding to an equity repurchase lawsuit filed by an internationally renowned investment fund before the Beijing Daxing District People's Court, where the plaintiff claimed over RMB 61 million. Wan Li helped settle the case at a favorable repurchase price.",
  "Represented a Japanese equipment manufacturer before the Qingdao Intermediate People's Court, where the opposing party applied for enforcement of a CIETAC arbitration award. After multiple rounds of communication, the court dismissed the enforcement application.",
  "Represented a well-known domestic education technology company in contract dispute litigation against a leading Chinese book publisher before Beijing courts. Wan Li persuaded the second-instance court to reverse the unfavorable first-instance judgment and reduce losses by more than 50%.",
  "Represented or assisted major airlines, general aviation companies, insurers, and reinsurers in handling liability incidents and insurance claims, including major air crash compensation matters, general aviation accidents, aircraft on-ground incidents, cargo damage, and personal injury claims.",
  "Conducted an investigation for a U.S.-owned industry-leading company into a distributor's alleged misconduct, which led to the distributor's full repayment of nearly RMB 1 million in misappropriated funds.",
  "Established a comprehensive anti-corruption compliance system for a pre-IPO high-tech enterprise.",
  "Represented a unicorn tech company in responding to a criminal investigation into alleged infringement of trade secrets initiated by a competitor, with public security authorities ultimately deciding to dismiss the case.",
  "Represented a USD investment fund in conducting an internal investigation into a senior manager of a high-tech portfolio company in Mainland China and initiated criminal proceedings on suspicion of occupational embezzlement; the executive has been approved for arrest and the case is under review for prosecution.",
  "As Legal Director for an A-share listed company, handled group-wide dispute resolution matters and pursued criminal liability in copyright infringement and misappropriation cases, leading to multiple arrests and cases selected by judicial authorities as representative intellectual property criminal cases.",
  "Participated as one of the drafters in the Evaluation of the Effectiveness of Compliance Management Systems for Small and Medium-Sized Enterprises initiated by the China Association of Small and Medium Enterprises.",
];

const zoeAchievements = [
  "Represented a real estate development company in an application to the Beijing Fourth Intermediate People's Court to successfully set aside a CIETAC arbitral award in a dispute over an equity transfer agreement with an investment company.",
  "Represented a well-known state-owned electric corporation as claimant and counter-respondent against an Indian governmental entity in an ICC arbitration under a power plant construction contract, involving over USD 150 million. The tribunal upheld most client claims and denied almost all counterclaims.",
  "Represented a BVI wind power technology company as claimant in a SIAC arbitration arising from a cooperative development agreement involving over RMB 800 million. The tribunal upheld the major part of the client's claims and dismissed all counterclaims.",
  "Represented seven fund parties as claimants in two conjoined HKIAC arbitrations over related equity transfer contracts against a NYSE-listed subsidiary of a PRC company. The case settled after hearing on favorable terms.",
  "Represented the People's Republic of China as respondent in the investment arbitration filed by Ansung before ICSID, the first investment arbitration against the PRC where a final award was delivered. The tribunal dismissed all claims with prejudice.",
  "Represented a listed company in CIETAC Beijing arbitration known as the Yu'E Bao Case, involving a dispute amount over RMB 71 million and overall economic interests over RMB 2.5 billion, forcing a settlement satisfactory to the client.",
  "Represented a state-owned company in CIETAC Beijing arbitration under 13 non-ferrous metal sales agreements involving over USD 10 million, obtaining a favorable award; further represented the client in two similar cases involving over RMB 170 million and USD 180 million.",
  "Represented a well-known state-owned real estate developer in Shandong as respondent in CIETAC Beijing arbitration under a contractual joint venture agreement involving over RMB 500 million, in which 98% of the claimant's claims were denied.",
  "Represented a famous Singaporean beer company as claimant in CIETAC Beijing arbitration under a joint venture contract involving over RMB 270 million, obtaining an interim audit award favorable to the client and a favorable settlement.",
  "Represented a PRC subsidiary of a UK high-end sports club as claimant in two CIETAC Beijing arbitrations under service and management agreements involving over RMB 70 million, obtaining favorable awards and assisting with enforcement.",
  "Represented a famous international fund as claimant in CIETAC Shanghai arbitration under an asset purchase agreement in relation to a data center involving over RMB 130 million, obtaining a favorable award.",
  "Represented a Sichuan energy conservation investment company as claimant in Beijing Arbitration Commission arbitration under a loan and cooperative agreement involving over RMB 25 million. The tribunal upheld all client claims.",
  "Represented a PRC subsidiary of a UK high-end sports club in CIETAC Beijing arbitrations conducted in English and Chinese, obtaining favorable awards and a satisfactory enforcement outcome.",
];

const mengchengAchievements = [
  "Represented a listed company in the film and television industry in a third-party revocation action against a judgment of the Beijing High People's Court. The dispute involved an equity transfer valued at over USD 30 million, and the client secured a substantial first-instance win before the case entered the Supreme People's Court.",
  "Represented a premier private equity institution in an equity transfer dispute against the founder of a new consumption enterprise, involving BAC arbitration and asset preservation before the Shanghai No. 1 Intermediate People's Court, ultimately securing a settlement from a dominant position.",
  "Represented an investment platform managed by a real estate fund with AUM exceeding RMB 100 billion in a commercial property dispute valued at over RMB 100 million, seeking eviction of a state-owned financial institution and occupation fees, and achieving the client's commercial objectives through settlement in the second instance.",
  "Represented a NASDAQ-listed retail company in defending against a tort liability lawsuit filed by a consumer. Procedural and substantive objections during the pre-trial phase led to voluntary withdrawal and mitigation of reputational risk.",
  "Represented a leading domestic industrial M&A institution in an equity buy-back arbitration at BAC against a prominent AI and big-data enterprise and its founder, involving approximately RMB 300 million. The tribunal upheld all legal positions and claims.",
  "Represented a leading domestic power bank rental enterprise in a high-stakes patent ownership dispute before the Supreme People's Court in the second instance, securing a total victory and protecting the client's core commercial interests.",
  "Represented a senior professional in the gaming industry in a series of disputes with partners regarding equity and dividends, clarifying the client's shareholder status and the counterparty's tortious intent and securing an ideal outcome.",
  "Represented a NASDAQ-listed company in a SHIAC arbitration concerning directors and officers liability insurance. Despite limited domestic precedent, the tribunal supported the client's claims and full recovery of insurance indemnity.",
  "Represented an accounting firm in three derivative tort indemnity disputes initiated by a large state-owned financial enterprise following overseas investor litigation, with the total amount in controversy exceeding RMB 400 million and successful interim or final outcomes in all three cases.",
];

const weifanAchievements = [
  "Represented a large overseas listed company in an insurance claim dispute arbitration against several leading domestic insurance companies before the Shanghai International Economic and Trade Arbitration Commission (SHIAC). By analyzing and arguing key policy provisions such as severability and exclusion clauses, we successfully obtained full payment of the insurance benefits for the client.",
  "Represented an enterprise under a leading industrial investment institution in an investment contract dispute arbitration against an investment management company and its legal representative before BAC. The subject matter exceeded RMB 720 million and a favorable award was obtained.",
  "Represented a leading entertainment industry enterprise in an investment repurchase lawsuit against a film company. Subsequently, based on the settlement agreement reached in the lawsuit, we initiated an arbitration against the legal representative of the film company. In the ensuing enforcement proceedings, we assisted the enforcement court in taking a series of compulsory measures against the opposing party. All amounts have been recovered and the case has been closed upon full satisfaction of the judgment.",
  "Represented a leading film and television entertainment enterprise in a film investment agreement dispute against a large state-owned company and its affiliates, with a subject matter of approximately RMB 150 million. The case involved conflicts in contractual arrangements among different parties. Through professional analysis and argumentation, we successfully persuaded the court to rule that all amounts should be paid to our client. The judgment was upheld by the Beijing Higher People's Court on second instance and by the Supreme People's Court on retrial.",
  "Represented an enterprise under a leading capital management company in an equity repurchase dispute arbitration against a technology company and its legal representative, among others, before the China International Economic and Trade Arbitration Commission (CIETAC). By promptly applying for asset preservation measures over the core assets of the opposing party, we prompted the opposing party to settle with the client and pay the full repurchase price.",
  "Represented a manufacturing company in an equity repurchase dispute arbitration against a real estate company before the Beijing Arbitration Commission (BAC), with a subject matter exceeding RMB 360 million. The case involved core legal issues such as restrictions on corporate share repurchases under the Minutes of the National Conference on the Trial of Commercial Cases (Jiumin Minutes) and the characterization of debt disguised as equity. Through our professional arguments, we successfully persuaded the arbitral tribunal that the matter was in substance a loan and obtained a fully favorable award.",
  "Represented an enterprise under a leading industrial investment institution in enforcing a final arbitral award against a technology company and its legal representative. In the enforcement proceedings, we took a series of asset investigation measures and initiated various recovery actions, including but not limited to claims to set aside a debtor's act, actions to declare contracts void, and actions to establish marital joint debt.",
  "Represented an enterprise under a leading investment management group in a compensation agreement dispute arbitration against a leading retail service enterprise before the China International Economic and Trade Arbitration Commission (CIETAC). A favorable award was obtained, and despite the contract not specifying a default interest rate, we successfully persuaded the arbitral tribunal to impose default interest at the maximum rate permitted under current judicial practice.",
  "Represented a technology start-up in the aviation and gas turbine field in multiple contract dispute cases against a leading sales enterprise of vacuum pumps and precision components. The cases involved disputes over delivery quantity, quality issues, and judicial appraisal procedures, with a total subject matter of approximately RMB 30 million. Currently, some cases are still pending, while others have resulted in complete victories and full recovery of the amounts.",
];

const zhTeamDetails: Record<string, TeamProfile["zh"]> = {
  "yuxuan-liu": {
    serviceIndustries: ["商业与交易", "私募股权", "公司股权与控制权争夺", "金融行业", "传媒及娱乐", "房地产及建设工程"],
    education: "北京大学 法学学士（2009）",
    qualification: "中国内地律师执业资格",
    languages: ["中文（普通话）", "英语"],
    socialEngagements:
      "刘煜暄律师现任北京市律师协会商事仲裁法律专业委员会委员、北京市朝阳区律师协会仲裁与调解业务研究会副主任",
    practiceArea:
      "刘煜暄律师专长于代理国内诉讼及仲裁案件，在争议解决领域拥有丰富的执业经验，主要领域包括商业与交易、私募股权、公司股权与控制权争夺、金融行业、传媒及娱乐、房地产及建设工程等。",
    practiceExperience:
      "刘煜暄律师作为虎诉的管理合伙人，有超过16年的工作经验，其在创立虎诉之前，曾先后在中伦律师事务所（2009-2010年），金杜律师事务所（2012-2014年），方达律师事务所（2014-2018年）担任律师，竞天公诚律师事务所（2018-2019年）担任合伙人律师。",
    honors: [
      "刘煜暄律师在争议解决领域为全球各大权威法律评级机构或知名媒体所认可。",
      "2025年11月，刘煜暄律师荣获首届《法律500强》中国精英榜单“北京精英·商业争议”奖项。",
      "2025年1月，刘煜暄律师受邀撰写《2025钱伯斯全球指南-中国争议解决概览》文章。",
      "2022年5月，刘煜暄律师入选LEGALBAND 2022年度中国顶级律师排行榜，并在“争议解决·诉讼”领域获评“后起之秀”。",
      "2022年1月，刘煜暄律师入选《商法》“The A List 法律精英”榜单，被评为100位中国法执业优秀律师之一。",
      "2021年6月，刘煜暄律师入选Benchmark Litigation China 2021年度北京地区争议解决推荐律师榜单。",
      "2021年4月，刘煜暄律师入选LEGALBAND 2021年度中国顶级律师排行榜，并在“争议解决·诉讼”领域获评“后起之秀”。",
      "2021年3月，刘煜暄律师被《商法》评为“2021年度中国业务法律新星40强”。",
      "2020年5月，刘煜暄律师接受《亚洲法律杂志》（ALB）独家专访，并被誉为“争议解决领域的耀眼新星”。",
      "2019年9月，刘煜暄律师荣获《亚洲法律概况》2020年度中国法律市场争议解决领域“知名律师”称号。",
    ],
    achievements: [
      "代表某投资规模超400亿元的投资机构参与在北京仲裁委员会进行的与某顶尖娱乐集团实际控制人的差额补足协议纠纷案，案件标的约人民币4.5亿余元。",
      "代表一家国内环卫巨头企业参与针对某港交所上市集团旗下公司提起的股权转让纠纷诉讼案，案涉总金额约为人民币3.7亿元。",
      "代表国内某知名能源行业创业者参与国内移动充电龙头企业的公司控制权争夺纠纷案，案涉股权估值高达人民币20亿余元。",
      "代表国内一家大型金融房地产投资企业参与与中国境内最大的国有油气企业控股子公司的租赁合同纠纷案，案件标的约人民币3.6亿余元。",
      "代表某业主委员会参与在最高人民法院进行的起诉房地产开发公司的再审案件，案涉总金额超人民币5000万元。",
      "代表一家香港上市公司参与在辽宁省高级人民法院进行的建设工程施工合同纠纷案，案件标的高达人民币8亿元。",
      "代表国内一家领先的产业投资并购机构参与股权回购纠纷案，案件标的约人民币3亿元。",
      "代表一家国内头部建筑建造企业参与针对某知名房地产企业及其实际控制人的仲裁案，案件标的逾3亿元人民币。",
      "代表一家国内领先投资机构参与在北京仲裁委员会针对某外资企业提起的仲裁案，案件标的约人民币1.4亿元。",
      "代表一家国内顶尖医疗设备上市公司旗下子公司参与行政处罚听证程序，将原行政处罚金额近人民币1亿元减少至300万元。",
      "代表国内某知名投资机构实际控制人参与股权转让纠纷案，案件标的约人民币1.4亿余元。",
      "代表国内某顶尖科技创新投资企业参与股权回购仲裁案，案件标的金额约人民币1亿元。",
      "代表一家管理资产规模超千亿的投资机构旗下公司参与要求某国有金融机构从案涉物业腾退的诉讼案，案件标的约人民币1亿余元。",
      "代表一家大型房地产企业参与房地产投资建设项目争议仲裁案，双方合计仲裁请求金额接近人民币6亿余元。",
      "代表一家纳斯达克上市的顶尖销售企业参与董监高责任保险纠纷案，案件涉案金额为2500万美元。",
      "代表某市值超百亿的港交所影视娱乐上市企业参与第三人撤销之诉案件，争议标的股权价值超3000万美元。",
      "代表某科技领域领军创业人士参与股权回购仲裁案，累计标的金额超人民币10亿元。",
      "代表某国内顶尖影视娱乐及票务销售公司处理演唱会项目票务收益争议案件。",
      "代表某港交所影视娱乐上市企业参与影视项目发行收入归属引发的投资争议纠纷案件，案件标的约人民币1.5亿元。",
      "代表专注于健康与科技的国内知名企业参与股权转让纠纷案件，案涉标的股权估值约为3.5亿余元。",
      "代表某大型高端商业房地产开发运营公司旗下子公司参与股权回购争议仲裁案件，案件标的额约为1亿余元。",
    ],
  },
  "min-xu": {
    serviceIndustries: ["国际贸易行业", "互联网科技及游戏行业"],
    education: "香港城市大学 法学学士（2011）；香港城市大学 法学硕士（2012）",
    qualification: "中国内地律师执业资格",
    languages: ["中文（普通话）", "英语"],
    socialEngagements:
      "许旻律师现为英国特许仲裁员协会高级会员（F.CIArb），中国体育仲裁委员会仲裁员，并入选北京市司法局百名高端涉外法治人才及北京市律师协会涉外律师人才库；同时担任中国法学会体育法学研究会会员、北京市律师协会文旅传媒与体育专业委员会委员、北京市法学会体育法学与奥林匹克法律事务研究会会员。",
    practiceArea:
      "许旻律师是中国内地执业律师，专长于代理国内诉讼及境内外仲裁案件，并长期为企业提供法律顾问服务。许旻律师在投融资、股权交易、公司治理、商事合同审查及纠纷处理、产品责任等业务领域经验丰富，承办的案件涉及银行金融、私募基金、高新科技、新媒体、影视娱乐、教育、房地产等多个领域。",
    practiceExperience: "在加入虎诉律师事务所之前，许旻律师曾在金杜、方达两家律所担任争议解决律师。",
    honors: [
      "许旻律师是英国特许仲裁员协会高级会员（F.CIArb），并被北京市律师协会列入涉外律师人才库。",
      "许旻律师参与撰写《全球电子竞技发展报告（2022~2023）》。",
      "许旻律师受邀撰写《2025钱伯斯全球指南-中国争议解决概览》。",
    ],
    achievements: [
      "代表一家知名影视投资制作公司处理与某国有大型出版集团之间的电影投资及发行合同纠纷，案件标的约人民币1.6亿元。",
      "代表一家知名影视投资制作公司处理投资合同及担保合同纠纷，案件标的约人民币2300万元。",
      "代表一家在美国纳斯达克上市的知名企业处理董高责任保险合同纠纷，案件标的约人民币2亿元。",
      "代表某知名私募基金处理股东知情权纠纷诉讼及股权回购协议纠纷，案件标的约人民币2亿元。",
      "代表国内一家大型证券公司处理股权收益权转让暨回购合同纠纷诉讼，案件标的约人民币10亿元。",
      "代表一家信托公司处理金融借款合同纠纷诉讼，案件标的约人民币2亿元。",
      "代表一家法国私募基金处理VIE架构股权转让及回购纠纷诉讼，案件标的约人民币3000万元。",
      "代表某知名私募基金处理合伙企业份额转让及回购协议纠纷，案件标的约人民币4000万元。",
      "代表一家国有信托公司处理一系列公司决议效力纠纷诉讼。",
      "代表云南某国企集团处理大宗商品融资性买卖合同纠纷诉讼，案件标的约人民币1.6亿元。",
      "代表香港一家房地产投资基金处理仓储用房租赁合同纠纷诉讼，案件标的约人民币3000万元。",
      "代表美国一家知名跨国企业处理融资租赁合同纠纷诉讼，案件标的约人民币2000万元。",
      "代表香港一家知名房地产开发企业处理建设工程项目招投标及合同纠纷，案件标的约人民币3亿元。",
      "代表一家国有私募基金处理合伙份额收益权转让暨回购合同纠纷，案件标的约人民币2亿元。",
      "代表某资产管理公司处理借贷及抵押合同纠纷，并参与相关房地产企业破产重整程序，案件标的约人民币1.2亿元。",
    ],
  },
  "li-wan": {
    serviceIndustries: ["金融", "国际贸易行业", "私募股权"],
    education: "国际关系学院 法学学士（2007）；大连海事大学 法学硕士（2009）",
    qualification: "中国内地律师执业资格",
    languages: ["中文（普通话）", "英语"],
    socialEngagements:
      "万力律师现任北京市律师协会涉外法律服务工作委员会委员、互联网诉讼法律专业委员会委员，大连国际仲裁院（大连仲裁委员会）仲裁员，被北京市律师协会列入涉外律师人才库。",
    practiceArea:
      "万力律师专注于商事争议解决，尤以处理涉外商事诉讼和仲裁见长，并且在知识产权争议以及刑事民事交叉领域取得了突破。客户涵盖金融、投资、海事、航空、保险、工业制造、医药、房地产、文化娱乐、电子竞技等多个领域。",
    practiceExperience:
      "万力律师于2020年加入北京虎诉律师事务所。在加入虎诉律师事务所之前，万力律师曾在国内顶尖的律所担任争议解决律师，并在某A股上市企业法务部任诉讼总监。",
    honors: [
      "2025年11月，荣获Legal 500 首届中国精英“北京精英·商业争议”。",
      "2022年5月，入选LEGAL BAND 2022年度中国顶级律师排行榜，被评为合规领域的“后起之秀”。",
      "2021年6月，入选Benchmark Litigation China 2021北京地区争议解决推荐律师榜单。",
      "2021年3月，入选China Business Law Journal（《商法》）40位2021中国业务法律新星榜单。",
    ],
    achievements: [
      "代表一家知名投资公司因影视投资协议针对一家国内领先影视公司进行诉讼，争议总金额约8000万元，并获得两审全面胜诉。",
      "代表一家国内领先游戏企业应对损害公司利益责任纠纷、知情权纠纷等系列案件，争议标的逾6000万元，并取得满意结果。",
      "代表一家独角兽跨境电商创业公司的创始人争夺公司控制权，协助客户保留并继续持有控制权。",
      "代表一家知名海外投资基金处理与被投企业前任管理层间的控制权纠纷，所涉投资金额超8000万美元。",
      "代表一家知名境外美元基金申请认可和执行香港国际仲裁中心仲裁裁决，争议标的逾600万美元。",
      "代表一家知名境外美元基金申请认可和执行香港国际仲裁中心仲裁裁决，争议标的逾2700万美元，并协调美国执行程序。",
      "代表一家菲律宾建筑企业处理独立保函欺诈纠纷诉讼，涉案金额约2000万美元，客户主张被全部支持。",
      "与知名国际律师事务所共同代表国内知名旅行社公司在香港高等法院应对合同诉讼，总争议金额约3000万美元。",
      "代表一家国内领先游戏公司提起游戏著作权侵权诉讼，案件被列为2020年北京法院著作权十大典型司法案例。",
      "代表一家国内领先基因科技公司及其创始人应对股权回购诉讼，对方主张超过人民币6100万元，最终成功和解。",
      "代表一家日本设备生产企业应对仲裁裁决执行案件，最终相对方执行申请被法院驳回。",
      "代表一家国内知名教育科技公司应对合同纠纷，成功推动二审改判，帮助客户直接减损50%以上。",
      "代表知名境外美元基金在HKIAC提起股权回购及债券清偿争议，争议标的逾2700万美元，并促成庭前和解。",
      "代表知名境外美元基金在HKIAC提起贷款合同争议，争议标的逾900万美元，并最终获得胜诉裁决。",
      "代表知名地产企业处理地产开发合作框架协议仲裁，涉案金额约2.5亿元，客户仲裁请求获得全面支持。",
      "代表知名香港生物科技企业应对股权回购仲裁，帮助客户将回购金额降低四千余万元。",
      "代表知名投资企业处理借款及担保协议仲裁，争议总金额约人民币1.5亿元，并促成和解。",
      "代表能源企业处理合作投资协议仲裁，争议金额约人民币1700万元，客户全部仲裁请求获支持。",
      "曾代表或协助各大航空公司、通航企业及其保险人和再保险人处理责任事故以及保险理赔。",
      "代表某行业龙头的美国独资企业调查经销商涉嫌违规案件，经销商已全额退赔近百万元。",
      "为一家pre-IPO高科技企业建立全套企业反腐败合规体系。",
      "代表某独角兽型科技公司应对涉嫌侵犯商业秘密罪的刑事调查程序，最终公安机关决定撤案。",
      "代表某美元投资基金，对其在内地投资企业的高级管理人员进行内审调查并发起刑事控告。",
      "万力律师曾担任某上市公司法务部诉讼方向法务总监，负责集团争议解决工作并办理多起刑事追责案件。",
      "作为起草人之一参与编写《中小企业合规管理体系有效性评价》。",
    ],
  },
  "zoe-zhang": {
    serviceIndustries: ["国际贸易行业", "私募股权", "金融"],
    education: "北京外国语大学 英语、法学双学士（2007）；北京外国语大学 法学硕士（2010）；英国大律师公会中国律师培训计划项目（2018）；香港国际仲裁中心高级仲裁员培训项目（2025）",
    qualification: "中国内地律师执业资格",
    languages: ["中文", "英文"],
    socialEngagements:
      "张莉律师是中国国际经济贸易仲裁委员会仲裁员、中国青年仲裁小组组委会成员、北京市律师协会商事仲裁法律专业委员会委员、北京市朝阳区律师协会仲裁与调解研究会委员、香港一邦国际网上仲调中心仲裁员、APEC中立成员专家组成员。",
    practiceArea:
      "张莉律师的专业领域为争议解决，尤其擅长涉外争议解决；主要领域包括私募股权投资、建筑工程、房地产、中外合资、股权转让、国际货物买卖、知识产权和能源等多个领域。张律师能够熟练运用中英文双语办案，工作能力受到客户的充分认可。张律师代理客户多为跨国公司、私募投资基金、外商投资企业、大型国有企业、创业型企业等。",
    practiceExperience:
      "加入虎诉前，张律师在某知名律师事务所争议解决部担任权益合伙人。张律师参与代理了超过一百多起商事争议诉讼及仲裁案件，绝大部分为涉外争议案件。仲裁案件适用规则包括贸仲委仲裁规则、北京仲裁委员会仲裁规则、联合国国际贸易法委员会仲裁规则、香港国际仲裁中心机构仲裁规则、国际商会仲裁规则、新加坡国际仲裁中心仲裁规则等；其中多起案件仲裁语言为英文，并在中国、香港、新加坡、印度等多地进行开庭。诉讼案件在北京、上海、浙江、江苏等多地、多级法院进行。\n张律师代理的绝大多数案件，结果均比较良好，维持着较高的胜率，客户满意度高。",
    honors: [
      "2025 Legal 500 首届中国精英“北京精英·商业争议”。",
      "2021 The Legal 500亚太榜单明日之星 Next Generation（争议解决：仲裁）。",
      "2018年北京市律师协会“改革开放四十年北京律师成果展示优秀辩护词代理词原音重现”最佳口才奖。",
    ],
    achievements: [
      "代表某房地产开发公司申请成功撤销中国国际经济贸易仲裁委员会作出的仲裁裁决。",
      "代表知名电力央企在ICC国际仲裁院处理发电厂建筑工程协议争议，争议标的额逾1.5亿美元，并支持客户大部分请求。",
      "代表七方基金当事人在HKIAC提起股权转让合同争议案件，迫使对方庭后和解并支付大部分请求金额。",
      "代表BVI风力技术公司在SIAC提起技术合作开发协议争议，争议标的额逾人民币8亿元，客户主要请求获支持。",
      "代表中国政府应对韩国安城公司在ICSID提起的投资仲裁，仲裁庭驳回全部请求。",
      "代表英威达公司处理特许经营合同争议，并在中国法院打赢相关仲裁协议效力之诉。",
      "代表中粮集团旗下某开发商在HKIAC处理酒店租赁合同争议，客户全部仲裁请求获支持。",
      "代表日本某知名电子产品制造商在HKIAC处理独家销售合同争议，迫使对方主动和解。",
      "代表英国知名医疗企业境内子公司在SHIAC处理项目管理和合作协议纠纷仲裁案，争议标的额逾人民币2.7亿元。",
      "代表某知名国际基金在贸仲委上海分会处理涉及数据中心的资产转让争议，争议标的额逾人民币1.3亿元，并获得胜诉裁决。",
      "代理某上市公司处理广受瞩目的“余额宝”纠纷，最终迫使对方与客户和解。",
      "代表某央企在贸仲委北京总会处理13份有色金属大宗货物买卖合同争议，客户全部仲裁请求获支持。",
      "代表某知名国际能源科技公司天津子公司处理工程争议，迫使对方偿付客户80%以上请求数额。",
      "代表山东某知名国有房地产开发商应对合作合同争议，仲裁庭驳回对方98%的仲裁请求。",
      "代表某热电公司及其关联公司应对资产转让合同争议，迫使对方和解并取得有利结果。",
      "代表新加坡知名啤酒公司处理中外合资合同争议，取得对客户有利的审计中间裁决并促成和解。",
      "代表北京某石化公司应对管道产品供气协议争议，仲裁庭驳回对方98%的仲裁请求。",
      "代表某英国高端运动俱乐部中国子公司处理两起服务协议和管理协议仲裁，客户所有请求获支持并取得满意执行结果。",
      "代表某自然人投资者处理证券投资集合资金信托合同争议，双方达成和解。",
      "代表四川某节能投资公司处理借款合作协议争议，客户全部仲裁请求获支持。",
    ],
  },
  "mengcheng-yun": {
    serviceIndustries: ["金融", "泛娱乐", "地产", "新能源", "新消费"],
    education: "南京大学 法学学士（2016）",
    qualification: "中国内地律师执业资格",
    languages: ["中文", "英文"],
    socialEngagements: "",
    practiceArea:
      "云梦成律师的主要业务领域为商事争议解决，包括境内外诉讼与仲裁。云律师代理的案件类型涵盖股权争议、公司控制权纠纷、金融借贷、影视文娱、复杂商事租赁及专业机构责任纠纷等。其不仅在最高人民法院及各级地方法院拥有丰富的出庭经验，亦多次代表客户在 CIETAC、北仲、上国仲等机构处理重特大仲裁案件。",
    practiceExperience:
      "北京虎诉律师事务所资深律师（2026.02 - 至今）；北京市中伦律师事务所律师（2025.08 - 2026.01）；北京虎诉律师事务所律师（2021.04 - 2025.08）。",
    honors: [],
    achievements: [
      "代理某影视娱乐行业上市公司提起第三人撤销之诉，代表客户取得实质性胜诉。",
      "代理某头部股权投资机构处理股权转让纠纷，最终在优势地位下促成双方和解。",
      "代理某千亿级地产基金管理的投资平台处理商业不动产争议，二审阶段达成和解并实现商业目标。",
      "代表某纳斯达克上市企业应对消费者侵权纠纷，最终促使原告撤诉并化解商誉风险。",
      "代理国内领先产业投资并购机构处理约3亿元人民币股权回购争议，客户获得全面胜诉。",
      "代表国内某移动电源租赁龙头企业应对核心专利权属诉讼，最终取得全面胜诉。",
      "代表某游戏行业资深从业人士处理股权、分红等系列争议，争取到理想判决结果。",
      "代表某纳斯达克上市企业处理董监高责任保险仲裁，实现全额赔付。",
      "代表某会计师事务所应对衍生侵权责任追偿纠纷，三起案件均已取得理想阶段性或终局性结果。",
    ],
  },
  "weifan-qiu": {
    serviceIndustries: ["商业与交易", "金融和私募股权"],
    education: "中国政法大学 法律硕士（2022）；华南理工大学 法学、工学双学士（2019）",
    qualification: "中国内地律师执业资格",
    languages: ["中文", "英文"],
    socialEngagements: "邱伟帆律师是中国法学会财税法学研究会的会员。",
    practiceArea:
      "邱伟帆律师具备中国大陆律师执业资格。他的业务专注于高端商事诉讼与仲裁，同时涵盖日常公司法律咨询工作。他经常处理投融资、股权交易与回购、合同纠纷以及争议解决等相关事务，并为多个行业的客户提供法律服务，包括银行与金融、私募股权、影视、娱乐及房地产等领域。",
    practiceExperience:
      "邱伟帆律师自毕业以来一直就职于北京虎诉律师事务所，先后担任律师助理、资深律师，并已于2023年成功取得中国内地律师执业资格",
    honors: [],
    achievements: [
      "代理某大型境外上市公司针对多家国内头部保险公司提起保险索赔争议仲裁案，成功赢得保险金全额赔付。",
      "代理某产业投资龙头机构旗下企业提起投资合同争议仲裁案，涉案标的额高达人民币7.2亿余元，并取得胜诉裁决。",
      "代理某文娱行业头部企业处理投资回购诉讼及后续仲裁、执行程序，已取得全部回款。",
      "代表某影视娱乐行业头部企业处理影视投资协议纠纷案，涉案标的额约人民币1.5亿元，并经二审、再审维持原判。",
      "代理某头部资本管理公司旗下企业处理股权回购争议仲裁案，促使相对方和解并支付全部回购款项。",
      "代理某实业公司处理股权回购争议仲裁案，涉案标的额高达人民币3.6亿余元，并取得全面胜诉裁决。",
      "代理某产业投资龙头机构旗下企业依据生效仲裁裁决提起强制执行程序，并采取系列财产追索措施。",
      "代理某头部投资管理集团旗下企业处理补偿协议争议仲裁案，并成功说服仲裁庭按最高利率标准支持逾期利息。",
      "代理某航空燃机领域科创企业处理多起合同纠纷案件，部分案件已取得全面胜诉并实际收回全额款项。",
    ],
  },
};

export const teamProfiles: TeamProfile[] = [
  {
    slug: "yuxuan-liu",
    name: "Yuxuan Liu",
    zhName: "刘煜暄",
    title: "Managing Partner",
    zhTitle: "管理合伙人",
    image: "/assets/team/team1.webp",
    phone: "010-85885228",
    email: "liu.yuxuan@tigerpartners.cn",
    serviceIndustries: [
      "Commerce and Transaction",
      "Private Equity",
      "Corporate Equity and Control",
      "Finance",
      "Media and Entertainment",
      "Real Estate and Construction",
    ],
    education: "Mr. Liu graduated from Peking University Law School with a Bachelor of Laws degree.",
    qualification: "Bar Admission in the People's Republic of China",
    languages: ["Mandarin", "English"],
    socialEngagements:
      "Mr. Liu currently serves as a member of the Commercial Arbitration Law Professional Committee of the Beijing Lawyers Association, Deputy Director of the Arbitration and Mediation Business Research Association of the Chaoyang District Lawyers Association, and a member of the Legal Experts Database of the Arbitration Research Center of the Sichuan Law and Social Governance Research Association.",
    practiceArea:
      "Mr. Liu specializes in domestic litigation and arbitration. He has extensive experience in the field of dispute resolution, with a focus on commerce and transaction, private equity, corporate equity and control, finance, media and entertainment, real estate and construction.",
    practiceExperience:
      'As the founding partner of Tiger Partners, Mr. Liu Yuxuan has been practicing law for more than sixteen years. Prior to founding Tiger Partners, Mr. Liu worked as a partner at Jingtian & Gongcheng (2018-2019). Before that, Mr. Liu worked as a dispute resolution lawyer at Fangda Partners (2014-2018), King & Wood (2012-2014), and Zhong Lun Law Firm (2009-2010). ',
    honors: [
      "Mr. Liu Yuxuan has been widely recognized by leading global legal ranking institutions and prominent media outlets in the field of dispute resolution.",
      "In November 2025, Mr. Liu Yuxuan was awarded the inaugural Legal 500 China Elite: Beijing Elite - Commercial Disputes.",
      "In January 2025, Mr. Liu Yuxuan was exclusively invited to author the Chambers Global Practice Guides 2025 - Dispute Resolution Overview (China Chapter).",
      'In May 2022, Mr. Liu Yuxuan was listed in the 2022 Top Ranked Lawyers List as "Rising Star" in the field of "Dispute Resolution - Litigation" by LEGALBAND.',
      'In January 2022, Mr. Liu Yuxuan was selected as one of "The A List" among 100 elite practitioners of Chinese law by China Business Law Journal.',
      "In June 2021, Mr. Liu Yuxuan was listed on the Benchmark Litigation China 2021 list of lawyers recommended for dispute resolution in Beijing.",
      'In April 2021, Mr. Liu Yuxuan was listed in the LEGALBAND 2021 Top Ranked Lawyers, and ranked as the "Rising Star" in the field of "dispute resolution and litigation".',
      "In March 2021, Mr. Liu Yuxuan was identified by the notable legal media China Business Law Journal in the list of Rising Stars 2021 Top 40.",
      "In May 2020, Mr. Liu once received an exclusive interview with Asian Legal Business (ALB), a well-known legal media, and was featured by ALB as “An Up-and-Comer in Dispute Resolution”.",
      'In September 2019, Mr. Liu Yuxuan was awarded the title of "Notable Practitioner" in the field of dispute resolution in China legal market by Asialaw Profiles for 2020.',
    ],
    achievements: yuxuanAchievements,
    zh: zhTeamDetails["yuxuan-liu"],
  },
  {
    slug: "min-xu",
    name: "Min Xu",
    zhName: "许旻",
    title: "Partner",
    zhTitle: "合伙人",
    image: "/assets/team/team2.webp",
    phone: "010-85885228",
    email: "xu.min@tigerpartners.cn",
    serviceIndustries: ["International Trade", "Cyber Tech and Game"],
    education: "LL.B., City University of Hong Kong School of Law, 2011; LL.M., City University of Hong Kong School of Law, 2012",
    qualification: "Bar Admission in the People's Republic of China",
    languages: ["Mandarin", "English"],
    socialEngagements:
      'Mr. Xu Min is a Fellow of the Chartered Institute of Arbitrators (F.CIArb), an arbitrator of China Commission of Arbitration for Sport and is listed in the "100 High-end International Legal Talents" by the Beijing Municipal Bureau of Justice and the International Lawyers Talent Pool of the Beijing Lawyers Association. Mr. Xu is a member of the China Association For Sports Law (CASL), the Culture, Tourism, Media, and Sports Committee of the Beijing Lawyers Association, and the Sports Law and Olympic Legal Affairs Research Association of the Beijing Law Society.',
    practiceArea:
      "XU Min is a practicing lawyer in Mainland China. He specializes in acting as an advocate in domestic litigation and domestic and overseas arbitration and has extensive experience in providing legal advisory services to enterprises. XU Min has extensive experience in investment & financing, equity transaction, corporate governance, commercial contract review and dispute resolution and product liability for clients.  His cases involve in industries of banking and finance, private equity, high technology, new media, film, television and entertainment, education, real estate and other areas. ",
    practiceExperience:
      "Prior to joining Tiger Partners, Xu Min was a dispute resolution attorney in King & Wood and Fangda Partners.",
    honors: [
      "Mr. Xu is a Fellow of the Chartered Institute of Arbitrators and has been listed in the Talent Pool for Foreign-Related Matters of the Beijing Lawyers' Association.",
      "Mr. Xu co-authored the Global Esports Development Report (2022-2023).",
      'Mr. Xu was invited to author the "China Dispute Resolution Overview" for the Chambers Global Practice Guide 2025.',
    ],
    achievements: minAchievements,
    zh: zhTeamDetails["min-xu"],
  },
  {
    slug: "li-wan",
    name: "Li Wan",
    zhName: "万力",
    title: "Partner",
    zhTitle: "合伙人",
    image: "/assets/team/team3.webp",
    phone: "010-85885228",
    email: "wan.li@tigerpartners.cn",
    serviceIndustries: ["Finance", "International Trade", "Private Equity"],
    education: "Bachelor of Law, University of International Relations, 2007; Master of Law, Dalian Maritime University, 2009",
    qualification: "Bar Admission in the People's Republic of China",
    languages: ["Mandarin", "English"],
    socialEngagements:
      "Arbitrator of Dalian International Arbitration Court (Dalian Arbitration Commission); Member of the Beijing Lawyers Association's Talent Pool for Foreign-Related Matters; Member of the Beijing Lawyers Association's Foreign-Related Legal Service Working Committee; Member of the Beijing Lawyers Association's Internet Litigation Law; Member of the Beijing Lawyers Association's Beijing 100-Talent Program for High-End Foreign-Related Rule of Law Talents.",
    practiceArea:
      "Mr. Wan specializes in commercial dispute resolution, specifically foreign-related commercial litigation and arbitration. He has also made breakthroughs in the fields of IP-related disputes as well as matters involving both criminal and civil proceedings. Wan Li's clients come from many industries including finance, investment, maritime, aviation, insurance, industrial manufacturing, pharmaceutical, real estate, culture and entertainment, and e-sports.",
    practiceExperience:
      "Wan Li joined Tiger Partners in 2020. Prior to that, Mr. Wan worked as a dispute resolution lawyer in top Chinese law firms, and as a Litigation Director in the legal department of an A-share listed company.",
    honors: [
      "2025, Beijing Elite - Commercial Disputes by The Legal 500 China Elite.",
      "2022, Rising Star in Compliance by LegalBand.",
      "2021, Recommended Litigation Lawyer in Beijing by Benchmark Litigation China.",
      "2021, TOP 40 Rising Stars by China Business Law Journal.",
    ],
    achievements: liWanAchievements,
    zh: zhTeamDetails["li-wan"],
  },
  {
    slug: "zoe-zhang",
    name: "Zoe Zhang",
    zhName: "张莉",
    title: "Partner",
    zhTitle: "合伙人",
    image: "/assets/team/team4.webp",
    phone: "010-85885228",
    email: "zoelizhang@tigerpartners.cn",
    serviceIndustries: ["International Trade", "Private Equity", "Finance"],
    education:
      "Bachelor of Laws & Bachelor of English (Double Degree), Beijing Foreign Studies University; Master of Laws, Beijing Foreign Studies University; 2018 Bar Council Training Scheme; 2025 HKIAC Advanced Arbitrator Training Programme",
    qualification: "Bar Admission in the People's Republic of China",
    languages: ["Mandarin", "English"],
    socialEngagements:
      "Zoe is an arbitrator of the China International Economic and Trade Arbitration Commission, a member of the Organizing Committee of the China Young Arbitration Group, a member of the Commercial Arbitration Law Professional Committee of the Beijing Lawyers Association, a member of the Arbitration and Mediation Research Committee of the Beijing Chaoyang District Lawyers Association, and a panelist on the Arbitrators & Neutrals Panel of the eBRAM International Online Dispute Resolution Centre.",
    practiceArea:
      "Zoe Zhang specializes in commercial arbitration and litigation, and especially foreign related arbitration and international arbitration. The major sectors of her practice involve sale of goods, private equity, construction, real estate, joint venture, equity transfer, intellectual properties, energy etc.",
    practiceExperience:
      "Before joining Tiger Partners, Zoe was working with the Dispute Resolution Team of a top Chinese law firm as an equity partner. Zoe has represented clients in over 100 commercial disputes, most of which are foreign related or international arbitration cases. The applicable rules of those arbitration cases include CIETAC Rules, the BAC Rules, the UNCITRAL Rules, the HKIAC Administered Rules, the ICC Rules, and the SIAC Rules. The arbitration language of many of those cases were English, and hearings were conducted in China Mainland, Hong Kong, Singapore, India and other jurisdictions.\nThe clients represented by Zoe are mainly multinational companies, foreign-invested enterprises, large state-owned enterprises and private equity funds. Well-known foreign clients include Total, Honeywell, Heineken, ADM, Hyundai, Paul-Y, Sony, Dalkia, ContiTech, INVISTA, Toyota Tsusho, Marubeni, Carlyle, Vataple, IPG, Canadian Solar, Sandvik, Moody's, East West Bank, Avenue Capital, CRCI, New Horizon, Standard Chartered Bank, Ting Hsin, Chinachem etc. Famous state-owned and private enterprises include COFCO, Dongfang Electric Corporation (DEC), Luneng Group, Shougang Group, Nanjing Automobile Group, Oriental Petrochemical, China Ordins Corporation, CITIC Group, Junzheng Group, Jingfeng Pharmaceutical, Huaxin Cement etc.",
    honors: [
      "2025 Legal 500, China Elite - Beijing Elite - Commercial Disputes.",
      "2021 The Legal 500 Next Generation Partners (Dispute Resolution: Arbitration).",
      "2018 Best Defense Award, Beijing Lawyers Association - Beijing Lawyers' Achievements Display on Excellent Defense - Celebration of Forty Years of Reform and Opening-up.",
    ],
    achievements: zoeAchievements,
    zh: zhTeamDetails["zoe-zhang"],
  },
  {
    slug: "mengcheng-yun",
    name: "Mengcheng Yun",
    zhName: "云梦成",
    title: "Senior Associate",
    zhTitle: "资深律师",
    image: "/assets/team/team5.webp",
    phone: "010-85885228",
    email: "yun.mengcheng@tigerpartners.cn",
    serviceIndustries: ["Finance", "Pan-entertainment", "Real Estate", "New Energy", "New Consumption"],
    education: "LL.B., Nanjing University Law School, 2016",
    qualification: "Bar Admission in the People's Republic of China",
    languages: ["Mandarin", "English"],
    socialEngagements: "",
    practiceArea:
      "Ms Yun's primary practice area is Commercial Dispute Resolution, encompassing both domestic and cross-border litigation and arbitration. Her experience covers various case types, including equity disputes, corporate control contests, financial lending, film and entertainment, complex commercial leasing, and professional liability disputes. Ms Yun has extensive advocacy experience before the Supreme People's Court and local courts at all levels, and has frequently represented clients in major arbitration matters before CIETAC, BAC, and SHIAC.",
    practiceExperience:
      "Tiger Partners | Senior Associate (Feb 2026 - Present)\nZhong Lun Law Firm | Associate (Aug 2025 - Jan 2026)\nTiger Partners | Associate (Apr 2021 - Aug 2025)",
    honors: [],
    achievements: mengchengAchievements,
    zh: zhTeamDetails["mengcheng-yun"],
  },
  {
    slug: "weifan-qiu",
    name: "Weifan Qiu",
    zhName: "邱伟帆",
    title: "Senior Associate",
    zhTitle: "资深律师",
    image: "/assets/team/team6.webp",
    phone: "010-85885228",
    email: "qiu.weifan@tigerpartners.cn",
    serviceIndustries: ["Commerce and Transaction", "Finance", "Private Equity"],
    education:
      "Master of Laws, China University of Political Science and Law, 2022 ; Bachelor of Laws and Bachelor of Engineering, South China University of Technology, 2019 ",
    qualification: "Bar Admission in the People's Republic of China",
    languages: ["Mandarin", "English"],
    socialEngagements: "Mr. Qiu is a member of the Fiscal and Tax Law Research Association of the China Law Society.",
    practiceArea:
      "Mr. Qiu is admitted to practice law in Mainland China. His practice focuses on high-end commercial litigation and arbitration, and also covers day-to-day corporate legal advisory work. He regularly handles matters relating to investment and financing, equity transactions and repurchases, contract disputes, and dispute resolution. Mr. Qiu provides legal services to clients across a range of industries, including banking and finance, private equity, film and television, entertainment, and real estate.",
    practiceExperience:
      "Since graduation, Mr. Qiu has been working at Tiger Partners, successively serving as a legal assistant and a senior associate, and successfully obtained PRC Bar Admission in 2023.",
    honors: [],
    achievements: weifanAchievements,
    zh: zhTeamDetails["weifan-qiu"],
  },
];

export function getTeamProfile(slug: string) {
  return teamProfiles.find((profile) => profile.slug === slug);
}
