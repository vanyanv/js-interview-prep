/*
Problem: 4Sum II
Difficulty: Medium
Category: Arrays, Hash Map
LeetCode: #454
Pattern: Two-Group Hash Map Optimization

Given four integer arrays nums1, nums2, nums3, and nums4 all of length n,
return the number of tuples (i, j, k, l) such that:

- 0 <= i, j, k, l < n
- nums1[i] + nums2[j] + nums3[k] + nums4[l] == 0

Example 1:
  Input: nums1 = [1,2], nums2 = [-2,-1], nums3 = [-1,2], nums4 = [0,2]
  Output: 2
  Explanation:
  The two tuples are:
  1. (0, 0, 0, 1) -> nums1[0] + nums2[0] + nums3[0] + nums4[1] = 1 + (-2) + (-1) + 2 = 0
  2. (1, 1, 0, 0) -> nums1[1] + nums2[1] + nums3[0] + nums4[0] = 2 + (-1) + (-1) + 0 = 0

Example 2:
  Input: nums1 = [0], nums2 = [0], nums3 = [0], nums4 = [0]
  Output: 1

Example 3:
  Input: nums1 = [0,1,-1], nums2 = [-1,1,0], nums3 = [0,0,1], nums4 = [1,0,-1]
  Output: 17

Constraints:
  - n == nums1.length
  - n == nums2.length
  - n == nums3.length
  - n == nums4.length
  - 1 <= n <= 200
  - -2^28 <= nums1[i], nums2[i], nums3[i], nums4[i] <= 2^28

Time Complexity: O(n^2)
Space Complexity: O(n^2)

Hash Map Pattern Notes:
  - Split into two groups: (nums1, nums2) and (nums3, nums4)
  - Store all possible sums from first two arrays in Map with frequencies
  - For each sum from last two arrays, check if negation exists in Map
  - Add frequency count to result (multiple ways to form same sum)
  - Reduces O(n^4) brute force to O(n^2) with hash map
*/

export const functionName = 'fourSumCount';

export const tests = [
  {
    input: [[1, 2], [-2, -1], [-1, 2], [0, 2]],
    expected: 2
  },
  {
    input: [[0], [0], [0], [0]],
    expected: 1
  },
  {
    input: [[0, 1, -1], [-1, 1, 0], [0, 0, 1], [1, 0, -1]],
    expected: 17
  },
  {
    input: [[-1, -1], [-1, 1], [-1, 1], [1, -1]],
    expected: 6
  },
  {
    input: [[1, 2, 3], [4, 5, 6], [7, 8, 9], [-1, -2, -3]],
    expected: 0
  },
  {
    input: [[1, 1, 1], [1, 1, 1], [-1, -1, -1], [-1, -1, -1]],
    expected: 81
  },
  {
    input: [[0, 0], [0, 0], [0, 0], [0, 0]],
    expected: 16
  },
  {
    input: [[1, -2, 3], [-1, 2, -3], [0, 1, -1], [-1, 0, 1]],
    expected: 12
  },
  // No tuples sum to zero
  {
    input: [[1, 2], [3, 4], [5, 6], [7, 8]],
    expected: 0
  },
  // Single element arrays that do sum to zero
  {
    input: [[5], [-3], [-7], [5]],
    expected: 1
  },
  // Single element arrays that don't sum to zero
  {
    input: [[1], [2], [3], [4]],
    expected: 0
  },
  // All same values, all zeros - every combination sums to 0: 2^4 = 16
  {
    input: [[0, 0], [0, 0], [0, 0], [0, 0]],
    expected: 16
  },
  // Larger arrays with symmetrical values
  // nums1+nums2 sums: -2(1), -1(2), 0(3), 1(2), 2(1)
  // nums3+nums4 sums: -2(1), -1(2), 0(3), 1(2), 2(1)
  // count = 1*1 + 2*2 + 3*3 + 2*2 + 1*1 = 1+4+9+4+1 = 19
  {
    input: [[-1, 0, 1], [-1, 0, 1], [1, 0, -1], [1, 0, -1]],
    expected: 19
  }
];