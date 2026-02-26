export const en = {
  meta: {
    title: "Mohan Elias",
    description: "Hey! I'm Mohan Elias, and this is my portfolio website.",
  },
  hero: {
    name: "Mohan Elias",
    roles: ["Freelancer", "Frontend Developer", "RPA Developer"],
  },
  bio: {
    paragraph1:
      "Hello! I'm Mohan, a software developer passionate about turning ideas into simple, beautiful, and functional digital solutions. I focus on delivering projects where usability and user experience come first, always striving for clean and efficient code.",
    paragraph2:
      "I have experience with a variety of modern technologies and frameworks—I believe every project deserves the right tools. I'm always looking for new challenges and opportunities to learn and grow alongside the industry.",
    socialsLabel: "Here are my",
    socialsBold: "socials",
  },
  sections: {
    experiences: "Experiences",
    projects: "Projects",
    skills: "Skills and Technologies",
  },
  experiences: {
    empreender: {
      company: "Empreender | Soluções para ecommerce",
      role: "Frontend Developer",
      period: "Dec, 2024 - Present",
      location: "São Paulo, Brazil - Remote",
      descriptions: [
        "Developed and maintained the company's apps using React, Next.js, and Tailwind CSS.",
        "Implemented responsive design and cross-browser compatibility.",
        "Collaborated with the design team to implement new features and improve the user experience.",
        "Optimized the apps for SEO and performance.",
      ],
      technologies: ["React", "Next.js", "Tailwind CSS", "SEO", "Performance"],
    },
    botslab: {
      company: "Botslab",
      role: "Python RPA Developer",
      period: "Dec, 2024 - Feb, 2026",
      location: "São Paulo, Brazil - Remote",
      descriptions: [
        "Automated third-party systems (McCain, SMSGroup) in Nimbi and Mercado Eletrônico platforms using RPA.",
        "Developed and maintained automation solutions for purchasing systems to streamline operations.",
        "Created RPA bots using Python, Selenium, and other automation tools to reduce manual work and improve efficiency.",
      ],
      technologies: ["Python", "Selenium", "Robot Framework"],
    },
    freelancer: {
      company: "Freelancer",
      role: "Full Stack Developer",
      period: "Jan, 2022 - Present",
      location: "Brazil - Remote",
      descriptions: [
        "Developed and maintained freelance projects using Next.js, Astro, and modern web technologies.",
        "Built custom websites and web applications with focus on Next.js, though also worked with WordPress when needed.",
        "Implemented responsive designs and optimized projects for performance and SEO.",
        "Delivered end-to-end solutions from design to deployment for various clients.",
      ],
      technologies: ["Next.js", "Astro", "React", "WordPress", "Tailwind CSS"],
    },
  },
  projects: {
    ovni: {
      title: "OVNI",
      description:
        "App for retailers and influencers to register and form partnerships for selling products through social media.",
      longDescription: [
        "OVNI is an application that connects retailers and influencers so they can form partnerships and sell products through social media.",
        "Retailers register their products and campaigns, defining targets and conditions; influencers discover opportunities, apply, and manage their partnerships in one place.",
        "The platform streamlines the entire workflow: from discovery and application to approval, tracking of results, and commission management, reducing friction in social commerce.",
      ],
    },
    sttp: {
      title: "sttp",
      description:
        "Personal project development of a dynamic initial page for fast research.",
      longDescription: [
        "sttp is a personal project: a dynamic start page designed for quick research and navigation from the browser.",
        "The interface prioritizes performance and a clean user experience, with fast access to search and frequently used links.",
        "Built as a lightweight alternative to default browser homepages, it stays minimal and fast while remaining highly usable day to day.",
      ],
    },
    caddie: {
      title: "Caddie Consultoria e Estratégia",
      description: "Landing page for Caddie consulting and strategy services.",
      longDescription: [
        "Landing page for Caddie Consultoria e Estratégia, presenting the company's consulting and strategy services to potential clients.",
        "The site was built to clearly communicate Caddie's value proposition, showcase expertise, and capture leads through structured contact points.",
        "Design and content are focused on conversion and trust, with a responsive layout suited to both desktop and mobile visitors.",
      ],
    },
    "another-project": {
      title: "Abelha System",
      description:
        "System developed for updating and optimizing real estate tables, enabling efficient management of real estate data.",
      longDescription: [
        "Sistema Abelha is a web application developed for updating and optimizing real estate listing tables used by real estate professionals.",
        "It enables efficient management of property data: bulk updates, consistency checks, and export/import aligned with common market tools.",
        "The system reduces manual work and errors in table maintenance, helping teams keep their listings up to date and well structured.",
      ],
    },
    "gestao-lojao-do-bras": {
      title: "Lojão do Brás System",
      description:
        "Backend system developed in PHP for managing employee meal benefits, enabling HR to efficiently control, distribute, and track meal vouchers in an automated manner.",
      longDescription: [
        "Backend system developed in PHP for Lojão do Brás, focused on managing employee meal benefits (vale-refeição) in a centralized way.",
        "HR can control eligibility, distribute vouchers by period and employee, and track usage and balances, with reports to support payroll and compliance.",
        "The solution automates what would otherwise be spread across spreadsheets or legacy tools, reducing administrative load and improving accuracy.",
      ],
    },
    "sds-wiki": {
      title: "SDS Wiki",
      description:
        "Technical documentation platform about Software Defined Storage (SDS), built with Astro. Fast search and minimalist interface; content managed via Markdown.",
      longDescription: [
        "Freelance project: a technical documentation platform about Software Defined Storage (SDS), developed with Astro for speed and simplicity.",
        "The site offers fast full-text search and a minimalist, readable interface aimed at developers and infrastructure teams who need to understand SDS concepts and practices.",
        "Content is authored and maintained in Markdown, making it easy to update and version alongside code; the build step generates a static, cache-friendly site.",
      ],
    },
    rastreio: {
      title: "Rastreio.net",
      description:
        "App for tracking management for ecommerce.",
      longDescription: [
        "Rastreio is an app for tracking management aimed at ecommerce stores and operations.",
        "It centralizes tracking codes, lets you follow delivery status, and organize orders in one place, reducing spreadsheets and multiple carrier tabs.",
        "The project is actively in development, with a focus on integration with marketplaces and carriers and a simple day-to-day experience for operators.",
      ],
    },
  },
  status: {
    building: "Building",
    live: "Live",
    comingSoon: "Coming Soon",
    private: "Private",
  },
  quote: {
    text: "Do so much work that it would be unreasonable for you to not be successful.",
    author: "Alex Hormozi",
  },
} as const;

export type EnTranslations = typeof en;
