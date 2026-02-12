/*
Problem: Power of Two
Difficulty: Easy
Category: Recursion, Math, Bit Manipulation
LeetCode: #231
Pattern: Basic Recursion

Given an integer n, return true if it is a power of two. Otherwise, return false.
An integer n is a power of two, if there exists an integer x such that n == 2^x.

Example 1:
  Input: n = 1
  Output: true
  Explanation: 2^0 = 1

Example 2:
  Input: n = 16
  Output: true
  Explanation: 2^4 = 16

Example 3:
  Input: n = 3
  Output: false
  Explanation: 3 is not a power of 2

Example 4:
  Input: n = 4
  Output: true
  Explanation: 2^2 = 4

Example 5:
  Input: n = 5
  Output: false
  Explanation: 5 is not a power of 2

Constraints:
  - -2^31 <= n <= 2^31 - 1

Time Complexity: O(log n) where n is the input number
Space Complexity: O(log n) due to recursion call stack

Recursion Pattern Notes:
  - Base cases: n = 1 (return true), n <= 0 or n is odd (return false)
  - Recursive case: if n is even, check if n/2 is a power of two
  - This is a "divide and conquer" pattern where we reduce problem size by half
  - Each recursive call divides the number by 2

Hints:
  - What's the smallest power of two? (base case)
  - If n is a power of two and n > 1, what can you say about n/2?
  - Powers of two are always positive
  - If n is odd (except 1), can it be a power of two?
  - Think about the binary representation of powers of two
*/

export const functionName = 'isPowerOfTwo';

export const tests = [
  {
    input: [1],
    expected: true
  },
  {
    input: [16],
    expected: true
  },
  {
    input: [3],
    expected: false
  },
  {
    input: [4],
    expected: true
  },
  {
    input: [5],
    expected: false
  },
  {
    input: [8],
    expected: true
  },
  {
    input: [0],
    expected: false
  },
  {
    input: [-16],
    expected: false
  }
];

/**
 * Check if n is a power of two using recursion
 * @param {number} n - Integer to check
 * @return {boolean} True if n is a power of two, false otherwise
 */
function isPowerOfTwo(n) {
    // Base case: 1 is 2^0, so it's a power of two
    if (n === 1) return true;

    // Base case: non-positive numbers or odd numbers (except 1) are not powers of two
    if (n <= 0 || n % 2 !== 0) return false;

    // Recursive case: if n is even, check if n/2 is a power of two
    return isPowerOfTwo(n / 2);
}

export default isPowerOfTwo;