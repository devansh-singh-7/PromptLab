import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";

export default function ForgotPasswordPage() {
  return (
    <AuthShell pipState="encourage">
      <div className="auth-card">
        <div className="auth-card-heading">
          <span className="auth-card-kicker">Account Recovery</span>
          <h2>Reset your password</h2>
          <p>We&apos;ll help you get back to your learning track and prompt exercises.</p>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-[var(--ink-muted)] leading-relaxed">
            Enter your email on the sign-in screen or select Google authentication if you registered with Google.
          </p>

          <Link className="auth-submit" href="/login">
            Back to Sign in
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
