# Race Condition Fix

**Difficulty:** Debugging
**Category:** Async / Concurrency
**Estimated Time:** No strict limit — methodically investigate

---

## Problem

The `UserProfileLoader` has a **race condition**: when `loadProfile` is called multiple times rapidly, responses may arrive out of order, causing stale data to overwrite fresh data.

**Your task:** Find and fix the race condition in `broken.ts`.

---

## The Scenario

```
t=0ms:   loadProfile('user-1') called → request A starts
t=50ms:  loadProfile('user-2') called → request B starts
t=100ms: Request B resolves → profile = user-2's data ✓
t=200ms: Request A resolves → profile = user-1's data ✗ (stale!)
```

The last completed request wins — but it should be the last **initiated** request that wins.

---

## Buggy Code

```typescript
class UserProfileLoader {
  private profile: UserProfile | null = null;
  private loading = false;

  async loadProfile(userId: string): Promise<void> {
    this.loading = true;

    try {
      const profile = await this.fetchProfile(userId); // may take variable time
      this.profile = profile; // Bug: always sets, regardless of request order!
    } finally {
      this.loading = false;
    }
  }

  getProfile(): UserProfile | null {
    return this.profile;
  }
}
```

---

## The Fix Pattern

The key insight: **only accept the result from the most recently initiated request.**

There are several patterns to fix this:
1. **Request ID / generation counter** — increment on each call; only accept if ID matches current
2. **AbortController** — cancel the previous request when a new one starts
3. **Last-write-wins with a timestamp** — only update if result is newer than current

For this exercise, implement the **generation counter** approach.

---

## Running Tests

```bash
npx vitest run problems/debugging/race-condition-fix/race-condition-fix.test.ts
```

The tests import from `./broken`. Fix `broken.ts`.

---

## Hints

<details>
<summary>Hint 1</summary>

Add a counter that increments with each `loadProfile` call. Capture the counter's value before the async operation. After resolving, only update state if the counter value still matches.

</details>

<details>
<summary>Hint 2</summary>

```typescript
// Pattern:
let currentRequestId = 0;

async function loadProfile(userId: string): Promise<void> {
  const requestId = ++currentRequestId; // capture before async
  const profile = await fetchProfile(userId);
  if (requestId !== currentRequestId) return; // stale — discard
  this.profile = profile;
}
```

</details>

---

## Reflection

1. **How did you verify the race condition existed?** (slow/fast fetch mocks)

2. **What other patterns fix race conditions?** (AbortController, Suspense, React Query)

3. **How does React Query (TanStack Query) solve this for you?**

4. **What are the UI implications of a race condition in a search input?** (user types "cats", sees results for "ca")

5. **Is a race condition a bug or a performance issue?** (both — it's a correctness bug with a performance dimension)
