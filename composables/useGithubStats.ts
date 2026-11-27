import {
  TRACKED_GITHUB_REPOS,
  createFallbackStatsMap,
  extractGithubRepoSlug,
  type GithubStatsMap,
  type RepoStats,
} from "~/server/utils/githubStats";

export interface FormattedRepoStats extends RepoStats {
  slug: string;
  url: string;
  starsFormatted: string;
  forksFormatted: string;
  isNotable: boolean;
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
      const data = await $fetch<GithubStatsMap>("/api/github-stats");
      if (data && typeof data === "object") {
        const merged = { ...statsMap.value };
        for (const [slug, repo] of Object.entries(data)) {
          if (repo && typeof repo.stars === "number" && repo.stars > 0) {
            merged[slug.toLowerCase()] = repo;
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
    if (!entry) return null;
    const apiPath = TRACKED_GITHUB_REPOS[slug]?.apiPath ?? slug;
    return {
      ...entry,
      slug,
      url: `https://github.com/${apiPath}`,
      starsFormatted: entry.stars.toLocaleString("en-US"),
      forksFormatted: entry.forks.toLocaleString("en-US"),
      isNotable: entry.stars >= 500,
    };
  };

  return {
    statsMap,
    statsForRepo,
  };
}
