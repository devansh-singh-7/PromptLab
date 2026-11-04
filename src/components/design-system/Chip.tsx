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
    "rounded-[var(--radius-full)]",
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
          "bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900/40 dark:text-purple-200 dark:hover:bg-purple-900/60",
        success:
          "bg-[var(--success-bg)] text-[var(--success-text)] hover:bg-mint-100 dark:hover:bg-mint-900/30",
        reward:
          "bg-[var(--reward-bg)] text-[var(--reward-text)] hover:bg-gold-100 dark:hover:bg-gold-900/30",
        attention:
          "bg-[var(--attention-bg)] text-[var(--attention-text)] hover:bg-coral-100 dark:hover:bg-coral-900/30",
        neutral:
          "bg-navy-100 text-navy-700 hover:bg-navy-200 dark:bg-navy-700 dark:text-navy-200 dark:hover:bg-navy-600",
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
              "size-4 rounded-full",
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
