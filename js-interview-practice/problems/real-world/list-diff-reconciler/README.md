# List Diff Reconciler

**Difficulty:** Real-World
**Category:** Algorithms / Frontend Logic
**Estimated Time:** 40–50 minutes

---

## Problem

Implement a `diff` function that compares two lists and produces a minimal set of patch operations to transform the old list into the new one.

This is a simplified version of what React's reconciler does with virtual DOM nodes.

### Signature

```typescript
type PatchOp<T> =
  | { type: 'INSERT'; item: T; index: number }
  | { type: 'DELETE'; item: T; index: number }
  | { type: 'MOVE'; item: T; fromIndex: number; toIndex: number }
  | { type: 'UPDATE'; oldItem: T; newItem: T; index: number };

interface DiffOptions<T> {
  getKey: (item: T) => string; // Stable identity key (like React's `key` prop)
  isEqual?: (a: T, b: T) => boolean; // Custom equality check (default: deep equal)
}

function diff<T>(oldList: T[], newList: T[], options: DiffOptions<T>): PatchOp<T>[]
```

---

## Requirements

- Use `getKey` to identify items across lists (like React's `key` prop)
- If a key exists in both lists, compare items with `isEqual` — generate `UPDATE` if changed
- If a key exists only in new list → `INSERT`
- If a key exists only in old list → `DELETE`
- If a key moved position → `MOVE`
- Return the minimal set of operations
- Order: deletions before insertions (for correctness when applying)

---

## Examples

```typescript
const oldList = [
  { id: '1', name: 'Alice' },
  { id: '2', name: 'Bob' },
  { id: '3', name: 'Charlie' },
];

const newList = [
  { id: '2', name: 'Bob Updated' }, // moved to index 0, updated
  { id: '1', name: 'Alice' },       // moved to index 1
  { id: '4', name: 'Dave' },        // new
  // id: '3' removed
];

const patches = diff(oldList, newList, { getKey: (item) => item.id });
// [
//   { type: 'DELETE', item: { id: '3', ... }, index: 2 },
//   { type: 'UPDATE', oldItem: ..., newItem: ..., index: 1 },  (Bob)
//   { type: 'MOVE', item: ..., fromIndex: 1, toIndex: 0 },     (Bob to front)
//   { type: 'MOVE', item: ..., fromIndex: 0, toIndex: 1 },     (Alice)
//   { type: 'INSERT', item: { id: '4', ... }, index: 2 },
// ]
```

---

## Why This Matters

This is the core algorithm that makes React (and virtual DOM frameworks) fast:
- Without keys: replace entire list on any change (slow)
- With keys: minimal patches — only change what actually changed
- Understanding this helps you write efficient list rendering in React

---

## Hints

<details>
<summary>Hint 1</summary>

Start by building two Maps: `oldByKey` and `newByKey`. This lets you look up items by key in O(1).

</details>

<details>
<summary>Hint 2</summary>

Walk through `oldList` and find items not in `newList` → `DELETE`. Walk through `newList` and find items not in `oldList` → `INSERT`. For items in both, check position → `MOVE`, check value → `UPDATE`.

</details>

---

## Running Tests

```bash
npx vitest run problems/real-world/list-diff-reconciler/list-diff-reconciler.test.ts
```

---

## Reflection

1. **What was difficult?**

2. **Why does React require `key` props on list elements?**

3. **What's the worst-case complexity of your algorithm?**

4. **What would happen if two items had the same key?** (A real bug in React apps)

5. **How does the Longest Common Subsequence (LCS) algorithm relate to diffing?**
