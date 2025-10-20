/*
Problem: 3Sum Closest
Difficulty: Medium
Category: Array, Two Pointers, Sorting
LeetCode: #16
Pattern: Two Pointers (Fixed + Two Pointers)

Given an integer array nums of length n and an integer target, find three integers
in nums such that the sum is closest to target.

Return the sum of the three integers.

You may assume that each input would have exactly one solution.

Example 1:
  Input: nums = [-1,2,1,-4], target = 1
  Output: 2
  Explanation: The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).

Example 2:
  Input: nums = [0,0,0], target = 1
  Output: 0
  Explanation: The sum that is closest to the target is 0. (0 + 0 + 0 = 0).

Example 3:
  Input: nums = [1,1,1], target = 0
  Output: 3

Constraints:
  - 3 <= nums.length <= 500
  - -1000 <= nums[i] <= 1000
  - -10^4 <= target <= 10^4

Time Complexity: O(n²)
Space Complexity: O(1) if not counting sorting space

Pattern Notes:
  - Sort the array first
  - Fix one element, use two pointers for the remaining two
  - Track the closest sum found so far
  - Move pointers based on comparison with target
  - Skip duplicates for optimization
*/

export const functionName = 'threeSumClosest';

export const tests = [
  {
    input: [[-1,2,1,-4], 1],
    expected: 2
  },
  {
    input: [[0,0,0], 1],
    expected: 0
  },
  {
    input: [[1,1,1], 0],
    expected: 3
  },
  {
    input: [[1,1,-1,-1,3], -1],
    expected: -1
  },
  {
    input: [[1,2,3], 6],
    expected: 6
  },
  {
    input: [[-1,0,1,1,55], 3],
    expected: 2
  },
  {
    input: [[0,1,2], 0],
    expected: 3
  },
  {
    input: [[-3,-2,-5,3,-4], -1],
    expected: -2
  }
];

/**
 * Finds three numbers in array with sum closest to target
 * @param {number[]} nums - Array of integers
 * @param {number} target - Target sum
 * @return {number} Sum closest to target
 */
function threeSumClosest(nums, target) {
    nums.sort((a, b) => a - b);
    let closestSum = nums[0] + nums[1] + nums[2];
    let minDiff = Math.abs(closestSum - target);

    for (let i = 0; i < nums.length - 2; i++) {
        // Skip duplicates for the first element
        if (i > 0 && nums[i] === nums[i - 1]) continue;

        let left = i + 1;
        let right = nums.length - 1;

        while (left < right) {
            const currentSum = nums[i] + nums[left] + nums[right];
            const diff = Math.abs(currentSum - target);

            // Update closest sum if current is closer
            if (diff < minDiff) {
                minDiff = diff;
                closestSum = currentSum;
            }

            // If exact match found, return immediately
            if (currentSum === target) {
                return currentSum;
            }

            // Move pointers based on comparison with target
            if (currentSum < target) {
                left++;
                // Skip duplicates
                while (left < right && nums[left] === nums[left - 1]) left++;
            } else {
                right--;
                // Skip duplicates
                while (left < right && nums[right] === nums[right + 1]) right--;
            }
        }
    }

    return closestSum;
}

export default threeSumClosest;