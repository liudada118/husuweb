"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Language = "en" | "zh";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function applyDocumentLanguage(language: Language) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
}

export function LanguageProvider({
  children,
  initialLanguage,
  persist = true,
}: {
  children: React.ReactNode;
  initialLanguage?: Language;
  persist?: boolean;
}) {
  const [language, setLanguageState] = useState<Language>(initialLanguage ?? "en");

  useEffect(() => {
    if (initialLanguage) {
      setLanguageState(initialLanguage);
      applyDocumentLanguage(initialLanguage);
      return;
    }

    if (!persist) {
      applyDocumentLanguage(language);
      return;
    }

    const savedLanguage = window.localStorage.getItem("tiger-language");
    if (savedLanguage === "en" || savedLanguage === "zh") {
      setLanguageState(savedLanguage);
      applyDocumentLanguage(savedLanguage);
      return;
    }

    applyDocumentLanguage("en");
  }, [initialLanguage, language, persist]);

  const value = useMemo<LanguageContextValue>(() => {
    const setLanguage = (nextLanguage: Language) => {
      setLanguageState(nextLanguage);
      applyDocumentLanguage(nextLanguage);
      if (persist) {
        window.localStorage.setItem("tiger-language", nextLanguage);
      }
    };

    return {
      language,
      setLanguage,
      toggleLanguage: () => setLanguage(language === "en" ? "zh" : "en"),
    };
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}

export function pick<TValues extends { en: unknown; zh: unknown }>(language: Language, values: TValues): TValues[Language] {
  return values[language];
}
