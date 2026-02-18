/**
 * These tests import from ./broken — fix broken.ts to make them pass.
 * Do NOT modify this test file.
 */
import { describe, it, expect } from 'vitest';
import { UserProfileLoader, UserProfile, FetchFn } from './broken';

// Helper: creates a delayed fetch that resolves after `delayMs`
function makeFetch(userId: string, delayMs: number): FetchFn {
  return (_id: string): Promise<UserProfile> =>
    new Promise((resolve) =>
      setTimeout(
        () => resolve({ id: userId, name: `User ${userId}`, fetchedAt: Date.now() }),
        delayMs
      )
    );
}

describe('UserProfileLoader (fix race condition in broken.ts)', () => {
  it('loads a profile successfully for a single request', async () => {
    const loader = new UserProfileLoader();
    await loader.loadProfile('user-1', makeFetch('user-1', 0));
    expect(loader.getProfile()?.id).toBe('user-1');
  });

  it('the last STARTED request wins when two requests complete out of order', async () => {
    const loader = new UserProfileLoader();

    // Request 1: slow (will complete second)
    const req1 = loader.loadProfile('user-1', makeFetch('user-1', 200));

    // Request 2: fast (started after req1 but completes first)
    await new Promise((r) => setTimeout(r, 10)); // small delay between starts
    const req2 = loader.loadProfile('user-2', makeFetch('user-2', 50));

    // Wait for both to settle
    await Promise.allSettled([req1, req2]);

    // Request 2 was started LAST → its result should persist
    // The RACE CONDITION bug causes user-1 (slower) to overwrite user-2 (faster)
    expect(loader.getProfile()?.id).toBe('user-2');
  });

  it('handles rapid sequential calls — only last request persists', async () => {
    const loader = new UserProfileLoader();

    // Fire 5 requests rapidly
    const promises = ['a', 'b', 'c', 'd', 'e'].map((id, i) =>
      loader.loadProfile(id, makeFetch(id, 100 - i * 15)) // earlier requests take longer
    );

    await Promise.allSettled(promises);

    // Only 'e' (the last one started) should be the final profile
    expect(loader.getProfile()?.id).toBe('e');
  });

  it('isLoading returns true while a request is pending', async () => {
    const loader = new UserProfileLoader();
    const p = loader.loadProfile('user-1', makeFetch('user-1', 100));

    // Check immediately after starting
    expect(loader.isLoading()).toBe(true);

    await p;
    expect(loader.isLoading()).toBe(false);
  });

  it('isLoading is false after all requests complete', async () => {
    const loader = new UserProfileLoader();

    const p1 = loader.loadProfile('user-1', makeFetch('user-1', 50));
    const p2 = loader.loadProfile('user-2', makeFetch('user-2', 10));

    await Promise.allSettled([p1, p2]);
    expect(loader.isLoading()).toBe(false);
  });

  it('getProfile returns null before any load', () => {
    const loader = new UserProfileLoader();
    expect(loader.getProfile()).toBeNull();
  });

  it('a failed request does not clear a successful prior profile', async () => {
    const loader = new UserProfileLoader();

    // First: successful load
    await loader.loadProfile('user-1', makeFetch('user-1', 0));
    expect(loader.getProfile()?.id).toBe('user-1');

    // Second: a request that fails but starts after
    const failFetch: FetchFn = (_id) =>
      new Promise((_, reject) => setTimeout(() => reject(new Error('Network error')), 50));

    await loader.loadProfile('user-2', failFetch).catch(() => {
      /* expected */
    });

    // After a failed load attempt, profile state should still be 'user-1'
    // (or null/undefined depending on your implementation — just shouldn't be corrupted)
    // The most important thing: it doesn't throw and doesn't corrupt state
    const profile = loader.getProfile();
    expect(profile === null || profile?.id === 'user-1').toBe(true);
  });
});
