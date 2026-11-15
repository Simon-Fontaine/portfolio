import { type NextRequest, NextResponse } from "next/server";
import { negotiateLocale } from "@/i18n/config";

/**
 * "/" redirects to "/fr" or "/en" based on the browser's Accept-Language
 * header. Every other URL already contains its language.
 */
export function proxy(request: NextRequest) {
  const locale = negotiateLocale(request.headers.get("accept-language"));
  const response = NextResponse.redirect(new URL(`/${locale}`, request.url));
  response.headers.set("Vary", "Accept-Language");
  return response;
}

export const config = { matcher: "/" };
