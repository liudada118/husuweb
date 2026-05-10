const assetBaseUrl = process.env.NEXT_PUBLIC_ASSET_BASE_URL?.replace(/\/+$/, "") ?? "";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function isExternalUrl(src: string) {
  return /^(?:[a-z][a-z0-9+.-]*:)?\/\//i.test(src) || src.startsWith("data:") || src.startsWith("blob:");
}

export function assetUrl(src: string) {
  if (!src || isExternalUrl(src)) return src;

  if (assetBaseUrl && (src.startsWith("/assets/") || src.startsWith("/font/"))) {
    return `${assetBaseUrl}${src}`;
  }

  if (basePath && (src.startsWith("/assets/") || src.startsWith("/font/") || src.startsWith("/uploads/"))) {
    return `${basePath}${src}`;
  }

  return src;
}
