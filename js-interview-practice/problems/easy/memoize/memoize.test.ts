import { describe, it, expect, vi } from 'vitest';
import { memoize } from './solution';

describe('memoize', () => {
  it('returns the correct result', () => {
    const add = (a: number, b: number): number => a + b;
    const memoizedAdd = memoize(add);
    expect(memoizedAdd(2, 3)).toBe(5);
  });

  it('only calls the original function once for the same args', () => {
    const fn = vi.fn((x: number) => x * 2);
    const memoized = memoize(fn);

    memoized(5);
    memoized(5);
    memoized(5);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('calls the function again for different args', () => {
    const fn = vi.fn((x: number) => x * 2);
    const memoized = memoize(fn);

    memoized(5);
    memoized(10);
    memoized(5); // cached

    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenCalledWith(5);
    expect(fn).toHaveBeenCalledWith(10);
  });

  it('caches multiple argument combinations independently', () => {
    const fn = vi.fn((a: number, b: number) => a + b);
    const memoized = memoize(fn);

    expect(memoized(1, 2)).toBe(3);
    expect(memoized(3, 4)).toBe(7);
    expect(memoized(1, 2)).toBe(3); // cached

    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('correctly caches a zero-argument function', () => {
    let count = 0;
    const fn = vi.fn(() => ++count);
    const memoized = memoize(fn);

    memoized();
    memoized();
    memoized();

    expect(fn).toHaveBeenCalledTimes(1);
    expect(memoized()).toBe(1);
  });

  it('handles undefined as a cached return value correctly', () => {
    const fn = vi.fn(() => undefined);
    const memoized = memoize(fn);

    memoized();
    memoized();
    memoized();

    // fn should only be called once — undefined is a valid cached value
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('handles null as a cached return value', () => {
    const fn = vi.fn(() => null);
    const memoized = memoize(fn);

    memoized();
    memoized();

    expect(fn).toHaveBeenCalledTimes(1);
    expect(memoized()).toBeNull();
  });

  it('works with string arguments', () => {
    const fn = vi.fn((s: string) => s.toUpperCase());
    const memoized = memoize(fn);

    expect(memoized('hello')).toBe('HELLO');
    expect(memoized('hello')).toBe('HELLO');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('treats argument order as significant', () => {
    const fn = vi.fn((a: number, b: number) => `${a}-${b}`);
    const memoized = memoize(fn);

    memoized(1, 2);
    memoized(2, 1);

    expect(fn).toHaveBeenCalledTimes(2);
    expect(memoized(1, 2)).toBe('1-2');
    expect(memoized(2, 1)).toBe('2-1');
  });

  it('returns the same cached value on every subsequent call', () => {
    const memoized = memoize((x: number) => ({ value: x }));
    const first = memoized(42);
    const second = memoized(42);
    expect(first).toBe(second); // same reference from cache
  });
});
