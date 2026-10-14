# SceneSet — AI Execution Tasklist

## AI execution contract

This file is the authoritative build sequence for the AI coding agent.

1. Read `PRD.md` and this `tasklist.md` before every implementation turn.
2. Select **only the first pending task** marked `- [ ]`.
3. Implement only the files and behavior required by that task. Do not jump ahead or add unrelated features.
4. Run the task's Verification Gate before changing its checkbox.
5. Mark the task `- [x]` only when the gate passes with evidence.
6. If a task needs credentials, instructor input, teammate information, or an external approval that is not available, stop at that task and report the blocker. Never invent secrets, real people, or test results.
7. Keep all demo people, guests, suppliers, budgets, venues, and contact details fictional.
8. Never commit `.env.local`, credentials, webhook secrets, payment keys, or other private values.
9. After each completed task, summarize the files changed, verification evidence, and the next pending task.

## Module 1: Environment and validation

- [x] **1.1 Initialize the project repository**
  - Next.js App Router, TypeScript, strict mode, Tailwind CSS, `src/` layout, and Git repository are initialized.
  - **Verification Gate:** Start the development server and confirm `GET /` returns HTTP 200 on port 3000.

- [x] **1.2 Create local environment configuration**
  - `.env.local` contains placeholders for `NEXT_PUBLIC_APP_URL`, `DATABASE_URL`, Clerk, Stripe, ImageKit, and Gemini keys.
  - **Verification Gate:** Confirm the file exists, all required key names are present, it is ignored by Git, and it is not tracked.

- [x] **1.3 Configure environment variable validation**
  - `src/env.ts` validates every required environment variable with Zod and is loaded during application build/runtime.
  - **Verification Gate:** Run `npx tsc --noEmit` and `npm run build`; confirm invalid URL input is rejected.

## Module 2: Database and ORM

- [x] **2.1 Configure Drizzle ORM and Neon client**
  - Install `@neondatabase/serverless`, `drizzle-orm`, and `drizzle-kit`; create `src/db/index.ts` using the validated `DATABASE_URL`.
  - **Verification Gate:** Resolve `DATABASE_URL`, initialize the Neon client, and confirm the strict production build passes.

- [x] **2.2 Define Drizzle table schemas**
  - Define `users`, `workspaces`, `events`, `budgets`, `tasks`, `schedules`, `suppliers`, and `guests` with UUID primary keys, timestamps, required fields, and foreign-key delete behavior from the PRD.
  - **Verification Gate:** Run `npx drizzle-kit generate`; confirm eight tables, valid SQL, cascade relationships, and task assignee `SET NULL` behavior.

- [x] **2.3 Execute the initial database migration**
  - Push the generated migration to the configured Neon PostgreSQL database. Enable the PRD-required RLS flags for `workspaces`, `events`, `budgets`, and `tasks` without exposing credentials.
  - **Verification Gate:** Run `npx drizzle-kit push` against a real authorized database; verify tables, foreign keys, RLS flags, and a reversible connection/query check. Do not mark complete using placeholder credentials.

## Module 3: Authentication and access control

- [x] **3.1 Configure Clerk provider and authentication pages**
  - Install/configure Clerk, wrap the root layout with `ClerkProvider`, and create sign-in/sign-up routes with English labels and a visible privacy/PICS link.
  - **Verification Gate:** With configured test keys, load `/sign-in` and `/sign-up` and confirm both routes render without server or TypeScript errors.

- [x] **3.2 Protect application routes with Clerk middleware**
  - Leave the marketing routes public and require authentication for `/dashboard`, `/events/:eventId`, and other workspace routes.
  - **Verification Gate:** Confirm an unauthenticated request to `/dashboard` redirects to `/sign-in`, while `/` remains publicly accessible.

- [x] **3.3 Synchronize Clerk users through a verified webhook**
  - Create `/api/webhooks/clerk` with Svix signature verification and upsert behavior for `user.created` and `user.updated` in `users`.
  - **Verification Gate:** Send a signed test webhook and verify the corresponding fictional/test user record is created or updated in the database.

## Module 4: Media and event assets

