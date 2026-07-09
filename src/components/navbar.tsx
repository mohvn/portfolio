import { GitHubLink } from "@/components/github-link";
import { NavbarLinks, type NavbarLinkItem } from "@/components/navbar-links";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";
import { getTranslations, type Locale } from "@/i18n";

export function Navbar({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);

  const links: NavbarLinkItem[] = [
    {
      id: "experiences",
      href: `/${locale}#experiences`,
      label: t.nav.experiences,
    },
    {
      id: "projects",
      href: `/${locale}#projects`,
      label: t.nav.projects,
    },
    {
      id: "skills",
      href: `/${locale}#skills`,
      label: t.nav.skills,
    },
  ];

  return (
    <header className="sticky top-0 z-[100] w-full bg-background border-b border-border">
      <div className="mx-auto flex h-[var(--header-height)] w-full max-w-[700px] items-center gap-2 border-x border-border px-2 sm:gap-4">
        <NavbarLinks items={links} />

        <div className="flex-1" />

        <div className="flex items-center">
          <Separator
            orientation="vertical"
            className="mr-2 max-sm:hidden h-5 self-center"
          />
          <GitHubLink />
          <Separator
            orientation="vertical"
            className="mx-2 h-5 self-center"
          />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
