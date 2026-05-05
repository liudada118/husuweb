import { Globe, Menu } from "lucide-react";

const navItems = [
  { label: "HOME", active: false },
  { label: "ABOUT US", active: false },
  { label: "OUR TEAM", active: false },
  { label: "INDUSTRIES", active: true },
  { label: "EVENTS", active: false },
  { label: "CONTACT", active: false },
];

export function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-30">
      <div className="mx-auto max-w-[120rem] px-[2.5rem] lg:px-[3rem] xl:px-[3.5rem] pt-[2.5rem] flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-[0.75rem]">
          <div className="flex flex-col leading-none">
            <span className="text-[#d9b27a] tracking-[0.2em] text-[1.25rem] font-semibold">TIGER</span>
            <span className="text-[#d9b27a] tracking-[0.2em] text-[0.625rem] font-light mt-[0.15rem]">PARTNERS</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-[2.5rem]">
          {navItems.map((item) => (
            <div key={item.label} className="relative">
              <a
                href="#"
                className={`text-[1.125rem] tracking-[0.05em] font-semibold uppercase transition-colors ${
                  item.active ? "text-[#d9b27a]" : "text-white hover:text-[#d9b27a]"
                }`}
              >
                {item.label}
              </a>
              {item.active && (
                <span className="absolute -bottom-[0.5rem] left-0 right-0 h-[1px] bg-[#d9b27a]" />
              )}
            </div>
          ))}
          <div className="flex items-center gap-[0.5rem] pl-[1.5rem] border-l border-white/20 h-[1.75rem]">
            <Globe className="text-white" size={16} />
            <span className="text-white text-[1rem] font-semibold tracking-[0.08em]">EN</span>
          </div>
        </nav>

        {/* Mobile menu */}
        <button className="lg:hidden text-white" aria-label="menu">
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
}
