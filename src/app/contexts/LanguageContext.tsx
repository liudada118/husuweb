"use client";

import React, { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Language } from "@/lib/site-types";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({
  children,
  initialLanguage,
  persist = true,
}: {
  children: ReactNode;
  initialLanguage?: Language;
  persist?: boolean;
}) {
  const [language, setLanguageState] = useState<Language>(initialLanguage ?? "en");

  useEffect(() => {
    if (initialLanguage) {
      setLanguageState(initialLanguage);
      return;
    }

    if (!persist) {
      return;
    }

    const storedLanguage = window.localStorage.getItem("site-language");

    if (storedLanguage === "zh" || storedLanguage === "en") {
      setLanguageState(storedLanguage);
    }
  }, [initialLanguage, persist]);

  useEffect(() => {
    if (!persist) {
      return;
    }

    window.localStorage.setItem("site-language", language);
  }, [language, persist]);

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === "zh" ? "en" : "zh"));
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
