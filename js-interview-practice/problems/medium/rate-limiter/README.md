# Rate Limiter

**Difficulty:** Medium
**Category:** Backend / Algorithm
**Estimated Time:** 30–40 minutes

---

## Problem

Implement an in-memory rate limiter using the **sliding window** algorithm.

A rate limiter controls how many requests a client can make within a given time window. With a sliding window, the window moves with time rather than resetting at fixed intervals.

### Signature

```typescript
interface RateLimiterOptions {
  windowMs: number;  // Time window in milliseconds
  maxRequests: number; // Maximum requests allowed in the window
}

class RateLimiter {
  constructor(options: RateLimiterOptions);
  isAllowed(clientId: string): boolean;
  getRemainingRequests(clientId: string): number;
  reset(clientId: string): void;
}
```

---

## Requirements

- Track requests per `clientId` using a sliding window
- `isAllowed(clientId)` returns `true` if the request is within the limit, `false` if rate limited
- `getRemainingRequests(clientId)` returns how many requests the client can still make in the current window
- `reset(clientId)` clears the request history for a client
- Old request timestamps outside the window should be automatically cleaned up
- Memory should not grow unboundedly

---

## Sliding Window Algorithm

At any moment, the window is: `[now - windowMs, now]`

```
Window: 60 seconds, Max: 3 requests

t=0s:   Request A → [A]         → allowed (1/3)
t=10s:  Request B → [A, B]      → allowed (2/3)
t=20s:  Request C → [A, B, C]   → allowed (3/3)
t=25s:  Request D → [A, B, C, D]→ BLOCKED (over limit)

t=61s:  Request E → [B, C, E]   → allowed (A expired at 60s)
         (sliding window moved — A dropped off)
```

---

## Examples

```typescript
const limiter = new RateLimiter({ windowMs: 60_000, maxRequests: 3 });

limiter.isAllowed('user-1'); // true  (1/3)
limiter.isAllowed('user-1'); // true  (2/3)
limiter.isAllowed('user-1'); // true  (3/3)
limiter.isAllowed('user-1'); // false (rate limited)

limiter.isAllowed('user-2'); // true  (different client, own window)
```

---

## Express Middleware Bonus

After implementing the class, implement this middleware factory:

```typescript
function createRateLimitMiddleware(options: RateLimiterOptions): RequestHandler
```

---

## Hints

<details>
<summary>Hint 1</summary>

For each client, store an array of timestamps of their recent requests. When checking, remove any timestamps older than `now - windowMs` first.

</details>

<details>
<summary>Hint 2</summary>

Use a `Map<string, number[]>` to track timestamps per client. Before checking the count, filter out expired entries.

</details>

<details>
<summary>Hint 3</summary>

When `isAllowed` is called, first prune old timestamps, then check count vs limit, and if allowed, push `Date.now()` to the array.

</details>

---

## Running Tests

```bash
npx vitest run problems/medium/rate-limiter/rate-limiter.test.ts
```

---

## Reflection

1. **What was difficult?**

2. **What's the difference between sliding window and fixed window? What's the bug in fixed window?**

3. **Time complexity of `isAllowed`?** (hint: it's O(n) worst case — why? How would you optimize?)

4. **How would you make this distributed** (e.g., shared across 10 server instances)?

5. **What data structure does Redis use for sorted sets, and why is it perfect for rate limiting?**
