"use client";

import {
  motion,
  useReducedMotion,
  type TargetAndTransition,
} from "framer-motion";
import { cn } from "@/lib/cn";

export type MascotState = "wave" | "think" | "cheer" | "encourage" | "rest";
export type MascotSize = "sm" | "md" | "lg";

export interface MascotProps {
  state?: MascotState;
  size?: MascotSize;
  className?: string;
  /** Accessible label for screen readers */
  label?: string;
}

const sizeMap: Record<MascotSize, number> = {
  sm: 48,
  md: 80,
  lg: 120,
};

/**
 * Pip — PromptLab's friendly mascot.
 *
 * A rounded speech-bubble character with a blinking text-caret for eyes.
 * These are SVG placeholders designed for easy replacement with final art
 * without touching callers — just swap the SVG internals per state.
 */
export function Mascot({
  state = "rest",
  size = "md",
  className,
  label,
}: MascotProps) {
  const shouldReduceMotion = useReducedMotion();
  const px = sizeMap[size];

  return (
    <div
      className={cn("inline-flex items-center justify-center", className)}
      role="img"
      aria-label={label ?? `Pip mascot: ${state}`}
    >
      <motion.svg
        width={px}
        height={px}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={shouldReduceMotion ? undefined : stateAnimations[state]}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Speech bubble body */}
        <motion.path
          d="M20 20 C20 8, 100 8, 100 20 L100 70 C100 82, 20 82, 20 70 Z"
          fill="var(--brand)"
          opacity={0.15}
          rx={24}
        />
        <motion.path
          d="M24 24 C24 14, 96 14, 96 24 L96 66 C96 76, 24 76, 24 66 Z"
          fill="var(--surface-raised)"
          stroke="var(--brand)"
          strokeWidth={2}
          rx={20}
        />

        {/* Speech bubble tail */}
        <path
          d="M45 76 L55 92 L65 76"
          fill="var(--surface-raised)"
          stroke="var(--brand)"
          strokeWidth={2}
          strokeLinejoin="round"
        />
        {/* Cover the stroke on the body where tail meets */}
        <rect x={47} y={74} width={17} height={4} fill="var(--surface-raised)" />

        {/* Left eye — text caret */}
        <PipEye cx={46} shouldReduceMotion={shouldReduceMotion} state={state} />

        {/* Right eye — text caret */}
        <PipEye cx={74} shouldReduceMotion={shouldReduceMotion} state={state} />

        {/* Mouth varies by state */}
        <PipMouth state={state} />

        {/* State-specific decorations */}
        {state === "wave" && (
          <motion.path
            d="M98 30 Q108 20 104 35"
            stroke="var(--brand)"
            strokeWidth={2.5}
            strokeLinecap="round"
            fill="none"
            animate={shouldReduceMotion ? undefined : { rotate: [0, 15, -10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", type: "tween" }}
            style={{ transformOrigin: "98px 30px" }}
          />
        )}

        {state === "think" && (
          <>
            <circle cx={100} cy={28} r={3} fill="var(--brand)" opacity={0.4} />
            <circle cx={106} cy={20} r={2} fill="var(--brand)" opacity={0.3} />
            <circle cx={110} cy={14} r={1.5} fill="var(--brand)" opacity={0.2} />
          </>
        )}

        {state === "cheer" && (
          <>
            <motion.text
              x={14}
              y={30}
              fontSize={14}
              animate={shouldReduceMotion ? undefined : { y: [30, 24, 30] }}
              transition={{ repeat: Infinity, duration: 0.8, type: "tween" }}
            >
              ✨
            </motion.text>
            <motion.text
              x={98}
              y={26}
              fontSize={14}
              animate={shouldReduceMotion ? undefined : { y: [26, 20, 26] }}
              transition={{ repeat: Infinity, duration: 0.8, delay: 0.3, type: "tween" }}
            >
              🎉
            </motion.text>
          </>
        )}
      </motion.svg>
    </div>
  );
}

/** Blinking text-caret eye */
function PipEye({
  cx,
  shouldReduceMotion,
  state,
}: {
  cx: number;
  shouldReduceMotion: boolean | null;
  state: MascotState;
}) {
  const isThinking = state === "think";
  return (
    <motion.rect
      x={cx - 2}
      y={38}
      width={4}
      height={isThinking ? 6 : 12}
      rx={2}
      fill="var(--brand)"
      animate={
        shouldReduceMotion
          ? undefined
          : {
              scaleY: [1, 1, 0.1, 1],
            }
      }
      transition={{
        repeat: Infinity,
        duration: 3,
        times: [0, 0.85, 0.9, 0.95],
        ease: "easeInOut",
        type: "tween",
      }}
      style={{ transformOrigin: `${cx}px 44px` }}
    />
  );
}

/** Mouth shape based on state */
function PipMouth({ state }: { state: MascotState }) {
  switch (state) {
    case "cheer":
      return (
        <path
          d="M48 58 Q60 70 72 58"
          stroke="var(--brand)"
          strokeWidth={2.5}
          strokeLinecap="round"
          fill="none"
        />
      );
    case "encourage":
      return (
        <path
          d="M50 60 Q60 66 70 60"
          stroke="var(--brand)"
          strokeWidth={2}
          strokeLinecap="round"
          fill="none"
        />
      );
    case "think":
      return (
        <circle cx={60} cy={60} r={4} fill="none" stroke="var(--brand)" strokeWidth={2} />
      );
    case "wave":
      return (
        <path
          d="M50 58 Q60 64 70 58"
          stroke="var(--brand)"
          strokeWidth={2}
          strokeLinecap="round"
          fill="none"
        />
      );
    case "rest":
    default:
      return (
        <line
          x1={52}
          y1={60}
          x2={68}
          y2={60}
          stroke="var(--brand)"
          strokeWidth={2}
          strokeLinecap="round"
        />
      );
  }
}

const stateAnimations: Record<MascotState, TargetAndTransition> = {
  wave: {
    rotate: [0, -5, 5, 0],
    y: [0, -2, 0],
    transition: { type: "tween", duration: 1.2, ease: "easeInOut" },
  },
  think: {
    y: [0, -3, 0],
    transition: { type: "tween", duration: 1.4, ease: "easeInOut" },
  },
  cheer: {
    scale: [1, 1.05, 1],
    y: [0, -6, 0],
    transition: { type: "tween", duration: 1, ease: "easeInOut" },
  },
  encourage: {
    y: [0, -2, 0],
    transition: { type: "tween", duration: 1, ease: "easeInOut" },
  },
  rest: {},
};

export default Mascot;
