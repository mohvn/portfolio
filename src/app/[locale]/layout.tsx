import { notFound } from "next/navigation";
import { LangSync } from "@/components/lang-sync";
import { Navbar } from "@/components/navbar";
import { isValidLocale, type Locale } from "@/i18n";

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  if (!isValidLocale(locale)) {
    notFound();
  }
  return (
    <>
      <LangSync locale={locale as Locale} />
      <Navbar locale={locale as Locale} />
      <div className="mx-auto w-full max-w-[700px]">
        {children}
      </div>
    </>
  );
}
