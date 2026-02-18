import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { RateLimiter } from './solution';

describe('RateLimiter (Sliding Window)', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('allows requests up to the limit', () => {
    const limiter = new RateLimiter({ windowMs: 60_000, maxRequests: 3 });

    expect(limiter.isAllowed('user-1')).toBe(true);
    expect(limiter.isAllowed('user-1')).toBe(true);
    expect(limiter.isAllowed('user-1')).toBe(true);
  });

  it('blocks requests over the limit', () => {
    const limiter = new RateLimiter({ windowMs: 60_000, maxRequests: 3 });

    limiter.isAllowed('user-1');
    limiter.isAllowed('user-1');
    limiter.isAllowed('user-1');

    expect(limiter.isAllowed('user-1')).toBe(false);
    expect(limiter.isAllowed('user-1')).toBe(false);
  });

  it('different clients have independent windows', () => {
    const limiter = new RateLimiter({ windowMs: 60_000, maxRequests: 2 });

    expect(limiter.isAllowed('user-1')).toBe(true);
    expect(limiter.isAllowed('user-1')).toBe(true);
    expect(limiter.isAllowed('user-1')).toBe(false); // user-1 limited

    expect(limiter.isAllowed('user-2')).toBe(true); // user-2 unaffected
    expect(limiter.isAllowed('user-2')).toBe(true);
    expect(limiter.isAllowed('user-2')).toBe(false); // user-2 now limited
  });

  it('allows requests again after the window has slid past old timestamps', () => {
    const limiter = new RateLimiter({ windowMs: 1000, maxRequests: 2 });

    limiter.isAllowed('user-1'); // t=0
    limiter.isAllowed('user-1'); // t=0
    expect(limiter.isAllowed('user-1')).toBe(false); // blocked

    // Advance time past the window
    vi.advanceTimersByTime(1001);

    expect(limiter.isAllowed('user-1')).toBe(true); // window has slid — old entries expired
  });

  it('uses a true sliding window, not fixed window', () => {
    const limiter = new RateLimiter({ windowMs: 1000, maxRequests: 2 });

    vi.setSystemTime(new Date(0));
    limiter.isAllowed('user-1'); // t=0ms

    vi.setSystemTime(new Date(900));
    limiter.isAllowed('user-1'); // t=900ms

    vi.setSystemTime(new Date(1100));
    // t=1100ms: window is [100ms, 1100ms]
    // Entry at t=900ms is still within window (900 > 100) → 1 active entry
    expect(limiter.isAllowed('user-1')).toBe(true); // allowed (2nd slot)
  });

  it('getRemainingRequests returns correct count', () => {
    const limiter = new RateLimiter({ windowMs: 60_000, maxRequests: 5 });

    expect(limiter.getRemainingRequests('user-1')).toBe(5);
    limiter.isAllowed('user-1');
    expect(limiter.getRemainingRequests('user-1')).toBe(4);
    limiter.isAllowed('user-1');
    limiter.isAllowed('user-1');
    expect(limiter.getRemainingRequests('user-1')).toBe(2);
  });

  it('getRemainingRequests returns 0 when rate limited', () => {
    const limiter = new RateLimiter({ windowMs: 60_000, maxRequests: 2 });

    limiter.isAllowed('user-1');
    limiter.isAllowed('user-1');
    limiter.isAllowed('user-1'); // blocked but count still tracked

    expect(limiter.getRemainingRequests('user-1')).toBe(0);
  });

  it('reset clears the request history for a client', () => {
    const limiter = new RateLimiter({ windowMs: 60_000, maxRequests: 2 });

    limiter.isAllowed('user-1');
    limiter.isAllowed('user-1');
    expect(limiter.isAllowed('user-1')).toBe(false);

    limiter.reset('user-1');
    expect(limiter.isAllowed('user-1')).toBe(true); // fresh start
  });

  it('reset does not affect other clients', () => {
    const limiter = new RateLimiter({ windowMs: 60_000, maxRequests: 1 });

    limiter.isAllowed('user-1');
    limiter.isAllowed('user-2');
    expect(limiter.isAllowed('user-2')).toBe(false);

    limiter.reset('user-1');
    expect(limiter.isAllowed('user-2')).toBe(false); // still limited
    expect(limiter.isAllowed('user-1')).toBe(true); // reset
  });

  it('handles a client with no prior requests in getRemainingRequests', () => {
    const limiter = new RateLimiter({ windowMs: 60_000, maxRequests: 10 });
    expect(limiter.getRemainingRequests('new-client')).toBe(10);
  });
});
