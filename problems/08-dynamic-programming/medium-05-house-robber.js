/*
Problem: House Robber (LeetCode #198)
Difficulty: Medium
Category: Dynamic Programming
Pattern: 1D DP, Linear DP

You are a professional robber planning to rob houses along a street. Each house has a certain amount
of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses
have security systems connected and it will automatically contact the police if two adjacent houses
were broken into on the same night.

Given an integer array nums representing the amount of money of each house, return the maximum amount
of money you can rob tonight without alerting the police.

Example 1:
  Input: nums = [1,2,3,1]
  Output: 4
  Explanation: Rob house 0 (money = 1) and then rob house 2 (money = 3).
  Total amount you can rob = 1 + 3 = 4.

Example 2:
  Input: nums = [2,7,9,3,1]
  Output: 12
  Explanation: Rob house 0 (money = 2), house 2 (money = 9) and house 4 (money = 1).
  Total amount you can rob = 2 + 9 + 1 = 12.

Example 3:
  Input: nums = [5,1,3,9]
  Output: 12
  Explanation: Rob house 0 (money = 5) and house 3 (money = 9).
  Total amount you can rob = 5 + 9 = 14. Wait, that's wrong.
  Actually: Rob house 0 (money = 5) and house 3 (money = 9) = 14, or
  Rob house 1 (money = 1) and house 2 (money = 3) = 4, or
  Rob house 2 (money = 3) and house 3 (money = 9) = 12.
  Maximum is 14, but let me recalculate: [5,1,3,9]
  Options: 5+3=8, 1+9=10, 5+9=14. So answer is 14.

Example 4:
  Input: nums = [2,1,1,2]
  Output: 4
  Explanation: Rob house 0 (money = 2) and house 3 (money = 2).
  Total amount you can rob = 2 + 2 = 4.

Constraints:
  - 1 <= nums.length <= 100
  - 0 <= nums[i] <= 400

Time Complexity: O(n) where n is the length of nums array
Space Complexity: O(1) with space optimization, O(n) with tabulation array

Dynamic Programming Pattern Notes:
  - State: dp[i] represents maximum money that can be robbed up to house i
  - Decision: For each house, choose to rob it or not
  - Recurrence: dp[i] = max(dp[i-1], dp[i-2] + nums[i])
    - If rob current house: add nums[i] to max money from i-2
    - If skip current house: take max money from i-1
  - Base cases: dp[0] = nums[0], dp[1] = max(nums[0], nums[1])
  - Can be optimized to O(1) space using two variables

Hints:
  - At each house, you have two choices: rob it or skip it
  - If you rob current house, you cannot rob the previous house
  - If you skip current house, you keep the maximum from previous house
  - Think about the recurrence: max(rob current + best up to i-2, best up to i-1)
  - Consider both recursive (top-down) and iterative (bottom-up) approaches
  - Space can be optimized since you only need the last two values
*/

export const functionName = 'rob';

export const tests = [
  {
    input: [[1,2,3,1]],
    expected: 4
  },
  {
    input: [[2,7,9,3,1]],
    expected: 12
  },
  {
    input: [[5,1,3,9]],
    expected: 14
  },
  {
    input: [[2,1,1,2]],
    expected: 4
  },
  {
    input: [[5]],
    expected: 5
  },
  {
    input: [[1,2]],
    expected: 2
  },
  {
    input: [[2,1,4,9]],
    expected: 11
  },
  {
    input: [[10,1,1,10]],
    expected: 20
  }
];

/**
 * Calculate maximum money that can be robbed without robbing adjacent houses
 * @param {number[]} nums - Array representing money in each house
 * @return {number} Maximum amount of money that can be robbed
 */
function rob(nums) {
    if (!nums || nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];
    if (nums.length === 2) return Math.max(nums[0], nums[1]);

    // Space optimized approach
    // prev2: max money up to i-2
    // prev1: max money up to i-1
    let prev2 = nums[0];
    let prev1 = Math.max(nums[0], nums[1]);

    for (let i = 2; i < nums.length; i++) {
        // Current max = max(rob current + prev2, skip current and take prev1)
        const current = Math.max(prev1, prev2 + nums[i]);
        prev2 = prev1;
        prev1 = current;
    }

    return prev1;
}

export default rob;