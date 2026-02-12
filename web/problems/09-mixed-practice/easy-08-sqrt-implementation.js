/*
Problem: Sqrt(x) Implementation
Difficulty: Easy
Category: Binary Search, Math
LeetCode: #69
Pattern: Binary Search + Mathematical Optimization
Mixed Patterns: Binary Search + Math + Precision Handling + Edge Cases

Given a non-negative integer x, compute and return the square root of x.

Since the return type is an integer, the decimal digits are truncated, and only
the integer part of the result is returned.

Note: You are not allowed to use any built-in exponent function or operator.

Example 1:
  Input: x = 4
  Output: 2
  Explanation: sqrt(4) = 2.

Example 2:
  Input: x = 8
  Output: 2
  Explanation: sqrt(8) = 2.828..., truncated to 2.

Example 3:
  Input: x = 0
  Output: 0
  Explanation: sqrt(0) = 0.

Example 4:
  Input: x = 1
  Output: 1
  Explanation: sqrt(1) = 1.

Constraints:
  - 0 <= x <= 2^31 - 1

Time Complexity: O(log x) for binary search approach
Space Complexity: O(1)

Pattern Notes:
  - Multiple approaches: Binary search, Newton's method, Built-in vs custom
  - Binary search: Search space is [0, x], find largest integer whose square <= x
  - Newton's method: Iterative approximation using calculus
  - Handle edge cases: 0, 1, large numbers
  - Integer truncation vs floating point precision

Interview Notes:
  - Follow-up: Implement with decimal precision (floating point result)
  - Follow-up: Use Newton's method for faster convergence
  - Follow-up: Handle very large numbers that might cause overflow
  - Discuss trade-offs between different approaches
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
    input: [26],
    expected: 5
  },
  {
    input: [2147395600],
    expected: 46340
  }
];

/**
 * Computes integer square root using binary search
 * @param {number} x - Non-negative integer
 * @return {number} Integer square root (truncated)
 */
function mySqrt(x) {
    if (x < 2) {
        return x; // Handle 0 and 1
    }

    let left = 1;
    let right = Math.floor(x / 2); // Optimization: sqrt(x) <= x/2 for x >= 4

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const square = mid * mid;

        if (square === x) {
            return mid;
        } else if (square < x) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    // Return the largest integer whose square is <= x
    return right;
}

/**
 * Alternative: Newton's method for faster convergence
 * @param {number} x - Non-negative integer
 * @return {number} Integer square root (truncated)
 */
function mySqrtNewton(x) {
    if (x < 2) {
        return x;
    }

    // Start with initial guess (can be optimized)
    let guess = x;

    // Newton's method: next = (current + x/current) / 2
    while (guess > Math.floor(x / guess)) {
        guess = Math.floor((guess + Math.floor(x / guess)) / 2);
    }

    return guess;
}

/**
 * Alternative: More optimized binary search with better bounds
 * @param {number} x - Non-negative integer
 * @return {number} Integer square root (truncated)
 */
function mySqrtOptimized(x) {
    if (x < 2) {
        return x;
    }

    // Better upper bound: sqrt(x) <= x/2 for x >= 4
    let left = 1;
    let right = Math.min(46340, Math.floor(x / 2)); // 46340^2 < 2^31

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const square = mid * mid;

        if (square === x) {
            return mid;
        } else if (square < x) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return right;
}

/**
 * Alternative: Exponential search + binary search
 * @param {number} x - Non-negative integer
 * @return {number} Integer square root (truncated)
 */
function mySqrtExponential(x) {
    if (x < 2) {
        return x;
    }

    // Exponential search to find bounds
    let bound = 1;
    while (bound * bound <= x) {
        bound *= 2;
    }

    // Binary search in the found range
    let left = Math.floor(bound / 2);
    let right = bound;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const square = mid * mid;

        if (square === x) {
            return mid;
        } else if (square < x) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return right;
}

/**
 * Alternative: Bit manipulation approach
 * @param {number} x - Non-negative integer
 * @return {number} Integer square root (truncated)
 */
function mySqrtBitwise(x) {
    if (x < 2) {
        return x;
    }

    // Find the position of the most significant bit
    let bit = 1;
    while (bit * bit <= x) {
        bit <<= 1;
    }
    bit >>= 1;

    let result = 0;
    while (bit > 0) {
        if ((result + bit) * (result + bit) <= x) {
            result += bit;
        }
        bit >>= 1;
    }

    return result;
}

/**
 * Extended: Sqrt with decimal precision
 * @param {number} x - Non-negative number
 * @param {number} precision - Decimal places
 * @return {number} Square root with decimal precision
 */
function sqrtWithPrecision(x, precision = 2) {
    if (x < 0) {
        throw new Error("Cannot compute square root of negative number");
    }
    if (x === 0) {
        return 0;
    }

    let guess = x / 2;
    const epsilon = Math.pow(10, -(precision + 1));

    while (Math.abs(guess * guess - x) > epsilon) {
        guess = (guess + x / guess) / 2;
    }

    return Math.round(guess * Math.pow(10, precision)) / Math.pow(10, precision);
}

export default mySqrt;