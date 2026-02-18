# Broken Async Chain

**Difficulty:** Debugging
**Category:** Async / Promises
**Estimated Time:** No strict limit — methodically investigate

---

## Problem

The `processUserData` function below has **subtle async bugs**. The tests are failing.

**Your task:** Find and fix ALL the bugs in `broken.ts` without modifying the test file.

---

## Setup

This folder has a different structure:
- `broken.ts` — the buggy implementation you must fix
- `broken-async-chain.test.ts` — tests that must pass (do not modify)
- `solution.ts` — correct implementation (only check after fixing it yourself)

---

## The Buggy Code

```typescript
// In broken.ts — can you spot the bugs?

async function fetchUser(id: number): Promise<User> { ... }
async function fetchPosts(userId: number): Promise<Post[]> { ... }
async function enrichPost(post: Post): Promise<EnrichedPost> { ... }

async function processUserData(userId: number): Promise<UserResult> {
  const user = fetchUser(userId); // Bug 1

  const posts = await fetchPosts(user.id); // Bug 2

  const enrichedPosts = posts.map((post) => enrichPost(post)); // Bug 3

  return {
    user,
    posts: enrichedPosts,
    processedAt: new Date().toISOString(),
  };
}
```

## Debugging Strategy

Don't just read the code and guess. Follow the process:

1. **Run the failing tests** and read the error messages
2. **Identify what the error tells you** (TypeError? Undefined? Wrong type?)
3. **Form a hypothesis** about why
4. **Fix one bug at a time** and re-run tests
5. **Repeat** until all tests pass

---

## Running Tests

```bash
npx vitest run problems/debugging/broken-async-chain/broken-async-chain.test.ts
```

The tests import from `./broken`, not `./solution`. Fix `broken.ts`.

---

## Hints (Only Look After 15 Minutes)

<details>
<summary>Hint 1 — Bug 1</summary>

`fetchUser` is an async function. What does calling an async function without `await` return?

</details>

<details>
<summary>Hint 2 — Bug 2</summary>

If `user` from Bug 1 isn't the actual user object, what would `user.id` be?

</details>

<details>
<summary>Hint 3 — Bug 3</summary>

`posts.map(enrichPost)` — `enrichPost` returns a Promise. What does `Array.map` return when the callback is async?

</details>

---

## Reflection

After fixing:

1. **What was the first error message you saw?** Did it point you directly to the bug?

2. **Which bug was hardest to spot and why?**

3. **How would you write these functions to make bugs like this less likely?** (Strong typing? Linting rules?)

4. **What ESLint rule catches the "missing await" bug?** (`@typescript-eslint/no-floating-promises`)
