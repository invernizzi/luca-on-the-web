import {
  FALLBACK_MAGIKA,
  parseGithubRepoStats,
  type GithubStatsResponse,
} from "../utils/githubStats";

const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours per isolate
let cachedResponse: { data: GithubStatsResponse; expiresAt: number } | null =
  null;

export default defineEventHandler(async (event): Promise<GithubStatsResponse> => {
  setResponseHeader(
    event,
    "Cache-Control",
    "public, max-age=3600, s-maxage=21600, stale-while-revalidate=86400",
  );

  const now = Date.now();
  if (cachedResponse && now < cachedResponse.expiresAt) {
    return cachedResponse.data;
  }

  try {
    const response = await fetch("https://api.github.com/repos/google/magika", {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "lucainvernizzi.net",
      },
      signal: AbortSignal.timeout(4000),
    });

    if (response.ok) {
      const json: unknown = await response.json();
      const parsed = parseGithubRepoStats(json);
      if (parsed) {
        const data: GithubStatsResponse = { magika: parsed };
        cachedResponse = { data, expiresAt: now + CACHE_TTL_MS };
        return data;
      }
    }
  } catch {
    // Gracefully fall back to last known good stats
  }

  return cachedResponse?.data ?? { magika: FALLBACK_MAGIKA };
});
