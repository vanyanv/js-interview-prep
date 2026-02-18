import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { retry } from './solution';

describe('retry with exponential backoff', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('returns the result on the first successful attempt', async () => {
    const fn = vi.fn().mockResolvedValue('success');
    const result = await retry(fn, { maxAttempts: 3, baseDelayMs: 100 });
    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('retries until success', async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce(new Error('fail 1'))
      .mockRejectedValueOnce(new Error('fail 2'))
      .mockResolvedValue('success');

    const promise = retry(fn, { maxAttempts: 5, baseDelayMs: 100, jitter: false });
    // Advance timers to allow retries to complete
    await vi.runAllTimersAsync();
    const result = await promise;

    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('throws the last error after all attempts exhausted', async () => {
    const error = new Error('always fails');
    const fn = vi.fn().mockRejectedValue(error);

    const promise = retry(fn, { maxAttempts: 3, baseDelayMs: 100, jitter: false });
    await vi.runAllTimersAsync();

    await expect(promise).rejects.toThrow('always fails');
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('calls fn exactly maxAttempts times on failure', async () => {
    const fn = vi.fn().mockRejectedValue(new Error('fail'));

    const promise = retry(fn, { maxAttempts: 4, baseDelayMs: 50, jitter: false });
    await vi.runAllTimersAsync();
    await expect(promise).rejects.toThrow();

    expect(fn).toHaveBeenCalledTimes(4);
  });

  it('does not wait after the final failed attempt', async () => {
    const fn = vi.fn().mockRejectedValue(new Error('fail'));
    // Just verify it resolves/rejects without hanging
    const promise = retry(fn, { maxAttempts: 2, baseDelayMs: 10000, jitter: false });
    await vi.runAllTimersAsync();
    await expect(promise).rejects.toThrow();
  });

  it('stops retrying when shouldRetry returns false', async () => {
    class HttpError extends Error {
      constructor(public status: number) {
        super(`HTTP ${status}`);
      }
    }

    const fn = vi.fn().mockRejectedValue(new HttpError(400));

    const shouldRetry = (err: unknown): boolean =>
      !(err instanceof HttpError && err.status < 500);

    const promise = retry(fn, {
      maxAttempts: 5,
      baseDelayMs: 100,
      shouldRetry,
    });
    await vi.runAllTimersAsync();
    await expect(promise).rejects.toThrow('HTTP 400');

    // Should only call fn once — 400 is not retryable
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('retries when shouldRetry returns true', async () => {
    class ServerError extends Error {}
    const fn = vi
      .fn()
      .mockRejectedValueOnce(new ServerError('503'))
      .mockResolvedValue('ok');

    const promise = retry(fn, {
      maxAttempts: 3,
      baseDelayMs: 100,
      jitter: false,
      shouldRetry: (err) => err instanceof ServerError,
    });
    await vi.runAllTimersAsync();
    const result = await promise;

    expect(result).toBe('ok');
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('respects maxDelayMs cap', async () => {
    // Spy on setTimeout to check delay values
    const timeoutSpy = vi.spyOn(globalThis, 'setTimeout');
    const fn = vi
      .fn()
      .mockRejectedValueOnce(new Error())
      .mockRejectedValueOnce(new Error())
      .mockRejectedValueOnce(new Error())
      .mockResolvedValue('ok');

    const promise = retry(fn, {
      maxAttempts: 4,
      baseDelayMs: 1000,
      maxDelayMs: 500,
      jitter: false,
    });
    await vi.runAllTimersAsync();
    await promise;

    // Check that no setTimeout was called with a delay > 500ms
    const delayCalls = timeoutSpy.mock.calls.map((call) => call[1] as number);
    delayCalls.forEach((delay) => {
      expect(delay).toBeLessThanOrEqual(500);
    });
  });

  it('throws if maxAttempts is less than 1', async () => {
    await expect(
      retry(() => Promise.resolve('x'), { maxAttempts: 0, baseDelayMs: 100 })
    ).rejects.toThrow();
  });

  it('works with maxAttempts of 1 — no retries', async () => {
    const fn = vi.fn().mockRejectedValue(new Error('only chance'));
    await expect(retry(fn, { maxAttempts: 1, baseDelayMs: 100 })).rejects.toThrow('only chance');
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
