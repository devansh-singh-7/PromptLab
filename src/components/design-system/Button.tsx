"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

/* ─── Spinner SVG ──────────────────────────────────────────── */
function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn("animate-spin", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

/* ─── Button Variants (cva) ────────────────────────────────── */
const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2",
    "rounded-full font-medium whitespace-nowrap select-none",
    "transition-shadow transition-colors",
    "outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)]",
    "disabled:pointer-events-none disabled:opacity-50",
    "leading-[1.6]", // Works for Latin + Devanagari
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
        sm: "h-8 px-4 text-sm",
        md: "h-10 px-5 text-base",
        lg: "h-12 px-7 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

/* ─── Types ────────────────────────────────────────────────── */
export type ButtonVariant = NonNullable<
  VariantProps<typeof buttonVariants>["variant"]
>;
export type ButtonSize = NonNullable<
  VariantProps<typeof buttonVariants>["size"]
>;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render as child element (e.g. an anchor) via Radix Slot */
  asChild?: boolean;
  /** Show loading spinner and disable interaction */
  loading?: boolean;
}

/* ─── Component ────────────────────────────────────────────── */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const prefersReduced = useReducedMotion();
    const Comp = asChild ? Slot : "button";

    const inner = (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        aria-disabled={disabled || loading || undefined}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading && (
          <Spinner
            className={cn(
              "shrink-0",
              size === "sm" ? "size-3.5" : size === "lg" ? "size-5" : "size-4"
            )}
          />
        )}
        <span className={cn(loading && "opacity-70")}>{children}</span>
      </Comp>
    );

    if (asChild) return inner;

    return (
      <motion.div
        className="inline-flex"
        whileHover={prefersReduced ? undefined : { y: -1 }}
        whileTap={
          prefersReduced
            ? undefined
            : { scale: 0.98, boxShadow: "var(--shadow-sm)" }
        }
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {inner}
      </motion.div>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
export default Button;
