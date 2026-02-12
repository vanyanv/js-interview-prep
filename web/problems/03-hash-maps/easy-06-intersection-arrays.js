/*
Problem: Intersection of Two Arrays
Difficulty: Easy
Category: Arrays, Hash Set
LeetCode: #349
Pattern: Set Intersection

Given two integer arrays nums1 and nums2, return an array of their intersection.
Each element in the result must be unique and you may return the result in any order.

Example 1:
  Input: nums1 = [1,2,2,1], nums2 = [2,2]
  Output: [2]

Example 2:
  Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
  Output: [9,4]
  Explanation: [4,9] is also accepted.

Example 3:
  Input: nums1 = [1,2,3], nums2 = [4,5,6]
  Output: []

Example 4:
  Input: nums1 = [1,2], nums2 = [1,1]
  Output: [1]

Constraints:
  - 1 <= nums1.length, nums2.length <= 1000
  - 0 <= nums1[i], nums2[i] <= 1000

Time Complexity: O(n + m)
Space Complexity: O(min(n, m))

Hash Set Pattern Notes:
  - Convert smaller array to Set for O(1) lookups
  - Iterate through larger array checking membership
  - Use Set for result to avoid duplicates
  - Set intersection can be done with filter + has
  - Consider space optimization by using smaller array as Set
*/

export const functionName = 'intersection';

export const tests = [
  {
    input: [[1, 2, 2, 1], [2, 2]],
    expected: [2]
  },
  {
    input: [[4, 9, 5], [9, 4, 9, 8, 4]],
    expected: [9, 4]
  },
  {
    input: [[1, 2, 3], [4, 5, 6]],
    expected: []
  },
  {
    input: [[1, 2], [1, 1]],
    expected: [1]
  },
  {
    input: [[1, 2, 3, 4, 5], [3, 4, 5, 6, 7]],
    expected: [3, 4, 5]
  },
  {
    input: [[1], [1]],
    expected: [1]
  },
  {
    input: [[], [1, 2, 3]],
    expected: []
  },
  {
    input: [[1, 1, 1], [1]],
    expected: [1]
  },
  // Both arrays identical
  {
    input: [[3, 3, 3], [3, 3, 3]],
    expected: [3]
  },
  // Both empty arrays
  {
    input: [[], []],
    expected: []
  },
  // Larger arrays with partial overlap
  {
    input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [5, 10, 15, 20, 25]],
    expected: [5, 10]
  },
  // All-same-values in both arrays, same value
  {
    input: [[7, 7, 7, 7], [7, 7]],
    expected: [7]
  }
];