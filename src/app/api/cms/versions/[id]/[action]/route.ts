import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { requireCmsApiUser } from "@/lib/cms-api-auth";
import { listVersions, publishVersion, restoreVersion } from "@/lib/cms-db";

export const runtime = "nodejs";

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

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/cases");
  revalidatePath("/media");
  revalidatePath("/podcast");
  revalidatePath("/insights");
  revalidatePath("/cms");

  return NextResponse.json({ ok: true, versions: listVersions() });
}
