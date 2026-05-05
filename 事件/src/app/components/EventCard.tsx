import cardImg from "../../imports/Events/eb00e06a7abf4ba3d84f9c93380d52e3195ca702.png";
import { ArrowRight } from "lucide-react";

interface EventCardProps {
  category: string;
  title: string;
  date: string;
}

export function EventCard({ category, title, date }: EventCardProps) {
  return (
    <article className="relative bg-[#2D2D2D] shadow-[0_8px_20px_rgba(0,0,0,0.25)] overflow-hidden group">
      <div className="flex flex-col md:flex-row">
        <div className="relative w-full md:w-[35%] flex-shrink-0 aspect-[3/2] md:aspect-auto md:h-[20rem] lg:h-[25rem] bg-[#616161] overflow-hidden">
          <img src={cardImg} alt={title} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 px-[1.5rem] md:px-[3rem] py-[2rem] md:py-[3rem] flex flex-col justify-center relative">
          <div className="w-[3.5rem] h-[0.25rem] bg-[#D9B27A] mb-[2rem]" />
          <p
            className="text-white tracking-[-0.02em]"
            style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: "clamp(1.125rem, 1.6vw, 1.75rem)", lineHeight: 1.5 }}
          >
            <span className="italic text-[#D1CECA]" style={{ fontFamily: "'Poppins', serif", fontWeight: 400 }}>{category}</span>
            <span className="text-[#D1CECA] font-light"> | </span>
            <span>{title}</span>
          </p>
          <p
            className="text-[#D1CECA] mt-[1.5rem] tracking-[-0.02em]"
            style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: "clamp(0.875rem, 1.1vw, 1.25rem)" }}
          >
            {date}
          </p>
          <ArrowRight
            className="absolute right-[1.5rem] md:right-[2.5rem] bottom-[1.5rem] md:bottom-[2.5rem] text-[#D9B27A] transition-transform group-hover:translate-x-1"
            style={{ width: "2.75rem", height: "1.5rem" }}
            strokeWidth={1.5}
          />
        </div>
      </div>
    </article>
  );
}
