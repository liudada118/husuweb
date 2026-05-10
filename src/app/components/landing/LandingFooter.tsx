"use client";

import { useLanguage } from "../../contexts/LanguageContext";
import { usePublicCmsData } from "../../contexts/PublicCmsDataContext";
import { landingFooterShellClassName, officialSiteHref } from "./shared";

export function LandingFooter() {
  const { language } = useLanguage();
  const { siteSettings } = usePublicCmsData();
  const currentYear = new Date().getFullYear();
  const isZh = language === "zh";
  const footerEmail = siteSettings.footerEmail || "liu.yuxuan@tigerpartners.cn";
  const footerPhone = siteSettings.footerPhone || "010-8588 5228";
  const footerLeftLogoUrl = siteSettings.footerLeftLogoUrl || siteSettings.logoUrl || "/assets/logo.svg";
  const footerRightLogoUrl = siteSettings.footerRightLogoUrl || siteSettings.logoUrl || "/assets/logo.svg";
  const footerOfficialLogoUrl = siteSettings.footerOfficialLogoUrl || "";
  const officialHref = siteSettings.officialSiteUrl || officialSiteHref;
  const officialLabel = siteSettings.officialSiteLabel || "www.tigerpartners.cn";
  const footerQuote = siteSettings.footerQuote || "AGENCY";

  return (
    <footer
      id="contact"
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#0d0d0c",
        background:
          "radial-gradient(1200px 760px at 12% 92%, rgba(62, 86, 56, 0.18) 0%, rgba(39, 58, 37, 0.12) 30%, rgba(13, 13, 12, 0) 72%), radial-gradient(1120px 720px at 88% 90%, rgba(161, 111, 53, 0.18) 0%, rgba(104, 71, 31, 0.12) 28%, rgba(13, 13, 12, 0) 72%), radial-gradient(980px 360px at 50% 102%, rgba(150, 118, 70, 0.12) 0%, rgba(83, 63, 35, 0.08) 34%, rgba(13, 13, 12, 0) 76%), radial-gradient(1500px 980px at 50% 50%, rgba(5, 5, 4, 0.34) 0%, rgba(13, 13, 12, 0) 64%)",
      }}
    >
      <div className={`${landingFooterShellClassName} py-16 md:py-20`}>
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <div className="flex-1">
            <div className="mb-8 w-[clamp(16.875rem,30vw,26.25rem)]">
              <img
                src={footerLeftLogoUrl}
                alt="Tiger Partners"
                data-cms-site-field="siteSettings__footerLeftLogoUrl"
                className="h-auto w-full object-contain"
              />
            </div>

            <div className="space-y-2 font-['Inter'] text-[clamp(0.875rem,1.2vw,1.125rem)] leading-[1.8] text-[#bbbdba]">
              <p>
                {isZh ? "邮箱地址：" : "Email Address:"}
                <a
                  href={`mailto:${footerEmail}`}
                  data-cms-site-field="siteSettings__footerEmail"
                  className="ml-1 break-all transition-colors duration-300 hover:text-white"
                >
                  {footerEmail}
                </a>
              </p>
              <p>
                {isZh ? "联系方式：" : "Contact Information:"}
                <a
                  href={`tel:${footerPhone}`}
                  data-cms-site-field="siteSettings__footerPhone"
                  className="ml-1 transition-colors duration-300 hover:text-white"
                >
                  {footerPhone}
                </a>
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start gap-6 lg:items-end">
            <div className="h-[clamp(2.625rem,4.5vw,4.125rem)]">
              <img
                src={footerRightLogoUrl}
                alt="Tiger Partners"
                data-cms-site-field="siteSettings__footerRightLogoUrl"
                className="h-full w-auto object-contain lg:ml-auto"
              />
            </div>

            <div className="flex flex-col items-start gap-4 lg:items-end">
              <a
                href={officialHref}
                target="_blank"
                rel="noopener noreferrer"
                data-cms-site-field="siteSettings__officialSiteUrl"
                className="group origin-left scale-[0.8] rounded-[8px] border-2 border-[#d9b27a] px-5 py-3 transition-colors duration-300 hover:bg-[rgba(217,178,122,0.08)] lg:origin-right md:px-8 md:py-4"
              >
                {footerOfficialLogoUrl ? (
                  <img
                    src={footerOfficialLogoUrl}
                    alt={officialLabel}
                    data-cms-site-field="siteSettings__footerOfficialLogoUrl"
                    className="h-[clamp(1.5rem,2.4vw,2.4rem)] max-w-[18rem] object-contain"
                  />
                ) : (
                  <span
                    data-cms-site-field="siteSettings__officialSiteLabel"
                    className="font-['Inter'] text-[clamp(0.875rem,1.5vw,1.5rem)]  tracking-tight text-[#d9b27a] transition-colors duration-300 group-hover:text-[#f0cc90]"
                  >
                    {officialLabel}
                  </span>
                )}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="py-6">
        <div className={`${landingFooterShellClassName} text-center`}>
          <p className="inline-flex max-w-full flex-nowrap items-center justify-center gap-2 whitespace-nowrap font-['Inter'] text-[clamp(0.56rem,1vw,0.875rem)] leading-[1.8] tracking-wide text-[#7f7f7f]">
            <span>COPYRIGHT {currentYear} TIGER PARTNERS. ALL RIGHTS RESERVED</span>
            <span data-cms-site-field="siteSettings__footerQuote">{footerQuote}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
