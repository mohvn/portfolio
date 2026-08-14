export type LocaleCopy = {
  meta: {
    title: string;
    description: string;
  };
  ui: {
    darkMode: string;
    toggleDarkMode: string;
    localeSwitch: string;
    present: string;
    remote: string;
    viewProject: string;
    projectStatus: {
      live: string;
      building: string;
      private: string;
    };
    sections: {
      work: { title: string; lead: string };
      built: { title: string; lead: string };
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
            summary: string;
          }
        >;
      }
    >;
  };
};
