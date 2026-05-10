import { NextResponse } from "next/server";
import { createCmsSession } from "@/lib/cms-session";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const payload = (await request.json()) as { username?: string; password?: string };

  if (!payload.username || !payload.password) {
    return NextResponse.json({ message: "用户名和密码不能为空。" }, { status: 400 });
  }

  const user = await createCmsSession(payload.username, payload.password);

  if (!user) {
    return NextResponse.json({ message: "用户名或密码错误。" }, { status: 401 });
  }

  return NextResponse.json({ ok: true, user });
}
