import { head } from "@vercel/blob";
import { NextResponse } from "next/server";
import { cvDownloadRateLimit, getClientIp } from "@/lib/rate-limit";

const CV_BLOB_URL = process.env.BLOB_CV_URL;

export async function GET(request: Request) {
  try {
    const ip = getClientIp(request);
    const { success, limit, remaining, reset } =
      await cvDownloadRateLimit.limit(ip);

    if (!success) {
      const minutesUntilReset = Math.ceil((reset - Date.now()) / 1000 / 60);
      const retryAfter = Math.ceil((reset - Date.now()) / 1000);

      return NextResponse.json(
        {
          error: `Trop de tentatives. Veuillez réessayer dans ${minutesUntilReset} minute${minutesUntilReset > 1 ? "s" : ""}.`,
        },
        {
          status: 429,
          headers: {
            "Retry-After": retryAfter.toString(),
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": new Date(reset).toISOString(),
          },
        },
      );
    }

    if (!CV_BLOB_URL) {
      console.error("BLOB_CV_URL environment variable is not set");
      return NextResponse.json(
        {
          error: "Configuration du CV manquante.",
        },
        {
          status: 500,
        },
      );
    }

    const blobInfo = await head(CV_BLOB_URL);
    const response = await fetch(CV_BLOB_URL);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch CV from blob storage: ${response.statusText}`,
      );
    }

    const cvBuffer = await response.arrayBuffer();

    return new NextResponse(cvBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=CV_Simon_Fontaine.pdf",
        "Content-Length": blobInfo.size.toString(),
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
        "Cache-Control": "private, no-cache, no-store, must-revalidate",
        "X-RateLimit-Limit": limit.toString(),
        "X-RateLimit-Remaining": remaining.toString(),
      },
    });
  } catch (error) {
    console.error("Failed to serve CV:", error);
    return NextResponse.json(
      {
        error: "Erreur lors du chargement du CV. Veuillez réessayer.",
      },
      {
        status: 500,
      },
    );
  }
}
