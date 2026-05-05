import React from "react";
import Slider from "react-slick";
import { Link, useNavigate } from "react-router";
import { ArrowRight, ChevronRight, Award, Star, Shield, Trophy, Globe, Briefcase, Activity, Building, Zap, Cpu, Database, Server, Smartphone, Laptop, Cloud, Wifi, Monitor, HardDrive, Printer, Headphones, Mouse, Keyboard } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useLanguage } from "./Layout";

const heroImages = [
  "https://images.unsplash.com/photo-1718066236074-13f8cf7ae93e?ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1644088379091-d574269d422f?ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1744868562210-fffb7fa882d9?ixlib=rb-4.1.0&q=80&w=1080"
];

const industryImages = {
  technology: "https://images.unsplash.com/photo-1644088379091-d574269d422f?q=80&w=800",
  healthcare: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=800",
  finance: "https://images.unsplash.com/photo-1762279389020-eeeb69c25813?q=80&w=800",
  logistics: "https://images.unsplash.com/photo-1755428827884-d75ff68d2a77?q=80&w=800",
  "real-estate": "https://images.unsplash.com/photo-1766854268133-7ac973e1ec8a?q=80&w=800",
  energy: "https://images.unsplash.com/photo-1630450364945-0c1ec2c449cb?q=80&w=800"
};

const honorIcons = [Trophy, Star, Award, Shield];

const clientLogos = [
  Globe, Briefcase, Activity, Building, Zap, Cpu, Database, Server, 
  Smartphone, Laptop, Cloud, Wifi, Monitor, HardDrive, Printer, 
  Headphones, Mouse, Keyboard, Shield, Star
];

