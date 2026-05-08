"use client";

import { useState, type ImgHTMLAttributes } from "react";

const ERROR_IMG_SRC =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function resolveAssetSrc(src: ImgHTMLAttributes<HTMLImageElement>["src"]) {
  if (typeof src !== "string" || !basePath || !src.startsWith("/assets/")) {
    return src;
  }

  return `${basePath}${src}`;
}

export function ImageWithFallback({
  src,
  alt,
  className,
  ...rest
}: ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false);
  const resolvedSrc = resolveAssetSrc(src);

  if (didError) {
    return (
      <div className={`inline-block bg-gray-100 text-center align-middle ${className ?? ""}`}>
        <div className="flex size-full items-center justify-center">
          <img src={ERROR_IMG_SRC} alt="Error loading image" data-original-url={src} {...rest} />
        </div>
      </div>
    );
  }

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      className={className}
      {...rest}
      onError={() => setDidError(true)}
    />
  );
}
