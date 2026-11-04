"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

export default function ThemeMeta() {
  const { resolvedTheme } = useTheme();
  useEffect(() => {
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      "content",
      resolvedTheme === "dark" ? "#101b2c" : "#f7fbfd",
    );
  }, [resolvedTheme]);
  return null;
}
