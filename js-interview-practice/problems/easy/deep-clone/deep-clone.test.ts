import { describe, it, expect } from 'vitest';
import { deepClone } from './solution';

describe('deepClone', () => {
  describe('primitives', () => {
    it('clones strings', () => {
      expect(deepClone('hello')).toBe('hello');
    });

    it('clones numbers', () => {
      expect(deepClone(42)).toBe(42);
    });

    it('clones booleans', () => {
      expect(deepClone(true)).toBe(true);
    });

    it('clones null', () => {
      expect(deepClone(null)).toBeNull();
    });

    it('clones undefined', () => {
      expect(deepClone(undefined)).toBeUndefined();
    });
  });

  describe('Date', () => {
    it('returns a new Date instance with the same time', () => {
      const original = new Date('2024-06-15T10:00:00.000Z');
      const clone = deepClone(original);

      expect(clone).not.toBe(original); // different reference
      expect(clone.getTime()).toBe(original.getTime());
      expect(clone instanceof Date).toBe(true);
    });

    it('mutating clone does not affect original', () => {
      // Use a mid-year local date to avoid timezone year-boundary issues
      const original = new Date(2024, 5, 15); // June 15, 2024 local time
      const clone = deepClone(original);
      clone.setFullYear(2030);
      expect(original.getFullYear()).toBe(2024);
    });
  });

  describe('arrays', () => {
    it('returns a new array', () => {
      const original = [1, 2, 3];
      const clone = deepClone(original);
      expect(clone).not.toBe(original);
      expect(clone).toEqual([1, 2, 3]);
    });

    it('deep clones nested arrays', () => {
      const original = [[1, 2], [3, 4]];
      const clone = deepClone(original);

      clone[0]?.push(99);
      expect(original[0]).toEqual([1, 2]);
    });

    it('clones arrays with mixed types', () => {
      const original = [1, 'two', null, { three: 3 }];
      const clone = deepClone(original);
      expect(clone).toEqual(original);
      expect(clone[3]).not.toBe(original[3]);
    });
  });

  describe('plain objects', () => {
    it('returns a new object', () => {
      const original = { a: 1 };
      const clone = deepClone(original);
      expect(clone).not.toBe(original);
      expect(clone).toEqual({ a: 1 });
    });

    it('deep clones nested objects', () => {
      const original = { outer: { inner: { value: 42 } } };
      const clone = deepClone(original);

      clone.outer.inner.value = 99;
      expect(original.outer.inner.value).toBe(42);
    });

    it('clones objects with Date values', () => {
      const date = new Date(2024, 5, 15); // June 15, 2024 local time
      const original = { createdAt: date };
      const clone = deepClone(original);

      clone.createdAt.setFullYear(2030);
      expect(original.createdAt.getFullYear()).toBe(2024);
    });

    it('clones objects with array values', () => {
      const original = { items: [1, 2, 3] };
      const clone = deepClone(original);

      clone.items.push(4);
      expect(original.items).toHaveLength(3);
    });
  });

  describe('Map', () => {
    it('returns a new Map with the same entries', () => {
      const original = new Map([
        ['a', 1],
        ['b', 2],
      ]);
      const clone = deepClone(original);

      expect(clone).not.toBe(original);
      expect(clone.get('a')).toBe(1);
      expect(clone.size).toBe(2);
    });

    it('deep clones Map values', () => {
      const nested = { value: 42 };
      const original = new Map([['key', nested]]);
      const clone = deepClone(original);

      const clonedValue = clone.get('key');
      if (clonedValue) clonedValue.value = 99;
      expect(nested.value).toBe(42);
    });
  });

  describe('Set', () => {
    it('returns a new Set with the same values', () => {
      const original = new Set([1, 2, 3]);
      const clone = deepClone(original);

      expect(clone).not.toBe(original);
      expect(clone.has(1)).toBe(true);
      expect(clone.size).toBe(3);
    });

    it('deep clones Set object values', () => {
      const nested = { id: 1 };
      const original = new Set([nested]);
      const clone = deepClone(original);

      const clonedItem = [...clone][0];
      if (clonedItem) clonedItem.id = 99;
      expect(nested.id).toBe(1);
    });
  });

  describe('complex nested structures', () => {
    it('clones a deeply nested mixed structure', () => {
      const original = {
        name: 'test',
        date: new Date('2024-01-01'),
        tags: ['a', 'b'],
        metadata: {
          count: 5,
          items: [{ id: 1 }, { id: 2 }],
        },
      };

      const clone = deepClone(original);

      // Mutate clone
      clone.name = 'changed';
      clone.tags.push('c');
      clone.metadata.items[0]!.id = 99;

      // Original unchanged
      expect(original.name).toBe('test');
      expect(original.tags).toHaveLength(2);
      expect(original.metadata.items[0]!.id).toBe(1);
    });
  });
});
