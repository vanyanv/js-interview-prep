import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { withTimeout, TimeoutError } from './solution';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe('withTimeout', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('resolves with the promise value if it completes before timeout', async () => {
    const promise = Promise.resolve(42);
    const result = await withTimeout(promise, 1000);
    expect(result).toBe(42);
  });

  it('rejects with TimeoutError if timeout elapses first', async () => {
    const slowPromise = new Promise<number>((resolve) =>
      setTimeout(() => resolve(1), 5000)
    );

    const p = withTimeout(slowPromise, 1000);
    vi.advanceTimersByTime(1000);

    await expect(p).rejects.toThrow(TimeoutError);
  });

  it('TimeoutError includes the timeout duration', async () => {
    const slowPromise = new Promise<number>((resolve) =>
      setTimeout(() => resolve(1), 5000)
    );

    const p = withTimeout(slowPromise, 500);
    vi.advanceTimersByTime(500);

    try {
      await p;
    } catch (err) {
      expect(err).toBeInstanceOf(TimeoutError);
      if (err instanceof TimeoutError) {
        expect(err.timeoutMs).toBe(500);
      }
    }
  });

  it('includes custom message in TimeoutError', async () => {
    const slowPromise = delay(5000);
    const p = withTimeout(slowPromise, 100, 'database query');
    vi.advanceTimersByTime(100);

    await expect(p).rejects.toThrow(/database query/);
  });

  it('propagates rejection from the original promise', async () => {
    const failingPromise = Promise.reject(new Error('original error'));
    await expect(withTimeout(failingPromise, 1000)).rejects.toThrow('original error');
  });

  it('does not time out if the promise resolves just before the deadline', async () => {
    let resolved = false;
    const promise = new Promise<string>((resolve) => {
      setTimeout(() => {
        resolved = true;
        resolve('done');
      }, 999);
    });

    const p = withTimeout(promise, 1000);
    vi.advanceTimersByTime(999);
    const result = await p;

    expect(result).toBe('done');
    expect(resolved).toBe(true);
  });

  it('clears the timeout timer after resolution (does not leak)', async () => {
    const clearSpy = vi.spyOn(globalThis, 'clearTimeout');
    const promise = Promise.resolve('fast');

    await withTimeout(promise, 5000);

    // clearTimeout should have been called to clean up the pending timeout
    expect(clearSpy).toHaveBeenCalled();
  });

  it('clears the timeout timer after rejection (does not leak)', async () => {
    const clearSpy = vi.spyOn(globalThis, 'clearTimeout');
    const promise = Promise.reject(new Error('fail'));

    await expect(withTimeout(promise, 5000)).rejects.toThrow('fail');
    expect(clearSpy).toHaveBeenCalled();
  });

  it('works with string return type', async () => {
    const result = await withTimeout(Promise.resolve('hello'), 1000);
    expect(result).toBe('hello');
  });

  it('works with object return type', async () => {
    const obj = { id: 1, name: 'test' };
    const result = await withTimeout(Promise.resolve(obj), 1000);
    expect(result).toEqual(obj);
  });
});
