# Debounce

**Difficulty:** Easy
**Category:** Frontend Logic / Closures
**Estimated Time:** 15–20 minutes

---

## Problem

Implement a `debounce` function that delays invoking `fn` until after `delay` milliseconds have elapsed since the last time it was called.

If the debounced function is called multiple times within `delay` ms, only the **last** call is executed.

### Signature

```typescript
function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void
```

### Behavior

```
Calls:   ─── A ─── B ─── C ─────────────── D
Time:    0   100  200  300   [delay=500]  800+500=1300

Result:  C fires at ~800ms (300 + 500)
         D fires at ~1300ms (800 + 500)
```

---

## Requirements

- Each new call resets the delay timer
- The function should be called with the **most recent arguments**
- Return type is `void` — callers don't get the return value of `fn`
- Do not use any external libraries

---

## Examples

```typescript
const debouncedSearch = debounce((query: string) => {
  console.log('searching for:', query);
}, 300);

debouncedSearch('a');   // timer starts
debouncedSearch('ab');  // timer resets
debouncedSearch('abc'); // timer resets
// 300ms later: logs "searching for: abc"
```

---

## Hints

<details>
<summary>Hint 1</summary>

You need to store the timer ID between calls. Where can you store state that persists across calls but is private to the debounced function?

</details>

<details>
<summary>Hint 2</summary>

Use `setTimeout` and `clearTimeout`. Each time the returned function is called, clear the existing timer and create a new one.

</details>

<details>
<summary>Hint 3</summary>

The returned function's type should preserve the parameter types of the original `fn`. Use `Parameters<T>` to capture those.

</details>

---

## Edge Cases to Consider

- What happens if `delay` is 0?
- What if `fn` throws an error?
- What if the debounced function is called with different argument types over time?

---

## Running Tests

```bash
npx vitest run problems/easy/debounce/debounce.test.ts
```

---

## Reflection

After solving, answer these:

1. **What was difficult?**

2. **What edge cases did I miss?**

3. **Time complexity?** (per call, amortized)

4. **How would I explain debounce vs throttle in an interview?**

5. **Bonus:** How would you add a `cancel()` method to the returned function?
