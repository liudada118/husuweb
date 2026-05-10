"use client";

import { type ChangeEvent, type FormEvent, useState } from "react";
import contactCityImage from "../../../assets/contact1.png";
import contactHeroImage from "../../../assets/contact.png";
import contactLogo1 from "../../../assets/contactlogo1.png";
import contactLogo2 from "../../../assets/contactlogo2.png";
import contactLogo3 from "../../../assets/contactlogo3.png";
import { useLanguage } from "../../contexts/LanguageContext";
import { usePublicCmsData } from "../../contexts/PublicCmsDataContext";
import { renderNormalAmpersands, renderTitleAmpersands } from "../renderNormalAmpersands";
import { LandingFooter } from "./LandingFooter";
import { LandingHeader } from "./LandingHeader";
import { LandingRevealGroup } from "./LandingRevealGroup";
import { LandingSharedHero } from "./LandingSharedHero";
import { imageSrc } from "./shared";
import {
  getPageContentField,
  getPageContentItemField,
  getPageContentLines,
  getPageContentSectionItems,
  pageContentItemFieldKey,
} from "@/lib/cms-page-content";

function revealStyle(durationMs = 700, y = 24) {
  return {
    opacity: 0,
    transform: `translateY(${y}px)`,
    transition: `opacity ${durationMs / 1000}s ease, transform ${durationMs / 1000}s ease`,
  };
}

const contactPageCopy = {
  en: {
    heroTitleLines: ["CONTACT US"],
    sectionTitle: "FOLLOW & CONNECT",
    sectionSubtitle: "CONTACT US",
    labels: {
      address: "Address",
      phone: "Tel",
      email: "Email",
    },
    address:
      "Suite 01, 25F, Tower A, Sino-Ocean International Center, 56 East 4th Ring Middle Road, Chaoyang District, Beijing 100025, China",
    phone: "010-8588 5228",
    email: "liu.yuxuan@tigerpartners.cn",
    formFields: [
      { label: "Name", name: "name" },
      { label: "Contact Information", name: "contactInfo" },
      { label: "Organization", name: "organization" },
      { label: "Position", name: "position" },
      { label: "Subject", name: "subject" },
    ],
    messageLabel: "Message",
    submitLabel: "SUBMIT",
  },
  zh: {
    heroTitleLines: ["联系我们"],
    sectionTitle: "欢迎关注与联系",
    sectionSubtitle: "联系我们",
    labels: {
      address: "地址",
      phone: "电话",
      email: "邮箱",
    },
    address: "中国北京市朝阳区东四环中路56号远洋国际中心A座2501",
    phone: "010-8588 5228",
    email: "liu.yuxuan@tigerpartners.cn",
    formFields: [
      { label: "姓名", name: "name" },
      { label: "联系方式", name: "contactInfo" },
      { label: "工作单位", name: "organization" },
      { label: "职务", name: "position" },
      { label: "主题", name: "subject" },
    ],
    messageLabel: "留言内容",
    submitLabel: "提交",
  },
} as const;

type SupportedLanguage = keyof typeof contactPageCopy;
type FormField = {
  label: string;
  name: "name" | "position" | "contactInfo" | "organization" | "subject";
};

