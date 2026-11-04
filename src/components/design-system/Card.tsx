"use client";

import { forwardRef, createContext, useContext, type ReactNode, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/cn";

/* ── Variant definitions ─────────────────────────────────────── */

const cardVariants = cva(
  "rounded-none border-2 border-[var(--border)] transition-[filter,transform]",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--surface-raised)]",
        outlined:
          "bg-[var(--surface)]",
        elevated:
          "bg-[var(--surface-raised)]",
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

/* ── Context ─────────────────────────────────────────────────── */

const CardContext = createContext<{ variant: CardVariant }>({
  variant: "default",
});

/* ── Sub-components ───────────────────────────────────────────── */

export const CardHeader = forwardRef<HTMLDivElement, CardSectionProps>(
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

export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("font-heading text-xl font-bold text-[var(--ink)]", className)}
      {...props}
    >
      {children}
    </h3>
  )
);
CardTitle.displayName = "CardTitle";

export const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-[var(--ink-muted)] leading-relaxed", className)}
      {...props}
    >
      {children}
    </p>
  )
);
CardDescription.displayName = "CardDescription";

export const CardBody = forwardRef<HTMLDivElement, CardSectionProps>(
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

export const CardContent = CardBody;

export const CardFooter = forwardRef<HTMLDivElement, CardSectionProps>(
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
          whileHover={shouldAnimate ? { filter: "brightness(1.08)" } : undefined}
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

const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});

export { useContext as _useCardContext, CardContext };
export default Card;
export { Card };
