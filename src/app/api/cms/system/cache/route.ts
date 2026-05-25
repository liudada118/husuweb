import { NextResponse } from "next/server";
import { requireCmsApiUser } from "@/lib/cms-api-auth";
import { clearCmsCaches } from "@/lib/cms-dashboard";

export const runtime = "nodejs";

export async function POST() {
  const auth = await requireCmsApiUser();

  if (!auth.ok) {
    return auth.response;
  }

  const result = clearCmsCaches();

  return NextResponse.json({
    ok: true,
    clearedBytes: result.clearedBytes,
    dashboard: result.dashboard,
  });
}
