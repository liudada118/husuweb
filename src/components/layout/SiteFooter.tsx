"use client";

import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { pick, useLanguage } from "@/i18n/LanguageProvider";
import { copy } from "@/i18n/copy";

const footerAssets = {
  logo: "/assets/foot/logo.png",
  address: "/assets/foot/address.png",
  weixin: "/assets/foot/weixin.png",
  phone: "/assets/foot/phone.png",
  email: "/assets/foot/email.png",
  qr: "/assets/foot/QRcode.png",
  china: "/assets/foot/china.png",
};

function FooterIcon({ src, alt, className = "size-5" }: { src: string; alt: string; className?: string }) {
  return <ImageWithFallback src={src} alt={alt} className={`${className} shrink-0 object-contain`} />;
}

export function SiteFooter() {
  const { language } = useLanguage();
  const tagline = pick(language, copy.footer.tagline);
  const address = pick(language, copy.footer.address);

  return (
    <footer id="contact" className="relative mt-20 bg-[#0c0c0c]">
      <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-[#121212] to-transparent" />
      <div className="site-shell relative pt-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[auto_1fr] lg:items-start">
          <ImageWithFallback
            src={footerAssets.logo}
            alt="Tiger Partners"
            className="h-auto w-[clamp(5.5rem,8vw,8.25rem)] object-contain"
          />
          <div className="text-[clamp(0.95rem,1.2vw,1.5rem)] font-medium leading-relaxed tracking-[0.05em] text-[#d9b27a]/75 lg:text-right">
            {tagline.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>

        <div className="my-10 h-px bg-[#343434]/80" />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="flex items-start gap-4 text-[clamp(0.875rem,1vw,1.25rem)] leading-relaxed text-[#7a7a7a]">
            <FooterIcon src={footerAssets.address} alt="" className="mt-1 size-6" />
            <p>
              {address.map((line, index) => (
                <span key={line}>
                  {line}
                  {index < address.length - 1 ? <br /> : null}
                </span>
              ))}
            </p>
          </div>
          <ImageWithFallback src={footerAssets.weixin} alt="WeChat" className="h-auto w-9 object-contain lg:justify-self-end" />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
          <div className="flex flex-col gap-4 text-[clamp(0.875rem,1vw,1.25rem)] text-[#7a7a7a] sm:flex-row sm:flex-wrap sm:gap-x-16">
            <span className="flex items-center gap-3">
              <FooterIcon src={footerAssets.phone} alt="" />
              010-85885228
            </span>
            <span className="flex items-center gap-3">
              <FooterIcon src={footerAssets.email} alt="" />
              contact@tigerpartners.cn
            </span>
          </div>
          <div className="bg-white p-1 lg:justify-self-end">
            <ImageWithFallback src={footerAssets.qr} alt="QR code" className="size-28 object-cover" />
          </div>
        </div>

        <div className="mt-10 h-px bg-[#343434]/80" />

        <div className="grid gap-4 py-8 text-[clamp(0.75rem,0.9vw,1rem)] text-[#7f7f7f] md:grid-cols-2 xl:grid-cols-4 xl:items-center">
          <p>{pick(language, copy.footer.rights)}</p>
          <p>{pick(language, copy.footer.disclaimer)}</p>
          <p className="flex items-center gap-2">
            <FooterIcon src={footerAssets.china} alt="" className="size-4" />
            京公网安备11010502052714号
          </p>
          <p>京ICP备20002490号</p>
        </div>
      </div>
    </footer>
  );
}
