import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Mail, Phone, Globe, Award, Briefcase, GraduationCap, Building2 } from "lucide-react";
import { useLanguage } from "./Layout";
import { teamMembers, teamTranslations } from "./TeamData";

export function MemberDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const t = teamTranslations[lang as keyof typeof teamTranslations];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const memberInfo = teamMembers.find(m => m.id === id);
  if (!memberInfo) {
    return (
      <div className="min-h-screen bg-[#141414] flex items-center justify-center">
        <div className="text-white text-xl font-light tracking-widest uppercase">Member not found</div>
      </div>
    );
  }

  // Use any to bypass TS complaining about optional properties on existing simple objects
  const memberData: any = (t.members as any)[id];

  return (
    <div className="w-full bg-[#141414] min-h-screen pt-20 pb-32 selection:bg-[#E5E5E5] selection:text-[#18181B] font-light">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate('/team')}
          className="group flex items-center gap-3 text-gray-400 hover:text-[#E5E5E5] transition-colors duration-300 mb-16 text-xs font-semibold tracking-[0.2em] uppercase mt-12 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform duration-500" strokeWidth={1.5} />
          {(t as any).backToTeam}
        </button>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Left Column: Image & Contact */}
          <div className="w-full lg:w-1/3 shrink-0">
            <div className="relative overflow-hidden mb-10 aspect-[3/4] shadow-2xl border border-white/5 group">
              <img 
                src={memberInfo.image} 
                alt={memberData.name} 
                className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
              />
              <div className="absolute inset-0 border border-white/10 m-4 pointer-events-none" />
            </div>

            <div className="bg-[#1A1A1A] border border-white/5 p-8">
              <h4 className="text-[#E5E5E5] text-xs font-semibold tracking-[0.2em] uppercase mb-6 border-b border-white/10 pb-4">
                {(t as any).contactTitle}
              </h4>
              <div className="flex flex-col gap-4">
                {memberData.phone && (
                  <a href={`tel:${memberData.phone}`} className="flex items-center gap-4 text-gray-400 hover:text-[#E5E5E5] transition-colors duration-300 text-sm tracking-wide">
                    <Phone className="w-4 h-4 text-[#E5E5E5]" strokeWidth={1.5} />
                    {memberData.phone}
                  </a>
                )}
                {memberData.email && (
                  <a href={`mailto:${memberData.email}`} className="flex items-center gap-4 text-gray-400 hover:text-[#E5E5E5] transition-colors duration-300 text-sm tracking-wide break-all">
                    <Mail className="w-4 h-4 text-[#E5E5E5]" strokeWidth={1.5} />
                    {memberData.email}
                  </a>
                )}
                {/* Fallback original icons if neither exist */}
                {!memberData.phone && !memberData.email && (
                  <div className="flex gap-6 justify-center mt-2">
                    <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-[#E5E5E5] hover:border-[#E5E5E5] transition-all duration-300">
                      <Mail className="w-4 h-4" strokeWidth={1.5} />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="w-full lg:w-2/3 flex flex-col pt-4">
            <div className="mb-16">
              <p className="text-[#E5E5E5] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                {memberData.title}
              </p>
              <h1 className="text-5xl md:text-6xl font-light text-white tracking-wide mb-8 uppercase">
                {memberData.name}
              </h1>
              <div className="w-16 h-[1px] bg-[#E5E5E5]" />
            </div>

            {/* General Bio (for simple profiles) */}
            {memberData.bio && (
              <div className="mb-16">
                <p className="text-gray-300 text-lg md:text-xl font-light leading-[2.2] tracking-wide text-justify">
                  {memberData.bio}
                </p>
              </div>
            )}

            {/* Detailed Quick Facts Grid */}
            {(memberData.serviceIndustries || memberData.education || memberData.qualification || memberData.languages || memberData.engagements) && (
              <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                {memberData.serviceIndustries && (
                  <div>
                    <h5 className="text-xs font-semibold tracking-[0.2em] text-[#E5E5E5] uppercase mb-3 flex items-center gap-3">
                      <Briefcase className="w-4 h-4" strokeWidth={1.5} />
                      {(t as any).servicesTitle}
                    </h5>
                    <p className="text-gray-400 text-sm leading-relaxed">{memberData.serviceIndustries}</p>
                  </div>
                )}
                {memberData.education && (
                  <div>
                    <h5 className="text-xs font-semibold tracking-[0.2em] text-[#E5E5E5] uppercase mb-3 flex items-center gap-3">
                      <GraduationCap className="w-4 h-4" strokeWidth={1.5} />
                      {(t as any).educationTitle}
                    </h5>
                    <p className="text-gray-400 text-sm leading-relaxed">{memberData.education}</p>
                  </div>
                )}
                {memberData.qualification && (
                  <div>
                    <h5 className="text-xs font-semibold tracking-[0.2em] text-[#E5E5E5] uppercase mb-3 flex items-center gap-3">
                      <Award className="w-4 h-4" strokeWidth={1.5} />
                      {(t as any).qualificationTitle}
                    </h5>
                    <p className="text-gray-400 text-sm leading-relaxed">{memberData.qualification}</p>
                  </div>
                )}
                {memberData.languages && (
                  <div>
                    <h5 className="text-xs font-semibold tracking-[0.2em] text-[#E5E5E5] uppercase mb-3 flex items-center gap-3">
                      <Globe className="w-4 h-4" strokeWidth={1.5} />
                      {(t as any).languagesTitle}
                    </h5>
                    <p className="text-gray-400 text-sm leading-relaxed">{memberData.languages}</p>
                  </div>
                )}
                {memberData.engagements && (
                  <div className="md:col-span-2">
                    <h5 className="text-xs font-semibold tracking-[0.2em] text-[#E5E5E5] uppercase mb-3 flex items-center gap-3">
                      <Building2 className="w-4 h-4" strokeWidth={1.5} />
                      {(t as any).engagementsTitle}
                    </h5>
                    <p className="text-gray-400 text-sm leading-relaxed">{memberData.engagements}</p>
                  </div>
                )}
              </div>
            )}

            {/* Detailed Intro Section */}
            {memberData.intro && (
              <div className="mb-16 space-y-12">
                <div className="flex items-center gap-6 mb-8 opacity-80">
                  <span className="text-[#E5E5E5] font-light tracking-[0.2em] text-sm uppercase">
                    {(t as any).introTitle}
                  </span>
                  <div className="flex-1 h-[1px] bg-gradient-to-r from-[#E5E5E5]/50 to-transparent" />
                </div>
                
                {memberData.intro.practiceArea && (
                  <div>
                    <h4 className="text-white text-base font-light tracking-widest uppercase mb-4 border-l-2 border-[#E5E5E5] pl-4">
                      {(t as any).practiceAreaTitle}
                    </h4>
                    <p className="text-gray-400 text-lg leading-[2] tracking-wide text-justify">
                      {memberData.intro.practiceArea}
                    </p>
                  </div>
                )}
                
                {memberData.intro.practiceExperience && (
                  <div>
                    <h4 className="text-white text-base font-light tracking-widest uppercase mb-4 border-l-2 border-[#E5E5E5] pl-4">
                      {(t as any).practiceExperienceTitle}
                    </h4>
                    <div className="text-gray-400 text-lg leading-[2] tracking-wide text-justify space-y-4">
                      {memberData.intro.practiceExperience.split('\n\n').map((para: string, i: number) => (
                        <p key={i}>{para}</p>
                      ))}
                    </div>
                  </div>
                )}

                {memberData.intro.honors && memberData.intro.honors.length > 0 && (
                  <div>
                    <h4 className="text-white text-base font-light tracking-widest uppercase mb-6 border-l-2 border-[#E5E5E5] pl-4">
                      {(t as any).honorsTitle}
                    </h4>
                    <ul className="space-y-4">
                      {memberData.intro.honors.map((honor: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-4 text-gray-400 font-light tracking-wide text-base leading-relaxed">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#E5E5E5] mt-2.5 shrink-0" />
                          <p>{honor}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Achievements Section */}
            {memberData.achievements && memberData.achievements.length > 0 && (
              <div className="mb-16">
                <div className="flex items-center gap-6 mb-8 opacity-80">
                  <span className="text-[#E5E5E5] font-light tracking-[0.2em] text-sm uppercase">
                    {(t as any).achievementsTitle}
                  </span>
                  <div className="flex-1 h-[1px] bg-gradient-to-r from-[#E5E5E5]/50 to-transparent" />
                </div>
                
                <div className="space-y-6">
                  {memberData.achievements.map((achievement: string, idx: number) => (
                    <div key={idx} className="bg-[#1A1A1A] border border-white/5 p-8 group hover:border-[#E5E5E5]/30 transition-colors duration-500">
                      <div className="flex gap-6 items-start">
                        <span className="text-[#E5E5E5] font-light text-2xl leading-none">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <p className="text-gray-400 font-light leading-relaxed text-lg group-hover:text-gray-300 transition-colors duration-300">
                          {achievement}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Simple Expertise (fallback for older members) */}
            {memberData.expertise && memberData.expertise.length > 0 && (
              <div>
                <h4 className="text-white text-xs font-semibold tracking-[0.2em] uppercase mb-8 flex items-center gap-4">
                  {(t as any).expertiseTitle}
                  <span className="flex-1 h-[1px] bg-white/10" />
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {memberData.expertise.map((skill: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-3 text-gray-400 font-light tracking-wide text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#E5E5E5]" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
          </div>
        </div>

      </div>
    </div>
  );
}
