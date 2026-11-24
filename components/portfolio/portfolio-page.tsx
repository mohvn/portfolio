"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { Portfolio } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { AsciiSky } from "@/components/portfolio/ascii-sky";
import { SiteHeader } from "@/components/portfolio/site-header";
import { Hero } from "@/components/portfolio/hero";
import { ExperienceSection } from "@/components/portfolio/experience-section";
import { BuiltSection } from "@/components/portfolio/built-section";
import { initUiSound } from "@/lib/ui-sound";

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

  const year = new Date().getFullYear();
  const copyright = portfolio.ui.footer.copyright.replace("{year}", String(year));

  return (
    <div id="top" className="relative isolate min-h-svh overflow-x-hidden">
      <AsciiSky />
      <div
        className={cn(
          "site-shell relative z-10 mx-auto w-full max-w-2xl px-5 pb-16 transition-opacity duration-200 ease-out motion-reduce:transition-none sm:px-6",
          visible ? "opacity-100" : "opacity-0",
        )}
      >
        <SiteHeader locale={locale} onSwitch={animateTo} />
        <main className="mt-10 flex flex-col gap-section sm:mt-12">
          <Hero portfolio={portfolio} />
          <ExperienceSection portfolio={portfolio} locale={locale} />
          <BuiltSection portfolio={portfolio} />
        </main>
        <footer className="relative z-10 mt-16 text-sm text-muted-foreground">
          {copyright}
        </footer>
      </div>
    </div>
  );
}
