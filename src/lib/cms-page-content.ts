import type { Language } from "./site-types";
import { landingCasesData } from "@/app/components/landing/landingCasesData";
import aboutBackgroundImage from "@/assets/about2.png";
import aboutBannerImage from "@/assets/about3.png";
import aboutHeroImage from "@/assets/about.png";
import aboutIcon1 from "@/assets/abouticon1.png";
import aboutIcon2 from "@/assets/abouticon2.png";
import aboutIcon3 from "@/assets/abouticon3.png";
import awardHeroImage from "@/assets/award.png";
import awardsImage from "@/assets/awards.png";
import contactHeroImage from "@/assets/contact.png";
import contactLogo1 from "@/assets/contactlogo1.png";
import contactLogo2 from "@/assets/contactlogo2.png";
import contactLogo3 from "@/assets/contactlogo3.png";
import eventHeroImage from "@/assets/event.png";
import eventDateImage1 from "@/assets/eventDate1.png";
import eventDateImage2 from "@/assets/eventDate2.png";
import eventDateImage3 from "@/assets/eventDate3.png";
import eventDateImage4 from "@/assets/eventDate4.jpg";
import eventDateImage5 from "@/assets/eventdate/eventDate5.jpeg";
import eventDateImage6 from "@/assets/eventdate/event6.jpeg";
import eventDateImage7 from "@/assets/eventdate/event7.jpeg";
import eventDateImage8 from "@/assets/eventdate/event8.jpeg";
import eventDateImage9 from "@/assets/eventdate/event9.jpeg";
import eventDateLogo1 from "@/assets/eventdatelogo1.png";
import eventDateLogo2 from "@/assets/eventdatelogo2.png";
import eventDateLogo3 from "@/assets/eventdatelogo3.png";
import eventDateLogo4 from "@/assets/eventdatelogo4.png";
import mediaHeroImage from "@/assets/media.png";
import podcastHeroImage from "@/assets/podcast.png";
import thoughtMediaImage from "@/assets/Thought.png";
import workLifeImage1 from "@/assets/workandlife/0a575519339c4e1e8e30e16fcd10e29f.jpeg";
import workLifeImage2 from "@/assets/workandlife/136f1ff4d2484f1ab28b7ab27c5ecec8.jpeg";
import workLifeImage3 from "@/assets/workandlife/246a4c00fa854cdba2dc186950c9c823.jpeg";
import workLifeImage4 from "@/assets/workandlife/2ea5b4c13df74888a6cf6b6d411a56a7.jpeg";
import workLifeImage5 from "@/assets/workandlife/667abc64fe134af9a00caf7fe5f8de69.jpeg";
import workLifeImage6 from "@/assets/workandlife/6ea3b67a9cd6494cbfbac49518c90085.jpeg";
import workLifeImage7 from "@/assets/workandlife/eb680bb1cc504421bda802c5e9e349de.jpeg";
import workLifeImage8 from "@/assets/workandlife/ec95ebd35030dd8f0cdd9eb3811db0702f5aae82.png";
import schedulePoster from "@/assets/Schedule.jpg";
import schedulePoster1 from "@/assets/Schedule1.jpg";
import schedulePoster2 from "@/assets/Schedule2.png";
import mediaLogo from "@/assets/medialogo.png";
import mediaLogo1 from "@/assets/medialogo1.png";
import mediaLogo2 from "@/assets/medialogo2.png";
import mediaLogo3 from "@/assets/medialogo3.png";
import mediaAward1 from "@/assets/mediaAward1.png";
import mediaAward2 from "@/assets/mediaAward2.png";
import mediaAward3 from "@/assets/mediaAward3.png";
import mediaAward4 from "@/assets/mediaAward4.png";
import mediaAward5 from "@/assets/mediaAward5.png";
import bilibiliLogo from "@/assets/bilibili.png";
import xiaoyuzhouLogo from "@/assets/xiaoyuzhou.png";
import programLogoBilibili from "@/assets/programlogo_bilibili.png";
import programLogoDouyin from "@/assets/programlogo_douyin.png";
import programLogoTencent from "@/assets/programlogo_tengxun.png";
import programLogoYouku from "@/assets/programlogo_youku.png";
import programLogoXyz from "@/assets/Programlogo_xyz.png";
import businessLogo1 from "@/assets/Business1.png";
import businessLogo2 from "@/assets/Business2.png";
import businessLogo3 from "@/assets/Business3.png";
import businessLogo4 from "@/assets/Business4.png";
import businessLogo5 from "@/assets/Business5.png";
import businessLogo6 from "@/assets/Business6.png";
import businessLogo7 from "@/assets/Business7.png";
import businessLogo8 from "@/assets/Business8.png";
import businessLogo9 from "@/assets/Business9.png";
import businessLogo10 from "@/assets/Business10.png";
import businessLogo11 from "@/assets/Business11.png";
import businessLogo12 from "@/assets/Business12.png";
import podcastLogo1 from "@/assets/podcastlogo1.png";
import podcastLogo2 from "@/assets/podcastlogo2.png";
import podcastLogo3 from "@/assets/podcastlogo3.png";
import podcastLogo4 from "@/assets/podcastlogo4.png";
import podcastLogo5 from "@/assets/podcastlogo5.png";
import podcastLogo6 from "@/assets/podcastlogo6.png";
import specialImage1 from "@/assets/Special/封面 (1).jpg";
import specialImage2 from "@/assets/Special/封面 (2).jpg";
import specialImage3 from "@/assets/Special/播客封面.jpg";
import specialImage4 from "@/assets/Special/播客封面 (1).jpg";
import specialImage5 from "@/assets/Special/播客封面 (2).jpg";
import specialImage6 from "@/assets/Special/播客封面 (8).jpg";
import specialImage7 from "@/assets/Special/正片封面.jpg";

type CmsStaticAsset = string | { src: string };

function rawAssetSrc(asset: CmsStaticAsset) {
  return typeof asset === "string" ? asset : asset.src;
}

const cmsUploadedAssetMap = new Map<string, string>([
  [rawAssetSrc(aboutBackgroundImage), "/uploads/cms-pages/source/about2.png"],
  [rawAssetSrc(aboutBannerImage), "/uploads/cms-pages/source/about3.png"],
  [rawAssetSrc(aboutHeroImage), "/uploads/cms-pages/source/about.png"],
  [rawAssetSrc(aboutIcon1), "/uploads/cms-pages/source/abouticon1.png"],
  [rawAssetSrc(aboutIcon2), "/uploads/cms-pages/source/abouticon2.png"],
  [rawAssetSrc(aboutIcon3), "/uploads/cms-pages/source/abouticon3.png"],
  [rawAssetSrc(awardHeroImage), "/uploads/cms-pages/source/award.png"],
  [rawAssetSrc(awardsImage), "/uploads/cms-pages/source/awards.png"],
  [rawAssetSrc(contactHeroImage), "/uploads/cms-pages/source/contact.png"],
  [rawAssetSrc(contactLogo1), "/uploads/cms-pages/source/contactlogo1.png"],
  [rawAssetSrc(contactLogo2), "/uploads/cms-pages/source/contactlogo2.png"],
  [rawAssetSrc(contactLogo3), "/uploads/cms-pages/source/contactlogo3.png"],
  [rawAssetSrc(eventHeroImage), "/uploads/cms-pages/source/event.png"],
  [rawAssetSrc(mediaHeroImage), "/uploads/cms-pages/source/media.png"],
  [rawAssetSrc(podcastHeroImage), "/uploads/cms-pages/source/podcast.png"],
  [rawAssetSrc(thoughtMediaImage), "/uploads/cms-pages/source/Thought.png"],
  [rawAssetSrc(workLifeImage1), "/uploads/cms-pages/source/workandlife/0a575519339c4e1e8e30e16fcd10e29f.jpeg"],
  [rawAssetSrc(workLifeImage2), "/uploads/cms-pages/source/workandlife/136f1ff4d2484f1ab28b7ab27c5ecec8.jpeg"],
  [rawAssetSrc(workLifeImage3), "/uploads/cms-pages/source/workandlife/246a4c00fa854cdba2dc186950c9c823.jpeg"],
  [rawAssetSrc(workLifeImage4), "/uploads/cms-pages/source/workandlife/2ea5b4c13df74888a6cf6b6d411a56a7.jpeg"],
  [rawAssetSrc(workLifeImage5), "/uploads/cms-pages/source/workandlife/667abc64fe134af9a00caf7fe5f8de69.jpeg"],
  [rawAssetSrc(workLifeImage6), "/uploads/cms-pages/source/workandlife/6ea3b67a9cd6494cbfbac49518c90085.jpeg"],
  [rawAssetSrc(workLifeImage7), "/uploads/cms-pages/source/workandlife/eb680bb1cc504421bda802c5e9e349de.jpeg"],
  [rawAssetSrc(workLifeImage8), "/uploads/cms-pages/source/workandlife/ec95ebd35030dd8f0cdd9eb3811db0702f5aae82.png"],
  [rawAssetSrc(schedulePoster), "/uploads/cms-pages/source/Schedule.jpg"],
  [rawAssetSrc(schedulePoster1), "/uploads/cms-pages/source/Schedule1.jpg"],
  [rawAssetSrc(schedulePoster2), "/uploads/cms-pages/source/Schedule2.png"],
  [rawAssetSrc(eventDateImage1), "/uploads/cms-pages/source/eventDate1.png"],
  [rawAssetSrc(eventDateImage2), "/uploads/cms-pages/source/eventDate2.png"],
  [rawAssetSrc(eventDateImage3), "/uploads/cms-pages/source/eventDate3.png"],
  [rawAssetSrc(eventDateImage4), "/uploads/cms-pages/source/eventDate4.jpg"],
  [rawAssetSrc(eventDateImage5), "/uploads/cms-pages/source/eventdate/eventDate5.jpeg"],
  [rawAssetSrc(eventDateImage6), "/uploads/cms-pages/source/eventdate/event6.jpeg"],
  [rawAssetSrc(eventDateImage7), "/uploads/cms-pages/source/eventdate/event7.jpeg"],
  [rawAssetSrc(eventDateImage8), "/uploads/cms-pages/source/eventdate/event8.jpeg"],
  [rawAssetSrc(eventDateImage9), "/uploads/cms-pages/source/eventdate/event9.jpeg"],
  [rawAssetSrc(eventDateLogo1), "/uploads/cms-pages/source/eventdatelogo1.png"],
  [rawAssetSrc(eventDateLogo2), "/uploads/cms-pages/source/eventdatelogo2.png"],
  [rawAssetSrc(eventDateLogo3), "/uploads/cms-pages/source/eventdatelogo3.png"],
  [rawAssetSrc(eventDateLogo4), "/uploads/cms-pages/source/eventdatelogo4.png"],
  [rawAssetSrc(mediaLogo), "/uploads/cms-pages/source/medialogo.png"],
  [rawAssetSrc(mediaLogo1), "/uploads/cms-pages/source/medialogo1.png"],
  [rawAssetSrc(mediaLogo2), "/uploads/cms-pages/source/medialogo2.png"],
  [rawAssetSrc(mediaLogo3), "/uploads/cms-pages/source/medialogo3.png"],
  [rawAssetSrc(mediaAward1), "/uploads/cms-pages/source/mediaAward1.png"],
  [rawAssetSrc(mediaAward2), "/uploads/cms-pages/source/mediaAward2.png"],
  [rawAssetSrc(mediaAward3), "/uploads/cms-pages/source/mediaAward3.png"],
  [rawAssetSrc(mediaAward4), "/uploads/cms-pages/source/mediaAward4.png"],
  [rawAssetSrc(mediaAward5), "/uploads/cms-pages/source/mediaAward5.png"],
  [rawAssetSrc(bilibiliLogo), "/uploads/cms-pages/source/bilibili.png"],
  [rawAssetSrc(xiaoyuzhouLogo), "/uploads/cms-pages/source/xiaoyuzhou.png"],
  [rawAssetSrc(programLogoBilibili), "/uploads/cms-pages/source/programlogo_bilibili.png"],
  [rawAssetSrc(programLogoDouyin), "/uploads/cms-pages/source/programlogo_douyin.png"],
  [rawAssetSrc(programLogoTencent), "/uploads/cms-pages/source/programlogo_tengxun.png"],
  [rawAssetSrc(programLogoYouku), "/uploads/cms-pages/source/programlogo_youku.png"],
  [rawAssetSrc(programLogoXyz), "/uploads/cms-pages/source/Programlogo_xyz.png"],
  [rawAssetSrc(businessLogo1), "/uploads/cms-pages/source/Business1.png"],
  [rawAssetSrc(businessLogo2), "/uploads/cms-pages/source/Business2.png"],
  [rawAssetSrc(businessLogo3), "/uploads/cms-pages/source/Business3.png"],
  [rawAssetSrc(businessLogo4), "/uploads/cms-pages/source/Business4.png"],
  [rawAssetSrc(businessLogo5), "/uploads/cms-pages/source/Business5.png"],
  [rawAssetSrc(businessLogo6), "/uploads/cms-pages/source/Business6.png"],
  [rawAssetSrc(businessLogo7), "/uploads/cms-pages/source/Business7.png"],
  [rawAssetSrc(businessLogo8), "/uploads/cms-pages/source/Business8.png"],
  [rawAssetSrc(businessLogo9), "/uploads/cms-pages/source/Business9.png"],
  [rawAssetSrc(businessLogo10), "/uploads/cms-pages/source/Business10.png"],
  [rawAssetSrc(businessLogo11), "/uploads/cms-pages/source/Business11.png"],
  [rawAssetSrc(businessLogo12), "/uploads/cms-pages/source/Business12.png"],
  [rawAssetSrc(podcastLogo1), "/uploads/cms-pages/source/podcastlogo1.png"],
  [rawAssetSrc(podcastLogo2), "/uploads/cms-pages/source/podcastlogo2.png"],
  [rawAssetSrc(podcastLogo3), "/uploads/cms-pages/source/podcastlogo3.png"],
  [rawAssetSrc(podcastLogo4), "/uploads/cms-pages/source/podcastlogo4.png"],
  [rawAssetSrc(podcastLogo5), "/uploads/cms-pages/source/podcastlogo5.png"],
  [rawAssetSrc(podcastLogo6), "/uploads/cms-pages/source/podcastlogo6.png"],
  [rawAssetSrc(specialImage1), "/uploads/cms-pages/source/Special/封面 (1).jpg"],
  [rawAssetSrc(specialImage2), "/uploads/cms-pages/source/Special/封面 (2).jpg"],
  [rawAssetSrc(specialImage3), "/uploads/cms-pages/source/Special/播客封面.jpg"],
  [rawAssetSrc(specialImage4), "/uploads/cms-pages/source/Special/播客封面 (1).jpg"],
  [rawAssetSrc(specialImage5), "/uploads/cms-pages/source/Special/播客封面 (2).jpg"],
  [rawAssetSrc(specialImage6), "/uploads/cms-pages/source/Special/播客封面 (8).jpg"],
  [rawAssetSrc(specialImage7), "/uploads/cms-pages/source/Special/正片封面.jpg"],
]);

function assetSrc(asset: CmsStaticAsset) {
  const src = rawAssetSrc(asset);
  return cmsUploadedAssetMap.get(src) ?? src;
}

function publicAssetSrc(path: string) {
  return path.startsWith("/") ? path : `/${path}`;
}

function awardImageSrc(fileName: string) {
  return `/uploads/awards/source/${encodeURIComponent(fileName)}`;
}

export type CmsPageId = "home" | "about" | "awards" | "event" | "media" | "podcast" | "contact";

export type PageContentFieldKind = "text" | "textarea" | "image" | "url";

export interface PageContentField {
  id: string;
  label: string;
  kind: PageContentFieldKind;
  value: string;
}

export interface PageContentRepeaterItem {
  id: string;
  label: string;
  fields: PageContentField[];
}

export interface PageContentSection {
  id: string;
  label: string;
  fields: PageContentField[];
  items?: PageContentRepeaterItem[];
}

export interface PageContentPage {
  id: CmsPageId;
  label: string;
  route: string;
  component: string;
  sections: PageContentSection[];
}

export type PageContentLocale = Record<CmsPageId, PageContentPage>;

export interface PageContentState {
  zh: PageContentLocale;
  en: PageContentLocale;
  updatedAt: string;
}

function field(id: string, label: string, kind: PageContentFieldKind, value: string): PageContentField {
  return { id, label, kind, value };
}

export function isPastEventPlatformFieldId(fieldId: string) {
  return /^platform\d+(Name|Logo|Layout|Link\d+(Label|Href))$/.test(fieldId);
}

export function getPastEventPlatformNumber(fieldId: string) {
  const match = fieldId.match(/^platform(\d+)(Name|Logo|Layout|Link\d+(Label|Href))$/);
  return match ? Number(match[1]) : null;
}

