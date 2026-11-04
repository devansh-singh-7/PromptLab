import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";

export default function SignupPage() {
  return (
    <AuthShell>
      <div className="auth-card">
        <div className="auth-card-heading"><span className="auth-card-kicker">Make room for ideas</span><h2>Create your lab account.</h2><p>Signup will use the same friendly form language as login.</p></div>
        <Link className="auth-submit" href="/login">Back to log in</Link>
      </div>
    </AuthShell>
  );
}
