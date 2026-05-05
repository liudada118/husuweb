import cityImg from "../../imports/Events/7d09b4bdfd31897b32cfdef459e628a3296dd490.png";
import logoImg from "../../imports/Events/36ad2f8d299cc6686a0c53c13c322bc4f42a8e87.png";
import qrImg from "../../imports/Events/29c400bc3b89f6085766dac4e0330ded5cb73d52.png";

const navItems = [
  { label: "HOME", active: true },
  { label: "ABOUT US" },
  { label: "OUR TEAM" },
  { label: "INDUSTRIES" },
  { label: "EVENTS" },
  { label: "CONTACT" },
];

const cards = [
  "Graduated from well-known law schools in China, with profound legal knowledge.",
  "Passed the Bar Examination.",
  "Positive and Energetic, with good communication skills.",
  "Have one or two abiding hobbies.",
];

export function ContactPage() {
  return (
    <div
      className="relative w-full mx-auto text-white overflow-hidden"
      style={{
        maxWidth: "120rem",
        background: "#171717",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Top hero gradient background */}
      <div
        className="absolute top-0 left-0 w-full pointer-events-none"
        style={{
          height: "40.3125rem",
          background:
            "linear-gradient(180deg, #1e1e1e 0%, rgba(217,178,122,0.25) 100%)",
          mixBlendMode: "color-dodge",
        }}
      />
      <div
        className="absolute top-0 left-0 pointer-events-none"
        style={{
          width: "100%",
          height: "40.3125rem",
          background:
            "linear-gradient(180deg, #121212 0%, rgba(18,18,18,0) 60%)",
          clipPath: "polygon(0 0, 7% 0, 100% 100%, 0 100%)",
        }}
      />

      {/* Header */}
      <header
        className="relative z-10 flex items-center justify-between"
        style={{
          paddingLeft: "9.75rem",
          paddingRight: "0",
          paddingTop: "2.25rem",
          paddingBottom: "1.5rem",
        }}
      >
        <div style={{ width: "5.4rem", height: "3.2rem" }}>
          <img src={logoImg} alt="logo" className="w-full h-full object-contain" style={{ filter: "brightness(0) invert(0.75) sepia(0.5) saturate(2) hue-rotate(350deg)" }} />
        </div>
        <nav
          className="flex items-center"
          style={{ gap: "2.5rem", paddingRight: "1.5rem" }}
        >
          {navItems.map((item) => (
            <div key={item.label} className="relative">
              <span
                className="uppercase whitespace-nowrap"
                style={{
                  fontSize: "1.125rem",
                  letterSpacing: "0.03125rem",
                  fontWeight: item.active ? 700 : 600,
                  color: item.active ? "#d9b27a" : "#ffffff",
                  lineHeight: 1.25,
                }}
              >
                {item.label}
              </span>
              {item.active && (
                <div
                  className="absolute"
                  style={{
                    left: 0,
                    bottom: "-0.5rem",
                    width: "3rem",
                    height: "1px",
                    background: "#d9b27a",
                  }}
                />
              )}
            </div>
          ))}
          <div
            className="flex items-center"
            style={{
              borderLeft: "1px solid rgba(255,255,255,0.2)",
              paddingLeft: "1.5rem",
              gap: "0.5rem",
              marginLeft: "0.5rem",
              height: "2.8125rem",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="8.33" stroke="white" strokeWidth="1.33" />
              <path d="M1.67 10h16.66M10 1.67c2.08 2.28 3.27 5.23 3.33 8.33-.06 3.1-1.25 6.05-3.33 8.33-2.08-2.28-3.27-5.23-3.33-8.33C6.73 6.9 7.92 3.95 10 1.67z" stroke="white" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontSize: "1.125rem", fontWeight: 600, letterSpacing: "0.075rem" }}>EN</span>
          </div>
        </nav>
      </header>

      {/* CONTACT title section */}
      <section
        className="relative z-10"
        style={{
          paddingLeft: "9.75rem",
          paddingRight: "9.75rem",
          paddingTop: "9rem",
          paddingBottom: "7rem",
        }}
      >
        <h1
          className="italic uppercase"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 500,
            fontStyle: "italic",
            fontSize: "6rem",
            color: "#d9b27a",
            letterSpacing: "-0.1875rem",
            lineHeight: 1,
            margin: 0,
          }}
        >
          CONTACT
        </h1>
        <p
          style={{
            marginTop: "3rem",
            fontWeight: 300,
            fontSize: "2.25rem",
            color: "#868686",
            lineHeight: 1.55,
            letterSpacing: "0.0625rem",
            maxWidth: "89.75rem",
          }}
        >
          When you face legal problems, please contact us without hesitation On
          our way achieving our goals, we are also looking for partners with the
          same professional ideal
        </p>
        <div
          style={{
            marginTop: "3.5rem",
            width: "6.25rem",
            height: "0.125rem",
            background: "#3a3a3a",
          }}
        />
      </section>

      {/* Welcome / Join Us section */}
      <section
        className="relative z-10 grid"
        style={{
          paddingLeft: "9.75rem",
          paddingRight: "9.75rem",
          paddingBottom: "5rem",
          gridTemplateColumns: "minmax(auto, 26.75rem) 1px 1fr",
          gap: "4.625rem",
          alignItems: "start",
        }}
      >
        <div
          className="italic"
          style={{
            fontWeight: 300,
            fontStyle: "italic",
            fontSize: "5.625rem",
            color: "#f1efec",
            lineHeight: 1.1,
            letterSpacing: "-0.1875rem",
          }}
        >
          <div>Welcome</div>
          <div>To</div>
          <div style={{ color: "#d9b27a" }}>Join Us</div>
        </div>
        <div style={{ width: "1px", height: "16rem", background: "#d9b27a", marginTop: "1.25rem" }} />
        <p
          style={{
            fontSize: "1.75rem",
            color: "rgba(255,255,255,0.7)",
            lineHeight: 1.78,
            letterSpacing: "0.0625rem",
            marginTop: "1.25rem",
          }}
        >
          We are looking for candidates with ambition and enthusiasm for life,
          who recognize lawyers' status and dignity in social life, and embrace
          the work of disputes resolution as the cornerstone for law school
          graduates to realize their value, even as the standpoint of their
          whole life.
        </p>
      </section>

      {/* 4 cards */}
      <section
        className="relative z-10 grid"
        style={{
          paddingLeft: "9.75rem",
          paddingRight: "9.75rem",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1.5625rem",
        }}
      >
        {cards.map((text, i) => (
          <div
            key={i}
            className="relative"
            style={{
              height: "29rem",
              border: "2px solid #625e57",
              background:
                "linear-gradient(162.215deg, rgb(59,59,59) 19.6%, rgb(250,194,113) 276%)",
              mixBlendMode: "color-dodge",
              padding: "2.5rem",
            }}
          >
            <div
              className="italic"
              style={{
                fontWeight: 500,
                fontStyle: "italic",
                fontSize: "4rem",
                color: "#d9b27a",
                lineHeight: 1,
              }}
            >
              {i + 1}.
            </div>
            <p
              style={{
                marginTop: "3.125rem",
                fontWeight: 600,
                fontSize: "1.75rem",
                color: "rgba(255,255,255,0.85)",
                lineHeight: 1.6,
                letterSpacing: "0.0625rem",
              }}
            >
              {text}
            </p>
          </div>
        ))}
      </section>

      {/* Resume line */}
      <section
        className="relative z-10 text-center"
        style={{
          paddingTop: "5rem",
          paddingBottom: "5rem",
          paddingLeft: "9.75rem",
          paddingRight: "9.75rem",
        }}
      >
        <p style={{ fontSize: "2.5rem", letterSpacing: "0.0625rem", lineHeight: 1.4 }}>
          <span style={{ fontStyle: "italic", fontWeight: 300, color: "rgba(183,183,183,0.7)" }}>
            Please send your résumé to
          </span>{" "}
          <span style={{ fontWeight: 400, color: "#d9b27a" }}>
            recruit@tigerpartners.cn
          </span>
        </p>
      </section>

      {/* City image with side bar */}
      <section className="relative z-10" style={{ height: "45.5625rem" }}>
        <div
          className="absolute"
          style={{
            left: 0,
            top: 0,
            width: "29.75rem",
            height: "100%",
            background: "#818181",
            mixBlendMode: "screen",
            opacity: 0.15,
          }}
        />
        <div
          className="absolute"
          style={{
            left: "29.75rem",
            top: 0,
            right: 0,
            height: "100%",
            overflow: "hidden",
          }}
        >
          <img
            src={cityImg}
            alt="city"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Footer */}
      <footer
        className="relative z-10"
        style={{
          background:
            "linear-gradient(248.144deg, rgb(46,46,46) 49.3%, rgb(18,18,18) 65.9%)",
          paddingTop: "5rem",
        }}
      >
        <div
          style={{
            paddingLeft: "9.75rem",
            paddingRight: "9.75rem",
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            alignItems: "start",
            gap: "3rem",
          }}
        >
          <div style={{ width: "9.5625rem", color: "#d9b27a" }}>
            <img src={logoImg} alt="Tiger Partners" style={{ width: "100%", filter: "brightness(0) invert(0.75) sepia(0.5) saturate(2) hue-rotate(350deg)" }} />
            <div style={{ marginTop: "1rem", fontWeight: 700, fontSize: "1.5rem", letterSpacing: "0.125rem" }}>TIGER &amp; 同伦</div>
          </div>
          <div
            className="text-right"
            style={{
              fontWeight: 500,
              fontSize: "1.5rem",
              color: "rgba(217,178,122,0.7)",
              letterSpacing: "0.075rem",
              lineHeight: 1.4,
            }}
          >
            <div>Always pursuing the extreme and seeking the perfection</div>
            <div>Always aiming at winning lawsuits and fulfilling clients' business goals</div>
          </div>
        </div>

        <div
          style={{
            margin: "3rem 9.75rem 0",
            height: "1px",
            background: "rgba(52,52,52,0.8)",
          }}
        />

        <div
          style={{
            paddingLeft: "9.75rem",
            paddingRight: "9.75rem",
            paddingTop: "2.5rem",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "2rem",
            alignItems: "start",
          }}
        >
          <div style={{ color: "#535353", fontSize: "1.25rem", lineHeight: 1.75 }}>
            <p>
              Suite 01, 25F, Tower A, Sino-Ocean International Center, 56 East
              4th Ring Middle Road, Chaoyang District, Beijing 100025, China
            </p>
            <p style={{ marginTop: "1.5rem" }}>
              010-85885228&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;contact@tigerpartners.cn
            </p>
          </div>
          <div style={{ width: "6.9375rem", height: "6.9375rem", background: "#fff", padding: "0.25rem" }}>
            <img src={qrImg} alt="qr" className="w-full h-full object-cover" />
          </div>
        </div>

        <div
          style={{
            margin: "2.5rem 9.75rem 0",
            height: "1px",
            background: "rgba(52,52,52,0.8)",
          }}
        />

        <div
          style={{
            paddingLeft: "9.75rem",
            paddingRight: "9.75rem",
            paddingTop: "1.75rem",
            paddingBottom: "2.25rem",
            background: "rgba(25,25,25,0.6)",
            marginTop: "1.5rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "1.5rem 2rem",
            justifyContent: "space-between",
            color: "#7f7f7f",
            fontSize: "1rem",
          }}
        >
          <span>All Rights Reserved © 2019 Tiger Partners</span>
          <span>Disclaimer and Privacy</span>
          <span>京ICP备20002490号</span>
          <span>京公网安备11010502052714号</span>
        </div>
      </footer>
    </div>
  );
}
