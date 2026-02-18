/**
 * THROTTLE
 *
 * Implement a throttle function that ensures `fn` is called at most once per
 * `interval` milliseconds. The first call fires immediately (leading edge).
 * Subsequent calls within the interval are dropped.
 */

export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  interval: number
): (...args: Parameters<T>) => void {
  // TODO: implement throttle
  throw new Error('Not implemented');
}
