import { NextResponse } from "next/server";

import { resolveNextStaticMediaAssetUrl } from "@/lib/public-assets";

export const runtime = "nodejs";

export function GET(request: Request) {
  const url = new URL(request.url);
  const path = url.searchParams.get("path") ?? request.headers.get("x-original-uri") ?? "";
  const targetUrl = resolveNextStaticMediaAssetUrl(path);

  if (!targetUrl) {
    return NextResponse.json({ message: "Asset is not mapped to OSS" }, { status: 404 });
  }

  return NextResponse.redirect(targetUrl, 302);
}
