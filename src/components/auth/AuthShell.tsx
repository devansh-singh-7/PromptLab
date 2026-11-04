"use client";

import Link from "next/link";
import { Mascot, ThemeToggle } from "@/components/design-system";

export type AuthPipState = "wave" | "think" | "cheer" | "encourage" | "rest";

export default function AuthShell({
  children,
  pipState = "wave",
}: {
  children: React.ReactNode;
  pipState?: AuthPipState;
}) {
  return (
    <main className="auth-page">
      {/* Brand Panel */}
      <section className="auth-brand-panel" aria-label="PromptLab learning philosophy">
        <div className="flex items-center justify-between w-full">
          <Link className="auth-logo" href="/" aria-label="PromptLab home">
            <span className="brand-mark"><span /></span>
            <span>PromptLab</span>
          </Link>
          <ThemeToggle className="auth-theme-toggle" />
        </div>

        <div className="auth-brand-content">
          <h1>
            Master the craft of <span>intentional prompting.</span>
          </h1>
        </div>

        <div className="auth-brand-footer">
          <div className="shrink-0">
            <Mascot state={pipState} size="md" label={`Pip is ${pipState}ing`} />
          </div>
        </div>
      </section>

      {/* Form Side */}
      <section className="auth-form-side">
        {children}
      </section>
    </main>
  );
}
