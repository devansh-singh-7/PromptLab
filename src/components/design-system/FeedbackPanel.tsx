"use client";

import { cn } from "@/lib/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Lightbulb, X } from "lucide-react";
import Mascot, { type MascotState } from "./Mascot";

/* ── Variant Definitions ────────────────────────────────────── */

const panelVariants = cva(
  "w-full rounded-none px-6 py-5  border-t border-[var(--border)]",
  {
    variants: {
      variant: {
        correct: "bg-[var(--success-bg)] border-[var(--success)] text-[var(--success-text)]",
        incorrect: "bg-[var(--attention-bg)] border-[var(--attention)] text-[var(--attention-text)]",
        hint: "bg-[var(--brand-muted)] border-[var(--brand-muted-border)] text-[var(--ink)]",
      },
    },
    defaultVariants: {
      variant: "correct",
    },
  }
);

/* ── Types ──────────────────────────────────────────────────── */

export interface FeedbackPanelProps extends VariantProps<typeof panelVariants> {
  /** Feedback type */
  variant: "correct" | "incorrect" | "hint";
  /** Whether the panel is visible */
  open: boolean;
  /** Message to display */
  message: string;
  /** Optional action button */
  action?: {
    label: string;
    onClick: () => void;
  };
  /** Called when the panel is dismissed */
  onClose?: () => void;
  /** Additional class names */
  className?: string;
}

/* ── Helpers ────────────────────────────────────────────────── */

const variantIcons = {
  correct: Check,
  incorrect: X,
  hint: Lightbulb,
} as const;

const variantLabels = {
  correct: "Nicely done!",
  incorrect: "Not quite yet",
  hint: "Here's a nudge",
} as const;

const variantMascotStates: Record<"correct" | "incorrect" | "hint", MascotState> = {
  correct: "cheer",
  incorrect: "encourage",
  hint: "think",
};

/* ── Component ──────────────────────────────────────────────── */

export default function FeedbackPanel({
  variant,
  open,
  message,
  action,
  onClose,
  className,
}: FeedbackPanelProps) {
  const reducedMotion = useReducedMotion();
  const Icon = variantIcons[variant];
  const mascotState = variantMascotStates[variant];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="alert"
          aria-live="assertive"
          className={cn(
            "fixed inset-x-0 bottom-0 z-50",
            className
          )}
          initial={reducedMotion ? { opacity: 0 } : { y: "100%", opacity: 0 }}
          animate={reducedMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
          exit={reducedMotion ? { opacity: 0 } : { y: "100%", opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 340,
            damping: 28,
          }}
        >
          <div className={panelVariants({ variant })}>
            <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* Mascot with animated reaction */}
                <div data-mascot-slot className="shrink-0">
                  <Mascot state={mascotState} size="sm" label={`Pip reaction: ${mascotState}`} />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center h-5 w-5 rounded-none bg-current/15">
                      <Icon size={13} strokeWidth={2.5} aria-hidden />
                    </span>
                    <span className="font-heading text-sm font-bold">
                      {variantLabels[variant]}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed opacity-90 max-w-xl">
                    {message}
                  </p>
                </div>
              </div>

              {/* Action / close */}
              <div className="flex shrink-0 items-center gap-2">
                {action && (
                  <button
                    type="button"
                    onClick={action.onClick}
                    className="rounded-none bg-[var(--brand)] text-white px-4 py-2 text-sm font-bold  transition-transform hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)]"
                  >
                    {action.label}
                  </button>
                )}
                {onClose && (
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Dismiss feedback"
                    className="rounded-none p-2 text-current/70 hover:text-current hover:bg-current/10 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)]"
                  >
                    <X size={17} aria-hidden />
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
