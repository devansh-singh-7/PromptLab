"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { cn } from "@/lib/cn";

export interface ThemeToggleProps {
  className?: string;
}

/**
 * Theme toggle button — cycles through light → dark → system.
 */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button
        className={cn(
          "inline-flex h-9 w-9 items-center justify-center rounded-full",
          "bg-[var(--surface-raised)] text-[var(--ink-muted)]",
          className
        )}
        aria-label="Toggle theme"
        disabled
      >
        <Monitor className="h-4 w-4" />
      </button>
    );
  }

  const next = theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
  const Icon = theme === "dark" ? Moon : theme === "light" ? Sun : Monitor;
  const label =
    theme === "dark"
      ? "Switch to system theme"
      : theme === "light"
        ? "Switch to dark theme"
        : "Switch to light theme";

  return (
    <button
      onClick={() => setTheme(next)}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full",
        "bg-[var(--surface-raised)] text-[var(--ink-muted)]",
        "transition-all duration-200",
        "hover:bg-[var(--brand-muted)] hover:text-[var(--brand)]",
        "focus-ring",
        "active:scale-95",
        className
      )}
      aria-label={label}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}

export default ThemeToggle;

