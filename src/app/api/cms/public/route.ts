import { NextResponse } from "next/server";
import { getPublicCmsState } from "@/lib/cms-store";

export async function GET() {
  const state = await getPublicCmsState();
  return NextResponse.json({ state });
}
