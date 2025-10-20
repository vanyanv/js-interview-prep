/*
Problem: Sum Array Recursive
Difficulty: Easy
Category: Recursion, Array
Pattern: Basic Recursion

Calculate the sum of all elements in an array using recursion.
Do not use any built-in array methods like reduce().

Example 1:
  Input: nums = [1, 2, 3, 4, 5]
  Output: 15
  Explanation: 1 + 2 + 3 + 4 + 5 = 15

Example 2:
  Input: nums = [10, -5, 3]
  Output: 8
  Explanation: 10 + (-5) + 3 = 8

Example 3:
  Input: nums = []
  Output: 0
  Explanation: Sum of empty array is 0

Example 4:
  Input: nums = [42]
  Output: 42
  Explanation: Single element array

Example 5:
  Input: nums = [-1, -2, -3]
  Output: -6
  Explanation: (-1) + (-2) + (-3) = -6

Constraints:
  - 0 <= nums.length <= 1000
  - -1000 <= nums[i] <= 1000

Time Complexity: O(n) where n is the length of the array
Space Complexity: O(n) due to recursion call stack

Recursion Pattern Notes:
  - Base case: empty array, return 0
  - Recursive case: first element + sum of remaining elements
  - This is a "divide and conquer" pattern where we process one element at a time
  - Each recursive call reduces the array size by 1

Hints:
  - What's the sum of an empty array? (base case)
  - How can you break down the array into smaller parts?
  - Think about taking the first element and summing the rest
  - Use array slicing to get subarray for recursive call
  - Consider edge cases like empty array and single element
*/

export const functionName = 'sumArrayRecursive';

export const tests = [
  {
    input: [[1, 2, 3, 4, 5]],
    expected: 15
  },
  {
    input: [[10, -5, 3]],
    expected: 8
  },
  {
    input: [[]],
    expected: 0
  },
  {
    input: [[42]],
    expected: 42
  },
  {
    input: [[-1, -2, -3]],
    expected: -6
  },
  {
    input: [[0, 0, 0]],
    expected: 0
  },
  {
    input: [[100, 200, 300]],
    expected: 600
  },
  {
    input: [[5, -5, 10, -10]],
    expected: 0
  }
];

/**
 * Calculate sum of array elements using recursion
 * @param {number[]} nums - Array of numbers
 * @return {number} Sum of all elements
 */
function sumArrayRecursive(nums) {
    // Base case: empty array has sum of 0
    if (nums.length === 0) {
        return 0;
    }

    // Recursive case: first element + sum of remaining elements
    return nums[0] + sumArrayRecursive(nums.slice(1));
}

export default sumArrayRecursive;