export interface RepoStats {
  stars: number;
  forks: number;
  live: boolean;
}

export interface GithubStatsResponse {
  magika: RepoStats;
}

export const FALLBACK_MAGIKA: RepoStats = {
  stars: 18871,
  forks: 1189,
  live: false,
};

export function parseGithubRepoStats(payload: unknown): RepoStats | null {
  if (!payload || typeof payload !== "object") return null;
  const record = payload as Record<string, unknown>;
  const stars = record.stargazers_count;
  const forks = record.forks_count;

  if (
    typeof stars !== "number" ||
    !Number.isFinite(stars) ||
    stars < 1000 ||
    typeof forks !== "number" ||
    !Number.isFinite(forks) ||
    forks < 0
  ) {
    return null;
  }

  return {
    stars: Math.floor(stars),
    forks: Math.floor(forks),
    live: true,
  };
}
