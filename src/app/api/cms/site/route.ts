import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { requireCmsApiUser } from "@/lib/cms-api-auth";
import { getSiteState } from "@/lib/cms-db";
import { saveSiteContent } from "@/lib/site-content";
import type { SiteContent } from "@/app/translations/translations";
import type { PageContentState } from "@/lib/cms-page-content";
import type { VisualEditorState } from "@/lib/cms-types";

export const runtime = "nodejs";

function revalidateCmsPages() {
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/awards");
  revalidatePath("/cases");
  revalidatePath("/event");
  revalidatePath("/media");
  revalidatePath("/podcast");
  revalidatePath("/contact");
  revalidatePath("/insights");
  revalidatePath("/cms");
}

export async function GET() {
  const auth = await requireCmsApiUser();

  if (!auth.ok) {
    return auth.response;
  }

  return NextResponse.json(getSiteState());
}

export async function PUT(request: Request) {
  const auth = await requireCmsApiUser();

  if (!auth.ok) {
    return auth.response;
  }

  const payload = (await request.json()) as {
    siteContent?: SiteContent;
    visualEditor?: VisualEditorState;
    pageContent?: PageContentState;
  };

  if (!payload.siteContent || !payload.visualEditor || !payload.pageContent) {
    return NextResponse.json({ message: "站点数据无效。" }, { status: 400 });
  }

  await saveSiteContent({
    siteContent: payload.siteContent,
    visualEditor: payload.visualEditor,
    pageContent: payload.pageContent,
    updatedBy: auth.user.id,
  });

  revalidateCmsPages();

  return NextResponse.json({
    ok: true,
    updatedAt: new Date().toISOString(),
  });
}
