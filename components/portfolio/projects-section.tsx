import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Portfolio } from "@/lib/i18n";
import { withBasePath } from "@/lib/base-path";
import { SkillIcon } from "@/components/portfolio/skill-icon";
import { cn } from "@/lib/utils";

const statusLabels = (portfolio: Portfolio) => portfolio.ui.projectStatus;

function ProjectPreview({
  title,
  preview,
}: {
  title: string;
  preview?: string;
}) {
  if (preview) {
    return (
      <Image
        src={preview}
        alt={`${title} preview`}
        fill
        sizes="(max-width: 640px) 100vw, 33vw"
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

export function ProjectsSection({ portfolio }: { portfolio: Portfolio }) {
  const { ui } = portfolio;
  const projectStatus = statusLabels(portfolio);

  return (
    <section id="projetos" className="flex flex-col gap-5">
      <h2 className="font-display text-3xl font-medium tracking-tight text-grayscale-12">
        {ui.sections.projects.title}
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {portfolio.projects.map((project) => {
          const hasLink = project.href !== "#";
          const content = (
            <>
              <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-grayscale-3 bg-grayscale-2 dark:border-grayscale-5 dark:bg-grayscale-3">
                <ProjectPreview
                  title={project.title}
                  preview={"preview" in project ? project.preview : undefined}
                />
                {"status" in project && project.status ? (
                  <span className="absolute top-1.5 right-1.5 rounded-md border border-grayscale-3 bg-grayscale-1/90 px-1.5 py-0.5 font-mono text-[10px] text-grayscale-10 backdrop-blur-sm dark:border-grayscale-5 dark:bg-grayscale-3/90">
                    {projectStatus[project.status]}
                  </span>
                ) : null}
              </div>

              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <h3 className="text-sm font-medium text-grayscale-12">
                      {project.title}
                    </h3>
                    {"empreender" in project && project.empreender ? (
                      <Image
                        src={withBasePath("/empreender.svg")}
                        alt={ui.empreenderLabel}
                        width={167}
                        height={25}
                        className="h-2.5 w-auto invert opacity-70 dark:invert-0"
                      />
                    ) : null}
                  </div>
                  <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-grayscale-10">
                    {project.description}
                  </p>
                </div>
                {hasLink ? (
                  <ArrowUpRight
                    className="mt-0.5 size-3.5 shrink-0 text-grayscale-8 transition-colors group-hover:text-grayscale-12"
                    aria-hidden
                  />
                ) : null}
              </div>
            </>
          );

          const className = cn(
            "group flex flex-col gap-2 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-grayscale-8/50",
            !hasLink && "opacity-80",
          );

          if (hasLink) {
            return (
              <a
                key={project.id}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
              >
                {content}
              </a>
            );
          }

          return (
            <div key={project.id} className={className}>
              {content}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function SkillsSection({ portfolio }: { portfolio: Portfolio }) {
  const { ui } = portfolio;

  return (
    <section id="skills" className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-display text-3xl font-medium tracking-tight text-grayscale-12">
          {ui.sections.skills.title}
        </h2>
        <p className="max-w-xl text-sm text-balance text-grayscale-10">
          {ui.sections.skills.description}
        </p>
      </div>

      <div className="flex flex-col">
        {portfolio.skillGroups.map((group, index) => (
          <div
            key={group.id}
            className="grid items-start gap-y-2 border-b border-grayscale-3 py-4 last:border-none sm:grid-cols-[10rem_1fr] dark:border-grayscale-4"
          >
            <div
              id={`skills-${group.id}`}
              className="text-sm text-grayscale-10"
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
              className="flex flex-wrap gap-1.5"
            >
              {group.skills.map((skill) => {
                const className =
                  "flex h-6 items-center justify-center gap-1.5 rounded-md border border-grayscale-3 bg-grayscale-2 px-2 font-mono text-xs text-grayscale-12 transition-colors hover:bg-grayscale-3 dark:border-grayscale-5 dark:bg-grayscale-3 dark:hover:bg-grayscale-4";

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
