import imgVector800 from "../../imports/CoreValue/e59638152d8ac77db9b565bfbadeeb0d328a2986.png";
import imgImage1 from "../../imports/CoreValue/36ad2f8d299cc6686a0c53c13c322bc4f42a8e87.png";
import imgRectangle6049 from "../../imports/CoreValue/726388d359722eb98a4a4f64a9ad9635507e621f.png";
import imgRectangle6050 from "../../imports/CoreValue/9163a166bb835a1e5108e675c20957a6c614ae5e.png";
import imgRectangle6051 from "../../imports/CoreValue/79b78758f1da724528bc109f0187074b9d1f6340.png";
import { Globe } from "lucide-react";

const navItems = ["HOME", "ABOUT US", "OUR TEAM", "INDUSTRIES", "EVENTS", "CONTACT"];

function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-30">
      <div className="mx-auto max-w-[120rem] px-[2rem] lg:px-[3.75rem] flex items-center h-[6.5rem] gap-[2rem]">
        {/* Logo */}
        <div className="flex items-center gap-[0.75rem] flex-shrink-0">
          <div className="w-[3.5rem] h-[3.25rem] rounded-sm flex items-center justify-center" style={{ background: "linear-gradient(135deg,#d9b27a,#b8915c)" }}>
            <span className="text-[#171717] text-[1.5rem] tracking-[0.1em]" style={{ fontFamily: "'Poppins', serif", fontWeight: 700 }}>TP</span>
          </div>
          <div className="hidden md:flex flex-col leading-tight">
            <span className="text-[#d9b27a] tracking-[0.15em]" style={{ fontWeight: 600, fontSize: "0.875rem" }}>TIGER</span>
            <span className="text-[#d9b27a] tracking-[0.15em]" style={{ fontWeight: 600, fontSize: "0.875rem" }}>PARTNERS</span>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-[2.5rem] ml-auto">
          {navItems.map((item) => {
            const active = item === "ABOUT US";
            return (
              <div key={item} className="flex flex-col items-center">
                <span
                  className="uppercase tracking-[0.04em]"
                  style={{
                    fontFamily: "'Poppins',sans-serif",
                    fontWeight: active ? 700 : 600,
                    fontSize: "1rem",
                    color: active ? "#d9b27a" : "#f7f7f7",
                  }}
                >
                  {item}
                </span>
                {active && <span className="mt-[0.5rem] block w-[3rem] h-px bg-[#d9b27a]" />}
              </div>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-[0.5rem] pl-[1.5rem] ml-[0.5rem] border-l border-white/20 h-[1.75rem]">
          <Globe className="w-[1.125rem] h-[1.125rem] text-white" />
          <span className="text-white tracking-[0.08em]" style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: "1rem" }}>EN</span>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative h-[28rem] md:h-[32rem] lg:h-[35rem] overflow-hidden">
      <img src={imgVector800} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(18,18,18,0.7) 0%, rgba(23,23,23,0.95) 90%)" }} />
      <div
        className="absolute inset-0 hidden lg:block"
        style={{ background: "linear-gradient(115deg, rgba(18,18,18,0.85) 0%, rgba(18,18,18,0.4) 60%, rgba(217,178,122,0.15) 100%)" }}
      />

      <div className="relative mx-auto max-w-[120rem] h-full px-[2rem] lg:px-[3.75rem] flex flex-col justify-center pt-[6rem]">
        <p className="text-[#bec3cb] tracking-[0.04em]" style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 300, fontSize: "1rem" }}>
          About us / CULTURE / <span className="text-white" style={{ fontWeight: 500 }}>Core Value</span>
        </p>
        <div className="mt-[3rem] w-[4rem] h-[3px] bg-[#d9b27a]" />
        <h1
          className="mt-[3rem] text-[#d9b27a]"
          style={{
            fontFamily: "'Poppins',serif",
            fontWeight: 600,
            fontSize: "clamp(3rem, 7vw, 6rem)",
            lineHeight: 0.9,
            letterSpacing: "-0.01em",
          }}
        >
          Core Value
        </h1>
      </div>
    </section>
  );
}

interface ValueSectionProps {
  number: string;
  title: string;
  body: React.ReactNode;
  image: string;
  reverse?: boolean;
  imageOpacity?: number;
}

