import { NextResponse } from "next/server";
import { destroyCmsSession } from "@/lib/cms-session";

export const runtime = "nodejs";

export async function POST() {
  await destroyCmsSession();
  return NextResponse.json({ ok: true });
}
