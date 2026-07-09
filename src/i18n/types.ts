export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  location: string;
  descriptions: readonly string[];
  technologies: readonly string[];
}

export interface ProjectEntry {
  title: string;
  description: string;
  longDescription: readonly string[];
}

export interface Translations {
  meta: { title: string; description: string };
  hero: { name: string; roles: readonly string[] };
  bio: {
    paragraph1: string;
    paragraph2: string;
    socialsLabel: string;
    socialsBold: string;
  };
  sections: { experiences: string; projects: string; skills: string };
  nav: { experiences: string; projects: string; skills: string };
  experiences: {
    empreender: ExperienceEntry;
    botslab: ExperienceEntry;
    freelancer: ExperienceEntry;
  };
  projects: {
    rastreio: ProjectEntry;
    ovni: ProjectEntry;
    sttp: ProjectEntry;
    caddie: ProjectEntry;
    "another-project": ProjectEntry;
    "gestao-lojao-do-bras": ProjectEntry;
    "sds-wiki": ProjectEntry;
    py013: ProjectEntry;
  };
  status: {
    building: string;
    live: string;
    comingSoon: string;
    private: string;
  };
  quote: { text: string; author: string };
  contact: {
    roles: ReadonlyArray<{
      label: string;
      company: string;
      href: string;
      icon: "code";
    }>;
    location: string;
    locationHref: string;
  };
}
