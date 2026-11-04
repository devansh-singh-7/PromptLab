"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

/* ─── Types ───────────────────────────────────────────────── */

export type DialogProps = DialogPrimitive.DialogProps;

export type DialogTriggerProps = DialogPrimitive.DialogTriggerProps;

export interface DialogContentProps
  extends Omit<DialogPrimitive.DialogContentProps, "forceMount"> {
  /** Extra overlay classes */
  overlayClassName?: string;
}

export type DialogTitleProps = DialogPrimitive.DialogTitleProps;

export type DialogDescriptionProps = DialogPrimitive.DialogDescriptionProps;

export type DialogCloseProps = DialogPrimitive.DialogCloseProps;

/* ─── Animation variants ──────────────────────────────────── */

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const contentVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", damping: 25, stiffness: 300, mass: 0.5 },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: 6,
    transition: { duration: 0.15, ease: "easeIn" },
  },
};

const staticVariants = {
  hidden: { opacity: 1, scale: 1, y: 0 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 1, scale: 1, y: 0 },
};

/* ─── Root ────────────────────────────────────────────────── */

function DialogRoot({ children, ...props }: DialogProps) {
  return <DialogPrimitive.Root {...props}>{children}</DialogPrimitive.Root>;
}

/* ─── Trigger ─────────────────────────────────────────────── */

const DialogTrigger = React.forwardRef<
  HTMLButtonElement,
  DialogTriggerProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Trigger ref={ref} className={cn(className)} {...props} />
));
DialogTrigger.displayName = "Dialog.Trigger";

/* ─── Content (overlay + panel) ──────────────────────────── */

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, overlayClassName, children, ...props }, ref) => {
    const prefersReducedMotion = useReducedMotion();
    const variants = prefersReducedMotion ? staticVariants : contentVariants;
    const overlayVars = prefersReducedMotion
      ? staticVariants
      : overlayVariants;

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
            className={cn(
              "fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2",
              "rounded-none bg-[var(--surface)] p-6",
              " border border-[var(--border)]",
              "focus:outline-none",
              className,
            )}
            variants={variants}
            initial="hidden"
            animate="visible"
          >
            {children}

            <DialogPrimitive.Close
              className={cn(
                "absolute right-4 top-4 inline-flex size-8 items-center justify-center",
                "rounded-none text-[var(--ink-muted)]",
                "transition-colors hover:bg-[var(--surface-raised)] hover:text-[var(--ink)]",
                "focus-ring",
              )}
              aria-label="Close"
            >
              <X className="size-4" />
            </DialogPrimitive.Close>
          </motion.div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    );
  },
);
DialogContent.displayName = "Dialog.Content";

/* ─── Title ───────────────────────────────────────────────── */

const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, ...props }, ref) => (
    <DialogPrimitive.Title
      ref={ref}
      className={cn(
        "font-heading text-lg font-semibold leading-relaxed text-[var(--ink)]",
        className,
      )}
      {...props}
    />
  ),
);
DialogTitle.displayName = "Dialog.Title";

/* ─── Description ─────────────────────────────────────────── */

const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  DialogDescriptionProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn(
      "mt-2 text-sm leading-relaxed text-[var(--ink-muted)]",
      className,
    )}
    {...props}
  />
));
DialogDescription.displayName = "Dialog.Description";

/* ─── Close ───────────────────────────────────────────────── */

const DialogClose = React.forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ className, ...props }, ref) => (
    <DialogPrimitive.Close ref={ref} className={cn(className)} {...props} />
  ),
);
DialogClose.displayName = "Dialog.Close";

/* ─── Compound export ─────────────────────────────────────── */

const Dialog = Object.assign(DialogRoot, {
  Trigger: DialogTrigger,
  Content: DialogContent,
  Title: DialogTitle,
  Description: DialogDescription,
  Close: DialogClose,
});

export default Dialog;
export {
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
};
