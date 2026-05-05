import { SiteHeader } from "./components/site-header";
import { SiteFooter } from "./components/site-footer";
import { TeamCard } from "./components/team-card";

import heroImg from "../imports/OurTeam/8fe36a3146bd99d743d5925624af676bd1db7aee.png";
import portraitA from "../imports/OurTeam/84ce8ad37b1f2d7bee664fed0007bc63a427b9b2.png";
import portraitB from "../imports/OurTeam/dd0c226c0473986d8cd91add719519c67a1c4644.png";

const seniorAssociates = [
  { name: "Yuxuan Liu", title: "Managing Partner", image: portraitA },
  { name: "Yuxuan Liu", title: "Managing Partner", image: portraitB },
  { name: "Yuxuan Liu", title: "Managing Partner", image: portraitA },
  { name: "Yuxuan Liu", title: "Managing Partner", image: portraitB },
  { name: "Yuxuan Liu", title: "Managing Partner", image: portraitA },
  { name: "Yuxuan Liu", title: "Managing Partner", image: portraitB },
];

export default function App() {
  return (
    <div className="min-h-screen w-full bg-[#171717] text-white overflow-x-hidden">
      {/* HERO */}
      <section className="relative w-full h-[67.5rem] max-h-[100vh] min-h-[40rem] overflow-hidden">
        <img
          src={heroImg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(68,67,67,0.5)] mix-blend-screen" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(180.182deg, rgba(56,56,56,0) 30.211%, rgb(23,23,23) 93.072%)",
          }}
        />

        <SiteHeader />

        <div className="relative z-10 max-w-[120rem] mx-auto px-[3rem] h-full flex flex-col justify-end pb-[12rem]">
          <div
            className="text-[#dea552] uppercase"
            style={{ fontSize: "5.625rem", lineHeight: "1", fontWeight: 300, letterSpacing: "1.25px" }}
          >
            #
          </div>
          <h1
            className="text-white uppercase mt-[1.25rem]"
            style={{ fontSize: "7.5rem", lineHeight: "1", fontWeight: 700 }}
          >
            Our team
          </h1>
          <p
            className="text-white mt-[2.5rem] max-w-[55rem]"
            style={{ fontSize: "1.75rem", lineHeight: "2.25rem", fontWeight: 400, letterSpacing: "1.25px" }}
          >
            Professional, Efficient, Passionate, and Desperate for Win
          </p>
        </div>
      </section>

      {/* WE ARE SPECIAL FORCES */}
      <section className="relative w-full">
        <div className="max-w-[120rem] mx-auto px-[3rem] pt-[3.75rem] pb-[5rem]">
          <div className="flex flex-col xl:flex-row items-start xl:items-end justify-between gap-[2rem]">
            <h2
              className="text-white uppercase"
              style={{
                fontSize: "6rem",
                lineHeight: "5.3125rem",
                fontWeight: 600,
                letterSpacing: "-2px",
              }}
            >
              WE ARE SPECIAL
              <span className="inline-block w-[8rem]" />FORCES
            </h2>
            <p
              className="text-white uppercase shrink-0 max-w-[20rem]"
              style={{ fontSize: "1.75rem", lineHeight: "2.25rem", fontWeight: 500 }}
            >
              As fast as wind, and as aggressive as fire
            </p>
          </div>
        </div>
      </section>

      {/* SENIOR ASSOCIATE */}
      <section className="relative w-full">
        <div className="max-w-[120rem] mx-auto px-[3rem] pb-[10rem]">
          <h2
            className="text-white uppercase italic mb-[5rem]"
            style={{
              fontSize: "4rem",
              lineHeight: "1.1",
              fontWeight: 400,
              letterSpacing: "-2px",
            }}
          >
            Senior Associate
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[5rem] gap-y-[5rem]">
            {seniorAssociates.map((p, i) => (
              <TeamCard key={i} {...p} />
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
