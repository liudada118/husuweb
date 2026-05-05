import { ImageWithFallback } from "./figma/ImageWithFallback";

interface TeamCardProps {
  name: string;
  title: string;
  image: string;
}

export function TeamCard({ name, title, image }: TeamCardProps) {
  return (
    <div className="flex flex-col">
      <div className="relative w-full aspect-[745/392] overflow-hidden bg-[#9b9b9b]">
        <ImageWithFallback
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(60,60,60,0.6)] mix-blend-hard-light pointer-events-none" />
      </div>
      <div className="mt-[1.875rem] border-t border-[#a1a1a1] pt-[1.6875rem]">
        <h3
          className="text-white uppercase"
          style={{ fontSize: "3.4375rem", lineHeight: "1.1", letterSpacing: "-0.125rem", fontWeight: 600 }}
        >
          {name}
        </h3>
        <div className="mt-[1rem] flex items-end justify-between gap-[1rem] flex-wrap">
          <p
            className="text-[#979797] uppercase"
            style={{ fontSize: "1.75rem", lineHeight: "1.3", fontWeight: 500 }}
          >
            {title}
          </p>
          <a
            href="#"
            className="group inline-flex flex-col items-end text-[#d9b27a] no-underline shrink-0"
          >
            <span
              className="uppercase"
              style={{ fontSize: "1.75rem", lineHeight: "1.3", fontWeight: 500 }}
            >
              Find out more
            </span>
            <span className="block w-[12.25rem] h-[2px] bg-[#d9b27a] mt-[0.5rem]" />
          </a>
        </div>
      </div>
    </div>
  );
}
