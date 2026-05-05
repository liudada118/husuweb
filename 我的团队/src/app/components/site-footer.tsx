import svgPaths from "../../imports/OurTeam/svg-la9ckb3a1i";
import imgImage1 from "../../imports/OurTeam/36ad2f8d299cc6686a0c53c13c322bc4f42a8e87.png";

export function SiteFooter() {
  return (
    <footer
      className="relative w-full"
      style={{
        background: "linear-gradient(248.144deg, rgb(46,46,46) 49.305%, rgb(18,18,18) 65.946%)",
      }}
    >
      <div className="max-w-[120rem] mx-auto px-[3rem] pt-[6rem] pb-[2rem]">
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-[3rem] items-start">
          {/* Logo */}
          <div className="w-[9.5rem] h-[7.2rem] text-[#d9b27a]">
            <svg
              viewBox="0 0 153.1 115.113"
              fill="currentColor"
              className="w-full h-full"
              preserveAspectRatio="xMidYMid meet"
            >
              <path d={svgPaths.p8d81000} />
              <path d={svgPaths.pdd5f000} />
              <path d={svgPaths.p3d171800} />
              <path d={svgPaths.p8adf00} />
              <path d={svgPaths.p15735740} />
              <path d={svgPaths.p36f9ac00} />
              <path d={svgPaths.p37916d00} />
              <path d={svgPaths.p1bbf9a00} />
              <path d={svgPaths.p6aa8b40} />
              <path d={svgPaths.p29925c00} />
              <path d={svgPaths.p212db480} />
              <path d={svgPaths.p74b4cc0} />
              <path d={svgPaths.p31fcf800} />
              <path d={svgPaths.p135c69d0} />
              <path d={svgPaths.p2cc7f880} />
              <path d={svgPaths.p22e17a00} />
              <path d={svgPaths.p30f90c00} />
              <path d={svgPaths.p28c52080} />
              <path d={svgPaths.p1caa9700} />
              <path d={svgPaths.p30717080} />
              <path d={svgPaths.p39bc4d00} />
              <path d={svgPaths.p120408f0} />
              <path d={svgPaths.p38cc3430} />
              <path d={svgPaths.p25223d00} />
              <path d={svgPaths.p20f14e80} />
              <path d={svgPaths.p2a7a6200} />
              <path d={svgPaths.p340c3900} />
              <path d={svgPaths.p2f4faf00} />
              <path d={svgPaths.p1ca12600} />
            </svg>
          </div>

          <div />

          <div
            className="text-right text-[rgba(217,178,122,0.7)] tracking-[1.2px]"
            style={{ fontSize: "1.5rem", lineHeight: "2rem", fontWeight: 500 }}
          >
            <p>Always pursuing the extreme and seeking the perfection</p>
            <p>Always aiming at winning lawsuits and fulfilling clients' business goals</p>
          </div>
        </div>

        <div className="mt-[3.75rem] border-t border-[#343434]/80" />

        <div className="mt-[2rem] grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-[2rem]">
          <div className="text-[#535353]" style={{ fontSize: "1.25rem", lineHeight: "2.1875rem" }}>
            <p>
              Suite 01, 25F, Tower A, Sino-Ocean International Center, 56 East 4th Ring Middle Road,
              Chaoyang District, Beijing 100025, China
            </p>
            <p className="mt-[1.25rem]">
              010-85885228&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;contact@tigerpartners.cn
            </p>
          </div>
          <img src={imgImage1} alt="QR" className="w-[6.9375rem] h-[6.875rem] object-contain self-end justify-self-end" />
        </div>

        <div className="mt-[2rem] border-t border-[#343434]/80" />

        <div className="mt-[1.5rem] flex flex-col lg:flex-row items-center justify-between gap-[1rem] text-[#7f7f7f]" style={{ fontSize: "1rem", lineHeight: "1.5" }}>
          <p>All Rights Reserved © 2019 Tiger Partners</p>
          <p>Disclaimer and Privacy</p>
          <p>京ICP备20002490号</p>
          <p>京公网安备11010502052714号</p>
        </div>
      </div>
    </footer>
  );
}
