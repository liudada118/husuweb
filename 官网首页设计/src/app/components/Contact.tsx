import React, { useEffect } from "react";
import Slider from "react-slick";
import { MapPin, Phone, Mail, Check } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useLanguage } from "./Layout";
import { contactTranslations } from "./ContactData";

const heroImages = [
  "https://images.unsplash.com/photo-1762506168883-0f829364d598?q=80&w=1920", // modern architecture dark
  "https://images.unsplash.com/photo-1758518730384-be3d205838e8?q=80&w=1920"  // handshake
];

const joinUsImages = [
  "https://images.unsplash.com/photo-1758518731468-98e90ffd7430?q=80&w=1080", // corporate meeting
  "https://images.unsplash.com/photo-1641998148499-cb6b55a3c0d3?q=80&w=1080"  // modern office
];

export function Contact() {
  const { lang } = useLanguage();
  const t = contactTranslations[lang as keyof typeof contactTranslations];

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
    <div className="w-full bg-[#141414] selection:bg-[#E5E5E5] selection:text-[#18181B] min-h-screen font-light">
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
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 animate-bounce">
          <div className="w-[1px] h-16 bg-gradient-to-b from-[#E5E5E5] to-transparent" />
        </div>
      </section>

      {/* 2. WELCOME TO JOIN US */}
      <section className="py-32 relative overflow-hidden bg-[#141414]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 relative z-20">
              <div className="flex items-center gap-6 mb-8 opacity-80">
                <span className="text-[#E5E5E5] font-light tracking-[0.2em] text-sm uppercase">
                  {t.joinUsSubtitle}
                </span>
                <div className="flex-1 h-[1px] bg-gradient-to-r from-[#E5E5E5]/50 to-transparent" />
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-wide leading-tight mb-10">
                {t.joinUsTitle}
              </h2>
              
              <p className="text-gray-400 font-light leading-relaxed mb-12 text-lg text-justify max-w-xl">
                {t.joinUsContent}
              </p>

              <div className="space-y-6">
                {t.joinUsHighlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-4 group">
                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#E5E5E5] transition-colors duration-500">
                      <Check className="w-4 h-4 text-[#E5E5E5] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <span className="text-gray-300 tracking-wide group-hover:text-white transition-colors duration-300">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Images (Overlapping Layout with Hover Effects) */}
            <div className="w-full lg:w-1/2 relative h-[600px] hidden md:block">
              <div className="absolute top-0 right-0 w-3/4 h-[80%] overflow-hidden border border-white/5 z-10 group">
                <div className="absolute inset-0 bg-[#1A1A1A]/40 z-10 group-hover:bg-transparent transition-colors duration-1000" />
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[2000ms] ease-out"
                  src="https://assets.mixkit.co/videos/preview/mixkit-business-people-meeting-in-a-conference-room-4131-large.mp4"
                />
              </div>
              <div className="absolute bottom-0 left-0 w-2/3 h-[60%] overflow-hidden border border-[#141414] shadow-2xl z-20 group">
                <div className="absolute inset-0 bg-[#0A0A0A]/60 z-10 group-hover:bg-transparent transition-colors duration-1000" />
                <img 
                  src={joinUsImages[1]} 
                  alt="Join Us 2" 
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-[2000ms] ease-out"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CONTACT US & MAP */}
      <section className="py-32 relative bg-[#18181B] border-t border-white/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-20">
            
            {/* Contact Information */}
            <div className="w-full lg:w-1/3 flex flex-col justify-center">
              <div className="flex items-center gap-6 mb-8 opacity-80">
                <span className="text-[#E5E5E5] font-light tracking-[0.2em] text-sm uppercase">
                  {t.contactSubtitle}
                </span>
                <div className="w-12 h-[1px] bg-[#E5E5E5]/50" />
              </div>

              <h2 className="text-4xl md:text-5xl font-light text-white tracking-wide leading-tight mb-16">
                {t.contactTitle}
              </h2>

              <div className="space-y-12">
                <div className="group">
                  <div className="flex items-center gap-4 text-[#E5E5E5] mb-4">
                    <MapPin className="w-5 h-5" />
                    <h3 className="tracking-widest uppercase text-sm">{t.contactDetails.addressLabel}</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-lg pl-9 group-hover:text-white transition-colors duration-300">
                    {t.contactDetails.address}
                  </p>
                </div>

                <div className="group">
                  <div className="flex items-center gap-4 text-[#E5E5E5] mb-4">
                    <Phone className="w-5 h-5" />
                    <h3 className="tracking-widest uppercase text-sm">{t.contactDetails.phoneLabel}</h3>
                  </div>
                  <p className="text-gray-300 text-lg pl-9 group-hover:text-white transition-colors duration-300">
                    {t.contactDetails.phone}
                  </p>
                </div>

                <div className="group">
                  <div className="flex items-center gap-4 text-[#E5E5E5] mb-4">
                    <Mail className="w-5 h-5" />
                    <h3 className="tracking-widest uppercase text-sm">{t.contactDetails.emailLabel}</h3>
                  </div>
                  <a href={`mailto:${t.contactDetails.email}`} className="block text-gray-300 text-lg pl-9 hover:text-[#E5E5E5] transition-colors duration-300">
                    {t.contactDetails.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Map Area (Using a stylized premium image to maintain the high-end look instead of a basic iframe) */}
            <div className="w-full lg:w-2/3 relative h-[500px] lg:h-auto min-h-[500px] group overflow-hidden border border-white/10">
              <div className="absolute inset-0 bg-[#1A1A1A]/40 z-10 group-hover:bg-[#1A1A1A]/10 transition-colors duration-[2000ms] ease-out pointer-events-none" />
              <img 
                src="https://images.unsplash.com/photo-1767334850894-df59f709cf64?q=80&w=1920" 
                alt="Global Reach Map" 
                className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[2000ms] ease-out"
              />
              
              {/* Location Pin overlay */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
                <div className="w-16 h-16 bg-[#141414]/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-[#E5E5E5]/30 mb-4 animate-pulse">
                  <MapPin className="w-6 h-6 text-[#E5E5E5]" />
                </div>
                <div className="bg-[#141414]/90 backdrop-blur-md px-6 py-3 border border-white/10 text-white tracking-widest text-xs uppercase">
                  Global Headquarters
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
