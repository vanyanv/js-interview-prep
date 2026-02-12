/*
Problem: Plus One
Difficulty: Easy
Category: Array, Math, Simulation
LeetCode: #66
Pattern: Array Manipulation + Carry Logic + Edge Case Handling
Mixed Patterns: Array Processing + Mathematical Operations + Simulation

You are given a large integer represented as an integer array digits, where each
digits[i] is the ith digit of the integer. The digits are ordered from most
significant to least significant in left-to-right order. The large integer does
not contain any leading zeros.

Increment the large integer by one and return the resulting array of digits.

Example 1:
  Input: digits = [1,2,3]
  Output: [1,2,4]
  Explanation: The array represents 123, incrementing gives 124.

Example 2:
  Input: digits = [4,3,2,1]
  Output: [4,3,2,2]
  Explanation: The array represents 4321, incrementing gives 4322.

Example 3:
  Input: digits = [9]
  Output: [1,0]
  Explanation: The array represents 9, incrementing gives 10.

Example 4:
  Input: digits = [9,9,9]
  Output: [1,0,0,0]
  Explanation: The array represents 999, incrementing gives 1000.

Constraints:
  - 1 <= digits.length <= 100
  - 0 <= digits[i] <= 9
  - digits does not contain any leading zeros except for the number 0 itself

Time Complexity: O(n) where n is length of digits array
Space Complexity: O(1) if we can modify input, O(n) if we need new array

Pattern Notes:
  - Start from rightmost digit (least significant)
  - Handle carry propagation through the array
  - Special case: all digits are 9 (need to add new digit at front)
  - Simulate manual addition with carry logic
  - Edge case handling for overflow

Interview Notes:
  - Follow-up: What if we need to add arbitrary number, not just 1?
  - Follow-up: How to handle negative numbers?
  - Follow-up: Implement for very large numbers (BigInt equivalent)
  - Common mistake: Not handling the all-9s case properly
*/

export const functionName = 'plusOne';

export const tests = [
  {
    input: [[1,2,3]],
    expected: [1,2,4]
  },
  {
    input: [[4,3,2,1]],
    expected: [4,3,2,2]
  },
  {
    input: [[9]],
    expected: [1,0]
  },
  {
    input: [[9,9,9]],
    expected: [1,0,0,0]
  },
  {
    input: [[0]],
    expected: [1]
  },
  {
    input: [[1,9,9]],
    expected: [2,0,0]
  },
  {
    input: [[9,8,9]],
    expected: [9,9,0]
  },
  {
    input: [[1,0,0,0]],
    expected: [1,0,0,1]
  }
];

/**
 * Adds one to number represented as array of digits
 * @param {number[]} digits - Array representing a large integer
 * @return {number[]} Array representing the incremented integer
 */
function plusOne(digits) {
    // Start from the rightmost digit
    for (let i = digits.length - 1; i >= 0; i--) {
        // If current digit is less than 9, just increment and return
        if (digits[i] < 9) {
            digits[i]++;
            return digits;
        }

        // Current digit is 9, set to 0 and continue (carry over)
        digits[i] = 0;
    }

    // If we reach here, all digits were 9
    // Need to create new array with 1 at front followed by zeros
    return [1, ...digits];
}

/**
 * Alternative: More explicit carry handling
 * @param {number[]} digits - Array representing a large integer
 * @return {number[]} Array representing the incremented integer
 */
function plusOneExplicit(digits) {
    const result = [...digits]; // Create copy to avoid modifying input
    let carry = 1; // We want to add 1

    // Process from right to left
    for (let i = result.length - 1; i >= 0 && carry > 0; i--) {
        const sum = result[i] + carry;
        result[i] = sum % 10;
        carry = Math.floor(sum / 10);
    }

    // If there's still a carry, prepend it
    if (carry > 0) {
        result.unshift(carry);
    }

    return result;
}

/**
 * Alternative: Recursive approach
 * @param {number[]} digits - Array representing a large integer
 * @return {number[]} Array representing the incremented integer
 */
function plusOneRecursive(digits) {
    function addCarry(index) {
        // Base case: reached beyond leftmost digit
        if (index < 0) {
            return [1]; // Need to prepend 1
        }

        // If current digit < 9, increment and stop
        if (digits[index] < 9) {
            digits[index]++;
            return digits;
        }

        // Current digit is 9, set to 0 and recurse left
        digits[index] = 0;
        const result = addCarry(index - 1);

        // If recursion returned new array, current digits need to be appended
        if (result.length > digits.length) {
            return [...result, ...digits.slice(index + 1)];
        }

        return digits;
    }

    return addCarry(digits.length - 1);
}

/**
 * Alternative: Handle special case first
 * @param {number[]} digits - Array representing a large integer
 * @return {number[]} Array representing the incremented integer
 */
function plusOneOptimized(digits) {
    // Check if all digits are 9 (optimization for common case)
    const allNines = digits.every(digit => digit === 9);
    if (allNines) {
        return [1, ...new Array(digits.length).fill(0)];
    }

    // Regular case: find rightmost non-9 digit
    for (let i = digits.length - 1; i >= 0; i--) {
        if (digits[i] < 9) {
            digits[i]++;
            // Set all digits to the right to 0
            for (let j = i + 1; j < digits.length; j++) {
                digits[j] = 0;
            }
            return digits;
        }
    }

    // This should never be reached due to the allNines check
    return digits;
}

export default plusOne;