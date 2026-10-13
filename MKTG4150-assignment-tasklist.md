# MKTG 4150 NPM — Assignment 1 Task List

## Assignment snapshot

- [ ] Confirm the team has **2–6 classmates**. A one-person team is discouraged.
- [ ] Confirm that each teammate is building **one different web application**.
- [ ] Confirm the selected application is **SceneSet**, one of the six approved hypothetical businesses.
- [ ] Confirm all assignment work is written in **English**, including labels, documents, screenshots, and explanations.
- [ ] Confirm the final app, repository, and submission files contain no real guest, supplier, customer, phone, email, or address data. Use fictional demo data.
- [ ] Confirm any images are royalty-free with no attribution requirement (for example, CC0/public-domain) or AI-generated.
- [ ] Confirm the website will remain publicly accessible for at least **30 days after the Blackboard deadline**.

## Key deadlines and submission channels

- [ ] Confirm the exact deadline in Blackboard. The PDF states **11:00 p.m. Hong Kong Time on 18 October 2026**, but labels the day inconsistently as Sunday/Monday.
- [ ] Submit **one final PDF per team to Blackboard** by the confirmed deadline.
- [ ] Submit each teammate's own **PRD and task list to VeriGuide** for plagiarism checking, within the deadline stated by the course.
- [ ] Keep a draft upload available before the deadline if the team needs a safety copy; identify the final version clearly if more than one Blackboard version is uploaded.
- [ ] Do not wait until the deadline: allow time to check links, PDF rendering, and VeriGuide upload requirements.

## SceneSet product scope

SceneSet is a desktop-first planning workspace for parties, pop-up markets, showcases, community events, and small festivals. It should reduce the problem of budgets, suppliers, schedules, tasks, guest information, and venue planning being scattered across documents and conversations.

### Core user workflow

- [ ] A user can create an account or use a clearly labelled demo entry point.
- [ ] A user can create an event workspace.
- [ ] A user can set the event date, venue, goals, and budget.
- [ ] A user can create and assign tasks.
- [ ] A user can prepare a running order/schedule.
- [ ] A user can record suppliers and compare quotes or supplier information.
- [ ] A user can manage budget categories and spending.
- [ ] A user can manage guests, invitations, or RSVP status.
- [ ] A user can view a venue-layout planning concept.
- [ ] A user can search and filter relevant records.
- [ ] A user can view or print/export a useful event summary.
- [ ] Collaborator/team-workspace behavior is demonstrated or clearly scoped for the MVP.

### Required pages/views to check

- [ ] Landing page
- [ ] Login and sign-up screens or a clearly explained demo access flow
- [ ] Events list/workspace dashboard
- [ ] Event dashboard
- [ ] Task board
- [ ] Budget page
- [ ] Supplier comparison/directory page
- [ ] Guest page
- [ ] Schedule/run-of-show page
- [ ] Venue-layout page or clearly labelled MVP layout view
- [ ] Settings page
- [ ] Pricing page or pricing section

### Product and design constraints

- [ ] Use a desktop-first planning interface with clear tables and boards.
- [ ] Keep the visual style professional but lively for event management.
- [ ] Use strong readability, simple navigation, accessible colours, labels, and controls.
- [ ] Verify the main planning flow at desktop width and a smaller responsive width.
- [ ] Keep the MVP realistic for a solo founder.
- [ ] Do not build complicated ticketing, live payment processing, or a full vendor marketplace.
- [ ] Show only a **test payment flow** if payment is demonstrated.
- [ ] Keep vendor referrals optional and visually separate from the core MVP.

## Documentation requirements

### PRD.md

- [ ] Save `PRD.md` in the project root.
- [ ] Include the app purpose, problem, target audience, and customer/user personas.
- [ ] Include the revenue model: free personal plan, per-event upgrade, and/or monthly organiser plan.
- [ ] Separate Phase 1 Core MVP from Phase 2 deferred features.
- [ ] Define the page routes and user journey.
- [ ] Define the technical stack and architecture constraints.
- [ ] Define the database entities and relationships.
- [ ] Define third-party/API/payment boundaries and environment-key handling.
- [ ] Define accessibility, privacy, security, and compliance expectations.
- [ ] Ensure the PRD reflects the actual SceneSet app rather than generic AI-generated features.

### tasklist.md

- [ ] Save `tasklist.md` in the project root.
- [ ] Break the PRD into sequential, atomic micro-tasks.
- [ ] Use `- [ ]` for pending and `- [x]` only after verification.
- [ ] Add an explicit Verification Gate to every task.
- [ ] Include build, local-server, database, visual, and user-flow checks where appropriate.
- [ ] Keep Phase 1 tasks separate from a Deferred/Phase 2 section.
- [ ] Preserve the actual implementation status; do not mark unfinished features complete.

