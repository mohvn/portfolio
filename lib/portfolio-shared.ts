export const portfolioBase = {
  name: "Mohan Elias",
  slug: "mohvn",
  repo: "mohvn/portfolio",
  avatar: "https://github.com/mohvn.png",
  website: "https://mohvn.github.io",
  contact: {
    email: "mohvn@proton.me",
    github: "https://github.com/mohvn",
    linkedin: "https://linkedin.com/in/mohanelias",
  },
  skillGroups: [
    {
      id: "frontend" as const,
      skills: [
        { name: "React", icon: "react", href: "https://react.dev" },
        { name: "Next.js", icon: "nextdotjs", href: "https://nextjs.org" },
        {
          name: "TypeScript",
          icon: "typescript",
          href: "https://www.typescriptlang.org",
        },
        {
          name: "JavaScript",
          icon: "javascript",
          href: "https://developer.mozilla.org/docs/Web/JavaScript",
        },
        {
          name: "Tailwind",
          icon: "tailwindcss",
          href: "https://tailwindcss.com",
        },
        { name: "Astro", icon: "astro", href: "https://astro.build" },
      ],
    },
    {
      id: "backend" as const,
      skills: [
        { name: "Python", icon: "python", href: "https://www.python.org" },
        { name: "Node", icon: "nodedotjs", href: "https://nodejs.org" },
        { name: "Bun", icon: "bun", href: "https://bun.sh" },
        { name: "PHP", icon: "php", href: "https://www.php.net" },
      ],
    },
    {
      id: "design" as const,
      skills: [
        { name: "Figma", icon: "figma", href: "https://www.figma.com" },
      ],
    },
    {
      id: "workflow" as const,
      skills: [
        { name: "Git", icon: "git", href: "https://git-scm.com" },
        { name: "Linux", icon: "linux", href: "https://www.kernel.org" },
        { name: "Cursor IDE", icon: "cursor", href: "https://cursor.com" },
      ],
    },
  ],
} as const;

export const projectsShared = [
  {
    id: "py013",
    href: "https://www.py013.com.br",
    preview: "https://mohvn.github.io/portfolio/static/images/py013.png",
    span: "full" as const,
    status: "live" as const,
    icon: "P",
    color: "teal" as const,
  },
  {
    id: "rastreio",
    href: "https://get.rastreio.net",
    preview: "https://mohvn.github.io/portfolio/static/images/rastreio.png",
    span: "md" as const,
    status: "building" as const,
    icon: "R",
    color: "blue" as const,
    empreender: true,
  },
  {
    id: "area-do-cliente",
    href: "https://app.areadocliente.com.br/inicio",
    preview: "/areadocliente.png",
    favicon: "/area.ico",
    span: "md" as const,
    status: "live" as const,
    icon: "+",
    color: "grass" as const,
    empreender: true,
  },
  {
    id: "ovni",
    href: "https://app.ovni.com.br",
    preview: "/ovni.png",
    span: "md" as const,
    status: "live" as const,
    icon: "O",
    color: "orange" as const,
    empreender: true,
  },
  {
    id: "sttp",
    href: "https://mohvn.github.io/sttp",
    preview: "https://mohvn.github.io/portfolio/static/images/sttp.png",
    span: "md" as const,
    status: "live" as const,
    icon: "S",
    color: "grass" as const,
  },
  {
    id: "caddie",
    href: "https://www.caddieestrategia.com.br",
    preview: "https://mohvn.github.io/portfolio/static/images/caddie.png",
    span: "md" as const,
    status: "live" as const,
    icon: "C",
    color: "teal" as const,
  },
  {
    id: "abelha",
    href: "https://www.sistema-abelha.com.br",
    preview:
      "https://mohvn.github.io/portfolio/static/images/sistemaabelha.png",
    favicon: "/abelha.ico",
    span: "md" as const,
    status: "live" as const,
    icon: "A",
    color: "blue" as const,
  },
  {
    id: "sds",
    href: "#",
    preview: "https://mohvn.github.io/portfolio/static/images/sds.png",
    span: "md" as const,
    status: "live" as const,
    icon: "D",
    color: "orange" as const,
  },
  {
    id: "lojao-do-bras",
    href: "#",
    preview: "https://mohvn.github.io/portfolio/static/images/lojaodobras.png",
    span: "md" as const,
    status: "private" as const,
    icon: "L",
    color: "teal" as const,
  },
] as const;

export const experienceShared = [
  {
    id: "empreender",
    name: "Empreender",
    remote: true,
    current: true,
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQE6bzGoJL2ORw/company-logo_100_100/company-logo_100_100/0/1704765693147/empreender_logo?e=1785369600&v=beta&t=4L-3m1Bc-NUv0VZ1Bds5AWJuGoGEsnQVwgjmUU1CRkQ",
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
    remote: true,
    current: false,
    logo: "https://media.licdn.com/dms/image/v2/C4E0BAQFwEDHMlnWAwQ/company-logo_100_100/company-logo_100_100/0/1654016006485/botslab_logo?e=1785369600&v=beta&t=4yrSCcFnSxyHB2DMlQ05NpmUq1zpMOda_dGdwzva6oA",
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
    icon: "code" as const,
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

export const experimentsShared = [
  { id: "react-ui", preview: "react", href: "#projetos", span: "lg" as const },
  { id: "next-apps", preview: "next", href: "#projetos" },
  { id: "tailwind", preview: "tailwind", href: "#skills" },
  { id: "typescript", preview: "typescript", href: "#skills" },
  { id: "python-rpa", preview: "python", href: "#experiencia" },
  { id: "astro-docs", preview: "astro", href: "#projetos" },
] as const;

export type IconColor = (typeof projectsShared)[number]["color"];
