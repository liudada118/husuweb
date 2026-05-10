"use client";

import { Globe, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { usePublicCmsData } from "../../contexts/PublicCmsDataContext";
import {
  landingNavItems,
  landingSocialItems,
  landingTitleShellClassName,
  officialSiteHref,
} from "./shared";

export function LandingHeader() {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const { siteSettings } = usePublicCmsData();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const normalizedPathname = (() => {
    const currentPathname = pathname ?? "/";
    const pathWithoutBase = currentPathname.replace(/^\/test(?=\/|$)/, "") || "/";
    if (pathWithoutBase === "/") {
      return "/";
    }

    return pathWithoutBase.replace(/\/+$/, "") || "/";
  })();
  const isTransparentHero =
    (
      normalizedPathname === "/" ||
      normalizedPathname === "/about" ||
      normalizedPathname === "/awards" ||
      normalizedPathname === "/event" ||
      normalizedPathname === "/media" ||
      normalizedPathname === "/podcast" ||
      normalizedPathname === "/contact"
    ) &&
    !isScrolled &&
    !isMenuOpen;
  const isZh = language === "zh";

  useEffect(() => {
    let frameId: number | null = null;

    const syncScrolled = () => {
      frameId = null;
      const nextIsScrolled = window.scrollY > 10;
      setIsScrolled((current) => (current === nextIsScrolled ? current : nextIsScrolled));
    };

    const handleScroll = () => {
      if (frameId !== null) {
        return;
      }

      frameId = window.requestAnimationFrame(syncScrolled);
    };

    syncScrolled();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleLanguage = () => setLanguage(isZh ? "en" : "zh");
  const navFontClass = "font-['Akshar'] tracking-[0.06em]";
  const languageLabel = isZh
    ? siteSettings.headerLanguageZhLabel || "ZH"
    : siteSettings.headerLanguageEnLabel || "EN";
  const headerLogoUrl = siteSettings.logoUrl || "/assets/logo.svg";
  const officialHref = siteSettings.officialSiteUrl || officialSiteHref;
  const officialLabel = siteSettings.officialSiteLabel || "www.tigerpartners.cn";
  const officialLogoUrl = siteSettings.headerOfficialLogoUrl || "";
  const navItems = siteSettings.navigation?.length
    ? siteSettings.navigation
        .map((item, siteIndex) => ({ ...item, siteIndex }))
        .filter((item) => item.visible)
        .slice()
        .sort((itemA, itemB) => itemA.order - itemB.order)
        .map((item) => ({
          href: item.href,
          labels: { en: item.labelEn, zh: item.labelZh },
          siteIndex: item.siteIndex,
        }))
    : landingNavItems.map((item) => ({ ...item, siteIndex: undefined }));
  const socialItems = siteSettings.socialLinks?.length
    ? siteSettings.socialLinks
        .map((item, siteIndex) => ({ ...item, siteIndex }))
        .filter((item) => item.visible)
        .slice()
        .sort((itemA, itemB) => itemA.order - itemB.order)
    : landingSocialItems;

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full max-w-full overflow-x-clip border-b transition-all duration-300 ${
        isScrolled
          ? "border-[#2a2f2a] bg-[#161915]/96 backdrop-blur-xl"
          : isTransparentHero
            ? "border-transparent bg-transparent backdrop-blur-0"
            : "border-transparent bg-[#161915]/88 backdrop-blur-md"
      }`}
    >
      <div className={landingTitleShellClassName}>
        <div className="flex h-[var(--landing-header-height)] items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-4 min-[1400px]:gap-7">
            <Link
              href="/"
              aria-label="Tiger Partners"
              className="flex min-w-0 max-w-[min(58vw,13rem)] items-center sm:max-w-[15rem] min-[1400px]:w-[var(--landing-header-logo-width)] min-[1400px]:max-w-[var(--landing-header-logo-width)]"
            >
              <img
                src={headerLogoUrl}
                alt="Tiger Partners"
                data-cms-site-field="siteSettings__logoUrl"
                className="h-6 w-auto max-w-full object-contain sm:h-7 min-[1400px]:h-auto min-[1400px]:w-full"
              />
            </Link>

            <nav className="hidden min-[1400px]:flex items-center gap-4">
              {navItems.map((item) => {
                const itemPath = item.href.split("#")[0] || "/";
                const isActive = normalizedPathname === itemPath;

                return (
                  <Link
                    key={item.href + item.labels.en}
                    href={item.href}
                    className={`group relative inline-flex whitespace-nowrap pb-[0.32rem] text-[0.875rem] font-semibold transition-colors duration-200 ${navFontClass} ${
                      isActive ? "text-white" : "text-[#d6d6d6] hover:text-white"
                    }`}
                  >
                    <span data-cms-site-field={
                      item.siteIndex !== undefined
                        ? `siteSettings__navigation__${item.siteIndex}__${language === "zh" ? "labelZh" : "labelEn"}`
                        : undefined
                    }>{item.labels[language]}</span>
                    <span
                      aria-hidden="true"
                      className={`absolute bottom-0 left-0 h-[2px] w-full origin-left rounded-full bg-[#d9b27a] transition-transform duration-220 ease-out ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            <div className="hidden min-[1400px]:flex items-center gap-2">
              {socialItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  data-cms-site-field={
                    "siteIndex" in item && item.siteIndex !== undefined
                      ? `siteSettings__socialLinks__${item.siteIndex}__href`
                      : undefined
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-[6px] transition-all duration-200 hover:scale-110 hover:bg-white/12"
                >
                  <img
                    src={item.iconSrc}
                    alt=""
                    data-cms-site-field={
                      "siteIndex" in item && item.siteIndex !== undefined
                        ? `siteSettings__socialLinks__${item.siteIndex}__iconSrc`
                        : undefined
                    }
                    className="h-full w-full object-contain"
                  />
                </a>
              ))}
            </div>
          </div>

          <div className="hidden min-[1400px]:flex items-center gap-3">
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label={`Switch language to ${isZh ? "English" : "Chinese"}`}
              className="flex h-9 items-center gap-0 rounded-full border border-white/30 bg-white/[0.04] px-[0.15rem] text-sm transition-colors duration-200 hover:border-white/45 hover:bg-white/[0.08]"
            >
              <span className="flex h-7 w-[1.65rem] items-center justify-center text-[#d4d4d4]">
                <Globe className="h-4 w-4" />
              </span>
              <span
                data-cms-site-field={`siteSettings__${isZh ? "headerLanguageZhLabel" : "headerLanguageEnLabel"}`}
                className="flex h-7 min-w-[2.55rem] items-center justify-center rounded-full bg-transparent px-2 py-1 font-['Inter'] font-medium text-white transition-colors duration-200"
              >
                {languageLabel}
              </span>
            </button>

            <a
              href={officialHref}
              target="_blank"
              rel="noreferrer"
              data-cms-site-field="siteSettings__officialSiteUrl"
              className="flex h-9 items-center rounded-[0.375rem] border border-white px-3 font-['Akshar'] text-[0.75rem] font-medium text-[#d9b27a] transition-colors duration-200 hover:bg-white/6"
            >
              {officialLogoUrl ? (
                <img
                  src={officialLogoUrl}
                  alt={officialLabel}
                  data-cms-site-field="siteSettings__headerOfficialLogoUrl"
                  className="h-5 max-w-[8.5rem] object-contain"
                />
              ) : (
                <span data-cms-site-field="siteSettings__officialSiteLabel">{officialLabel}</span>
              )}
            </a>
          </div>

          <button
            type="button"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/10 min-[1400px]:hidden"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-white/10 bg-[#141914]/98 shadow-2xl shadow-black/35 min-[1400px]:hidden">
          <div className={`${landingTitleShellClassName} py-5`}>
            <nav className="grid gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href + item.labels.en}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 font-['Akshar'] text-sm  tracking-[0.2em] text-white/88 transition hover:border-[#d9b27a]/45 hover:bg-white/[0.06]"
                  data-cms-site-field={
                    item.siteIndex !== undefined
                      ? `siteSettings__navigation__${item.siteIndex}__${language === "zh" ? "labelZh" : "labelEn"}`
                      : undefined
                  }
                >
                  {item.labels[language]}
                </Link>
              ))}
            </nav>

            <div className="mt-4 flex items-center gap-3">
              {socialItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  data-cms-site-field={
                    "siteIndex" in item && item.siteIndex !== undefined
                      ? `siteSettings__socialLinks__${item.siteIndex}__href`
                      : undefined
                  }
                  className="flex h-11 w-11 items-center justify-center rounded-full transition hover:scale-110 hover:bg-white/[0.08]"
                >
                  <img
                    src={item.iconSrc}
                    alt=""
                    data-cms-site-field={
                      "siteIndex" in item && item.siteIndex !== undefined
                        ? `siteSettings__socialLinks__${item.siteIndex}__iconSrc`
                        : undefined
                    }
                    className="h-full w-full object-contain"
                  />
                </a>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={toggleLanguage}
                aria-label={`Switch language to ${isZh ? "English" : "Chinese"}`}
                className="flex h-11 items-center gap-0 rounded-full border border-white/20 bg-white/[0.03] px-[0.15rem] text-sm transition-colors hover:border-white/30 hover:bg-white/[0.06]"
              >
                <span className="flex h-9 w-[2rem] items-center justify-center text-[#d4d4d4]">
                  <Globe className="h-4 w-4" />
                </span>
                <span
                  data-cms-site-field={`siteSettings__${isZh ? "headerLanguageZhLabel" : "headerLanguageEnLabel"}`}
                  className="flex h-9 min-w-[2.8rem] items-center justify-center rounded-full bg-transparent px-2 py-2 font-['Inter'] font-medium text-white transition-colors"
                >
                  {languageLabel}
                </span>
              </button>

              <a
                href={officialHref}
                target="_blank"
                rel="noreferrer"
                data-cms-site-field="siteSettings__officialSiteUrl"
                className="flex h-11 items-center rounded-2xl border border-white px-4 font-['Akshar'] text-sm  tracking-[0.18em] text-[#f3d7a6] transition hover:bg-white/6"
              >
                {officialLogoUrl ? (
                  <img
                    src={officialLogoUrl}
                    alt={officialLabel}
                    data-cms-site-field="siteSettings__headerOfficialLogoUrl"
                    className="h-6 max-w-[10rem] object-contain"
                  />
                ) : (
                  <span data-cms-site-field="siteSettings__officialSiteLabel">{officialLabel}</span>
                )}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
