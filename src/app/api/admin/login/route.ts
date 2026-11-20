import { NextResponse } from "next/server";
import { STAFF_COOKIE, checkPassword, isConfigured, staffToken } from "@/lib/auth";

export async function POST(request: Request) {
  const form = await request.formData();
  const password = String(form.get("password") ?? "");
  const locale = form.get("locale") === "fa" ? "fa" : "en";
  const target = new URL(`/${locale}/admin`, request.url);

  if (!isConfigured()) {
    target.searchParams.set("error", "unconfigured");
    return NextResponse.redirect(target, 303);
  }

  if (!checkPassword(password)) {
    target.searchParams.set("error", "invalid");
    return NextResponse.redirect(target, 303);
  }

  const response = NextResponse.redirect(target, 303);
  response.cookies.set(STAFF_COOKIE, staffToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return response;
}
