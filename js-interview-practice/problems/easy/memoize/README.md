# Memoize

**Difficulty:** Easy
**Category:** Closures / Caching
**Estimated Time:** 15–20 minutes

---

## Problem

Implement a `memoize` function that caches the results of function calls. When called again with the same arguments, the cached result is returned without re-invoking `fn`.

### Signature

```typescript
function memoize<T extends (...args: unknown[]) => unknown>(fn: T): T
```

---

## Requirements

- Cache the result of `fn` keyed by its arguments
- Two calls with identical arguments (by value for primitives) should return the cached result
- The cache persists for the lifetime of the memoized function
- Preserve the return type of the original function

---

## Examples

```typescript
let callCount = 0;

const expensiveAdd = (a: number, b: number): number => {
  callCount++;
  return a + b;
};

const memoizedAdd = memoize(expensiveAdd);

memoizedAdd(1, 2); // calls fn, returns 3, callCount = 1
memoizedAdd(1, 2); // returns cached 3, callCount = 1
memoizedAdd(2, 3); // calls fn, returns 5, callCount = 2
memoizedAdd(1, 2); // returns cached 3, callCount = 2
```

---

## Hints

<details>
<summary>Hint 1</summary>

Use a `Map` (or object) to store results. The key needs to uniquely identify the arguments.

</details>

<details>
<summary>Hint 2</summary>

`JSON.stringify(args)` is a simple way to create a cache key from arguments. What are its limitations?

</details>

<details>
<summary>Hint 3</summary>

For single-argument functions that take objects, you might want `WeakMap` to avoid memory leaks. For this exercise, `Map` with `JSON.stringify` is sufficient.

</details>

---

## Edge Cases

- Zero-argument function (called repeatedly)
- Arguments that are objects (tricky for key generation)
- Functions that return `undefined` — is that the same as "not cached"?

---

## The Subtle Bug: `undefined` as a Cached Value

```typescript
const fn = memoize(() => undefined);
fn(); // runs fn, caches undefined
fn(); // should return cached undefined WITHOUT calling fn again

// If you check `if (cache.has(key))` you're fine.
// If you check `if (cached !== undefined)` — you have a bug!
```

---

## Running Tests

```bash
npx vitest run problems/easy/memoize/memoize.test.ts
```

---

## Reflection

1. **What was difficult?**

2. **What's the time complexity of a cache lookup?**

3. **When would memoization be a bad idea?**
   - Functions with side effects (logging, mutations)
   - Very large number of unique inputs (unbounded memory)
   - Functions with object arguments (key equality issues)

4. **How would you add a max cache size with LRU eviction?**
   (This is the LRU Cache problem in /medium/)

5. **How would you add a TTL (expiry) to cached entries?**
