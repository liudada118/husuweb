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
  "Represented a well-known real estate investment company in a lease contract dispute with the subsidiary of the largest state-owned oil and gas company in China before the Beijing No.3 Intermediate People’s Court, with a subject matter of approximately RMB 360 million.",
  "Represented a homeowners’ committee in the Supreme People’s Court in a retrial case against a real estate development company, involving a total amount exceeding RMB 50 million.",
  "Represented a Hong Kong listed company in a construction contract dispute with a well-known domestic construction company in the Liaoning Higher People’s Court, with the case value up to RMB 800 million.",
  "Represented a leading industrial investment and merger and acquisition institution in a stock repurchase dispute with a domestic leading artificial intelligence and big data enterprise in the Beijing Arbitration Commission, with a subject matter of around RMB 300 million.",
  "Represented a leading domestic construction company in an arbitration against a well-known real estate enterprise and its actual controller at the Beijing Arbitration Commission, involving a claim exceeding RMB 300 million.",
  "Represented a leading domestic investment institution in an arbitration against a foreign enterprise at the Beijing Arbitration Commission, involving a claim of approximately RMB 140 million.",
  "Represented a subsidiary of a domestic top listed medical equipment company in an administrative penalty hearing proceeding, successfully reducing the original administrative penalty from nearly RMB 100 million to RMB 3 million.",
  "Represented the actual controller of a well-known domestic investment institution in an equity transfer dispute case against three enterprises at the China International Economic and Trade Arbitration Commission, involving a claim of over RMB 140 million.",
  "Represented a leading domestic technology innovation investment company in an equity repurchase arbitration against the invested company and its actual controllers at the China International Economic and Trade Arbitration Commission, involving a claim of approximately RMB 100 million.",
  "Represented a subsidiary of an investment institution with over RMB 100 billion in assets under its management to request a state-owned financial institution to vacate from the property, with a subject matter of approximately RMB 100 million.",
  "Represented a large estate enterprise in an arbitration dispute in the Beijing Arbitration Commission against its cooperation party in relation to a large-scale real estate investment and construction project, with both parties’ total claims amounting to nearly RMB 600 million.",
  "Represented a leading NASDAQ-listed sales company in a directors and officers liability insurance dispute case at the Shanghai International Arbitration Center, achieving a recovery of USD 25 million.",
  "Representing a Hong Kong Stock Exchange-listed film and entertainment company to file a third-party rescission lawsuit in the Beijing High People’s Court, involving equities worth over USD 30 million.",
  "Represented a leading entrepreneur in the technology sector in equity repurchase arbitration cases initiated by a Fortune 500 foreign investment company and a Chinese local government fund at the Shanghai International Arbitration Center, with a total claim amount exceeding RMB 1 billion.",
  "Represented a leading domestic film entertainment and ticket sales company in handling ticket revenue disputes related to concert projects involving project partners and actual controllers.",
  "Represented a Hong Kong-listed film and entertainment company in an investment dispute arising from a major film production project regarding the allocation of distribution revenues, involving an amount of approximately RMB 150 million.",
  "Represented a leading domestic enterprise in the health and technology sector in a share transfer dispute filed by a limited partner of a fund, involving an equity valuation of over RMB 350 million.",
  "Represented a subsidiary of a major high-end commercial real estate development and operation company in an arbitration case concerning a share repurchase dispute against a health technology company, involving an amount of over RMB 100 million."
];

const minAchievements = [
  "Represented a well-known film investment and production company in handling a film investment and distribution contract dispute with a large state-owned publishing group before the Beijing High People’s Court and the Beijing First Intermediate People’s Court. The subject matter of the case is approximately RMB 160 million.",
  "Represented a prominent film investment company in handling investment contract and guarantee disputes with a domestic cultural and entertainment enterprise and its founder in the Tianjin Binhai New District People’s Court and the Beijing Arbitration Commission. The subject matter of the case is approximately RMB 23 million.",
  "Represented a leading enterprise listed on the U.S. NASDAQ in handling a directors and officers liability insurance (D&O insurance) contract dispute with eight large domestic insurance companies before the Shanghai International Arbitration Center (SIAC). The subject matter of the case is approximately RMB 200 million.",
  "Represented a well-known private equity fund in disputes with a domestic tech startup and its founder regarding shareholder rights litigation in two levels of courts in Hangzhou, as well as a dispute over a share repurchase agreement in the Beijing Arbitration Commission. The subject matter of the case is approximately RMB 200 million.",
  "Represented a large domestic securities company in a litigation concerning equity transfer and repurchase rights with a private enterprise before the Beijing High People’s Court. The subject matter of the case is approximately RMB 1 billion.",
  "Represented a trust company in a financial loan contract dispute with a private enterprise in the Beijing Fourth Intermediate People’s Court, with a dispute amount of approximately RMB 200 million.",
  "Represented a French private equity fund in a dispute over a VIE structured equity transfer and repurchase with a private medical institution before the Chengdu Intermediate People’s Court. The subject matter of the case is approximately RMB 30 million.",
  "Represented a prominent private equity fund in a partnership share transfer and repurchase agreement dispute with a holding platform of a domestic entertainment industry listed company before the Beijing Arbitration Commission. The subject matter of the case is approximately RMB 40 million.",
  "Represented a state-owned trust company in a series of corporate resolution validity disputes with a state-owned shareholder in the Beijing Second Intermediate People’s Court and the Beijing Xicheng District People’s Court.",
  "Represented a state-owned enterprise group in Yunnan in a bulk commodity financing and sale contract dispute with a local private enterprise in the Kunming Intermediate People’s Court and the Yunnan High People’s Court. The subject matter of the case is approximately RMB 160 million.",
  "Represented a Hong Kong-based real estate investment fund in a warehouse lease contract dispute with a private enterprise in the Tianjin First Intermediate People’s Court, involving a dispute amount of approximately RMB 30 million.",
  "Represented a prominent U.S. multinational in a financial leasing contract dispute with a private enterprise in the Shenyang Intermediate People’s Court and the Liaoning High People’s Court. The subject matter of the case is approximately RMB 20 million.",
  "Represented a well-known Hong Kong real estate development company in a construction project bid and contract dispute with a general contractor in mainland China. The subject matter of the case is approximately RMB 300 million.",
  "Represented a state-owned private equity fund in a partnership share return and repurchase dispute with the parent company of a private listed company before the China International Economic and Trade Arbitration Commission, with a dispute amount of approximately RMB 200 million.",
  "Represented an asset management company in a lending and mortgage contract dispute with a domestic real estate enterprise and participated in the enterprise’s bankruptcy reorganization process before the Shanghai Third Intermediate People’s Court. The subject matter of the case is approximately RMB 120 million."
];

