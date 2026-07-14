"use client";

import { locales, type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";
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
  function handleSwitch(next: Locale) {
    if (next === locale) return;
    playUiSound("/sounds/whisper.wav");
    onSwitch(next);
  }

  return (
    <div className="flex shrink-0 items-center gap-1 rounded-lg border border-grayscale-3 bg-grayscale-1 p-0.5 dark:border-grayscale-5 dark:bg-grayscale-3">
      {locales.map((item) => {
        const isActive = locale === item;

        return (
          <button
            key={item}
            type="button"
            onClick={() => handleSwitch(item)}
            className={cn(
              "rounded-md px-2 py-0.5 font-mono text-[10px] font-medium uppercase transition-colors",
              isActive
                ? "bg-grayscale-12 text-grayscale-1 dark:bg-grayscale-11 dark:text-grayscale-12"
                : "text-grayscale-10 hover:text-grayscale-12",
            )}
            aria-pressed={isActive}
            aria-label={`Switch language to ${labels[item]}`}
          >
            {labels[item]}
          </button>
        );
      })}
    </div>
  );
}
