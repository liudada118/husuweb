import { NextResponse } from "next/server";
import { createContactSubmission } from "@/lib/cms-db";
import type { Language } from "@/lib/site-types";

export const runtime = "nodejs";

const maxTextLength = 2000;

function readString(value: unknown, maxLength = maxTextLength) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? "";
  }

  return request.headers.get("x-real-ip") ?? "";
}

export async function POST(request: Request) {
  let payload: Record<string, unknown>;

  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ message: "请求数据格式无效。" }, { status: 400 });
  }

  const honeypot = readString(payload.website, 200);

  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  const name = readString(payload.name, 200);
  const contactInfo = readString(payload.contactInfo, 300);
  const organization = readString(payload.organization, 300);
  const position = readString(payload.position, 200);
  const subject = readString(payload.subject, 300);
  const message = readString(payload.message, maxTextLength);
  const language: Language = payload.language === "en" ? "en" : "zh";
  const pagePath = readString(payload.pagePath, 300) || "/contact";

  if (!name) {
    return NextResponse.json({ message: "请填写姓名。" }, { status: 400 });
  }

  if (!contactInfo) {
    return NextResponse.json({ message: "请填写联系方式。" }, { status: 400 });
  }

  if (!message) {
    return NextResponse.json({ message: "请填写留言内容。" }, { status: 400 });
  }

  createContactSubmission({
    name,
    contactInfo,
    organization,
    position,
    subject,
    message,
    language,
    pagePath,
    userAgent: request.headers.get("user-agent") ?? "",
    ipAddress: getClientIp(request),
  });

  return NextResponse.json({ ok: true });
}
