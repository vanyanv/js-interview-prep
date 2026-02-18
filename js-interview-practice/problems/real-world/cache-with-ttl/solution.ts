/**
 * ⚠️  SOLUTION FILE — Do not open until you've attempted starter.ts!
 * ─────────────────────────────────────────────────────────────────
 */

export interface CacheOptions {
  ttlMs: number;
  maxSize: number;
}

interface Entry<V> {
  value: V;
  expiresAt: number;
}

export class TTLCache<K, V> {
  private readonly options: CacheOptions;

  // Map preserves insertion order → use for LRU (oldest first)
  // We delete and re-insert on access to move to MRU position
  private readonly store = new Map<K, Entry<V>>();

  constructor(options: CacheOptions) {
    if (options.maxSize <= 0) throw new Error('maxSize must be > 0');
    if (options.ttlMs <= 0) throw new Error('ttlMs must be > 0');
    this.options = options;
  }

  private isExpired(entry: Entry<V>): boolean {
    return Date.now() > entry.expiresAt;
  }

  get(key: K): V | undefined {
    const entry = this.store.get(key);
    if (!entry) return undefined;

    if (this.isExpired(entry)) {
      // Lazy eviction of expired entry
      this.store.delete(key);
      return undefined;
    }

    // Refresh LRU position — delete and re-insert
    this.store.delete(key);
    this.store.set(key, entry);

    return entry.value;
  }

  set(key: K, value: V, ttlMs?: number): void {
    const expiresAt = Date.now() + (ttlMs ?? this.options.ttlMs);

    // If key already exists, remove it first (to refresh LRU position)
    if (this.store.has(key)) {
      this.store.delete(key);
    } else if (this.store.size >= this.options.maxSize) {
      // At capacity — evict the LRU entry (first entry in Map)
      const lruKey = this.store.keys().next().value as K;
      this.store.delete(lruKey);
    }

    this.store.set(key, { value, expiresAt });
  }

  has(key: K): boolean {
    const entry = this.store.get(key);
    if (!entry) return false;

    if (this.isExpired(entry)) {
      this.store.delete(key);
      return false;
    }

    return true;
  }

  delete(key: K): boolean {
    const entry = this.store.get(key);
    if (!entry || this.isExpired(entry)) {
      this.store.delete(key);
      return false;
    }
    return this.store.delete(key);
  }

  clear(): void {
    this.store.clear();
  }

  get size(): number {
    return this.store.size;
  }
}
