"use client";

import * as React from "react";
import {
  motion,
  useReducedMotion,
  AnimatePresence,
  type HTMLMotionProps,
} from "framer-motion";
import { ChevronDown, RefreshCw } from "lucide-react";
import { cn } from "@/lib/cn";
import Mascot from "./Mascot";

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
          "flex flex-col items-center justify-center px-6 py-14 text-center",
          className,
        )}
        {...props}
      >
        {/* Mascot in encouraging state */}
        <div className="mb-5 flex items-center justify-center" data-mascot-slot>
          <Mascot state="encourage" size="md" label="Pip is encouraging you" />
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

        {/* Retry action */}
        {onRetry && (
          <div className="mt-6">
            <button
              type="button"
              onClick={onRetry}
              className={cn(
                "inline-flex items-center gap-2 rounded-none px-5 py-2.5",
                "bg-[var(--brand)] text-white text-sm font-bold ",
                "transition-transform hover:scale-[1.02] active:scale-[0.98]",
                "focus-ring"
              )}
            >
              <RefreshCw className="size-4" aria-hidden="true" />
              Try again
            </button>
          </div>
        )}

        {/* Collapsible error details */}
        {errorDetails && (
          <div className="mt-6 w-full max-w-md">
            <button
              type="button"
              onClick={() => setIsDetailsOpen((prev) => !prev)}
              aria-expanded={isDetailsOpen}
              className={cn(
                "inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ink-muted)]",
                "hover:text-[var(--ink)] transition-colors focus-ring rounded-none px-2 py-1",
              )}
            >
              <span>{isDetailsOpen ? "Hide technical details" : "Show technical details"}</span>
              <ChevronDown
                className={cn(
                  "size-3.5 transition-transform duration-200",
                  isDetailsOpen && "rotate-180",
                )}
                aria-hidden="true"
              />
            </button>

            <AnimatePresence initial={false}>
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
                      "mt-2 text-left text-xs font-code text-[var(--attention-text)]",
                      "bg-[var(--attention-bg)] border border-[var(--attention)]",
                      "rounded-none p-3 overflow-x-auto whitespace-pre-wrap break-all",
                    )}
                  >
                    {errorDetails}
                  </pre>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    );
  },
);
ErrorState.displayName = "ErrorState";

export default ErrorState;
export { ErrorState };
