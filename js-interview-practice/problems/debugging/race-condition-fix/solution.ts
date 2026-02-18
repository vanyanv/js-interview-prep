/**
 * ⚠️  SOLUTION FILE — Do not open until you've fixed broken.ts!
 * ─────────────────────────────────────────────────────────────────
 *
 * Fix: Use a generation counter (requestId) to track the most recent request.
 * Only commit the result if the request ID matches the current counter value.
 */

export interface UserProfile {
  id: string;
  name: string;
  fetchedAt: number;
}

export type FetchFn = (userId: string) => Promise<UserProfile>;

export class UserProfileLoader {
  private profile: UserProfile | null = null;
  private loading = false;

  // Generation counter: increments with each new loadProfile call
  // Only the most recently started request has the "current" ID
  private currentRequestId = 0;

  async loadProfile(userId: string, fetchFn: FetchFn): Promise<void> {
    // Claim a unique ID for this request before any async work
    const requestId = ++this.currentRequestId;
    this.loading = true;

    try {
      const profile = await fetchFn(userId);

      // Only commit if this is still the most recent request
      // If a newer request has started (higher requestId), discard this result
      if (requestId === this.currentRequestId) {
        this.profile = profile;
      }
    } finally {
      // Only clear loading state if this is the last request
      if (requestId === this.currentRequestId) {
        this.loading = false;
      }
    }
  }

  getProfile(): UserProfile | null {
    return this.profile;
  }

  isLoading(): boolean {
    return this.loading;
  }
}
