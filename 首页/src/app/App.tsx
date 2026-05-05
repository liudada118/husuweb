import { ChevronLeft, ChevronRight, Globe, ArrowUpRight } from "lucide-react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";

const heroImg =
  "https://images.unsplash.com/photo-1761570255027-6c251f8fbc68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920";
const visionImg =
  "https://images.unsplash.com/photo-1768380866961-286e2b0a89b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920";
const portrait =
  "https://images.unsplash.com/photo-1758600587839-56ba05596c69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200";

const industries = [
  {
    name: "Private Equity",
    img: "https://images.unsplash.com/photo-1670383050616-682df7d57b22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    cls: "lg:col-span-2",
  },
  {
    name: "Finance",
    img: "https://images.unsplash.com/photo-1549421263-6064833b071b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    cls: "lg:col-span-1",
  },
  {
    name: "Real Estate",
    img: "https://images.unsplash.com/photo-1772723822700-5898b9f23abc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
    cls: "lg:col-span-1 lg:row-span-2",
  },
  {
    name: "Sports and E-Sports",
    img: "https://images.unsplash.com/photo-1667152657515-30103666082c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
    cls: "lg:col-span-1",
  },
  {
    name: "International Trade",
    img: "https://images.unsplash.com/photo-1759272548470-d0686d071036?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
    cls: "lg:col-span-1",
  },
  {
    name: "Cyber Tech and Game",
    img: "https://images.unsplash.com/photo-1585743876840-53866e12a598?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600",
    cls: "lg:col-span-2",
  },
];

const honors = [
  {
    title: "Diamond Sponsor",
    date: "2024-11",
    desc: "Tiger Partners is favored and recognized by multiple authoritative legal directories and awarding organizations all over the world",
  },
  {
    title: "World Arbitration Update 2024",
    date: "2024-5",
    desc: "In May 2024, Tiger Partners sponsored the World Arbitration Update 2024 (WAU 2024) China Edition.",
  },
  {
    title: "Firms to Watch",
    date: "2024-1",
    desc: "On January 22, Asian Legal Business announced the 2024 ALB China Firms to Watch list, and Tiger Partners was honored to be selected.",
  },
];

const years = ["2026", "2025", "2024", "2023", "2022"];

const clientLogos = [
  "中化集团",
  "GILBARCO",
  "出门问问",
  "中国出口信用保险",
  "挑战者创投",
  "Luckin Coffee",
  "猫眼",
  "石雀柒号",
  "RELX 悦刻",
  "弘毅投资",
  "凯撒旅游",
  "HILLHOUSE",
  "新天域资本",
  "THINKWELL",
  "安诺优达",
  "360",
  "度小满金融",
  "安東",
];

const navItems = ["HOME", "ABOUT US", "OUR TEAM", "INDUSTRIES", "EVENTS", "CONTACT"];

