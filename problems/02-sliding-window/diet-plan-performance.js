/*
Problem: Diet Plan Performance
Difficulty: Easy
Category: Array, Sliding Window
LeetCode: #1176
Pattern: Fixed Window Sliding Window

A dieter consumes calories[i] calories on the i-th day. Given an integer k, for every consecutive sequence of k days (calories[i], calories[i+1], ..., calories[i+k-1] for all 0 <= i <= n-k), they look at T, the total calories consumed during that sequence of k days (calories[i] + calories[i+1] + ... + calories[i+k-1]):

- If T < lower, they performed poorly and lose 1 point
- If T > upper, they performed poorly and lose 1 point
- Otherwise, they performed normally and their points do not change

Initially, the dieter has zero points. Return the total number of points the dieter has after dieting for calories.length days.

Note that the total points can be negative.

Example 1:
  Input: calories = [1,2,3,4,5], k = 1, lower = 3, upper = 3
  Output: 0
  Explanation: Since k = 1, we consider each element individually.
  points = 0 because [1] < 3 (lose 1 point) then [2] < 3 (lose 1 point) then [3] is between 3 and 3 (no change) then [4] > 3 (lose 1 point) then [5] > 3 (lose 1 point).

Example 2:
  Input: calories = [3,2], k = 2, lower = 0, upper = 1
  Output: 1
  Explanation: Since k = 2, we consider subarrays of length 2.
  points = 1 because [3,2] with total 5 > 1 (lose 1 point).

Example 3:
  Input: calories = [6,5,0,0], k = 2, lower = 1, upper = 5
  Output: -1
  Explanation:
  [6,5] with total 11 > 5 (lose 1 point)
  [5,0] with total 5 = 5 (no change)
  [0,0] with total 0 < 1 (lose 1 point)

Constraints:
  - 1 <= k <= calories.length <= 10^5
  - 0 <= calories[i] <= 20000
  - 0 <= lower <= upper

Time Complexity: O(n)
Space Complexity: O(1)

Pattern Notes:
  - Fixed window sliding window of size k
  - Calculate sum of first window, then slide by removing first and adding next element
  - For each window sum, compare with lower and upper bounds to update points
  - Negative points are allowed (dieter can have negative performance)
*/

export const functionName = 'dietPlanPerformance';

export const tests = [
  {
    input: [[1,2,3,4,5], 1, 3, 3],
    expected: 0
  },
  {
    input: [[3,2], 2, 0, 1],
    expected: 1
  },
  {
    input: [[6,5,0,0], 2, 1, 5],
    expected: -1
  },
  {
    input: [[1,2,3,4,5,6], 3, 10, 15],
    expected: -4
  },
  {
    input: [[10,10,10,10], 2, 15, 25],
    expected: 0
  },
  {
    input: [[1,1,1,1,1], 5, 3, 7],
    expected: -1
  },
  {
    input: [[5,5,5,5,5], 3, 12, 18],
    expected: 0
  },
  {
    input: [[100], 1, 50, 150],
    expected: 0
  }
];

/**
 * Calculates diet plan performance points
 * @param {number[]} calories - Daily calorie consumption
 * @param {number} k - Number of consecutive days to consider
 * @param {number} lower - Lower bound for good performance
 * @param {number} upper - Upper bound for good performance
 * @return {number} Total points after diet period
 */
function dietPlanPerformance(calories, k, lower, upper) {
    let points = 0;

    // Calculate sum of first window
    let windowSum = 0;
    for (let i = 0; i < k; i++) {
        windowSum += calories[i];
    }

    // Check first window performance
    if (windowSum < lower || windowSum > upper) {
        points--;
    }

    // Slide the window and check performance
    for (let i = k; i < calories.length; i++) {
        // Update window sum: remove leftmost, add rightmost
        windowSum = windowSum - calories[i - k] + calories[i];

        // Check current window performance
        if (windowSum < lower || windowSum > upper) {
            points--;
        }
    }

    return points;
}

export default dietPlanPerformance;