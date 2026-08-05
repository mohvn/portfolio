"use client";

import Image from "next/image";
import { CodeXml } from "lucide-react";
import type { Portfolio } from "@/lib/i18n";
import type { LocaleCopy } from "@/lib/i18n/types";

function formatPeriod(
  start: string,
  end: string | null,
  present: string,
): string {
  const startLabel = start.replace(".", " ");
  if (!end) return `${startLabel}–${present.toLowerCase()}`;
  return `${startLabel}–${end.replace(".", " ")}`;
}

function CompanyLogo({
  name,
  logo,
}: {
  name: string;
  logo?: string;
}) {
  if (logo) {
    return (
      <div className="size-8 shrink-0 overflow-hidden rounded-lg border border-grayscale-3 bg-white shadow-[0_0_0_1px_rgb(0_0_0/0.04)] dark:border-grayscale-5 dark:bg-grayscale-3 dark:shadow-none">
        <Image
          src={logo}
          alt={`${name} logo`}
          width={32}
          height={32}
          className="size-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-grayscale-3 bg-white shadow-[0_0_0_1px_rgb(0_0_0/0.04)] dark:border-grayscale-5 dark:bg-grayscale-3 dark:shadow-none">
      <CodeXml
        className="size-4 text-grayscale-9"
        strokeWidth={1.75}
        aria-hidden
      />
    </div>
  );
}

function ExperienceItem({
  company,
  ui,
}: {
  company: Portfolio["experience"][number];
  ui: LocaleCopy["ui"];
}) {
  const position = company.positions[0];
  if (!position) return null;

  return (
    <article className="flex gap-3 sm:gap-4">
      <CompanyLogo
        name={company.name}
        logo={"logo" in company ? company.logo : undefined}
      />

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <h3 className="text-sm font-medium text-grayscale-12 underline decoration-grayscale-6 decoration-dotted underline-offset-[5px] dark:decoration-grayscale-7">
            {company.name}
          </h3>
          <p className="text-sm text-grayscale-10">
            {company.location} | {company.remote ? ui.remote : ui.onSite}
          </p>
        </div>

        <h4 className="mt-2 text-base font-semibold tracking-tight text-grayscale-12">
          {position.role}
        </h4>
        <p className="mt-0.5 text-sm text-grayscale-10">
          {position.type} |{" "}
          {formatPeriod(position.periodStart, position.periodEnd, ui.present)}
        </p>

        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-grayscale-11 marker:text-grayscale-8">
          {position.highlights.map((highlight) => (
            <li key={highlight} className="text-pretty">
              {highlight}
            </li>
          ))}
        </ul>

        <ul className="mt-3 flex flex-wrap gap-1.5">
          {position.tags.map((tag) => (
            <li key={tag}>
              <span className="inline-flex items-center rounded-md border border-grayscale-3 bg-grayscale-2 px-2 py-0.5 font-mono text-[11px] text-grayscale-11 dark:border-grayscale-5 dark:bg-grayscale-3 dark:text-grayscale-10">
                {tag}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function ExperienceSection({ portfolio }: { portfolio: Portfolio }) {
  const { ui } = portfolio;

  return (
    <section id="experiencia" className="flex flex-col gap-6">
      <h2 className="font-display text-3xl font-medium tracking-tight text-grayscale-12">
        {ui.sections.experience.title}
      </h2>

      <div className="flex flex-col gap-10">
        {portfolio.experience.map((company) => (
          <div key={company.id} id={`experience-${company.id}`} className="scroll-mt-14">
            <ExperienceItem company={company} ui={ui} />
          </div>
        ))}
      </div>
    </section>
  );
}
