"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import {
  X,
  Info,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/cn";

/* ─── Constants ───────────────────────────────────────────── */

const MAX_VISIBLE_TOASTS = 3;
const DEFAULT_DURATION = 5000;

/* ─── Types ───────────────────────────────────────────────── */

export type ToastVariant = "info" | "success" | "warning" | "error";

export interface ToastData {
  id: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

export interface ToastOptions {
  title: string;
  description?: string;
  variant?: ToastVariant;
  /** Auto-dismiss duration in ms. Set 0 to disable. Default: 5000 */
  duration?: number;
}

export interface UseToastReturn {
  toasts: ToastData[];
  toast: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

/* ─── cva toast styles ────────────────────────────────────── */

const toastVariants = cva(
  [
    "relative flex w-full max-w-sm items-start gap-3 overflow-hidden",
    "rounded-[var(--radius-lg)] border p-4 shadow-[var(--shadow-lg)]",
    "pointer-events-auto",
  ],
  {
    variants: {
      variant: {
        info: "border-purple-200 bg-purple-50 text-purple-900 dark:border-purple-800 dark:bg-purple-900/30 dark:text-purple-100",
        success:
          "border-mint-200 bg-mint-50 text-mint-900 dark:border-mint-800 dark:bg-mint-900/30 dark:text-mint-100",
        warning:
          "border-coral-200 bg-coral-50 text-coral-900 dark:border-coral-800 dark:bg-coral-900/30 dark:text-coral-100",
        error:
          "border-coral-300 bg-coral-100 text-coral-900 dark:border-coral-700 dark:bg-coral-900/40 dark:text-coral-100",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  },
);

/* ─── Icon map ────────────────────────────────────────────── */

const variantIcons: Record<ToastVariant, React.ElementType> = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: AlertCircle,
};

const variantIconColors: Record<ToastVariant, string> = {
  info: "text-[var(--brand)]",
  success: "text-[var(--success)]",
  warning: "text-[var(--attention)]",
  error: "text-coral-700 dark:text-coral-400",
};

/* ─── Motion variants ─────────────────────────────────────── */

const toastMotion = {
  hidden: { opacity: 0, x: 80, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", damping: 22, stiffness: 300, mass: 0.5 },
  },
  exit: {
    opacity: 0,
    x: 80,
    scale: 0.95,
    transition: { duration: 0.15, ease: "easeIn" },
  },
};

const staticMotion = {
  hidden: { opacity: 1, x: 0, scale: 1 },
  visible: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0 },
};

/* ─── Context ─────────────────────────────────────────────── */

const ToastContext = React.createContext<UseToastReturn | null>(null);

export function useToast(): UseToastReturn {
  const ctx = React.useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a <ToastProvider>");
  }
  return ctx;
}

/* ─── Provider ────────────────────────────────────────────── */

let toastIdCounter = 0;

export interface ToastProviderProps {
  children: React.ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = React.useState<ToastData[]>([]);
  const timersRef = React.useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map(),
  );

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const dismissAll = React.useCallback(() => {
    setToasts([]);
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current.clear();
  }, []);

  const toast = React.useCallback(
    (options: ToastOptions): string => {
      const id = `toast-${++toastIdCounter}`;
      const duration = options.duration ?? DEFAULT_DURATION;
      const newToast: ToastData = { id, ...options, duration };

      setToasts((prev) => {
        const next = [...prev, newToast];
        // Only keep the latest MAX_VISIBLE_TOASTS
        if (next.length > MAX_VISIBLE_TOASTS) {
          const removed = next.splice(0, next.length - MAX_VISIBLE_TOASTS);
          removed.forEach((r) => {
            const timer = timersRef.current.get(r.id);
            if (timer) {
              clearTimeout(timer);
              timersRef.current.delete(r.id);
            }
          });
        }
        return next;
      });

      if (duration > 0) {
        const timer = setTimeout(() => dismiss(id), duration);
        timersRef.current.set(id, timer);
      }

      return id;
    },
    [dismiss],
  );

  // Cleanup on unmount
  React.useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
      timers.clear();
    };
  }, []);

  const value = React.useMemo(
    () => ({ toasts, toast, dismiss, dismissAll }),
    [toasts, toast, dismiss, dismissAll],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport />
    </ToastContext.Provider>
  );
}

/* ─── Single Toast Item ───────────────────────────────────── */

interface ToastItemProps extends VariantProps<typeof toastVariants> {
  data: ToastData;
  onDismiss: (id: string) => void;
}

function ToastItem({ data, onDismiss }: ToastItemProps) {
  const prefersReducedMotion = useReducedMotion();
  const variant: ToastVariant = data.variant ?? "info";
  const Icon = variantIcons[variant];
  const variants = prefersReducedMotion ? staticMotion : toastMotion;

  return (
    <motion.div
      layout
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={cn(toastVariants({ variant }))}
      role="status"
      aria-live="polite"
    >
      {/* Icon */}
      <Icon
        className={cn("mt-0.5 size-5 shrink-0", variantIconColors[variant])}
        aria-hidden="true"
      />

      {/* Body */}
      <div className="flex-1 space-y-1">
        <p className="text-sm font-semibold leading-relaxed">{data.title}</p>
        {data.description && (
          <p className="text-sm leading-relaxed opacity-80">
            {data.description}
          </p>
        )}
      </div>

      {/* Close */}
      <button
        type="button"
        onClick={() => onDismiss(data.id)}
        className={cn(
          "inline-flex size-6 shrink-0 items-center justify-center",
          "rounded-[var(--radius-sm)] opacity-60",
          "transition-opacity hover:opacity-100 focus-ring",
        )}
        aria-label="Dismiss notification"
      >
        <X className="size-3.5" />
      </button>
    </motion.div>
  );
}

/* ─── Viewport (renders toasts) ───────────────────────────── */

function ToastViewport() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) return null;
  const { toasts, dismiss } = ctx;

  return (
    <div
      className={cn(
        "pointer-events-none fixed right-0 top-0 z-[100] flex flex-col gap-3 p-4",
        "max-h-screen w-full max-w-sm",
      )}
      aria-label="Notifications"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => (
          <ToastItem key={t.id} data={t} onDismiss={dismiss} />
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ─── Default export ──────────────────────────────────────── */

export default ToastProvider;
