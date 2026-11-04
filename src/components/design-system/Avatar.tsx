"use client";

import { forwardRef, useState, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

/* ── Variant definitions ─────────────────────────────────────── */

const avatarVariants = cva(
  [
    "relative inline-flex items-center justify-center",
    "rounded-none overflow-hidden",
    "bg-[var(--select-tint)] dark:bg-[var(--select)]/40",
    "select-none shrink-0",
  ],
  {
    variants: {
      size: {
        sm: "size-8 text-xs",
        md: "size-10 text-sm",
        lg: "size-14 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const onlineDotVariants = cva(
  [
    "absolute block rounded-none",
    "bg-[var(--success)]",
    "ring-2 ring-[var(--surface)]",
  ],
  {
    variants: {
      size: {
        sm: "size-2 bottom-0 right-0",
        md: "size-2.5 bottom-0 right-0",
        lg: "size-3 bottom-0.5 right-0.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

/* ── Types ────────────────────────────────────────────────────── */

export type AvatarSize = "sm" | "md" | "lg";

export type AvatarProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> &
  VariantProps<typeof avatarVariants> & {
  /** Image source URL */
  src?: string | null;
  /** Alt text for the image */
  alt?: string;
  /** Fallback initials when image is unavailable (max 2 chars) */
  initials?: string;
  /** Name used to derive fallback initials and the accessible label */
  name?: string;
  /** Show an online-indicator dot */
  online?: boolean;
};

/* ── Helper: extract initials from a name ─────────────────────── */

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

/* ── Component ────────────────────────────────────────────────── */

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className,
      src,
      alt = "",
        name,
      initials,
      size,
      online = false,
      ...props
    },
    ref
  ) => {
    const [imgError, setImgError] = useState(false);
    const showImage = src && !imgError;
    const accessibleName = alt || name || "User avatar";
    const fallback = initials
      ? initials.slice(0, 2).toUpperCase()
      : name
        ? getInitials(name)
        : alt
          ? getInitials(alt)
          : "?";
    const resolvedSize = size ?? "md";

    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ size }), className)}
        role="img"
        aria-label={accessibleName}
        {...props}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt}
            className="size-full object-cover"
            onError={() => setImgError(true)}
            // Spread remaining img-specific props
          />
        ) : (
          <span
            className="font-heading font-semibold text-[var(--select)] dark:text-[var(--select)]"
            aria-hidden="true"
          >
            {fallback}
          </span>
        )}

        {online && (
          <span
            className={onlineDotVariants({ size: resolvedSize })}
            aria-label="Online"
          />
        )}
      </div>
    );
  }
);
Avatar.displayName = "Avatar";

export { avatarVariants };
export default Avatar;
