import { notFound } from "next/navigation";
import { LangSync } from "@/components/portfolio/lang-sync";
import { isValidLocale, type Locale } from "@/lib/i18n/config";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "pt-BR" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return (
    <>
      <LangSync locale={locale as Locale} />
      {children}
    </>
  );
}
