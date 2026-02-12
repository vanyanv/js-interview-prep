/*
Problem: Merge Two Sorted Arrays (Easy Version)
Difficulty: Easy
Category: Two Pointers, Arrays, Merge
LeetCode: #88 (Modified)
Pattern: Two Pointers + Merge Process
Mixed Patterns: Two Pointers + Array Manipulation

Given two sorted integer arrays nums1 and nums2, merge nums2 into nums1
as one sorted array and return the merged array.

Note: This is the easier version where we return a new array instead of
modifying nums1 in-place.

Example 1:
  Input: nums1 = [1,2,3], nums2 = [2,5,6]
  Output: [1,2,2,3,5,6]
  Explanation: Arrays are merged and sorted.

Example 2:
  Input: nums1 = [1], nums2 = []
  Output: [1]
  Explanation: nums2 is empty, return nums1.

Example 3:
  Input: nums1 = [], nums2 = [1]
  Output: [1]
  Explanation: nums1 is empty, return nums2.

Example 4:
  Input: nums1 = [4,5,6], nums2 = [1,2,3]
  Output: [1,2,3,4,5,6]
  Explanation: All elements from nums2 come before nums1.

Constraints:
  - 0 <= nums1.length, nums2.length <= 200
  - 1 <= nums1.length + nums2.length <= 200
  - -10^9 <= nums1[i], nums2[j] <= 10^9

Time Complexity: O(m + n) where m = nums1.length, n = nums2.length
Space Complexity: O(m + n) for the result array

Pattern Notes:
  - Use two pointers to traverse both arrays simultaneously
  - Compare elements and add smaller one to result
  - Handle remaining elements after one array is exhausted
  - This combines merge sort logic with two pointers technique

Interview Notes:
  - Follow-up: Can you do it in-place? (leads to LeetCode #88)
  - Follow-up: What if arrays aren't sorted?
  - Common mistake: Forgetting to handle remaining elements
*/

export const functionName = 'mergeSortedArrays';

export const tests = [
  {
    input: [[1,2,3], [2,5,6]],
    expected: [1,2,2,3,5,6]
  },
  {
    input: [[1], []],
    expected: [1]
  },
  {
    input: [[], [1]],
    expected: [1]
  },
  {
    input: [[4,5,6], [1,2,3]],
    expected: [1,2,3,4,5,6]
  },
  {
    input: [[], []],
    expected: []
  },
  {
    input: [[1,3,5], [2,4,6]],
    expected: [1,2,3,4,5,6]
  },
  {
    input: [[1,1,1], [2,2,2]],
    expected: [1,1,1,2,2,2]
  },
  {
    input: [[-1,0,1], [-2,-1,0]],
    expected: [-2,-1,-1,0,0,1]
  }
];

/**
 * Merges two sorted arrays into one sorted array
 * @param {number[]} nums1 - First sorted array
 * @param {number[]} nums2 - Second sorted array
 * @return {number[]} Merged sorted array
 */
function mergeSortedArrays(nums1, nums2) {
    const result = [];
    let i = 0; // Pointer for nums1
    let j = 0; // Pointer for nums2

    // Merge arrays while both have elements
    while (i < nums1.length && j < nums2.length) {
        if (nums1[i] <= nums2[j]) {
            result.push(nums1[i]);
            i++;
        } else {
            result.push(nums2[j]);
            j++;
        }
    }

    // Add remaining elements from nums1
    while (i < nums1.length) {
        result.push(nums1[i]);
        i++;
    }

    // Add remaining elements from nums2
    while (j < nums2.length) {
        result.push(nums2[j]);
        j++;
    }

    return result;
}

export default mergeSortedArrays;