import type { LocaleCopy } from "../types";

export const ptBR: LocaleCopy = {
  meta: {
    title: "Mohan Elias",
    description: "O site pessoal de Mohan Elias.",
  },
  ui: {
    darkMode: "Modo escuro",
    toggleDarkMode: "Alternar modo escuro",
    localeSwitch: "Idioma",
    remote: "Remoto",
    onSite: "Presencial",
    currentlyAt: "ATUALMENTE EM",
    present: "Atual",
    employmentType: "Tipo",
    period: "Período",
    duration: "Duração",
    location: "Localização",
    modality: "Modalidade",
    status: "Status",
    current: "Atual",
    fullTime: "Tempo integral",
    freelance: "Freelance",
    viewProject: "Ver projeto",
    projectStatus: {
      live: "No ar",
      building: "Em construção",
      private: "Privado",
    },
    empreenderLabel: "Empreender",
    github: {
      loading: "Carregando contribuições...",
      error: "Falha ao carregar contribuições",
      noData: "Sem dados disponíveis",
      contributions: "{count} contribuições no último ano",
      contributionOn: "{count} contribuições em {date}",
      less: "Menos",
      more: "Mais",
    },
    months: [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ],
    sections: {
      experiments: {
        title: "Experiments",
        description:
          "Estudos de interface, padrões de componentes e demos técnicos.",
      },
      projects: {
        title: "Projects",
        description:
          "Ferramentas e produtos que estou construindo, mantendo ou explorando.",
      },
      experience: {
        title: "Experience",
        description: "Trajetória profissional e experiências recentes.",
      },
      skills: {
        title: "Skills",
        description: "Tecnologias e ferramentas que uso no dia a dia.",
      },
    },
    skillGroups: {
      frontend: "Frontend",
      backend: "Backend",
      design: "Design",
      workflow: "Workflow",
    },
    footer: {
      headline: "Vamos construir algo útil.",
      availability:
        "Disponível para projetos de product design e engenharia front-end.",
      github: "GitHub",
      linkedin: "LinkedIn",
      email: "Email",
      copyright: "© {year} Mohan Elias.",
    },
  },
  copy: {
    role: "Desenvolvedor Frontend",
    location: "São Paulo, Brasil",
    bio: {
      items: [
        {
          text: "**Desenvolvedor frontend** de São Paulo, com olhar afiado para detalhe e interfaces limpas.",
        },
        {
          text: "Construo aplicações web polidas com **React**, **Next.js**, **TypeScript**, **Tailwind CSS** e **Astro**.",
        },
        {
          text: "**Desenvolvedor Frontend** na **Empreender** — produtos de ecommerce usados por lojistas no Brasil.",
          children: [
            "**React**, **Next.js** e **Tailwind CSS** em produção",
            "Foco em UX, SEO e performance",
          ],
        },
      ],
    },
    experiments: {
      "react-ui": {
        title: "React UI",
        description:
          "Interfaces componentizadas com React, foco em composição e estados previsíveis.",
      },
      "next-apps": {
        title: "Next.js Apps",
        description:
          "Aplicações SSR e SSG com Next.js, performance e SEO otimizados.",
      },
      tailwind: {
        title: "Tailwind Design",
        description:
          "Sistemas visuais rápidos com Tailwind CSS e design tokens consistentes.",
      },
      typescript: {
        title: "TypeScript",
        description:
          "Tipagem estática para código mais seguro e manutenível em produção.",
      },
      "python-rpa": {
        title: "Python RPA",
        description:
          "Automações e bots com Python para fluxos repetitivos e integrações.",
      },
      "astro-docs": {
        title: "Astro Docs",
        description:
          "Sites de documentação minimalistas com Astro e conteúdo em Markdown.",
      },
    },
    projects: {
      py013: {
        title: "Py013",
        description:
          "Landing page da comunidade Python da Baixada Santista.",
      },
      rastreio: {
        title: "Rastreio.net",
        description:
          "Aplicativo para gerenciamento de rastreio para ecommerce.",
      },
      "area-do-cliente": {
        title: "Área do Cliente",
        description:
          "Personaliza a área do cliente na sua loja de ecommerce.",
      },
      ovni: {
        title: "OVNI",
        description:
          "App para varejistas e influenciadores formarem parcerias de venda.",
      },
      sttp: {
        title: "sttp",
        description: "Página inicial dinâmica para pesquisa rápida.",
      },
      caddie: {
        title: "Caddie",
        description:
          "Landing page dos serviços de consultoria e estratégia da Caddie.",
      },
      abelha: {
        title: "Sistema Abelha",
        description:
          "Sistema para gestão eficiente de tabelas e dados imobiliários.",
      },
      sds: {
        title: "SDS Wiki",
        description:
          "Documentação técnica sobre SDS com Astro e busca rápida.",
      },
      "lojao-do-bras": {
        title: "Sistema Lojão do Brás",
        description:
          "Backend em PHP para gestão centralizada de benefícios de alimentação (vale-refeição).",
      },
    },
    experience: {
      empreender: {
        location: "São Paulo, Brasil",
        positions: {
          frontend: {
            role: "Desenvolvedor Frontend",
            type: "Tempo integral",
            highlights: [
              "Desenvolvi e mantive os aplicativos da empresa com React, Next.js e Tailwind CSS.",
              "Implementei design responsivo e compatibilidade entre navegadores.",
              "Colaborei com a equipe de design para implementar novas funcionalidades e melhorar a experiência do usuário.",
              "Otimizei os aplicativos para SEO e performance.",
            ],
          },
        },
      },
      botslab: {
        location: "São Paulo, Brasil",
        positions: {
          "rpa-python": {
            role: "Desenvolvedor RPA Python",
            type: "Tempo integral",
            highlights: [
              "Automatizei sistemas de terceiros (McCain, SMSGroup) nas plataformas Nimbi e Mercado Eletrônico com RPA.",
              "Desenvolvi e mantive soluções de automação para sistemas de compras para agilizar operações.",
              "Criei bots RPA com Python, Selenium e outras ferramentas de automação para reduzir trabalho manual e aumentar a eficiência.",
            ],
          },
        },
      },
      freelancer: {
        location: "Brasil",
        positions: {
          "full-stack": {
            role: "Desenvolvedor Full Stack",
            type: "Freelance",
            highlights: [
              "Desenvolvi e mantive projetos freelance com Next.js, Astro e tecnologias web modernas.",
              "Construí sites e aplicações web sob medida com foco em Next.js, além de WordPress quando necessário.",
              "Implementei designs responsivos e otimizei projetos para performance e SEO.",
              "Entreguei soluções de ponta a ponta, do design ao deploy, para diversos clientes.",
            ],
          },
        },
      },
    },
  },
};
