"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useState } from "react";
import { Briefcase } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type {
  Portfolio,
  PortfolioExperience,
  PortfolioPosition,
} from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { MarkIcon } from "@/components/portfolio/mark-icon";
import { cn } from "@/lib/utils";

const MONTHS = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  "pt-BR": ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
} as const;

const LAYOUT = {
  duration: 0.4,
  ease: [0.22, 1, 0.36, 1] as const,
};

const FADE = {
  duration: 0.225,
  ease: [0.22, 1, 0.36, 1] as const,
};

function formatMonth(period: string, locale: Locale) {
  const [month, year] = period.split(".");
  const monthIndex = Number(month) - 1;
  const label = `${MONTHS[locale][monthIndex] ?? month} ${year.slice(-2)}`;
  return { datetime: `${year}-${month}`, label };
}

function formatRange(
  position: PortfolioPosition,
  locale: Locale,
  present: string,
) {
  const start = formatMonth(position.periodStart, locale);
  const end = position.periodEnd
    ? formatMonth(position.periodEnd, locale).label
    : present;
  return `${start.label} - ${end}`;
}

function JobIcon({
  company,
  size = "md",
}: {
  company: PortfolioExperience;
  size?: "sm" | "md";
}) {
  const logo = "logo" in company ? company.logo : undefined;

  if (logo) {
    return (
      <MarkIcon size={size} className="overflow-hidden p-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logo}
          alt=""
          className="size-full object-cover grayscale"
        />
      </MarkIcon>
    );
  }

  return (
    <MarkIcon size={size}>
      <Briefcase strokeWidth={1.5} />
    </MarkIcon>
  );
}

function SeeMoreGlyph({ expanded }: { expanded: boolean }) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      className="size-3.5"
      aria-hidden
      data-icon="inline-end"
    >
      {expanded ? (
        <>
          <path d="M8 5L12 9L16 5" />
          <path d="M8 19L12 15L16 19" />
        </>
      ) : (
        <>
          <path d="M8 9L12 5L16 9" />
          <path d="M8 15L12 19L16 15" />
        </>
      )}
    </svg>
  );
}

function BulletList({ bullets }: { bullets: string[] }) {
  return (
    <ul className="space-y-1">
      {bullets.map((bullet) => (
        <li
          key={bullet}
          className="relative text-[13px] leading-5 text-foreground-tertiary before:absolute before:top-2 before:-left-[14px] before:size-1 before:rounded-full before:bg-foreground-quaternary before:content-['']"
        >
          {bullet}
        </li>
      ))}
    </ul>
  );
}

function JobDetails({
  company,
  position,
  locale,
  present,
  remote,
  expanded,
  onToggle,
  expandLabel,
}: {
  company: PortfolioExperience;
  position: PortfolioPosition;
  locale: Locale;
  present: string;
  remote: string;
  expanded: boolean;
  onToggle: () => void;
  expandLabel: string;
}) {
  const range = formatRange(position, locale, present);
  const isCurrent = company.current && !position.periodEnd;
  const rangeLabel = company.remote ? `${range} · ${remote}` : range;

  return (
    <li className="relative min-w-0 before:absolute before:-inset-x-3 before:-inset-y-2 before:squircle before:rounded-xl before:content-[''] hover:before:bg-timeline-hover [&>*]:relative">
      <div>
        <div className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)] items-stretch gap-x-[10px] gap-y-2 min-[360px]:grid-cols-[auto_minmax(0,1fr)_auto]">
          <span className="block w-fit shrink-0 self-center">
            <JobIcon company={company} />
          </span>
          <div className="min-w-0">
            <span
              className="block w-fit text-sm"
              style={{
                color: isCurrent
                  ? "var(--foreground)"
                  : "var(--foreground-secondary)",
              }}
            >
              {company.name}
            </span>
            <p className="text-[13px] text-foreground-secondary">{position.role}</p>
          </div>
          <p className="col-start-2 whitespace-nowrap text-[13px] text-muted-foreground min-[360px]:col-start-3 min-[360px]:row-start-1">
            {rangeLabel}
          </p>
        </div>
        <div
          className={cn(
            "grid overflow-hidden transition-[grid-template-rows] duration-[225ms] ease-out",
            expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          )}
        >
          <div className="min-h-0">
            <div
              className={cn(
                "grid grid-cols-[auto_minmax(0,1fr)] gap-x-[10px] pt-2 min-[360px]:grid-cols-[auto_minmax(0,1fr)_auto] transition-[opacity,transform] duration-[225ms] ease-out",
                expanded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-1.5 opacity-0",
              )}
            >
              <span aria-hidden className="size-8" />
              <div className="col-start-2 min-[360px]:col-end-4">
                <BulletList bullets={position.bullets} />
              </div>
            </div>
          </div>
        </div>
        <button
          type="button"
          aria-expanded={expanded}
          aria-label={expandLabel.replace("{company}", company.name)}
          onClick={onToggle}
          className="squircle absolute -inset-x-3 -inset-y-2 z-10 cursor-pointer appearance-none rounded-xl border-0 bg-transparent p-0 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        />
      </div>
    </li>
  );
}

