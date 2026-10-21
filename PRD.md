# SceneSet Product Requirements Document

**Product:** SceneSet  
**Assignment:** MKTG 4150 NPM — Assignment 1  
**Document status:** Working PRD for the individual SceneSet prototype  
**Language:** English  
**Live application:** https://sceneset-gdwrh65w.manus.space  
**Repository:** https://github.com/CherryLeChicken/sceneset

## 1. Product summary

SceneSet is a desktop-first event planning and production-management workspace for people who organise events but do not want operational information scattered across spreadsheets, chat messages, documents, and separate supplier notes. It keeps an event brief, budget, tasks, run-of-show schedule, suppliers, guests, and venue-layout planning in one structured workspace.

The MVP is designed for independent event organisers, student societies, community groups, small event agencies, and pop-up market organisers. It prioritises a clear operational overview over a complex enterprise project-management system. The product should make the next practical action visible while an event moves from an initial brief to final delivery.

SceneSet is an assignment prototype, so all demonstration events, venues, budgets, guests, suppliers, email addresses, and other personal details must be fictional. Payment is limited to a clearly labelled test flow and must never imply that a live charge has been completed.

## 2. Problem statement

Small event teams often coordinate a production using a mixture of spreadsheets, shared documents, chat conversations, email threads, and image folders. This creates several recurring problems:

- The latest event date, venue, and budget are difficult to find quickly.
- Budget commitments and actual spending are disconnected from the event plan.
- Tasks, owners, due dates, and status updates are easy to lose in conversations.
- Supplier quotes, contracts, and payment notes are not compared consistently.
- Guest information and RSVP status are maintained separately from the production plan.
- A run-of-show can become an outdated document rather than a live operational view.
- Venue-layout decisions are hard to communicate when they are not connected to the event workspace.

SceneSet addresses this problem with a single event workspace that turns an event brief into a set of connected planning views.

## 3. Product goals

### 3.1 MVP goals

1. Give an organiser a clear dashboard showing every event, its date, venue, budget cap, readiness, and next action.
2. Let an authenticated organiser create, edit, and delete event records belonging only to their workspace.
3. Provide a credible foundation for budget, task, schedule, supplier, guest, and venue-layout workflows.
4. Keep core planning information readable at desktop width while remaining usable at smaller responsive widths.
5. Use fictional demo data so an evaluator can understand the product without exposing real personal information.
6. Provide a professional, lively, and accessible interface suitable for a student event-planning product prototype.
7. Preserve a clear implementation and verification trail in `tasklist.md` for the assignment submission.

### 3.2 Success indicators for the prototype

The prototype is successful when a new evaluator can:

- Reach the public landing page without an account.
- Understand who SceneSet is for and what problem it solves.
- Sign in or sign up through the provided Clerk screens.
- Reach the protected dashboard after authentication.
- See fictional event cards with date, venue, budget, readiness, and next-action information.
- Create a fictional event and see it persist after reload.
- Update and delete an event within the authenticated workspace.
- Understand the planned path from the event dashboard to budget, tasks, schedule, suppliers, guests, and layout views.
- Use labelled controls and visible keyboard focus at desktop and smaller responsive widths.

## 4. Target audience and personas

### 4.1 Independent organiser — Maya

Maya organises a small community market several times a year. She needs a quick view of dates, venue logistics, spending, suppliers, and the next deadline. She values a low-friction workspace more than advanced enterprise permissions.

### 4.2 Student society producer — Daniel

Daniel is responsible for a student showcase with several volunteers. He needs a simple task board, a run sheet, a supplier list, and a way to keep the team aligned without maintaining several disconnected documents.

### 4.3 Small event agency coordinator — Priya

Priya coordinates several small client productions. She needs to switch between event briefs, compare supplier information, monitor budget health, and identify events that need attention.

### 4.4 Community event collaborator — Alex

Alex helps with one event as a collaborator. Alex needs to see the event plan and update assigned operational information without receiving access to unrelated workspaces. Granular role management beyond the MVP is deferred, but the workspace model must not prevent a future collaborator flow.

