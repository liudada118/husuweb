import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "./Layout";
import { industriesList, industriesDetailData, industriesTranslations } from "./IndustriesData";

export function IndustryDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const t = industriesTranslations[lang as keyof typeof industriesTranslations];
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Find the base list data to get the image
  const baseData = industriesList[lang as keyof typeof industriesList].find(ind => ind.id === id);
  // Find the detailed data
  const detailDataObj = (industriesDetailData as any)[id as string];
  const detailData = detailDataObj ? detailDataObj[lang] : null;

  if (!baseData) {
    return (
      <div className="min-h-screen bg-[#141414] flex items-center justify-center flex-col gap-6">
        <div className="text-white text-xl font-light tracking-widest uppercase">Industry not found</div>
        <Link to="/industries" className="text-gray-400 hover:text-white uppercase tracking-widest text-sm underline underline-offset-4">
          Return to Industries
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#141414] min-h-screen pt-20 pb-32 selection:bg-[#E5E5E5] selection:text-[#18181B] font-light">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate('/industries')}
          className="group flex items-center gap-3 text-gray-400 hover:text-[#E5E5E5] transition-colors duration-300 mb-16 text-xs font-semibold tracking-[0.2em] uppercase mt-12 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform duration-500" strokeWidth={1.5} />
          {t.backToIndustries}
        </button>

        {/* Hero Section for Detail */}
        <div className="mb-24 relative">
          <div className="w-full h-[50vh] md:h-[60vh] overflow-hidden border border-white/5 relative group">
            <div className="absolute inset-0 bg-[#1A1A1A]/40 z-10 transition-colors duration-700 pointer-events-none" />
            <img 
              src={baseData.image} 
              alt={detailData ? detailData.title : baseData.name}
              className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1500ms] ease-out"
            />
            {/* Title Overlay */}
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-12 bg-gradient-to-t from-[#141414] to-transparent">
              <h1 className="text-5xl md:text-7xl font-light text-white tracking-[0.15em] uppercase drop-shadow-lg">
                {detailData ? detailData.title : baseData.name}
              </h1>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Column */}
          <div className="hidden lg:block lg:w-1/4 shrink-0 relative">
            <div className="sticky top-32 flex flex-col gap-6 opacity-60">
              <span className="text-[#E5E5E5] font-light tracking-[0.2em] text-sm uppercase">
                {t.servicesTitle}
              </span>
              <div className="w-full h-[1px] bg-gradient-to-r from-[#E5E5E5]/50 to-transparent" />
            </div>
          </div>

          {/* Right Column - Main Text Content */}
          <div className="w-full lg:w-3/4 flex flex-col">
            {detailData ? (
              <div className="space-y-12">
                {/* Introduction Paragraphs */}
                {detailData.paragraphs && detailData.paragraphs.length > 0 && (
                  <div className="space-y-6">
                    {detailData.paragraphs.map((para: string, idx: number) => (
                      <p key={idx} className="text-gray-300 text-lg md:text-xl font-light leading-[2.2] tracking-wide text-justify">
                        {para}
                      </p>
                    ))}
                  </div>
                )}

                {/* Detailed Lists */}
                {detailData.listItems && detailData.listItems.length > 0 && (
                  <div className="mt-16 space-y-10">
                    {detailData.listItems.map((item: any, idx: number) => (
                      <div key={idx} className="bg-[#1A1A1A] border border-white/5 p-8 md:p-12 hover:border-[#E5E5E5]/30 transition-colors duration-500 group">
                        <p className="text-[#E5E5E5] font-light text-lg md:text-xl leading-relaxed tracking-wide group-hover:text-white transition-colors duration-300">
                          {item.main}
                        </p>
                        
                        {item.subItems && item.subItems.length > 0 && (
                          <ul className="mt-6 space-y-4 pl-4 md:pl-8">
                            {item.subItems.map((subItem: string, sIdx: number) => (
                              <li key={sIdx} className="text-gray-400 font-light text-base md:text-lg leading-relaxed tracking-wide group-hover:text-gray-300 transition-colors duration-300">
                                {subItem}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-12">
                <p className="text-gray-300 text-lg md:text-xl font-light leading-[2.2] tracking-wide text-justify">
                  {baseData.desc}
                </p>
                <div className="text-gray-500 italic text-sm tracking-wide">
                  {lang === 'zh' ? "更多详细信息正在准备中..." : "More details are being prepared..."}
                </div>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}
