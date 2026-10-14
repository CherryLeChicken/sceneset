import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f8f6] px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <a
            href="/"
            className="text-sm font-semibold tracking-[-0.02em] text-[#4aa6c5]"
          >
            ← Back to SceneSet
          </a>
          <h1 className="mt-5 text-3xl font-semibold tracking-[-0.05em] text-[#16202b]">
            Create your SceneSet account
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#66717c]">
            Set up a workspace for the event you are bringing to life.
          </p>
        </div>
        <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" />
        <p className="mt-5 text-center text-xs leading-5 text-[#829097]">
          By continuing, you acknowledge the SceneSet{" "}
          <a href="/privacy" className="font-semibold text-[#4aa6c5] underline">
            Privacy &amp; PICS notice
          </a>
          .
        </p>
      </div>
    </main>
  );
}
