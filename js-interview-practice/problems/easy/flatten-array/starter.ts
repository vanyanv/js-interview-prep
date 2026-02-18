/**
 * FLATTEN ARRAY
 *
 * Flatten a nested array to a given depth.
 * Do NOT use Array.prototype.flat().
 */

export type NestedArray<T> = (T | NestedArray<T>)[];

export function flattenArray<T>(arr: NestedArray<T>, depth?: number): T[] {
  // TODO: implement flattenArray
  throw new Error('Not implemented');
}
