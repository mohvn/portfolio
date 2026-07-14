import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortfolioPage } from "@/components/portfolio/portfolio-page";
import { getPortfolio } from "@/lib/i18n";
import { isValidLocale, locales, type Locale } from "@/lib/i18n/config";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "pt-BR" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const portfolio = getPortfolio(locale as Locale);

  return {
    title: portfolio.meta.title,
    description: portfolio.meta.description,
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const portfolios = Object.fromEntries(
    locales.map((item) => [item, getPortfolio(item)]),
  ) as Record<Locale, ReturnType<typeof getPortfolio>>;

  return <PortfolioPage locale={locale as Locale} portfolios={portfolios} />;
}
