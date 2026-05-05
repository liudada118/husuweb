import { Globe } from "lucide-react";
import img1 from "../imports/Events动态详情/eb00e06a7abf4ba3d84f9c93380d52e3195ca702.png";
import img2 from "../imports/Events动态详情/4de850f9ce30024823740a3ebd5711fd74ffc4a9.png";
import imgLogoFooter from "../imports/Events动态详情/36ad2f8d299cc6686a0c53c13c322bc4f42a8e87.png";

const navItems = ["HOME", "ABOUT US", "Our team", "Industries", "EVENTS", "CONTACT"];

const eduItems = [
  "Bachelor of Civil Law (BCL), University of Oxford",
  "Post-graduate Certificate in Laws (PCLL), City University of Hong Kong",
  "Bachelor of Laws with First Class Honours (LLB), City University of Hong",
  "Main Socail Position",
  "Member of Standing Committee on Mainland, Hong Kong Bar Association",
  "Vice-President of Hong Kong Legal Professional Advancement Association",
  "Guest Lecturer of City University of Hong Kong and Peking University",
  "Arbitrator of Nanjing Arbitration Commissio",
  "Arbitrator of Dongguan Arbitration Commission",
  "Kinsey also served as Deputy Presiding Officer of the Hong Kong Labour Tribunal from June 2021 to January 2022.",
];

const academicItems = [
  "Practical Guidance for Personal Injury Claims (2015 LexisNexis)",
  "Annotated Ordinance--Mainland Judgments (Reciprocal Enforcement) Ordinance (2021 LexisNexis)",
];

