"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { usePublicCms } from "@/cms/PublicCmsProvider";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { useLanguage } from "@/i18n/LanguageProvider";
import { copy } from "@/i18n/copy";

const footerAssets = {
  logo: "/assets/foot/logo.svg",
  address: "/assets/foot/address.png",
  weixin: "/assets/foot/weixin.png",
  phone: "/assets/foot/phone.png",
  email: "/assets/foot/email.png",
  qr: "/assets/foot/QRcode.png?v=202605112333",
  china: "/assets/foot/china.png",
};

function FooterIcon({ src, alt, className = "size-5" }: { src: string; alt: string; className?: string }) {
  return <ImageWithFallback src={src} alt={alt} loading="lazy" className={`${className} shrink-0 object-contain`} />;
}

function splitFooterLines(value: string) {
  return value.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
}

const disclaimerParagraphs = {
  en: [
    "Welcome!",
    "Tiger Partners Law Firm owns and manages this website to introduce the firm. The information on this website is for reference only and does not constitute legal advice.",
    "Tiger Partners respects intellectual property rights. Text, images and other materials on this website should not be reproduced or used without authorization.",
    "Visitors generally do not need to provide personal information to use this website. If you voluntarily provide personal information, we will use it only for necessary purposes.",
    "If you have any questions regarding this website, please contact Tiger Partners Law Firm at: 010-85885228.",
  ],
  zh: [
    "\u6b22\u8fce\u60a8\u8bbf\u95ee\u864e\u8bc9\u5b98\u65b9\u7f51\u7ad9\u3002",
    "\u864e\u8bc9\u5f8b\u5e08\u4e8b\u52a1\u6240\u62e5\u6709\u5e76\u7ba1\u7406\u672c\u7f51\u7ad9\uff0c\u7528\u4e8e\u4ecb\u7ecd\u864e\u8bc9\u53ca\u4fc3\u8fdb\u4e86\u89e3\u3002\u672c\u7f51\u7ad9\u4fe1\u606f\u4ec5\u4f9b\u53c2\u8003\uff0c\u4e0d\u6784\u6210\u6cd5\u5f8b\u610f\u89c1\u6216\u5efa\u8bae\u3002",
    "\u864e\u8bc9\u5c0a\u91cd\u5e76\u81f4\u529b\u4e8e\u4fdd\u62a4\u77e5\u8bc6\u4ea7\u6743\u3002\u672c\u7f51\u7ad9\u6587\u5b57\u3001\u56fe\u7247\u7b49\u5185\u5bb9\u672a\u7ecf\u6388\u6743\u8bf7\u52ff\u8f6c\u8f7d\u6216\u4f7f\u7528\u3002",
    "\u4e00\u822c\u60c5\u51b5\u4e0b\uff0c\u60a8\u8bbf\u95ee\u672c\u7f51\u7ad9\u4e0d\u9700\u8981\u63d0\u4f9b\u4e2a\u4eba\u4fe1\u606f\u3002\u5982\u60a8\u81ea\u613f\u63d0\u4f9b\uff0c\u6211\u4eec\u5c06\u4ec5\u5728\u5fc5\u8981\u8303\u56f4\u5185\u4f7f\u7528\u3002",
    "\u5982\u60a8\u5bf9\u672c\u7f51\u7ad9\u6709\u4efb\u4f55\u95ee\u9898\uff0c\u8bf7\u4e0e\u864e\u8bc9\u5f8b\u5e08\u4e8b\u52a1\u6240\u8054\u7cfb\uff1a010-85885228\u3002",
  ],
};