export default function App() {
  return (
    <div className="min-h-screen bg-[#171717] text-white">
      {/* ============ HERO ============ */}
      <section className="relative w-full overflow-hidden bg-[#0d0d0d]">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={heroImg}
            alt=""
            className="size-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-[#483f33]/70" />
          <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-b from-transparent to-[#171717]" />
        </div>

        {/* Top Nav */}
        <header className="relative z-20 mx-auto flex max-w-[120rem] items-center justify-between px-[2rem] pt-[2.25rem] lg:px-[3.75rem]">
          <div className="flex items-center gap-[0.75rem]">
            <div className="flex size-[3rem] items-center justify-center rounded-full border border-[#d9b27a]/60 text-[#d9b27a]" style={{ fontFamily: "'Poppins', serif" }}>
              <span className="text-[1.25rem]" style={{ fontSize: "1.25rem", fontWeight: 700 }}>TP</span>
            </div>
            <span className="hidden text-[#d9b27a] sm:block" style={{ fontSize: "0.95rem", letterSpacing: "0.15em" }}>
              TIGER PARTNERS
            </span>
          </div>
          <nav className="hidden items-center gap-[2.25rem] lg:flex">
            {navItems.map((item, i) => (
              <a
                key={item}
                href="#"
                className={`uppercase tracking-[0.05em] transition-colors hover:text-[#d9b27a] ${
                  i === 0 ? "text-[#d9b27a]" : "text-white"
                }`}
                style={{ fontSize: "0.95rem", fontWeight: 600 }}
              >
                {item}
                {i === 0 && <span className="mt-[0.5rem] block h-px w-full bg-[#d9b27a]" />}
              </a>
            ))}
            <button className="ml-[1rem] flex items-center gap-[0.5rem] border-l border-white/20 pl-[1.25rem] text-white" style={{ fontSize: "0.95rem", fontWeight: 600 }}>
              <Globe className="size-[1rem]" />
              EN
            </button>
          </nav>
        </header>

        {/* Hero Title */}
        <div className="relative z-10 flex min-h-[34rem] items-center justify-center px-[1rem] py-[8rem] md:min-h-[44rem]">
          <h1
            className="text-center uppercase tracking-[0.06em] text-[#f9efe2]/90"
            style={{
              fontFamily: "'Alegreya Sans', serif",
              fontSize: "clamp(2.5rem, 6vw, 5.3rem)",
              fontWeight: 700,
              lineHeight: 1.1,
            }}
          >
            we know how to win
          </h1>
        </div>

        {/* Vertical "Vision" */}
        <div className="pointer-events-none absolute right-[1rem] top-[50%] z-10 hidden -translate-y-1/2 lg:block">
          <div
            className="text-[#d9b27a]/70"
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              fontFamily: "'Poppins', serif",
              fontSize: "clamp(4rem, 8vw, 8.75rem)",
              fontWeight: 500,
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            Vision
          </div>
        </div>
      </section>

      {/* ============ COMMITMENT ============ */}
      <section className="relative bg-[#171717]">
        <div className="absolute inset-0 overflow-hidden">
          <ImageWithFallback src={visionImg} alt="" className="size-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-[#5a4d35]/70" />
        </div>

        <div className="relative mx-auto max-w-[120rem] px-[2rem] py-[5rem] lg:px-[3.75rem] lg:py-[6.5rem]">
          <div className="mb-[1.5rem] h-[0.25rem] w-[2.875rem] bg-[#d9b27a]" />
          <p
            className="max-w-[71rem] capitalize"
            style={{ fontSize: "clamp(1.25rem, 2vw, 2.1rem)", lineHeight: 1.45, fontWeight: 700, letterSpacing: "0.02em" }}
          >
            <span className="italic text-white/80" style={{ fontWeight: 400 }}>
              We are committed to
            </span>{" "}
            <span>be one of the extraordinary dispute resolution law firms in the Asia Pacific Region</span>
          </p>
          <button className="mt-[2.5rem] inline-flex h-[3.75rem] items-center justify-center bg-white px-[2.25rem] uppercase text-black transition hover:bg-[#d9b27a]" style={{ fontSize: "0.95rem", fontWeight: 600, letterSpacing: "0.05em" }}>
            GET TO KNOW US
          </button>
        </div>
      </section>

      {/* ============ INDUSTRIES & SERVICES ============ */}
      <section className="bg-[#171717] px-[2rem] py-[5rem] lg:px-[3.75rem] lg:py-[7rem]">
        <div className="mx-auto max-w-[120rem]">
          <div className="mb-[3rem] flex flex-col gap-[1.5rem] lg:mb-[4rem]">
            <h2
              className="bg-gradient-to-br from-[#f6ebe4] to-[#d9b27a] bg-clip-text text-transparent"
              style={{
                fontFamily: "'Poppins', serif",
                fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
                fontWeight: 300,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              INDUSTRIES <span style={{ fontWeight: 600 }}>&amp;</span>{" "}
              <span style={{ fontWeight: 600 }}>SERVICES</span>
            </h2>
            <p
              className="max-w-[90rem] italic text-[#cfd5df]/80"
              style={{ fontSize: "clamp(1rem, 1.3vw, 1.45rem)", lineHeight: 1.45, letterSpacing: "0.02em" }}
            >
              Tiger Partners is capable of offering targeted legal services in accordance with the industry
              characteristics, covering traditional disputes resolution, to compliance, matters involving both civil
              and criminal issues, legal counsulting for corporation and etc
            </p>
          </div>

          <div className="grid auto-rows-[12rem] grid-cols-1 gap-[1rem] sm:grid-cols-2 sm:auto-rows-[13rem] lg:auto-rows-[13.5rem] lg:grid-cols-3">
            {industries.map((it) => (
              <a
                key={it.name}
                href="#"
                className={`group relative overflow-hidden bg-[#222] ${it.cls}`}
              >
                <ImageWithFallback
                  src={it.img}
                  alt={it.name}
                  className="size-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090b]/80 via-[#09090b]/40 to-transparent" />
                <div className="absolute inset-0 flex items-end p-[1.75rem]">
                  <h3 style={{ fontSize: "clamp(1.25rem, 1.8vw, 1.85rem)", fontWeight: 400, lineHeight: 1.1 }}>
                    {it.name}
                  </h3>
                </div>
              </a>
            ))}
          </div>
          <div className="mt-[1.5rem] h-px w-full bg-white/40" />
        </div>
      </section>

      {/* ============ HONORS ============ */}
      <section
        className="px-[2rem] py-[5rem] lg:px-[3.75rem] lg:py-[7rem]"
        style={{ background: "linear-gradient(170deg, #242424 9%, #383838 113%)" }}
      >
        <div className="mx-auto max-w-[120rem]">
          <div className="grid grid-cols-1 gap-[2rem] lg:grid-cols-[1fr_1fr]">
            <h2
              className="bg-gradient-to-br from-[#f6ebe4] to-[#d9b27a] bg-clip-text text-transparent"
              style={{
                fontFamily: "'Poppins', serif",
                fontSize: "clamp(3rem, 7vw, 6.5rem)",
                fontWeight: 300,
                letterSpacing: "-0.04em",
                lineHeight: 1.1,
              }}
            >
              HONORS
            </h2>
            <p
              className="self-end italic capitalize text-[#cfd5df]/70 lg:text-right"
              style={{ fontSize: "clamp(1rem, 1.2vw, 1.4rem)", lineHeight: 1.45, letterSpacing: "0.04em" }}
            >
              Tiger Partners is favored and recognized by multiple authoritative legal directories and awarding
              organizations all over the world
            </p>
          </div>

          {/* Year tabs */}
          <div className="mt-[3rem] grid grid-cols-5 gap-[0.5rem]">
            {years.map((y) => {
              const active = y === "2024";
              return (
                <div
                  key={y}
                  className={`flex h-[2.75rem] items-center justify-center transition ${
                    active ? "bg-[#d9b27a] text-black" : "bg-[#484643] text-black/80 opacity-70"
                  }`}
                  style={{ fontSize: "1rem", fontWeight: active ? 700 : 400, letterSpacing: "-0.01em" }}
                >
                  {y}
                </div>
              );
            })}
          </div>
          <div className="mt-[1rem] h-[5px] w-full bg-black" />

          {/* Honors list */}
          <div className="mt-[1rem]">
            {honors.map((h, i) => (
              <div key={h.title} className="border-b border-white/15 py-[2rem] lg:py-[2.5rem]">
                <div className="grid grid-cols-1 gap-[1rem] lg:grid-cols-[1fr_auto] lg:items-center">
                  <div className="flex flex-wrap items-center gap-[1.5rem]">
                    <h3
                      className="text-[#d9b27a]"
                      style={{
                        fontFamily: "'Poppins', serif",
                        fontSize: "clamp(1.5rem, 2.2vw, 2.1rem)",
                        fontWeight: 600,
                        letterSpacing: "0.02em",
                      }}
                    >
                      {h.title}
                    </h3>
                    <div className="h-[1.75rem] w-px bg-[#d9b27a]/50" />
                    <span
                      className="text-[#d9b27a]"
                      style={{ fontSize: "clamp(1rem, 1.4vw, 1.4rem)", fontWeight: 500 }}
                    >
                      {h.date}
                    </span>
                  </div>
                  {i === 0 && (
                    <a href="#" className="hidden items-center gap-[0.75rem] text-[#f8d097] lg:flex">
                      <span style={{ fontSize: "1.1rem", fontWeight: 600 }}>See More</span>
                      <ArrowUpRight className="size-[1.25rem]" />
                    </a>
                  )}
                </div>
                <p
                  className="mt-[1rem] capitalize text-[#cfd5df]/70"
                  style={{ fontSize: "clamp(0.95rem, 1.15vw, 1.25rem)", lineHeight: 1.6 }}
                >
                  {h.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ EVENTS ============ */}
      <section className="bg-[#171717] px-[2rem] py-[5rem] lg:px-[3.75rem] lg:py-[7rem]">
        <div className="mx-auto max-w-[120rem]">
          <div className="grid grid-cols-1 items-end gap-[1.5rem] lg:grid-cols-[auto_1fr]">
            <h2
              style={{
                fontFamily: "'Poppins', serif",
                fontSize: "clamp(3.5rem, 8vw, 7.5rem)",
                fontWeight: 400,
                letterSpacing: "-0.03em",
                lineHeight: 1,
              }}
            >
              Events
            </h2>
            <p
              className="capitalize text-[#cfd5df]/70 lg:text-right"
              style={{ fontSize: "clamp(1rem, 1.2vw, 1.4rem)", lineHeight: 1.3, letterSpacing: "0.04em" }}
            >
              Welcome your attention to our real-time dynamics and industry news
            </p>
          </div>

          <div className="relative mt-[3rem] mx-auto max-w-[62rem] bg-[#cecccc]">
            {/* Header w/ image */}
            <div className="relative aspect-[995/581] w-full overflow-hidden">
              <ImageWithFallback src={portrait} alt="" className="size-full object-cover" />
              <div
                className="absolute inset-0 mix-blend-hard-light"
                style={{ background: "linear-gradient(61deg, #131313 9%, rgba(74,74,74,0) 105%)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
            </div>

            {/* Body */}
            <div className="relative bg-gradient-to-br from-black/70 to-[#5a5045]/70 px-[2rem] py-[2.5rem] lg:px-[3.5rem] lg:py-[3.5rem]">
              <div className="absolute -top-[3rem] left-[1rem] hidden h-[6rem] w-[5px] bg-[#d79d48] lg:block" />
              <div className="lg:pl-[2rem]">
                <h3
                  style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.65rem)", lineHeight: 1.4, fontWeight: 400 }}
                  className="capitalize"
                >
                  Tiger Dynamics | Kinsey Kang Yanan was engaged as Hong Kong Legal Counsel of Tiger Partners.
                </h3>
                <p
                  className="mt-[1rem] text-[#d9b27a]"
                  style={{ fontSize: "clamp(0.95rem, 1.15vw, 1.25rem)", fontWeight: 500, letterSpacing: "-0.005em" }}
                >
                  Nov. 11, 2023
                </p>
                <p
                  className="mt-[1.5rem] text-justify capitalize text-white/85"
                  style={{ fontSize: "clamp(0.95rem, 1.15vw, 1.25rem)", lineHeight: 1.6 }}
                >
                  Tiger Partners is honored to announce that Kinsey Kang Yanan, barrister-at-law, has been engaged as
                  our Hong Kong Legal Counsel. From this day on, Tiger Partners will work with Kinsey wholeheartedly to
                  provide our clients with more professional...
                </p>
              </div>
            </div>
          </div>

          {/* Carousel controls */}
          <div className="mt-[2.5rem] flex items-center justify-center gap-[1.5rem]">
            <button className="flex size-[3rem] items-center justify-center rounded-full border-2 border-white/50 opacity-70 transition hover:opacity-100">
              <ChevronLeft className="size-[1.4rem]" />
            </button>
            <div className="flex items-center gap-[0.75rem]">
              <span className="h-[0.5rem] w-[3rem] rounded-full bg-[#d9b27a] shadow-[0_0_8px_rgba(217,178,122,0.5)]" />
              <span className="size-[0.5rem] rounded-full bg-white/20" />
              <span className="size-[0.5rem] rounded-full bg-white/20" />
            </div>
            <button className="flex size-[3rem] items-center justify-center rounded-full border-2 border-[#d9b27a] transition hover:bg-[#d9b27a]/10">
              <ChevronRight className="size-[1.4rem]" />
            </button>
          </div>
        </div>
      </section>

      {/* ============ CLIENTS ============ */}
      <section className="bg-[#3e3e3d] px-[2rem] py-[5rem] lg:px-[3.75rem] lg:py-[7rem]">
        <div className="mx-auto max-w-[120rem]">
          <h2
            className="max-w-[62rem] uppercase"
            style={{
              fontFamily: "'Poppins', serif",
              fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
              fontWeight: 500,
              lineHeight: 1.3,
              letterSpacing: "0.02em",
            }}
          >
            Our clients are our most solid foundation, whose trust gives us enormous power and let us blaze our paths
          </h2>

          <div className="mt-[3rem] grid grid-cols-2 gap-[1rem] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {clientLogos.map((logo) => (
              <div
                key={logo}
                className="flex h-[7.5rem] items-center justify-center rounded-[10px] bg-[#dedede] px-[1rem] text-center text-[#666]"
                style={{ fontSize: "0.95rem", fontWeight: 500 }}
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="bg-[#0c0c0c] px-[2rem] pb-[2rem] pt-[5rem] lg:px-[3.75rem] lg:pt-[7rem]">
        <div className="mx-auto max-w-[120rem]">
          <div className="grid grid-cols-1 gap-[3rem] lg:grid-cols-[auto_1fr]">
            {/* Logo block */}
            <div>
              <div className="flex size-[6rem] items-center justify-center rounded-full border-2 border-[#d9b27a]">
                <span className="text-[#d9b27a]" style={{ fontSize: "1.75rem", fontWeight: 700 }}>TP</span>
              </div>
              <p className="mt-[1rem] text-[#d9b27a]" style={{ fontSize: "1rem", letterSpacing: "0.15em" }}>
                TIGER PARTNERS
              </p>
            </div>
            {/* Right text */}
            <div className="lg:text-right">
              <p
                className="text-[#d9b27a]/70"
                style={{ fontSize: "clamp(1rem, 1.4vw, 1.4rem)", lineHeight: 1.4, fontWeight: 500, letterSpacing: "0.05em" }}
              >
                Always pursuing the extreme and seeking the perfection
                <br />
                Always aiming at winning lawsuits and fulfilling clients' business goals
              </p>
            </div>
          </div>

          <div className="my-[3rem] h-px w-full bg-[#343434]/80" />

          <div className="space-y-[1rem] text-[#535353]" style={{ fontSize: "clamp(0.9rem, 1.1vw, 1.2rem)", lineHeight: 1.6 }}>
            <p>Suite 01, 25F, Tower A, Sino-Ocean International Center, 56 East 4th Ring Middle Road, Chaoyang District, Beijing 100025, China</p>
            <p className="flex flex-wrap gap-x-[3rem] gap-y-[0.5rem]">
              <span>010-85885228</span>
              <span>contact@tigerpartners.cn</span>
            </p>
          </div>

          <div className="my-[2rem] h-px w-full bg-[#343434]/80" />

          <div className="flex flex-wrap items-center justify-between gap-[1rem] text-[#7f7f7f]" style={{ fontSize: "0.85rem" }}>
            <p>All Rights Reserved © 2019 Tiger Partners</p>
            <p>Disclaimer and Privacy</p>
            <p>京ICP备20002490号</p>
            <p>京公网安备11010502052714号</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
