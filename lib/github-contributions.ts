import axios from "axios";

export type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type GithubContributions = {
  total: number;
  contributions: ContributionDay[];
};

type ApiResponse = {
  total?: { lastYear?: number };
  contributions?: Array<{ date: string; count: number; level: number }>;
};

export async function getGithubContributions(
  username: string,
): Promise<GithubContributions> {
  try {
    const { data } = await axios.get<ApiResponse>(
      `https://github-contributions-api.jogruber.de/v4/${username}`,
      {
        params: { y: "last" },
        timeout: 8000,
      },
    );

    const contributions: ContributionDay[] = (data.contributions ?? []).map(
      (day) => ({
        date: day.date,
        count: day.count,
        level: Math.min(4, Math.max(0, day.level)) as ContributionDay["level"],
      }),
    );

    return {
      total: data.total?.lastYear ?? 0,
      contributions,
    };
  } catch {
    return { total: 0, contributions: [] };
  }
}
