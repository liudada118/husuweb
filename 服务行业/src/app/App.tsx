import heroImg from "../imports/Industries/9b56a5d8d2803d873e20af7ec4fa3fccdd83d85f.png";
import logoImg from "../imports/Industries/36ad2f8d299cc6686a0c53c13c322bc4f42a8e87.png";
import qrImg from "../imports/Industries/29c400bc3b89f6085766dac4e0330ded5cb73d52.png";
import { IndustriesCard } from "./components/industries-card";

export default function App() {
  return (
    <div className="min-h-screen w-full bg-[#171717] text-white overflow-x-hidden">
      {/* HERO */}
      <section className="relative w-full" style={{ height: "clamp(28rem, 56vw, 67.5rem)" }}>
        <img src={heroImg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[rgba(68,67,67,0.55)] mix-blend-screen" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(178deg, rgba(125,125,125,0) 12%, rgba(20,20,20,0.85) 91%)",
          }}
        />
        <h1
          className="absolute left-1/2 -translate-x-1/2 font-['Poppins:Medium',sans-serif] uppercase text-white text-center whitespace-nowrap"
          style={{
            top: "48%",
            fontSize: "clamp(2.5rem, 6.6vw, 6rem)",
            letterSpacing: "0.04em",
            textShadow: "0 4px 10px rgba(0,0,0,0.25)",
          }}
        >
          Industries
        </h1>
      </section>

      {/* CONTENT */}
      <main
        className="relative mx-auto"
        style={{ maxWidth: "98.625rem", paddingInline: "clamp(1rem, 3vw, 2.375rem)" }}
      >
        {/* QUOTE CARD */}
        <div
          className="relative bg-[#e8e8e8] text-black rounded-[0.625rem] mx-auto"
          style={{
            padding: "clamp(2rem, 5vw, 5.375rem) clamp(1.5rem, 4vw, 4rem)",
            maxWidth: "90.125rem",
            marginTop: "clamp(-10rem, -8vw, -6rem)",
          }}
        >
          <span
            aria-hidden
            className="absolute font-['Poppins:Regular',sans-serif] text-black select-none leading-none"
            style={{ top: "0.6rem", left: "1rem", fontSize: "clamp(3rem, 5vw, 6rem)" }}
          >
            「
          </span>
          <span
            aria-hidden
            className="absolute font-['Poppins:Regular',sans-serif] text-black select-none leading-none"
            style={{ bottom: "0.4rem", right: "1rem", fontSize: "clamp(3rem, 5vw, 6rem)" }}
          >
            」
          </span>
          <p
            className="font-['Poppins:Regular',sans-serif] text-justify mx-auto"
            style={{
              fontSize: "clamp(1rem, 1.5vw, 1.75rem)",
              lineHeight: 1.6,
              letterSpacing: "0.04em",
              maxWidth: "73rem",
            }}
          >
            Tiger Partners plays a significant role in the dispute resolution business in
            various industries. And we are capable of offering targeted legal services in
            accordance with the industry characteristics, covering traditional disputes
            resolution, to compliance, overlapping of civil and criminal, legal counselling
            for the corporation and so on
          </p>
        </div>

        {/* CARDS GRID */}
        <div
          className="mt-[4rem] grid"
          style={{ gap: "clamp(0.75rem, 1.4vw, 1.375rem)", gridTemplateColumns: "1fr" }}
        >
          {/* Row 1 — full-width banner */}
          <IndustriesCard className="rounded-[0.25rem] aspect-[1578/360] hidden md:flex" />
          <IndustriesCard className="rounded-[0.25rem] aspect-[16/9] flex md:hidden" />

          {/* Row 2 — left tall + right (two stacked) */}
          <div
            className="grid md:[grid-template-columns:668fr_877fr]"
            style={{ gap: "clamp(0.75rem, 1.4vw, 1.375rem)" }}
          >
            <IndustriesCard className="rounded-[0.25rem] md:aspect-[668/852] aspect-[16/10]" />
            <div
              className="grid"
              style={{
                gap: "clamp(0.75rem, 1.4vw, 1.375rem)",
                gridTemplateRows: "376fr 444fr",
              }}
            >
              <IndustriesCard className="rounded-[0.25rem] md:aspect-auto aspect-[16/9]" />
              <IndustriesCard className="rounded-[0.25rem] md:aspect-auto aspect-[16/9]" />
            </div>
          </div>

          {/* Row 3 — two cards 804 / 740 */}
          <div
            className="grid md:[grid-template-columns:804fr_740fr]"
            style={{ gap: "clamp(0.75rem, 1.4vw, 1.375rem)" }}
          >
            <IndustriesCard className="rounded-[0.25rem] aspect-[804/516]" />
            <IndustriesCard className="rounded-[0.25rem] aspect-[740/516]" />
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="relative mt-[5rem] bg-[#0c0c0c]">
        <div
          className="absolute inset-x-0 top-0 pointer-events-none h-full"
          style={{
            background: "linear-gradient(180deg, #121212 0%, rgba(58,58,58,0) 70%)",
          }}
        />
        <div
          className="relative mx-auto"
          style={{
            maxWidth: "98.625rem",
            paddingInline: "clamp(1rem, 3vw, 2.375rem)",
            paddingTop: "clamp(2.5rem, 5vw, 5rem)",
          }}
        >
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start lg:items-center justify-between">
            <img
              src={logoImg}
              alt="Tiger Partners"
              className="block"
              style={{ width: "clamp(4rem, 7vw, 6.875rem)", height: "auto" }}
            />
            <div
              className="font-['Poppins:Medium',sans-serif] lg:text-right"
              style={{
                color: "rgba(217,178,122,0.75)",
                fontSize: "clamp(0.875rem, 1.2vw, 1.5rem)",
                letterSpacing: "0.05em",
                lineHeight: 1.45,
              }}
            >
              <p>Always pursuing the extreme and seeking the perfection</p>
              <p>Always aiming at winning lawsuits and fulfilling clients' business goals</p>
            </div>
          </div>

          <div className="h-px bg-[#343434]/80 my-[2.5rem]" />

          <div
            className="font-['Poppins:Regular',sans-serif] text-[#7a7a7a] space-y-4"
            style={{ fontSize: "clamp(0.875rem, 1vw, 1.25rem)", lineHeight: 1.75 }}
          >
            <p>
              Suite 01, 25F, Tower A, Sino-Ocean International Center, 56 East 4th Ring
              Middle Road, Chaoyang District, Beijing 100025, China
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-16">
              <span>010-85885228</span>
              <span>contact@tigerpartners.cn</span>
            </div>
          </div>

          <div className="h-px bg-[#343434]/80 mt-[2.5rem]" />

          <div
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-[2rem] font-['Inter:Regular',sans-serif] text-[#7f7f7f] text-center md:text-left"
            style={{ fontSize: "clamp(0.75rem, 0.9vw, 1rem)" }}
          >
            <p>All Rights Reserved © 2019 Tiger Partners</p>
            <p className="cursor-pointer hover:text-white transition-colors">
              Disclaimer and Privacy
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <span>京ICP备20002490号</span>
              <span className="hidden sm:inline">京公网安备11010502052714号</span>
              <img src={qrImg} alt="" className="w-5 h-5 object-contain" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