## 5. Core user journey

1. A visitor lands on the public SceneSet marketing page.
2. The visitor reads the product value proposition, audience description, feature overview, pricing section, Privacy/PICS link, and Terms link.
3. The visitor selects sign in or sign up.
4. Clerk authenticates the user and protected workspace routes become available.
5. A user reaches the event workspace dashboard.
6. The dashboard shows fictional starter cards and any events belonging to the authenticated workspace.
7. The user creates an event brief with a title, description, dates, venue, budget cap, and optional banner URL.
8. The user opens the event summary and uses sub-navigation for budget, tasks, schedule, suppliers, guests, and venue layout.
9. The user updates operational records, filters lists, and reviews a print-friendly summary.
10. The user can return to the dashboard, edit an event brief, or delete a fictional event after confirmation.
11. A future test-monetisation flow may offer a Free personal plan, a per-event upgrade, or a monthly organiser plan. Any payment interaction must remain visibly in Stripe test mode.

## 6. Functional requirements

### 6.1 Public marketing and compliance

- The root route `/` explains SceneSet in clear English.
- The landing page identifies the intended audience and the problem of scattered event operations.
- The landing page links to authentication and contains a pricing section or pricing entry point.
- `/privacy` provides a concise Privacy/PICS page describing account, workspace, event, and uploaded-media handling.
- `/terms` provides the terms for use of the prototype and test services.
- Public routes must remain accessible without authentication.

### 6.2 Authentication and workspace access

- `/sign-in` and `/sign-up` use Clerk and display English labels.
- Authentication pages provide a visible link to the privacy/PICS information.
- `/dashboard`, `/events/:eventId`, and future workspace routes require authentication.
- Clerk user creation and updates are synchronized through the signed Svix webhook at `/api/webhooks/clerk`.
- A user must only read or mutate event records in their authenticated workspace.
- Unauthenticated requests to protected routes must redirect to sign in or otherwise be rejected.

### 6.3 Event workspace and event CRUD

The dashboard must display event cards containing, at minimum:

- Event title.
- Start date and, where relevant, end date.
- Venue/location.
- Budget cap.
- Readiness or progress indicator.
- Current next action or status.

Authenticated users must be able to create, edit, and delete events. The event input model is:

- `title`: required, trimmed, maximum 255 characters.
- `description`: optional text with a bounded length.
- `startDate`: required valid date.
- `endDate`: required valid date after the start date.
- `venue`: required, trimmed, maximum 255 characters.
- `budgetCap`: required non-negative finite monetary value within the database precision.
- `bannerUrl`: optional valid URL, stored as a URL only after server validation.

Event mutations must use validated server-side actions. The server must derive the workspace from the authenticated Clerk user rather than trusting a workspace ID supplied by the browser. Malformed input, missing authentication, invalid event IDs, and cross-workspace access must be rejected without exposing private database details.

### 6.4 Event summary dashboard

`/events/[eventId]` will provide an event-level summary with:

- Event title, date, venue, and budget cap.
- Budget health or spending summary.
- Task completion summary.
- Supplier readiness summary.
- Guest and RSVP counters.
- Active event sub-navigation.

Every sub-route must preserve the active event ID and show the correct navigation state.

### 6.5 Budget ledger

`/events/[eventId]/budget` will provide fictional budget entries with:

- Category and item name.
- Projected cost and actual cost.
- Status, notes, and optional receipt link field.
- Search/filter affordances where appropriate.
- Add, edit, and delete actions.
- Recalculated projected, actual, remaining, and summary metrics.

### 6.6 Tasks

`/events/[eventId]/tasks` will provide a task board/list with:

- To Do, In Progress, Review, and Done states.
- Task title and description.
- Priority, due date, and owner/assignee.
- Filters and accessible status controls.
- Persistence through validated server actions.

### 6.7 Run-of-show schedule

`/events/[eventId]/schedule` will provide schedule blocks with:

- Time slot.
- Activity.
- Location detail.
- Owner name.
- Notes.
- Chronological display and intentional manual sort-order support.

### 6.8 Suppliers

`/events/[eventId]/suppliers` will provide a supplier directory and comparison-friendly view with:

- Fictional supplier name and category.
- Fictional contact fields where needed for the demo.
- Quote or agreed-fee information.
- Contract status.
- Payment notes.
- Search/filter and comparison-friendly rows.

### 6.9 Guests and RSVP

`/events/[eventId]/guests` will provide guest records with:

- Fictional guest name and optional fictional email.
- VIP, Press, and General categories.
- Invited, Accepted, Declined, and related RSVP states.
- Table assignment.
- Filter by category and RSVP status.
- An import-ready data shape without requiring live external guest imports for the MVP.

### 6.10 Venue-layout planning

`/events/[eventId]/layout` or an equivalent event route will show a desktop-first venue-layout planning concept with labelled fictional zones and simple movable or assignable planning items. Vendor referrals must remain optional and visually separate from the core planning workspace.

### 6.11 Search, filters, and print summary

Applicable lists must provide clear search or filter affordances. The event summary must have a print-friendly or export-friendly presentation that contains the selected fictional event data and does not expose credentials or real personal data.

### 6.12 Media uploads

The event banner component will:

- Accept JPG, PNG, and WebP files.
- Reject files over 5 MB.
- Show a client-side preview before upload.
- Provide keyboard-accessible file selection.
- Show upload progress and an understandable error state.
- Use the server-only ImageKit private key through `/api/imagekit/auth`.
- Store or return the resulting ImageKit CDN URL without exposing private credentials.

## 7. Route map

### Currently implemented routes

- `/` — public SceneSet landing page and pricing section.
- `/privacy` — Privacy/PICS page.
- `/terms` — Terms page.
- `/sign-in/[[...sign-in]]` — Clerk sign-in route.
- `/sign-up/[[...sign-up]]` — Clerk sign-up route.
- `/dashboard` — protected event workspace dashboard.
- `/api/imagekit/auth` — protected ImageKit upload-authentication endpoint.
- `/api/webhooks/clerk` — signed Clerk user-sync webhook.

### Planned MVP routes

- `/events/[eventId]` — event summary dashboard.
- `/events/[eventId]/budget` — budget ledger.
- `/events/[eventId]/tasks` — task board and list.
- `/events/[eventId]/schedule` — run-of-show schedule.
- `/events/[eventId]/suppliers` — supplier directory and comparison view.
- `/events/[eventId]/guests` — guest and RSVP manager.
- `/events/[eventId]/layout` — venue-layout planning view.
- `/settings` — workspace and test-plan settings entry point.
- `/api/webhooks/stripe` — Stripe test-webhook endpoint when monetisation is implemented.

## 8. Technical architecture

### 8.1 Application stack

- Next.js App Router 16 with TypeScript strict mode.
- React client components only where interactive browser state is required.
- Tailwind CSS for responsive styling and design tokens.
- Zod for runtime environment and input validation.
- Drizzle ORM for typed PostgreSQL access.
- Neon Serverless PostgreSQL as the database.
- Clerk for authentication and protected-route middleware.
- Svix for verified Clerk webhook signatures.
- ImageKit for event-banner upload authentication and CDN media delivery.
- Stripe test Checkout and webhooks for a future test-only monetisation flow.
- Dockerfile/container deployment with an unauthenticated health route.

### 8.2 Application boundaries

- Browser code may use public Clerk, ImageKit, and application URL values only.
- Database credentials, Clerk secret keys, webhook secrets, ImageKit private keys, and Stripe secret keys must remain server-side.
- Server actions must validate input and derive identity from Clerk server authentication.
- Database writes must be scoped by workspace ownership before update or deletion.
- Durable records belong in PostgreSQL; uploaded media belongs in ImageKit; the browser may use local storage only for fictional dashboard presentation state where explicitly documented.
- The application must not depend on private credentials during static compilation.