export function getPastEventProgramNumber(fieldId: string, platformNumber: number) {
  const match = fieldId.match(new RegExp(`^platform${platformNumber}Link(\\d+)(Label|Href)$`));
  return match ? Number(match[1]) : null;
}

export function getPastEventPlatformNumbersFromFields(fields: PageContentField[]) {
  return Array.from(
    new Set(
      fields
        .map((fieldItem) => getPastEventPlatformNumber(fieldItem.id))
        .filter((value): value is number => value !== null),
    ),
  ).sort((a, b) => a - b);
}

export function getPastEventProgramNumbersFromFields(fields: PageContentField[], platformNumber: number) {
  return Array.from(
    new Set(
      fields
        .map((fieldItem) => getPastEventProgramNumber(fieldItem.id, platformNumber))
        .filter((value): value is number => value !== null),
    ),
  ).sort((a, b) => a - b);
}

export function createPastEventPlatformFields(platformNumber: number, language: Language) {
  const isZh = language === "zh";

  return [
    field(`platform${platformNumber}Name`, isZh ? `平台 ${platformNumber} 名称` : `Platform ${platformNumber} name`, "text", ""),
    field(`platform${platformNumber}Logo`, isZh ? `平台 ${platformNumber} Logo` : `Platform ${platformNumber} logo`, "image", ""),
    field(
      `platform${platformNumber}Layout`,
      isZh ? `平台 ${platformNumber} 布局(stack/row)` : `Platform ${platformNumber} layout (stack/row)`,
      "text",
      "stack",
    ),
    ...createPastEventProgramFields(platformNumber, 1, language),
  ];
}

export function createPastEventProgramFields(platformNumber: number, programNumber: number, language: Language) {
  const isZh = language === "zh";

  return [
    field(
      `platform${platformNumber}Link${programNumber}Label`,
      isZh
        ? `平台 ${platformNumber} 节目 ${programNumber} 标题`
        : `Platform ${platformNumber} program ${programNumber} title`,
      "textarea",
      "",
    ),
    field(
      `platform${platformNumber}Link${programNumber}Href`,
      isZh
        ? `平台 ${platformNumber} 节目 ${programNumber} 链接`
        : `Platform ${platformNumber} program ${programNumber} link`,
      "url",
      "",
    ),
  ];
}

function section(
  id: string,
  label: string,
  fields: PageContentField[],
  items?: PageContentRepeaterItem[],
): PageContentSection {
  return { id, label, fields, ...(items ? { items } : {}) };
}

function page(
  id: CmsPageId,
  label: string,
  route: string,
  component: string,
  sections: PageContentSection[],
): PageContentPage {
  return { id, label, route, component, sections };
}

const homeCmsAssets = {
  beyondImage: "/uploads/cms-home/beyond.png",
  course1Image: "/uploads/cms-home/course1.png",
  course2Image: "/uploads/cms-home/course2.png",
  portraitImage: "/uploads/cms-home/main.png",
  programImages: [
    publicAssetSrc("/uploads/cms-pages/source/program/program1.png"),
    publicAssetSrc("/uploads/cms-pages/source/program/program2.png"),
    publicAssetSrc("/uploads/cms-pages/source/program/program3.png"),
    publicAssetSrc("/uploads/cms-pages/source/program/program4.png"),
    publicAssetSrc("/uploads/cms-pages/source/program/program5.jpeg"),
    publicAssetSrc("/uploads/cms-pages/source/program/program6.jpeg"),
    publicAssetSrc("/uploads/cms-pages/source/program/program7.jpeg"),
    publicAssetSrc("/uploads/cms-pages/source/program/program8.jpeg"),
  ],
} as const;

const zhPages: PageContentLocale = {
  home: page("home", "首页", "/", "HomeLandingPage", [
    section("hero", "首屏", [
      field("titleLine1", "标题第一行", "text", "坚定捍卫所托，"),
      field("titleLine2", "标题第二行", "text", "深谙策略之道"),
      field("titleLine3", "标题第三行", "text", ""),
      field("name", "署名", "text", "虎诉"),
      field("portraitImage", "人物图片", "image", ""),
    ]),
    section("profile", "人物介绍", [
      field("title", "标题", "textarea", "亚太地区极具影响力的法律媒体意见领袖之一"),
      field(
        "body",
        "正文",
        "textarea",
        "虎诉作为虎诉律师事务所的创始人与管理合伙人，长期专注于千万美元级别的跨境商事争议与国际仲裁业务。\n六年来，他带领虎诉获得 Chambers、The Legal 500、ALB 等权威法律指南的认可；其本人亦入选 The Legal 500 China Elite 和《商法》A-List 等榜单。\n此外，他还主持极具影响力的专业观察 Tiger Partners Insights，吸引上百万专业人士关注。",
      ),
      field("ctaLabel", "按钮文字", "text", "了解更多"),
      field("ctaHref", "按钮链接", "url", "/about"),
    ]),
    section("beyond", "始于法律", [
      field("title", "标题", "text", "始于法律，不止于法律"),
      field("image", "配图", "image", ""),
      field(
        "body",
        "正文",
        "textarea",
        "依托法律领域的深厚积淀与专业公信力，虎诉将专业智慧延伸至大众视野，成为全网超70万粉丝的人气法律UP主。",
      ),
    ]),
    section("program", "节目代表", [
      field("title", "标题", "text", "代表性节目"),
      field(
        "description",
        "描述",
        "textarea",
        "他以自信幽默、真诚犀利的风格，把专业法律知识与实用职场经验，转化为通俗易懂、极具启发的优质内容，深受观众喜爱与认可。",
      ),
    ]),
    section("courses", "课程", [
      field("title", "标题", "text", "虎诉现已推出两部课程："),
      field(
        "course1",
        "课程一",
        "textarea",
        "一是结合十余年红圈所执业与创业经历，分享真实律师生涯的《胜诉之道 · 争议解决律师必修课》；",
      ),
      field(
        "course2",
        "课程二",
        "textarea",
        "二是基于个人成长经历，为年轻人打造的实操型人生指南《“争议解决”的人生成长指南》。",
      ),
    ]),
  ]),
  about: page("about", "品牌故事", "/about", "AboutLandingPage", [
    section("hero", "首屏", [
      field("eyebrow", "首屏 / 顶部标签", "text", "ABOUT"),
      field("name", "首屏 / 人物姓名", "text", "Tiger Partners"),
      field("quoteLine1", "首屏 / 引言第一行", "text", "THE ADOLESCENT \"Dispute Resolution\" SPIRIT TAUGHT ME TO FACE LIFE'S"),
      field("quoteLine2", "首屏 / 引言第二行", "text", "COMMERCIAL DISPUTES."),
      field("role", "首屏 / 职务", "text", "Founding & Managing Partner"),
      field("firm", "首屏 / 律所", "text", "Tiger Partners"),
      field("portraitImage", "人物图片", "image", ""),
    ]),
    section("intro", "首屏下方正文", [
      field(
        "body",
        "正文",
        "textarea",
        "虎诉（Tiger Partners）系虎诉律师事务所的创始合伙人兼管理合伙人。该所为一家总部位于北京的精品律师事务所，专注于重大商事争议解决业务。自2019年创立以来，虎诉团队已将虎诉打造为亚太地区最具知名度的争议解决律所之一。尽管事务所始终坚持精简规模的发展理念，仍已斩获本地区几乎所有主要法律奖项。",
      ),
    ]),
    section("professional", "职业背景", [
      field("title", "标题", "text", "职业背景"),
      field("bannerImage", "上方背景图片", "image", assetSrc(aboutBannerImage)),
      field("backgroundImage", "下方背景图片", "image", assetSrc(aboutBackgroundImage)),
      field(
        "paragraph1",
        "正文第一段",
        "textarea",
        "虎诉（Tiger Partners）于2009年从亚洲顶尖法学院之一的北京大学法学院毕业后，正式开启律师职业生涯。在随后的十年间，他先后在中伦律师事务所、金杜律师事务所、方达律师事务所、竞天公诚律师事务所这四家中国顶尖“红圈所”深耕历练，凭借坚韧的办案风格、富有策略性的创新思路，以及远超自身资历、主动承担复杂案件的突出态度，迅速树立专业口碑。2018年，他晋升为竞天公诚律师事务所合伙人。",
      ),
      field("paragraph2", "正文第二段", "textarea", "彼时，他并未安于成熟律所的合伙人席位，而是做出大胆选择：2019年，他联合创立了虎诉律师事务所，致力于打造一家团队精简、业务专注、勇于突破传统的现代化争议解决精品律所。"),
      field("paragraph3", "正文第三段", "textarea", "与此同时，虎诉亦持续投入学术与专业进阶。2026年，他正在哥伦比亚大学法学院攻读 Executive LL.M. 学位。"),
    ]),
    section("firm", "虎诉律师事务所", [
      field("title", "标题", "text", "虎诉律师事务所"),
      field("logo", "Logo", "image", publicAssetSrc("/uploads/home/1778001310228-hu.svg")),
      field(
        "intro",
        "律所介绍",
        "textarea",
        "虎诉律师事务所秉持一项朴素信念：一支由顶尖律师组成的精悍团队，摆脱大型律所的繁冗流程，能够在最复杂的商事争议中实现更优的办案效果。该所专注办理跨境诉讼、股权纠纷、投资仲裁、保险理赔争议等涉企业核心利益的案件，常处理标的额超数千万美元的法律事务。",
      ),
      field("recognitionLead", "认可引导语", "textarea", "成立仅六年多，该所便获得覆盖亚太市场的几乎所有主流法律评级机构与权威法律媒体的认可。"),
      field("recognitionTitle", "核心荣誉标题", "text", "核心荣誉："),
      field("ctaLabel", "按钮文字", "text", "visit Tiger Partners"),
      field("ctaHref", "站内/外链接", "url", "https://www.tigerpartners.cn"),
    ], aboutFirmRecognitionItems("zh")),
    section("representativeWork", "代表业绩", [
      field("title", "标题", "text", "代表业绩"),
      field("body", "正文", "textarea", "虎诉擅长于承办具有开创性意义的案件。他曾代理一家前纳斯达克上市公司处理中国首例获得终局仲裁裁决的董监高责任保险纠纷，最终通过覆盖中国大陆、中国香港及美国的多层保险赔付机制，成功追回超2000万美元保险赔偿金。他曾为多家国际顶尖会计师事务所提供辩护，应对由大型国有银行提起、标的额超5000万美元的重大侵权纠纷案件。同时，他在北京仲裁委员会、上海国际仲裁中心及中华人民共和国最高人民法院代理的多起复杂投资仲裁、股权争议、房地产案件均取得胜诉结果。"),
      field("highlight", "重点说明", "textarea", "其里程碑式业绩之一，是成功推动最高人民法院在一起案件中撤销一审及二审判决。该案首次在司法实践中确认业主委员会的民事诉讼主体资格，现已被收录入人民法院案例库，成为该领域指导性案例。"),
    ]),
    section("individualRecognition", "个人荣誉", [
      field("title", "标题", "text", "个人荣誉"),
      field("subtitle", "副标题", "textarea", "虎诉在法律行业屡获殊荣："),
      field("image", "荣誉图片", "image", assetSrc(awardsImage)),
      field("ctaLabel", "按钮文字", "text", "View Awards"),
      field("ctaHref", "站内链接", "url", "/awards"),
    ], aboutIndividualRecognitionItems("zh")),
    section("thoughtLeadership", "思想领导力与媒体", [
      field("title", "标题", "text", "Thought Leadership & Media"),
      field("body", "正文", "textarea", "除律师执业外，虎诉亦持续推动法律知识的公众传播。他主持的《Tiger Partners Insights》聚焦法律实务、行业趋势与职业成长，连接法律专业人士与更广泛的商业受众。"),
      field("highlight", "重点说明", "textarea", "该节目及其跨平台内容进一步扩大了其在法律行业与公众领域的影响力。"),
      field("image", "配图", "image", assetSrc(thoughtMediaImage)),
    ], aboutThoughtMediaItems("zh")),
    section("industryEngagement", "行业参与", [
      field("title", "标题", "text", "行业参与"),
      field("body", "正文", "textarea", "虎诉积极参与亚太地区仲裁实践的发展，长期关注争议解决机制的专业建设。"),
      field("secondary", "补充正文", "textarea", "虎诉律师事务所亦曾支持香港国际仲裁中心、中国国际经济贸易仲裁委员会、北京仲裁委员会等机构组织的重要仲裁活动。"),
    ]),
    section("beyondTheLaw", "业余生活", [
      field("title", "标题", "text", "业余生活"),
      field("body", "正文", "textarea", "工作之外，虎诉同样保持着积极进取的生活态度。自大学时期起便是资深游戏爱好者，曾担任北京大学《魔兽争霸3》战队队长，至今仍活跃于各大游戏平台，尤其钟爱《守望先锋》。他同时也是一名篮球爱好者，曾代表金杜律师事务所、方达律师事务所参与所内赛事，最喜爱的篮球运动员是勒布朗·詹姆斯。"),
    ]),
    section("workLife", "Work & Life 轮播", [
      field("title", "标题", "text", "Work & Life"),
    ], aboutWorkLifeItems("zh")),
  ]),
  awards: page("awards", "奖项", "/awards", "AwardsLandingPage", [
    section("hero", "首屏", [
      field("primary", "主标题第一段", "text", "荣誉与"),
      field("secondary", "主标题第二段", "text", "成就"),
      field("heroImage", "首屏图片", "image", ""),
    ]),
    section("intro", "页面介绍", [
      field("body", "正文", "textarea", "作为律师、法律内容创作者及虎诉律师事务所的创始及管理合伙人，虎诉在多个领域持续获得广泛认可。其个人荣誉、律所在权威法律评级中的优异表现，以及《Tiger Partners Insights》不断扩大的影响力，共同印证了一段以卓越、创新和重塑争议解决为使命的职业生涯。"),
    ]),
    section("individualAwards", "律师个人奖项", [
      field("title", "标题", "text", "律师个人奖项"),
      field("subtitle", "副标题", "textarea", "以精研法律的专业能力、客户至上的执业理念以及卓越的争议解决成就，铸就职业生涯。"),
    ], awardsIndividualItems("zh")),
    section("lawFirmAwards", "律所奖项", [
      field("title", "标题", "text", "律所奖项"),
      field("subtitle", "副标题", "textarea", "展现虎诉律师事务所在业内树立的卓越声望与领先实力"),
    ], awardsLawFirmItems("zh")),
    section("socialAwards", "新媒体奖项", [
      field("title", "标题", "text", "新媒体奖项"),
      field("subtitle", "副标题", "textarea", "展现数字传播中的广泛共鸣、深度连接以及卓越创意表达"),
    ], awardsSocialItems("zh")),
  ]),
  event: page("event", "活动", "/event", "EventLandingPage", [
    section("hero", "首屏", [
      field("titleLine1", "标题第一行", "text", "活动纪事"),
      field("titleLine2", "标题第二行", "text", ""),
      field("signature", "署名", "text", ""),
      field("heroImage", "首屏图片", "image", ""),
    ]),
    section("schedule", "日程轮播", [
      field("title", "标题", "text", "日程轮播"),
      field("description", "描述", "textarea", "近期活动安排与重要日程"),
    ], eventScheduleItems("zh")),
    section("pastEvents", "过往活动", [
      field("title", "标题", "text", "过往活动"),
      field("description", "描述", "textarea", "过往活动回顾及精彩瞬间"),
    ], eventPastItems("zh")),
  ]),
  media: page("media", "媒体", "/media", "PodcastLandingPage", [
    section("hero", "首屏", [
      field("titleLine1", "标题第一行", "text", "社交媒体"),
      field("titleLine2", "标题第二行", "text", ""),
      field("heroImage", "首屏图片", "image", ""),
    ]),
    section("intro", "介绍", [
      field(
        "body",
        "正文",
        "textarea",
        "凭借多年深耕法律行业所积累的深厚经验，虎诉以扎实的专业能力和突出的行业声誉，从专业领域延展至公众内容平台，成为广受网友欢迎的知识型内容创作者。",
      ),
    ]),
    section("stats", "数据统计", [
      field("title", "标题", "textarea", "多平台法律内容影响力"),
      field("body", "正文", "textarea", "通过持续输出高质量法律内容，虎诉在多个社交媒体平台积累了广泛关注。"),
    ], mediaStatItems("zh")),
    section("appearances", "节目露出", [
      field("title", "标题", "text", "Program Appearances"),
      field("subtitle", "副标题", "textarea", "跨平台节目、播客与访谈露出内容"),
    ], mediaAppearanceItems("zh")),
    section("influence", "影响力", [
      field("title", "标题", "text", "影响力矩阵"),
      field("body", "正文", "textarea", "法律专业内容与公众传播相互连接，形成跨平台影响力。"),
    ]),
    section("cooperation", "商务合作", [
      field("title", "标题", "text", "Business Cooperation"),
    ], mediaBusinessCooperationItems("zh")),
  ]),
  podcast: page("podcast", "播客", "/podcast", "MediaLandingPage", [
    section("hero", "首屏", [
      field("titleLine1", "标题第一行", "text", "Tiger Partners Insights"),
      field("titleLine2", "标题第二行", "text", ""),
      field("heroImage", "首屏图片", "image", ""),
    ]),
    section("intro", "介绍", [
      field(
        "body",
        "正文第一段",
        "textarea",
        "《Tiger Partners Insights》是一档面向亚太地区华语高端法律人才打造的专业观察节目，由虎诉（@虎诉）主持。节目围绕兼具时效性、话题性与专业深度的法律议题展开，邀请法律实务人士、学者及跨界嘉宾参与对谈。",
      ),
      field("body2", "正文第二段", "textarea", "作为国内首档法律垂类专业观察，《Tiger Partners Insights》已在这一新兴赛道中建立起鲜明影响力。节目致力于为法律、金融、合规等领域专业人士提供高质量的思想交流平台，目前在B站拥有超过30,000名付费订阅用户，在小宇宙拥有超过40,000名订阅用户。"),
      field("videoSrc", "介绍视频", "url", "/assets/video/video.mp4"),
    ]),
    section("platforms", "平台链接", [], podcastPlatformItems("zh")),
    section("special", "Special Edition", [
      field("title", "标题", "text", "Special Edition"),
      field("body", "正文", "textarea", "特别节目以更深入的访谈形式展开，聚焦法律职业、商业世界与跨界经验。"),
    ], podcastSpecialItems("zh")),
  ]),
  contact: page("contact", "联系方式", "/contact", "ContactLandingPage", [
    section("hero", "首屏", [
      field("titleLine1", "标题第一行", "text", "联系我们"),
      field("titleLine2", "标题第二行", "text", ""),
      field("heroImage", "首屏图片", "image", ""),
    ]),
    section("details", "联系信息", [
      field("sectionTitle", "关注标题", "text", "欢迎关注与联系"),
      field("sectionSubtitle", "联系标题", "text", "联系我们"),
      field("cityImage", "城市图片", "image", ""),
      field("address", "地址", "textarea", "中国北京市朝阳区东四环中路56号远洋国际中心A座2501"),
      field("phone", "电话", "text", "010-8588 5228"),
      field("email", "邮箱", "text", "liu.yuxuan@tigerpartners.cn"),
    ], contactFollowItems("zh")),
  ]),
};

