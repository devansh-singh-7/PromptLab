"use client";

import { cn } from "@/lib/cn";
import confetti from "canvas-confetti";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";

/* ── Types ──────────────────────────────────────────────────── */

export interface CelebrationOverlayProps {
  /** Whether the overlay is visible */
  open: boolean;
  /** Called when the overlay should close */
  onClose: () => void;
  /** Congratulatory heading */
  title?: string;
  /** Sub-message */
  message?: string;
  /** XP earned */
  xpEarned?: number;
  /** Level-up information */
  levelUp?: {
    newLevel: number;
    label?: string;
  };
  /** Additional class names */
  className?: string;
}

/* ── Component ──────────────────────────────────────────────── */

export default function CelebrationOverlay({
  open,
  onClose,
  title = "Congratulations!",
  message,
  xpEarned,
  levelUp,
  className,
}: CelebrationOverlayProps) {
  const reducedMotion = useReducedMotion();
  const hasFiredRef = useRef(false);

  // Fire confetti burst (respects reduced motion)
  const fireConfetti = useCallback(() => {
    if (reducedMotion || hasFiredRef.current) return;
    hasFiredRef.current = true;

    const duration = 2500;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ["#7655e8", "#29c5a4", "#ffca55", "#f25c41"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ["#7655e8", "#29c5a4", "#ffca55", "#f25c41"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    // Initial big burst
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#7655e8", "#29c5a4", "#ffca55", "#f25c41"],
    });

    requestAnimationFrame(frame);
  }, [reducedMotion]);

  // Fire on open
  useEffect(() => {
    if (open) {
      hasFiredRef.current = false;
      fireConfetti();
    }
  }, [open, fireConfetti]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className={cn(
            "fixed inset-0 z-[100] flex items-center justify-center",
            className
          )}
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-[var(--surface-overlay)] backdrop-blur-sm" />

          {/* Content card */}
          <motion.div
            className="relative z-10 mx-4 flex max-w-sm flex-col items-center gap-5 rounded-2xl bg-[var(--surface)] p-8 text-center shadow-[var(--shadow-xl)]"
            initial={reducedMotion ? false : { scale: 0.8, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={reducedMotion ? undefined : { scale: 0.9, y: 20 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 22,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close celebration"
              className="absolute right-3 top-3 rounded-lg p-1.5 text-[var(--ink-muted)] transition-colors hover:bg-[var(--surface-sunken)] hover:text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)]"
            >
              <X size={18} aria-hidden />
            </button>

            {/* Icon */}
            <motion.div
              className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-400 text-white shadow-[var(--shadow-glow)]"
              initial={reducedMotion ? false : { rotate: -15, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.15,
              }}
            >
              <Sparkles size={28} aria-hidden />
            </motion.div>

            {/* Title */}
            <h2 className="font-heading text-2xl font-bold text-[var(--ink)] leading-snug">
              {title}
            </h2>

            {/* Message */}
            {message && (
              <p className="text-sm leading-relaxed text-[var(--ink-muted)]">
                {message}
              </p>
            )}

            {/* Stats row */}
            {(xpEarned !== undefined || levelUp) && (
              <div className="flex items-center gap-4">
                {xpEarned !== undefined && (
                  <motion.div
                    className="flex flex-col items-center gap-0.5 rounded-xl bg-[var(--reward-bg)] px-4 py-2"
                    initial={reducedMotion ? false : { y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <span className="text-lg font-heading font-bold text-[var(--reward-text)] tabular-nums">
                      +{xpEarned}
                    </span>
                    <span className="text-xs font-medium text-[var(--reward-text)] opacity-80">
                      XP
                    </span>
                  </motion.div>
                )}

                {levelUp && (
                  <motion.div
                    className="flex flex-col items-center gap-0.5 rounded-xl bg-[var(--brand-muted)] px-4 py-2"
                    initial={reducedMotion ? false : { y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <span className="text-lg font-heading font-bold text-[var(--brand)] tabular-nums">
                      Lv. {levelUp.newLevel}
                    </span>
                    <span className="text-xs font-medium text-[var(--brand)] opacity-80">
                      {levelUp.label ?? "Level Up!"}
                    </span>
                  </motion.div>
                )}
              </div>
            )}

            {/* Dismiss CTA */}
            <button
              type="button"
              onClick={onClose}
              className="mt-1 rounded-xl bg-gradient-to-r from-purple-500 to-purple-400 px-6 py-2.5 text-sm font-semibold text-white shadow-[var(--shadow-md)] transition-all hover:shadow-[var(--shadow-lg)] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)]"
            >
              Continue
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
