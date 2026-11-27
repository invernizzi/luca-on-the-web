import {
  FALLBACK_MAGIKA,
  type GithubStatsResponse,
  type RepoStats,
} from "~/server/utils/githubStats";

export function useMagikaStats() {
  const stats = useState<RepoStats>("magika-github-stats", () => ({
    ...FALLBACK_MAGIKA,
  }));
  const hasFetched = useState<boolean>("magika-github-stats-fetched", () => false);

  onMounted(async () => {
    if (hasFetched.value) return;
    hasFetched.value = true;

    try {
      const data = await $fetch<GithubStatsResponse>("/api/github-stats");
      if (data?.magika && typeof data.magika.stars === "number" && data.magika.stars > 0) {
        stats.value = data.magika;
      }
    } catch {
      // Keep baseline stats silently when running without the API worker or offline
    }
  });

  const starsFormatted = computed(() =>
    stats.value.stars.toLocaleString("en-US"),
  );

  const forksFormatted = computed(() =>
    stats.value.forks.toLocaleString("en-US"),
  );

  return {
    stats,
    starsFormatted,
    forksFormatted,
  };
}
