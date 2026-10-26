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
    status: "live" as const,
  },
  {
    id: "area-do-cliente",
    href: "https://areadocliente.com.br",
    status: "live" as const,
  },
  {
    id: "ovni",
    href: "https://ovni.com.br",
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
    icon: "shopping-bag",
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
    icon: "bot",
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
    current: false,
    icon: "briefcase",
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

export const skillGroupsShared = [
  {
    id: "language",
    items: [
      {
        name: "TypeScript",
        href: "https://www.typescriptlang.org",
        icon: "simple-icons:typescript",
      },
      {
        name: "JavaScript",
        href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        icon: "simple-icons:javascript",
      },
      {
        name: "Python",
        href: "https://www.python.org",
        icon: "simple-icons:python",
      },
    ],
  },
  {
    id: "frontend",
    items: [
      {
        name: "React",
        href: "https://react.dev",
        icon: "simple-icons:react",
      },
      {
        name: "Next.js",
        href: "https://nextjs.org",
        icon: "simple-icons:nextdotjs",
      },
      {
        name: "Tailwind CSS",
        href: "https://tailwindcss.com",
        icon: "simple-icons:tailwindcss",
      },
      {
        name: "shadcn/ui",
        href: "https://ui.shadcn.com",
        icon: "simple-icons:shadcnui",
      },
      {
        name: "Astro",
        href: "https://astro.build",
        icon: "simple-icons:astro",
      },
    ],
  },
  {
    id: "backend",
    items: [
      {
        name: "Node.js",
        href: "https://nodejs.org",
        icon: "simple-icons:nodedotjs",
      },
      {
        name: "PHP",
        href: "https://www.php.net",
        icon: "simple-icons:php",
      },
      {
        name: "PostgreSQL",
        href: "https://www.postgresql.org",
        icon: "simple-icons:postgresql",
      },
    ],
  },
  {
    id: "infrastructure",
    items: [
      {
        name: "Vercel",
        href: "https://vercel.com",
        icon: "simple-icons:vercel",
      },
      {
        name: "Linux",
        href: "https://kernel.org",
        icon: "simple-icons:linux",
      },
      {
        name: "Docker",
        href: "https://www.docker.com",
        icon: "simple-icons:docker",
      },
    ],
  },
  {
    id: "workflow",
    items: [
      {
        name: "GitHub",
        href: "https://github.com",
        icon: "simple-icons:github",
      },
      {
        name: "Figma",
        href: "https://www.figma.com",
        icon: "simple-icons:figma",
      },
      {
        name: "WordPress",
        href: "https://wordpress.org",
        icon: "simple-icons:wordpress",
      },
    ],
  },
  {
    id: "design",
    items: [
      {
        name: "Figma",
        href: "https://www.figma.com",
        icon: "simple-icons:figma",
      },
    ],
  },
] as const;

export type SkillGroupId = (typeof skillGroupsShared)[number]["id"];
