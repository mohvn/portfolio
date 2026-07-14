"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { Portfolio } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Hero, AboutSection } from "@/components/portfolio/hero";
import { ExperienceSection } from "@/components/portfolio/experience-section";
import { ProjectsSection, SkillsSection } from "@/components/portfolio/projects-section";
import { QuoteSection } from "@/components/portfolio/quote-section";
import { LocaleSwitch } from "@/components/portfolio/locale-switch";
import { DarkModeSwitch } from "@/components/portfolio/dark-mode-switch";
import { GitHubActivityCalendar } from "@/components/portfolio/github-activity-calendar";

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
    <div className="root">
      <main className="flex w-full flex-col divide-y divide-grayscale-3 dark:divide-grayscale-2">
        <div className="relative mx-auto flex w-full max-w-[810px] flex-col border-x border-grayscale-3 p-4 md:p-8 lg:p-16 dark:border-grayscale-2">
          <div className="flex flex-col gap-px p-2">
            <div className="mt-3 flex items-start justify-between gap-4">
              <div className="flex min-w-0 flex-row items-center gap-3">
                <h1 className="font-display text-4xl font-bold text-grayscale-12">
                  {portfolio.slug}
                </h1>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <LocaleSwitch locale={locale} onSwitch={animateTo} />
                <DarkModeSwitch />
              </div>
            </div>
          </div>

          <div
            className={cn(
              "transition-[opacity,filter,transform] duration-200 ease-out motion-reduce:transition-none",
              visible
                ? "translate-y-0 opacity-100 blur-0"
                : "translate-y-[-2px] opacity-0 blur-[3px]",
            )}
          >
            <Hero portfolio={portfolio} />
          </div>

          <div className="px-2">
            <GitHubActivityCalendar
              username={portfolio.slug}
              labels={portfolio.ui.github}
              months={portfolio.ui.months}
            />
          </div>

          <div
            className={cn(
              "mt-16 flex flex-col gap-16 transition-[opacity,filter,transform] duration-200 ease-out motion-reduce:transition-none",
              visible
                ? "translate-y-0 opacity-100 blur-0"
                : "translate-y-[-2px] opacity-0 blur-[3px]",
            )}
          >
            <AboutSection portfolio={portfolio} />
            <ProjectsSection portfolio={portfolio} />
            <ExperienceSection portfolio={portfolio} />
            <SkillsSection portfolio={portfolio} />
            <QuoteSection portfolio={portfolio} />
          </div>
        </div>
      </main>
    </div>
  );
}
