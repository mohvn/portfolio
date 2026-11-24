"use client";

import { useEffect, useState } from "react";
import {
  applyTheme,
  resolveTheme,
  setTheme,
  type Theme,
} from "@/lib/theme";
import { playUiSound } from "@/lib/ui-sound";
import { cn } from "@/lib/utils";

export function ThemeSwitch() {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    // React hydration replaces <html className>, wiping `dark` from the
    // boot script — re-apply from localStorage after mount.
    const resolved = resolveTheme();
    applyTheme(resolved);
    setThemeState(resolved);

    function onTheme(event: Event) {
      const next = (event as CustomEvent<Theme>).detail;
      if (next === "light" || next === "dark") setThemeState(next);
    }

    window.addEventListener("portfolio-theme", onTheme);
    return () => window.removeEventListener("portfolio-theme", onTheme);
  }, []);

  const next: Theme = theme === "light" ? "dark" : "light";

  function handleSwitch() {
    try {
      playUiSound("whisper");
    } catch {
      // ignore
    }
    setTheme(next);
    setThemeState(next);
  }

  return (
    <button
      type="button"
      onClick={handleSwitch}
      aria-label={`Switch to ${next} theme`}
      className={cn(
        "text-sm text-muted-foreground transition-colors hover:text-foreground",
      )}
    >
      {next}
    </button>
  );
}
