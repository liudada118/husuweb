"use client";

import { pick, useLanguage } from "@/i18n/LanguageProvider";
import { useRouter } from "next/navigation";

const labels = {
  en: "Back",
  zh: "返回",
};

export function BackToTop() {
  const { language } = useLanguage();
  const router = useRouter();

  function goBack() {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push("/");
  }

  return (
    <button
      type="button"
      onClick={goBack}
      className="group fixed bottom-8 right-8 z-40 inline-flex flex-col items-end text-[#d9b27a] transition-colors duration-300 hover:text-[#f1d7a8]"
    >
      <span className="text-[1.5rem] font-medium leading-none tracking-[0.02em]">
        {pick(language, labels)}
      </span>
      <span className="mt-2 block h-0.5 w-full origin-right bg-current transition-transform duration-300 group-hover:scale-x-75" />
    </button>
  );
}
