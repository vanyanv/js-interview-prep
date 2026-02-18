# Week 2 — Async & Promises

> **Goal:** Never write a broken promise chain again. Understand exactly when and why async code fails.

Async bugs are the #1 source of hard-to-reproduce production issues. This week you'll get comfortable with the mechanics.

---

## Problems This Week

| Problem | Key Concept | Why It Matters |
|---------|-------------|----------------|
| `promise-pool` | Concurrency control | Don't hammer APIs or DBs — limit parallelism |
| `retry-with-backoff` | Error recovery, jitter | Essential for any network code |
| `race-with-timeout` | `Promise.race`, cleanup | Prevent hanging requests |
| `cancelable-async` | `AbortController` | Modern way to cancel fetch/timers |
| `broken-async-chain` | Debugging | Find subtle promise bugs in existing code |

---

## Core Concepts

### Promise States
A Promise is always in one of three states:
- **Pending** — not yet settled
- **Fulfilled** — resolved with a value
- **Rejected** — rejected with a reason

Once settled, a promise never changes state.

### Common Async Bugs

#### Bug 1: Not returning a Promise in a chain
```typescript
// BROKEN — each .then returns undefined
fetchUser()
  .then((user) => { fetchProfile(user.id); }) // forgot return!
  .then((profile) => console.log(profile));    // profile is undefined

// FIXED
fetchUser()
  .then((user) => fetchProfile(user.id))       // return the Promise
  .then((profile) => console.log(profile));
```

#### Bug 2: Mixing async/await with .then incorrectly
```typescript
// BROKEN — unhandled promise
async function loadData() {
  fetch('/api/data').then((res) => res.json()); // no await, no return
}

// FIXED
async function loadData() {
  const res = await fetch('/api/data');
  return res.json();
}
```

#### Bug 3: Swallowing errors in parallel operations
```typescript
// BROKEN — if any promise rejects, Promise.all rejects, but others may be mid-flight
const results = await Promise.all([a(), b(), c()]);

// Consider: Promise.allSettled if you want all results regardless of failures
const results = await Promise.allSettled([a(), b(), c()]);
```

#### Bug 4: Race conditions with shared mutable state
```typescript
let data: User | null = null;

async function loadUser(id: string) {
  data = null;
  data = await fetchUser(id); // if called twice rapidly, second call might set data before first completes
}
```

### Promise Combinators

| Method | Behavior | Use When |
|--------|----------|----------|
| `Promise.all` | Rejects on first failure | All must succeed |
| `Promise.allSettled` | Waits for all | You need all results regardless |
| `Promise.race` | Settles with first | Timeout patterns, fast-path |
| `Promise.any` | Resolves on first success | Fallback sources |

### AbortController
Modern API for canceling async operations:
```typescript
const controller = new AbortController();
const { signal } = controller;

fetch('/api/slow', { signal })
  .then((res) => res.json())
  .catch((err) => {
    if (err.name === 'AbortError') console.log('cancelled');
  });

// Cancel it
controller.abort();
```

---

## Exponential Backoff with Jitter

Without jitter, all clients retry at the same time → thundering herd.

```
Attempt 1: wait 100ms
Attempt 2: wait 200ms
Attempt 3: wait 400ms
Attempt 4: wait 800ms

With jitter: wait = baseDelay * 2^attempt + random(0, 100)
```

---

## Interview Questions to Practice Out Loud

1. "Explain how `Promise.all` behaves when one promise rejects."
2. "How would you cancel an in-flight fetch request?"
3. "What's the difference between `async/await` and Promises under the hood?"
4. "If you have 100 API calls to make but only want 5 running at once, how would you implement that?"
5. "What is a 'thundering herd' problem and how does jitter help?"

---

## Things That Surprise People

- `async function` always returns a Promise, even if you return a primitive
- `await` works on any thenable, not just native Promises
- Errors thrown inside `async` functions are equivalent to `Promise.reject`
- `Promise.resolve(value)` where `value` is already a Promise doesn't create a nested Promise — it returns the same Promise
- Unhandled promise rejections will crash Node.js in newer versions

---

## Complexity Targets

| Problem | Notes |
|---------|-------|
| `promise-pool` | O(n) where n = total tasks, with bounded memory |
| `retry-with-backoff` | O(retries) time worst case |
| `race-with-timeout` | O(1) overhead beyond the promises themselves |

---

## Resources

- [MDN — Using Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
- [Jake Archibald — In The Loop](https://www.youtube.com/watch?v=cCOL7MC4Pl0) (microtask queue)
- [AWS — Exponential Backoff and Jitter](https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/)
