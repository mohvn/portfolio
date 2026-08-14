"use client";

import type { ReactNode } from "react";
import type { Portfolio } from "@/lib/i18n";
import { RoughMark } from "@/components/portfolio/rough-mark";
import {
  companies,
  CompanyMention,
} from "@/components/portfolio/company-mention";

function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[\[[^\]]+\]\])/g);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("[[") && part.endsWith("]]")) {
          const id = part.slice(2, -2);
          const company = companies[id];
          if (!company) return <span key={index}>{part}</span>;
          return <CompanyMention key={index} company={company} />;
        }

        if (part.startsWith("**") && part.endsWith("**")) {
          return <RoughMark key={index}>{part.slice(2, -2)}</RoughMark>;
        }

        return <span key={index}>{part}</span>;
      })}
    </>
  );
}

export function Hero({
  portfolio,
  actions,
}: {
  portfolio: Portfolio;
  actions?: ReactNode;
}) {
  return (
    <header className="flex flex-col gap-8">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-2">
          <h1 className="font-serif text-3xl tracking-tight text-grayscale-12 lowercase sm:text-4xl md:text-5xl">
            {portfolio.greeting}
          </h1>
          <p className="font-serif text-lg italic text-grayscale-10 lowercase sm:text-xl">
            {portfolio.tagline}
          </p>
        </div>
        {actions ? (
          <div className="flex shrink-0 items-center gap-2">{actions}</div>
        ) : null}
      </div>

      <div className="flex flex-col gap-4 text-base leading-7 text-pretty text-grayscale-11 lowercase">
        {portfolio.paragraphs.map((paragraph) => (
          <p key={paragraph}>
            <RichText text={paragraph} />
          </p>
        ))}
      </div>
    </header>
  );
}
