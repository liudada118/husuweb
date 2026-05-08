export const industryMetadata = {
  "private-equity": {
    title: "Private Equity",
    intro:
      "Tiger Partners provides a full range of legal services to many well-known Chinese investment institutions, portfolio or invested companies, founders and shareholders, ranging from potential risk control, pre-litigation dispute resolution, litigation, arbitration and enforcement, to achieve their ultimate business goals.",
  },
  finance: {
    title: "Finance",
    intro:
      "Tiger Partners has highly specialized knowledge and extensive experience in dispute resolution relating to finance, and is able to provide early warning and prevent risks arising from various financial products, investment and finance transactions, and provide all-round dispute resolution services in civil & commercial and civil cross criminal area.",
  },
  "real-estate": {
    title: "Real Estate",
    intro:
      "Tiger Partners is specialized in dispute resolution in real estate industry. From traditional disputes over construction contracts to large-scale disputes over real estate, land purchase and lease agreements, Tiger Partners has a profound theoretical basis and extensive practical experience.",
  },
  "sports-and-e-sports": {
    title: "Sports and E-Sports",
    intro:
      "Tiger Partners has deeply participated in the increasingly mature commercialization process of China's sports industry. E-Sports, after being selected into the Asian Games, has opened a golden era again. With a wealth of experience and foresight, Tiger Partners is energizing the dream of young talents in the industry to set sail.",
  },
  "international-trade": {
    title: "International Trade",
    intro:
      "The Belt and Road Initiative offers new opportunities as well as challenges on an ongoing basis for foreign trade participants in all sectors. With extensive experience and academic background in foreign-related cases, the lawyers of Tiger Partners are able to provide high-quality and efficient foreign-related dispute resolution legal services to Chinese and foreign clients.",
  },
  "cyber-tech-and-game": {
    title: "Cyber Tech and Game",
    intro:
      "Since Internet plus initiative became a national strategy, numerous entrepreneurs have been pursuing wealth and success in the tide of the internet. With years of legal service experience cultivating in internet technology and game, Tiger Partners has greatly protected and escorted investors and young entrepreneurs in this industry.",
  },
} as const;

export type IndustryMetadataSlug = keyof typeof industryMetadata;

export const defaultIndustryMetadata = industryMetadata["private-equity"];
