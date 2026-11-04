"use client";

import { forwardRef, createContext, useContext, type ReactNode, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/cn";

/* ── Variant definitions ─────────────────────────────────────── */

const cardVariants = cva(
  "rounded-[var(--radius-2xl)] transition-shadow",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--surface-raised)] shadow-[var(--shadow-md)]",
        outlined:
          "bg-[var(--surface)] border border-[var(--border)] shadow-none",
        elevated:
          "bg-[var(--surface-raised)] shadow-[var(--shadow-lg)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/* ── Types ────────────────────────────────────────────────────── */

export type CardVariant = "default" | "outlined" | "elevated";

export type CardProps = Omit<HTMLMotionProps<"div">, "children"> &
  VariantProps<typeof cardVariants> & {
  /** Disable hover-lift animation */
  disableHover?: boolean;
  children?: ReactNode;
};

export interface CardSectionProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

/* ── Context (for potential future inter-section communication) */

const CardContext = createContext<{ variant: CardVariant }>({
  variant: "default",
});

/* ── Sub-components ───────────────────────────────────────────── */

const CardHeader = forwardRef<HTMLDivElement, CardSectionProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("px-6 pt-6 pb-2", className)}
      {...props}
    >
      {children}
    </div>
  )
);
CardHeader.displayName = "Card.Header";

const CardBody = forwardRef<HTMLDivElement, CardSectionProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("px-6 py-4", className)}
      {...props}
    >
      {children}
    </div>
  )
);
CardBody.displayName = "Card.Body";

const CardFooter = forwardRef<HTMLDivElement, CardSectionProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "px-6 pb-6 pt-2 border-t border-[var(--border-muted)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
CardFooter.displayName = "Card.Footer";

/* ── Main Card component ─────────────────────────────────────── */

const CardRoot = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", disableHover = false, children, ...props }, ref) => {
    const prefersReducedMotion = useReducedMotion();
    const shouldAnimate = !disableHover && !prefersReducedMotion;

    return (
      <CardContext.Provider value={{ variant: variant ?? "default" }}>
        <motion.div
          ref={ref}
          className={cn(cardVariants({ variant }), className)}
          whileHover={
            shouldAnimate
              ? { y: -4, boxShadow: "0 20px 25px -5px rgba(118, 85, 232, 0.1), 0 8px 10px -6px rgba(118, 85, 232, 0.05)" }
              : undefined
          }
          transition={
            shouldAnimate
              ? { type: "spring", stiffness: 400, damping: 25, duration: 0.2 }
              : undefined
          }
          {...props}
        >
          {children}
        </motion.div>
      </CardContext.Provider>
    );
  }
);
CardRoot.displayName = "Card";

/* ── Compound component export ────────────────────────────────── */

/**
 * Card with compound sub-components:
 * - `Card` — outer wrapper
 * - `Card.Header` — top section
 * - `Card.Body` — main content
 * - `Card.Footer` — bottom section with top border
 */
const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});

export { useContext as _useCardContext, CardContext };
export default Card;
