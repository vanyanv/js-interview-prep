/**
 * ⚠️  SOLUTION FILE — Do not open until you've attempted starter.ts!
 * ─────────────────────────────────────────────────────────────────
 */

export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  interval: number
): (...args: Parameters<T>) => void {
  // Track when fn was last actually invoked
  let lastCalledAt = 0;

  return function (...args: Parameters<T>): void {
    const now = Date.now();
    const timeSinceLast = now - lastCalledAt;

    if (timeSinceLast >= interval) {
      lastCalledAt = now;
      fn(...args);
    }
    // If within the interval, silently discard the call
  };
}
