"use client";

import { useEffect } from "react";

const storageKey = "tiger:return-position";

type ReturnPosition = {
  href: string;
  x: number;
  y: number;
};

function readPosition(): ReturnPosition | null {
  try {
    const raw = window.sessionStorage.getItem(storageKey);
    return raw ? (JSON.parse(raw) as ReturnPosition) : null;
  } catch {
    return null;
  }
}

export function rememberReturnPosition() {
  const position: ReturnPosition = {
    href: `${window.location.pathname}${window.location.search}${window.location.hash}`,
    x: window.scrollX,
    y: window.scrollY,
  };

  window.sessionStorage.setItem(storageKey, JSON.stringify(position));
}

export function getStoredReturnHref(fallbackHref: string) {
  return readPosition()?.href ?? fallbackHref;
}

export function useRestoreReturnPosition({
  enabled = true,
  onRestored,
}: {
  enabled?: boolean;
  onRestored?: () => void;
} = {}) {
  useEffect(() => {
    if (!enabled) return;

    function restore() {
      const position = readPosition();

      if (!position) return;

      const currentHref = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      if (currentHref !== position.href) return;

      window.requestAnimationFrame(() => {
        window.scrollTo(position.x, position.y);
        window.sessionStorage.removeItem(storageKey);
        onRestored?.();
      });
    }

    restore();
    window.addEventListener("pageshow", restore);

    return () => window.removeEventListener("pageshow", restore);
  }, [enabled, onRestored]);
}
