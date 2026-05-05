export function Vision() {
  return (
    <section className="relative -mt-[18rem] z-20 mx-auto max-w-[120rem] px-[2.5rem]">
      <div
        className="relative rounded-[0.625rem] overflow-hidden p-[3rem] md:p-[4.5rem] lg:p-[5.5rem]"
        style={{
          background:
            'linear-gradient(165deg, rgba(212,203,190,0.18) 35%, rgba(50,50,50,0.55) 80%), #1a1a1a',
          backdropFilter: 'blur(2px)',
        }}
      >
        <div className="flex flex-col lg:flex-row justify-between items-start gap-[2rem] mb-[2.5rem]">
          <div className="hidden md:block w-[10.625rem] h-[10.625rem] opacity-40">
            <svg viewBox="0 0 170 170" fill="none">
              <circle cx="85" cy="85" r="80" stroke="#C5C5C5" strokeOpacity="0.6" strokeWidth="1.5" />
              <path d="M30 85 Q 85 30, 140 85 T 30 85" stroke="#C5C5C5" strokeOpacity="0.6" strokeWidth="1.5" fill="none" />
              <path d="M85 20 L85 150 M20 85 L150 85" stroke="#C5C5C5" strokeOpacity="0.4" strokeWidth="1" />
            </svg>
          </div>
          <div className="flex-1 text-right">
            <p
              className="capitalize"
              style={{
                fontFamily: 'Poppins',
                fontWeight: 500,
                fontSize: 'clamp(1rem, 1.4vw, 1.5rem)',
                color: 'rgba(217,178,122,0.85)',
                lineHeight: 1.4,
              }}
            >
              We are determined to be one of the
              <br />
              extraordinary law firms in disputes resolution area
            </p>
            <h2
              className="mt-[1.25rem] inline-block bg-clip-text text-transparent"
              style={{
                fontFamily: 'Poppins',
                fontWeight: 800,
                fontSize: 'clamp(2.75rem, 5.5vw, 5rem)',
                lineHeight: 1,
                backgroundImage: 'linear-gradient(153deg, #dbdbdb 10%, #946c32 130%)',
              }}
            >
              VISION
            </h2>
          </div>
        </div>

        <div className="space-y-[1.5rem]">
          <p
            className="text-justify"
            style={{
              fontFamily: 'Poppins',
              fontWeight: 400,
              fontSize: 'clamp(0.9375rem, 1.15vw, 1.25rem)',
              color: 'rgba(255,255,255,0.8)',
              lineHeight: 1.7,
            }}
          >
            Established in December 2019, Tiger Partners is one of the extremely vibrant, creative and
            inclusive law firms. As a boutique law firm focused on major and complex civil and commercial
            dispute resolution, we have deep legal expertise and extensive practical experience, as well as
            a distinctive commercial thinking, enabling us to provide our clients with professional legal
            services, precise business solutions and a great client experience.
          </p>
          <p
            className="text-justify"
            style={{
              fontFamily: 'Poppins',
              fontWeight: 400,
              fontSize: 'clamp(0.9375rem, 1.15vw, 1.25rem)',
              color: 'rgba(255,255,255,0.8)',
              lineHeight: 1.7,
            }}
          >
            We have a professional and excellent dispute resolution team. All of them are graduated from
            prestigious universities at home and abroad, and have extensive experience in arbitration
            institutions and courts at all levels. We have played an important role in many complex and
            difficult cases with wide influence, and have maintained an impressive success rate, making us
            the first choice of many leading Chinese enterprises and well-known multinational corporations
            in the field of dispute resolution services.
          </p>
        </div>

        <button className="mt-[2.5rem] group inline-flex flex-col items-start">
          <span style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '1.25rem', color: '#e1ab5c' }}>
            See More
          </span>
          <span className="block mt-[0.25rem] h-[2px] w-[7.125rem] bg-[#e1ab5c]" />
        </button>
      </div>
    </section>
  );
}
