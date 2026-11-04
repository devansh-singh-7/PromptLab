"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

/* ─── Types ────────────────────────────────────────────────── */
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Visible label text */
  label?: string;
  /** Helper text shown below the input */
  helperText?: string;
  /** Error message — puts the input into error state */
  error?: string;
  /** Icon element placed inside the left of the input */
  leftIcon?: React.ReactNode;
  /** Icon element placed inside the right of the input */
  rightIcon?: React.ReactNode;
  /** Input sizing */
  inputSize?: "sm" | "md" | "lg";
  /** Class applied to the outer wrapper */
  wrapperClassName?: string;
}

/* ─── Component ────────────────────────────────────────────── */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      inputSize = "md",
      wrapperClassName,
      id: idProp,
      disabled,
      type = "text",
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const id = idProp ?? generatedId;
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;
    const hasError = Boolean(error);

    const sizeClasses: Record<string, string> = {
      sm: "h-8 text-sm px-3",
      md: "h-10 text-base px-4",
      lg: "h-12 text-lg px-5",
    };

    return (
      <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-[var(--ink)] leading-[1.6]"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <span className="pointer-events-none absolute left-3 flex items-center text-[var(--ink-muted)] [&>svg]:size-4">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={id}
            type={type}
            disabled={disabled}
            aria-invalid={hasError || undefined}
            aria-describedby={
              [hasError ? errorId : null, helperText ? helperId : null]
                .filter(Boolean)
                .join(" ") || undefined
            }
            className={cn(
              "w-full rounded-none border bg-[var(--input-bg)] text-[var(--ink)] placeholder:text-[var(--ink-faint)]",
              "transition-colors transition-shadow duration-[var(--duration-fast)]",
              "outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)]",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "leading-[1.6]",
              sizeClasses[inputSize],
              hasError
                ? "border-[var(--attention-bg)]0 focus-visible:ring-[var(--attention-ring)]"
                : "border-[var(--input-border)]",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              className
            )}
            {...props}
          />

          {rightIcon && (
            <span className="pointer-events-none absolute right-3 flex items-center text-[var(--ink-muted)] [&>svg]:size-4">
              {rightIcon}
            </span>
          )}
        </div>

        {hasError && (
          <p
            id={errorId}
            role="alert"
            className="text-sm text-[var(--attention-text)] leading-[1.6]"
          >
            {error}
          </p>
        )}

        {helperText && !hasError && (
          <p
            id={helperId}
            className="text-sm text-[var(--ink-muted)] leading-[1.6]"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
export default Input;
