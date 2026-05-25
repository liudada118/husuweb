import { createHash, randomBytes, scryptSync, timingSafeEqual } from "crypto";

const SESSION_BYTE_LENGTH = 32;

export function hashPassword(password: string, salt = randomBytes(16).toString("hex")) {
  const derived = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${derived}`;
}

export function verifyPassword(password: string, storedHash: string) {
  const [salt, derived] = storedHash.split(":");

  if (!salt || !derived) {
    return false;
  }

  const candidate = scryptSync(password, salt, 64);
  const expected = Buffer.from(derived, "hex");

  if (candidate.length !== expected.length) {
    return false;
  }

  return timingSafeEqual(candidate, expected);
}

export function createSessionToken() {
  return randomBytes(SESSION_BYTE_LENGTH).toString("hex");
}

export function hashSessionToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}
