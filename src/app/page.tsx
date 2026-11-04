"use client";

import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  Code2,
  Flame,
  Layers3,
  Menu,
  Play,
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
  StreakChip,
  ThemeToggle,
  XPChip,
} from "@/components/design-system";

const words = ["Don't", "just", "use", "AI.", "Learn", "to", "master", "it."];

const principles = [
  {
    title: "Learn",
    copy: "Build a mental model for prompting that sticks beyond the next answer.",
    icon: BookOpen,
    tone: "purple",
  },
  {
    title: "Practice",
    copy: "Turn ideas into small challenges with feedback that teaches, not judges.",
    icon: Target,
    tone: "mint",
  },
  {
    title: "Experiment",
    copy: "Try boldly in safe workspaces where mistakes become your next clue.",
    icon: WandSparkles,
    tone: "gold",
  },
  {
    title: "Build",
    copy: "Ship real web projects and learn to verify every AI-assisted decision.",
    icon: Rocket,
    tone: "coral",
  },
] as const;

const levels = [
  { label: "Foundations", state: "completed" as const },
  { label: "Frontend", state: "in-progress" as const, progress: 42 },
  { label: "Full stack", state: "available" as const },
  { label: "Debugging", state: "locked" as const },
  { label: "Real-world", state: "locked" as const },
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
  const inView = useInView(ref, { once: true, amount: 0.18 });
  const reduced = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduced ? false : { opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function PromptUpgrade() {
  const [strong, setStrong] = useState(false);
  const reduced = useReducedMotion();
  const pieces = ["role", "context", "constraints", "output format"];

  return (
    <div className="prompt-demo-wrap">
      <motion.div
        className="prompt-orb prompt-orb-one"
        animate={reduced ? undefined : { y: [0, -12, 0], x: [0, 7, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="prompt-orb prompt-orb-two"
        animate={reduced ? undefined : { y: [0, 10, 0], x: [0, -8, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
      />
      <motion.div
        className="prompt-demo-card"
        initial={reduced ? false : { opacity: 0, scale: 0.94, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="prompt-demo-top">
          <div>
            <p className="mini-kicker">Prompt upgrade</p>
            <h2>Make your next prompt click.</h2>
          </div>
          <button
            type="button"
            className={`upgrade-toggle ${strong ? "is-strong" : ""}`}
            onClick={() => setStrong((value) => !value)}
            aria-pressed={strong}
          >
            <span>{strong ? "Strong" : "Weak"}</span>
            <span className="toggle-dot" />
          </button>
        </div>
        <div className="prompt-demo-body">
          <div className={`prompt-copy ${strong ? "is-strong" : ""}`}>
            <span className="prompt-label">{strong ? "A clear brief" : "A vague ask"}</span>
            <p>{strong ? "Act as a senior frontend mentor. Build a responsive portfolio for a junior developer using semantic HTML, accessible controls, and a component outline before code." : "make me a website"}</p>
          </div>
          <div className="prompt-score">
            <ProgressRing value={strong ? 92 : 28} size={104} strokeWidth={8} aria-label={`Prompt score ${strong ? 92 : 28}%`} />
            <span>prompt<br />clarity</span>
          </div>
        </div>
        <div className="prompt-pieces" aria-label="Prompt ingredients">
          {pieces.map((piece, index) => (
            <motion.span
              key={piece}
              className={`prompt-piece ${strong ? "is-lit" : ""}`}
              animate={strong && !reduced ? { opacity: [0.55, 1], y: [4, 0] } : undefined}
              transition={{ delay: index * 0.12, duration: 0.28 }}
            >
              {strong && <Check size={13} strokeWidth={3} />}
              {piece}
            </motion.span>
          ))}
        </div>
        <div className="prompt-demo-footer">
          <Mascot state={strong ? "cheer" : "think"} size="sm" label={strong ? "Pip is cheering" : "Pip is thinking"} />
          <span>{strong ? "That’s a prompt with a point of view." : "Pip sees a few missing pieces."}</span>
        </div>
      </motion.div>
      <motion.div className="float-chip float-chip-xp" animate={reduced ? undefined : { y: [0, -9, 0] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}>
        <XPChip amount={50} />
      </motion.div>
      <motion.div className="float-chip float-chip-streak" animate={reduced ? undefined : { y: [0, 8, 0] }} transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}>
        <StreakChip count={3} active />
      </motion.div>
      <motion.span className="float-chip level-float" animate={reduced ? undefined : { y: [0, -6, 0] }} transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
        <Sparkles size={14} /> Level 2
      </motion.span>
    </div>
  );
}

function MiniIllustration({ type }: { type: number }) {
  return (
    <div className={`mini-illustration mini-illustration-${type}`} aria-hidden="true">
      {type === 1 && <><span /><span /><span /></>}
      {type === 2 && <><i /><i /><i /><i /></>}
      {type === 3 && <><b /><b /><b /></>}
      {type === 4 && <><em /><em /><em /></>}
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [promptRunning, setPromptRunning] = useState(false);
  const reduced = useReducedMotion();
  const loginHref = "/login?next=%2Fdashboard";

  return (
    <main className="landing-page" id="top">
      <div className="landing-mesh" aria-hidden="true" />
      <header className="landing-header">
        <a className="brand-lockup" href="#top" aria-label="PromptLab home">
          <span className="brand-mark"><span /></span>
          <span>PromptLab</span>
        </a>
        <nav className={`landing-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
          <a href="#courses" onClick={() => setMenuOpen(false)}>Courses</a>
          <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How it works</a>
          <a href="#studio" onClick={() => setMenuOpen(false)}>Studio</a>
          <div className="mobile-nav-actions">
            <a className="landing-button landing-button-ghost" href={loginHref}>Log in</a>
            <a className="landing-button landing-button-primary" href={loginHref}>Start learning <ArrowRight size={16} /></a>
          </div>
        </nav>
        <div className="header-actions">
          <ThemeToggle />
          <a className="header-login" href="/login">Log in</a>
          <a className="landing-button landing-button-primary" href={loginHref}>Start learning <ArrowRight size={16} /></a>
        </div>
        <button className="mobile-menu-button" type="button" onClick={() => setMenuOpen((value) => !value)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <section className="landing-hero landing-container">
        <div className="hero-copy">
          <Reveal>
            <span className="eyebrow-chip"><Sparkles size={14} /> Learn with intention</span>
          </Reveal>
          <h1 aria-label="Don't just use AI. Learn to master it.">
            {words.map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                className={word === "master" ? "gradient-word" : ""}
                initial={reduced ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.055, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}{" "}
              </motion.span>
            ))}
            <svg className="hero-underline" viewBox="0 0 310 18" aria-hidden="true">
              <motion.path d="M4 12 C70 4, 205 18, 306 6" initial={reduced ? false : { pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ delay: 0.75, duration: 0.65, ease: "easeOut" }} />
            </svg>
          </h1>
          <p className="hero-support">Explore prompt engineering through interactive courses, real-world challenges and specialized AI workspaces.</p>
          <div className="hero-actions">
            <a className="landing-button landing-button-primary landing-button-large" href={loginHref}>Start learning <ArrowRight size={18} /></a>
            <a className="landing-button landing-button-secondary landing-button-large" href="#courses">Explore courses <ChevronDown size={17} /></a>
          </div>
          <div className="hero-proof"><span className="proof-avatars"><i /><i /><i /></span><span>Made for curious builders</span><span className="proof-dot" /><span>Learn at your pace</span></div>
        </div>
        <div className="hero-visual"><PromptUpgrade /></div>
      </section>

      <section className="principles-section landing-container" id="how-it-works">
        <span className="landing-anchor" id="courses" aria-hidden="true" />
        <Reveal className="section-heading">
          <span className="section-kicker">A better way to learn</span>
          <h2>From blank page to <span>breakthrough.</span></h2>
          <p>Every part of PromptLab is designed to help you move from “I wonder” to “I built it.”</p>
        </Reveal>
        <div className="principles-grid">
          {principles.map(({ title, copy, icon: Icon, tone }, index) => (
            <Reveal key={title} delay={index * 0.08}>
              <article className={`principle-card tone-${tone}`}>
                <div className="principle-top"><span className="icon-chip"><Icon size={20} /></span><span className="card-arrow"><ArrowRight size={17} /></span></div>
                <MiniIllustration type={index + 1} />
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="path-section landing-container">
        <Reveal className="section-heading path-heading">
          <div><span className="section-kicker">Your learning path</span><h2>Keep going. <span>See where it leads.</span></h2></div>
          <a className="text-link" href="#courses">View the roadmap <ArrowRight size={16} /></a>
        </Reveal>
        <Reveal>
          <div className="path-preview">
            <div className="path-preview-copy"><span className="eyebrow-chip small">Available first</span><h3 aria-label="Web Development learning path">Web Development</h3><p>Five levels of practical prompt engineering, from your first clear ask to a complete AI-assisted build.</p><div className="path-meta"><ProgressRing value={24} size={52} strokeWidth={5} /><span><strong>Level 1 of 5</strong><small>4 lessons until your next milestone</small></span></div></div>
            <div className="trail-map" aria-label="Five-level Web Development learning path">
              <svg className="trail-line" viewBox="0 0 540 190" preserveAspectRatio="none" aria-hidden="true"><motion.path d="M20 140 C90 140 70 42 160 48 S240 155 315 126 S405 25 520 45" initial={reduced ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: "easeOut" }} /></svg>
              {levels.map((level, index) => (
                <motion.div key={level.label} className={`trail-node trail-node-${index + 1}`} initial={reduced ? false : { opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.15, type: "spring", stiffness: 280, damping: 18 }}>
                  <PathNode state={level.state} progress={level.progress} size="md" label={level.label} />
                  <span>{level.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="studio-section landing-container" id="studio">
        <Reveal className="studio-heading"><div><span className="section-kicker">The PromptLab studio</span><h2>Think it. <span>Try it. See it.</span></h2><p>A focused workbench for turning your best prompts into real, working ideas.</p></div><span className="studio-status"><i /> Live preview ready</span></Reveal>
        <Reveal delay={0.08}><div className="studio-window">
          <div className="studio-toolbar"><span className="window-dots"><i /><i /><i /></span><span className="studio-file"><Code2 size={14} /> landing-page.tsx</span><span className="studio-toolbar-label">PromptLab Studio</span></div>
          <div className="studio-grid">
            <div className="studio-panel prompt-panel"><span className="panel-label">Your prompt</span><motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>Create a welcoming hero section for a learning app. Use a warm purple palette, a clear call to action, and a card that celebrates progress.</motion.p><button className="run-button" type="button" onClick={() => { setPromptRunning(true); window.setTimeout(() => setPromptRunning(false), 1200); }} aria-live="polite"><Play size={14} fill="currentColor" /> {promptRunning ? "Building preview..." : "Run prompt"}</button></div>
            <div className="studio-panel code-panel"><span className="panel-label">Generated structure</span><div className="code-lines"><i /><i /><i /><i /><i /><i /></div><span className="code-cursor" /></div>
            <div className="studio-panel preview-panel"><span className="panel-label">Live preview</span><div className="mock-preview"><div className="mock-nav" /><div className="mock-hero"><span /><b /><i /></div><div className="mock-cards"><i /><i /><i /></div></div></div>
            <div className="studio-feedback"><span className="feedback-icon"><Check size={16} /></span><span><strong>Nice direction.</strong> Clear goal and a helpful visual brief.</span><b>92</b></div>
          </div>
        </div></Reveal>
      </section>

      <section className="domains-section landing-container">
        <Reveal className="section-heading"><span className="section-kicker">One lab, many directions</span><h2>Start where you are. <span>Grow from there.</span></h2></Reveal>
        <div className="domain-grid">
          <Reveal><article className="domain-card domain-active"><div className="domain-icon"><Code2 size={25} /></div><div><span className="domain-status">Available first</span><h3>Web Development</h3><p>Build thoughtful websites, apps, and a portfolio you’re proud to share.</p></div><ArrowRight size={19} /></article></Reveal>
          {["Data & analytics", "Product & design", "Automation"].map((domain, index) => <Reveal key={domain} delay={(index + 1) * 0.08}><article className="domain-card domain-muted"><div className="domain-icon"><Layers3 size={23} /></div><div><span className="domain-status">Coming later</span><h3>{domain}</h3><p>New learning paths are taking shape in the lab.</p></div><span className="domain-lock">Soon</span></article></Reveal>)}
        </div>
      </section>

      <section className="achievements-section landing-container">
        <Reveal><div className="achievement-strip"><div className="achievement-intro"><span className="section-kicker">Small wins, real momentum</span><h2>Collect moments<br />worth <span>celebrating.</span></h2></div><div className="achievement-badges"><div className="achievement-badge badge-purple"><Sparkles size={25} /><b>First spark</b><small>Begin your journey</small></div><div className="achievement-badge badge-gold"><Flame size={25} /><b>On a roll</b><small>Keep your streak</small></div><div className="achievement-badge badge-mint"><Target size={25} /><b>Prompt crafter</b><small>Make it clearer</small></div></div></div></Reveal>
      </section>

      <section className="final-cta landing-container" id="start">
        <div className="cta-glow" aria-hidden="true" />
        <Reveal><div className="cta-mascot"><Mascot state="wave" size="lg" label="Pip is waving hello" /></div><span className="section-kicker">Your next idea is waiting</span><h2>Ready to make AI<br /><span>work for you?</span></h2><p>Start with one prompt. Leave with a new way to think.</p><a className="landing-button landing-button-primary landing-button-large" href={loginHref}>Start learning <ArrowRight size={18} /></a></Reveal>
      </section>

      <footer className="landing-footer landing-container"><a className="brand-lockup" href="#top"><span className="brand-mark"><span /></span><span>PromptLab</span></a><span>Learn. Practice. Experiment. Build.</span><div><a href="#courses">Courses</a><a href="#how-it-works">How it works</a><a href="/login">Log in</a></div></footer>
    </main>
  );
}
