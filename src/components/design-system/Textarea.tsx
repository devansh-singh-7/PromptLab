"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

/* ─── Types ────────────────────────────────────────────────── */
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Visible label text */
  label?: string;
  /** Helper text shown below the textarea */
  helperText?: string;
  /** Error message — puts the textarea into error state */
  error?: string;
  /** Maximum character count. If set, a counter is shown. */
  maxCharacters?: number;
  /** Whether the textarea should auto-resize to fit content */
  autoResize?: boolean;
  /** Class applied to the outer wrapper */
  wrapperClassName?: string;
}

/* ─── Component ────────────────────────────────────────────── */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      maxCharacters,
      autoResize = false,
      wrapperClassName,
      id: idProp,
      disabled,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const id = idProp ?? generatedId;
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;
    const hasError = Boolean(error);

    const internalRef = React.useRef<HTMLTextAreaElement | null>(null);

    // Track character count
    const [charCount, setCharCount] = React.useState(() => {
      const initial = (value ?? defaultValue ?? "") as string;
      return initial.length;
    });

    // Sync charCount with controlled value
    React.useEffect(() => {
      if (value !== undefined) {
        setCharCount(String(value).length);
      }
    }, [value]);

    const handleAutoResize = React.useCallback(
      (el: HTMLTextAreaElement | null) => {
        if (!el || !autoResize) return;
        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
      },
      [autoResize]
    );

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCharCount(e.target.value.length);
        handleAutoResize(e.target);
        onChange?.(e);
      },
      [onChange, handleAutoResize]
    );

    // Set ref (merge forwarded + internal)
    const setRefs = React.useCallback(
      (el: HTMLTextAreaElement | null) => {
        internalRef.current = el;
        if (typeof ref === "function") ref(el);
        else if (ref) (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = el;
        // Initial auto-resize
        handleAutoResize(el);
      },
      [ref, handleAutoResize]
    );

    const isOverLimit = maxCharacters !== undefined && charCount > maxCharacters;

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

        <textarea
          ref={setRefs}
          id={id}
          disabled={disabled}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          aria-invalid={hasError || isOverLimit || undefined}
          aria-describedby={
            [hasError ? errorId : null, helperText ? helperId : null]
              .filter(Boolean)
              .join(" ") || undefined
          }
          className={cn(
            "w-full min-h-[80px] rounded-none border bg-[var(--input-bg)] text-[var(--ink)] placeholder:text-[var(--ink-faint)]",
            "px-4 py-3 text-base",
            "transition-colors transition-shadow duration-[var(--duration-fast)]",
            "outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "leading-[1.6]",
            autoResize && "resize-none overflow-hidden",
            hasError || isOverLimit
              ? "border-[var(--attention-bg)]0 focus-visible:ring-[var(--attention-ring)]"
              : "border-[var(--input-border)]",
            className
          )}
          {...props}
        />

        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
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

          {maxCharacters !== undefined && (
            <span
              className={cn(
                "text-xs tabular-nums shrink-0",
                isOverLimit
                  ? "text-[var(--attention-text)] font-medium"
                  : "text-[var(--ink-muted)]"
              )}
              aria-live="polite"
            >
              {charCount}/{maxCharacters}
            </span>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
export default Textarea;
