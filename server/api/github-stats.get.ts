import {
  TRACKED_GITHUB_REPOS,
  createFallbackStatsMap,
  parseGithubRepoStats,
  type GithubStatsMap,
} from "../utils/githubStats";

const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours per isolate
let cachedResponse: { data: GithubStatsMap; expiresAt: number } | null = null;

async function fetchRepo(apiPath: string) {
  const response = await fetch(`https://api.github.com/repos/${apiPath}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "lucainvernizzi.net",
    },
    signal: AbortSignal.timeout(4000),
  });
  if (!response.ok) return null;
  const json: unknown = await response.json();
  return parseGithubRepoStats(json);
}

export default defineEventHandler(async (event): Promise<GithubStatsMap> => {
  setResponseHeader(
    event,
    "Cache-Control",
    "public, max-age=3600, s-maxage=21600, stale-while-revalidate=86400",
  );

  const now = Date.now();
  if (cachedResponse && now < cachedResponse.expiresAt) {
    return cachedResponse.data;
  }

  const base: GithubStatsMap = cachedResponse?.data
    ? { ...cachedResponse.data }
    : createFallbackStatsMap();

  const entries = Object.entries(TRACKED_GITHUB_REPOS);
  const settled = await Promise.allSettled(
    entries.map(async ([key, cfg]) => ({
      key,
      stats: await fetchRepo(cfg.apiPath),
    })),
  );

  let anyLive = false;
  for (const outcome of settled) {
    if (outcome.status === "fulfilled" && outcome.value.stats) {
      base[outcome.value.key] = outcome.value.stats;
      anyLive = true;
    }
  }

  if (anyLive) {
    cachedResponse = { data: base, expiresAt: now + CACHE_TTL_MS };
  }

  return base;
});