function ContactFormPanel({ language }: { language: SupportedLanguage }) {
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    contactInfo: "",
    organization: "",
    subject: "",
    message: "",
    website: "",
  });
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const copy = contactPageCopy[language];
  const fields = copy.formFields as readonly FormField[];

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState("submitting");
    setSubmitMessage("");

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        language,
        pagePath: typeof window === "undefined" ? "/contact" : window.location.pathname,
      }),
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => ({}))) as { message?: string };
      setSubmitState("error");
      setSubmitMessage(payload.message ?? (language === "zh" ? "提交失败，请稍后重试。" : "Submission failed. Please try again later."));
      return;
    }

    setFormData({
      name: "",
      position: "",
      contactInfo: "",
      organization: "",
      subject: "",
      message: "",
      website: "",
    });
    setSubmitState("success");
    setSubmitMessage(language === "zh" ? "已提交，我们会尽快与您联系。" : "Submitted. We will contact you soon.");
  }

  const firstRow = fields.slice(0, 2);
  const secondRow = fields.slice(2, 4);
  const subjectField = fields[4];
  const labelFontClass = "font-['Akshar']";
  const bodyFontClass = "font-['Abel']";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-7">
      <input
        type="text"
        name="website"
        value={formData.website}
        onChange={handleChange}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      {[firstRow, secondRow].map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
          {row.map((field) => (
            <div key={field.name}>
              <label
                className={`${labelFontClass} mb-2 block text-[#d9b27a]`}
                style={{ fontSize: "var(--landing-contact-label-font)" }}
              >
                {field.label}
              </label>
              <input
                type="text"
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required={field.name === "name" || field.name === "contactInfo"}
                className="w-full border-0 border-b border-[#9d9d9d] bg-transparent px-0 text-white transition-colors focus:border-[#d9b27a] focus:outline-none"
                style={{
                  height: "var(--landing-contact-field-height)",
                  fontSize: "var(--landing-contact-field-font)",
                }}
              />
            </div>
          ))}
        </div>
      ))}

      <div>
        <label
          className={`${labelFontClass} mb-2 block text-[#d9b27a]`}
          style={{ fontSize: "var(--landing-contact-label-font)" }}
        >
          {subjectField.label}
        </label>
        <input
          type="text"
          name={subjectField.name}
          value={formData[subjectField.name]}
          onChange={handleChange}
          className="w-full border-0 border-b border-[#9d9d9d] bg-transparent px-0 text-white transition-colors focus:border-[#d9b27a] focus:outline-none"
          style={{
            height: "var(--landing-contact-field-height)",
            fontSize: "var(--landing-contact-field-font)",
          }}
        />
      </div>

      <div>
        <label
          className={`${labelFontClass} mb-2 block text-[#d9b27a]`}
          style={{ fontSize: "var(--landing-contact-label-font)" }}
        >
          {copy.messageLabel}
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full resize-none border border-[#9d9d9d] bg-transparent px-4 py-4 text-white transition-colors focus:border-[#d9b27a] focus:outline-none lg:px-6 lg:py-6"
          style={{
            minHeight: "var(--landing-contact-textarea-min-height)",
            fontSize: "var(--landing-contact-field-font)",
          }}
        />
      </div>

      <button
        type="submit"
        disabled={submitState === "submitting"}
        className={`${labelFontClass} w-full rounded-[2px] font-bold  text-black transition-all hover:scale-[1.01] hover:shadow-[0px_6px_20px_0px_rgba(217,178,122,0.4)] active:scale-[0.99]`}
        style={{
          height: "var(--landing-contact-submit-height)",
          fontSize: "var(--landing-contact-submit-font)",
          backgroundImage:
            "linear-gradient(90deg, rgb(217, 178, 122) 0%, rgb(216, 175, 117) 7.1429%, rgb(215, 173, 111) 14.286%, rgb(215, 170, 106) 21.429%, rgb(214, 168, 100) 28.571%, rgb(213, 165, 95) 35.714%, rgb(212, 163, 89) 42.857%, rgb(211, 160, 83) 50%, rgb(210, 158, 76) 57.143%, rgb(209, 155, 70) 64.286%, rgb(209, 152, 63) 71.429%, rgb(208, 150, 55) 78.571%, rgb(207, 147, 47) 85.714%, rgb(206, 145, 37) 92.857%, rgb(205, 142, 25) 100%)",
          boxShadow: "0px 4px 15px 0px rgba(217,178,122,0.2)",
        }}
      >
        {submitState === "submitting" ? (language === "zh" ? "提交中" : "SUBMITTING") : copy.submitLabel}
      </button>
      {submitMessage ? (
        <p className={`${bodyFontClass} text-sm ${submitState === "error" ? "text-rose-300" : "text-[#d9b27a]"}`}>
          {submitMessage}
        </p>
      ) : null}
    </form>
  );
}

