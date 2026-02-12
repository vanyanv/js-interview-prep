/*
Problem: Shortest Unsorted Continuous Subarray
Difficulty: Medium
Category: Array, Two Pointers, Stack, Greedy, Sorting, Monotonic Stack
LeetCode: #581
Pattern: Two Pointers (Boundary Detection)

Given an integer array nums, you need to find one continuous subarray that if you
only sort this subarray in ascending order, then the whole array will be sorted
in ascending order.

Return the length of the shortest such subarray.

Example 1:
  Input: nums = [2,6,4,8,10,9,15]
  Output: 5
  Explanation: You need to sort [6, 4, 8, 10, 9] in ascending order to make the whole array sorted in ascending order.

Example 2:
  Input: nums = [1,2,3,4]
  Output: 0

Example 3:
  Input: nums = [1]
  Output: 0

Example 4:
  Input: nums = [1,3,2,2,2]
  Output: 4

Constraints:
  - 1 <= nums.length <= 10^4
  - -10^5 <= nums[i] <= 10^5

Time Complexity: O(n)
Space Complexity: O(1)

Pattern Notes:
  - Find left boundary: leftmost position where array becomes unsorted
  - Find right boundary: rightmost position where array becomes unsorted
  - Find min and max in the unsorted subarray
  - Extend boundaries to include elements that would be out of place
  - Use two pointers to scan from both ends
*/

export const functionName = 'findUnsortedSubarray';

export const tests = [
  {
    input: [[2,6,4,8,10,9,15]],
    expected: 5
  },
  {
    input: [[1,2,3,4]],
    expected: 0
  },
  {
    input: [[1]],
    expected: 0
  },
  {
    input: [[1,3,2,2,2]],
    expected: 4
  },
  {
    input: [[2,1]],
    expected: 2
  },
  {
    input: [[3,2,1]],
    expected: 3
  },
  {
    input: [[1,2,4,5,3]],
    expected: 3
  },
  {
    input: [[1,3,2,4,5]],
    expected: 2
  },
  // All same values — already sorted
  {
    input: [[5,5,5,5,5]],
    expected: 0
  },
  // Entire array reversed — must sort the whole thing
  {
    input: [[5,4,3,2,1]],
    expected: 5
  },
  // Only the last element is out of place, needs to extend back
  {
    input: [[1,2,3,5,4]],
    expected: 2
  },
  // Negative numbers with unsorted middle
  {
    input: [[-5,-3,-4,-2,0,1]],
    expected: 2
  },
  // Larger input: sorted except one element displaced to the end
  {
    input: [[1,2,3,4,5,6,7,8,9,0]],
    expected: 10
  }
];

/**
 * Finds length of shortest unsorted continuous subarray
 * @param {number[]} nums - Input array
 * @return {number} Length of shortest unsorted subarray
 */
function findUnsortedSubarray(nums) {
    const n = nums.length;
    let left = -1;
    let right = -1;

    // Step 1: Find the leftmost and rightmost positions where array is unsorted
    // Scan from left to find first decreasing element
    for (let i = 0; i < n - 1; i++) {
        if (nums[i] > nums[i + 1]) {
            left = i;
            break;
        }
    }

    // If array is already sorted
    if (left === -1) return 0;

    // Scan from right to find first increasing element
    for (let i = n - 1; i > 0; i--) {
        if (nums[i] < nums[i - 1]) {
            right = i;
            break;
        }
    }

    // Step 2: Find min and max in the unsorted subarray
    let min = Infinity;
    let max = -Infinity;
    for (let i = left; i <= right; i++) {
        min = Math.min(min, nums[i]);
        max = Math.max(max, nums[i]);
    }

    // Step 3: Extend left boundary to include elements > min
    while (left > 0 && nums[left - 1] > min) {
        left--;
    }

    // Step 4: Extend right boundary to include elements < max
    while (right < n - 1 && nums[right + 1] < max) {
        right++;
    }

    return right - left + 1;
}

export default findUnsortedSubarray;