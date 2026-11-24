import type { Locale } from "@/lib/i18n/config";
import type { Portfolio } from "@/lib/i18n";
import { DottedRow } from "@/components/portfolio/dotted-row";

const MONTHS = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  "pt-BR": ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
} as const;

function formatMonth(period: string, locale: Locale) {
  const [month, year] = period.split(".");
  const monthIndex = Number(month) - 1;
  return `${MONTHS[locale][monthIndex] ?? month} ${year.slice(-2)}`;
}

export function ExperienceSection({
  portfolio,
  locale,
}: {
  portfolio: Portfolio;
  locale: Locale;
}) {
  const { ui } = portfolio;

  return (
    <section
      aria-labelledby="experience-heading"
      className="relative z-10 flex flex-col gap-3"
    >
      <h2
        id="experience-heading"
        className="text-sm text-muted-foreground"
      >
        {ui.sections.experience}
      </h2>
      <ul className="flex flex-col">
        {portfolio.experience.map((company) => {
          const position = company.positions[0];
          if (!position) return null;

          const start = formatMonth(position.periodStart, locale);
          const end = position.periodEnd
            ? formatMonth(position.periodEnd, locale)
            : ui.present;
          const meta = `${position.role} · ${start} – ${end}`;

          return (
            <li key={company.id}>
              <DottedRow
                title={company.name}
                meta={meta}
                href={"href" in company ? company.href : undefined}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
