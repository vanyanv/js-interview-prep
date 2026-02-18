import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { debounce } from './solution';

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('calls the function after the delay', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 300);

    debounced();
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(300);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('does not call the function before the delay expires', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 300);

    debounced();
    vi.advanceTimersByTime(299);
    expect(fn).not.toHaveBeenCalled();
  });

  it('resets the timer on each call', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 300);

    debounced();
    vi.advanceTimersByTime(200);
    debounced(); // reset timer
    vi.advanceTimersByTime(200);
    expect(fn).not.toHaveBeenCalled(); // still 100ms short

    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('only calls the function once for multiple rapid calls', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 300);

    debounced('a');
    debounced('b');
    debounced('c');
    vi.advanceTimersByTime(300);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('calls the function with the most recent arguments', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 300);

    debounced('first');
    debounced('second');
    debounced('third');
    vi.advanceTimersByTime(300);

    expect(fn).toHaveBeenCalledWith('third');
  });

  it('can be called multiple times across separate delay windows', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 300);

    debounced('A');
    vi.advanceTimersByTime(300);
    expect(fn).toHaveBeenCalledTimes(1);

    debounced('B');
    vi.advanceTimersByTime(300);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('passes multiple arguments correctly', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced(1, 2, 3);
    vi.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledWith(1, 2, 3);
  });

  it('works with delay of 0', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 0);

    debounced();
    expect(fn).not.toHaveBeenCalled(); // still async — setTimeout(0) is still async

    vi.advanceTimersByTime(0);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('does not call the function if timer is still pending', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 500);

    debounced();
    vi.advanceTimersByTime(499);
    expect(fn).toHaveBeenCalledTimes(0);
  });
});
