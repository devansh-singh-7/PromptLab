"use client";

import * as React from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { PackageOpen } from "lucide-react";
import { cn } from "@/lib/cn";

/* ─── Types ───────────────────────────────────────────────── */

export type EmptyStateProps = Omit<HTMLMotionProps<"div">, "children"> & {
  /** Headline text */
  title: string;
  /** Supportive description */
  description?: string;
  /** Action area — typically a Button */
  action?: React.ReactNode;
  /** Custom illustration. Defaults to a muted icon placeholder. */
  illustration?: React.ReactNode;
  children?: React.ReactNode;
};

/* ─── Default illustration ────────────────────────────────── */

function DefaultIllustration() {
  return (
    <div
      className={cn(
        "flex size-20 items-center justify-center",
        "rounded-[var(--radius-xl)] bg-[var(--surface-raised)]",
        "border border-dashed border-[var(--border)]",
      )}
    >
      <PackageOpen className="size-8 text-[var(--ink-faint)]" aria-hidden="true" />
    </div>
  );
}

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
    { className, title, description, action, illustration, ...props },
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
          "flex flex-col items-center justify-center px-6 py-16 text-center",
          className,
        )}
        {...props}
      >
        {/* Illustration */}
        <div className="mb-6">{illustration ?? <DefaultIllustration />}</div>

        {/* Title */}
        <h3 className="font-heading text-lg font-semibold leading-relaxed text-[var(--ink)]">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--ink-muted)]">
            {description}
          </p>
        )}

        {/* Action */}
        {action && <div className="mt-6">{action}</div>}

        {/* Mascot slot for Pip */}
        <div data-mascot-slot aria-hidden="true" />
      </motion.div>
    );
  },
);
EmptyState.displayName = "EmptyState";

export default EmptyState;
