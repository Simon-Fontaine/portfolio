import { readFile } from "node:fs/promises";
import path from "node:path";
import { locales } from "@/i18n/generated/locales";
import { cvFileName } from "@/lib/constants";

export const runtime = "nodejs";
type Context = { params: Promise<{ locale: string }> };
async function download({ params }: Context, head = false) {
  const { locale } = await params;
  const robots = { "X-Robots-Tag": "noindex, nofollow, nosnippet" };
  if (!locales.includes(locale))
    return new Response(null, { status: 404, headers: robots });
  const filename = cvFileName(locale);
  let bytes: Buffer;
  try {
    bytes = await readFile(path.join(process.cwd(), "documents", filename));
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT")
      return new Response(null, { status: 404, headers: robots });
    throw error;
  }
  return new Response(head ? null : new Uint8Array(bytes), {
    headers: {
      ...robots,
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Content-Length": String(bytes.length),
      "Cache-Control": "public, max-age=0, must-revalidate",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
export async function GET(_request: Request, context: Context) {
  return download(context);
}
export async function HEAD(_request: Request, context: Context) {
  return download(context, true);
}
