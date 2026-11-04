"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

export interface ThemeProviderProps {
  children: ReactNode;
  /** Default theme if none stored. Defaults to "system". */
  defaultTheme?: string;
}

/**
 * Theme provider for PromptLab.
 * Uses next-themes with "class" strategy so Tailwind dark: works.
 * Wraps the entire app in the root layout.
 */
export function ThemeProvider({
  children,
  defaultTheme = "system",
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={defaultTheme}
      enableSystem
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemesProvider>
  );
}

export default ThemeProvider;
