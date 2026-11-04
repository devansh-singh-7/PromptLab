import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";

export default function ForgotPasswordPage() {
  return (
    <AuthShell pipState="encourage">
      <div className="auth-card">
        <div className="auth-card-heading"><span className="auth-card-kicker">A small reset</span><h2>Find your way back in.</h2><p>Password recovery will use the same secure Firebase flow as login.</p></div>
        <Link className="auth-submit" href="/login">Back to log in</Link>
      </div>
    </AuthShell>
  );
}
