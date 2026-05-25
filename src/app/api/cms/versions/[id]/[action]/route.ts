import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { requireCmsApiUser } from "@/lib/cms-api-auth";
import { listVersions, publishVersion, restoreVersion } from "@/lib/cms-db";

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

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string; action: string }> },
) {
  const auth = await requireCmsApiUser();

  if (!auth.ok) {
    return auth.response;
  }

  const { id, action } = await params;
  const versionId = Number(id);

  if (!Number.isFinite(versionId)) {
    return NextResponse.json({ message: "版本 ID 无效。" }, { status: 400 });
  }

  if (action === "restore") {
    restoreVersion(versionId, auth.user.id);
  } else if (action === "publish") {
    publishVersion(versionId, auth.user.id);
  } else {
    return NextResponse.json({ message: "未知操作。" }, { status: 404 });
  }

  revalidateOfficialPages();

  return NextResponse.json(
    { ok: true, versions: listVersions() },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    },
  );
}
