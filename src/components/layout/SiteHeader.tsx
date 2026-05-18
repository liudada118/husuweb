"use client";

import Link from "next/link";
import { Globe, Menu, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { usePublicCms } from "@/cms/PublicCmsProvider";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { useLanguage } from "@/i18n/LanguageProvider";

type ActiveNav = "HOME" | "ABOUT US" | "OUR TEAM" | "INDUSTRIES" | "EVENTS" | "CONTACT";

const defaultNavItems = [
  { id: "home", key: "HOME", en: "HOME", zh: "\u9996\u9875", href: "/", order: 10 },
  { id: "about", key: "ABOUT US", en: "ABOUT US", zh: "\u5173\u4e8e\u6211\u4eec", href: "/about", order: 20 },
  { id: "team", key: "OUR TEAM", en: "OUR TEAM", zh: "\u864e\u8bc9\u56e2\u961f", href: "/team", order: 30 },
  { id: "industries", key: "INDUSTRIES", en: "INDUSTRIES", zh: "\u670d\u52a1\u884c\u4e1a", href: "/industries", order: 40 },
  { id: "events", key: "EVENTS", en: "EVENTS", zh: "\u864e\u8bc9\u52a8\u6001", href: "/events", order: 50 },
  { id: "contact", key: "CONTACT", en: "CONTACT", zh: "\u8054\u7cfb\u6211\u4eec", href: "/contact", order: 60 },
] as const satisfies ReadonlyArray<{
  id: string;
  key: ActiveNav;
  en: string;
  zh: string;
  href: string;
  order: number;
}>;

function getActiveNavKey(id: string, href: string): ActiveNav {
  const matched =
    defaultNavItems.find((item) => item.id === id) ??
    defaultNavItems.find((item) => item.href === href) ??
    defaultNavItems.find((item) => item.href !== "/" && href.startsWith(item.href));

  return matched?.key ?? "HOME";
}

export function SiteHeader({ active }: { active: ActiveNav }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const cms = usePublicCms();

  useEffect(() => {
    const updateHeaderState = () => setScrolled(window.scrollY > 16);

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });

    return () => window.removeEventListener("scroll", updateHeaderState);
  }, []);

  const navItems = useMemo(() => {
    const cmsItems = cms?.header?.navigation;
    const source = cmsItems?.length ? cmsItems : defaultNavItems;

    return source
      .map((item, index) => {
        const labelEn = "labelEn" in item ? item.labelEn : item.en;
        const labelZh = "labelZh" in item ? item.labelZh : item.zh;
        const visible = "visible" in item ? item.visible !== false : true;

        return {
          sourceIndex: index,
          id: item.id,
          key: getActiveNavKey(item.id, item.href),
          en: labelEn || defaultNavItems[index]?.en || item.id,
          zh: labelZh || defaultNavItems[index]?.zh || labelEn || item.id,
          href: item.href || defaultNavItems[index]?.href || "/",
          order: item.order ?? defaultNavItems[index]?.order ?? index,
          visible,
        };
      })
      .filter((item) => item.visible)
      .sort((a, b) => a.order - b.order);
  }, [cms?.header?.navigation]);

  const solid = scrolled || menuOpen;
  const titleLogo = cms?.assets?.titleLogo ?? "/assets/title/logo.svg";
  const logoAlt = cms?.header?.siteName || "Tiger Partners";
  const languageLabel =
    language === "en"
      ? cms?.header?.languageZhLabel || "CN"
      : cms?.header?.languageEnLabel || "EN";
  const languageFieldKey =
    language === "en" ? "siteSettings__headerLanguageZhLabel" : "siteSettings__headerLanguageEnLabel";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
        solid
          ? "border-white/10 bg-[#0c0c0c]/[0.78] backdrop-blur-md"
          : "border-transparent bg-transparent backdrop-blur-0"
      }`}
    >
      <div className="site-shell flex min-h-[var(--header-height)] items-center justify-between gap-4 py-[1.2rem]">
        <Link
          href="/"
          className="flex min-w-0 items-center"
          data-cms-site-field="siteSettings__logoUrl"
          onClick={() => setMenuOpen(false)}
        >
          <ImageWithFallback
            src={titleLogo}
            alt={logoAlt}
            loading="eager"
            className="h-auto w-[5.375rem] object-contain"
          />
        </Link>

        <nav className="hidden items-center gap-7 xl:flex">
          {navItems.map((item) => {
            const isActive = item.key === active;
            const fieldKey =
              language === "en"
                ? `siteSettings__navigation__${item.sourceIndex}__labelEn`
                : `siteSettings__navigation__${item.sourceIndex}__labelZh`;

            return (
              <Link
                key={item.id}
                href={item.href}
                data-cms-site-field={fieldKey}
                className={`group relative text-[1.715rem] font-semibold tracking-[0.04em] transition-colors duration-150 ${
                  isActive ? "text-white" : "text-white/68 hover:text-white"
                }`}
              >
                {language === "en" ? item.en : item.zh}
                <span
                  className={`absolute -bottom-2 left-0 h-0.5 origin-left bg-[#d9b27a] transition-transform duration-200 ${
                    isActive ? "w-full scale-x-100" : "w-full scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
          <button
            type="button"
            onClick={toggleLanguage}
            data-cms-site-field={languageFieldKey}
            className="flex h-10 items-center gap-2 rounded-full border border-white/[0.22] px-4 text-[1.715rem] font-semibold text-white/80 transition hover:border-white/[0.45] hover:bg-white/[0.08] hover:text-white"
            aria-label="Toggle language"
          >
            <Globe className="size-4" />
            {languageLabel}
          </button>
        </nav>

        <div className="flex items-center gap-3 xl:hidden">
          <button
            type="button"
            onClick={toggleLanguage}
            data-cms-site-field={languageFieldKey}
            className="flex h-10 items-center gap-2 rounded-full border border-white/[0.22] px-3 text-[1.715rem] font-semibold text-white/80 transition hover:border-white/[0.45] hover:bg-white/[0.08] hover:text-white"
            aria-label="Toggle language"
          >
            <Globe className="size-4" />
            {languageLabel}
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
              const fieldKey =
                language === "en"
                  ? `siteSettings__navigation__${item.sourceIndex}__labelEn`
                  : `siteSettings__navigation__${item.sourceIndex}__labelZh`;

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  data-cms-site-field={fieldKey}
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
