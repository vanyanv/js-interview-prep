/**
 * ⚠️  SOLUTION FILE — Do not open until you've attempted starter.ts!
 * ─────────────────────────────────────────────────────────────────
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

function defaultIsEqual<T>(a: T, b: T): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

export function diff<T>(oldList: T[], newList: T[], options: DiffOptions<T>): PatchOp<T>[] {
  const { getKey, isEqual = defaultIsEqual } = options;
  const ops: PatchOp<T>[] = [];

  // Index each list by key for O(1) lookup
  const oldByKey = new Map<string, { item: T; index: number }>();
  const newByKey = new Map<string, { item: T; index: number }>();

  oldList.forEach((item, index) => oldByKey.set(getKey(item), { item, index }));
  newList.forEach((item, index) => newByKey.set(getKey(item), { item, index }));

  // Pass 1: Deletions — items in old but not in new
  for (const [key, { item, index }] of oldByKey) {
    if (!newByKey.has(key)) {
      ops.push({ type: 'DELETE', item, index });
    }
  }

  // Pass 2: Insertions, updates, and moves — walk through new list
  for (const [key, { item: newItem, index: newIndex }] of newByKey) {
    const oldEntry = oldByKey.get(key);

    if (!oldEntry) {
      // New item — INSERT
      ops.push({ type: 'INSERT', item: newItem, index: newIndex });
    } else {
      const { item: oldItem, index: oldIndex } = oldEntry;

      // Check if the item's data changed
      if (!isEqual(oldItem, newItem)) {
        ops.push({ type: 'UPDATE', oldItem, newItem, index: newIndex });
      }

      // Check if the item moved position
      if (oldIndex !== newIndex) {
        ops.push({ type: 'MOVE', item: newItem, fromIndex: oldIndex, toIndex: newIndex });
      }
    }
  }

  return ops;
}
