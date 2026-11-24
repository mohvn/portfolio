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
    reach: {
      before: string;
      sep: string;
      and: string;
      after: string;
    };
    footer: {
      note: string;
      github: string;
      linkedin: string;
      email: string;
      copyright: string;
    };
    chess: {
      title: string;
      you: string;
      computer: string;
      yourTurn: string;
      thinking: string;
      check: string;
      checkmateWin: string;
      checkmateLose: string;
      stalemate: string;
      draw: string;
      newGame: string;
      hint: string;
      openLabel: string;
      close: string;
      resultWin: string;
      resultLose: string;
      resultDraw: string;
      noMoves: string;
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
