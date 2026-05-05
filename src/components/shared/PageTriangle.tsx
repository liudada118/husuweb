import type { CSSProperties } from "react";

export function PageTriangle({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute z-0 bg-[#1d1d1d] ${className}`}
      style={{
        clipPath: "polygon(100% 0, 100% 100%, 40% 100%)",
        ...style,
      }}
    />
  );
}
