import { Globe } from "lucide-react";

const links = ["HOME", "ABOUT US", "OUR TEAM", "INDUSTRIES", "EVENTS", "CONTACT"];

export function Nav() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-30 bg-black/80 backdrop-blur-sm">
      <div className="mx-auto max-w-[120rem] h-[5rem] px-[2.5rem] flex items-center justify-between">
        <div className="flex items-center gap-[0.75rem]">
          <div className="w-[2.5rem] h-[2.5rem] rounded-sm bg-[#d9b27a] flex items-center justify-center text-black" style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.25rem' }}>
            T
          </div>
          <span className="text-[#d9b27a] tracking-[0.15em] hidden sm:inline" style={{ fontSize: '0.875rem', fontWeight: 600 }}>TIGER PARTNERS</span>
        </div>
        <ul className="hidden lg:flex items-center gap-[2.25rem]">
          {links.map((l, i) => (
            <li key={l} className="relative">
              <a className="uppercase tracking-[0.05em] transition-colors hover:text-[#d9b27a]" style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: '0.9375rem', color: i === 0 ? '#d9b27a' : '#fff' }} href="#">
                {l}
              </a>
              {i === 0 && <span className="absolute -bottom-[0.4rem] left-0 right-0 h-px bg-[#d9b27a]" />}
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-[0.5rem] pl-[1.25rem] border-l border-white/20">
          <Globe className="w-4 h-4 text-white" />
          <span style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 600, fontSize: '0.9375rem', letterSpacing: '0.08em' }} className="text-white">EN</span>
        </div>
      </div>
    </nav>
  );
}
