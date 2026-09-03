"use client";

import type { Locale } from "@/lib/i18n/config";
import { Button } from "@/components/ui/button";
import { playUiSound } from "@/lib/ui-sound";

const labels: Record<Locale, string> = {
  en: "EN",
  "pt-BR": "BR",
};

export function LocaleSwitch({
  locale,
  onSwitch,
}: {
  locale: Locale;
  onSwitch: (locale: Locale) => void;
}) {
  const next = locale === "en" ? "pt-BR" : "en";

  function handleSwitch() {
    playUiSound("whisper");
    onSwitch(next);
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      onClick={handleSwitch}
      aria-label={`Switch language to ${labels[next]}`}
      className="squircle size-7 rounded-[min(var(--radius-md),12px)] font-mono text-[10px] font-medium text-foreground-secondary hover:text-foreground"
    >
      {labels[locale]}
    </Button>
  );
}
