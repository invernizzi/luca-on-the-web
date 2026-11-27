import {
  TRACKED_GITHUB_REPOS,
  buildGithubApiHeaders,
  createFallbackStatsMap,
  parseGithubRepoStats,
  shouldRetryUnauthenticated,
  type GithubStatsMap,
} from "../utils/githubStats";

const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours per isolate when all repos are live
const PARTIAL_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes when some repos fell back
let cachedResponse: { data: GithubStatsMap; expiresAt: number; allLive: boolean } | null = null;

async function fetchRepo(
  apiPath: string,
  authHeaders: Record<string, string>,
  unauthHeaders: Record<string, string>,
) {
  const url = `https://api.github.com/repos/${apiPath}`;
  let response = await fetch(url, {
    headers: authHeaders,
    signal: AbortSignal.timeout(4000),
  });

  if (shouldRetryUnauthenticated(response.status, Boolean(authHeaders.Authorization))) {
    await response.body?.cancel().catch(() => {});
    response = await fetch(url, {
      headers: unauthHeaders,
      signal: AbortSignal.timeout(4000),
    });
  }

  if (!response.ok) {
    await response.body?.cancel().catch(() => {});
    return null;
  }
  const json: unknown = await response.json();
  return parseGithubRepoStats(json);
}

export default defineEventHandler(async (event): Promise<GithubStatsMap> => {
  const now = Date.now();
  if (cachedResponse && now < cachedResponse.expiresAt) {
    setResponseHeader(
      event,
      "Cache-Control",
      cachedResponse.allLive
        ? "public, max-age=3600, s-maxage=21600, stale-while-revalidate=86400"
        : "public, max-age=300, s-maxage=300, stale-while-revalidate=3600",
    );
    return cachedResponse.data;
  }

  const cfEnv = (
    event.context as { cloudflare?: { env?: Record<string, unknown> } }
  ).cloudflare?.env;
  const rawToken = cfEnv?.GITHUB_TOKEN ?? process.env.GITHUB_TOKEN;
  const token =
    typeof rawToken === "string" && rawToken.trim()
      ? rawToken.trim()
      : undefined;
  const authHeaders = buildGithubApiHeaders(token);
  const unauthHeaders = buildGithubApiHeaders();

  const base: GithubStatsMap = cachedResponse?.data
    ? { ...cachedResponse.data }
    : createFallbackStatsMap();

  const entries = Object.entries(TRACKED_GITHUB_REPOS);
  const settled = await Promise.allSettled(
    entries.map(async ([key, cfg]) => ({
      key,
      stats: await fetchRepo(cfg.apiPath, authHeaders, unauthHeaders),
    })),
  );

  let liveCount = 0;
  for (const outcome of settled) {
    if (outcome.status === "fulfilled" && outcome.value.stats) {
      base[outcome.value.key] = outcome.value.stats;
      liveCount += 1;
    }
  }

  const allLive = liveCount === entries.length;
  if (liveCount > 0) {
    cachedResponse = {
      data: base,
      expiresAt: now + (allLive ? CACHE_TTL_MS : PARTIAL_CACHE_TTL_MS),
      allLive,
    };
  }

  setResponseHeader(
    event,
    "Cache-Control",
    allLive
      ? "public, max-age=3600, s-maxage=21600, stale-while-revalidate=86400"
      : "public, max-age=300, s-maxage=300, stale-while-revalidate=3600",
  );

  return base;
});
