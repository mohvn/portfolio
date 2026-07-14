export type LocaleCopy = {
  meta: {
    title: string;
    description: string;
  };
  ui: {
    darkMode: string;
    toggleDarkMode: string;
    localeSwitch: string;
    remote: string;
    onSite: string;
    currentlyAt: string;
    present: string;
    employmentType: string;
    period: string;
    duration: string;
    location: string;
    modality: string;
    status: string;
    current: string;
    fullTime: string;
    freelance: string;
    projectStatus: {
      live: string;
      building: string;
      private: string;
    };
    empreenderLabel: string;
    github: {
      loading: string;
      error: string;
      noData: string;
      contributions: string;
      contributionOn: string;
      less: string;
      more: string;
    };
    months: string[];
    sections: {
      experiments: { title: string; description: string };
      projects: { title: string; description: string };
      experience: { title: string; description: string };
      skills: { title: string; description: string };
    };
    skillGroups: {
      frontend: string;
      backend: string;
      design: string;
      workflow: string;
    };
    quote: {
      text: string;
      author: string;
    };
  };
  copy: {
    role: string;
    location: string;
    bio: {
      lead: string;
      paragraphs: string[];
    };
    featured: {
      label: string;
      href: string;
    };
    experiments: Record<string, { title: string; description: string }>;
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
            highlights: string[];
          }
        >;
      }
    >;
  };
};
