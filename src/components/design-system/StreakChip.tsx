"use client";

import { forwardRef } from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/cn";

/* ── Types ────────────────────────────────────────────────────── */

export type StreakChipProps = Omit<HTMLMotionProps<"span">, "children"> & {
  /** Current streak count */
  count: number;
  /** Whether the streak is currently active (triggers pulse animation) */
  active?: boolean;
  /** Label suffix (default: "day streak") */
  label?: string;
};

/* ── Pulse animation keyframes ────────────────────────────────── */

const pulseVariants = {
  idle: { scale: 1 },
  active: {
    scale: [1, 1.08, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut" as const,
      type: "tween" as const,
    },
  },
};

/* ── Component ────────────────────────────────────────────────── */

const StreakChip = forwardRef<HTMLSpanElement, StreakChipProps>(
  ({ className, count, active = false, label = "day streak", ...props }, ref) => {
    const prefersReducedMotion = useReducedMotion() ?? false;

    return (
      <motion.span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5",
          "rounded-[var(--radius-full)]",
          "px-3 py-1",
          "text-sm font-bold leading-snug",
          "select-none whitespace-nowrap",
          active
            ? "bg-[var(--attention-bg)] text-[var(--attention-text)]"
            : "bg-navy-100 text-navy-500 dark:bg-navy-700 dark:text-navy-300",
          className
        )}
        variants={prefersReducedMotion ? undefined : pulseVariants}
        animate={active && !prefersReducedMotion ? "active" : "idle"}
        role="status"
        aria-label={`${count} ${label}`}
        {...props}
      >
        <span
          className="text-base leading-none"
          role="img"
          aria-hidden="true"
        >
          🔥
        </span>
        <span>
          {count} {label}
        </span>
      </motion.span>
    );
  }
);
StreakChip.displayName = "StreakChip";

export default StreakChip;