const enPages: PageContentLocale = {
  home: page("home", "Home", "/", "HomeLandingPage", [
    section("hero", "Hero", [
      field("titleLine1", "Title line 1", "text", "RELENTLESS IN"),
      field("titleLine2", "Title line 2", "text", "ADVOCACY. STRATEGIC"),
      field("titleLine3", "Title line 3", "text", "BY DESIGN."),
      field("name", "Signature", "text", "Tiger Partners"),
      field("portraitImage", "Portrait image", "image", ""),
    ]),
    section("profile", "Profile", [
      field("title", "Title", "textarea", "One of the most influential commercial dispute resolution lawyers in Asia."),
      field(
        "body",
        "Body",
        "textarea",
        "Tiger Partners, Founding & Managing Partner of Tiger Partners, specializes in cross-border disputes and international arbitration involving tens of millions of USD.\nWithin six years, he earned firm recognition from Chambers, Legal 500 & ALB, and personal spots on Legal 500 China Elite and CBLJA-List.\nHe also hosts the podcast Tiger Partners Insights, reaching a professional audience of over one million.",
      ),
      field("ctaLabel", "CTA label", "text", "More about Tiger Partners"),
      field("ctaHref", "CTA link", "url", "/about"),
    ]),
    section("beyond", "From Law, And Beyond", [
      field("title", "Title", "text", "FROM LAW, AND BEYOND"),
      field("image", "Image", "image", ""),
      field(
        "body",
        "Body",
        "textarea",
        "Leveraging his profound legal expertise and professional credibility, Lawyer Tiger Partners has extended his professional insights to the general public and become a popular legal content creator with over 700,000 followers across online platforms.",
      ),
    ]),
    section("program", "Program", [
      field("title", "Title", "text", "PROGRAM REPRESENTATIVE"),
      field(
        "description",
        "Description",
        "textarea",
        "With a confident, humorous, sincere and incisive style, he transforms specialized legal knowledge and practical workplace experience into accessible, inspiring and high-quality content, earning wide affection and recognition from his audience.",
      ),
    ]),
    section("courses", "Courses", [
      field("title", "Title", "text", "TIGER PARTNERS HAS CURRENTLY LAUNCHED TWO COURSES:"),
      field(
        "course1",
        "Course 1",
        "textarea",
        "One is The Way to Win Cases: A Required Course for Dispute Resolution Lawyers, which draws on his more than ten years of practice at leading law firms and entrepreneurial experience to share a real-life lawyer's career.",
      ),
      field(
        "course2",
        "Course 2",
        "textarea",
        "The other is A Real-World Guide to Personal Growth, a practical life guide tailored for young people based on his personal growth journey.",
      ),
    ]),
  ]),
  about: page("about", "Brand Story", "/about", "AboutLandingPage", [
    section("hero", "Hero", [
      field("eyebrow", "Hero / eyebrow", "text", "ABOUT"),
      field("name", "Hero / name", "text", "TIGER PARTNERS"),
      field("quoteLine1", "Hero / quote line 1", "text", "THE ADOLESCENT \"Dispute Resolution\" SPIRIT TAUGHT ME TO FACE LIFE'S"),
      field("quoteLine2", "Hero / quote line 2", "text", "COMMERCIAL DISPUTES."),
      field("role", "Hero / role", "text", "FOUNDING & MANAGING PARTNER"),
      field("firm", "Hero / firm", "text", "TIGER PARTNERS"),
      field("portraitImage", "Portrait image", "image", ""),
    ]),
    section("intro", "Intro below hero", [
      field(
        "body",
        "Body",
        "textarea",
        "Tiger Partners is the Founding and Managing Partner of Tiger Partners, a Beijing-based boutique law firm specializing in high-stakes commercial dispute resolution. Since establishing the firm in 2019, he has built it into one of the most recognized dispute resolution practices in the Asia-Pacific region - a firm that, despite its deliberately lean size, has earned virtually every major legal accolade the region has to offer.",
      ),
    ]),
    section("professional", "Professional Background", [
      field("title", "Title", "text", "PROFESSIONAL BACKGROUND"),
      field("bannerImage", "Top background image", "image", assetSrc(aboutBannerImage)),
      field("backgroundImage", "Bottom background image", "image", assetSrc(aboutBackgroundImage)),
      field(
        "paragraph1",
        "Paragraph 1",
        "textarea",
        "Tiger Partners began his legal career in 2009 after graduating from Peking University Law School, one of the top law schools in Asia. Over the following decade, he honed his craft at four of China's most prestigious \"Red Circle\" law firms - Zhong Lun Law Firm, King & Wood Mallesons, Fangda Partners, and Jingtian & Gongcheng - where he quickly earned a reputation for tenacity, strategic creativity, and an unusual willingness to take ownership of complex matters far beyond his seniority. By 2018, he had made partner at Jingtian & Gongcheng.",
      ),
      field("paragraph2", "Paragraph 2", "textarea", "Then, rather than settling into the comfort of partnership at an established firm, he made a bold move: in 2019, he co-founded Tiger Partners to pursue a vision of what a modern dispute resolution practice could be - lean, focused, and unafraid to challenge convention."),
      field("paragraph3", "Paragraph 3", "textarea", "At the same time, Tiger Partners has continued to invest in his academic and professional development. As of 2026, he is pursuing an Executive LL.M. degree at Columbia Law School."),
    ]),
    section("firm", "Tiger Partners", [
      field("title", "Title", "text", "TIGER PARTNERS"),
      field("logo", "Logo", "image", publicAssetSrc("/uploads/home/1778001310228-hu.svg")),
      field(
        "intro",
        "Firm intro",
        "textarea",
        "Tiger Partners is built on a simple belief: a lean team of top-tier lawyers, unburdened by the layers and bureaucracy of large firms, can deliver superior results in the most complex commercial disputes. The firm takes on bet-the-company cases involving cross-border litigation, shareholder disputes, investment arbitration, and insurance coverage battles, regularly handling matters with claims exceeding tens of millions of US dollars.",
      ),
      field("recognitionLead", "Recognition lead", "textarea", "In just over six years, the firm has been recognized by virtually every major legal directory and publication covering the Asia-Pacific market."),
      field("recognitionTitle", "Core recognition title", "text", "CORE RECOGNITION"),
      field("ctaLabel", "CTA label", "text", "VISIT TIGER PARTNERS"),
      field("ctaHref", "Internal/external link", "url", "https://www.tigerpartners.cn"),
    ], aboutFirmRecognitionItems("en")),
    section("representativeWork", "Representative Work", [
      field("title", "Title", "text", "REPRESENTATIVE WORK"),
      field("body", "Body", "textarea", "Tiger Partners's practice is defined by cases that break new ground. He represented a formerly NASDAQ-listed company in what became the first Directors & Officers liability insurance dispute in China to result in a definitive arbitral award, ultimately securing over USD 20 million in insurance recovery across multiple coverage layers spanning Mainland China, Hong Kong, and the United States. He has defended leading international accounting firms in high-profile tort disputes brought by major state-owned banks with claims exceeding USD 50 million. He has won complex investment arbitrations, shareholder disputes, and real estate cases at the Beijing Arbitration Commission, the Shanghai International Arbitration Center, and the Supreme People's Court of China."),
      field("highlight", "Highlight", "textarea", "One of his landmark achievements was persuading the Supreme People's Court to overturn both the first-instance and second-instance judgments in a case that, for the first time, recognized the civil litigation standing of a homeowners' committee - a decision now included in the People's Court Case Database as a leading case in its field."),
    ]),
    section("individualRecognition", "Individual Recognition", [
      field("title", "Title", "text", "INDIVIDUAL RECOGNITION"),
      field("subtitle", "Subtitle", "textarea", "Tiger Partners has been individually recognized across the legal industry:"),
      field("image", "Recognition image", "image", assetSrc(awardsImage)),
      field("ctaLabel", "Button label", "text", "VIEW AWARDS"),
      field("ctaHref", "Internal link", "url", "/awards"),
    ], aboutIndividualRecognitionItems("en")),
    section("thoughtLeadership", "Thought Leadership & Media", [
      field("title", "Title", "text", "THOUGHT LEADERSHIP & MEDIA"),
      field("body", "Body", "textarea", "Beyond the courtroom, Tiger Partners is one of the most influential legal media voices in the Asia-Pacific region. He is the creator and host of Tiger Partners Insights, a video podcast that has grown into one of the most prominent legal content programs in China. The show is among Bilibili's key supported video podcasts, with over 320,000 followers and 32,000 monthly paid subscribers on that platform alone. The audio version of the Tiger Partners Insights has attracted 42,000 followers on Xiaoyuzhou (a leading Chinese podcast platform), while its short-form video adaptations have gained 150,000 followers on Douyin (the Chinese version of TikTok). Each episode achieves 100,000 to 500,000 impressions across platforms, reaching a highly targeted audience of senior professionals in the legal, financial, and technology sectors across major Asia-Pacific cities."),
      field("highlight", "Highlight", "textarea", "His media work has earned recognition not only for its reach but for its substance. As one senior partner at a leading international law firm has observed: \"Tiger Partners has a unique talent in spotting what topics would be 'trendy' and the ways of most succinctly and effectively broadcasting them... He shed a precious light on the legal profession for law students, young lawyers, and business personnel curious about the law.\""),
      field("image", "Image", "image", assetSrc(thoughtMediaImage)),
    ], aboutThoughtMediaItems("en")),
    section("industryEngagement", "Industry Engagement", [
      field("title", "Title", "text", "INDUSTRY ENGAGEMENT"),
      field("body", "Body", "textarea", "Tiger Partners is actively involved in the development of arbitration practice in the Asia-Pacific. He serves as a Member of the Commercial Arbitration Law Professional Committee of the Beijing Lawyers Association and as Deputy Director of the Arbitration and Mediation Business Research Association of the Beijing Chaoyang District Lawyers Association. Tiger Partners has sponsored major arbitration events organized by institutions including the Hong Kong International Arbitration Centre, the China International Economic and Trade Arbitration Commission (CIETAC), and the Beijing Arbitration Commission."),
      field("secondary", "Secondary body", "textarea", "His published work includes the 2025 Chambers Global Practice Guide on China Dispute Resolution, and his writing has been included in a criminal law textbook authored by Professor Xingliang Chen of Peking University, based on the professor's nationally recognized course."),
    ]),
    section("beyondTheLaw", "Beyond the Law", [
      field("title", "Title", "text", "BEYOND THE LAW"),
      field("body", "Body", "textarea", "Tiger Partners brings the same competitive drive to life outside the office. An avid gamer since his university days - when he captained the Peking University Warcraft III team - he remains a dedicated player across platforms, with a particular fondness for Overwatch. He is also a lifelong basketball player who has represented both King & Wood and Fangda Partners in firm-wide tournaments, with LeBron James as his all-time favorite player."),
    ]),
    section("workLife", "Work & Life Carousel", [
      field("title", "Title", "text", "WORK & LIFE"),
    ], aboutWorkLifeItems("en")),
  ]),
  awards: page("awards", "Awards", "/awards", "AwardsLandingPage", [
    section("hero", "Hero", [
      field("primary", "Primary title", "text", "AWARDS AND"),
      field("secondary", "Secondary title", "text", "ACHIEVEMENTS"),
      field("heroImage", "Hero image", "image", ""),
    ]),
    section("intro", "Intro", [
      field("body", "Body", "textarea", "Tiger Partners has earned recognition as a lawyer, a legal media creator, and the founding and managing partner of Tiger Partners. His individual honors, the firm's directory rankings in leading legal directories, and the growing influence of Tiger Partners Insights each testify to a career defined by excellence, innovation, and an unwavering commitment to redefining dispute resolution."),
    ]),
    section("individualAwards", "Individual Lawyer Awards", [
      field("title", "Title", "text", "INDIVIDUAL LAWYER AWARDS"),
      field("subtitle", "Subtitle", "textarea", "Celebrating a career defined by legal mastery, client-first advocacy, and excellence in dispute resolution"),
    ], awardsIndividualItems("en")),
    section("lawFirmAwards", "Law Firm Awards", [
      field("title", "Title", "text", "LAW FIRM AWARDS"),
      field("subtitle", "Subtitle", "textarea", "Honoring the collective prestige and market-leading excellence of Tiger Partners I founded and lead"),
    ], awardsLawFirmItems("en")),
    section("socialAwards", "Social Media Awards", [
      field("title", "Title", "text", "SOCIAL MEDIA AWARDS"),
      field("subtitle", "Subtitle", "textarea", "Honoring digital resonance, meaningful connection, and exceptional creative expression"),
    ], awardsSocialItems("en")),
  ]),
  event: page("event", "Event", "/event", "EventLandingPage", [
    section("hero", "Hero", [
      field("titleLine1", "Title line 1", "text", "EVENT"),
      field("titleLine2", "Title line 2", "text", "CHRONICLE"),
      field("signature", "Signature", "text", ""),
      field("heroImage", "Hero image", "image", ""),
    ]),
    section("schedule", "Schedule Carousel", [
      field("title", "Title", "text", "SCHEDULE CAROUSEL"),
      field("description", "Description", "textarea", "Upcoming event schedules and important dates"),
    ], eventScheduleItems("en")),
    section("pastEvents", "Past Events", [
      field("title", "Title", "text", "PAST EVENTS"),
      field("description", "Description", "textarea", "Past event recaps and highlight moments"),
    ], eventPastItems("en")),
  ]),
  media: page("media", "Media", "/media", "PodcastLandingPage", [
    section("hero", "Hero", [
      field("titleLine1", "Title line 1", "text", "SOCIAL MEDIA"),
      field("titleLine2", "Title line 2", "text", ""),
      field("heroImage", "Hero image", "image", ""),
    ]),
    section("intro", "Intro", [
      field(
        "body",
        "Body",
        "textarea",
        "With years of deep experience in the legal industry, Lawyer Tiger Partners has leveraged his solid professional expertise and strong industry reputation to expand from the professional field to public content platforms, becoming a highly popular knowledge creator among netizens.",
      ),
    ]),
    section("stats", "Stats", [
      field("title", "Title", "textarea", "HIS CORE FOLLOWER COUNT ACROSS MAJOR PLATFORMS STANDS AT THE FOLLOWING:"),
      field("body", "Body", "textarea", "With a sharp, insightful yet humorous and sincere style, he transforms specialized legal knowledge and workplace experience into down-to-earth, in-depth content. By continuously delivering diverse perspectives on personal growth, he has earned wide recognition and support from his audience."),
    ], mediaStatItems("en")),
    section("appearances", "Program Appearances", [
      field("title", "Title", "text", "PROGRAM APPEARANCES"),
      field("subtitle", "Subtitle", "textarea", "record of my program and podcast appearances to date"),
    ], mediaAppearanceItems("en")),
    section("influence", "Influence", [
      field("title", "Title", "text", "Build a top legal influencer and multi-platform video podcaster, forming an influence matrix across legal and lifestyle fields."),
      field("body", "Body", "textarea", "Garner recognition from mainstream platforms and media, achieve cross-industry influence through workplace variety shows, university lectures and alumni sharing, integrating legal expertise with public communication."),
    ]),
    section("cooperation", "Business Cooperation", [
      field("title", "Title", "text", "BUSINESS COOPERATION"),
    ], mediaBusinessCooperationItems("en")),
  ]),
  podcast: page("podcast", "Podcast", "/podcast", "MediaLandingPage", [
    section("hero", "Hero", [
      field("titleLine1", "Title line 1", "text", "Tiger Partners Insights"),
      field("titleLine2", "Title line 2", "text", ""),
      field("heroImage", "Hero image", "image", ""),
    ]),
    section("intro", "Intro", [
      field(
        "body",
        "Body paragraph 1",
        "textarea",
        "Tiger Partners Insights is a video podcast designed for high-level Chinese-speaking legal professionals across the Asia-Pacific region. Hosted by Tiger Partners (@虎诉), Tiger Partners Insights explores timely, engaging, and intellectually rigorous legal topics through conversations with leading practitioners, scholars, and cross-disciplinary guests.",
      ),
      field("body2", "Body paragraph 2", "textarea", "As China’s first legal-focused video podcast, Tiger Partners Insights has built a strong presence in this emerging niche. It serves as a platform for idea exchange across law, finance, and compliance, with over 30,000 paid subscribers on Bilibili and more than 40,000 followers on Xiaoyuzhou."),
      field("videoSrc", "Intro video", "url", "/assets/video/video.mp4"),
    ]),
    section("platforms", "Platform Links", [], podcastPlatformItems("en")),
    section("special", "Special Edition", [
      field("title", "Title", "text", "SPECIAL EDITION"),
      field("body", "Body", "textarea", "Special Edition is a bonus segment launched by Tiger Partners Insights, focusing on real-time trending topics across the internet and responding to current issues in a more vivid and in-depth manner. Published on an irregular basis, the segment has gained broad attention and positive recognition since its launch. Topics covered to date include the Wahaha family inheritance dispute, controversies surrounding Yu Shuxin’s family and alleged links to state-owned assets, new regulations on criminal record sealing, cultural interpretations of artifacts from the Nanjing Museum, the Epstein case, the U.S.–Israel–Iran geopolitical tensions, and science-based guidance on exercise for knowledge workers."),
    ], podcastSpecialItems("en")),
  ]),
  contact: page("contact", "Contact", "/contact", "ContactLandingPage", [
    section("hero", "Hero", [
      field("titleLine1", "Title line 1", "text", "CONTACT US"),
      field("titleLine2", "Title line 2", "text", ""),
      field("heroImage", "Hero image", "image", ""),
    ]),
    section("details", "Contact Details", [
      field("sectionTitle", "Follow title", "text", "FOLLOW & CONNECT"),
      field("sectionSubtitle", "Contact title", "text", "CONTACT US"),
      field("cityImage", "City image", "image", ""),
      field(
        "address",
        "Address",
        "textarea",
        "Suite 01, 25F, Tower A, Sino-Ocean International Center, 56 East 4th Ring Middle Road, Chaoyang District, Beijing 100025, China",
      ),
      field("phone", "Phone", "text", "010-8588 5228"),
      field("email", "Email", "text", "liu.yuxuan@tigerpartners.cn"),
    ], contactFollowItems("en")),
  ]),
};

