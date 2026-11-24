import type { Portfolio } from "@/lib/i18n";
import { DottedRow } from "@/components/portfolio/dotted-row";

export function BuiltSection({ portfolio }: { portfolio: Portfolio }) {
  const { ui } = portfolio;

  return (
    <section
      aria-labelledby="projects-heading"
      className="relative z-10 flex flex-col gap-3"
    >
      <h2 id="projects-heading" className="text-sm text-muted-foreground">
        {ui.sections.projects}
      </h2>
      <ul className="flex flex-col">
        {portfolio.projects.map((project) => {
          const hasLink = project.href !== "#";

          return (
            <li key={project.id}>
              <DottedRow
                title={project.title}
                meta={project.description}
                href={hasLink ? project.href : undefined}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
