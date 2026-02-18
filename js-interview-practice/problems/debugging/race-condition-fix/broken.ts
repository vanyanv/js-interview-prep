/**
 * DEBUGGING CHALLENGE — Race Condition Fix
 *
 * UserProfileLoader has a race condition.
 * When loadProfile is called rapidly, stale responses can overwrite fresh ones.
 *
 * Fix the race condition so that only the LAST initiated request's result is kept.
 * Do NOT modify the test file.
 *
 * Run tests:
 *   npx vitest run problems/debugging/race-condition-fix/race-condition-fix.test.ts
 */

export interface UserProfile {
  id: string;
  name: string;
  fetchedAt: number; // millisecond timestamp when this was "fetched"
}

export type FetchFn = (userId: string) => Promise<UserProfile>;

export class UserProfileLoader {
  private profile: UserProfile | null = null;
  private loading = false;

  // Bug: no mechanism to track which request is "current"
  // When multiple requests are in-flight, the last one to COMPLETE wins
  // but it should be the last one to START that wins.

  async loadProfile(userId: string, fetchFn: FetchFn): Promise<void> {
    this.loading = true;

    try {
      const profile = await fetchFn(userId);
      // Bug: always sets profile regardless of request order
      // If a slow request completes after a faster newer request,
      // the stale data overwrites the fresh data.
      this.profile = profile;
    } finally {
      this.loading = false;
    }
  }

  getProfile(): UserProfile | null {
    return this.profile;
  }

  isLoading(): boolean {
    return this.loading;
  }
}
