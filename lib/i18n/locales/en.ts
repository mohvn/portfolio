import type { LocaleCopy } from "../types";

export const en: LocaleCopy = {
  meta: {
    title: "mohan elias",
    description: "the personal website of mohan elias.",
  },
  ui: {
    darkMode: "dark mode",
    toggleDarkMode: "toggle dark mode",
    localeSwitch: "language",
    present: "present",
    remote: "remote",
    viewProject: "open",
    projectStatus: {
      live: "live",
      building: "building",
      private: "private",
    },
    sections: {
      work: {
        title: "where i've been",
        lead: "from freelance sites and rpa automations to product interfaces at empreender, still shipping things people actually use.",
      },
      built: {
        title: "things i built",
        lead: "products, pages, and side projects that made it out of my editor and into the world. some loud, some quiet.",
      },
    },
    footer: {
      note: "if you made it this far, you might as well say hi. i answer email, and i'm usually somewhere between a refactor and a coffee.",
      github: "github",
      linkedin: "linkedin",
      email: "email",
      copyright: "© {year} mohan elias",
    },
  },
  copy: {
    role: "frontend developer",
    location: "são paulo, brazil",
    greeting: "hi, i'm mohan elias",
    tagline: "i make interfaces that don't look like ai",
    paragraphs: [
      "i'm based in são paulo and i live off frontend. i started by poking other people's sites to see how they were built, then became the person you call for a landing page, a customer area, or a useful hack under deadline.",
      "these days i'm at [[empreender]] on apps brazilian shop owners actually open: tracking, checkout, reviews, the kind of stuff that runs on nuvemshop, shopify, and friends. day-to-day stack: react, next.js, typescript, tailwind.",
      "what keeps me at the keyboard is the annoying stuff: layouts that die on a client's phone, forms nobody understands, screens that load too much. i like taking a messy figma and leaving something a merchant can use without a tutorial.",
      "when there's time left, i still do freelance and small side projects. and yeah, a lot of the job is deciding **what not to put** on the screen.",
    ],
    closing: [
      "this site holds work, experiments, and a few things that don't entirely belong in a résumé. not everything needs to.",
      "anyway, i hope you enjoy :)",
    ],
    projects: {
      py013: {
        title: "py013",
        description:
          "landing page for the python community of baixada santista.",
      },
      rastreio: {
        title: "rastreio.net",
        description: "shipment tracking management for ecommerce teams.",
      },
      "area-do-cliente": {
        title: "área do cliente",
        description: "customizable customer area for ecommerce stores.",
      },
      ovni: {
        title: "ovni",
        description:
          "partnerships between retailers and influencers, in one app.",
      },
      sttp: {
        title: "sttp",
        description: "a dynamic start page for quick search.",
      },
      caddie: {
        title: "caddie",
        description: "landing page for consulting and strategy services.",
      },
      abelha: {
        title: "sistema abelha",
        description: "real-estate tables and data, managed without the mess.",
      },
      sds: {
        title: "sds wiki",
        description: "technical docs about sds, with fast search.",
      },
      "lojao-do-bras": {
        title: "lojão do brás",
        description: "php backend for centralized meal-benefit management.",
      },
    },
    experience: {
      empreender: {
        location: "são paulo, brazil",
        positions: {
          frontend: {
            role: "frontend developer",
            type: "full-time",
            summary:
              "shipping and maintaining product interfaces with react, next.js, and tailwind. responsive, performant, and close to the design team.",
          },
        },
      },
      botslab: {
        location: "são paulo, brazil",
        positions: {
          "rpa-python": {
            role: "python rpa developer",
            type: "full-time",
            summary:
              "automated purchasing workflows on nimbi and mercado eletrônico with python, selenium, and robot framework. less manual work, fewer broken nights.",
          },
        },
      },
      freelancer: {
        location: "brazil",
        positions: {
          "full-stack": {
            role: "full stack developer",
            type: "freelance",
            summary:
              "end-to-end sites and apps for clients, mostly next.js and astro, sometimes wordpress, always with an eye on performance and seo.",
          },
        },
      },
    },
  },
};
