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
      </div>
    </main>
  );
}
