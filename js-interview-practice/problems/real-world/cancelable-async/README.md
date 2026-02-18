# Cancelable Async Operations

**Difficulty:** Real-World
**Category:** Async / AbortController
**Estimated Time:** 35–45 minutes

---

## Problem

Implement a `makeCancelable` wrapper and a `createCancelableTask` function that use `AbortController` to support cancellation of async operations.

### Signatures

```typescript
interface CancelablePromise<T> {
  promise: Promise<T>;
  cancel(reason?: string): void;
  readonly canceled: boolean;
}

function makeCancelable<T>(fn: (signal: AbortSignal) => Promise<T>): CancelablePromise<T>

// A long-running task that checks the signal periodically
function createCancelableTask<T>(
  steps: (() => T | Promise<T>)[],
  signal: AbortSignal
): Promise<T[]>
```

---

## Requirements

### `makeCancelable`
- Creates an `AbortController` and calls `fn(signal)`
- Returns `{ promise, cancel, canceled }`
- Calling `cancel()` aborts the signal and causes the promise to reject with a `CancelError`
- If the operation completes before cancel, the promise resolves normally
- `canceled` reflects whether `cancel()` has been called

### `createCancelableTask`
- Runs each step sequentially
- Before each step, checks `signal.aborted` — if true, throws `CancelError`
- Returns an array of all step results

---

## Examples

```typescript
// makeCancelable
const { promise, cancel } = makeCancelable(async (signal) => {
  const response = await fetch('/api/slow', { signal });
  return response.json();
});

setTimeout(() => cancel('user navigated away'), 500);

try {
  const data = await promise;
} catch (err) {
  if (err instanceof CancelError) {
    console.log('Canceled:', err.reason);
  }
}
```

---

## Why This Matters

Without cancellation:
- User navigates away → request still running, response processing consumes CPU
- Component unmounts → state update causes React warning
- Tests hang → async operations never resolve in tests

With `AbortController`:
- `fetch()` built-in support: `fetch(url, { signal })`
- Can be combined with any async operation by checking `signal.aborted`

---

## Hints

<details>
<summary>Hint 1</summary>

Create an `AbortController` inside `makeCancelable`. Pass `controller.signal` to `fn`. When `cancel()` is called, call `controller.abort(reason)`.

</details>

<details>
<summary>Hint 2</summary>

To reject the promise with a `CancelError`, you can listen to the signal's `abort` event: `signal.addEventListener('abort', ...)`.

</details>

---

## Running Tests

```bash
npx vitest run problems/real-world/cancelable-async/cancelable-async.test.ts
```

---

## Reflection

1. **What was difficult?**

2. **What happens to a `fetch()` that's in flight when you abort its signal?** (It rejects with a `DOMException` named `AbortError`)

3. **How does React handle cleanup of async operations in `useEffect`?**

4. **How would you add cancellation support to a non-cancelable promise** (e.g., an old callback-based API)?

5. **What's the difference between canceling a task and timing it out?**
