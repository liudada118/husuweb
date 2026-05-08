import { createContext, useContext, useState } from "react";
import { ExternalLink, Play, Mic } from "lucide-react";
import { FeaturesSection } from "./components/FeaturesSection";
import { TestimonialCarousel } from "./components/TestimonialCarousel";
import { HeroSection } from "./components/HeroSection";

const LAWYER_PORTRAIT =
  "https://images.unsplash.com/photo-1676694047699-22a84420e566?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBsYXd5ZXIlMjBwb3J0cmFpdCUyMHN1aXR8ZW58MXx8fHwxNzc1OTc0ODA1fDA&ixlib=rb-4.1.0&q=80&w=1080";

// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
  bgPrimary:  "#161915",
  bgSection:  "#191C18",
  bgCard:     "#1F2320",
  textPrimary: "#FFFFFF",
  textBody:   "rgba(255,255,255,0.70)",
  textMuted:  "rgba(255,255,255,0.42)",
  border:     "rgba(255,255,255,0.07)",
  divider:    "rgba(255,255,255,0.09)",
};

const GRADIENT = "linear-gradient(120deg, #D4C254 0%, #6B8E4E 100%)";
const FONT     = "'Akshar', sans-serif";

// ─── Reusable style helpers ───────────────────────────────────────────────────
const gradientText: React.CSSProperties = {
  background: GRADIENT,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

// Outlined CTA button (black bg, white text, dark-grey border)
function OutlineBtn({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <button
      style={{
        background: "#000",
        color: C.textPrimary,
        border: "1px solid #333",
        borderRadius: "10px",
        padding: "12px 24px",
        fontSize: "15px",
        fontWeight: 500,
        fontFamily: FONT,
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: "7px",
        letterSpacing: "0.03em",
        transition: "border-color 0.2s, background 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#6B8E4E";
        e.currentTarget.style.background = "#0d0f0d";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#333";
        e.currentTarget.style.background = "#000";
      }}
    >
      {children}
      {icon}
    </button>
  );
}

// ─── Translations ─────────────────────────────────────────────────────────────
const T = {
  en: {
    logo: "TIGER · LAW",
    nav: ["Home", "About", "Awards", "Cases", "Media", "Contact"],
    activeNav: "Awards",
    langToggle: "中文",
    hero: {
      label: "AWARDS",
      title: ["Recognized for Excellence", "in Law & Media"],
      desc: "A collection of professional honors recognizing achievements in legal practice, digital content creation, and public legal education.",
    },
    legal: {
      sectionLabel: "SECTION",
      title: "Legal Awards",
      cardTitle: "Award Title",
      link: "View Awarding Institution",
      imagePlaceholder: "Award Image",
    },
    newMedia: {
      sectionLabel: "NEW MEDIA",
      title: "New Media Awards",
      bilibili: {
        title: "Bilibili Awards",
        caption: "@tigerlaw",
        meta: "Award · 2025",
        cards: [
          "Ten Thousand Followers Plaque",
          "Ten Thousand Charging Supporters Plaque",
          "2025 Knowledge Content Creator of the Year",
          "2025 Outstanding Lecturer of the Year",
        ],
      },
      podcast: {
        title: "Xiaoyuzhou Podcast Awards",
        caption: "Podcast Platform",
        meta: "Podcast Award · 2025",
        cards: [
          "2025 \u201cStories from Daxuange\u2019s Live Room\u201d \u2013 Ten Thousand Subscribers Plaque",
          "2025 \u201cTiger Legal Talks\u201d \u2013 Thirty Thousand Subscribers Plaque",
        ],
      },
    },
    tiger: {
      sectionLabel: "LITIGATION",
      title: "Tiger Awards",
      cardTitle: "Tiger Award Title",
      link: "View Awarding Institution",
    },
    footer: {
      logo: "TIGER · LAW",
      copy: "\u00a9 2025 Tiger Law Firm. All rights reserved.",
      info: "Licensed Law Firm \u00b7 Legal Practice \u00b7 Digital Legal Education",
    },
  },
  zh: {
    logo: "虎哥 · 律法",
    nav: ["首页", "关于", "荣誉", "案例", "媒体", "联系"],
    activeNav: "荣誉",
    langToggle: "EN",
    hero: {
      label: "荣誉奖项",
      title: ["专业卓越·双重认可", "法律执业与新媒体"],
      desc: "汇集法律执业、数字内容创作及公众法律教育等领域的专业荣誉，见证每一份努力与成就。",
    },
    legal: {
      sectionLabel: "法律板块",
      title: "法律奖项",
      cardTitle: "奖项名称",
      link: "查看颁奖机构",
      imagePlaceholder: "奖项图片",
    },
    newMedia: {
      sectionLabel: "新媒体",
      title: "新媒体奖项",
      bilibili: {
        title: "哔哩哔哩奖项",
        caption: "@虎哥说法",
        meta: "奖项 · 2025",
        cards: [
          "粉丝破万纪念牌",
          "充电破万纪念牌",
          "2025年度知识内容创作者",
          "2025年度优秀讲师",
        ],
      },
      podcast: {
        title: "小宇宙播客奖项",
        caption: "播客平台",
        meta: "播客奖项 · 2025",
        cards: [
          "2025《大炫阁直播间的故事》—— 破万订阅纪念牌",
          "2025《虎哥说法》—— 破三万订阅纪念牌",
        ],
      },
    },
    tiger: {
      sectionLabel: "诉讼",
      title: "虎哥奖项",
      cardTitle: "虎哥奖项名称",
      link: "查看颁奖机构",
    },
    footer: {
      logo: "虎哥 · 律法",
      copy: "© 2025 虎哥律师事务所  版权所有",
      info: "持牌律师事务所 · 法律执业 · 公众法律教育",
    },
  },
};

type Lang = "en" | "zh";
type Translations = typeof T.en;

// ─── Language Context ─────────────────────────────────────────────────────────
const LangContext = createContext<{ lang: Lang; t: Translations; toggle: () => void }>({
  lang: "en",
  t: T.en,
  toggle: () => {},
});
const useLang = () => useContext(LangContext);

// ─── Language Toggle ──────────────────────────────────────────────────────────
function LangToggle() {
  const { t, toggle } = useLang();
  return (
    <button
      onClick={toggle}
      style={{
        background: "#000",
        color: C.textPrimary,
        border: "1px solid #333",
        borderRadius: "8px",
        padding: "5px 14px",
        fontSize: "12px",
        letterSpacing: "0.12em",
        fontFamily: FONT,
        fontWeight: 500,
        cursor: "pointer",
        transition: "border-color 0.2s, background 0.2s",
        minWidth: "48px",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#6B8E4E";
        e.currentTarget.style.background = "#0d0f0d";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#333";
        e.currentTarget.style.background = "#000";
      }}
    >
      {t.langToggle}
    </button>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────
function Header() {
  const { t } = useLang();
  return (
    <header
      style={{
        background: C.bgPrimary,
        borderBottom: `1px solid ${C.divider}`,
        fontFamily: FONT,
      }}
      className="fixed top-0 left-0 right-0 z-50 h-20 flex items-center"
    >
      <div className="w-full max-w-[1440px] mx-auto px-16 flex items-center justify-between">
        {/* Logo */}
        <span
          style={{ ...gradientText, fontSize: "22px", fontWeight: 700, letterSpacing: "0.06em" }}
        >
          {t.logo}
        </span>

        {/* Nav + Lang */}
        <div className="flex items-center gap-8">
          <nav className="flex items-center gap-8">
            {t.nav.map((item) => {
              const active = item === t.activeNav;
              return (
                <a
                  key={item}
                  href="#"
                  style={{
                    fontFamily: FONT,
                    fontSize: "13px",
                    fontWeight: 500,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    ...(active
                      ? { ...gradientText, borderBottom: "1px solid #6B8E4E", paddingBottom: "2px" }
                      : { color: C.textMuted }),
                  }}
                  className="transition-opacity hover:opacity-80"
                >
                  {item}
                </a>
              );
            })}
          </nav>
          <div style={{ width: "1px", height: "18px", background: C.divider }} />
          <LangToggle />
        </div>
      </div>
    </header>
  );
}

// ─── Section Label ────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        ...gradientText,
        fontSize: "11px",
        fontWeight: 600,
        letterSpacing: "0.24em",
        textTransform: "uppercase",
        fontFamily: FONT,
      }}
    >
      {children}
    </span>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="flex flex-col gap-3">
      <SectionLabel>{label}</SectionLabel>
      <h2
        style={{
          color: C.textPrimary,
          fontSize: "36px",
          fontWeight: 700,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          fontFamily: FONT,
        }}
      >
        {title}
      </h2>
      {/* gradient underline */}
      <div style={{ width: "60px", height: "2px", backgroundImage: GRADIENT, borderRadius: "2px" }} />
    </div>
  );
}

