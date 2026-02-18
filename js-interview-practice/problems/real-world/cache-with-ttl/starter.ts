/**
 * CACHE WITH TTL
 *
 * Production-quality in-memory cache with TTL expiry and LRU eviction.
 */

export interface CacheOptions {
  ttlMs: number;
  maxSize: number;
}

export class TTLCache<K, V> {
  private readonly options: CacheOptions;

  constructor(options: CacheOptions) {
    this.options = options;
    // TODO: initialize storage
  }

  get(key: K): V | undefined {
    // TODO: return value if exists and not expired; clean up if expired
    throw new Error('Not implemented');
  }

  set(key: K, value: V, ttlMs?: number): void {
    // TODO: insert with TTL, evict LRU if at capacity
    throw new Error('Not implemented');
  }

  has(key: K): boolean {
    // TODO: true only if key exists and not expired
    throw new Error('Not implemented');
  }

  delete(key: K): boolean {
    // TODO: delete if exists; return true if it did exist
    throw new Error('Not implemented');
  }

  clear(): void {
    // TODO: remove all entries
    throw new Error('Not implemented');
  }

  get size(): number {
    // TODO: count of entries (may include expired ones that haven't been cleaned up yet)
    throw new Error('Not implemented');
  }
}
