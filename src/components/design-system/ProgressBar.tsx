"use client";

import { cn } from "@/lib/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useReducedMotion } from "framer-motion";

/* ── Variant Definitions ────────────────────────────────────── */

const trackVariants = cva(
  "w-full overflow-hidden border border-[var(--border)] bg-[var(--surface-sunken)]",
  {
    variants: {
      height: {
        sm: "h-1.5",
        md: "h-2.5",
        lg: "h-4",
      },
    },
    defaultVariants: {
      height: "md",
    },
  }
);

/* ── Types ──────────────────────────────────────────────────── */

export interface ProgressBarBaseProps extends VariantProps<typeof trackVariants> {
  /** Progress value 0–100 */
  value: number;
  /** Show numeric percentage label */
  showLabel?: boolean;
  /** Additional class names */
  className?: string;
  /** Accessible label */
  "aria-label"?: string;
}

export interface LinearProgressBarProps extends ProgressBarBaseProps {
  mode: "linear";
}

export interface SegmentedProgressBarProps extends ProgressBarBaseProps {
  mode: "segmented";
  /** Total number of segments */
  segments: number;
  /** Number of filled segments (derived from value if omitted) */
  filledSegments?: number;
}

export type ProgressBarProps = LinearProgressBarProps | SegmentedProgressBarProps;

/* ── Component ──────────────────────────────────────────────── */

export default function ProgressBar(props: ProgressBarProps) {
  const {
    value,
    height,
    showLabel = false,
    className,
    "aria-label": ariaLabel,
  } = props;

  const reducedMotion = useReducedMotion();
  const clampedValue = Math.max(0, Math.min(100, value));

  const isComplete = clampedValue >= 100;

  const fillColor = isComplete ? "bg-[var(--success)]" : "bg-[var(--accent)]";

  if (props.mode === "segmented") {
    const { segments, filledSegments } = props;
    const filled =
      filledSegments !== undefined
        ? filledSegments
        : Math.round((clampedValue / 100) * segments);
    const clampedFilled = Math.max(0, Math.min(segments, filled));

    return (
      <div className={cn("flex flex-col gap-1.5", className)}>
        {showLabel && (
          <span className="text-sm font-medium text-[var(--ink-muted)] tabular-nums self-end">
            {clampedFilled}/{segments}
          </span>
        )}
        <div
          role="progressbar"
          aria-valuenow={clampedValue}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={ariaLabel ?? `Progress: ${clampedFilled} of ${segments} segments`}
          className="flex gap-1.5"
        >
          {Array.from({ length: segments }, (_, i) => {
            const isFilled = i < clampedFilled;
            const segmentComplete = clampedFilled >= segments;
            const segmentColor = isFilled
              ? segmentComplete
                ? "bg-[var(--success)]"
                : "bg-[var(--accent)]"
              : "bg-[var(--surface-sunken)]";

            return (
              <motion.div
                key={i}
                className={cn(
                  "flex-1 border border-[var(--border)] transition-colors",
                  height === "sm" ? "h-1.5" : height === "lg" ? "h-4" : "h-2.5",
                  segmentColor
                )}
                initial={reducedMotion ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                  delay: i * 0.05,
                }}
                style={{ originX: 0 }}
              />
            );
          })}
        </div>
      </div>
    );
  }

  // Linear mode
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {showLabel && (
        <span className="text-sm font-medium text-[var(--ink-muted)] tabular-nums self-end">
          {Math.round(clampedValue)}%
        </span>
      )}
      <div
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={ariaLabel ?? `Progress: ${Math.round(clampedValue)}%`}
        className={trackVariants({ height })}
      >
        <motion.div
          className={cn("h-full", fillColor)}
          initial={reducedMotion ? false : { width: "0%" }}
          animate={{ width: `${clampedValue}%` }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            duration: 0.6,
          }}
        />
      </div>
    </div>
  );
}
