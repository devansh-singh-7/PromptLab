"use client";

import { cn } from "@/lib/cn";
import { cva, type VariantProps } from "class-variance-authority";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type TargetAndTransition,
} from "framer-motion";
import { Check, Lock, Star } from "lucide-react";
import ProgressRing from "./ProgressRing";

/* ── Variant Definitions ────────────────────────────────────── */

const nodeSize = cva(
  "relative flex items-center justify-center rounded-full transition-shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)]",
  {
    variants: {
      size: {
        sm: "h-10 w-10",
        md: "h-14 w-14",
        lg: "h-20 w-20",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

/* ── Types ──────────────────────────────────────────────────── */

export type PathNodeState =
  | "locked"
  | "available"
  | "in-progress"
  | "completed"
  | "mastered";

export interface PathNodeProps extends VariantProps<typeof nodeSize> {
  /** Current state of the node */
  state: PathNodeState;
  /** Progress percentage (used when state is "in-progress") */
  progress?: number;
  /** Node label (for accessibility and optional display) */
  label?: string;
  /** Click handler */
  onClick?: () => void;
  /** Additional class names */
  className?: string;
}

/* ── Helpers ────────────────────────────────────────────────── */

function getSizePixels(size: "sm" | "md" | "lg" | null | undefined): number {
  switch (size) {
    case "sm":
      return 40;
    case "lg":
      return 80;
    default:
      return 56;
  }
}

function getIconSize(size: "sm" | "md" | "lg" | null | undefined): number {
  switch (size) {
    case "sm":
      return 14;
    case "lg":
      return 28;
    default:
      return 20;
  }
}

/* ── Component ──────────────────────────────────────────────── */

export default function PathNode({
  state,
  size,
  progress = 0,
  label,
  onClick,
  className,
}: PathNodeProps) {
  const reducedMotion = useReducedMotion();
  const iconSize = getIconSize(size);
  const sizePixels = getSizePixels(size);

  const isInteractive = state !== "locked";

  // State-based styles
  const stateStyles: Record<PathNodeState, string> = {
    locked:
      "bg-[var(--surface-sunken)] border-2 border-[var(--border)] text-[var(--ink-faint)] cursor-not-allowed opacity-60",
    available:
      "bg-[var(--surface)] border-2 border-[var(--brand)] text-[var(--brand)] cursor-pointer shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)]",
    "in-progress":
      "bg-[var(--brand)] border-2 border-[var(--brand)] text-[var(--ink-inverse)] cursor-pointer shadow-[var(--shadow-glow)]",
    completed:
      "bg-mint-500 border-2 border-mint-500 text-white cursor-pointer shadow-[var(--shadow-glow-mint)]",
    mastered:
      "bg-gold-400 border-2 border-gold-400 text-white cursor-pointer shadow-[var(--shadow-glow-gold)]",
  };

  // Pulsing animation for available state
  const pulseAnimation: TargetAndTransition =
    state === "available" && !reducedMotion
      ? {
          scale: [1, 1.06, 1],
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut" as const,
            type: "tween",
          },
        }
      : {};

  const renderIcon = () => {
    switch (state) {
      case "locked":
        return <Lock size={iconSize} aria-hidden />;
      case "available":
        return (
          <span
            className="rounded-full bg-[var(--brand)] block"
            style={{ width: iconSize * 0.45, height: iconSize * 0.45 }}
            aria-hidden
          />
        );
      case "in-progress":
        return (
          <ProgressRing
            value={progress}
            size={sizePixels * 0.6}
            strokeWidth={size === "sm" ? 2 : 3}
            color="var(--ink-inverse)"
            showLabel={size !== "sm"}
            className="pointer-events-none"
          />
        );
      case "completed":
        return <Check size={iconSize} strokeWidth={3} aria-hidden />;
      case "mastered":
        return <Star size={iconSize} fill="currentColor" aria-hidden />;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.button
        key={state}
        type="button"
        disabled={state === "locked"}
        onClick={isInteractive ? onClick : undefined}
        aria-label={
          label
            ? `${label} — ${state}`
            : `Node: ${state}`
        }
        className={cn(nodeSize({ size }), stateStyles[state], className)}
        // Mount/exit animation
        initial={reducedMotion ? false : { scale: 0.8, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          ...pulseAnimation,
        }}
        exit={reducedMotion ? undefined : { scale: 0.8, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 22,
        }}
        whileHover={
          isInteractive && !reducedMotion
            ? { scale: 1.08, transition: { type: "spring", stiffness: 400, damping: 20 } }
            : undefined
        }
        whileTap={
          isInteractive && !reducedMotion
            ? { scale: 0.95 }
            : undefined
        }
      >
        {renderIcon()}
      </motion.button>
    </AnimatePresence>
  );
}
