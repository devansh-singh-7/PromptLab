"use client";

import { forwardRef, type ReactNode, type ComponentPropsWithoutRef } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/cn";

/* ── Types ────────────────────────────────────────────────────── */

export interface TooltipProps {
  /** The content shown inside the tooltip */
  content: ReactNode;
  /** The trigger element */
  children: ReactNode;
  /** Side of the trigger to show the tooltip on */
  side?: "top" | "right" | "bottom" | "left";
  /** Alignment of the tooltip relative to the trigger */
  align?: "start" | "center" | "end";
  /** Delay in ms before the tooltip opens (default: 300) */
  delayDuration?: number;
  /** Skip the delay when moving between tooltips */
  skipDelayDuration?: number;
  /** Whether the tooltip is open (controlled) */
  open?: boolean;
  /** Callback when the open state changes */
  onOpenChange?: (open: boolean) => void;
}

export type TooltipContentProps =
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>;

/* ── Content sub-component ────────────────────────────────────── */

const TooltipContent = forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(({ className, sideOffset = 6, children, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        /* Base styles */
        "z-50 overflow-hidden",
        "rounded-[var(--radius-sm)]",
        "px-3 py-1.5",
        "text-xs font-medium leading-snug",
        /* Colors — dark navy bg, white text */
        "bg-navy-900 text-white",
        "dark:bg-navy-100 dark:text-navy-900",
        /* Shadow */
        "shadow-[var(--shadow-md)]",
        /* Animation */
        "animate-in fade-in-0 zoom-in-95",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        "data-[side=top]:slide-in-from-bottom-2",
        "data-[side=bottom]:slide-in-from-top-2",
        "data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2",
        className
      )}
      {...props}
    >
      {children}
      <TooltipPrimitive.Arrow
        className="fill-navy-900 dark:fill-navy-100"
        width={10}
        height={5}
      />
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = "TooltipContent";

/* ── Main Tooltip component ───────────────────────────────────── */

/**
 * Tooltip built on @radix-ui/react-tooltip.
 *
 * Wrap around any element to show a tooltip on hover/focus.
 *
 * ```tsx
 * <Tooltip content="Hello!">
 *   <button>Hover me</button>
 * </Tooltip>
 * ```
 */
function Tooltip({
  children,
  content,
  side = "top",
  align = "center",
  delayDuration = 300,
  skipDelayDuration = 100,
  open,
  onOpenChange,
}: TooltipProps) {
  return (
    <TooltipPrimitive.Provider
      delayDuration={delayDuration}
      skipDelayDuration={skipDelayDuration}
    >
      <TooltipPrimitive.Root open={open} onOpenChange={onOpenChange}>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipContent side={side} align={align}>
          {content}
        </TooltipContent>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
Tooltip.displayName = "Tooltip";

export { TooltipContent };
export default Tooltip;
