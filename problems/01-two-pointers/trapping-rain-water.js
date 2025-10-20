/*
Problem: Trapping Rain Water
Difficulty: Hard
Category: Array, Two Pointers, Dynamic Programming, Stack, Monotonic Stack
LeetCode: #42
Pattern: Two Pointers (Opposite Direction)

Given n non-negative integers representing an elevation map where the width of
each bar is 1, compute how much water it can trap after raining.

Example 1:
  Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
  Output: 6
  Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1].
  In this case, 6 units of rain water (blue section) are being trapped.

Example 2:
  Input: height = [4,2,0,3,2,5]
  Output: 9

Example 3:
  Input: height = [3,0,2,0,4]
  Output: 7

Constraints:
  - n == height.length
  - 1 <= n <= 2 * 10^4
  - 0 <= height[i] <= 3 * 10^4

Time Complexity: O(n)
Space Complexity: O(1)

Pattern Notes:
  - Use two pointers from opposite ends
  - Track max height seen from left and right
  - Water level at any point = min(leftMax, rightMax) - currentHeight
  - Move pointer with smaller max height (limiting factor)
  - Only add water when current height < corresponding max
*/

export const functionName = 'trap';

export const tests = [
  {
    input: [[0,1,0,2,1,0,1,3,2,1,2,1]],
    expected: 6
  },
  {
    input: [[4,2,0,3,2,5]],
    expected: 9
  },
  {
    input: [[3,0,2,0,4]],
    expected: 7
  },
  {
    input: [[0,2,0]],
    expected: 0
  },
  {
    input: [[3,2,1,0,4]],
    expected: 7
  },
  {
    input: [[5,4,1,2]],
    expected: 1
  },
  {
    input: [[2,0,2]],
    expected: 2
  },
  {
    input: [[1]],
    expected: 0
  }
];

/**
 * Calculates how much rain water can be trapped
 * @param {number[]} height - Array representing elevation map
 * @return {number} Total water trapped
 */
function trap(height) {
    if (height.length <= 2) return 0;

    let left = 0;
    let right = height.length - 1;
    let leftMax = 0;
    let rightMax = 0;
    let totalWater = 0;

    while (left < right) {
        // Update max heights
        leftMax = Math.max(leftMax, height[left]);
        rightMax = Math.max(rightMax, height[right]);

        // Process the side with smaller max height
        // This ensures we always have a "wall" on the other side
        if (leftMax < rightMax) {
            // Water level is determined by leftMax
            // Only add water if current height is less than leftMax
            if (height[left] < leftMax) {
                totalWater += leftMax - height[left];
            }
            left++;
        } else {
            // Water level is determined by rightMax
            // Only add water if current height is less than rightMax
            if (height[right] < rightMax) {
                totalWater += rightMax - height[right];
            }
            right--;
        }
    }

    return totalWater;
}

export default trap;