function pageContentFieldExists(fields: PageContentField[], id: string) {
  return fields.some((fieldItem) => fieldItem.id === id);
}

function withExtraFields(fields: PageContentField[], extras: PageContentField[], removeLegacyTitle = false) {
  return [
    ...fields.filter((fieldItem) => !removeLegacyTitle || fieldItem.id !== "title"),
    ...extras.filter((extraField) => !pageContentFieldExists(fields, extraField.id)),
  ];
}

function withFieldDefaults(fields: PageContentField[], defaults: Record<string, string>) {
  return fields.map((fieldItem) => ({
    ...fieldItem,
    value: fieldItem.value || defaults[fieldItem.id] || fieldItem.value,
  }));
}

function repeaterItem(id: string, label: string, fields: PageContentField[]): PageContentRepeaterItem {
  return { id, label, fields };
}

function aboutFirmRecognitionItems(language: Language) {
  const isZh = language === "zh";

  return [
    repeaterItem("chambers", isZh ? "核心荣誉 1" : "Core recognition 1", [
      field("title", isZh ? "荣誉标题" : "Recognition title", "text", isZh ? "钱伯斯（Chambers and Partners）：" : "Chambers and Partners:"),
      field(
        "description",
        isZh ? "荣誉说明" : "Recognition description",
        "textarea",
        isZh
          ? "荣登《钱伯斯全球指南2025》《钱伯斯全球指南2026》《钱伯斯大中华区指南2025》《钱伯斯大中华区指南2026》，均入选争议解决（中资律师事务所）榜单"
          : "Ranked in the Global Guide (2025, 2026) and the Greater China Region Guide (2025, 2026) for Dispute Resolution",
      ),
    ]),
    repeaterItem("legal-500", isZh ? "核心荣誉 2" : "Core recognition 2", [
      field("title", isZh ? "荣誉标题" : "Recognition title", "text", "The Legal 500:"),
      field(
        "description",
        isZh ? "荣誉说明" : "Recognition description",
        "textarea",
        isZh
          ? "入选 Legal 500 2026 中国区榜单争议解决：仲裁 - 中国律所、争议解决：诉讼 - 中国律所"
          : "Listed in Dispute Resolution - Arbitration and Litigation (China, 2026)",
      ),
    ]),
    repeaterItem("benchmark-litigation", isZh ? "核心荣誉 3" : "Core recognition 3", [
      field("title", isZh ? "荣誉标题" : "Recognition title", "text", "Benchmark Litigation:"),
      field(
        "description",
        isZh ? "荣誉说明" : "Recognition description",
        "textarea",
        isZh ? "获评中国北京地区商业纠纷领域“值得关注的律所”" : "Named a \"Notable Firm\" in Commercial Disputes, Beijing",
      ),
    ]),
    repeaterItem("china-business-law-journal", isZh ? "核心荣誉 4" : "Core recognition 4", [
      field("title", isZh ? "荣誉标题" : "Recognition title", "text", isZh ? "《商法》（China Business Law Journal）：" : "China Business Law Journal:"),
      field(
        "description",
        isZh ? "荣誉说明" : "Recognition description",
        "textarea",
        isZh
          ? "荣获2025年度卓越律所大奖（跨境诉讼），此前曾多次获得该机构奖项"
          : "Winner of the 2025 Excellence Award for Cross-Border Litigation, and multiple prior recognitions",
      ),
    ]),
  ];
}

function aboutIndividualRecognitionItems(language: Language) {
  const isZh = language === "zh";
  const items = isZh
    ? [
        ["The Legal 500：", "荣获“北京精英·商事争议”奖项"],
        ["《钱伯斯全球指南》（Chambers Global Practice Guide）：", "受邀撰写2025年、2026年《中国产争议解决概览》"],
        ["《商法》（China Business Law Journal）：", "入选“The A-List法律精英”名册；荣登“40位中国业务法律新星（Rising Stars Top 40）”榜单"],
        ["LEGALBAND：", "入选中国顶级律师排行榜，被评为争议解决（诉讼）领域的“后起之秀”"],
        ["Benchmark Litigation China：", "获推荐为北京地区争议解决律师"],
        ["Asialaw Profiles：", "获评争议解决领域值得关注的律师"],
      ]
    : [
        ["The Legal 500 China Elite:", "Beijing Elite in Commercial Disputes (2025)"],
        ["Chambers Global Practice Guide:", "Invited author of the China Dispute Resolution Overview (2025 & 2026)"],
        ["China Business Law Journal:", "\"The A-List\" Legal Elites: \"Rising Stars Top 40\""],
        ["LEGALBAND:", "Top Ranked Lawyers - Rising Star in Dispute Resolution"],
        ["Benchmark Litigation China:", "Recommended Lawyer for Dispute Resolution, Beijing"],
        ["Asialaw Profiles:", "Notable Practitioner in Dispute Resolution"],
      ];

  return items.map(([title, description], index) =>
    repeaterItem(`individual-${index + 1}`, isZh ? `个人荣誉 ${index + 1}` : `Individual recognition ${index + 1}`, [
      field("title", isZh ? "荣誉标题" : "Recognition title", "text", title),
      field("description", isZh ? "荣誉说明" : "Recognition description", "textarea", description),
    ]),
  );
}

function aboutWorkLifeItems(language: Language) {
  const isZh = language === "zh";
  const workLifeImages = [
    workLifeImage1,
    workLifeImage2,
    workLifeImage3,
    workLifeImage4,
    workLifeImage5,
    workLifeImage6,
    workLifeImage7,
    workLifeImage8,
  ];

  return Array.from({ length: 8 }, (_, index) => {
    const itemNumber = index + 1;
    return repeaterItem(`work-life-${itemNumber}`, isZh ? `Work & Life ${itemNumber}` : `Work & Life ${itemNumber}`, [
      field("image", isZh ? `图片 ${itemNumber}` : `Image ${itemNumber}`, "image", assetSrc(workLifeImages[index])),
      field("alt", isZh ? `图片描述 ${itemNumber}` : `Alt ${itemNumber}`, "text", `Work and life moment ${itemNumber}`),
    ]);
  });
}

function aboutThoughtMediaItems(language: Language) {
  const isZh = language === "zh";
  const items = [
    ["Bilibili", assetSrc(aboutIcon1), "https://b23.tv/mbZEgBg"],
    [isZh ? "小红书" : "Xiaohongshu", assetSrc(aboutIcon2), "https://xhslink.com/m/EgtHVE7Wxj"],
    ["LinkedIn", assetSrc(aboutIcon3), "https://www.linkedin.com/in/yuxuan-liu-a7636a44?utm_source=share_via&utm_content=profile&utm_medium=member_android"],
  ];

  return items.map(([label, icon, href], index) =>
    repeaterItem(`thought-media-${index + 1}`, isZh ? `媒体链接 ${index + 1}` : `Media link ${index + 1}`, [
      field("label", isZh ? "名称" : "Name", "text", label),
      field("icon", isZh ? "图标" : "Icon", "image", icon),
      field("href", isZh ? "站外链接" : "External link", "url", href),
    ]),
  );
}

function awardsIndividualItems(language: Language) {
  const isZh = language === "zh";
  const imageByDate: Record<string, string> = {
    "2019.09": awardImageSrc("201909.png"),
    "2020.05.26": awardImageSrc("20200526.png"),
    "2021.03.15": awardImageSrc("20210315.jpeg"),
    "2021.04.14": awardImageSrc("20210414.png"),
    "2021.06.10": awardImageSrc("20210610.png"),
    "2022.01.24": awardImageSrc("20220124.png"),
    "2022.05.17": awardImageSrc("20220517 (2).jpeg"),
    "2025.01": awardImageSrc("202501.png"),
    "2025.11.19": awardImageSrc("b74d4a97719a5658765b78e5568c3ca5.png"),
  };
  const items = isZh
    ? [
        ["2025.11.19", "Legal 500中国精英-“北京精英·商业争议”", "2025年11月，虎诉荣获首届Legal 500中国精英-“北京精英·商业争议”。"],
        ["2025.01", "受邀撰写《2025钱伯斯全球指南-争议解决概览·中资所》", "2025年1月，虎诉受邀撰写《2025钱伯斯全球指南-争议解决概览·中资所》专题文章。"],
        ["2022.05.17", "入选2022年度LEGALBAND中国顶级律师排行榜", "2022年5月，虎诉入选LEGALBAND中国顶级律师排行榜，并获评争议解决·诉讼领域后起之秀。"],
        ["2022.01.24", "入选2021年度《商法》“The A-List 法律精英”名册", "2022年1月，虎诉入选《商法》2021年度“The A-List 法律精英”名册，获评为100位中国法精英律师之一。"],
        ["2021.06.10", "入选Benchmark Litigation China 2021北京地区争议解决推荐律师榜单", "2021年6月，虎诉入选Benchmark Litigation China 2021北京地区争议解决推荐律师榜单。"],
        ["2021.04.14", "入选2021年度LEGALBAND中国顶级律师排行榜", "2021年4月，虎诉入选LEGALBAND“2021年度中国顶级律师排行榜”，并获评“争议解决·诉讼”领域后起之秀（Rising Star）。"],
        ["2021.03.15", "入选《商法》Rising Stars 2021 TOP 40榜单", "2021年3月，虎诉入选知名法律媒体《商法》“2021年度Rising Stars 40强”榜单。"],
        ["2020.05.26", "接受ALB专访，被赞誉为“争议解决领域的耀眼新星”", "2020年5月，虎诉接受知名法律媒体《亚洲法律杂志》（Asian Legal Business，ALB）专访，被赞誉为“争议解决领域的耀眼新星”。"],
        ["2019.09", "入选Asialaw Profiles 2020中国法律市场榜单", "2019年9月，虎诉入选 Asialaw Profiles 2020 中国法律市场榜单，被评为争议解决领域“知名律师”（Notable Practitioner）。"],
      ]
    : [
        ["2025.11.19", "Legal 500 China Elite: Beijing Elite - Commercial Disputes.", "In November 2025, Mr. Tiger Partners was awarded the inaugural Legal 500 China Elite: Beijing Elite - Commercial Disputes."],
        ["2025.01", "Invited to author the Chambers Global Practice Guides 2025 - Dispute Resolution Overview (PRC Firms)", "In January 2025, Mr. Tiger Partners was invited to author the Chambers Global Practice Guides 2025 - Dispute Resolution Overview (PRC Firms)."],
        ["2022.05.17", "LEGALBAND 2022 Top Ranked Lawyers List", "In May 2022, Mr. Tiger Partners was listed in the 2022 Top Ranked Lawyers List as Rising Star in Dispute Resolution Litigation by LEGALBAND."],
        ["2022.01.24", "China Business Law Journal 2021 \"The-A List\"", "In January 2022, Mr. Tiger Partners was selected as one of \"The A List\" among 100 elite practitioners of Chinese law by China Business Law Journal."],
        ["2021.06.10", "Benchmark Litigation China 2021 list of lawyers recommended for dispute resolution in Beijing.", "In June 2021, Mr. Tiger Partners was listed on the Benchmark Litigation China 2021 list of lawyers recommended for dispute resolution in Beijing."],
        ["2021.04.14", "LEGALBAND 2021 Top Ranked Lawyers List", "In April 2021, Mr. Tiger Partners was listed in the LEGALBAND 2021 Top Ranked Lawyers, and ranked as the \"Rising Star\" in dispute resolution and litigation."],
        ["2021.03.15", "China Business Law Journal Rising Stars 2021 Top 40.", "In March 2021, Mr. Tiger Partners was identified by China Business Law Journal in the list of Rising Stars 2021 Top 40."],
        ["2020.05.26", "Featured in an exclusive interview with ALB and recognized as a rising star in dispute resolution.", "In May 2020, Mr. Tiger Partners received an exclusive interview with Asian Legal Business and was featured as a rising star in dispute resolution."],
        ["2019.09", "Asialaw Profiles 2020 China Legal Market Rankings", "In September 2019, Mr. Tiger Partners was awarded the title of Notable Practitioner in dispute resolution in China by Asialaw Profiles for 2020."],
      ];

  return items.map(([date, title, description], index) =>
    repeaterItem(`individual-award-${index + 1}`, isZh ? `律师个人奖项 ${index + 1}` : `Individual award ${index + 1}`, [
      field("date", isZh ? "日期" : "Date", "text", date),
      field("title", isZh ? "标题" : "Title", "textarea", title),
      field("description", isZh ? "说明" : "Description", "textarea", description),
      field("image", isZh ? "图片" : "Image", "image", imageByDate[date] ?? ""),
    ]),
  );
}

