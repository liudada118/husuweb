import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { requireCmsApiUser } from "@/lib/cms-api-auth";
import { createVersion, listVersions } from "@/lib/cms-db";

export const runtime = "nodejs";

export async function GET() {
  const auth = await requireCmsApiUser();

  if (!auth.ok) {
    return auth.response;
  }

  return NextResponse.json({ versions: listVersions() });
}

export async function POST(request: Request) {
  const auth = await requireCmsApiUser();

  if (!auth.ok) {
    return auth.response;
  }

  const payload = (await request.json()) as { name?: string; description?: string; sourceVersionId?: number | null };

  if (!payload.name) {
    return NextResponse.json({ message: "版本名称不能为空。" }, { status: 400 });
  }

  createVersion({
    name: payload.name,
    description: payload.description ?? "",
    sourceVersionId:
      typeof payload.sourceVersionId === "number" && Number.isFinite(payload.sourceVersionId)
        ? payload.sourceVersionId
        : null,
    createdBy: auth.user.id,
  });

  revalidatePath("/cms");
  return NextResponse.json({ ok: true, versions: listVersions() });
}
