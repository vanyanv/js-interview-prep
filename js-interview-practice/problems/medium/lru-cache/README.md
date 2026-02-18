# LRU Cache

**Difficulty:** Medium
**Category:** Data Structures
**Estimated Time:** 35–45 minutes

---

## Problem

Implement a **Least Recently Used (LRU) Cache** with `get` and `set` operations — both in O(1) time.

When the cache is full and a new item is inserted, the **least recently used** item is evicted.

### Signature

```typescript
class LRUCache<K, V> {
  constructor(capacity: number);
  get(key: K): V | undefined;
  set(key: K, value: V): void;
  has(key: K): boolean;
  readonly size: number;
}
```

---

## Requirements

- `get(key)` — returns the value if present, `undefined` otherwise. Accessing a key marks it as **recently used**.
- `set(key, value)` — inserts/updates the key. If at capacity, evicts the LRU item first.
- `has(key)` — returns `true` if key exists (without affecting LRU order)
- Both `get` and `set` must be O(1)
- `size` should reflect current number of items

---

## The Data Structure

**Naive approach (wrong):** Use a Map and sort by access time → O(n) for eviction.

**Correct approach:** Combine a **HashMap** + **Doubly Linked List**:
- HashMap provides O(1) key lookup
- Doubly Linked List maintains access order
- Most recently used at the **tail**
- Least recently used at the **head**

```
head ←→ [LRU] ←→ [...] ←→ [MRU] ←→ tail

get("b"):  move "b" node to tail (most recently used)
set(new):  add at tail; if over capacity, remove from head (LRU)
```

---

## Shortcut (JavaScript Trick)

JavaScript's `Map` preserves **insertion order**. You can use this to simulate LRU cheaply:
- On `get`: delete the key and re-insert it (moves to the end)
- To evict: delete `map.keys().next().value` (the oldest key)

This is O(1) amortized and perfectly valid for an interview!

---

## Examples

```typescript
const cache = new LRUCache<string, number>(3);

cache.set('a', 1);
cache.set('b', 2);
cache.set('c', 3);

cache.get('a'); // 1 — 'a' is now MRU

cache.set('d', 4); // evicts 'b' (LRU, since 'a' was just accessed)

cache.has('b'); // false — evicted
cache.has('a'); // true
cache.has('c'); // true
cache.has('d'); // true
```

---

## Running Tests

```bash
npx vitest run problems/medium/lru-cache/lru-cache.test.ts
```

---

## Reflection

1. **What was difficult?**

2. **Why can't you use a simple Map without the re-insertion trick?**

3. **O(1) time — explain how both HashMap + DLL achieves this.**

4. **When is an LRU cache a bad choice?** (hint: scan access patterns, cold caches)

5. **What are real-world systems that use LRU?** (CPU cache, Redis ALLKEYS-LRU, OS page replacement)
