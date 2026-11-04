"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

/* ─── Types ───────────────────────────────────────────────── */

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  /** Width override (CSS value). Defaults vary by variant. */
  width?: string | number;
  /** Height override (CSS value). Defaults vary by variant. */
  height?: string | number;
}

/* ─── cva variants ────────────────────────────────────────── */

const skeletonVariants = cva("skeleton-shimmer", {
  variants: {
    variant: {
      text: "h-4 w-full rounded-[var(--radius-sm)]",
      circle: "size-10 rounded-full",
      rectangle: "h-24 w-full rounded-[var(--radius-md)]",
    },
  },
  defaultVariants: {
    variant: "text",
  },
});

/* ─── Component ───────────────────────────────────────────── */

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, width, height, style, ...props }, ref) => {
    const sizeStyle: React.CSSProperties = {
      ...style,
      ...(width != null
        ? { width: typeof width === "number" ? `${width}px` : width }
        : {}),
      ...(height != null
        ? { height: typeof height === "number" ? `${height}px` : height }
        : {}),
    };

    return (
      <div
        ref={ref}
        role="status"
        aria-label="Loading…"
        aria-busy="true"
        className={cn(skeletonVariants({ variant }), className)}
        style={sizeStyle}
        {...props}
      />
    );
  },
);
Skeleton.displayName = "Skeleton";

export default Skeleton;
