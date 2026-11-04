"use client";

import * as React from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/cn";
import Mascot, { type MascotState } from "./Mascot";

/* ─── Types ───────────────────────────────────────────────── */

export type EmptyStateProps = Omit<HTMLMotionProps<"div">, "children"> & {
  /** Headline text */
  title: string;
  /** Supportive description */
  description?: string;
  /** Action area — typically a Button */
  action?: React.ReactNode;
  /** Custom mascot state (default: "think") */
  mascotState?: MascotState;
  /** Custom illustration. If omitted, renders Pip with mascotState. */
  illustration?: React.ReactNode;
  children?: React.ReactNode;
};

/* ─── Motion ──────────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 24, stiffness: 260, mass: 0.5 },
  },
};

const staticVariant = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
};

/* ─── Component ───────────────────────────────────────────── */

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      className,
      title,
      description,
      action,
      mascotState = "think",
      illustration,
      ...props
    },
    ref,
  ) => {
    const prefersReducedMotion = useReducedMotion();
    const variants = prefersReducedMotion ? staticVariant : fadeUp;

    return (
      <motion.div
        ref={ref}
        variants={variants}
        initial="hidden"
        animate="visible"
        className={cn(
          "flex flex-col items-center justify-center px-6 py-14 text-center",
          className,
        )}
        {...props}
      >
        {/* Mascot / Illustration */}
        <div className="mb-5 flex items-center justify-center" data-mascot-slot>
          {illustration ?? <Mascot state={mascotState} size="lg" label={`Pip is ${mascotState}ing`} />}
        </div>

        {/* Title */}
        <h3 className="font-heading text-lg font-bold leading-snug text-[var(--ink)]">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-[var(--ink-muted)]">
            {description}
          </p>
        )}

        {/* Action */}
        {action && <div className="mt-6">{action}</div>}
      </motion.div>
    );
  },
);
EmptyState.displayName = "EmptyState";

export default EmptyState;
export { EmptyState };
