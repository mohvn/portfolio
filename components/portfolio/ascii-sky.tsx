"use client";

import { useEffect, useMemo, useState } from "react";
import { AsciiSky as UnvalleySky } from "ascii-sky/react";
import type { ThemeChoice } from "ascii-sky";
import { withBasePath } from "@/lib/base-path";
import { getCurrentTheme, type Theme } from "@/lib/theme";

function toSkyTheme(theme: Theme): ThemeChoice {
  return theme === "dark" ? "dark" : "light";
}

export function AsciiSky() {
  const [theme, setTheme] = useState<ThemeChoice>("light");
  const assets = useMemo(() => withBasePath("/ascii-sky/"), []);

  useEffect(() => {
    setTheme(toSkyTheme(getCurrentTheme()));

    function onTheme(event: Event) {
      const next = (event as CustomEvent<Theme>).detail;
      if (next === "light" || next === "dark") {
        setTheme(toSkyTheme(next));
      }
    }

    window.addEventListener("portfolio-theme", onTheme);
    return () => window.removeEventListener("portfolio-theme", onTheme);
  }, []);

  return (
    <div
      aria-hidden
      className="ascii-sky pointer-events-none absolute inset-x-0 top-0 z-0 overflow-hidden select-none"
    >
      <div className="ascii-sky-frame absolute inset-0">
        <UnvalleySky
          theme={theme}
          assets={assets}
          className="absolute inset-0"
          style={{ height: "100%", position: "absolute", inset: 0 }}
        />
      </div>
    </div>
  );
}
