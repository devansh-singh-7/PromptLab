"use client";

import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const modes = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

export default function ThemeSelector({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const selected = mounted ? theme : "system";

  return (
    <div className={cn("theme-selector", className)} role="radiogroup" aria-label="Theme mode">
      {modes.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          type="button"
          role="radio"
          aria-checked={selected === value}
          className={cn("theme-selector-option", selected === value && "is-selected")}
          onClick={() => setTheme(value)}
          disabled={!mounted}
        >
          <span className="theme-selector-preview">
            <span />
            <span />
            <span />
          </span>
          <Icon size={16} aria-hidden />
          {label}
        </button>
      ))}
    </div>
  );
}
