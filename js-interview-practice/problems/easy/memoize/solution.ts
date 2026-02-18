/**
 * ⚠️  SOLUTION FILE — Do not open until you've attempted starter.ts!
 * ─────────────────────────────────────────────────────────────────
 */

export function memoize<T extends (...args: unknown[]) => unknown>(fn: T): T {
  // Map from serialized args → cached return value
  const cache = new Map<string, unknown>();

  const memoized = function (...args: Parameters<T>): ReturnType<T> {
    const key = JSON.stringify(args);

    // Use .has() instead of checking the value — the value might legitimately be undefined
    if (cache.has(key)) {
      return cache.get(key) as ReturnType<T>;
    }

    const result = fn(...args) as ReturnType<T>;
    cache.set(key, result);
    return result;
  };

  return memoized as T;
}
