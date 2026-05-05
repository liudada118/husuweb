import { Mail, Phone, MapPin, Globe, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";

const GOLD = "#C9A24A";
const GOLD_BRIGHT = "#E8B547";
const BG = "#181A1D";
const CARD = "#1F2226";
const BORDER = "#2A2D31";

function TopNav() {
  return (
    <nav className="w-full" style={{ background: BG }}>
      <div
        className="mx-auto flex items-center justify-between container-pad"
        style={{ maxWidth: "90rem", padding: "1.25rem 5rem" }}
      >
        <div className="flex items-center" style={{ gap: "0.75rem" }}>
          <div
            style={{
              width: "2.25rem",
              height: "2.25rem",
              background: GOLD,
              clipPath:
                "polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)",
            }}
          />
          <span style={{ color: GOLD, letterSpacing: "0.15em", fontSize: "0.875rem" }}>
            TIGER LAW
          </span>
        </div>
        <ul
          className="flex items-center nav-links"
          style={{ gap: "2.5rem", color: "#D9D9D9", fontSize: "0.875rem", letterSpacing: "0.1em" }}
        >
          {["HOME", "ABOUT", "SERVICES", "TEAM", "CONTACT"].map((i) => (
            <li key={i} style={{ color: i === "TEAM" ? GOLD : "#D9D9D9" }}>
              {i}
            </li>
          ))}
        </ul>
        <div className="flex items-center" style={{ gap: "0.5rem", color: "#9A9A9A", fontSize: "0.75rem" }}>
          <Globe size="0.9rem" />
          <span style={{ color: GOLD }}>EN</span>
          <span>/</span>
          <span>CN</span>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section style={{ background: BG, borderTop: `1px solid ${BORDER}` }}>
      <div
        className="mx-auto grid container-pad hero-grid"
        style={{
          maxWidth: "90rem",
          padding: "3rem 5rem 3.5rem",
          gap: "3rem",
        }}
      >
        <div
          style={{
            width: "18rem",
            height: "22rem",
            overflow: "hidden",
            borderRadius: "0.25rem",
          }}
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1556157382-97eda2d62296?w=600"
            alt="Yuxuan Liu"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col" style={{ paddingTop: "1.5rem" }}>
          <h1
            style={{
              color: "#F2F2F2",
              fontSize: "3.5rem",
              fontWeight: 300,
              letterSpacing: "0.02em",
              lineHeight: 1.1,
            }}
          >
            Yuxuan&nbsp;&nbsp;Liu
          </h1>
          <p style={{ color: GOLD, fontSize: "1.125rem", marginTop: "0.75rem", letterSpacing: "0.05em" }}>
            Managing Partner
          </p>
          <div
            className="flex items-center"
            style={{ gap: "0.5rem", marginTop: "1.25rem", color: "#B8B8B8", fontSize: "0.875rem" }}
          >
            <Mail size="1rem" style={{ color: GOLD }} />
            <span>yuxuan.liu@tigerlaw.com</span>
          </div>
          <div
            className="grid info-grid"
            style={{
              gap: "1.5rem",
              marginTop: "2.5rem",
              borderTop: `1px solid ${BORDER}`,
              paddingTop: "1.5rem",
            }}
          >
            <InfoBlock
              title="Service Industries"
              items={[
                "Commerce & Investment",
                "Foreign Trade",
                "Corporate Governance",
                "M&A and Restructuring",
                "Banking and Securities",
              ]}
            />
            <InfoBlock
              title="Professional Qualification"
              items={["Bar admission in the People's Republic of China"]}
            />
            <InfoBlock
              title="Educational Background"
              items={[
                "LL.M, Tsinghua University",
                "LL.B, Peking University",
              ]}
            />
            <InfoBlock title="Language Skills" items={["Mandarin", "English"]} />
          </div>
          <div style={{ marginTop: "1.75rem" }}>
            <h4 style={{ color: GOLD, fontSize: "0.95rem", letterSpacing: "0.05em" }}>
              Social Engagements
            </h4>
            <p
              style={{
                color: "#9A9A9A",
                fontSize: "0.8rem",
                lineHeight: 1.7,
                marginTop: "0.5rem",
                maxWidth: "60rem",
              }}
            >
              Mr. Liu currently serves as a member of the Commercial Arbitration, an Endorsed Expert of the Beijing Lawyers Association, Deputy Director of the Arbitration and Mediation Committee of the Chaoyang District Lawyers Association, and a member of the China International Economic and Trade Arbitration Commission. He is also actively involved in pro-bono initiatives and continuing legal education programs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="flex items-center" style={{ gap: "0.4rem" }}>
        <span style={{ width: "0.35rem", height: "0.35rem", background: GOLD, borderRadius: "999px" }} />
        <h4 style={{ color: GOLD, fontSize: "0.85rem", letterSpacing: "0.04em" }}>{title}</h4>
      </div>
      <ul style={{ marginTop: "0.65rem", color: "#B8B8B8", fontSize: "0.78rem", lineHeight: 1.85 }}>
        {items.map((it) => (
          <li key={it}>{it}</li>
        ))}
      </ul>
    </div>
  );
}

function Breadcrumb() {
  return (
    <div style={{ background: "#0F1113", borderTop: `1px solid ${BORDER}` }}>
      <div
        className="mx-auto flex items-center container-pad"
        style={{
          maxWidth: "90rem",
          padding: "0.85rem 5rem",
          gap: "0.4rem",
          color: "#7A7A7A",
          fontSize: "0.8rem",
        }}
      >
        <span>Our Team</span>
        <ChevronRight size="0.85rem" />
        <span style={{ color: GOLD }}>Yuxuan Liu</span>
      </div>
    </div>
  );
}

function ExperiencesSection() {
  return (
    <section style={{ background: BG, paddingTop: "3rem", paddingBottom: "1rem" }}>
      <div className="mx-auto container-pad" style={{ maxWidth: "90rem", padding: "0 5rem" }}>
        <h2
          style={{
            color: "#F2F2F2",
            fontSize: "1.75rem",
            fontWeight: 400,
            letterSpacing: "0.03em",
          }}
        >
          Experiences & capabilities
        </h2>
        <div style={{ width: "3rem", height: "2px", background: GOLD, marginTop: "0.6rem" }} />
        <div
          className="grid exp-grid"
          style={{
            gap: "2.5rem",
            marginTop: "2rem",
          }}
        >
          <Card>
            <CardTitle>Practice Area</CardTitle>
            <p
              style={{
                color: "#A8A8A8",
                fontSize: "0.82rem",
                lineHeight: 1.85,
                marginTop: "1rem",
              }}
            >
              <span style={{ color: GOLD }}>Practice Expertise</span>
              <br />
              As the founding partner of Tiger Partners, Mr. Liu has nearly two decades of experience in cross-border investment, complex corporate disputes and international arbitration. He has represented multinational enterprises, sovereign funds and Fortune 500 corporates in landmark transactions, including a USD 2.4 billion energy joint venture, the restructuring of a regional logistics group, the establishment of a special economic zone in Southeast Asia, the listing of a leading consumer-tech firm in Hong Kong, and the resolution of multi-jurisdictional regulatory matters across the EU, ASEAN and Greater China.
            </p>
          </Card>
          <Card>
            <CardTitle>Hours</CardTitle>
            <ul
              style={{
                marginTop: "1rem",
                color: "#B8B8B8",
                fontSize: "0.82rem",
                lineHeight: 2,
              }}
            >
              <li>Mon – Fri &nbsp;&nbsp; 09:00 – 19:00</li>
              <li>Saturday &nbsp;&nbsp; 10:00 – 16:00</li>
              <li>Sunday &nbsp;&nbsp;&nbsp; By Appointment</li>
              <li style={{ color: "#7A7A7A", marginTop: "0.5rem" }}>
                Consultations available in Mandarin & English. International calls welcomed across all major time zones.
              </li>
            </ul>
            <button
              style={{
                marginTop: "1.5rem",
                background: GOLD_BRIGHT,
                color: "#1A1A1A",
                padding: "0.6rem 1.5rem",
                borderRadius: "0.2rem",
                fontSize: "0.8rem",
                letterSpacing: "0.08em",
              }}
            >
              Book Now
            </button>
          </Card>
        </div>
      </div>
    </section>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: CARD,
        border: `1px solid ${BORDER}`,
        borderRadius: "0.4rem",
        padding: "1.75rem 1.75rem",
      }}
    >
      {children}
    </div>
  );
}

