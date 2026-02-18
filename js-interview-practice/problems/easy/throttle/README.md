# Throttle

**Difficulty:** Easy
**Category:** Frontend Logic / Closures
**Estimated Time:** 15–20 minutes

---

## Problem

Implement a `throttle` function that ensures `fn` is called **at most once** per `interval` milliseconds.

Unlike debounce (which delays until calls stop), throttle **fires immediately** on the first call, then ignores all subsequent calls until the interval has elapsed.

### Signature

```typescript
function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  interval: number
): (...args: Parameters<T>) => void
```

### Behavior

```
Calls:   ─A─B─C─────────D─E─F──────
Time:    0 50 100        600 650 700

Result:  A fires at 0ms (leading edge)
         D fires at 600ms (next eligible call)
```

B, C, E, F are discarded.

---

## Requirements

- The **first** call within a window executes immediately (leading edge)
- Subsequent calls within `interval` ms are dropped/ignored
- After `interval` ms, the next call executes immediately again
- The function executes with the arguments from **the call that fires** (not buffered)

---

## Examples

```typescript
const throttledScroll = throttle(() => {
  console.log('scroll handler fired');
}, 200);

window.addEventListener('scroll', throttledScroll);
// Will fire at most once every 200ms regardless of scroll speed
```

---

## Hints

<details>
<summary>Hint 1</summary>

Track when the function was last called. Before calling `fn`, check if enough time has passed.

</details>

<details>
<summary>Hint 2</summary>

Use `Date.now()` to get current timestamp. Store the last call time in a closure variable.

</details>

---

## Difference: Debounce vs Throttle

| | Debounce | Throttle |
|--|---------|----------|
| Fires | After calls STOP for N ms | At most once per N ms |
| Pattern | "Wait until settled" | "Rate limit" |
| Use case | Search input, resize | Scroll, mousemove, API calls |

---

## Edge Cases to Consider

- What if `interval` is 0?
- What happens if it's called exactly at `interval` ms?
- Does the function execute with correct `this` context?

---

## Running Tests

```bash
npx vitest run problems/easy/throttle/throttle.test.ts
```

---

## Reflection

After solving:

1. **What was difficult?**

2. **What edge cases did I miss?**

3. **Time complexity?**

4. **How would you implement "trailing edge" throttle** (fires at end of interval instead of start)?

5. **What's a real production use case for throttle vs debounce?**
