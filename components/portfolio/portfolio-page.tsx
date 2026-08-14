"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { Portfolio } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Hero } from "@/components/portfolio/hero";
import { WorkSection } from "@/components/portfolio/work-section";
import { BuiltSection } from "@/components/portfolio/built-section";
import { FooterSection } from "@/components/portfolio/footer-section";
import { LocaleSwitch } from "@/components/portfolio/locale-switch";
import { DarkModeSwitch } from "@/components/portfolio/dark-mode-switch";
import { initUiSound } from "@/lib/ui-sound";
import { EdgeBlur } from "@/components/portfolio/edge-blur";

const FADE_MS = 180;

export function PortfolioPage({
  locale: initialLocale,
  portfolios,
}: {
  locale: Locale;
  portfolios: Record<Locale, Portfolio>;
}) {
  const [locale, setLocale] = useState(initialLocale);
  const [visible, setVisible] = useState(true);
  const busy = useRef(false);
  const timer = useRef<number | null>(null);

  const portfolio = portfolios[locale];

  useEffect(() => {
    initUiSound();
  }, []);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  function animateTo(next: Locale) {
    if (next === locale || busy.current) return;

    busy.current = true;
    setVisible(false);

    timer.current = window.setTimeout(() => {
      setLocale(next);
      document.documentElement.lang = next === "pt-BR" ? "pt-BR" : "en";
      setVisible(true);
      busy.current = false;
    }, FADE_MS);
  }

  return (
    <div className="root relative min-h-full">
      <EdgeBlur />

      <main className="mx-auto flex w-full max-w-2xl flex-col px-5 py-12 sm:px-8 sm:py-20">
        <div
          className={cn(
            "flex flex-col gap-16 transition-[opacity,filter,transform] duration-200 ease-out motion-reduce:transition-none sm:gap-20",
            visible
              ? "translate-y-0 opacity-100 blur-0"
              : "translate-y-[-2px] opacity-0 blur-[3px]",
          )}
        >
          <Hero
            portfolio={portfolio}
            actions={
              <>
                <LocaleSwitch locale={locale} onSwitch={animateTo} />
                <DarkModeSwitch />
              </>
            }
          />

          <WorkSection portfolio={portfolio} locale={locale} />
          <BuiltSection portfolio={portfolio} />
          <FooterSection portfolio={portfolio} />
        </div>
      </main>
    </div>
  );
}
