"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

/* ── Variant definitions ─────────────────────────────────────── */

const badgeVariants = cva(
  [
    "inline-flex items-center justify-center",
    "rounded-[var(--radius-full)]",
    "px-2.5 py-0.5",
    "text-xs font-semibold leading-snug",
    "select-none whitespace-nowrap",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-200",
        success:
          "bg-[var(--success-bg)] text-[var(--success-text)]",
        reward:
          "bg-[var(--reward-bg)] text-[var(--reward-text)]",
        attention:
          "bg-[var(--attention-bg)] text-[var(--attention-text)]",
        neutral:
          "bg-navy-100 text-navy-700 dark:bg-navy-700 dark:text-navy-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/* ── Types ────────────────────────────────────────────────────── */

export type BadgeVariant = "default" | "success" | "reward" | "attention" | "neutral";

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  children: ReactNode;
}

/* ── Component ────────────────────────────────────────────────── */

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    >
      {children}
    </span>
  )
);
Badge.displayName = "Badge";

export { badgeVariants };
export default Badge;
