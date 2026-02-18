# Deep Clone

**Difficulty:** Easy
**Category:** Data Structures / Recursion
**Estimated Time:** 20–25 minutes

---

## Problem

Implement a `deepClone` function that creates a deep copy of a value.

**Do not use `JSON.parse(JSON.stringify(value))`** — it doesn't handle `Date`, `undefined`, `Map`, `Set`, or circular references.

### Signature

```typescript
function deepClone<T>(value: T): T
```

---

## Requirements

Handle these types correctly:

| Type | Expected behavior |
|------|------------------|
| Primitives (`string`, `number`, `boolean`, `null`, `undefined`) | Return as-is |
| `Date` | Return new `Date` with same time value |
| `Array` | Return new array with deep-cloned elements |
| Plain objects | Return new object with deep-cloned values |
| `Map` | Return new Map with deep-cloned keys and values |
| `Set` | Return new Set with deep-cloned values |

You do **not** need to handle `Function`, `RegExp`, `Symbol`, `WeakMap`, or class instances.

---

## Examples

```typescript
const original = {
  name: 'Alice',
  dob: new Date('1990-01-01'),
  scores: [10, 20, 30],
  address: { city: 'New York' }
};

const clone = deepClone(original);

clone.address.city = 'London';
clone.scores.push(40);

console.log(original.address.city); // 'New York' — not affected
console.log(original.scores.length); // 3 — not affected
```

---

## What `JSON.parse(JSON.stringify(...))` Gets Wrong

```typescript
const obj = {
  date: new Date(),     // becomes a string
  undef: undefined,     // property is dropped entirely
  fn: () => 'hello',   // property is dropped entirely
};

const broken = JSON.parse(JSON.stringify(obj));
broken.date instanceof Date; // false — it's a string!
'undef' in broken;           // false — key dropped!
```

---

## Hints

<details>
<summary>Hint 1</summary>

Check the type of `value` first. Handle each type explicitly. Primitives can be returned directly.

</details>

<details>
<summary>Hint 2</summary>

For arrays: `Array.isArray(value)` then map each element through `deepClone`.
For objects: `Object.keys()` + `reduce` or a for-in loop.

</details>

<details>
<summary>Hint 3</summary>

For `Date`: use `new Date(value.getTime())` to preserve exact millisecond.

</details>

---

## Running Tests

```bash
npx vitest run problems/easy/deep-clone/deep-clone.test.ts
```

---

## Reflection

1. **What was difficult?**

2. **What types did you forget to handle?**

3. **Time and space complexity?**

4. **How would you extend this to handle circular references?**
   (Hint: you'd need a `WeakMap` to track already-cloned objects)

5. **When is `JSON.parse(JSON.stringify(...))` actually acceptable?**
