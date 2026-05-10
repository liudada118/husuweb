import type { CSSProperties } from "react";
import { resolvePublicAssetUrl } from "@/lib/public-assets";

export const landingHeroShellClassName = "mx-auto w-full px-[var(--landing-shell-8)]";

export const landingTitleShellClassName = "mx-auto w-full px-[var(--landing-shell-75)]";

export const landingCarouselShellClassName = "mx-auto w-full px-[var(--landing-shell-5)]";

export const landingContentShellClassName = "mx-auto w-full px-[var(--landing-shell-8)]";

export const landingFooterShellClassName = "mx-auto w-full px-[var(--landing-shell-11)]";

export const landingNavItems = [
  { href: "/about", labels: { en: "ABOUT", zh: "\u5173\u4e8e" } },
  { href: "/awards", labels: { en: "AWARDS", zh: "\u5956\u9879" } },
  { href: "/event", labels: { en: "EVENT", zh: "\u6d3b\u52a8" } },
  { href: "/media", labels: { en: "MEDIA", zh: "\u5a92\u4f53" } },
  { href: "/podcast", labels: { en: "PODCAST", zh: "\u64ad\u5ba2" } },
  { href: "/contact", labels: { en: "CONTACT", zh: "\u8054\u7cfb\u65b9\u5f0f" } },
];

export const landingSocialItems = [
  {
    href: "https://b23.tv/mbZEgBg",
    label: "Bilibili",
    iconSrc: "/assets/bilibili.svg",
  },
  {
    href: "https://xhslink.com/m/EgtHVE7Wxj",
    label: "Xiaohongshu",
    iconSrc: "/assets/xiaohongshu.svg",
  },
  {
    href: "https://www.linkedin.com/in/yuxuan-liu-a7636a44?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    label: "LinkedIn",
    iconSrc: "/assets/linkedin.svg",
  },
];

export const officialSiteHref = "https://www.tigerpartners.cn/en/#/home";

export function imageSrc(asset: string | { src: string }): string {
  return resolvePublicAssetUrl(typeof asset === "string" ? asset : asset.src);
}

export function publicAssetSrc(
  path: string,
  deployedAsset?: string | { src: string },
): string {
  const embeddedHttpsUrl = path.match(/^https?:\/\/[^/]+\/(https?:\/.+)$/i);
  const rawPath = embeddedHttpsUrl ? embeddedHttpsUrl[1] : path;
  const normalizedExternalPath = rawPath
    .replace(/^https:\/(?!\/)/i, "https://")
    .replace(/^http:\/(?!\/)/i, "http://");

  if (/^https?:\/\//i.test(normalizedExternalPath) || normalizedExternalPath.startsWith("//")) {
    return resolvePublicAssetUrl(normalizedExternalPath);
  }

  const normalizedPath = normalizedExternalPath.startsWith("/") ? normalizedExternalPath : `/${normalizedExternalPath}`;
  const resolvedPublicPath = resolvePublicAssetUrl(normalizedPath);

  if (resolvedPublicPath !== normalizedPath) {
    return resolvedPublicPath;
  }

  if (!deployedAsset) {
    return normalizedPath;
  }

  const resolvedAsset = imageSrc(deployedAsset);
  const nextAssetMarker = "/_next/";
  const markerIndex = resolvedAsset.indexOf(nextAssetMarker);

  if (markerIndex <= 0) {
    return normalizedPath;
  }

  return `${resolvedAsset.slice(0, markerIndex)}${normalizedPath}`;
}

function pxToRemNumber(value: number) {
  return (value / 16).toFixed(4);
}

export function landingDesktopFluidTypeStyle(sizeAt1440: number, sizeAt1980: number): CSSProperties {
  return {
    "--landing-fluid-min": `${pxToRemNumber(sizeAt1440)}rem`,
    "--landing-fluid-min-number": pxToRemNumber(sizeAt1440),
    "--landing-fluid-max": `${pxToRemNumber(sizeAt1980)}rem`,
    "--landing-fluid-max-number": pxToRemNumber(sizeAt1980),
  } as CSSProperties;
}
