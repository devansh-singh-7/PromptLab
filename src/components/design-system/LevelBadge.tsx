"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

/* ── Variant definitions ─────────────────────────────────────── */

const levelBadgeVariants = cva(
  [
    "inline-flex items-center justify-center",
    "rounded-none",
    "bg-[var(--accent)]  ",
    "text-white font-heading font-bold",
    "select-none",
    "",
    "ring-2 ring-[var(--select)]/30",
  ],
  {
    variants: {
      size: {
        sm: "size-8 text-xs",
        md: "size-10 text-sm",
        lg: "size-14 text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

/* ── Types ────────────────────────────────────────────────────── */

export type LevelBadgeSize = "sm" | "md" | "lg";

export interface LevelBadgeProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof levelBadgeVariants> {
  /** The level number to display */
  level: number;
}

/* ── Component ────────────────────────────────────────────────── */

const LevelBadge = forwardRef<HTMLDivElement, LevelBadgeProps>(
  ({ className, level, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(levelBadgeVariants({ size }), className)}
      role="img"
      aria-label={`Level ${level}`}
      {...props}
    >
      {level}
    </div>
  )
);
LevelBadge.displayName = "LevelBadge";

export { levelBadgeVariants };
export default LevelBadge;