const liWanAchievements = [
  "Acted as PRC counsel for a prominent offshore USD fund in an equity repurchase and debt settlement dispute against a high-tech enterprise and its founder at the Hong Kong International Arbitration Centre (HKIAC), with a dispute amount exceeding USD 27 million. The arbitration was conducted in English. WAN Li successfully assisted the client in securing property preservation in Mainland China and facilitated a substantial pre‑hearing settlement.",
  "Acted as PRC counsel for a well-known offshore USD fund in a loan contract dispute against a domestic medical device company and its founder at the Hong Kong International Arbitration Centre (HKIAC), with a dispute amount exceeding USD 9 million. WAN Li assisted the client in securing property preservation in Mainland China and ultimately obtained a favorable award in the arbitration.",
  "Represented a Hong Kong biotech company in an equity repurchase arbitration initiated by an investor at the China International Economic and Trade Arbitration Commission (CIETAC), with the investor claiming a repurchase amount of over RMB 120 million. WAN Li assisted the client in successfully reducing the repurchase amount by over RMB 40 million, effectively mitigating the client’s losses.",
  "Represented a leading real estate company in an arbitration at the China International Economic and Trade Arbitration Commission (CIETAC) over a real estate development cooperation framework agreement, with a dispute amount of approximately RMB 250 million. Following detailed submissions and hearings, the tribunal rendered an award fully upholding all of the client’s claims.",
  "Represented a prominent investment company in an arbitration against a leading petrochemical enterprise at the Beijing Arbitration Commission (BAC) concerning a loan and guarantee agreement with a total dispute amount of approximately RMB 150 million. The dispute raised complex cross-border regulatory and payment-related issues. WAN Li assisted the client in reaching a full settlement, which is currently being executed.",
  "Represented an energy company in an arbitration against another energy enterprise at the Beijing Arbitration Commission (BAC) in connection with a joint investment agreement, seeking to compel the counterparty to redeem the client’s shareholding. The dispute involved an amount of approximately RMB 17 million. Key issues in the case centered on the validity of the redemption agreement, proper service of the redemption notice, and the calculation of the redemption price. The tribunal fully upheld all of the client’s claims.",
  "Represented an investment company in litigation involving a film investment agreement against a leading domestic film company, with a dispute amount of approximately RMB 80 million. The case centered on distinguishing between investment and lending relationships. WAN Li achieved complete victories at both the trial court (Beijing Chaoyang District People’s Court) and appellate court (Beijing No. 3 Intermediate People;s Court), and the judgment is currently being enforced.",
  "Represented a leading domestic gaming company in a series of lawsuits filed by minority shareholders regarding damage to company interests and shareholders’ information rights before the Beijing Haidian District People’s Court, Beijing Chaoyang District People’s Court and Beijing No.1 Intermediate People’s Court, with a dispute amount exceeding RMB 60 million. WAN Li secured a complete victory in the liability action, with all claims fully upheld by the court. WAN Li subsequently negotiated a favorable settlement from a position of strength, avoiding further unnecessary disputes and achieving a commercially satisfactory outcome for the client.",
  "Represented the founder of a unicorn cross-border e-commerce startup in a corporate control dispute. WAN Li assisted the founder in defending against parallel litigation and arbitration proceedings before the Grand Court of the Cayman Islands and the Hong Kong International Arbitration Centre (HKIAC). Represented the founder in litigation beforethe Beijing Chaoyang District People’s Court and Beijing Haidian District People’s Court, and helped the client achieve complete success in both Beijing court cases. The dispute also involved battles over the company seal, office premises, and financial documents.  WAN Li successfully assisted the founder in preserving and maintaining full control of the company.",
  "Represented an overseas investment fund in a corporate control dispute with the former management of its portfolio company, involving an investment amount exceeding USD 80 million. WAN Li successfully assisted the current management (represented by the investment fund) in confirming and securing control over the portfolio company. He also represented the portfolio company in a lawsuit filed by former management before the Shanghai Xuhui District People’s Court, challenging the validity of company resolutions. After two court hearings, the case concluded with the plaintiff (former management) withdrawing the lawsuit, effectively safeguarding the client’s legitimate interests.",
  "Represented a renowned offshore USD fund before the Suzhou Intermediate People’s Court International Commercial Division, applying for recognition and enforcement of an HKIAC arbitration award with a dispute amount exceeding USD 6 million. The court granted recognition of the award, which proceeded to the enforcement stage.",
  "Represented a leading offshore USD fund before the Shanghai No. 1 Intermediate People’s Court, applying for recognition and enforcement of an HKIAC arbitration award with a dispute amount exceeding USD 27 million. Meanwhile, WAN Li coordinated with U.S. counsel to enforce the HKIAC award in the U.S. By actively advancing proceedings in both Chinese and U.S. courts, he facilitated a favorable settlement, with all funds fully recovered and the case concluded.",
  "Represented a Philippine construction company in an independent guarantee fraud dispute before the Beijing No. 4 Intermediate People’s Court, with a dispute amount of approximately USD 20 million. Through robust defense strategies and diligent case management, he secured full recognition of the client's claims.",
  "In collaboration with a leading international law firm, WAN Li represented a renowned domestic travel agency in litigation before the Hong Kong High Court against a Hong Kong airline in a contract dispute worth approximately USD 30 million. The initial judgment substantially reduced the client’s compensation liability, achieving a favorable outcome. The case is currently on appeal.",
  "Represented a leading domestic gaming company in a copyright infringement lawsuit against another gaming company before the Beijing Haidian District People’s Court and the Beijing Intellectual Property Court, securing the maximum statutory penalty. This case was selected as one of Beijing Court’s Top 10 Typical Copyright Judicial Cases by the Beijing Higher People’s Court for 2020.",
  "Represented a leading domestic gene technology company and its founder in responding to an equity repurchase lawsuit filed by an internationally renowned investment fund before the Beijing Daxing District People’s Court, where the plaintiff claimed a total repurchase amount exceeding RMB 61 million. WAN Li ultimately helped the client successfully settle the case at a favorable repurchase price.",
  "Represented a Japanese equipment manufacturer before the Qingdao Intermediate People’s Court, in which the opposing party applied for the enforcement of an arbitration award rendered by the China International Economic and Trade Arbitration Commission (CIETAC). After he engaged in multiple rounds of communication, the court ultimately dismissed. the opposing party’s enforcement application.",
  "Represented a well-known domestic education technology company in contract dispute litigation against a leading Chinese book publisher, which was heard by the Beijing Xicheng District People’s Court and the Beijing Intellectual Property Court. WAN Li successfully persuaded the court of second instance to reverse the unfavorable first-instance judgment and issue a revised verdict, helping the client reduce losses by more than 50%.",
  "Represented or assisted major airlines, general aviation companies, and their insurers and reinsurers in handling liability incidents and insurance claims, including compensation for the “8.24 Yichun Air Crash”, “11.21 Baotou Air Crash”, and “Asiana Airlines Flight 214 Crash in San Francisco”, as well as multiple general aviation accidents and numerous claims for aircraft on-ground incidents, cargo damage, and personal injury, addressing both airline liability and insurer responsibilities.",
  "Conducted an investigation for a U.S.-owned industry-leading company into a distributor’s alleged misconduct, which led to the distributor’s full repayment of nearly RMB 1 million in misappropriated funds.",
  "Established a comprehensive anti-corruption compliance system for a pre-IPO high-tech enterprise.",
  "Represented a unicorn tech company in responding to a criminal investigation into alleged infringement of trade secrets initiated by a competitor, with public security authorities ultimately deciding to dismiss the case on the grounds that the founder had no criminal facts.",
  "Represented a US dollar investment fund in conducting an internal investigation into senior manager of a high-tech portfolio company in Mainland China, and initiated criminal proceedings on suspicion of occupational embezzlement. The executive has been approved for arrest by a people’s procuratorate in Beijing and the case is currently under review for prosecution.",
  "WAN Li previously served as Legal Director (Litigation) in the legal department of a listed company, responsible for overseeing all dispute resolution matters across the group. WAN Li represented the company in pursuing criminal liability in several cases, including copyright infringement and misappropriation of company funds, leading to the apprehension of over ten suspects, with several individuals receiving custodial sentences. One intellectual property infringement criminal case handled by him was selected as one of the Top 10 Representative Intellectual Property Criminal Cases of 2020 by the Supreme People’s Procuratorate and was also listed as one of the 2020 Top 10 Typical Cases of Intellectual Property Judicial Protection of Sichuan Court.",
  "Participated as one of the drafters in the compilation of the Evaluation of the Effectiveness of Compliance Management Systems for Small and Medium-Sized Enterprises initiated by the China Association of Small and Medium Enterprises."
];

