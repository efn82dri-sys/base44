import { NextResponse } from "next/server";
import { STAFF_COOKIE } from "@/lib/auth";

export async function POST(request: Request) {
  const form = await request.formData();
  const locale = form.get("locale") === "fa" ? "fa" : "en";
  const response = NextResponse.redirect(new URL(`/${locale}/admin`, request.url), 303);
  response.cookies.set(STAFF_COOKIE, "", { path: "/", maxAge: 0 });
  return response;
}
