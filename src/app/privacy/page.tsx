import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy & PICS | SceneSet",
  description: "SceneSet's privacy and personal information collection notice for the prototype.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#f7f8f6] px-6 py-16 text-[#16202b]">
      <article className="mx-auto max-w-3xl rounded-3xl border border-[#e1e8e5] bg-white p-8 shadow-sm sm:p-12">
        <a href="/" className="text-sm font-semibold text-[#267995]">
          ← Back to SceneSet
        </a>
        <p className="mt-10 text-xs font-bold uppercase tracking-[0.18em] text-[#267995]">
          Privacy &amp; Personal Information Collection Statement
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.06em]">Your planning data, handled carefully.</h1>
        <div className="mt-8 space-y-5 leading-7 text-[#66717c]">
          <p>
            SceneSet is a fictional event-planning product prototype for demonstration. Use only
            fictional guest, supplier, and event information in this prototype.
          </p>
          <p>
            Account information is used to provide sign-in, workspace access, and event-planning
            features. We do not ask prototype users to submit real sensitive personal information.
          </p>
          <p>
            You may request correction or deletion of prototype account information through the
            project administrator. Continuing to use the prototype confirms that you have read
            this notice.
          </p>
          <p>
            For the rules that apply to prototype use, read the{" "}
            <a className="font-semibold text-[#267995] underline" href="/terms">
              Terms of use
            </a>
            .
          </p>
        </div>
      </article>
    </main>
  );
}
