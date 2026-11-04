import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";

export default function SignupPage() {
  return (
    <AuthShell pipState="cheer">
      <div className="auth-card">
        <div className="auth-card-heading">
          <span className="auth-card-kicker">Join PromptLab</span>
          <h2>Create your account</h2>
          <p>Start learning prompt engineering through hands-on, practical software challenges.</p>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-[var(--ink-muted)] leading-relaxed">
            Ready to build? You can sign in directly or connect your developer account.
          </p>

          <Link className="auth-submit" href="/login">
            Continue to Sign in
          </Link>

          <div className="text-center pt-2">
            <Link href="/" className="text-xs font-bold text-[var(--ink-muted)] hover:text-[var(--brand)]">
              ← Return to homepage
            </Link>
          </div>
        </div>
      </div>
    </AuthShell>
  );
}
