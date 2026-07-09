import { redirect } from "next/navigation";
import { HeroGrid } from "@/components/hero-grid";
import { Socials } from "@/components/socials";
import { SocialLinks } from "@/components/social-links";
import { GitHubActivityCalendar } from "@/components/github-activity-calendar";
import { DotPattern } from "@/components/ui/dot-pattern";
import { QuoteIcon } from "@/components/icons/quote";
import { MdiReact } from "@/components/icons/react";
import { RiNextjsFill } from "@/components/icons/nextjs";
import { MdiTailwind } from "@/components/icons/tailwind";
import { LineiconsAstro } from "@/components/icons/astro";
import { AkarIconsPythonFill } from "@/components/icons/python";
import { LineiconsTypescript } from "@/components/icons/typescript";
import { RiJavascriptFill } from "@/components/icons/javascript";
import { DeviconPlainPhp } from "@/components/icons/php";
import { AkarIconsNodeFill } from "@/components/icons/node";
import { SimpleIconsBun } from "@/components/icons/bun";
import { MdiGit } from "@/components/icons/git";
import { MdiGithub } from "@/components/icons/github";
import { LineiconsPostman } from "@/components/icons/postman";
import { SolarFigmaBold } from "@/components/icons/figma";
import { UilLinux } from "@/components/icons/linux";
import { ExperienceCard } from "@/components/experience-card";
import { ProjectCard } from "@/components/project-card";
import { SectionLinkButton } from "@/components/section-link-button";
import { getTranslations, isValidLocale, locales, type Locale } from "@/i18n";
import { assetPath } from "@/lib/base-path";
import type { Metadata } from "next";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params.locale;
  if (!isValidLocale(locale)) {
    return { title: "Mohan Elias" };
  }
  const t = getTranslations(locale as Locale);
  return {
    title: t.meta.title,
    description: t.meta.description,
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      locale: locale === "pt-BR" ? "pt_BR" : "en_US",
    },
  };
}

const skillsWithIcons = [
  { name: "React", href: "https://www.google.com/search?q=React+JS+JavaScript+library", Icon: MdiReact },
  { name: "Next.js", href: "https://www.google.com/search?q=Next.js+React+framework", Icon: RiNextjsFill },
  { name: "Tailwind", href: "https://www.google.com/search?q=Tailwind+CSS+framework", Icon: MdiTailwind },
  { name: "Astro", href: "https://www.google.com/search?q=Astro+web+framework", Icon: LineiconsAstro },
  { name: "Python", href: "https://www.google.com/search?q=Python+programming+language", Icon: AkarIconsPythonFill },
  { name: "TypeScript", href: "https://www.google.com/search?q=TypeScript+programming+language", Icon: LineiconsTypescript },
  { name: "JavaScript", href: "https://www.google.com/search?q=JavaScript+programming+language", Icon: RiJavascriptFill },
  { name: "PHP", href: "https://www.google.com/search?q=PHP+programming+language", Icon: DeviconPlainPhp },
  { name: "Node", href: "https://www.google.com/search?q=Node.js+JavaScript+runtime", Icon: AkarIconsNodeFill },
  { name: "Bun", href: "https://www.google.com/search?q=Bun.js+JavaScript+runtime", Icon: SimpleIconsBun },
  { name: "Git", href: "https://www.google.com/search?q=Git+version+control", Icon: MdiGit },
  { name: "Github", href: "https://www.google.com/search?q=GitHub+code+hosting+platform", Icon: MdiGithub },
  { name: "Postman", href: "https://www.google.com/search?q=Postman+API+testing+tool", Icon: LineiconsPostman },
  { name: "Figma", href: "https://www.google.com/search?q=Figma+design+tool", Icon: SolarFigmaBold },
  { name: "Linux", href: "https://www.google.com/search?q=Linux+operating+system", Icon: UilLinux },
];

const projectSlugToHref: Record<string, string> = {
  ovni: "/projects/ovni",
  sttp: "/projects/project-name",
  caddie: "/projects/caddie",
  "another-project": "/projects/another-project",
  "gestao-lojao-do-bras": "/projects/gestao-lojao-do-bras",
  "sds-wiki": "/projects/sds-wiki",
  rastreio: "/projects/rastreio",
  py013: "/projects/py013",
};

