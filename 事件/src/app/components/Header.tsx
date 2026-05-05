import { Globe } from "lucide-react";

const navItems = [
  { label: "HOME", active: true },
  { label: "ABOUT US" },
  { label: "OUR TEAM" },
  { label: "INDUSTRIES" },
  { label: "EVENTS" },
  { label: "CONTACT" },
];

export function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-20">
      <div className="mx-auto max-w-[120rem] px-[2rem] lg:px-[3.5rem] py-[1.75rem] flex items-center justify-between gap-[2rem]">
        <div className="text-[#D9B27A] tracking-[0.15em]" style={{ fontFamily: "'Poppins', serif", fontWeight: 700, fontSize: "1.5rem" }}>
          TIGER
          <span className="block text-[0.625rem] tracking-[0.4em] text-[#D9B27A]/80" style={{ fontWeight: 400 }}>PARTNERS</span>
        </div>
        <nav className="hidden lg:flex items-center gap-[2.25rem]">
          {navItems.map((item) => (
            <a
              key={item.label}
              href="#"
              className={`relative uppercase tracking-[0.05em] whitespace-nowrap transition-colors ${
                item.active ? "text-[#D9B27A]" : "text-white hover:text-[#D9B27A]"
              }`}
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: item.active ? 700 : 600, fontSize: "1rem" }}
            >
              {item.label}
              {item.active && (
                <span className="absolute -bottom-[0.5rem] left-0 right-0 h-px bg-[#D9B27A]" />
              )}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-[0.5rem] pl-[1.5rem] border-l border-white/20">
          <Globe className="w-[1.125rem] h-[1.125rem] text-white" />
          <span className="text-white tracking-[0.05em]" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "1rem" }}>EN</span>
        </div>
      </div>
    </header>
  );
}