export function ContactLandingPage() {
  const { language } = useLanguage();
  const { pageContent } = usePublicCmsData();
  const currentLanguage = language === "zh" ? "zh" : "en";
  const copy = contactPageCopy[currentLanguage];
  const heroTitleLines = getPageContentLines(pageContent, currentLanguage, "contact", "hero", ["titleLine1", "titleLine2"], copy.heroTitleLines);
  const heroImageSrc = getPageContentField(pageContent, currentLanguage, "contact", "hero", "heroImage", "") || imageSrc(contactHeroImage);
  const sectionTitle = getPageContentField(pageContent, currentLanguage, "contact", "details", "sectionTitle", copy.sectionTitle);
  const sectionSubtitle = getPageContentField(pageContent, currentLanguage, "contact", "details", "sectionSubtitle", copy.sectionSubtitle);
  const address = getPageContentField(pageContent, currentLanguage, "contact", "details", "address", copy.address);
  const phone = getPageContentField(pageContent, currentLanguage, "contact", "details", "phone", copy.phone);
  const email = getPageContentField(pageContent, currentLanguage, "contact", "details", "email", copy.email);
  const cityImageSrc = getPageContentField(pageContent, currentLanguage, "contact", "details", "cityImage", "") || imageSrc(contactCityImage);
  const cmsFollowItems = getPageContentSectionItems(pageContent, currentLanguage, "contact", "details");
  const headingFontClass = "font-['Akshar']";
  const bodyFontClass = "font-['Abel']";
  const defaultContactSocialItems = [
    {
      href: "https://www.linkedin.com/in/yuxuan-liu-a7636a44?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      label: "LinkedIn",
      iconSrc: imageSrc(contactLogo1),
    },
    {
      href: "https://b23.tv/mbZEgBg",
      label: "Bilibili",
      iconSrc: imageSrc(contactLogo2),
    },
    {
      href: "https://xhslink.com/m/EgtHVE7Wxj",
      label: "Xiaohongshu",
      iconSrc: imageSrc(contactLogo3),
    },
  ];
  const contactSocialItems =
    cmsFollowItems.length > 0
      ? cmsFollowItems.map((item, index) => ({
          cmsItemId: item.id,
          href: getPageContentItemField(item, "href", defaultContactSocialItems[index % defaultContactSocialItems.length]?.href ?? ""),
          iconSrc: getPageContentItemField(item, "icon", defaultContactSocialItems[index % defaultContactSocialItems.length]?.iconSrc ?? ""),
          label: getPageContentItemField(item, "label", defaultContactSocialItems[index % defaultContactSocialItems.length]?.label ?? ""),
        }))
      : defaultContactSocialItems.map((item) => ({
          ...item,
          cmsItemId: undefined,
        }));

  return (
    <div className="min-h-screen bg-[#161915] text-white">
      <LandingHeader />

      <main>
        <LandingSharedHero
          image={heroImageSrc}
          imageAlt="Tiger Partners contact portrait"
          titleLines={heroTitleLines}
          signature=""
          centered
          underlineWidth="12vw"
          cmsFields={{
            image: "hero__heroImage",
            titleLines: ["hero__titleLine1", "hero__titleLine2"],
          }}
        />

        <section className="overflow-hidden bg-black py-20 md:py-28">
          <LandingRevealGroup className="mx-auto w-full px-[20vw]" threshold={0.12}>
            <div
              className="mx-auto w-full max-w-[72rem]"
              style={{
                ["--landing-contact-field-height" as string]: "clamp(2.4rem, 4.2vw, 3.84rem)",
                ["--landing-contact-field-font" as string]: "clamp(0.6rem, 1.08vw, 1.05rem)",
                ["--landing-contact-label-font" as string]: "clamp(0.63rem, 1.32vw, 1.35rem)",
                ["--landing-contact-textarea-min-height" as string]: "clamp(9rem, 19.2vw, 21rem)",
                ["--landing-contact-submit-height" as string]: "clamp(2.55rem, 4.2vw, 3.57rem)",
                ["--landing-contact-submit-font" as string]: "clamp(1.05rem, 2.04vw, 2.1rem)",
                ["--landing-contact-media-height" as string]: "clamp(9rem, 15.6vw, 15rem)",
              }}
            >
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-[35%_minmax(0,65%)] lg:items-start lg:gap-12 xl:gap-16">
                <div className="w-full space-y-12 lg:w-[125%] lg:origin-top-left lg:scale-[0.8] lg:space-y-16">
                  <div data-animate style={revealStyle(700, 24)}>
                    <h2
                      className={`${headingFontClass} font-semibold ${currentLanguage === "en" ? "" : ""} text-white`}
                      style={{ fontSize: "clamp(1.2rem, 2.16vw, 1.875rem)" }}
                      data-cms-field="details__sectionTitle"
                    >
                      {renderTitleAmpersands(sectionTitle)}
                    </h2>
                    <div className="mt-6 h-[2px] w-full bg-[#d9b27a]" />

                    <div className="mt-8 grid grid-cols-3 items-center gap-4">
                      {contactSocialItems.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex min-w-0 items-center justify-center transition-transform duration-300 hover:scale-[1.03]"
                          data-cms-field={item.cmsItemId ? pageContentItemFieldKey("details", item.cmsItemId, "href") : undefined}
                        >
                          <img
                            src={item.iconSrc}
                            alt={item.label}
                            className="h-[1.6rem] w-full max-w-[6.5rem] object-contain lg:h-[1.9rem]"
                            data-cms-field={item.cmsItemId ? pageContentItemFieldKey("details", item.cmsItemId, "icon") : undefined}
                          />
                        </a>
                      ))}
                    </div>

                    <div
                      className="mt-8 w-full overflow-hidden rounded-[20px] shadow-xl"
                      style={{ height: "var(--landing-contact-media-height)" }}
                    >
                      <img
                        src={cityImageSrc}
                        alt="Contact city view"
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                        data-cms-field="details__cityImage"
                      />
                    </div>
                  </div>

                  <div data-animate style={revealStyle(760, 24)}>
                    <h3
                      className={`${headingFontClass} font-semibold ${currentLanguage === "en" ? "" : ""} text-white`}
                      style={{ fontSize: "clamp(1.2rem, 2.16vw, 1.875rem)" }}
                      data-cms-field="details__sectionSubtitle"
                    >
                      {renderNormalAmpersands(sectionSubtitle)}
                    </h3>
                    <div className="mt-6 h-[2px] w-full bg-[#d9b27a]" />

                    <div
                      className={`mt-6 space-y-4 ${bodyFontClass} leading-[1.67] text-white`}
                      style={{ fontSize: "clamp(0.66rem, 1.2vw, 1.35rem)" }}
                    >
                      <p>
                        <span className="text-[#d9b27a]">{copy.labels.address}: </span>
                        <span className="font-light" data-cms-field="details__address">{renderNormalAmpersands(address)}</span>
                      </p>
                      <p>
                        <span className="text-[#d9b27a]">{copy.labels.phone}: </span>
                        <span className="font-light" data-cms-field="details__phone">{renderNormalAmpersands(phone)}</span>
                      </p>
                      <p>
                        <span className="text-[#d9b27a]">{copy.labels.email}: </span>
                        <span className="font-light tracking-[0.16px]" data-cms-field="details__email">{renderNormalAmpersands(email)}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="w-full max-w-[34rem] lg:justify-self-end"
                  style={{
                    ...revealStyle(820, 28),
                    ["--landing-contact-field-height" as string]: "calc(clamp(2.4rem, 4.2vw, 3.84rem) * 0.7)",
                    ["--landing-contact-field-font" as string]: "calc(clamp(0.6rem, 1.08vw, 1.05rem) * 0.7)",
                    ["--landing-contact-label-font" as string]: "calc(clamp(0.63rem, 1.32vw, 1.35rem) * 0.7)",
                    ["--landing-contact-textarea-min-height" as string]: "calc(clamp(9rem, 19.2vw, 21rem) * 0.7)",
                    ["--landing-contact-submit-height" as string]: "calc(clamp(2.55rem, 4.2vw, 3.57rem) * 0.7)",
                    ["--landing-contact-submit-font" as string]: "calc(clamp(1.05rem, 2.04vw, 2.1rem) * 0.7)",
                  }}
                  data-animate
                >
                  <ContactFormPanel language={currentLanguage} />
                </div>
              </div>
            </div>
          </LandingRevealGroup>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
