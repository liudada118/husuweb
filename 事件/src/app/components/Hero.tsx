import heroImg from "../../imports/Events/9b56a5d8d2803d873e20af7ec4fa3fccdd83d85f.png";

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative w-full h-[28rem] md:h-[34rem] lg:h-[42rem]">
        <img src={heroImg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#171717]" />
        <div className="absolute inset-0 bg-[#444343]/30 mix-blend-multiply" />
      </div>
      <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[120rem] px-[2rem] lg:px-[3.5rem] pb-[3rem] lg:pb-[5rem]">
        <h1
          className="text-[#D9B27A] uppercase italic tracking-[-0.02em]"
          style={{ fontFamily: "'Poppins', serif", fontWeight: 500, fontSize: "clamp(3rem, 7vw, 6.25rem)", lineHeight: 1 }}
        >
          Events
        </h1>
        <p
          className="text-white/70 mt-[1.5rem] max-w-[60rem]"
          style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: "clamp(1rem, 1.4vw, 1.5rem)", lineHeight: 1.4 }}
        >
          Welcome your attention to our real-time dynamics and industry news.
        </p>
      </div>
    </section>
  );
}
