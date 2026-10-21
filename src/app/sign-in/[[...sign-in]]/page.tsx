import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f8f6] px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="text-sm font-semibold tracking-[-0.02em] text-[#4aa6c5]"
          >
            ← Back to SceneSet
          </Link>
          <h1 className="mt-5 text-3xl font-semibold tracking-[-0.05em] text-[#16202b]">
            Sign in to your workspace
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#66717c]">
            Pick up where your event planning left off.
          </p>
        </div>
        <SignIn
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          fallbackRedirectUrl="/dashboard"
        />
        <p className="mt-5 text-center text-xs leading-5 text-[#829097]">
          By continuing, you acknowledge the SceneSet{" "}
          <Link href="/privacy" className="font-semibold text-[#4aa6c5] underline">
            Privacy &amp; PICS notice
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
