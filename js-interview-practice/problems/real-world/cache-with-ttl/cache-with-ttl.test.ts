import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { TTLCache } from './solution';

describe('TTLCache', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('stores and retrieves a value', () => {
    const cache = new TTLCache<string, number>({ ttlMs: 1000, maxSize: 10 });
    cache.set('key', 42);
    expect(cache.get('key')).toBe(42);
  });

  it('returns undefined for a missing key', () => {
    const cache = new TTLCache<string, number>({ ttlMs: 1000, maxSize: 10 });
    expect(cache.get('missing')).toBeUndefined();
  });

  it('returns undefined after TTL expires', () => {
    const cache = new TTLCache<string, number>({ ttlMs: 1000, maxSize: 10 });
    cache.set('key', 42);
    vi.advanceTimersByTime(1001);
    expect(cache.get('key')).toBeUndefined();
  });

  it('returns value before TTL expires', () => {
    const cache = new TTLCache<string, number>({ ttlMs: 1000, maxSize: 10 });
    cache.set('key', 42);
    vi.advanceTimersByTime(999);
    expect(cache.get('key')).toBe(42);
  });

  it('has() returns false for expired keys', () => {
    const cache = new TTLCache<string, number>({ ttlMs: 500, maxSize: 10 });
    cache.set('key', 1);
    vi.advanceTimersByTime(501);
    expect(cache.has('key')).toBe(false);
  });

  it('has() returns true for valid keys', () => {
    const cache = new TTLCache<string, number>({ ttlMs: 1000, maxSize: 10 });
    cache.set('key', 1);
    expect(cache.has('key')).toBe(true);
  });

  it('per-entry TTL overrides global TTL', () => {
    const cache = new TTLCache<string, number>({ ttlMs: 1000, maxSize: 10 });
    cache.set('short', 1, 100); // expires in 100ms
    cache.set('long', 2, 5000); // expires in 5000ms

    vi.advanceTimersByTime(200);
    expect(cache.get('short')).toBeUndefined(); // expired
    expect(cache.get('long')).toBe(2); // still valid
  });

  it('evicts LRU entry when at maxSize', () => {
    const cache = new TTLCache<string, number>({ ttlMs: 60_000, maxSize: 3 });
    cache.set('a', 1);
    cache.set('b', 2);
    cache.set('c', 3);

    // 'a' is LRU — next insert should evict it
    cache.set('d', 4);

    expect(cache.has('a')).toBe(false); // evicted
    expect(cache.has('b')).toBe(true);
    expect(cache.has('c')).toBe(true);
    expect(cache.has('d')).toBe(true);
  });

  it('get refreshes LRU order', () => {
    const cache = new TTLCache<string, number>({ ttlMs: 60_000, maxSize: 3 });
    cache.set('a', 1);
    cache.set('b', 2);
    cache.set('c', 3);

    cache.get('a'); // refresh 'a' → 'b' becomes LRU

    cache.set('d', 4); // should evict 'b'

    expect(cache.has('a')).toBe(true);
    expect(cache.has('b')).toBe(false); // evicted
    expect(cache.has('c')).toBe(true);
    expect(cache.has('d')).toBe(true);
  });

  it('delete returns true for existing non-expired entry', () => {
    const cache = new TTLCache<string, number>({ ttlMs: 1000, maxSize: 10 });
    cache.set('key', 1);
    expect(cache.delete('key')).toBe(true);
    expect(cache.get('key')).toBeUndefined();
  });

  it('delete returns false for expired entry', () => {
    const cache = new TTLCache<string, number>({ ttlMs: 100, maxSize: 10 });
    cache.set('key', 1);
    vi.advanceTimersByTime(200);
    expect(cache.delete('key')).toBe(false);
  });

  it('delete returns false for missing key', () => {
    const cache = new TTLCache<string, number>({ ttlMs: 1000, maxSize: 10 });
    expect(cache.delete('missing')).toBe(false);
  });

  it('clear removes all entries', () => {
    const cache = new TTLCache<string, number>({ ttlMs: 1000, maxSize: 10 });
    cache.set('a', 1);
    cache.set('b', 2);
    cache.clear();
    expect(cache.size).toBe(0);
    expect(cache.get('a')).toBeUndefined();
  });

  it('throws if constructed with invalid options', () => {
    expect(() => new TTLCache({ ttlMs: 1000, maxSize: 0 })).toThrow();
    expect(() => new TTLCache({ ttlMs: 0, maxSize: 10 })).toThrow();
  });

  it('updating an existing key refreshes its TTL and LRU position', () => {
    const cache = new TTLCache<string, number>({ ttlMs: 500, maxSize: 10 });
    cache.set('key', 1);

    vi.advanceTimersByTime(400);
    cache.set('key', 2); // refresh TTL

    vi.advanceTimersByTime(400); // original TTL would have expired, but not refreshed
    expect(cache.get('key')).toBe(2); // still alive

    vi.advanceTimersByTime(200); // now past refreshed TTL
    expect(cache.get('key')).toBeUndefined();
  });
});
