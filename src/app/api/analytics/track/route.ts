import { NextResponse } from "next/server";
import { recordPublicVisit } from "@/lib/cms-analytics";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as { path?: string };

    if (payload.path) {
      recordPublicVisit({
        path: payload.path,
        userAgent: request.headers.get("user-agent") ?? "",
      });
    }
  } catch {
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: true });
}