function ValueSection({ number, title, body, image, reverse, imageOpacity = 1 }: ValueSectionProps) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-[120rem] px-[2rem] lg:px-[3.75rem] py-[3rem] lg:py-[4.5rem]">
        <div className={`grid gap-[2.5rem] lg:gap-[3.5rem] items-start ${reverse ? "lg:grid-cols-[1fr_28rem]" : "lg:grid-cols-[1fr_28rem]"}`}>
          <div className={reverse ? "lg:order-2" : ""}>
            <h2
              className="text-[#d9b27a]"
              style={{
                fontFamily: "'Poppins',sans-serif",
                fontWeight: 600,
                fontSize: "clamp(1.25rem, 1.6vw, 1.625rem)",
                lineHeight: 1.5,
                letterSpacing: "0.02em",
              }}
            >
              {number} {title}
            </h2>
            <div
              className="mt-[2rem] text-[#d1d5dc] text-justify"
              style={{
                fontFamily: "'Poppins',sans-serif",
                fontWeight: 400,
                fontSize: "clamp(0.95rem, 1.05vw, 1.125rem)",
                lineHeight: 1.75,
                letterSpacing: "0.01em",
              }}
            >
              {body}
            </div>
          </div>
          <div className={`relative w-full aspect-[662/543] overflow-hidden ${reverse ? "lg:order-1" : ""}`}>
            <img
              src={image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              style={{ opacity: imageOpacity }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function QuoteIcon({ flip }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 96 96"
      fill="none"
      className="w-[3.5rem] h-[3.5rem] lg:w-[5rem] lg:h-[5rem] flex-shrink-0"
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
    >
      <path
        d="M30 30 C18 30 10 40 10 52 C10 64 18 74 30 74 L30 64 C24 64 20 58 20 52 C20 46 24 40 30 40 Z"
        stroke="#d9b27a"
        strokeOpacity="0.5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M62 30 C50 30 42 40 42 52 C42 64 50 74 62 74 L62 64 C56 64 52 58 52 52 C52 46 56 40 62 40 Z"
        stroke="#d9b27a"
        strokeOpacity="0.5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Closing() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-[105rem] px-[2rem] lg:px-[5rem] py-[5rem] lg:py-[7rem]">
        <div className="flex items-start gap-[1rem] lg:gap-[2rem]">
          <QuoteIcon />
          <p
            className="flex-1 text-[#d1d5dc] text-center"
            style={{
              fontFamily: "'Poppins',sans-serif",
              fontWeight: 400,
              fontSize: "clamp(1rem, 1.4vw, 1.5rem)",
              lineHeight: 1.875,
              letterSpacing: "0.02em",
            }}
          >
            We believe that, in our dispute resolution practice, only by offering Partner's "Hands-on" approach could we provide the best service of our top capability and prime effort, just to secure our clients' tangible interests to the greatest extent. And this is the only way for us to realize our professional dreams.
          </p>
          <QuoteIcon flip />
        </div>
      </div>
    </section>
  );
}

function FooterLogo() {
  return (
    <div className="flex items-center gap-[1rem]">
      <div className="w-[4rem] h-[3.75rem] rounded-sm flex items-center justify-center" style={{ background: "linear-gradient(135deg,#d9b27a,#b8915c)" }}>
        <span className="text-[#171717]" style={{ fontFamily: "'Poppins',serif", fontWeight: 700, fontSize: "1.625rem", letterSpacing: "0.05em" }}>TP</span>
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-[#d9b27a] tracking-[0.15em]" style={{ fontWeight: 600, fontSize: "1rem" }}>TIGER</span>
        <span className="text-[#d9b27a] tracking-[0.15em]" style={{ fontWeight: 600, fontSize: "1rem" }}>PARTNERS</span>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative" style={{ background: "linear-gradient(248deg, #2e2e2e 49%, #121212 66%)" }}>
      <div className="mx-auto max-w-[120rem] px-[2rem] lg:px-[3.75rem] pt-[3.5rem] pb-[2rem]">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-[1.5rem] pb-[2rem]">
          <FooterLogo />
          <div
            className="text-[#d9b27a]/70 text-left lg:text-right"
            style={{
              fontFamily: "'Poppins',sans-serif",
              fontWeight: 500,
              fontSize: "clamp(0.875rem, 1vw, 1.0625rem)",
              lineHeight: 1.6,
              letterSpacing: "0.05em",
            }}
          >
            <p>Always pursuing the extreme and seeking the perfection</p>
            <p>Always aiming at winning lawsuits and fulfilling clients' business goals</p>
          </div>
        </div>

        <div className="h-px bg-[#343434]/80 w-full" />

        <div className="grid lg:grid-cols-[1fr_auto] gap-[1.5rem] py-[2rem]">
          <div className="space-y-[1rem]">
            <p className="flex items-start gap-[0.75rem] text-[#535353]" style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(0.8125rem, 0.95vw, 1rem)", lineHeight: 1.7 }}>
              <span className="text-[#d9b27a] mt-[0.25em]">◆</span>
              Suite 01, 25F, Tower A, Sino-Ocean International Center, 56 East 4th Ring Middle Road, Chaoyang District, Beijing 100025, China
            </p>
            <p className="flex items-center gap-[0.75rem] text-[#535353] flex-wrap" style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(0.8125rem, 0.95vw, 1rem)", lineHeight: 1.7 }}>
              <span className="text-[#d9b27a]">☎</span>
              010-85885228
              <span className="ml-[1.5rem] text-[#d9b27a]">✉</span>
              contact@tigerpartners.cn
            </p>
          </div>
          <div className="flex items-end justify-end">
            <img src={imgImage1} alt="QR" className="w-[5.5rem] h-[5.5rem] object-cover" />
          </div>
        </div>

        <div className="h-px bg-[#343434]/80 w-full" />

        <div className="flex flex-col md:flex-row items-center justify-center gap-[0.75rem] md:gap-[2.5rem] flex-wrap pt-[1.5rem] text-center text-[#7f7f7f]" style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.8125rem" }}>
          <span>All Rights Reserved © 2019 Tiger Partners</span>
          <span>Disclaimer and Privacy</span>
          <span>京ICP备20002490号</span>
          <span>京公网安备11010502052714号</span>
        </div>
      </div>
    </footer>
  );
}

export function CoreValue() {
  return (
    <div className="min-h-screen bg-[#171717] text-white overflow-x-hidden">
      <Header />
      <Hero />

      <ValueSection
        number="No.1"
        title="Our Spiritual Totem: Tiger"
        image={imgRectangle6049}
        imageOpacity={0.7}
        body={`As quoted from an ancient Chinese book the Dragon Classic : "Bi An (狴犴) is good at litigation". Bi An is a mythical creature in charge of litigation in Chinese mythology, which is also the seventh son of the Dragon. In the real world, it presents itself in the image of Tiger. Therefore, Tiger, powerful and solemn, appears on all Chinese cultural relics related to litigation. Tiger, as the king of the forest, is strong and powerful itself, but meanwhile it keeps itself invisible before taking a critical strike at its prey. We choose Tiger as our totem because we are just Tigers. We litigate, and we hunt like top predators.`}
      />

      <ValueSection
        number="No.2"
        title="We focus on tangible benefits clients could get from our legal services"
        image={imgRectangle6050}
        body={`Dispute Resolution Legal Services are inherently different from non-litigation legal services. The result-oriented nature of the legal services makes the dispute resolution full of challenges. While emphasizing the quality of legal services itself, we place more attention on protecting tangible benefits of our clients in our cases. We believe that our value as dispute resolution lawyers would not be ultimately realized, when our clients' ultimate interests are not realized.`}
      />

      <ValueSection
        number={`No.3`}
        title={`The "Hands-on"`}
        image={imgRectangle6051}
        body={
          <>
            <p>
              {`The result of a dispute resolution case could be as far removed as heaven from earth, that is because different lawyers handle a case in different ways during the whole process, from strategic planning at the beginning, to evidence collecting, trial presentation, and post-trial briefing, which attributes to the lawyer's personal legal foundation, presentation ability, working and social experience. But as the win or lose of a major and complicated case often rest with the judge's judgment just one remove from another, the lawyer who is actually handing the case plays a vital role in the ultimate outcome. Therefore, we guaranty our partners' Hands-on throughout the process:`}
            </p>
            <ul className="mt-[1.5rem] space-y-[0.75rem] text-[#99a1af]">
              {[
                "Hands on communication directly with clients on substantial and procedural issues.",
                "Hands on evidence collecting and organization.",
                "Hands on drafting core legal documents.",
                "Hands on court presentations.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-[0.875rem]">
                  <span className="mt-[0.65em] block w-[0.5rem] h-[0.5rem] rounded-full bg-[#d9d9d9] flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </>
        }
      />

      <Closing />
      <Footer />
    </div>
  );
}
