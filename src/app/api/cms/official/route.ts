import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { requireCmsApiUser } from "@/lib/cms-api-auth";
import { getCmsSiteState, saveCmsSiteState } from "@/lib/cms-store";
import type { OfficialCmsSiteState } from "@/cms/official-state";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function revalidateOfficialPages() {
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/about/core-value");
  revalidatePath("/events");
  revalidatePath("/events/[slug]", "page");
  revalidatePath("/industries");
  revalidatePath("/industries/[slug]", "page");
  revalidatePath("/team");
  revalidatePath("/team/[slug]", "page");
  revalidatePath("/contact");
  revalidatePath("/api/cms/public");
  revalidatePath("/cms");
}

export async function GET() {
  const auth = await requireCmsApiUser();

  if (!auth.ok) {
    return auth.response;
  }

  return NextResponse.json(
    { state: await getCmsSiteState() },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    },
  );
}

export async function PUT(request: Request) {
  const auth = await requireCmsApiUser();

  if (!auth.ok) {
    return auth.response;
  }

  const payload = (await request.json()) as { state?: OfficialCmsSiteState };

  if (!payload.state) {
    return NextResponse.json({ message: "Invalid official site state." }, { status: 400 });
  }

  const state = await saveCmsSiteState(payload.state);
  revalidateOfficialPages();

  return NextResponse.json({ ok: true, state });
}
