import Link from "next/link";

const features = [
  {
    number: "01",
    title: "One calm command centre",
    body: "Keep briefs, budgets, suppliers and people in one workspace instead of chasing updates across scattered tools.",
    accent: "bg-sky-100 text-sky-700",
  },
  {
    number: "02",
    title: "Plans that move with you",
    body: "Build a living run-sheet, assign the next action and see what needs attention before doors open.",
    accent: "bg-amber-100 text-amber-700",
  },
  {
    number: "03",
    title: "The details, handled",
    body: "Track costs, contracts and RSVPs with the context your team needs to make confident calls quickly.",
    accent: "bg-rose-100 text-rose-700",
  },
];

const workflow = [
  ["01", "Shape the brief", "Create an event workspace with dates, venue and a clear budget cap."],
  ["02", "Bring in the team", "Assign owners, share the run-sheet and keep every moving part visible."],
  ["03", "Make it happen", "Run the room with live tasks, supplier notes and guest updates at hand."],
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f8f6] text-[#16202b]">
      <nav aria-label="Primary navigation" className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <a href="#top" className="flex items-center gap-3" aria-label="SceneSet home">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#16202b] shadow-sm">
            <span className="h-5 w-5 rounded-full border-[3px] border-[#a7e8ff] border-b-transparent" />
          </span>
          <span className="text-xl font-bold tracking-[-0.04em]">SceneSet</span>
        </a>
        <div className="hidden items-center gap-8 text-sm font-medium text-[#66717c] md:flex">
          <a className="transition-colors hover:text-[#16202b]" href="#why">Why SceneSet</a>
          <a className="transition-colors hover:text-[#16202b]" href="#workflow">How it works</a>
          <a className="transition-colors hover:text-[#16202b]" href="#pricing">Pricing</a>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/sign-in" className="hidden rounded-full px-4 py-3 text-sm font-semibold text-[#4d5d68] transition-colors hover:bg-white focus:outline-2 focus:outline-offset-2 focus:outline-sky-500 sm:inline-flex">
            Sign in
          </Link>
          <Link href="/sign-up" className="rounded-full bg-[#16202b] px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 focus:outline-2 focus:outline-offset-2 focus:outline-sky-500">
            Get started <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </nav>

      <section id="top" className="mx-auto grid max-w-7xl gap-14 px-6 pb-24 pt-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:px-10 lg:pb-32 lg:pt-20">
        <div>
          <p className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#dce3e4] bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#62717a]">
            <span className="h-2 w-2 rounded-full bg-[#65d5a4]" /> Event operations, in rhythm
          </p>
          <h1 className="max-w-2xl text-5xl font-semibold leading-[0.98] tracking-[-0.07em] text-[#16202b] sm:text-6xl lg:text-[5.55rem]">
            Make every moving part feel <span className="text-[#267995]">easy.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-[#66717c] sm:text-xl">
            SceneSet gives independent producers and growing teams a clear, collaborative space to plan the work, run the day and bring the room to life.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link href="/sign-up" className="inline-flex items-center justify-center rounded-full bg-[#16202b] px-7 py-4 font-semibold text-white shadow-lg shadow-slate-900/10 transition-transform hover:-translate-y-1 focus:outline-2 focus:outline-offset-2 focus:outline-sky-500">
              Start planning for free <span className="ml-3 text-[#a7e8ff]" aria-hidden="true">→</span>
            </Link>
            <a href="#workflow" className="inline-flex items-center justify-center rounded-full px-5 py-4 font-semibold text-[#4d5d68] transition-colors hover:bg-white focus:outline-2 focus:outline-offset-2 focus:outline-sky-500">
              See how it works <span className="ml-2" aria-hidden="true">↓</span>
            </a>
          </div>
          <p className="mt-6 text-xs font-medium text-[#5f6d75]">Free for your first workspace · No credit card required</p>
        </div>

        <div className="relative mx-auto w-full max-w-[590px]">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#f9d77e]/60 blur-2xl" />
          <div className="absolute -bottom-10 -left-8 h-36 w-36 rounded-full bg-[#bcefff]/80 blur-2xl" />
          <div className="relative rounded-[2rem] border border-white bg-white p-4 shadow-[0_30px_80px_rgba(31,48,61,0.14)] sm:p-6">
            <div className="mb-5 flex items-center justify-between border-b border-[#edf0ef] pb-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#63747c]">Today · 24 Jun</p>
                <h2 className="mt-1 text-xl font-bold tracking-[-0.04em]">Harbour Lights Market</h2>
              </div>
              <span className="rounded-full bg-[#e6f8ef] px-3 py-1.5 text-xs font-bold text-[#267a55]">On track</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-2xl bg-[#f4f8f7] p-5">
                <div className="flex items-center justify-between"><span className="text-xs font-bold uppercase tracking-[0.14em] text-[#5e6d72]">Run-sheet</span><span className="text-xs font-bold text-[#267995]">Today</span></div>
                <div className="mt-6 space-y-5">
                  {[["09:00", "Vendor load-in", "Nadia"], ["11:30", "Sound check", "AV crew"], ["13:00", "Doors open", "Sam"]].map(([time, item, owner], index) => (
                    <div className="flex gap-3" key={item}>
                      <span className="w-11 pt-0.5 text-[10px] font-bold text-[#63737a]">{time}</span>
                      <div className="relative flex-1 border-l border-[#cbdcda] pl-4"><span className={`absolute -left-[5px] top-1 h-2 w-2 rounded-full ${index === 1 ? "bg-[#f4be45]" : "bg-[#68cda1]"}`} /><p className="text-sm font-bold">{item}</p><p className="mt-1 text-xs text-[#5f7075]">Owner · {owner}</p></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <div className="rounded-2xl bg-[#16202b] p-5 text-white"><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#a7e8ff]">Budget used</p><p className="mt-3 text-3xl font-semibold tracking-[-0.06em]">$8,420</p><div className="mt-5 h-2 rounded-full bg-white/15"><div className="h-2 w-[68%] rounded-full bg-[#a7e8ff]" /></div><p className="mt-2 text-xs text-white/50">68% of $12,400 cap</p></div>
                <div className="rounded-2xl border border-[#e8edeb] bg-white p-5"><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#63747c]">Open tasks</p><p className="mt-2 text-3xl font-semibold tracking-[-0.06em]">12 <span className="text-sm font-medium text-[#63747c]">/ 38</span></p><div className="mt-4 flex -space-x-2"><span className="grid h-7 w-7 place-items-center rounded-full border-2 border-white bg-[#f9d77e] text-[10px] font-bold">N</span><span className="grid h-7 w-7 place-items-center rounded-full border-2 border-white bg-[#bcefff] text-[10px] font-bold">S</span><span className="grid h-7 w-7 place-items-center rounded-full border-2 border-white bg-[#f5b7b7] text-[10px] font-bold">J</span><span className="grid h-7 w-7 place-items-center rounded-full border-2 border-white bg-[#edf0ef] text-[10px] font-bold">+4</span></div></div>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-3 rounded-2xl border border-dashed border-[#cbd9d7] p-4"><span className="grid h-8 w-8 place-items-center rounded-full bg-[#e6f8ef] text-[#267a55]">✓</span><p className="text-sm text-[#66717c]"><strong className="text-[#16202b]">Nice work.</strong> Your supplier confirmations are 92% complete.</p></div>
          </div>
        </div>
      </section>

      <section id="why" className="border-y border-[#e6ebe9] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24"><div className="mb-12 max-w-xl"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#267995]">Less scramble, more scene</p><h2 className="mt-4 text-3xl font-semibold tracking-[-0.06em] sm:text-4xl">The good kind of busy.</h2></div><div className="grid gap-5 md:grid-cols-3">{features.map((feature) => <article className="rounded-3xl border border-[#e8edeb] p-7" key={feature.number}><span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${feature.accent}`}>{feature.number}</span><h3 className="mt-16 text-xl font-bold tracking-[-0.04em]">{feature.title}</h3><p className="mt-4 leading-7 text-[#56666f]">{feature.body}</p></article>)}</div></div>
      </section>

      <section id="workflow" className="mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-10 lg:py-28"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#267995]">A clearer way forward</p><h2 className="mt-4 max-w-md text-4xl font-semibold leading-tight tracking-[-0.06em]">From first idea to final applause.</h2><p className="mt-6 max-w-md leading-7 text-[#56666f]">Whether you are producing a pop-up, a student showcase or a client activation, SceneSet helps everyone know what matters next.</p></div><div className="space-y-0">{workflow.map(([number, title, body]) => <div className="flex gap-6 border-t border-[#dfe7e4] py-7" key={number}><span className="pt-1 text-sm font-bold text-[#267995]">{number}</span><div><h3 className="text-xl font-bold tracking-[-0.03em]">{title}</h3><p className="mt-2 max-w-lg leading-7 text-[#56666f]">{body}</p></div></div>)}</div></section>

      <section id="pricing" className="mx-6 mb-8 overflow-hidden rounded-[2rem] bg-[#16202b] px-7 py-14 text-white sm:px-12 lg:mx-auto lg:max-w-7xl lg:px-20 lg:py-20"><div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a7e8ff]">Start with the essentials</p><h2 className="mt-4 max-w-xl text-4xl font-semibold leading-tight tracking-[-0.06em] sm:text-5xl">Your next event deserves a better backstage.</h2><p className="mt-6 max-w-lg leading-7 text-white/60">Create your first workspace free. When your production grows, SceneSet grows with you.</p></div><a href="mailto:hello@sceneset.app?subject=SceneSet%20early%20access" className="inline-flex items-center justify-center rounded-full bg-[#a7e8ff] px-7 py-4 font-bold text-[#16202b] transition-transform hover:-translate-y-1 focus:outline-2 focus:outline-offset-2 focus:outline-sky-300">Get early access <span className="ml-3" aria-hidden="true">↗</span></a></div></section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-[#5b6a72] sm:flex-row sm:items-center sm:justify-between lg:px-10"><p>© 2026 SceneSet. Make space for good work.</p><nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-2"><a className="hover:text-[#16202b]" href="#why">Features</a><a className="hover:text-[#16202b]" href="#pricing">Pricing</a><a className="hover:text-[#16202b]" href="/privacy">Privacy &amp; PICS</a><a className="hover:text-[#16202b]" href="/terms">Terms</a><a className="hover:text-[#16202b]" href="mailto:hello@sceneset.app">Contact</a></nav></footer>
    </main>
  );
}
