import type { Portfolio } from "@/lib/i18n";
import { MarkIcon } from "@/components/portfolio/mark-icon";
import {
  projectIcons,
  projectImages,
} from "@/components/portfolio/project-icons";
import { getFaviconUrl } from "@/lib/favicon";
import { cn } from "@/lib/utils";

function ProjectMark({
  id,
  href,
  title,
}: {
  id: string;
  href: string;
  title: string;
}) {
  const Icon = projectIcons[id];
  const image = projectImages[id];

  if (Icon) {
    return (
      <MarkIcon className="self-center overflow-hidden p-1 text-foreground">
        <Icon className="size-full grayscale" />
      </MarkIcon>
    );
  }

  if (image) {
    return (
      <MarkIcon className="self-center overflow-hidden p-0.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt=""
          width={20}
          height={20}
          className="size-full object-contain grayscale"
        />
      </MarkIcon>
    );
  }

  const favicon =
    id === "sttp" || id === "caddie" ? null : getFaviconUrl(href);

  if (favicon) {
    return (
      <MarkIcon className="self-center overflow-hidden p-1.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={favicon}
          alt=""
          width={20}
          height={20}
          className="size-full object-contain grayscale"
        />
      </MarkIcon>
    );
  }

  return (
    <MarkIcon className="self-center font-heading text-[11px] text-foreground-secondary">
      {title.slice(0, 1)}
    </MarkIcon>
  );
}

export function BuiltSection({ portfolio }: { portfolio: Portfolio }) {
  const { ui } = portfolio;

  return (
    <section aria-labelledby="projects-heading" className="flex flex-col gap-5">
      <h2 id="projects-heading">{ui.sections.projects}</h2>
      <ul className="space-y-5.5">
        {portfolio.projects.map((project) => {
          const hasLink = project.href !== "#";
          const status = ui.projectStatus[project.status];
          const className = cn(
            "relative grid min-w-0 grid-cols-[auto_minmax(0,1fr)] gap-x-[10px] gap-y-2 before:absolute before:-inset-x-3 before:-inset-y-2 before:squircle before:rounded-xl before:content-[''] hover:before:bg-timeline-hover [&>*]:relative min-[360px]:grid-cols-[auto_minmax(0,1fr)_auto]",
            !hasLink && "cursor-default",
          );

          const body = (
            <>
              <ProjectMark
                id={project.id}
                href={project.href}
                title={project.title}
              />
              <div className="min-w-0">
                <h3 className="text-sm">{project.title}</h3>
                <p className="text-[13px] text-foreground-secondary">
                  {project.description}
                </p>
              </div>
              <span className="col-start-2 flex items-center gap-1 whitespace-nowrap text-[13px] text-muted-foreground min-[360px]:col-start-3 min-[360px]:row-start-1">
                {status}
              </span>
            </>
          );

          return (
            <li key={project.id}>
              {hasLink ? (
                <a
                  href={project.href}
                  rel="noreferrer"
                  target="_blank"
                  className={className}
                >
                  {body}
                </a>
              ) : (
                <div className={className}>{body}</div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
