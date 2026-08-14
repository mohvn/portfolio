"use client";

import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";
import type { Portfolio } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const MONTHS = {
  en: [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ],
  "pt-BR": [
    "jan",
    "fev",
    "mar",
    "abr",
    "mai",
    "jun",
    "jul",
    "ago",
    "set",
    "out",
    "nov",
    "dez",
  ],
} as const;

function formatMonth(period: string, locale: Locale) {
  const [month, year] = period.split(".");
  const monthIndex = Number(month) - 1;
  const label = `${MONTHS[locale][monthIndex] ?? month} ${year}`;
  return {
    datetime: `${year}-${month}`,
    label,
  };
}

const LINE_TONES = [
  "from-orange-9 to-grayscale-8",
  "from-grayscale-8 to-grayscale-9",
  "from-grayscale-9 to-grayscale-10",
  "from-grayscale-10 to-grayscale-11",
] as const;

const DOT_TONES = [
  "bg-orange-9 ring-4 ring-orange-9/10",
  "bg-grayscale-8 ring-2 ring-grayscale-1",
  "bg-grayscale-9 ring-2 ring-grayscale-1",
  "bg-grayscale-10 ring-2 ring-grayscale-1",
] as const;

export function WorkSection({
  portfolio,
  locale,
}: {
  portfolio: Portfolio;
  locale: Locale;
}) {
  const { ui } = portfolio;
  const entries = portfolio.experience.flatMap((company) =>
    company.positions.map((position) => ({ company, position })),
  );

  return (
    <section id="trabalho" className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-serif text-2xl tracking-tight text-pretty text-grayscale-12 lowercase">
          {ui.sections.work.title}
        </h2>
        <p className="text-sm text-pretty text-grayscale-10 lowercase">
          {ui.sections.work.lead}
        </p>
      </div>

      <div className="relative w-full">
        <ol className="flex flex-col">
          {entries.map(({ company, position }, index) => {
            const isLast = index === entries.length - 1;
            const isCurrent = index === 0;
            const start = formatMonth(position.periodStart, locale);
            const end = position.periodEnd
              ? formatMonth(position.periodEnd, locale)
              : null;
            const lineTone = LINE_TONES[Math.min(index, LINE_TONES.length - 1)];
            const dotTone = isCurrent
              ? DOT_TONES[0]
              : DOT_TONES[Math.min(index, DOT_TONES.length - 1)];

            return (
              <li
                key={`${company.id}-${position.id}`}
                className={cn("relative", !isLast && "pb-10")}
              >
                {!isLast ? (
                  <span
                    aria-hidden
                    className={cn(
                      "absolute top-3.5 -bottom-3.5 left-1.5 w-px -translate-x-1/2 bg-linear-to-b",
                      lineTone,
                    )}
                  />
                ) : null}

                <div className="group/resume -m-2 rounded-sm p-2">
                  <div className="grid grid-cols-[0.75rem_minmax(0,1fr)] gap-x-5 transition-transform duration-150 ease-out group-hover/resume:-translate-y-px">
                    <span
                      aria-hidden
                      className="relative z-10 mt-2 flex size-3 items-center justify-center"
                    >
                      <span
                        className={cn(
                          "rounded-full",
                          isCurrent ? "relative size-2.5" : "size-2",
                          dotTone,
                        )}
                      />
                    </span>

                    <article className="flex min-w-0 flex-col gap-2">
                      <div>
                        <h3 className="font-serif text-lg text-grayscale-11 transition-colors duration-150 group-hover/resume:text-grayscale-12 lowercase">
                          {position.role}
                          {"href" in company &&
                          company.href &&
                          "logo" in company &&
                          company.logo ? (
                            <>
                              {" "}
                              {locale === "pt-BR" ? "na" : "at"}
                              <a
                                href={company.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={company.name}
                                className="active:brightness-75 -mt-px ml-1.5 inline-flex items-center gap-1.5 align-middle"
                              >
                                <Image
                                  src={company.logo}
                                  alt=""
                                  width={16}
                                  height={16}
                                  className="size-4 rounded-[3px] object-cover ring-1 ring-grayscale-4 dark:ring-grayscale-6"
                                />
                                <span className="text-[0.95em] tracking-tight normal-case">
                                  {company.name}
                                </span>
                              </a>
                            </>
                          ) : company.name.toLowerCase() !== "freelancer" ? (
                            <span className="text-grayscale-9">
                              {" "}
                              · {company.name.toLowerCase()}
                            </span>
                          ) : null}
                        </h3>
                        <p className="font-mono text-xs text-grayscale-9 transition-colors duration-150 group-hover/resume:text-grayscale-10">
                          <time dateTime={start.datetime}>{start.label}</time>
                          {", "}
                          {end ? (
                            <time dateTime={end.datetime}>{end.label}</time>
                          ) : (
                            ui.present
                          )}
                        </p>
                      </div>
                      <p className="text-sm leading-6 text-pretty text-grayscale-10 transition-colors duration-150 group-hover/resume:text-grayscale-11 lowercase">
                        {position.summary}
                      </p>
                    </article>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
