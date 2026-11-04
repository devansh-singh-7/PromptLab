"use client";

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
  className,
  "aria-label": ariaLabel,
}: ProgressRingProps) {
  const reducedMotion = useReducedMotion();

  const clampedValue = Math.max(0, Math.min(100, value));
  const isComplete = clampedValue >= 100;

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clampedValue / 100) * circumference;

  // Default gradient id for when no custom color is provided
  const gradientId = `progress-ring-gradient-${size}`;

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
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-purple-600)" />
            <stop offset="100%" stopColor="var(--color-purple-400)" />
          </linearGradient>
        </defs>

        {/* Track */}
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
            stiffness: 80,
            damping: 18,
            duration: 0.8,
          }}
        />
      </svg>

      {/* Center label */}
      {showLabel && (
        <span
          className={cn(
            "absolute font-heading font-semibold tabular-nums text-[var(--ink)]",
            size <= 40 ? "text-[0.625rem]" : size <= 64 ? "text-xs" : "text-sm"
          )}
        >
          {Math.round(clampedValue)}%
        </span>
      )}
    </div>
  );
}