function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-20">
      <div className="mx-auto max-w-[120rem] px-[2.5rem] lg:px-[4rem] h-[7rem] flex items-center justify-between">
        <div
          className="text-[#D9B27A] tracking-[0.15em]"
          style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1.4rem", lineHeight: 1.2 }}
        >
          TIGER<br />PARTNERS
        </div>
        <nav className="hidden lg:flex items-center gap-[2.25rem]" style={{ fontFamily: "Poppins, sans-serif" }}>
          {navItems.map((item) => {
            const active = item === "EVENTS";
            return (
              <a
                key={item}
                href="#"
                className={`uppercase tracking-[0.05em] ${active ? "text-[#D9B27A] border-b border-[#D9B27A] pb-[0.4rem]" : "text-white"}`}
                style={{ fontWeight: active ? 700 : 600, fontSize: "1.125rem" }}
              >
                {item}
              </a>
            );
          })}
          <div className="flex items-center gap-[0.5rem] pl-[1.5rem] border-l border-white/20 text-white">
            <Globe size={18} />
            <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "1.125rem" }}>EN</span>
          </div>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer
      className="relative w-full text-white overflow-hidden"
      style={{ background: "linear-gradient(248.144deg, rgb(46,46,46) 49.305%, rgb(18,18,18) 65.946%)" }}
    >
      <div className="mx-auto max-w-[120rem] px-[2.5rem] lg:px-[10rem] pt-[5rem] pb-[3rem]">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-[3rem]">
          <div
            className="text-[#D9B27A] tracking-[0.15em]"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1.6rem", lineHeight: 1.3 }}
          >
            TIGER<br />PARTNERS
          </div>
          <div
            className="text-[rgba(217,178,122,0.7)] text-right max-w-[51rem]"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: "1.25rem", lineHeight: "2rem", letterSpacing: "0.06em" }}
          >
            <p>Always pursuing the extreme and seeking the perfection</p>
            <p>Always aiming at winning lawsuits and fulfilling clients' business goals</p>
          </div>
        </div>

        <div
          className="mt-[3rem] space-y-[1rem] text-[#535353]"
          style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: "1.125rem", lineHeight: "2rem" }}
        >
          <p>Suite 01, 25F, Tower A, Sino-Ocean International Center, 56 East 4th Ring Middle Road, Chaoyang District, Beijing 100025, China</p>
          <p className="whitespace-pre-wrap">010-85885228                              contact@tigerpartners.cn</p>
        </div>

        <div className="mt-[2rem] h-px bg-[#343434]/80" />

        <div className="mt-[1.5rem] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-[1.5rem]">
          <div className="flex items-center gap-[1rem]">
            <img src={imgLogoFooter} alt="" className="w-[6.5rem] h-[6.5rem] object-cover" />
          </div>
        </div>

        <div className="mt-[1rem] h-px bg-[#343434]/80" />

        <div
          className="mt-[1.5rem] flex flex-col md:flex-row md:items-center md:justify-between gap-[0.75rem] text-[#7f7f7f] text-center"
          style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", lineHeight: 1.6 }}
        >
          <p>All Rights Reserved © 2019 Tiger Partners</p>
          <p>Disclaimer and Privacy</p>
          <p>京ICP备20002490号</p>
          <p>京公网安备11010502052714号</p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen w-full bg-[#171717] text-white overflow-x-hidden">
      <Header />

      {/* Hero */}
      <section className="relative w-full">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, rgba(50,50,50,0) 0%, #333 89%)", mixBlendMode: "difference" }}
        />
        <div className="relative mx-auto max-w-[120rem] px-[2.5rem] lg:px-[10rem] pt-[12rem] pb-[3rem]">
          <p
            className="whitespace-pre-wrap"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 300, fontSize: "1.25rem", lineHeight: "2.1rem", letterSpacing: "0.02em" }}
          >
            <span className="text-[#dedede]">Events / </span>
            <span className="text-white" style={{ fontWeight: 500 }}>
              Tiger Dynamics | Kinsey Kang Yanan was engaged as Hong Kong Legal Counsel of Tiger Partners
            </span>
          </p>

          <h1
            className="mt-[4rem] text-white max-w-[97rem]"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "3.5rem", lineHeight: 1.2, letterSpacing: "-0.01em" }}
          >
            Tiger Dynamics | Kinsey Kang Yanan was engaged as Hong Kong Legal Counsel of Tiger Partners
          </h1>

          <p
            className="mt-[5rem] text-[#d9b27a]"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: "1.5rem", lineHeight: 1.4, letterSpacing: "0.02em" }}
          >
            Nov 17 , 2023
          </p>

          <div className="mt-[3.5rem] h-px bg-[#D9B27A]" />
        </div>
      </section>

      {/* First image */}
      <section className="relative">
        <div className="mx-auto max-w-[120rem] px-[2.5rem] lg:px-[10rem]">
          <div className="w-full overflow-hidden">
            <img src={img1} alt="" className="w-full h-auto object-cover" />
          </div>
        </div>
      </section>

      {/* Body content */}
      <section className="relative">
        <div className="mx-auto max-w-[120rem] px-[2.5rem] lg:px-[10rem] py-[5rem]">
          <p
            className="text-[#d1d5dc] text-justify max-w-[91rem]"
            style={{ fontFamily: "Poppins, sans-serif", fontStyle: "italic", fontWeight: 300, fontSize: "1.4rem", lineHeight: "2.4rem", letterSpacing: "0.02em" }}
          >
            Tiger Partners is honored to announce that Kinsey Kang Yanan, barrister-at-law, has been engaged as our Hong Kong Legal Counsel. From this day on, Tiger Partners will work with Kinsey wholeheartedly to provide our clients with more professional, efficient and convenient legal services.
          </p>

          <p
            className="mt-[2rem] text-[#d1d5dc] text-justify max-w-[91rem]"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: "1.4rem", lineHeight: "2.4rem", letterSpacing: "0.02em" }}
          >
            Kinsey was called to the Hong Kong Bar in 2012, and passed the 1st Guangdong - Hong Kong - Macau Greater Bay Area (GBA) Legal Professional Examination in 2021. Kinsey specializes in commercial disputes, employment disputes, cross-border litigation and international arbitration. She also constantly provides Hong Kong legal advice to Mainland companies and individuals in cross-border transactions and arbitration.
          </p>

          {/* Educational Background */}
          <h2
            className="mt-[4rem] text-[#ededed]"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "1.5rem", lineHeight: 1.4, letterSpacing: "0.02em" }}
          >
            Educational Background
          </h2>
          <ul className="mt-[1.5rem] space-y-[0.75rem]">
            {eduItems.map((t) => (
              <li key={t} className="flex gap-[1.25rem]">
                <span className="mt-[0.95rem] w-[0.375rem] h-[0.375rem] rounded-full bg-[#D9D9D9] shrink-0" />
                <p
                  className="text-[#99a1af] flex-1"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 300, fontSize: "1.4rem", lineHeight: "2.1rem", letterSpacing: "0.02em" }}
                >
                  {t}
                </p>
              </li>
            ))}
          </ul>

          {/* Academic Achievements */}
          <h2
            className="mt-[4rem] text-[#ededed]"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "1.5rem", lineHeight: 1.4, letterSpacing: "0.02em" }}
          >
            Academic Achievements
          </h2>
          <ul className="mt-[1.5rem] space-y-[0.75rem]">
            {academicItems.map((t) => (
              <li key={t} className="flex gap-[1.25rem]">
                <span className="mt-[0.95rem] w-[0.375rem] h-[0.375rem] rounded-full bg-[#D9D9D9] shrink-0" />
                <p
                  className="text-[#99a1af] flex-1"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 300, fontSize: "1.4rem", lineHeight: "2.1rem", letterSpacing: "0.02em" }}
                >
                  {t}
                </p>
              </li>
            ))}
          </ul>

          <p
            className="mt-[3rem] text-[#d1d5dc] text-justify max-w-[91rem]"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: "1.4rem", lineHeight: "2.4rem", letterSpacing: "0.02em" }}
          >
            Having been engaged in the field of cross-border dispute resolution for years, Kinsey also has a strong sense of social responsibility and academic attainments. Her accession to the team will certainly inject fresh and abundant energy into Tiger Partners and greatly enhance the breadth and depth of services provided by Tiger Partners to our clients on cross-border dispute resolution.
          </p>
        </div>
      </section>

      {/* Second image */}
      <section className="relative pb-[6rem]">
        <div className="mx-auto max-w-[120rem] px-[2.5rem] lg:px-[10rem]">
          <div className="w-full overflow-hidden">
            <img src={img2} alt="" className="w-full h-auto object-cover" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
