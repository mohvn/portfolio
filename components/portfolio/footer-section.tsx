import type { Portfolio } from "@/lib/i18n";

export function FooterSection({ portfolio }: { portfolio: Portfolio }) {
  const { ui, contact, slug } = portfolio;
  const year = new Date().getFullYear();
  const copyright = ui.footer.copyright.replace("{year}", String(year));

  return (
    <footer className="flex flex-col gap-8 border-t border-grayscale-3 pt-10 pb-4 dark:border-grayscale-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold tracking-tight text-grayscale-12 sm:text-3xl">
          {ui.footer.headline}
        </h2>
        <p className="max-w-md text-sm text-grayscale-10">
          {ui.footer.availability}
        </p>
      </div>

      <nav
        aria-label="Social"
        className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm"
      >
        <a
          href={contact.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-grayscale-11 underline decoration-grayscale-5 underline-offset-4 transition-colors hover:text-grayscale-12 hover:decoration-grayscale-9"
        >
          {ui.footer.github} @{slug}
        </a>
        <a
          href={contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-grayscale-11 underline decoration-grayscale-5 underline-offset-4 transition-colors hover:text-grayscale-12 hover:decoration-grayscale-9"
        >
          {ui.footer.linkedin}
        </a>
        <a
          href={`mailto:${contact.email}`}
          className="text-grayscale-11 underline decoration-grayscale-5 underline-offset-4 transition-colors hover:text-grayscale-12 hover:decoration-grayscale-9"
        >
          {ui.footer.email}
        </a>
      </nav>

      <p className="text-xs text-grayscale-9">{copyright}</p>
    </footer>
  );
}
