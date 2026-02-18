# Race with Timeout

**Difficulty:** Real-World
**Category:** Async / Error Handling
**Estimated Time:** 25–35 minutes

---

## Problem

Implement a `withTimeout` utility that races a promise against a timeout.

If the promise doesn't resolve within `timeoutMs`, reject with a `TimeoutError`. If the promise resolves first, return its value.

### Signature

```typescript
class TimeoutError extends Error {
  constructor(message: string, public readonly timeoutMs: number);
}

async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  message?: string
): Promise<T>
```

---

## Requirements

- If `promise` resolves before `timeoutMs`, return its value
- If `timeoutMs` elapses first, reject with `TimeoutError`
- Clean up the timer if the promise resolves first (prevent memory leaks)
- The error should include the timeout duration in the message

---

## Examples

```typescript
// Fast operation — resolves fine
const result = await withTimeout(
  fetch('/api/fast').then(r => r.json()),
  5000
);

// Slow operation — times out
try {
  await withTimeout(
    fetch('/api/slow').then(r => r.json()),
    1000,
    'API request'
  );
} catch (err) {
  if (err instanceof TimeoutError) {
    console.log(`Timed out after ${err.timeoutMs}ms`);
  }
}
```

---

## The Cleanup Problem

Naive implementation leaks a timer:

```typescript
// LEAKY — timer still runs after promise resolves
const timeout = new Promise((_, reject) =>
  setTimeout(() => reject(new TimeoutError()), ms)
);
return Promise.race([promise, timeout]);
```

Correct: clear the timer once the race is won.

---

## Running Tests

```bash
npx vitest run problems/real-world/race-with-timeout/race-with-timeout.test.ts
```

---

## Reflection

1. **What was difficult?**

2. **Why does the leaked timer cause problems?** (Node.js won't exit if timers are pending; tests may hang)

3. **What does `Promise.race` guarantee about the "losing" promise?** (It continues running — it's not cancelled)

4. **How would you implement a version that also cancels the underlying operation?** (AbortController — see `cancelable-async` problem)

5. **What's the difference between `withTimeout` and a circuit breaker?**
