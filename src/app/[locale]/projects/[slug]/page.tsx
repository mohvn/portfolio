import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronLeft, ExternalLink, FileText, Github, Globe } from "lucide-react";
import { getProjectBySlug, projects, type ProjectStatus } from "@/lib/projects";
import { assetPath } from "@/lib/base-path";
import { DotPattern } from "@/components/ui/dot-pattern";
import { getTranslations, isValidLocale, locales, type Locale } from "@/i18n";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    projects.map((p) => ({ locale, slug: p.slug }))
  );
}

const dashedVerticalDividerStyle = {
  backgroundImage: `repeating-linear-gradient(to bottom, #CBCCCC 0px, #CBCCCC 6px, transparent 6px, transparent 14px)`,
  backgroundSize: "1px 100%",
  backgroundRepeat: "no-repeat",
};

const statusConfig: Record<
  ProjectStatus,
  { color: string; bgColor: string }
> = {
  building: {
    color: "text-red-500",
    bgColor: "bg-red-500",
  },
  live: {
    color: "text-green-500",
    bgColor: "bg-green-500",
  },
  comingSoon: {
    color: "text-yellow-500",
    bgColor: "bg-yellow-500",
  },
  private: {
    color: "text-gray-500",
    bgColor: "bg-gray-500",
  },
};

