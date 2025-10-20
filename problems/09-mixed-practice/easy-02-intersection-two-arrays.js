/*
Problem: Intersection of Two Arrays
Difficulty: Easy
Category: Hash Map, Set, Two Pointers, Arrays
LeetCode: #349
Pattern: Hash Map + Set Operations
Mixed Patterns: Hash Map + Set + Multiple Solution Approaches

Given two integer arrays nums1 and nums2, return an array of their intersection.
Each element in the result must be unique and you may return the result in any order.

Example 1:
  Input: nums1 = [1,2,2,1], nums2 = [2,2]
  Output: [2]
  Explanation: 2 is the only common element.

Example 2:
  Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
  Output: [9,4] or [4,9]
  Explanation: Both 4 and 9 are common elements.

Example 3:
  Input: nums1 = [1,2,3], nums2 = [4,5,6]
  Output: []
  Explanation: No common elements.

Example 4:
  Input: nums1 = [1], nums2 = [1]
  Output: [1]
  Explanation: Single common element.

Constraints:
  - 1 <= nums1.length, nums2.length <= 1000
  - 0 <= nums1[i], nums2[j] <= 1000

Time Complexity: O(m + n) where m = nums1.length, n = nums2.length
Space Complexity: O(min(m, n)) for the set storage

Pattern Notes:
  - Multiple approaches: Hash Set, Two Sets, Sort + Two Pointers
  - Hash Set approach: Convert one array to set, check other array
  - Two Sets approach: Convert both to sets, use set intersection
  - Sort + Two Pointers: Sort both arrays, use two pointers
  - Focus on Set operations and hash map usage

Interview Notes:
  - Follow-up: What if arrays are sorted? (Two pointers approach)
  - Follow-up: What if we need to count duplicates? (LeetCode #350)
  - Follow-up: Memory optimization when one array is much larger?
  - Discuss trade-offs between different approaches
*/

export const functionName = 'intersection';

export const tests = [
  {
    input: [[1,2,2,1], [2,2]],
    expected: [2]
  },
  {
    input: [[4,9,5], [9,4,9,8,4]],
    expected: [4,9]
  },
  {
    input: [[1,2,3], [4,5,6]],
    expected: []
  },
  {
    input: [[1], [1]],
    expected: [1]
  },
  {
    input: [[1,2], [1,1]],
    expected: [1]
  },
  {
    input: [[3,1,2], [1,1]],
    expected: [1]
  },
  {
    input: [[1,2,3,4,5], [3,4,5,6,7]],
    expected: [3,4,5]
  },
  {
    input: [[0], [0,0]],
    expected: [0]
  }
];

/**
 * Finds intersection of two arrays using Hash Set approach
 * @param {number[]} nums1 - First array
 * @param {number[]} nums2 - Second array
 * @return {number[]} Array containing unique intersection elements
 */
function intersection(nums1, nums2) {
    // Approach 1: Hash Set (most common in interviews)
    const set1 = new Set(nums1);
    const resultSet = new Set();

    for (const num of nums2) {
        if (set1.has(num)) {
            resultSet.add(num);
        }
    }

    return Array.from(resultSet);
}

/**
 * Alternative: Two Sets approach
 * @param {number[]} nums1 - First array
 * @param {number[]} nums2 - Second array
 * @return {number[]} Array containing unique intersection elements
 */
function intersectionTwoSets(nums1, nums2) {
    const set1 = new Set(nums1);
    const set2 = new Set(nums2);
    const result = [];

    // Iterate through smaller set for optimization
    const smallerSet = set1.size <= set2.size ? set1 : set2;
    const largerSet = set1.size > set2.size ? set1 : set2;

    for (const num of smallerSet) {
        if (largerSet.has(num)) {
            result.push(num);
        }
    }

    return result;
}

/**
 * Alternative: Sort + Two Pointers approach
 * @param {number[]} nums1 - First array
 * @param {number[]} nums2 - Second array
 * @return {number[]} Array containing unique intersection elements
 */
function intersectionSortedPointers(nums1, nums2) {
    nums1.sort((a, b) => a - b);
    nums2.sort((a, b) => a - b);

    const result = [];
    let i = 0, j = 0;

    while (i < nums1.length && j < nums2.length) {
        if (nums1[i] === nums2[j]) {
            // Add to result if not already present (ensure uniqueness)
            if (result.length === 0 || result[result.length - 1] !== nums1[i]) {
                result.push(nums1[i]);
            }
            i++;
            j++;
        } else if (nums1[i] < nums2[j]) {
            i++;
        } else {
            j++;
        }
    }

    return result;
}

export default intersection;