## 9. Data model

The database uses UUID primary keys and timestamp fields. Required foreign-key behavior is part of the schema and migration contract.

### 9.1 `users`

Stores the local application identity mapped to Clerk:

- `id` — UUID primary key.
- `clerkId` — unique Clerk user ID.
- `email` — unique account email.
- `fullName` and `avatarUrl` — optional profile data.
- `createdAt` and `updatedAt`.

### 9.2 `workspaces`

Stores an organiser workspace:

- `id` — UUID primary key.
- `name`.
- `ownerId` — foreign key to `users`, cascade on owner deletion.
- Stripe customer/subscription identifiers and subscription status for test monetisation.
- Timestamps.
- Row-level security enabled by migration.

### 9.3 `events`

Stores event briefs:

- `id` — UUID primary key.
- `workspaceId` — foreign key to `workspaces`, cascade on workspace deletion.
- `title`, `description`, and `location`.
- `startDate` and `endDate`.
- `budgetCap`.
- `bannerImageUrl`.
- Timestamps.
- Row-level security enabled by migration.

### 9.4 `budgets`

Stores event budget entries linked to `events` with cascade deletion. Fields include category, item name, projected cost, actual cost, status, notes, and timestamps. Row-level security is enabled by migration.

### 9.5 `tasks`

Stores event tasks linked to `events` with cascade deletion. Fields include title, description, status, priority, assignee, due date, and timestamps. An assignee is set to null when the referenced user is deleted. Row-level security is enabled by migration.

### 9.6 `schedules`

Stores event schedule blocks linked to `events` with cascade deletion. Fields include time slot, activity, location detail, owner name, notes, sort order, and timestamps.

### 9.7 `suppliers`

Stores fictional event suppliers linked to `events` with cascade deletion. Fields include name, category, contact fields, contract status, agreed fee, and timestamps.

### 9.8 `guests`

Stores fictional event guests linked to `events` with cascade deletion. Fields include full name, optional email, category, RSVP status, table assignment, and timestamps.

## 10. Revenue model and monetisation boundary

The proposed revenue model has three clearly separated options:

1. **Free personal plan** — one personal workspace and limited event capacity for evaluation and early use.
2. **Per-event upgrade** — a test upgrade for organisers who need additional capacity or event features.
3. **Monthly organiser plan** — a test subscription for organisers managing multiple productions.

The assignment prototype must not claim that a live payment has been processed. If Stripe is implemented, it must use test keys, test Checkout, workspace metadata, signed test webhooks, and explicit test-mode copy. Live ticketing, live payment processing, and vendor marketplace transactions are outside the MVP.

## 11. Accessibility and responsive requirements

- Use semantic headings, landmarks, labels, descriptions, lists, and buttons.
- Every form control must have an associated visible label or an equivalent accessible name.
- Keyboard users must be able to reach, operate, and understand all key controls.
- Dropzones must support keyboard activation as well as pointer and drag-and-drop interaction.
- Focus indicators must be visible and have adequate contrast.
- Text and control contrast should meet WCAG 2.2 AA expectations, including a target of at least 4.5:1 for normal text.
- Status updates, upload progress, validation errors, and success messages should be exposed through appropriate live regions.
- Layouts must remain usable at desktop and smaller responsive widths.
- The verification process should include Lighthouse accessibility scoring, keyboard checks, and responsive checks. The target Lighthouse accessibility score is at least 95, with the goal of 100 on the public marketing page.

## 12. Privacy, security, and compliance requirements

- Use fictional people, suppliers, guests, venues, contact details, budgets, and images in the demo.
- Do not commit `.env.local`, database URLs, Clerk secrets, Svix secrets, ImageKit private keys, Stripe secrets, or other credentials.
- Validate environment variables through Zod before use.
- Keep private keys in server-only execution paths.
- Verify Clerk webhook signatures before processing user events.
- Require Clerk authentication for workspace routes and server actions.
- Scope every event mutation to the authenticated workspace.
- Reject malformed inputs and invalid UUIDs without returning raw database errors.
- Avoid exposing secrets in HTML, client bundles, logs, screenshots, PDFs, or repository history.
- Provide Privacy/PICS and Terms pages in English.
- Do not collect or display real guest or supplier personal data for the assignment prototype.

