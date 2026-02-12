/*
Problem: 4Sum
Difficulty: Medium
Category: Array, Two Pointers, Sorting
LeetCode: #18
Pattern: Two Pointers (Nested Fixed + Two Pointers)

Given an array nums of n integers, return an array of all the unique quadruplets
[nums[a], nums[b], nums[c], nums[d]] such that:

- 0 <= a, b, c, d < n
- a, b, c, and d are distinct.
- nums[a] + nums[b] + nums[c] + nums[d] == target

You may return the answer in any order.

Example 1:
  Input: nums = [1,0,-1,0,-2,2], target = 0
  Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]

Example 2:
  Input: nums = [2,2,2,2,2], target = 8
  Output: [[2,2,2,2]]

Example 3:
  Input: nums = [1000000000,1000000000,1000000000,1000000000], target = -294967296
  Output: []

Constraints:
  - 1 <= nums.length <= 200
  - -10^9 <= nums[i] <= 10^9
  - -10^9 <= target <= 10^9

Time Complexity: O(n³)
Space Complexity: O(1) excluding result array

Pattern Notes:
  - Sort array first to enable two pointers
  - Use nested loops to fix first two elements
  - Use two pointers for last two elements
  - Skip duplicates at all levels to avoid duplicate quadruplets
  - Early termination optimizations for large numbers
*/

export const functionName = 'fourSum';

export const tests = [
  {
    input: [[1,0,-1,0,-2,2], 0],
    expected: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
  },
  {
    input: [[2,2,2,2,2], 8],
    expected: [[2,2,2,2]]
  },
  {
    input: [[1000000000,1000000000,1000000000,1000000000], -294967296],
    expected: []
  },
  {
    input: [[-3,-2,-1,0,0,1,2,3], 0],
    expected: [[-3,-2,2,3],[-3,-1,1,3],[-3,0,0,3],[-3,0,1,2],[-2,-1,0,3],[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
  },
  {
    input: [[1,-2,-5,-4,-3,3,3,5], -11],
    expected: [[-5,-4,-3,1]]
  },
  {
    input: [[], 0],
    expected: []
  },
  {
    input: [[0], 0],
    expected: []
  },
  {
    input: [[5,5,3,5,1,-5,1,-2], 4],
    expected: [[-5,1,3,5],[-2,1,1,5]]
  },
  // Boundary: exactly 4 elements that sum to target
  {
    input: [[1,2,3,4], 10],
    expected: [[1,2,3,4]]
  },
  // All zeros target zero
  {
    input: [[0,0,0,0,0], 0],
    expected: [[0,0,0,0]]
  },
  // All same values, target is 4x value
  {
    input: [[3,3,3,3,3,3], 12],
    expected: [[3,3,3,3]]
  },
  // Negatives only
  {
    input: [[-5,-4,-3,-2,-1], -10],
    expected: [[-5,-4,-2,1]]
  },
  // Three elements: not enough for quadruplet
  {
    input: [[1,2,3], 6],
    expected: []
  }
];

/**
 * Finds all unique quadruplets that sum to target
 * @param {number[]} nums - Array of integers
 * @param {number} target - Target sum
 * @return {number[][]} Array of unique quadruplets
 */
function fourSum(nums, target) {
    if (nums.length < 4) return [];

    nums.sort((a, b) => a - b);
    const result = [];
    const n = nums.length;

    for (let i = 0; i < n - 3; i++) {
        // Skip duplicates for first element
        if (i > 0 && nums[i] === nums[i - 1]) continue;

        // Early termination: if minimum possible sum > target
        if (nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3] > target) break;

        // Early termination: if maximum possible sum < target
        if (nums[i] + nums[n - 3] + nums[n - 2] + nums[n - 1] < target) continue;

        for (let j = i + 1; j < n - 2; j++) {
            // Skip duplicates for second element
            if (j > i + 1 && nums[j] === nums[j - 1]) continue;

            // Early termination for inner loop
            if (nums[i] + nums[j] + nums[j + 1] + nums[j + 2] > target) break;
            if (nums[i] + nums[j] + nums[n - 2] + nums[n - 1] < target) continue;

            let left = j + 1;
            let right = n - 1;

            while (left < right) {
                const sum = nums[i] + nums[j] + nums[left] + nums[right];

                if (sum === target) {
                    result.push([nums[i], nums[j], nums[left], nums[right]]);

                    // Skip duplicates for third element
                    while (left < right && nums[left] === nums[left + 1]) left++;
                    // Skip duplicates for fourth element
                    while (left < right && nums[right] === nums[right - 1]) right--;

                    left++;
                    right--;
                } else if (sum < target) {
                    left++;
                } else {
                    right--;
                }
            }
        }
    }

    return result;
}

export default fourSum;