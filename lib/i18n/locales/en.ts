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
      "frontend developer from são paulo. i've been curious about how digital things are built since the early internet days. that curiosity eventually turned into a job shipping products people touch every day.",
      "these days i work at [[empreender]] on ecommerce products for brazilian merchants, mostly with react, next.js, typescript, and tailwind. i care a lot about **clean code**, careful ux, and picking tools that don't fight the problem.",
      "i'm at my best when the work is concrete: take a rough idea, make it clear, make it fast, and leave it easier to change than how i found it. the stack is usually just the starting point.",
      "if you look closely enough, though, you'll see that a lot of what i do is deciding **what not to add**.",
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
