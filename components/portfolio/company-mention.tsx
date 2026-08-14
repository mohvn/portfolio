"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  PreviewCard,
  PreviewCardPopup,
  PreviewCardTrigger,
} from "@/components/ui/preview-card";
import { withBasePath } from "@/lib/base-path";
import { cn } from "@/lib/utils";

export type CompanyMentionData = {
  id: string;
  name: string;
  href: string;
  logo: string;
  domain: string;
  handle?: string;
  accent: string;
  tagline: {
    en: string;
    "pt-BR": string;
  };
  pageTitle: {
    en: string;
    "pt-BR": string;
  };
  description: {
    en: string;
    "pt-BR": string;
  };
};

export const companies: Record<string, CompanyMentionData> = {
  empreender: {
    id: "empreender",
    name: "Empreender",
    href: "https://empreender.com.br/",
    logo: withBasePath("/images/empreender-logo.jpg"),
    domain: "empreender.com.br",
    accent: "#7c3aed",
    tagline: {
      en: "One subscription. +20 apps.",
      "pt-BR": "Uma assinatura. +20 aplicativos.",
    },
    pageTitle: {
      en: "Empreender | Apps for ecommerce",
      "pt-BR": "Empreender | Apps para e-commerce",
    },
    description: {
      en: "Build the combo that works for your store, or install every app. Used by +15K shops on Shopify, Nuvemshop, Yampi, and more.",
      "pt-BR":
        "Monte o combo que funciona pro seu negócio, ou instale todos os apps. +15K lojas na Shopify, Nuvemshop, Yampi e mais.",
    },
  },
};

function useLocaleLang(): "en" | "pt-BR" {
  const [lang, setLang] = useState<"en" | "pt-BR">("pt-BR");

  useEffect(() => {
    const read = () => {
      setLang(document.documentElement.lang === "pt-BR" ? "pt-BR" : "en");
    };
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });
    return () => observer.disconnect();
  }, []);

  return lang;
}

export function CompanyMention({
  company,
  className,
}: {
  company: CompanyMentionData;
  className?: string;
}) {
  const lang = useLocaleLang();
  const meta = company.handle
    ? `${company.domain} / ${company.handle}`
    : company.domain;

  return (
    <PreviewCard>
      <PreviewCardTrigger
        href={company.href}
        target="_blank"
        rel="noopener noreferrer"
        delay={400}
        className={cn(
          "inline-flex items-center gap-1 align-baseline rounded-sm text-grayscale-12 underline decoration-grayscale-6 underline-offset-3 transition-[color,filter,text-decoration-color] hover:decoration-grayscale-9 active:brightness-75",
          className,
        )}
      >
        <Image
          src={company.logo}
          alt=""
          width={16}
          height={16}
          className="size-3.5 shrink-0 rounded-[2px] object-cover ring-1 ring-grayscale-4 dark:ring-grayscale-6"
        />
        <span className="leading-none">{company.name.toLowerCase()}</span>
      </PreviewCardTrigger>

      <PreviewCardPopup
        align="center"
        sideOffset={10}
        className={cn(
          "w-[22rem] flex-col gap-0 overflow-hidden rounded-2xl border-white/10 p-0 text-left shadow-2xl",
          "bg-grayscale-2/70 backdrop-blur-xl backdrop-saturate-150",
          "dark:border-white/10 dark:bg-black/55",
          "before:hidden",
        )}
      >
        <div className="relative isolate overflow-hidden p-5">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-10 -right-8 size-40 rounded-full opacity-50 blur-3xl"
            style={{ backgroundColor: company.accent }}
          />
          <Image
            src={company.logo}
            alt=""
            width={160}
            height={160}
            aria-hidden
            className="pointer-events-none absolute -top-6 -right-6 size-36 rotate-12 rounded-3xl object-cover opacity-90 shadow-lg ring-1 ring-white/10"
          />

          <div className="relative z-10 flex flex-col gap-5">
            <div className="flex items-center gap-1.5">
              <Image
                src={company.logo}
                alt=""
                width={18}
                height={18}
                className="size-[18px] rounded-[4px] object-cover ring-1 ring-white/15"
              />
              <span className="text-[13px] font-medium tracking-tight text-grayscale-12">
                {company.name}
              </span>
            </div>

            <div className="flex max-w-[14.5rem] flex-col gap-2">
              <p className="text-[15px] leading-snug font-semibold text-balance text-grayscale-12">
                {company.tagline[lang]}
              </p>
              <p className="font-mono text-[11px] text-grayscale-9">{meta}</p>
            </div>

            <div className="flex max-w-[16rem] flex-col gap-1.5 pt-1">
              <p className="font-serif text-xl leading-tight text-pretty text-grayscale-12">
                {company.pageTitle[lang]}
              </p>
              <p className="text-[12px] leading-5 text-pretty text-grayscale-10">
                {company.description[lang]}
              </p>
            </div>
          </div>
        </div>
      </PreviewCardPopup>
    </PreviewCard>
  );
}
