/*
Problem: Sqrt(x)
Difficulty: Easy
Category: Binary Search, Math
LeetCode: #69
Pattern: Binary Search for Answer

Given a non-negative integer x, return the square root of x rounded down to the nearest integer.
The returned integer should be non-negative as well.

You must not use any built-in exponent function or operator.
For example, do not use pow(x, 0.5) or x ** 0.5.

Example 1:
  Input: x = 4
  Output: 2
  Explanation: The square root of 4 is 2, so we return 2

Example 2:
  Input: x = 8
  Output: 2
  Explanation: The square root of 8 is 2.828..., and since we round it down to the nearest integer, 2 is returned

Example 3:
  Input: x = 0
  Output: 0
  Explanation: Square root of 0 is 0

Example 4:
  Input: x = 1
  Output: 1
  Explanation: Square root of 1 is 1

Example 5:
  Input: x = 16
  Output: 4
  Explanation: Perfect square, sqrt(16) = 4

Constraints:
  - 0 <= x <= 2^31 - 1

Time Complexity: O(log x) where x is the input number
Space Complexity: O(1)

Pattern Notes:
  - Binary search on the answer space [0, x]
  - For large x, the answer is at most x/2 + 1, but using x as upper bound works
  - Use while (left <= right) for inclusive search
  - Check if mid * mid <= x to determine if mid is valid
  - Be careful with integer overflow: use mid <= x / mid instead of mid * mid <= x
  - Keep track of the last valid answer before going out of bounds
*/

export const functionName = 'mySqrt';

export const tests = [
  {
    input: [4],
    expected: 2
  },
  {
    input: [8],
    expected: 2
  },
  {
    input: [0],
    expected: 0
  },
  {
    input: [1],
    expected: 1
  },
  {
    input: [16],
    expected: 4
  },
  {
    input: [25],
    expected: 5
  },
  {
    input: [2147395600],
    expected: 46340
  },
  {
    input: [9],
    expected: 3
  },
  // --- Additional rigorous test cases ---
  {
    // Small non-perfect square
    input: [2],
    expected: 1
  },
  {
    // Small non-perfect square
    input: [3],
    expected: 1
  },
  {
    // Just below a perfect square (100 - 1 = 99)
    input: [99],
    expected: 9
  },
  {
    // Perfect square 100
    input: [100],
    expected: 10
  },
  {
    // Larger non-perfect square
    input: [2147395601],
    expected: 46340
  }
];

/**
 * Calculate integer square root using binary search
 * @param {number} x - Non-negative integer
 * @return {number} Integer square root rounded down
 */
function mySqrt(x) {
    if (x === 0) return 0;
    if (x === 1) return 1;

    let left = 1;
    let right = x;
    let result = 0;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        // Avoid overflow by using division instead of multiplication
        if (mid <= x / mid) {
            result = mid; // mid is a valid answer, but there might be a larger one
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return result;
}

export default mySqrt;