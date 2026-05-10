"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { usePublicCms } from "@/cms/PublicCmsProvider";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { pick, useLanguage } from "@/i18n/LanguageProvider";
import { copy } from "@/i18n/copy";

const footerAssets = {
  logo: "/assets/foot/logo.svg",
  address: "/assets/foot/address.png",
  weixin: "/assets/foot/weixin.png",
  phone: "/assets/foot/phone.png",
  email: "/assets/foot/email.png",
  qr: "/assets/foot/QRcode.png?v=202605101205",
  china: "/assets/foot/china.png",
};

function FooterIcon({ src, alt, className = "size-5" }: { src: string; alt: string; className?: string }) {
  return <ImageWithFallback src={src} alt={alt} loading="lazy" className={`${className} shrink-0 object-contain`} />;
}

const disclaimerParagraphs = {
  en: [
    "Welcome!",
    "1、Tiger Partners Law Firm, a boutique law firm established in China, owns and manages this website with a view toward introducing and promoting the firm. The information contained on this website (including information by subscription) is for reference purposes only, and does not constitute a legal opinion or recommendation by a lawyer and should not be used by a website visitor or information recipient as the basis for any action or omission. The links are provided solely for the convenience of visitors and do not mean that Tiger Partners has a cooperative relationship with any linked website or any express or implied warranty or liability for visiting such website.",
    "2、Tiger Partners has always respected and been committed to the protection of intellectual property. The texts, images and other information contained on this website may involve copyright issues or other civil rights issues and should not be republished or used in any manner. This website and the information used do not create any form of license or warranty, and any legal liability arising therefrom does not involve Tiger Partners. The texts, images and other information contained on this website are offered solely for the purpose of introducing and promoting Tiger Partners. If you consider any such content to be your intellectual property, please contact Tiger Partners Law Firm. Upon receiving your notice and verifying the circumstances, we will delete the information at our first opportunity.",
    "3、In general, visitors do not have to provide us with personally identifiable information to use this site- such as your name, address, telephone number, fax number, e-mail address, etc. - unless you choose to fill out some forms, found on many of the pages of the site, or to email us directly. We may use such personally identifiable information to respond to your inquiries and to send you newsletters or publications that you request.",
    "4、Generally, Tiger Partners will not disclose personally identifiable information that we collect through your use of the site to unaffiliated third parties. We reserve the right, however, to provide such information to our employees, contractors, agents, and designees to the extent necessary to enable them to perform certain site-related services on our behalf. We also reserve the right to disclose such information to any third party if we believe that we are required to do so.",
    "If you have any questions regarding this website, please contact Tiger Partners Law Firm at: 010-85885228.",
  ],
  zh: [
    "欢迎您访问虎诉官方网站。",
    "1、北京虎诉律师事务所是一家设立于中国的精品律师事务所，为了介绍虎诉和促进了解的目的，拥有和管理本网站。因此，本网站的信息（订阅信息包括在内）仅供您的参考，不构成律师对网站访问者和信息接收者的法律意见或者建议。网站访问者和信息接收者不应将本网站信息作为其作为或不作为的行为依据。为了便利访问者的目的而可能设置的链接，并不意味着虎诉与该链接网站存在任何合作关系，也不意味着对访问该等网站任何明示、默示的担保或责任。",
    "2、虎诉一直以来尊重并致力于对知识产权的保护，本网站所包含文字、图片等全部信息可能涉及版权或其它民事权利问题，请勿擅自转载或者使用，本网站并未对使用该等信息进行任何形式的许可和保证，由此产生的任何法律责任，与虎诉无关；本网站所包含文字、图片等全部信息亦仅用于介绍虎诉和促进了解的目的，如您认为相关内容涉及您的自有知识产权，请与北京虎诉律师事务所联系，接到您的通知并核实有关情况属实后，网站会第一时间删除相关内容。",
    "3、一般情形下，您访问虎诉网站并不需要提供个人信息。在某些情况下，如在线咨询、求职或订阅服务等，基于您的自愿并服务于您认可的目的，我们可能会收集您必要的个人信息。我们会限制该信息仅用于必要的目的与范围。为了统计和分析本网站浏览数量的目的，我们可能会暂时保留访问者的域名。",
    "4、当您通过互联网向我们提供个人信息时，我们会向您明示信息的具体用途。但是，当您访问本网站设置链接的其它网站时，我们将不能对您在该网站下的隐私保护承担任何明示、默示的担保或责任。",
    "关于本网站，如您有任何问题，请与北京虎诉律师事务所联系。",
  ],
};

export function SiteFooter() {
  const { language } = useLanguage();
  const cms = usePublicCms();
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);
  const tagline = pick(language, copy.footer.tagline);
  const address = pick(language, copy.footer.address);
  const phone = cms?.footer.phone ?? "010-85885228";
  const email = cms?.footer.email ?? "contact@tigerpartners.cn";
  const footerLogo = cms?.assets.footerLogo ?? footerAssets.logo;
  const footerQr = cms?.assets.footerQr ?? footerAssets.qr;

  return (
    <footer id="contact" className="relative mt-20 bg-[#0c0c0c]">
      <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-[#121212] to-transparent" />
      <div className="site-shell relative pt-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[auto_1fr] lg:items-start">
          <ImageWithFallback
            src={footerLogo}
            alt="Tiger Partners"
            loading="lazy"
            className="h-auto w-[9.5rem] object-contain"
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
          <ImageWithFallback src={footerAssets.weixin} alt="WeChat" loading="lazy" className="h-auto w-9 object-contain lg:justify-self-end" />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
          <div className="flex flex-col gap-4 text-[clamp(0.875rem,1vw,1.25rem)] text-[#7a7a7a] sm:flex-row sm:flex-wrap sm:gap-x-16">
            <span className="flex items-center gap-3">
              <FooterIcon src={footerAssets.phone} alt="" />
              {phone}
            </span>
            <span className="flex items-center gap-3">
              <FooterIcon src={footerAssets.email} alt="" />
              {email}
            </span>
          </div>
          <div className="bg-white p-1 lg:justify-self-end">
            <ImageWithFallback src={footerQr} alt="QR code" loading="lazy" className="size-28 object-contain" />
          </div>
        </div>

        <div className="mt-10 h-px bg-[#343434]/80" />

        <div className="grid gap-4 py-8 text-[clamp(0.75rem,0.9vw,1rem)] text-[#7f7f7f] md:grid-cols-2 xl:grid-cols-4 xl:items-center">
          <p>{pick(language, copy.footer.rights)}</p>
          <button
            type="button"
            onClick={() => setDisclaimerOpen(true)}
            className="w-max text-left underline-offset-4 transition hover:text-[#d9b27a] hover:underline"
          >
            {pick(language, copy.footer.disclaimer)}
          </button>
          <a
            href="https://beian.mps.gov.cn/#/query/webSearch"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 transition hover:text-[#d9b27a]"
          >
            <FooterIcon src={footerAssets.china} alt="" className="size-4" />
            <span>京公网安备11010502052714号</span>
          </a>
          <a
            href="https://beian.miit.gov.cn/#/Integrated/index"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-[#d9b27a]"
          >
            京ICP备20002490号
          </a>
        </div>
      </div>
      {disclaimerOpen ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-5 py-10 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={pick(language, copy.footer.disclaimer)}
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
