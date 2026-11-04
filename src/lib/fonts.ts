import { Lexend, Inter, JetBrains_Mono, Noto_Sans_Devanagari } from "next/font/google";

/**
 * Typography stack for PromptLab.
 * Headings: Lexend — very readable, friendly.
 * Body: Inter — clean, versatile.
 * Code: JetBrains Mono — developer-standard monospace.
 * Devanagari: Noto Sans Devanagari — beautiful Hindi/Marathi rendering.
 */

export const fontHeading = Lexend({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const fontBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const fontCode = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-code",
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
  fontHeading.variable,
  fontBody.variable,
  fontCode.variable,
  fontDevanagari.variable,
].join(" ");

