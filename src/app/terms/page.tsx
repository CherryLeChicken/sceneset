import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms | SceneSet",
  description: "The terms for using the SceneSet event-planning prototype.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#f7f8f6] px-6 py-16 text-[#16202b]">
      <article className="mx-auto max-w-3xl rounded-3xl border border-[#e1e8e5] bg-white p-8 shadow-sm sm:p-12">
        <a href="/" className="text-sm font-semibold text-[#267995]">
          ← Back to SceneSet
        </a>
        <p className="mt-10 text-xs font-bold uppercase tracking-[0.18em] text-[#267995]">
          Terms of use
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.06em]">
          A clear agreement for a clear workspace.
        </h1>
        <div className="mt-8 space-y-7 leading-7 text-[#66717c]">
          <section aria-labelledby="prototype-use">
            <h2 id="prototype-use" className="text-xl font-bold tracking-[-0.03em] text-[#16202b]">
              Prototype use
            </h2>
            <p className="mt-3">
              SceneSet is a fictional event-planning prototype. Use it for coursework,
              demonstrations, and fictional event operations only. Do not upload sensitive or
              confidential information.
            </p>
          </section>
          <section aria-labelledby="your-content">
            <h2 id="your-content" className="text-xl font-bold tracking-[-0.03em] text-[#16202b]">
              Your content
            </h2>
            <p className="mt-3">
              You are responsible for the event details, images, guest information, and supplier
              content you choose to add. You confirm that you have permission to use uploaded
              images and that they do not infringe another person&apos;s rights.
            </p>
          </section>
          <section aria-labelledby="availability">
            <h2 id="availability" className="text-xl font-bold tracking-[-0.03em] text-[#16202b]">
              Availability and changes
            </h2>
            <p className="mt-3">
              The prototype is provided for evaluation and may change, pause, or be retired as
              development continues. Features may be incomplete and should not be relied on for
              live-event safety, legal, financial, or operational decisions.
            </p>
          </section>
          <section aria-labelledby="contact">
            <h2 id="contact" className="text-xl font-bold tracking-[-0.03em] text-[#16202b]">
              Contact
            </h2>
            <p className="mt-3">
              Questions about these terms can be sent to{" "}
              <a className="font-semibold text-[#267995] underline" href="mailto:hello@sceneset.app">
                hello@sceneset.app
              </a>
              . Read the <a className="font-semibold text-[#267995] underline" href="/privacy">Privacy &amp; PICS notice</a> for information about prototype data.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
