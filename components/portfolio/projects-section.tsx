import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Portfolio } from "@/lib/i18n";
import { withBasePath } from "@/lib/base-path";
import { ProjectIcon } from "@/components/portfolio/project-icon";
import { SkillIcon } from "@/components/portfolio/skill-icon";
import { cn } from "@/lib/utils";

const spanClasses = {
  full: "col-span-full",
  md: "sm:col-span-2",
} as const;

const statusLabels = (portfolio: Portfolio) => portfolio.ui.projectStatus;

function ProjectPreview({
  title,
  preview,
  fullWidth,
}: {
  title: string;
  preview?: string;
  fullWidth?: boolean;
}) {
  if (preview) {
    return (
      <Image
        src={preview}
        alt={`${title} preview`}
        fill
        sizes={
          fullWidth
            ? "(max-width: 640px) 100vw, 80vw"
            : "(max-width: 640px) 100vw, 50vw"
        }
        className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
      />
    );
  }

  return (
    <div className="absolute inset-0 bg-[linear-gradient(135deg,var(--grayscale-2)_0%,var(--grayscale-4)_50%,var(--grayscale-3)_100%)] dark:bg-[linear-gradient(135deg,var(--grayscale-3)_0%,var(--grayscale-5)_50%,var(--grayscale-4)_100%)]">
      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(var(--grayscale-8)_1px,transparent_1px)] [background-size:12px_12px]" />
    </div>
  );
}

function EmpreenderLabel({ label }: { label: string }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-grayscale-3 bg-grayscale-2 px-1.5 py-0.5 dark:border-grayscale-5 dark:bg-grayscale-4">
      <Image
        src={withBasePath("/empreender.svg")}
        alt="Empreender"
        width={167}
        height={25}
        className="h-3 w-auto invert dark:invert-0"
      />
    </span>
  );
}

export function ProjectsSection({ portfolio }: { portfolio: Portfolio }) {
  const { ui } = portfolio;
  const projectStatus = statusLabels(portfolio);

  return (
    <section id="projetos" className="flex flex-col gap-3">
      <div className="flex flex-col gap-px p-2">
        <h2 className="font-display text-xl font-bold">
          {ui.sections.projects.title}
        </h2>
        <p className="max-w-xl text-sm text-balance text-grayscale-10">
          {ui.sections.projects.description}
        </p>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-4">
        {portfolio.projects.map((project) => {
          const isFull = project.span === "full";
          const hasLink = project.href !== "#";

          return (
            <a
              key={project.id}
              href={project.href}
              target={hasLink ? "_blank" : undefined}
              rel={hasLink ? "noopener noreferrer" : undefined}
              aria-disabled={!hasLink}
              className={cn(
                "group relative flex gap-2 overflow-hidden rounded-[13px] border border-grayscale-3 bg-grayscale-1 p-2 small-shadow transition-colors hover:border-grayscale-4 hover:bg-grayscale-2 focus-visible:ring-2 focus-visible:ring-grayscale-7 focus-visible:outline-none dark:border-grayscale-5 dark:bg-grayscale-3 dark:hover:border-grayscale-6 dark:hover:bg-grayscale-4",
                !hasLink && "pointer-events-none",
                spanClasses[project.span],
                isFull ? "flex-col sm:flex-row" : "flex-col",
              )}
            >
              <div
                className={cn(
                  "relative shrink-0 overflow-hidden rounded-lg border border-grayscale-3 bg-grayscale-2 dark:border-grayscale-5 dark:bg-grayscale-4",
                  isFull
                    ? "h-44 sm:h-auto sm:min-h-[12.5rem] sm:w-[52%]"
                    : "h-36",
                )}
              >
                <ProjectPreview
                  title={project.title}
                  preview={"preview" in project ? project.preview : undefined}
                  fullWidth={isFull}
                />

                {"status" in project && project.status ? (
                  <span className="absolute top-2 right-2 rounded-full border border-grayscale-3 bg-grayscale-1/90 px-2 py-0.5 font-mono text-[10px] text-grayscale-10 backdrop-blur-sm dark:border-grayscale-5 dark:bg-grayscale-3/90">
                    {projectStatus[project.status]}
                  </span>
                ) : null}
              </div>

              <div
                className={cn(
                  "flex flex-col gap-2.5 px-1 pb-1",
                  isFull && "sm:flex-1 sm:justify-center sm:py-1",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 flex-wrap items-center gap-2">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <div className="flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-md border border-grayscale-3 bg-white ring-1 ring-grayscale-3 dark:border-grayscale-6 dark:bg-grayscale-5 dark:ring-grayscale-5">
                        <ProjectIcon
                          href={project.href}
                          favicon={
                            "favicon" in project ? project.favicon : undefined
                          }
                          fallback={project.icon}
                          color={project.color}
                          title={project.title}
                        />
                      </div>
                      <h3 className="text-sm font-medium text-grayscale-12">
                        {project.title}
                      </h3>
                    </div>
                    {"empreender" in project && project.empreender ? (
                      <EmpreenderLabel label={ui.empreenderLabel} />
                    ) : null}
                  </div>
                  {hasLink ? (
                    <ArrowRight className="mt-0.5 size-[15px] shrink-0 text-grayscale-9 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-grayscale-11" />
                  ) : null}
                </div>
                <p className="text-xs leading-5 text-pretty text-grayscale-10 sm:text-sm">
                  {project.description}
                </p>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}

export function SkillsSection({ portfolio }: { portfolio: Portfolio }) {
  const { ui } = portfolio;

  return (
    <section id="skills" className="flex flex-col gap-3">
      <div className="flex flex-col gap-px p-2">
        <h2 className="font-display text-xl font-bold">
          {ui.sections.skills.title}
        </h2>
        <p className="max-w-xl text-sm text-balance text-grayscale-10">
          {ui.sections.skills.description}
        </p>
      </div>

      <div className="relative [--badge-height:1.5rem] [--col-left-width:12rem]">
        {portfolio.skillGroups.map((group, index) => (
          <div
            key={group.id}
            className="grid items-start gap-y-2 border-b border-grayscale-3 py-4 last:border-none sm:grid-cols-[var(--col-left-width)_1fr] dark:border-grayscale-2"
          >
            <div
              id={`skills-${group.id}`}
              className="px-2 text-sm leading-(--badge-height) text-grayscale-10 sm:pl-4"
            >
              <span
                className="mr-1.5 font-mono text-grayscale-8 select-none"
                aria-hidden
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              {group.label}
            </div>

            <ul
              aria-labelledby={`skills-${group.id}`}
              className="flex flex-wrap gap-1.5 px-2 sm:px-4"
            >
              {group.skills.map((skill) => {
                const className =
                  "flex h-(--badge-height) items-center justify-center gap-1.25 rounded-full bg-grayscale-2/80 px-2 font-mono text-xs text-grayscale-12 ring-1 ring-grayscale-3 ring-inset transition-colors hover:bg-grayscale-3/80 dark:bg-grayscale-3/80 dark:ring-grayscale-5 dark:hover:bg-grayscale-4/80";

                const content = (
                  <>
                    <SkillIcon icon={skill.icon} name={skill.name} />
                    {skill.name}
                  </>
                );

                return (
                  <li key={skill.name} className="flex">
                    {"href" in skill && skill.href ? (
                      <a
                        href={skill.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={className}
                      >
                        {content}
                      </a>
                    ) : (
                      <span className={className}>{content}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
