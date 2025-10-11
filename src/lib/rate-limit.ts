import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export const contactRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "1 h"),
  analytics: true,
  prefix: "ratelimit:contact",
});

export const cvDownloadRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "1 h"),
  analytics: true,
  prefix: "ratelimit:cv",
});

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded
    ? forwarded.split(",")[0].trim()
    : request.headers.get("x-real-ip") || "unknown";
  return ip;
}

export async function getClientIpFromHeaders(): Promise<string> {
  const { headers } = await import("next/headers");
  const headersList = await headers();
  const forwarded = headersList.get("x-forwarded-for");
  return forwarded
    ? forwarded.split(",")[0].trim()
    : headersList.get("x-real-ip") || "unknown";
}
