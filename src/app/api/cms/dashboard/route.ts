import { NextResponse } from "next/server";
import { requireCmsApiUser } from "@/lib/cms-api-auth";
import { getCmsDashboardMetrics } from "@/lib/cms-dashboard";

export const runtime = "nodejs";

export async function GET() {
  const auth = await requireCmsApiUser();

  if (!auth.ok) {
    return auth.response;
  }

  return NextResponse.json({ dashboard: getCmsDashboardMetrics() });
}