function awardsLawFirmItems(language: Language) {
  const isZh = language === "zh";
  const imageByDate: Record<string, string> = {
    "2020.09": awardImageSrc("202009.png"),
    "2021.04": awardImageSrc("202104.jpeg"),
    "2021.05.18": awardImageSrc("20210518.jpeg"),
    "2021.06.10": awardImageSrc("2021610.png"),
    "2022.01.20": awardImageSrc("20220120.png"),
    "2022.03.31": awardImageSrc("20220331.jpeg"),
    "2022.05.09": awardImageSrc("20220509.png"),
    "2022.05.17": awardImageSrc("20220517.jpeg"),
    "2022.06.15": awardImageSrc("20220615.png"),
    "2024.01.22": awardImageSrc("20240122.png"),
    "2024.06.04": awardImageSrc("20240604.png"),
    "2025.01.16": awardImageSrc("20250116.jpeg"),
    "2025.02.13": awardImageSrc("20250213.png"),
    "2025.04.16": awardImageSrc("20250416.png"),
    "2025.06.19": awardImageSrc("20250619.png"),
    "2025.07.23": awardImageSrc("20250723.jpg"),
    "2025.11.19": awardImageSrc("20251119.png"),
    "2026.01.15": awardImageSrc("20260115.png"),
    "2026.03.16": awardImageSrc("20260320.png"),
  };
  const items = isZh
    ? [
        ["2026.03.16", "ALB 2026年度中国法律大奖", "2026年3月，虎诉律师事务所入围ALB 2026年度中国法律大奖，并获得“年度争议解决精品律师事务所”和“年度最具潜力律师事务所”两项提名。"],
        ["2026.01.15", "钱伯斯大中华区指南2026", "2026年1月，虎诉律师事务所入选《钱伯斯大中华区指南2026》争议解决（中资律师事务所）推荐榜单。"],
        ["2025.11.19", "The Legal 500中国区2026榜单", "2025年11月，虎诉律师事务所入选The Legal 500中国区2026榜单，荣获争议解决：仲裁（中国律所）和争议解决：诉讼（中国律所）推荐。"],
        ["2025.07.23", "《商法》2025卓越律所大奖", "2025年7月，虎诉律师事务所在《商法》2025卓越律所大奖中荣获“跨境诉讼”领域奖项。"],
        ["2025.06.19", "ALB中国争议解决榜单2025", "2025年6月，虎诉律师事务所入选ALB中国争议解决榜单2025，并在诉讼领域获评“值得关注律所”。"],
        ["2025.04.16", "ALB 2025年度中国法律大奖（入围）", "2025年4月，虎诉律师事务所入围ALB 2025年度中国法律大奖“年度精品律师事务所”提名。"],
        ["2025.02.13", "钱伯斯全球指南2025", "2025年2月，虎诉律师事务所入选《钱伯斯全球指南2025》争议解决（中资律师事务所）推荐榜单。"],
        ["2025.01.16", "钱伯斯大中华区指南2025", "2025年1月，虎诉律师事务所入选《钱伯斯大中华区指南2025》争议解决（中资律师事务所）推荐榜单。"],
        ["2024.06.04", "Benchmark Litigation中国2024争议解决榜单", "2024年6月，虎诉律师事务所入选Benchmark Litigation中国2024争议解决榜单，并获评“值得关注律所”。"],
        ["2024.01.22", "ALB中国精品律所榜单2024", "2024年1月，虎诉律师事务所入选ALB中国精品律所榜单2024。"],
        ["2022.06.15", "《商法》2022卓越律所大奖", "2022年6月，虎诉律师事务所入选《商法》2022卓越律所大奖“境内争议解决”榜单，并获评“卓越公益律所”。"],
        ["2022.05.17", "LEGALBAND 2022中国顶级律所榜单", "2022年5月，虎诉律师事务所入选LEGALBAND 2022中国顶级律所榜单，并在“争议解决（诉讼）”及“合规”领域获评“潜力律所”。"],
        ["2022.05.09", "Benchmark Litigation中国榜单2022", "2022年5月，虎诉律师事务所在Benchmark Litigation中国争议解决榜单2022中获评北京地区商业纠纷领域“值得关注律所”。"],
        ["2022.03.31", "LEGALBAND 2022中国法律大奖（入围）", "2022年3月，虎诉律师事务所入围LEGALBAND 2022中国法律大奖“年度最佳新锐律师事务所”提名。"],
        ["2022.01.20", "ALB中国精品律所榜单2022", "2022年1月，虎诉律师事务所入选ALB中国精品律所榜单2022。"],
        ["2021.06.10", "Benchmark Litigation中国榜单2021", "2021年6月，虎诉律师事务所在Benchmark Litigation中国榜单2021中获评北京地区商业纠纷领域“值得关注律所”。"],
        ["2021.05.18", "《商法》2021卓越律所大奖", "2021年5月，虎诉律师事务所在《商法》2021卓越律所大奖中获评“备受关注律所”。"],
        ["2021.04", "ALB 2021年度中国法律大奖（入围）", "2021年4月，虎诉律师事务所入围ALB 2021年度中国法律大奖“年度最具潜力律师事务所”提名。"],
        ["2020.09", "《商法》正式收录虎诉律师事务所", "2020年9月，虎诉律师事务所获《商法》正式收录。"],
      ]
    : [
        ["2026.03.16", "ALB China Law Awards 2026", "In March 2026, Tiger Partners was shortlisted for the ALB China Law Awards 2026 with two nominations: Dispute Resolution Boutique Law Firm of the Year and Rising Law Firm of the Year."],
        ["2026.01.15", "Chambers Greater China Region Guide 2026", "In January 2026, Tiger Partners was listed in the Chambers Greater China Region Guide 2026 in Dispute Resolution (PRC Firms)."],
        ["2025.11.19", "The Legal 500 China Ranking 2026", "In November 2025, Tiger Partners was listed in The Legal 500 China 2026 rankings for Dispute Resolution: Arbitration and Litigation (PRC Firms)."],
        ["2025.07.23", "China Business Law Awards 2025", "In July 2025, Tiger Partners was awarded the China Business Law Awards 2025 Excellence Award in Cross-Border Litigation."],
        ["2025.06.19", "ALB China Dispute Resolution Rankings 2025", "In June 2025, Tiger Partners was listed in the ALB China Dispute Resolution Rankings 2025 and recognized as a Notable Firm in Litigation."],
        ["2025.04.16", "ALB China Law Awards 2025 (Nomination)", "In April 2025, Tiger Partners was nominated for Boutique Law Firm of the Year at the ALB China Law Awards 2025."],
        ["2025.02.13", "Chambers Global Guide 2025", "In February 2025, Tiger Partners was listed in the Chambers Global Guide 2025 in Dispute Resolution (PRC Firms)."],
        ["2025.01.16", "Chambers Greater China Region Guide 2025", "In January 2025, Tiger Partners was listed in the Chambers Greater China Region Guide 2025 in Dispute Resolution (PRC Firms)."],
        ["2024.06.04", "Benchmark Litigation China 2024 Dispute Resolution Rankings", "In June 2024, Tiger Partners was listed in the Benchmark Litigation China 2024 Dispute Resolution rankings and recognized as a Firm to Watch."],
        ["2024.01.22", "ALB China Firms to Watch 2024", "In January 2024, Tiger Partners was listed in the ALB China Firms to Watch 2024."],
        ["2022.06.15", "China Business Law Awards 2022", "In June 2022, Tiger Partners was listed in Dispute Resolution (Domestic) and recognized in Pro Bono by the China Business Law Awards 2022."],
        ["2022.05.17", "LEGALBAND 2022 China Top Law Firms Rankings", "In May 2022, Tiger Partners was listed as a Firm to Watch in Dispute Resolution (Litigation) and Compliance."],
        ["2022.05.09", "Benchmark Litigation China 2022", "In May 2022, Tiger Partners was recognized as a Notable Firm in commercial disputes in Beijing by Benchmark Litigation China 2022."],
        ["2022.03.31", "LEGALBAND China Law Awards 2022 (Nomination)", "In March 2022, Tiger Partners was nominated for Rising Law Firm of the Year at the LEGALBAND China Law Awards 2022."],
        ["2022.01.20", "ALB China Firms to Watch 2022", "In January 2022, Tiger Partners was listed in the ALB China Firms to Watch 2022."],
        ["2021.06.10", "Benchmark Litigation China 2021", "In June 2021, Tiger Partners was recognized as a Notable Firm in commercial disputes in Beijing by Benchmark Litigation China 2021."],
        ["2021.05.18", "China Business Law Awards 2021", "In May 2021, Tiger Partners was listed as a Firm to Watch in the China Business Law Awards 2021."],
        ["2021.04", "ALB China Law Awards 2021 (Nomination)", "In April 2021, Tiger Partners was nominated for Rising Law Firm of the Year at the ALB China Law Awards 2021."],
        ["2020.09", "China Business Law Journal Recognition", "In September 2020, Tiger Partners was officially recognized and included by China Business Law Journal."],
      ];

  return items.map(([date, title, description], index) =>
    repeaterItem(`law-firm-award-${index + 1}`, isZh ? `律所奖项 ${index + 1}` : `Law firm award ${index + 1}`, [
      field("date", isZh ? "日期" : "Date", "text", date),
      field("title", isZh ? "标题" : "Title", "textarea", title),
      field("description", isZh ? "说明" : "Description", "textarea", description),
      field("image", isZh ? "图片" : "Image", "image", imageByDate[date] ?? ""),
    ]),
  );
}

function awardsSocialItems(language: Language) {
  const isZh = language === "zh";
  const images = [mediaAward1, mediaAward2, mediaAward3, mediaAward1, mediaAward4, mediaAward5].map(assetSrc);
  const logos = [bilibiliLogo, bilibiliLogo, bilibiliLogo, bilibiliLogo, xiaoyuzhouLogo, xiaoyuzhouLogo].map(assetSrc);
  const items = isZh
    ? [
        ["Bilibili", "Bilibili 十万粉丝成就", "/media"],
        ["Bilibili", "Bilibili 一万充电成就", "/media"],
        ["Bilibili", "Bilibili 2025年度知识up主", "/media"],
        ["Bilibili", "Bilibili 2025年度优质讲师", "/media"],
        ["小宇宙", "小宇宙 “虎诉直播间的故事”一万订阅成就", "/media"],
        ["小宇宙", "小宇宙 “Tiger Partners Insights” 三万订阅成就", "/media"],
      ]
    : [
        ["Bilibili", "Bilibili 100,000 Followers Award", "/media"],
        ["Bilibili", "Bilibili 10,000 \"Charging\" Award", "/media"],
        ["Bilibili", "Bilibili 2025 Knowledge Creator of the Year", "/media"],
        ["Bilibili", "Bilibili 2025 Outstanding Instructor", "/media"],
        ["Xiaoyuzhou", "Xiaoyuzhou \"Stories from Tiger Partners's Live Room\" 10,000 Followers Award", "/media"],
        ["Xiaoyuzhou", "Xiaoyuzhou \"Tiger Partners Insights\" 30,000 Followers Award", "/media"],
      ];

  return items.map(([brand, award, href], index) =>
    repeaterItem(`social-award-${index + 1}`, isZh ? `新媒体奖项 ${index + 1}` : `Social award ${index + 1}`, [
      field("brand", isZh ? "平台" : "Brand", "text", brand),
      field("award", isZh ? "奖项" : "Award", "textarea", award),
      field("image", isZh ? "图片" : "Image", "image", images[index] ?? ""),
      field("logo", "Logo", "image", logos[index] ?? ""),
      field("href", isZh ? "链接" : "Link", "url", href),
    ]),
  );
}

function eventScheduleItems(language: Language) {
  const isZh = language === "zh";
  const images = [schedulePoster, schedulePoster1, schedulePoster2].map(assetSrc);
  const hrefs = [
    "https://v.qq.com/x/cover/mzc00200rtspg8d/p41012g4fm3.html",
    "",
    "",
  ];
  const items = isZh
    ? [
        ["2025.09.27", "2025.09.27", "《老板不知道的我·专业分享》综艺录制", "专业分享录制", "特别活动"],
        ["2025.10.23", "2025.10.23", "这是一门艺术：解码内地诉讼仲裁律师的实战技巧", "香港大学法学院", "法律实务讲座"],
        ["2024.07.13", "2024.07.13", "2024法律人故事大会", "法律人故事大会", "大会活动"],
      ]
    : [
        ["2025.09.27", "2025.09.27", "Recording for Variety Show The Boss Doesn't Know Me - Podcast Special", "Podcast Special Recording", "Featured Program"],
        ["2025.10.23", "2025.10.23", "This Is an Art: Decoding Practical Skills of Mainland Practitioners in Litigation and Arbitration", "HKU Faculty of Law", "Law & Practice Talk"],
        ["2024.07.13", "2024.07.13", "2024 Legal Professional Story Conference", "Legal Story Conference", "Conference Event"],
      ];

  return items.map(([date, time, title, location, tag], index) =>
    repeaterItem(`schedule-${index + 1}`, isZh ? `日程 ${index + 1}` : `Schedule ${index + 1}`, [
      field("date", isZh ? "日期" : "Date", "text", date),
      field("time", isZh ? "时间" : "Time", "text", time),
      field("title", isZh ? "标题" : "Title", "textarea", title),
      field("location", isZh ? "地点" : "Location", "text", location),
      field("tag", isZh ? "标签" : "Tag", "text", tag),
      field("image", isZh ? "图片" : "Image", "image", images[index] ?? ""),
      field("href", isZh ? "链接" : "Link", "url", hrefs[index] ?? ""),
    ]),
  );
}

