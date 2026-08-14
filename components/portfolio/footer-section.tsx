import type { Portfolio } from "@/lib/i18n";

export function FooterSection({ portfolio }: { portfolio: Portfolio }) {
  const { ui, contact, slug, closing } = portfolio;
  const year = new Date().getFullYear();
  const copyright = ui.footer.copyright.replace("{year}", String(year));

  return (
    <footer className="flex flex-col gap-8 border-t border-grayscale-3 pt-10 pb-4 dark:border-grayscale-4">
      <div className="flex flex-col gap-4 text-base leading-7 text-pretty text-grayscale-11 lowercase">
        {closing.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p className="text-grayscale-10">{ui.footer.note}</p>
      </div>

      <nav
        aria-label="Social"
        className="flex flex-col gap-1 text-sm lowercase"
      >
        <a
          href={contact.github}
          target="_blank"
          rel="noopener noreferrer"
          className="w-fit text-grayscale-11 underline decoration-grayscale-5 underline-offset-4 transition-colors hover:text-grayscale-12 hover:decoration-grayscale-9"
        >
          {ui.footer.github}: @{slug}
        </a>
        <a
          href={contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="w-fit text-grayscale-11 underline decoration-grayscale-5 underline-offset-4 transition-colors hover:text-grayscale-12 hover:decoration-grayscale-9"
        >
          {ui.footer.linkedin}: /in/mohanelias
        </a>
        <a
          href={`mailto:${contact.email}`}
          className="w-fit text-grayscale-11 underline decoration-grayscale-5 underline-offset-4 transition-colors hover:text-grayscale-12 hover:decoration-grayscale-9"
        >
          {ui.footer.email}: {contact.email}
        </a>
      </nav>

      <p className="text-xs text-grayscale-9 lowercase">{copyright}</p>
    </footer>
  );
}
