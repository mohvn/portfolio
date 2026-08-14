import type { Locale } from "./config";
import { en } from "./locales/en";
import { ptBR } from "./locales/pt-BR";
import type { LocaleCopy } from "./types";
import {
  experienceShared,
  portfolioBase,
  projectsShared,
} from "../portfolio-shared";

const dictionaries: Record<Locale, LocaleCopy> = {
  en,
  "pt-BR": ptBR,
};

export function getTranslations(locale: Locale): LocaleCopy {
  return dictionaries[locale] ?? dictionaries.en;
}

export function getPortfolio(locale: Locale) {
  const t = getTranslations(locale);

  return {
    ...portfolioBase,
    role: t.copy.role,
    location: t.copy.location,
    greeting: t.copy.greeting,
    tagline: t.copy.tagline,
    paragraphs: t.copy.paragraphs,
    closing: t.copy.closing,
    projects: projectsShared.map((item) => ({
      ...item,
      ...t.copy.projects[item.id],
    })),
    experience: experienceShared.map((company) => {
      const companyCopy = t.copy.experience[company.id];

      return {
        ...company,
        location: companyCopy.location,
        positions: company.positions.map((position) => ({
          ...position,
          ...companyCopy.positions[position.id],
        })),
      };
    }),
    contact: portfolioBase.contact,
    ui: t.ui,
    meta: t.meta,
  };
}

export type Portfolio = ReturnType<typeof getPortfolio>;
