"use client";

import {
  ArrowRight,
  BookOpen,
  CircleCheckBig,
  Code2,
  Clock3,
  Layers3,
  Menu,
  Rocket,
  Sparkles,
  Target,
  WandSparkles,
  X,
} from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import {
  Mascot,
  PathNode,
  ProgressRing,
  ThemeToggle,
} from "@/components/design-system";

const principles = [
  {
    title: "Learn",
    copy: "Build a mental model for prompting that sticks beyond the next answer.",
    icon: BookOpen,
    tone: "purple",
  },
  {
    title: "Practice",
    copy: "Turn ideas into bite-sized challenges with feedback that teaches, not judges.",
    icon: Target,
    tone: "mint",
  },
  {
    title: "Experiment",
    copy: "Try boldly in isolated workspaces where mistakes become your next breakthrough.",
    icon: WandSparkles,
    tone: "gold",
  },
  {
    title: "Build",
    copy: "Ship real web projects and verify every AI-assisted code decision.",
    icon: Rocket,
    tone: "coral",
  },
] as const;

type LearningLevel = {
  label: string;
  state: "locked" | "available" | "in-progress" | "completed";
  progress: number;
  eyebrow: string;
  title: string;
  description: string;
  duration: string;
  reward: string;
};

const levels: LearningLevel[] = [
  {
    label: "Foundations",
    state: "completed",
    progress: 100,
    eyebrow: "Level 1 · Complete",
    title: "Prompt fundamentals unlocked",
    description: "You learned how role, context, constraints, and examples work together.",
    duration: "8 challenges finished",
    reward: "+240 XP earned",
  },
  {
    label: "Frontend",
    state: "in-progress",
    progress: 45,
    eyebrow: "Level 2 · In progress",
    title: "Build a responsive component brief",
    description: "Give an AI enough product context to create a polished, accessible UI on the first pass.",
    duration: "5 min · Challenge 4 of 8",
    reward: "+80 XP waiting",
  },
  {
    label: "Full stack",
    state: "available",
    progress: 0,
    eyebrow: "Level 3 · Ready when you are",
    title: "Plan your first full-stack flow",
    description: "Map user intent to data, endpoints, and an interface that handles real-world states.",
    duration: "Unlock after Frontend",
    reward: "+320 XP to earn",
  },
  {
    label: "Debugging",
    state: "locked",
    progress: 0,
    eyebrow: "Level 4 · Locked",
    title: "Diagnose AI-generated code",
    description: "Practice turning confusing symptoms into focused debugging prompts and test cases.",
    duration: "Complete Full stack first",
    reward: "A new debugging badge",
  },
  {
    label: "Real-world",
    state: "locked",
    progress: 0,
    eyebrow: "Level 5 · Locked",
    title: "Ship with confidence",
    description: "Bring every prompt skill together in production-style projects and review loops.",
    duration: "Complete Debugging first",
    reward: "PromptLab mastery badge",
  },
];

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const reduced = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduced ? false : { opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("Frontend");
  const loginHref = "/login?next=%2Fdashboard";
  const activeLevel = levels.find((level) => level.label === selectedLevel) ?? levels[1];
  const isLockedLevel = activeLevel.state === "locked";

  return (
    <main className="landing-page" id="top">
      {/* Navigation Header */}
      <header className="landing-header">
        <a className="brand-lockup" href="#top" aria-label="PromptLab home">
          <span className="brand-mark"><span /></span>
          <span>PromptLab</span>
        </a>

        <nav className={`landing-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
          <a href="#courses" onClick={() => setMenuOpen(false)}>Courses</a>
          <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How it works</a>
          <a href="/login" onClick={() => setMenuOpen(false)}>Log in</a>
        </nav>

        <div className="header-actions">
          <ThemeToggle />
          <a className="landing-button landing-button-primary" href={loginHref}>
            Start learning <ArrowRight size={16} />
          </a>
          <button
            className="mobile-menu-button"
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="landing-hero landing-hero-solo landing-container">
        <div className="hero-copy">
          <h1 aria-label="Don't just use AI. Learn to master it.">
            Don&apos;t just use AI. Learn to{" "}
            <span className="gradient-word">
              master it.
              <svg className="hero-underline-curve" viewBox="0 0 160 12" fill="none" preserveAspectRatio="none">
                <path d="M 2 8 C 45 2, 115 12, 158 4" stroke="#C43D00" strokeWidth="3.5" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <div className="hero-actions">
            <a className="landing-button landing-button-primary landing-button-large" href={loginHref}>
              Start learning <ArrowRight size={18} />
            </a>
            <a className="landing-button landing-button-secondary landing-button-large" href="#courses">
              Explore path
            </a>
          </div>

          <div className="hero-proof">
            <span className="proof-avatars"><i /><i /><i /></span>
            <span className="proof-dot" />
          </div>
        </div>
      </section>

      {/* How it Works / Principles Section */}
      <section className="principles-section landing-container" id="how-it-works">
        <Reveal className="section-heading">
          <span className="section-kicker">A better way to learn</span>
          <h2>From blank prompt to <span>production code</span></h2>
          <p>Every milestone is structured to turn prompt engineering into a reliable, repeatable craft.</p>
        </Reveal>

        <div className="principles-grid">
          {principles.map(({ title, copy, icon: Icon, tone }, index) => (
            <Reveal key={title} delay={index * 0.08}>
              <article className={`principle-card tone-${tone}`}>
                <div className="principle-top">
                  <span className="icon-chip"><Icon size={22} /></span>
                </div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Learning Path Preview Section */}
      <section className="path-section landing-container" id="courses">
        <Reveal className="section-heading path-heading">
          <div>
            <h2>Web Development <span>Path</span></h2>
            <p>From foundational mental models to production architectures and debugging workflows.</p>
          </div>
          <a className="text-link" href={loginHref}>
            View curriculum <ArrowRight size={16} />
          </a>
        </Reveal>

        <Reveal>
          <div className="path-preview">
            <div className="path-preview-header">
              <div>
                <span className="eyebrow-chip" aria-label="Active track"><Sparkles size={14} /></span>
                <h3 aria-label="Web Development">Web Development</h3>
                <p>Five levels of structured prompt engineering with live code verification at each step.</p>
              </div>
              <div className="path-meta">
                <ProgressRing value={35} size={48} strokeWidth={4} />
                <div>
                  <strong>35% through your path</strong>
                  <small>3 challenges down · your streak is warm</small>
                </div>
              </div>
            </div>

            <div className="path-progress-summary" aria-label="Learning path progress">
              <div className="path-progress-copy">
                <span>Next checkpoint</span>
                <strong>Component briefs</strong>
              </div>
              <div className="path-progress-track" aria-hidden="true"><span /></div>
              <span className="path-progress-count">3 / 8 complete</span>
            </div>

            <p className="trail-hint"><Sparkles size={14} /> Pick an unlocked milestone to see its mission.</p>

            <div className="trail-row" role="list" aria-label="Path milestones">
              <div className="trail-connector-line">
                <div className="trail-connector-fill" />
              </div>
              {levels.map((level) => (
                <div
                  key={level.label}
                  className={`trail-item ${selectedLevel === level.label ? "is-selected" : ""}`}
                  role="listitem"
                >
                  <PathNode
                    state={level.state}
                    progress={level.progress}
                    size="md"
                    label={level.label}
                    onClick={() => setSelectedLevel(level.label)}
                  />
                  <span>{level.label}</span>
                  {level.state === "in-progress" && <small>You're here</small>}
                </div>
              ))}
            </div>

            <motion.div
              key={activeLevel.label}
              className={`path-mission ${isLockedLevel ? "is-locked" : ""}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              aria-live="polite"
            >
              <div className="mission-guide">
                <Mascot
                  state={isLockedLevel ? "think" : activeLevel.state === "completed" ? "cheer" : "encourage"}
                  size="sm"
                  label={isLockedLevel ? "Pip is thinking" : "Pip is encouraging you"}
                />
              </div>
              <div className="mission-content">
                <span className="mission-eyebrow">{activeLevel.eyebrow}</span>
                <h4>{activeLevel.title}</h4>
                <p>{activeLevel.description}</p>
                <div className="mission-meta">
                  <span><Clock3 size={14} /> {activeLevel.duration}</span>
                  <span><CircleCheckBig size={14} /> {activeLevel.reward}</span>
                </div>
              </div>
              {isLockedLevel ? (
                <span className="mission-locked-note">Keep going to unlock</span>
              ) : (
                <a className="mission-action" href={loginHref}>
                  {activeLevel.state === "completed" ? "Review level" : activeLevel.state === "available" ? "Preview level" : "Continue mission"}
                  <ArrowRight size={16} />
                </a>
              )}
            </motion.div>
          </div>
        </Reveal>
      </section>

      {/* Domain Exploration Section */}
      <section className="domains-section landing-container">
        <Reveal className="section-heading">
          <h2>Specialized <span>Learning Tracks</span></h2>
        </Reveal>

        <div className="domain-grid">
          <article className="domain-card domain-active">
            <div className="domain-icon"><Code2 size={26} /></div>
            <div>
              <span className="domain-status">Available now</span>
              <h3>Full-Stack Web Track</h3>
              <p>Full-stack engineering with Next.js, TypeScript, API contracts, and Tailwind.</p>
            </div>
            <ArrowRight size={20} />
          </article>

          {["Data & Analytics", "Product & Architecture", "Automation & APIs"].map((domain) => (
            <article key={domain} className="domain-card">
              <div className="domain-icon"><Layers3 size={24} /></div>
              <div>
                <span className="domain-status" style={{ color: "var(--ink-muted)" }}>Coming soon</span>
                <h3>{domain}</h3>
                <p>Structured problem sets and dedicated AI environments currently in curriculum design.</p>
              </div>
              <span className="domain-lock">Roadmap</span>
            </article>
          ))}
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="final-cta landing-container">
        <Reveal>
          <div className="cta-mascot">
            <Mascot state="wave" size="lg" label="Pip is waving" />
          </div>
          <h2>Ready to level up your <span>prompting?</span></h2>
          <a className="landing-button landing-button-primary landing-button-large" href={loginHref}>
            Start learning free <ArrowRight size={18} />
          </a>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="landing-footer landing-container">
        <div className="brand-lockup">
          <span className="brand-mark"><span /></span>
          <span>PromptLab</span>
        </div>
        <div>
          <a className="back-to-top-button" href="#top">Back to top</a>
          <a href={loginHref}>Sign in</a>
        </div>
      </footer>
    </main>
  );
}
