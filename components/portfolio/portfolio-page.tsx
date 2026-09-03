"use client";

import { useEffect, useRef, useState } from "react";
import type { GithubContributions } from "@/lib/github-contributions";
import type { Locale } from "@/lib/i18n/config";
import type { Portfolio } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Hero } from "@/components/portfolio/hero";
import { PerformanceSection } from "@/components/portfolio/performance-section";
import { WorkSection } from "@/components/portfolio/work-section";
import { SkillsSection } from "@/components/portfolio/skills-section";
import { BuiltSection } from "@/components/portfolio/built-section";
import { FooterSection } from "@/components/portfolio/footer-section";
import { LocaleSwitch } from "@/components/portfolio/locale-switch";
import { initUiSound } from "@/lib/ui-sound";

const FADE_MS = 180;

export function PortfolioPage({
  locale: initialLocale,
  portfolios,
  contributions,
}: {
  locale: Locale;
  portfolios: Record<Locale, Portfolio>;
  contributions: GithubContributions;
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
    <div
      className={cn(
        "transition-opacity duration-200 ease-out motion-reduce:transition-none",
        visible ? "opacity-100" : "opacity-0",
      )}
    >
      <main className="mx-auto flex min-h-svh w-full max-w-page flex-col gap-section px-5 pt-8 sm:px-8 md:pt-14">
        <Hero
          portfolio={portfolio}
          actions={
            <LocaleSwitch locale={locale} onSwitch={animateTo} />
          }
        />
        <PerformanceSection
          data={contributions}
          locale={locale}
          title={portfolio.ui.sections.performance}
          lastYearLabel={portfolio.ui.lastYear}
        />
        <WorkSection portfolio={portfolio} locale={locale} />
        <SkillsSection portfolio={portfolio} />
        <BuiltSection portfolio={portfolio} />
        <div className="mt-auto">
          <FooterSection />
        </div>
      </main>
    </div>
  );
}
