/*
Problem: Squares of a Sorted Array
Difficulty: Easy
Category: Array, Two Pointers, Sorting
LeetCode: #977
Pattern: Two Pointers (Opposite Direction)

Given an integer array nums sorted in non-decreasing order, return an array of
the squares of each number sorted in non-decreasing order.

Example 1:
  Input: nums = [-4,-1,0,3,10]
  Output: [0,1,9,16,100]
  Explanation: After squaring, the array becomes [16,1,0,9,100].
  After sorting, it becomes [0,1,9,16,100].

Example 2:
  Input: nums = [-7,-3,2,3,11]
  Output: [4,9,9,49,121]

Example 3:
  Input: nums = [-5,-3,-2,-1]
  Output: [1,4,9,25]

Example 4:
  Input: nums = [1,2,3,4,5]
  Output: [1,4,9,16,25]

Constraints:
  - 1 <= nums.length <= 10^4
  - -10^4 <= nums[i] <= 10^4
  - nums is sorted in non-decreasing order.

Time Complexity: O(n)
Space Complexity: O(n) for the result array

Pattern Notes:
  - Use two pointers at the extremes of the array
  - Compare absolute values (squares) from both ends
  - Place larger square at the end of result array
  - Move the pointer that contributed the larger square
  - Fill result array from right to left
*/

export const functionName = 'sortedSquares';

export const tests = [
  {
    input: [[-4,-1,0,3,10]],
    expected: [0,1,9,16,100]
  },
  {
    input: [[-7,-3,2,3,11]],
    expected: [4,9,9,49,121]
  },
  {
    input: [[-5,-3,-2,-1]],
    expected: [1,4,9,25]
  },
  {
    input: [[1,2,3,4,5]],
    expected: [1,4,9,16,25]
  },
  {
    input: [[-1]],
    expected: [1]
  },
  {
    input: [[2]],
    expected: [4]
  },
  {
    input: [[-2,0,1]],
    expected: [0,1,4]
  },
  {
    input: [[-10,-5,0,1,3,8]],
    expected: [0,1,9,25,64,100]
  },
  // Boundary: two elements with negatives
  {
    input: [[-3,3]],
    expected: [9,9]
  },
  // All-same values
  {
    input: [[-2,-2,-2,-2]],
    expected: [4,4,4,4]
  },
  // Larger input (20 elements), all negative reversed
  {
    input: [[-20,-18,-16,-14,-12,-10,-8,-6,-4,-2,-1,0,1,3,5,7,9,11,13,15]],
    expected: [0,1,1,4,4,9,25,36,49,64,81,100,121,144,169,196,225,256,324,400]
  },
  // Zeros
  {
    input: [[0,0,0,0,0]],
    expected: [0,0,0,0,0]
  },
  // Heavy duplicates with negatives and positives
  {
    input: [[-5,-5,-5,0,5,5,5]],
    expected: [0,25,25,25,25,25,25]
  }
];

/**
 * Returns squares of sorted array elements, sorted in non-decreasing order
 * @param {number[]} nums - Sorted array of integers
 * @return {number[]} Array of squares sorted in non-decreasing order
 */
function sortedSquares(nums) {
    const n = nums.length;
    const result = new Array(n);
    let left = 0;
    let right = n - 1;
    let position = n - 1; // Fill result array from right to left

    while (left <= right) {
        const leftSquare = nums[left] * nums[left];
        const rightSquare = nums[right] * nums[right];

        // Place the larger square at current position
        if (leftSquare > rightSquare) {
            result[position] = leftSquare;
            left++;
        } else {
            result[position] = rightSquare;
            right--;
        }
        position--;
    }

    return result;
}

export default sortedSquares;