function eventPastItems(language: Language) {
  const isZh = language === "zh";
  const images = [
    eventDateImage1,
    eventDateImage2,
    eventDateImage3,
    eventDateImage4,
    eventDateImage5,
    eventDateImage6,
    eventDateImage7,
    eventDateImage8,
    eventDateImage9,
  ].map(assetSrc);
  const eventPlatformGroupsByIndex: Record<
    number,
    Array<{
      logo: string;
      layout?: string;
      name: string;
      links: Array<{ label: string; href: string }>;
    }>
  > = {
    0: [
      {
        logo: assetSrc(eventDateLogo1),
        name: isZh ? "腾讯视频" : "Tencent Video",
        links: [
          {
            label: isZh ? "《老板不知道的我》-第4期上集" : "The Boss Doesn't Know Me - Episode 4 Part 1",
            href: "https://v.qq.com/x/cover/mzc00200rtspg8d/p41012g4fm3.html",
          },
          {
            label: isZh ? "《老板不知道的我》-第4期下集" : "The Boss Doesn't Know Me - Episode 4 Part 2",
            href: "https://v.qq.com/x/cover/mzc00200rtspg8d/c4101f2sqib.html",
          },
          {
            label: isZh ? "《老板不知道的我》-第8期" : "The Boss Doesn't Know Me - Episode 8",
            href: "https://v.qq.com/x/cover/mzc00200rtspg8d/r4101wiivba.html",
          },
        ],
      },
      {
        logo: assetSrc(eventDateLogo2),
        name: isZh ? "优酷视频" : "Youku Video",
        links: [
          {
            label: isZh ? "《老板不知道的我》-第4期上集" : "The Boss Doesn't Know Me - Episode 4 Part 1",
            href: "https://v.youku.com/v_show/id_XNjQ5OTY0NDgyMA==.html",
          },
          {
            label: isZh ? "《老板不知道的我》-第8期下集" : "The Boss Doesn't Know Me - Episode 8 Part 2",
            href: "https://v.youku.com/v_show/id_XNjUwMzAzNTYzNg==.html",
          },
          {
            label: isZh ? "《老板不知道的我》-第8期" : "The Boss Doesn't Know Me - Episode 8",
            href: "https://v.youku.com/v_show/id_XNjUwODAxNzA2MA==.html",
          },
        ],
      },
      {
        logo: assetSrc(eventDateLogo3),
        name: isZh ? "抖音视频" : "Douyin Video",
        links: [
          {
            label: isZh
              ? "《老板不知道的我·财富课》-第一桶金来自于？"
              : "The Boss Doesn't Know Me · Wealth Course - Where Does One's First Pot of Gold Come From?",
            href: "https://www.douyin.com/video/7585458307876293934",
          },
          {
            label: isZh
              ? "《老板不知道的我·财富课》-现在还有赚大钱的机会吗？"
              : "The Boss Doesn't Know Me · Wealth Course - Are There Still Opportunities to Make Big Money Nowadays?",
            href: "https://www.douyin.com/video/7585465465460362547",
          },
          {
            label: isZh
              ? "《老板不知道的我·财富课》-什么样的员工最值得被投资？"
              : "The Boss Doesn't Know Me · Wealth Course - What Kind of Employees Are Most Worth Investing In?",
            href: "https://www.douyin.com/video/7585475165916532006",
          },
        ],
      },
    ],
    3: [
      {
        logo: assetSrc(eventDateLogo4),
        name: isZh ? "Bilibili 视频" : "Bilibili Video",
        links: [
          {
            label: isZh ? "快乐出差 - 乌镇充电之旅！" : "A Pleasant Business Trip - Wuzhen \"Charging\" Journey!",
            href: "",
          },
          {
            label: isZh ? "充电构建创作者与观众的正向循环" : "Charging: Building a Positive Cycle Between Creators and Audiences",
            href: "",
          },
        ],
      },
    ],
  };
  const eventPlatformFields = (index: number) => {
    const groups = eventPlatformGroupsByIndex[index];

    if (!groups?.length) return [];

    return Array.from({ length: 3 }, (_, platformIndex) => {
      const platformNumber = platformIndex + 1;
      const platform = groups[platformIndex];

      return [
        field(`platform${platformNumber}Name`, `Platform ${platformNumber} name`, "text", platform?.name ?? ""),
        field(`platform${platformNumber}Logo`, `Platform ${platformNumber} logo`, "image", platform?.logo ?? ""),
        field(`platform${platformNumber}Layout`, `Platform ${platformNumber} layout (stack/row)`, "text", platform?.layout ?? ""),
        ...Array.from({ length: 4 }, (_, linkIndex) => {
          const linkNumber = linkIndex + 1;
          const link = platform?.links[linkIndex];

          return [
            field(
              `platform${platformNumber}Link${linkNumber}Label`,
              `Platform ${platformNumber} program ${linkNumber} title`,
              "textarea",
              link?.label ?? "",
            ),
            field(
              `platform${platformNumber}Link${linkNumber}Href`,
              `Platform ${platformNumber} program ${linkNumber} link`,
              "url",
              link?.href ?? "",
            ),
          ];
        }).flat(),
      ];
    }).flat();
  };
  const items = isZh
    ? [
        [
          "日期：2025年9月27日",
          "《老板不知道的我·专业分享》综艺录制",
          "《老板不知道的我・老友季2》是由 BOSS 直聘出品的职场纪实观察节目，聚焦合作创业、职场关系与职业成长。作为专业分享受邀嘉宾，虎诉与多位嘉宾围绕“职场关系中的情与理”参与对谈，结合嘉宾故事与观众投稿，就冲突、默契与成长等话题分享了真诚而有见地的观察与思考。",
        ],
        [
          "日期：2025年11月28日",
          "北京国际视听大会",
          "2025年11月28日，虎诉作为B站法律垂类头部创作者，受邀出席由北京市广播电视局、北京经济技术开发区管委会主办的2025北京国际视听大会·新大众文艺生态论坛并发表专题分享。\n\n他以“长视频破局”为主题，结合自身法律内容创作实践，分享了对深度知识需求增长、知识长视频价值以及内容创作方向转变的观察，强调应以高质量内容连接专业领域与公众，推动更具深度与影响力的知识传播。",
        ],
        [
          "日期：2025年10月23日",
          "香港大学法学院法律实务讲座",
          "2025年10月23日，虎诉受邀做客香港大学法学院CCL Talk，主讲《这是一门艺术：解码内地诉讼仲裁律师的实战技巧》。本次讲座由香港大学法学院助理教授、黄乾亨中国法研究中心主任夏颖主持，围绕内地与香港庭审制度及实务路径差异展开，重点介绍了内地法院案多人少、庭审节奏紧凑、书面证据占主导以及证人询问相对有限等特点。\n\n围绕“在有限时间内说服裁判者”这一核心问题，虎诉系统梳理了诉讼仲裁全流程实战方法，涵盖庭前准备与证据组织、庭上简洁聚焦的表达，以及庭后文书打磨与沟通跟进，完整呈现了内地律师的实务方法论。\n\n分享主题：这是一门艺术：解码内地诉讼仲裁律师的实战技巧",
        ],
        [
          "日期：2025年5月10日",
          "B站充电UP主交流日的线下活动",
          "虎诉（@虎诉）受邀前往乌镇，参与2025 B 站充电 UP 主交流日活动，并有幸作为全场三位分享嘉宾之一登台发言。虎诉在现场与来自全国各地的优质创作者、平台伙伴面对面交流，完整分享了《Tiger Partners Insights》从法律垂类起步、坚持专业长视频创作、深耕内容价值、成长为头部法律专业观察的创作历程与实战心得，也围绕内容创作、粉丝运营、平台生态与长期价值展开深度探讨，在交流中互相启发、共同成长。\n\n主题：当长视频遇上专业主义：一档法律专业观察的充电试验",
        ],
        [
          "日期：2024年7月13日",
          "2024法律人故事大会",
          "2024年7月13日，2024法律人故事大会圆满举行。本次活动由法天使主办，金诚同达律师事务所、世辉律师事务所联合主办，主题为「我想要的生活」。线下230余位观众与线上13678位网友共同参与。大会汇聚了律师界传奇创始人、法律畅销书作者、跨界法律大V等行业代表，分享真实经历与人生感悟。\n\n其中，虎诉以「开个‘小作坊’也挺好」为主题，讲述了自己从求学成长到执业初期的挫折与蜕变，表达了对专业纯粹性的坚守——专注办案、深耕专业、长期主义，不求最大，但求最久。经现场音浪统计，虎诉获评「故事二大王」。",
        ],
        [
          "日期：2025年10月15日",
          "北京大学法学院校友专访交流活动",
          "2025年10月15日，虎诉受邀回到北京大学法学院，参加由法学院校友会主办的校友专访交流活动，与在校师弟师妹面对面深度对话。本次活动以「以法为志，媒体拓新」为主题。虎诉团队结合自身16年法律实务经验与自媒体创作实践，分享如何在坚守专业法律初心的同时，借助新媒体平台打破知识壁垒，让专业法律服务走向大众。他从求学时光、职业选择、争议解决实务，到法律内容创作、长视频传播与公众普法等多个维度展开交流，为法科学子提供了职业规划、跨界成长与价值实现的真实经验与启发。",
        ],
        [
          "日期：2022年6月16日",
          "2022虎行风从奖学金",
          "“虎行风从奖学金”由北京虎诉律师事务所设立，旨在发掘并支持在争议解决领域具有潜力的优秀法律学子，帮助他们拓展专业视野、深化实践认知，并在学习与成长中释放潜能。不同于传统以资助为主的奖学金项目，该奖学金更强调对青年法律人才的引导与培养。获奖者不仅可获得现金奖励，还可与虎诉合伙人进行深入交流，接受资深律师的专业指导；表现优异者更有机会进入律所实习，沉浸式了解争议解决律师的实际工作。2022年度奖学金共收到34份申请。经材料审查与面试两轮评选，评审委员会最终选出三位获奖者。",
        ],
        [
          "日期：2025年9月6日",
          "小红书「脱口秀周」笑愈企划线下 TALK 沙龙局",
          "2025年9月6日，虎诉(@虎诉)受邀以小红书特邀分享官身份，参与小红书「脱口秀周」笑愈企划线下TALK沙龙上海专场。本次活动以“撕掉伪装和标签”为主题，聚焦都市人在高压生活中的真实表达与自我和解。活动现场，虎诉围绕成长经历、生活观察与个人感受，进行了轻松真诚的分享。虽然并非职业脱口秀演员，他仍以富有感染力的表达方式，与现场观众共同探讨如何卸下外界赋予的角色束缚，找回更真实、更松弛的自我。整场沙龙氛围温暖幽默，也为参与者提供了一个释放压力、坦诚交流的空间。",
        ],
        ["2021.07.19", "第29次两岸青年观点论坛", "围绕两岸青年法律从业者交流与融合发展展开讨论。"],
      ]
    : [
        [
          "Date: September 27, 2025",
          "THE BOSS DOESN'T KNOW ME - PODCAST SPECIAL",
          "The Boss Doesn’t Know Me: Old Friends Season 2, produced by BOSS Zhipin, is a workplace documentary series focusing on entrepreneurship, professional relationships, and career growth. Invited as a guest for its Podcast Special, Tiger Partners joined fellow guests in discussions on \"emotion and reason in the workplace\", sharing thoughtful insights on conflict, trust, and personal growth through stories from guests and audience submissions.",
        ],
        [
          "Date: November 28, 2025",
          "BEIJING INTERNATIONAL AUDIOVISUAL CONFERENCE",
          "On November 28, 2025, Tiger Partners, as a leading legal content creator on Bilibili, was invited to speak at the 2025 Beijing International Audiovisual Conference · New Mass Literature & Art Ecosystem Forum, hosted by the Beijing Radio and Television Bureau and the Administrative Committee of Beijing Economic-Technological Development Area.\n\nIn his talk, “Breaking Barriers with Long-form Videos,” he drew on his legal content practice to discuss the rising demand for in-depth knowledge amid content saturation. He highlighted Bilibili’s role in advancing long-form knowledge videos that connect professional fields with the public, and emphasized the importance of shifting from traffic-driven creation to building dedicated audiences through high-quality content.",
        ],
        [
          "Date: 23 October 2025",
          "LAW & PRACTICE TALK AT HKU LAW",
          "On 23 October 2025, Tiger Partners was invited to speak at the CCL Talk hosted by the Faculty of Law, The University of Hong Kong, delivering a lecture titled This Is an Art: Decoding the Practical Skills of Mainland Practitioners in Litigation and Arbitration. The session was moderated by Dr. Ying Xia, Assistant Professor at HKU Faculty of Law and Director of the Philip K. Wong Centre for Chinese Law. It focused on the institutional and practical differences between Mainland China and Hong Kong, including heavy caseloads, tight hearing schedules, reliance on documentary evidence, and limited witness examination.\n\nCentering on the challenge of persuading adjudicators within limited time, Tiger Partners presented a systematic framework of litigation and arbitration practice. He outlined key strategies across the full process, including pre-hearing preparation and evidence organization, concise and focused courtroom advocacy, and post-hearing refinement of submissions and follow-up communication.\n\nTheme: This Is an Art: Decoding Practical Skills of Mainland Practitioners in Litigation and Arbitration",
        ],
        [
          "Date: May 10, 2025",
          "BILIBILI CHARGING CREATOR OFFLINE EXCHANGE EVENT",
          "Tiger Partners was invited to Wuzhen to attend the 2025 Bilibili Charging Creator Exchange Day, and was selected as one of only three guest speakers on stage. At the event, Tiger Partners communicated face-to-face with high-quality creators and platform partners from across the country. He shared the complete development journey and practical experience of Tiger Partners Insights — starting as a niche legal program, adhering to professional long-form content creation, focusing on content value, and growing into a leading legal video podcast. He also conducted in-depth discussions on content production, fan operation, platform ecosystem and long-term value, enabling mutual inspiration and joint progress among all participants.\n\nTheme: When Long-Form Content Meets Professionalism: A Charging Experiment of a Legal Video Podcast",
        ],
        [
          "Date: 13 July 2024",
          "2024 LEGAL PROFESSIONAL STORY CONFERENCE",
          "On 13 July 2024, the 2024 Legal Professional Story Conference was held, themed “The Life I Want.” Hosted by Fatianshi and co-hosted by Jincheng Tongda Law Firm and Shihui Law Firm, the event attracted over 230 offline attendees and 13,678 online participants. Speakers included legendary law firm founders, best-selling legal authors, and cross-industry influencers.\n\nAmong them, Tiger Partners gave a talk titled “Running a ‘Small Workshop’ Is Great.” He shared his struggles and growth from student days to early practice, expressing his commitment to professional purity: focusing on cases, embracing long-termism, and valuing longevity over scale. Tiger Partners was voted “Second Place Storyteller” based on live sound-wave voting.",
        ],
        [
          "Date: October 15, 2025",
          "PKU LAW SCHOOL ALUMNUS INTERVIEW AND EXCHANGE EVENT",
          "On 15 October 2025, Tiger Partners was invited back to Peking University Law School for an alumni interview and exchange event hosted by the Law School Alumni Association. Under the theme “Aspire to Law, Innovate through Media,” Tiger Partners shared how to uphold professional legal integrity while using new media to break down knowledge barriers and bring legal services to the public. Drawing on his 16 years of legal practice and self-media experience, he discussed his school days, career choices, dispute resolution, legal content creation, and long-form video communication. He offered law students practical insights into career planning, cross-disciplinary growth, and personal value realization.",
        ],
        [
          "Date: 16 June 2022",
          "2022 TIGER PARTNERS SCHOLARSHIP FOR DISPUTE RESOLUTION TALENT",
          "Established by Tiger Partners, the Tiger Partners Scholarship for Dispute Resolution Talent (Huxing Fengcong Scholarship) is designed to identify and support outstanding law students with strong potential in dispute resolution. More than a conventional scholarship, the program emphasizes long-term guidance, professional development, and practical exposure. In addition to financial support, recipients are offered valuable opportunities to engage directly with the firm’s partners and receive mentorship from experienced practitioners. Outstanding awardees may also be invited to intern at the firm, gaining first-hand insight into the daily practice of dispute resolution lawyers. In 2022, the scholarship received 34 applications. Following a two-stage selection process consisting of written review and interviews, the committee selected three recipients.",
        ],
        [
          "Date: 6 September 2025",
          "REDNOTE “TALK SHOW WEEK” HEALING OFFLINE TALK SALON",
          "On 6 September 2025, Tiger Partners was invited to participate in Rednote’s “Talk Show Week” Healing Talk Salon in Shanghai as a featured guest speaker. Centered on the theme of “tearing off disguises and labels,” the event explored authentic self-expression and emotional reconciliation amid the pressures of urban life. During the session, Tiger Partners shared reflections on his personal growth, everyday observations, and lived experiences in a relaxed yet candid manner. Although not a professional stand-up comedian, he engaged the audience through compelling and sincere storytelling, encouraging a dialogue on how to move beyond externally imposed roles and rediscover a more genuine and unburdened self. Warm and humorous in tone, the salon created a space for participants to release stress and connect through open, honest conversation.",
        ],
        ["2021.07.19", "The 29th Cross-Strait Youth Forum on Perspectives", "A forum for young legal professionals from both sides of the Taiwan Strait to discuss legal exchange and integrated development."],
      ];

  return items.map(([date, title, description], index) =>
    repeaterItem(`past-event-${index + 1}`, isZh ? `过往活动 ${index + 1}` : `Past event ${index + 1}`, [
      field("date", isZh ? "日期" : "Date", "text", date),
      field("title", isZh ? "标题" : "Title", "textarea", title),
      field("description", isZh ? "说明" : "Description", "textarea", description),
      field("image", isZh ? "图片" : "Image", "image", images[index] ?? ""),
      ...eventPlatformFields(index),
    ]),
  );
}

function mediaStatItems(language: Language) {
  const isZh = language === "zh";
  const labels = isZh ? ["B站", "小宇宙", "抖音", "小红书"] : ["Bilibili", "Xiaoyuzhou", "Douyin", "Xiaohongshu"];
  const values = ["325,000", "60,000", "158,000", "133,000"];
  const icons = [mediaLogo, mediaLogo3, mediaLogo1, mediaLogo2].map(assetSrc);

  return labels.map((label, index) =>
    repeaterItem(`media-stat-${index + 1}`, isZh ? `数据统计 ${index + 1}` : `Stat ${index + 1}`, [
      field("label", isZh ? "平台" : "Platform", "text", label),
      field("value", isZh ? "粉丝数量" : "Follower count", "text", values[index] ?? "0"),
      field("suffix", isZh ? "后缀" : "Suffix", "text", isZh ? "订阅" : "subscribers"),
      field("icon", isZh ? "图标" : "Icon", "image", icons[index] ?? ""),
    ]),
  );
}

