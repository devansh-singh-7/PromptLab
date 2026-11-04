"use client";

import { forwardRef, useEffect, useState } from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/cn";

/* ── Types ────────────────────────────────────────────────────── */

export type XPChipProps = Omit<HTMLMotionProps<"span">, "children"> & {
  /** XP amount to display */
  amount: number;
  /** Prefix string (default: "+") */
  prefix?: string;
  /** Suffix string (default: "XP") */
  suffix?: string;
  /** Duration of the count-up animation in ms (default: 800) */
  countUpDuration?: number;
};

/* ── Count-up hook ────────────────────────────────────────────── */

function useCountUp(target: number, duration: number, shouldAnimate: boolean) {
  const [value, setValue] = useState(shouldAnimate ? 0 : target);

  useEffect(() => {
    if (!shouldAnimate) {
      setValue(target);
      return;
    }

    let startTime: number | null = null;
    let frameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for a nice deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [target, duration, shouldAnimate]);

  return value;
}

/* ── Component ────────────────────────────────────────────────── */

const XPChip = forwardRef<HTMLSpanElement, XPChipProps>(
  (
    {
      className,
      amount,
      prefix = "+",
      suffix = "XP",
      countUpDuration = 800,
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion() ?? false;
    const displayValue = useCountUp(amount, countUpDuration, !prefersReducedMotion);

    return (
      <motion.span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1",
          "rounded-none",
          "px-3 py-1",
          "text-sm font-bold leading-snug",
          "bg-[var(--reward-bg)] text-[var(--reward-text)]",
          "",
          "select-none whitespace-nowrap",
          className
        )}
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8, y: -4 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        role="status"
        aria-label={`${prefix}${amount} ${suffix}`}
        {...props}
      >
        <span aria-hidden="true">✦</span>
        <span>
          {prefix}
          {displayValue} {suffix}
        </span>
      </motion.span>
    );
  }
);
XPChip.displayName = "XPChip";

export default XPChip;
