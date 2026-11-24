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
    reach: {
      before: "Me encontra no",
      sep: ", ",
      and: " e",
      after: ".",
    },
    footer: {
      note: "Se você chegou até aqui, pode mandar um oi.",
      github: "GitHub",
      linkedin: "LinkedIn",
      email: "Email",
      copyright: "© {year} Mohan Elias",
    },
    chess: {
      title: "Xadrez",
      you: "Você",
      computer: "Computador",
      yourTurn: "Sua vez",
      thinking: "Pensando…",
      check: "Xeque!",
      checkmateWin: "Xeque-mate",
      checkmateLose: "Xeque-mate",
      stalemate: "Afogamento",
      draw: "Partida empatada",
      newGame: "Nova partida",
      hint: "Você joga de brancas contra o computador.",
      openLabel: "Abrir xadrez",
      close: "Fechar",
      resultWin: "Você venceu",
      resultLose: "Computador venceu",
      resultDraw: "Empate",
      noMoves: "Nenhum lance registrado.",
    },
  },
  copy: {
    role: "Desenvolvedor frontend",
    location: "São Paulo, Brasil",
    greeting: "Mohan Elias",
    tagline: "Desenvolvedor frontend",
    paragraphs: [
      "Eu crio aplicações em {{typescript}} na [[empreender]]. Nela eu faço ferramentas que a maioria dos lojistas brasileiros utiliza, desde o rastreio, checkout, área do cliente, e alguns freelances.",
      "Curiosidade é a chave. {{chess}}",
    ],
    closing: [],
    projects: {
      py013: {
        title: "py013",
        description: "Landing page da comunidade Python da Baixada Santista.",
      },
      rastreio: {
        title: "Rastreio.net",
        description: "Gestão de Rastreio para Lojas de Ecommerce",
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
