import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { requireCmsApiUser } from "@/lib/cms-api-auth";
import { deleteCollectionItem, listCollectionItems, saveCollectionItem } from "@/lib/cms-db";

export const runtime = "nodejs";

type ApiCollection = "articles" | "caseStudies" | "mediaItems" | "podcastEpisodes";

function normalizeCollectionName(value: string): ApiCollection | null {
  if (value === "articles") return "articles";
  if (value === "case-studies") return "caseStudies";
  if (value === "media-items") return "mediaItems";
  if (value === "podcast-episodes") return "podcastEpisodes";
  return null;
}

function revalidateContentPages() {
  revalidatePath("/");
  revalidatePath("/cases");
  revalidatePath("/media");
  revalidatePath("/podcast");
  revalidatePath("/insights");
  revalidatePath("/cms");
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ collection: string }> },
) {
  const auth = await requireCmsApiUser();

  if (!auth.ok) {
    return auth.response;
  }

  const collection = normalizeCollectionName((await params).collection);

  if (!collection) {
    return NextResponse.json({ message: "未知内容集合。" }, { status: 404 });
  }

  const payload = (await request.json()) as Record<string, unknown>;
  saveCollectionItem(collection, payload);
  revalidateContentPages();

  return NextResponse.json({ ok: true, items: listCollectionItems(collection) });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ collection: string }> },
) {
  const auth = await requireCmsApiUser();

  if (!auth.ok) {
    return auth.response;
  }

  const collection = normalizeCollectionName((await params).collection);

  if (!collection) {
    return NextResponse.json({ message: "未知内容集合。" }, { status: 404 });
  }

  const payload = (await request.json()) as { id?: number };

  if (!payload.id) {
    return NextResponse.json({ message: "缺少内容 ID。" }, { status: 400 });
  }

  deleteCollectionItem(collection, payload.id);
  revalidateContentPages();

  return NextResponse.json({ ok: true, items: listCollectionItems(collection) });
}
