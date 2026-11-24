"use client";

import { useLayoutEffect } from "react";
import { applyTheme, resolveTheme } from "@/lib/theme";

/** Re-applies stored theme after React hydrates `<html className>` (which wipes `dark`). */
export function ThemeBootstrap() {
  useLayoutEffect(() => {
    applyTheme(resolveTheme());
  }, []);

  return null;
}
