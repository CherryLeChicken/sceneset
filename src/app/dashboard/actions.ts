"use server";

import { auth } from "@clerk/nextjs/server";
import { and, desc, eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { events, users, workspaces } from "@/db/schema";

const moneySchema = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
  z.coerce.number().finite().min(0).max(9999999999.99),
);

const optionalUrlSchema = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
  z.string().trim().url().max(2048).optional(),
);

const eventInputSchema = z
  .object({
    title: z.string().trim().min(1, "Event title is required").max(255),
    description: z.string().trim().max(5000).optional(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    venue: z.string().trim().min(1, "Venue is required").max(255),
    budgetCap: moneySchema,
    bannerUrl: optionalUrlSchema,
  })
  .superRefine((value, context) => {
    if (value.endDate <= value.startDate) {
      context.addIssue({
        code: "custom",
        path: ["endDate"],
        message: "End date must be after the start date",
      });
    }
  });

const eventIdSchema = z.string().uuid("A valid event ID is required");

type FieldErrors = Record<string, string[]>;

export type SerializedEvent = {
  id: string;
  title: string;
  description: string;
  date: string;
  endDate: string;
  venue: string;
  budget: number;
  bannerUrl: string;
  progress: number;
  readiness: string;
  status: string;
  persisted: true;
};

type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; fieldErrors?: FieldErrors };

function validationResult(error: z.ZodError): ActionResult<never> {
  return {
    ok: false,
    error: "Please correct the highlighted event details.",
    fieldErrors: error.flatten().fieldErrors,
  };
}

async function getCurrentUser() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Authentication required");
  }

  const matchingUsers = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.clerkId, userId))
    .limit(1);

  if (!matchingUsers[0]) {
    throw new Error("Your workspace profile is not ready yet");
  }

  return matchingUsers[0];
}

async function findOwnedWorkspace(createIfMissing: boolean) {
  const user = await getCurrentUser();
  const ownedWorkspaces = await db
    .select({ id: workspaces.id })
    .from(workspaces)
    .where(eq(workspaces.ownerId, user.id))
    .limit(1);

  if (ownedWorkspaces[0] || !createIfMissing) {
    return ownedWorkspaces[0] ?? null;
  }

  const createdWorkspaces = await db
    .insert(workspaces)
    .values({ name: "SceneSet workspace", ownerId: user.id })
    .returning({ id: workspaces.id });

  return createdWorkspaces[0] ?? null;
}

function serializeEvent(event: typeof events.$inferSelect): SerializedEvent {
  return {
    id: event.id,
    title: event.title,
    description: event.description ?? "",
    date: event.startDate.toISOString().slice(0, 10),
    endDate: event.endDate.toISOString().slice(0, 10),
    venue: event.location ?? "",
    budget: Number(event.budgetCap ?? 0),
    bannerUrl: event.bannerImageUrl ?? "",
    progress: 12,
    readiness: "Planning",
    status: "Brief started",
    persisted: true,
  };
}

export async function listWorkspaceEvents(): Promise<ActionResult<SerializedEvent[]>> {
  try {
    const workspace = await findOwnedWorkspace(false);
    if (!workspace) {
      return { ok: true, data: [] };
    }

    const workspaceEvents = await db
      .select()
      .from(events)
      .where(eq(events.workspaceId, workspace.id))
      .orderBy(desc(events.startDate));

    return { ok: true, data: workspaceEvents.map(serializeEvent) };
  } catch {
    return { ok: false, error: "Events could not be loaded right now." };
  }
}

export async function createEvent(input: unknown): Promise<ActionResult<SerializedEvent>> {
  const parsed = eventInputSchema.safeParse(input);
  if (!parsed.success) {
    return validationResult(parsed.error);
  }

  try {
    const workspace = await findOwnedWorkspace(true);
    if (!workspace) {
      return { ok: false, error: "A workspace could not be prepared for this account." };
    }

    const createdEvents = await db
      .insert(events)
      .values({
        workspaceId: workspace.id,
        title: parsed.data.title,
        description: parsed.data.description || null,
        location: parsed.data.venue,
        startDate: parsed.data.startDate,
        endDate: parsed.data.endDate,
        budgetCap: parsed.data.budgetCap.toFixed(2),
        bannerImageUrl: parsed.data.bannerUrl || null,
      })
      .returning();

    const createdEvent = createdEvents[0];
    return createdEvent
      ? { ok: true, data: serializeEvent(createdEvent) }
      : { ok: false, error: "The event could not be created." };
  } catch {
    return { ok: false, error: "The event could not be created right now." };
  }
}

export async function updateEvent(
  eventId: unknown,
  input: unknown,
): Promise<ActionResult<SerializedEvent>> {
  const parsedId = eventIdSchema.safeParse(eventId);
  if (!parsedId.success) {
    return { ok: false, error: "A valid event ID is required." };
  }

  const parsed = eventInputSchema.safeParse(input);
  if (!parsed.success) {
    return validationResult(parsed.error);
  }

  try {
    const workspace = await findOwnedWorkspace(false);
    if (!workspace) {
      return { ok: false, error: "Event not found." };
    }

    const updatedEvents = await db
      .update(events)
      .set({
        title: parsed.data.title,
        description: parsed.data.description || null,
        location: parsed.data.venue,
        startDate: parsed.data.startDate,
        endDate: parsed.data.endDate,
        budgetCap: parsed.data.budgetCap.toFixed(2),
        bannerImageUrl: parsed.data.bannerUrl || null,
        updatedAt: new Date(),
      })
      .where(and(eq(events.id, parsedId.data), eq(events.workspaceId, workspace.id)))
      .returning();

    const updatedEvent = updatedEvents[0];
    return updatedEvent
      ? { ok: true, data: serializeEvent(updatedEvent) }
      : { ok: false, error: "Event not found." };
  } catch {
    return { ok: false, error: "The event could not be updated right now." };
  }
}

export async function deleteEvent(eventId: unknown): Promise<ActionResult<{ id: string }>> {
  const parsedId = eventIdSchema.safeParse(eventId);
  if (!parsedId.success) {
    return { ok: false, error: "A valid event ID is required." };
  }

  try {
    const workspace = await findOwnedWorkspace(false);
    if (!workspace) {
      return { ok: false, error: "Event not found." };
    }

    const deletedEvents = await db
      .delete(events)
      .where(and(eq(events.id, parsedId.data), eq(events.workspaceId, workspace.id)))
      .returning({ id: events.id });

    return deletedEvents[0]
      ? { ok: true, data: deletedEvents[0] }
      : { ok: false, error: "Event not found." };
  } catch {
    return { ok: false, error: "The event could not be deleted right now." };
  }
}
