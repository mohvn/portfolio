import axios from "axios";
import { Button } from "@/components/ui/button";
import { MdiGithub } from "@/components/icons/github";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const GITHUB_URL = "https://github.com/mohvn";
const GITHUB_USER = "mohvn";

function formatStars(count: number): string {
  if (count >= 1000) {
    const value = count / 1000;
    return `${value % 1 === 0 ? value.toFixed(0) : value.toFixed(1)}k`;
  }
  return String(count);
}

async function getGitHubStars(): Promise<number | null> {
  try {
    const { data } = await axios.get<
      Array<{ stargazers_count: number }>
    >(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100`, {
      headers: { Accept: "application/vnd.github+json" },
    });
    return data.reduce((total, repo) => total + repo.stargazers_count, 0);
  } catch {
    return null;
  }
}

export async function GitHubLink() {
  const stars = await getGitHubStars();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 border-none px-1.5"
          render={
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
            />
          }
        >
          <MdiGithub className="size-4" aria-hidden />
          {stars !== null && (
            <span className="text-[0.8125rem]/none text-muted-foreground tabular-nums">
              {formatStars(stars)}
            </span>
          )}
          <span className="sr-only">GitHub stars</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>View on GitHub</TooltipContent>
    </Tooltip>
  );
}
