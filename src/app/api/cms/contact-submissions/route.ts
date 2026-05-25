import { NextResponse } from "next/server";
import { requireCmsApiUser } from "@/lib/cms-api-auth";
import {
  deleteContactSubmission,
  listContactSubmissions,
  updateContactSubmissionStatus,
} from "@/lib/cms-db";
import type { CmsContactSubmissionStatus } from "@/lib/cms-types";

export const runtime = "nodejs";

function isSubmissionStatus(value: unknown): value is CmsContactSubmissionStatus {
  return value === "new" || value === "read" || value === "archived";
}

export async function GET() {
  const auth = await requireCmsApiUser();

  if (!auth.ok) {
    return auth.response;
  }

  return NextResponse.json({ submissions: listContactSubmissions(true) });
}

export async function PATCH(request: Request) {
  const auth = await requireCmsApiUser();

  if (!auth.ok) {
    return auth.response;
  }

  const payload = (await request.json()) as { id?: number; status?: unknown };

  if (!payload.id || !isSubmissionStatus(payload.status)) {
    return NextResponse.json({ message: "提交记录参数无效。" }, { status: 400 });
  }

  updateContactSubmissionStatus(payload.id, payload.status);

  return NextResponse.json({ ok: true, submissions: listContactSubmissions(true) });
}

export async function DELETE(request: Request) {
  const auth = await requireCmsApiUser();

  if (!auth.ok) {
    return auth.response;
  }

  const payload = (await request.json()) as { id?: number };

  if (!payload.id) {
    return NextResponse.json({ message: "缺少提交记录 ID。" }, { status: 400 });
  }

  deleteContactSubmission(payload.id);

  return NextResponse.json({ ok: true, submissions: listContactSubmissions(true) });
}