const zoeAchievements = [
  "Represented a well-known credit insurance company as the respondent in an overseas investment insurance contract dispute arbitration before the CIETAC (Beijing), involving over USD 180 million. The case also involved the determination of potential expropriation disputes between an investor and a host state under a bilateral BIT, with significant implications. Ultimately, secured a complete victory for the client, with the arbitral tribunal dismissing all of the counterparty’s claims.",
  "Represented INVISTA in initiating a franchise contract dispute before the CIETAC (Beijing), involving over RMB 253 million. The arbitration was conducted under the UNCITRAL Arbitration Rules, with English as the arbitration language. Also represented the client as the respondent in a petition to confirm the validity of the arbitration agreement before a Chinese court, winning the high-profile “Zhejiang Yisheng v. INVISTA” case regarding the validity of an arbitration clause for arbitration under the UNCITRAL Rules at CIETAC. In 2014, the Supreme People’s Court designated this case as a model example of providing judicial services and guarantees for the Belt and Road Initiative.",
  "Represented a listed company in an arbitration before the CIETAC (Beijing) (the widely publicized “Yu’E Bao” dispute), involving over RMB 71 million (with overall economic interests exceeding RMB 2.5 billion). Ultimately, forced the counterparty to settle with the client on favorable terms.",
  "Represented a central state-owned enterprise in initiating arbitration before the CIETAC (Beijing) over disputes under 13 non-ferrous metal bulk sales contracts and responding to the counterparty’s counterclaims, involving over USD 10 million. The arbitral tribunal ultimately upheld all of the client’s claims and dismissed all of the counterparty’s counterclaims. Subsequently, continued to represent the client in initiating two additional arbitration cases before the CIETAC(Beijing) over multiple non-ferrous metal bulk sales contracts, involving over RMB 170 million and RMB 180 million respectively, both resulting in favorable awards upholding all of the client’s claims.",
  "Represented a well-known international fund in initiating an asset transfer dispute concerning a data center before the CIETAC (Shanghai), involving over RMB 130 million, and obtained a favorable award.",
  "Represented the Tianjin subsidiary of a well-known international energy technology company in initiating an engineering dispute before the CIETAC (Shanghai), involving over RMB 53 million. Forced the counterparty to settle and pay over 80% of the claimed amount. Also provided legal services to the client in connection with settlement with a subcontractor in a related arbitration case before the CIETAC(Beijing).",
  "Represented the Chinese subsidiary of a well-known UK medical company as the claimant in initiating a project management and cooperation agreement dispute before the Shanghai International Arbitration Centre (SHIAC), involving over RMB 270 million, with English as the arbitration language.",
  "Represented an individual investor in initiating a securities investment collective fund trust contract dispute before the Beijing Arbitration Commission (BAC), involving over RMB 33 million. The parties reached a settlement agreement, achieving a satisfactory result for the client.",
  "Represented a Sichuan energy conservation investment company in initiating a loan and cooperation agreement dispute before the Beijing Arbitration Commission (BAC), involving over RMB 25 million. The arbitral tribunal upheld all of the client’s claims.",
  "Represented a well-known Wuhan enterprise in initiating a tax dispute arbitration under an equipment procurement contract before the Beijing Arbitration Commission (BAC), involving over RMB 15 million. Ultimately persuaded the counterparty to accept most of the client’s claims, reaching a comprehensive settlement and achieving a satisfactory result.",
  "Represented an offshore USD fund of a well-known fund in initiating an equity and creditor’s rights investment agreement (repurchase and bond settlement) dispute against a domestic high-tech enterprise and its founder before the Hong Kong International Arbitration Centre (HKIAC). The arbitration was conducted under the HKIAC Administered Arbitration Rules, involving over USD 20 million, with Hong Kong law as the governing law and English as the arbitration language. Assisted the client in successfully preserving the counterparty’s property in mainland China. Ultimately forced the counterparty to proactively settle with the client before the hearing and pay most of the claimed amount, achieving a satisfactory result.",
  "Represented seven fund parties in initiating two equity transfer contract disputes against the NYSE-listed subsidiary of a Chinese company before the Hong Kong International Arbitration Centre (HKIAC). The arbitration was conducted under the HKIAC Administered Arbitration Rules, with Chinese law as the governing law and English as the arbitration language, forcing the counterparty to settle with the clients after the hearing and pay most of the claimed amount.",
  "Represented a BVI wind technology company in initiating a technology cooperation and development agreement dispute before the Singapore International Arbitration Centre (SIAC), involving over RMB 800 million. The arbitration was conducted under the SIAC Arbitration Rules, with Chinese law as the governing law and Chinese as the arbitration language. The arbitral tribunal ultimately upheld the client’s main claims and dismissed all of the counterparty’s counterclaims.",
  "Represented a well-known central state-owned electric power enterprise in initiating a power plant construction project agreement dispute against an Indian government-owned company before the International Court of Arbitration of the International Chamber of Commerce (ICC), involving over USD 150 million. The seat of arbitration was Kolkata, India, and English was the arbitration language. The arbitral tribunal ultimately upheld most of the client’s claims and dismissed almost all of the counterparty’s counterclaims. Also provided support to the client in the subsequent enforcement proceedings.",
  "Represented a well-known Taiwanese enterprise in initiating a convenience store shareholder agreement dispute arbitration before the International Court of Arbitration of the International Chamber of Commerce (ICC), involving over USD 115 million, with English as the arbitration language. Also assisted the client in handling parallel Cayman Islands court proceedings and other domestic strategic responses.",
  "Represented the Government of the People’s Republic of China as the respondent in an investment arbitration case filed by Ansung Housing, a Korean company, before the International Centre for Settlement of Investment Disputes (ICSID) (Case No. ARB/14/25). This was the first investment arbitration case against the PRC in which a final award was rendered. The arbitral tribunal dismissed all of Ansung’s claims, finding them “manifestly lacking in legal merit”.",
  "Represented a real estate development company in an application to the Beijing Fourth Intermediate People’s Court to successfully set aside an arbitral award rendered by the China International Economic and Trade Arbitration Commission (CIETAC) in a dispute over an equity transfer agreement with an investment company.",
  "Provided legal services to Chinachem Group and its subsidiaries in an equity dispute with China Minsheng Bank before the Supreme People’s Court, involving a subject matter of over RMB 1.6 billion.",
  "Represented Korea Haeahn Architecture in appealing to the Jiangsu Provincial Higher People’s Court against a first-instance ruling by the Wuxi Intermediate People’s Court that it lacked jurisdiction over a letter of credit dispute between the client, a Hong Kong special purpose company, and a Wuxi company. The appeal was rejected by the Jiangsu Provincial Higher People’s Court. Further, on behalf of the client, successfully applied for retrial before the Supreme People’s Court, which revoked the rulings of the Jiangsu Provincial Higher People’s Court and the Wuxi Intermediate People’s Court holding that the courts lacked jurisdiction.",
  "Represented INVISTA Technologies S.a.r.L., a Luxembourg subsidiary of a U.S. company, in an application to the Beijing First Intermediate People’s Court for recognition and enforcement of an arbitral award rendered by the Singapore International Arbitration Centre (SIAC) involving over USD 4.5 million, forcing the counterparty to settle with the client.",
  "Represented INVISTA Technologies S.a.r.L., a Luxembourg subsidiary of a U.S. company, as the respondent in a petition to confirm the validity of an arbitration agreement administered by CIETAC under the UNCITRAL Arbitration Rules before the Ningbo Intermediate People’s Court and the Zhejiang Provincial Higher People’s Court. The courts ultimately dismissed the counterparty’s application to declare the arbitration agreement invalid. This was the first time a Chinese court ruled on the validity of an arbitration agreement for arbitration conducted by a Chinese arbitral institution under the UNCITRAL Rules, and the Supreme People’s Court published it as a typical case in 2014.",
  "Represented Quipica, LLC, a U.S. company, in an application to the Deyang Intermediate People’s Court of Sichuan Province, for recognition and enforcement of an arbitral award rendered by the International Dispute Resolution Center (ICDR) involving over USD 14 million. The parties ultimately settled, achieving a satisfactory result for the client.",
  "Represented CSI Solar(Suzhou) in applying to the Suzhou Intermediate People’s Court for non-enforcement of a domestic arbitral award involving over RMB 190 million. The court upheld the client’s claim and ruled not to enforce the award.",
  "Represented Platinum Enterprise Management Consulting (Shanghai), a Chinese subsidiary of a UK high-end sports club, in enforcing two CIETAC arbitral awards before the Shaoxing Intermediate People’s Court, involving approximately RMB 70 million. The counterparty was forced to settle with the client, achieving a satisfactory result."
];