// ─── Sub-section header ───────────────────────────────────────────────────────
function SubSectionHeader({ title, caption }: { title: string; caption?: string }) {
  return (
    <div
      style={{ borderBottom: `1px solid ${C.divider}`, paddingBottom: "16px" }}
      className="flex items-center justify-between"
    >
      <span
        style={{ ...gradientText, fontSize: "17px", fontWeight: 600, letterSpacing: "0.02em", fontFamily: FONT }}
      >
        {title}
      </span>
      {caption && (
        <span style={{ color: C.textMuted, fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: FONT }}>
          {caption}
        </span>
      )}
    </div>
  );
}

// ─── Award Card ───────────────────────────────────────────────────────────────
function AwardCard({
  title,
  linkText,
  imagePlaceholder,
}: {
  title: string;
  linkText?: string;
  imagePlaceholder?: string;
}) {
  return (
    <div
      style={{
        background: C.bgCard,
        border: `1px solid ${C.border}`,
        borderRadius: "16px",
        padding: "28px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        fontFamily: FONT,
      }}
    >
      {/* 16:9 image placeholder — large rounded */}
      <div
        style={{
          background: C.bgSection,
          borderRadius: "24px",
          aspectRatio: "16/9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: `1px solid ${C.border}`,
        }}
      >
        <span
          style={{
            color: C.textMuted,
            fontSize: "11px",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            fontFamily: FONT,
          }}
        >
          {imagePlaceholder ?? "Award Image"}
        </span>
      </div>

      {/* Title */}
      <p style={{ color: C.textPrimary, fontSize: "18px", fontWeight: 600, lineHeight: 1.5, fontFamily: FONT }}>
        {title}
      </p>

      {/* Link */}
      {linkText && (
        <div className="mt-auto">
          <OutlineBtn icon={<ExternalLink size={14} />}>{linkText}</OutlineBtn>
        </div>
      )}
    </div>
  );
}

