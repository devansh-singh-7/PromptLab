"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

/* ─── Types ───────────────────────────────────────────────── */

export type SheetSide = "right" | "bottom" | "left";

export type SheetProps = DialogPrimitive.DialogProps;

export type SheetTriggerProps = DialogPrimitive.DialogTriggerProps;

export interface SheetContentProps
  extends Omit<DialogPrimitive.DialogContentProps, "forceMount">,
    VariantProps<typeof sheetVariants> {
  /** Width for left/right panels (default: "24rem"). Ignored on bottom. */
  width?: string;
  /** Extra overlay classes */
  overlayClassName?: string;
}

export type SheetCloseProps = DialogPrimitive.DialogCloseProps;

/* ─── cva variants ────────────────────────────────────────── */

const sheetVariants = cva(
  [
    "fixed z-50 flex flex-col",
    "bg-[var(--surface)] border-[var(--border)] ",
    "focus:outline-none",
  ],
  {
    variants: {
      side: {
        right: "inset-y-0 right-0 border-l rounded-none",
        left: "inset-y-0 left-0 border-r rounded-none",
        bottom:
          "inset-x-0 bottom-0 border-t rounded-none max-h-[85vh]",
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
);

/* ─── Slide animations ────────────────────────────────────── */

const slideMotion: Record<SheetSide, Variants> = {
  right: {
    hidden: { x: "100%" },
    visible: {
      x: 0,
      transition: { type: "spring", damping: 30, stiffness: 300, mass: 0.8 },
    },
    exit: { x: "100%", transition: { duration: 0.2, ease: "easeIn" } },
  },
  left: {
    hidden: { x: "-100%" },
    visible: {
      x: 0,
      transition: { type: "spring", damping: 30, stiffness: 300, mass: 0.8 },
    },
    exit: { x: "-100%", transition: { duration: 0.2, ease: "easeIn" } },
  },
  bottom: {
    hidden: { y: "100%" },
    visible: {
      y: 0,
      transition: { type: "spring", damping: 30, stiffness: 300, mass: 0.8 },
    },
    exit: { y: "100%", transition: { duration: 0.2, ease: "easeIn" } },
  },
};

const staticVariants = {
  hidden: { x: 0, y: 0 },
  visible: { x: 0, y: 0 },
  exit: { x: 0, y: 0 },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

/* ─── Root ────────────────────────────────────────────────── */

function SheetRoot({ children, ...props }: SheetProps) {
  return <DialogPrimitive.Root {...props}>{children}</DialogPrimitive.Root>;
}

/* ─── Trigger ─────────────────────────────────────────────── */

const SheetTrigger = React.forwardRef<HTMLButtonElement, SheetTriggerProps>(
  ({ className, ...props }, ref) => (
    <DialogPrimitive.Trigger ref={ref} className={cn(className)} {...props} />
  ),
);
SheetTrigger.displayName = "Sheet.Trigger";

/* ─── Content ─────────────────────────────────────────────── */

const SheetContent = React.forwardRef<HTMLDivElement, SheetContentProps>(
  (
    {
      className,
      overlayClassName,
      side = "right",
      width = "24rem",
      children,
      ...props
    },
    ref,
  ) => {
    const prefersReducedMotion = useReducedMotion();
    const resolvedSide: SheetSide = side ?? "right";
    const variants = prefersReducedMotion
      ? staticVariants
      : slideMotion[resolvedSide];
    const overlayVars = prefersReducedMotion
      ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
      : overlayVariants;

    const isHorizontal = resolvedSide === "left" || resolvedSide === "right";

    return (
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay asChild>
          <motion.div
            className={cn(
              "fixed inset-0 z-50 bg-black/40",
              overlayClassName,
            )}
            variants={overlayVars}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.2 }}
          />
        </DialogPrimitive.Overlay>

        <DialogPrimitive.Content ref={ref} asChild {...props}>
          <motion.div
            className={cn(sheetVariants({ side: resolvedSide }), className)}
            style={isHorizontal ? { width } : undefined}
            variants={variants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex items-center justify-end p-4">
              <DialogPrimitive.Close
                className={cn(
                  "inline-flex size-8 items-center justify-center",
                  "rounded-none text-[var(--ink-muted)]",
                  "transition-colors hover:bg-[var(--surface-raised)] hover:text-[var(--ink)]",
                  "focus-ring",
                )}
                aria-label="Close"
              >
                <X className="size-4" />
              </DialogPrimitive.Close>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-6">{children}</div>
          </motion.div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    );
  },
);
SheetContent.displayName = "Sheet.Content";

/* ─── Close ───────────────────────────────────────────────── */

const SheetClose = React.forwardRef<HTMLButtonElement, SheetCloseProps>(
  ({ className, ...props }, ref) => (
    <DialogPrimitive.Close ref={ref} className={cn(className)} {...props} />
  ),
);
SheetClose.displayName = "Sheet.Close";

/* ─── Compound export ─────────────────────────────────────── */

const Sheet = Object.assign(SheetRoot, {
  Trigger: SheetTrigger,
  Content: SheetContent,
  Close: SheetClose,
});

export default Sheet;
export { SheetTrigger, SheetContent, SheetClose };
