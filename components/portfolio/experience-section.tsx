"use client";

import Image from "next/image";
import {
  ChevronDown,
  CodeXml,
  Infinity,
} from "lucide-react";
import type { Portfolio } from "@/lib/i18n";
import type { LocaleCopy } from "@/lib/i18n/types";
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { playUiSound } from "@/lib/ui-sound";

function MetaSeparator() {
  return (
    <div
      role="separator"
      aria-orientation="vertical"
      className="h-4 w-px shrink-0 self-center bg-grayscale-3 dark:bg-grayscale-5"
    />
  );
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
      <div className="size-6 shrink-0 overflow-hidden rounded-md ring-1 ring-grayscale-3 dark:ring-grayscale-5">
        <Image
          src={logo}
          alt={`${name} logo`}
          width={24}
          height={24}
          aria-hidden
          className="size-full object-cover grayscale transition-[filter] duration-300 ease-[cubic-bezier(0.42,0,0.58,1)] group-hover/experience:grayscale-0"
        />
      </div>
    );
  }

  return (
    <div className="flex size-6 shrink-0 items-center justify-center rounded-md ring-1 ring-grayscale-3 dark:ring-grayscale-5">
      <CodeXml
        className="size-4 text-grayscale-9"
        strokeWidth={1.75}
        aria-hidden
      />
    </div>
  );
}

function ExperiencePosition({
  position,
  ui,
  defaultOpen,
  isLast,
}: {
  position: Portfolio["experience"][number]["positions"][number];
  ui: LocaleCopy["ui"];
  defaultOpen?: boolean;
  isLast?: boolean;
}) {
  return (
    <Collapsible
      defaultOpen={defaultOpen}
      className="group/experience-position relative"
      onOpenChange={() => playUiSound("/sounds/release.wav")}
    >
      {isLast ? (
        <div className="pointer-events-none absolute bottom-0 left-3 hidden size-4 bg-grayscale-1 group-last/experience-position:flex dark:bg-grayscale-2">
          <span className="size-full -translate-y-2.25 rounded-bl-sm border-b border-l border-grayscale-3 dark:border-grayscale-5" />
        </div>
      ) : null}

      <CollapsibleTrigger className="group relative block w-full rounded-lg text-left outline-none before:absolute before:-top-1 before:-right-1 before:-bottom-1.5 before:left-7 before:-z-1 before:rounded-lg before:transition-[background-color] before:ease-out hover:before:bg-grayscale-2 focus-visible:before:ring-2 focus-visible:before:ring-grayscale-8/50 dark:hover:before:bg-grayscale-4">
        <div className="relative z-1 mb-1 flex items-start gap-3 text-base">
          <div className="flex size-6 shrink-0 items-center justify-center rounded-md border border-grayscale-3 bg-grayscale-2 text-grayscale-9 dark:border-grayscale-5 dark:bg-grayscale-4">
            <CodeXml className="size-4" strokeWidth={1.75} />
          </div>
          <h4 className="flex-1 text-balance font-medium text-grayscale-12">
            {position.role}
          </h4>
          <ChevronDown className="size-4 shrink-0 text-grayscale-9 transition-transform duration-200 group-data-[panel-open]/experience-position:rotate-180" />
        </div>

        <dl className="flex flex-wrap items-center gap-2 pl-9 text-sm text-grayscale-10">
          <div>
            <dt className="sr-only">{ui.employmentType}</dt>
            <dd>{position.type}</dd>
          </div>
          <MetaSeparator />
          <div>
            <dt className="sr-only">{ui.period}</dt>
            <dd className="flex items-center gap-0.5 tabular-nums">
              <span>{position.periodStart}</span>
              <span className="font-mono">—</span>
              {position.periodEnd ? (
                <span>{position.periodEnd}</span>
              ) : (
                <Infinity
                  className="size-4.5 translate-y-px"
                  strokeWidth={1.5}
                  aria-label={ui.present}
                />
              )}
            </dd>
          </div>
          <MetaSeparator />
          <div>
            <dt className="sr-only">{ui.duration}</dt>
            <dd className="tabular-nums">{position.duration}</dd>
          </div>
        </dl>
      </CollapsibleTrigger>

      <CollapsiblePanel>
        <ul className="list-disc space-y-1 pt-2 pl-9 text-sm text-grayscale-10 marker:text-grayscale-8">
          {position.highlights.map((highlight) => (
            <li key={highlight} className="text-pretty">
              {highlight}
            </li>
          ))}
        </ul>
      </CollapsiblePanel>

      <ul className="flex flex-wrap gap-1.5 pt-3 pl-9">
        {position.tags.map((tag) => (
          <li key={tag}>
            <span className="inline-flex items-center rounded-full border border-grayscale-3 bg-grayscale-1 px-1.5 py-0.5 font-mono text-xs text-grayscale-10 dark:border-grayscale-5 dark:bg-grayscale-3">
              {tag}
            </span>
          </li>
        ))}
      </ul>
    </Collapsible>
  );
}

export function ExperienceSection({ portfolio }: { portfolio: Portfolio }) {
  const { ui } = portfolio;

  return (
    <section id="experiencia" className="flex flex-col gap-3">
      <div className="flex flex-col gap-px p-2">
        <h2 className="font-display text-xl font-bold">
          {ui.sections.experience.title}
        </h2>
        <p className="max-w-xl text-sm text-balance text-grayscale-10">
          {ui.sections.experience.description}
        </p>
      </div>

      <div className="pl-4 pr-2">
        {portfolio.experience.map((company, companyIndex) => (
          <div
            key={company.id}
            id={`experience-${company.id}`}
            className={cn(
              "group/experience scroll-mt-14 space-y-4 py-4",
              companyIndex < portfolio.experience.length - 1 &&
                "border-b border-grayscale-3 dark:border-grayscale-4",
            )}
          >
            <div className="flex items-start gap-3 sm:items-center">
              <CompanyLogo
                  name={company.name}
                  logo={"logo" in company ? company.logo : undefined}
                />

              <div className="flex min-w-0 flex-1 flex-col gap-x-3 gap-y-1 pr-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="text-xl/6 font-medium text-grayscale-12">
                  {company.name}
                </h3>

                <dl className="flex min-w-0 items-center gap-1.5 text-sm whitespace-nowrap text-grayscale-10">
                  <dt className="sr-only">{ui.location}</dt>
                  <dd className="truncate">{company.location}</dd>
                  <dt className="sr-only">{ui.modality}</dt>
                  <dd>({company.remote ? ui.remote : ui.onSite})</dd>
                  {company.current ? (
                    <>
                      <dt className="sr-only">{ui.status}</dt>
                      <dd>
                        <span className="sr-only">{ui.current}</span>
                        <span className="relative flex size-2.5 translate-x-px translate-y-px items-center justify-center">
                          <span className="absolute inline-flex size-2.5 animate-ping rounded-full bg-grayscale-9 opacity-50" />
                          <span className="relative inline-flex size-1.5 rounded-full bg-grayscale-11" />
                        </span>
                      </dd>
                    </>
                  ) : null}
                </dl>
              </div>
            </div>

            <div className="relative space-y-4 before:absolute before:top-0 before:left-3 before:h-full before:w-px before:bg-grayscale-3 dark:before:bg-grayscale-5">
              {company.positions.map((position, positionIndex) => (
                <ExperiencePosition
                  key={position.id}
                  position={position}
                  ui={ui}
                  defaultOpen={companyIndex === 0 && positionIndex === 0}
                  isLast={positionIndex === company.positions.length - 1}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
