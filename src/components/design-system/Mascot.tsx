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
  sm: 44,
  md: 72,
  lg: 110,
};

/**
 * Pip — PromptLab's friendly mascot.
 *
 * A small square speech-bubble pixel sprite with caret eyes and expressive states.
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
      className={cn("inline-flex items-center justify-center select-none", className)}
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
      >
        <rect x="18" y="18" width="84" height="64" fill="var(--panel)" stroke="var(--ink)" strokeWidth="3" />
        <path d="M52 82H70L52 100V82Z" fill="var(--panel)" stroke="var(--ink)" strokeWidth="3" />

        {/* Left eye — text caret */}
        <PipEye cx={46} shouldReduceMotion={shouldReduceMotion} state={state} />

        {/* Right eye — text caret */}
        <PipEye cx={74} shouldReduceMotion={shouldReduceMotion} state={state} />

        {/* Mouth varies by state */}
        <PipMouth state={state} />

        {/* State-specific decorations */}
        {state === "wave" && (
          <motion.g
            animate={shouldReduceMotion ? undefined : { rotate: [0, 14, -8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            style={{ transformOrigin: "96px 36px" }}
          >
            <path
              d="M96 38 C104 32, 110 36, 112 44"
              stroke="var(--brand)"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="112" cy="44" r="2.5" fill="var(--brand)" />
          </motion.g>
        )}

        {state === "think" && (
          <g>
            <circle cx="98" cy="26" r="3" fill="var(--brand)" opacity="0.45" />
            <circle cx="106" cy="18" r="2.2" fill="var(--brand)" opacity="0.35" />
            <circle cx="112" cy="11" r="1.5" fill="var(--brand)" opacity="0.25" />
          </g>
        )}

        {state === "cheer" && (
          <g>
            <motion.text
              x="12"
              y="28"
              fontSize="13"
              animate={shouldReduceMotion ? undefined : { y: [28, 22, 28] }}
              transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
            >
              ✨
            </motion.text>
            <motion.text
              x="96"
              y="24"
              fontSize="13"
              animate={shouldReduceMotion ? undefined : { y: [24, 18, 24] }}
              transition={{ repeat: Infinity, duration: 1, delay: 0.3, ease: "easeInOut" }}
            >
              🎉
            </motion.text>
          </g>
        )}

        {state === "encourage" && (
          <motion.path
            d="M 94 48 Q 102 44 104 50"
            stroke="#23824F"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            animate={shouldReduceMotion ? undefined : { scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            style={{ transformOrigin: "99px 47px" }}
          />
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
  const height = isThinking ? 6 : 11;
  const y = isThinking ? 42 : 39;

  return (
    <motion.rect
      x={cx - 1.75}
      y={y}
      width={3.5}
      height={height}
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
        duration: 3.2,
        times: [0, 0.88, 0.92, 0.96],
        ease: "easeInOut",
      }}
      style={{ transformOrigin: `${cx}px 45px` }}
    />
  );
}

/** Mouth shape based on state */
function PipMouth({ state }: { state: MascotState }) {
  switch (state) {
    case "cheer":
      return (
        <path
          d="M 50 56 Q 60 67 70 56"
          stroke="var(--brand)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      );
    case "encourage":
      return (
        <path
          d="M 51 58 Q 60 64 69 58"
          stroke="var(--brand)"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
      );
    case "think":
      return (
        <circle cx="60" cy="59" r="3.5" fill="none" stroke="var(--brand)" strokeWidth="2" />
      );
    case "wave":
      return (
        <path
          d="M 51 57 Q 60 63 69 57"
          stroke="var(--brand)"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
      );
    case "rest":
    default:
      return (
        <line
          x1="52"
          y1="59"
          x2="68"
          y2="59"
          stroke="var(--brand)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      );
  }
}

const stateAnimations: Record<MascotState, TargetAndTransition> = {
  wave: {
    y: [0, -3, 0],
    transition: { repeat: Infinity, duration: 2.4, ease: "easeInOut" },
  },
  think: {
    y: [0, -2, 0],
    transition: { repeat: Infinity, duration: 2.8, ease: "easeInOut" },
  },
  cheer: {
    y: [0, -5, 0],
    scale: [1, 1.03, 1],
    transition: { repeat: Infinity, duration: 1.6, ease: "easeInOut" },
  },
  encourage: {
    y: [0, -2, 0],
    transition: { repeat: Infinity, duration: 2.2, ease: "easeInOut" },
  },
  rest: {},
};

export default Mascot;
