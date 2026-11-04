import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import { ThemeProvider } from "@/components/design-system/ThemeProvider";
import ThemeMeta from "@/components/design-system/ThemeMeta";
import SessionActivity from "@/components/auth/SessionActivity";
import "./globals.css";

export const metadata: Metadata = {
  title: "PromptLab",
  description: "Learn. Practice. Experiment. Build.",
};

export const viewport = {
  colorScheme: "light dark",
  themeColor: "#FFEEE6",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider><ThemeMeta /><SessionActivity />{children}</ThemeProvider>
      </body>
    </html>
  );
}
