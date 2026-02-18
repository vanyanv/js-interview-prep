/**
 * LRU CACHE
 *
 * Implement an LRU (Least Recently Used) cache.
 * Both get and set must be O(1).
 */

export class LRUCache<K, V> {
  private readonly capacity: number;

  constructor(capacity: number) {
    if (capacity <= 0) throw new Error('Capacity must be greater than 0');
    this.capacity = capacity;
    // TODO: initialize data structure
  }

  get(key: K): V | undefined {
    // TODO: return value, mark as recently used
    throw new Error('Not implemented');
  }

  set(key: K, value: V): void {
    // TODO: insert/update, evict LRU if over capacity
    throw new Error('Not implemented');
  }

  has(key: K): boolean {
    // TODO: check existence without affecting order
    throw new Error('Not implemented');
  }

  get size(): number {
    // TODO: return current number of items
    throw new Error('Not implemented');
  }
}
