import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="auth-page" style={{ display: "block", minHeight: "100svh", padding: "8rem 2rem", textAlign: "center" }}>
      <div className="auth-card" style={{ margin: "0 auto" }}>
        <span className="auth-card-kicker">You’re in</span>
        <h1 className="auth-card-heading h2">Your PromptLab dashboard is ready.</h1>
        <p>Lesson paths, practice, and your next experiment will live here.</p>
        <Link className="auth-submit" href="/">Back to PromptLab</Link>
      </div>
    </main>
  );
}
