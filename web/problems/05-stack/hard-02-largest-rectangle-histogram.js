/*
Problem: Largest Rectangle in Histogram
Difficulty: Hard
Category: Stack, Array, Monotonic Stack
LeetCode: #84
Pattern: Stack (Monotonic Stack - Area Calculation)

Given an array of integers heights representing the histogram's bar height where
the width of each bar is 1, return the area of the largest rectangle in the histogram.

Example 1:
  Input: heights = [2,1,5,6,2,3]
  Output: 10
  Explanation: The above is a histogram where width of each bar is 1.
  The largest rectangle is shown in the red area, which has an area = 10 units.

Example 2:
  Input: heights = [2,4]
  Output: 4

Example 3:
  Input: heights = [1,1,1,1,1]
  Output: 5

Example 4:
  Input: heights = [5,4,3,2,1]
  Output: 9

Example 5:
  Input: heights = [0,9]
  Output: 9

Constraints:
  - 1 <= heights.length <= 10^5
  - 0 <= heights[i] <= 10^4

Time Complexity: O(n)
Space Complexity: O(n) for the stack

Pattern Notes:
  - Monotonic increasing stack to find rectangle boundaries
  - Stack stores indices of bars in increasing height order
  - When current bar < stack top bar, calculate rectangle with stack top as smallest bar
  - Width = current_index - left_boundary - 1
  - Left boundary is the bar before the one after popped bar
  - Right boundary is current index (first bar smaller than popped bar)
  - This is one of the most complex monotonic stack problems
*/

export const functionName = 'largestRectangleArea';

export const tests = [
  {
    input: [[2,1,5,6,2,3]],
    expected: 10
  },
  {
    input: [[2,4]],
    expected: 4
  },
  {
    input: [[1,1,1,1,1]],
    expected: 5
  },
  {
    input: [[5,4,3,2,1]],
    expected: 9
  },
  {
    input: [[0,9]],
    expected: 9
  },
  {
    input: [[1]],
    expected: 1
  },
  {
    input: [[0]],
    expected: 0
  },
  {
    input: [[2,1,2]],
    expected: 3
  }
];

/**
 * Find the largest rectangle area in histogram
 * @param {number[]} heights - Array of bar heights
 * @return {number} Largest rectangle area
 */
function largestRectangleArea(heights) {
    const stack = []; // Stack of indices
    let maxArea = 0;
    const n = heights.length;

    for (let i = 0; i <= n; i++) {
        // Use 0 as sentinel value at the end to ensure all bars are processed
        const currentHeight = i === n ? 0 : heights[i];

        // While stack not empty and current height < height at stack top
        while (stack.length > 0 && currentHeight < heights[stack[stack.length - 1]]) {
            const heightIndex = stack.pop();
            const height = heights[heightIndex];

            // Calculate width of rectangle with 'height' as the smallest bar
            // Width = right_boundary - left_boundary - 1
            // Right boundary: current index (i)
            // Left boundary: index before the current stack top (or -1 if stack empty)
            const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;

            const area = height * width;
            maxArea = Math.max(maxArea, area);
        }

        stack.push(i);
    }

    return maxArea;
}

export default largestRectangleArea;