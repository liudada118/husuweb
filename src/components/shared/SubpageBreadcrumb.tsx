"use client";

import { useRouter } from "next/navigation";

export function SubpageBreadcrumb({
  parentLabel,
  currentLabel,
  fallbackHref,
}: {
  parentLabel: string;
  currentLabel: string;
  fallbackHref: string;
}) {
  const router = useRouter();

  function goBack() {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push(fallbackHref);
  }

  return (
    <nav
      className="flex flex-wrap items-center gap-3 text-[1.5rem] font-light leading-relaxed tracking-[0.02em]"
      aria-label="Breadcrumb"
    >
      <button type="button" onClick={goBack} className="text-[#dedede] transition hover:text-[#d9b27a]">
        {parentLabel}
      </button>
      <span className="text-[#bec3cb]">/</span>
      <button type="button" onClick={goBack} className="font-medium text-white transition hover:text-[#d9b27a]">
        {currentLabel}
      </button>
    </nav>
  );
}