const translations = {
  en: {
    hero: [
      { title: "BUILDING THE FUTURE", subtitle: "Innovating global infrastructure with sustainable solutions." },
      { title: "ADVANCED TECHNOLOGY", subtitle: "Driving digital transformation across all sectors." },
      { title: "SECURE DATA", subtitle: "Protecting your most valuable assets with enterprise security." }
    ],
    discoverMore: "Discover More",
    visionHeader: "Our Vision",
    visionTitle: "Empowering Progress Through ",
    visionHighlight: "Strategic Excellence",
    visionP1: "At AuraCorp, our vision transcends traditional boundaries. We strive to be the global benchmark in integrating sustainable practices with cutting-edge innovation.",
    visionP2: "We believe that by fostering a culture of continuous improvement and deeply understanding the nuanced needs of the industries we serve, we can drive unparalleled value. Our dedicated teams work tirelessly to anticipate market shifts, ensuring our partners are always a step ahead.",
    visionBtn: "Explore the Vision",
    expertiseHeader: "Expertise",
    industriesTitle: "Industries & Services",
    industryDesc: (name: string) => `Discover comprehensive, strategic solutions meticulously tailored for the ${name.toLowerCase()} sector.`,
    industries: [
      { id: "technology", name: "Technology" },
      { id: "healthcare", name: "Healthcare" },
      { id: "finance", name: "Finance" },
      { id: "logistics", name: "Logistics" },
      { id: "real-estate", name: "Real Estate" },
      { id: "energy", name: "Energy" }
    ],
    recognitionHeader: "Recognition",
    honorsTitle1: "Honors & ",
    honorsTitle2: "Awards",
    honorsSubtitle: "A testament to our unwavering commitment to excellence, quality, and industry leadership.",
    honors: [
      { title: "Global Innovation Award", year: "2025", desc: "Recognized for outstanding contributions to enterprise technology." },
      { title: "Sustainable Business Leader", year: "2024", desc: "Awarded for achieving carbon-neutral operations globally." },
      { title: "Excellence in Service", year: "2024", desc: "Voted #1 in client satisfaction by Industry Insights." },
      { title: "Security First Certification", year: "2023", desc: "Achieved the highest level of data protection standards." }
    ],
    eventsHeader: "Stay Updated",
    eventsTitle: "Upcoming Events",
    events: [
      { date: "May 15, 2026", title: "Annual Tech Summit", type: "Conference" },
      { date: "Jun 02, 2026", title: "Q2 Financial Briefing", type: "Webinar" },
      { date: "Jul 20, 2026", title: "Global Leadership Forum", type: "Symposium" }
    ],
    readMore: "Read More",
    trustedBy: "Trusted by Global Leaders"
  },
  zh: {
    hero: [
      { title: "共筑未来", subtitle: "以可持续的解决方案创新全球基础设施。" },
      { title: "前沿科技", subtitle: "推动各行业的数字化转型。" },
      { title: "数据安全", subtitle: "以企业级安全标准保护您最宝贵的资产。" }
    ],
    discoverMore: "探索更多",
    visionHeader: "企业愿景",
    visionTitle: "以卓越战略赋能 ",
    visionHighlight: "未来发展",
    visionP1: "在 AuraCorp，我们的愿景超越了传统边界。我们致力于成为将可持续实践与前沿创新相结合的全球标杆。",
    visionP2: "我们相信，通过培养持续改进的文化，并深入理解我们所服务行业的细微需求，我们可以创造无与伦比的价值。我们的专业团队不知疲倦地工作，预测市场变化，确保我们的合作伙伴始终领先一步。",
    visionBtn: "探索企业愿景",
    expertiseHeader: "专业专长",
    industriesTitle: "核心业务与服务",
    industryDesc: (name: string) => `探索专为${name}领域精心定制的全面战略解决方案。`,
    industries: [
      { id: "technology", name: "科技创新" },
      { id: "healthcare", name: "医疗健康" },
      { id: "finance", name: "金融科技" },
      { id: "logistics", name: "现代物流" },
      { id: "real-estate", name: "房地产" },
      { id: "energy", name: "新能源" }
    ],
    recognitionHeader: "殊荣与认可",
    honorsTitle1: "荣誉与",
    honorsTitle2: "奖项",
    honorsSubtitle: "证明了我们对卓越、质量以及行业领导地位的坚定承诺。",
    honors: [
      { title: "全球创新奖", year: "2025", desc: "表彰在企业技术领域做出的杰出贡献。" },
      { title: "可持续商业领袖", year: "2024", desc: "因在全球范围内实现碳中和运营而获奖。" },
      { title: "卓越服务奖", year: "2024", desc: "被《行业洞察》评为客户满意度第一名。" },
      { title: "安全优先认证", year: "2023", desc: "达到最高级别的数据保护标准。" }
    ],
    eventsHeader: "最新动态",
    eventsTitle: "即将举行的活动",
    events: [
      { date: "2026年5月15日", title: "年度科技峰会", type: "会议" },
      { date: "2026年6月02日", title: "第二季度财务简报", type: "线上研讨" },
      { date: "2026年7月20日", title: "全球领导力论坛", type: "高端论坛" }
    ],
    readMore: "阅读详情",
    trustedBy: "深受全球行业领导者信赖"
  }
};