## 13. Design direction

SceneSet should feel like a calm production desk rather than a generic administration panel. The visual language combines a dark ink-like navy for structure, a pale mint workspace surface for operational calm, and a bright sky-blue accent for progress and action.

Core design principles:

- **Operational clarity:** dates, venues, budgets, and next actions should be scannable.
- **Calm momentum:** progress indicators and statuses should encourage action without alarmist visual noise.
- **Lively professionalism:** event-planning energy should appear through colour and rhythm while remaining suitable for real work.
- **Accessible confidence:** contrast, labels, focus states, and generous controls should make the workspace dependable.

The interface should use editorial-style headings, rounded cards, clear data rows, restrained shadows, and responsive layouts that avoid hiding critical planning information behind decorative interactions.

## 14. Non-goals for the assignment MVP

The following are intentionally not required for Phase 1:

- Live ticket sales or ticket scanning.
- A full vendor marketplace or automated vendor referrals.
- Live payment processing or production billing.
- Advanced AI generation of run sheets, budgets, or supplier drafts.
- Granular enterprise role and permission management.
- High-resolution exports and advanced usage-credit analytics.
- A native mobile application.
- Real email campaigns, real guest invitations, or real supplier outreach.
- Integration with external calendars or accounting systems.

## 15. Phased roadmap

### Phase 1 — Assignment MVP

- Public landing, pricing section, privacy, and terms pages.
- Clerk sign-in/sign-up and protected workspace routes.
- User synchronization webhook and Neon/Drizzle schema.
- Event dashboard with fictional starter data.
- Event CRUD with validated server actions and workspace scoping.
- ImageKit banner upload flow.
- Event summary, budget, tasks, schedule, suppliers, guests, and layout views.
- Search/filter and print-friendly summary.
- Stripe test-only upgrade entry point if time and credentials permit.
- Accessibility, security, responsive, build, and production checks.

### Phase 2 — Deferred features

- Advanced AI assistant for run-sheet generation, budget risk analysis, and vendor drafts.
- Granular multi-tenant roles beyond the MVP collaborator flow.
- Advanced usage-credit analytics and high-resolution exports.
- Full vendor marketplace and live ticketing/payment processing.
- Calendar, accounting, communication, and external CRM integrations.
- Native mobile applications and offline-first field operations.

## 16. Verification and evidence policy

`tasklist.md` is the authoritative implementation sequence. Each task includes a Verification Gate. A task may be marked complete only after its gate passes with evidence. The project must distinguish code that is implemented from code that has completed live verification.

At the time this PRD was reconstructed:

- Modules 1, 2, and 3 are marked complete in `tasklist.md`.
- ImageKit authentication task 4.1 is marked complete.
- The event-banner component code for task 4.2 exists, but its live CDN-upload verification remains pending.
- Public marketing and compliance task 5.1 is marked complete.
- Dashboard workspace list task 6.1 is marked complete.
- Event CRUD work is implemented in the working project but remains pending its create/edit/delete and rejection verification gate until evidence is recorded.
- Budget, tasks, schedule, suppliers, guests, venue layout, monetisation, demo-data QA, and final submission packaging remain pending unless their checklist markers are changed with evidence.

## 17. Assignment deliverables

The individual project package must include:

1. `PRD.md` in the project root.
2. `tasklist.md` in the project root with truthful checkbox status and explicit verification gates.
3. The source repository with meaningful commit history and no secrets.
4. The public SceneSet website URL.
5. A final team PDF with the required cover page, teammate links, AI declaration, and each teammate's PRD and tasklist arranged as required by the course.
6. Individual PRD and tasklist uploads to VeriGuide within the required course window.

The final PDF must be in English, preserve readable formatting and clickable links, and contain no real personal data or credentials.
