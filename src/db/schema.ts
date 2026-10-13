import {
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  integer,
} from "drizzle-orm/pg-core";

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
};

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  clerkId: varchar("clerk_id", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  fullName: varchar("full_name", { length: 255 }),
  avatarUrl: text("avatar_url"),
  ...timestamps,
});

export const workspaces = pgTable("workspaces", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  ownerId: uuid("owner_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  stripeCustomerId: varchar("stripe_customer_id", { length: 255 }),
  stripeSubscriptionId: varchar("stripe_subscription_id", { length: 255 }),
  subscriptionStatus: varchar("subscription_status", { length: 50 }).default("free"),
  ...timestamps,
});

export const events = pgTable("events", {
  id: uuid("id").defaultRandom().primaryKey(),
  workspaceId: uuid("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  location: varchar("location", { length: 255 }),
  startDate: timestamp("start_date", { withTimezone: true }).notNull(),
  endDate: timestamp("end_date", { withTimezone: true }).notNull(),
  budgetCap: numeric("budget_cap", { precision: 12, scale: 2 }).default("0.00"),
  bannerImageUrl: text("banner_image_url"),
  ...timestamps,
});

export const budgets = pgTable("budgets", {
  id: uuid("id").defaultRandom().primaryKey(),
  eventId: uuid("event_id")
    .notNull()
    .references(() => events.id, { onDelete: "cascade" }),
  category: varchar("category", { length: 100 }).notNull(),
  itemName: varchar("item_name", { length: 255 }).notNull(),
  projectedCost: numeric("projected_cost", { precision: 10, scale: 2 })
    .notNull()
    .default("0.00"),
  actualCost: numeric("actual_cost", { precision: 10, scale: 2 }).default("0.00"),
  status: varchar("status", { length: 50 }).default("Pending"),
  notes: text("notes"),
  ...timestamps,
});

export const tasks = pgTable("tasks", {
  id: uuid("id").defaultRandom().primaryKey(),
  eventId: uuid("event_id")
    .notNull()
    .references(() => events.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  status: varchar("status", { length: 50 }).default("To Do"),
  priority: varchar("priority", { length: 50 }).default("Medium"),
  assignedTo: uuid("assigned_to").references(() => users.id, {
    onDelete: "set null",
  }),
  dueDate: timestamp("due_date", { withTimezone: true }),
  ...timestamps,
});

export const schedules = pgTable("schedules", {
  id: uuid("id").defaultRandom().primaryKey(),
  eventId: uuid("event_id")
    .notNull()
    .references(() => events.id, { onDelete: "cascade" }),
  timeSlot: varchar("time_slot", { length: 100 }).notNull(),
  activity: varchar("activity", { length: 255 }).notNull(),
  locationDetail: varchar("location_detail", { length: 255 }),
  ownerName: varchar("owner_name", { length: 255 }),
  notes: text("notes"),
  sortOrder: integer("sort_order").default(0),
  ...timestamps,
});

export const suppliers = pgTable("suppliers", {
  id: uuid("id").defaultRandom().primaryKey(),
  eventId: uuid("event_id")
    .notNull()
    .references(() => events.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  contactPerson: varchar("contact_person", { length: 255 }),
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 50 }),
  contractStatus: varchar("contract_status", { length: 50 }).default("Inquiry"),
  agreedFee: numeric("agreed_fee", { precision: 10, scale: 2 }).default("0.00"),
  ...timestamps,
});

export const guests = pgTable("guests", {
  id: uuid("id").defaultRandom().primaryKey(),
  eventId: uuid("event_id")
    .notNull()
    .references(() => events.id, { onDelete: "cascade" }),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }),
  category: varchar("category", { length: 100 }).default("General"),
  rsvpStatus: varchar("rsvp_status", { length: 50 }).default("Invited"),
  tableAssignment: varchar("table_assignment", { length: 100 }),
  ...timestamps,
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Workspace = typeof workspaces.$inferSelect;
export type Event = typeof events.$inferSelect;
export type Budget = typeof budgets.$inferSelect;
export type Task = typeof tasks.$inferSelect;
export type Schedule = typeof schedules.$inferSelect;
export type Supplier = typeof suppliers.$inferSelect;
export type Guest = typeof guests.$inferSelect;
