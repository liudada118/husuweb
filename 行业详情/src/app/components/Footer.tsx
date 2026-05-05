export function Footer() {
  return (
    <footer
      className="relative pt-[5rem]"
      style={{
        background:
          "linear-gradient(248deg, #2e2e2e 49%, #121212 66%)",
      }}
    >
      <div className="mx-auto max-w-[120rem] px-[2.5rem] lg:px-[3rem] xl:px-[3.5rem]">
        <div className="flex flex-col lg:flex-row gap-[3rem] justify-between items-start lg:items-center pb-[2rem]">
          <div className="flex flex-col gap-[0.5rem]">
            <span className="text-[#d9b27a] tracking-[0.25em] text-[1.75rem] font-semibold">TIGER</span>
            <span className="text-[#d9b27a] tracking-[0.3em] text-[0.875rem] font-light">PARTNERS</span>
          </div>
          <div className="text-right max-w-[42rem]">
            <p className="text-[rgba(217,178,122,0.7)] text-[1.125rem] leading-[1.5] tracking-[0.05em]">
              Always pursuing the extreme and seeking the perfection
            </p>
            <p className="text-[rgba(217,178,122,0.7)] text-[1.125rem] leading-[1.5] tracking-[0.05em]">
              Always aiming at winning lawsuits and fulfilling clients' business goals
            </p>
          </div>
        </div>

        <div className="border-t border-[#343434]/80 pt-[2rem] pb-[1rem]">
          <p className="text-[#535353] text-[1rem] leading-[1.7]">
            Suite 01, 25F, Tower A, Sino-Ocean International Center, 56 East 4th Ring Middle Road, Chaoyang District, Beijing 100025, China
          </p>
        </div>

        <div className="pb-[2rem] flex flex-col md:flex-row gap-[1rem] md:gap-[5rem] items-start">
          <p className="text-[#535353] text-[1rem]">010-85885228</p>
          <p className="text-[#535353] text-[1rem]">contact@tigerpartners.cn</p>
        </div>

        <div className="border-t border-[#343434]/80" />
      </div>

      <div className="bg-[rgba(25,25,25,0.6)]">
        <div className="mx-auto max-w-[120rem] px-[2.5rem] lg:px-[3rem] xl:px-[3.5rem] py-[2rem] flex flex-col md:flex-row flex-wrap gap-[1rem] md:gap-[2.5rem] items-start md:items-center justify-between text-[#7f7f7f] text-[0.875rem]">
          <span>All Rights Reserved © 2019 Tiger Partners</span>
          <span>Disclaimer and Privacy</span>
          <span>京ICP备20002490号</span>
          <span>京公网安备11010502052714号</span>
        </div>
      </div>
    </footer>
  );
}
