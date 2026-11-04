"use client";

import { forwardRef, type ReactNode, type MouseEvent } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type HTMLMotionProps,
} from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

/* ── Variant definitions ─────────────────────────────────────── */

const chipVariants = cva(
  [
    "inline-flex items-center gap-1.5",
    "rounded-none",
    "px-3 py-1",
    "text-sm font-medium leading-snug",
    "select-none whitespace-nowrap",
    "transition-all duration-[var(--duration-normal)]",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)]",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-[var(--select-tint)] text-[var(--select)] hover:bg-[var(--select-tint)] dark:bg-[var(--select)]/40 dark:text-[var(--select-tint)] dark:hover:bg-[var(--select)]/60",
        success:
          "bg-[var(--success-bg)] text-[var(--success-text)] hover:bg-[var(--success-bg)] dark:hover:bg-[var(--success-bg)]",
        reward:
          "bg-[var(--reward-bg)] text-[var(--reward-text)] hover:bg-[var(--reward-bg)] dark:hover:bg-[var(--reward-bg)]",
        attention:
          "bg-[var(--attention-bg)] text-[var(--attention-text)] hover:bg-[var(--attention-bg)] dark:hover:bg-[var(--attention-bg)]",
        neutral:
          "bg-[var(--surface-sunken)] text-[var(--ink)] hover:bg-[var(--surface-sunken)] dark:bg-[var(--surface-raised)] dark:text-[var(--ink)] dark:hover:bg-[var(--surface-raised)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/* ── Types ────────────────────────────────────────────────────── */

export type ChipVariant = "default" | "success" | "reward" | "attention" | "neutral";

export type ChipProps = Omit<HTMLMotionProps<"span">, "children"> &
  VariantProps<typeof chipVariants> & {
  children: ReactNode;
  /** Show a dismiss (X) button */
  dismissible?: boolean;
  /** Called when the dismiss button is clicked */
  onDismiss?: () => void;
  /** Accessible label for the dismiss button */
  dismissLabel?: string;
};

/* ── Component ────────────────────────────────────────────────── */

const Chip = forwardRef<HTMLSpanElement, ChipProps>(
  (
    {
      className,
      variant,
      children,
      dismissible = false,
      onDismiss,
      dismissLabel = "Remove",
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion();

    const handleDismiss = (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onDismiss?.();
    };

    const chipContent = (
      <motion.span
        ref={ref}
        className={cn(chipVariants({ variant }), className)}
        layout={!prefersReducedMotion}
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.85 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        tabIndex={0}
        role="status"
        {...props}
      >
        {children}
        {dismissible && (
          <button
            type="button"
            onClick={handleDismiss}
            className={cn(
              "ml-0.5 -mr-1 inline-flex items-center justify-center",
              "size-4 rounded-none",
              "opacity-60 hover:opacity-100",
              "transition-opacity duration-[var(--duration-fast)]",
              "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--brand)]"
            )}
            aria-label={dismissLabel}
          >
            <X className="size-3" strokeWidth={2.5} />
          </button>
        )}
      </motion.span>
    );

    return chipContent;
  }
);
Chip.displayName = "Chip";

/**
 * Wrapper for animating Chip enter/exit.
 * Use `<ChipGroup>` around a list of `<Chip>` components for exit animations.
 */
export function ChipGroup({ children }: { children: ReactNode }) {
  return <AnimatePresence mode="popLayout">{children}</AnimatePresence>;
}

export { chipVariants };
export default Chip;
