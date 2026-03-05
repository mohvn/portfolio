export type ProjectStatus = "building" | "live" | "comingSoon" | "private";

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string[];
  screenshot: string;
  buildingGif?: string;
  github?: string;
  website?: string;
  status: ProjectStatus;
  stack: { name: string; href?: string }[];
}

export const projects: Project[] = [
  {
    slug: "py013",
    title: "Py013",
    description: "Landing page da comunidade Python da Baixada Santista.",
    longDescription: [
      "Landing page da Py013, comunidade Python da Baixada Santista. Organização sem fins lucrativos dedicada ao ensino colaborativo de tecnologia e programação desde 2018.",
      "O site apresenta a comunidade, seus princípios (sem fins lucrativos, eventos online e presenciais, inovação na colaboração), impactos na região e convida à participação em eventos como CodeDojo e Open Data Day.",
      "Desenvolvido com Next.js e Tailwind para uma experiência rápida e responsiva, alinhada à identidade da comunidade.",
    ],
    screenshot: "/static/images/py013.png",
    github: undefined,
    website: "https://www.py013.com.br/",
    status: "live",
    stack: [
      { name: "Next.js", href: "https://www.google.com/search?q=Next.js" },
      { name: "Tailwind", href: "https://www.google.com/search?q=Tailwind" },
    ],
  },
  {
    slug: "rastreio",
    title: "Rastreio.net",
    description: "Aplicativo para gerenciamento de rastreio para ecommerce.",
    longDescription: [
      "Rastreio é um aplicativo para gerenciamento de rastreio voltado a lojas e operações de ecommerce.",
      "Permite centralizar códigos de rastreamento, acompanhar status de entregas e organizar pedidos em um único lugar, reduzindo planilhas e múltiplas abas de transportadoras.",
      "O projeto está em desenvolvimento ativo, com foco em integração com marketplaces e transportadoras e em uma experiência simples para o dia a dia do operador.",
    ],
    screenshot: "/static/images/rastreio.png",
    github: undefined,
    website: "http://app.rastreio.net/",
    status: "building",
    stack: [
      { name: "Next.js", href: "https://www.google.com/search?q=Next.js" },
      { name: "Tailwind", href: "https://www.google.com/search?q=Tailwind" },
      { name: "React", href: "https://www.google.com/search?q=React" },
    ],
  },
  {
    slug: "ovni",
    title: "OVNI",
    description: "App for retailers and influencers to register and form partnerships for selling products through social media.",
    longDescription: [
      "OVNI is an application that connects retailers and influencers so they can form partnerships and sell products through social media.",
      "Retailers register their products and campaigns, defining targets and conditions; influencers discover opportunities, apply, and manage their partnerships in one place.",
      "The platform streamlines the entire workflow: from discovery and application to approval, tracking of results, and commission management, reducing friction in social commerce.",
    ],
    screenshot: "/static/images/ovni.png",
    github: undefined,
    website: "http://app.ovni.com.br/",
    status: "live",
    stack: [
      { name: "Next.js", href: "https://www.google.com/search?q=Next.js" },
      { name: "Tailwind", href: "https://www.google.com/search?q=Tailwind" },
      { name: "React", href: "https://www.google.com/search?q=React" },
    ],
  },
  {
    slug: "sttp",
    title: "sttp",
    description: "Personal project development of a dynamic initial page for fast research.",
    longDescription: [
      "sttp is a personal project: a dynamic start page designed for quick research and navigation from the browser.",
      "The interface prioritizes performance and a clean user experience, with fast access to search and frequently used links.",
      "Built as a lightweight alternative to default browser homepages, it stays minimal and fast while remaining highly usable day to day.",
    ],
    screenshot: "/static/images/sttp.png",
    github: undefined,
    website: "https://mohvn.github.io/sttp/",
    status: "live",
    stack: [
      { name: "Next.js", href: "https://www.google.com/search?q=Next.js" },
      { name: "Tailwind", href: "https://www.google.com/search?q=Tailwind" },
    ],
  },
  {
    slug: "caddie",
    title: "Caddie Consultoria e Estratégia",
    description: "Landing page for Caddie consulting and strategy services.",
    longDescription: [
      "Landing page for Caddie Consultoria e Estratégia, presenting the company's consulting and strategy services to potential clients.",
      "The site was built to clearly communicate Caddie's value proposition, showcase expertise, and capture leads through structured contact points.",
      "Design and content are focused on conversion and trust, with a responsive layout suited to both desktop and mobile visitors.",
    ],
    screenshot: "/static/images/caddie.png",
    github: undefined,
    website: "https://www.caddieestrategia.com.br/",
    status: "live",
    stack: [
      { name: "Next.js", href: "https://www.google.com/search?q=Next.js" },
      { name: "Tailwind", href: "https://www.google.com/search?q=Tailwind" },
    ],
  },
  {
    slug: "another-project",
    title: "Abelha System",
    description: "System developed for updating and optimizing real estate tables.",
    longDescription: [
      "Sistema Abelha is a web application developed for updating and optimizing real estate listing tables used by real estate professionals.",
      "It enables efficient management of property data: bulk updates, consistency checks, and export/import aligned with common market tools.",
      "The system reduces manual work and errors in table maintenance, helping teams keep their listings up to date and well structured.",
    ],
    screenshot: "/static/images/sistemaabelha.png",
    github: undefined,
    website: "https://www.sistema-abelha.com.br/",
    status: "live",
    stack: [
      { name: "React", href: "https://www.google.com/search?q=React" },
      { name: "Next.js", href: "https://www.google.com/search?q=Next.js" },
    ],
  },
  {
    slug: "gestao-lojao-do-bras",
    title: "Lojão do Brás System",
    description: "Backend system for managing employee meal benefits.",
    longDescription: [
      "Backend system developed in PHP for Lojão do Brás, focused on managing employee meal benefits (vale-refeição) in a centralized way.",
      "HR can control eligibility, distribute vouchers by period and employee, and track usage and balances, with reports to support payroll and compliance.",
      "The solution automates what would otherwise be spread across spreadsheets or legacy tools, reducing administrative load and improving accuracy.",
    ],
    screenshot: "/static/images/lojaodobras.png",
    github: undefined,
    website: undefined,
    status: "private",
    stack: [
      { name: "PHP", href: "https://www.google.com/search?q=PHP" },
    ],
  },
  {
    slug: "project-name",
    title: "sttp",
    description: "Personal project development of a dynamic initial page for fast research.",
    longDescription: [
      "Personal project: a dynamic start page for quick research and navigation from the browser.",
      "The interface prioritizes performance and a clean user experience, with fast access to search and frequently used links.",
      "Built as a lightweight alternative to default browser homepages, it stays minimal and fast while remaining highly usable day to day.",
    ],
    screenshot: "/static/images/sttp.png",
    github: undefined,
    website: "https://mohvn.github.io/sttp/",
    status: "live",
    stack: [
      { name: "Next.js", href: "https://www.google.com/search?q=Next.js" },
      { name: "Tailwind", href: "https://www.google.com/search?q=Tailwind" },
    ],
  },
  {
    slug: "sds-wiki",
    title: "SDS Wiki",
    description: "Technical documentation platform about Software Defined Storage (SDS), built with Astro. Fast search and minimalist interface; content managed via Markdown.",
    longDescription: [
      "Freelance project: a technical documentation platform about Software Defined Storage (SDS), developed with Astro for speed and simplicity.",
      "The site offers fast full-text search and a minimalist, readable interface aimed at developers and infrastructure teams who need to understand SDS concepts and practices.",
      "Content is authored and maintained in Markdown, making it easy to update and version alongside code; the build step generates a static, cache-friendly site.",
    ],
    screenshot: "/static/images/sds.png",
    github: undefined,
    website: undefined,
    status: "live",
    stack: [
      { name: "Astro", href: "https://astro.build" },
      { name: "Tailwind", href: "https://tailwindcss.com" },
    ],
  },


];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
