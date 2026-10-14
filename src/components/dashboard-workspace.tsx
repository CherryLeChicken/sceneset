"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type WorkspaceEvent = {
  id: string;
  title: string;
  date: string;
  venue: string;
  budget: number;
  progress: number;
  readiness: string;
  status: string;
};

const STORAGE_KEY = "sceneset-demo-events";

const demoEvents: WorkspaceEvent[] = [
  {
    id: "harbour-lights-market",
    title: "Harbour Lights Market",
    date: "2026-06-24",
    venue: "Pier 8 Warehouse",
    budget: 12400,
    progress: 68,
    readiness: "On track",
    status: "Run-sheet active",
  },
  {
    id: "northline-showcase",
    title: "Northline Student Showcase",
    date: "2026-08-15",
    venue: "The Lantern Hall",
    budget: 6800,
    progress: 42,
    readiness: "Planning",
    status: "Brief in progress",
  },
  {
    id: "paper-lantern-popup",
    title: "Paper Lantern Pop-up",
    date: "2026-09-05",
    venue: "Cedar Street Courtyard",
    budget: 4200,
    progress: 24,
    readiness: "Needs attention",
    status: "Supplier shortlist due",
  },
];

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00`));
}

function formatBudget(value: number) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function DashboardWorkspace() {
  const [events, setEvents] = useState<WorkspaceEvent[]>(demoEvents);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [budget, setBudget] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedEvents = window.localStorage.getItem(STORAGE_KEY);
      if (savedEvents) {
        const parsedEvents = JSON.parse(savedEvents) as WorkspaceEvent[];
        if (Array.isArray(parsedEvents)) setEvents(parsedEvents);
      }
    } catch {
      // Keep the fictional starter events if browser storage is unavailable.
    }
  }, []);

  const nextEvent = useMemo(
    () => [...events].sort((a, b) => a.date.localeCompare(b.date))[0],
    [events],
  );

  function handleCreateEvent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);
    setSuccessMessage(null);

    const budgetValue = Number(budget);
    if (!title.trim() || !date || !venue.trim() || !Number.isFinite(budgetValue) || budgetValue < 0) {
      setFormError("Add an event name, date, venue, and a budget of $0 or more.");
      return;
    }

    const newEvent: WorkspaceEvent = {
      id: `demo-${Date.now()}`,
      title: title.trim(),
      date,
      venue: venue.trim(),
      budget: budgetValue,
      progress: 12,
      readiness: "Planning",
      status: "Brief started",
    };
    const nextEvents = [newEvent, ...events];
    setEvents(nextEvents);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextEvents));
    setTitle("");
    setDate("");
    setVenue("");
    setBudget("");
    setSuccessMessage(`${newEvent.title} was added to your workspace.`);
  }

  return (
    <div className="space-y-8">
      <section aria-labelledby="workspace-overview-heading" className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-[#16202b] p-5 text-white">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#a7e8ff]">Events</p>
          <p className="mt-3 text-3xl font-semibold tracking-[-0.06em]">{events.length}</p>
          <p className="mt-1 text-sm text-white/60">Across this workspace</p>
        </div>
        <div className="rounded-2xl border border-[#e8edeb] bg-[#f4f8f7] p-5">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#5e6d72]">Next up</p>
          <p className="mt-3 truncate text-lg font-bold tracking-[-0.03em]">{nextEvent?.title ?? "No events yet"}</p>
          <p className="mt-1 text-sm text-[#56666f]">{nextEvent ? formatDate(nextEvent.date) : "Create your first brief"}</p>
        </div>
        <div className="rounded-2xl border border-[#e8edeb] bg-white p-5">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#5e6d72]">Readiness</p>
          <p className="mt-3 text-lg font-bold tracking-[-0.03em]">Keep the room moving</p>
          <p className="mt-1 text-sm text-[#56666f]">Review each event&apos;s next action.</p>
        </div>
      </section>

      <section aria-labelledby="workspace-overview-heading">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#267995]">Your events</p>
            <h2 id="workspace-overview-heading" className="mt-2 text-2xl font-semibold tracking-[-0.05em]">
              Keep every production in view.
            </h2>
          </div>
          <p className="text-sm text-[#56666f]">Fictional demo workspace</p>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {events.map((workspaceEvent) => (
            <article key={workspaceEvent.id} className="rounded-3xl border border-[#e1e8e5] bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#267995]">Event brief</p>
                  <h3 className="mt-3 text-xl font-bold leading-tight tracking-[-0.04em]">{workspaceEvent.title}</h3>
                </div>
                <span className="shrink-0 rounded-full bg-[#e6f8ef] px-3 py-1.5 text-xs font-bold text-[#267a55]">
                  {workspaceEvent.readiness}
                </span>
              </div>
              <dl className="mt-6 grid gap-4 border-y border-[#edf0ef] py-5 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-[#5e6d72]">Date</dt>
                  <dd className="font-semibold text-[#16202b]">{formatDate(workspaceEvent.date)}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-[#5e6d72]">Venue</dt>
                  <dd className="max-w-[12rem] truncate text-right font-semibold text-[#16202b]">{workspaceEvent.venue}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-[#5e6d72]">Budget cap</dt>
                  <dd className="font-semibold text-[#16202b]">{formatBudget(workspaceEvent.budget)}</dd>
                </div>
              </dl>
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-[#5e6d72]">Readiness</span>
                  <span className="text-[#267995]">{workspaceEvent.progress}%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-[#e6efec]" role="progressbar" aria-label={`${workspaceEvent.title} readiness`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={workspaceEvent.progress}>
                  <div className="h-full rounded-full bg-[#267995]" style={{ width: `${workspaceEvent.progress}%` }} />
                </div>
                <p className="mt-3 text-xs text-[#56666f]">Next: {workspaceEvent.status}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="create-event-heading" className="rounded-3xl border border-[#dce9e5] bg-[#eef8f4] p-6 sm:p-8">
        <div className="max-w-xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#267995]">New event</p>
          <h2 id="create-event-heading" className="mt-2 text-2xl font-semibold tracking-[-0.05em]">Start a fictional event brief.</h2>
          <p className="mt-3 text-sm leading-6 text-[#56666f]">Use sample details only. This first-pass form saves the card locally so you can refresh and see the workspace state.</p>
        </div>
        <form className="mt-7 grid gap-5 md:grid-cols-2" onSubmit={handleCreateEvent} noValidate>
          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-[#16202b]" htmlFor="event-title">Event name</label>
            <input id="event-title" name="title" required value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. Summer Studio Night" className="mt-2 w-full rounded-xl border border-[#cbd9d7] bg-white px-4 py-3 text-sm outline-none ring-[#267995] placeholder:text-[#7b8a91] focus:ring-2" />
          </div>
          <div>
            <label className="text-sm font-semibold text-[#16202b]" htmlFor="event-date">Event date</label>
            <input id="event-date" name="date" type="date" required value={date} onChange={(event) => setDate(event.target.value)} className="mt-2 w-full rounded-xl border border-[#cbd9d7] bg-white px-4 py-3 text-sm outline-none ring-[#267995] focus:ring-2" />
          </div>
          <div>
            <label className="text-sm font-semibold text-[#16202b]" htmlFor="event-budget">Budget cap (AUD)</label>
            <input id="event-budget" name="budget" type="number" min="0" step="100" required value={budget} onChange={(event) => setBudget(event.target.value)} placeholder="5000" className="mt-2 w-full rounded-xl border border-[#cbd9d7] bg-white px-4 py-3 text-sm outline-none ring-[#267995] placeholder:text-[#7b8a91] focus:ring-2" />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-[#16202b]" htmlFor="event-venue">Venue</label>
            <input id="event-venue" name="venue" required value={venue} onChange={(event) => setVenue(event.target.value)} placeholder="e.g. The Lantern Hall" className="mt-2 w-full rounded-xl border border-[#cbd9d7] bg-white px-4 py-3 text-sm outline-none ring-[#267995] placeholder:text-[#7b8a91] focus:ring-2" />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center md:col-span-2">
            <button type="submit" className="rounded-full bg-[#16202b] px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 focus:outline-2 focus:outline-offset-2 focus:outline-[#267995]">Create event</button>
            <p aria-live="polite" role={formError ? "alert" : "status"} className={`text-sm ${formError ? "font-semibold text-[#a3443d]" : "text-[#267a55]"}`}>{formError ?? successMessage}</p>
          </div>
        </form>
      </section>
    </div>
  );
}
