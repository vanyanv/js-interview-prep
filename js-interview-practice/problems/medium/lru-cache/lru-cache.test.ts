import { describe, it, expect } from 'vitest';
import { LRUCache } from './solution';

describe('LRUCache', () => {
  it('throws if capacity <= 0', () => {
    expect(() => new LRUCache(0)).toThrow();
    expect(() => new LRUCache(-1)).toThrow();
  });

  it('returns undefined for a missing key', () => {
    const cache = new LRUCache<string, number>(3);
    expect(cache.get('missing')).toBeUndefined();
  });

  it('stores and retrieves a value', () => {
    const cache = new LRUCache<string, number>(3);
    cache.set('a', 1);
    expect(cache.get('a')).toBe(1);
  });

  it('updates an existing key', () => {
    const cache = new LRUCache<string, number>(3);
    cache.set('a', 1);
    cache.set('a', 99);
    expect(cache.get('a')).toBe(99);
    expect(cache.size).toBe(1);
  });

  it('tracks size correctly', () => {
    const cache = new LRUCache<string, number>(3);
    expect(cache.size).toBe(0);
    cache.set('a', 1);
    expect(cache.size).toBe(1);
    cache.set('b', 2);
    expect(cache.size).toBe(2);
  });

  it('evicts the least recently used item when at capacity', () => {
    const cache = new LRUCache<string, number>(3);
    cache.set('a', 1);
    cache.set('b', 2);
    cache.set('c', 3);

    // 'd' causes eviction — 'a' is LRU
    cache.set('d', 4);

    expect(cache.has('a')).toBe(false);
    expect(cache.has('b')).toBe(true);
    expect(cache.has('c')).toBe(true);
    expect(cache.has('d')).toBe(true);
  });

  it('get refreshes the LRU order', () => {
    const cache = new LRUCache<string, number>(3);
    cache.set('a', 1);
    cache.set('b', 2);
    cache.set('c', 3);

    // Access 'a' — now 'a' is MRU, 'b' is LRU
    cache.get('a');

    // 'd' causes eviction — 'b' should be evicted (not 'a')
    cache.set('d', 4);

    expect(cache.has('a')).toBe(true); // recently accessed — not evicted
    expect(cache.has('b')).toBe(false); // LRU — evicted
    expect(cache.has('c')).toBe(true);
    expect(cache.has('d')).toBe(true);
  });

  it('set on existing key refreshes LRU order', () => {
    const cache = new LRUCache<string, number>(3);
    cache.set('a', 1);
    cache.set('b', 2);
    cache.set('c', 3);

    // Update 'a' — moves to MRU, 'b' becomes LRU
    cache.set('a', 100);
    cache.set('d', 4); // evicts 'b'

    expect(cache.has('a')).toBe(true);
    expect(cache.has('b')).toBe(false); // evicted
    expect(cache.get('a')).toBe(100);
  });

  it('has() does not affect LRU order', () => {
    const cache = new LRUCache<string, number>(2);
    cache.set('a', 1);
    cache.set('b', 2);

    // has() on 'a' should NOT make it MRU
    cache.has('a');

    // If has() changed order, 'b' would be evicted instead
    cache.set('c', 3); // should evict 'a' (true LRU)

    expect(cache.has('a')).toBe(false); // evicted
    expect(cache.has('b')).toBe(true);
    expect(cache.has('c')).toBe(true);
  });

  it('works with a capacity of 1', () => {
    const cache = new LRUCache<string, number>(1);
    cache.set('a', 1);
    expect(cache.get('a')).toBe(1);

    cache.set('b', 2);
    expect(cache.has('a')).toBe(false);
    expect(cache.get('b')).toBe(2);
  });

  it('handles numeric keys', () => {
    const cache = new LRUCache<number, string>(3);
    cache.set(1, 'one');
    cache.set(2, 'two');
    expect(cache.get(1)).toBe('one');
    expect(cache.get(2)).toBe('two');
  });

  it('handles a full eviction sequence correctly', () => {
    const cache = new LRUCache<number, number>(3);

    cache.set(1, 1);
    cache.set(2, 2);
    cache.set(3, 3);
    cache.get(1); // 1 is MRU: order → 2, 3, 1
    cache.set(4, 4); // evicts 2: order → 3, 1, 4
    cache.get(3); // 3 is MRU: order → 1, 4, 3
    cache.set(5, 5); // evicts 1: order → 4, 3, 5

    expect(cache.has(1)).toBe(false); // evicted
    expect(cache.has(2)).toBe(false); // evicted
    expect(cache.has(3)).toBe(true);
    expect(cache.has(4)).toBe(true);
    expect(cache.has(5)).toBe(true);
  });
});
