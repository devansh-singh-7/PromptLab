"use client";

import { Flame, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Mascot, ThemeToggle } from "@/components/design-system";
import XPChip from "@/components/design-system/XPChip";
import StreakChip from "@/components/design-system/StreakChip";

export type AuthPipState = "wave" | "think" | "cheer" | "encourage" | "rest";

export default function AuthShell({
  children,
  pipState = "wave",
}: {
  children: React.ReactNode;
  pipState?: AuthPipState;
}) {
  const reduced = useReducedMotion();
  return (
    <main className="auth-page">
      <section className="auth-brand-panel" aria-label="About PromptLab">
        <div className="auth-mesh" aria-hidden="true" />
        <Link className="auth-logo" href="/" aria-label="PromptLab home"><span className="brand-mark"><span /></span>PromptLab</Link>
        <ThemeToggle className="auth-theme-toggle" />
        <div className="auth-brand-content">
          <span className="eyebrow-chip"><Sparkles size={14} /> Your learning lab</span>
          <h1>Welcome back.<br /> <span>Your next prompt<br />is waiting.</span></h1>
          <p>Pick up where curiosity left off. Small steps, kind feedback, real momentum.</p>
          <div className="auth-values">
            {["Learn by making, not memorizing.", "Practice without the pressure.", "Build something you can share."].map((value, index) => (
              <motion.div key={value} initial={reduced ? false : { opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .22 + index * .1, duration: .4 }}>
                <span>{index + 1}</span>{value}
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div className="auth-float auth-float-xp" animate={reduced ? undefined : { y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}><XPChip amount={50} /></motion.div>
        <motion.div className="auth-float auth-float-streak" animate={reduced ? undefined : { y: [0, 7, 0] }} transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: .5 }}><StreakChip count={3} active /></motion.div>
        <div className="auth-float auth-level"><Flame size={14} /> Level 2</div>
        <div className="auth-pip"><Mascot state={pipState} size="lg" label="" /></div>
      </section>
      <section className="auth-form-side">{children}</section>
    </main>
  );
}
