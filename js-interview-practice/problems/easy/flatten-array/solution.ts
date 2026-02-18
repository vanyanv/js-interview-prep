/**
 * ⚠️  SOLUTION FILE — Do not open until you've attempted starter.ts!
 * ─────────────────────────────────────────────────────────────────
 */

export type NestedArray<T> = (T | NestedArray<T>)[];

export function flattenArray<T>(arr: NestedArray<T>, depth = Infinity): T[] {
  const result: T[] = [];

  for (const item of arr) {
    if (Array.isArray(item) && depth > 0) {
      // Recurse into nested arrays with decreased depth
      const nested = flattenArray(item as NestedArray<T>, depth - 1);
      result.push(...nested);
    } else {
      // Primitive values or depth === 0 — push as-is
      result.push(item as T);
    }
  }

  return result;
}
