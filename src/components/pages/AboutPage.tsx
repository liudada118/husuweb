"use client";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { Chronicle } from "@/components/sections/about/Chronicle";
import { Culture } from "@/components/sections/about/Culture";
import { Honors } from "@/components/sections/about/Honors";
import { PageTriangle } from "@/components/shared/PageTriangle";
import { useRestoreReturnPosition } from "@/lib/returnPosition";

export function AboutPage() {
  useRestoreReturnPosition();

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#171717] text-white">
      <PageTriangle
        className="right-0 top-[calc(100svh+22rem)] z-0 h-[calc(100%-100svh-22rem)] w-full bg-[#2a2a2a] opacity-10"
      />
      <div className="relative z-10">
        <SiteHeader active="ABOUT US" />
        <AboutHero />
        <Honors />
        <Culture />
        <Chronicle />
        <SiteFooter />
      </div>
    </main>
  );
}
