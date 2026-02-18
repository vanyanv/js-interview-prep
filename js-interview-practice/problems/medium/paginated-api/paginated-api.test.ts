import { describe, it, expect } from 'vitest';
import { paginate, PaginatedResult } from './solution';

interface Item {
  id: string;
  value: string;
}

const items: Item[] = Array.from({ length: 25 }, (_, i) => ({
  id: String(i + 1),
  value: `item-${i + 1}`,
}));

const getId = (item: Item): string => item.id;

describe('paginate', () => {
  it('returns the first page without a cursor', () => {
    const result = paginate({ items, limit: 5, getId });
    expect(result.data).toHaveLength(5);
    expect(result.data[0]?.id).toBe('1');
    expect(result.data[4]?.id).toBe('5');
  });

  it('returns total count of all items', () => {
    const result = paginate({ items, limit: 5, getId });
    expect(result.total).toBe(25);
  });

  it('indicates hasMore=true when there are more pages', () => {
    const result = paginate({ items, limit: 5, getId });
    expect(result.hasMore).toBe(true);
  });

  it('returns a nextCursor when hasMore is true', () => {
    const result = paginate({ items, limit: 5, getId });
    expect(result.nextCursor).not.toBeNull();
    expect(typeof result.nextCursor).toBe('string');
  });

  it('returns hasMore=false on the last page', () => {
    const result = paginate({ items, limit: 25, getId });
    expect(result.hasMore).toBe(false);
    expect(result.nextCursor).toBeNull();
  });

  it('uses cursor to fetch the next page', () => {
    const page1 = paginate({ items, limit: 5, getId });
    expect(page1.nextCursor).not.toBeNull();

    const page2 = paginate({ items, limit: 5, cursor: page1.nextCursor!, getId });
    expect(page2.data[0]?.id).toBe('6');
    expect(page2.data[4]?.id).toBe('10');
  });

  it('can traverse all pages using cursors', () => {
    const allItems: Item[] = [];
    let cursor: string | null | undefined = undefined;

    while (true) {
      const result: PaginatedResult<Item> = paginate({
        items,
        limit: 7,
        cursor: cursor ?? undefined,
        getId,
      });
      allItems.push(...result.data);

      if (!result.hasMore) break;
      cursor = result.nextCursor;
    }

    expect(allItems).toHaveLength(25);
    expect(allItems[0]?.id).toBe('1');
    expect(allItems[24]?.id).toBe('25');
  });

  it('last page returns remaining items even if fewer than limit', () => {
    // 25 items, limit 10 → pages of 10, 10, 5
    const page1 = paginate({ items, limit: 10, getId });
    const page2 = paginate({ items, limit: 10, cursor: page1.nextCursor!, getId });
    const page3 = paginate({ items, limit: 10, cursor: page2.nextCursor!, getId });

    expect(page3.data).toHaveLength(5);
    expect(page3.hasMore).toBe(false);
    expect(page3.nextCursor).toBeNull();
  });

  it('handles empty items array', () => {
    const result = paginate({ items: [], limit: 10, getId });
    expect(result.data).toEqual([]);
    expect(result.hasMore).toBe(false);
    expect(result.nextCursor).toBeNull();
    expect(result.total).toBe(0);
  });

  it('handles limit larger than total items', () => {
    const result = paginate({ items, limit: 100, getId });
    expect(result.data).toHaveLength(25);
    expect(result.hasMore).toBe(false);
    expect(result.nextCursor).toBeNull();
  });

  it('handles invalid cursor gracefully (starts from beginning)', () => {
    const result = paginate({ items, limit: 5, cursor: 'invalid-cursor-xyz', getId });
    // Should not throw — either starts from beginning or returns empty
    expect(result.data).toBeDefined();
    expect(Array.isArray(result.data)).toBe(true);
  });
});
