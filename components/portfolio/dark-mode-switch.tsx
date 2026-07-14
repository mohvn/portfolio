"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { playUiSound } from "@/lib/ui-sound";

export function DarkModeSwitch() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored === "dark" || (!stored && prefersDark);
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  function toggleDark() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    playUiSound();
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggleDark}
      className="flex shrink-0 items-center justify-center rounded-lg border border-grayscale-3 bg-grayscale-1 py-1 text-grayscale-11 transition-colors hover:text-grayscale-12 dark:border-grayscale-5 dark:bg-grayscale-3"
    >
      <span className="relative flex items-center justify-center rounded-md px-2 py-0.5">
        <span className="invisible font-mono text-[10px] font-medium uppercase leading-none">
          EN
        </span>
        <Sun
          className={cn(
            "absolute size-3 transition-[opacity,filter,transform] duration-300 ease-out",
            dark
              ? "scale-100 opacity-100 blur-0"
              : "scale-75 opacity-0 blur-[4px]",
          )}
          strokeWidth={2}
          aria-hidden
        />
        <Moon
          className={cn(
            "absolute size-3 transition-[opacity,filter,transform] duration-300 ease-out",
            dark
              ? "scale-75 opacity-0 blur-[4px]"
              : "scale-100 opacity-100 blur-0",
          )}
          strokeWidth={2}
          aria-hidden
        />
      </span>
    </button>
  );
}
