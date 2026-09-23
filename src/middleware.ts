import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { locales } from "./i18n/generated/locales";
import { routing } from "./i18n/routing";

const handleLocale = createMiddleware(routing);
export default function middleware(request: NextRequest) {
  const saved = request.cookies.get("NEXT_LOCALE")?.value;
  if (request.nextUrl.pathname === "/" && saved && locales.includes(saved)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${saved}`;
    return NextResponse.redirect(url);
  }
  return handleLocale(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
