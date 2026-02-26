/*
Problem: Diet Plan Performance
Difficulty: Easy
Category: Array, Sliding Window
LeetCode: #1176
Pattern: Fixed Window Sliding Window

A dieter consumes calories[i] calories on the i-th day. Given an integer k, for every consecutive sequence of k days (calories[i], calories[i+1], ..., calories[i+k-1] for all 0 <= i <= n-k), they look at T, the total calories consumed during that sequence of k days (calories[i] + calories[i+1] + ... + calories[i+k-1]):

- If T < lower, they performed poorly and lose 1 point
- If T > upper, they performed well and gain 1 point
- Otherwise, they performed normally and their points do not change

Initially, the dieter has zero points. Return the total number of points the dieter has after dieting for calories.length days.

Note that the total points can be negative.

Example 1:
  Input: calories = [1,2,3,4,5], k = 1, lower = 3, upper = 3
  Output: 0
  Explanation: Since k = 1, we consider each element individually.
  [1] < 3 (lose 1) + [2] < 3 (lose 1) + [3] no change + [4] > 3 (gain 1) + [5] > 3 (gain 1) = 0

Example 2:
  Input: calories = [3,2], k = 2, lower = 0, upper = 1
  Output: 1
  Explanation: Since k = 2, we consider subarrays of length 2.
  [3,2] with total 5 > 1 (gain 1 point).

Example 3:
  Input: calories = [6,5,0,0], k = 2, lower = 1, upper = 5
  Output: 0
  Explanation:
  [6,5] with total 11 > 5 (gain 1 point)
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
  - T < lower subtracts a point, T > upper adds a point
*/

export const functionName = 'dietPlanPerformance';

export const dietPlanPerformance = (calories: number[], k: number, lower: number, upper: number) => {

  // sliding window
  

  // track the points for the period
  let points = 0;
  // track the initial window sum (will be subtracting/adding later)
  let windowSum = 0;

  // initiate initial windowSum
  for (let i = 0; i < k; i++) {
    windowSum += calories[i];
  }

  if (windowSum < lower) {
    points -= 1;
  } else if (windowSum > upper) {
    points += 1;
  }

  for (let j = k; j < calories.length; j++) {
    windowSum -= calories[j - k];
    windowSum += calories[j];

    if (windowSum < lower) {
      points -= 1;
    } else if (windowSum > upper) {
      points += 1;
    }
  }

  return points;

}

export const tests = [
  {
    input: [[1, 2, 3, 4, 5], 1, 3, 3],
    expected: 0,
  },
  {
    input: [[3, 2], 2, 0, 1],
    expected: 1,
  },
  {
    input: [[6, 5, 0, 0], 2, 1, 5],
    expected: 0,
  },
  {
    input: [[1, 2, 3, 4, 5, 6], 3, 10, 15],
    expected: -2,
  },
  {
    input: [[10, 10, 10, 10], 2, 15, 25],
    expected: 0,
  },
  {
    input: [[1, 1, 1, 1, 1], 5, 3, 7],
    expected: 0,
  },
  {
    input: [[5, 5, 5, 5, 5], 3, 12, 18],
    expected: 0,
  },
  {
    input: [[100], 1, 50, 150],
    expected: 0,
  },
  {
    input: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      5,
      1,
      10,
    ],
    expected: -16,
  },
  {
    input: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      4,
      4,
      4,
    ],
    expected: 0,
  },
  {
    input: [[20000, 20000, 20000], 1, 0, 20000],
    expected: 0,
  },
  {
    input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 2, 5, 12],
    expected: 3,
  },
];
