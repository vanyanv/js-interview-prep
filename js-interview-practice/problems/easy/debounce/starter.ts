/**
 * DEBOUNCE
 *
 * Implement a debounce function that delays invoking `fn` until after `delay`
 * milliseconds have elapsed since the LAST call to the debounced function.
 *
 * If called again before the delay expires, the timer resets.
 */

export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  // TODO: implement debounce
  throw new Error('Not implemented');
}
