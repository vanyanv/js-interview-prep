# Flatten Array

**Difficulty:** Easy
**Category:** Arrays / Recursion
**Estimated Time:** 15–20 minutes

---

## Problem

Implement a `flattenArray` function that flattens a nested array to a specified depth.

### Signature

```typescript
function flattenArray<T>(arr: NestedArray<T>, depth?: number): T[]

type NestedArray<T> = (T | NestedArray<T>)[]
```

---

## Requirements

- If `depth` is not specified, flatten completely (all levels)
- If `depth` is `0`, return the array unchanged
- If `depth` is `1`, flatten one level
- Preserve element order
- Do not use `Array.prototype.flat()` (that's the answer — implement the logic yourself)

---

## Examples

```typescript
flattenArray([1, [2, 3], [4, [5, 6]]]);
// → [1, 2, 3, 4, 5, 6]  (fully flattened, default)

flattenArray([1, [2, 3], [4, [5, 6]]], 1);
// → [1, 2, 3, 4, [5, 6]]  (one level only)

flattenArray([1, [2, 3], [4, [5, 6]]], 0);
// → [1, [2, 3], [4, [5, 6]]]  (unchanged)

flattenArray([1, [2, [3, [4, [5]]]]]);
// → [1, 2, 3, 4, 5]
```

---

## Hints

<details>
<summary>Hint 1</summary>

Recursion is natural here. For each element: if it's an array AND depth > 0, recurse with `depth - 1`. Otherwise, add it to the result.

</details>

<details>
<summary>Hint 2</summary>

For "fully flatten" behavior (no depth specified), use `Infinity` as the default depth value.

</details>

---

## Edge Cases

- Empty array `[]`
- Array with no nested arrays `[1, 2, 3]`
- Depth of 0
- Depth greater than nesting level

---

## Running Tests

```bash
npx vitest run problems/easy/flatten-array/flatten-array.test.ts
```

---

## Reflection

1. **What was difficult?**

2. **Recursive vs iterative — which did you choose and why?**

3. **Time and space complexity?**

4. **What's the difference between `flat()`, `flatMap()`, and your implementation?**

5. **How would you handle non-array iterables (like `Set` or generator)?**
