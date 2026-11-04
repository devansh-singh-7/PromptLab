"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { cn } from "@/lib/cn";

export interface ThemeToggleProps {
  className?: string;
}

type ThemeMode = "light" | "dark" | "system";
type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => {
    finished: Promise<void>;
  };
};

let themeTransitionRunning = false;
let queuedTheme: ThemeMode | undefined;
let lastRequestedTheme: ThemeMode | undefined;

function transitionTheme(setTheme: (theme: string) => void, theme: ThemeMode) {
  if (themeTransitionRunning) {
    queuedTheme = theme;
    setTheme(theme);
    return;
  }
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const transition = (document as ViewTransitionDocument).startViewTransition?.bind(document);
  if (reduced || !transition) {
    document.documentElement.classList.add("theme-transition-fallback");
    setTheme(theme);
    window.setTimeout(() => document.documentElement.classList.remove("theme-transition-fallback"), reduced ? 0 : 280);
    return;
  }

  const button = document.activeElement as HTMLElement | null;
  const rect = button?.getBoundingClientRect();
  const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
  const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
  themeTransitionRunning = true;
  const view = transition(() => setTheme(theme));
  document.documentElement.style.setProperty("--theme-x", `${x}px`);
  document.documentElement.style.setProperty("--theme-y", `${y}px`);
  document.documentElement.style.setProperty("--theme-radius", `${radius}px`);
  view.finished.catch(() => undefined).finally(() => {
    themeTransitionRunning = false;
    document.documentElement.style.removeProperty("--theme-x");
    document.documentElement.style.removeProperty("--theme-y");
    document.documentElement.style.removeProperty("--theme-radius");
    if (queuedTheme) {
      const latestTheme = queuedTheme;
      queuedTheme = undefined;
      setTheme(latestTheme);
    }
  });
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
          "inline-flex h-9 w-9 items-center justify-center rounded-none",
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

  const Icon = theme === "dark" ? Moon : theme === "light" ? Sun : Monitor;
  const label =
    theme === "dark"
      ? "Switch to system theme"
      : theme === "light"
        ? "Switch to dark theme"
        : "Switch to light theme";

  return (
    <button
      onClick={() => {
        const current = lastRequestedTheme ?? (theme as ThemeMode);
        const requested = current === "light" ? "dark" : current === "dark" ? "system" : "light";
        lastRequestedTheme = requested;
        transitionTheme(setTheme, requested);
      }}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-none",
        "bg-[var(--surface-raised)] text-[var(--ink-muted)]",
        "transition-all duration-200",
        "hover:bg-[var(--brand-muted)] hover:text-[var(--brand)]",
        "focus-ring",
        "active:scale-95",
        className
      )}
      aria-label={`${label}. Current mode: ${theme}`}
      title={`Theme: ${theme}`}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}

export default ThemeToggle;