export function SiteFooter() {
  const { language } = useLanguage();
  const cms = usePublicCms();
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);
  const tagline = splitFooterLines(cms?.footer?.tagline?.[language] || copy.footer.tagline[language].join("\n"));
  const address = splitFooterLines(cms?.footer?.address?.[language] || copy.footer.address[language].join("\n"));
  const rights = cms?.footer?.rights?.[language] || copy.footer.rights[language];
  const disclaimerLabel = cms?.footer?.disclaimerLabel?.[language] || copy.footer.disclaimer[language];
  const phone = cms?.footer.phone || "010-85885228";
  const email = cms?.footer.email || "contact@tigerpartners.cn";
  const footerLogo = cms?.assets.footerLogo || footerAssets.logo;
  const footerQr = cms?.assets.footerQr || footerAssets.qr;
  const addressIcon = cms?.footer?.addressIcon || footerAssets.address;
  const phoneIcon = cms?.footer?.phoneIcon || footerAssets.phone;
  const emailIcon = cms?.footer?.emailIcon || footerAssets.email;
  const wechatIcon = cms?.footer?.wechatIcon || footerAssets.weixin;
  const chinaIcon = cms?.footer?.chinaIcon || footerAssets.china;
  const publicSecurityUrl = cms?.footer?.publicSecurityUrl || "https://beian.mps.gov.cn/#/query/webSearch";
  const publicSecurityText = cms?.footer?.publicSecurityText || "\u4eac\u516c\u7f51\u5b89\u5907 11010502052714\u53f7";
  const icpUrl = cms?.footer?.icpUrl || "https://beian.miit.gov.cn/#/Integrated/index";
  const icpText = cms?.footer?.icpText || "\u4eacICP\u590720002490\u53f7";

  return (
    <footer id="contact" className="relative mt-20 bg-[#0c0c0c]">
      <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-[#121212] to-transparent" />
      <div className="site-shell relative pt-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[auto_1fr] lg:items-start">
          <ImageWithFallback
            src={footerLogo}
            alt="Tiger Partners"
            loading="lazy"
            data-cms-site-field="siteSettings__footerLeftLogoUrl"
            className="h-auto w-[9.5rem] object-contain"
          />
          <div
            data-cms-site-field={language === "en" ? "siteSettings__footerTaglineEn" : "siteSettings__footerTaglineZh"}
            className="text-[clamp(0.95rem,1.2vw,1.5rem)] font-medium leading-relaxed tracking-[0.05em] text-[#d9b27a]/75 lg:text-right"
          >
            {tagline.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>

        <div className="my-10 h-px bg-[#343434]/80" />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div
            data-cms-site-field={language === "en" ? "siteSettings__footerAddressEn" : "siteSettings__footerAddressZh"}
            className="flex items-start gap-4 text-[clamp(0.875rem,1vw,1.25rem)] leading-relaxed text-[#7a7a7a]"
          >
            <FooterIcon src={addressIcon} alt="" className="mt-1 size-6" />
            <p>
              {address.map((line, index) => (
                <span key={line}>
                  {line}
                  {index < address.length - 1 ? <br /> : null}
                </span>
              ))}
            </p>
          </div>
          <ImageWithFallback
            src={wechatIcon}
            alt="WeChat"
            loading="lazy"
            data-cms-site-field="siteSettings__footerWechatIconUrl"
            className="h-auto w-9 object-contain lg:justify-self-end"
          />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
          <div className="flex flex-col gap-4 text-[clamp(0.875rem,1vw,1.25rem)] text-[#7a7a7a] sm:flex-row sm:flex-wrap sm:gap-x-16">
            <span className="flex items-center gap-3" data-cms-site-field="siteSettings__footerPhone">
              <FooterIcon src={phoneIcon} alt="" />
              {phone}
            </span>
            <span className="flex items-center gap-3" data-cms-site-field="siteSettings__footerEmail">
              <FooterIcon src={emailIcon} alt="" />
              {email}
            </span>
          </div>
          <div className="lg:justify-self-end">
            <ImageWithFallback
              src={footerQr}
              alt="QR code"
              loading="lazy"
              data-cms-site-field="siteSettings__footerOfficialLogoUrl"
              className="size-28 object-contain"
            />
          </div>
        </div>

        <div className="mt-10 h-px bg-[#343434]/80" />

        <div className="grid gap-4 py-8 text-[clamp(0.75rem,0.9vw,1rem)] text-[#7f7f7f] md:grid-cols-2 xl:grid-cols-4 xl:items-center">
          <p data-cms-site-field={language === "en" ? "siteSettings__footerRightsEn" : "siteSettings__footerRightsZh"}>{rights}</p>
          <button
            type="button"
            onClick={() => setDisclaimerOpen(true)}
            data-cms-site-field={language === "en" ? "siteSettings__footerDisclaimerLabelEn" : "siteSettings__footerDisclaimerLabelZh"}
            className="w-max text-left underline-offset-4 transition hover:text-[#d9b27a] hover:underline"
          >
            {disclaimerLabel}
          </button>
          <a
            href={publicSecurityUrl}
            target="_blank"
            rel="noreferrer"
            data-cms-site-field="siteSettings__footerPublicSecurityText"
            className="flex items-center gap-2 transition hover:text-[#d9b27a]"
          >
            <FooterIcon src={chinaIcon} alt="" className="size-4" />
            <span>{publicSecurityText}</span>
          </a>
          <a
            href={icpUrl}
            target="_blank"
            rel="noreferrer"
            data-cms-site-field="siteSettings__footerIcpText"
            className="transition hover:text-[#d9b27a]"
          >
            {icpText}
          </a>
        </div>
      </div>
      {disclaimerOpen ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-5 py-10 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={disclaimerLabel}
        >
          <div className="relative max-h-[86vh] w-full max-w-[62rem] overflow-y-auto bg-[#171717] p-8 text-white shadow-2xl shadow-black/40 md:p-10">
            <button
              type="button"
              onClick={() => setDisclaimerOpen(false)}
              className="absolute right-5 top-5 flex size-10 items-center justify-center border border-white/20 text-white/80 transition hover:border-[#d9b27a] hover:text-[#d9b27a]"
              aria-label="Close"
            >
              <X className="size-5" strokeWidth={1.5} />
            </button>
            <div className="space-y-6 pr-10 text-[1.125rem] font-light leading-[1.75] text-white/78">
              {disclaimerParagraphs[language].map((paragraph, index) => (
                <p key={index} className={index === 0 ? "text-[1.5rem] font-semibold text-[#d9b27a]" : undefined}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </footer>
  );
}
