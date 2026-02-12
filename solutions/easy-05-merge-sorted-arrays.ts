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

export const merge = (
  nums1: number[],
  m: number,
  nums2: number[],
  n: number,
): number[] => {
  if (m < 1) return nums2;
  if (n < 1) return nums1;
  //the end of nums1 array
  let end1 = m - 1;
  //the end of nums2 array
  let end2 = n - 1;
  //the end of the final arrays
  let endTotal = m + n - 1;

  while (end1 >= 0 && end2 >= 0) {
    if (nums2[end2] > nums1[end1]) {
      nums1[endTotal] = nums2[end2];

      end2--;
    } else {
      nums1[endTotal] = nums1[end1];

      end1--;
    }
    endTotal--;
  }

  while (end2 >= 0) {
    nums1[endTotal] = nums2[end2];
    endTotal--;
    end2--;
  }

  return nums1;
};

export const tests = [
  {
    input: [[1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3],
    expected: [1, 2, 2, 3, 5, 6],
  },
  {
    input: [[1], 1, [], 0],
    expected: [1],
  },
  {
    input: [[0], 0, [1], 1],
    expected: [1],
  },
  {
    input: [[4, 5, 6, 0, 0, 0], 3, [1, 2, 3], 3],
    expected: [1, 2, 3, 4, 5, 6],
  },
  {
    input: [[1, 2, 4, 5, 6, 0], 5, [3], 1],
    expected: [1, 2, 3, 4, 5, 6],
  },
  {
    input: [[2, 0], 1, [1], 1],
    expected: [1, 2],
  },
  {
    input: [[4, 0, 0, 0, 0, 0], 1, [1, 2, 3, 5, 6], 5],
    expected: [1, 2, 3, 4, 5, 6],
  },
  {
    input: [[1, 1, 1, 0, 0, 0], 3, [1, 1, 1], 3],
    expected: [1, 1, 1, 1, 1, 1],
  },
  {
    input: [[-5, -3, -1, 0, 0, 0, 0], 3, [-4, -2, 0, 2], 4],
    expected: [-5, -4, -3, -2, -1, 0, 2],
  },
  {
    input: [[0, 0, 0, 0, 0], 0, [1, 2, 3, 4, 5], 5],
    expected: [1, 2, 3, 4, 5],
  },
  {
    input: [[1, 3, 5, 7, 9, 0, 0, 0, 0, 0], 5, [2, 4, 6, 8, 10], 5],
    expected: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
];
