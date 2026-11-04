"use client";

import { useState } from "react";
import {
  ArrowRight,
  Check,
  Menu,
  MoreHorizontal,
  Sparkles,
} from "lucide-react";
import {
  Avatar,
  Badge,
  Button,
  Callout,
  Card,
  CelebrationOverlay,
  Chip,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  EmptyState,
  ErrorState,
  FeedbackPanel,
  IconButton,
  Input,
  LevelBadge,
  Mascot,
  PathNode,
  ProgressBar,
  ProgressRing,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Sheet,
  SheetContent,
  SheetTrigger,
  Skeleton,
  StreakChip,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  ThemeToggle,
  ToastProvider,
  Tooltip,
  XPChip,
  useToast,
} from "@/components/design-system";

function Section({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-6" aria-labelledby={`${eyebrow}-heading`}>
      <div className="max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--brand)]">
          {eyebrow}
        </p>
        <h2
          id={`${eyebrow}-heading`}
          className="mt-2 font-heading text-2xl font-bold text-[var(--ink)] sm:text-3xl"
        >
          {title}
        </h2>
        <p className="mt-2 text-sm leading-7 text-[var(--ink-muted)]">
          {description}
        </p>
      </div>
      {children}
    </section>
  );
}

function Showcase() {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | "hint" | null>(
    null,
  );
  const [celebrationOpen, setCelebrationOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[var(--surface)]">
      <header className="border-b border-[var(--border)] bg-[var(--surface-overlay)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5 lg:px-10">
          <div className="flex items-center gap-3">
            <Mascot state="wave" size="sm" label="Pip waves hello" />
            <div>
              <p className="font-heading text-lg font-bold text-[var(--ink)]">
                PromptLab
              </p>
              <p className="text-xs text-[var(--ink-muted)]">Design system</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden text-sm text-[var(--ink-muted)] sm:inline">
              Light / dark ready
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl space-y-20 px-6 py-12 lg:px-10 lg:py-16">
        <section className="relative overflow-hidden rounded-[var(--radius-2xl)] bg-[var(--surface-raised)] px-6 py-12 shadow-[var(--shadow-lg)] sm:px-12">
          <div className="absolute -right-20 -top-20 size-64 rounded-full bg-purple-300/20 blur-3xl" />
          <div className="relative max-w-3xl">
            <Badge variant="default">Foundation release</Badge>
            <h1 className="mt-5 max-w-3xl font-heading text-4xl font-bold tracking-tight text-[var(--ink)] sm:text-6xl">
              Friendly tools for focused progress.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--ink-muted)]">
              Soft surfaces, clear feedback, and a little sparkle when the work
              is done. This page is the living catalog for PromptLab UI.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button onClick={() => setCelebrationOpen(true)}>
                Celebrate a win <Sparkles className="size-4" aria-hidden />
              </Button>
              <Button variant="secondary" onClick={() => toast({
                title: "Nice choice",
                description: "Your design-system toast is ready.",
                variant: "success",
              })}>
                Show a toast
              </Button>
            </div>
          </div>
        </section>

        <Section
          eyebrow="Foundation"
          title="Pip, surfaces, and semantic feedback"
          description="The same system can feel expressive in marketing, motivating in the dashboard, calm in lessons, and professional in Studio."
        >
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <Card>
              <Card.Header>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-[var(--ink-muted)]">
                      Mascot states
                    </p>
                    <h3 className="mt-1 font-heading text-xl font-bold text-[var(--ink)]">
                      Meet Pip
                    </h3>
                  </div>
                  <Badge variant="success">Original SVG placeholder</Badge>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
                  {(["wave", "think", "cheer", "encourage", "rest"] as const).map(
                    (state) => (
                      <div
                        key={state}
                        className="flex flex-col items-center gap-2 rounded-[var(--radius-lg)] bg-[var(--surface)] p-3 text-center"
                      >
                        <Mascot state={state} size="md" />
                        <span className="text-xs font-medium capitalize text-[var(--ink-muted)]">
                          {state}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </Card.Body>
            </Card>
            <Card variant="outlined">
              <Card.Header>
                <p className="text-sm font-semibold text-[var(--ink-muted)]">
                  Semantic colors
                </p>
                <h3 className="mt-1 font-heading text-xl font-bold text-[var(--ink)]">
                  Meaning at a glance
                </h3>
              </Card.Header>
              <Card.Body>
                <div className="space-y-3">
                  <Callout variant="tip">A small nudge can make the next step feel easy.</Callout>
                  <Callout variant="warning">Keep private keys out of client components.</Callout>
                  <Callout variant="key-takeaway">
                    Progress should feel visible, never noisy.
                  </Callout>
                </div>
              </Card.Body>
            </Card>
          </div>
        </Section>

        <Section
          eyebrow="Actions"
          title="Buttons, badges, chips, and progress"
          description="Controls keep their focus ring, rounded shape, and stateful feedback in every surface."
        >
          <Card>
            <Card.Body>
              <div className="flex flex-wrap items-center gap-3">
                {(["primary", "secondary", "ghost", "success", "reward"] as const).map(
                  (variant) => (
                    <Button key={variant} variant={variant}>
                      {variant}
                    </Button>
                  ),
                )}
                <Button loading>Saving</Button>
                <IconButton aria-label="More options" variant="secondary">
                  <MoreHorizontal aria-hidden />
                </IconButton>
                <Tooltip content="Open navigation">
                  <IconButton aria-label="Open navigation" variant="ghost">
                    <Menu aria-hidden />
                  </IconButton>
                </Tooltip>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Badge>New lesson</Badge>
                <Badge variant="success">Completed</Badge>
                <Badge variant="reward">+120 XP</Badge>
                <Badge variant="attention">Needs a nudge</Badge>
                <Chip variant="default">Prompt craft</Chip>
                <Chip variant="success" dismissible onDismiss={() => undefined}>
                  Ready
                </Chip>
                <XPChip amount={120} />
                <StreakChip count={4} active />
                <LevelBadge level={3} />
                <Avatar name="Devansh Singh" />
              </div>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div>
                  <div className="mb-2 flex justify-between text-sm font-medium text-[var(--ink-muted)]">
                    <span>Lesson progress</span>
                    <span>68%</span>
                  </div>
                  <ProgressBar mode="linear" value={68} aria-label="Lesson progress" />
                  <ProgressBar
                    className="mt-4"
                    mode="segmented"
                    value={60}
                    segments={5}
                    showLabel
                    aria-label="Course progress"
                  />
                </div>
                <div className="flex items-center gap-6">
                  <ProgressRing value={72} size={88} />
                  <ProgressRing value={100} size={88} color="var(--success)" />
                  <span className="text-sm leading-6 text-[var(--ink-muted)]">
                    Rings and bars use mint only for completion; brand purple
                    carries in-progress work.
                  </span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Section>

        <Section
          eyebrow="Inputs"
          title="Clear, typed forms"
          description="Labels, helper text, errors, keyboard focus, and Devanagari content are part of the component contract."
        >
          <Card>
            <Card.Body>
              <div className="grid gap-5 md:grid-cols-2">
                <Input
                  label="Display name"
                  placeholder="How should we greet you?"
                  helperText="This appears in encouraging feedback."
                />
                <Input
                  label="Email"
                  defaultValue="devansh@example.com"
                  error="Try a valid email address."
                />
                <Textarea
                  label="Reflection"
                  placeholder="What clicked today?"
                  helperText="Hindi and Marathi are first-class content languages."
                />
                <div className="space-y-5">
                  <Select defaultValue="hindi">
                    <SelectTrigger label="Explanation language">
                      <SelectValue placeholder="Choose a language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="hindi">हिन्दी</SelectItem>
                      <SelectItem value="marathi">मराठी</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="rounded-[var(--radius-lg)] bg-[var(--surface-raised)] p-4 text-base leading-8 text-[var(--ink)]">
                    नमस्ते! आज थोड़ा अभ्यास करें। / चला, आज थोडा सराव करूया.
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Section>

        <Section
          eyebrow="Navigation"
          title="Paths, tabs, dialogs, and sheets"
          description="Keyboard-first Radix primitives keep navigation predictable on desktop and mobile."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <Card.Header>
                <h3 className="font-heading text-lg font-bold text-[var(--ink)]">
                  Learning path
                </h3>
              </Card.Header>
              <Card.Body>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <PathNode state="locked" label="Foundations" />
                    <span className="text-xs text-[var(--ink-muted)]">Locked</span>
                  </div>
                  <ArrowRight className="size-4 text-[var(--ink-faint)]" aria-hidden />
                  <div className="flex flex-col items-center gap-2">
                    <PathNode state="available" label="Prompts" />
                    <span className="text-xs text-[var(--ink-muted)]">Available</span>
                  </div>
                  <ArrowRight className="size-4 text-[var(--ink-faint)]" aria-hidden />
                  <div className="flex flex-col items-center gap-2">
                    <PathNode state="in-progress" progress={55} label="Web craft" />
                    <span className="text-xs text-[var(--ink-muted)]">In progress</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <PathNode state="completed" label="Practice" />
                    <span className="text-xs text-[var(--ink-muted)]">Completed</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <PathNode state="mastered" label="Mastery" />
                    <span className="text-xs text-[var(--ink-muted)]">Mastered</span>
                  </div>
                </div>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <Tabs defaultValue="overview">
                  <TabsList aria-label="Example tabs">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="practice">Practice</TabsTrigger>
                    <TabsTrigger value="notes">Notes</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="pt-4 text-sm leading-7 text-[var(--ink-muted)]">
                    A calm overview gives learners the context before asking them
                    to act.
                  </TabsContent>
                  <TabsContent value="practice" className="pt-4 text-sm leading-7 text-[var(--ink-muted)]">
                    Practice is where feedback turns into a next attempt.
                  </TabsContent>
                  <TabsContent value="notes" className="pt-4 text-sm leading-7 text-[var(--ink-muted)]">
                    Notes stay close without competing with the lesson.
                  </TabsContent>
                </Tabs>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="secondary">Open dialog</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogTitle>Ready for a quick one?</DialogTitle>
                      <DialogDescription>
                        Dialogs are focused, reversible, and closable with Escape.
                      </DialogDescription>
                      <Button className="mt-6" onClick={() => setDialogOpen(false)}>
                        Continue
                      </Button>
                    </DialogContent>
                  </Dialog>
                  <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                    <SheetTrigger asChild>
                      <Button variant="ghost">Open sheet</Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                      <h3 className="font-heading text-xl font-bold text-[var(--ink)]">
                        Mobile-friendly navigation
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-[var(--ink-muted)]">
                        On small screens, learning navigation can become a bottom
                        tab bar while supporting detail lives here.
                      </p>
                    </SheetContent>
                  </Sheet>
                </div>
              </Card.Body>
            </Card>
          </div>
        </Section>

        <Section
          eyebrow="States"
          title="Loading, empty, error, and feedback"
          description="Every state should explain what happened and make the next action obvious."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <Card.Body>
                <div className="flex items-center gap-3">
                  <Skeleton variant="circle" />
                  <div className="flex-1 space-y-2">
                    <Skeleton />
                    <Skeleton width="65%" />
                  </div>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <EmptyState
                    title="No saved paths yet"
                    description="Pick a path when you are ready for a next step."
                    illustration={<Mascot state="encourage" size="sm" />}
                    action={<Button size="sm">Explore paths</Button>}
                  />
                  <ErrorState
                    title="That did not load"
                    description="Your work is safe. Try once more."
                    onRetry={() => undefined}
                  />
                </div>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="success" onClick={() => setFeedback("correct")}>
                    Correct
                  </Button>
                  <Button size="sm" variant="secondary" onClick={() => setFeedback("incorrect")}>
                    Not quite
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setFeedback("hint")}>
                    Hint
                  </Button>
                </div>
                <div className="mt-6 space-y-3">
                  <Callout variant="tip">Nice try. Here&apos;s a nudge.</Callout>
                  <Callout variant="key-takeaway">Small iterations compound.</Callout>
                </div>
                <div className="mt-6 flex items-center gap-2 text-sm text-[var(--ink-muted)]">
                  <Check className="size-4 text-[var(--success)]" aria-hidden />
                  Feedback panels slide up with a Pip reaction in lessons.
                </div>
              </Card.Body>
            </Card>
          </div>
        </Section>
      </div>

      <FeedbackPanel
        open={feedback !== null}
        variant={feedback ?? "hint"}
        message={
          feedback === "correct"
            ? "That is the right direction. Keep going."
            : feedback === "incorrect"
              ? "Nice try. Check the requirement, then take another pass."
              : "Look for the smallest requirement your prompt has not named yet."
        }
        action={{ label: "Got it", onClick: () => setFeedback(null) }}
        onClose={() => setFeedback(null)}
      />
      <CelebrationOverlay
        open={celebrationOpen}
        onClose={() => setCelebrationOpen(false)}
        title="That&apos;s a wrap!"
        message="You made the system feel a little more like PromptLab."
        xpEarned={120}
        levelUp={{ newLevel: 4 }}
      />
    </main>
  );
}

export default function DesignSystemPage() {
  return (
    <ToastProvider>
      <Showcase />
    </ToastProvider>
  );
}
