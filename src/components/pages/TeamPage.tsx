import Link from "next/link";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { PageTriangle } from "@/components/shared/PageTriangle";

const teamAssets = {
  hero: "/assets/prototypes/team/8fe36a3146bd99d743d5925624af676bd1db7aee.png",
  portraitA: "/assets/prototypes/team/84ce8ad37b1f2d7bee664fed0007bc63a427b9b2.png",
  portraitB: "/assets/prototypes/team/dd0c226c0473986d8cd91add719519c67a1c4644.png",
};

const seniorAssociates = [
  { name: "Yuxuan Liu", title: "Managing Partner", image: teamAssets.portraitA },
  { name: "Yuxuan Liu", title: "Managing Partner", image: teamAssets.portraitB },
  { name: "Yuxuan Liu", title: "Managing Partner", image: teamAssets.portraitA },
  { name: "Yuxuan Liu", title: "Managing Partner", image: teamAssets.portraitB },
  { name: "Yuxuan Liu", title: "Managing Partner", image: teamAssets.portraitA },
  { name: "Yuxuan Liu", title: "Managing Partner", image: teamAssets.portraitB },
];

function TeamCard({ name, title, image }: { name: string; title: string; image: string }) {
  return (
    <article className="group flex min-w-0 flex-col">
      <div className="relative aspect-[745/392] w-full overflow-hidden bg-[#9b9b9b]">
        <ImageWithFallback
          src={image}
          alt={name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-105"
        />
      </div>
      <div className="mt-7 border-t border-[#a1a1a1] pt-7">
        <h3 className="text-[clamp(2.25rem,4vw,3.4375rem)] font-semibold uppercase leading-[1.1] tracking-[-0.08em] text-white">
          {name}
        </h3>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <p className="text-[clamp(1.125rem,2vw,1.75rem)] font-medium uppercase leading-[1.3] text-[#979797]">
            {title}
          </p>
          <Link href="/team/yuxuan-liu" className="group/link inline-flex shrink-0 flex-col items-end text-[#d9b27a]">
            <span className="text-[clamp(1rem,1.7vw,1.75rem)] font-medium uppercase leading-[1.3]">
              Find out more
            </span>
            <span className="mt-2 block h-0.5 w-full bg-[#d9b27a] origin-right transition-transform duration-300 group-hover/link:scale-x-75" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function TeamPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#171717] text-white">
      <PageTriangle
        className="right-0 top-[calc(100svh+7rem)] h-[calc(100%-100svh-7rem)] w-full opacity-50"
      />
      <section className="relative h-[min(67.5rem,100svh)] min-h-[40rem] w-full overflow-hidden">
        <ImageWithFallback src={teamAssets.hero} alt="" className="absolute inset-0 size-full w-full object-cover" />
        <div className="absolute inset-0 bg-[rgba(68,67,67,0.5)] mix-blend-screen" />
        <div className="absolute inset-0 bg-[linear-gradient(180.182deg,rgba(56,56,56,0)_30.211%,rgb(23,23,23)_93.072%)]" />
        <SiteHeader active="OUR TEAM" />

        <div className="site-shell relative z-10 flex h-full flex-col justify-end pb-[clamp(5rem,11vw,12rem)] pt-[var(--header-height)]">
          <div className="text-[clamp(3rem,5vw,5.625rem)] font-light uppercase leading-none text-[#dea552]">
            #
          </div>
          <h1 className="mt-5 text-[clamp(3.4rem,6.8vw,6.375rem)] font-bold uppercase leading-none text-white">
            Our team
          </h1>
          <p className="mt-10 max-w-[55rem] text-[clamp(1.0625rem,1.7vw,1.4875rem)] leading-[1.3] tracking-[0.05em] text-white">
            Professional, Efficient, Passionate, and Desperate for Win
          </p>
        </div>
      </section>

      <section className="relative w-full">
        <div className="site-shell pb-20 pt-16">
          <div className="flex flex-col items-start justify-between gap-8 xl:flex-row xl:items-end">
            <h2 className="text-left text-[clamp(2.4rem,5.6vw,4.8rem)] font-semibold uppercase leading-[0.92] tracking-[-0.04em] text-white">
              WE ARE SPECIAL
              <br />
              FORCES
            </h2>
            <p className="max-w-[20rem] shrink-0 self-end text-right text-[clamp(1.125rem,2vw,1.75rem)] font-medium uppercase leading-[1.3] text-white">
              As fast as wind, and as aggressive as fire
            </p>
          </div>
        </div>
      </section>

      <section className="site-shell pb-32">
        <div className="grid grid-cols-1 gap-x-20 gap-y-20 lg:grid-cols-2">
          <h2 className="mb-[-2.5rem] text-[clamp(2.5rem,5vw,4rem)] font-normal italic uppercase leading-[1.1] tracking-[-0.04em] text-white lg:col-span-2">
            Partner
          </h2>
          {seniorAssociates.slice(0, 4).map((person, index) => (
            <TeamCard key={`${person.name}-${index}`} {...person} />
          ))}
          <h2 className="mb-[-2.5rem] mt-8 text-[clamp(2.5rem,5vw,4rem)] font-normal italic uppercase leading-[1.1] tracking-[-0.04em] text-white lg:col-span-2">
            Senior Associate
          </h2>
          {seniorAssociates.slice(4).map((person, index) => (
            <TeamCard key={`${person.name}-${index + 4}`} {...person} />
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
