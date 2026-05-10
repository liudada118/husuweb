"use client";

import Link from "next/link";
import { Globe, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { useLanguage } from "@/i18n/LanguageProvider";

const navItems = [
  { key: "HOME", en: "HOME", zh: "首页", href: "/" },
  { key: "ABOUT US", en: "ABOUT US", zh: "关于我们", href: "/about" },
  { key: "OUR TEAM", en: "OUR TEAM", zh: "虎诉团队", href: "/team" },
  { key: "INDUSTRIES", en: "INDUSTRIES", zh: "服务行业", href: "/industries" },
  { key: "EVENTS", en: "EVENTS", zh: "虎诉动态", href: "/events" },
  { key: "CONTACT", en: "CONTACT", zh: "联系我们", href: "/contact" },
] as const;

type ActiveNav = "HOME" | "ABOUT US" | "OUR TEAM" | "INDUSTRIES" | "EVENTS" | "CONTACT";

export function SiteHeader({ active }: { active: ActiveNav }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();

  useEffect(() => {
    const updateHeaderState = () => setScrolled(window.scrollY > 16);

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });

    return () => window.removeEventListener("scroll", updateHeaderState);
  }, []);

  const solid = scrolled || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
        solid
          ? "border-white/10 bg-[#0c0c0c]/[0.78] backdrop-blur-md"
          : "border-transparent bg-transparent backdrop-blur-0"
      }`}
    >
      <div className="site-shell flex min-h-[var(--header-height)] items-center justify-between gap-4 py-[1.2rem]">
        <Link href="/" className="flex min-w-0 items-center" onClick={() => setMenuOpen(false)}>
          <ImageWithFallback
            src="/assets/title/logo.svg"
            alt="Tiger Partners"
            loading="eager"
            className="h-auto w-[5.375rem] object-contain"
          />
        </Link>

        <nav className="hidden items-center gap-7 xl:flex">
          {navItems.map((item) => {
            const isActive = item.key === active;

            return (
              <Link
                key={item.key}
                href={item.href}
                className={`group relative text-[1.715rem] font-semibold tracking-[0.04em] transition-colors duration-150 ${
                  isActive ? "text-white" : "text-white/68 hover:text-white"
                }`}
              >
                {language === "en" ? item.en : item.zh}
                <span
                  className={`absolute -bottom-2 left-0 h-0.5 bg-[#d9b27a] transition-transform duration-200 origin-left ${
                    isActive ? "w-full scale-x-100" : "w-full scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
          <button
            type="button"
            onClick={toggleLanguage}
            className="flex h-10 items-center gap-2 rounded-full border border-white/[0.22] px-4 text-[1.715rem] font-semibold text-white/80 transition hover:border-white/[0.45] hover:bg-white/[0.08] hover:text-white"
            aria-label="Toggle language"
          >
            <Globe className="size-4" />
            {language === "en" ? "CN" : "英"}
          </button>
        </nav>

        <div className="flex items-center gap-3 xl:hidden">
          <button
            type="button"
            onClick={toggleLanguage}
            className="flex h-10 items-center gap-2 rounded-full border border-white/[0.22] px-3 text-[1.715rem] font-semibold text-white/80 transition hover:border-white/[0.45] hover:bg-white/[0.08] hover:text-white"
            aria-label="Toggle language"
          >
            <Globe className="size-4" />
            {language === "en" ? "CN" : "英"}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="flex size-11 items-center justify-center rounded-full border border-white/25 text-white transition hover:bg-white/10"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav className="border-t border-white/10 bg-[#0c0c0c]/95 xl:hidden">
          <div className="site-shell py-3">
            {navItems.map((item) => {
              const isActive = item.key === active;

              return (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`relative block px-1 py-4 text-[1.715rem] font-semibold tracking-[0.08em] transition-colors ${
                    isActive ? "text-white" : "text-white/70 hover:text-white"
                  }`}
                >
                  {language === "en" ? item.en : item.zh}
                  {isActive ? <span className="absolute bottom-2 left-1 h-0.5 w-10 bg-[#d9b27a]" /> : null}
                </Link>
              );
            })}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
