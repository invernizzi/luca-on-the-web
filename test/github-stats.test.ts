import { describe, it, expect } from 'vitest';
import { parseGithubRepoStats } from '../server/utils/githubStats';

describe('GitHub stats parser', () => {
  it('extracts valid star and fork counts from GitHub API responses', () => {
    expect(
      parseGithubRepoStats({ stargazers_count: 18871, forks_count: 1189 })
    ).toEqual({
      stars: 18871,
      forks: 1189,
      live: true,
    });
  });

  it('rejects malformed, rate-limited, or implausibly low payloads', () => {
    expect(parseGithubRepoStats(null)).toBeNull();
    expect(parseGithubRepoStats({ message: 'API rate limit exceeded' })).toBeNull();
    expect(parseGithubRepoStats({ stargazers_count: 0, forks_count: 0 })).toBeNull();
    expect(parseGithubRepoStats({ stargazers_count: '18871', forks_count: 1189 })).toBeNull();
  });
});