export function Home() {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const t = translations[lang];

  const heroSettings = {
    dots: true,
    infinite: true,
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    fade: true,
    arrows: false,
    customPaging: (i: number) => (
      <div className="w-12 h-[2px] mx-2 bg-white/30 mt-[-60px] hover:bg-[#E5E5E5] transition-colors duration-500 rounded-none cursor-pointer" />
    )
  };

  const clientSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 0,
    cssEase: "linear",
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 5 } },
      { breakpoint: 600, settings: { slidesToShow: 3 } }
    ]
  };

  const handleIndustryClick = (id: string) => {
    navigate(`/industries#${id}`);
  };

  return (
    <div className="w-full bg-[#141414]">
      {/* 1. HERO CAROUSEL */}
      <section className="relative h-[80vh] min-h-[600px] w-full bg-[#09090B]">
        <Slider {...heroSettings} className="h-full w-full">
          {t.hero.map((slide, idx) => (
            <div key={idx} className="relative h-[80vh] min-h-[600px] w-full outline-none">
              {idx === 0 ? (
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-80"
                  src="https://assets.mixkit.co/videos/preview/mixkit-modern-office-space-with-desks-and-computers-4148-large.mp4"
                />
              ) : (
                <div 
                  className="absolute inset-0 bg-cover bg-center animate-kenburns grayscale opacity-80"
                  style={{ backgroundImage: `url(${heroImages[idx]})` }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-[#09090B]/80 via-[#09090B]/50 to-[#141414] z-10" />
              <div className="absolute inset-0 flex items-center z-20">
                <div className="container mx-auto px-6 lg:px-12">
                  <div className="max-w-3xl">
                    <h1 className="text-5xl md:text-7xl font-light text-white mb-6 tracking-wide leading-tight">
                      {slide.title}
                    </h1>
                    <div className="flex items-center gap-6 mb-10">
                      <div className="w-12 h-[1px] bg-[#E5E5E5]" />
                      <p className="text-lg md:text-2xl text-gray-300 font-light tracking-wide">
                        {slide.subtitle}
                      </p>
                    </div>
                    <button className="bg-transparent border border-[#E5E5E5]/60 text-[#E5E5E5] hover:bg-[#E5E5E5] hover:text-[#09090B] px-10 py-4 text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-500 flex items-center gap-4 group">
                      {t.discoverMore}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* 2. VISION */}
      <section id="vision" className="py-32 bg-[#141414] relative overflow-hidden">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1718066236074-13f8cf7ae93e?q=80&w=1920')] bg-cover opacity-[0.02] mix-blend-overlay" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="w-full lg:w-1/2">
              <div className="relative group p-4">
                <div className="absolute inset-0 border border-[#E5E5E5]/30 transform translate-x-4 translate-y-4 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-700" />
                <div className="relative overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-[#E5E5E5]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 mix-blend-overlay" />
                  <img 
                    src="https://images.unsplash.com/photo-1629507208649-70919ca33793?q=80&w=1080" 
                    alt="Corporate Vision" 
                    className="relative w-full h-[550px] object-cover grayscale group-hover:grayscale-0 transform group-hover:scale-105 transition-all duration-1000"
                  />
                </div>
                
                {/* Secondary overlapping image/video element */}
                <div className="absolute -bottom-10 -right-10 w-2/3 h-64 shadow-2xl border border-white/5 overflow-hidden hidden md:block">
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 transition-all duration-1000"
                    src="https://assets.mixkit.co/videos/preview/mixkit-business-people-meeting-in-a-conference-room-4131-large.mp4"
                  />
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-[1px] bg-[#E5E5E5]" />
                <h4 className="text-[#E5E5E5] font-semibold tracking-[0.2em] text-xs uppercase">{t.visionHeader}</h4>
              </div>
              <h2 className="text-4xl lg:text-5xl font-light text-white mb-8 leading-tight tracking-wide">
                {t.visionTitle} <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">{t.visionHighlight}</span>
              </h2>
              <p className="text-gray-400 mb-6 text-lg leading-relaxed font-light">
                {t.visionP1}
              </p>
              <p className="text-gray-400 mb-12 leading-relaxed font-light">
                {t.visionP2}
              </p>
              <button className="inline-flex items-center gap-4 border-b border-[#E5E5E5] text-white pb-2 hover:text-[#E5E5E5] transition-colors duration-300 group tracking-widest text-sm uppercase">
                {t.visionBtn}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INDUSTRIES AND SERVICES */}
      <section className="py-32 bg-[#1A1A1A] relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <div className="container mx-auto px-6">
          <div className="text-center mb-24 flex flex-col items-center">
            <h4 className="text-[#E5E5E5] font-semibold tracking-[0.2em] text-xs mb-4 uppercase">{t.expertiseHeader}</h4>
            <h2 className="text-4xl lg:text-5xl font-light text-white tracking-wide">{t.industriesTitle}</h2>
            <div className="w-16 h-[1px] bg-[#E5E5E5] mt-8" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.industries.map((ind) => (
              <div 
                key={ind.id} 
                className="group cursor-pointer bg-[#141414] overflow-hidden shadow-lg hover:-translate-y-2 transition-all duration-500 relative"
                onClick={() => handleIndustryClick(ind.id)}
              >
                {/* Top highlight line on hover */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#E5E5E5] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-30" />
                
                <div className="h-56 overflow-hidden relative">
                  <div className="absolute inset-0 bg-[#09090B]/60 group-hover:bg-[#09090B]/20 transition-colors duration-700 z-10" />
                  <img 
                    src={industryImages[ind.id as keyof typeof industryImages]} 
                    alt={ind.name} 
                    className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0" 
                  />
                </div>
                <div className="p-8 border-t border-white/5 relative z-20">
                  <h3 className="text-2xl font-light tracking-wide text-white mb-3 flex items-center justify-between">
                    {ind.name}
                    <ArrowRight className="w-5 h-5 text-[#E5E5E5] opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-500" strokeWidth={1.5} />
                  </h3>
                  <p className="text-gray-500 text-sm font-light leading-relaxed">
                    {t.industryDesc(ind.name)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HONORS */}
      <section className="py-32 bg-[#09090B] relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-20">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-[1px] bg-[#E5E5E5]" />
                <h4 className="text-[#E5E5E5] font-semibold tracking-[0.2em] text-xs uppercase">{t.recognitionHeader}</h4>
              </div>
              <h2 className="text-4xl lg:text-5xl font-light text-white tracking-wide leading-tight">
                {t.honorsTitle1} <span className="font-semibold">{t.honorsTitle2}</span>
              </h2>
            </div>
            <p className="text-gray-500 max-w-sm mt-8 lg:mt-0 font-light text-lg">
              {t.honorsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.honors.map((honor, idx) => {
              const Icon = honorIcons[idx];
              return (
                <div key={idx} className="bg-[#1A1A1A] border border-white/5 p-10 hover:border-[#E5E5E5]/30 transition-all duration-500 group relative overflow-hidden">
                  <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#E5E5E5]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <Icon className="w-10 h-10 text-[#E5E5E5] mb-8 transform group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500" strokeWidth={1} />
                  <div className="text-[#E5E5E5] font-light tracking-widest text-xs mb-4 uppercase">{honor.year}</div>
                  <h3 className="text-xl font-light text-white mb-4 tracking-wide">{honor.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-light">{honor.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. EVENTS */}
      <section id="events" className="py-32 bg-[#141414] relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        
        <div className="container mx-auto px-6">
          <div className="text-center mb-24 flex flex-col items-center">
            <h4 className="text-[#E5E5E5] font-semibold tracking-[0.2em] text-xs mb-4 uppercase">{t.eventsHeader}</h4>
            <h2 className="text-4xl lg:text-5xl font-light text-white tracking-wide">{t.eventsTitle}</h2>
            <div className="w-16 h-[1px] bg-[#E5E5E5] mt-8" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.events.map((event, idx) => (
              <div key={idx} className="bg-[#1A1A1A] border border-white/5 p-10 hover:border-[#E5E5E5]/50 transition-all duration-500 group flex flex-col h-full">
                <div className="text-[#E5E5E5] font-medium tracking-widest text-xs mb-6 border border-[#E5E5E5]/30 inline-block px-4 py-1.5 self-start uppercase">
                  {event.type}
                </div>
                <div className="text-2xl font-light text-white mb-4 tracking-wide">{event.title}</div>
                <div className="text-gray-500 mb-10 flex items-center gap-3 font-light text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E5E5E5]" />
                  {event.date}
                </div>
                <div className="mt-auto pt-8 border-t border-white/5">
                  <button className="text-gray-400 text-sm tracking-widest uppercase font-light flex items-center gap-3 group-hover:text-[#E5E5E5] transition-colors duration-300">
                    {t.readMore}
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-500" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CLIENTS */}
      <section className="py-24 bg-[#1A1A1A] border-t border-white/5 overflow-hidden">
        <div className="container mx-auto px-6 mb-12 text-center">
          <h4 className="text-gray-500 font-light tracking-[0.2em] text-xs uppercase">{t.trustedBy}</h4>
        </div>
        <div className="w-full opacity-60 hover:opacity-100 transition-opacity duration-1000">
          <Slider {...clientSettings}>
            {clientLogos.map((Icon, idx) => (
              <div key={idx} className="outline-none flex justify-center py-4">
                <div className="w-full flex justify-center items-center opacity-30 hover:opacity-100 transition-all duration-500 grayscale cursor-pointer group">
                  <Icon className="w-10 h-10 text-gray-400 group-hover:text-white group-hover:scale-110 transition-all duration-500" strokeWidth={1} />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </div>
  );
}