/**
 * ⚠️  SOLUTION FILE — Do not open until you've attempted starter.ts!
 * ─────────────────────────────────────────────────────────────────
 *
 * Uses JavaScript's Map insertion-order guarantee for O(1) LRU:
 * - delete + re-insert moves a key to the "most recently used" position
 * - map.keys().next().value is always the LRU key
 */

export class LRUCache<K, V> {
  private readonly capacity: number;
  // Map preserves insertion order. We use this to track LRU order.
  // Oldest (LRU) entry is first, newest (MRU) is last.
  private readonly cache = new Map<K, V>();

  constructor(capacity: number) {
    if (capacity <= 0) throw new Error('Capacity must be greater than 0');
    this.capacity = capacity;
  }

  get(key: K): V | undefined {
    if (!this.cache.has(key)) return undefined;

    const value = this.cache.get(key) as V;

    // Refresh: delete and re-insert to move to MRU position (end of Map)
    this.cache.delete(key);
    this.cache.set(key, value);

    return value;
  }

  set(key: K, value: V): void {
    if (this.cache.has(key)) {
      // Update existing — delete first to refresh position
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // Evict the LRU item — the first key in the Map
      const lruKey = this.cache.keys().next().value as K;
      this.cache.delete(lruKey);
    }

    this.cache.set(key, value);
  }

  has(key: K): boolean {
    // Does NOT update LRU order — just a membership check
    return this.cache.has(key);
  }

  get size(): number {
    return this.cache.size;
  }
}