/** Slug used in URL may differ from i18n key (e.g. project-name -> sttp). */
function getProjectTranslationKey(slug: string): string {
  return slug === "project-name" ? "sttp" : slug;
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();

  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const t = getTranslations(locale as Locale);
  const translationKey = getProjectTranslationKey(slug);
  const projectT = t.projects[translationKey as keyof typeof t.projects];
  const longDescription =
    projectT?.longDescription ?? project.longDescription;
  const title = projectT?.title ?? project.title;
  const statusLabel = t.status[project.status];

  const config = statusConfig[project.status];

  return (
    <main className="flex flex-col min-h-[100dvh] text-[#333333] dashed-border-no-top overflow-x-hidden">
      <div className="relative flex flex-col gap-4 h-40 overflow-hidden dashed-border-dots">
        <div className="absolute inset-0 -z-10">
          <DotPattern width={8} height={8} className="absolute top-0 left-0 w-full h-full opacity-50 pointer-events-none text-neutral-400/80" />
        </div>
        <div className="dashed-border-vertical-lines-overlay" aria-hidden />
      </div>

      <div className="flex flex-1 flex-col min-h-0">
        {/* Header */}
        <div className="flex gap-2 dashed-border p-4">
          <Link
            href={`/${locale}/#projects`}
            className="relative z-10 cursor-pointer p-1 border border-transparent hover:border-gray-300 rounded-[6px] hover:bg-gray-100 transition-colors duration-300"
            aria-label="Go back"
          >
            <ChevronLeft className="w-[18px] h-[18px] text-gray-700" />
          </Link>
          <h1 className="text-[1.15rem] font-bold leading-tight text-gray-900">
            {t.sections.projects}
          </h1>
        </div>

        {/* Image */}
        <div className="flex flex-col gap-2 dashed-border dashed-border-no-top p-4">
          <div className="w-full">
            <div className="w-full h-full md:min-h-[340px] min-h-[200px] rounded-[12px] relative border border-gray-300 p-[4px] overflow-hidden">
              {project.buildingGif ? (
                <Image
                  alt={title}
                  src={project.buildingGif.startsWith("/") ? assetPath(project.buildingGif) : project.buildingGif}
                  width={1000}
                  height={1000}
                  className="w-full object-cover md:h-[340px] h-[200px] rounded-[8px] border border-gray-300"
                  loading="lazy"
                />
              ) : (
                <Image
                  alt={title}
                  src={assetPath(project.screenshot)}
                  width={1000}
                  height={1000}
                  className="w-full object-cover md:h-[340px] h-[200px] rounded-[8px] border border-gray-300"
                  loading="lazy"
                />
              )}
            </div>
          </div>
        </div>

        {/* Links row */}
        <div className="flex flex-col gap-2 dashed-border dashed-border-no-top p-4">
          <div className="flex items-stretch justify-between w-full">
            {project.github ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="group py-[11px] flex text-[1.05rem] text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-all duration-300 w-full items-center justify-center cursor-pointer"
                href={project.github}
              >
                <Github className="w-[15px] h-[15px] shrink-0" />
                <span className="relative ml-1.5">
                  Github
                  <span className="absolute left-0 bottom-0 w-full h-px bg-gray-900 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                </span>
                <ExternalLink className="opacity-0 hidden lg:block group-hover:opacity-100 transition-opacity duration-300 w-[18px] h-[18px] ml-1 shrink-0" />
              </a>
            ) : (
              <div className="py-[11px] flex text-[1.05rem] text-gray-400 w-full items-center justify-center cursor-not-allowed select-none">
                <Github className="w-[15px] h-[15px] shrink-0" />
                <span className="ml-1.5">Github</span>
              </div>
            )}

            <div className="self-stretch" style={dashedVerticalDividerStyle} />

            {project.website ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="group py-[11px] flex text-[1.05rem] text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-all duration-300 w-full items-center justify-center cursor-pointer"
                href={project.website}
              >
                <Globe className="w-[15px] h-[15px] shrink-0" />
                <span className="relative ml-1.5">
                  Website
                  <span className="absolute left-0 bottom-0 w-full h-px bg-gray-900 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                </span>
                <ExternalLink className="opacity-0 hidden lg:block group-hover:opacity-100 transition-opacity duration-300 w-[18px] h-[18px] ml-1 shrink-0" />
              </a>
            ) : (
              <div className="py-[11px] flex text-[1.05rem] text-gray-400 w-full items-center justify-center cursor-not-allowed select-none">
                <Globe className="w-[15px] h-[15px] shrink-0" />
                <span className="ml-1.5">Website</span>
              </div>
            )}

            <div className="self-stretch" style={dashedVerticalDividerStyle} />

            <div className="py-[11px] flex text-[1.05rem] text-gray-400 opacity-40 w-full items-center justify-center cursor-not-allowed select-none">
              <FileText className="w-[15px] h-[15px] shrink-0" />
              <span className="ml-1.5">Post</span>
            </div>
          </div>
        </div>

        {/* Title, status, description */}
        <div className="flex flex-col gap-2 dashed-border dashed-border-no-top p-4">
          <div className="flex flex-col w-full gap-1.5">
            <div className="flex items-center justify-between">
              <h1 className="text-[1.40rem] font-bold leading-tight text-gray-900">
                {title}
              </h1>
              <div className="flex items-center gap-1 pr-1 select-none">
                {(project.status === "building" || project.status === "live") && (
                  <div className="relative flex items-center justify-center w-3.5 h-3.5">
                    <div
                      className={`absolute inset-0 m-auto animate-ping ${config.bgColor}`}
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        opacity: 0.4,
                      }}
                    />
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      className={`relative z-10 ${config.color} w-3.5 h-3.5`}
                    >
                      <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" />
                    </svg>
                  </div>
                )}
                <p className="text-sm text-gray-500 font-medium">
                  {statusLabel}
                </p>
              </div>
            </div>
            <div className="text-base text-gray-700 [&>p]:mb-3 [&>p:last-child]:mb-0">
              {longDescription.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Stack used */}
        <div className="flex flex-col gap-2 dashed-border dashed-border-no-top p-4">
          <div className="flex font-semibold text-gray-900 flex-col gap-2.5 w-full">
            <h2 className="text-base font-bold">Stack used</h2>
            <div className="flex flex-wrap items-center gap-1.5">
              {project.stack.map((tech) =>
                tech.href ? (
                  <a
                    key={tech.name}
                    href={tech.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative min-w-fit flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-[8px] border border-gray-300 bg-transparent text-gray-500 px-2 py-1 transition-all duration-300 hover:text-gray-700 hover:border-gray-500 hover:bg-gray-50 select-none"
                  >
                    <span className="text-sm font-medium whitespace-nowrap">
                      {tech.name}
                    </span>
                  </a>
                ) : (
                  <span
                    key={tech.name}
                    className="rounded-[8px] border border-gray-300 bg-transparent text-gray-500 px-2 py-1 text-sm font-medium whitespace-nowrap"
                  >
                    {tech.name}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

      </div>

      <div className="relative flex flex-col gap-4 h-40 overflow-hidden mt-auto shrink-0 dashed-border-dots dashed-border">
        <div className="absolute inset-0 -z-10">
          <DotPattern width={8} height={8} className="absolute top-0 left-0 w-full h-full opacity-50 pointer-events-none text-neutral-400/80" />
        </div>
      </div>
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return { title: "Project not found" };
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };
  const t = getTranslations(locale as Locale);
  const translationKey = getProjectTranslationKey(slug);
  const title = t.projects[translationKey as keyof typeof t.projects]?.title ?? project.title;
  return { title: `${title} | ${t.sections.projects}` };
}