- [x] **4.1 Configure ImageKit upload authentication**
  - Add a server-side ImageKit helper and `/api/imagekit/auth` endpoint. Keep ImageKit private keys server-only.
  - **Verification Gate:** With configured test credentials, request the endpoint and confirm it returns a valid upload token, signature, expiry, and public key without private-key leakage.

- [ ] **4.2 Build the event banner upload component**
  - Create a reusable accessible dropzone with client-side preview, file type/size validation, upload progress, error state, and CDN URL output.
  - **Verification Gate:** Upload a non-personal test image, confirm the preview and ImageKit CDN URL, and verify keyboard operation.

## Module 5: Public marketing and compliance

- [x] **5.1 Complete the public marketing and compliance pages**
  - Keep the SceneSet landing page focused on the approved audience and problem. Add accessible Pricing, Privacy/PICS, and Terms pages or sections with navigation links.
  - **Verification Gate:** Test public routes at desktop and mobile widths; run an accessibility audit targeting WCAG 2.2 AA and a Lighthouse accessibility score of at least 95.

## Module 6: Core event workspace

- [ ] **6.1 Build the dashboard event workspace list**
  - Create `/dashboard` with fictional demo events, event cards, date/venue/budget indicators, progress/readiness status, and an accessible create-event form.
  - **Verification Gate:** Create a fictional event, reload the dashboard, and confirm its card renders with no real personal data.

- [ ] **6.2 Build event creation, editing, and deletion**
  - Implement validated server actions for event title, description, dates, venue, budget cap, and banner URL, scoped to the authenticated workspace.
  - **Verification Gate:** Create, edit, and delete a fictional event; confirm unauthorized or malformed requests are rejected.

- [ ] **6.3 Build the event summary dashboard**
  - Create `/events/[eventId]` with event details, budget health, task completion, supplier readiness, and guest counters plus active sub-navigation.
  - **Verification Gate:** Navigate through every event sub-route and confirm the active event ID and navigation state remain correct.

- [ ] **6.4 Build the budget ledger**
  - Create `/events/[eventId]/budget` with fictional categories, projected and actual costs, filters, notes, receipt-link fields, add/edit/delete actions, and recalculated totals.
  - **Verification Gate:** Add and edit a fictional budget entry; confirm projected/actual totals and summary metrics recalculate and persist.

- [ ] **6.5 Build the task board and task list**
  - Create `/events/[eventId]/tasks` with To Do, In Progress, Review, and Done states, priorities, due dates, owners, filters, and accessible status controls.
  - **Verification Gate:** Move a fictional task between columns and confirm the status persists through the server action and reload.

- [ ] **6.6 Build the run-of-show schedule**
  - Create `/events/[eventId]/schedule` with time blocks, activity, location, owner, notes, and reorder controls.
  - **Verification Gate:** Add fictional time blocks and confirm chronological order and intentional manual sort order display correctly after reload.

- [ ] **6.7 Build the supplier directory and comparison view**
  - Create `/events/[eventId]/suppliers` with fictional supplier contacts, categories, quotes/fees, contract status, payment notes, filters, and comparison-friendly rows.
  - **Verification Gate:** Add a fictional supplier, update contract status/fee, filter the list, and confirm the saved state persists.

- [ ] **6.8 Build the guest and RSVP manager**
  - Create `/events/[eventId]/guests` with fictional guests, VIP/Press/General categories, RSVP statuses, table assignment, import-ready structure, and filters.
  - **Verification Gate:** Add a fictional guest, toggle RSVP status, filter by category/status, and confirm the result persists.

- [ ] **6.9 Build a venue-layout planning view**
  - Create a desktop-first venue layout view with labelled fictional venue zones and simple movable or assignable planning items. Keep it separate from optional vendor referrals.
  - **Verification Gate:** Add or move a fictional layout item, confirm its position/state, and verify the view remains usable at desktop and smaller responsive widths.

- [ ] **6.10 Add search, filters, and print-friendly summary**
  - Add consistent search/filter affordances where required and a print/export-friendly event summary without exposing private credentials or real personal data.
  - **Verification Gate:** Search and filter each applicable list, invoke print preview, and confirm the summary contains the selected fictional event data.

