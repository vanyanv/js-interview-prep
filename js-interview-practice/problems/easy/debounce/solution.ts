/**
 * ⚠️  SOLUTION FILE — Do not open until you've attempted starter.ts!
 * ─────────────────────────────────────────────────────────────────
 */

export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  // The timer ID is captured in a closure — persists between calls
  let timerId: ReturnType<typeof setTimeout> | undefined;

  return function (...args: Parameters<T>): void {
    // Clear any pending invocation
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }

    // Schedule a new invocation
    timerId = setTimeout(() => {
      timerId = undefined;
      fn(...args);
    }, delay);
  };
}
