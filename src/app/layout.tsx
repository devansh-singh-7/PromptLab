import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import { ThemeProvider } from "@/components/design-system/ThemeProvider";
import ThemeMeta from "@/components/design-system/ThemeMeta";
import "./globals.css";

export const metadata: Metadata = {
  title: "PromptLab",
  description: "Learn. Practice. Experiment. Build.",
};

export const viewport = {
  colorScheme: "light dark",
  themeColor: "#f7fbfd",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider><ThemeMeta />{children}</ThemeProvider>
      </body>
    </html>
  );
}
