/*
Problem: Container With Most Water
Difficulty: Medium
Category: Array, Two Pointers, Greedy
LeetCode: #11
Pattern: Two Pointers (Opposite Direction)

You are given an integer array height of length n. There are n vertical lines
drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container that can hold the most water.

Return the maximum amount of water a container can store.

Notice that you may not slant the container.

Example 1:
  Input: height = [1,8,6,2,5,4,8,3,7]
  Output: 49
  Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7].
  In this case, the max area of water (blue section) the container can contain is 49.

Example 2:
  Input: height = [1,1]
  Output: 1

Example 3:
  Input: height = [1,2,1]
  Output: 2

Constraints:
  - n == height.length
  - 2 <= n <= 10^5
  - 0 <= height[i] <= 10^4

Time Complexity: O(n)
Space Complexity: O(1)

Pattern Notes:
  - Use two pointers at opposite ends
  - Area = min(height[left], height[right]) * (right - left)
  - Always move the pointer with smaller height
  - This is optimal because moving the taller line can't increase area with current shorter line
*/

export const functionName = 'maxArea';

export const tests = [
  {
    input: [[1,8,6,2,5,4,8,3,7]],
    expected: 49
  },
  {
    input: [[1,1]],
    expected: 1
  },
  {
    input: [[1,2,1]],
    expected: 2
  },
  {
    input: [[1,2,4,3]],
    expected: 4
  },
  {
    input: [[2,3,4,5,18,17,6]],
    expected: 17
  },
  {
    input: [[1,3,2,5,25,24,5]],
    expected: 24
  },
  {
    input: [[3,9,3,4,7,2,12,6]],
    expected: 45
  },
  {
    input: [[5,2,12,14,3,16,10]],
    expected: 72
  },
  // Boundary: two elements
  {
    input: [[5,10]],
    expected: 5
  },
  // All same height
  {
    input: [[7,7,7,7,7,7,7]],
    expected: 42
  },
  // Ascending then descending (peak in middle)
  {
    input: [[1,2,3,4,5,4,3,2,1]],
    expected: 8
  },
  // Zeros in the middle
  {
    input: [[10,0,0,0,0,0,0,0,10]],
    expected: 80
  },
  // Larger input: 20 elements, alternating pattern
  {
    input: [[1,100,1,100,1,100,1,100,1,100,1,100,1,100,1,100,1,100,1,100]],
    expected: 1800
  }
];

/**
 * Finds the maximum area of water that can be contained
 * @param {number[]} height - Array of heights
 * @return {number} Maximum water area
 */
function maxArea(height) {
    let left = 0;
    let right = height.length - 1;
    let maxWater = 0;

    while (left < right) {
        // Calculate current area
        const width = right - left;
        const currentHeight = Math.min(height[left], height[right]);
        const currentArea = width * currentHeight;

        // Update maximum area
        maxWater = Math.max(maxWater, currentArea);

        // Move the pointer with smaller height
        // This is optimal because keeping the shorter line and moving
        // the taller line can only decrease the area
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }

    return maxWater;
}

export default maxArea;