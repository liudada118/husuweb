import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { Chronicle } from "@/components/sections/about/Chronicle";
import { Culture } from "@/components/sections/about/Culture";
import { Honors } from "@/components/sections/about/Honors";
import { PageTriangle } from "@/components/shared/PageTriangle";

export function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#171717] text-white">
      <PageTriangle
        className="right-0 top-[calc(100svh+22rem)] h-[calc(100%-100svh-22rem)] w-full opacity-50"
      />
      <SiteHeader active="ABOUT US" />
      <AboutHero />
      <Honors />
      <Culture />
      <Chronicle />
      <SiteFooter />
    </main>
  );
}
