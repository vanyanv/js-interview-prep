/**
 * MEMOIZE
 *
 * Implement a memoize function that caches the results of function calls.
 * Subsequent calls with the same arguments return the cached result.
 */

export function memoize<T extends (...args: unknown[]) => unknown>(fn: T): T {
  const cache = new Map<string, unknown>();
  // TODO: implement memoize
  return ((...args: unknown[]) => {
    const key = args.toString();

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}
