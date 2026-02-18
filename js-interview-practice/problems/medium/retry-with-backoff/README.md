# Retry with Exponential Backoff

**Difficulty:** Medium
**Category:** Async / Resilience Patterns
**Estimated Time:** 30–40 minutes

---

## Problem

Implement a `retry` function that retries a failing async operation with **exponential backoff** and **jitter**.

### Signature

```typescript
interface RetryOptions {
  maxAttempts: number;   // Total attempts (including the first try)
  baseDelayMs: number;   // Base delay for backoff calculation
  maxDelayMs?: number;   // Cap delay at this value (optional)
  jitter?: boolean;      // Add randomness to prevent thundering herd (default: true)
  shouldRetry?: (error: unknown) => boolean; // Custom predicate (default: always retry)
}

async function retry<T>(
  fn: () => Promise<T>,
  options: RetryOptions
): Promise<T>
```

---

## Requirements

- Attempt `fn()` up to `maxAttempts` times
- Wait between retries using exponential backoff: `baseDelayMs * 2^attempt`
- If `jitter` is true, add a random amount to the delay (prevents thundering herd)
- If `maxDelayMs` is specified, cap the delay at that value
- If `shouldRetry` returns `false` for an error, stop retrying immediately
- If all attempts fail, reject with the **last** error
- If the first attempt succeeds, resolve immediately (no delay)

---

## Backoff Formula

```
delay = min(baseDelayMs * 2^attemptNumber, maxDelayMs)

With jitter:
delay = delay + random(0, baseDelayMs)

Attempt 0 (first retry): 100 * 2^0 = 100ms
Attempt 1:               100 * 2^1 = 200ms
Attempt 2:               100 * 2^2 = 400ms
Attempt 3:               100 * 2^3 = 800ms
...capped at maxDelayMs
```

---

## Examples

```typescript
// Simple retry — no backoff
const data = await retry(() => fetch('/api/flaky').then(r => r.json()), {
  maxAttempts: 3,
  baseDelayMs: 1000,
});

// Selective retry — only retry on network errors, not 4xx
const data = await retry(() => fetchUser(id), {
  maxAttempts: 5,
  baseDelayMs: 200,
  maxDelayMs: 5000,
  shouldRetry: (err) => !(err instanceof HttpError && err.status < 500),
});
```

---

## Why Jitter Matters

Without jitter, all clients retry at the same interval after a server outage:
```
t=0:    Server goes down, 1000 clients fail
t=100:  All 1000 clients retry simultaneously → server overwhelmed again
t=200:  All 1000 retry again → thundering herd
```

With jitter:
```
t=0:    Server goes down, 1000 clients fail
t=87:   Client A retries
t=94:   Client B retries (spread out)
t=112:  Client C retries
→ Load distributed, server can recover
```

---

## Running Tests

```bash
npx vitest run problems/medium/retry-with-backoff/retry-with-backoff.test.ts
```

---

## Reflection

1. **What was difficult?**

2. **How would you test retry logic with real timers?** (Hint: fake timers or mock the delay function)

3. **What's the difference between `maxAttempts: 3` and `maxRetries: 3`?**

4. **When would you NOT retry?** (Hint: idempotency — is the operation safe to repeat?)

5. **What is the circuit breaker pattern and how is it different from retry?**
