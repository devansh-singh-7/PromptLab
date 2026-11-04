import { Noto_Sans_Devanagari, Space_Grotesk, Space_Mono } from "next/font/google";

/**
 * Typography stack for PromptLab's design-tool theme.
 * Space Mono carries display, labels, controls, numbers, tags, and code.
 * Space Grotesk keeps long-form reading comfortable.
 * Noto Sans Devanagari provides Hindi and Marathi coverage.
 */

export const fontDisplay = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const fontBody = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const fontDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-devanagari",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

/** Combine all font CSS variables as a single className string */
export const fontVariables = [
  fontDisplay.variable,
  fontBody.variable,
  fontDevanagari.variable,
].join(" ");
