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

const environmentValues = {
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
};

export type Env = z.infer<typeof envSchema>;

/** Validate the complete application configuration when a full startup check is needed. */
export function getEnv(): Env {
  return envSchema.parse(environmentValues);
}

export function getDatabaseEnv() {
  return envSchema.pick({ DATABASE_URL: true }).parse(environmentValues);
}

export function getClerkWebhookEnv() {
  return envSchema.pick({ CLERK_WEBHOOK_SECRET: true }).parse(environmentValues);
}

export function getImageKitEnv() {
  return envSchema
    .pick({
      NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY: true,
      IMAGEKIT_PRIVATE_KEY: true,
      NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT: true,
    })
    .parse(environmentValues);
}
