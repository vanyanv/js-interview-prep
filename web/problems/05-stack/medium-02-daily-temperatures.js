/*
Problem: Daily Temperatures
Difficulty: Medium
Category: Stack, Array, Monotonic Stack
LeetCode: #739
Pattern: Stack (Monotonic Stack - Next Greater)

Given an array of integers temperatures represents the daily temperatures,
return an array answer such that answer[i] is the number of days you have to wait
after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0.

Example 1:
  Input: temperatures = [73,74,75,71,69,72,76,73]
  Output: [1,1,4,2,1,1,0,0]

Example 2:
  Input: temperatures = [30,40,50,60]
  Output: [1,1,1,0]

Example 3:
  Input: temperatures = [30,60,90]
  Output: [1,1,0]

Example 4:
  Input: temperatures = [89,62,70,58,47,47,46,76,100,70]
  Output: [8,1,5,4,3,2,1,1,0,0]

Constraints:
  - 1 <= temperatures.length <= 10^5
  - 30 <= temperatures[i] <= 100

Time Complexity: O(n)
Space Complexity: O(n) for the stack

Pattern Notes:
  - Classic monotonic decreasing stack problem
  - Stack stores indices (not values) to calculate distances
  - When current temp > stack top temp, we found next warmer day
  - Calculate distance as current_index - stack_top_index
  - This pattern appears in many "next greater element" variations
  - Stack maintains indices in decreasing order of their temperatures
*/

export const functionName = 'dailyTemperatures';

export const tests = [
  {
    input: [[73,74,75,71,69,72,76,73]],
    expected: [1,1,4,2,1,1,0,0]
  },
  {
    input: [[30,40,50,60]],
    expected: [1,1,1,0]
  },
  {
    input: [[30,60,90]],
    expected: [1,1,0]
  },
  {
    input: [[89,62,70,58,47,47,46,76,100,70]],
    expected: [8,1,5,4,3,2,1,1,0,0]
  },
  {
    input: [[100]],
    expected: [0]
  },
  {
    input: [[30,30,30]],
    expected: [0,0,0]
  },
  {
    input: [[100,90,80,70]],
    expected: [0,0,0,0]
  },
  {
    input: [[55,38,53,81,61,93,97,32,43,78]],
    expected: [3,2,1,2,1,1,0,2,1,0]
  }
];

/**
 * Find days until next warmer temperature
 * @param {number[]} temperatures - Array of daily temperatures
 * @return {number[]} Days to wait for warmer temperature
 */
function dailyTemperatures(temperatures) {
    const n = temperatures.length;
    const result = new Array(n).fill(0);
    const stack = []; // Stack of indices

    for (let i = 0; i < n; i++) {
        // While stack not empty and current temp > temperature at stack top index
        while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
            const prevIndex = stack.pop();
            result[prevIndex] = i - prevIndex; // Distance to next warmer day
        }

        stack.push(i);
    }

    // Remaining indices in stack have no next warmer day (already initialized to 0)
    return result;
}

export default dailyTemperatures;