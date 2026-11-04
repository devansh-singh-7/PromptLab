"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Code2,
  Compass,
  Flame,
  Layers,
  Play,
  Sparkles,
  Target,
  Trophy,
  User,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Mascot,
  PathNode,
  ProgressBar,
  StreakChip,
  ThemeToggle,
  XPChip,
} from "@/components/design-system";
import ProfileMenu from "@/components/auth/ProfileMenu";

const trailMilestones = [
  { label: "Level 1: Foundations", state: "in-progress" as const, progress: 60 },
  { label: "Level 2: Frontend Prompts", state: "available" as const },
  { label: "Level 3: Full-Stack APIs", state: "locked" as const },
  { label: "Level 4: Debugging Workflows", state: "locked" as const },
  { label: "Level 5: Capstone Studio", state: "locked" as const },
];

export default function DashboardPage() {
  const [dailyGoal] = useState({ current: 2, target: 3 });

  return (
    <div className="min-h-screen bg-[var(--surface-sunken)] pb-24 md:pb-12 text-[var(--ink)]">
      {/* Top Navigation Bar */}
      <header className="dashboard-header">
        <div className="dashboard-nav-inner">
          <div className="dashboard-nav-left">
            <Link className="brand-lockup" href="/" aria-label="PromptLab home">
              <span className="brand-mark"><span /></span>
              <span>PromptLab</span>
            </Link>
            <nav className="dashboard-nav-links" aria-label="Signed-in navigation">
              <Link href="/dashboard" className="dashboard-nav-link is-active" aria-current="page">
                Dashboard
              </Link>
              <Link href="/#courses" className="dashboard-nav-link">
                Learning Paths
              </Link>
              <Link href="/#studio" className="dashboard-nav-link">
                Studio
              </Link>
            </nav>
          </div>

          <div className="dashboard-nav-actions">
            <XPChip amount={340} />
            <StreakChip count={4} active />
            <ThemeToggle />
            <ProfileMenu />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 space-y-8">
        {/* Welcome Greeting Banner */}
        <section className="relative overflow-hidden rounded-none border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 ">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="eyebrow-chip">
                <Sparkles size={13} /> Active Session
              </span>
              <h1 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight">
                Welcome back, Devansh! Ready for your next challenge?
              </h1>
              <p className="text-sm sm:text-base text-[var(--ink-muted)]">
                You&apos;re 60% through Level 1. Keep your streak alive with a 5-minute prompt exercise.
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <Mascot state="wave" size="lg" label="Pip is welcoming you back" />
            </div>
          </div>
        </section>

        {/* Primary Action Grid: Continue Lesson + Daily Goals */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Continue Learning Featured Card (2 Cols) */}
          <Card className="lg:col-span-2 border-[var(--border)] bg-[var(--surface)]  hover: transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand)]">
                  Continue Learning
                </span>
                <span className="text-xs font-semibold text-[var(--ink-muted)] flex items-center gap-1">
                  <BookOpen size={13} /> Lesson 3 of 5
                </span>
              </div>
              <CardTitle className="text-xl sm:text-2xl mt-1">
                Web Development: Structuring Intentional System Prompts
              </CardTitle>
              <CardDescription className="text-sm">
                Learn how role setting, concrete output constraints, and edge-case handling eliminate ambiguous AI responses.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-[var(--ink-muted)]">
                  <span>Track Progress</span>
                  <span>60% completed</span>
                </div>
                <ProgressBar value={60} mode="linear" height="md" />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[var(--ink-muted)]">
                  <span className="inline-block h-2 w-2 rounded-none bg-[var(--success)]" />
                  Estimated time: 7 mins
                </div>
                <Link
                  href="/#studio"
                  className="inline-flex items-center gap-2 rounded-none bg-[var(--brand)] px-5 py-2.5 text-sm font-bold text-white  hover:bg-[var(--brand-hover)] transition-all active:scale-[0.98]"
                >
                  <Play size={15} fill="currentColor" /> Resume Lesson
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Daily Goal & Streak Card (1 Col) */}
          <Card className="border-[var(--border)] bg-[var(--surface)] ">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--reward-text)]">
                  Daily Goal
                </span>
                <Flame size={16} className="text-[var(--reward)]" />
              </div>
              <CardTitle className="text-lg">
                {dailyGoal.current} of {dailyGoal.target} prompts crafted
              </CardTitle>
              <CardDescription className="text-xs">
                Complete 1 more practical exercise to earn +50 bonus XP and extend your 4-day streak.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <ProgressBar
                value={(dailyGoal.current / dailyGoal.target) * 100}
                mode="linear"
                height="md"
              />

              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2.5 text-xs text-[var(--ink)]">
                  <CheckCircle2 size={15} className="text-[var(--success)] shrink-0" />
                  <span>Prompt Role & Persona brief completed</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[var(--ink)]">
                  <CheckCircle2 size={15} className="text-[var(--success)] shrink-0" />
                  <span>Output Schema constraints verified</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[var(--ink-muted)]">
                  <Target size={15} className="text-[var(--brand)] shrink-0" />
                  <span>Edge-case validation challenge (pending)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Learning Path Trail Overview */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading text-xl font-bold tracking-tight">
                Curriculum Trail Map
              </h2>
              <p className="text-xs sm:text-sm text-[var(--ink-muted)]">
                Web Development Track milestones and current mastery status.
              </p>
            </div>
            <Link href="/#courses" className="text-xs sm:text-sm font-bold text-[var(--brand)] hover:underline flex items-center gap-1">
              Curriculum details <ArrowRight size={14} />
            </Link>
          </div>

          <div className="rounded-none border border-[var(--border)] bg-[var(--surface)] p-6 ">
            <div className="trail-row" aria-label="Curriculum trail milestones">
              <div className="trail-connector-line">
                <div className="trail-connector-fill" style={{ width: "38%" }} />
              </div>
              {trailMilestones.map((milestone) => (
                <div key={milestone.label} className="trail-item">
                  <PathNode
                    state={milestone.state}
                    progress={milestone.progress}
                    size="md"
                    label={milestone.label}
                  />
                  <span>{milestone.label.split(":")[0]}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Secondary Grid: Recent Badges & Fast Sandbox */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Achievements */}
          <Card className="border-[var(--border)] bg-[var(--surface)]">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--reward-text)]">
                <Trophy size={14} /> Achievements
              </div>
              <CardTitle className="text-lg">Recent Badges Unlocked</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="flex flex-col items-center gap-1.5 p-3 rounded-none bg-[var(--surface-raised)] border border-[var(--border)]">
                  <span className="text-2xl">✨</span>
                  <span className="text-xs font-bold">First Spark</span>
                  <span className="text-[0.65rem] text-[var(--ink-muted)]">Crafted 1st prompt</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 p-3 rounded-none bg-[var(--surface-raised)] border border-[var(--border)]">
                  <span className="text-2xl">🔥</span>
                  <span className="text-xs font-bold">On a Roll</span>
                  <span className="text-[0.65rem] text-[var(--ink-muted)]">3-day streak</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 p-3 rounded-none bg-[var(--surface-raised)] border border-[var(--border)]">
                  <span className="text-2xl">🎯</span>
                  <span className="text-xs font-bold">Prompt Crafter</span>
                  <span className="text-[0.65rem] text-[var(--ink-muted)]">90%+ clarity score</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Studio Runner */}
          <Card className="border-[var(--border)] bg-[var(--surface)]">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--brand)]">
                <Code2 size={14} /> Studio Sandbox
              </div>
              <CardTitle className="text-lg">Quick Experiment Runner</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
                Jump into the PromptLab Studio to test React component prompts, CSS layout instructions, and API mockups against real browser evaluation.
              </p>
              <Link
                href="/#studio"
                className="inline-flex w-full items-center justify-center gap-2 rounded-none border border-[var(--border)] bg-[var(--surface-raised)] py-2.5 text-xs font-bold text-[var(--ink)] hover:border-[var(--brand-ring)] hover:bg-[var(--surface)] transition-all"
              >
                Open Studio Workbench <ArrowRight size={14} />
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-around border-t border-[var(--border)] bg-[var(--surface-overlay)]  md:hidden"
        aria-label="Mobile application navigation"
      >
        <Link href="/dashboard" className="flex flex-col items-center gap-1 text-[var(--brand)] text-[0.68rem] font-bold">
          <Compass size={18} />
          <span>Dashboard</span>
        </Link>
        <Link href="/#courses" className="flex flex-col items-center gap-1 text-[var(--ink-muted)] hover:text-[var(--brand)] text-[0.68rem] font-medium">
          <Layers size={18} />
          <span>Paths</span>
        </Link>
        <Link href="/#studio" className="flex flex-col items-center gap-1 text-[var(--ink-muted)] hover:text-[var(--brand)] text-[0.68rem] font-medium">
          <Code2 size={18} />
          <span>Studio</span>
        </Link>
        <Link href="/dashboard" className="flex flex-col items-center gap-1 text-[var(--ink-muted)] hover:text-[var(--brand)] text-[0.68rem] font-medium">
          <User size={18} />
          <span>Account</span>
        </Link>
      </nav>
    </div>
  );
}
