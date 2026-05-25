import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSessionToken, hashSessionToken, verifyPassword } from "./cms-auth";
import {
  cleanupExpiredSessions,
  createSession,
  deleteSessionByTokenHash,
  findSessionByTokenHash,
  findUserByUsername,
} from "./cms-db";
import type { CmsRole, CmsUser } from "./cms-types";

export const CMS_SESSION_COOKIE = "cms_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 14;

function getSessionExpiryDate() {
  return new Date(Date.now() + SESSION_MAX_AGE_SECONDS * 1000);
}

function shouldUseSecureCmsCookie() {
  const explicitValue = process.env.CMS_COOKIE_SECURE?.trim().toLowerCase();

  if (explicitValue) {
    return ["1", "true", "yes", "on"].includes(explicitValue);
  }

  return process.env.NODE_ENV === "production";
}

export async function createCmsSession(username: string, password: string) {
  cleanupExpiredSessions();
  const user = findUserByUsername(username);

  if (!user || !verifyPassword(password, user.password_hash)) {
    return null;
  }

  const token = createSessionToken();
  const tokenHash = hashSessionToken(token);
  const expiresAt = getSessionExpiryDate();

  createSession({
    userId: user.id,
    tokenHash,
    expiresAt: expiresAt.toISOString(),
  });

  const cookieStore = await cookies();
  cookieStore.set(CMS_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: shouldUseSecureCmsCookie(),
    path: "/",
    expires: expiresAt,
  });

  return {
    id: user.id,
    username: user.username,
    role: user.role,
    forcePasswordReset: Boolean(user.force_password_reset),
    createdAt: user.created_at,
    updatedAt: user.updated_at,
  } satisfies CmsUser;
}

export async function destroyCmsSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(CMS_SESSION_COOKIE)?.value;

  if (token) {
    deleteSessionByTokenHash(hashSessionToken(token));
  }

  cookieStore.delete(CMS_SESSION_COOKIE);
}

export async function getCmsSessionUser() {
  cleanupExpiredSessions();
  const cookieStore = await cookies();
  const token = cookieStore.get(CMS_SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  const session = findSessionByTokenHash(hashSessionToken(token));

  if (!session) {
    return null;
  }

  if (new Date(session.expires_at).getTime() <= Date.now()) {
    deleteSessionByTokenHash(hashSessionToken(token));
    return null;
  }

  return {
    id: session.user_id,
    username: session.username,
    role: session.role,
    forcePasswordReset: Boolean(session.force_password_reset),
    createdAt: session.created_at,
    updatedAt: session.updated_at,
  } satisfies CmsUser;
}

export async function requireCmsUser(role?: CmsRole) {
  const user = await getCmsSessionUser();

  if (!user) {
    redirect("/cms/login");
  }

  if (role && user.role !== role && user.role !== "admin") {
    redirect("/cms/login");
  }

  return user;
}
