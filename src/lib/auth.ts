import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const STAFF_COOKIE = "isb_staff";

function secret(): string {
  return process.env.ADMIN_PASSWORD || "";
}

export function isConfigured(): boolean {
  return secret().length > 0;
}

function tokenFor(password: string): string {
  return createHmac("sha256", password).update("isb-staff-v1").digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function checkPassword(input: string): boolean {
  const current = secret();
  if (!current) return false;
  return safeEqual(tokenFor(current), tokenFor(input));
}

export function staffToken(): string {
  return tokenFor(secret());
}

export async function isStaff(): Promise<boolean> {
  if (!isConfigured()) return false;
  const store = await cookies();
  const value = store.get(STAFF_COOKIE)?.value;
  if (!value) return false;
  return safeEqual(value, staffToken());
}
