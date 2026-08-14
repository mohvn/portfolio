import { withBasePath } from "@/lib/base-path";

export const portfolioBase = {
  name: "Mohan Elias",
  slug: "mohvn",
  repo: "mohvn/portfolio",
  avatar: withBasePath("/images/avatar.png"),
  website: "https://mohvn.github.io",
  contact: {
    email: "mohvn@proton.me",
    github: "https://github.com/mohvn",
    linkedin: "https://linkedin.com/in/mohanelias",
  },
} as const;

export const projectsShared = [
  {
    id: "py013",
    href: "https://www.py013.com.br",
    status: "live" as const,
  },
  {
    id: "rastreio",
    href: "https://get.rastreio.net",
    status: "building" as const,
  },
  {
    id: "area-do-cliente",
    href: "https://app.areadocliente.com.br/inicio",
    status: "live" as const,
  },
  {
    id: "ovni",
    href: "https://app.ovni.com.br",
    status: "live" as const,
  },
  {
    id: "sttp",
    href: "https://mohvn.github.io/sttp",
    status: "live" as const,
  },
  {
    id: "caddie",
    href: "https://www.caddieestrategia.com.br",
    status: "live" as const,
  },
  {
    id: "abelha",
    href: "https://www.sistema-abelha.com.br",
    status: "live" as const,
  },
  {
    id: "sds",
    href: "#",
    status: "live" as const,
  },
  {
    id: "lojao-do-bras",
    href: "#",
    status: "private" as const,
  },
] as const;

export const experienceShared = [
  {
    id: "empreender",
    name: "Empreender",
    href: "https://empreender.com.br/",
    remote: true,
    current: true,
    logo: withBasePath("/images/empreender-logo.jpg"),
    positions: [
      {
        id: "frontend",
        periodStart: "12.2024",
        periodEnd: null,
        duration: "7m",
        tags: ["React", "Next.js", "Tailwind CSS", "SEO", "Performance"],
      },
    ],
  },
  {
    id: "botslab",
    name: "Botslab",
    href: "https://www.botslab.com/",
    remote: true,
    current: false,
    logo: withBasePath("/images/botslab-logo.jpg"),
    positions: [
      {
        id: "rpa-python",
        periodStart: "12.2024",
        periodEnd: "02.2026",
        duration: "3m",
        tags: ["Python", "Selenium", "Robot Framework"],
      },
    ],
  },
  {
    id: "freelancer",
    name: "Freelancer",
    remote: true,
    current: true,
    positions: [
      {
        id: "full-stack",
        periodStart: "01.2022",
        periodEnd: null,
        duration: "4y 6m",
        tags: ["Next.js", "Astro", "React", "WordPress", "Tailwind CSS"],
      },
    ],
  },
] as const;