## Current SceneSet implementation status

- [x] Next.js App Router, TypeScript, Tailwind CSS, and strict mode initialized.
- [x] `.env.local` placeholder configuration created and kept untracked.
- [x] Zod environment validation implemented and build-verified.
- [x] Drizzle + Neon client configured.
- [x] Drizzle schemas created for users, workspaces, events, budgets, tasks, schedules, suppliers, and guests.
- [x] Generated Drizzle migration committed; database push is still pending.
- [x] SceneSet marketing landing page deployed at https://sceneset-gdwrh65w.manus.space.
- [ ] Complete authentication and onboarding.
- [ ] Complete database migration and verify tables/RLS.
- [ ] Complete event workspace dashboard and event CRUD.
- [ ] Complete budget, tasks, schedule, supplier, guest, and venue-layout flows.
- [ ] Complete fictional demo data and organiser testing flow.
- [ ] Complete accessibility, responsive, and security checks.

## Version control and live website evidence

- [ ] Ensure the repository is accessible to the instructor. If private, invite `edwinluk@cuhk.edu.hk` as a collaborator.
- [ ] Record the repository URL on the cover page.
- [ ] Confirm the repository contains the PRD, tasklist, source code, and meaningful commit history.
- [ ] Confirm `git status` is clean before submission.
- [ ] Open the live SceneSet URL in an incognito/private window.
- [ ] Test the landing page, main navigation, app routes, and demo flow from the public URL.
- [ ] Record the live website URL on the cover page.
- [ ] Confirm the public website remains accessible without local development tools.

## Organiser testing checklist to include with the project

- [ ] Create or enter the fictional demo event.
- [ ] Confirm event title, date, venue, and budget are visible.
- [ ] Add or edit a budget item and confirm totals update.
- [ ] Move a task between statuses and confirm the change persists.
- [ ] Add a schedule item and confirm chronological order.
- [ ] Add/edit a supplier and confirm contract/quote information is visible.
- [ ] Add a fictional guest and filter by category or RSVP status.
- [ ] Open the venue-layout view and confirm it is understandable.
- [ ] Test search/filter controls.
- [ ] Open a print-friendly or summary view if provided.
- [ ] Test keyboard focus and form labels on key interactive controls.
- [ ] Test the main flow at desktop and smaller responsive viewport widths.

## AI declaration and originality

- [ ] Agree on the group's actual percentage of AI assistance.
- [ ] Include this declaration in the submission:

  > We declare that ___% of the work involves AI assistance, while the rest is our original contribution, including acknowledged sources and collaborations, per academic regulations.

- [ ] Ensure the declared percentage is truthful and does not exceed the assignment's 50% AI contribution limit for web-app prototyping, ideation, and creative content.
- [ ] Do not claim that AI completed the entire assignment.
- [ ] Record meaningful human contributions: product decisions, critical evaluation, content editing, testing, design choices, and collaboration.
- [ ] Acknowledge external sources and collaborations where applicable.

## Final Blackboard PDF package

Create one English PDF containing the following in this order:

### Cover page

- [ ] Assignment title/course information.
- [ ] Full names of all team members in English, alphabetically by surname.
- [ ] Student identity number for each teammate.
- [ ] Repository hyperlink for the version-controlled project.
- [ ] Live website hyperlink for every teammate's web application.
- [ ] Group AI declaration with the actual percentage.

### Following pages

- [ ] Include this teammate's `PRD.md`.
- [ ] Include this teammate's `tasklist.md`.
- [ ] Include every other classmate's PRD and tasklist, arranged alphabetically by family name.
- [ ] Check that all Markdown content is readable after PDF conversion.
- [ ] Check that hyperlinks remain clickable in the PDF.
- [ ] Check that no secrets, real personal data, or incomplete placeholder credentials appear in the PDF.

## Final submission gate

- [ ] Repository link opens successfully.
- [ ] Live link opens successfully in a fresh browser session.
- [ ] All team members' web apps are linked and distinct.
- [ ] PDF opens, is in English, and contains the required cover page and documents.
- [ ] AI declaration is included and truthful.
- [ ] Fictional demo data is used throughout the app and screenshots.
- [ ] Website is expected to remain online for 30 days after submission.
- [ ] Blackboard final PDF uploaded.
- [ ] Each teammate's PRD and tasklist uploaded to VeriGuide.
- [ ] Submission receipts/screenshots saved for the team's records.
