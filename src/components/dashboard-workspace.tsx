"use client";

import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";

import {
  createEvent,
  deleteEvent,
  listWorkspaceEvents,
  updateEvent,
} from "@/app/dashboard/actions";
import type { SerializedEvent } from "@/app/dashboard/actions";

type WorkspaceEvent = SerializedEvent | DemoEvent;

type DemoEvent = {
  id: string;
  title: string;
  date: string;
  endDate?: string;
  venue: string;
  budget: number;
  description?: string;
  bannerUrl?: string;
  progress: number;
  readiness: string;
  status: string;
  persisted?: false;
};

const STORAGE_KEY = "sceneset-demo-events";
const demoEvents: DemoEvent[] = [
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

function nextDay(value: string) {
  const date = new Date(`${value}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + 1);
  return date.toISOString().slice(0, 10);
}

function saveLocalEvents(events: WorkspaceEvent[]) {
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(events.filter((event) => !event.persisted)),
  );
}

export function DashboardWorkspace() {
  const [events, setEvents] = useState<WorkspaceEvent[]>(demoEvents);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [venue, setVenue] = useState("");
  const [budget, setBudget] = useState("");
  const [description, setDescription] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editEndDate, setEditEndDate] = useState("");
  const [editVenue, setEditVenue] = useState("");
  const [editBudget, setEditBudget] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editBannerUrl, setEditBannerUrl] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let localEvents: WorkspaceEvent[] = demoEvents;
    try {
      const savedEvents = window.localStorage.getItem(STORAGE_KEY);
      if (savedEvents) {
        const parsedEvents = JSON.parse(savedEvents) as DemoEvent[];
        if (Array.isArray(parsedEvents)) {
          localEvents = parsedEvents.filter((event) => !event.persisted);
        }
      }
    } catch {
      // Keep the fictional starter events if browser storage is unavailable.
    }

    void listWorkspaceEvents().then((result) => {
      if (result.ok) {
        setEvents([...result.data, ...localEvents]);
      }
    });
  }, []);

  const nextEvent = useMemo(
    () => [...events].sort((a, b) => a.date.localeCompare(b.date))[0],
    [events],
  );

  function startEditing(event: WorkspaceEvent) {
    if (!event.persisted) return;
    setEditingId(event.id);
    setEditTitle(event.title);
    setEditDate(event.date);
    setEditEndDate(event.endDate);
    setEditVenue(event.venue);
    setEditBudget(String(event.budget));
    setEditDescription(event.description);
    setEditBannerUrl(event.bannerUrl);
    setFormError(null);
    setSuccessMessage(null);
  }

  async function handleCreateEvent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);
    setSuccessMessage(null);
    setIsSaving(true);

    const result = await createEvent({
      title,
      description,
      startDate: date,
      endDate: endDate || (date ? nextDay(date) : ""),
      venue,
      budgetCap: budget,
      bannerUrl,
    });

    setIsSaving(false);
    if (!result.ok) {
      setFormError(result.error);
      return;
    }

    const nextEvents = [result.data, ...events];
    setEvents(nextEvents);
    saveLocalEvents(nextEvents);
    setTitle("");
    setDate("");
    setEndDate("");
    setVenue("");
    setBudget("");
    setDescription("");
    setBannerUrl("");
    setSuccessMessage(`${result.data.title} was created in your workspace.`);
  }

  async function handleUpdateEvent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editingId) return;

    setFormError(null);
    setSuccessMessage(null);
    setIsSaving(true);
    const result = await updateEvent(editingId, {
      title: editTitle,
      description: editDescription,
      startDate: editDate,
      endDate: editEndDate || (editDate ? nextDay(editDate) : ""),
      venue: editVenue,
      budgetCap: editBudget,
      bannerUrl: editBannerUrl,
    });
    setIsSaving(false);

    if (!result.ok) {
      setFormError(result.error);
      return;
    }

    const nextEvents = events.map((eventItem) =>
      eventItem.id === result.data.id ? result.data : eventItem,
    );
    setEvents(nextEvents);
    saveLocalEvents(nextEvents);
    setEditingId(null);
    setSuccessMessage(`${result.data.title} was updated.`);
  }

  async function handleDeleteEvent(event: WorkspaceEvent) {
    if (!event.persisted || !window.confirm(`Delete ${event.title}?`)) return;

    setFormError(null);
    setSuccessMessage(null);
    setIsSaving(true);
    const result = await deleteEvent(event.id);
    setIsSaving(false);

    if (!result.ok) {
      setFormError(result.error);
      return;
    }

    const nextEvents = events.filter((eventItem) => eventItem.id !== event.id);
    setEvents(nextEvents);
    saveLocalEvents(nextEvents);
    if (editingId === event.id) setEditingId(null);
    setSuccessMessage(`${event.title} was deleted.`);
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
              {workspaceEvent.persisted && (
                <div className="mt-5 flex gap-3 border-t border-[#edf0ef] pt-4">
                  <button type="button" onClick={() => startEditing(workspaceEvent)} disabled={isSaving} className="rounded-full border border-[#b7cbc7] px-4 py-2 text-xs font-bold text-[#267995] hover:bg-[#f1faf7] disabled:opacity-50">
                    Edit event
                  </button>
                  <button type="button" onClick={() => void handleDeleteEvent(workspaceEvent)} disabled={isSaving} className="rounded-full border border-[#e8c7c4] px-4 py-2 text-xs font-bold text-[#a3443d] hover:bg-[#fff6f5] disabled:opacity-50">
                    Delete
                  </button>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      {editingId && (
        <section aria-labelledby="edit-event-heading" className="rounded-3xl border border-[#b9deda] bg-[#f2fbf8] p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#267995]">Event settings</p>
          <h2 id="edit-event-heading" className="mt-2 text-2xl font-semibold tracking-[-0.05em]">Edit this event brief.</h2>
          <form className="mt-7 grid gap-5 md:grid-cols-2" onSubmit={(event) => void handleUpdateEvent(event)} noValidate>
            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-[#16202b]" htmlFor="edit-event-title">Event name</label>
              <input id="edit-event-title" required value={editTitle} onChange={(event) => setEditTitle(event.target.value)} className="mt-2 w-full rounded-xl border border-[#cbd9d7] bg-white px-4 py-3 text-sm outline-none ring-[#267995] focus:ring-2" />
            </div>
            <div>
              <label className="text-sm font-semibold text-[#16202b]" htmlFor="edit-event-start-date">Start date</label>
              <input id="edit-event-start-date" type="date" required value={editDate} onChange={(event) => setEditDate(event.target.value)} className="mt-2 w-full rounded-xl border border-[#cbd9d7] bg-white px-4 py-3 text-sm outline-none ring-[#267995] focus:ring-2" />
            </div>
            <div>
              <label className="text-sm font-semibold text-[#16202b]" htmlFor="edit-event-end-date">End date</label>
              <input id="edit-event-end-date" type="date" required value={editEndDate} onChange={(event) => setEditEndDate(event.target.value)} className="mt-2 w-full rounded-xl border border-[#cbd9d7] bg-white px-4 py-3 text-sm outline-none ring-[#267995] focus:ring-2" />
            </div>
            <div>
              <label className="text-sm font-semibold text-[#16202b]" htmlFor="edit-event-budget">Budget cap (AUD)</label>
              <input id="edit-event-budget" type="number" min="0" step="100" required value={editBudget} onChange={(event) => setEditBudget(event.target.value)} className="mt-2 w-full rounded-xl border border-[#cbd9d7] bg-white px-4 py-3 text-sm outline-none ring-[#267995] focus:ring-2" />
            </div>
            <div>
              <label className="text-sm font-semibold text-[#16202b]" htmlFor="edit-event-venue">Venue</label>
              <input id="edit-event-venue" required value={editVenue} onChange={(event) => setEditVenue(event.target.value)} className="mt-2 w-full rounded-xl border border-[#cbd9d7] bg-white px-4 py-3 text-sm outline-none ring-[#267995] focus:ring-2" />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-[#16202b]" htmlFor="edit-event-description">Description</label>
              <textarea id="edit-event-description" rows={3} value={editDescription} onChange={(event) => setEditDescription(event.target.value)} className="mt-2 w-full rounded-xl border border-[#cbd9d7] bg-white px-4 py-3 text-sm outline-none ring-[#267995] focus:ring-2" />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-[#16202b]" htmlFor="edit-event-banner">Banner URL</label>
              <input id="edit-event-banner" type="url" value={editBannerUrl} onChange={(event) => setEditBannerUrl(event.target.value)} placeholder="https://cdn.example.com/banner.jpg" className="mt-2 w-full rounded-xl border border-[#cbd9d7] bg-white px-4 py-3 text-sm outline-none ring-[#267995] placeholder:text-[#7b8a91] focus:ring-2" />
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center md:col-span-2">
              <button type="submit" disabled={isSaving} className="rounded-full bg-[#16202b] px-6 py-3 text-sm font-semibold text-white disabled:opacity-60">{isSaving ? "Saving…" : "Save changes"}</button>
              <button type="button" onClick={() => setEditingId(null)} className="rounded-full border border-[#b7cbc7] px-6 py-3 text-sm font-semibold text-[#267995]">Cancel</button>
            </div>
          </form>
        </section>
      )}

      <section aria-labelledby="create-event-heading" className="rounded-3xl border border-[#dce9e5] bg-[#eef8f4] p-6 sm:p-8">
        <div className="max-w-xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#267995]">New event</p>
          <h2 id="create-event-heading" className="mt-2 text-2xl font-semibold tracking-[-0.05em]">Start a fictional event brief.</h2>
          <p className="mt-3 text-sm leading-6 text-[#56666f]">Use sample details only. New event briefs are validated on the server and saved to the authenticated workspace.</p>
        </div>
        <form className="mt-7 grid gap-5 md:grid-cols-2" onSubmit={(event) => void handleCreateEvent(event)} noValidate>
          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-[#16202b]" htmlFor="event-title">Event name</label>
            <input id="event-title" name="title" required value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. Summer Studio Night" className="mt-2 w-full rounded-xl border border-[#cbd9d7] bg-white px-4 py-3 text-sm outline-none ring-[#267995] placeholder:text-[#7b8a91] focus:ring-2" />
          </div>
          <div>
            <label className="text-sm font-semibold text-[#16202b]" htmlFor="event-date">Start date</label>
            <input id="event-date" name="startDate" type="date" required value={date} onChange={(event) => setDate(event.target.value)} className="mt-2 w-full rounded-xl border border-[#cbd9d7] bg-white px-4 py-3 text-sm outline-none ring-[#267995] focus:ring-2" />
          </div>
          <div>
            <label className="text-sm font-semibold text-[#16202b]" htmlFor="event-end-date">End date</label>
            <input id="event-end-date" name="endDate" type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} className="mt-2 w-full rounded-xl border border-[#cbd9d7] bg-white px-4 py-3 text-sm outline-none ring-[#267995] focus:ring-2" />
          </div>
          <div>
            <label className="text-sm font-semibold text-[#16202b]" htmlFor="event-budget">Budget cap (AUD)</label>
            <input id="event-budget" name="budget" type="number" min="0" step="100" required value={budget} onChange={(event) => setBudget(event.target.value)} placeholder="5000" className="mt-2 w-full rounded-xl border border-[#cbd9d7] bg-white px-4 py-3 text-sm outline-none ring-[#267995] placeholder:text-[#7b8a91] focus:ring-2" />
          </div>
          <div>
            <label className="text-sm font-semibold text-[#16202b]" htmlFor="event-venue">Venue</label>
            <input id="event-venue" name="venue" required value={venue} onChange={(event) => setVenue(event.target.value)} placeholder="e.g. The Lantern Hall" className="mt-2 w-full rounded-xl border border-[#cbd9d7] bg-white px-4 py-3 text-sm outline-none ring-[#267995] placeholder:text-[#7b8a91] focus:ring-2" />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-[#16202b]" htmlFor="event-description">Description</label>
            <textarea id="event-description" name="description" rows={3} value={description} onChange={(event) => setDescription(event.target.value)} placeholder="What is this event bringing to life?" className="mt-2 w-full rounded-xl border border-[#cbd9d7] bg-white px-4 py-3 text-sm outline-none ring-[#267995] placeholder:text-[#7b8a91] focus:ring-2" />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-[#16202b]" htmlFor="event-banner-url">Banner URL (optional)</label>
            <input id="event-banner-url" name="bannerUrl" type="url" value={bannerUrl} onChange={(event) => setBannerUrl(event.target.value)} placeholder="Paste an ImageKit CDN URL after uploading" className="mt-2 w-full rounded-xl border border-[#cbd9d7] bg-white px-4 py-3 text-sm outline-none ring-[#267995] placeholder:text-[#7b8a91] focus:ring-2" />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center md:col-span-2">
            <button type="submit" disabled={isSaving} className="rounded-full bg-[#16202b] px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 focus:outline-2 focus:outline-offset-2 focus:outline-[#267995] disabled:cursor-wait disabled:opacity-60">{isSaving ? "Saving…" : "Create event"}</button>
            <p aria-live="polite" role={formError ? "alert" : "status"} className={`text-sm ${formError ? "font-semibold text-[#a3443d]" : "text-[#267a55]"}`}>{formError ?? successMessage}</p>
          </div>
        </form>
      </section>
    </div>
  );
}
