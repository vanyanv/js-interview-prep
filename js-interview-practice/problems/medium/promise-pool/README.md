# Promise Pool (Concurrency Limiter)

**Difficulty:** Medium
**Category:** Async / Concurrency
**Estimated Time:** 35–45 minutes

---

## Problem

Implement a `promisePool` function that executes async tasks with a maximum concurrency limit.

Without this, running 1000 tasks with `Promise.all` would start all 1000 simultaneously — hammering a database, API, or file system. A promise pool ensures at most `N` tasks run at once.

### Signature

```typescript
async function promisePool<T>(
  tasks: (() => Promise<T>)[],
  concurrency: number
): Promise<T[]>
```

---

## Requirements

- Execute at most `concurrency` tasks simultaneously
- When a task completes, immediately start the next pending task
- Return results in the **same order as input tasks** (not completion order)
- If any task rejects, the function should reject with that error
- Results array should maintain input ordering

---

## Examples

```typescript
// Simulating an API that can only handle 2 requests at once
const tasks = [
  () => fetch('/api/user/1').then(r => r.json()),
  () => fetch('/api/user/2').then(r => r.json()),
  () => fetch('/api/user/3').then(r => r.json()),
  () => fetch('/api/user/4').then(r => r.json()),
];

const results = await promisePool(tasks, 2);
// At most 2 fetches run simultaneously
// results[0] = user 1, results[1] = user 2, etc.
```

---

## Why Tasks Are Passed as Factories (Functions)

```typescript
// BAD: these promises START immediately when created
const promises = [fetch(url1), fetch(url2), fetch(url3)];
// All 3 are already running!

// GOOD: tasks are factories — they don't start until called
const tasks = [() => fetch(url1), () => fetch(url2), () => fetch(url3)];
// You control when each one starts
```

---

## Hints

<details>
<summary>Hint 1</summary>

Start by launching `concurrency` tasks simultaneously. Then, as each one completes, launch the next task in the queue.

</details>

<details>
<summary>Hint 2</summary>

Use an index variable to track the "next task to start." Each running task, when it completes, checks if there's another task to pick up.

</details>

<details>
<summary>Hint 3</summary>

Think of it like a worker pool: you have `concurrency` workers. Each worker runs tasks one at a time. When done, it picks up the next task from a shared queue.

</details>

<details>
<summary>Hint 4</summary>

To preserve order, collect results into an array with the same index as the input task.

</details>

---

## Edge Cases

- Empty task array → should return `[]`
- `concurrency` greater than number of tasks → fine, just runs all at once
- A task that throws synchronously (wrap in a try/catch or rely on Promise rejection)
- Tasks with different return types

---

## Running Tests

```bash
npx vitest run problems/medium/promise-pool/promise-pool.test.ts
```

---

## Reflection

1. **What was difficult?**

2. **Time and space complexity?**

3. **What happens if `concurrency` is 1?** (should work like sequential processing)

4. **What happens if `concurrency` is `Infinity`?** (should work like `Promise.all`)

5. **How does this compare to a real job queue like Bull or BullMQ?**

6. **Could you implement this with `p-limit` or `bottleneck`? When would you use a library vs. rolling your own?**
