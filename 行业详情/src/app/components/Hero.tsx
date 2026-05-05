import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1537282926680-585492d68e85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt="city"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(68,67,67,0.5)] mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#171717]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(56,56,56,0) 30%, #171717 93%)",
          }}
        />
      </div>

      {/* Diagonal overlay */}
      <div
        className="absolute left-0 bottom-0 w-[86.6%] h-[60%] opacity-70 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(39,39,39,0) 0%, rgba(39,39,39,0.6) 100%)",
          clipPath: "polygon(0 100%, 100% 100%, 0 0)",
        }}
      />

      <div className="relative mx-auto max-w-[120rem] px-[2.5rem] lg:px-[3rem] xl:px-[3.5rem] pt-[14rem] pb-[3rem]">
        {/* Breadcrumb */}
        <div className="text-[1.25rem] tracking-[0.02em] mb-[12rem]">
          <span className="text-[#bec3cb] font-light">Industries / </span>
          <span className="text-white">Private Equity</span>
        </div>

        {/* Title row */}
        <div className="flex flex-col lg:flex-row gap-[2rem] lg:gap-[3rem] items-start">
          <div className="lg:w-[26rem] flex-shrink-0">
            <div className="w-[5rem] h-[3px] bg-[#d9b27a] mb-[2rem]" />
            <h1 className="text-[#d9b27a] text-[3.25rem] leading-[1.1] font-semibold tracking-[-0.01em]">
              Private Equity
            </h1>
          </div>
          <p className="flex-1 text-[#d1d5dc] text-[1.25rem] leading-[1.8] tracking-[0.02em] text-justify max-w-[60rem]">
            Tiger Partners provides a full range of legal services to many
            well-known Chinese investment institutions, portfolio/invested
            companies, founders or shareholders, ranging from potential risk
            control, pre-litigation dispute resolution, litigation, arbitration
            and enforcement, to achieve their ultimate business goals.
          </p>
        </div>
      </div>
    </section>
  );
}
