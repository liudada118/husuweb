"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { SiteContent } from "../translations/translations";

const SiteContentContext = createContext<SiteContent | null>(null);

export function SiteContentProvider({
  children,
  content,
}: {
  children: ReactNode;
  content: SiteContent;
}) {
  return (
    <SiteContentContext.Provider value={content}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const content = useContext(SiteContentContext);

  if (!content) {
    throw new Error("useSiteContent must be used within a SiteContentProvider");
  }

  return content;
}
