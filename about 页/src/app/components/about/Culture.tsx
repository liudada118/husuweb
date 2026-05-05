import { ImageWithFallback } from "../figma/ImageWithFallback";

export function Culture() {
  return (
    <section className="relative w-full mt-[8rem] bg-[#373737] overflow-hidden">
      <div className="mx-auto max-w-[120rem] grid grid-cols-1 lg:grid-cols-2 min-h-[50rem]">
        <div className="relative min-h-[20rem] lg:min-h-[50rem]">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1650638952928-da7470403d86?w=1400&q=80"
            alt="city"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(167deg, rgba(0,0,0,0) 10%, #79664a 130%)' }}
          />
        </div>
        <div className="relative px-[2.5rem] md:px-[4rem] lg:px-[5rem] py-[5rem] flex flex-col justify-center">
          <h2
            style={{
              fontFamily: 'Poppins',
              fontWeight: 400,
              fontSize: 'clamp(2.5rem, 4vw, 4rem)',
              color: '#d9b27a',
              lineHeight: 1,
            }}
          >
            CULTURE
          </h2>
          <p
            className="mt-[2.5rem] text-justify"
            style={{
              fontFamily: 'Poppins',
              fontWeight: 400,
              fontSize: 'clamp(1rem, 1.3vw, 1.5rem)',
              color: '#e2e2e2',
              lineHeight: 1.7,
            }}
          >
            As a new prominent law firm, Tiger Partners holds its unique culture.
          </p>
          <p
            className="mt-[2.5rem] text-justify"
            style={{
              fontFamily: 'Inter',
              fontWeight: 300,
              fontSize: 'clamp(0.875rem, 1.1vw, 1.25rem)',
              color: '#beb8b1',
              lineHeight: 1.9,
            }}
          >
            Beyond the metrics and the milestones, our cultural bedrock is built on a profound sense of
            responsibility. We recognize that the systems we design shape the realities of millions.
            Therefore, our commitment to ethical architecture, sustainable practices, and the long-term
            well-being of the communities we serve is not secondary to our business objectives—it is the
            very foundation upon which they rest. We do not merely build; we steward the future.
          </p>
          <button className="mt-[3rem] inline-flex items-center gap-[1rem] self-start">
            <span className="block w-[2rem] h-px bg-[#d9b27a]" />
            <span
              style={{
                fontFamily: 'Poppins',
                fontWeight: 600,
                fontSize: '1rem',
                color: '#d9b27a',
                letterSpacing: '0.08em',
              }}
            >
              Read Full Manifesto
            </span>
            <span className="block w-[2rem] h-px bg-[#d9b27a]" />
          </button>
        </div>
      </div>
    </section>
  );
}
