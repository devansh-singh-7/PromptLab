import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PromptLab",
  description: "Learn. Practice. Experiment. Build.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
