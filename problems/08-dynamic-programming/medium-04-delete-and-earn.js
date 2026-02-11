/*
Problem: Delete and Earn (LeetCode #740)
Difficulty: Medium
Category: Dynamic Programming
Pattern: 1D DP, House Robber Variant

You are given an integer array nums. You want to maximize the number of points you get
by performing the following operation any number of times:

Pick any nums[i] and delete it to earn nums[i] points. Afterwards, you must delete
every element equal to nums[i] - 1 and every element equal to nums[i] + 1.

Return the maximum number of points you can earn.

Example 1:
  Input: nums = [3,4,2]
  Output: 6
  Explanation: You can perform the following operations:
  - Delete 4 to earn 4 points. Consequently, 3 is also deleted. nums = [2].
  - Delete 2 to earn 2 points. nums = [].
  You earn a total of 6 points.

Example 2:
  Input: nums = [2,2,3,3,3,4]
  Output: 9
  Explanation: You can perform the following operations:
  - Delete a 3 to earn 3 points. All 2's and 4's are also deleted. nums = [3,3].
  - Delete a 3 again to earn 3 points. nums = [3].
  - Delete a 3 once more to earn 3 points. nums = [].
  You earn a total of 9 points.

Example 3:
  Input: nums = [3,1]
  Output: 4
  Explanation: Delete 3 to earn 3 points, then delete 1 to earn 1 point.

Example 4:
  Input: nums = [1,1,1,2,4,5,5,5,6]
  Output: 18
  Explanation: Take all 1's (3 points), skip 2, take 4 (4 points), take all 5's (15 points), skip 6.

Constraints:
  - 1 <= nums.length <= 2 * 10^4
  - 1 <= nums[i] <= 10^4

Time Complexity: O(n + max(nums)) where n is length of nums
Space Complexity: O(max(nums)) for the points array

Dynamic Programming Pattern Notes:
  - Transform the problem: group identical numbers and calculate total points for each value
  - This becomes a House Robber problem where adjacent values cannot both be taken
  - State: dp[i] represents maximum points achievable considering values 0 to i
  - Recurrence: dp[i] = max(dp[i-1], dp[i-2] + points[i])
  - Base cases: dp[0] = points[0], dp[1] = max(points[0], points[1])
  - Key insight: if we take value i, we cannot take values i-1 or i+1

Hints:
  - First, count frequency of each number and calculate total points for each value
  - This transforms into: "select non-adjacent elements to maximize sum"
  - Same pattern as House Robber: for each value, decide to take it or skip it
  - If you take value i, you get all points for that value but cannot take i-1 or i+1
  - Build a points array where points[i] = count[i] * i
  - Apply House Robber DP on this points array
  - Space optimization possible since you only need last two values
*/

export const functionName = 'deleteAndEarn';

export const tests = [
  {
    input: [[3,4,2]],
    expected: 6
  },
  {
    input: [[2,2,3,3,3,4]],
    expected: 9
  },
  {
    input: [[3,1]],
    expected: 4
  },
  {
    input: [[1,1,1,2,4,5,5,5,6]],
    expected: 18
  },
  {
    input: [[1]],
    expected: 1
  },
  {
    input: [[1,2,3]],
    expected: 4
  },
  {
    input: [[5,6,7,8,9]],
    expected: 27
  },
  {
    input: [[1,6,3,3,8,4,8,10,1,3]],
    expected: 43
  },
  {
    input: [[5,5,5,5,5]],
    expected: 25
  },
  {
    input: [[1,2,3,4,5,6,7,8,9,10]],
    expected: 30
  },
  {
    input: [[10,10,10]],
    expected: 30
  },
  {
    input: [[2,4,6,8,10]],
    expected: 30
  }
];

/**
 * Calculate maximum points by deleting numbers (cannot delete adjacent values)
 * @param {number[]} nums - Array of integers
 * @return {number} Maximum points that can be earned
 */
function deleteAndEarn(nums) {
    if (!nums || nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];

    // Find the maximum value to determine the size of points array
    const maxVal = Math.max(...nums);

    // Count frequency and calculate total points for each value
    const points = new Array(maxVal + 1).fill(0);
    for (const num of nums) {
        points[num] += num;
    }

    // Apply House Robber DP logic
    // For each value, decide whether to take it (and skip adjacent) or skip it
    let prev2 = 0; // Maximum points up to i-2
    let prev1 = 0; // Maximum points up to i-1

    for (let i = 0; i <= maxVal; i++) {
        const current = Math.max(prev1, prev2 + points[i]);
        prev2 = prev1;
        prev1 = current;
    }

    return prev1;
}

export default deleteAndEarn;