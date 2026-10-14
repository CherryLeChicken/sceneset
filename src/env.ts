import { z } from "zod";

const requiredSecret = z.string().min(1, "Value is required");

export const envSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url("Must be a valid URL"),
  DATABASE_URL: z.string().url("Must be a valid database URL"),

  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: requiredSecret,
  CLERK_SECRET_KEY: requiredSecret,
  CLERK_WEBHOOK_SECRET: requiredSecret,

  STRIPE_SECRET_KEY: requiredSecret,
  STRIPE_WEBHOOK_SECRET: requiredSecret,
  NEXT_PUBLIC_STRIPE_PRICE_ID_PRO: requiredSecret,

  NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY: requiredSecret,
  IMAGEKIT_PRIVATE_KEY: requiredSecret,
  NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT: z.string().url("Must be a valid URL"),

  GEMINI_API_KEY: requiredSecret,
});

export type Env = z.infer<typeof envSchema>;

/**
 * Validate only when server code needs configuration. This keeps private
 * credentials out of container build-time requirements while still failing
 * fast at the first runtime request that depends on them.
 */
export function getEnv(): Env {
  return envSchema.parse({
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    CLERK_WEBHOOK_SECRET: process.env.CLERK_WEBHOOK_SECRET,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    NEXT_PUBLIC_STRIPE_PRICE_ID_PRO: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO,
    NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
    IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY,
    NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  });
}
