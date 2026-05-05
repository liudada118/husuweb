import React from "react";
import Slider from "react-slick";
import { Link, useNavigate } from "react-router";
import { ArrowRight } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useLanguage } from "./Layout";
import { teamMembers, teamTranslations } from "./TeamData";

const teamHeroImages = [
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1920", // corporate meeting
  "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1920", // modern architecture / corporate
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1920" // team collaboration
];

export function Team() {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const t = teamTranslations[lang as keyof typeof teamTranslations];

  const heroSettings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    arrows: false,
    customPaging: (i: number) => (
      <div className="w-12 h-[2px] mx-2 bg-white/30 mt-[-60px] hover:bg-[#E5E5E5] transition-colors duration-500 rounded-none cursor-pointer" />
    )
  };

  const partners = teamMembers.filter(m => m.role === "partner");
  const associates = teamMembers.filter(m => m.role === "senior-associate");

  const handleMemberClick = (id: string) => {
    navigate(`/team/${id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="w-full bg-[#141414] selection:bg-[#E5E5E5] selection:text-[#18181B] font-light">
      {/* 1. HERO CAROUSEL */}
      <section className="relative h-[70vh] min-h-[500px] w-full bg-[#0A0A0A]">
        <Slider {...heroSettings} className="h-full w-full">
          {teamHeroImages.map((url, idx) => (
            <div key={idx} className="relative h-[70vh] min-h-[500px] w-full outline-none">
              <div 
                className="absolute inset-0 bg-cover bg-center transform scale-105"
                style={{ backgroundImage: `url(${url})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#141414]/80 via-[#141414]/50 to-[#141414] z-10 mix-blend-multiply" />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="text-center">
                  <h1 className="text-6xl md:text-8xl font-light text-white tracking-[0.2em] uppercase drop-shadow-lg mb-6">
                    {t.pageTitle}
                  </h1>
                  <p className="text-xl md:text-2xl text-[#E5E5E5] font-light tracking-wide">
                    {t.pageSubtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* 2. PARTNERS */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col items-center mb-24">
            <div className="w-[1px] h-16 bg-gradient-to-b from-transparent to-[#E5E5E5] mb-8" />
            <h2 className="text-4xl md:text-5xl font-light text-white tracking-[0.1em] uppercase">
              {t.partnersTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partners.map((member) => {
              const data = (t.members as any)[member.id];
              if (!data) return null;
              return (
                <div 
                  key={member.id} 
                  className="group cursor-pointer flex flex-col"
                  onClick={() => handleMemberClick(member.id)}
                >
                  <div className="relative overflow-hidden mb-6 bg-[#0A0A0A] aspect-[3/4]">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80 z-10" />
                    <img 
                      src={member.image} 
                      alt={data.name} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transform group-hover:scale-105 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 border border-[#E5E5E5]/0 group-hover:border-[#E5E5E5]/30 transition-colors duration-700 z-20 m-4" />
                  </div>
                  
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-2xl font-light text-white tracking-wide mb-2 group-hover:text-[#E5E5E5] transition-colors duration-500">
                      {data.name}
                    </h3>
                    <p className="text-[#E5E5E5] text-xs font-semibold tracking-widest uppercase mb-4">
                      {data.title}
                    </p>
                    {data.achievements && data.achievements.length > 0 && (
                      <div className="mb-4 mt-2">
                        <ul className="space-y-2">
                          {data.achievements.slice(0, 2).map((ach: string, i: number) => (
                            <li key={i} className="text-gray-400 text-xs font-light line-clamp-2 italic">
                              • {ach}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="mt-auto pt-4 flex items-center gap-3 text-gray-400 text-xs tracking-widest uppercase font-light group-hover:text-white transition-colors duration-300">
                      {t.viewProfile}
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-500" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. SENIOR ASSOCIATES */}
      <section className="py-32 bg-[#141414] relative border-t border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-[1px] bg-gradient-to-r from-transparent via-[#E5E5E5]/30 to-transparent" />
        
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col items-center mb-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-[#E5E5E5]" />
              <div className="w-2 h-2 rotate-45 bg-[#E5E5E5]" />
              <div className="w-12 h-[1px] bg-[#E5E5E5]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-white tracking-[0.1em] uppercase">
              {t.associatesTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {associates.map((member) => {
              const data = (t.members as any)[member.id];
              if (!data) return null;
              return (
                <div 
                  key={member.id} 
                  className="group cursor-pointer flex flex-col md:flex-row gap-8 items-center bg-[#1A1A1A] border border-white/5 p-6 hover:border-[#E5E5E5]/30 transition-all duration-700"
                  onClick={() => handleMemberClick(member.id)}
                >
                  <div className="relative w-full md:w-48 shrink-0 overflow-hidden aspect-square rounded-full">
                    <img 
                      src={member.image} 
                      alt={data.name} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transform group-hover:scale-105 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 rounded-full border border-white/10 group-hover:border-[#E5E5E5]/50 transition-colors duration-700" />
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <p className="text-[#E5E5E5] text-xs font-semibold tracking-widest uppercase mb-2">
                      {data.title}
                    </p>
                    <h3 className="text-2xl font-light text-white tracking-wide mb-4">
                      {data.name}
                    </h3>
                    <div className="inline-flex items-center gap-3 border-b border-[#E5E5E5]/50 text-gray-400 pb-1 text-xs tracking-widest uppercase font-light group-hover:text-[#E5E5E5] group-hover:border-[#E5E5E5] transition-colors duration-300">
                      {t.viewProfile}
                      <ArrowRight className="w-3 h-3 transform group-hover:translate-x-2 transition-transform duration-500" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
