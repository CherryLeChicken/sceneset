import { headers } from "next/headers";
import { Webhook } from "svix";

import { db } from "@/db";
import { users } from "@/db/schema";
import { getEnv } from "@/env";

type ClerkUserEvent = {
  type: "user.created" | "user.updated";
  data: {
    id: string;
    email_addresses: Array<{
      email_address: string;
      id: string;
    }>;
    primary_email_address_id: string | null;
    first_name: string | null;
    last_name: string | null;
    image_url: string | null;
  };
};

export async function POST(request: Request) {
  const payload = await request.text();
  const headerList = await headers();
  const svixId = headerList.get("svix-id");
  const svixTimestamp = headerList.get("svix-timestamp");
  const svixSignature = headerList.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return Response.json(
      { error: "Missing Clerk webhook signature headers" },
      { status: 400 },
    );
  }

  let event: ClerkUserEvent;
  try {
    const webhook = new Webhook(getEnv().CLERK_WEBHOOK_SECRET);
    webhook.verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    });
    event = JSON.parse(payload) as ClerkUserEvent;
  } catch {
    return Response.json({ error: "Invalid Clerk webhook signature" }, { status: 400 });
  }

  if (event.type !== "user.created" && event.type !== "user.updated") {
    return Response.json({ received: true, ignored: true });
  }

  const { data } = event;
  const primaryEmail = data.email_addresses.find(
    (email) => email.id === data.primary_email_address_id,
  )?.email_address;

  if (!primaryEmail) {
    return Response.json(
      { error: "Clerk user has no primary email address" },
      { status: 422 },
    );
  }

  const fullName = [data.first_name, data.last_name].filter(Boolean).join(" ") || null;

  await db
    .insert(users)
    .values({
      clerkId: data.id,
      email: primaryEmail,
      fullName,
      avatarUrl: data.image_url,
    })
    .onConflictDoUpdate({
      target: users.clerkId,
      set: {
        email: primaryEmail,
        fullName,
        avatarUrl: data.image_url,
        updatedAt: new Date(),
      },
    });

  return Response.json({ received: true });
}
