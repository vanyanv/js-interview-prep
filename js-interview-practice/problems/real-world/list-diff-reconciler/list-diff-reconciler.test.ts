import { describe, it, expect } from 'vitest';
import { diff, PatchOp } from './solution';

interface Item {
  id: string;
  name: string;
  value?: number;
}

const getKey = (item: Item): string => item.id;

function opTypes(ops: PatchOp<Item>[]): string[] {
  return ops.map((op) => op.type);
}

describe('diff', () => {
  it('returns empty array when lists are identical', () => {
    const list = [
      { id: '1', name: 'Alice' },
      { id: '2', name: 'Bob' },
    ];
    const ops = diff(list, list, { getKey });
    expect(ops).toHaveLength(0);
  });

  it('detects insertions', () => {
    const oldList: Item[] = [{ id: '1', name: 'Alice' }];
    const newList: Item[] = [{ id: '1', name: 'Alice' }, { id: '2', name: 'Bob' }];

    const ops = diff(oldList, newList, { getKey });
    const inserts = ops.filter((op) => op.type === 'INSERT');
    expect(inserts).toHaveLength(1);
    if (inserts[0]?.type === 'INSERT') {
      expect(inserts[0].item.id).toBe('2');
    }
  });

  it('detects deletions', () => {
    const oldList: Item[] = [{ id: '1', name: 'Alice' }, { id: '2', name: 'Bob' }];
    const newList: Item[] = [{ id: '1', name: 'Alice' }];

    const ops = diff(oldList, newList, { getKey });
    const deletes = ops.filter((op) => op.type === 'DELETE');
    expect(deletes).toHaveLength(1);
    if (deletes[0]?.type === 'DELETE') {
      expect(deletes[0].item.id).toBe('2');
    }
  });

  it('detects updates when item data changes', () => {
    const oldList: Item[] = [{ id: '1', name: 'Alice' }];
    const newList: Item[] = [{ id: '1', name: 'Alice Updated' }];

    const ops = diff(oldList, newList, { getKey });
    const updates = ops.filter((op) => op.type === 'UPDATE');
    expect(updates).toHaveLength(1);
    if (updates[0]?.type === 'UPDATE') {
      expect(updates[0].newItem.name).toBe('Alice Updated');
    }
  });

  it('does not generate UPDATE when items are equal', () => {
    const oldList: Item[] = [{ id: '1', name: 'Alice', value: 42 }];
    const newList: Item[] = [{ id: '1', name: 'Alice', value: 42 }];

    const ops = diff(oldList, newList, { getKey });
    expect(opTypes(ops)).not.toContain('UPDATE');
  });

  it('detects moves when items change position', () => {
    const oldList: Item[] = [{ id: '1', name: 'Alice' }, { id: '2', name: 'Bob' }];
    const newList: Item[] = [{ id: '2', name: 'Bob' }, { id: '1', name: 'Alice' }];

    const ops = diff(oldList, newList, { getKey });
    const moves = ops.filter((op) => op.type === 'MOVE');
    expect(moves.length).toBeGreaterThan(0);
  });

  it('handles complete list replacement', () => {
    const oldList: Item[] = [{ id: '1', name: 'Alice' }, { id: '2', name: 'Bob' }];
    const newList: Item[] = [{ id: '3', name: 'Charlie' }, { id: '4', name: 'Dave' }];

    const ops = diff(oldList, newList, { getKey });
    const inserts = ops.filter((op) => op.type === 'INSERT');
    const deletes = ops.filter((op) => op.type === 'DELETE');

    expect(inserts).toHaveLength(2);
    expect(deletes).toHaveLength(2);
  });

  it('handles empty old list (all insertions)', () => {
    const oldList: Item[] = [];
    const newList: Item[] = [{ id: '1', name: 'Alice' }, { id: '2', name: 'Bob' }];

    const ops = diff(oldList, newList, { getKey });
    expect(opTypes(ops)).toEqual(['INSERT', 'INSERT']);
  });

  it('handles empty new list (all deletions)', () => {
    const oldList: Item[] = [{ id: '1', name: 'Alice' }, { id: '2', name: 'Bob' }];
    const newList: Item[] = [];

    const ops = diff(oldList, newList, { getKey });
    expect(opTypes(ops)).toEqual(['DELETE', 'DELETE']);
  });

  it('handles both empty lists', () => {
    const ops = diff([], [], { getKey });
    expect(ops).toHaveLength(0);
  });

  it('uses custom isEqual function', () => {
    const oldList: Item[] = [{ id: '1', name: 'Alice', value: 1 }];
    const newList: Item[] = [{ id: '1', name: 'Alice', value: 2 }];

    // Custom isEqual only checks name, ignores value
    const ops = diff(oldList, newList, {
      getKey,
      isEqual: (a, b) => a.name === b.name,
    });

    // Should NOT generate an UPDATE since names are equal
    const updates = ops.filter((op) => op.type === 'UPDATE');
    expect(updates).toHaveLength(0);
  });

  it('deletions come before insertions in result', () => {
    const oldList: Item[] = [{ id: '1', name: 'Alice' }];
    const newList: Item[] = [{ id: '2', name: 'Bob' }];

    const ops = diff(oldList, newList, { getKey });
    const firstDeleteIdx = ops.findIndex((op) => op.type === 'DELETE');
    const firstInsertIdx = ops.findIndex((op) => op.type === 'INSERT');

    expect(firstDeleteIdx).toBeLessThan(firstInsertIdx);
  });

  it('captures correct indices', () => {
    const oldList: Item[] = [
      { id: '1', name: 'A' },
      { id: '2', name: 'B' },
      { id: '3', name: 'C' },
    ];
    const newList: Item[] = [
      { id: '1', name: 'A' },
      { id: '4', name: 'D' }, // new at index 1
      { id: '3', name: 'C' }, // moved to index 2 (was 2, still 2 = no move)
    ];

    const ops = diff(oldList, newList, { getKey });

    const insert = ops.find((op) => op.type === 'INSERT');
    if (insert?.type === 'INSERT') {
      expect(insert.index).toBe(1);
      expect(insert.item.id).toBe('4');
    }

    const del = ops.find((op) => op.type === 'DELETE');
    if (del?.type === 'DELETE') {
      expect(del.item.id).toBe('2');
    }
  });
});
