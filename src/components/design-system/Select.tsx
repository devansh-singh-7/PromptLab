"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown, ChevronUp, Check } from "lucide-react";
import { cn } from "@/lib/cn";

/* ═══════════════════════════════════════════════════════════════
   Select — built on @radix-ui/react-select
   ═══════════════════════════════════════════════════════════════ */

/* ─── Root (re-export) ─────────────────────────────────────── */
const Select = SelectPrimitive.Root;

/* ─── Group (re-export) ────────────────────────────────────── */
const SelectGroup = SelectPrimitive.Group;

/* ─── Value (re-export) ────────────────────────────────────── */
const SelectValue = SelectPrimitive.Value;

/* ─── Trigger ──────────────────────────────────────────────── */
export interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
  /** Optional label shown above the trigger */
  label?: string;
  /** Error text — puts the trigger into error styling */
  error?: string;
}

const SelectTrigger = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, children, label, error, ...props }, ref) => {
  const hasError = Boolean(error);

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <span className="text-sm font-medium text-[var(--ink)] leading-[1.6]">
          {label}
        </span>
      )}
      <SelectPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex h-10 w-full items-center justify-between gap-2 rounded-none border bg-[var(--input-bg)] px-4 text-base text-[var(--ink)]",
          "placeholder:text-[var(--ink-faint)]",
          "transition-colors transition-shadow duration-[var(--duration-fast)]",
          "outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "leading-[1.6]",
          hasError
            ? "border-[var(--attention-bg)]0 focus-visible:ring-[var(--attention-ring)]"
            : "border-[var(--input-border)]",
          className
        )}
        {...props}
      >
        {children}
        <SelectPrimitive.Icon asChild>
          <ChevronDown className="size-4 shrink-0 text-[var(--ink-muted)]" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      {hasError && (
        <p role="alert" className="text-sm text-[var(--attention-text)] leading-[1.6]">
          {error}
        </p>
      )}
    </div>
  );
});
SelectTrigger.displayName = "SelectTrigger";

/* ─── Scroll Up Button ─────────────────────────────────────── */
const SelectScrollUpButton = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex items-center justify-center py-1 cursor-default",
      className
    )}
    {...props}
  >
    <ChevronUp className="size-4 text-[var(--ink-muted)]" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = "SelectScrollUpButton";

/* ─── Scroll Down Button ───────────────────────────────────── */
const SelectScrollDownButton = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex items-center justify-center py-1 cursor-default",
      className
    )}
    {...props}
  >
    <ChevronDown className="size-4 text-[var(--ink-muted)]" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = "SelectScrollDownButton";

/* ─── Content ──────────────────────────────────────────────── */
const SelectContent = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", sideOffset = 4, ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      position={position}
      sideOffset={sideOffset}
      className={cn(
        "relative z-50 min-w-[8rem] overflow-hidden rounded-none border border-[var(--border)] bg-[var(--surface)] ",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
        "data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2",
        position === "popper" &&
          "max-h-[var(--radix-select-content-available-height)] w-[var(--radix-select-trigger-width)]",
        className
      )}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-content-available-height)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = "SelectContent";

/* ─── Label (group label) ──────────────────────────────────── */
const SelectLabel = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(
      "px-3 py-1.5 text-xs font-semibold text-[var(--ink-muted)] uppercase tracking-wide",
      className
    )}
    {...props}
  />
));
SelectLabel.displayName = "SelectLabel";

/* ─── Item ─────────────────────────────────────────────────── */
const SelectItem = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-pointer select-none items-center rounded-none px-3 py-2 pr-8 text-sm text-[var(--ink)] leading-[1.6]",
      "outline-none",
      "focus:bg-[var(--brand-muted)] focus:text-[var(--ink)]",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    <span className="absolute right-2 flex size-4 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="size-4 text-[var(--brand)]" />
      </SelectPrimitive.ItemIndicator>
    </span>
  </SelectPrimitive.Item>
));
SelectItem.displayName = "SelectItem";

/* ─── Separator ────────────────────────────────────────────── */
const SelectSeparator = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("mx-1 my-1 h-px bg-[var(--border)]", className)}
    {...props}
  />
));
SelectSeparator.displayName = "SelectSeparator";

/* ─── Exports ──────────────────────────────────────────────── */
export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};

export default Select;
