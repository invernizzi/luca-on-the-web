import { describe, it, expect } from 'vitest';
import {
  MIN_DISPLAY_STARS,
  TRACKED_GITHUB_REPOS,
  createFallbackStatsMap,
  extractGithubRepoSlug,
  parseGithubRepoStats,
  shouldDisplayRepoStats,
} from '../server/utils/githubStats';

describe('GitHub stats utilities', () => {
  it('extracts normalized owner/repo slugs from GitHub URLs and short strings', () => {
    expect(extractGithubRepoSlug('https://github.com/google/OpenSK')).toBe('google/opensk');
    expect(extractGithubRepoSlug('https://github.com/getting-things-gnome/gtg')).toBe('getting-things-gnome/gtg');
    expect(extractGithubRepoSlug('https://github.com/google/magika/')).toBe('google/magika');
    expect(extractGithubRepoSlug('keras-team/keras-tuner')).toBe('keras-team/keras-tuner');
    expect(extractGithubRepoSlug('https://secgemini.google')).toBeNull();
    expect(extractGithubRepoSlug('')).toBeNull();
  });

  it('tracks all core open-source repositories with positive fallback stats', () => {
    const map = createFallbackStatsMap();
    for (const slug of [
      'google/magika',
      'google/opensk',
      'keras-team/keras-tuner',
      'getting-things-gnome/gtg',
      'google/scaaml',
      'google/wasefire',
      'google/unisim',
      'google/maldoca',
    ]) {
      expect(TRACKED_GITHUB_REPOS[slug]).toBeDefined();
      expect(map[slug]?.stars).toBeGreaterThan(0);
    }
  });

  it('extracts valid star and fork counts from GitHub API responses', () => {
    expect(
      parseGithubRepoStats({ stargazers_count: 3495, forks_count: 359 })
    ).toEqual({
      stars: 3495,
      forks: 359,
      live: true,
    });
  });

  it('rejects malformed or rate-limited payloads', () => {
    expect(parseGithubRepoStats(null)).toBeNull();
    expect(parseGithubRepoStats({ message: 'API rate limit exceeded' })).toBeNull();
    expect(parseGithubRepoStats({ stargazers_count: 0, forks_count: 0 })).toBeNull();
    expect(parseGithubRepoStats({ stargazers_count: '3495', forks_count: 359 })).toBeNull();
  });

  it('only displays star counts for repositories with at least 1,000 stars', () => {
    expect(MIN_DISPLAY_STARS).toBe(1000);
    expect(shouldDisplayRepoStats(null)).toBe(false);
    expect(shouldDisplayRepoStats({ stars: 999, forks: 10, live: true })).toBe(false);
    expect(shouldDisplayRepoStats({ stars: 1000, forks: 10, live: true })).toBe(true);

    const map = createFallbackStatsMap();
    expect(shouldDisplayRepoStats(map['google/magika'])).toBe(true);
    expect(shouldDisplayRepoStats(map['google/opensk'])).toBe(true);
    expect(shouldDisplayRepoStats(map['keras-team/keras-tuner'])).toBe(true);
    expect(shouldDisplayRepoStats(map['getting-things-gnome/gtg'])).toBe(false);
    expect(shouldDisplayRepoStats(map['google/scaaml'])).toBe(false);
    expect(shouldDisplayRepoStats(map['google/wasefire'])).toBe(false);
    expect(shouldDisplayRepoStats(map['google/unisim'])).toBe(false);
    expect(shouldDisplayRepoStats(map['google/maldoca'])).toBe(false);
  });
});
