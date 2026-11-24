"use client";

import type { Locale } from "@/lib/i18n/config";
import { LocaleSwitch } from "@/components/portfolio/locale-switch";
import { ThemeSwitch } from "@/components/portfolio/theme-switch";

export function SiteHeader({
  locale,
  onSwitch,
}: {
  locale: Locale;
  onSwitch: (locale: Locale) => void;
}) {
  return (
    <header className="relative z-10 mb-14 flex items-center justify-end gap-3">
      <LocaleSwitch locale={locale} onSwitch={onSwitch} />
      <ThemeSwitch />
    </header>
  );
}