## Module 7: Pricing and test monetization

- [ ] **7.1 Build SceneSet pricing and upgrade entry points**
  - Show a Free personal plan, per-event upgrade, and monthly organiser plan. Clearly label payment as a test flow and keep vendor referrals optional.
  - **Verification Gate:** Confirm pricing links are reachable from the landing page and event settings without claiming a completed live charge.

- [ ] **7.2 Configure Stripe test Checkout server action**
  - Create a server action for a Stripe test Checkout subscription/session with workspace metadata and server-only secret access.
  - **Verification Gate:** With Stripe test keys, click the upgrade action and confirm redirection to Stripe Checkout test mode.

- [ ] **7.3 Implement Stripe webhook state updates**
  - Create `/api/webhooks/stripe` with raw-body signature validation for checkout completion, subscription updates, and subscription deletion.
  - **Verification Gate:** Use Stripe CLI test events and confirm the fictional workspace subscription status changes correctly; do not use live payments.

## Module 8: Demo data and quality assurance

- [ ] **8.1 Seed a complete fictional demo event**
  - Add a clearly fictional event with fictional venue, suppliers, guests, tasks, schedule blocks, budget entries, and layout items.
  - **Verification Gate:** A new evaluator can complete the core organiser flow using only fictional data and no private account information.

- [ ] **8.2 Run the organiser acceptance flow**
  - Test sign-in/demo entry, event setup, budget update, task movement, schedule creation, supplier update, guest RSVP filtering, venue layout, search/filter, and print summary.
  - **Verification Gate:** Record pass/fail evidence for every flow; leave failed features pending and fix them before proceeding.

- [ ] **8.3 Run security, accessibility, and responsive audits**
  - Check no secrets appear in client bundles, forms have labels, focus rings are visible, text contrast is at least 4.5:1, and key views work at desktop and mobile widths.
  - **Verification Gate:** Run type-check, production build, accessibility audit, keyboard checks, and responsive checks with zero blocking failures.

- [ ] **8.4 Publish and verify the permanent website**
  - Push the verified canonical commit, publish the website, and keep the public URL stable and accessible for at least 30 days after the Blackboard deadline.
  - **Verification Gate:** Open the production URL in a fresh browser session, test the landing page and core demo flow, and record HTTP 200/public-access evidence.

## Module 9: MKTG 4150 Assignment 1 submission package

- [ ] **9.1 Finalize the individual PRD and AI tasklist**
  - Ensure `PRD.md` and `tasklist.md` are in the project root, in English, aligned with the implemented SceneSet app, and include explicit verification gates and a deferred-features section.
  - **Verification Gate:** Compare both documents against the MKTG4150 instructions and confirm no unfinished task is marked complete.

- [ ] **9.2 Prepare the group cover page**
  - Include all teammates' English names in surname order, student ID numbers, every teammate's repository URL, every teammate's live app URL, and the truthful group AI declaration.
  - **Verification Gate:** Open every URL in a fresh browser session and confirm each teammate's app is distinct and publicly accessible.

- [ ] **9.3 Assemble the final Blackboard PDF**
  - Submit one English PDF per team: cover page first, followed by each classmate's PRD and tasklist arranged alphabetically by family name. Preserve clickable links and readable formatting.
  - **Verification Gate:** Open the final PDF, inspect every page, test all hyperlinks, and confirm no secrets or real personal data appear.

- [ ] **9.4 Submit to Blackboard and VeriGuide**
  - Upload the final team PDF to Blackboard by the confirmed course deadline. Each teammate uploads their own PRD and tasklist to VeriGuide within the required window.
  - **Verification Gate:** Save the Blackboard and VeriGuide submission receipts and confirm the correct final version was submitted.

## Deferred after the assignment MVP

- [ ] **[DEFERRED] Advanced AI assistant for run-sheet generation, budget risk analysis, and vendor drafts**
- [ ] **[DEFERRED] Granular multi-tenant roles beyond the MVP collaborator flow**
- [ ] **[DEFERRED] Advanced usage-credit analytics and high-resolution exports**
- [ ] **[DEFERRED] Full vendor marketplace and live ticketing/payment processing**
