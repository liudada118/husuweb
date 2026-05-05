import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { ArrowLeft, Calendar } from "lucide-react";
import { useLanguage } from "./Layout";
import { eventsTranslations } from "./EventsData";

export function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const t = eventsTranslations[lang as keyof typeof eventsTranslations];
  
  const event = t.events.find(e => e.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!event) {
    return (
      <div className="min-h-screen bg-[#141414] flex items-center justify-center">
        <div className="text-white text-xl">Event not found.</div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#141414] selection:bg-[#D9B27A] selection:text-[#18181B] min-h-screen pt-32 pb-32">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate('/events')}
          className="flex items-center gap-3 text-gray-400 hover:text-[#D9B27A] transition-colors duration-300 mb-16 text-sm tracking-widest uppercase font-light group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform duration-300" />
          {t.backBtn}
        </button>

        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 text-[#D9B27A] text-sm font-light tracking-widest mb-6">
            <Calendar className="w-4 h-4" />
            <span>{event.date}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-wide leading-tight mb-8">
            {event.title}
          </h1>
          <div className="w-24 h-[1px] bg-[#D9B27A]/50" />
        </div>

        {/* Hero Image */}
        <div className="relative w-full aspect-video mb-16 overflow-hidden border border-white/5">
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-gray-300 font-light leading-relaxed text-lg md:text-xl text-justify">
            {event.content}
          </p>
        </div>

      </div>
    </div>
  );
}
