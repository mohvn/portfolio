"use client";

import type { Locale } from "@/lib/i18n/config";
import { playUiSound } from "@/lib/ui-sound";
import { cn } from "@/lib/utils";

const labels: Record<Locale, string> = {
  en: "en",
  "pt-BR": "pt",
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
    <button
      type="button"
      onClick={handleSwitch}
      aria-label={`Switch language to ${labels[next]}`}
      className={cn(
        "text-sm text-muted-foreground transition-colors hover:text-foreground",
      )}
    >
      {labels[next]}
    </button>
  );
}