function mediaAppearanceItems(language: Language) {
  const isZh = language === "zh";
  const platformLogo = (platform: string) => {
    if (platform.includes("小宇宙") || platform.includes("Xiaoyuzhou")) return assetSrc(programLogoXyz);
    if (platform.includes("抖音") || platform.includes("Douyin")) return assetSrc(programLogoDouyin);
    if (platform.includes("腾讯") || platform.includes("Tencent")) return assetSrc(programLogoTencent);
    if (platform.includes("优酷") || platform.includes("Youku")) return assetSrc(programLogoYouku);
    return assetSrc(programLogoBilibili);
  };
  const items = isZh
    ? [
        ["小宇宙播客", "《Slightly Open 191｜虎诉：颜值红利与颜值焦虑》", "2026.03.10", "https://www.xiaoyuzhoufm.com/episode/69b01b032d38299a03b2eaa1"],
        ["小宇宙播客", "《088.和虎诉聊天｜你缺的不是努力，是一股狠劲儿》", "2026.03.05", "https://www.xiaoyuzhoufm.com/episode/69a7bad666e2c303773817a7"],
        ["小宇宙播客", "《E58.虎诉：社会运行的显秘之学，从劳动者的法律处境说起》", "2026.01.27", "https://www.xiaoyuzhoufm.com/episode/69778ac2109824f9e1b5de95"],
        ["抖音", "《老板不知道的我·财富课》-第一桶金来自于？", "2025.12.26", "https://www.douyin.com/video/7585458307876293934"],
        ["抖音", "《老板不知道的我·财富课》-现在还有赚大钱的机会吗？", "2025.12.26", "https://www.douyin.com/video/7585465465460362547"],
        ["抖音", "《老板不知道的我·财富课》-什么样的员工最值得被投资？", "2025.12.26", "https://www.douyin.com/video/7585475165916532006"],
        ["腾讯视频", "《老板不知道的我·老友季2》-第8期", "2025.12.16", "https://v.qq.com/x/cover/mzc00200rtspg8d/r4101wiivba.html"],
        ["优酷视频", "《老板不知道的我·老友季2》-第8期", "2025.12.16", "https://v.youku.com/v_show/id_XNjUwODAxNzA2MA==.html"],
        ["腾讯视频", "《老板不知道的我·老友季2》-第8期加更彩蛋", "2025.12.16", "https://v.qq.com/x/cover/mzc00200rtspg8d/x41010bzaum.html"],
        ["优酷视频", "《老板不知道的我·老友季2》-第8期加更彩蛋", "2025.12.16", "https://v.youku.com/v_show/id_XNjUxNTcwMDYwOA==.html"],
        ["小宇宙播客", "《当闺蜜成为“职场拖油瓶”该怎么办 虎诉何运晨漆漆》", "2025.11.28", "https://www.xiaoyuzhoufm.com/episode/6929590aba2292550f32cb74"],
        ["小宇宙播客", "《职场友谊是毒药还是解药 何运晨漆漆虎诉》", "2025.11.25", "https://www.xiaoyuzhoufm.com/episode/69242b9418565034c38596cb"],
      ]
    : [
        ["Xiaoyuzhou Podcast", "Slightly Open 191 | Tiger Partners: The Beauty Advantage and Appearance Anxiety", "2026.03.10", "https://www.xiaoyuzhoufm.com/episode/69b01b032d38299a03b2eaa1"],
        ["Xiaoyuzhou Podcast", "088. A Conversation with Tiger Partners | What You Lack Is Not Effort, but Edge", "2026.03.05", "https://www.xiaoyuzhoufm.com/episode/69a7bad666e2c303773817a7"],
        ["Xiaoyuzhou Podcast", "E58. Tiger Partners: The Explicit and Hidden Logic of Society, Starting from the Legal Reality of Workers", "2026.01.27", "https://www.xiaoyuzhoufm.com/episode/69778ac2109824f9e1b5de95"],
        ["Douyin", "Where Does One's First Pot of Gold Come From?", "2025.12.26", "https://www.douyin.com/video/7585458307876293934"],
        ["Douyin", "Are There Still Opportunities to Make Big Money Nowadays?", "2025.12.26", "https://www.douyin.com/video/7585465465460362547"],
        ["Douyin", "What Kind of Employees Are Most Worth Investing In?", "2025.12.26", "https://www.douyin.com/video/7585475165916532006"],
        ["Tencent Video", "The Boss Doesn't Know Me · Season 2 – Episode 8", "2025.12.16", "https://v.qq.com/x/cover/mzc00200rtspg8d/r4101wiivba.html"],
        ["Youku Video", "The Boss Doesn't Know Me · Season 2 – Episode 8", "2025.12.16", "https://v.youku.com/v_show/id_XNjUwODAxNzA2MA==.html"],
        ["Tencent Video", "The Boss Doesn't Know Me · Season 2 – Episode 8 Bonus Clip", "2025.12.16", "https://v.qq.com/x/cover/mzc00200rtspg8d/x41010bzaum.html"],
        ["Youku Video", "The Boss Doesn't Know Me · Season 2 – Episode 8 Bonus Clip", "2025.12.16", "https://v.youku.com/v_show/id_XNjUxNTcwMDYwOA==.html"],
        ["Xiaoyuzhou Podcast", "When Your Best Friend Becomes Dead Weight at Work: What Should You Do?", "2025.11.28", "https://www.xiaoyuzhoufm.com/episode/6929590aba2292550f32cb74"],
        ["Xiaoyuzhou Podcast", "Are Workplace Friendships Poison or Cure?", "2025.11.25", "https://www.xiaoyuzhoufm.com/episode/69242b9418565034c38596cb"],
      ];

  return items.map(([platform, title, date, href], index) =>
    repeaterItem(`appearance-${index + 1}`, isZh ? `节目露出 ${index + 1}` : `Appearance ${index + 1}`, [
      field("platform", isZh ? "平台" : "Platform", "text", platform),
      field("title", isZh ? "标题" : "Title", "textarea", title),
      field("date", isZh ? "日期" : "Date", "text", date),
      field("href", isZh ? "链接" : "Link", "url", href),
      field("logo", "Logo", "image", platformLogo(platform)),
    ]),
  );
}

function mediaBusinessCooperationItems(language: Language) {
  const isZh = language === "zh";
  const logos = [
    businessLogo1,
    businessLogo2,
    businessLogo3,
    businessLogo4,
    businessLogo5,
    businessLogo6,
    businessLogo7,
    businessLogo8,
    businessLogo9,
    businessLogo10,
    businessLogo11,
    businessLogo12,
  ].map(assetSrc);

  return Array.from({ length: 12 }, (_, index) => {
    const itemNumber = index + 1;

    return repeaterItem(
      `business-cooperation-${itemNumber}`,
      isZh ? `商务合作 ${itemNumber}` : `Business cooperation ${itemNumber}`,
      [
        field("label", isZh ? "名称" : "Name", "text", isZh ? `合作方 ${itemNumber}` : `Partner ${itemNumber}`),
        field("icon", isZh ? "图标" : "Icon", "image", logos[index] ?? ""),
        field("href", isZh ? "链接" : "Link", "url", ""),
      ],
    );
  });
}

function podcastPlatformItems(language: Language) {
  const isZh = language === "zh";
  const items = [
    [
      "bilibili",
      "Bilibili",
      assetSrc(podcastLogo1),
      "https://space.bilibili.com/28756625/lists/4881575?type=season",
    ],
    [
      "xiaoyuzhou",
      isZh ? "小宇宙" : "Xiaoyuzhou",
      assetSrc(podcastLogo2),
      "https://www.xiaoyuzhoufm.com/podcast/67beafe26f6f1f20d22d69e4",
    ],
    ["youtube", "YouTube", assetSrc(podcastLogo3), "https://www.youtube.com/@Tiger PartnersLiu-s9u"],
    ["apple-podcasts", "Apple Podcasts", assetSrc(podcastLogo4), "https://podcasts.apple.com/cn/podcast/tiger-legal-talks/id1888723086"],
  ];

  return items.map(([id, label, icon, href], index) =>
    repeaterItem(`podcast-platform-${id}`, isZh ? `平台链接 ${index + 1}` : `Platform link ${index + 1}`, [
      field("label", isZh ? "名称" : "Name", "text", label),
      field("icon", isZh ? "图标" : "Icon", "image", icon),
      field("href", isZh ? "站外链接" : "External link", "url", href),
    ]),
  );
}

function podcastSpecialItems(language: Language) {
  const isZh = language === "zh";
  const defaultHref = "https://www.bilibili.com/video/BV1HmcMzjEai/?spm_id_from=333.1387.upload.video_card.click&vd_source=f70496417dad601b9801b3cfa6558ce0";
  const images = [specialImage3, specialImage1, specialImage2, specialImage4, specialImage5, specialImage6, specialImage7].map(assetSrc);

  return Array.from({ length: 7 }, (_, index) => {
    const itemNumber = index + 1;

    return repeaterItem(`special-edition-${itemNumber}`, isZh ? `Special Edition ${itemNumber}` : `Special Edition ${itemNumber}`, [
      field("title", isZh ? "标题" : "Title", "text", isZh ? `Special Edition 封面 ${itemNumber}` : `Special Edition cover ${itemNumber}`),
      field("image", isZh ? "图片" : "Image", "image", images[index] ?? ""),
      field("alt", isZh ? "图片描述" : "Image alt", "text", isZh ? `Special Edition 封面 ${itemNumber}` : `Special Edition cover ${itemNumber}`),
      field("href", isZh ? "站外链接" : "External link", "url", defaultHref),
    ]);
  });
}

function contactFollowItems(language: Language) {
  const isZh = language === "zh";
  const icons = [contactLogo1, contactLogo2, contactLogo3].map(assetSrc);
  const items = [
    [
      "linkedin",
      "LinkedIn",
      "https://www.linkedin.com/in/yuxuan-liu-a7636a44?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    ],
    ["bilibili", "Bilibili", "https://b23.tv/mbZEgBg"],
    ["xiaohongshu", isZh ? "小红书" : "Xiaohongshu", "https://xhslink.com/m/EgtHVE7Wxj"],
  ];

  return items.map(([id, label, href], index) =>
    repeaterItem(`contact-follow-${id}`, isZh ? `关注链接 ${index + 1}` : `Follow link ${index + 1}`, [
      field("label", isZh ? "名称" : "Name", "text", label),
      field("icon", isZh ? "图标" : "Icon", "image", icons[index] ?? ""),
      field("href", isZh ? "站外链接" : "External link", "url", href),
    ]),
  );
}

function homeCaseItems(language: Language) {
  return landingCasesData.map((caseItem, index) => {
    const itemNumber = index + 1;

    return repeaterItem(caseItem.id, `Case ${itemNumber}`, [
      field("category", `Case ${itemNumber} category`, "text", caseItem.category[language]),
      field("date", `Case ${itemNumber} date`, "text", caseItem.date[language]),
      field("title", `Case ${itemNumber} title`, "textarea", caseItem.name[language]),
      field("keywords", `Case ${itemNumber} keywords`, "textarea", caseItem.keywords[language].join("\n")),
      field("description", `Case ${itemNumber} description`, "textarea", caseItem.description[language]),
    ]);
  });
}

function homeProgramItems(language: Language) {
  const isZh = language === "zh";
  const items = isZh
    ? [
        ["2025-09-03", "@蜉蝣天地", "虎诉：赢家的饥饿、欲望与黑暗原力", "https://www.bilibili.com/video/BV1RDazzYEP9/?spm_id_from=333.1391.0.0"],
        ["2025-03-14", "@全嘻嘻", "传播焦虑第一人又来了", "https://www.bilibili.com/video/BV1noQgYKEmb/?spm_id_from=333.1387.upload.video_card.click"],
        ["2025-11-18", "《老板不知道的我·专业分享》", "节目秉持“直接谈”理念，", "https://v.qq.com/x/cover/mzc00200rtspg8d/p41012g4fm3.html"],
        ["2025-08-08", "@虎诉", "作为reaction领域代表人物，", "https://www.bilibili.com/video/BV18vt1zPEsi/?spm_id_from=333.1387.upload.video_card.click"],
        ["", "@思远的南阁子", "你可能是个后期英雄", "https://b23.tv/NchQcXX"],
        ["", "@王一快", "职场饭局生存法则", "https://b23.tv/PLUGnDl"],
        ["2023", "@虎诉", "2023年受邀参与《蔚来说》", "https://b23.tv/HBtcPdq"],
        ["", "@老蒋巨靠谱", "虎诉：我的成人礼发生在小学三年级", "https://b23.tv/kubID0p"],
      ]
    : [
        ["2025-09-03", "@蜉蝣天地", "Tiger Partners: The Hunger, Desire and Dark Force", "https://www.bilibili.com/video/BV1RDazzYEP9/?spm_id_from=333.1391.0.0"],
        ["2025-03-14", "@全嘻嘻", "The King of Spreading Anxiety is back.", "https://www.bilibili.com/video/BV1noQgYKEmb/?spm_id_from=333.1387.upload.video_card.click"],
        ["2025-11-18", "The Boss Doesn't Know Me · Podcast Special", "Guided by the philosophy of \"speak plainly and directly\",", "https://v.qq.com/x/cover/mzc00200rtspg8d/p41012g4fm3.html"],
        ["2025-08-08", "@虎诉", "As a leading figure in the reaction content field,", "https://www.bilibili.com/video/BV18vt1zPEsi/?spm_id_from=333.1387.upload.video_card.click"],
        ["", "@思远的南阁子", "You might be a late-game hero,", "https://b23.tv/NchQcXX"],
        ["", "@王一快", "Survival Rules for Workplace Dinners", "https://b23.tv/PLUGnDl"],
        ["2023", "@虎诉", "Invited to participate in the official interview", "https://b23.tv/HBtcPdq"],
        ["", "@老蒋巨靠谱", "My Coming-of-Age Happened in the Third Grade", "https://b23.tv/kubID0p"],
      ];

  return items.map(([date, tag, title, href], index) => {
    const itemNumber = index + 1;

    return repeaterItem(`program-${itemNumber}`, `Program ${itemNumber}`, [
      field("image", `Program ${itemNumber} image`, "image", homeCmsAssets.programImages[index] ?? ""),
      field("title", `Program ${itemNumber} title`, "text", title),
      field("date", `Program ${itemNumber} date`, "text", date),
      field("tag", `Program ${itemNumber} tag`, "text", tag),
      field("href", `Program ${itemNumber} link`, "url", href),
    ]);
  });
}

function enrichHomePageContent(pageContentPage: PageContentPage, language: Language): PageContentPage {
  const isZh = language === "zh";
  const profileTitleFields = isZh
    ? [
        field("titleLine1", "人物介绍标题第一行", "text", "亚太地区极具影响力的"),
        field("titleLine2", "人物介绍标题第二行", "text", "法律媒体意见领袖"),
        field("titleLine3", "人物介绍标题第三行", "text", "之一"),
        field("titleLine4", "人物介绍标题第四行", "text", ""),
      ]
    : [
        field("titleLine1", "Profile title line 1", "text", "One of the most"),
        field("titleLine2", "Profile title line 2", "text", "influential commercial"),
        field("titleLine3", "Profile title line 3", "text", "dispute resolution"),
        field("titleLine4", "Profile title line 4", "text", "lawyers in Asia."),
      ];
  const casesSection = section(
    "cases",
    isZh ? "Representative Cases 屏" : "Representative Cases",
    [
      field("title", isZh ? "标题" : "Title", "text", isZh ? "代表性案例" : "Representative Cases"),
      field(
        "subtitle",
        isZh ? "副标题" : "Subtitle",
        "textarea",
        isZh
          ? "专注高价值复杂商事争议与国际仲裁"
          : "High-value, complex disputes before leading courts and arbitral institutions in China.",
      ),
    ],
    homeCaseItems(language),
  );
  const courseImageFields = [
    field("course1Image", isZh ? "课程一封面" : "Course 1 cover", "image", homeCmsAssets.course1Image),
    field("course2Image", isZh ? "课程二封面" : "Course 2 cover", "image", homeCmsAssets.course2Image),
  ];
  const nextSections = pageContentPage.sections.map((sectionItem) => {
    if (sectionItem.id === "hero") {
      return {
        ...sectionItem,
        fields: withFieldDefaults(sectionItem.fields, { portraitImage: homeCmsAssets.portraitImage }),
      };
    }

    if (sectionItem.id === "profile") {
      return {
        ...sectionItem,
        fields: [
          ...profileTitleFields,
          ...sectionItem.fields.filter(
            (fieldItem) =>
              fieldItem.id !== "title" && !profileTitleFields.some((titleField) => titleField.id === fieldItem.id),
          ),
        ],
      };
    }

    if (sectionItem.id === "beyond") {
      return {
        ...sectionItem,
        fields: withFieldDefaults(sectionItem.fields, { image: homeCmsAssets.beyondImage }),
      };
    }

    if (sectionItem.id === "program") {
      return {
        ...sectionItem,
        items: sectionItem.items ?? homeProgramItems(language),
      };
    }

    if (sectionItem.id === "courses") {
      return {
        ...sectionItem,
        fields: withExtraFields(sectionItem.fields, courseImageFields),
      };
    }

    return sectionItem;
  });
  const profileIndex = nextSections.findIndex((sectionItem) => sectionItem.id === "profile");
  const hasCasesSection = nextSections.some((sectionItem) => sectionItem.id === "cases");

  if (!hasCasesSection) {
    nextSections.splice(profileIndex >= 0 ? profileIndex + 1 : nextSections.length, 0, casesSection);
  }

  return {
    ...pageContentPage,
    sections: nextSections,
  };
}

const normalizedZhPages: PageContentLocale = {
  ...zhPages,
  home: enrichHomePageContent(zhPages.home, "zh"),
};

const normalizedEnPages: PageContentLocale = {
  ...enPages,
  home: enrichHomePageContent(enPages.home, "en"),
};

const pageHeroMediaDefaults: Partial<Record<CmsPageId, Record<string, string>>> = {
  about: { portraitImage: assetSrc(aboutHeroImage) },
  awards: { heroImage: assetSrc(awardHeroImage) },
  event: { heroImage: assetSrc(eventHeroImage) },
  media: { heroImage: assetSrc(mediaHeroImage) },
  podcast: { heroImage: assetSrc(podcastHeroImage) },
  contact: { heroImage: assetSrc(contactHeroImage) },
};

function reorderPodcastSections(sections: PageContentSection[]) {
  const order = new Map(["hero", "platforms", "intro", "special"].map((id, index) => [id, index]));

  return [...sections].sort((a, b) => (order.get(a.id) ?? 100) - (order.get(b.id) ?? 100));
}

function enrichCmsEditableFields(pages: PageContentLocale, language: Language): PageContentLocale {
  const isZh = language === "zh";
  const sectionExtras: Partial<Record<CmsPageId, Record<string, PageContentField[]>>> = {
    about: {
      individualRecognition: [
        field("imageOverlayLine1", isZh ? "荣誉图片上方文字第一行" : "Recognition image overlay line 1", "text", isZh ? "RECOGNITION VALIDATES EXCELLENCE" : "RECOGNITION VALIDATES EXCELLENCE"),
        field("imageOverlayLine2", isZh ? "荣誉图片上方文字第二行" : "Recognition image overlay line 2", "text", isZh ? "AND INSPIRES CONTINUOUS PURSUIT" : "AND INSPIRES CONTINUOUS PURSUIT"),
      ],
    },
    awards: {
      individualAwards: [
        field("viewMoreLabel", isZh ? "View more 文案" : "View more label", "text", isZh ? "查看更多" : "VIEW MORE"),
        field("viewLessLabel", isZh ? "Collapse 文案" : "Collapse label", "text", isZh ? "收起" : "COLLAPSE"),
      ],
      lawFirmAwards: [
        field("viewMoreLabel", isZh ? "View more 文案" : "View more label", "text", isZh ? "查看更多" : "VIEW MORE"),
        field("viewLessLabel", isZh ? "Collapse 文案" : "Collapse label", "text", isZh ? "收起" : "COLLAPSE"),
      ],
      socialAwards: [
        field("viewMoreLabel", isZh ? "View more 文案" : "View more label", "text", isZh ? "查看更多" : "VIEW MORE"),
      ],
    },
    event: {
      schedule: [
        field("viewLiveLabel", isZh ? "View live 文案" : "View live label", "text", isZh ? "观看视频" : "VIEW LIVE"),
      ],
    },
    media: {
      appearances: [
        field("viewMoreLabel", isZh ? "View more 文案" : "View more label", "text", isZh ? "查看更多" : "VIEW MORE"),
        field("viewLessLabel", isZh ? "Collapse 文案" : "Collapse label", "text", isZh ? "收起" : "COLLAPSE"),
      ],
    },
    podcast: {
      intro: [
        field("logoImage", isZh ? "介绍 Logo 图片" : "Intro logo image", "image", assetSrc(podcastLogo5)),
        field("coverImage", isZh ? "介绍封面图片" : "Intro cover image", "image", assetSrc(podcastLogo6)),
      ],
      special: [
        field("viewMoreLabel", isZh ? "View more 文案" : "View more label", "text", isZh ? "查看更多" : "VIEW MORE"),
        field(
          "viewMoreHref",
          isZh ? "View more 站外链接" : "View more external link",
          "url",
          "https://www.bilibili.com/video/BV1HmcMzjEai/?spm_id_from=333.1387.upload.video_card.click&vd_source=f70496417dad601b9801b3cfa6558ce0",
        ),
      ],
    },
  };

  return Object.fromEntries(
    Object.entries(pages).map(([pageId, pageContentPage]) => {
      const extrasBySection = sectionExtras[pageId as CmsPageId] ?? {};
      const sections = pageContentPage.sections.map((sectionItem) => {
        const extras = extrasBySection[sectionItem.id];

        return extras ? { ...sectionItem, fields: withExtraFields(sectionItem.fields, extras) } : sectionItem;
      });

      return [
        pageId,
        {
          ...pageContentPage,
          sections: pageId === "podcast" ? reorderPodcastSections(sections) : sections,
        },
      ];
    }),
  ) as PageContentLocale;
}

function enrichPageHeroMediaDefaults(pages: PageContentLocale): PageContentLocale {
  return Object.fromEntries(
    Object.entries(pages).map(([pageId, pageContentPage]) => {
      const heroDefaults = pageHeroMediaDefaults[pageId as CmsPageId];

      if (!heroDefaults) {
        return [pageId, pageContentPage];
      }

      return [
        pageId,
        {
          ...pageContentPage,
          sections: pageContentPage.sections.map((sectionItem) =>
            sectionItem.id === "hero"
              ? { ...sectionItem, fields: withFieldDefaults(sectionItem.fields, heroDefaults) }
              : sectionItem,
          ),
        },
      ];
    }),
  ) as PageContentLocale;
}

const defaultPageContentStateSource: PageContentState = {
  zh: enrichPageHeroMediaDefaults(enrichCmsEditableFields(normalizedZhPages, "zh")),
  en: enrichPageHeroMediaDefaults(enrichCmsEditableFields(normalizedEnPages, "en")),
  updatedAt: new Date("2026-05-01T00:00:00.000Z").toISOString(),
};

const uppercaseEnglishTitleFieldIds = new Set([
  "award",
  "brand",
  "category",
  "eyebrow",
  "firm",
  "name",
  "primary",
  "role",
  "secondary",
]);

function uppercaseCmsVisibleText(value: string) {
  return value
    .split(/(\[color=[^\]]+\]|\[\/color\])/gi)
    .map((part) => (part.startsWith("[") ? part : part.toUpperCase()))
    .join("");
}

