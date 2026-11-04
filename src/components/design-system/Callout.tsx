"use client";

import { cn } from "@/lib/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { AlertTriangle, Key, Lightbulb } from "lucide-react";
import type { ReactNode } from "react";

/* ── Variant Definitions ────────────────────────────────────── */

const calloutVariants = cva(
  "relative rounded-lg border-l-4 px-4 py-3 text-sm leading-relaxed",
  {
    variants: {
      variant: {
        tip: "border-l-purple-500 bg-[var(--brand-muted)] text-[var(--ink)]",
        warning: "border-l-coral-500 bg-[var(--attention-bg)] text-[var(--attention-text)]",
        "key-takeaway": "border-l-mint-500 bg-[var(--success-bg)] text-[var(--success-text)]",
      },
    },
    defaultVariants: {
      variant: "tip",
    },
  }
);

/* ── Types ──────────────────────────────────────────────────── */

export interface CalloutProps extends VariantProps<typeof calloutVariants> {
  /** Callout type */
  variant: "tip" | "warning" | "key-takeaway";
  /** Content to display */
  children: ReactNode;
  /** Optional custom title */
  title?: string;
  /** Additional class names */
  className?: string;
}

/* ── Helpers ────────────────────────────────────────────────── */

const variantConfig = {
  tip: {
    icon: Lightbulb,
    defaultTitle: "Tip",
    iconColor: "text-purple-500",
  },
  warning: {
    icon: AlertTriangle,
    defaultTitle: "Warning",
    iconColor: "text-coral-500",
  },
  "key-takeaway": {
    icon: Key,
    defaultTitle: "Key Takeaway",
    iconColor: "text-mint-600",
  },
} as const;

/* ── Component ──────────────────────────────────────────────── */

export default function Callout({
  variant,
  children,
  title,
  className,
}: CalloutProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <div
      role="note"
      className={cn(calloutVariants({ variant }), className)}
    >
      <div className="flex items-start gap-2.5">
        <Icon
          size={16}
          className={cn("mt-0.5 shrink-0", config.iconColor)}
          aria-hidden
        />
        <div className="flex flex-col gap-0.5">
          <span className="font-heading font-semibold text-[0.8125rem] leading-snug">
            {title ?? config.defaultTitle}
          </span>
          <div className="leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}
