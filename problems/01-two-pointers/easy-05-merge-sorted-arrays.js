/*
Problem: Merge Sorted Array
Difficulty: Easy
Category: Arrays, Two Pointers, Sorting
LeetCode: #88
Pattern: Two Pointers (Same Direction - Backwards)

You are given two integer arrays nums1 and nums2, sorted in non-decreasing order,
and two integers m and n, representing the number of elements in nums1 and nums2
respectively.

Merge nums2 into nums1 as one sorted array.

The final sorted array should not be returned by the function, but instead be
stored inside the array nums1. To accommodate this, nums1 has a length of m + n,
where the first m elements denote the elements that should be merged, and the
last n elements are set to 0 and should be ignored. nums2 has a length of n.

Example 1:
  Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
  Output: [1,2,2,3,5,6]
  Explanation: The arrays we are merging are [1,2,3] and [2,5,6].
  The result of the merge is [1,2,2,3,5,6] with the underlined elements coming from nums1.

Example 2:
  Input: nums1 = [1], m = 1, nums2 = [], n = 0
  Output: [1]
  Explanation: The arrays we are merging are [1] and [].
  The result of the merge is [1].

Example 3:
  Input: nums1 = [0], m = 0, nums2 = [1], n = 1
  Output: [1]
  Explanation: The arrays we are merging are [] and [1].
  The result of the merge is [1].

Constraints:
  - nums1.length == m + n
  - nums2.length == n
  - 0 <= m, n <= 200
  - 1 <= m + n <= 200
  - -10^9 <= nums1[i], nums2[j] <= 10^9

Time Complexity: O(m + n)
Space Complexity: O(1)

Pattern Notes:
  - Use three pointers: one for each array's end and one for final position
  - Work backwards to avoid overwriting unprocessed elements
  - Compare elements from the end and place larger one at current position
  - Handle remaining elements if one array is exhausted
*/

export const functionName = 'merge';

export const tests = [
  {
    input: [[1,2,3,0,0,0], 3, [2,5,6], 3],
    expected: [1,2,2,3,5,6]
  },
  {
    input: [[1], 1, [], 0],
    expected: [1]
  },
  {
    input: [[0], 0, [1], 1],
    expected: [1]
  },
  {
    input: [[4,5,6,0,0,0], 3, [1,2,3], 3],
    expected: [1,2,3,4,5,6]
  },
  {
    input: [[1,2,4,5,6,0], 5, [3], 1],
    expected: [1,2,3,4,5,6]
  },
  {
    input: [[2,0], 1, [1], 1],
    expected: [1,2]
  },
  {
    input: [[4,0,0,0,0,0], 1, [1,2,3,5,6], 5],
    expected: [1,2,3,4,5,6]
  }
];

/**
 * Merges two sorted arrays in-place
 * @param {number[]} nums1 - First sorted array with extra space
 * @param {number} m - Number of elements in nums1
 * @param {number[]} nums2 - Second sorted array
 * @param {number} n - Number of elements in nums2
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
function merge(nums1, m, nums2, n) {
    // Three pointers approach - work backwards
    let p1 = m - 1;      // Pointer for last element in nums1
    let p2 = n - 1;      // Pointer for last element in nums2
    let p = m + n - 1;   // Pointer for last position in merged array

    // Merge from the back to avoid overwriting
    while (p1 >= 0 && p2 >= 0) {
        if (nums1[p1] > nums2[p2]) {
            nums1[p] = nums1[p1];
            p1--;
        } else {
            nums1[p] = nums2[p2];
            p2--;
        }
        p--;
    }

    // Copy remaining elements from nums2 (if any)
    // No need to copy remaining from nums1 as they're already in place
    while (p2 >= 0) {
        nums1[p] = nums2[p2];
        p2--;
        p--;
    }
}

export default merge;