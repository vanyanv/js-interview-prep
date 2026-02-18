# Cache with TTL

**Difficulty:** Real-World
**Category:** Backend / Caching
**Estimated Time:** 40–50 minutes

---

## Problem

Build a production-quality in-memory cache with:
- **TTL (Time-To-Live)** — entries expire after a configured duration
- **LRU eviction** — when at capacity, remove the least recently used item
- **Size limit** — cap total entries to prevent memory exhaustion
- **Lazy expiry** — expired items are removed on access, not via polling

### Signature

```typescript
interface CacheOptions {
  ttlMs: number;       // How long entries live
  maxSize: number;     // Maximum number of entries before LRU eviction
}

interface CacheEntry<V> {
  value: V;
  expiresAt: number;   // Unix timestamp in ms
}

class TTLCache<K, V> {
  constructor(options: CacheOptions);
  get(key: K): V | undefined;
  set(key: K, value: V, ttlMs?: number): void; // per-entry TTL override
  has(key: K): boolean; // only true if not expired
  delete(key: K): boolean;
  clear(): void;
  readonly size: number; // count of non-expired entries (approximate)
}
```

---

## Requirements

- `get(key)` returns the value if it exists AND hasn't expired; returns `undefined` otherwise
- Expired entries are lazily cleaned up on access — no background timer
- When at `maxSize`, evict the LRU entry before inserting a new one
- `has(key)` respects TTL — returns `false` for expired keys
- `set` with a per-entry `ttlMs` overrides the global TTL for that entry
- `delete` returns `true` if the key existed (and wasn't expired), `false` otherwise

---

## Why Not Just Use Redis?

Great question — in many real systems you would. But:
- Small services may not want the Redis infrastructure
- For session-scoped caches (per-request), in-memory is fine
- Unit tests can't hit Redis (easily)
- Interviews want you to understand the underlying mechanism

---

## Running Tests

```bash
npx vitest run problems/real-world/cache-with-ttl/cache-with-ttl.test.ts
```

---

## Reflection

1. **What was difficult?**

2. **Lazy expiry vs. active expiry — what are the tradeoffs?** (Lazy: memory bloat from expired entries; Active: background timer overhead)

3. **How does Redis implement TTL?** (lazy expiry + periodic scan)

4. **What would you change if this cache needed to be shared across multiple Node.js processes?**

5. **How would you add a `getOrSet(key, factory, ttl)` method** for the cache-aside pattern?
