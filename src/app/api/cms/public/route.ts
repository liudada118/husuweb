import { NextResponse } from "next/server";
import { getPublicCmsState } from "@/lib/cms-store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const state = await getPublicCmsState();
  return NextResponse.json(
    { state },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    },
  );
}