function DesktopJob({
  company,
  position,
  locale,
  present,
  remote,
  expanded,
}: {
  company: PortfolioExperience;
  position: PortfolioPosition;
  locale: Locale;
  present: string;
  remote: string;
  expanded: boolean;
}) {
  const id = `${company.id}-${position.id}`;
  const range = formatRange(position, locale, present);
  const isCurrent = company.current && !position.periodEnd;
  const rangeLabel =
    expanded && company.remote ? `${range} · ${remote}` : range;

  return (
    <motion.li
      layout
      layoutId={`experience-${id}`}
      className={cn("min-w-0", !expanded && "relative pt-6")}
      transition={{ layout: LAYOUT }}
    >
      <div
        className={cn(
          "grid gap-x-[10px] gap-y-2 transition-opacity",
          expanded
            ? "grid-cols-[auto_minmax(0,1fr)] min-[360px]:grid-cols-[auto_minmax(0,1fr)_auto]"
            : "grid-cols-[auto_minmax(0,1fr)]",
        )}
      >
        <motion.span
          layout
          layoutId={`experience-icon-${id}`}
          className="block w-fit shrink-0 self-center"
          transition={{ layout: LAYOUT }}
        >
          <JobIcon company={company} size={expanded ? "md" : "sm"} />
        </motion.span>

        <motion.div
          layout
          layoutId={`experience-copy-${id}`}
          className="min-w-0"
          transition={{ layout: LAYOUT }}
        >
          <span
            className="block w-fit text-sm"
            style={{
              color:
                expanded || isCurrent
                  ? "var(--foreground)"
                  : "var(--foreground-secondary)",
            }}
          >
            {company.name}
          </span>
          <AnimatePresence initial={false}>
            {expanded ? (
              <motion.p
                key={`${id}-role`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={FADE}
                className="text-[13px] text-foreground-secondary"
              >
                {position.role}
              </motion.p>
            ) : null}
          </AnimatePresence>
        </motion.div>

        <motion.p
          layout
          layoutId={`experience-dates-${id}`}
          className={cn(
            "whitespace-nowrap text-[13px] text-muted-foreground",
            expanded
              ? "col-start-2 min-[360px]:col-start-3 min-[360px]:row-start-1"
              : "col-start-2",
          )}
          transition={{ layout: LAYOUT }}
        >
          {rangeLabel}
        </motion.p>

        <AnimatePresence initial={false}>
          {expanded ? (
            <motion.div
              key={`${id}-bullets`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={FADE}
              className="col-start-2 space-y-2 min-[360px]:col-end-4"
            >
              <BulletList bullets={position.bullets} />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.li>
  );
}

function TimelineOverlay({
  entries,
  visible,
}: {
  entries: Array<{ company: PortfolioExperience; position: PortfolioPosition }>;
  visible: boolean;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 transition-opacity duration-[225ms]",
        visible ? "opacity-100" : "opacity-0",
      )}
    >
      <div className="absolute top-1 right-2 left-3 h-px -translate-y-1/2 bg-timeline-line" />
      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: `repeat(${entries.length}, minmax(0, 1fr))`,
        }}
      >
        {entries.map(({ company, position }, index) => {
          const isCurrent = company.current && !position.periodEnd;
          return (
            <div key={`${company.id}-${position.id}`} className="relative">
              {index === 0 ? (
                <div className="absolute top-1 left-3 h-px w-[calc(100%+0.5rem)] -translate-y-1/2 bg-[linear-gradient(to_right,var(--foreground)_0%,var(--timeline-line)_70%,var(--timeline-line)_100%)]" />
              ) : null}
              <div className="absolute top-0 left-0">
                <div className="relative z-10 -mt-1 ml-1 flex size-4 items-center justify-center rounded-full bg-background">
                  <div className="relative size-2">
                    {isCurrent ? (
                      <div className="timeline-status-halo pointer-events-none absolute -inset-1 rounded-full" />
                    ) : null}
                    <div
                      className={cn(
                        "absolute inset-0 rounded-full",
                        isCurrent ? "bg-foreground" : "bg-timeline-dot",
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

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
  const [openId, setOpenId] = useState<string | null>(null);
  const [desktopExpanded, setDesktopExpanded] = useState(false);

  return (
    <>
      <section className="flex flex-col gap-5 min-[570px]:hidden">
        <h2>{ui.sections.experience}</h2>
        <div className="-mx-4 px-4">
          <ol className="space-y-5.5">
            {entries.map(({ company, position }) => {
              const id = `${company.id}-${position.id}`;
              return (
                <JobDetails
                  key={id}
                  company={company}
                  position={position}
                  locale={locale}
                  present={ui.present}
                  remote={ui.remote}
                  expanded={openId === id}
                  onToggle={() =>
                    setOpenId((current) => (current === id ? null : id))
                  }
                  expandLabel={ui.expandJob}
                />
              );
            })}
          </ol>
        </div>
      </section>

      <section className="hidden flex-col gap-5 min-[570px]:flex">
        <div className="flex items-center justify-between">
          <h2>{ui.sections.experience}</h2>
          <Button
            variant="ghost"
            size="sm"
            aria-controls="experience-content"
            aria-expanded={desktopExpanded}
            onClick={() => setDesktopExpanded((value) => !value)}
            className="squircle -mr-2.5 h-7 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] text-foreground-secondary hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground"
          >
            {desktopExpanded ? ui.seeLess : ui.seeMore}
            <SeeMoreGlyph expanded={desktopExpanded} />
          </Button>
        </div>
        <div className="-mx-4 px-4" id="experience-content">
          <LayoutGroup>
            <div className="relative overflow-x-clip pb-2">
              <TimelineOverlay entries={entries} visible={!desktopExpanded} />
              <motion.ol
                layout
                className="grid"
                style={{
                  gridTemplateColumns: desktopExpanded
                    ? "minmax(0, 1fr)"
                    : `repeat(${entries.length}, minmax(0, 1fr))`,
                  gap: desktopExpanded ? "1.375rem" : "0.5rem",
                }}
                transition={{ layout: LAYOUT }}
              >
                {entries.map(({ company, position }) => (
                  <DesktopJob
                    key={`${company.id}-${position.id}`}
                    company={company}
                    position={position}
                    locale={locale}
                    present={ui.present}
                    remote={ui.remote}
                    expanded={desktopExpanded}
                  />
                ))}
              </motion.ol>
            </div>
          </LayoutGroup>
        </div>
      </section>
    </>
  );
}
