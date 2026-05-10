import { NextResponse } from "next/server";
import { getCmsSessionUser } from "./cms-session";
import type { CmsRole } from "./cms-types";

export async function requireCmsApiUser(role?: CmsRole) {
  const user = await getCmsSessionUser();

  if (!user) {
    return {
      ok: false as const,
      response: NextResponse.json({ message: "未登录或会话已失效。" }, { status: 401 }),
    };
  }

  if (role && user.role !== role && user.role !== "admin") {
    return {
      ok: false as const,
      response: NextResponse.json({ message: "没有权限执行此操作。" }, { status: 403 }),
    };
  }

  return {
    ok: true as const,
    user,
  };
}
