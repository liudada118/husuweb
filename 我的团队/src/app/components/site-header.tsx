import svgPaths from "../../imports/OurTeam/svg-la9ckb3a1i";

const navItems = [
  { label: "HOME", active: true },
  { label: "ABOUT US" },
  { label: "OUR TEAM" },
  { label: "INDUSTRIES" },
  { label: "EVENTS" },
  { label: "CONTACT" },
];

export function SiteHeader() {
  return (
    <header className="absolute top-0 left-0 right-0 z-30 px-[3rem] pt-[2rem]">
      <div className="max-w-[120rem] mx-auto flex items-center justify-between gap-[2rem]">
        <div className="w-[5.4rem] h-[4.4rem] shrink-0 text-[#d9b27a]">
          <svg
            viewBox="0 0 86.8477 70.1629"
            fill="currentColor"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <path d={svgPaths.p336e3600} />
            <path d={svgPaths.p1d66cd0} />
            <path d={svgPaths.p10fdaa80} />
            <path d={svgPaths.p28f63200} />
            <path d={svgPaths.p38a96480} />
            <path d={svgPaths.p392eac00} />
            <path d={svgPaths.p794900} />
            <path d={svgPaths.pe350e80} />
            <path d={svgPaths.p1fc5cc00} />
            <path d={svgPaths.p2f26d300} />
            <path d={svgPaths.p1ff1cf80} />
            <path d={svgPaths.p4a27e40} />
            <path d={svgPaths.p2bf53400} />
            <path d={svgPaths.p108c7100} />
            <path d={svgPaths.p37f3fb00} />
            <path d={svgPaths.pb38700} />
            <path d={svgPaths.p2f060e80} />
            <path d={svgPaths.p274a9880} />
            <path d={svgPaths.p1e9ea600} />
            <path d={svgPaths.p397c3100} />
            <path d={svgPaths.p2d59f600} />
            <path d={svgPaths.p2872f40} />
            <path d={svgPaths.p1f300480} />
            <path d={svgPaths.p2bff4d00} />
            <path d={svgPaths.p28e1480} />
            <path d={svgPaths.p2e1e2d80} />
            <path d={svgPaths.p2cb9f180} />
            <path d={svgPaths.p6eedd70} />
            <path d={svgPaths.p3eaaa500} />
          </svg>
        </div>

        <nav className="hidden lg:flex items-center gap-[2.5rem]">
          {navItems.map((item) => (
            <a
              key={item.label}
              href="#"
              className={`relative uppercase tracking-[0.5px] no-underline ${
                item.active ? "text-[#d9b27a]" : "text-white"
              }`}
              style={{ fontSize: "1.5rem", lineHeight: "1.25rem", fontWeight: item.active ? 700 : 600 }}
            >
              {item.label}
              {item.active && (
                <span className="absolute -bottom-[0.5rem] left-0 right-0 h-px bg-[#d9b27a]" />
              )}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-[0.5rem] pl-[2rem] border-l border-white/20 h-[2.8125rem]">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
            <circle cx="10" cy="10" r="8.33" stroke="white" strokeWidth="1.33" />
            <path d="M1.67 10h16.66" stroke="white" strokeWidth="1.33" />
            <path d="M10 1.67c2.08 2.28 3.27 5.23 3.33 8.33-.06 3.1-1.25 6.05-3.33 8.33-2.08-2.28-3.27-5.23-3.33-8.33.06-3.1 1.25-6.05 3.33-8.33z" stroke="white" strokeWidth="1.33" />
          </svg>
          <span
            className="text-white tracking-[1.25px]"
            style={{ fontSize: "1.5rem", lineHeight: "1.25rem", fontWeight: 600 }}
          >
            EN
          </span>
        </div>
      </div>
    </header>
  );
}
