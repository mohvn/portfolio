"use client";

import type { GithubContributions } from "@/lib/github-contributions";
import type { Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

const MONTHS = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  "pt-BR": ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
} as const;

const LEVEL_CLASS = [
  "bg-foreground/10",
  "bg-foreground/25",
  "bg-foreground/45",
  "bg-foreground/60",
  "bg-foreground/75",
] as const;

function formatDayLabel(date: string, count: number, locale: Locale) {
  const formatted = new Date(`${date}T12:00:00`).toLocaleDateString(
    locale === "pt-BR" ? "pt-BR" : "en-US",
    { month: "long", day: "numeric", year: "numeric" },
  );

  if (count === 0) {
    return locale === "pt-BR"
      ? `Nenhuma contribuição em ${formatted}`
      : `No contributions on ${formatted}`;
  }

  const noun =
    locale === "pt-BR"
      ? count === 1
        ? "contribuição"
        : "contribuições"
      : count === 1
        ? "contribution"
        : "contributions";

  return locale === "pt-BR"
    ? `${count} ${noun} em ${formatted}`
    : `${count} ${noun} on ${formatted}`;
}

export function PerformanceSection({
  data,
  locale,
  title,
  lastYearLabel,
}: {
  data: GithubContributions;
  locale: Locale;
  title: string;
  lastYearLabel: string;
}) {
  if (data.contributions.length === 0) return null;

  const weeks = Math.ceil(data.contributions.length / 7);
  const monthLabels: string[] = Array.from({ length: weeks }, () => "");
  let lastMonth = -1;

  data.contributions.forEach((day, index) => {
    const week = Math.floor(index / 7);
    const month = new Date(`${day.date}T12:00:00`).getMonth();
    if (month !== lastMonth) {
      monthLabels[week] = MONTHS[locale][month];
      lastMonth = month;
    }
  });

  const total = data.total.toLocaleString(locale === "pt-BR" ? "pt-BR" : "en-US");

  return (
    <section aria-labelledby="performance-heading" className="flex flex-col gap-5">
      <h2 id="performance-heading">{title}</h2>
      <div>
        <div className="no-scrollbar max-w-full scroll-fade-x overflow-x-auto overflow-y-hidden [--scroll-fade-size:1.75rem] [--scroll-fade-s:1.75rem] [--scroll-fade-e:1.75rem]">
          <div className="w-max [--contribution-gap:2px]">
            <div
              aria-hidden
              className="mb-1.5 grid h-3 gap-[var(--contribution-gap)] text-[12px] leading-none text-muted-foreground"
              style={{ gridTemplateColumns: `repeat(${weeks}, 0.625rem)` }}
            >
              {monthLabels.map((label, index) => (
                <span key={`${label}-${index}`} className="whitespace-nowrap">
                  {label}
                </span>
              ))}
            </div>
            <ol
              aria-label={`${total} GitHub contributions ${lastYearLabel}`}
              className="grid grid-flow-col grid-rows-7 gap-[var(--contribution-gap)]"
              style={{ gridTemplateColumns: `repeat(${weeks}, 0.625rem)` }}
            >
              {data.contributions.map((day) => {
                const label = formatDayLabel(day.date, day.count, locale);
                return (
                  <li
                    key={day.date}
                    aria-label={label}
                    title={label}
                    className={cn(
                      "squircle size-2.5 rounded-cell",
                      LEVEL_CLASS[day.level],
                    )}
                  />
                );
              })}
            </ol>
          </div>
        </div>
        <p className="mt-2 text-[12px] text-muted-foreground">
          {total} {lastYearLabel}
        </p>
      </div>
    </section>
  );
}