const mengchengAchievements = [
  "Represented a listed company in the film and television industry in a third-party revocation action against a judgment of the Beijing High People's Court. The dispute, arising from a creditor’s revocation right, involved an equity transfer valued at over USD 30 million. We secured a substantial win for the client in the first instance before the Beijing High People's Court; the case is currently pending in the second instance before the Supreme People's Court.",
  "Represented a premier private equity institution in an equity transfer dispute against the founder of a \"new consumption\" enterprise. The case involved arbitration at the Beijing Arbitration Commission (BAC) and asset preservation proceedings at the Shanghai No. 1 Intermediate People's Court. We managed the entire process, ultimately securing a settlement from a position of dominant advantage.",
  "Represented an investment platform managed by a real estate fund with AUM exceeding RMB 100 billion in a dispute involving commercial property valued at over RMB 100 million. We sought the eviction of a state-owned financial institution and the payment of occupation fees. The court of first instance supported the client’s primary claims; during the second instance, we leveraged our dominant legal position to reach a settlement that successfully achieved the client’s commercial objectives.",
  "Represented a NASDAQ-listed retail company in defending against a tort liability lawsuit filed by a consumer. By raising rigorous procedural and substantive objections during the pre-trial phase, we successfully persuaded the court and reached an effective communication with the opposing party, resulting in the voluntary withdrawal of the case and the successful mitigation of reputational risks.",
  "Represented a leading domestic industrial M&A institution in an equity buy-back arbitration at the BAC against a prominent AI and big-data enterprise and its founder. With the amount in controversy reaching approximately RMB 300 million, the tribunal upheld all our legal positions and claims, resulting in a comprehensive victory for the client.",
  "Represented a leading domestic power bank rental enterprise in a high-stakes patent ownership dispute. As the patent in question served as the cornerstone of the client’s business and financing, its ownership was critical to operational stability. Following proceedings before the Supreme People's Court in the second instance, we secured a total victory, effectively safeguarding the client’s core commercial interests.",
  "Represented a senior professional in the gaming industry in a series of disputes with partners regarding equity and dividends. Through strategic litigation, we successfully clarified key legal facts, including the legitimacy of the client’s shareholder status and the counterparty’s tortious intent, securing an ideal outcome for the client.",
  "Represented a NASDAQ-listed company in an arbitration at the Shanghai International Economic and Trade Arbitration Commission (SHIAC) regarding a Directors and Officers (D&O) liability insurance dispute. Despite a lack of domestic precedents, we successfully persuaded the tribunal to support our claims, achieving full recovery of the insurance indemnity.",
  "Represented an accounting firm in three derivative tort indemnity disputes initiated by a large state-owned financial enterprise following litigation by overseas investors. With the total amount in controversy exceeding RMB 400 million, all three cases have yielded successful results, whether in terms of interim or final outcomes."
];

