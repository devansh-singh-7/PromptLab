"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
} from "framer-motion";
import { cn } from "@/lib/cn";

/* ─── Icon Button Variants (cva) ───────────────────────────── */
const iconButtonVariants = cva(
  [
    "relative inline-flex items-center justify-center",
    "rounded-full shrink-0 select-none",
    "transition-shadow transition-colors",
    "outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)]",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-[var(--brand)] text-[var(--ink-inverse)]",
          "hover:bg-[var(--brand-hover)]",
          "active:bg-[var(--brand-active)]",
          "shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)]",
        ],
        secondary: [
          "bg-[var(--surface-raised)] text-[var(--ink)] border border-[var(--border)]",
          "hover:bg-[var(--brand-muted)] hover:border-[var(--brand-ring)]",
          "active:bg-purple-200",
          "shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)]",
        ],
        ghost: [
          "bg-transparent text-[var(--ink)]",
          "hover:bg-[var(--surface-raised)]",
          "active:bg-[var(--brand-muted)]",
        ],
        success: [
          "bg-[var(--success)] text-white",
          "hover:bg-mint-700",
          "active:bg-mint-800",
          "shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-glow-mint)]",
        ],
        reward: [
          "bg-[var(--reward)] text-white",
          "hover:bg-gold-600",
          "active:bg-gold-700",
          "shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-glow-gold)]",
        ],
      },
      size: {
        sm: "size-8 [&>svg]:size-4",
        md: "size-10 [&>svg]:size-5",
        lg: "size-12 [&>svg]:size-6",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

/* ─── Types ────────────────────────────────────────────────── */
export type IconButtonVariant = NonNullable<
  VariantProps<typeof iconButtonVariants>["variant"]
>;
export type IconButtonSize = NonNullable<
  VariantProps<typeof iconButtonVariants>["size"]
>;

export type IconButtonProps = Omit<HTMLMotionProps<"button">, "children"> &
  VariantProps<typeof iconButtonVariants> & {
  /** Accessible label (required for icon-only buttons) */
  "aria-label": string;
  children?: React.ReactNode;
};

/* ─── Component ────────────────────────────────────────────── */
const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    const prefersReduced = useReducedMotion();

    return (
      <motion.button
        ref={ref}
        className={cn(iconButtonVariants({ variant, size }), className)}
        whileHover={prefersReduced ? undefined : { y: -1 }}
        whileTap={
          prefersReduced
            ? undefined
            : { scale: 0.98, boxShadow: "var(--shadow-sm)" }
        }
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

IconButton.displayName = "IconButton";

export { IconButton, iconButtonVariants };
export default IconButton;
