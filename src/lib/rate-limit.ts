// src/lib/rate-limit.ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { auth } from "@clerk/nextjs/server";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Define the limiters with clear prefixes for isolation
export const limiters = {
  createCompanion: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, "5 m"), // 3 per 5 minutes
    prefix: "ratelimit:createCompanion",
  }),
  addSession: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, "1 m"), // 10 per minute
    prefix: "ratelimit:addSession",
  }),
  read: new Ratelimit({
    redis,
    limiter: Ratelimit.fixedWindow(60, "1 m"), // 60 per minute
    prefix: "ratelimit:read",
  }),
};

export type RateLimitAction = keyof typeof limiters;

export async function checkRateLimit(action: RateLimitAction) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthenticated");

  const limiter = limiters[action];
  const { success, limit, reset, remaining } = await limiter.limit(userId);

  if (!success) {
    throw new Error(
      `Rate limit exceeded. Limit: ${limit}, Retry after ${new Date(reset).toISOString()}`,
    );
  }
  return { success, remaining };
}

// Higher-order function to wrap read operations cleanly
export function withRateLimit<T extends (...args: any[]) => Promise<any>>(
  action: RateLimitAction,
  fn: T,
): T {
  return (async (...args: Parameters<T>) => {
    await checkRateLimit(action);
    return fn(...args);
  }) as T;
}
