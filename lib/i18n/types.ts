export type LocaleCopy = {
  meta: {
    title: string;
    description: string;
  };
  ui: {
    localeSwitch: string;
    present: string;
    remote: string;
    viewProject: string;
    seeMore: string;
    seeLess: string;
    bookCall: string;
    messageOn: string;
    lastYear: string;
    expandJob: string;
    projectStatus: {
      live: string;
      building: string;
      private: string;
    };
    sections: {
      performance: string;
      experience: string;
      skills: string;
      projects: string;
    };
    skillGroups: {
      language: string;
      frontend: string;
      backend: string;
      infrastructure: string;
      workflow: string;
      design: string;
    };
    footer: {
      note: string;
      github: string;
      linkedin: string;
      email: string;
      copyright: string;
    };
  };
  copy: {
    role: string;
    location: string;
    greeting: string;
    tagline: string;
    paragraphs: string[];
    closing: string[];
    projects: Record<string, { title: string; description: string }>;
    experience: Record<
      string,
      {
        location: string;
        positions: Record<
          string,
          {
            role: string;
            type: string;
            bullets: string[];
          }
        >;
      }
    >;
  };
};