// ─── Bilibili Card ────────────────────────────────────────────────────────────
function BilibiliCard({ title, meta }: { title: string; meta: string }) {
  return (
    <div
      style={{
        background: C.bgCard,
        border: `1px solid ${C.border}`,
        borderRadius: "14px",
        padding: "22px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        fontFamily: FONT,
      }}
    >
      <div className="flex items-center gap-2">
        <div
          style={{
            width: "28px", height: "28px", borderRadius: "50%",
            background: "rgba(0,161,214,0.12)", border: "1px solid rgba(0,161,214,0.25)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <Play size={12} fill="#00A1D6" color="#00A1D6" />
        </div>
        <span style={{ color: C.textMuted, fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: FONT }}>
          Bilibili
        </span>
      </div>
      <p style={{ color: C.textPrimary, fontSize: "16px", fontWeight: 600, lineHeight: 1.5, fontFamily: FONT }}>
        {title}
      </p>
      <span style={{ color: C.textMuted, fontSize: "12px", fontFamily: FONT }}>{meta}</span>
    </div>
  );
}

// ─── Podcast Card ─────────────────────────────────────────────────────────────
function PodcastCard({ title, meta }: { title: string; meta: string }) {
  return (
    <div
      style={{
        background: C.bgCard,
        border: `1px solid ${C.border}`,
        borderRadius: "14px",
        padding: "22px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        fontFamily: FONT,
      }}
    >
      <div className="flex items-center gap-2">
        <div
          style={{
            width: "28px", height: "28px", borderRadius: "50%",
            background: "rgba(180,200,80,0.10)", border: "1px solid rgba(107,142,78,0.35)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <Mic size={12} color="#8BC34A" />
        </div>
        <span style={{ color: C.textMuted, fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: FONT }}>
          Xiaoyuzhou
        </span>
      </div>
      <p style={{ color: C.textPrimary, fontSize: "16px", fontWeight: 600, lineHeight: 1.5, fontFamily: FONT }}>
        {title}
      </p>
      <span style={{ color: C.textMuted, fontSize: "12px", fontFamily: FONT }}>{meta}</span>
    </div>
  );
}

// ─── Section 1 – Legal Awards ─────────────────────────────────────────────────
function LegalAwardsSection() {
  const { t } = useLang();
  return (
    <section style={{ background: C.bgSection, fontFamily: FONT }} className="py-36">
      <div className="max-w-[1440px] mx-auto px-16 flex flex-col gap-12">
        <SectionHeader label={t.legal.sectionLabel} title={t.legal.title} />
        <div className="grid grid-cols-3 gap-8">
          {Array(6).fill(t.legal.cardTitle).map((title, i) => (
            <AwardCard key={i} title={title} linkText={t.legal.link} imagePlaceholder={t.legal.imagePlaceholder} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 2 – New Media Awards ─────────────────────────────────────────────
function NewMediaAwardsSection() {
  const { t } = useLang();
  const nm = t.newMedia;
  return (
    <section style={{ background: C.bgPrimary, fontFamily: FONT }} className="py-36">
      <div className="max-w-[1440px] mx-auto px-16 flex flex-col gap-16">
        <SectionHeader label={nm.sectionLabel} title={nm.title} />

        {/* Bilibili */}
        <div className="flex flex-col gap-8">
          <SubSectionHeader title={nm.bilibili.title} caption={nm.bilibili.caption} />
          <div className="grid grid-cols-2 gap-8">
            {nm.bilibili.cards.map((title, i) => (
              <BilibiliCard key={i} title={title} meta={nm.bilibili.meta} />
            ))}
          </div>
        </div>

        {/* Xiaoyuzhou */}
        <div className="flex flex-col gap-8">
          <SubSectionHeader title={nm.podcast.title} caption={nm.podcast.caption} />
          <div className="grid grid-cols-2 gap-8">
            {nm.podcast.cards.map((title, i) => (
              <PodcastCard key={i} title={title} meta={nm.podcast.meta} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 3 – Tiger Awards ─────────────────────────────────────────────────
function TigerAwardsSection() {
  const { t } = useLang();
  return (
    <section style={{ background: C.bgSection, fontFamily: FONT }} className="py-36">
      <div className="max-w-[1440px] mx-auto px-16 flex flex-col gap-12">
        <SectionHeader label={t.tiger.sectionLabel} title={t.tiger.title} />
        <div className="grid grid-cols-2 gap-8">
          {Array(4).fill(t.tiger.cardTitle).map((title, i) => (
            <AwardCard key={i} title={title} linkText={t.tiger.link} imagePlaceholder={t.legal.imagePlaceholder} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const { t } = useLang();
  return (
    <footer style={{ background: C.bgPrimary, borderTop: `1px solid ${C.divider}`, fontFamily: FONT }}>
      <div className="max-w-[1440px] mx-auto px-16 py-20 flex flex-col items-center gap-4 text-center">
        <span style={{ ...gradientText, fontSize: "22px", fontWeight: 700, letterSpacing: "0.06em" }}>
          {t.footer.logo}
        </span>
        {/* gradient line */}
        <div style={{ width: "40px", height: "1px", backgroundImage: GRADIENT, borderRadius: "1px", margin: "4px 0" }} />
        <span style={{ color: C.textBody, fontSize: "13px", fontFamily: FONT }}>{t.footer.copy}</span>
        <span style={{ color: C.textMuted, fontSize: "12px", fontFamily: FONT }}>{t.footer.info}</span>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState<Lang>("en");
  const toggle = () => setLang((l) => (l === "en" ? "zh" : "en"));

  return (
    <LangContext.Provider value={{ lang, t: T[lang], toggle }}>
      <div style={{ background: C.bgPrimary, minHeight: "100vh", fontFamily: FONT }}>
        <Header />
        <main>
          <HeroSection
            label={T[lang].hero.label}
            titleLine1={T[lang].hero.title[0]}
            titleLine2={T[lang].hero.title[1]}
            desc={T[lang].hero.desc}
          />
          <LegalAwardsSection />
          <NewMediaAwardsSection />
          <FeaturesSection />
          <TestimonialCarousel />
          <TigerAwardsSection />
        </main>
        <Footer />
      </div>
    </LangContext.Provider>
  );
}