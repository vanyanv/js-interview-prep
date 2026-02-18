# Week 1 — JavaScript Foundations

> **Goal:** Be able to implement core utility functions from scratch, fluently, in under 20 minutes.

These are the building blocks. Every senior engineer can write these without Googling. If you can't yet, that's fine — that's what this week is for.

---

## Problems This Week

| Problem | Key Concept | Why It Matters |
|---------|-------------|----------------|
| `debounce` | Closures, timers | Used in search inputs, resize handlers — asked constantly |
| `throttle` | Closures, rate limiting | Scroll events, API calls — same interview frequency |
| `deep-clone` | Recursion, type inspection | JSON.parse doesn't handle Dates, functions, circular refs |
| `flatten-array` | Recursion, iteration | Array manipulation — foundation for data transforms |
| `memoize` | Closures, Maps, caching | Cache layer pattern — leads naturally to LRU discussion |

---

## Core Concepts to Understand

### Closures
A closure is a function that retains access to its outer scope even after that outer function returns.

```typescript
function makeCounter() {
  let count = 0; // captured in closure
  return () => ++count;
}
const counter = makeCounter();
counter(); // 1
counter(); // 2
```

Every debounce and throttle implementation relies on closures to hold the timer ID.

### The Event Loop
JavaScript is single-threaded. `setTimeout(fn, 0)` doesn't mean "run immediately" — it means "run after the current call stack clears."

```typescript
console.log('1');
setTimeout(() => console.log('2'), 0);
console.log('3');
// Output: 1, 3, 2
```

This matters deeply for debounce behavior.

### Recursion vs. Iteration
Both can solve the same problems, but:
- **Recursion** is cleaner for tree/nested structures (deep clone, flatten)
- **Iteration** avoids stack overflow for deep nesting
- Know both; prefer iteration for production code on untrusted inputs

---

## Things Interviewers Actually Ask About These Problems

### Debounce
- "What's the difference between debounce and throttle?"
- "How would you add a `leading` edge option?" (fire immediately, then block)
- "How would you cancel a pending debounce?"
- "Is your implementation safe to use with `this` context?"

### Throttle
- "What happens to the last call if it falls inside the throttle window?"
- "How would you implement trailing-edge throttle?"
- "What's the difference between throttle and a rate limiter?"

### Deep Clone
- "What does `JSON.parse(JSON.stringify(x))` not handle?"
  - Dates (converted to strings), `undefined`, functions, circular refs, `Map`, `Set`
- "How would you handle circular references?"
- "What about `Symbol` keys?"

### Memoize
- "How do you cache with multiple arguments?" (`JSON.stringify(args)` or a `WeakMap`)
- "When would memoization be harmful?" (functions with side effects, large memory cost)
- "How would you add a TTL (time-to-live) to cached values?"

---

## Complexity Targets

| Problem | Time | Space |
|---------|------|-------|
| debounce | O(1) per call | O(1) |
| throttle | O(1) per call | O(1) |
| deep-clone | O(n) where n = nodes | O(n) |
| flatten-array | O(n) where n = elements | O(n) output |
| memoize | O(1) amortized | O(n) where n = unique calls |

---

## Reflection Questions (Answer After Each Problem)

1. Did you get the implementation right on the first try?
2. Which edge case did you miss first?
3. Can you explain the difference between debounce and throttle to a non-technical person?
4. What would break if you used this code in a Node.js server with thousands of concurrent users?

---

## Resources (Read Only After Attempting)

- [You Don't Know JS — Closures](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/README.md)
- [JavaScript Event Loop — Philip Roberts talk](https://www.youtube.com/watch?v=8aGhZQkoFbQ)
- [Lodash debounce source](https://github.com/lodash/lodash/blob/main/src/debounce.ts) — read this after writing your own
