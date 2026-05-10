import { NextResponse } from "next/server";
import { verifyPassword } from "@/lib/cms-auth";
import { requireCmsApiUser } from "@/lib/cms-api-auth";
import { findUserByUsername, updateUserPassword } from "@/lib/cms-db";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const auth = await requireCmsApiUser();

  if (!auth.ok) {
    return auth.response;
  }

  const payload = (await request.json()) as {
    currentPassword?: string;
    newPassword?: string;
  };
  const currentPassword = payload.currentPassword?.trim() ?? "";
  const newPassword = payload.newPassword ?? "";

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ message: "当前密码和新密码不能为空。" }, { status: 400 });
  }

  if (newPassword.length < 8) {
    return NextResponse.json({ message: "新密码至少需要 8 位。" }, { status: 400 });
  }

  const user = findUserByUsername(auth.user.username);

  if (!user || !verifyPassword(currentPassword, user.password_hash)) {
    return NextResponse.json({ message: "当前密码不正确。" }, { status: 400 });
  }

  updateUserPassword(auth.user.id, newPassword);

  return NextResponse.json({ ok: true });
}
