import { redirect } from "next/navigation";
import { getProjectBySlug, projects } from "@/lib/projects";
import { defaultLocale } from "@/i18n";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function LegacyProjectRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) redirect("/");
  redirect(`/${defaultLocale}/projects/${slug}`);
}

export async function generateMetadata() {
  return { title: "Redirecting..." };
}
