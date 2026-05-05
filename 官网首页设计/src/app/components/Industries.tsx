import React, { useEffect } from "react";
import { useLocation, Link } from "react-router";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useLanguage } from "./Layout";
import { industriesList } from "./IndustriesData";

const heroImages = [
  "https://images.unsplash.com/photo-1548950308-69fac3b90a45?q=80&w=1920",
  "https://images.unsplash.com/photo-1701831737236-f365b205f578?q=80&w=1920",
  "https://images.unsplash.com/photo-1662075047066-483461531efe?q=80&w=1920"
];

const translations = {
  en: {
    heroTitle: "INDUSTRIES",
    heroDesc: "Empowering global markets with strategic insights, driving innovation and sustainable growth across diverse sectors.",
    sectorPrefix: "Sector",
    exploreBtn: "Explore",
    data: industriesList.en
  },
  zh: {
    heroTitle: "核心业务",
    heroDesc: "以战略洞察赋能全球市场，在多元化领域推动创新与可持续增长。",
    sectorPrefix: "领域",
    exploreBtn: "探索详情",
    data: industriesList.zh
  }
};

export function Industries() {
  const location = useLocation();
  const { lang } = useLanguage();
  const t = translations[lang as keyof typeof translations];

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

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
    pauseOnHover: false,
    customPaging: () => (
      <div className="w-16 h-[2px] bg-white/30 hover:bg-[#E5E5E5] transition-colors mt-10" />
    ),
  };

  return (
    <div className="w-full bg-[#141414] selection:bg-[#E5E5E5] selection:text-[#18181B] min-h-screen">
      {/* 1. HERO CAROUSEL */}
      <section className="relative h-screen min-h-[600px] overflow-hidden bg-[#0A0A0A]">
        <Slider {...heroSettings} className="h-full w-full [&_.slick-list]:h-full [&_.slick-track]:h-full [&_.slick-slide>div]:h-full">
          {heroImages.map((src, index) => (
            <div key={index} className="relative h-full outline-none">
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-kenburns grayscale opacity-80"
                style={{ backgroundImage: `url(${src})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#141414]/80 via-[#141414]/50 to-[#141414] z-10 mix-blend-multiply" />
            </div>
          ))}
        </Slider>
        
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <div className="container mx-auto px-6 text-center mt-20">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white tracking-[0.2em] uppercase mb-8 leading-tight">
              {t.heroTitle}
            </h1>
            <p className="text-gray-300 font-light text-lg md:text-xl max-w-2xl mx-auto leading-relaxed tracking-wide">
              {t.heroDesc}
            </p>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 animate-bounce">
          <div className="w-[1px] h-16 bg-gradient-to-b from-[#E5E5E5] to-transparent" />
        </div>
      </section>

      {/* 2. INDUSTRIES LIST */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="space-y-40">
            {t.data.map((ind, index) => {
              const isEven = index % 2 === 0;
              return (
                <div 
                  key={ind.id} 
                  id={ind.id}
                  className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16 lg:gap-24 group scroll-mt-32`}
                >
                  {/* Image Container with Hover Effects */}
                  <Link to={`/industries/${ind.id}`} className="w-full lg:w-1/2 relative overflow-hidden aspect-[4/3] border border-white/5 block cursor-pointer">
                    <div className="absolute inset-0 bg-[#1A1A1A]/20 z-10 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />
                    <img 
                      src={ind.image} 
                      alt={ind.name}
                      className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1500ms] ease-out"
                    />
                    {/* Decorative Corner Lines */}
                    <div className="absolute top-0 left-0 w-8 h-[1px] bg-[#E5E5E5] z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300" />
                    <div className="absolute top-0 left-0 w-[1px] h-8 bg-[#E5E5E5] z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300" />
                    <div className="absolute bottom-0 right-0 w-8 h-[1px] bg-[#E5E5E5] z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300" />
                    <div className="absolute bottom-0 right-0 w-[1px] h-8 bg-[#E5E5E5] z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300" />
                  </Link>
                  
                  {/* Text Content */}
                  <div className="w-full lg:w-1/2">
                    <div className="flex items-center gap-6 mb-8 opacity-60 group-hover:opacity-100 transition-opacity duration-700">
                      <span className="text-[#E5E5E5] font-light tracking-[0.2em] text-sm uppercase">
                        {t.sectorPrefix}
                      </span>
                      <span className="text-[#E5E5E5] font-light text-xl">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1 h-[1px] bg-gradient-to-r from-[#E5E5E5]/50 to-transparent" />
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl font-light text-white tracking-[0.1em] mb-8 uppercase group-hover:text-[#E5E5E5] transition-colors duration-500">
                      <Link to={`/industries/${ind.id}`} className="hover:text-[#E5E5E5] transition-colors">
                        {ind.name}
                      </Link>
                    </h2>
                    
                    <p className="text-gray-400 text-lg font-light leading-relaxed mb-10 text-justify">
                      {ind.desc}
                    </p>
                    
                    <Link to={`/industries/${ind.id}`} className="inline-flex items-center gap-4 text-[#E5E5E5] text-xs font-semibold tracking-[0.2em] uppercase hover:text-white transition-colors group/btn">
                      {t.exploreBtn}
                      <div className="w-12 h-[1px] bg-[#E5E5E5]/50 group-hover/btn:w-24 group-hover/btn:bg-[#E5E5E5] transition-all duration-700" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
