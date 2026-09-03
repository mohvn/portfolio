import type { LocaleCopy } from "../types";

export const ptBR: LocaleCopy = {
  meta: {
    title: "Mohan Elias – Desenvolvedor frontend",
    description:
      "Mohan. Frontend em São Paulo, na Empreender. Apps que lojista brasileiro utiliza de verdade — e interfaces que não pareçam IA.",
  },
  ui: {
    localeSwitch: "Idioma",
    present: "Agora",
    remote: "Remoto",
    viewProject: "Abrir",
    seeMore: "Ver mais",
    seeLess: "Ver menos",
    bookCall: "Mandar um email",
    messageOn: "Mensagem no",
    lastYear: "no último ano",
    expandJob: "Expandir detalhes de {company}",
    projectStatus: {
      live: "no ar",
      building: "em construção",
      private: "privado",
    },
    sections: {
      performance: "Performance",
      experience: "Experiência",
      skills: "Skills",
      projects: "Projetos",
    },
    skillGroups: {
      language: "Linguagem",
      frontend: "Frontend",
      backend: "Backend",
      infrastructure: "Infraestrutura",
      workflow: "Workflow",
      design: "Design",
    },
    footer: {
      note: "Se você chegou até aqui, pode mandar um oi.",
      github: "GitHub",
      linkedin: "LinkedIn",
      email: "Email",
      copyright: "© {year} Mohan Elias",
    },
  },
  copy: {
    role: "Desenvolvedor frontend",
    location: "São Paulo, Brasil",
    greeting: "Mohan Elias",
    tagline: "Desenvolvedor frontend",
    paragraphs: [
      "Mohan. Frontend em São Paulo, na [[empreender]]. Faço apps que lojista brasileiro utiliza de verdade: rastreio, checkout, avaliações, e ainda pego uns freelances.",
      "Obcecado por interfaces que não pareçam IA. E pra falar a verdade, a maior parte do meu trabalho é decidir **o que não entra** na tela.",
    ],
    closing: [],
    projects: {
      py013: {
        title: "py013",
        description: "Landing page da comunidade Python da Baixada Santista.",
      },
      rastreio: {
        title: "Rastreio.net",
        description: "Gestão de rastreio pra times de ecommerce.",
      },
      "area-do-cliente": {
        title: "Área do Cliente",
        description: "Área do cliente customizável pra lojas de ecommerce.",
      },
      ovni: {
        title: "OVNI",
        description: "Parcerias entre varejistas e influenciadores, num app só.",
      },
      sttp: {
        title: "STTP",
        description: "Start page dinâmica pra pesquisa rápida.",
      },
      caddie: {
        title: "Caddie",
        description: "Landing page de consultoria e estratégia.",
      },
      abelha: {
        title: "Sistema Abelha",
        description: "Tabelas e dados imobiliários, sem a bagunça.",
      },
      sds: {
        title: "SDS Wiki",
        description: "Docs técnicas sobre SDS, com busca rápida.",
      },
      "lojao-do-bras": {
        title: "Lojão do Brás",
        description: "Backend em PHP pra gestão de vale-refeição.",
      },
    },
    experience: {
      empreender: {
        location: "São Paulo, Brasil",
        positions: {
          frontend: {
            role: "Desenvolvedor frontend",
            type: "Tempo integral",
            bullets: [
              "Interfaces de produto com React, Next.js e Tailwind — responsivas, performáticas e perto do time de design.",
              "Apps que lojistas brasileiros realmente abrem: rastreio, checkout, avaliações, na Nuvemshop, Shopify e afins.",
              "Pegar um Figma bagunçado e deixar uma tela que o lojista usa sem tutorial.",
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
            bullets: [
              "Automações de compras no Nimbi e Mercado Eletrônico com Python, Selenium e Robot Framework.",
              "Menos trabalho manual nos fluxos de procurement, menos madrugada quebrada.",
            ],
          },
        },
      },
      freelancer: {
        location: "Brasil",
        positions: {
          "full-stack": {
            role: "Desenvolvedor full-stack",
            type: "Freelance",
            bullets: [
              "Sites e apps ponta a ponta, sobretudo Next.js e Astro, às vezes WordPress.",
              "Sempre de olho em performance, SEO, e se a coisa realmente sai do editor.",
            ],
          },
        },
      },
    },
  },
};
