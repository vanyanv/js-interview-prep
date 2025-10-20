/*
Problem: Interval List Intersections
Difficulty: Medium
Category: Array, Two Pointers
LeetCode: #986
Pattern: Two Pointers (Merge Intervals)

You are given two lists of closed intervals, firstList and secondList, where
firstList[i] = [starti, endi] and secondList[j] = [startj, endj]. Each list of
intervals is pairwise disjoint and in sorted order.

Return the intersection of these two interval lists.

A closed interval [a, b] (with a <= b) denotes the set of real numbers x with a <= x <= b.

The intersection of two closed intervals is a set of real numbers that are contained
in both intervals. For example, the intersection of [1, 3] and [2, 4] is [2, 3].

Example 1:
  Input: firstList = [[0,2],[5,10],[13,23],[24,25]], secondList = [[1,5],[8,12],[15,24],[25,26]]
  Output: [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]

Example 2:
  Input: firstList = [[1,3],[5,9]], secondList = []
  Output: []

Example 3:
  Input: firstList = [], secondList = [[4,8],[10,12]]
  Output: []

Constraints:
  - 0 <= firstList.length, secondList.length <= 1000
  - firstList.length + secondList.length >= 1
  - 0 <= starti, endi, startj, endj <= 10^9
  - endi >= starti and endj >= startj

Time Complexity: O(m + n) where m and n are lengths of the lists
Space Complexity: O(1) excluding result array

Pattern Notes:
  - Use two pointers, one for each interval list
  - Check for intersection: max(start1, start2) <= min(end1, end2)
  - Intersection interval: [max(start1, start2), min(end1, end2)]
  - Advance pointer of interval that ends first
  - Continue until one list is exhausted
*/

export const functionName = 'intervalIntersection';

export const tests = [
  {
    input: [[[0,2],[5,10],[13,23],[24,25]], [[1,5],[8,12],[15,24],[25,26]]],
    expected: [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]
  },
  {
    input: [[[1,3],[5,9]], []],
    expected: []
  },
  {
    input: [[], [[4,8],[10,12]]],
    expected: []
  },
  {
    input: [[[0,2]], [[1,3]]],
    expected: [[1,2]]
  },
  {
    input: [[[3,5],[9,20]], [[4,5],[7,10],[11,12],[14,15],[16,20]]],
    expected: [[4,5],[9,10],[11,12],[14,15],[16,20]]
  },
  {
    input: [[[1,7]], [[3,10]]],
    expected: [[3,7]]
  },
  {
    input: [[[4,11],[12,16],[17,19]], [[3,6],[7,8],[9,10],[14,15],[16,20]]],
    expected: [[4,6],[14,15],[16,16],[17,19]]
  },
  {
    input: [[[5,10]], [[5,6],[13,15]]],
    expected: [[5,6]]
  }
];

/**
 * Finds intersections between two lists of intervals
 * @param {number[][]} firstList - First list of intervals
 * @param {number[][]} secondList - Second list of intervals
 * @return {number[][]} List of intersection intervals
 */
function intervalIntersection(firstList, secondList) {
    const result = [];
    let i = 0; // Pointer for firstList
    let j = 0; // Pointer for secondList

    while (i < firstList.length && j < secondList.length) {
        const [start1, end1] = firstList[i];
        const [start2, end2] = secondList[j];

        // Check if intervals intersect
        // Two intervals intersect if max(start1, start2) <= min(end1, end2)
        const intersectionStart = Math.max(start1, start2);
        const intersectionEnd = Math.min(end1, end2);

        if (intersectionStart <= intersectionEnd) {
            // Intervals intersect
            result.push([intersectionStart, intersectionEnd]);
        }

        // Move the pointer of the interval that ends first
        // This ensures we don't miss any potential intersections
        if (end1 < end2) {
            i++;
        } else {
            j++;
        }
    }

    return result;
}

export default intervalIntersection;