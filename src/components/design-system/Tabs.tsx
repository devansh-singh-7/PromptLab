"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { motion, useReducedMotion, LayoutGroup } from "framer-motion";
import { cn } from "@/lib/cn";

/* ═══════════════════════════════════════════════════════════════
   Tabs — Pill-style tabs built on @radix-ui/react-tabs
   ═══════════════════════════════════════════════════════════════ */

/* ─── Root ─────────────────────────────────────────────────── */
export type TabsProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>;

const Tabs = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Root>,
  TabsProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Root
    ref={ref}
    className={cn("flex flex-col gap-4", className)}
    {...props}
  />
));
Tabs.displayName = "Tabs";

/* ─── List ─────────────────────────────────────────────────── */
export type TabsListProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>;

const TabsList = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex items-center gap-1 rounded-full bg-[var(--surface-sunken)] p-1",
      className
    )}
    {...props}
  />
));
TabsList.displayName = "TabsList";

/* ─── Trigger (individual tab) ─────────────────────────────── */
export interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  /** Unique layout id for shared motion indicator. Falls back to value. */
  layoutId?: string;
}

const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, children, value, ...props }, ref) => {
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      value={value}
      className={cn(
        "group relative z-10 inline-flex items-center justify-center rounded-full px-4 py-1.5",
        "text-sm font-medium whitespace-nowrap select-none",
        "text-[var(--ink-muted)] transition-colors duration-[var(--duration-fast)]",
        "outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)]",
        "disabled:pointer-events-none disabled:opacity-50",
        "data-[state=active]:text-[var(--ink-inverse)]",
        "leading-[1.6]",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[var(--brand)] opacity-0 group-data-[state=active]:opacity-100" />
      {children}
    </TabsPrimitive.Trigger>
  );
});
TabsTrigger.displayName = "TabsTrigger";

/* ─── Pill-style trigger with real motion indicator ────────── */
// Re-implemented: cleaner approach using a single list context

const TabsTriggerPill = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, children, value, ...props }, ref) => {
  const prefersReduced = useReducedMotion();

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      value={value}
      className={cn(
        "group relative z-10 inline-flex items-center justify-center rounded-full px-4 py-1.5",
        "text-sm font-medium whitespace-nowrap select-none cursor-pointer",
        "text-[var(--ink-muted)] transition-colors duration-[var(--duration-fast)]",
        "outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)]",
        "disabled:pointer-events-none disabled:opacity-50",
        "data-[state=active]:text-[var(--ink-inverse)]",
        "leading-[1.6]",
        className
      )}
      {...props}
    >
      {/* Animated pill indicator behind active tab */}
      <span
        className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[var(--brand)] opacity-0 data-[state=active]:opacity-100 group-data-[state=active]:opacity-100"
        style={
          prefersReduced
            ? undefined
            : {
                transition: "opacity var(--duration-fast) ease",
              }
        }
      />
      {children}
    </TabsPrimitive.Trigger>
  );
});
TabsTriggerPill.displayName = "TabsTriggerPill";

/* ─── Tabs List with Motion ────────────────────────────────── */
/**
 * A TabsList variant that supports a shared motion indicator
 * moving between tabs. Use with TabsMotionTrigger children.
 */
export type TabsMotionListProps =
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
  /** Unique layout group id for motion sharing */
  layoutGroupId?: string;
};

const TabsMotionList = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  TabsMotionListProps
>(({ className, layoutGroupId = "tabs-indicator", children, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex items-center gap-1 rounded-full bg-[var(--surface-sunken)] p-1",
      className
    )}
    {...props}
  >
    <LayoutGroup id={layoutGroupId}>{children}</LayoutGroup>
  </TabsPrimitive.List>
));
TabsMotionList.displayName = "TabsMotionList";

/* ─── Motion Trigger ───────────────────────────────────────── */
/**
 * A TabsTrigger with a shared layout-animated brand pill.
 * Must be used inside TabsMotionList.
 */
export type TabsMotionTriggerProps =
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>;

const TabsMotionTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  TabsMotionTriggerProps
>(({ className, children, value, ...props }, ref) => {
  const prefersReduced = useReducedMotion();

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      value={value}
      className={cn(
        "group relative z-10 inline-flex items-center justify-center rounded-full px-4 py-1.5",
        "text-sm font-medium whitespace-nowrap select-none cursor-pointer",
        "text-[var(--ink-muted)]",
        "transition-colors duration-[var(--duration-fast)]",
        "outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)]",
        "disabled:pointer-events-none disabled:opacity-50",
        "data-[state=active]:text-[var(--ink-inverse)]",
        "leading-[1.6]",
        className
      )}
      {...props}
    >
      <TabActiveIndicator prefersReduced={prefersReduced} />
      <span className="relative z-10">{children}</span>
    </TabsPrimitive.Trigger>
  );
});
TabsMotionTrigger.displayName = "TabsMotionTrigger";

/* ─── Animated active indicator (internal) ─────────────────── */
function TabActiveIndicator({
  prefersReduced,
}: {
  prefersReduced: boolean | null;
}) {
  return (
    <span className="absolute inset-0 -z-10 hidden group-data-[state=active]:block">
      <motion.span
        layoutId="tab-active-pill"
        className="block h-full w-full rounded-full bg-[var(--brand)] shadow-[var(--shadow-md)]"
        transition={
          prefersReduced
            ? { duration: 0 }
            : { type: "spring", stiffness: 400, damping: 30 }
        }
      />
    </span>
  );
}

/* ─── Content ──────────────────────────────────────────────── */
export type TabsContentProps =
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>;

const TabsContent = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)]",
      "rounded-[var(--radius-lg)]",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = "TabsContent";

/* ─── Exports ──────────────────────────────────────────────── */
export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsTriggerPill,
  TabsMotionList,
  TabsMotionTrigger,
  TabsContent,
};

export default Tabs;
