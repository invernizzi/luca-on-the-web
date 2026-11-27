export interface RepoStats {
  stars: number;
  forks: number;
  live: boolean;
}

export type GithubStatsMap = Record<string, RepoStats>;

/**
 * Canonical allowlist of GitHub repositories shown across Projects,
 * Publications (Open Source), and CV. Keys are lowercase `owner/repo`.
 */
export const TRACKED_GITHUB_REPOS: Record<string, { apiPath: string; fallback: RepoStats }> = {
  "google/magika": {
    apiPath: "google/magika",
    fallback: { stars: 18871, forks: 1189, live: false },
  },
  "google/opensk": {
    apiPath: "google/OpenSK",
    fallback: { stars: 3495, forks: 359, live: false },
  },
  "keras-team/keras-tuner": {
    apiPath: "keras-team/keras-tuner",
    fallback: { stars: 2924, forks: 405, live: false },
  },
  "getting-things-gnome/gtg": {
    apiPath: "getting-things-gnome/gtg",
    fallback: { stars: 606, forks: 177, live: false },
  },
  "google/scaaml": {
    apiPath: "google/scaaml",
    fallback: { stars: 210, forks: 64, live: false },
  },
  "google/wasefire": {
    apiPath: "google/WaseFire",
    fallback: { stars: 193, forks: 46, live: false },
  },
  "google/unisim": {
    apiPath: "google/unisim",
    fallback: { stars: 149, forks: 9, live: false },
  },
  "google/maldoca": {
    apiPath: "google/maldoca",
    fallback: { stars: 68, forks: 17, live: false },
  },
};

export function createFallbackStatsMap(): GithubStatsMap {
  const out: GithubStatsMap = {};
  for (const [key, entry] of Object.entries(TRACKED_GITHUB_REPOS)) {
    out[key] = { ...entry.fallback };
  }
  return out;
}

/**
 * Extracts a normalized lowercase `owner/repo` slug from either a GitHub URL
 * or an `owner/repo` string.
 */
export function extractGithubRepoSlug(input?: string | null): string | null {
  if (!input) return null;
  const trimmed = input.trim();
  const urlMatch = trimmed.match(/^https?:\/\/(?:www\.)?github\.com\/([^/\s#?]+\/[^/\s#?]+)/i);
  if (urlMatch?.[1]) {
    return urlMatch[1].replace(/\.git$/i, "").toLowerCase();
  }
  if (/^[a-z0-9_.-]+\/[a-z0-9_.-]+$/i.test(trimmed)) {
    return trimmed.toLowerCase();
  }
  return null;
}

export function parseGithubRepoStats(payload: unknown): RepoStats | null {
  if (!payload || typeof payload !== "object") return null;
  const record = payload as Record<string, unknown>;
  const stars = record.stargazers_count;
  const forks = record.forks_count;

  if (
    typeof stars !== "number" ||
    !Number.isFinite(stars) ||
    stars < 1 ||
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