const projectSlugToScreenshot: Record<string, string> = {
  ovni: "/static/images/ovni.png",
  sttp: "/static/images/sttp.png",
  caddie: "/static/images/caddie.png",
  "another-project": "/static/images/sistemaabelha.png",
  "gestao-lojao-do-bras": "/static/images/lojaodobras.png",
  "sds-wiki": "/static/images/sds.png",
  rastreio: "/static/images/rastreio.png",
  py013: "/static/images/py013.png",
};

const projectSlugToStatus: Record<string, "building" | "live" | "comingSoon" | "private"> = {
  ovni: "live",
  sttp: "live",
  caddie: "live",
  "another-project": "live",
  "gestao-lojao-do-bras": "private",
  "sds-wiki": "live",
  rastreio: "building",
  py013: "live",
};

const projectOrder = [
  "py013",
  "rastreio",
  "ovni",
  "sttp",
  "caddie",
  "another-project",
  "gestao-lojao-do-bras",
  "sds-wiki",
] as const;

export default async function LocalePage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  if (!isValidLocale(locale)) {
    redirect("/");
  }
  const t = getTranslations(locale as Locale);

  return (
    <main className="flex min-h-[100dvh] flex-col overflow-x-hidden border-x border-border text-foreground">
      <HeroGrid
        name={t.hero.name}
        roles={t.hero.roles}
        avatarSrc="https://github.com/mohvn.png"
      />

      <div className="flex flex-col border-border p-4">
        <Socials locale={locale as Locale} />
      </div>

      <div className="border-t border-border p-4">
        <SocialLinks />
      </div>

      <div className="flex flex-col items-center gap-2 border-t border-border p-4">
        <GitHubActivityCalendar username="mohvn" />
      </div>

      <div className="flex flex-col gap-3 border-t border-border p-4 text-muted-foreground">
        <p>{t.bio.paragraph1}</p>
        <p>{t.bio.paragraph2}</p>
      </div>

      <div id="experiences" className="flex scroll-mt-[var(--header-height)] flex-col gap-2 border-t border-border p-4">
        <p className="text-lg font-bold">{t.sections.experiences}</p>
      </div>

      <ExperienceCard
        logo={assetPath("/static/images/empreender_logo.jpg")}
        company={t.experiences.empreender.company}
        role={t.experiences.empreender.role}
        period={t.experiences.empreender.period}
        location={t.experiences.empreender.location}
        descriptions={[...t.experiences.empreender.descriptions]}
        technologies={[...t.experiences.empreender.technologies]}
        defaultOpen={true}
      />

      <ExperienceCard
        logo={assetPath("/static/images/botslab_logo.jpg")}
        company={t.experiences.botslab.company}
        role={t.experiences.botslab.role}
        period={t.experiences.botslab.period}
        location={t.experiences.botslab.location}
        descriptions={[...t.experiences.botslab.descriptions]}
        technologies={[...t.experiences.botslab.technologies]}
      />

      <ExperienceCard
        logo={assetPath("/static/images/logo-freelancer.png")}
        company={t.experiences.freelancer.company}
        role={t.experiences.freelancer.role}
        period={t.experiences.freelancer.period}
        location={t.experiences.freelancer.location}
        descriptions={[...t.experiences.freelancer.descriptions]}
        technologies={[...t.experiences.freelancer.technologies]}
      />

      <div id="projects" className="flex scroll-mt-[var(--header-height)] flex-col gap-2 border-t border-border p-4">
        <p className="text-lg font-bold">{t.sections.projects}</p>
      </div>

      <div className="grid grid-cols-1 gap-0 divide-y divide-border border-t border-border md:grid-cols-2 md:divide-x md:divide-y-0">
        {projectOrder.map((slug) => (
          <ProjectCard
            key={slug}
            title={t.projects[slug].title}
            description={t.projects[slug].description}
            href={`/${locale}${projectSlugToHref[slug] ?? "#"}`}
            status={projectSlugToStatus[slug] ?? "live"}
            screenshot={assetPath(projectSlugToScreenshot[slug] ?? "")}
            comingSoon={false}
            statusLabel={t.status[projectSlugToStatus[slug] ?? "live"]}
          />
        ))}
      </div>

      <section
        data-slot="panel"
        className="screen-line-top screen-line-bottom border-t border-border"
        id="skills"
      >
        <header data-slot="panel-header" className="screen-line-bottom px-4">
          <h2
            data-slot="panel-title"
            className="group/panel-title relative text-3xl font-medium tracking-tight text-balance py-4"
          >
            <a href="#skills">{t.sections.skills}</a>
            <SectionLinkButton href="#skills" />
          </h2>
        </header>

        {(() => {
          const groups = [
            {
              id: "language",
              label: "Language",
              items: ["TypeScript", "JavaScript", "Python", "PHP"],
            },
            {
              id: "frontend",
              label: "Frontend",
              items: ["React", "Next.js", "Tailwind", "Astro"],
            },
            {
              id: "tools",
              label: "Tools",
              items: ["Figma", "Postman", "Git", "Github", "Linux", "Node", "Bun"],
            },
          ] as const;

          const itemsByName = new Map(
            skillsWithIcons.map((s) => [s.name, s] as const),
          );

          return (
            <div className="relative [--badge-height:1.5rem] [--col-left-width:12rem]">
              <div
                className="pointer-events-none absolute inset-y-0 left-[var(--col-left-width)] -z-10 hidden w-px bg-[linear-gradient(to_bottom,hsl(var(--border))_4px,transparent_2px)] bg-[length:1px_6px] bg-repeat-y sm:block"
                aria-hidden
              />

              {groups.map((group, idx) => {
                const number = String(idx + 1).padStart(2, "0");
                const rowId = `stack-${group.id}`;

                return (
                  <div
                    key={group.id}
                    className="grid items-start gap-y-2 border-b border-border py-4 last:border-none sm:grid-cols-[var(--col-left-width)_1fr]"
                  >
                    <div
                      id={rowId}
                      className="pl-4 text-sm text-muted-foreground leading-[var(--badge-height)]"
                    >
                      <span
                        className="mr-1.5 font-mono text-muted-foreground/50 select-none"
                        aria-hidden
                      >
                        {number}
                      </span>
                      {group.label}
                    </div>

                    <ul aria-labelledby={rowId} className="flex flex-wrap gap-1.5 px-4">
                      {group.items
                        .map((itemName) => itemsByName.get(itemName))
                        .filter(
                          (
                            item,
                          ): item is (typeof skillsWithIcons)[number] =>
                            Boolean(item),
                        )
                        .map(({ name, href, Icon }) => (
                          <li key={name} className="flex">
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex h-[var(--badge-height)] items-center justify-center gap-1.5 rounded-full bg-muted/60 px-2 font-mono text-xs text-foreground ring-1 ring-inset ring-border hover:bg-muted"
                            >
                              <Icon
                                className="size-3.5 shrink-0 text-muted-foreground/80"
                                aria-hidden
                              />
                              {name}
                            </a>
                          </li>
                        ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          );
        })()}
      </section>

      <div className="flex flex-col gap-2 border-t border-border p-4">
        <div className="max-w-[690px] mx-auto relative p-3 py-4 sm:py-6 flex flex-col items-center text-center">
          <QuoteIcon
            className="sm:text-4xl text-3xl text-muted-foreground/30 mb-4 sm:mb-6 shrink-0 size-6 sm:size-10"
            aria-hidden
          />
          <blockquote className="relative z-10 max-w-2xl px-1 sm:px-4">
            <p className="text-xl sm:text-3xl font-bold italic text-foreground leading-relaxed tracking-tight">
              &ldquo;{t.quote.text}&rdquo;
            </p>
          </blockquote>
          <div className="sm:mt-8 mt-6 flex items-center gap-3 z-10">
            <div className="h-px w-8 bg-border" />
            <span className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-widest">
              {t.quote.author}
            </span>
            <div className="h-px w-8 bg-border" />
          </div>
        </div>
      </div>

      <div className="relative flex flex-col gap-4 h-40 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <DotPattern width={8} height={8} className="absolute top-0 left-0 w-full h-full opacity-50 pointer-events-none text-neutral-400/80" />
        </div>
      </div>
    </main>
  );
}
