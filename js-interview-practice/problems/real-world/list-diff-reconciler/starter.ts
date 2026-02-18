/**
 * LIST DIFF RECONCILER
 *
 * Produce minimal patch operations to transform oldList into newList.
 * Use getKey to identify items across lists (like React's key prop).
 */

export type PatchOp<T> =
  | { type: 'INSERT'; item: T; index: number }
  | { type: 'DELETE'; item: T; index: number }
  | { type: 'MOVE'; item: T; fromIndex: number; toIndex: number }
  | { type: 'UPDATE'; oldItem: T; newItem: T; index: number };

export interface DiffOptions<T> {
  getKey: (item: T) => string;
  isEqual?: (a: T, b: T) => boolean;
}

export function diff<T>(oldList: T[], newList: T[], options: DiffOptions<T>): PatchOp<T>[] {
  // TODO: implement diff
  throw new Error('Not implemented');
}
