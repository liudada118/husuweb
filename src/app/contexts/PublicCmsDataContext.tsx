"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { PublicCmsData } from "@/lib/cms-types";
import { resolvePublicAssetUrls } from "@/lib/public-assets";

const PublicCmsDataContext = createContext<PublicCmsData | null>(null);

export function PublicCmsDataProvider({
  children,
  data,
  resolveAssets = true,
}: {
  children: ReactNode;
  data: PublicCmsData;
  resolveAssets?: boolean;
}) {
  const resolvedData = useMemo(() => (resolveAssets ? resolvePublicAssetUrls(data) : data), [data, resolveAssets]);

  return (
    <PublicCmsDataContext.Provider value={resolvedData}>
      {children}
    </PublicCmsDataContext.Provider>
  );
}

export function usePublicCmsData() {
  const value = useContext(PublicCmsDataContext);

  if (!value) {
    throw new Error("usePublicCmsData must be used within a PublicCmsDataProvider");
  }

  return value;
}
