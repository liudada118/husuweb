import React, { useEffect } from "react";
import { Link } from "react-router";
import Slider from "react-slick";
import { ArrowRight, Calendar } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useLanguage } from "./Layout";
import { eventsTranslations } from "./EventsData";

const heroImages = [
  "https://images.unsplash.com/photo-1777371770231-6057f7bcce66?q=80&w=1920",
  "https://images.unsplash.com/photo-1592758080692-b6a5dbe9c725?q=80&w=1920",
  "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1920"
];

export function Events() {
  const { lang } = useLanguage();
  const t = eventsTranslations[lang as keyof typeof eventsTranslations];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

      {/* 2. EVENTS LIST */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6 max-w-6xl">
          
          <div className="flex items-center gap-6 mb-24 opacity-80">
            <span className="text-[#E5E5E5] font-light tracking-[0.2em] text-sm uppercase">
              {t.listTitle}
            </span>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-[#E5E5E5]/50 to-transparent" />
          </div>

          <div className="space-y-12">
            {t.events.map((event, index) => (
              <Link 
                key={event.id}
                to={`/events/${event.id}`}
                className="group block relative border border-white/5 bg-[#1A1A1A]/30 hover:bg-[#1A1A1A] transition-colors duration-700 overflow-hidden"
              >
                {/* Decorative Hover Borders */}
                <div className="absolute top-0 left-0 w-0 h-[1px] bg-[#E5E5E5] group-hover:w-full transition-all duration-700 ease-in-out z-20" />
                <div className="absolute bottom-0 right-0 w-0 h-[1px] bg-[#E5E5E5] group-hover:w-full transition-all duration-700 ease-in-out z-20" />
                
                <div className="flex flex-col md:flex-row">
                  {/* Image Container */}
                  <div className="w-full md:w-2/5 lg:w-1/3 relative overflow-hidden aspect-[4/3] md:aspect-auto">
                    <div className="absolute inset-0 bg-[#0A0A0A]/40 z-10 group-hover:bg-transparent transition-colors duration-700" />
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-[2000ms] ease-out"
                    />
                  </div>
                  
                  {/* Content Container */}
                  <div className="w-full md:w-3/5 lg:w-2/3 p-10 md:p-16 flex flex-col justify-center relative z-20">
                    <div className="flex items-center gap-3 text-[#E5E5E5] text-sm font-light tracking-widest mb-6">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl font-light text-white tracking-wide mb-6 group-hover:text-[#E5E5E5] transition-colors duration-500">
                      {event.title}
                    </h2>
                    
                    <p className="text-gray-400 font-light leading-relaxed mb-10 max-w-2xl text-justify">
                      {event.summary}
                    </p>
                    
                    <div className="mt-auto flex items-center gap-4 text-[#E5E5E5] text-xs uppercase tracking-widest group/btn">
                      <span className="relative overflow-hidden">
                        <span className="block group-hover:-translate-y-full transition-transform duration-500">{t.readMore}</span>
                        <span className="absolute top-full left-0 block group-hover:-translate-y-full transition-transform duration-500">{t.readMore}</span>
                      </span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
