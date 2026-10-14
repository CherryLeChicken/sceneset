import { EventBannerUpload } from "@/components/event-banner-upload";
import { DashboardWorkspace } from "@/components/dashboard-workspace";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#f7f8f6] px-6 py-16 text-[#16202b]">
      <div className="mx-auto max-w-7xl rounded-3xl border border-[#e1e8e5] bg-white p-6 shadow-sm sm:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#4aa6c5]">
          SceneSet workspace
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.06em]">
          Your events, in one clear view.
        </h1>
        <p className="mt-5 max-w-2xl leading-7 text-[#66717c]">
          Keep dates, venues, budgets, and the next practical action visible while each event
          moves from first brief to final applause.
        </p>
        <div className="mt-10 border-t border-[#e8edeb] pt-10">
          <DashboardWorkspace />
        </div>
        <section className="mt-10 border-t border-[#e8edeb] pt-8" aria-labelledby="banner-heading">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#4aa6c5]">
            Event media
          </p>
          <h2 id="banner-heading" className="mt-3 text-2xl font-semibold tracking-[-0.04em]">
            Add an event banner
          </h2>
          <p className="mt-3 mb-6 max-w-xl text-sm leading-6 text-[#71808a]">
            Upload a wide image to give your workspace an event-ready header.
          </p>
          <EventBannerUpload />
        </section>
      </div>
    </main>
  );
}
