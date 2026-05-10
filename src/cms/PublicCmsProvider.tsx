"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { OfficialCmsPublicState } from "@/cms/official-state";

const PublicCmsContext = createContext<OfficialCmsPublicState | null>(null);
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function PublicCmsProvider({
  children,
  initialState,
}: {
  children: React.ReactNode;
  initialState: OfficialCmsPublicState | null;
}) {
  const [state, setState] = useState<OfficialCmsPublicState | null>(initialState);

  useEffect(() => {
    let cancelled = false;

    fetch(`${basePath}/api/cms/public`, { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (!cancelled && data?.state) {
          setState(data.state);
        }
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(() => state, [state]);

  return <PublicCmsContext.Provider value={value}>{children}</PublicCmsContext.Provider>;
}

export function usePublicCms() {
  return useContext(PublicCmsContext);
}
