import { NextResponse, type NextRequest } from "next/server";

const LOCALE_COOKIE = "isb_locale";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    const stored = request.cookies.get(LOCALE_COOKIE)?.value;
    const locale = stored === "fa" ? "fa" : "en";
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
