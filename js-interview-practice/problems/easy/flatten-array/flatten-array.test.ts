import { describe, it, expect } from 'vitest';
import { flattenArray } from './solution';

describe('flattenArray', () => {
  it('flattens a simple nested array completely by default', () => {
    expect(flattenArray([1, [2, 3], [4, [5, 6]]])).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('returns an empty array for empty input', () => {
    expect(flattenArray([])).toEqual([]);
  });

  it('returns the same array if there is no nesting', () => {
    expect(flattenArray([1, 2, 3])).toEqual([1, 2, 3]);
  });

  it('flattens to depth 1', () => {
    expect(flattenArray([1, [2, 3], [4, [5, 6]]], 1)).toEqual([1, 2, 3, 4, [5, 6]]);
  });

  it('depth 0 returns array unchanged', () => {
    const input = [1, [2, 3], [4, [5, 6]]];
    // At depth 0, nested arrays are treated as elements (type cast needed for assertion)
    const result = flattenArray(input, 0);
    expect(result).toEqual([1, [2, 3], [4, [5, 6]]]);
  });

  it('flattens deeply nested arrays completely', () => {
    expect(flattenArray([1, [2, [3, [4, [5]]]]])).toEqual([1, 2, 3, 4, 5]);
  });

  it('flattens to exact depth 2', () => {
    expect(flattenArray([1, [2, [3, [4]]]], 2)).toEqual([1, 2, 3, [4]]);
  });

  it('handles depth greater than actual nesting level', () => {
    expect(flattenArray([1, [2, 3]], 100)).toEqual([1, 2, 3]);
  });

  it('handles string elements', () => {
    expect(flattenArray(['a', ['b', 'c'], ['d', ['e']]])).toEqual(['a', 'b', 'c', 'd', 'e']);
  });

  it('handles mixed types in nested array', () => {
    expect(flattenArray([1, ['a', true], [null, [undefined]]])).toEqual([
      1,
      'a',
      true,
      null,
      undefined,
    ]);
  });

  it('preserves element order', () => {
    const input = [[3, 4], [1, 2], [5]];
    expect(flattenArray(input)).toEqual([3, 4, 1, 2, 5]);
  });

  it('handles arrays with a single element', () => {
    expect(flattenArray([[[[42]]]])).toEqual([42]);
  });

  it('handles an array of empty arrays', () => {
    expect(flattenArray([[], [], []])).toEqual([]);
  });
});
