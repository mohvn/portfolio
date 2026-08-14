import type { LocaleCopy } from "../types";

export const ptBR: LocaleCopy = {
  meta: {
    title: "mohan elias",
    description: "o site pessoal de mohan elias.",
  },
  ui: {
    darkMode: "modo escuro",
    toggleDarkMode: "alternar modo escuro",
    localeSwitch: "idioma",
    present: "atual",
    remote: "remoto",
    viewProject: "abrir",
    projectStatus: {
      live: "no ar",
      building: "em construção",
      private: "privado",
    },
    sections: {
      work: {
        title: "onde eu estive",
        lead: "de sites freelance e automações rpa até interfaces de produto na empreender, ainda entregando coisas que pessoas de verdade usam.",
      },
      built: {
        title: "coisas que eu construí",
        lead: "produtos, páginas e side projects que saíram do editor e foram pro mundo. uns barulhentos, outros quietos.",
      },
    },
    footer: {
      note: "se você chegou até aqui, pode mandar um oi. eu respondo email, e geralmente estou entre um refactor e um café.",
      github: "github",
      linkedin: "linkedin",
      email: "email",
      copyright: "© {year} mohan elias",
    },
  },
  copy: {
    role: "desenvolvedor frontend",
    location: "são paulo, brasil",
    greeting: "oi, eu sou o mohan",
    tagline: "eu faço interfaces sem cara de ia",
    paragraphs: [
      "desenvolvedor frontend de são paulo. desde os primórdios da internet eu sou curioso em como as coisas digitais eram feitas. essa curiosidade virou trabalho entregando produtos que as pessoas usam todo dia.",
      "hoje eu trabalho na [[empreender]] em produtos de ecommerce pra lojistas no brasil, principalmente com react, next.js, typescript e tailwind. me importo com **código limpo**, ux cuidadosa e ferramentas que não brigam com o problema.",
      "eu rendo mais quando o trabalho é concreto: pegar uma ideia bagunçada, deixar clara, rápida, e mais fácil de mudar do que eu encontrei. a stack costuma ser só o ponto de partida.",
      "se você olhar com atenção, vai perceber que boa parte do que eu faço é decidir **o que não adicionar**.",
    ],
    closing: [
      "esse site guarda trabalho, experimentos e algumas coisas que não cabem direito num currículo. nem tudo precisa caber.",
      "enfim, espero que você goste :)",
    ],
    projects: {
      py013: {
        title: "py013",
        description:
          "landing page da comunidade python da baixada santista.",
      },
      rastreio: {
        title: "rastreio.net",
        description: "gestão de rastreio pra times de ecommerce.",
      },
      "area-do-cliente": {
        title: "área do cliente",
        description: "área do cliente customizável pra lojas de ecommerce.",
      },
      ovni: {
        title: "ovni",
        description:
          "parcerias entre varejistas e influenciadores, num app só.",
      },
      sttp: {
        title: "sttp",
        description: "start page dinâmica pra pesquisa rápida.",
      },
      caddie: {
        title: "caddie",
        description: "landing page de consultoria e estratégia.",
      },
      abelha: {
        title: "sistema abelha",
        description: "tabelas e dados imobiliários, sem a bagunça.",
      },
      sds: {
        title: "sds wiki",
        description: "docs técnicas sobre sds, com busca rápida.",
      },
      "lojao-do-bras": {
        title: "lojão do brás",
        description: "backend em php pra gestão de vale-refeição.",
      },
    },
    experience: {
      empreender: {
        location: "são paulo, brasil",
        positions: {
          frontend: {
            role: "desenvolvedor frontend",
            type: "tempo integral",
            summary:
              "interfaces de produto com react, next.js e tailwind. responsivas, performáticas e perto do time de design.",
          },
        },
      },
      botslab: {
        location: "são paulo, brasil",
        positions: {
          "rpa-python": {
            role: "desenvolvedor rpa python",
            type: "tempo integral",
            summary:
              "automações de compras no nimbi e mercado eletrônico com python, selenium e robot framework. menos trabalho manual, menos madrugada quebrada.",
          },
        },
      },
      freelancer: {
        location: "brasil",
        positions: {
          "full-stack": {
            role: "desenvolvedor full stack",
            type: "freelance",
            summary:
              "sites e apps ponta a ponta, sobretudo next.js e astro, às vezes wordpress, sempre de olho em performance e seo.",
          },
        },
      },
    },
  },
};
