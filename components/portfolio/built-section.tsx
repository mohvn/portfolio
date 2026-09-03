import {
  BookOpen,
  Briefcase,
  LayoutDashboard,
  Package,
  Search,
  Sparkles,
  Table,
  Users,
  Utensils,
} from "lucide-react";
import type { Portfolio } from "@/lib/i18n";
import { MarkIcon } from "@/components/portfolio/mark-icon";
import { cn } from "@/lib/utils";

const ICONS = {
  users: Users,
  package: Package,
  "layout-dashboard": LayoutDashboard,
  sparkles: Sparkles,
  search: Search,
  briefcase: Briefcase,
  table: Table,
  "book-open": BookOpen,
  utensils: Utensils,
} as const;

export function BuiltSection({ portfolio }: { portfolio: Portfolio }) {
  const { ui } = portfolio;

  return (
    <section aria-labelledby="projects-heading" className="flex flex-col gap-5">
      <h2 id="projects-heading">{ui.sections.projects}</h2>
      <ul className="space-y-5.5">
        {portfolio.projects.map((project) => {
          const Icon = ICONS[project.icon] ?? Sparkles;
          const hasLink = project.href !== "#";
          const status = ui.projectStatus[project.status];
          const className = cn(
            "relative grid min-w-0 grid-cols-[auto_minmax(0,1fr)] gap-x-[10px] gap-y-2 before:absolute before:-inset-x-3 before:-inset-y-2 before:squircle before:rounded-xl before:content-[''] hover:before:bg-timeline-hover [&>*]:relative min-[360px]:grid-cols-[auto_minmax(0,1fr)_auto]",
            !hasLink && "cursor-default",
          );

          const body = (
            <>
              <MarkIcon className="self-center">
                <Icon strokeWidth={1.5} />
              </MarkIcon>
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