function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center" style={{ gap: "0.5rem" }}>
      <span style={{ width: "0.4rem", height: "0.4rem", background: GOLD, borderRadius: "999px" }} />
      <h3 style={{ color: "#F0F0F0", fontSize: "1rem", letterSpacing: "0.04em", fontWeight: 500 }}>
        {children}
      </h3>
    </div>
  );
}

function Performance() {
  const items = [
    "Represented a leading state-owned enterprise in a USD 1.8 billion cross-border M&A involving energy infrastructure assets across Southeast Asia, advising on regulatory clearance, FDI structuring and post-closing integration.",
    "Represented a sovereign wealth fund in a complex multi-jurisdictional dispute before the SIAC concerning shareholder rights and joint venture exit, securing a favourable award in excess of USD 400 million.",
    "Acted for a Fortune 500 technology company in establishing its Asia-Pacific HQ in Beijing, including special economic zone qualification, tax incentive negotiation and large-scale talent migration matters.",
    "Represented a leading domestic conglomerate in a multi-billion dispute against a global private equity firm involving allegations of breach of warranty, fraud and indemnity claims under English law.",
  ];
  return (
    <section style={{ background: BG, paddingTop: "2.5rem", paddingBottom: "3.5rem" }}>
      <div className="mx-auto container-pad" style={{ maxWidth: "90rem", padding: "0 5rem" }}>
        <h2
          style={{
            color: "#F2F2F2",
            fontSize: "1.75rem",
            fontWeight: 400,
            letterSpacing: "0.03em",
          }}
        >
          Performance & Achievements
        </h2>
        <div style={{ width: "3rem", height: "2px", background: GOLD, marginTop: "0.6rem" }} />
        <div
          className="grid perf-grid"
          style={{
            gap: "1.25rem",
            marginTop: "2rem",
          }}
        >
          {items.map((t, i) => (
            <div
              key={i}
              style={{
                background: CARD,
                border: `1px solid ${BORDER}`,
                borderRadius: "0.4rem",
                padding: "1.25rem 1.4rem",
                display: "flex",
                gap: "0.75rem",
              }}
            >
              <span
                style={{
                  flex: "none",
                  width: "1.6rem",
                  height: "1.6rem",
                  borderRadius: "999px",
                  background: "rgba(201,162,74,0.12)",
                  color: GOLD,
                  display: "grid",
                  placeItems: "center",
                  fontSize: "0.78rem",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p style={{ color: "#A8A8A8", fontSize: "0.78rem", lineHeight: 1.75 }}>{t}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center" style={{ marginTop: "2rem" }}>
          <button
            style={{
              background: GOLD_BRIGHT,
              color: "#1A1A1A",
              padding: "0.7rem 2rem",
              borderRadius: "0.2rem",
              fontSize: "0.85rem",
              letterSpacing: "0.08em",
            }}
          >
            Read more
          </button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#0E1012", borderTop: `1px solid ${BORDER}` }}>
      <div
        className="mx-auto container-pad"
        style={{
          maxWidth: "90rem",
          padding: "2.5rem 5rem 1.5rem",
        }}
      >
        <div className="flex flex-col items-center" style={{ gap: "0.75rem" }}>
          <div
            style={{
              width: "3.5rem",
              height: "3.5rem",
              background: GOLD,
              clipPath:
                "polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)",
            }}
          />
          <h3
            style={{
              color: GOLD,
              fontSize: "1.1rem",
              letterSpacing: "0.3em",
            }}
          >
            TIGER LAW
          </h3>
          <p
            style={{
              color: "#8A8A8A",
              fontSize: "0.75rem",
              maxWidth: "32rem",
              textAlign: "center",
              lineHeight: 1.7,
            }}
          >
            Pursuing excellence in cross-border legal services. Trusted by Fortune 500 corporates, sovereign funds and global investors since 2003.
          </p>
        </div>
        <div
          style={{
            marginTop: "1.75rem",
            paddingTop: "1.25rem",
            borderTop: `1px solid ${BORDER}`,
            display: "flex",
            justifyContent: "space-between",
            color: "#6E6E6E",
            fontSize: "0.72rem",
          }}
          className="flex-wrap gap-4"
        >
          <div className="flex items-center" style={{ gap: "0.4rem" }}>
            <Phone size="0.8rem" /> +86 10 8888 6666
          </div>
          <div className="flex items-center" style={{ gap: "0.4rem" }}>
            <Mail size="0.8rem" /> contact@tigerlaw.com
          </div>
          <div className="flex items-center" style={{ gap: "0.4rem" }}>
            <MapPin size="0.8rem" /> Chaoyang, Beijing, China
          </div>
          <div>© 2026 Tiger Law. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div style={{ background: BG, minHeight: "100vh", width: "100%" }}>
      <TopNav />
      <Hero />
      <Breadcrumb />
      <ExperiencesSection />
      <Performance />
      <Footer />
    </div>
  );
}
