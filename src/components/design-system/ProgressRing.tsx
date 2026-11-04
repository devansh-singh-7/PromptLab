"use client";

import { useId } from "react";
import { cn } from "@/lib/cn";
import { motion, useReducedMotion } from "framer-motion";

/* ── Types ──────────────────────────────────────────────────── */

export interface ProgressRingProps {
  /** Progress value 0–100 */
  value: number;
  /** Diameter in pixels */
  size?: number;
  /** Stroke width in pixels */
  strokeWidth?: number;
  /** Custom color override (CSS color string) */
  color?: string;
  /** Show percentage text in center */
  showLabel?: boolean;
  /** Custom center label or React node (overrides percentage) */
  children?: React.ReactNode;
  /** Additional class names on the wrapper */
  className?: string;
  /** Accessible label */
  "aria-label"?: string;
}

/* ── Component ──────────────────────────────────────────────── */

export default function ProgressRing({
  value,
  size = 64,
  strokeWidth = 5,
  color,
  showLabel = true,
  children,
  className,
  "aria-label": ariaLabel,
}: ProgressRingProps) {
  const reducedMotion = useReducedMotion();
  const rawId = useId();
  const gradientId = `progress-ring-gradient-${rawId.replace(/:/g, "")}`;

  const clampedValue = Math.max(0, Math.min(100, value));
  const isComplete = clampedValue >= 100;

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clampedValue / 100) * circumference;

  // Pick stroke color
  const resolvedColor = color
    ? color
    : isComplete
      ? "var(--success)"
      : `url(#${gradientId})`;

  return (
    <div
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={ariaLabel ?? `Progress: ${Math.round(clampedValue)}%`}
      className={cn("relative inline-flex items-center justify-center shrink-0", className)}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90 overflow-visible"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--select)" />
            <stop offset="100%" stopColor="var(--select)" />
          </linearGradient>
        </defs>

        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--surface-sunken)"
          strokeWidth={strokeWidth}
        />

        {/* Progress arc */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={resolvedColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={
            reducedMotion
              ? { strokeDashoffset: offset }
              : { strokeDashoffset: circumference }
          }
          animate={{ strokeDashoffset: offset }}
          transition={{
            type: "spring",
            stiffness: 70,
            damping: 18,
          }}
        />
      </svg>

      {/* Center content */}
      {children ? (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {children}
        </div>
      ) : showLabel ? (
        <span
          className={cn(
            "absolute font-heading font-bold tabular-nums text-[var(--ink)] pointer-events-none",
            size <= 44 ? "text-[0.68rem]" : size <= 64 ? "text-xs" : "text-sm"
          )}
        >
          {Math.round(clampedValue)}%
        </span>
      ) : null}
    </div>
  );
}
