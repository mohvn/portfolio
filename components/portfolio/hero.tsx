import type { Portfolio } from "@/lib/i18n";
import { FeaturedCard } from "@/components/portfolio/featured-card";

export function Hero({ portfolio }: { portfolio: Portfolio }) {
  return (
    <div className="flex flex-col gap-px p-2">
      <div className="mt-2 flex flex-col gap-2">
        <p className="text-sm font-medium text-grayscale-11">{portfolio.role}</p>
        <p className="text-xs text-grayscale-9">{portfolio.location}</p>
      </div>

      <div className="mb-4 flex flex-col gap-2">
        <p className="text-sm font-medium text-grayscale-11">{portfolio.bio.lead}</p>
        {portfolio.bio.paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-sm text-grayscale-10">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}

export function AboutSection({ portfolio }: { portfolio: Portfolio }) {
  const { role, location, contact } = portfolio;

  return (
    <section className="grid min-h-0 grid-cols-1 gap-1.5 rounded-2xl border border-grayscale-3 bg-grayscale-2 p-1.5 md:grid-cols-2">
      <div className="flex w-full flex-col items-center justify-center gap-1.5 rounded-[13px] border border-grayscale-3 bg-grayscale-1 small-shadow dark:border-transparent dark:bg-grayscale-2 dark:shadow-none">
        <div className="flex flex-col items-center gap-2 p-8 text-center">
          <p className="text-sm font-medium text-grayscale-12">{role}</p>
          <p className="text-xs text-grayscale-9">{location}</p>
          <div className="mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs">
            <a
              href={`mailto:${contact.email}`}
              className="text-grayscale-11 underline decoration-grayscale-5 underline-offset-2 transition-colors hover:text-grayscale-12"
            >
              {contact.email}
            </a>
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-grayscale-11 underline decoration-grayscale-5 underline-offset-2 transition-colors hover:text-grayscale-12"
            >
              GitHub
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-grayscale-11 underline decoration-grayscale-5 underline-offset-2 transition-colors hover:text-grayscale-12"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <FeaturedCard portfolio={portfolio} />
    </section>
  );
}
