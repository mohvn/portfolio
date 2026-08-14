import type { Portfolio } from "@/lib/i18n";

export function BuiltSection({ portfolio }: { portfolio: Portfolio }) {
  const { ui } = portfolio;

  return (
    <section id="projetos" className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="font-serif text-2xl tracking-tight text-grayscale-12 lowercase">
          {ui.sections.built.title}
        </h2>
        <p className="max-w-2xl text-sm leading-6 text-pretty text-grayscale-10 lowercase">
          {ui.sections.built.lead}
        </p>
      </div>

      <ul className="flex flex-col gap-5">
        {portfolio.projects.map((project) => {
          const hasLink = project.href !== "#";
          const status =
            "status" in project && project.status
              ? ui.projectStatus[project.status]
              : null;

          const title = (
            <span className="font-medium text-grayscale-12 underline decoration-grayscale-5 underline-offset-4 transition-colors group-hover:decoration-grayscale-9">
              {project.title}
            </span>
          );

          return (
            <li key={project.id} className="flex flex-col gap-1">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 lowercase">
                {hasLink ? (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    {title}
                  </a>
                ) : (
                  title
                )}
                {status ? (
                  <span className="font-mono text-[11px] text-grayscale-9">
                    {status}
                  </span>
                ) : null}
              </div>
              <p className="text-sm leading-6 text-pretty text-grayscale-10 lowercase">
                {project.description}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
