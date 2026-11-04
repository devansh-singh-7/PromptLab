"use client";

import { cn } from "@/lib/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Lightbulb, X } from "lucide-react";

/* ── Variant Definitions ────────────────────────────────────── */

const panelVariants = cva(
  "w-full rounded-t-2xl px-5 py-4 shadow-[var(--shadow-xl)]",
  {
    variants: {
      variant: {
        correct: "bg-mint-500 text-white",
        incorrect: "bg-coral-500 text-white",
        hint: "bg-purple-500 text-white",
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
  correct: "Correct!",
  incorrect: "Not quite",
  hint: "Hint",
} as const;

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
            stiffness: 350,
            damping: 30,
          }}
        >
          <div className={panelVariants({ variant })}>
            <div className="mx-auto flex max-w-2xl items-start gap-3">
              {/* Icon */}
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20">
                <Icon size={18} aria-hidden />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col gap-1">
                <span className="text-sm font-heading font-semibold leading-relaxed">
                  {variantLabels[variant]}
                </span>
                <p className="text-sm leading-relaxed opacity-95">
                  {message}
                </p>
              </div>

              {/* Mascot slot */}
              <div
                data-mascot-slot
                className="hidden h-12 w-12 shrink-0 items-center justify-center sm:flex"
                aria-hidden
              />

              {/* Action / close */}
              <div className="flex shrink-0 items-center gap-2">
                {action && (
                  <button
                    type="button"
                    onClick={action.onClick}
                    className="rounded-lg bg-white/20 px-3 py-1.5 text-sm font-semibold backdrop-blur-sm transition-colors hover:bg-white/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {action.label}
                  </button>
                )}
                {onClose && (
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Dismiss feedback"
                    className="rounded-lg p-1.5 transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <X size={16} aria-hidden />
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
