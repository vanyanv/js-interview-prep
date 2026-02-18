/**
 * ⚠️  SOLUTION FILE — Do not open until you've attempted starter.ts!
 * ─────────────────────────────────────────────────────────────────
 */

export function deepClone<T>(value: T): T {
  // Primitives (string, number, boolean, null, undefined, symbol, bigint)
  // are immutable and can be returned as-is
  if (value === null || typeof value !== 'object') {
    return value;
  }

  // Date — construct a new Date from the same timestamp
  if (value instanceof Date) {
    return new Date(value.getTime()) as T;
  }

  // Array — recursively clone each element
  if (Array.isArray(value)) {
    return value.map((item) => deepClone(item)) as T;
  }

  // Map — clone each key-value pair (both keys and values may be objects)
  if (value instanceof Map) {
    const clonedMap = new Map();
    value.forEach((v, k) => {
      clonedMap.set(deepClone(k), deepClone(v));
    });
    return clonedMap as T;
  }

  // Set — clone each value
  if (value instanceof Set) {
    const clonedSet = new Set();
    value.forEach((v) => {
      clonedSet.add(deepClone(v));
    });
    return clonedSet as T;
  }

  // Plain object — clone each own enumerable property
  const cloned: Record<string, unknown> = {};
  for (const key of Object.keys(value as Record<string, unknown>)) {
    cloned[key] = deepClone((value as Record<string, unknown>)[key]);
  }
  return cloned as T;
}
