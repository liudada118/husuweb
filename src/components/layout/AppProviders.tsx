"use client";

import { LanguageProvider } from "@/i18n/LanguageProvider";
import { PublicCmsProvider } from "@/cms/PublicCmsProvider";
import type { OfficialCmsPublicState } from "@/cms/official-state";

export function AppProviders({
  children,
  cmsState = null,
}: {
  children: React.ReactNode;
  cmsState?: OfficialCmsPublicState | null;
}) {
  return (
    <PublicCmsProvider initialState={cmsState}>
      <LanguageProvider>{children}</LanguageProvider>
    </PublicCmsProvider>
  );
}
