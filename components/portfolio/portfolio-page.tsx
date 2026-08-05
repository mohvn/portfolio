"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { Portfolio } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Hero } from "@/components/portfolio/hero";
import { ExperienceSection } from "@/components/portfolio/experience-section";
import {
  ProjectsSection,
  SkillsSection,
} from "@/components/portfolio/projects-section";
import { FooterSection } from "@/components/portfolio/footer-section";
import { LocaleSwitch } from "@/components/portfolio/locale-switch";
import { DarkModeSwitch } from "@/components/portfolio/dark-mode-switch";
import { GitHubActivityCalendar } from "@/components/portfolio/github-activity-calendar";
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

  return (
    <div className="root min-h-full">
      <main className="mx-auto flex w-full max-w-[800px] flex-col px-5 py-10 sm:px-8 sm:py-16">
        <div
          className={cn(
            "flex flex-col gap-16 transition-[opacity,filter,transform] duration-200 ease-out motion-reduce:transition-none",
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

          <GitHubActivityCalendar
            username={portfolio.slug}
            labels={portfolio.ui.github}
            months={portfolio.ui.months}
          />

          <ExperienceSection portfolio={portfolio} />
          <ProjectsSection portfolio={portfolio} />
          <SkillsSection portfolio={portfolio} />
          <FooterSection portfolio={portfolio} />
        </div>
      </main>
    </div>
  );
}
