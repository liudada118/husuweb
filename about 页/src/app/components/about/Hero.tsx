import { ImageWithFallback } from "../figma/ImageWithFallback";

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden" style={{ height: 'min(67.5rem, 100vh)' }}>
      <ImageWithFallback
        src="https://images.unsplash.com/photo-1662647326416-7f7bc8f86eef?w=1920&q=80"
        alt="building"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#171717]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
      <div className="relative z-10 mx-auto max-w-[120rem] h-full px-[2.5rem] flex flex-col justify-center">
        <h1
          className="text-[#1b1b1b]"
          style={{
            fontFamily: 'Poppins',
            fontWeight: 700,
            fontSize: 'clamp(3rem, 6.5vw, 6rem)',
            letterSpacing: '0.04em',
            textShadow: '0 0 1px rgba(0,0,0,0.4)',
            lineHeight: 1,
          }}
        >
          About us
        </h1>
        <p
          className="mt-[2rem] max-w-[74rem] text-[#1b1b1b]"
          style={{
            fontFamily: 'Poppins',
            fontWeight: 600,
            fontSize: 'clamp(1.25rem, 2.2vw, 2.25rem)',
            letterSpacing: '0.02em',
            lineHeight: 1.4,
          }}
        >
          Tiger crouching in a mountain remote feels the wind roar
          <br />
          Dragon awaits the tide to rise, when lying on a shallow shoal
        </p>
      </div>
    </section>
  );
}
