"use client";

import * as React from "react";
import {
  motion,
  useReducedMotion,
  AnimatePresence,
  type HTMLMotionProps,
} from "framer-motion";
import { AlertCircle, ChevronDown, RefreshCw } from "lucide-react";
import { cn } from "@/lib/cn";

/* ─── Types ───────────────────────────────────────────────── */

export type ErrorStateProps = Omit<HTMLMotionProps<"div">, "children"> & {
  /** Headline text */
  title: string;
  /** Supportive description */
  description?: string;
  /** Retry callback. If provided, a retry button is shown. */
  onRetry?: () => void;
  /** Technical error details, shown in a collapsible section. */
  errorDetails?: string;
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

const detailsMotion = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.2, ease: "easeOut" as const },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.15, ease: "easeIn" as const },
  },
};

const detailsStatic = {
  hidden: { height: "auto", opacity: 1 },
  visible: { height: "auto", opacity: 1 },
  exit: { height: 0, opacity: 0 },
};

/* ─── Component ───────────────────────────────────────────── */

const ErrorState = React.forwardRef<HTMLDivElement, ErrorStateProps>(
  (
    { className, title, description, onRetry, errorDetails, ...props },
    ref,
  ) => {
    const prefersReducedMotion = useReducedMotion();
    const variants = prefersReducedMotion ? staticVariant : fadeUp;
    const [isDetailsOpen, setIsDetailsOpen] = React.useState(false);
    const detailsVars = prefersReducedMotion ? detailsStatic : detailsMotion;

    return (
      <motion.div
        ref={ref}
        variants={variants}
        initial="hidden"
        animate="visible"
        role="alert"
        className={cn(
          "flex flex-col items-center justify-center px-6 py-16 text-center",
          className,
        )}
        {...props}
      >
        {/* Error icon */}
        <div
          className={cn(
            "mb-6 flex size-16 items-center justify-center",
            "rounded-full bg-[var(--attention-bg)]",
          )}
        >
          <AlertCircle
            className="size-8 text-[var(--attention)]"
            aria-hidden="true"
          />
        </div>

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

        {/* Retry button */}
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className={cn(
              "mt-6 inline-flex items-center gap-2 rounded-[var(--radius-md)] px-5 py-2.5",
              "bg-[var(--attention)] text-white font-medium text-sm",
              "shadow-[var(--shadow-sm)]",
              "transition-all duration-150",
              "hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5",
              "active:scale-[0.98] active:shadow-[var(--shadow-sm)]",
              "focus-ring",
            )}
          >
            <RefreshCw className="size-4" aria-hidden="true" />
            Try again
          </button>
        )}

        {/* Collapsible error details */}
        {errorDetails && (
          <div className="mt-6 w-full max-w-lg">
            <button
              type="button"
              onClick={() => setIsDetailsOpen((prev) => !prev)}
              className={cn(
                "inline-flex items-center gap-1.5 text-xs font-medium",
                "text-[var(--ink-muted)] transition-colors hover:text-[var(--ink)]",
                "focus-ring rounded-[var(--radius-sm)] px-2 py-1",
              )}
              aria-expanded={isDetailsOpen}
            >
              <ChevronDown
                className={cn(
                  "size-3.5 transition-transform duration-200",
                  isDetailsOpen && "rotate-180",
                )}
                aria-hidden="true"
              />
              {isDetailsOpen ? "Hide" : "Show"} error details
            </button>

            <AnimatePresence>
              {isDetailsOpen && (
                <motion.div
                  variants={detailsVars}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="overflow-hidden"
                >
                  <pre
                    className={cn(
                      "mt-2 w-full overflow-x-auto rounded-[var(--radius-md)] p-4 text-left",
                      "bg-[var(--surface-sunken)] border border-[var(--border)]",
                      "font-code text-xs leading-relaxed text-[var(--ink-muted)]",
                      "whitespace-pre-wrap break-words",
                    )}
                  >
                    {errorDetails}
                  </pre>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Mascot slot for Pip */}
        <div data-mascot-slot aria-hidden="true" />
      </motion.div>
    );
  },
);
ErrorState.displayName = "ErrorState";

export default ErrorState;