function shouldUppercaseEnglishTitleField(language: Language, fieldId: string) {
  if (language !== "en") {
    return false;
  }

  const normalizedFieldId = fieldId.toLowerCase();
  return normalizedFieldId.includes("title") || uppercaseEnglishTitleFieldIds.has(normalizedFieldId);
}

function normalizePageContentTitleFieldValue(value: string, language: Language, fieldId: string) {
  return shouldUppercaseEnglishTitleField(language, fieldId) ? uppercaseCmsVisibleText(value) : value;
}

function normalizePageContentLocaleTitleCasing(locale: PageContentLocale, language: Language): PageContentLocale {
  if (language !== "en") {
    return locale;
  }

  return Object.fromEntries(
    Object.entries(locale).map(([pageId, pageContentPage]) => [
      pageId,
      {
        ...pageContentPage,
        sections: pageContentPage.sections.map((sectionItem) => ({
          ...sectionItem,
          fields: sectionItem.fields.map((fieldItem) => ({
            ...fieldItem,
            value: normalizePageContentTitleFieldValue(fieldItem.value, language, fieldItem.id),
          })),
          items: sectionItem.items?.map((item) => ({
            ...item,
            fields: item.fields.map((fieldItem) => ({
              ...fieldItem,
              value: normalizePageContentTitleFieldValue(fieldItem.value, language, fieldItem.id),
            })),
          })),
        })),
      },
    ]),
  ) as PageContentLocale;
}

export function normalizePageContentTitleCasing(pageContent: PageContentState): PageContentState {
  return {
    ...pageContent,
    en: normalizePageContentLocaleTitleCasing(pageContent.en, "en"),
  };
}

function officialPageContentLocale(language: Language): PageContentLocale {
  const isZh = language === "zh";
  const t = {
    home: isZh ? "首页" : "Home",
    about: isZh ? "关于我们" : "About Us",
    honors: isZh ? "虎诉荣誉" : "Honors",
    events: isZh ? "虎诉动态" : "Events",
    industries: isZh ? "服务行业" : "Industries",
    team: isZh ? "虎诉团队" : "Our Team",
    contact: isZh ? "联系我们" : "Contact",
  };

  return {
    home: page("home", t.home, "/", "HomePage", [
      section("hero", isZh ? "首页首屏" : "Hero", [
        field("title", isZh ? "主标题" : "Title", "text", "WE KNOW HOW TO WIN"),
        field("video", isZh ? "背景视频" : "Background video", "url", "/assets/home/海浪0508.mp4"),
      ]),
      section("vision", isZh ? "愿景" : "Vision", [
        field("title", isZh ? "标题" : "Title", "text", isZh ? "虎诉愿景" : "Vision"),
        field(
          "body",
          isZh ? "正文" : "Body",
          "textarea",
          isZh
            ? "我们致力于成为亚太地区卓越的争议解决律师事务所之一。"
            : "We are committed to be one of the extraordinary dispute resolution law firms in the Asia Pacific Region.",
        ),
        field("ctaLabel", isZh ? "按钮文字" : "CTA label", "text", isZh ? "了解更多" : "GET TO KNOW US"),
        field("ctaHref", isZh ? "按钮链接" : "CTA link", "url", "/about"),
      ]),
      section("industries", isZh ? "服务行业" : "Industries", [
        field("title", isZh ? "标题" : "Title", "text", isZh ? "服务行业" : "INDUSTRIES & SERVICES"),
        field(
          "body",
          isZh ? "说明" : "Description",
          "textarea",
          isZh
            ? "虎诉能够结合行业特征提供有针对性的法律服务，覆盖争议解决、合规、民刑交叉及公司法律咨询等。"
            : "Tiger Partners offers targeted legal services based on industry characteristics, covering dispute resolution, compliance, civil-criminal crossover matters, and corporate legal consulting.",
        ),
      ]),
      section("events", isZh ? "虎诉动态" : "Events", [
        field("title", isZh ? "标题" : "Title", "text", isZh ? "虎诉动态" : "EVENTS"),
        field("subtitle", isZh ? "说明" : "Subtitle", "textarea", isZh ? "关注虎诉最新动态与专业观察。" : "Latest Tiger Partners updates and professional insights."),
      ]),
      section("clients", isZh ? "客户" : "Clients", [
        field("title", isZh ? "标题" : "Title", "text", isZh ? "我们的客户" : "OUR CLIENTS"),
      ]),
    ]),
    about: page("about", t.about, "/about", "AboutPage", [
      section("hero", isZh ? "首屏" : "Hero", [
        field("title", isZh ? "标题" : "Title", "text", isZh ? "关于我们" : "ABOUT US"),
        field(
          "body",
          isZh ? "正文" : "Body",
          "textarea",
          isZh
            ? "虎诉是一家专注于重大、复杂民商事争议解决的精品律师事务所。"
            : "Tiger Partners is a boutique law firm focused on major and complex civil and commercial dispute resolution.",
        ),
      ]),
      section("vision", isZh ? "愿景" : "Vision", [
        field("title", isZh ? "标题" : "Title", "text", isZh ? "虎诉愿景" : "VISION"),
        field("body", isZh ? "正文" : "Body", "textarea", isZh ? "我们追求卓越，致力于维护客户的合法权益。" : "We pursue excellence and are committed to protecting clients' lawful rights and interests."),
      ]),
      section("honors", isZh ? "虎诉荣誉" : "Honors", [
        field("title", isZh ? "标题" : "Title", "text", isZh ? "虎诉荣誉" : "HONORS"),
      ]),
      section("culture", isZh ? "虎诉文化" : "Culture", [
        field("title", isZh ? "标题" : "Title", "text", isZh ? "虎诉文化" : "CULTURE"),
      ]),
      section("chronicle", isZh ? "大事记" : "Chronicle", [
        field("title", isZh ? "标题" : "Title", "text", isZh ? "大事记" : "CHRONICLE"),
      ]),
    ]),
    awards: page("awards", t.honors, "/about#honors", "AboutPage", [
      section("honors", isZh ? "虎诉荣誉" : "Honors", [
        field("title", isZh ? "标题" : "Title", "text", isZh ? "虎诉荣誉" : "HONORS"),
        field("subtitle", isZh ? "说明" : "Subtitle", "textarea", isZh ? "虎诉受到多个权威法律评级机构与奖项组织的认可。" : "Tiger Partners is recognized by leading legal directories and awarding organizations."),
      ]),
    ]),
    event: page("event", t.events, "/events", "EventsPage", [
      section("hero", isZh ? "首屏" : "Hero", [
        field("title", isZh ? "标题" : "Title", "text", isZh ? "虎诉动态" : "EVENTS"),
      ]),
      section("list", isZh ? "动态列表" : "Event list", [
        field("title", isZh ? "标题" : "Title", "text", isZh ? "最新动态" : "Latest Updates"),
      ]),
    ]),
    media: page("media", t.industries, "/industries", "IndustriesPage", [
      section("hero", isZh ? "首屏" : "Hero", [
        field("title", isZh ? "标题" : "Title", "text", isZh ? "服务行业" : "INDUSTRIES"),
        field("body", isZh ? "说明" : "Description", "textarea", isZh ? "我们在重点行业提供专业、精准、高效的法律服务。" : "We provide professional, precise, and efficient legal services across key industries."),
      ]),
      section("cards", isZh ? "行业卡片" : "Industry cards", [], [
        repeaterItem("private-equity", isZh ? "私募股权" : "Private Equity", [
          field("title", isZh ? "标题" : "Title", "text", isZh ? "私募股权" : "Private Equity"),
          field("href", isZh ? "链接" : "Link", "url", "/industries/private-equity"),
        ]),
        repeaterItem("finance", isZh ? "金融" : "Finance", [
          field("title", isZh ? "标题" : "Title", "text", isZh ? "金融" : "Finance"),
          field("href", isZh ? "链接" : "Link", "url", "/industries/finance"),
        ]),
        repeaterItem("real-estate", isZh ? "房地产" : "Real Estate", [
          field("title", isZh ? "标题" : "Title", "text", isZh ? "房地产" : "Real Estate"),
          field("href", isZh ? "链接" : "Link", "url", "/industries/real-estate"),
        ]),
      ]),
    ]),
    podcast: page("podcast", t.team, "/team", "TeamPage", [
      section("hero", isZh ? "首屏" : "Hero", [
        field("title", isZh ? "标题" : "Title", "text", isZh ? "虎诉团队" : "OUR TEAM"),
      ]),
      section("specialForces", isZh ? "团队口号" : "Team slogan", [
        field("title", isZh ? "标题" : "Title", "text", isZh ? "我们，即为精锐之师" : "WE ARE SPECIAL FORCES"),
      ]),
      section("members", isZh ? "团队成员" : "Members", [
        field("title", isZh ? "标题" : "Title", "text", isZh ? "合伙人及顾问" : "PARTNERS & COUNSELS"),
      ]),
    ]),
    contact: page("contact", t.contact, "/contact", "ContactPage", [
      section("hero", isZh ? "首屏" : "Hero", [
        field("title", isZh ? "标题" : "Title", "text", isZh ? "联系我们" : "CONTACT"),
      ]),
      section("contact", isZh ? "联系文案" : "Contact copy", [
        field("title", isZh ? "标题" : "Title", "text", isZh ? "联系我们" : "Contact us"),
        field(
          "body",
          isZh ? "正文" : "Body",
          "textarea",
          isZh
            ? "如您有任何法律疑问或争议，欢迎随时与我们联系。我们诚挚期待为您提供专业的法律服务，致力于维护您的合法权益。"
            : "If you have any legal questions or disputes, please feel free to contact us. We look forward to providing professional legal services and protecting your lawful rights and interests.",
        ),
      ]),
      section("join", isZh ? "加入虎诉" : "Join us", [
        field("title", isZh ? "标题" : "Title", "text", isZh ? "加入虎诉" : "Join Us"),
      ]),
    ]),
  };
}

const officialDefaultPageContentState: PageContentState = {
  zh: officialPageContentLocale("zh"),
  en: officialPageContentLocale("en"),
  updatedAt: new Date("2026-05-10T13:55:00.000Z").toISOString(),
};

export const defaultPageContentState: PageContentState = officialDefaultPageContentState;

export function getPageContentField(
  pageContent: PageContentState,
  language: Language,
  pageId: CmsPageId,
  sectionId: string,
  fieldId: string,
  fallback = "",
) {
  const fieldValue = pageContent[language]?.[pageId]?.sections
    .find((sectionItem) => sectionItem.id === sectionId)
    ?.fields.find((fieldItem) => fieldItem.id === fieldId)?.value;

  return fieldValue === undefined || fieldValue === "" ? fallback : fieldValue;
}

export function getPageContentSectionItems(
  pageContent: PageContentState,
  language: Language,
  pageId: CmsPageId,
  sectionId: string,
) {
  return pageContent[language]?.[pageId]?.sections.find((sectionItem) => sectionItem.id === sectionId)?.items ?? [];
}

export function getPageContentItemField(
  item: PageContentRepeaterItem | undefined,
  fieldId: string,
  fallback = "",
) {
  const value = item?.fields.find((fieldItem) => fieldItem.id === fieldId)?.value;
  return value === undefined || value === "" ? fallback : value;
}

export function pageContentItemFieldKey(sectionId: string, itemId: string, fieldId: string) {
  return `${sectionId}__items__${itemId}__${fieldId}`;
}

export function getPageContentLines(
  pageContent: PageContentState,
  language: Language,
  pageId: CmsPageId,
  sectionId: string,
  fieldIds: readonly string[],
  fallback: readonly string[],
) {
  const lines = fieldIds
    .map((fieldId, index) => getPageContentField(pageContent, language, pageId, sectionId, fieldId, fallback[index] ?? ""))
    .filter((line) => line.trim().length > 0);

  return lines.length > 0 ? lines : [...fallback];
}

export function splitPageContentParagraphs(value: string, fallback: readonly string[]) {
  const paragraphs = value
    .split(/\n{1,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return paragraphs.length > 0 ? paragraphs : [...fallback];
}