const weifanAchievements = [
  "Represented a large overseas listed company in an insurance claim dispute arbitration against several leading domestic insurance companies before the Shanghai International Economic and Trade Arbitration Commission (SHIAC). By analyzing and arguing key policy provisions such as severability and exclusion clauses, we successfully obtained full payment of the insurance benefits for the client.",
  "Represented an enterprise under a leading industrial investment institution in an investment contract dispute arbitration against an investment management company and its legal representative before the Beijing Arbitration Commission (BAC). The subject matter of the case was over RMB 720 million. A favorable award was obtained.",
  "Represented a leading entertainment industry enterprise in an investment repurchase lawsuit against a film company. Subsequently, based on the settlement agreement reached in the lawsuit, we initiated an arbitration against the legal representative of the film company. In the ensuing enforcement proceedings, we assisted the enforcement court in taking a series of compulsory measures against the opposing party. All amounts have been recovered and the case has been closed upon full satisfaction of the judgment.",
  "Represented a leading film and television entertainment enterprise in a film investment agreement dispute against a large state-owned company and its affiliates, with a subject matter of approximately RMB 150 million. The case involved conflicts in contractual arrangements among different parties. Through professional analysis and argumentation, we successfully persuaded the court to rule that all amounts should be paid to our client. The judgment was upheld by the Beijing Higher People's Court on second instance and by the Supreme People's Court on retrial.",
  "Represented an enterprise under a leading capital management company in an equity repurchase dispute arbitration against a technology company and its legal representative, among others, before the China International Economic and Trade Arbitration Commission (CIETAC). By promptly applying for asset preservation measures over the core assets of the opposing party, we prompted the opposing party to settle with the client and pay the full repurchase price.",
  "Represented a manufacturing company in an equity repurchase dispute arbitration against a real estate company before the Beijing Arbitration Commission (BAC), with a subject matter exceeding RMB 360 million. The case involved core legal issues such as restrictions on corporate share repurchases under the Minutes of the National Conference on the Trial of Commercial Cases (Jiumin Minutes) and the characterization of “debt disguised as equity.”Through our professional arguments, we successfully persuaded the arbitral tribunal that the matter was in substance a loan and obtained a fully favorable award.",
  "Represented an enterprise under a leading industrial investment institution in enforcing a final arbitral award against a technology company and its legal representative. In the enforcement proceedings, we took a series of asset investigation measures and initiated various recovery actions, including but not limited to claims to set aside a debtor’s act, actions to declare contracts void, and actions to establish marital joint debt.",
  "Represented an enterprise under a leading investment management group in a compensation agreement dispute arbitration against a leading retail service enterprise before the China International Economic and Trade Arbitration Commission (CIETAC). A favorable award was obtained, and despite the contract not specifying a default interest rate, we successfully persuaded the arbitral tribunal to impose default interest at the maximum rate permitted under current judicial practice.",
  "Represented a technology start-up in the aviation and gas turbine field in multiple contract dispute cases against a leading sales enterprise of vacuum pumps and precision components. The cases involved disputes over delivery quantity, quality issues, and judicial appraisal procedures, with a total subject matter of approximately RMB 30 million. Currently, some cases are still pending, while others have resulted in complete victories and full recovery of the amounts."
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
      "刘煜暄律师在争议解决领域为全球各大权威法律评级机构或知名媒体所认可：",
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
  "代表国内一家大型金融房地产投资企业参与在北京市第三中级人民法院进行的与中国境内最大的国有油气企业控股子公司的租赁合同纠纷案，案件标的约人民币3.6亿余元。",
  "代表某业主委员会参与在最高人民法院进行的起诉房地产开发公司的再审案件，案涉总金额超人民币5000万元。",
  "代表一家香港上市公司参与在辽宁省高级人民法院进行的与中国某大型施工企业的建设工程施工合同纠纷案，案件标的高达人民币8亿元。",
  "代表国内一家领先的产业投资并购机构参与在北京仲裁委员会进行的与国内某领先人工智能、大数据企业的股权回购纠纷案，案件标的约人民币3亿元。",
  "代表一家国内头部建筑建造企业参与在北京仲裁委员会进行的针对某知名房地产企业及其实际控制人的仲裁案，案件标的逾3亿元人民币。",
  "代表一家国内领先投资机构参与在北京仲裁委员会针对某外资企业提起的仲裁案，案件标的约人民币1.4亿元。",
  "代表一家国内顶尖医疗设备上市公司旗下子公司参与行政处罚听证程序，将案涉原行政处罚金额近人民币1亿元减少至300万元。",
  "代表国内某知名投资机构实际控制人参与在中国国际经济贸易仲裁委员会进行的与三家企业的股权转让纠纷案，案件标的约人民币1.4亿余元。",
  "代表国内某顶尖科技创新投资企业参与在中国国际经济贸易仲裁委员会针对被投公司及实际控制人等提起的股权回购仲裁案，案件标的金额约人民币1亿元。",
  "代表一家管理资产规模超千亿的投资机构旗下公司参与要求某国有金融机构从案涉物业腾退的诉讼案，案件标的约人民币1亿余元。",
  "代表一家大型房地产企业参与在北京仲裁委员会进行的针对合作方提起的房地产投资建设项目争议仲裁案，双方合计仲裁请求金额接近人民币6亿余元。",
  "代表一家纳斯达克上市的顶尖销售企业参与在上海国际仲裁中心进行的董监高责任保险纠纷案，案件涉案金额为2500万美元。",
  "代表某市值超百亿的港交所影视娱乐上市企业参与在北京市高级人民法院进行的第三人撤销之诉案件，案件争议的标的股权价值超3000万美元。",
  "代表某科技领域领军创业人士参与在上海国际仲裁中心进行的应对世界五百强外国投资企业以及中国地方政府基金的股权回购仲裁案，累计标的金额超人民币10亿元。",
  "代表某国内顶尖影视娱乐及票务销售公司参与处理与项目合作方及实控人间发生的演唱会项目票务收益争议案件。",
  "代表某市值超百亿的港交所影视娱乐上市企业参与大制作影视项目发行收入归属引发的投资争议纠纷案件，案件标的约人民币1.5亿元。",
  "代表专注于健康与科技的国内知名企业参与应对某基金股东的有限合伙人提起的股权转让纠纷案件，案涉标的股权估值约为3.5亿余元。",
  "代表某大型高端商业房地产开发运营公司旗下子公司参与针对某健康科技公司提起的股权回购争议仲裁案件，案件标的额约为1亿余元。"
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
  "代表一家知名影视投资制作公司处理与某国有大型出版集团之间在北京市高级人民法院及北京市第一中级人民法院的电影投资及发行合同纠纷。案件标的约人民币1.6亿元。",
  "代表一家知名影视投资制作公司处理与国内一家文娱产业企业及其创始人之间在天津市滨海新区人民法院及北京仲裁委员会的项目投资合同及担保合同纠纷。案件标的约人民币2300万元。",
  "代表一家在美国纳斯达克上市的知名企业处理与国内八家大型保险公司之间在上海国际仲裁院的董高责任保险合同纠纷。案件标的约人民币2亿元。",
  "代表某知名私募基金处理与国内一家科技创业企业及其创始人之间在杭州市两级法院的股东知情权纠纷诉讼以及在北京仲裁委员会的股权回购协议纠纷。案件标的约人民币2亿元。",
  "代表国内一家大型证券公司处理与某民营企业在北京市高级人民法院的股权收益权转让暨回购合同纠纷诉讼。案件标的约人民币10亿元。",
  "代表一家信托公司处理与某民营企业在北京市第四中级人民法院的金融借款合同纠纷诉讼。案件标的约人民币2亿元。",
  "代表一家法国私募基金处理与一家民营医疗机构在成都市中级人民法院的VIE架构股权转让及回购纠纷诉讼。案件标的约人民币3000万元。",
  "代表某知名私募基金处理与国内一家娱乐产业上市公司持股平台在北京仲裁委员会的合伙企业份额转让及回购协议纠纷。案件标的约人民币4000万元。",
  "代表一家国有信托公司处理与国资股东在北京市第二中级人民法院及北京市西城区人民法院的一系列公司决议效力纠纷诉讼。",
  "代表云南某国企集团处理与当地民营企业在昆明市中级人民法院及云南省高级人民法院的大宗商品融资性买卖合同纠纷诉讼。案件标的约人民币1.6亿元。",
  "代表香港一家房地产投资基金处理与某民营企业在天津市第一中级人民法院的仓储用房租赁合同纠纷诉讼。案件标的约人民币3000万元。",
  "代表美国一家知名跨国企业处理与某民营企业在沈阳市中级人民法院及辽宁省高级人民法院的融资租赁合同纠纷诉讼。案件标的约人民币2000万元。",
  "代表香港一家知名房地产开发企业处理与内地总承包方的建设工程项目招投标及合同纠纷。案件标的约人民币3亿元。",
  "代表一家国有私募基金处理与某民营上市公司母公司在中国国际经济贸易仲裁委员会的合伙份额收益权转让暨回购合同纠纷。案件标的约人民币2亿元。",
  "代表某资产管理公司处理与国内一家房地产企业之间的借贷及抵押合同纠纷，并参与该房地产企业在上海市第三中级人民法院的破产重整程序，案件标的约人民币1.2亿元。"
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
      "代表一家知名境外美元基金在香港国际仲裁中心（HKIAC）提起针对某境内高科技企业及其创始人的股权回购及债券清偿争议案件，争议标的逾2700万美元，仲裁语言为英文；在案件中协助客户在内地法院成功保全对方财产；最终迫使对方在开庭前主动与客户和解并向客户支付大部分仲裁请求金额。",
      "代表一家知名境外美元基金在香港国际仲裁中心（HKIAC）提起针对某境内医疗器械企业及其创始人的贷款合同争议案件，争议标的逾900万美元，仲裁语言为英文；在案件中协助客户在中国内地成功保全对方财产，并最终获得胜诉裁决。",
      "代表一家知名香港生物科技企业应对投资方在中国国际经济贸易仲裁委员会（CIETAC）提起的股权回购仲裁案件，投资方主张的回购金额逾1.2亿人民币，最终帮助客户将回购金额降低四千余万，成功为客户减少损失，实现了客户满意的结果。",
      "代表一家知名地产企业因地产开发合作框架协议在中国国际经济贸易仲裁委员会（CIETAC）进行的仲裁，涉案金额约2.5亿元，经全面庭审与证据质证，最终仲裁庭采纳我方全部代理意见，委托人的仲裁请求获得全面支持。",
      "代表一家知名投资企业因借款及担保协议在北京仲裁委员会（BAC）针对一家业内知名石油公司提请仲裁，争议总金额约人民币1.5亿元，该案涉及跨境代收代付问题，代表客户推动双方就全部争议金额达成和解，目前本案处于和解协议的履行过程中。",
      "代表一家能源企业就合作投资协议事宜在北京仲裁委员会（BAC）针对另一家能源公司提请仲裁，要求相对方履行股权回购义务，争议金额约人民币1700万元，案件核心争议涉及回购协议的效力、回购通知的送达、回购价款的计算等问题，最终全面胜诉，客户全部仲裁请求均获支持。",
      "代表一家知名投资公司因影视投资协议在北京市朝阳区人民法院及北京市第三中级人民法院针对一家国内领先的影视公司进行诉讼，争议总金额约8000万元，该案涉及投资关系与借贷关系的区分与认定，代表客户获得两审的全面胜诉，本案正在强制执行过程中。",
      "代表一家国内领先游戏企业应对其持股公司的小股东在北京市海淀区人民法院、北京市朝阳区人民法院、北京市第一中级人民法院提起的损害公司利益责任纠纷、知情权纠纷等系列案件，争议标的逾6000万人民币，就损害公司利益责任纠纷案件代表客户取得胜诉判决，获得法院的全面支持，最终代表客户与对方以优势地位进行和解，避免后续无谓的争议，实现了令客户满意的结果。",
      "代表一家独角兽跨境电商创业公司的创始人争夺公司控制权，参与程序包括协助创始人应对在开曼群岛大法院、香港国际仲裁中心（HKIAC）进行的诉讼和仲裁程序，代表创始人应对在北京市朝阳区人民法院和北京市海淀区人民法院的诉讼，并帮助客户取得在北京法院两起案件的全面胜利；参与程序还包括“公章争夺”、办公场所及财务资料争夺等系列程序，已成功帮助该创始人保留并继续持有控制权。",
      "代表一家知名海外投资基金处理与被投企业前任管理层间的控制权纠纷，所涉投资金额超8000万美元。成功协助由投资基金为代表的现任管理层确认并取得被投企业的控制权；同时代表被投企业应对前任管理层在上海市徐汇区人民法院提起的公司决议效力纠纷诉讼，经过两次开庭审理，最终以对方撤诉结案，充分维护了客户的利益。",
      "代表一家知名境外美元基金在苏州市中级人民法院国际商事法庭就香港国际仲裁中心（HKIAC）出具的仲裁裁决内容申请认可和执行，争议标的逾600万美元，顺利推动仲裁裁决在法院获得认可并进入执行程序。",
      "代表一家知名境外美元基金在上海市第一中级人民法院就香港国际仲裁中心（HKIAC）做出的仲裁裁决内容申请认可和执行，并协调美国律师在美国对进行承认和执行，争议标的逾2700万美元，通过积极推动该案在内地法院和在美国法院的程序，帮助客户以优势地位与相对方和解，和解款项已全部执行到位，本案现已结案。",
      "曾代表一家菲律宾建筑企业因独立保函欺诈纠纷而在北京市第四中级人民法院进行的诉讼，涉案金额约2000万美元，经过积极地抗辩和工作努力，客户的主张被全部支持。",
      "正在与一家知名国际律师事务所共同代表一家国内知名旅行社公司在香港高等法院应对一家香港航空公司对其提起的合同诉讼，总争议金额约3000万美元，一审判决大幅减少了客户的赔偿金额，取得了令客户满意的结果，目前案件正在二审中。",
      "代表一家国内领先的游戏公司在北京市海淀区人民法院以及北京知识产权法院因游戏著作权侵权起诉另一家游戏公司，侵权人被两审法院以按法律规定最高标准判罚，本案也被列为2020年北京法院著作权十大典型司法案例。",
      "代表一家国内领先的基因科技公司及其创始人应对一家国际知名的投资基金在北京市大兴区人民法院提起的股权回购诉讼案件，对方主张回购金额总计超过人民币6100万元，最终帮助客户成功地以优惠的回购金额和解结案。",
      "代表一家日本设备生产企业在青岛市中级人民法院应对其被相对方申请执行中国国际经济贸易仲裁委员会（CIETAC）作出的仲裁裁决的执行案件，在万力律师与法院的多轮次沟通下，最终相对方的执行申请被法院驳回。",
      "代表一家国内知名的教育科技公司应对一家国内领先的图书出版商在北京市西城区人民法院及北京知识产权法院提起的合同纠纷案件，成功推动二审法院撤销对客户不利的一审判决并改判，帮助客户直接减损50%以上。",
      "曾代表或协助各大航空公司、通航企业及其保险人和再保险人，处理责任事故以及保险理赔，包括：“8·24伊春空难”“11·21包头空难”“韩亚航空214旧金山空难”的理赔、数起通航飞机事故的理赔，以及为数众多的航空器场内剐蹭事故、运输货损及人身伤害的理赔，其中既涉及航空公司的违约或侵权责任，又涉及保险公司的保险责任及理赔程序。",
      "代表某行业龙头的美国独资企业调查一宗经销商涉嫌违规的案件，该经销商已经全额退赔其违规资金近百万元。",
      "为一家pre-IPO高科技企业建立全套企业反腐败合规体系。",
      "代表某独角兽型科技公司，应对竞争对手发起的涉嫌侵犯商业秘密罪的刑事调查程序，最终公安机关以创始人没有犯罪事实而决定撤案。",
      "代表某美元投资基金，对其在内地投资的高科技企业的高级管理人员进行内审调查，并以涉嫌职务侵占罪进行刑事控告，目前该高级管理人员已被北京某检察院批准逮捕，正在审查起诉的过程中。",
      "万力律师曾担任某上市公司法务部的法务总监（诉讼方向），负责该集团的所有争议解决工作。代表该上市公司刑事追责数起，包括侵犯著作权案、职务侵占案等，抓获嫌疑人十余名，多人被判实刑；其中负责办理的某知识产权侵权刑事案件，被最高人民检察院列入“2020年度检察机关保护知识产权典型案例”，亦被列为“四川法院2020年度知识产权司法保护十大典型案例”。",
      "作为起草人之一参与编写由中国中小企业协会发起的《中小企业合规管理体系有效性评价》。"
    ],
  },
  "zoe-zhang": {
    serviceIndustries: ["国际贸易", "公司股权", "建设工程", "金融", "国际商事仲裁"],
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
      "2025年11月，张莉律师荣获《法律500强》首届中国精英榜单“北京精英·商业争议”奖项。",
      "2021年1月，张莉律师获评《法律500强》亚太榜单“明日之星（Next Generation Partners）”（争议解决：仲裁）。",
      "2018年10月，张莉律师在北京市律师协会主办的“改革开放四十年 北京律师成果展示——优秀辩护词代理词原音重现”活动中荣获最佳口才奖。",
    ],
    achievements: [
      "代表某知名信用保险公司在贸仲委北京总会一起海外投资保险合同争议仲裁案件中应诉，争议涉及标的超过1.8亿美元；该案亦涉及潜在的投资者与东道国在双边BIT项下征收争议的认定，案件影响重大，最终为客户赢得了全面胜诉裁决，仲裁庭驳回了对方全部诉讼请求。",
      "代表英威达公司（INVISTA）在贸仲委北京总会提起一起特许经营合同争议案件，争议标的额逾人民币2.53亿元，仲裁程序根据《联合国国际贸易法委员会仲裁规则》（UNCITRAL规则）进行；仲裁语言为英文；同时代表客户在中国法院应诉对方提起的确认仲裁协议效力之诉，打赢了仲裁界瞩目的“根据UNCITRAL仲裁规则在贸仲委进行仲裁的仲裁协议效力之诉”（浙江逸盛诉英威达案）；这是中国法院第一次就在中国仲裁机构根据UNCITRAL规则进行仲裁的“混合仲裁条款”的有效性作出裁定；最高人民法院在2014年将该案作为“一带一路”建设提供司法服务和保障的典型案例予以公布。",
      "代理某上市公司处理一起贸仲委北京总会仲裁案件（即广受瞩目的“余额宝”纠纷）；争议标的额逾人民币7,100万元（涉及经济利益逾人民币25亿元），最终迫使对方与客户和解，取得了对客户有利的和解结果。",
      "代表某央企在贸仲委北京总会就13份有色金属大宗货物买卖合同项下争议提起仲裁，并就对方提起的仲裁反请求应诉，争议标的额逾1,000万美元，最终仲裁庭支持了客户全部的仲裁请求，并驳回了对方全部的仲裁反请求；其后，继续代理客户分别就多份有色金属大宗货物买卖合同在贸仲委北京总会提起了两案仲裁申请，争议标的额分别逾人民币1.7亿元和人民币1.8亿元，均获得了胜诉裁决。",
      "代表某知名国际基金在贸仲委上海分会提起一起涉及某数据中心的资产转让争议案件，争议标的额逾人民币1.3亿元，获得胜诉裁决。",
      "代表某知名国际能源科技公司天津子公司在贸仲委上海分会提起一起工程争议案件，争议标的额逾人民币5,300万元，迫使对方与客户和解并偿付客户80%以上的请求数额；同时，在本案项目相关的另一起在贸仲委北京总会的仲裁案件中，为客户与分包商之间的和解事宜提供法律服务。",
      "代表一家英国知名医疗企业的境内子公司，作为申请人，在上海国际仲裁中心（SHIAC）提起一起项目管理和合作协议纠纷仲裁案，争议标的额逾人民币2.7亿元，仲裁语言为英文。",
      "代表某自然人投资者在北京仲裁委员会提起一起证券投资集合资金信托合同争议案件，争议标的额逾人民币3,300万元，并最终促使双方达成和解协议，取得了客户满意的和解结果。",
      "代表四川某节能投资公司在北京仲裁委员会提起一起借款合作协议争议案件，争议标的额逾人民币2,500万元；仲裁庭支持了客户的全部仲裁请求。",
      "代表武汉某知名企业在北京仲裁委员会提起一起设备采购合同下税务纠纷争议仲裁案，争议标的人民币1,500万余元；最终促使对方接受客户大部分主张，达成一揽子和解，取得客户满意的结果。",
      "代表某知名基金境外美元基金在香港国际仲裁中心（HKIAC）提起针对某境内高科技企业及其创始人的股权及债权投资协议（回购及债券清偿）争议案件，仲裁程序适用《香港国际仲裁中心机构仲裁规则》，争议标的逾2000万美元，适用法律为香港法，仲裁语言为英文；在案件中协助客户成功在中国大陆保全对方财产；最终迫使对方在开庭前主动与客户和解并向客户支付大部分仲裁请求金额，取得客户满意的结果。",
      "代表七方基金当事人在香港国际仲裁中心（HKIAC）提起两起针对某中国公司在纽约的上市子公司的股权转让合同争议案件，仲裁程序适用《香港国际仲裁中心机构仲裁规则》，适用法律为中国法，仲裁语言为英文，迫使对方在开庭后与客户和解并向客户支付大部分仲裁请求金额。",
      "代表一家BVI风力技术公司，在新加坡国际仲裁中心（SIAC）提起一起技术合作开发协议争议案件，争议标的额逾人民币8亿元，适用法律为中国法，仲裁语言为中文，仲裁程序适用《新加坡国际仲裁中心仲裁规则》；最终仲裁庭支持了客户的主要仲裁请求，驳回了对方全部仲裁反请求。",
      "代表一家知名电力央企在国际商会（ICC）国际仲裁院提起针对印度一家政府公司的发电厂建筑工程协议争议案，争议标的额逾1.5亿美元，仲裁地为印度加尔各答，仲裁语言为英文；最终仲裁庭支持了客户的大部分仲裁请求，驳回了对方几乎全部的仲裁反请求。同时在随后的执行程序中为客户提供支持。",
      "代表台湾一家知名企业在国际商会（ICC）国际仲裁院提起一起便利店股东协议纠纷仲裁案，争议标的额逾1.15亿美元，仲裁语言为英文，同时协助客户处理并行开曼法院程序及国内其他策略应对。",
      "代表中国政府就韩国安城公司在解决投资争端国际中心（ICSID）提起的仲裁案件（案件编号为ARB/14/25）中应诉，在针对中国政府提起的投资仲裁案件中，这是第一起作出最终裁决的案件；仲裁庭驳回了韩国安城公司的全部仲裁请求，认为该等请求“明显缺乏法律依据”。",
      "代表某房地产开发公司处理其与某投资公司股权转让协议纠纷一案，向北京市第四中级人民法院提起申请，成功撤销中国国际经济贸易仲裁委员会作出的仲裁裁决。",
      "为华懋集团及其子公司与中国民生银行之间在最高人民法院的股权争议提供法律服务，争议标的额逾人民币16亿元。",
      "代表韩国海眼建筑，针对无锡市中级人民法院就客户与某香港特殊目的公司、某无锡公司之间的信用证纠纷作出的法院无管辖权的一审裁定，向江苏省高级人民法院提起上诉；该上诉被江苏省高级人民法院驳回；进一步代表客户成功向最高人民法院申请再审，最高人民法院撤销了江苏省高级人民法院与无锡市中级人民法院关于法院无管辖权的裁定。",
      "代表INVISTA Technologies S.a.r.L. 一家美国公司的卢森堡子公司，在北京市第一中级人民法院申请承认及执行一份新加坡国际仲裁中心做出的仲裁裁决，裁决金额逾450万美元，迫使对方与客户和解。",
      "代表INVISTA Technologies S.a.r.L.，一家美国公司的卢森堡子公司，在宁波市中级人民法院及浙江省高级人民法院应诉一起关于贸仲委适用《联合国国际贸易法委员会仲裁规则》（UNCITRAL规则）进行仲裁的仲裁协议效力确认之诉，法院最终驳回对方关于确认仲裁协议无效的申请；这是中国法院第一次就在中国仲裁机构根据UNCITRAL规则进行仲裁的仲裁协议的有效性作出裁定；最高人民法院在2014年将其作为典型案例发布。",
      "代表一家美国公司Quipica, LLC在四川省德阳市中级人民法院申请承认及执行一份国际争议解决中心（ICDR）作出的仲裁裁决，裁决金额逾1,400万美元，最终双方和解，取得客户满意的和解结果。",
      "代表苏州阿特斯在苏州市中级人民法院申请不予执行一份国内仲裁裁决，裁决金额逾人民币1.9亿元；法院支持了客户的诉讼请求，裁定不予执行仲裁裁决。",
      "代表铂第企业管理咨询（上海）有限公司，一家英国高端运动俱乐部的中国子公司，在绍兴市中级人民法院执行两份贸仲委仲裁裁决书，争议金额约人民币7000万元，迫使对方与客户和解，取得客户满意的和解结果。"
    ],
  },
  "mengcheng-yun": {
    serviceIndustries: ["金融", "泛娱乐", "地产", "新能源", "新消费"],
    education: "南京大学 法学学士（2020）",
    qualification: "中国内地律师执业资格",
    languages: ["中文", "英文"],
    socialEngagements: "",
    practiceArea:
      "云梦成律师的主要业务领域为商事争议解决，包括境内外诉讼与仲裁。云律师代理的案件类型涵盖股权争议、公司控制权纠纷、金融借贷、影视文娱、复杂商事租赁及专业机构责任纠纷等。其不仅在最高人民法院及各级地方法院拥有丰富的出庭经验，亦多次代表客户在 CIETAC、北仲、上国仲等机构处理重特大仲裁案件。",
    practiceExperience:
      "北京虎诉律师事务所资深律师（2026.02 - 至今）；北京市中伦律师事务所律师（2025.08 - 2026.01）；北京虎诉律师事务所律师（2021.04 - 2025.08）。",
    honors: [],
    achievements: [
  "代理某影视娱乐行业上市公司，针对北京市高级人民法院涉及一项价值逾3,000万美元股权转让交易的债权人撤销权纠纷判决，提起第三人撤销之诉。本案一审由北京市高级人民法院审理，我方代表客户取得实质性胜诉；目前案件处于二审阶段，由最高人民法院审理中。",
  "代理某头部股权投资机构，处理其与某新消费食品企业创始人间的股权转让纠纷，该案涉及北京仲裁委员会仲裁及上海市第一中级人民法院财产保全程序。我方协助客户全程推进，最终在绝对优势地位下促成双方和解。",
  "代理某千亿级地产基金管理的投资平台，就价值逾亿元的商业不动产，起诉某国有金融机构要求腾退物业并支付占有使用费。一审法院支持了客户的主要诉求；二审阶段，我方代表客户在优势地位下与对方达成和解，顺利实现商业目标。",
  "代表某纳斯达克上市企业应对消费者提起的侵权纠纷。我方在庭前即通过程序与实体异议，有效说服法院并与相对方达成沟通，最终促使原告撤诉，成功化解了客户的商誉风险。",
  "代理国内领先的产业投资并购机构，就标的额约3亿元人民币的股权回购争议，在北京仲裁委员会针对某人工智能及大数据头部企业及其创始人提起仲裁。仲裁庭支持了我方的全部主张，客户获得全面胜诉。",
  "代表国内某移动电源租赁龙头企业，应对针对其核心专利权属提起的诉讼案。该专利系客户融资及业务开展的基石，案情复杂且关键。历经最高人民法院二审审理，我方代表客户最终取得全面胜诉，捍卫了客户的核心商业利益。",
  "代表某游戏行业资深从业人士处理与合作伙伴间的股权、分红等系列争议。通过系列诉讼明确了客户股东身份、历史分红有效性及相对方侵权恶意等关键事实，为客户争取到了理想判决结果。",
  "代表某纳斯达克上市企业，在上海国际仲裁中心（SHIAC）提起董监高责任保险（D&O Insurance）争议仲裁案件。在缺乏同类先例参考的情况下，成功说服仲裁庭支持我方主张，实现全额赔付。",
  "代表某会计师事务所，应对某大型金融国企因境外投资者诉讼而发起的衍生侵权责任追偿纠纷。案件总争议标的逾4亿元人民币，目前三起案件均已取得理想的阶段性或终局性结果。"
],
  },
  "weifan-qiu": {
    serviceIndustries: ["商业与交易", "金融和私募股权"],
    education: "华南理工大学 法学、工学双学士（2019） ；中国政法大学 法律硕士（2022）",
    qualification: "中国内地律师执业资格",
    languages: ["中文", "英文"],
    socialEngagements: "邱伟帆律师是中国法学会财税法学研究会的会员。",
    practiceArea:
      "邱伟帆律师具备中国大陆律师执业资格。他的业务专注于高端商事诉讼与仲裁，同时涵盖日常公司法律咨询工作。他经常处理投融资、股权交易与回购、合同纠纷以及争议解决等相关事务，并为多个行业的客户提供法律服务，包括银行与金融、私募股权、影视、娱乐及房地产等领域。",
    practiceExperience:
      "邱伟帆律师自毕业以来一直就职于北京虎诉律师事务所，先后担任律师助理、资深律师，并已于2023年成功取得中国内地律师执业资格。",
    honors: [],
    achievements: [
  "代理某大型境外上市公司，针对多家国内头部保险公司，在上海国际经济贸易仲裁委员会提起保险索赔争议仲裁案。通过对保单可分性、免责条款等关键条款的分析论证，成功为当事人赢得保险金全额赔付。",
  "代理某产业投资龙头机构旗下的企业，针对某投资管理公司及其法定代表人，在北京仲裁委员会提起投资合同争议仲裁案，涉案标的额高达人民币7.2亿余元。该案已取得胜诉裁决。",
  "代理某文娱行业头部企业，针对某影业公司提起投资回购诉讼；后依据诉讼中达成的《和解协议》，针对该影业公司的法定代表人提起争议仲裁案。在后续执行程序中，协助执行法院对相对方采取一系列强制执行措施。该案已取得全部回款，执行完毕结案。",
  "代表某影视娱乐行业头部企业，针对某大型国有公司及其关联公司提起影视投资协议纠纷案，涉案标的额约人民币1.5亿元，且涉及不同主体间的合同安排冲突问题。经过专业论证及分析，成功说服法院判决全部款项应支付至我方当事人名下。该案经北京市高级人民法院二审、最高人民法院再审，均维持原判。",
  "代理某头部资本管理公司旗下的企业，针对某科技公司及其法定代表人等，在中国国际经济贸易仲裁委员会提起股权回购争议仲裁案。通过立即申请对相对方核心资产采取财产保全措施，促使相对方主动与当事人和解，并支付全部回购款项。",
  "代理某实业公司，针对某置业公司，在北京仲裁委员会提起股权回购争议仲裁案，涉案标的额高达人民币3.6亿余元。该案涉及《九民纪要》关于公司回购的限制、“名股实债” 等核心法律争议。最终，经过我方专业论述，成功说服仲裁庭认可本案实质属于借款，并已取得全面胜诉裁决。",
  "代理某产业投资龙头机构旗下的企业，依据生效仲裁裁决，针对某科技公司及其法定代表人提起强制执行程序。在执行程序中，采取了一系列财产调查措施，并提起了系列财产追索诉讼，包括但不限于债权人撤销之诉、确认合同无效之诉、确认夫妻共同债务之诉。",
  "代理某头部投资管理集团旗下的企业，针对某零售服务行业头部企业，在中国国际经济贸易仲裁委员会提起补偿协议争议仲裁案。该案已取得胜诉裁决，且在合同未明确约定逾期利息标准的情况下，成功说服仲裁庭按照现行司法实践中可支持的最高利率标准判决对方承担逾期利息。",
  "代理某航空燃机领域的科创企业，针对某真空泵及精密零部件销售龙头企业，提起多起合同纠纷案件。案件涉及货物交付数量争议、质量争议及司法鉴定程序，涉案标的总额约人民币3000万元。目前，部分案件仍在审理中，部分案件已取得全面胜诉结果，并实际收回全额款项。"
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
    education: "Bachelor of Laws, Peking University, 2009",
    qualification: "Bar Admission in the People's Republic of China",
    languages: ["Mandarin", "English"],
    socialEngagements:
      "Mr. Liu currently serves as a member of the Commercial Arbitration Law Professional Committee of the Beijing Lawyers Association, Deputy Director of the Arbitration and Mediation Business Research Association of the Chaoyang District Lawyers Association.",
    practiceArea:
      "Mr. Liu specializes in domestic litigation and arbitration. He has extensive experience in the field of dispute resolution, with a focus on commerce and transaction, private equity, corporate equity and control, finance, media and entertainment, real estate and construction.",
    practiceExperience:
      'As the founding partner of Tiger Partners, Mr. Liu has been practicing law for more than sixteen years. Prior to founding Tiger Partners, Mr. Liu worked as a partner at Jingtian & Gongcheng (2018-2019). Before that, Mr. Liu worked as a dispute resolution lawyer at Fangda Partners (2014-2018), King & Wood (2012-2014), and Zhong Lun Law Firm (2009-2010). ',
    honors: [
      "Mr. Liu has been widely recognized by leading global legal ranking institutions and prominent media outlets in the field of dispute resolution:",
      "In November 2025, Mr. Liu was awarded the inaugural Legal 500 China Elite: Beijing Elite - Commercial Disputes.",
      "In January 2025, Mr. Liu was exclusively invited to author the Chambers Global Practice Guides 2025 - Dispute Resolution Overview (China Chapter).",
      'In May 2022, Mr. Liu was listed in the 2022 Top Ranked Lawyers List as "Rising Star" in the field of "Dispute Resolution - Litigation" by LEGALBAND.',
      'In January 2022, Mr. Liu was selected as one of "The A List" among 100 elite practitioners of Chinese law by China Business Law Journal.',
      "In June 2021, Mr. Liu was listed on the Benchmark Litigation China 2021 list of lawyers recommended for dispute resolution in Beijing.",
      'In April 2021, Mr. Liu was listed in the LEGALBAND 2021 Top Ranked Lawyers, and ranked as the "Rising Star" in the field of "dispute resolution and litigation".',
      "In March 2021, Mr. Liu was identified by the notable legal media China Business Law Journal in the list of Rising Stars 2021 Top 40.",
      "In May 2020, Mr. Liu once received an exclusive interview with Asian Legal Business (ALB), a well-known legal media, and was featured by ALB as “An Up-and-Comer in Dispute Resolution”.",
      'In September 2019, Mr. Liu was awarded the title of "Notable Practitioner" in the field of dispute resolution in China legal market by Asialaw Profiles for 2020.',
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
      'Mr. Xu is a Fellow of the Chartered Institute of Arbitrators (F.CIArb), an arbitrator of China Commission of Arbitration for Sport and is listed in the "100 High-end International Legal Talents" by the Beijing Municipal Bureau of Justice and the International Lawyers Talent Pool of the Beijing Lawyers Association. Mr. Xu is a member of the China Association For Sports Law (CASL), the Culture, Tourism, Media, and Sports Committee of the Beijing Lawyers Association, and the Sports Law and Olympic Legal Affairs Research Association of the Beijing Law Society.',
    practiceArea:
      "Mr. Xu is a practicing lawyer in Mainland China. He specializes in acting as an advocate in domestic litigation and domestic and overseas arbitration and has extensive experience in providing legal advisory services to enterprises. Mr. Xu has extensive experience in investment & financing, equity transaction, corporate governance, commercial contract review and dispute resolution and product liability for clients.  His cases involve in industries of banking and finance, private equity, high technology, new media, film, television and entertainment, education, real estate and other areas. ",
    practiceExperience:
      "Prior to joining Tiger Partners, Mr. Xu was a dispute resolution attorney in King & Wood and Fangda Partners.",
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
    serviceIndustries: ["International Trade", "Corporate", "Construction Engineering", "Finance", "International Commercial Arbitration"],
    education:
      "Bachelor of Laws & Bachelor of English (Double Degree), Beijing Foreign Studies University , 2007; Master of Laws, Beijing Foreign Studies University , 2010 ; 2018 Bar Council Training Scheme; 2025 HKIAC Advanced Arbitrator Training Programme",
    qualification: "Bar Admission in the People's Republic of China",
    languages: ["Mandarin", "English"],
    socialEngagements:
      "Zoe is an arbitrator of the China International Economic and Trade Arbitration Commission, a member of the Organizing Committee of the China Young Arbitration Group, a member of the Commercial Arbitration Law Professional Committee of the Beijing Lawyers Association, a member of the Arbitration and Mediation Research Committee of the Beijing Chaoyang District Lawyers Association, and a panelist on the Arbitrators & Neutrals Panel of the eBRAM International Online Dispute Resolution Centre.",
    practiceArea:
      "Zoe Zhang specializes in commercial arbitration and litigation, and especially foreign related arbitration and international arbitration. The major sectors of her practice involve sale of goods, private equity, construction, real estate, joint venture, equity transfer, intellectual properties, energy etc.",
    practiceExperience:
      "Before joining Tiger Partners, Zoe was working with the Dispute Resolution Team of a top Chinese law firm as an equity partner. Zoe has represented clients in over 100 commercial disputes, most of which are foreign related or international arbitration cases. The applicable rules of those arbitration cases include CIETAC Rules, the BAC Rules, the UNCITRAL Rules, the HKIAC Administered Rules, the ICC Rules, and the SIAC Rules. The arbitration language of many of those cases were English, and hearings were conducted in China Mainland, Hong Kong, Singapore, India and other jurisdictions.\nMost of the cases represented by Zoe have achieved relatively favorable results with a high success rate and high client satisfaction.",
    honors: [
      "2025 The Legal 500, China Elite - Beijing Elite - Commercial Disputes.",
      "2021 The Legal 500, Next Generation Partners (Dispute Resolution: Arbitration).",
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
    image: "/assets/team/team5.png",
    phone: "010-85885228",
    email: "yun.mengcheng@tigerpartners.cn",
    serviceIndustries: ["Finance", "Pan-entertainment", "Real Estate", "New Energy", "New Consumption"],
    education: "LL.B., Nanjing University Law School, 2020",
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
      "Bachelor of Laws and Bachelor of Engineering, South China University of Technology, 2019  ; Master of Laws, China University of Political Science and Law, 2022 ",
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
