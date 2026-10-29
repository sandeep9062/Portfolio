import { headers } from "next/headers";
import RateLimit from "@/models/RateLimit";

const RATE_LIMIT_WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS) || 60_000; // 1 minute
const RATE_LIMIT_MAX = Number(process.env.RATE_LIMIT_MAX) || 5; // submissions / window / IP

export { RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX };

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetMs?: number;
  error?: string;
}

/**
 * Best-effort extraction of the visitor's IP address from the request
 * headers. Behind Vercel / a CDN the original client IP arrives as the first
 * entry in the `x-forwarded-for` chain.
 */
export async function getClientIP(): Promise<string> {
  const headersList = await headers();
  const forwardedFor = headersList.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  const realIp = headersList.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  return "unknown";
}

/**
 * Sliding-window rate limiter backed by MongoDB.
 *
 * Counts submissions from the given IP within the last `RATE_LIMIT_WINDOW_MS`.
 * If the IP has already submitted `RATE_LIMIT_MAX` times in the window it is
 * rejected; otherwise a new record is created and the attempt is allowed.
 */
export async function checkRateLimit(ip: string): Promise<RateLimitResult> {
  const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MS);

  const count = await RateLimit.countDocuments({
    ip,
    createdAt: { $gte: windowStart },
  });

  if (count >= RATE_LIMIT_MAX) {
    const resetMs = Math.max(
      RATE_LIMIT_WINDOW_MS - (Date.now() - windowStart.getTime()),
      0,
    );
    return {
      allowed: false,
      remaining: 0,
      resetMs,
      error: `You've sent too many messages. Please wait ${Math.ceil(resetMs / 1000)} seconds before trying again.`,
    };
  }

  await RateLimit.create({ ip });

  return {
    allowed: true,
    remaining: RATE_LIMIT_MAX - count - 1,
  };
}
