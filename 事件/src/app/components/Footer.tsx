import logoImg from "../../imports/Events/36ad2f8d299cc6686a0c53c13c322bc4f42a8e87.png";
import { MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-[#0C0C0C] mt-[5rem]">
      <div className="bg-gradient-to-b from-[#121212] to-transparent">
        <div className="mx-auto max-w-[120rem] px-[2rem] lg:px-[3.5rem] py-[5rem]">
          <div className="bg-[#191919]/60 -mx-[2rem] lg:-mx-[3.5rem] px-[2rem] lg:px-[3.5rem] py-[3rem] mb-[3rem]">
            <p
              className="text-[#D9B27A]/70 tracking-[0.05em] text-left lg:text-right"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: "clamp(0.875rem, 1.1vw, 1.25rem)", lineHeight: 1.5 }}
            >
              Always pursuing the extreme and seeking the perfection<br />
              Always aiming at winning lawsuits and fulfilling clients' business goals
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-[3rem] lg:gap-[4rem] items-start">
            <div className="flex-shrink-0">
              <svg viewBox="0 0 153 115" className="w-[6rem] h-[4.5rem] fill-[#D9B27A]" xmlns="http://www.w3.org/2000/svg">
                <text x="0" y="40" fill="#D9B27A" fontSize="32" fontFamily="serif" fontWeight="700">TIGER</text>
                <text x="0" y="80" fill="#D9B27A" fontSize="14" fontFamily="serif" letterSpacing="4">PARTNERS</text>
                <line x1="0" y1="50" x2="153" y2="50" stroke="#D9B27A" strokeWidth="1" />
              </svg>
            </div>
            <div className="flex-1 space-y-[1rem] text-[#535353]" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: "clamp(0.875rem, 1vw, 1.125rem)", lineHeight: 1.7 }}>
              <p className="flex items-start gap-[0.75rem]">
                <MapPin className="w-[1.125rem] h-[1.125rem] mt-[0.25rem] flex-shrink-0 text-[#D9B27A]" />
                Suite 01, 25F, Tower A, Sino-Ocean International Center, 56 East 4th Ring Middle Road, Chaoyang District, Beijing 100025, China
              </p>
              <p className="flex flex-wrap items-center gap-x-[3rem] gap-y-[0.5rem]">
                <span className="flex items-center gap-[0.75rem]"><Phone className="w-[1rem] h-[1rem] text-[#D9B27A]" />010-85885228</span>
                <span className="flex items-center gap-[0.75rem]"><Mail className="w-[1rem] h-[1rem] text-[#D9B27A]" />contact@tigerpartners.cn</span>
              </p>
            </div>
            <div className="flex-shrink-0">
              <img src={logoImg} alt="QR" className="w-[6rem] h-[6rem] object-cover" />
            </div>
          </div>

          <div className="mt-[3rem] pt-[2rem] border-t border-[#343434]/80 flex flex-col md:flex-row flex-wrap gap-[1rem] md:gap-[2rem] justify-between text-[#7F7F7F]" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem" }}>
            <span>All Rights Reserved © 2019 Tiger Partners</span>
            <a href="#" className="hover:text-[#D9B27A]">Disclaimer and Privacy</a>
            <span>京ICP备20002490号</span>
            <span>京公网安备11010502052714号</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
