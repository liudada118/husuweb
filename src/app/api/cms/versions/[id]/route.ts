import { NextResponse } from "next/server";
import { requireCmsApiUser } from "@/lib/cms-api-auth";
import { getVersionEditorData, listVersions, updateVersionPayload } from "@/lib/cms-db";
import type { CmsVersionPayload } from "@/lib/cms-types";

export const runtime = "nodejs";

function parseVersionId(id: string) {
  const versionId = Number(id);
  return Number.isFinite(versionId) && versionId > 0 ? versionId : null;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = await requireCmsApiUser();

  if (!auth.ok) {
    return auth.response;
  }

  const { id } = await params;
  const versionId = parseVersionId(id);

  if (!versionId) {
    return NextResponse.json({ message: "版本 ID 无效。" }, { status: 400 });
  }

  const data = getVersionEditorData(versionId);

  if (!data) {
    return NextResponse.json({ message: "版本不存在。" }, { status: 404 });
  }

  return NextResponse.json(data);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = await requireCmsApiUser();

  if (!auth.ok) {
    return auth.response;
  }

  const { id } = await params;
  const versionId = parseVersionId(id);

  if (!versionId) {
    return NextResponse.json({ message: "版本 ID 无效。" }, { status: 400 });
  }

  const payload = (await request.json()) as {
    payload?: CmsVersionPayload;
    name?: string;
    description?: string;
  };

  if (!payload.payload) {
    return NextResponse.json({ message: "版本内容不能为空。" }, { status: 400 });
  }

  updateVersionPayload({
    versionId,
    payload: payload.payload,
    name: payload.name,
    description: payload.description,
  });

  return NextResponse.json({ ok: true, versions: listVersions() });
}
