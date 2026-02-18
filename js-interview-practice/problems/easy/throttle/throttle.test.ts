import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { throttle } from './solution';

describe('throttle', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('fires the function immediately on first call (leading edge)', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 300);

    throttled();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('does not fire again within the interval', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 300);

    throttled();
    vi.advanceTimersByTime(100);
    throttled();
    vi.advanceTimersByTime(100);
    throttled();

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('fires again after the interval has elapsed', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 300);

    throttled();
    expect(fn).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(300);
    throttled();
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('discards intermediate calls and only counts the ones that fire', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);

    // 0ms: fires
    throttled('A');
    // 50ms: blocked
    vi.advanceTimersByTime(50);
    throttled('B');
    // 100ms: fires
    vi.advanceTimersByTime(50);
    throttled('C');
    // 150ms: blocked
    vi.advanceTimersByTime(50);
    throttled('D');

    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenNthCalledWith(1, 'A');
    expect(fn).toHaveBeenNthCalledWith(2, 'C');
  });

  it('passes arguments to the function', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 300);

    throttled(42, 'hello');
    expect(fn).toHaveBeenCalledWith(42, 'hello');
  });

  it('allows a new call exactly at the interval boundary', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);

    throttled();
    vi.advanceTimersByTime(100);
    throttled(); // exactly at interval — should fire

    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('handles rapid calls correctly — only first fires in each window', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 500);

    for (let i = 0; i < 10; i++) {
      throttled(i);
      vi.advanceTimersByTime(50);
    }
    // Total time: 450ms, only the first call (at 0ms) should fire
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(0);
  });
});
