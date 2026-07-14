import type { LocaleCopy } from "../types";

export const en: LocaleCopy = {
  meta: {
    title: "Mohan Elias",
    description: "The personal website of Mohan Elias.",
  },
  ui: {
    darkMode: "Dark Mode",
    toggleDarkMode: "Toggle dark mode",
    localeSwitch: "Language",
    remote: "Remote",
    onSite: "On-site",
    currentlyAt: "CURRENTLY AT",
    present: "Present",
    employmentType: "Employment type",
    period: "Period",
    duration: "Duration",
    location: "Location",
    modality: "Modality",
    status: "Status",
    current: "Current",
    fullTime: "Full-time",
    freelance: "Freelance",
    projectStatus: {
      live: "Live",
      building: "Building",
      private: "Private",
    },
    empreenderLabel: "Empreender",
    github: {
      loading: "Loading contributions...",
      error: "Failed to load contributions",
      noData: "No data available",
      contributions: "{count} contributions in the last year",
      contributionOn: "{count} contributions on {date}",
      less: "Less",
      more: "More",
    },
    months: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    sections: {
      experiments: {
        title: "experiments",
        description:
          "Interface studies, component patterns, and technical demos.",
      },
      projects: {
        title: "projects",
        description:
          "Tools and products I'm building, maintaining, or exploring.",
      },
      experience: {
        title: "experience",
        description: "Professional journey and recent work.",
      },
      skills: {
        title: "skills",
        description: "Technologies and tools I use day to day.",
      },
    },
    skillGroups: {
      frontend: "Frontend",
      backend: "Backend",
      design: "Design",
      workflow: "Workflow",
    },
    quote: {
      text: "Work so hard that it would be irrational for you not to succeed.",
      author: "Alex Hormozi",
    },
  },
  copy: {
    role: "Frontend Developer",
    location: "São Paulo, Brazil",
    bio: {
      lead:
        "Hey, I'm Mohan, a frontend developer from São Paulo who's been fascinated by how digital things are built since the early internet days. That curiosity eventually turned into a career building interfaces and web applications. Today I develop products at Empreender and take ideas all the way to production code.",
      paragraphs: [
        "I also collaborate with startups and independent teams as a freelancer across frontend and full-stack work. I care a lot about clean code, thoughtful UX, and choosing the right tools for each project.",
      ],
    },
    featured: {
      label: "CURRENTLY AT",
      href: "#experiencia",
    },
    experiments: {
      "react-ui": {
        title: "React UI",
        description:
          "Componentized interfaces with React, focused on composition and predictable state.",
      },
      "next-apps": {
        title: "Next.js Apps",
        description:
          "SSR and SSG applications with Next.js, optimized for performance and SEO.",
      },
      tailwind: {
        title: "Tailwind Design",
        description:
          "Fast visual systems with Tailwind CSS and consistent design tokens.",
      },
      typescript: {
        title: "TypeScript",
        description:
          "Static typing for safer, more maintainable production code.",
      },
      "python-rpa": {
        title: "Python RPA",
        description:
          "Automations and bots with Python for repetitive flows and integrations.",
      },
      "astro-docs": {
        title: "Astro Docs",
        description:
          "Minimal documentation sites with Astro and Markdown content.",
      },
    },
    projects: {
      py013: {
        title: "Py013",
        description:
          "Landing page for the Python community of Baixada Santista.",
      },
      rastreio: {
        title: "Rastreio.net",
        description: "Ecommerce shipment tracking management app.",
      },
      "area-do-cliente": {
        title: "Área do Cliente",
        description:
          "Customizes the customer area in your ecommerce store.",
      },
      ovni: {
        title: "OVNI",
        description:
          "App for retailers and influencers to form sales partnerships.",
      },
      sttp: {
        title: "sttp",
        description: "Dynamic start page for quick search.",
      },
      caddie: {
        title: "Caddie",
        description:
          "Landing page for Caddie's consulting and strategy services.",
      },
      abelha: {
        title: "Sistema Abelha",
        description:
          "System for efficient management of real estate tables and data.",
      },
      sds: {
        title: "SDS Wiki",
        description:
          "Technical documentation about SDS with Astro and fast search.",
      },
      "lojao-do-bras": {
        title: "Sistema Lojão do Brás",
        description:
          "PHP backend for centralized meal-benefit (vale-refeição) management.",
      },
    },
    experience: {
      empreender: {
        location: "São Paulo, Brazil",
        positions: {
          frontend: {
            role: "Frontend Developer",
            type: "Full-time",
            highlights: [
              "Developed and maintained the company's apps using React, Next.js, and Tailwind CSS.",
              "Implemented responsive design and cross-browser compatibility.",
              "Collaborated with the design team to implement new features and improve the user experience.",
              "Optimized the apps for SEO and performance.",
            ],
          },
        },
      },
      botslab: {
        location: "São Paulo, Brazil",
        positions: {
          "rpa-python": {
            role: "Python RPA Developer",
            type: "Full-time",
            highlights: [
              "Automated third-party systems (McCain, SMSGroup) on Nimbi and Mercado Eletrônico platforms using RPA.",
              "Developed and maintained automation solutions for purchasing systems to streamline operations.",
              "Created RPA bots with Python, Selenium, and other automation tools to reduce manual work and improve efficiency.",
            ],
          },
        },
      },
      freelancer: {
        location: "Brazil",
        positions: {
          "full-stack": {
            role: "Full Stack Developer",
            type: "Freelance",
            highlights: [
              "Developed and maintained freelance projects using Next.js, Astro, and modern web technologies.",
              "Built custom websites and web applications with a focus on Next.js, plus WordPress when needed.",
              "Implemented responsive designs and optimized projects for performance and SEO.",
              "Delivered end-to-end solutions from design to deployment for various clients.",
            ],
          },
        },
      },
    },
  },
};
