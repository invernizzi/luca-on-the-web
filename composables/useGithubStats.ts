import {
  TRACKED_GITHUB_REPOS,
  createFallbackStatsMap,
  extractGithubRepoSlug,
  shouldDisplayRepoStats,
  type GithubStatsMap,
  type RepoStats,
} from "~/server/utils/githubStats";

export interface FormattedRepoStats extends RepoStats {
  slug: string;
  url: string;
  starsFormatted: string;
  forksFormatted: string;
}

export function useGithubStats() {
  const statsMap = useState<GithubStatsMap>("github-repo-stats", () =>
    createFallbackStatsMap(),
  );
  const hasFetched = useState<boolean>("github-repo-stats-fetched", () => false);

  onMounted(async () => {
    if (hasFetched.value) return;
    hasFetched.value = true;

    try {
      const response = await fetch("/api/github-stats", {
        headers: { Accept: "application/json" },
      });
      if (!response.ok) return;
      const data: unknown = await response.json();
      if (data && typeof data === "object") {
        const merged: GithubStatsMap = { ...statsMap.value };
        for (const [slug, raw] of Object.entries(data as Record<string, unknown>)) {
          if (
            raw &&
            typeof raw === "object" &&
            typeof (raw as RepoStats).stars === "number" &&
            (raw as RepoStats).stars > 0 &&
            typeof (raw as RepoStats).forks === "number"
          ) {
            const repo = raw as RepoStats;
            merged[slug.toLowerCase()] = {
              stars: repo.stars,
              forks: repo.forks,
              live: Boolean(repo.live),
            };
          }
        }
        statsMap.value = merged;
      }
    } catch {
      // Keep baseline stats silently when running without the API worker or offline
    }
  });

  const statsForRepo = (repoOrUrl?: string | null): FormattedRepoStats | null => {
    const slug = extractGithubRepoSlug(repoOrUrl);
    if (!slug) return null;
    const entry = statsMap.value[slug];
    if (!entry || !shouldDisplayRepoStats(entry)) return null;
    const apiPath = TRACKED_GITHUB_REPOS[slug]?.apiPath ?? slug;
    return {
      ...entry,
      slug,
      url: `https://github.com/${apiPath}`,
      starsFormatted: entry.stars.toLocaleString("en-US"),
      forksFormatted: entry.forks.toLocaleString("en-US"),
    };
  };

  return {
    statsMap,
    statsForRepo,
  };
}
