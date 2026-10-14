import { EventBannerUpload } from "@/components/event-banner-upload";

export default function DashboardPlaceholder() {
  return (
    <main className="min-h-screen bg-[#f7f8f6] px-6 py-16 text-[#16202b]">
      <div className="mx-auto max-w-3xl rounded-3xl border border-[#e1e8e5] bg-white p-10 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#4aa6c5]">
          SceneSet workspace
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.06em]">
          Your event workspace is ready for setup.
        </h1>
        <p className="mt-5 max-w-xl leading-7 text-[#66717c]">
          The planning dashboard will be assembled here as the event workspace features are
          completed.
        </p>
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
